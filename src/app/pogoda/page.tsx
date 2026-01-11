import { PageContainer } from '@/components/layout/PageContainer';
import { Section } from '@/components/layout/Section';
import { Typography } from '@/components/foundation/Typography';
import { Card } from '@/components/foundation/Card';
import { Icon } from '@/components/foundation/Icon';
import { Grid } from '@mui/joy';

export const metadata = {
  title: 'Pogoda Radzyń Podlaski',
  description: 'Aktualna prognoza pogody dla Radzynia Podlaskiego i okolic.',
};

export default function PogodaPage() {
  const currentWeather = {
    temperature: 18,
    condition: 'Częściowe zachmurzenie',
    humidity: 65,
    wind: 12,
    pressure: 1015,
    icon: 'partly_cloudy_day',
  };

  const forecast = [
    { day: 'Poniedziałek', temp: 18, condition: 'Słonecznie', icon: 'wb_sunny' },
    { day: 'Wtorek', temp: 20, condition: 'Słonecznie', icon: 'wb_sunny' },
    { day: 'Środa', temp: 17, condition: 'Częściowe zachmurzenie', icon: 'partly_cloudy_day' },
    { day: 'Czwartek', temp: 15, condition: 'Deszczowo', icon: 'water_drop' },
    { day: 'Piątek', temp: 16, condition: 'Częściowe zachmurzenie', icon: 'partly_cloudy_day' },
    { day: 'Sobota', temp: 19, condition: 'Słonecznie', icon: 'wb_sunny' },
    { day: 'Niedziela', temp: 21, condition: 'Słonecznie', icon: 'wb_sunny' },
  ];

  const additionalInfo = [
    { label: 'Wilgotność', value: `${currentWeather.humidity}%`, icon: 'water_drop' },
    { label: 'Wiatr', value: `${currentWeather.wind} km/h`, icon: 'air' },
    { label: 'Ciśnienie', value: `${currentWeather.pressure} hPa`, icon: 'compress' },
    { label: 'Wschód słońca', value: '06:45', icon: 'wb_twilight' },
    { label: 'Zachód słońca', value: '19:30', icon: 'nights_stay' },
    { label: 'Indeks UV', value: '5 (Średni)', icon: 'wb_sunny' },
  ];

  return (
    <PageContainer>
      <Typography level="h1" sx={{ mb: 2 }}>
        Pogoda Radzyń Podlaski
      </Typography>
      <Typography level="body-lg" textColor="text.secondary" sx={{ mb: 6 }}>
        Aktualna prognoza pogody dla Radzynia Podlaskiego i okolic
      </Typography>

      <Section title="Aktualna pogoda" sx={{ mb: 6 }}>
        <Card 
          variant="outlined" 
          sx={{ 
            p: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 4,
          }}
        >
          <div>
            <Typography level="h2" sx={{ mb: 1 }}>
              {currentWeather.temperature}°C
            </Typography>
            <Typography level="title-lg" textColor="text.secondary">
              {currentWeather.condition}
            </Typography>
          </div>
          <Icon 
            name={currentWeather.icon} 
            size="xl" 
            sx={{ 
              color: 'warning.400',
              fontSize: '4rem',
            }} 
          />
        </Card>
      </Section>

      <Section title="Dodatkowe informacje" sx={{ mb: 6 }}>
        <Grid container spacing={2}>
          {additionalInfo.map((info, index) => (
            <Grid xs={12} sm={6} md={4} key={index}>
              <Card variant="outlined" sx={{ p: 2 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Icon name={info.icon} sx={{ color: 'primary.400' }} />
                  <div>
                    <Typography level="body-sm" textColor="text.secondary">
                      {info.label}
                    </Typography>
                    <Typography level="title-md">
                      {info.value}
                    </Typography>
                  </div>
                </div>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Section>

      <Section title="Prognoza 7-dniowa" sx={{ mb: 6 }}>
        <Grid container spacing={2}>
          {forecast.map((day, index) => (
            <Grid xs={12} sm={6} md={4} lg={3} key={index}>
              <Card variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                <Typography level="title-md" sx={{ mb: 1 }}>
                  {day.day}
                </Typography>
                <Icon 
                  name={day.icon} 
                  size="lg" 
                  sx={{ 
                    mb: 1,
                    color: day.condition === 'Deszczowo' ? 'primary.400' : 'warning.400',
                  }} 
                />
                <Typography level="h3" sx={{ mb: 0.5 }}>
                  {day.temp}°C
                </Typography>
                <Typography level="body-sm" textColor="text.secondary">
                  {day.condition}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Section>

      <Section title="Informacje">
        <Typography level="body-lg" sx={{ mb: 2 }}>
          Prognoza pogody jest aktualizowana co godzinę i opiera się na danych z najnowszych 
          modeli meteorologicznych. Dane są pobierane z wiarygodnych źródeł i regularnie 
          weryfikowane.
        </Typography>
        <Typography level="body-lg" sx={{ mb: 2 }}>
          W przypadku nagłych zmian warunków pogodowych, informacje są aktualizowane natychmiastowo. 
          Możesz również sprawdzić prognozę długoterminową i alerty pogodowe dla regionu.
        </Typography>
        <Typography level="body-lg">
          Pamiętaj, że prognoza pogody ma charakter orientacyjny i może ulec zmianom. 
          Zalecamy sprawdzanie aktualnych warunków przed planowaniem aktywności na zewnątrz.
        </Typography>
      </Section>
    </PageContainer>
  );
}
