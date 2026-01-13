import type { EventCategory, EventItem } from '@/types/events';

export type GuideEventsProvider = {
  listEvents: (input?: {
    q?: string | null;
    category?: string | null;
    status?: 'draft' | 'published' | 'cancelled' | null;
    limit?: number | null;
  }) => Promise<EventItem[]>;
  getEventBySlug: (slug: string) => Promise<EventItem | null>;
  listCategories: () => Promise<EventCategory[]>;
};

type CreateGuideEventsProviderInput = {
  /**
   * Function root URL, e.g.:
   * - local: http://127.0.0.1:54321/functions/v1/api-v1
   * - prod:  https://<project>.supabase.co/functions/v1/api-v1
   */
  apiBaseUrl: string;
  fetchImpl?: typeof fetch;
};

function asArray<T>(value: unknown): T[] {
  if (Array.isArray(value)) return value as T[];
  if (value && typeof value === 'object' && Array.isArray((value as any).items)) return (value as any).items as T[];
  return [];
}

export function createGuideEventsProvider({
  apiBaseUrl,
  fetchImpl = fetch,
}: CreateGuideEventsProviderInput): GuideEventsProvider {
  const base = apiBaseUrl.replace(/\/+$/, '');

  return {
    async listEvents({ q, category, status = 'published', limit = 50 } = {}) {
      const url = new URL(`${base}/events`);
      if (q) url.searchParams.set('q', q);
      if (category) url.searchParams.set('category', category);
      if (status) url.searchParams.set('status', status);
      if (typeof limit === 'number') url.searchParams.set('limit', String(limit));

      const res = await fetchImpl(url.toString(), {
        method: 'GET',
        headers: { Accept: 'application/json' },
      });

      if (!res.ok) {
        throw new Error(`Guide API error: ${res.status} ${res.statusText}`);
      }

      const json = await res.json();
      return asArray<EventItem>(json);
    },

    async getEventBySlug(slug: string) {
      const res = await fetchImpl(`${base}/events/${encodeURIComponent(slug)}`, {
        method: 'GET',
        headers: { Accept: 'application/json' },
      });

      if (res.status === 404) return null;
      if (!res.ok) {
        throw new Error(`Guide API error: ${res.status} ${res.statusText}`);
      }

      return (await res.json()) as EventItem;
    },

    async listCategories() {
      const res = await fetchImpl(`${base}/event-categories`, {
        method: 'GET',
        headers: { Accept: 'application/json' },
      });

      if (!res.ok) {
        throw new Error(`Guide API error: ${res.status} ${res.statusText}`);
      }

      const json = await res.json();
      return asArray<EventCategory>(json);
    },
  };
}

