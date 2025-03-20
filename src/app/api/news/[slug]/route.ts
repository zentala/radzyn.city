import { NextResponse } from 'next/server';
import { getNewsArticleBySlug } from '@/services/newsService';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug;
  
  try {
    const article = await getNewsArticleBySlug(slug);
    
    if (!article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }
    
    return NextResponse.json({ article });
  } catch (error) {
    console.error(`Error fetching article with slug ${slug}:`, error);
    return NextResponse.json({ error: 'Failed to fetch article' }, { status: 500 });
  }
}