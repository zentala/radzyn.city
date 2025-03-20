'use client';

import { 
  Container, 
  Typography, 
  Grid, 
  Box, 
  Paper, 
  Card, 
  CardContent,
  List,
  ListItem,
  ListItemText
} from '@mui/material';

export default function CountyPage() {
  
  const countyDistricts = [
    {
      name: 'Gmina Radzyń Podlaski',
      description: 'Gmina wiejska otaczająca miasto Radzyń Podlaski.',
      population: 'ok. 8 000',
      attractions: 'Kościół pw. św. Anny w Ustrzeszy, rezerwat przyrody "Czapliniec"',
    },
    {
      name: 'Gmina Borki',
      description: 'Gmina położona w południowej części powiatu radzyńskiego.',
      population: 'ok. 6 000',
      attractions: 'Zespół pałacowo-parkowy w Woli Osowińskiej, Muzeum Regionalne w Woli Osowińskiej',
    },
    {
      name: 'Gmina Czemierniki',
      description: 'Gmina o charakterze rolniczym z bogatą historią.',
      population: 'ok. 4 500',
      attractions: 'Zespół pałacowy w Czemiernikach, Kościół pw. św. Stanisława',
    },
    {
      name: 'Gmina Kąkolewnica',
      description: 'Gmina położona w północno-wschodniej części powiatu.',
      population: 'ok. 8 000',
      attractions: 'Rezerwat przyrody "Kania", zabytki architektury drewnianej',
    },
    {
      name: 'Gmina Komarówka Podlaska',
      description: 'Gmina o charakterze rolniczym z bogatymi tradycjami.',
      population: 'ok. 4 500',
      attractions: 'Muzeum Ziemi Komarowskiej, Kościół pw. Najświętszego Serca Jezusowego',
    },
    {
      name: 'Gmina Ulan-Majorat',
      description: 'Gmina położona w zachodniej części powiatu.',
      population: 'ok. 6 000',
      attractions: 'Zespół dworsko-parkowy w Serokomli, rezerwat przyrody "Topór"',
    },
    {
      name: 'Gmina Wohyń',
      description: 'Gmina położona we wschodniej części powiatu.',
      population: 'ok. 7 000',
      attractions: 'Kościół pw. św. Anny w Wohyniu, zespół dworsko-parkowy w Bezwoli',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h2" component="h1" sx={{ mb: 6, fontWeight: 'bold' }}>
        Powiat Radzyński
      </Typography>
      
      <Box component="section" sx={{ mb: 8 }}>
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          O Powiecie
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="body1" paragraph>
              Powiat radzyński to jednostka administracyjna położona w północnej części województwa lubelskiego. 
              Zajmuje powierzchnię około 965 km² i zamieszkuje go blisko 60 000 mieszkańców.
            </Typography>
            <Typography variant="body1" paragraph>
              W skład powiatu wchodzi miasto Radzyń Podlaski, będące siedzibą władz powiatowych, oraz siedem gmin wiejskich. 
              Region ma charakter głównie rolniczy, z licznymi obszarami przyrodniczymi wartymi odwiedzenia.
            </Typography>
            <Typography variant="body1">
              Powiat radzyński łączy bogate dziedzictwo kulturowe z potencjałem gospodarczym i turystycznym, 
              oferując zarówno mieszkańcom jak i turystom wiele możliwości rekreacji i wypoczynku.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ 
              height: 256, 
              bgcolor: 'grey.200', 
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'grey.500',
              typography: 'h6'
            }}>
              [Mapa powiatu radzyńskiego]
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box component="section" sx={{ mb: 8 }}>
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Gminy Powiatu Radzyńskiego
        </Typography>
        <Grid container spacing={3}>
          {countyDistricts.map((district, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card sx={{ height: '100%', boxShadow: 2, borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="h6" component="h3" sx={{ mb: 1, fontWeight: 600 }}>
                    {district.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {district.description}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <Box component="span" sx={{ fontWeight: 500, mr: 1 }}>Liczba mieszkańców:</Box>
                    {district.population}
                  </Typography>
                  <Typography variant="body2">
                    <Box component="span" sx={{ fontWeight: 500, mr: 1 }}>Atrakcje:</Box>
                    {district.attractions}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box component="section" sx={{ mb: 8 }}>
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Turystyka w Powiecie
        </Typography>
        <Typography variant="body1" paragraph>
          Powiat radzyński oferuje wiele atrakcji dla miłośników turystyki aktywnej, kulturowej i przyrodniczej. 
          Region słynie z malowniczych krajobrazów, zabytków architektury oraz gościnności mieszkańców.
        </Typography>
        <Paper 
          sx={{ 
            p: 3, 
            borderRadius: 2, 
            bgcolor: 'primary.50',
            border: '1px solid',
            borderColor: 'primary.100'
          }}
        >
          <Typography variant="h6" component="h3" sx={{ mb: 2, fontWeight: 600 }}>
            Szlaki turystyczne
          </Typography>
          <List sx={{ pl: 2 }}>
            <ListItem sx={{ display: 'list-item', py: 0.5 }}>
              <ListItemText primary="Szlak Ziemi Radzyńskiej - prowadzi przez najciekawsze zabytki i atrakcje przyrodnicze powiatu" />
            </ListItem>
            <ListItem sx={{ display: 'list-item', py: 0.5 }}>
              <ListItemText primary="Szlak Rezerwatów Przyrody - łączy najcenniejsze obszary chronione regionu" />
            </ListItem>
            <ListItem sx={{ display: 'list-item', py: 0.5 }}>
              <ListItemText primary="Rowerowy Szlak Doliny Tyśmienicy - idealna trasa dla miłośników dwóch kółek" />
            </ListItem>
            <ListItem sx={{ display: 'list-item', py: 0.5 }}>
              <ListItemText primary="Szlak Dworów i Pałaców - prezentuje bogactwo architektury rezydencjonalnej regionu" />
            </ListItem>
          </List>
        </Paper>
      </Box>
    </Container>
  );
}