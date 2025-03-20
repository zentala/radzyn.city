"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { NewsCategory, NewsTag } from '@/utils/types';
import { getAllCategories, getAllTags } from '@/services/newsService';

interface NewsFiltersProps {
  activeCategory?: string;
  activeTag?: string;
  showCounts?: boolean;
}

export default function NewsFilters({ 
  activeCategory, 
  activeTag,
  showCounts = true 
}: NewsFiltersProps) {
  const [categories, setCategories] = useState<NewsCategory[]>([]);
  const [tags, setTags] = useState<NewsTag[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        setIsLoading(true);
        const [categoriesData, tagsData] = await Promise.all([
          getAllCategories(),
          getAllTags()
        ]);
        
        setCategories(categoriesData);
        setTags(tagsData);
      } catch (error) {
        console.error('Error fetching filters:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchFilters();
  }, []);
  
  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-8 bg-gray-200 rounded"></div>
          ))}
        </div>
        <div className="h-6 bg-gray-200 rounded w-1/3 my-4"></div>
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-6 bg-gray-200 rounded w-16"></div>
          ))}
        </div>
      </div>
    );
  }
  
  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-3">Kategorie</h3>
      <div className="space-y-2 mb-6">
        <Link 
          href="/news"
          className={`block px-3 py-2 rounded-lg transition-colors ${
            !activeCategory && !activeTag 
              ? 'bg-primary text-white' 
              : 'hover:bg-gray-100'
          }`}
        >
          Wszystkie aktualności
          {showCounts && (
            <span className="ml-2 text-sm opacity-80">({categories.length})</span>
          )}
        </Link>
        
        {categories.map((category) => (
          <Link 
            key={category.id}
            href={`/news/category/${category.slug}`}
            className={`block px-3 py-2 rounded-lg transition-colors ${
              activeCategory === category.slug 
                ? 'bg-primary text-white' 
                : 'hover:bg-gray-100'
            }`}
          >
            {category.name}
          </Link>
        ))}
      </div>
      
      <h3 className="text-xl font-semibold mb-3">Tagi</h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Link 
            key={tag.id} 
            href={`/news/tag/${tag.slug}`}
            className={`inline-block px-3 py-1 rounded-full text-sm transition-colors ${
              activeTag === tag.slug
                ? 'bg-primary text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
            }`}
          >
            #{tag.name}
          </Link>
        ))}
      </div>
    </div>
  );
}