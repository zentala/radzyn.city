"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { NewsCategory, NewsTag } from '@/utils/types';
import { getAllCategories, getAllTags } from '@/services/newsService';
import {
  Typography, Chip, List, ListItem, ListItemButton,
  Skeleton, Box, Stack, Sheet
} from '@mui/joy';

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
            <Skeleton key={i} variant="rectangular" height={48} sx={{ mb: 1 }} />
          ))}
        </Box>
        <Skeleton variant="text" width="33%" height={32} sx={{ my: 2 }} />
        <Stack direction="row" flexWrap="wrap" gap={1}>
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} variant="rectangular" width={80} height={32} />
          ))}
        </Stack>
      </Box>
    );
  }
  
  return (
    <Box sx={{ mb: 4 }}>
      <Typography level="h3" sx={{ mb: 2, fontWeight: 'medium' }}>
        Kategorie
      </Typography>

      <Sheet variant="outlined" sx={{ mb: 3, borderRadius: 'md', overflow: 'hidden' }}>
        <List>
          <ListItem>
            <ListItemButton
              component={Link}
              href="/news"
              selected={!activeCategory && !activeTag}
              sx={{
                py: 1.5,
                '&.Mui-selected': {
                  bgcolor: 'primary.solidBg',
                  color: 'primary.solidColor',
                  '&:hover': {
                    bgcolor: 'primary.solidHoverBg',
                  }
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <Typography>Wszystkie aktualności</Typography>
                {showCounts && (
                  <Typography level="body-sm" sx={{ ml: 1, opacity: 0.8 }}>
                    ({categories.length})
                  </Typography>
                )}
              </Box>
            </ListItemButton>
          </ListItem>

          {categories.map((category) => (
            <ListItem key={category.id}>
              <ListItemButton
                component={Link}
                href={`/news/category/${category.slug}`}
                selected={activeCategory === category.slug}
                sx={{
                  py: 1.5,
                  '&.Mui-selected': {
                    bgcolor: 'primary.solidBg',
                    color: 'primary.solidColor',
                    '&:hover': {
                      bgcolor: 'primary.solidHoverBg',
                    }
                  }
                }}
              >
                <Typography>{category.name}</Typography>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Sheet>

      <Typography level="h3" sx={{ mb: 2, fontWeight: 'medium' }}>
        Tagi
      </Typography>

      <Stack direction="row" flexWrap="wrap" gap={1}>
        {tags.map((tag) => (
          <Chip
            key={tag.id}
            component={Link}
            href={`/news/tag/${tag.slug}`}
            color={activeTag === tag.slug ? "primary" : "neutral"}
            variant={activeTag === tag.slug ? "solid" : "outlined"}
            sx={{
              '&:hover': {
                bgcolor: activeTag === tag.slug ? 'primary.solidHoverBg' : 'neutral.outlinedHoverBg',
              }
            }}
          >
            #{tag.name}
          </Chip>
        ))}
      </Stack>
    </Box>
  );
}