import PlaceholderImage from './PlaceholderImage';
import { Typography, Grid, Card, CardContent, Box } from '@mui/joy';

export default function CityHighlights() {
  const highlights = [
    {
      title: 'Pałac Potockich',
      description: 'Barokowy pałac z XVIII wieku, jeden z najpiękniejszych zabytków regionu.',
      imageUrl: undefined, // Will use placeholder until real image is provided
    },
    {
      title: 'Kościół Świętej Trójcy',
      description: 'Zabytkowy kościół z bogato zdobionym wnętrzem i historią sięgającą XVII wieku.',
      imageUrl: undefined,
    },
    {
      title: 'Park Miejski',
      description: 'Miejsce rekreacji z malowniczymi alejkami, stawem i bogatą roślinnością.',
      imageUrl: undefined,
    },
  ];

  return (
    <Box
      sx={{
        my: 4,
        paddingX: 2,
        maxWidth: '1200px',
        marginX: 'auto'
      }}
    >
      <Typography
        level="h2"
        component="h2"
        id="odkryj-radzyn"
        sx={{
          mb: 3,
          fontWeight: 'bold',
          fontSize: { xs: '1.75rem', md: '2rem' }
        }}
      >
        Odkryj Radzyń Podlaski
      </Typography>
      <Grid container spacing={3}>
        {highlights.map((item, index) => (
          <Grid xs={12} md={4} key={index}>
            <Card
              sx={{
                height: '100%',
                overflow: 'hidden',
                borderRadius: 2,
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }}
            >
              <Box sx={{ height: 192 }}>
                <PlaceholderImage
                  title={item.title}
                  src={item.imageUrl}
                  height={192}
                  aspectRatio="landscape"
                  sx={{ width: '100%', height: '100%' }}
                />
              </Box>
              <CardContent>
                <Typography
                  level="h4"
                  component="h3"
                  sx={{
                    mb: 1,
                    fontWeight: 500,
                    fontSize: { xs: '1.25rem', md: '1.5rem' }
                  }}
                >
                  {item.title}
                </Typography>
                <Typography
                  level="body-md"
                  sx={{
                    color: 'text.secondary',
                    fontSize: { xs: '0.875rem', md: '1rem' }
                  }}
                >
                  {item.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
