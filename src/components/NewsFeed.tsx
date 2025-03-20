"use client";

import { useState } from 'react';
import NewsCard from './NewsCard';

// Sample news data
const newsData = [
  {
    title: 'Nowa fontanna w centrum miasta już otwarta',
    summary: 'Po kilku miesiącach budowy, nowa fontanna w centrum Radzynia Podlaskiego została oficjalnie otwarta. Inwestycja o wartości 2 mln złotych ma być nową atrakcją turystyczną miasta.',
    date: '20 marca 2025',
    category: 'miasto',
    slug: 'nowa-fontanna-w-centrum-miasta-juz-otwarta',
    featured: true
  },
  {
    title: 'Festiwal Kultury Ludowej przyciągnął tysiące gości',
    summary: 'W miniony weekend odbył się doroczny Festiwal Kultury Ludowej, który zgromadził rekordową liczbę odwiedzających z całego regionu. Prezentacje lokalnego folkloru i tradycyjnego rękodzieła cieszyły się ogromną popularnością.',
    date: '17 marca 2025',
    category: 'kultura',
    slug: 'festiwal-kultury-ludowej-przyciagnal-tysiace-gosci'
  },
  {
    title: 'Radzyńscy sportowcy z sukcesami na zawodach wojewódzkich',
    summary: 'Młodzi sportowcy z Radzynia Podlaskiego zdobyli 5 medali podczas Wojewódzkich Zawodów Lekkoatletycznych. Trener podkreśla potencjał młodych talentów i zapowiada kolejne sukcesy.',
    date: '12 marca 2025',
    category: 'sport',
    slug: 'radzynscy-sportowcy-z-sukcesami-na-zawodach-wojewodzkich'
  },
  {
    title: 'Rozpoczęto budowę nowej drogi do strefy przemysłowej',
    summary: 'Ruszyła długo oczekiwana budowa drogi łączącej miasto ze strefą przemysłową. Inwestycja warta 8 mln złotych ma zostać ukończona do końca roku i znacząco poprawić dostępność komunikacyjną dla firm i mieszkańców.',
    date: '8 marca 2025',
    category: 'inwestycje',
    slug: 'rozpoczeto-budowe-nowej-drogi-do-strefy-przemyslowej'
  },
  {
    title: 'Szkoły z powiatu radzyńskiego z nowymi pracowniami komputerowymi',
    summary: 'Wszystkie szkoły ponadpodstawowe w powiecie radzyńskim zostały wyposażone w nowe pracownie komputerowe. Projekt o wartości 1.5 mln złotych został zrealizowany ze środków unijnych i ma na celu podniesienie kompetencji cyfrowych uczniów.',
    date: '5 marca 2025',
    category: 'edukacja',
    slug: 'szkoly-z-powiatu-radzynskiego-z-nowymi-pracowniami-komputerowymi'
  },
  {
    title: 'Koncert symfoniczny "Muzyka Mistrzów" zachwyca publiczność',
    summary: 'Lubelska Orkiestra Kameralna wystąpiła w Pałacu Potockich z programem "Muzyka Mistrzów". Koncert spotkał się z entuzjastycznym przyjęciem ze strony licznie przybyłej publiczności.',
    date: '2 marca 2025',
    category: 'kultura',
    slug: 'koncert-symfoniczny-muzyka-mistrzow-zachwyca-publicznosc'
  }
];

interface NewsFeedProps {
  limit?: number;
  showFeatured?: boolean;
  title?: string;
  showMoreLink?: boolean;
}

export default function NewsFeed({ 
  limit = 6, 
  showFeatured = true,
  title = "Aktualności",
  showMoreLink = true
}: NewsFeedProps) {
  const [visibleNewsCount, setVisibleNewsCount] = useState(limit);
  
  // Filter and sort news (newest first)
  const sortedNews = [...newsData].sort((a, b) => {
    const dateA = new Date(a.date.split(' ').reverse().join('-'));
    const dateB = new Date(b.date.split(' ').reverse().join('-'));
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Featured news item takes up 2 columns */}
        {featuredNewsItem && (
          <NewsCard
            title={featuredNewsItem.title}
            summary={featuredNewsItem.summary}
            date={featuredNewsItem.date}
            category={featuredNewsItem.category}
            slug={featuredNewsItem.slug}
            featured={true}
          />
        )}
        
        {/* Regular news items */}
        {regularNews.map((news, index) => (
          <NewsCard
            key={index}
            title={news.title}
            summary={news.summary}
            date={news.date}
            category={news.category}
            slug={news.slug}
          />
        ))}
      </div>
      
      {hasMoreNews && (
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