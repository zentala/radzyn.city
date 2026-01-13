'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { Box, Card, Grid, Stack } from '@mui/joy';

import { Typography } from '@/components/foundation/Typography';
import { Button } from '@/components/foundation/Button';
import { createGuideDataProvider } from './guideDataProvider';
import { locations } from '@/utils/locationData';

type MapClientProps = {
  initialPoiId?: string;
  initialCategory?: string;
};

type LngLat = [number, number];

type GeoMapPoi = {
  id: string;
  name: string;
  coordinates: LngLat;
  category?: { slug: string; name: string };
};

// Dynamically import (no SSR) to avoid Leaflet hydration issues.
const GeoMap = dynamic(() => import('@radzyn/geo-map').then((m) => m.GeoMap), { ssr: false });

const DEFAULT_CENTER: LngLat = [22.6167, 51.7833];
const DEFAULT_ZOOM = 13;

function defaultViewport() {
  // MVP viewport: bbox around the city center (used until we add real viewport tracking).
  const [lng, lat] = DEFAULT_CENTER;
  const delta = 0.25;
  return {
    bbox: [lng - delta, lat - delta, lng + delta, lat + delta] as [number, number, number, number],
    zoom: DEFAULT_ZOOM,
    center: DEFAULT_CENTER,
  };
}

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

export function MapClient({ initialPoiId, initialCategory }: MapClientProps) {
  const apiBaseUrl = process.env.NEXT_PUBLIC_GUIDE_API_BASE_URL;
  const apiEnabled = typeof apiBaseUrl === 'string' && apiBaseUrl.length > 0;

  const dataProvider = useMemo(() => {
    if (!apiEnabled) return null;
    return createGuideDataProvider({ apiBaseUrl: apiBaseUrl! });
  }, [apiBaseUrl, apiEnabled]);

  const localPois: GeoMapPoi[] = useMemo(() => {
    return locations.map((l) => ({
      id: l.id,
      name: l.name,
      coordinates: toLngLat(l.position),
      category: l.category ? { name: l.category, slug: slugifyCategory(l.category) } : undefined,
    }));
  }, []);

  const localCategories = useMemo(() => {
    const bySlug = new Map<string, { slug: string; name: string }>();
    for (const p of localPois) {
      if (!p.category) continue;
      bySlug.set(p.category.slug, p.category);
    }
    return Array.from(bySlug.values()).sort((a, b) => a.name.localeCompare(b.name));
  }, [localPois]);

  const [pois, setPois] = useState<GeoMapPoi[]>(() => localPois);
  const [categories, setCategories] = useState<{ slug: string; name: string }[]>(() => localCategories);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    initialCategory ? initialCategory : null
  );
  const [selectedPoiId, setSelectedPoiId] = useState<string | undefined>(initialPoiId);

  // If API is enabled, load categories and POIs from guide. If it fails, fall back to local data.
  useEffect(() => {
    if (!dataProvider) return;

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
        setPois(nextPois);
      })
      .catch((err: unknown) => {
        console.error('Guide API error:', err);
        if (cancelled) return;
        setError('Guide API is not available. Using local data.');
        setCategories(localCategories);
        setPois(localPois);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [dataProvider, selectedCategory, localCategories, localPois]);

  const selectedPoi = useMemo(() => {
    return pois.find((p) => p.id === selectedPoiId) ?? null;
  }, [pois, selectedPoiId]);

  // If initial poi is set but current category filter would exclude it, reset category.
  useEffect(() => {
    if (!selectedPoiId) return;
    const existsInPois = pois.some((p) => p.id === selectedPoiId);
    if (!existsInPois) setSelectedPoiId(undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPoiId, pois]);

  return (
    <Stack spacing={3}>
      {error ? (
        <Card variant="outlined" sx={{ p: 2 }}>
          <Typography level="title-md" color="warning">
            Map warning
          </Typography>
          <Typography level="body-sm" textColor="text.secondary">
            {error}
          </Typography>
        </Card>
      ) : null}

      <Card variant="outlined" sx={{ p: 2 }}>
        <Typography level="title-lg" sx={{ mb: 1 }}>
          Kategorie
        </Typography>
        <Stack direction="row" flexWrap="wrap" useFlexGap spacing={1}>
          <Button
            variant={!selectedCategory ? 'solid' : 'outlined'}
            onClick={() => setSelectedCategory(null)}
          >
            Wszystkie
          </Button>
          {categories.map((c) => (
            <Button
              key={c.slug}
              variant={selectedCategory === c.slug ? 'solid' : 'outlined'}
              onClick={() => setSelectedCategory(c.slug)}
            >
              {c.name}
            </Button>
          ))}
        </Stack>
      </Card>

      <Grid container spacing={2}>
        <Grid xs={12} md={8}>
          <GeoMap
            testId="geo-map"
            height={520}
            pois={pois}
            selectedPoiId={selectedPoiId}
            onPoiSelect={(poi: GeoMapPoi) => setSelectedPoiId(poi.id)}
          />
        </Grid>

        <Grid xs={12} md={4}>
          <Card variant="outlined" sx={{ p: 2, minHeight: 520 }}>
            <Typography level="title-lg" sx={{ mb: 1 }}>
              Szczegóły
            </Typography>

            {loading ? (
              <Typography level="body-md" textColor="text.secondary">
                Loading…
              </Typography>
            ) : selectedPoi ? (
              <Stack spacing={1}>
                <Typography level="title-md">{selectedPoi.name}</Typography>
                {selectedPoi.category ? (
                  <Typography level="body-sm" textColor="text.secondary">
                    {selectedPoi.category.name}
                  </Typography>
                ) : null}
                <Box sx={{ mt: 1 }}>
                  <Link href={`/places/${selectedPoi.id}`} style={{ textDecoration: 'none' }}>
                    <Button variant="solid">Zobacz więcej</Button>
                  </Link>
                </Box>
              </Stack>
            ) : (
              <Typography level="body-md" textColor="text.secondary">
                Wybierz punkt na mapie, aby zobaczyć szczegóły.
              </Typography>
            )}
          </Card>
        </Grid>
      </Grid>
    </Stack>
  );
}

