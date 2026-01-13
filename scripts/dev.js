const { spawn, execSync } = require('child_process');
const readline = require('readline');

const PORT = process.env.PORT || 3800;

/**
 * Checks if a port is in use and offers to kill the process.
 */
async function checkAndClearPort(port) {
  try {
    // Try multiple tools to find the process on the port
    let stdout = '';
    const commands = [
      `lsof -i :${port} -t`,
      `fuser ${port}/tcp 2>/dev/null`
    ];

    for (const cmd of commands) {
      try {
        stdout = execSync(cmd).toString().trim();
        if (stdout) break;
      } catch (e) {
        // Continue to next command if this one fails or finds nothing
      }
    }
    
    if (stdout) {
      const pids = stdout.split(/[\s,]+/).filter(Boolean);
      console.log(`\n⚠️  Port ${port} is currently in use by PID(s): ${pids.join(', ')}`);
      
      // Try to get more info about the PIDs
      for (const pid of pids.slice(0, 3)) {
        try {
          const psInfo = execSync(`ps -p ${pid} -o comm= 2>/dev/null`).toString().trim();
          if (psInfo) console.log(`   - PID ${pid}: ${psInfo}`);
        } catch (e) {}
      }

      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });

      const shouldKill = await new Promise((resolve) => {
        rl.question(`\nDo you want to kill these processes and continue? (y/N): `, (answer) => {
          rl.close();
          resolve(answer.toLowerCase() === 'y');
        });
      });

      if (shouldKill) {
        console.log(`Killing processes...`);
        for (const pid of pids) {
          try {
            // Try SIGTERM first, then SIGKILL if needed
            process.kill(parseInt(pid), 'SIGTERM');
            setTimeout(() => {
              try {
                process.kill(parseInt(pid), 0); // Check if alive
                process.kill(parseInt(pid), 'SIGKILL');
              } catch (e) {}
            }, 500);
          } catch (e) {
            // Process might already be dead
          }
        }
        // Wait for port to be released
        console.log('Waiting for port to be released...');
        await new Promise(r => setTimeout(r, 1000));
        return true;
      } else {
        console.log('❌ Port remains occupied. Aborting start.');
        process.exit(1);
      }
    }
  } catch (e) {
    console.error('Error during port check:', e.message);
  }
  return true;
}

/**
 * Starts the Next.js dev server and ensures child processes are cleaned up.
 */
async function runDev() {
  await checkAndClearPort(PORT);

  console.log(`\n🚀 Starting Next.js dev server on port ${PORT}...`);
  
  // Use 'npx next' to ensure the local next binary is used
  const devProcess = spawn('npx', ['next', 'dev', '-p', PORT.toString()], {
    stdio: 'inherit',
    shell: true,
    env: { ...process.env, NEXT_TELEMETRY_DISABLED: '1' }
  });

  const cleanup = (signal) => {
    console.log(`\n👋 Received ${signal}. Shutting down gracefully...`);
    
    if (devProcess && !devProcess.killed) {
      // Send SIGINT to the child process (Next.js)
      devProcess.kill('SIGINT');
      
      // Force kill after timeout if it doesn't close
      const timeout = setTimeout(() => {
        console.log('Taking too long, force killing child process...');
        devProcess.kill('SIGKILL');
        process.exit(0);
      }, 3000);

      devProcess.on('exit', () => {
        clearTimeout(timeout);
        console.log('✅ Shutdown complete.');
        process.exit(0);
      });
    } else {
      process.exit(0);
    }
  };

  // Listen for common termination signals
  ['SIGINT', 'SIGTERM', 'SIGHUP'].forEach(signal => {
    process.on(signal, () => cleanup(signal));
  });

  devProcess.on('error', (err) => {
    console.error('Failed to start dev process:', err);
    process.exit(1);
  });

  devProcess.on('exit', (code) => {
    if (code !== 0 && code !== null) {
      console.log(`\nProcess exited with code ${code}`);
    }
    process.exit(code || 0);
  });
}

runDev().catch(err => {
  console.error('Fatal error in dev script:', err);
  process.exit(1);
});
