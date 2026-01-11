import PlaceholderImage from '@/components/PlaceholderImage';
import { PageContainer } from '@/components/layout/PageContainer';
import { Section } from '@/components/layout/Section';
import { Typography } from '@/components/foundation/Typography';
import { Card } from '@/components/foundation/Card';
import { Grid } from '@mui/joy';

export const metadata = {
  title: 'Powiat Radzyński - Informacje',
  description: 'Informacje o powiecie radzyńskim, gminach, atrakcjach i turystyce.',
};

export default function CountyPage() {
  const gminy = [
    { name: 'Radzyń Podlaski', description: 'Miasto powiatowe, siedziba władz powiatu' },
    { name: 'Biała Podlaska', description: 'Gmina wiejska z bogatą historią' },
    { name: 'Czemierniki', description: 'Gmina z zabytkowym pałacem' },
    { name: 'Drelów', description: 'Gmina wiejska w północnej części powiatu' },
    { name: 'Kąkolewnica', description: 'Gmina z malowniczymi krajobrazami' },
    { name: 'Komarówka Podlaska', description: 'Gmina z tradycjami rolniczymi' },
    { name: 'Parczew', description: 'Gmina sąsiadująca z miastem Parczew' },
    { name: 'Ulan-Majorat', description: 'Gmina z ciekawą historią' },
    { name: 'Wohyń', description: 'Gmina w południowej części powiatu' },
  ];

  const atrakcje = [
    {
      title: 'Pałac Potockich',
      location: 'Radzyń Podlaski',
      description: 'Barokowy pałac z XVIII wieku, zabytek klasy zerowej',
    },
    {
      title: 'Pałac w Czemiernikach',
      location: 'Czemierniki',
      description: 'Renesansowy pałac z XVI wieku, otoczony parkiem',
    },
    {
      title: 'Kościół Świętej Trójcy',
      location: 'Radzyń Podlaski',
      description: 'Zabytkowy kościół z XVII wieku',
    },
  ];

  return (
    <PageContainer>
      <Typography level="h1" sx={{ mb: 6 }}>
        Powiat Radzyński
      </Typography>
      
      <Section title="Informacje ogólne" sx={{ mb: 8 }}>
        <Grid container spacing={4}>
          <Grid xs={12} md={6}>
            <Typography level="body-lg" sx={{ mb: 2 }}>
              Powiat radzyński to jednostka podziału administracyjnego w województwie lubelskim, 
              obejmująca obszar 965 km². Siedzibą powiatu jest miasto Radzyń Podlaski.
            </Typography>
            <Typography level="body-lg" sx={{ mb: 2 }}>
              Powiat graniczy z powiatami: parczewskim, lubartowskim, łukowskim, bialskim i 
              włodawskim. Jest to region o charakterze rolniczym z bogatą historią i tradycjami.
            </Typography>
            <Typography level="body-lg">
              Ludność powiatu wynosi około 60 tysięcy mieszkańców, z czego większość zamieszkuje 
              na terenach wiejskich. Gospodarka opiera się głównie na rolnictwie, przetwórstwie 
              spożywczym i usługach.
            </Typography>
          </Grid>
          <Grid xs={12} md={6}>
            <div style={{ height: 256 }}>
              <PlaceholderImage 
                title="Powiat Radzyński"
                height={256}
                aspectRatio="landscape"
                sx={{ width: '100%', height: '100%', borderRadius: 'var(--joy-radius-md)' }}
              />
            </div>
          </Grid>
        </Grid>
      </Section>

      <Section title="Gminy powiatu" sx={{ mb: 8 }}>
        <Grid container spacing={2}>
          {gminy.map((gmina, index) => (
            <Grid xs={12} sm={6} md={4} key={index}>
              <Card variant="outlined" sx={{ p: 2 }}>
                <Typography level="title-md" sx={{ mb: 0.5 }}>
                  {gmina.name}
                </Typography>
                <Typography level="body-sm" textColor="text.secondary">
                  {gmina.description}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Section>

      <Section title="Atrakcje turystyczne" sx={{ mb: 8 }}>
        <Grid container spacing={3}>
          {atrakcje.map((atrakcja, index) => (
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
                    title={atrakcja.title}
                    height={192}
                    aspectRatio="landscape"
                    sx={{ width: '100%', height: '100%' }}
                  />
                </div>
                <div style={{ padding: 'var(--joy-spacing-md)' }}>
                  <Typography level="title-md" sx={{ mb: 0.5 }}>
                    {atrakcja.title}
                  </Typography>
                  <Typography level="body-sm" textColor="primary" sx={{ mb: 1 }}>
                    {atrakcja.location}
                  </Typography>
                  <Typography level="body-sm" textColor="text.secondary">
                    {atrakcja.description}
                  </Typography>
                </div>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Section>

      <Section title="Turystyka i rekreacja">
        <Typography level="body-lg" sx={{ mb: 2 }}>
          Powiat radzyński oferuje wiele możliwości spędzenia czasu wolnego. Malownicze krajobrazy, 
          liczne zabytki i czyste środowisko sprzyjają rozwojowi turystyki.
        </Typography>
        <Typography level="body-lg" sx={{ mb: 2 }}>
          W regionie znajdują się szlaki turystyczne, ścieżki rowerowe i miejsca do wędkowania. 
          Czyste powietrze i spokój przyciągają turystów szukających odpoczynku od miejskiego zgiełku.
        </Typography>
        <Typography level="body-lg">
          Lokalna kuchnia, oparta na tradycyjnych recepturach i świeżych produktach z lokalnych gospodarstw, 
          jest dodatkową atrakcją dla odwiedzających region.
        </Typography>
      </Section>
    </PageContainer>
  );
}
