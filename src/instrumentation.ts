/**
 * Next.js Instrumentation Hook
 * Used for server-side initialization and graceful shutdown.
 * 
 * Note: Graceful shutdown handlers here are a second line of defense.
 * The primary handler is in scripts/dev.js for development.
 */

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // Only run on the server
    console.log('[Instrumentation] Registering server-side lifecycle handlers');

    // Handle graceful shutdown signals
    const cleanup = async (signal: string) => {
      console.log(`\n[Instrumentation] Received ${signal}. Performing cleanup...`);
      
      try {
        // Stop any background services
        const { stopScrapers } = await import('@/services/scraperService');
        stopScrapers();
        
        // Add other cleanup here if needed (e.g., closing DB connections)
        
        console.log('[Instrumentation] Cleanup finished.');
      } catch (error) {
        console.error('[Instrumentation] Error during cleanup:', error);
      }
      
      // In production, Next.js handles its own exit, 
      // but in some environments we might need to force it.
      if (process.env.NODE_ENV === 'production') {
        process.exit(0);
      }
    };

    process.on('SIGINT', () => cleanup('SIGINT'));
    process.on('SIGTERM', () => cleanup('SIGTERM'));
  }
}
