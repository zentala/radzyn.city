"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getNewsArticleBySlug } from '@/services/newsService';
import { NewsArticle } from '@/utils/types';
import PlaceholderImage from '@/components/PlaceholderImage';

interface NewsDetailPageProps {
  params: {
    slug: string;
  };
}

export default function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { slug } = params;
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setIsLoading(true);
        const data = await getNewsArticleBySlug(slug);
        if (data) {
          setArticle(data);
        } else {
          setError('Article not found');
        }
      } catch (err) {
        console.error('Error fetching article:', err);
        setError('Could not load article');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchArticle();
  }, [slug]);
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 pt-20 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-3/4 mb-6"></div>
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-8"></div>
        <div className="h-64 bg-gray-200 rounded mb-8"></div>
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-4/5"></div>
        </div>
      </div>
    );
  }
  
  if (error || !article) {
    return (
      <div className="container mx-auto px-4 py-8 pt-20">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error || 'Nie znaleziono artykułu'}</p>
            </div>
          </div>
        </div>
        <Link href="/news" className="text-primary hover:text-primary-dark font-medium flex items-center transition-colors">
          &larr; Wróć do aktualności
        </Link>
      </div>
    );
  }
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pl-PL', { 
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };
  
  return (
    <div className="container mx-auto px-4 py-8 pt-20">
      <div className="mb-6">
        <Link 
          href="/news" 
          className="text-gray-500 hover:text-primary flex items-center text-sm mb-2"
        >
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Wróć do aktualności
        </Link>
        
        <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
        
        <div className="flex flex-wrap items-center text-sm text-gray-500 gap-4 mb-6">
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            {formatDate(article.date)}
          </div>
          
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1.581.814L10 13.197l-4.419 2.617A1 1 0 014 15V4zm2-1a1 1 0 00-1 1v10.586l3.723-2.196a1 1 0 011.019 0L14 14.586V4a1 1 0 00-1-1H6z" clipRule="evenodd" />
            </svg>
            Źródło: {article.sourceName}
          </div>
          
          <div className="flex items-center">
            <span className={`text-xs font-medium px-2.5 py-1 rounded border ${article.category.color}`}>
              {article.category.name}
            </span>
          </div>
        </div>
      </div>
      
      {/* Article image */}
      <div className="mb-8 relative h-96">
        <PlaceholderImage
          title={article.title}
          src={article.imageUrl}
          className="w-full h-full object-cover rounded-lg"
          height={384}
          aspectRatio="wide"
        />
      </div>
      
      {/* Article content */}
      <div className="max-w-3xl mx-auto">
        {/* AI analysis box */}
        {article.aiAnalysis && (
          <div className="bg-gray-50 p-4 rounded-lg mb-8 flex flex-wrap gap-4 items-center text-sm">
            <div className="font-medium">AI Analysis:</div>
            
            {article.aiAnalysis.sentiment && (
              <div className={`flex items-center ${
                article.aiAnalysis.sentiment === 'positive' ? 'text-green-600' : 
                article.aiAnalysis.sentiment === 'negative' ? 'text-red-600' : 'text-gray-600'
              }`}>
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  {article.aiAnalysis.sentiment === 'positive' ? (
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  ) : article.aiAnalysis.sentiment === 'negative' ? (
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  ) : (
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                  )}
                </svg>
                Sentiment: {article.aiAnalysis.sentiment.charAt(0).toUpperCase() + article.aiAnalysis.sentiment.slice(1)}
              </div>
            )}
            
            {article.aiAnalysis.readingTimeMinutes && (
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                Reading time: {article.aiAnalysis.readingTimeMinutes} min
              </div>
            )}
            
            {article.aiAnalysis.keywords && article.aiAnalysis.keywords.length > 0 && (
              <div className="flex items-center flex-wrap gap-1">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
                Keywords: 
                {article.aiAnalysis.keywords.map((keyword, index) => (
                  <span key={index} className="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded">
                    {keyword}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
        
        {/* Article text content */}
        <div className="prose max-w-none mb-8">
          {article.content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="mb-4">{paragraph}</p>
          ))}
        </div>
        
        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="mt-8 border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium mb-3">Tagi:</h3>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <Link 
                  key={tag.id} 
                  href={`/news/tag/${tag.slug}`}
                  className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-full transition-colors"
                >
                  #{tag.name}
                </Link>
              ))}
            </div>
          </div>
        )}
        
        {/* Source attribution */}
        <div className="mt-8 text-sm text-gray-500">
          <p>
            Źródło: <a 
              href={article.sourceUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              {article.sourceName}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}