'use client';

import { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  Alert, 
  CircularProgress,
  Paper,
  Divider,
  Tabs,
  Tab
} from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import AirIcon from '@mui/icons-material/Air';
import OpacityIcon from '@mui/icons-material/Opacity';
import CompressIcon from '@mui/icons-material/Compress';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { getAllWeatherData, CurrentWeather, DailyForecast } from '@/services/weatherService';

export default function WeatherPage() {
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState<CurrentWeather | null>(null);
  const [forecast, setForecast] = useState<DailyForecast[]>([]);
  const [isDemo, setIsDemo] = useState(false);
  const [error, setError] = useState('');
  const [selectedDay, setSelectedDay] = useState(0);

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const fetchWeatherData = async () => {
    try {
      setLoading(true);
      const { current, forecast, isDemo } = await getAllWeatherData();
      setWeather(current);
      setForecast(forecast);
      setIsDemo(isDemo);
      setError('');
    } catch (err) {
      console.error('Error fetching weather data:', err);
      setError('Nie udało się pobrać danych pogodowych');
    } finally {
      setLoading(false);
    }
  };
  
  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          minHeight: '40vh',
          py: 8 
        }}>
          <CircularProgress size={60} thickness={4} />
          <Typography variant="h6" sx={{ mt: 3 }}>
            Pobieramy najnowsze dane pogodowe...
          </Typography>
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ py: 4 }}>
          <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
          <Typography variant="body1">
            Przepraszamy, wystąpił błąd podczas pobierania danych pogodowych. Spróbuj odświeżyć stronę.
          </Typography>
        </Box>
      </Container>
    );
  }

  if (!weather || forecast.length === 0) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ py: 4 }}>
          <Alert severity="warning" sx={{ mb: 2 }}>Brak danych pogodowych</Alert>
          <Typography variant="body1">
            Nie udało się pobrać danych pogodowych. Spróbuj odświeżyć stronę.
          </Typography>
        </Box>
      </Container>
    );
  }

  // Format sunrise and sunset times
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' });
  };

  const sunriseTime = weather.sys?.sunrise ? formatTime(weather.sys.sunrise) : '--:--';
  const sunsetTime = weather.sys?.sunset ? formatTime(weather.sys.sunset) : '--:--';

  // Determine background gradient based on time of day
  const getTimeOfDayGradient = () => {
    if (!weather.sys) return 'linear-gradient(to bottom, #4B79A1, #283E51)'; // Default blue

    const now = Math.floor(Date.now() / 1000);
    const sunrise = weather.sys.sunrise;
    const sunset = weather.sys.sunset;

    if (now < sunrise) {
      // Before sunrise (night/dawn)
      return 'linear-gradient(to bottom, #232526, #414345)';
    } else if (now < sunrise + 7200) {
      // Sunrise and 2 hours after (morning)
      return 'linear-gradient(to bottom, #FF9966, #FF5E62)';
    } else if (now < sunset - 7200) {
      // Daytime
      return 'linear-gradient(to bottom, #4B79A1, #283E51)';
    } else if (now < sunset) {
      // 2 hours before sunset (evening)
      return 'linear-gradient(to bottom, #F27121, #E94057, #8A2387)';
    } else {
      // After sunset (night)
      return 'linear-gradient(to bottom, #0F2027, #203A43, #2C5364)';
    }
  };

  const getWeatherIconUrl = (iconCode: string, large = false) => {
    return `https://openweathermap.org/img/wn/${iconCode}${large ? '@4x' : '@2x'}.png`;
  };

  // Handle tab change for daily forecast
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedDay(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {isDemo && (
        <Alert severity="info" sx={{ mb: 4 }}>
          Tryb demonstracyjny - dane pogodowe są symulowane. Aby zobaczyć rzeczywiste dane, 
          dodaj klucz API OpenWeatherMap do zmiennych środowiskowych.
        </Alert>
      )}

      {/* Current weather hero section */}
      <Paper
        elevation={3}
        sx={{
          p: 0,
          borderRadius: 3,
          overflow: 'hidden',
          mb: 4,
          position: 'relative',
          background: getTimeOfDayGradient(),
          color: 'white',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
        }}
      >
        <Box sx={{ 
          p: { xs: 3, md: 5 },
          position: 'relative',
          zIndex: 2
        }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: { xs: 3, md: 0 } }}>
                <Typography variant="h6" fontWeight="regular" sx={{ mb: 1, opacity: 0.9 }}>
                  Aktualna pogoda
                </Typography>
                <Typography variant="h3" component="h1" fontWeight="bold" sx={{ mb: 2 }}>
                  {weather.name}
                </Typography>
                <Typography 
                  variant="h2" 
                  component="p" 
                  fontWeight="bold" 
                  sx={{ 
                    fontSize: { xs: '3rem', sm: '4rem' },
                    mb: 1
                  }}
                >
                  {Math.round(weather.main.temp)}°C
                </Typography>
                <Typography 
                  variant="h6" 
                  component="p" 
                  sx={{ 
                    textTransform: 'capitalize',
                    fontWeight: 'normal',
                    opacity: 0.9
                  }}
                >
                  {weather.weather[0].description}
                </Typography>
                
                <Box sx={{ mt: 3, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  <Typography variant="body1" component="p" sx={{ mr: 3, display: 'flex', alignItems: 'center' }}>
                    <OpacityIcon fontSize="small" sx={{ mr: 1, opacity: 0.7 }} />
                    Wilgotność: {weather.main.humidity}%
                  </Typography>
                  <Typography variant="body1" component="p" sx={{ mr: 3, display: 'flex', alignItems: 'center' }}>
                    <AirIcon fontSize="small" sx={{ mr: 1, opacity: 0.7 }} />
                    Wiatr: {Math.round(weather.wind.speed * 3.6)} km/h
                  </Typography>
                </Box>
                
                <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  <Typography variant="body1" component="p" sx={{ mr: 3, display: 'flex', alignItems: 'center' }}>
                    <AccessTimeIcon fontSize="small" sx={{ mr: 1, opacity: 0.7 }} />
                    Wschód słońca: {sunriseTime}
                  </Typography>
                  <Typography variant="body1" component="p" sx={{ mr: 3, display: 'flex', alignItems: 'center' }}>
                    <AccessTimeIcon fontSize="small" sx={{ mr: 1, opacity: 0.7 }} />
                    Zachód słońca: {sunsetTime}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6} sx={{ textAlign: 'center' }}>
              <Box 
                sx={{ 
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%'
                }}
              >
                <img 
                  src={getWeatherIconUrl(weather.weather[0].icon, true)} 
                  alt={weather.weather[0].description}
                  style={{ 
                    width: '200px', 
                    filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.3))'
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      {/* Daily forecast tabs */}
      <Paper elevation={2} sx={{ borderRadius: 2, mb: 4, overflow: 'hidden' }}>
        <Tabs 
          value={selectedDay} 
          onChange={handleTabChange} 
          variant="scrollable"
          scrollButtons="auto"
          sx={{ 
            backgroundColor: 'primary.main',
            color: 'white',
            '& .MuiTabs-indicator': {
              backgroundColor: 'white',
            },
            '& .MuiTab-root': {
              color: 'rgba(255,255,255,0.7)',
              '&.Mui-selected': {
                color: 'white',
              }
            }
          }}
        >
          {forecast.map((day, index) => (
            <Tab 
              key={day.date} 
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                  <Typography component="span" sx={{ fontSize: '0.9rem', fontWeight: 'bold' }}>
                    {day.dayShort}
                  </Typography>
                  <Typography component="span" sx={{ fontSize: '0.8rem' }}>
                    {day.date.split('-').slice(1).join('/')}
                  </Typography>
                </Box>
              } 
            />
          ))}
        </Tabs>
        
        {forecast.map((day, index) => (
          <Box
            key={day.date}
            role="tabpanel"
            hidden={selectedDay !== index}
            id={`weather-tabpanel-${index}`}
            aria-labelledby={`weather-tab-${index}`}
          >
            {selectedDay === index && (
              <Box sx={{ p: 3 }}>
                <Grid container spacing={3}>
                  {/* Day summary */}
                  <Grid item xs={12}>
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      mb: 3,
                      flexDirection: { xs: 'column', sm: 'row' },
                      textAlign: { xs: 'center', sm: 'left' }
                    }}>
                      <Box>
                        <Typography variant="h5" component="h2" fontWeight="bold">
                          {day.dayName}, {day.date.split('-').reverse().join('.')}
                        </Typography>
                        <Typography 
                          variant="h6" 
                          component="p" 
                          sx={{ 
                            textTransform: 'capitalize',
                            color: 'text.secondary'
                          }}
                        >
                          {day.description}
                        </Typography>
                      </Box>
                      
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        mt: { xs: 2, sm: 0 }
                      }}>
                        <img 
                          src={getWeatherIconUrl(day.icon)} 
                          alt={day.description}
                          style={{ width: '64px' }}
                        />
                        <Box sx={{ textAlign: 'center', minWidth: '100px' }}>
                          <Typography variant="h4" component="p" fontWeight="bold">
                            {Math.round(day.temp.day)}°C
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {Math.round(day.temp.min)}° / {Math.round(day.temp.max)}°
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                  
                  {/* Weather details */}
                  <Grid item xs={12} md={4}>
                    <Card variant="outlined" sx={{ height: '100%' }}>
                      <CardContent>
                        <Typography variant="h6" component="h3" gutterBottom>
                          Szczegóły
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <OpacityIcon sx={{ color: 'primary.main', mr: 2 }} />
                            <Typography variant="body1">
                              Wilgotność: <strong>{day.humidity}%</strong>
                            </Typography>
                          </Box>
                          
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <AirIcon sx={{ color: 'primary.main', mr: 2 }} />
                            <Typography variant="body1">
                              Wiatr: <strong>{Math.round(day.wind * 3.6)} km/h</strong>
                            </Typography>
                          </Box>
                          
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <WbSunnyIcon sx={{ color: 'primary.main', mr: 2 }} />
                            <Typography variant="body1">
                              Opady: <strong>{Math.round(day.precipitation)}%</strong>
                            </Typography>
                          </Box>
                          
                          {day.sunrise && day.sunset && (
                            <>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <AccessTimeIcon sx={{ color: 'primary.main', mr: 2 }} />
                                <Typography variant="body1">
                                  Wschód: <strong>{formatTime(day.sunrise)}</strong>
                                </Typography>
                              </Box>
                              
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <AccessTimeIcon sx={{ color: 'primary.main', mr: 2 }} />
                                <Typography variant="body1">
                                  Zachód: <strong>{formatTime(day.sunset)}</strong>
                                </Typography>
                              </Box>
                            </>
                          )}
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                  
                  {/* Hourly forecast */}
                  <Grid item xs={12} md={8}>
                    <Card variant="outlined" sx={{ height: '100%' }}>
                      <CardContent>
                        <Typography variant="h6" component="h3" gutterBottom>
                          Prognoza godzinowa
                        </Typography>
                        <Box sx={{ overflowX: 'auto', mt: 2 }}>
                          <Box sx={{ 
                            display: 'flex', 
                            gap: 2,
                            pb: 1,
                            minWidth: day.hourly?.length ? day.hourly.length * 90 : 600
                          }}>
                            {day.hourly?.map((hour, idx) => (
                              <Box 
                                key={idx} 
                                sx={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  alignItems: 'center',
                                  p: 1,
                                  minWidth: '80px',
                                  borderRadius: 1,
                                  backgroundColor: 'background.paper',
                                  border: '1px solid',
                                  borderColor: 'divider'
                                }}
                              >
                                <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                                  {hour.time}
                                </Typography>
                                <img 
                                  src={getWeatherIconUrl(hour.icon)}
                                  alt={hour.description}
                                  style={{ width: '50px', height: '50px' }}
                                />
                                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                  {Math.round(hour.temp)}°C
                                </Typography>
                                <Typography 
                                  variant="caption" 
                                  sx={{ 
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 0.5,
                                    color: 'text.secondary',
                                    mt: 1
                                  }}
                                >
                                  <OpacityIcon sx={{ fontSize: '0.9rem' }} />
                                  {Math.round(hour.precipitation)}%
                                </Typography>
                              </Box>
                            ))}
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Box>
            )}
          </Box>
        ))}
      </Paper>

      {/* Weather information */}
      <Box sx={{ mt: 6, mb: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
          Informacje o pogodzie w Radzyniu Podlaskim
        </Typography>
        <Typography variant="body1" paragraph>
          Radzyń Podlaski położony jest w województwie lubelskim i charakteryzuje się klimatem
          umiarkowanym przejściowym. Temperatura w ciągu roku waha się od -5°C zimą do 25°C latem.
          Opady deszczu są rozłożone równomiernie przez cały rok, z lekkim nasileniem w miesiącach letnich.
        </Typography>
        <Typography variant="body1" paragraph>
          Najlepszy czas na odwiedzenie miasta to okres od maja do września, kiedy to temperatury
          są najbardziej sprzyjające zwiedzaniu i aktywności na świeżym powietrzu.
        </Typography>
        <Typography variant="body1">
          Dane pogodowe są aktualizowane co 30 minut i pochodzą z serwisu OpenWeatherMap.
        </Typography>
      </Box>
    </Container>
  );
}