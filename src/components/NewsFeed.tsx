"use client";

import { useState, useEffect } from 'react';
import NewsCard from './NewsCard';
import { NewsArticle } from '@/utils/types';
import { getAllNewsArticles } from '@/services/newsService';
import { startScrapers } from '@/services/scraperService';

interface NewsFeedProps {
  limit?: number;
  showFeatured?: boolean;
  title?: string;
  showMoreLink?: boolean;
  categoryId?: string;
  tagId?: string;
}

export default function NewsFeed({ 
  limit = 6, 
  showFeatured = true,
  title = "Aktualności",
  showMoreLink = true,
  categoryId,
  tagId
}: NewsFeedProps) {
  const [visibleNewsCount, setVisibleNewsCount] = useState(limit);
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // Initialize scrapers (in production, this would be done server-side)
    startScrapers().catch(console.error);
    
    // Fetch news articles
    const fetchNews = async () => {
      try {
        setIsLoading(true);
        const articles = await getAllNewsArticles();
        setNewsArticles(articles);
        setError(null);
      } catch (err) {
        console.error('Error fetching news:', err);
        setError('Could not load news articles');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchNews();
  }, []);
  
  // Filter news by category if categoryId is provided
  const filteredNews = categoryId 
    ? newsArticles.filter(news => news.category.id === categoryId)
    : tagId 
    ? newsArticles.filter(news => news.tags.some(tag => tag.id === tagId))
    : newsArticles;
  
  // Filter and sort news (newest first)
  const sortedNews = [...filteredNews].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });
  
  const visibleNews = sortedNews.slice(0, visibleNewsCount);
  const hasMoreNews = sortedNews.length > visibleNewsCount;
  
  const loadMoreNews = () => {
    setVisibleNewsCount(prev => Math.min(prev + 3, sortedNews.length));
  };
  
  // Find the featured news item
  const featuredNewsItem = showFeatured ? sortedNews.find(news => news.featured) : null;
  
  // Filter out the featured item from regular news list
  const regularNews = featuredNewsItem 
    ? visibleNews.filter(item => item !== featuredNewsItem)
    : visibleNews;
  
  return (
    <section className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">{title}</h2>
        {showMoreLink && (
          <a href="/news" className="text-primary hover:text-primary-dark font-medium flex items-center transition-colors">
            Wszystkie aktualności
            <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        )}
      </div>
      
      {isLoading ? (
        // Loading state
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: limit }).map((_, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md p-4 animate-pulse">
              <div className="h-40 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      ) : error ? (
        // Error state
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      ) : (
        // Content state
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Featured news item takes up 2 columns */}
          {featuredNewsItem && (
            <NewsCard
              title={featuredNewsItem.title}
              summary={featuredNewsItem.summary}
              date={featuredNewsItem.date}
              category={featuredNewsItem.category}
              imageUrl={featuredNewsItem.imageUrl}
              slug={featuredNewsItem.slug}
              featured={true}
              sourceName={featuredNewsItem.sourceName}
              aiAnalysis={featuredNewsItem.aiAnalysis}
              tags={featuredNewsItem.tags.map(tag => tag.name)}
            />
          )}
          
          {/* Regular news items */}
          {regularNews.length > 0 ? (
            regularNews.map((news, index) => (
              <NewsCard
                key={news.id}
                title={news.title}
                summary={news.summary}
                date={news.date}
                category={news.category}
                imageUrl={news.imageUrl}
                slug={news.slug}
                sourceName={news.sourceName}
                aiAnalysis={news.aiAnalysis}
                tags={news.tags.map(tag => tag.name)}
              />
            ))
          ) : (
            <div className="col-span-3 text-center py-8">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              <p className="mt-2 text-gray-500">Brak aktualności do wyświetlenia.</p>
            </div>
          )}
        </div>
      )}
      
      {hasMoreNews && !isLoading && !error && (
        <div className="mt-8 text-center">
          <button
            onClick={loadMoreNews}
            className="px-6 py-2 bg-primary text-white rounded hover:bg-primary/80 transition inline-flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Pokaż więcej aktualności
          </button>
        </div>
      )}
    </section>
  );
}