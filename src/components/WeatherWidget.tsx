"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Card, CardContent, Typography, Box, Grid, Skeleton, Alert, Divider,
  CircularProgress
} from '@mui/material';

interface WeatherData {
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
  name: string;
}

interface ForecastDay {
  date: string;
  dayName: string;
  temp: number;
  icon: string;
  description: string;
}

export default function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Check if API key exists, otherwise use fallback data for demo
        const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
        
        if (!apiKey || apiKey === 'DEMO_KEY') {
          // Use fallback data for demo purposes
          console.log('Using fallback weather data for demo');
          setUseFallback(true);
          setLoading(false);
          return;
        }
        
        // Fetch current weather
        const currentRes = await axios.get(
          'https://api.openweathermap.org/data/2.5/weather', {
            params: {
              q: 'Radzyn Podlaski,pl',
              units: 'metric',
              appid: apiKey
            }
          }
        );
        setWeather(currentRes.data);
        
        // Fetch forecast for next days
        const forecastRes = await axios.get(
          'https://api.openweathermap.org/data/2.5/forecast', {
            params: {
              q: 'Radzyn Podlaski,pl',
              units: 'metric',
              appid: apiKey
            }
          }
        );
        
        // Process forecast data to get one entry per day
        const processedForecast = processForecastData(forecastRes.data.list);
        setForecast(processedForecast);
      } catch (err) {
        console.error('Error fetching weather data:', err);
        setError('Nie udało się pobrać danych pogodowych');
        setUseFallback(true);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);
  
  // Process forecast data to get one entry per day
  const processForecastData = (forecastList: any[]): ForecastDay[] => {
    const dailyData: ForecastDay[] = [];
    const today = new Date().setHours(0, 0, 0, 0);
    const uniqueDays = new Set();
    
    forecastList.forEach(item => {
      const date = new Date(item.dt * 1000);
      const day = new Date(date).setHours(0, 0, 0, 0);
      
      // Skip today
      if (day === today) return;
      
      const dateStr = date.toISOString().split('T')[0];
      
      // Only take one forecast per day (noon time preferably)
      if (!uniqueDays.has(dateStr) && date.getHours() >= 12 && date.getHours() <= 15) {
        uniqueDays.add(dateStr);
        
        const dayNames = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'];
        
        dailyData.push({
          date: dateStr,
          dayName: dayNames[date.getDay()],
          temp: item.main.temp,
          icon: item.weather[0].icon,
          description: item.weather[0].description
        });
      }
    });
    
    // Limit to 3 days
    return dailyData.slice(0, 3);
  };

  // Mock data for fallback/demo mode
  const mockCurrentWeather = {
    main: {
      temp: 18,
      feels_like: 17,
      humidity: 65,
    },
    weather: [{
      main: 'Clouds',
      description: 'zachmurzenie',
      icon: '04d'
    }],
    wind: {
      speed: 3.5,
    },
    name: 'Radzyń Podlaski'
  };
  
  const mockForecast = [
    {
      date: '2025-03-21',
      dayName: 'Piątek',
      temp: 20,
      icon: '01d',
      description: 'słonecznie'
    },
    {
      date: '2025-03-22',
      dayName: 'Sobota',
      temp: 19,
      icon: '02d',
      description: 'częściowe zachmurzenie'
    },
    {
      date: '2025-03-23',
      dayName: 'Niedziela',
      temp: 17,
      icon: '10d',
      description: 'lekki deszcz'
    }
  ];

  if (loading) {
    return (
      <Card sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 3 }}>
          <CircularProgress />
        </Box>
        <CardContent>
          <Skeleton variant="text" width="75%" height={30} />
          <Box sx={{ display: 'flex', mt: 2, mb: 2 }}>
            <Skeleton variant="circular" width={64} height={64} />
            <Box sx={{ ml: 2 }}>
              <Skeleton variant="text" width={80} height={40} />
              <Skeleton variant="text" width={120} height={20} />
            </Box>
          </Box>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={4}>
              <Skeleton variant="rectangular" height={60} />
            </Grid>
            <Grid item xs={4}>
              <Skeleton variant="rectangular" height={60} />
            </Grid>
            <Grid item xs={4}>
              <Skeleton variant="rectangular" height={60} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }

  const currentWeatherData = useFallback ? mockCurrentWeather : weather;
  const forecastData = useFallback ? mockForecast : forecast;

  if (error && !useFallback) {
    return <Alert severity="error" sx={{ p: 2 }}>{error}</Alert>;
  }
  
  if (!currentWeatherData) return null;

  return (
    <Card>
      <CardContent>
        {useFallback && (
          <Alert severity="warning" sx={{ mb: 2 }} variant="outlined">
            Tryb demonstracyjny - dane pogodowe są symulowane
          </Alert>
        )}
        
        <Typography variant="h5" component="h3" gutterBottom>
          Pogoda w Radzyniu Podlaskim
        </Typography>
        
        {/* Current weather */}
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
          <Box 
            sx={{ 
              flexShrink: 0, 
              backgroundColor: 'primary.light', 
              borderRadius: '50%',
              p: 0.5,
              opacity: 0.2
            }}
          >
            <img 
              src={`https://openweathermap.org/img/wn/${currentWeatherData.weather[0].icon}@2x.png`}
              alt={currentWeatherData.weather[0].description}
              width={64}
              height={64}
            />
          </Box>
          <Box sx={{ ml: 2 }}>
            <Typography variant="h4" component="p" sx={{ fontWeight: 'bold' }}>
              {Math.round(currentWeatherData.main.temp)}°C
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ textTransform: 'capitalize' }}>
              {currentWeatherData.weather[0].description}
            </Typography>
          </Box>
        </Box>
        
        <Grid container spacing={1} sx={{ mt: 2 }}>
          <Grid item xs={4}>
            <Box sx={{ backgroundColor: 'grey.100', p: 1.5, borderRadius: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Odczuwalna
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                {Math.round(currentWeatherData.main.feels_like)}°C
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box sx={{ backgroundColor: 'grey.100', p: 1.5, borderRadius: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Wilgotność
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                {currentWeatherData.main.humidity}%
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box sx={{ backgroundColor: 'grey.100', p: 1.5, borderRadius: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Wiatr
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                {Math.round(currentWeatherData.wind.speed * 3.6)} km/h
              </Typography>
            </Box>
          </Grid>
        </Grid>
        
        {/* Forecast for next days */}
        <Box sx={{ mt: 3 }}>
          <Divider sx={{ my: 2 }} />
          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'medium' }}>
            Prognoza na kolejne dni
          </Typography>
          <Grid container spacing={1}>
            {forecastData.map((day, index) => (
              <Grid item xs={4} key={index}>
                <Box sx={{ 
                  textAlign: 'center', 
                  backgroundColor: 'primary.light', 
                  p: 1.5, 
                  borderRadius: 1,
                  opacity: 0.2
                }}>
                  <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                    {day.dayName}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <img 
                      src={`https://openweathermap.org/img/wn/${day.icon}.png`}
                      alt={day.description}
                      width={40}
                      height={40}
                    />
                  </Box>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {Math.round(day.temp)}°C
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ 
                    display: 'block',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textTransform: 'capitalize'
                  }}>
                    {day.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
}