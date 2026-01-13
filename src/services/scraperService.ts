import { NewsArticleData } from '../utils/types';
import * as cheerio from 'cheerio';
import { supabase } from '../lib/supabase';
import { analyzeContent, categorizeArticle, extractTags as aiExtractTags, generateSummary } from './aiService';
import { NEWS_SOURCES_CONFIG } from './scraper/config';

// Dynamically import puppeteer only in server context
let puppeteer: any = null;
if (typeof window === 'undefined') {
  import('puppeteer').then(module => {
    puppeteer = module.default;
  }).catch(err => {
    console.error('Failed to import puppeteer:', err);
  });
}

export interface ScraperConfig {
  sourceId?: string;
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
  scrapeInterval: number;
  usePuppeteer?: boolean;
  followLinks?: boolean;
  dateFormat?: string;
}

// Generate a slug from a title
const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim();
};

// Format a date string
const formatDate = (dateStr: string): string => {
  try {
    let date: Date;
    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(dateStr)) {
      return dateStr;
    }
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
    date = new Date(dateStr);
    return isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
  } catch (error) {
    return new Date().toISOString();
  }
};

// Fetch HTML
const fetchHtml = async (url: string): Promise<string> => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch ${url}: ${response.status}`);
  return await response.text();
};

// Fetch HTML with Puppeteer
const fetchHtmlWithPuppeteer = async (url: string): Promise<string> => {
  if (typeof window !== 'undefined' || !puppeteer) return fetchHtml(url);
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  try {
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    return await page.content();
  } finally {
    await browser.close();
  }
};

const resolveUrl = (baseUrl: string, relativeUrl: string | null): string | null => {
  if (!relativeUrl) return null;
  if (relativeUrl.startsWith('http')) return relativeUrl;
  try {
    return new URL(relativeUrl, baseUrl).toString();
  } catch {
    return null;
  }
};

const scrapeArticleContent = async (articleUrl: string, config: ScraperConfig): Promise<{ content: string, imageUrl: string | null }> => {
  try {
    const html = config.usePuppeteer ? await fetchHtmlWithPuppeteer(articleUrl) : await fetchHtml(articleUrl);
    const $ = cheerio.load(html);
    const content = $(config.selectors.content).text().trim();
    let imageUrl: string | null = null;
    if (config.selectors.image) {
      imageUrl = resolveUrl(articleUrl, $(config.selectors.image).attr('src') || null);
    }
    return { content, imageUrl };
  } catch (error) {
    console.error(`Error scraping ${articleUrl}:`, error);
    return { content: '', imageUrl: null };
  }
};

export const scrapeSource = async (config: ScraperConfig, sourceId: string): Promise<void> => {
  try {
    console.log(`Scraping ${config.sourceName} (${sourceId})`);

    // Check last scrape from Supabase
    const { data: sourceData } = await supabase
      .from('news_sources')
      .select('last_scrape_at, frequency_minutes')
      .eq('id', sourceId)
      .single();

    if (sourceData?.last_scrape_at) {
      const lastScrape = new Date(sourceData.last_scrape_at).getTime();
      const now = Date.now();
      if (now - lastScrape < (sourceData.frequency_minutes || config.scrapeInterval) * 60 * 1000) {
        console.log(`Skipping ${config.sourceName} - too soon`);
        return;
      }
    }

    const html = config.usePuppeteer ? await fetchHtmlWithPuppeteer(config.sourceUrl) : await fetchHtml(config.sourceUrl);
    const $ = cheerio.load(html);
    const articleElements = $(config.selectors.articles);

    for (const element of Array.from(articleElements)) {
      try {
        const $el = $(element);
        const title = $el.find(config.selectors.title).text().trim();
        if (!title) continue;

        let articleUrl = resolveUrl(config.sourceUrl, $el.find(config.selectors.link || 'a').attr('href') || null);
        if (!articleUrl) continue;

        // Deduplication check
        const { data: existing } = await supabase
          .from('news_articles')
          .select('id')
          .eq('source_url', articleUrl)
          .maybeSingle();

        if (existing) {
          console.log(`Already have: ${title}`);
          continue;
        }

        console.log(`New article found: ${title}`);
        
        let content: string;
        let imageUrl: string | null = null;

        if (config.followLinks) {
          const detailed = await scrapeArticleContent(articleUrl, config);
          content = detailed.content;
          imageUrl = detailed.imageUrl;
        } else {
          content = $el.find(config.selectors.content).text().trim();
          imageUrl = resolveUrl(config.sourceUrl, $el.find(config.selectors.image || 'img').attr('src') || null);
        }

        if (!content || content.length < 20) continue;

        const date = formatDate($el.find(config.selectors.date).text().trim());
        const slug = generateSlug(title);
        const categoryId = await categorizeArticle(title, content);
        const tagIds = await aiExtractTags(title, content);
        const summary = content.length > 200 ? await generateSummary(content) : content;
        const aiAnalysis = await analyzeContent(title, content);

        const { error: insertError } = await supabase
          .from('news_articles')
          .insert({
            title,
            summary,
            content,
            published_at: date,
            source_url: articleUrl,
            source_name: config.sourceName,
            source_id: sourceId,
            category_id: categoryId,
            tag_ids: tagIds,
            slug,
            image_url: imageUrl,
            ai_analysis: aiAnalysis
          });

        if (insertError) console.error(`Error saving ${title}:`, insertError);
        else console.log(`Saved: ${title}`);

      } catch (err) {
        console.error('Error processing element:', err);
      }
    }

    // Update last scrape time
    await supabase
      .from('news_sources')
      .update({ last_scrape_at: new Date().toISOString() })
      .eq('id', sourceId);

  } catch (error) {
    console.error(`Scrape failed for ${config.sourceName}:`, error);
  }
};

export const startScrapers = async (): Promise<void> => {
  if (typeof window !== 'undefined') return;
  console.log('Starting scrapers...');
  for (const [id, config] of Object.entries(NEWS_SOURCES_CONFIG)) {
    await scrapeSource(config, id);
  }
};

export const getScraperConfigs = () => {
  console.log('DEBUG: getScraperConfigs called, keys:', Object.keys(NEWS_SOURCES_CONFIG));
  return NEWS_SOURCES_CONFIG;
};
