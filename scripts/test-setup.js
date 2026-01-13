const { spawn, execSync } = require('child_process');
const http = require('http');

const PORT = Number(process.env.TEST_SERVER_PORT || 3800);
const BASE_URL = `http://localhost:${PORT}`;

function killPortIfInUse(port) {
  // Non-interactive: best-effort kill any process listening on the port.
  // This avoids reusing a stale dev server between test runs.
  try {
    let stdout = '';
    const commands = [
      `lsof -i :${port} -t`,
      `fuser ${port}/tcp 2>/dev/null`,
    ];

    for (const cmd of commands) {
      try {
        stdout = execSync(cmd).toString().trim();
        if (stdout) break;
      } catch (_) {
        // ignore
      }
    }

    if (!stdout) return;

    const pids = stdout.split(/[\s,]+/).filter(Boolean);
    if (!pids.length) return;

    console.log(`Port ${port} is in use by PID(s): ${pids.join(', ')}. Killing...`);
    for (const pid of pids) {
      try {
        process.kill(Number(pid), 'SIGTERM');
      } catch (_) {}
    }

    // Give the OS a moment to release the port.
    try {
      execSync('sleep 1');
    } catch (_) {}
  } catch (_) {
    // ignore
  }
}

// Check if the server is already running
async function isServerRunning() {
  return new Promise((resolve) => {
    const req = http.get(BASE_URL, (res) => {
      console.log(`Server is already running at ${BASE_URL}`);
      resolve(true);
    });
    
    req.on('error', () => {
      console.log('Server is not running');
      resolve(false);
    });
    
    req.setTimeout(1000, () => {
      req.destroy();
      resolve(false);
    });
  });
}

// Wait for server to be available
async function waitForServer(timeout = 60000) {
  const startTime = Date.now();
  console.log('Waiting for server to be ready...');
  
  while (Date.now() - startTime < timeout) {
    try {
      const isRunning = await new Promise((resolve) => {
        const req = http.get(BASE_URL, (res) => {
          resolve(true);
        });
        
        req.on('error', () => {
          resolve(false);
        });
        
        req.setTimeout(1000, () => {
          req.destroy();
          resolve(false);
        });
      });
      
      if (isRunning) {
        console.log('Server is now available!');
        return true;
      }
      
      // Wait a bit before trying again
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (err) {
      // Ignore errors and try again
    }
  }
  
  throw new Error(`Server did not become available within ${timeout}ms`);
}

// Wait for a specific path to return HTTP 200 (useful for Next.js chunk availability).
async function waitForHttp200(pathname, timeout = 120000) {
  const startTime = Date.now();
  const url = `${BASE_URL}${pathname}`;
  console.log(`Waiting for ${url} to be available...`);

  while (Date.now() - startTime < timeout) {
    const ok = await new Promise((resolve) => {
      const req = http.get(url, (res) => {
        resolve(res.statusCode === 200);
      });
      req.on('error', () => resolve(false));
      req.setTimeout(1000, () => {
        req.destroy();
        resolve(false);
      });
    });

    if (ok) return true;
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  throw new Error(`Expected HTTP 200 for ${url} within ${timeout}ms`);
}

// Start the development server
async function startServer() {
  return new Promise(async (resolve, reject) => {
    killPortIfInUse(PORT);

    if (await isServerRunning()) {
      resolve();
      return;
    }

    console.log('Starting development server...');

    // Start Next.js development server
    const serverProcess = spawn('npx', ['next', 'dev', '-p', PORT.toString()], {
      detached: true, // Run in background
      stdio: 'ignore',
      shell: true,
    });
    
    // Unref the process so it can run independently
    serverProcess.unref();
    
    // Listen for server exit
    serverProcess.on('error', (err) => {
      console.error('Failed to start server', err);
      reject(err);
    });
    
    // Wait for server to start
    try {
      await waitForServer(30000);
      // Warm up critical chunks so Playwright doesn't race against first compilation.
      await waitForHttp200('/_next/static/chunks/app/page.js', 120000);
      console.log('Server started successfully');
      resolve();
    } catch (err) {
      console.error('Server failed to start in time', err);
      reject(err);
    }
  });
}

// Main function
async function main() {
  try {
    await startServer();
    // The test runner will take over from here
    process.exit(0);
  } catch (err) {
    console.error('Setup failed:', err);
    process.exit(1);
  }
}

main();