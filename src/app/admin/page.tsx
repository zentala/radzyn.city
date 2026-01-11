'use client';

import { useState, useEffect } from 'react';
import { Typography, Box, Sheet, Grid, Button, Card, CardContent, CardActions } from '@mui/joy';
import ArticleIcon from '@mui/icons-material/Article';
import CategoryIcon from '@mui/icons-material/Category';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import LanguageIcon from '@mui/icons-material/Language';
import Link from 'next/link';
import { getScraperConfigs } from '@/services/scraperService';
import { getAllNewsArticles, getAllCategories, getAllTags } from '@/services/newsService';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    articles: 0,
    categories: 0,
    tags: 0,
    scrapers: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Get data
        const articles = await getAllNewsArticles();
        const categories = await getAllCategories();
        const tags = await getAllTags();
        const scrapers = getScraperConfigs();

        // Update stats
        setStats({
          articles: articles.length,
          categories: categories.length,
          tags: tags.length,
          scrapers: scrapers.length
        });
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <Box sx={{ py: 4, px: { xs: 2, md: 4 }, maxWidth: 'lg', mx: 'auto', width: '100%' }}>
      <Typography level="h2" sx={{ mb: 4 }}>
        Dashboard
      </Typography>

      <Grid container spacing={4}>
        {/* Stats Cards */}
        <Grid xs={12} md={6} lg={3}>
          <Sheet
            variant="outlined"
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              borderTop: '4px solid',
              borderColor: 'primary.500',
            }}
          >
            <ArticleIcon sx={{ fontSize: 40, mb: 1, color: 'primary.500' }} />
            <Typography level="h3">
              {stats.articles}
            </Typography>
            <Typography level="body-sm" sx={{ color: 'text.secondary' }}>News Articles</Typography>
          </Sheet>
        </Grid>

        <Grid xs={12} md={6} lg={3}>
          <Sheet
            variant="outlined"
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              borderTop: '4px solid',
              borderColor: 'secondary.500',
            }}
          >
            <CategoryIcon sx={{ fontSize: 40, mb: 1, color: 'secondary.500' }} />
            <Typography level="h3">
              {stats.categories}
            </Typography>
            <Typography level="body-sm" sx={{ color: 'text.secondary' }}>Categories</Typography>
          </Sheet>
        </Grid>

        <Grid xs={12} md={6} lg={3}>
          <Sheet
            variant="outlined"
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              borderTop: '4px solid',
              borderColor: 'success.500',
            }}
          >
            <Box sx={{ fontSize: 40, mb: 1, color: 'success.500' }}>#</Box>
            <Typography level="h3">
              {stats.tags}
            </Typography>
            <Typography level="body-sm" sx={{ color: 'text.secondary' }}>Tags</Typography>
          </Sheet>
        </Grid>

        <Grid xs={12} md={6} lg={3}>
          <Sheet
            variant="outlined"
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              borderTop: '4px solid',
              borderColor: 'info.500',
            }}
          >
            <LanguageIcon sx={{ fontSize: 40, mb: 1, color: 'info.500' }} />
            <Typography level="h3">
              {stats.scrapers}
            </Typography>
            <Typography level="body-sm" sx={{ color: 'text.secondary' }}>Scraper Sources</Typography>
          </Sheet>
        </Grid>

        {/* Quick Actions */}
        <Grid xs={12}>
          <Typography level="h4" sx={{ mt: 2, mb: 2 }}>
            Quick Actions
          </Typography>
        </Grid>

        <Grid xs={12} md={4}>
          <Card variant="outlined">
            <CardContent>
              <Typography level="title-md" sx={{ mb: 1 }}>
                Run News Scraper
              </Typography>
              <Typography level="body-sm" sx={{ color: 'text.secondary' }}>
                Manually run the scraper to collect news from all configured sources.
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="sm"
                startDecorator={<PlayArrowIcon />}
                component={Link}
                href="/api/scrape"
                target="_blank"
              >
                Run Now
              </Button>
              <Button
                size="sm"
                variant="outlined"
                component={Link}
                href="/admin/scraper"
              >
                Configure
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid xs={12} md={4}>
          <Card variant="outlined">
            <CardContent>
              <Typography level="title-md" sx={{ mb: 1 }}>
                Manage News
              </Typography>
              <Typography level="body-sm" sx={{ color: 'text.secondary' }}>
                View, edit, and manage all news articles in system.
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="sm"
                component={Link}
                href="/admin/news"
              >
                Go to News
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid xs={12} md={4}>
          <Card variant="outlined">
            <CardContent>
              <Typography level="title-md" sx={{ mb: 1 }}>
                Manage Categories & Tags
              </Typography>
              <Typography level="body-sm" sx={{ color: 'text.secondary' }}>
                Create and edit categories and tags for news classification.
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="sm"
                component={Link}
                href="/admin/categories"
              >
                Categories
              </Button>
              <Button
                size="sm"
                component={Link}
                href="/admin/tags"
              >
                Tags
              </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* Documentation & Help */}
        <Grid xs={12}>
          <Sheet variant="outlined" sx={{ p: 3, mt: 3 }}>
            <Typography level="title-md" sx={{ mb: 2 }}>
              News Scraper System
            </Typography>
            <Typography level="body-md" sx={{ mb: 2 }}>
              The news scraper system automatically collects articles from configured sources at regular intervals.
              You can manually trigger the scraper using "Run Now" button or configure new sources in Scraper section.
            </Typography>
            <Typography level="body-md" sx={{ mb: 2 }}>
              The system uses AI to automatically categorize and tag articles, as well as generate summaries.
              To enable AI features, add your OpenAI API key to .env.local file.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Button
                variant="outlined"
                component={Link}
                href="/admin/scraper"
              >
                Go to Scraper Configuration
              </Button>
            </Box>
          </Sheet>
        </Grid>
      </Grid>
    </Box>
  );
}
