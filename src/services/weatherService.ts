import axios from 'axios';

// Type definitions for weather data
export interface CurrentWeather {
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
  clouds: {
    all: number;
  };
  visibility: number;
  dt: number;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  name: string;
}

export interface ForecastItem {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
  visibility: number;
  pop: number;
  sys: {
    pod: string;
  };
  dt_txt: string;
}

export interface ForecastResponse {
  list: ForecastItem[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

export interface DailyForecast {
  date: string;
  dayName: string;
  dayShort: string;
  temp: {
    min: number;
    max: number;
    day: number;
  };
  icon: string;
  description: string;
  precipitation: number;
  humidity: number;
  wind: number;
  sunrise?: number;
  sunset?: number;
  hourly?: HourlyForecast[];
}

export interface HourlyForecast {
  time: string;
  temp: number;
  icon: string;
  description: string;
  precipitation: number;
}

// Cache time in milliseconds (30 minutes)
const CACHE_TIME = 30 * 60 * 1000;

// Cache storage
let weatherCache: {
  current?: { data: CurrentWeather; timestamp: number; isDemo: boolean };
  forecast?: { data: ForecastResponse; timestamp: number; isDemo: boolean };
} = {};

// Helper to check if cache is valid
const isCacheValid = (timestamp: number) => {
  return Date.now() - timestamp < CACHE_TIME;
};

// Helper for day names in Polish
const getDayName = (date: Date, short = false): string => {
  const dayNames = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'];
  const dayNamesShort = ['Nd', 'Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'Sb'];
  return short ? dayNamesShort[date.getDay()] : dayNames[date.getDay()];
};

// Helper to format time (HH:MM)
const formatTime = (timestamp: number, timezone: number = 0): string => {
  const date = new Date((timestamp + timezone) * 1000);
  return `${date.getUTCHours().toString().padStart(2, '0')}:${date.getUTCMinutes().toString().padStart(2, '0')}`;
};

// Weather data is fetched via server-side API routes (/api/weather/*),
// so the OpenWeather API key stays on the server (OPENWEATHER_API_KEY).

// Process forecast data to get daily forecast
const processForecastData = (forecastData: ForecastResponse): DailyForecast[] => {
  const dailyData: Record<string, DailyForecast> = {};
  const today = new Date().setHours(0, 0, 0, 0);
  const timezone = forecastData.city.timezone;
  
  forecastData.list.forEach(item => {
    // Convert UTC timestamp to local date using timezone offset
    const dateTime = new Date((item.dt + timezone) * 1000);
    const dateStr = dateTime.toISOString().split('T')[0];
    const timeStr = formatTime(item.dt, timezone);
    
    // Initialize the day object if it doesn't exist
    if (!dailyData[dateStr]) {
      dailyData[dateStr] = {
        date: dateStr,
        dayName: getDayName(dateTime),
        dayShort: getDayName(dateTime, true),
        temp: {
          min: item.main.temp_min,
          max: item.main.temp_max,
          day: item.main.temp
        },
        icon: item.weather[0].icon,
        description: item.weather[0].description,
        precipitation: item.pop * 100, // Convert to percentage
        humidity: item.main.humidity,
        wind: item.wind.speed,
        hourly: []
      };
    } else {
      // Update min/max temperature
      dailyData[dateStr].temp.min = Math.min(dailyData[dateStr].temp.min, item.main.temp_min);
      dailyData[dateStr].temp.max = Math.max(dailyData[dateStr].temp.max, item.main.temp_max);
      
      // Update icon and description for daytime entries (noon)
      const hour = dateTime.getHours();
      if (hour >= 12 && hour <= 15) {
        dailyData[dateStr].icon = item.weather[0].icon;
        dailyData[dateStr].description = item.weather[0].description;
        dailyData[dateStr].temp.day = item.main.temp;
      }
    }
    
    // Add hourly data
    dailyData[dateStr].hourly = dailyData[dateStr].hourly || [];
    dailyData[dateStr].hourly.push({
      time: timeStr,
      temp: item.main.temp,
      icon: item.weather[0].icon,
      description: item.weather[0].description,
      precipitation: item.pop * 100
    });
  });
  
  // Add sunrise and sunset times
  if (forecastData.city) {
    const { sunrise, sunset } = forecastData.city;
    
    Object.values(dailyData).forEach(day => {
      // We don't have day-specific sunrise/sunset in the API, so we use the city data
      day.sunrise = sunrise;
      day.sunset = sunset;
    });
  }
  
  // Convert to array and sort by date
  return Object.values(dailyData).sort((a, b) => a.date.localeCompare(b.date));
};

// Mock data for demo mode
const mockWeatherData: CurrentWeather = {
  main: {
    temp: 18,
    feels_like: 17,
    temp_min: 16,
    temp_max: 20,
    pressure: 1015,
    humidity: 65,
  },
  weather: [{
    id: 803,
    main: 'Clouds',
    description: 'zachmurzenie',
    icon: '04d'
  }],
  wind: {
    speed: 3.5,
    deg: 120,
    gust: 5.2
  },
  clouds: {
    all: 75
  },
  visibility: 10000,
  dt: Math.floor(Date.now() / 1000),
  sys: {
    country: 'PL',
    sunrise: Math.floor(Date.now() / 1000) - 25200, // 7 hours ago
    sunset: Math.floor(Date.now() / 1000) + 25200, // 7 hours from now
  },
  timezone: 3600,
  name: 'Radzyń Podlaski'
};

const createMockForecast = (): ForecastResponse => {
  const now = Math.floor(Date.now() / 1000);
  const day = 24 * 60 * 60; // Seconds in a day
  const list: ForecastItem[] = [];
  
  // Generate 5 days of forecast, 8 times per day (every 3 hours)
  for (let i = 0; i < 5; i++) {
    for (let h = 0; h < 8; h++) {
      const hour = h * 3; // 0, 3, 6, 9, 12, 15, 18, 21
      const date = new Date();
      date.setDate(date.getDate() + i);
      date.setHours(hour, 0, 0, 0);
      
      // Generate some realistic temperature variations
      const baseTemp = 18 - (i % 2 ? 2 : 0); // Slightly cooler every other day
      const hourlyOffset = hour < 6 ? -3 : (hour > 18 ? -2 : (hour > 12 ? 2 : 0));
      const temperature = baseTemp + hourlyOffset;
      
      // Generate different weather conditions
      let weather;
      if (i % 5 === 0) { // Clear
        weather = { id: 800, main: 'Clear', description: 'bezchmurnie', icon: hour >= 6 && hour < 18 ? '01d' : '01n' };
      } else if (i % 5 === 1) { // Partly cloudy
        weather = { id: 802, main: 'Clouds', description: 'zachmurzenie małe', icon: hour >= 6 && hour < 18 ? '02d' : '02n' };
      } else if (i % 5 === 2) { // Cloudy
        weather = { id: 803, main: 'Clouds', description: 'zachmurzenie duże', icon: hour >= 6 && hour < 18 ? '03d' : '03n' };
      } else if (i % 5 === 3) { // Light rain
        weather = { id: 500, main: 'Rain', description: 'lekki deszcz', icon: hour >= 6 && hour < 18 ? '10d' : '10n' };
      } else { // Thunderstorm
        weather = { id: 211, main: 'Thunderstorm', description: 'burza', icon: hour >= 6 && hour < 18 ? '11d' : '11n' };
      }
      
      // Format the datetime string
      const dtTxt = `${date.toISOString().split('T')[0]} ${hour.toString().padStart(2, '0')}:00:00`;
      
      list.push({
        dt: now + i * day + hour * 3600,
        main: {
          temp: temperature,
          feels_like: temperature - 1,
          temp_min: temperature - 1.5,
          temp_max: temperature + 1.5,
          pressure: 1015,
          humidity: 65 + (i * 5) % 20
        },
        weather: [weather],
        clouds: {
          all: (i * 20) % 100
        },
        wind: {
          speed: 3 + (i % 3),
          deg: (i * 45) % 360
        },
        visibility: 10000,
        pop: i % 5 >= 3 ? 0.3 + (i % 3) * 0.2 : 0, // Rain probability for rain days
        sys: {
          pod: hour >= 6 && hour < 18 ? 'd' : 'n' // Day or night
        },
        dt_txt: dtTxt
      });
    }
  }
  
  return {
    list,
    city: {
      id: 12345,
      name: 'Radzyń Podlaski',
      coord: {
        lat: 51.7833,
        lon: 22.6167
      },
      country: 'PL',
      population: 10000,
      timezone: 3600,
      sunrise: now - 25200, // 7 hours ago
      sunset: now + 25200 // 7 hours from now
    }
  };
};

// Fetch current weather data
export const getCurrentWeather = async (forceFresh = false): Promise<{ data: CurrentWeather; isDemo: boolean }> => {
  // Use cache if available and valid
  if (!forceFresh && weatherCache.current && isCacheValid(weatherCache.current.timestamp)) {
    return { data: weatherCache.current.data, isDemo: weatherCache.current.isDemo };
  }

  try {
    const response = await axios.get<CurrentWeather>('/api/weather/current');
    
    // Update cache
    weatherCache.current = { data: response.data, timestamp: Date.now(), isDemo: false };
    return { data: response.data, isDemo: false };
  } catch (error) {
    console.error('Error fetching current weather:', error);
    
    // Fallback to mock data on error
    const mockData = {...mockWeatherData};
    weatherCache.current = { data: mockData, timestamp: Date.now(), isDemo: true };
    return { data: mockData, isDemo: true };
  }
};

// Fetch forecast data
export const getWeatherForecast = async (forceFresh = false): Promise<{ data: DailyForecast[]; isDemo: boolean }> => {
  // Use cache if available and valid
  if (!forceFresh && weatherCache.forecast && isCacheValid(weatherCache.forecast.timestamp)) {
    const processedData = processForecastData(weatherCache.forecast.data);
    return { data: processedData, isDemo: weatherCache.forecast.isDemo };
  }

  try {
    const response = await axios.get<ForecastResponse>('/api/weather/forecast');
    
    // Update cache
    weatherCache.forecast = { data: response.data, timestamp: Date.now(), isDemo: false };
    const processedData = processForecastData(response.data);
    return { data: processedData, isDemo: false };
  } catch (error) {
    console.error('Error fetching forecast data:', error);
    
    // Fallback to mock data on error
    const mockData = createMockForecast();
    weatherCache.forecast = { data: mockData, timestamp: Date.now(), isDemo: true };
    const processedData = processForecastData(mockData);
    return { data: processedData, isDemo: true };
  }
};

// Get all weather data (current + forecast)
export const getAllWeatherData = async (forceFresh = false): Promise<{
  current: CurrentWeather;
  forecast: DailyForecast[];
  isDemo: boolean;
}> => {
  const [currentRes, forecastRes] = await Promise.all([
    getCurrentWeather(forceFresh),
    getWeatherForecast(forceFresh)
  ]);
  
  return {
    current: currentRes.data,
    forecast: forecastRes.data,
    isDemo: currentRes.isDemo || forecastRes.isDemo
  };
};