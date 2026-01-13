import type { GeoMapDataProvider, GeoMapPoi, GeoMapViewport } from '@radzyn/geo-map';

type PoiCategory = { slug: string; name: string };

export type GuideDataProvider = GeoMapDataProvider & {
  listCategories?: () => Promise<PoiCategory[]>;
};

type CreateGuideDataProviderInput = {
  /**
   * Example:
   * - production: "https://guide.radzyn.city"
   * - dev: "http://supabase.dev.zntl"
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
}: CreateGuideDataProviderInput): GuideDataProvider {
  const base = apiBaseUrl.replace(/\/+$/, '');

  return {
    async listPois({ viewport, q, category }) {
      // We "live with functions": apiBaseUrl should point to the function root:
      // - production: https://<project>.supabase.co/functions/v1/api-v1
      // - local: http://127.0.0.1:54321/functions/v1/api-v1
      const url = new URL(`${base}/pois`);
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

    async listCategories() {
      const res = await fetchImpl(`${base}/poi-categories`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error(`Guide API error: ${res.status} ${res.statusText}`);
      }

      const json = await res.json();
      return asArray<PoiCategory>(json);
    },
  };
}

