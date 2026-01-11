"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getNewsArticleBySlug } from '@/services/newsService';
import { NewsArticle } from '@/utils/types';
import PlaceholderImage from '@/components/PlaceholderImage';
import { Typography, Box, Stack, Chip, Alert, Skeleton, Divider } from '@mui/joy';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ArticleIcon from '@mui/icons-material/Article';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { Tag } from '@/components/foundation/Chip';

interface NewsDetailPageProps {
  params: {
    slug: string;
  };
}

export default function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { slug } = params;
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setIsLoading(true);
        const data = await getNewsArticleBySlug(slug);
        if (data) {
          setArticle(data);
        } else {
          setError('Article not found');
        }
      } catch (err) {
        console.error('Error fetching article:', err);
        setError('Could not load article');
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  if (isLoading) {
    return (
      <Box sx={{ py: 8, pt: 20, px: { xs: 2, md: 4 }, maxWidth: 'xl', mx: 'auto', width: '100%' }}>
        <Skeleton variant="text" width="75%" sx={{ mb: 6 }} />
        <Skeleton variant="text" width="25%" sx={{ mb: 8 }} />
        <Skeleton variant="rectangular" width="100%" height={384} sx={{ mb: 8 }} />
        <Stack spacing={2}>
          <Skeleton variant="text" width="100%" />
          <Skeleton variant="text" width="100%" />
          <Skeleton variant="text" width="83%" />
          <Skeleton variant="text" width="100%" />
          <Skeleton variant="text" width="80%" />
        </Stack>
      </Box>
    );
  }

  if (error || !article) {
    return (
      <Box sx={{ py: 8, pt: 20, px: { xs: 2, md: 4 }, maxWidth: 'xl', mx: 'auto', width: '100%' }}>
        <Alert color="danger" sx={{ mb: 6 }}>
          {error || 'Nie znaleziono artykułu'}
        </Alert>
        <Link href="/news" style={{ textDecoration: 'none' }}>
          <Typography
            level="body-md"
            sx={{
              color: 'primary.500',
              display: 'flex',
              alignItems: 'center',
              '&:hover': { color: 'primary.600' },
            }}
          >
            <ArrowBackIcon sx={{ mr: 1 }} />
            Wróć do aktualności
          </Typography>
        </Link>
      </Box>
    );
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pl-PL', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <Box sx={{ py: 8, pt: 20, px: { xs: 2, md: 4 }, maxWidth: 'xl', mx: 'auto', width: '100%' }}>
      <Box sx={{ mb: 6 }}>
        <Link
          href="/news"
          style={{ textDecoration: 'none' }}
        >
          <Typography
            level="body-sm"
            sx={{
              color: 'text.secondary',
              display: 'flex',
              alignItems: 'center',
              mb: 2,
              '&:hover': { color: 'primary.500' },
            }}
          >
            <ArrowBackIcon sx={{ fontSize: 16, mr: 1 }} />
            Wróć do aktualności
          </Typography>
        </Link>

        <Typography level="h1" sx={{ mb: 4, fontWeight: 'bold' }}>
          {article.title}
        </Typography>

        <Stack direction="row" flexWrap="wrap" spacing={3} sx={{ mb: 6 }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <CalendarTodayIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
            <Typography level="body-sm" sx={{ color: 'text.secondary' }}>
              {formatDate(article.date)}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={1} alignItems="center">
            <ArticleIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
            <Typography level="body-sm" sx={{ color: 'text.secondary' }}>
              Źródło: {article.sourceName}
            </Typography>
          </Stack>

          <Chip
            variant="outlined"
            color="primary"
            size="sm"
          >
            {article.category.name}
          </Chip>
        </Stack>
      </Box>

      {/* Article image */}
      <Box sx={{ mb: 8, height: 384, position: 'relative' }}>
        <PlaceholderImage
          title={article.title}
          src={article.imageUrl}
          className="w-full h-full object-cover rounded-lg"
          height={384}
          aspectRatio="wide"
        />
      </Box>

      {/* Article content */}
      <Box sx={{ maxWidth: '48rem', mx: 'auto' }}>
        {/* AI analysis box */}
        {article.aiAnalysis && (
          <Box
            sx={{
              bgcolor: 'background.level1',
              p: 3,
              borderRadius: 'md',
              mb: 6,
            }}
          >
            <Typography level="title-md" sx={{ mb: 2, fontWeight: 'bold' }}>
              AI Analysis:
            </Typography>

            <Stack direction="row" flexWrap="wrap" spacing={2} alignItems="center">
              {article.aiAnalysis.sentiment && (
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  sx={{
                    color:
                      article.aiAnalysis.sentiment === 'positive' ? 'success.500' :
                        article.aiAnalysis.sentiment === 'negative' ? 'danger.500' : 'text.secondary',
                  }}
                >
                  {article.aiAnalysis.sentiment === 'positive' ? (
                    <SentimentSatisfiedIcon sx={{ fontSize: 16 }} />
                  ) : article.aiAnalysis.sentiment === 'negative' ? (
                    <SentimentDissatisfiedIcon sx={{ fontSize: 16 }} />
                  ) : (
                    <SentimentNeutralIcon sx={{ fontSize: 16 }} />
                  )}
                  <Typography level="body-sm">
                    Sentiment: {article.aiAnalysis.sentiment.charAt(0).toUpperCase() + article.aiAnalysis.sentiment.slice(1)}
                  </Typography>
                </Stack>
              )}

              {article.aiAnalysis.readingTimeMinutes && (
                <Stack direction="row" spacing={1} alignItems="center">
                  <AccessTimeIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                  <Typography level="body-sm" sx={{ color: 'text.secondary' }}>
                    Reading time: {article.aiAnalysis.readingTimeMinutes} min
                  </Typography>
                </Stack>
              )}

              {article.aiAnalysis.keywords && article.aiAnalysis.keywords.length > 0 && (
                <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                  <LocalOfferIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                  <Typography level="body-sm" sx={{ color: 'text.secondary' }}>
                    Keywords:
                  </Typography>
                  {article.aiAnalysis.keywords.map((keyword, index) => (
                    <Tag key={index} size="sm">
                      {keyword}
                    </Tag>
                  ))}
                </Stack>
              )}
            </Stack>
          </Box>
        )}

        {/* Article text content */}
        <Box sx={{ mb: 8 }}>
          {article.content.split('\n\n').map((paragraph, index) => (
            <Typography key={index} level="body-lg" sx={{ mb: 4 }}>
              {paragraph}
            </Typography>
          ))}
        </Box>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <Box sx={{ mt: 8 }}>
            <Divider sx={{ mb: 3 }} />
            <Typography level="title-md" sx={{ mb: 3, fontWeight: 'bold' }}>
              Tagi:
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {article.tags.map((tag) => (
                <Link
                  key={tag.id}
                  href={`/news/tag/${tag.slug}`}
                  style={{ textDecoration: 'none' }}
                >
                  <Tag size="sm">
                    #{tag.name}
                  </Tag>
                </Link>
              ))}
            </Stack>
          </Box>
        )}

        {/* Source attribution */}
        <Box sx={{ mt: 8 }}>
          <Typography level="body-sm" sx={{ color: 'text.secondary' }}>
            Źródło:{' '}
            <Typography
              component="a"
              href={article.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              level="body-sm"
              sx={{
                color: 'primary.500',
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              {article.sourceName}
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
