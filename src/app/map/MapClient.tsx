'use client';

import dynamic from 'next/dynamic';
import { useEffect, useMemo, useState } from 'react';
import { Box, Card, Grid, Stack } from '@mui/joy';

import { Typography } from '@/components/foundation/Typography';
import { Button } from '@/components/foundation/Button';
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
  const allPois: GeoMapPoi[] = useMemo(() => {
    return locations.map((l) => ({
      id: l.id,
      name: l.name,
      coordinates: toLngLat(l.position),
      category: l.category
        ? { name: l.category, slug: slugifyCategory(l.category) }
        : undefined,
    }));
  }, []);

  const categories = useMemo(() => {
    const bySlug = new Map<string, { slug: string; name: string }>();
    for (const poi of allPois) {
      if (!poi.category) continue;
      bySlug.set(poi.category.slug, poi.category);
    }
    return Array.from(bySlug.values()).sort((a, b) => a.name.localeCompare(b.name));
  }, [allPois]);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    initialCategory ? initialCategory : null
  );
  const [selectedPoiId, setSelectedPoiId] = useState<string | undefined>(initialPoiId);

  const filteredPois = useMemo(() => {
    if (!selectedCategory) return allPois;
    return allPois.filter((p) => p.category?.slug === selectedCategory);
  }, [allPois, selectedCategory]);

  const selectedPoi = useMemo(() => {
    return allPois.find((p) => p.id === selectedPoiId) ?? null;
  }, [allPois, selectedPoiId]);

  // If initial poi is set but current category filter would exclude it, reset category.
  useEffect(() => {
    if (!selectedPoiId) return;
    const existsInFiltered = filteredPois.some((p) => p.id === selectedPoiId);
    if (!existsInFiltered) setSelectedCategory(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPoiId]);

  return (
    <Stack spacing={3}>
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
            pois={filteredPois}
            selectedPoiId={selectedPoiId}
            onPoiSelect={(poi: GeoMapPoi) => setSelectedPoiId(poi.id)}
          />
        </Grid>

        <Grid xs={12} md={4}>
          <Card variant="outlined" sx={{ p: 2, minHeight: 520 }}>
            <Typography level="title-lg" sx={{ mb: 1 }}>
              Szczegóły
            </Typography>

            {selectedPoi ? (
              <Stack spacing={1}>
                <Typography level="title-md">{selectedPoi.name}</Typography>
                {selectedPoi.category ? (
                  <Typography level="body-sm" textColor="text.secondary">
                    {selectedPoi.category.name}
                  </Typography>
                ) : null}
                <Box sx={{ mt: 1 }}>
                  <Button component="a" href={`/places/${selectedPoi.id}`} variant="solid">
                    Zobacz więcej
                  </Button>
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

