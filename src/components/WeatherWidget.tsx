'use client';

import { useState, useEffect } from 'react';
import {
  Typography, Box, Grid, Alert, Divider,
  CircularProgress, Button, Chip, Sheet,
  Stack
} from '@mui/joy';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Link from 'next/link';
import DashboardWidget from './DashboardWidget';
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
      <DashboardWidget title="Pogoda w Radzyniu Podlaskim">
        <Alert severity="error">{error}</Alert>
      </DashboardWidget>
    );
  }

  const widgetContent = !weather ? null : (
    <>
      {isDemo && (
        <Alert severity="info" sx={{ mb: 2 }} variant="outlined" size="small">
          Tryb demonstracyjny - dane pogodowe są symulowane
        </Alert>
      )}
      
      {/* Current weather */}
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          mt: 1,
          borderRadius: 2,
          p: 2,
          background: 'linear-gradient(135deg, rgba(66,133,244,0.1) 0%, rgba(66,133,244,0.05) 100%)',
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
        <Box sx={{ ml: 1, flexGrow: 1 }}>
          <Stack direction="row" alignItems="baseline" spacing={1}>
            <Typography variant="h3" component="p" fontWeight="bold">
              {Math.round(weather.main.temp)}°
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.9rem' }}>
              C
            </Typography>
          </Stack>
          <Typography 
            variant="body1" 
            color="text.secondary" 
            sx={{ 
              textTransform: 'capitalize',
              fontWeight: 500
            }}
          >
            {weather.weather[0].description}
          </Typography>
        </Box>
        <Stack direction="column" spacing={1} alignItems="flex-end">
          <Chip 
            label={`Odczuwalna: ${Math.round(weather.main.feels_like)}°C`} 
            size="small"
            sx={{ 
              backgroundColor: 'primary.light',
              color: 'white',
              fontWeight: 500,
              fontSize: '0.7rem'
            }}
          />
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <Typography variant="caption" color="text.secondary">
              Wilgotność: {weather.main.humidity}%
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Wiatr: {Math.round(weather.wind.speed * 3.6)} km/h
            </Typography>
          </Box>
        </Stack>
      </Box>
      
      {/* Forecast for next days */}
      <Box sx={{ mt: 2 }}>
        <Divider sx={{ my: 2 }} />
        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'medium' }}>
          Prognoza na kolejne dni
        </Typography>
        <Grid container spacing={1}>
          {forecast.map((day, index) => (
            <Grid item xs={4} key={index}>
              <Sheet
                variant="outlined"
                sx={{
                  p: 1.5,
                  textAlign: 'center',
                  borderRadius: 2,
                  transition: 'all 0.2s',
                  '&:hover': {
                    boxShadow: 'sm',
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontWeight: 'medium',
                    color: 'primary.main'
                  }}
                >
                  {day.dayName.substring(0, 3)}
                </Typography>
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'center',
                  my: 1
                }}>
                  <img 
                    src={`https://openweathermap.org/img/wn/${day.icon}.png`}
                    alt={day.description}
                    width={40}
                    height={40}
                  />
                </Box>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  {Math.round(day.temp.day)}°C
                </Typography>
                <Typography 
                  variant="caption" 
                  color="text.secondary" 
                  sx={{ 
                    display: 'block',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textTransform: 'capitalize',
                    mt: 0.5
                  }}
                >
                  {day.description}
                </Typography>
              </Sheet>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );

  const loadingContent = (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 3, flexGrow: 1 }}>
      <CircularProgress size={40} thickness={4} />
    </Box>
  );

  return (
    <DashboardWidget 
      title="Pogoda w Radzyniu Podlaskim"
      loading={loading}
      onRefresh={fetchWeather}
      actions={
        <Button 
          size="small" 
          endIcon={<ArrowForwardIcon />}
          component={Link}
          href="/pogoda"
          sx={{
            fontWeight: 500,
            borderRadius: '20px',
            px: 1.5,
            '&:hover': {
              backgroundColor: 'rgba(25, 118, 210, 0.08)'
            }
          }}
        >
          Pełna prognoza
        </Button>
      }
    >
      {loading ? loadingContent : widgetContent}
    </DashboardWidget>
  );
}