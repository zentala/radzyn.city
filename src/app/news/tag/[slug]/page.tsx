"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import NewsFeed from '@/components/NewsFeed';
import NewsFilters from '@/components/NewsFilters';
import { getAllTags } from '@/services/newsService';
import { NewsTag } from '@/utils/types';

interface TagPageProps {
  params: {
    slug: string;
  };
}

export default function TagPage({ params }: TagPageProps) {
  const { slug } = params;
  const [tag, setTag] = useState<NewsTag | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchTag = async () => {
      try {
        setIsLoading(true);
        const tags = await getAllTags();
        const matchingTag = tags.find(t => t.slug === slug);
        
        if (matchingTag) {
          setTag(matchingTag);
        }
      } catch (error) {
        console.error('Error fetching tag:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTag();
  }, [slug]);
  
  return (
    <div className="container mx-auto px-4 py-8 pt-20">
      <div className="flex items-center mb-4">
        <Link 
          href="/news" 
          className="text-gray-500 hover:text-primary flex items-center text-sm mr-3"
        >
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Wszystkie aktualności
        </Link>
        
        <h1 className="text-4xl font-bold">
          {isLoading ? (
            <div className="h-8 bg-gray-200 rounded w-40 animate-pulse"></div>
          ) : (
            tag ? `Tag: #${tag.name}` : `Tag: #${slug}`
          )}
        </h1>
      </div>
      
      <p className="text-lg text-gray-700 mb-8">
        Przeglądaj aktualności oznaczone tym tagiem.
      </p>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/4">
          <NewsFilters activeTag={slug} />
        </div>
        
        <div className="w-full md:w-3/4">
          <NewsFeed 
            showMoreLink={false} 
            title={tag ? `Tag: #${tag.name}` : `Tag: #${slug}`}
            limit={9}
            tagId={tag?.id}
          />
        </div>
      </div>
    </div>
  );
}