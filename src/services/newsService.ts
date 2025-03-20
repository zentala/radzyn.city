import { NewsArticle, NewsArticleData, NewsCategory, NewsTag } from '../utils/types';

// Mock database for categories and tags (this would be in a real database)
const categories: Record<string, NewsCategory> = {
  'miasto': {id: 'miasto', name: 'Miasto', slug: 'miasto', color: 'bg-blue-100 text-blue-800 border-blue-200'},
  'kultura': {id: 'kultura', name: 'Kultura', slug: 'kultura', color: 'bg-purple-100 text-purple-800 border-purple-200'},
  'sport': {id: 'sport', name: 'Sport', slug: 'sport', color: 'bg-green-100 text-green-800 border-green-200'},
  'inwestycje': {id: 'inwestycje', name: 'Inwestycje', slug: 'inwestycje', color: 'bg-amber-100 text-amber-800 border-amber-200'},
  'edukacja': {id: 'edukacja', name: 'Edukacja', slug: 'edukacja', color: 'bg-indigo-100 text-indigo-800 border-indigo-200'},
};

const tags: Record<string, NewsTag> = {
  'miasto': {id: 'miasto', name: 'Miasto', slug: 'miasto'},
  'inwestycje': {id: 'inwestycje', name: 'Inwestycje', slug: 'inwestycje'},
  'koncert': {id: 'koncert', name: 'Koncert', slug: 'koncert'},
  'sport': {id: 'sport', name: 'Sport', slug: 'sport'},
  'edukacja': {id: 'edukacja', name: 'Edukacja', slug: 'edukacja'},
  'kultura': {id: 'kultura', name: 'Kultura', slug: 'kultura'},
};

// This would be stored in a real database
let newsArticlesDb: NewsArticleData[] = [];

// Convert database article to full article with resolved relations
const mapArticleWithRelations = (article: NewsArticleData): NewsArticle => {
  return {
    ...article,
    category: categories[article.categoryId],
    tags: article.tagIds.map(id => tags[id]).filter(Boolean)
  };
};

// Get all news articles
export const getAllNewsArticles = async (): Promise<NewsArticle[]> => {
  // First try to fetch from API (for server-side rendering)
  if (typeof window !== 'undefined') {
    try {
      const response = await fetch('/api/news');
      if (response.ok) {
        const data = await response.json();
        return data.articles;
      }
    } catch (error) {
      console.error('Error fetching news from API:', error);
    }
  }
  
  // Fallback to in-memory database (for development/mock data)
  return newsArticlesDb.map(mapArticleWithRelations);
};

// Get a specific news article by slug
export const getNewsArticleBySlug = async (slug: string): Promise<NewsArticle | null> => {
  // First try to fetch from API (for server-side rendering)
  if (typeof window !== 'undefined') {
    try {
      const response = await fetch(`/api/news/${slug}`);
      if (response.ok) {
        const data = await response.json();
        return data.article;
      }
    } catch (error) {
      console.error(`Error fetching article with slug ${slug} from API:`, error);
    }
  }
  
  // Fallback to in-memory database (for development/mock data)
  const article = newsArticlesDb.find(article => article.slug === slug);
  return article ? mapArticleWithRelations(article) : null;
};

// Get featured news articles
export const getFeaturedNewsArticles = async (): Promise<NewsArticle[]> => {
  // First try to fetch from API (for server-side rendering)
  if (typeof window !== 'undefined') {
    try {
      const response = await fetch('/api/news?featured=true');
      if (response.ok) {
        const data = await response.json();
        return data.articles;
      }
    } catch (error) {
      console.error('Error fetching featured news from API:', error);
    }
  }
  
  // Fallback to in-memory database (for development/mock data)
  return newsArticlesDb
    .filter(article => article.featured)
    .map(mapArticleWithRelations);
};

// Get news articles by category
export const getNewsArticlesByCategory = async (categorySlug: string): Promise<NewsArticle[]> => {
  // First try to fetch from API (for server-side rendering)
  if (typeof window !== 'undefined') {
    try {
      const response = await fetch(`/api/news?category=${categorySlug}`);
      if (response.ok) {
        const data = await response.json();
        return data.articles;
      }
    } catch (error) {
      console.error(`Error fetching news by category ${categorySlug} from API:`, error);
    }
  }
  
  // Fallback to in-memory database (for development/mock data)
  const categoryId = Object.values(categories).find(cat => cat.slug === categorySlug)?.id;
  if (!categoryId) return [];
  
  return newsArticlesDb
    .filter(article => article.categoryId === categoryId)
    .map(mapArticleWithRelations);
};

// Get news articles by tag
export const getNewsArticlesByTag = async (tagSlug: string): Promise<NewsArticle[]> => {
  // First try to fetch from API (for server-side rendering)
  if (typeof window !== 'undefined') {
    try {
      const response = await fetch(`/api/news?tag=${tagSlug}`);
      if (response.ok) {
        const data = await response.json();
        return data.articles;
      }
    } catch (error) {
      console.error(`Error fetching news by tag ${tagSlug} from API:`, error);
    }
  }
  
  // Fallback to in-memory database (for development/mock data)
  const tagId = Object.values(tags).find(tag => tag.slug === tagSlug)?.id;
  if (!tagId) return [];
  
  return newsArticlesDb
    .filter(article => article.tagIds.includes(tagId))
    .map(mapArticleWithRelations);
};

// Get all categories
export const getAllCategories = async (): Promise<NewsCategory[]> => {
  // First try to fetch from API (for server-side rendering)
  if (typeof window !== 'undefined') {
    try {
      const response = await fetch('/api/news/categories');
      if (response.ok) {
        const data = await response.json();
        return data.categories;
      }
    } catch (error) {
      console.error('Error fetching categories from API:', error);
    }
  }
  
  // Fallback to in-memory database (for development/mock data)
  return Object.values(categories);
};

// Get all tags
export const getAllTags = async (): Promise<NewsTag[]> => {
  // First try to fetch from API (for server-side rendering)
  if (typeof window !== 'undefined') {
    try {
      const response = await fetch('/api/news/tags');
      if (response.ok) {
        const data = await response.json();
        return data.tags;
      }
    } catch (error) {
      console.error('Error fetching tags from API:', error);
    }
  }
  
  // Fallback to in-memory database (for development/mock data)
  return Object.values(tags);
};

// Add a new news article (this would typically be called by the scraper)
export const addNewsArticle = async (article: Omit<NewsArticleData, 'id'>): Promise<NewsArticle> => {
  const id = crypto.randomUUID();
  const newArticle = {
    ...article,
    id
  };
  
  newsArticlesDb.push(newArticle);
  return mapArticleWithRelations(newArticle);
};

// Update a news article
export const updateNewsArticle = async (id: string, article: Partial<NewsArticleData>): Promise<NewsArticle | null> => {
  const index = newsArticlesDb.findIndex(a => a.id === id);
  if (index === -1) return null;
  
  newsArticlesDb[index] = {
    ...newsArticlesDb[index],
    ...article
  };
  
  return mapArticleWithRelations(newsArticlesDb[index]);
};

// Delete a news article
export const deleteNewsArticle = async (id: string): Promise<boolean> => {
  const initialLength = newsArticlesDb.length;
  newsArticlesDb = newsArticlesDb.filter(article => article.id !== id);
  return newsArticlesDb.length < initialLength;
};