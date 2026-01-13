"use client";

import { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  Grid,
  Alert,
  Skeleton,
  Container,
  Button as JoyButton
} from '@mui/joy';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import NewsCard from './NewsCard';
import Button from './foundation/Button';
import { NewsArticle } from '@/utils/types';
import { getAllNewsArticles } from '@/services/newsService';
import { startScrapers } from '@/services/scraperService';
import Link from 'next/link';
import SectionWrapper from './SectionWrapper';

interface NewsFeedProps {
  limit?: number;
  showFeatured?: boolean;
  title?: string;
  showMoreLink?: boolean;
  categoryId?: string;
  tagId?: string;
  dashboardMode?: boolean;
}

export default function NewsFeed({ 
  limit = 6, 
  showFeatured = true,
  title = "Aktualności",
  showMoreLink = true,
  categoryId,
  tagId,
  dashboardMode = false
}: NewsFeedProps) {
  const [visibleNewsCount, setVisibleNewsCount] = useState(limit);
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const fetchNews = async () => {
    try {
      setIsLoading(true);
      // Only use scrapers in browser environment
      if (typeof window !== 'undefined') {
        // Initialize scrapers (in production, this would be done server-side)
        await startScrapers().catch(console.error);
      }
      
      // Fetch news articles
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
  
  useEffect(() => {
    // Only fetch news in browser environment
    if (typeof window !== 'undefined') {
      fetchNews();
    }
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

  // Content for loading state
  const loadingContent = (
    <Grid container spacing={3}>
      {Array.from({ length: limit }).map((_, index) => (
        <Grid xs={12} sm={6} md={4} key={index}>
          <Box sx={{ height: '100%' }}>
            <Skeleton variant="rectangular" width="100%" height={180} />
            <Box sx={{ pt: 2 }}>
              <Skeleton variant="text" width="30%" />
              <Skeleton variant="text" width="80%" height={60} />
              <Skeleton variant="text" width="100%" />
              <Skeleton variant="text" width="90%" />
              <Skeleton variant="text" width="60%" />
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  );

  // Content for error state
  const errorContent = (
    <Alert 
      severity="error" 
      sx={{ mb: 3 }}
      action={
        <JoyButton color="neutral" size="sm" onClick={fetchNews}>
          Spróbuj ponownie
        </JoyButton>
      }
    >
      {error}
    </Alert>
  );

  // Content for actual news feed
  const newsContent = (
    <>
      <Grid container spacing={3}>
        {/* Featured news item takes up more columns */}
        {featuredNewsItem && (
          <Grid xs={12} md={dashboardMode ? 12 : 8}>
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
          </Grid>
        )}
        
        {/* Regular news items */}
        {regularNews.length > 0 ? (
          regularNews.map((news) => (
            <Grid xs={12} sm={6} md={dashboardMode ? 6 : 4} key={news.id}>
              <NewsCard
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
            </Grid>
          ))
        ) : (
          <Grid xs={12}>
            <Box sx={{ 
              textAlign: 'center', 
              py: 6, 
              color: 'text.secondary',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <Box sx={{ 
                width: 64, 
                height: 64, 
                mb: 2, 
                borderRadius: '50%', 
                bgcolor: 'grey.100',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" 
                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Box>
              <Typography variant="subtitle1">
                Brak aktualności do wyświetlenia.
              </Typography>
            </Box>
          </Grid>
        )}
      </Grid>
      
      {hasMoreNews && (
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <JoyButton
            variant="solid"
            color="primary"
            onClick={loadMoreNews}
            startDecorator={<ExpandMoreIcon />}
            size="lg"
          >
            Pokaż więcej aktualności
          </JoyButton>
        </Box>
      )}
    </>
  );

  // If in dashboard mode, wrap in SectionWrapper
  if (dashboardMode) {
    return (
      <SectionWrapper
        title={title}
        disableCardStyling={true}
        actions={
          showMoreLink ? (
            <Button
              component={Link}
              href="/news"
              variant="soft"
              size="md"
              startDecorator={<NewspaperIcon />}
              endDecorator={<ArrowForwardIcon />}
              sx={{
                px: 3,
                py: 1.5,
                fontSize: '0.95rem',
              }}
            >
              Wszystkie aktualności
            </Button>
          ) : undefined
        }
      >
        {isLoading ? loadingContent : error ? errorContent : newsContent}
      </SectionWrapper>
    );
  }

  // Regular full-width display
  return (
    <Box sx={{ mb: 8 }} component="section">
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 4 
      }}>
        <Typography variant="h4" component="h2" fontWeight="bold">
          {title}
        </Typography>
        
        {showMoreLink && (
          <JoyButton
            component={Link}
            href="/news"
            variant="plain"
            color="primary"
            endDecorator={<ArrowForwardIcon />}
          >
            Wszystkie aktualności
          </JoyButton>
        )}
      </Box>
      
      {isLoading 
        ? loadingContent 
        : error 
        ? errorContent 
        : newsContent
      }
    </Box>
  );
}