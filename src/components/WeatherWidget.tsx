"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';

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
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
          <div className="flex space-x-4">
            <div className="rounded-full bg-gray-200 h-16 w-16"></div>
            <div className="flex-1 space-y-2 py-1">
              <div className="h-8 bg-gray-200 rounded w-1/3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="h-20 bg-gray-200 rounded"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  const currentWeatherData = useFallback ? mockCurrentWeather : weather;
  const forecastData = useFallback ? mockForecast : forecast;

  if (error && !useFallback) {
    return <div className="p-4 bg-white rounded-lg shadow-md text-red-500">{error}</div>;
  }
  
  if (!currentWeatherData) return null;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      {useFallback && (
        <div className="text-xs text-amber-600 mb-2 bg-amber-50 px-2 py-1 rounded">
          Tryb demonstracyjny - dane pogodowe są symulowane
        </div>
      )}
      
      <h3 className="text-xl font-semibold mb-3">Pogoda w Radzyniu Podlaskim</h3>
      
      {/* Current weather */}
      <div className="flex items-center">
        <div className="flex-shrink-0 bg-blue-50 rounded-full p-2">
          <img 
            src={`https://openweathermap.org/img/wn/${currentWeatherData.weather[0].icon}@2x.png`}
            alt={currentWeatherData.weather[0].description}
            width={64}
            height={64}
          />
        </div>
        <div className="ml-3">
          <p className="text-3xl font-bold">{Math.round(currentWeatherData.main.temp)}°C</p>
          <p className="text-gray-600 capitalize">{currentWeatherData.weather[0].description}</p>
        </div>
      </div>
      
      <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
        <div className="bg-gray-50 p-2 rounded">
          <p className="text-gray-500">Odczuwalna</p>
          <p className="font-medium">{Math.round(currentWeatherData.main.feels_like)}°C</p>
        </div>
        <div className="bg-gray-50 p-2 rounded">
          <p className="text-gray-500">Wilgotność</p>
          <p className="font-medium">{currentWeatherData.main.humidity}%</p>
        </div>
        <div className="bg-gray-50 p-2 rounded">
          <p className="text-gray-500">Wiatr</p>
          <p className="font-medium">{Math.round(currentWeatherData.wind.speed * 3.6)} km/h</p>
        </div>
      </div>
      
      {/* Forecast for next days */}
      <div className="mt-5 pt-4 border-t">
        <h4 className="text-md font-medium mb-3">Prognoza na kolejne dni</h4>
        <div className="grid grid-cols-3 gap-2">
          {forecastData.map((day, index) => (
            <div key={index} className="text-center bg-blue-50 p-2 rounded">
              <p className="font-medium text-xs">{day.dayName}</p>
              <img 
                src={`https://openweathermap.org/img/wn/${day.icon}.png`}
                alt={day.description}
                width={40}
                height={40}
                className="mx-auto"
              />
              <p className="font-bold">{Math.round(day.temp)}°C</p>
              <p className="text-xs text-gray-600 truncate">{day.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}