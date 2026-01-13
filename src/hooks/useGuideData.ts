'use client';

import { useEffect, useMemo, useState } from 'react';
import { createGuideDataProvider } from '@/app/map/guideDataProvider';
import { locations } from '@/utils/locationData';

type LngLat = [number, number];

export type GeoMapPoi = {
  id: string;
  name: string;
  coordinates: LngLat;
  category?: { slug: string; name: string };
  description?: string;
  address?: string;
  imageUrl?: string;
};

export type PoiCategory = { slug: string; name: string };

function slugifyCategory(input: string) {
  return input
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function toLngLat([lat, lng]: [number, number]): LngLat {
  return [lng, lat];
}

const DEFAULT_CENTER: LngLat = [22.6167, 51.7833];
const DEFAULT_ZOOM = 13;

function defaultViewport() {
  const [lng, lat] = DEFAULT_CENTER;
  const delta = 0.25;
  return {
    bbox: [lng - delta, lat - delta, lng + delta, lat + delta] as [number, number, number, number],
    zoom: DEFAULT_ZOOM,
    center: DEFAULT_CENTER,
  };
}

export function useGuideData(selectedCategory: string | null = null) {
  const apiBaseUrl = process.env.NEXT_PUBLIC_GUIDE_API_BASE_URL;
  const apiEnabled = typeof apiBaseUrl === 'string' && apiBaseUrl.length > 0;

  const dataProvider = useMemo(() => {
    if (!apiEnabled) return null;
    return createGuideDataProvider({ apiBaseUrl: apiBaseUrl! });
  }, [apiEnabled, apiBaseUrl]);

  const localPois: GeoMapPoi[] = useMemo(() => {
    return locations.map((l) => ({
      id: l.id,
      name: l.name,
      coordinates: toLngLat(l.position),
      category: l.category ? { name: l.category, slug: slugifyCategory(l.category) } : undefined,
      description: l.description,
      address: l.address,
      imageUrl: l.imageUrl,
    }));
  }, []);

  const localCategories = useMemo(() => {
    const bySlug = new Map<string, PoiCategory>();
    for (const p of localPois) {
      if (!p.category) continue;
      bySlug.set(p.category.slug, p.category);
    }
    return Array.from(bySlug.values()).sort((a, b) => a.name.localeCompare(b.name));
  }, [localPois]);

  const [pois, setPois] = useState<GeoMapPoi[]>(() => localPois);
  const [categories, setCategories] = useState<PoiCategory[]>(() => localCategories);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!dataProvider) {
      // Filter local POIs if category is selected
      if (selectedCategory) {
        setPois(localPois.filter(p => p.category?.slug === selectedCategory));
      } else {
        setPois(localPois);
      }
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    const vp = defaultViewport();

    Promise.all([
      dataProvider.listCategories?.().catch(() => localCategories) ?? Promise.resolve(localCategories),
      dataProvider.listPois({ viewport: vp, q: undefined, category: selectedCategory ?? null }),
    ])
      .then(([cats, nextPois]) => {
        if (cancelled) return;
        setCategories(cats);
        // Cast because GeoMapPoi in dataProvider might be slightly different
        setPois(nextPois as GeoMapPoi[]);
      })
      .catch((err: unknown) => {
        console.error('Guide API error:', err);
        if (cancelled) return;
        setError('Guide API is not available. Using local data.');
        setCategories(localCategories);
        setPois(selectedCategory ? localPois.filter(p => p.category?.slug === selectedCategory) : localPois);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [dataProvider, selectedCategory, localCategories, localPois]);

  return { pois, categories, loading, error, apiEnabled };
}
