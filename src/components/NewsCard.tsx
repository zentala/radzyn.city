"use client";

import { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Stack,
  Button
} from '@mui/joy';
import Link from 'next/link';
import PlaceholderImage from './PlaceholderImage';
import { NewsCategory } from '@/utils/types';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

interface NewsCardProps {
  title: string;
  summary: string;
  date: string;
  category: NewsCategory | string;
  imageUrl?: string;
  slug: string;
  featured?: boolean;
  sourceName?: string;
  aiAnalysis?: {
    sentiment: 'positive' | 'neutral' | 'negative';
    readingTimeMinutes: number;
  };
  tags?: string[];
}

export default function NewsCard({ 
  title, 
  summary, 
  date, 
  category, 
  imageUrl, 
  slug,
  featured = false,
  sourceName,
  aiAnalysis,
  tags
}: NewsCardProps) {
  // Format category for display and styling
  const getCategoryInfo = (category: NewsCategory | string) => {
    if (typeof category === 'object' && category !== null) {
      return { name: category.name, color: category.color };
    }
    
    const categoryMap: Record<string, {name: string, color: string}> = {
      'miasto': {name: 'Miasto', color: 'primary'},
      'kultura': {name: 'Kultura', color: 'secondary'},
      'sport': {name: 'Sport', color: 'success'},
      'inwestycje': {name: 'Inwestycje', color: 'warning'},
      'edukacja': {name: 'Edukacja', color: 'info'},
    };
    
    return categoryMap[category as string] || {name: category, color: 'default'};
  };
  
  const categoryInfo = getCategoryInfo(category);
  
  // Get appropriate sentiment icon
  const getSentimentIcon = () => {
    if (!aiAnalysis) return null;
    
    switch (aiAnalysis.sentiment) {
      case 'positive':
        return <SentimentSatisfiedAltIcon fontSize="small" color="success" />;
      case 'negative':
        return <SentimentVeryDissatisfiedIcon fontSize="small" color="error" />;
      default:
        return <SentimentNeutralIcon fontSize="small" color="action" />;
    }
  };

  // Get sentiment label
  const getSentimentLabel = () => {
    if (!aiAnalysis) return '';
    
    switch (aiAnalysis.sentiment) {
      case 'positive':
        return 'Pozytywny';
      case 'negative':
        return 'Negatywny';
      default:
        return 'Neutralny';
    }
  };
  
  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        transition: 'box-shadow 0.3s, transform 0.3s',
        '&:hover': {
          boxShadow: 3,
          transform: 'translateY(-4px)'
        }
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <Box sx={{ height: 180, overflow: 'hidden' }}>
          <PlaceholderImage
            title={title}
            src={imageUrl}
            className="w-full h-full"
            height={180}
            aspectRatio="landscape"
          />
        </Box>
        <Box sx={{ position: 'absolute', top: 12, left: 12 }}>
          <Chip
            label={categoryInfo.name}
            color={categoryInfo.color as any}
            size="small"
            variant="filled"
            sx={{ fontWeight: 500 }}
          />
        </Box>
      </Box>
      
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5, color: 'text.secondary' }}>
          <Typography 
            variant="caption" 
            sx={{ display: 'flex', alignItems: 'center', fontSize: '0.75rem' }}
          >
            <CalendarTodayIcon sx={{ fontSize: '0.9rem', mr: 0.5 }} /> {date}
          </Typography>
          
          {sourceName && (
            <Typography 
              variant="caption"
              sx={{ display: 'flex', alignItems: 'center', fontSize: '0.75rem' }}
            >
              <BookmarkIcon sx={{ fontSize: '0.9rem', mr: 0.5 }} /> {sourceName}
            </Typography>
          )}
        </Box>
        
        <Typography 
          variant={featured ? 'h5' : 'h6'} 
          component="h3" 
          sx={{ 
            fontWeight: 'medium', 
            mb: 1.5,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {title}
        </Typography>
        
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ 
            mb: 2,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            flexGrow: 1
          }}
        >
          {summary}
        </Typography>
        
        {/* AI Analysis */}
        {aiAnalysis && (
          <Stack direction="row" spacing={2} sx={{ mt: 'auto', mb: 2, color: 'text.secondary' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {getSentimentIcon()}
              <Typography variant="caption" sx={{ ml: 0.5 }}>
                {getSentimentLabel()}
              </Typography>
            </Box>
            
            {aiAnalysis.readingTimeMinutes && (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccessTimeIcon fontSize="small" />
                <Typography variant="caption" sx={{ ml: 0.5 }}>
                  {aiAnalysis.readingTimeMinutes} min
                </Typography>
              </Box>
            )}
          </Stack>
        )}
        
        {/* Tags */}
        {tags && tags.length > 0 && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
            {tags.map((tag, index) => (
              <Link 
                href={`/news/tag/${tag}`} 
                key={index}
                passHref
                style={{ textDecoration: 'none' }}
              >
                <Chip
                  label={`#${tag}`}
                  size="small"
                  variant="outlined"
                  sx={{ 
                    fontSize: '0.7rem', 
                    backgroundColor: 'grey.100', 
                    '&:hover': { backgroundColor: 'grey.200' } 
                  }}
                  clickable
                />
              </Link>
            ))}
          </Box>
        )}
        
        <Button
          component={Link}
          href={`/news/${slug}`}
          variant="text"
          color="primary"
          size="small"
          endIcon={<ArrowForwardIcon />}
          sx={{ alignSelf: 'flex-start', mt: 'auto' }}
        >
          Czytaj więcej
        </Button>
      </CardContent>
    </Card>
  );
}