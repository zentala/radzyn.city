import type { GeoMapDataProvider, GeoMapPoi, GeoMapViewport } from '@radzyn/geo-map';

type CreateGuideDataProviderInput = {
  /**
   * Example:
   * - production: "https://guide.radzyn.city"
   * - dev: "http://localhost:8080"
   */
  apiBaseUrl: string;
  /**
   * Override for tests.
   */
  fetchImpl?: typeof fetch;
};

type GuidePoiDto = {
  id: string;
  name: string;
  coordinates: [number, number]; // [lng,lat]
  category?: { slug: string; name: string };
};

function buildBboxParam(viewport: GeoMapViewport) {
  const [west, south, east, north] = viewport.bbox;
  return `${west},${south},${east},${north}`;
}

function asArray<T>(value: unknown): T[] {
  if (Array.isArray(value)) return value as T[];
  if (value && typeof value === 'object' && Array.isArray((value as any).items)) return (value as any).items as T[];
  return [];
}

function mapPoi(dto: GuidePoiDto): GeoMapPoi {
  return {
    id: dto.id,
    name: dto.name,
    coordinates: dto.coordinates,
    category: dto.category,
  };
}

/**
 * Creates a GeoMap data provider that fetches POIs from `guide` public API.
 *
 * NOTE: This provider is not wired to the UI yet (MVP uses local `locationData`).
 */
export function createGuideDataProvider({
  apiBaseUrl,
  fetchImpl = fetch,
}: CreateGuideDataProviderInput): GeoMapDataProvider {
  const base = apiBaseUrl.replace(/\/+$/, '');

  return {
    async listPois({ viewport, q, category }) {
      const url = new URL(`${base}/api/v1/pois`);
      url.searchParams.set('bbox', buildBboxParam(viewport));
      if (q) url.searchParams.set('q', q);
      if (category) url.searchParams.set('category', category);

      const res = await fetchImpl(url.toString(), {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error(`Guide API error: ${res.status} ${res.statusText}`);
      }

      const json = await res.json();
      const items = asArray<GuidePoiDto>(json);
      return items.map(mapPoi);
    },
  };
}

