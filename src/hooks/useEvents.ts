'use client';

import { useEffect, useMemo, useState } from 'react';
import type { EventCategory, EventItem } from '@/types/events';
import { createGuideEventsProvider } from '@/app/events/guideEventsProvider';
import { mockEventCategories, mockEvents } from '@/mocks/events-mock-data';

export function useEvents(input?: {
  q?: string | null;
  category?: string | null;
  limit?: number | null;
}) {
  const apiBaseUrl = process.env.NEXT_PUBLIC_GUIDE_API_BASE_URL;
  const apiEnabled = typeof apiBaseUrl === 'string' && apiBaseUrl.length > 0;

  const provider = useMemo(() => {
    if (!apiEnabled) return null;
    return createGuideEventsProvider({ apiBaseUrl: apiBaseUrl! });
  }, [apiEnabled, apiBaseUrl]);

  const [events, setEvents] = useState<EventItem[]>(() => mockEvents);
  const [categories, setCategories] = useState<EventCategory[]>(() => mockEventCategories);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!provider) {
      // Local fallback: filter client-side.
      const q = input?.q?.trim().toLowerCase();
      const category = input?.category ?? null;
      const limit = typeof input?.limit === 'number' ? input!.limit! : null;

      let next = [...mockEvents];
      if (category) next = next.filter((e) => e.category?.id === category);
      if (q) {
        next = next.filter((e) => {
          const loc = e.location?.name ?? '';
          return (
            e.title.toLowerCase().includes(q) ||
            e.description.toLowerCase().includes(q) ||
            loc.toLowerCase().includes(q)
          );
        });
      }
      if (limit && limit > 0) next = next.slice(0, limit);

      setEvents(next);
      setCategories(mockEventCategories);
      setError(null);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    Promise.all([
      provider.listCategories().catch(() => mockEventCategories),
      provider.listEvents({
        q: input?.q ?? null,
        category: input?.category ?? null,
        status: 'published',
        limit: input?.limit ?? 50,
      }),
    ])
      .then(([cats, nextEvents]) => {
        if (cancelled) return;
        setCategories(cats);
        setEvents(nextEvents);
      })
      .catch((err: unknown) => {
        console.error('Guide Events API error:', err);
        if (cancelled) return;
        setError('Guide Events API is not available. Using local data.');
        setCategories(mockEventCategories);
        setEvents(mockEvents);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [provider, input?.q, input?.category, input?.limit]);

  return { events, categories, loading, error, apiEnabled };
}

