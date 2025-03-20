import { NextResponse } from 'next/server';
import { getAllNewsArticles, getFeaturedNewsArticles, getNewsArticlesByCategory, getNewsArticlesByTag } from '@/services/newsService';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const tag = searchParams.get('tag');
  const featured = searchParams.get('featured') === 'true';
  
  try {
    let articles;
    
    if (featured) {
      articles = await getFeaturedNewsArticles();
    } else if (category) {
      articles = await getNewsArticlesByCategory(category);
    } else if (tag) {
      articles = await getNewsArticlesByTag(tag);
    } else {
      articles = await getAllNewsArticles();
    }
    
    return NextResponse.json({ articles });
  } catch (error) {
    console.error('Error fetching news articles:', error);
    return NextResponse.json({ error: 'Failed to fetch news articles' }, { status: 500 });
  }
}