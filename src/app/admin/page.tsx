'use client';

import { useState, useEffect } from 'react';
import { Container, Typography, Box, Paper, Grid, Button, Card, CardContent, CardActions } from '@mui/material';
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
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      
      <Grid container spacing={4}>
        {/* Stats Cards */}
        <Grid item xs={12} md={6} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              borderTop: '4px solid',
              borderColor: 'primary.main',
            }}
          >
            <ArticleIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h5" component="div">
              {stats.articles}
            </Typography>
            <Typography color="text.secondary">News Articles</Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              borderTop: '4px solid',
              borderColor: 'secondary.main',
            }}
          >
            <CategoryIcon color="secondary" sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h5" component="div">
              {stats.categories}
            </Typography>
            <Typography color="text.secondary">Categories</Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              borderTop: '4px solid',
              borderColor: 'success.main',
            }}
          >
            <Box sx={{ fontSize: 40, mb: 1, color: 'success.main' }}>#</Box>
            <Typography variant="h5" component="div">
              {stats.tags}
            </Typography>
            <Typography color="text.secondary">Tags</Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              borderTop: '4px solid',
              borderColor: 'info.main',
            }}
          >
            <LanguageIcon color="info" sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h5" component="div">
              {stats.scrapers}
            </Typography>
            <Typography color="text.secondary">Scraper Sources</Typography>
          </Paper>
        </Grid>
        
        {/* Quick Actions */}
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
            Quick Actions
          </Typography>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Run News Scraper
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Manually run the scraper to collect news from all configured sources.
              </Typography>
            </CardContent>
            <CardActions>
              <Button 
                size="small" 
                startIcon={<PlayArrowIcon />}
                component={Link}
                href="/api/scrape"
                target="_blank"
              >
                Run Now
              </Button>
              <Button 
                size="small"
                component={Link}
                href="/admin/scraper"
              >
                Configure
              </Button>
            </CardActions>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Manage News
              </Typography>
              <Typography variant="body2" color="text.secondary">
                View, edit, and manage all news articles in the system.
              </Typography>
            </CardContent>
            <CardActions>
              <Button 
                size="small"
                component={Link}
                href="/admin/news"
              >
                Go to News
              </Button>
            </CardActions>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Manage Categories & Tags
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Create and edit categories and tags for news classification.
              </Typography>
            </CardContent>
            <CardActions>
              <Button 
                size="small"
                component={Link}
                href="/admin/categories"
              >
                Categories
              </Button>
              <Button 
                size="small"
                component={Link}
                href="/admin/tags"
              >
                Tags
              </Button>
            </CardActions>
          </Card>
        </Grid>
        
        {/* Documentation & Help */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              News Scraper System
            </Typography>
            <Typography variant="body1" paragraph>
              The news scraper system automatically collects articles from configured sources at regular intervals.
              You can manually trigger the scraper using the "Run Now" button or configure new sources in the Scraper section.
            </Typography>
            <Typography variant="body1" paragraph>
              The system uses AI to automatically categorize and tag articles, as well as generate summaries.
              To enable AI features, add your OpenAI API key to the .env.local file.
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
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}