import { NextResponse } from 'next/server';
import { startScrapers, scrapeSource, getScraperConfigs } from '@/services/scraperService';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const source = searchParams.get('source');
    
    if (source) {
      // Scrape a specific source
      const configs = getScraperConfigs();
      const sourceConfig = configs.find(config => config.sourceName.toLowerCase() === source.toLowerCase());
      
      if (!sourceConfig) {
        return NextResponse.json({ error: 'Source not found' }, { status: 404 });
      }
      
      await scrapeSource(sourceConfig);
      return NextResponse.json({ 
        message: `Successfully scraped source: ${sourceConfig.sourceName}`,
        source: sourceConfig.sourceName
      });
    } else {
      // Scrape all sources
      await startScrapers();
      return NextResponse.json({ message: 'Started scraping all sources' });
    }
  } catch (error) {
    console.error('Error running scraper:', error);
    return NextResponse.json({ error: 'Failed to run scraper' }, { status: 500 });
  }
}