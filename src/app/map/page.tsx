import { PageContainer } from '@/components/layout/PageContainer';
import { Section } from '@/components/layout/Section';
import { Typography } from '@/components/foundation/Typography';
import { Card } from '@/components/foundation/Card';
import { Button } from '@/components/foundation/Button';
import { Icon } from '@/components/foundation/Icon';
import { Grid } from '@mui/joy';

export const metadata = {
  title: 'Mapa Radzynia Podlaskiego',
  description: 'Interaktywna mapa miasta z zaznaczonymi miejscami i atrakcjami.',
};

export default function MapPage() {
  const places = [
    { id: 1, name: 'Pałac Potockich', type: 'zabytek', coords: '51.7728, 22.6176' },
    { id: 2, name: 'Kościół Świętej Trójcy', type: 'zabytek', coords: '51.7745, 22.6198' },
    { id: 3, name: 'Rynek Miejski', type: 'publiczny', coords: '51.7752, 22.6210' },
    { id: 4, name: 'Park Miejski', type: 'park', coords: '51.7700, 22.6150' },
    { id: 5, name: 'Urząd Miasta', type: 'publiczny', coords: '51.7760, 22.6225' },
    { id: 6, name: 'Szpital Powiatowy', type: 'publiczny', coords: '51.7680, 22.6100' },
    { id: 7, name: 'Dworzec PKP', type: 'transport', coords: '51.7800, 22.6300' },
    { id: 8, name: 'Dworzec PKS', type: 'transport', coords: '51.7785, 22.6250' },
  ];

  const categories = [
    { id: 'all', name: 'Wszystkie', icon: 'apps' },
    { id: 'zabytek', name: 'Zabytki', icon: 'account_balance' },
    { id: 'publiczny', name: 'Miejsca publiczne', icon: 'location_city' },
    { id: 'park', name: 'Parki', icon: 'park' },
    { id: 'transport', name: 'Transport', icon: 'directions_bus' },
  ];

  return (
    <PageContainer>
      <Typography level="h1" sx={{ mb: 2 }}>
        Mapa Radzynia Podlaskiego
      </Typography>
      <Typography level="body-lg" textColor="text.secondary" sx={{ mb: 6 }}>
        Interaktywna mapa miasta z zaznaczonymi miejscami i atrakcjami
      </Typography>

      <Section title="Kategorie miejsc" sx={{ mb: 6 }}>
        <Grid container spacing={2}>
          {categories.map((category) => (
            <Grid key={category.id}>
              <Button
                variant={category.id === 'all' ? 'solid' : 'outlined'}
                color="primary"
                startDecorator={<Icon name={category.icon} />}
              >
                {category.name}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Section>

      <Section title="Mapa" sx={{ mb: 6 }}>
        <Card 
          variant="outlined" 
          sx={{ 
            p: 0, 
            overflow: 'hidden',
            height: 500,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'background.level1',
          }}
        >
          <div style={{ textAlign: 'center', p: 4 }}>
            <Icon name="map" size="xl" sx={{ mb: 2, color: 'text.tertiary' }} />
            <Typography level="title-lg" textColor="text.secondary" sx={{ mb: 1 }}>
              Interaktywna mapa
            </Typography>
            <Typography level="body-md" textColor="text.tertiary">
              Tutaj zostanie wyświetlona mapa z zaznaczonymi miejscami
            </Typography>
          </div>
        </Card>
      </Section>

      <Section title="Lista miejsc" sx={{ mb: 6 }}>
        <Grid container spacing={2}>
          {places.map((place) => (
            <Grid xs={12} sm={6} md={4} key={place.id}>
              <Card variant="outlined" sx={{ p: 2 }}>
                <Typography level="title-md" sx={{ mb: 0.5 }}>
                  {place.name}
                </Typography>
                <Typography level="body-sm" textColor="primary" sx={{ mb: 1 }}>
                  {place.type}
                </Typography>
                <Typography level="body-sm" textColor="text.secondary">
                  Współrzędne: {place.coords}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Section>

      <Section title="Informacje">
        <Typography level="body-lg" sx={{ mb: 2 }}>
          Mapa interaktywna pozwala na łatwe odnalezienie interesujących miejsc w Radzyniu Podlaskim. 
          Możesz przeglądać miejsca według kategorii, wyszukiwać konkretne lokalizacje i uzyskać 
          szczegółowe informacje o każdym miejscu.
        </Typography>
        <Typography level="body-lg" sx={{ mb: 2 }}>
          Wszystkie miejsca na mapie są dokładnie oznaczone i opisane. Możesz również zobaczyć 
          zdjęcia, opinie użytkowników i dodatkowe informacje o każdej lokalizacji.
        </Typography>
        <Typography level="body-lg">
          Mapa jest regularnie aktualizowana o nowe miejsca i atrakcje turystyczne w mieście.
        </Typography>
      </Section>
    </PageContainer>
  );
}
