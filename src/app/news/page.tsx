import NewsFeed from '@/components/NewsFeed';
import NewsFilters from '@/components/NewsFilters';
import { Container, Typography, Grid, Box } from '@mui/material';

export default function NewsPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 8, pt: 20 }}>
      <Typography variant="h2" component="h1" sx={{ mb: 2, fontWeight: 'bold' }}>
        Aktualności
      </Typography>
      <Typography variant="body1" sx={{ fontSize: '1.125rem', color: 'text.secondary', mb: 6 }}>
        Najnowsze informacje i wiadomości z Radzynia Podlaskiego i powiatu radzyńskiego. Bądź na bieżąco z wydarzeniami w regionie.
      </Typography>
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={3}>
          <NewsFilters />
        </Grid>
        
        <Grid item xs={12} md={9}>
          <NewsFeed showMoreLink={false} title="Wszystkie aktualności" limit={9} />
        </Grid>
      </Grid>
    </Container>
  );
}