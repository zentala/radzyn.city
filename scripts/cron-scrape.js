/**
 * Standalone script for running the news scraper via cron
 * 
 * Usage:
 * 1. Set up a cron job to run this script at regular intervals
 * 2. Optionally specify a source to scrape with --source=name
 * 
 * Example crontab entry (every hour):
 * 0 * * * * node /path/to/cron-scrape.js >> /path/to/scrape.log 2>&1
 * 
 * Example for specific source (every 2 hours):
 * 0 */2 * * * node /path/to/cron-scrape.js --source="Radzyń Info" >> /path/to/scrape.log 2>&1
 */

const axios = require('axios');
const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });

// Default to localhost:3000 for development
const API_BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

async function runScraper() {
  // Get command line arguments
  const args = process.argv.slice(2);
  const source = args.find(arg => arg.startsWith('--source='))?.split('=')[1];
  
  console.log(`[${new Date().toISOString()}] Starting news scraper...`);
  
  try {
    // Prepare the URL
    const url = source 
      ? `${API_BASE_URL}/api/scrape?source=${encodeURIComponent(source)}`
      : `${API_BASE_URL}/api/scrape`;
    
    console.log(`[${new Date().toISOString()}] Calling API: ${url}`);
    
    // Send the request to the API
    const response = await axios.get(url);
    console.log(`[${new Date().toISOString()}] Scraper response:`, response.data);
    
    // Save the results to a log file
    const logEntry = {
      timestamp: new Date().toISOString(),
      source: source || 'all',
      result: response.data
    };
    
    const logFilePath = path.resolve(__dirname, '../scraper-logs.json');
    
    // Read existing log if it exists
    let logs = [];
    if (fs.existsSync(logFilePath)) {
      try {
        const logContent = fs.readFileSync(logFilePath, 'utf8');
        logs = JSON.parse(logContent);
      } catch (err) {
        console.error(`[${new Date().toISOString()}] Error reading log file:`, err);
      }
    }
    
    // Add new log entry
    logs.push(logEntry);
    
    // Limit to the last 100 entries to avoid unlimited growth
    if (logs.length > 100) {
      logs = logs.slice(logs.length - 100);
    }
    
    // Write logs back to file
    fs.writeFileSync(logFilePath, JSON.stringify(logs, null, 2));
    
    console.log(`[${new Date().toISOString()}] Scraper completed successfully`);
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error running scraper:`, 
      error.response?.data || error.message);
    process.exit(1);
  }
}

// Run the scraper
runScraper();