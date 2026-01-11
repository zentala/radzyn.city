const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

// Check if the server is already running
async function isServerRunning() {
  return new Promise((resolve) => {
    const req = http.get('http://localhost:3800', (res) => {
      console.log('Server is already running at http://localhost:3800');
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
        const req = http.get('http://localhost:3800', (res) => {
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

// Start the development server
async function startServer() {
  return new Promise(async (resolve, reject) => {
    if (await isServerRunning()) {
      resolve();
      return;
    }

    console.log('Starting development server...');

    // Start Next.js development server
    const serverProcess = spawn('npx', ['next', 'dev', '-p', '3800'], {
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