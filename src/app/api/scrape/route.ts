import { NextResponse } from 'next/server';
import { startScrapers, scrapeSource, getScraperConfigs } from '@/services/scraperService';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const source = searchParams.get('source');
    
    if (source) {
      // Scrape a specific source
      const configs = getScraperConfigs();
      const sourceEntry = Object.entries(configs).find(([id, config]) => 
        id.toLowerCase() === source.toLowerCase() || 
        config.sourceName.toLowerCase() === source.toLowerCase()
      );
      
      if (!sourceEntry) {
        return NextResponse.json({ error: 'Source not found' }, { status: 404 });
      }
      
      const [sourceId, sourceConfig] = sourceEntry;
      await scrapeSource(sourceConfig, sourceId);
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