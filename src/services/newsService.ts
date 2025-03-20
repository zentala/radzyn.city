import { NewsArticle, NewsArticleData, NewsCategory, NewsTag } from '../utils/types';
import * as db from '../utils/db';

// Convert database article to full article with resolved relations
const mapArticleWithRelations = (article: NewsArticleData): NewsArticle => {
  return {
    ...article,
    category: db.getCategoryById(article.categoryId) || { 
      id: 'unknown',
      name: 'Nieznana kategoria',
      slug: 'unknown',
      color: 'grey.500'
    },
    tags: article.tagIds
      .map(id => db.getTagById(id))
      .filter((tag): tag is NewsTag => tag !== null)
  };
};

// Get all news articles
export const getAllNewsArticles = async (): Promise<NewsArticle[]> => {
  // Try to fetch from API first (client-side)
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
  
  // Fallback to database
  return db.getArticles().map(mapArticleWithRelations);
};

// Get a specific news article by slug
export const getNewsArticleBySlug = async (slug: string): Promise<NewsArticle | null> => {
  // Try to fetch from API first (client-side)
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
  
  // Fallback to database
  const article = db.getArticleBySlug(slug);
  return article ? mapArticleWithRelations(article) : null;
};

// Get featured news articles
export const getFeaturedNewsArticles = async (): Promise<NewsArticle[]> => {
  // Try to fetch from API first (client-side)
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
  
  // Fallback to database
  return db.getFeaturedArticles().map(mapArticleWithRelations);
};

// Get news articles by category
export const getNewsArticlesByCategory = async (categorySlug: string): Promise<NewsArticle[]> => {
  // Try to fetch from API first (client-side)
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
  
  // Fallback to database
  const category = db.getCategoryBySlug(categorySlug);
  if (!category) return [];
  
  return db.getArticlesByCategory(category.id).map(mapArticleWithRelations);
};

// Get news articles by tag
export const getNewsArticlesByTag = async (tagSlug: string): Promise<NewsArticle[]> => {
  // Try to fetch from API first (client-side)
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
  
  // Fallback to database
  const tag = db.getTagBySlug(tagSlug);
  if (!tag) return [];
  
  return db.getArticlesByTag(tag.id).map(mapArticleWithRelations);
};

// Get all categories
export const getAllCategories = async (): Promise<NewsCategory[]> => {
  // Try to fetch from API first (client-side)
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
  
  // Fallback to database
  return db.getCategories();
};

// Get all tags
export const getAllTags = async (): Promise<NewsTag[]> => {
  // Try to fetch from API first (client-side)
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
  
  // Fallback to database
  return db.getTags();
};

// Add a new news article (this would typically be called by the scraper)
export const addNewsArticle = async (article: Omit<NewsArticleData, 'id'>): Promise<NewsArticle> => {
  const newArticle = db.addArticle(article);
  return mapArticleWithRelations(newArticle);
};

// Update a news article
export const updateNewsArticle = async (id: string, article: Partial<NewsArticleData>): Promise<NewsArticle | null> => {
  const updated = db.updateArticle(id, article);
  return updated ? mapArticleWithRelations(updated) : null;
};

// Delete a news article
export const deleteNewsArticle = async (id: string): Promise<boolean> => {
  return db.deleteArticle(id);
};