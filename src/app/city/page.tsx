import PlaceholderImage from '@/components/PlaceholderImage';
import { PageContainer } from '@/components/layout/PageContainer';
import { Section } from '@/components/layout/Section';
import { Typography } from '@/components/foundation/Typography';
import { Card } from '@/components/foundation/Card';
import { Grid } from '@mui/joy';

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
    <PageContainer>
      <Typography level="h1" sx={{ mb: 6 }}>
        O Mieście Radzyń Podlaski
      </Typography>
      
      <Section title="Historia" sx={{ mb: 8 }}>
        <Grid container spacing={4}>
          <Grid xs={12} md={6}>
            <Typography level="body-lg" sx={{ mb: 2 }}>
              Radzyń Podlaski to miasto o bogatej historii sięgającej XIV wieku. Pierwsze wzmianki o miejscowości pochodzą z 1468 roku. 
              Przez wieki miasto znajdowało się pod wpływem różnych rodów szlacheckich, w tym Mniszchów i Potockich.
            </Typography>
            <Typography level="body-lg">
              Szczególny rozkwit miasta nastąpił w XVIII wieku za czasów Eustachego Potockiego, który zlecił budowę wspaniałego 
              barokowego pałacu, będącego dziś główną atrakcją turystyczną miasta.
            </Typography>
          </Grid>
          <Grid xs={12} md={6}>
            <div style={{ height: 256 }}>
              <PlaceholderImage 
                title="Historia Radzynia Podlaskiego"
                height={256}
                aspectRatio="landscape"
                sx={{ width: '100%', height: '100%', borderRadius: 'var(--joy-radius-md)' }}
              />
            </div>
          </Grid>
        </Grid>
      </Section>

      <Section title="Położenie i geografia" sx={{ mb: 8 }}>
        <Typography level="body-lg" sx={{ mb: 2 }}>
          Radzyń Podlaski położony jest w północnej części województwa lubelskiego, na Równinie Łukowskiej, będącej częścią Niziny 
          Południowopodlaskiej. Przez miasto przepływa rzeka Białka, dopływ Tyśmienicy.
        </Typography>
        <Typography level="body-lg">
          Miasto zajmuje powierzchnię około 19 km² i jest otoczone malowniczymi terenami rolniczymi i leśnymi, 
          charakterystycznymi dla Podlasia.
        </Typography>
      </Section>

      <Section title="Atrakcje turystyczne" sx={{ mb: 8 }}>
        <Grid container spacing={3}>
          {attractions.map((attraction, index) => (
            <Grid xs={12} sm={6} md={4} key={index}>
              <Card 
                variant="outlined"
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  overflow: 'hidden',
                }}
              >
                <div style={{ height: 192 }}>
                  <PlaceholderImage 
                    title={attraction.title}
                    height={192}
                    aspectRatio="landscape"
                    sx={{ width: '100%', height: '100%' }}
                  />
                </div>
                <div style={{ padding: 'var(--joy-spacing-md)' }}>
                  <Typography level="title-md" sx={{ mb: 1 }}>
                    {attraction.title}
                  </Typography>
                  <Typography level="body-sm" textColor="text.secondary">
                    {attraction.description}
                  </Typography>
                </div>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Section>
    </PageContainer>
  );
}
