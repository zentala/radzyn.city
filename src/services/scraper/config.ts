import { ScraperConfig } from '../scraperService';

export const NEWS_SOURCES_CONFIG: Record<string, ScraperConfig> = {
  iledzisiaj: {
    sourceName: 'iledzisiaj.pl',
    sourceUrl: 'https://www.iledzisiaj.pl/',
    scrapeInterval: 360, // 6 hours
    usePuppeteer: false,
    followLinks: true,
    selectors: {
      articles: '.item, .blog-featured .items-row > div',
      title: 'h2, .contentpagetitle',
      link: 'a',
      date: '.createdate, .published',
      content: '.article-content, .item-page',
      image: 'img'
    }
  },
  wspolnota: {
    sourceName: 'Wspólnota Radzyńska',
    sourceUrl: 'https://radzyn.24wspolnota.pl/',
    scrapeInterval: 360,
    usePuppeteer: true, // Often needs JS
    followLinks: true,
    selectors: {
      articles: 'article, .article-card',
      title: 'h2, h3',
      link: 'a',
      date: 'time',
      content: '.article-body, .content',
      image: 'img'
    }
  },
  kochamradzyn: {
    sourceName: 'kochamradzyn.pl',
    sourceUrl: 'https://kochamradzyn.pl/',
    scrapeInterval: 1440,
    usePuppeteer: false,
    followLinks: true,
    selectors: {
      articles: '.item-column',
      title: 'h2',
      link: 'a',
      date: '.create',
      content: '.item-page',
      image: 'img'
    }
  },
  biblioteka: {
    sourceName: 'MBP Radzyń',
    sourceUrl: 'https://mbpradzyn.pl/category/aktualnosci-2/',
    scrapeInterval: 4320, // 3 days
    usePuppeteer: false,
    followLinks: true,
    selectors: {
      articles: 'article',
      title: '.entry-title',
      link: 'a',
      date: '.entry-date',
      content: '.entry-content',
      image: 'img'
    }
  }
};
