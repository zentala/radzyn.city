import { NewsArticleData } from '../utils/types';
import { addNewsArticle } from './newsService';
import * as cheerio from 'cheerio';
import puppeteer from 'puppeteer';
import * as db from '../utils/db';
import { analyzeContent, categorizeArticle, extractTags as aiExtractTags, generateSummary } from './aiService';

// Interface for a scraper configuration
interface ScraperConfig {
  sourceName: string;
  sourceUrl: string;
  selectors: {
    articles: string;
    title: string;
    content: string;
    date: string;
    image?: string;
    link?: string;
  };
  // How often to scrape (in minutes)
  scrapeInterval: number;
  // Whether to use puppeteer (for JS-heavy sites) instead of simple fetch
  usePuppeteer?: boolean;
  // Whether to follow links to scrape full article content
  followLinks?: boolean;
  // Date format pattern to parse
  dateFormat?: string;
}

// Configuration for each source we want to scrape
const scraperConfigs: ScraperConfig[] = [
  {
    sourceName: 'Radzyń Info',
    sourceUrl: 'https://example.com/radzyn-info',
    selectors: {
      articles: '.article-item',
      title: '.article-title',
      content: '.article-content',
      date: '.article-date',
      image: '.article-image img',
      link: '.article-title a'
    },
    scrapeInterval: 60, // Check every hour
    usePuppeteer: false,
    followLinks: true
  },
  {
    sourceName: 'Radzyń Podlaski (Oficjalna strona)',
    sourceUrl: 'https://www.radzyn-podl.pl',
    selectors: {
      articles: '.news-item',
      title: '.news-title',
      content: '.news-text',
      date: '.news-date',
      image: '.news-image img',
      link: '.news-title a'
    },
    scrapeInterval: 120, // Check every 2 hours
    usePuppeteer: false,
    followLinks: true
  }
];

// Generate a slug from a title
const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim();
};

// Format a date string based on various potential input formats
const formatDate = (dateStr: string): string => {
  // Try to parse the date using different patterns
  try {
    let date: Date;
    
    // Check if the date is already in ISO format
    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(dateStr)) {
      return dateStr;
    }
    
    // Polish date format: "dd.mm.yyyy" or "dd.mm.yyyy hh:mm"
    if (/^\d{1,2}\.\d{1,2}\.\d{4}/.test(dateStr)) {
      const [datePart, timePart] = dateStr.split(' ');
      const [day, month, year] = datePart.split('.').map(Number);
      
      if (timePart) {
        const [hour, minute] = timePart.split(':').map(Number);
        date = new Date(year, month - 1, day, hour, minute);
      } else {
        date = new Date(year, month - 1, day);
      }
      
      return date.toISOString();
    }
    
    // Try standard Date parsing as a fallback
    date = new Date(dateStr);
    if (!isNaN(date.getTime())) {
      return date.toISOString();
    }
    
    // If all else fails, use current date
    return new Date().toISOString();
  } catch (error) {
    console.error('Error parsing date:', dateStr, error);
    return new Date().toISOString();
  }
};

// Fetch HTML content with fetch API
const fetchHtml = async (url: string): Promise<string> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }
  return await response.text();
};

// Fetch HTML content with puppeteer for JavaScript-heavy sites
const fetchHtmlWithPuppeteer = async (url: string): Promise<string> => {
  console.log(`Starting puppeteer to fetch: ${url}`);
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    
    // Wait a bit to ensure all content is loaded
    await page.waitForTimeout(2000);
    
    const content = await page.content();
    return content;
  } finally {
    await browser.close();
    console.log(`Puppeteer closed for: ${url}`);
  }
};

// Extract the value of an attribute from a selected element
const extractAttribute = ($element: cheerio.Cheerio, selector: string, attribute: string): string | null => {
  const el = $element.find(selector);
  if (el.length === 0) return null;
  return el.attr(attribute) || null;
};

// Resolve relative URLs to absolute URLs
const resolveUrl = (baseUrl: string, relativeUrl: string | null): string | null => {
  if (!relativeUrl) return null;
  if (relativeUrl.startsWith('http')) return relativeUrl;
  
  try {
    const url = new URL(relativeUrl, baseUrl);
    return url.toString();
  } catch (error) {
    console.error(`Error resolving URL ${relativeUrl} with base ${baseUrl}:`, error);
    return null;
  }
};

// Scrape a single article's full content by following its link
const scrapeArticleContent = async (
  articleUrl: string,
  config: ScraperConfig
): Promise<{ content: string, imageUrl: string | null }> => {
  try {
    const html = config.usePuppeteer 
      ? await fetchHtmlWithPuppeteer(articleUrl)
      : await fetchHtml(articleUrl);
    
    const $ = cheerio.load(html);
    
    // Extract the full content
    const contentEl = $(config.selectors.content);
    const content = contentEl.text().trim();
    
    // Extract image if available
    let imageUrl: string | null = null;
    if (config.selectors.image) {
      const imgEl = $(config.selectors.image);
      imageUrl = imgEl.attr('src') || null;
      
      if (imageUrl) {
        imageUrl = resolveUrl(articleUrl, imageUrl);
      }
    }
    
    return { content, imageUrl };
  } catch (error) {
    console.error(`Error scraping article content from ${articleUrl}:`, error);
    return { content: '', imageUrl: null };
  }
};

// Scrape articles from a source
export const scrapeSource = async (config: ScraperConfig): Promise<void> => {
  try {
    console.log(`Scraping ${config.sourceName} at ${config.sourceUrl}`);
    
    // Check if we've scraped this source recently to avoid duplicates
    const lastScrape = db.getLastScrape(config.sourceName);
    const now = Date.now();
    
    if (lastScrape && (now - lastScrape.timestamp < config.scrapeInterval * 60 * 1000)) {
      console.log(`Skipping ${config.sourceName} - scraped recently (${Math.round((now - lastScrape.timestamp) / 60000)} minutes ago)`);
      return;
    }
    
    // Fetch the HTML from the source
    const html = config.usePuppeteer 
      ? await fetchHtmlWithPuppeteer(config.sourceUrl)
      : await fetchHtml(config.sourceUrl);
    
    // Parse the HTML with cheerio
    const $ = cheerio.load(html);
    
    // Find all article elements
    const articleElements = $(config.selectors.articles);
    console.log(`Found ${articleElements.length} potential articles on ${config.sourceName}`);
    
    if (articleElements.length === 0) {
      console.warn(`No articles found on ${config.sourceName} using selector ${config.selectors.articles}`);
      return;
    }
    
    // Track scraped URLs to avoid duplicates
    const scrapedUrls: string[] = [];
    
    // Process each article element
    const scrapedArticlesPromises = Array.from(articleElements).map(async (element, index) => {
      try {
        const $element = $(element);
        
        // Extract title
        const title = $element.find(config.selectors.title).text().trim();
        if (!title) {
          console.warn(`Skipping article with empty title at index ${index}`);
          return null;
        }
        
        // Extract article link if available
        let articleUrl: string | null = null;
        if (config.selectors.link) {
          const linkHref = extractAttribute($element, config.selectors.link, 'href');
          articleUrl = resolveUrl(config.sourceUrl, linkHref);
        }
        
        // Skip if we've already processed this URL
        if (articleUrl && lastScrape && lastScrape.urls.includes(articleUrl)) {
          console.log(`Skipping already scraped article: ${title}`);
          scrapedUrls.push(articleUrl);
          return null;
        }
        
        // Extract date
        let dateText = $element.find(config.selectors.date).text().trim();
        let date = formatDate(dateText);
        
        // Extract content and image
        let content: string;
        let imageUrl: string | null = null;
        
        // If we should follow links to get full content
        if (config.followLinks && articleUrl) {
          const articleData = await scrapeArticleContent(articleUrl, config);
          content = articleData.content;
          imageUrl = articleData.imageUrl;
        } else {
          // Just extract the content from the list page
          content = $element.find(config.selectors.content).text().trim();
          
          // Extract image if available
          if (config.selectors.image) {
            const imgSrc = extractAttribute($element, config.selectors.image, 'src');
            imageUrl = resolveUrl(config.sourceUrl, imgSrc);
          }
        }
        
        // Skip if we couldn't extract meaningful content
        if (!content || content.length < 20) {
          console.warn(`Skipping article with insufficient content: ${title}`);
          return null;
        }
        
        // Generate slug
        const slug = generateSlug(title);
        
        // Use AI to categorize and extract tags
        const categoryId = await categorizeArticle(title, content);
        const tagIds = await aiExtractTags(title, content);
        
        // Generate a summary if content is long
        const summary = content.length > 200
          ? await generateSummary(content)
          : content.split('.')[0] + '.';
        
        // Get AI analysis
        const aiAnalysis = await analyzeContent(title, content);
        
        // Create article data
        const articleData: Omit<NewsArticleData, 'id'> = {
          title,
          summary,
          content,
          date,
          sourceUrl: articleUrl || config.sourceUrl,
          sourceName: config.sourceName,
          categoryId,
          tagIds,
          slug,
          featured: index === 0, // First article is featured
          imageUrl,
          aiAnalysis
        };
        
        // If this article has a URL, add it to scraped URLs
        if (articleUrl) {
          scrapedUrls.push(articleUrl);
        }
        
        return articleData;
      } catch (error) {
        console.error(`Error processing article at index ${index}:`, error);
        return null;
      }
    });
    
    // Wait for all article promises to resolve
    const scrapedArticles = (await Promise.all(scrapedArticlesPromises)).filter(Boolean) as Omit<NewsArticleData, 'id'>[];
    
    console.log(`Processed ${scrapedArticles.length} valid articles from ${config.sourceName}`);
    
    // Save the scraped articles to the database
    for (const article of scrapedArticles) {
      await addNewsArticle(article);
    }
    
    // Update last scrape time and URLs
    db.updateLastScrape(config.sourceName, scrapedUrls);
    
    console.log(`Successfully scraped ${scrapedArticles.length} articles from ${config.sourceName}`);
  } catch (error) {
    console.error(`Error scraping ${config.sourceName}:`, error);
  }
};

// Start the scraper for all configured sources
export const startScrapers = async (): Promise<void> => {
  console.log('Starting news scrapers...');
  
  // Initial scrape of all sources
  for (const config of scraperConfigs) {
    await scrapeSource(config);
  }
  
  // Note: In a production environment, we would NOT set up intervals here.
  // Instead, we would use a separate cron job or scheduled task to run the
  // scraper at regular intervals. Setting intervals here is only for development
  // and demo purposes and might cause memory leaks in long-running applications.
  
  // Only set up intervals if we're running in a browser environment
  if (typeof window !== 'undefined') {
    // Clear any existing intervals
    if ((global as any).__scraperIntervals) {
      (global as any).__scraperIntervals.forEach(clearInterval);
    }
    
    (global as any).__scraperIntervals = [];
    
    // Set up interval scraping for demo purposes
    scraperConfigs.forEach(config => {
      const interval = setInterval(() => {
        scrapeSource(config).catch(console.error);
      }, config.scrapeInterval * 60 * 1000); // Convert minutes to milliseconds
      
      (global as any).__scraperIntervals.push(interval);
    });
    
    console.log('Demo scraper intervals set up for browser environment');
  } else {
    console.log('Running in server environment - no intervals set up');
  }
  
  console.log('News scrapers started successfully');
};

// Stop all running scrapers (used for cleanup)
export const stopScrapers = (): void => {
  console.log('Stopping news scrapers...');
  
  if (typeof window !== 'undefined' && (global as any).__scraperIntervals) {
    (global as any).__scraperIntervals.forEach(clearInterval);
    (global as any).__scraperIntervals = [];
    console.log('All scraper intervals cleared');
  }
};

// Export the scraperConfigs for testing or admin panels
export const getScraperConfigs = (): ScraperConfig[] => {
  return [...scraperConfigs];
};

// Add or update a scraper configuration
export const updateScraperConfig = (config: ScraperConfig): ScraperConfig => {
  const existingIndex = scraperConfigs.findIndex(c => c.sourceName === config.sourceName);
  
  if (existingIndex !== -1) {
    // Update existing config
    scraperConfigs[existingIndex] = {
      ...scraperConfigs[existingIndex],
      ...config
    };
    return scraperConfigs[existingIndex];
  } else {
    // Add new config
    scraperConfigs.push(config);
    return config;
  }
};

// Remove a scraper configuration
export const removeScraperConfig = (sourceName: string): boolean => {
  const initialLength = scraperConfigs.length;
  const newConfigs = scraperConfigs.filter(c => c.sourceName !== sourceName);
  
  if (newConfigs.length !== initialLength) {
    // Update the array in place
    scraperConfigs.length = 0;
    scraperConfigs.push(...newConfigs);
    return true;
  }
  
  return false;
};