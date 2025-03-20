// Simple in-memory database for the application
// In a real-world application, this would use a proper database like MongoDB or PostgreSQL

import { NewsArticleData, NewsCategory, NewsTag } from './types';

// News database collections
interface Database {
  articles: NewsArticleData[];
  categories: Record<string, NewsCategory>;
  tags: Record<string, NewsTag>;
  // Store last scrape time for each source to prevent duplicate articles
  lastScrape: Record<string, {
    timestamp: number;
    urls: string[];
  }>;
}

// Initialize the database with default values
const db: Database = {
  articles: [],
  categories: {
    'miasto': {id: 'miasto', name: 'Miasto', slug: 'miasto', color: 'primary.main'},
    'kultura': {id: 'kultura', name: 'Kultura', slug: 'kultura', color: 'secondary.main'},
    'sport': {id: 'sport', name: 'Sport', slug: 'sport', color: 'success.main'},
    'inwestycje': {id: 'inwestycje', name: 'Inwestycje', slug: 'inwestycje', color: 'warning.main'},
    'edukacja': {id: 'edukacja', name: 'Edukacja', slug: 'edukacja', color: 'info.main'},
    'zdrowie': {id: 'zdrowie', name: 'Zdrowie', slug: 'zdrowie', color: 'error.main'},
    'inne': {id: 'inne', name: 'Inne', slug: 'inne', color: 'grey.600'},
  },
  tags: {
    'miasto': {id: 'miasto', name: 'Miasto', slug: 'miasto'},
    'inwestycje': {id: 'inwestycje', name: 'Inwestycje', slug: 'inwestycje'},
    'koncert': {id: 'koncert', name: 'Koncert', slug: 'koncert'},
    'sport': {id: 'sport', name: 'Sport', slug: 'sport'},
    'edukacja': {id: 'edukacja', name: 'Edukacja', slug: 'edukacja'},
    'kultura': {id: 'kultura', name: 'Kultura', slug: 'kultura'},
    'zdrowie': {id: 'zdrowie', name: 'Zdrowie', slug: 'zdrowie'},
    'wydarzenia': {id: 'wydarzenia', name: 'Wydarzenia', slug: 'wydarzenia'},
    'rada-miasta': {id: 'rada-miasta', name: 'Rada Miasta', slug: 'rada-miasta'},
    'infrastruktura': {id: 'infrastruktura', name: 'Infrastruktura', slug: 'infrastruktura'},
  },
  lastScrape: {}
};

// Database operations

// Articles
export const getArticles = () => [...db.articles];
export const getArticleBySlug = (slug: string) => db.articles.find(a => a.slug === slug) || null;
export const getArticlesByCategory = (categoryId: string) => db.articles.filter(a => a.categoryId === categoryId);
export const getArticlesByTag = (tagId: string) => db.articles.filter(a => a.tagIds.includes(tagId));
export const getFeaturedArticles = () => db.articles.filter(a => a.featured);

export const addArticle = (article: Omit<NewsArticleData, 'id'>) => {
  // Generate a unique ID for new articles
  const id = crypto.randomUUID();
  const newArticle: NewsArticleData = { ...article, id };
  
  // Add the article to the database
  db.articles.push(newArticle);
  
  // Sort articles by date (newest first)
  db.articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  // Limit to 100 articles to prevent memory issues
  if (db.articles.length > 100) {
    db.articles = db.articles.slice(0, 100);
  }
  
  return newArticle;
};

export const updateArticle = (id: string, updates: Partial<NewsArticleData>) => {
  const index = db.articles.findIndex(a => a.id === id);
  if (index === -1) return null;
  
  db.articles[index] = { ...db.articles[index], ...updates };
  return db.articles[index];
};

export const deleteArticle = (id: string) => {
  const initialLength = db.articles.length;
  db.articles = db.articles.filter(a => a.id !== id);
  return db.articles.length < initialLength;
};

// Categories
export const getCategories = () => Object.values(db.categories);
export const getCategoryById = (id: string) => db.categories[id] || null;
export const getCategoryBySlug = (slug: string) => {
  const found = Object.values(db.categories).find(c => c.slug === slug);
  return found || null;
};

export const addCategory = (category: Omit<NewsCategory, 'id'>) => {
  const id = category.slug; // Use slug as ID for simplicity
  db.categories[id] = { ...category, id };
  return db.categories[id];
};

// Tags
export const getTags = () => Object.values(db.tags);
export const getTagById = (id: string) => db.tags[id] || null;
export const getTagBySlug = (slug: string) => {
  const found = Object.values(db.tags).find(t => t.slug === slug);
  return found || null;
};

export const addTag = (tag: Omit<NewsTag, 'id'>) => {
  const id = tag.slug; // Use slug as ID for simplicity
  db.tags[id] = { ...tag, id };
  return db.tags[id];
};

// Scrape tracking
export const getLastScrape = (sourceName: string) => db.lastScrape[sourceName] || null;

export const updateLastScrape = (sourceName: string, urls: string[]) => {
  db.lastScrape[sourceName] = {
    timestamp: Date.now(),
    urls
  };
  return db.lastScrape[sourceName];
};

// Export the database interface for type usage
export type { Database };