// This is a standalone script to run the scraper manually

const axios = require('axios');

// Default to localhost:3000 for development
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000';

async function runScraper() {
  const args = process.argv.slice(2);
  const source = args.find(arg => arg.startsWith('--source='))?.split('=')[1];
  
  console.log('Starting scraper...');
  
  try {
    const url = source 
      ? `${API_BASE_URL}/api/scrape?source=${encodeURIComponent(source)}`
      : `${API_BASE_URL}/api/scrape`;
    
    console.log(`Calling API: ${url}`);
    
    const response = await axios.get(url);
    console.log('Scraper response:', response.data);
    console.log('Scraper completed successfully');
  } catch (error) {
    console.error('Error running scraper:', error.response?.data || error.message);
    process.exit(1);
  }
}

runScraper();