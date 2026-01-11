/**
 * Weather Mock Data
 * Used for development and testing
 */

export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface CurrentWeather {
  temp: number;
  feels_like: number;
  humidity: number;
  pressure: number;
  wind_speed: number;
  wind_direction?: string;
  visibility?: number;
  uv_index?: number;
  weather: WeatherCondition[];
}

export interface ForecastDay {
  dt: number;
  temp: { day: number; min: number; max: number };
  weather: WeatherCondition;
  humidity: number;
  wind_speed: number;
  precipitation?: number;
}

export interface WeatherData {
  current: CurrentWeather;
  forecast: ForecastDay[];
  location: string;
  last_updated: string;
}

export const mockWeatherData: WeatherData = {
  location: 'Radzyń Podlaski',
  last_updated: new Date().toISOString(),
  current: {
    temp: 5,
    feels_like: 2,
    humidity: 75,
    pressure: 1015,
    wind_speed: 3.5,
    wind_direction: 'NW',
    visibility: 10,
    uv_index: 2,
    weather: [
      {
        id: 803,
        main: 'Clouds',
        description: 'pochmurno',
        icon: '04d',
      },
    ],
  },
  forecast: [
    {
      dt: Math.floor(Date.now() / 1000) + 86400,
      temp: { day: 4, min: -1, max: 6 },
      weather: { id: 802, main: 'Clouds', description: 'częściowe zachmurzenie', icon: '03d' },
      humidity: 70,
      wind_speed: 4,
      precipitation: 10,
    },
    {
      dt: Math.floor(Date.now() / 1000) + 172800,
      temp: { day: 6, min: 0, max: 8 },
      weather: { id: 800, main: 'Clear', description: 'bezchmurnie', icon: '01d' },
      humidity: 65,
      wind_speed: 3,
      precipitation: 0,
    },
    {
      dt: Math.floor(Date.now() / 1000) + 259200,
      temp: { day: 7, min: 2, max: 10 },
      weather: { id: 500, main: 'Rain', description: 'lekki deszcz', icon: '10d' },
      humidity: 80,
      wind_speed: 5,
      precipitation: 40,
    },
    {
      dt: Math.floor(Date.now() / 1000) + 345600,
      temp: { day: 5, min: 1, max: 7 },
      weather: { id: 801, main: 'Clouds', description: 'zachmurzenie', icon: '02d' },
      humidity: 75,
      wind_speed: 4,
      precipitation: 20,
    },
    {
      dt: Math.floor(Date.now() / 1000) + 432000,
      temp: { day: 8, min: 3, max: 11 },
      weather: { id: 800, main: 'Clear', description: 'słonecznie', icon: '01d' },
      humidity: 60,
      wind_speed: 3,
      precipitation: 0,
    },
    {
      dt: Math.floor(Date.now() / 1000) + 518400,
      temp: { day: 9, min: 4, max: 12 },
      weather: { id: 802, main: 'Clouds', description: 'częściowe zachmurzenie', icon: '03d' },
      humidity: 68,
      wind_speed: 4,
      precipitation: 15,
    },
    {
      dt: Math.floor(Date.now() / 1000) + 604800,
      temp: { day: 7, min: 2, max: 10 },
      weather: { id: 500, main: 'Rain', description: 'deszcz', icon: '10d' },
      humidity: 78,
      wind_speed: 5,
      precipitation: 50,
    },
  ],
};

export default mockWeatherData;
