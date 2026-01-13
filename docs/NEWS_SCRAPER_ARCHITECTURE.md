# News Scraper System Architecture

## Overview

Multi-source news scraper system for aggregating news from multiple Radzyń Podlaski portals with configurable scraping frequencies and intelligent deduplication.

## Database Schema

### Tables

1. **`news_sources`** - Configuration for each news portal
   - `id` (TEXT, PK) - Unique slug (e.g., 'iledzisiaj', 'wspolnota')
   - `name` - Display name
   - `url` - Base URL to scrape
   - `frequency_minutes` - How often to scrape (360 = 4x/day, 4320 = once per 3 days)
   - `last_scrape_at` - Timestamp of last successful scrape
   - `selectors` (JSONB) - CSS selectors: `{ articles, title, content, date, image, link }`
   - `use_puppeteer` - Whether to use Puppeteer for JS-heavy sites
   - `follow_links` - Whether to follow links to get full article content
   - `is_active` - Enable/disable scraping for this source

2. **`news_articles`** - Scraped articles
   - `id` (UUID, PK)
   - `source_url` (UNIQUE) - **Deduplication key** - prevents duplicate articles
   - `title`, `summary`, `content`
   - `source_name`, `source_id` (FK to news_sources)
   - `published_at` - Original publication date
   - `category_id` (FK to news_categories)
   - `status` - 'draft', 'published', 'archived'
   - `ai_analysis` (JSONB) - AI-generated metadata

3. **`news_categories`** - Article categories
4. **`news_tags`** - Article tags
5. **`news_article_tags`** - Many-to-many relationship

## Scraping Flow

### 1. Scheduling Logic

The scraper checks which sources are "due" for scraping:

```sql
SELECT * FROM news_sources
WHERE is_active = true
  AND (
    last_scrape_at IS NULL
    OR (NOW() - last_scrape_at) > INTERVAL '1 minute' * frequency_minutes
  )
```

### 2. Scraping Process (per source)

1. **Fetch list page** (using `cheerio` or `puppeteer` based on config)
2. **Extract article links** using `selectors.articles` and `selectors.link`
3. **For each article link**:
   - Check if `source_url` already exists in database (deduplication)
   - If new: Fetch full article page (if `follow_links = true`)
   - Extract: title, content, date, image using selectors
   - Process with AI: categorize, extract tags, generate summary
   - Insert into `news_articles` table
4. **Update** `news_sources.last_scrape_at = NOW()`

### 3. Deduplication Strategy

- **Primary key**: `source_url` (UNIQUE constraint)
- Before inserting, check: `SELECT EXISTS(SELECT 1 FROM news_articles WHERE source_url = :url)`
- If exists → skip (already scraped)

## Configuration Example

```json
{
  "id": "iledzisiaj",
  "name": "Ile Dziś",
  "url": "https://www.iledzisiaj.pl/",
  "frequency_minutes": 360,  // 4x per day
  "selectors": {
    "articles": ".item",
    "title": ".contentpagetitle",
    "content": ".article-content",
    "date": ".article-date",
    "link": "a",
    "image": ".article-image img"
  },
  "use_puppeteer": false,
  "follow_links": true
}
```

## Source Frequencies (Recommended)

- **iledzisiaj.pl**: 360 minutes (4x/day)
- **radzyn.24wspolnota.pl**: 360 minutes (4x/day)
- **kochamradzyn.pl**: 1440 minutes (once/day)
- **radzyn-podl.pl**: 1440 minutes (once/day)
- **radzynpodlaski.pl**: 1440 minutes (once/day)
- **mbpradzyn.pl**: 4320 minutes (once per 3 days)
- **radzyn.podlasie24.pl**: 1440 minutes (once/day)

## Implementation Plan

### Phase 1: Database & Core Service
- [x] Create Supabase migration (`20260113000001_news_scraper.sql`)
- [ ] Create `src/services/supabaseNewsService.ts` - Replace in-memory `db.ts` with Supabase calls
- [ ] Update `scraperService.ts` to use Supabase instead of in-memory DB

### Phase 2: Source Configuration
- [ ] Create `src/config/newsSources.ts` - Centralized source configurations
- [ ] Add initial configs for all 7 portals (starting with iledzisiaj.pl)
- [ ] Implement selector testing/debugging tool

### Phase 3: Scheduling
- [ ] Option A: GitHub Actions workflow (`.github/workflows/scrape-news.yml`)
  - Runs every hour
  - Checks which sources are due
  - Calls `/api/scrape?source=id` for each due source
- [ ] Option B: Vercel Cron Jobs (if hosting on Vercel)
- [ ] Option C: Self-hosted cron (using `node-cron` or similar)

### Phase 4: AI Integration
- [ ] Ensure `aiService.ts` works with new Supabase schema
- [ ] Test categorization and tag extraction
- [ ] Generate summaries for long articles

## API Endpoints

### `GET /api/scrape`
- Scrapes all active sources that are due

### `GET /api/scrape?source=iledzisiaj`
- Scrapes specific source (useful for testing)

### `GET /api/news`
- Returns published articles (existing endpoint, update to use Supabase)

## Testing Strategy

1. **Manual testing**: Run `pnpm scrape --source=iledzisiaj` to test one source
2. **Selector validation**: Create admin tool to test selectors on live pages
3. **Deduplication test**: Run scraper twice, verify no duplicates
4. **Frequency test**: Verify sources are scraped at correct intervals

## Future Enhancements

- Admin panel to manage sources and selectors
- Automatic selector detection using ML
- Content similarity detection (to catch duplicates even if URLs differ)
- RSS feed support (if available)
- Email notifications for new articles
- Article moderation workflow
