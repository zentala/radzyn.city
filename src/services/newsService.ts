import { NewsArticle, NewsArticleData, NewsCategory, NewsTag } from '../utils/types';
import { supabase } from '../lib/supabase';

// Convert database article to full article with resolved relations
const mapArticleWithRelations = (article: any): NewsArticle => {
  return {
    id: article.id,
    title: article.title,
    summary: article.summary,
    content: article.content,
    date: article.published_at,
    sourceUrl: article.source_url,
    sourceName: article.source_name,
    category: article.news_categories || { 
      id: 'unknown',
      name: 'Nieznana kategoria',
      slug: 'unknown',
      color: 'grey.500'
    },
    tags: [], // Tags handling can be improved if we add a news_tags table or use the array
    slug: article.slug,
    featured: article.featured || false,
    imageUrl: article.image_url,
    aiAnalysis: article.ai_analysis
  };
};

// Get all news articles
export const getAllNewsArticles = async (): Promise<NewsArticle[]> => {
  const { data, error } = await supabase
    .from('news_articles')
    .select(`
      *,
      news_categories (*)
    `)
    .order('published_at', { ascending: false })
    .limit(50);

  if (error) {
    console.error('Error fetching news from Supabase:', error);
    return [];
  }

  return data.map(mapArticleWithRelations);
};

// Get a specific news article by slug
export const getNewsArticleBySlug = async (slug: string): Promise<NewsArticle | null> => {
  const { data, error } = await supabase
    .from('news_articles')
    .select(`
      *,
      news_categories (*)
    `)
    .eq('slug', slug)
    .single();

  if (error) {
    console.error(`Error fetching article with slug ${slug}:`, error);
    return null;
  }

  return mapArticleWithRelations(data);
};

// Get featured news articles
export const getFeaturedNewsArticles = async (): Promise<NewsArticle[]> => {
  const { data, error } = await supabase
    .from('news_articles')
    .select(`
      *,
      news_categories (*)
    `)
    .eq('featured', true)
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Error fetching featured news:', error);
    return [];
  }

  return data.map(mapArticleWithRelations);
};

// Get news articles by category
export const getNewsArticlesByCategory = async (categorySlug: string): Promise<NewsArticle[]> => {
  const { data: category } = await supabase
    .from('news_categories')
    .select('id')
    .eq('slug', categorySlug)
    .single();

  if (!category) return [];

  const { data, error } = await supabase
    .from('news_articles')
    .select(`
      *,
      news_categories (*)
    `)
    .eq('category_id', category.id)
    .order('published_at', { ascending: false });

  if (error) {
    console.error(`Error fetching news by category ${categorySlug}:`, error);
    return [];
  }

  return data.map(mapArticleWithRelations);
};

// Get all categories
export const getAllCategories = async (): Promise<NewsCategory[]> => {
  const { data, error } = await supabase
    .from('news_categories')
    .select('*')
    .order('name');

  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }

  return data;
};

// The following methods are now handled via direct Supabase calls in scraperService
// keeping them for compatibility if needed, but they should be updated to use Supabase

export const addNewsArticle = async (article: Omit<NewsArticleData, 'id'>): Promise<any> => {
  const { data, error } = await supabase
    .from('news_articles')
    .insert(article)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};
