"use client";

import Link from 'next/link';
import PlaceholderImage from './PlaceholderImage';
import { useState } from 'react';

interface NewsCardProps {
  title: string;
  summary: string;
  date: string;
  category: string;
  imageUrl?: string;
  slug: string;
  featured?: boolean;
}

export default function NewsCard({ 
  title, 
  summary, 
  date, 
  category, 
  imageUrl, 
  slug,
  featured = false
}: NewsCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Format category for display and styling
  const getCategoryInfo = (category: string) => {
    const categoryMap: Record<string, {name: string, color: string}> = {
      'miasto': {name: 'Miasto', color: 'bg-blue-100 text-blue-800 border-blue-200'},
      'kultura': {name: 'Kultura', color: 'bg-purple-100 text-purple-800 border-purple-200'},
      'sport': {name: 'Sport', color: 'bg-green-100 text-green-800 border-green-200'},
      'inwestycje': {name: 'Inwestycje', color: 'bg-amber-100 text-amber-800 border-amber-200'},
      'edukacja': {name: 'Edukacja', color: 'bg-indigo-100 text-indigo-800 border-indigo-200'},
    };
    
    return categoryMap[category] || {name: category, color: 'bg-gray-100 text-gray-800 border-gray-200'};
  };
  
  const categoryInfo = getCategoryInfo(category);
  
  return (
    <div 
      className={`bg-white rounded-lg overflow-hidden shadow-md ${featured ? 'md:col-span-2 md:grid md:grid-cols-2 md:gap-4' : ''} transition-all duration-300 ${isHovered ? 'shadow-lg transform -translate-y-1' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`h-56 ${featured ? 'md:h-full' : ''} relative`}>
        <PlaceholderImage
          title={title}
          src={imageUrl}
          className="w-full h-full"
          height={224}
          aspectRatio={featured ? "landscape" : "landscape"}
        />
        <div className="absolute top-3 left-3">
          <span className={`text-xs font-medium px-2.5 py-1 rounded border ${categoryInfo.color}`}>
            {categoryInfo.name}
          </span>
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex items-center mb-3 text-xs text-gray-500">
          <span className="inline-flex items-center">
            <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            {date}
          </span>
        </div>
        
        <h3 className={`${featured ? 'text-2xl' : 'text-xl'} font-semibold mb-2 line-clamp-2`}>{title}</h3>
        
        <p className="text-gray-600 mb-4 line-clamp-3">{summary}</p>
        
        <Link
          href={`/news/${slug}`}
          className="inline-flex items-center text-primary hover:text-primary-dark font-medium transition-colors"
        >
          Czytaj więcej
          <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>
    </div>
  );
}