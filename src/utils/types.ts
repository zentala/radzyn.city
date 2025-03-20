// News types
export interface NewsCategory {
  id: string;
  name: string;
  slug: string;
  color: string;
}

export interface NewsTag {
  id: string;
  name: string;
  slug: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  date: string;
  sourceUrl: string;
  sourceName: string;
  category: NewsCategory;
  tags: NewsTag[];
  slug: string;
  featured: boolean;
  imageUrl?: string;
  aiAnalysis?: {
    sentiment: 'positive' | 'neutral' | 'negative';
    keywords: string[];
    readingTimeMinutes: number;
    relevanceScore: number;
  };
}

// For storing news articles in database
export interface NewsArticleData {
  id: string;
  title: string;
  summary: string;
  content: string;
  date: string;
  sourceUrl: string;
  sourceName: string;
  categoryId: string;
  tagIds: string[];
  slug: string;
  featured: boolean;
  imageUrl?: string;
  aiAnalysis?: {
    sentiment: 'positive' | 'neutral' | 'negative';
    keywords: string[];
    readingTimeMinutes: number;
    relevanceScore: number;
  };
}