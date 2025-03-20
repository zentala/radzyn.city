import PlaceholderImage from './PlaceholderImage';
import { Typography, Grid, Card, CardContent, Box } from '@mui/material';

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
      className="city-highlights-section" 
      sx={{ 
        my: 4,
        paddingX: 2, 
        maxWidth: '1200px',
        marginX: 'auto'
      }}
    >
      <Typography 
        variant="h2" 
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
      <Grid container spacing={3} className="city-highlights-grid">
        {highlights.map((item, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card 
              className="city-highlight-card" 
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
                  className="w-full h-full"
                  height={192}
                  aspectRatio="landscape"
                />
              </Box>
              <CardContent>
                <Typography 
                  variant="h5" 
                  component="h3" 
                  gutterBottom
                  sx={{ 
                    fontWeight: 500,
                    fontSize: { xs: '1.25rem', md: '1.5rem' }
                  }}
                >
                  {item.title}
                </Typography>
                <Typography 
                  variant="body1" 
                  color="text.secondary"
                  sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}
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