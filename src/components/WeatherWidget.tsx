'use client';

import { useState, useEffect } from 'react';
import {
  Typography, Box, Grid, Alert, Divider,
  CircularProgress, Stack
} from '@mui/joy';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Link from 'next/link';
import SectionWrapper from './SectionWrapper';
import Button from './foundation/Button';
import { getCurrentWeather, getWeatherForecast, DailyForecast } from '@/services/weatherService';

export default function WeatherWidget() {
  const [weather, setWeather] = useState<any>(null);
  const [forecast, setForecast] = useState<DailyForecast[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isDemo, setIsDemo] = useState(false);

  const fetchWeather = async () => {
    try {
      setLoading(true);
      
      // Fetch current weather data
      const currentRes = await getCurrentWeather();
      setWeather(currentRes.data);
      setIsDemo(currentRes.isDemo);
      
      // Fetch forecast data for next days
      const forecastRes = await getWeatherForecast();
      setForecast(forecastRes.data.slice(0, 3)); // Only take first 3 days
      
      setError('');
    } catch (err) {
      console.error('Error fetching weather data:', err);
      setError('Nie udało się pobrać danych pogodowych');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  if (error) {
    return (
      <SectionWrapper title="Pogoda w Radzyniu Podlaskim">
        <Alert severity="error">{error}</Alert>
      </SectionWrapper>
    );
  }

  const widgetContent = !weather ? null : (
    <>
      {isDemo && (
        <Alert severity="info" sx={{ mb: 3 }} variant="soft" size="sm">
          Tryb demonstracyjny - dane pogodowe są symulowane
        </Alert>
      )}

      {/* Current weather */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          mb: 3,
        }}
      >
        <Box sx={{ position: 'relative', width: 80, height: 80, flexShrink: 0 }}>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              top: 0,
              left: 0,
              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))'
            }}
          />
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Stack direction="row" alignItems="baseline" spacing={0.5} sx={{ mb: 0.5 }}>
            <Typography level="h2" fontWeight="bold">
              {Math.round(weather.main.temp)}°
            </Typography>
            <Typography level="body-lg" sx={{ color: 'text.secondary' }}>
              C
            </Typography>
          </Stack>
          <Typography
            level="body-md"
            sx={{
              textTransform: 'capitalize',
              fontWeight: 500,
              color: 'text.secondary',
              mb: 1
            }}
          >
            {weather.weather[0].description}
          </Typography>
          <Stack direction="row" spacing={2}>
            <Typography level="body-sm" sx={{ color: 'text.tertiary' }}>
              Odczuwalna: {Math.round(weather.main.feels_like)}°C
            </Typography>
            <Typography level="body-sm" sx={{ color: 'text.tertiary' }}>
              Wilgotność: {weather.main.humidity}%
            </Typography>
            <Typography level="body-sm" sx={{ color: 'text.tertiary' }}>
              Wiatr: {Math.round(weather.wind.speed * 3.6)} km/h
            </Typography>
          </Stack>
        </Box>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Forecast for next days */}
      <Box>
        <Typography level="title-md" sx={{ mb: 2, fontWeight: 'bold' }}>
          Prognoza na kolejne dni
        </Typography>
        <Grid container spacing={2}>
          {forecast.map((day, index) => (
            <Grid xs={4} key={index}>
              <Box
                sx={{
                  p: 2,
                  textAlign: 'center',
                  borderRadius: 'md',
                  bgcolor: 'background.level1',
                  transition: 'all 0.2s',
                  '&:hover': {
                    bgcolor: 'background.level2',
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                <Typography
                  level="body-sm"
                  sx={{
                    fontWeight: 'bold',
                    color: 'text.primary',
                    mb: 1
                  }}
                >
                  {day.dayName.substring(0, 3)}
                </Typography>
                <Box sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  mb: 1
                }}>
                  <img
                    src={`https://openweathermap.org/img/wn/${day.icon}.png`}
                    alt={day.description}
                    width={40}
                    height={40}
                  />
                </Box>
                <Typography level="title-lg" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                  {Math.round(day.temp.day)}°C
                </Typography>
                <Typography
                  level="body-xs"
                  sx={{
                    color: 'text.tertiary',
                    display: 'block',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textTransform: 'capitalize',
                  }}
                >
                  {day.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );

  const loadingContent = (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 3, flexGrow: 1 }}>
      <CircularProgress size="lg" />
    </Box>
  );

  return (
    <SectionWrapper
      title="Pogoda w Radzyniu Podlaskim"
      actions={
        <Button
          component={Link}
          href="/pogoda"
          variant="soft"
          size="md"
          endDecorator={<ArrowForwardIcon />}
          sx={{
            px: 3,
            py: 1.5,
            fontSize: '0.95rem',
          }}
        >
          Pełna prognoza
        </Button>
      }
    >
      {loading ? loadingContent : widgetContent}
    </SectionWrapper>
  );
}