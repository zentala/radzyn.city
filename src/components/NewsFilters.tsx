"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { NewsCategory, NewsTag } from '@/utils/types';
import { getAllCategories, getAllTags } from '@/services/newsService';
import { 
  Typography, Chip, List, ListItem, ListItemButton, 
  ListItemText, Skeleton, Box, Stack, Paper
} from '@mui/material';

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
      <Box sx={{ mb: 4 }}>
        <Skeleton variant="text" width="33%" height={32} sx={{ mb: 2 }} />
        <Box sx={{ mb: 3 }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} variant="rectangular" height={48} sx={{ mb: 1, borderRadius: 1 }} />
          ))}
        </Box>
        <Skeleton variant="text" width="33%" height={32} sx={{ my: 2 }} />
        <Stack direction="row" flexWrap="wrap" gap={1}>
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} variant="rectangular" width={80} height={32} sx={{ borderRadius: 8 }} />
          ))}
        </Stack>
      </Box>
    );
  }
  
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" component="h3" fontWeight="medium" sx={{ mb: 2 }}>
        Kategorie
      </Typography>
      
      <Paper variant="outlined" sx={{ mb: 3, borderRadius: 2, overflow: 'hidden' }}>
        <List disablePadding>
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              href="/news"
              selected={!activeCategory && !activeTag}
              sx={{
                py: 1.5,
                '&.Mui-selected': {
                  bgcolor: 'primary.main',
                  color: 'common.white',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  }
                }
              }}
            >
              <ListItemText 
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    Wszystkie aktualności
                    {showCounts && (
                      <Typography component="span" variant="body2" sx={{ ml: 1, opacity: 0.8 }}>
                        ({categories.length})
                      </Typography>
                    )}
                  </Box>
                } 
              />
            </ListItemButton>
          </ListItem>
          
          {categories.map((category) => (
            <ListItem key={category.id} disablePadding>
              <ListItemButton
                component={Link}
                href={`/news/category/${category.slug}`}
                selected={activeCategory === category.slug}
                sx={{
                  py: 1.5,
                  '&.Mui-selected': {
                    bgcolor: 'primary.main',
                    color: 'common.white',
                    '&:hover': {
                      bgcolor: 'primary.dark',
                    }
                  }
                }}
              >
                <ListItemText primary={category.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Paper>
      
      <Typography variant="h5" component="h3" fontWeight="medium" sx={{ mb: 2 }}>
        Tagi
      </Typography>
      
      <Stack direction="row" flexWrap="wrap" gap={1}>
        {tags.map((tag) => (
          <Chip
            key={tag.id}
            label={`#${tag.name}`}
            component={Link}
            href={`/news/tag/${tag.slug}`}
            clickable
            color={activeTag === tag.slug ? "primary" : "default"}
            variant={activeTag === tag.slug ? "filled" : "outlined"}
            sx={{ 
              borderRadius: 4,
              '&:hover': {
                bgcolor: activeTag === tag.slug ? 'primary.dark' : 'action.hover',
              }
            }}
          />
        ))}
      </Stack>
    </Box>
  );
}