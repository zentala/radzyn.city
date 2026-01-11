import NewsFeed from '@/components/NewsFeed';
import NewsFilters from '@/components/NewsFilters';
import { Typography, Grid, Box } from '@mui/joy';

export default function NewsPage() {
  return (
    <Box sx={{ py: 8, pt: 20, px: { xs: 2, md: 4 }, maxWidth: 'xl', mx: 'auto', width: '100%' }}>
      <Typography level="h1" sx={{ mb: 2, fontWeight: 'bold' }}>
        Aktualności
      </Typography>
      <Typography level="body-lg" sx={{ color: 'text.secondary', mb: 6 }}>
        Najnowsze informacje i wiadomości z Radzynia Podlaskiego i powiatu radzyńskiego. Bądź na bieżąco z wydarzeniami w regionie.
      </Typography>

      <Grid container spacing={4}>
        <Grid xs={12} md={3}>
          <NewsFilters />
        </Grid>

        <Grid xs={12} md={9}>
          <NewsFeed showMoreLink={false} title="Wszystkie aktualności" limit={9} />
        </Grid>
      </Grid>
    </Box>
  );
}
