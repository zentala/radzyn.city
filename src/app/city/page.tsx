import PlaceholderImage from '@/components/PlaceholderImage';
import { 
  Container, 
  Typography, 
  Grid, 
  Box, 
  Card, 
  CardContent, 
  CardMedia 
} from '@mui/material';

export const metadata = {
  title: 'O Mieście - Radzyń Podlaski',
  description: 'Informacje o mieście Radzyń Podlaski, jego historii, atrakcjach i miejscach wartych odwiedzenia.',
};

export default function CityPage() {
  const attractions = [
    {
      title: 'Pałac Potockich',
      description: 'Barokowy pałac z XVIII wieku, zaprojektowany przez Jakuba Fontanę, z bogatymi zdobieniami i otaczającym parkiem.',
    },
    {
      title: 'Kościół Świętej Trójcy',
      description: 'Zabytkowy kościół parafialny z XVII wieku, z bogatym wyposażeniem wnętrza i charakterystyczną architekturą.',
    },
    {
      title: 'Oranżeria',
      description: 'Historyczny budynek oranżerii, część kompleksu pałacowego, obecnie siedziba Radzyńskiego Ośrodka Kultury.',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h2" component="h1" sx={{ mb: 6, fontWeight: 'bold' }}>
        O Mieście Radzyń Podlaski
      </Typography>
      
      <Box component="section" sx={{ mb: 8 }}>
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Historia
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="body1" paragraph>
              Radzyń Podlaski to miasto o bogatej historii sięgającej XIV wieku. Pierwsze wzmianki o miejscowości pochodzą z 1468 roku. 
              Przez wieki miasto znajdowało się pod wpływem różnych rodów szlacheckich, w tym Mniszchów i Potockich.
            </Typography>
            <Typography variant="body1">
              Szczególny rozkwit miasta nastąpił w XVIII wieku za czasów Eustachego Potockiego, który zlecił budowę wspaniałego 
              barokowego pałacu, będącego dziś główną atrakcją turystyczną miasta.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ height: 256 }}>
              <PlaceholderImage 
                title="Historia Radzynia Podlaskiego"
                height={256}
                aspectRatio="landscape"
                sx={{ width: '100%', height: '100%', borderRadius: 2 }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box component="section" sx={{ mb: 8 }}>
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Położenie i geografia
        </Typography>
        <Typography variant="body1" paragraph>
          Radzyń Podlaski położony jest w północnej części województwa lubelskiego, na Równinie Łukowskiej, będącej częścią Niziny 
          Południowopodlaskiej. Przez miasto przepływa rzeka Białka, dopływ Tyśmienicy.
        </Typography>
        <Typography variant="body1">
          Miasto zajmuje powierzchnię około 19 km² i jest otoczone malowniczymi terenami rolniczymi i leśnymi, 
          charakterystycznymi dla Podlasia.
        </Typography>
      </Box>

      <Box component="section" sx={{ mb: 8 }}>
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Atrakcje turystyczne
        </Typography>
        <Grid container spacing={3}>
          {attractions.map((attraction, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                overflow: 'hidden',
                borderRadius: 2,
                boxShadow: 2
              }}>
                <Box sx={{ height: 192 }}>
                  <PlaceholderImage 
                    title={attraction.title}
                    height={192}
                    aspectRatio="landscape"
                    sx={{ width: '100%', height: '100%' }}
                  />
                </Box>
                <CardContent>
                  <Typography variant="h6" component="h3" sx={{ mb: 1, fontWeight: 600 }}>
                    {attraction.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {attraction.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}