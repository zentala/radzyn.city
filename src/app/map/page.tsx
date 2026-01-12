'use client';

import { useState, useEffect } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Section } from '@/components/layout/Section';
import { Typography } from '@/components/foundation/Typography';
import { Card } from '@/components/foundation/Card';
import { Button } from '@/components/foundation/Button';
import { Icon } from '@/components/foundation/Icon';
import { Grid } from '@mui/joy';
import { fetchLocations } from '@/services/locationService';
import { LocationPoint } from '@/components/Map';

export default function MapPage() {
  const [locations, setLocations] = useState<LocationPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadLocations = async () => {
      try {
        const data = await fetchLocations();
        setLocations(data);
      } catch (err) {
        console.error('Failed to load locations:', err);
        setError('Nie udało się pobrać danych lokalizacji');
      } finally {
        setLoading(false);
      }
    };

    loadLocations();
  }, []);

  // Extract unique categories from locations
  const categories = [
    { id: 'all', name: 'Wszystkie', icon: 'apps' },
    ...Array.from(new Set(locations.map(loc => loc.category)))
      .map(category => ({
        id: category,
        name: category,
        icon: getCategoryIcon(category)
      }))
  ];

  function getCategoryIcon(category: string): string {
    const iconMap: Record<string, string> = {
      'Zabytki': 'account_balance',
      'Miejsca publiczne': 'location_city',
      'Rekreacja': 'park',
      'Instytucje': 'business',
      'Kultura': 'museum',
      'Sport': 'sports_soccer',
      'Gastronomia': 'restaurant'
    };
    return iconMap[category] || 'place';
  }

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
            bgcolor: 'background.level1',
          }}
        >
          <iframe
            src="http://localhost:3001/map" // Guide app URL
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              borderRadius: '8px'
            }}
            title="Mapa Radzynia Podlaskiego"
          />
        </Card>
        <Typography level="body-sm" textColor="text.secondary" sx={{ mt: 1, textAlign: 'center' }}>
          Mapa dostarczana przez aplikację przewodnika audio
        </Typography>
      </Section>

      <Section title="Lista miejsc" sx={{ mb: 6 }}>
        <Grid container spacing={2}>
          {locations.length > 0 ? locations.slice(0, 8).map((location) => (
            <Grid xs={12} sm={6} md={4} key={location.id}>
              <Card variant="outlined" sx={{ p: 2 }}>
                <Typography level="title-md" sx={{ mb: 0.5 }}>
                  {location.name}
                </Typography>
                <Typography level="body-sm" textColor="primary" sx={{ mb: 1 }}>
                  {location.category}
                </Typography>
                <Typography level="body-sm" textColor="text.secondary">
                  {location.address || 'Brak adresu'}
                </Typography>
              </Card>
            </Grid>
          )) : (
            <Grid xs={12}>
              <Typography level="body-md" textColor="text.secondary">
                Ładowanie miejsc...
              </Typography>
            </Grid>
          )}
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
                  {location.address || 'Brak adresu'}
                </Typography>
              </Card>
            </Grid>
          )) : (
            <Grid xs={12}>
              <Typography level="body-md" textColor="text.secondary">
                Ładowanie miejsc...
              </Typography>
            </Grid>
          )}
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


