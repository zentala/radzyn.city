'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Box,
  CircularProgress,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/joy';
import { PageContainer } from '@/components/layout/PageContainer';
import { Section } from '@/components/layout/Section';
import Tabs from '@/components/layout/Tabs';
import { getAllWeatherData, DailyForecast, CurrentWeather } from '@/services/weatherService';

type WeatherState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | {
      status: 'ready';
      current: CurrentWeather;
      forecast: DailyForecast[];
      isDemo: boolean;
      selectedDay: string;
    };

const formatShortDate = (isoDate: string): string => {
  // isoDate: YYYY-MM-DD
  const parts = isoDate.split('-');
  if (parts.length !== 3) return isoDate;
  const [, month, day] = parts;
  return `${day}.${month}`;
};

export default function WeatherPageClient() {
  const [state, setState] = useState<WeatherState>({ status: 'loading' });

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await getAllWeatherData();
        const firstDay = res.forecast[0]?.date ?? '';
        if (cancelled) return;
        setState({
          status: 'ready',
          current: res.current,
          forecast: res.forecast,
          isDemo: res.isDemo,
          selectedDay: firstDay,
        });
      } catch (e) {
        if (cancelled) return;
        setState({
          status: 'error',
          message: 'Nie udało się pobrać danych pogodowych',
        });
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const tabsItems = useMemo(() => {
    if (state.status !== 'ready') return [];

    return state.forecast.map((day) => ({
      value: day.date,
      label: `${day.dayShort} ${formatShortDate(day.date)}`,
      children: (
        <Box>
          <Typography level="title-md" sx={{ fontWeight: 'bold', mb: 2 }}>
            Prognoza godzinowa
          </Typography>

          <Grid container spacing={2} sx={{ mb: 3 }}>
            {(day.hourly || []).slice(0, 8).map((h) => (
              <Grid key={`${day.date}-${h.time}`} xs={6} sm={4} md={3}>
                <Box
                  sx={{
                    p: 2,
                    borderRadius: 'md',
                    bgcolor: 'background.level1',
                    textAlign: 'center',
                  }}
                >
                  <Typography level="body-sm" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {h.time}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
                    <img
                      src={`https://openweathermap.org/img/wn/${h.icon}.png`}
                      alt={h.description}
                      width={40}
                      height={40}
                    />
                  </Box>
                  <Typography level="title-md" sx={{ fontWeight: 'bold' }}>
                    {Math.round(h.temp)}°C
                  </Typography>
                  <Typography
                    level="body-xs"
                    sx={{
                      color: 'text.tertiary',
                      textTransform: 'capitalize',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {h.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>

          <Divider sx={{ my: 2 }} />

          <Typography level="title-md" sx={{ fontWeight: 'bold', mb: 2 }}>
            Szczegóły
          </Typography>
          <Stack spacing={1}>
            <Typography level="body-md">
              Wilgotność: <Box component="span" sx={{ fontWeight: 'bold' }}>{day.humidity}%</Box>
            </Typography>
            <Typography level="body-md">
              Wiatr:{' '}
              <Box component="span" sx={{ fontWeight: 'bold' }}>
                {Math.round(day.wind * 3.6)} km/h
              </Box>
            </Typography>
            <Typography level="body-md">
              Opady: <Box component="span" sx={{ fontWeight: 'bold' }}>{Math.round(day.precipitation)}%</Box>
            </Typography>
          </Stack>
        </Box>
      ),
    }));
  }, [state]);

  const onTabChange = (_event: any, newValue: string) => {
    if (state.status !== 'ready') return;
    setState({ ...state, selectedDay: newValue });
  };

  if (state.status === 'loading') {
    return (
      <PageContainer>
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 6 }}>
          <CircularProgress size="lg" />
        </Box>
      </PageContainer>
    );
  }

  if (state.status === 'error') {
    return (
      <PageContainer>
        <Alert color="danger" variant="soft">
          {state.message}
        </Alert>
      </PageContainer>
    );
  }

  const selectedDay = state.forecast.find((d) => d.date === state.selectedDay) ?? state.forecast[0];

  return (
    <PageContainer>
      <Typography level="h1" sx={{ mb: 2 }}>
        Radzyń Podlaski
      </Typography>
      <Typography level="body-lg" sx={{ color: 'text.secondary', mb: 4 }}>
        Aktualna prognoza pogody dla Radzynia Podlaskiego i okolic
      </Typography>

      {state.isDemo && (
        <Alert color="primary" variant="soft" sx={{ mb: 3 }}>
          Tryb demonstracyjny - dane pogodowe są symulowane
        </Alert>
      )}

      <Section title="Aktualna pogoda" sx={{ mb: 4 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 3,
            p: 3,
            borderRadius: 'md',
            bgcolor: 'background.level1',
          }}
        >
          <Box>
            <Stack direction="row" alignItems="baseline" spacing={0.5}>
              <Typography level="h2" sx={{ fontWeight: 'bold' }}>
                {Math.round(state.current.main.temp)}°
              </Typography>
              <Typography level="body-lg" sx={{ color: 'text.secondary' }}>
                C
              </Typography>
            </Stack>
            <Typography level="title-md" sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
              {state.current.weather[0]?.description}
            </Typography>
          </Box>
          <Box sx={{ width: 96, height: 96, position: 'relative', flexShrink: 0 }}>
            <img
              src={`https://openweathermap.org/img/wn/${state.current.weather[0]?.icon}@2x.png`}
              alt={state.current.weather[0]?.description || 'weather icon'}
              style={{ width: '100%', height: '100%' }}
            />
          </Box>
        </Box>
      </Section>

      <Section title="Prognoza" sx={{ mb: 4 }}>
        <Tabs
          items={tabsItems}
          value={state.selectedDay}
          onChange={onTabChange}
          variant="soft"
          sx={{ mb: 2 }}
        />

        {selectedDay && (
          <Box sx={{ mt: 2 }}>
            <Typography level="body-sm" sx={{ color: 'text.tertiary' }}>
              {selectedDay.dayName} ({formatShortDate(selectedDay.date)})
            </Typography>
          </Box>
        )}
      </Section>
    </PageContainer>
  );
}

