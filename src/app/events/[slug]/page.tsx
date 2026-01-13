"use client";

import { useEffect, useMemo, useState } from 'react';
import { Box, Chip, Sheet, Skeleton, Stack, Typography } from '@mui/joy';
import Link from 'next/link';
import Button from '@/components/foundation/Button';
import type { EventItem } from '@/types/events';
import { createGuideEventsProvider } from '@/app/events/guideEventsProvider';
import { mockEvents } from '@/mocks/events-mock-data';

function formatEventDateLabel(startAt: string, endAt?: string | null): string {
  const start = new Date(startAt);
  const end = endAt ? new Date(endAt) : null;
  if (Number.isNaN(start.getTime())) return 'Data do ustalenia';

  const dateFmt = new Intl.DateTimeFormat('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' });
  const timeFmt = new Intl.DateTimeFormat('pl-PL', { hour: '2-digit', minute: '2-digit' });
  const startDate = dateFmt.format(start);
  const startTime = timeFmt.format(start);

  if (!end || Number.isNaN(end.getTime())) return `${startDate}, ${startTime}`;

  const endDate = dateFmt.format(end);
  const endTime = timeFmt.format(end);

  const sameDay =
    start.getFullYear() === end.getFullYear() &&
    start.getMonth() === end.getMonth() &&
    start.getDate() === end.getDate();

  return sameDay ? `${startDate}, ${startTime}–${endTime}` : `${startDate}, ${startTime} – ${endDate}, ${endTime}`;
}

export default function EventDetailsPage({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const apiBaseUrl = process.env.NEXT_PUBLIC_GUIDE_API_BASE_URL;
  const apiEnabled = typeof apiBaseUrl === 'string' && apiBaseUrl.length > 0;

  const provider = useMemo(() => {
    if (!apiEnabled) return null;
    return createGuideEventsProvider({ apiBaseUrl: apiBaseUrl! });
  }, [apiEnabled, apiBaseUrl]);

  const [event, setEvent] = useState<EventItem | null>(() => mockEvents.find((e) => e.slug === slug) ?? null);
  const [loading, setLoading] = useState(apiEnabled);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!provider) {
      setLoading(false);
      setNotFound(!mockEvents.some((e) => e.slug === slug));
      return;
    }

    let cancelled = false;
    setLoading(true);
    setNotFound(false);

    provider
      .getEventBySlug(slug)
      .then((res) => {
        if (cancelled) return;
        if (!res) {
          setNotFound(true);
          setEvent(null);
          return;
        }
        setEvent(res);
      })
      .catch((err) => {
        console.error('Event details load error:', err);
        if (cancelled) return;
        // Fallback to local if possible
        const local = mockEvents.find((e) => e.slug === slug) ?? null;
        setEvent(local);
        setNotFound(!local);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [provider, slug]);

  if (loading) {
    return (
      <Box sx={{ py: 4, pt: 10, px: { xs: 2, md: 4 }, maxWidth: 'md', mx: 'auto', width: '100%' }}>
        <Skeleton variant="rectangular" height={240} sx={{ mb: 2 }} />
        <Skeleton height={40} sx={{ mb: 1 }} />
        <Skeleton height={20} sx={{ mb: 2 }} />
        <Skeleton height={120} />
      </Box>
    );
  }

  if (notFound || !event) {
    return (
      <Box sx={{ py: 4, pt: 10, px: { xs: 2, md: 4 }, maxWidth: 'md', mx: 'auto', width: '100%' }}>
        <Sheet variant="outlined" sx={{ p: 3, borderRadius: 'md' }}>
          <Typography level="h3" sx={{ mb: 1, fontWeight: 'bold' }}>
            Nie znaleziono wydarzenia
          </Typography>
          <Typography level="body-md" sx={{ color: 'text.secondary', mb: 2 }}>
            To wydarzenie nie istnieje lub nie jest jeszcze opublikowane.
          </Typography>
          <Button component={Link} href="/events" variant="solid" color="primary">
            Wróć do listy wydarzeń
          </Button>
        </Sheet>
      </Box>
    );
  }

  const dateLabel = formatEventDateLabel(event.startAt, event.endAt);
  const locationLabel = event.location?.address ? `${event.location.name}, ${event.location.address}` : event.location?.name ?? 'Lokalizacja do ustalenia';
  const categoryLabel = event.category?.name ?? event.category?.id ?? 'Inne';

  return (
    <Box sx={{ py: 4, pt: 10, px: { xs: 2, md: 4 }, maxWidth: 'md', mx: 'auto', width: '100%' }}>
      <Stack spacing={2}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
          <Chip variant="solid" color="primary">
            {categoryLabel}
          </Chip>
          <Button component={Link} href="/events" variant="plain">
            Wróć
          </Button>
        </Box>

        <Typography level="h2" sx={{ fontWeight: 'bold' }}>
          {event.title}
        </Typography>

        <Typography level="body-md" sx={{ color: 'text.secondary' }}>
          {dateLabel} • {locationLabel}
        </Typography>

        <Sheet variant="outlined" sx={{ p: 3, borderRadius: 'md' }}>
          <Typography level="title-md" sx={{ mb: 1, fontWeight: 700 }}>
            Opis
          </Typography>
          <Typography level="body-md" sx={{ whiteSpace: 'pre-wrap' }}>
            {event.description}
          </Typography>
        </Sheet>

        {event.ticketUrl ? (
          <Button component="a" href={event.ticketUrl} target="_blank" rel="noopener noreferrer" variant="solid" color="primary">
            Kup bilet / zobacz szczegóły
          </Button>
        ) : null}
      </Stack>
    </Box>
  );
}

