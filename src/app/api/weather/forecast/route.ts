import { NextResponse } from 'next/server';

// Cache time in milliseconds (1 hour)
const CACHE_TIME = 60 * 60 * 1000;

let cache:
  | { data: unknown; timestamp: number }
  | undefined;

const CITY = 'Radzyn Podlaski,pl';
const UNITS = 'metric';
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5';

export async function GET() {
  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: 'OPENWEATHER_API_KEY is not configured' },
      { status: 500 }
    );
  }

  if (cache && Date.now() - cache.timestamp < CACHE_TIME) {
    return NextResponse.json(cache.data, {
      headers: {
        'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=600',
      },
    });
  }

  const url = new URL(`${API_BASE_URL}/forecast`);
  url.searchParams.set('q', CITY);
  url.searchParams.set('units', UNITS);
  url.searchParams.set('appid', apiKey);

  const res = await fetch(url.toString(), {
    cache: 'no-store',
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    return NextResponse.json(
      { error: 'Failed to fetch forecast', details: text },
      { status: 502 }
    );
  }

  const data = await res.json();
  cache = { data, timestamp: Date.now() };
  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=600',
    },
  });
}

