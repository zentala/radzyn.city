"use client";

import { useEffect, useMemo, useState } from 'react';
import {
  Typography,
  Box,
  Grid,
  Sheet,
  Input,
  Select,
  Option,
  Button,
  Chip,
  Skeleton,
} from '@mui/joy';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import NoEventsIcon from '@mui/icons-material/FolderOff';
import EventCard from '@/components/EventCard';
import { months } from '@/utils/dates';
import { useEvents } from '@/hooks/useEvents';

// Metadata is moved to a separate layout.tsx file

export default function EventsPage() {
  const { events, categories, loading } = useEvents();

  // State for filters
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const monthOptions = useMemo(() => {
    const seen = new Set<number>();
    for (const e of events) {
      const d = new Date(e.startAt);
      if (!Number.isNaN(d.getTime())) seen.add(d.getMonth());
    }
    return Array.from(seen.values())
      .sort((a, b) => a - b)
      .map((m) => ({ value: String(m), label: months.plNames[m] ?? String(m) }));
  }, [events]);

  const filteredEvents = useMemo(() => {
    let filtered = [...events];

    if (selectedCategory) {
      filtered = filtered.filter((e) => (e.category?.id ?? '') === selectedCategory);
    }

    if (selectedMonth) {
      const monthIndex = Number(selectedMonth);
      filtered = filtered.filter((e) => {
        const d = new Date(e.startAt);
        return !Number.isNaN(d.getTime()) && d.getMonth() === monthIndex;
      });
    }

    const q = searchQuery.trim().toLowerCase();
    if (q) {
      filtered = filtered.filter((e) => {
        const loc = `${e.location?.name ?? ''} ${e.location?.address ?? ''}`.toLowerCase();
        return (
          e.title.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q) ||
          loc.includes(q)
        );
      });
    }

    return filtered;
  }, [events, searchQuery, selectedCategory, selectedMonth]);

  // Format category for display
  const formatCategory = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  const formatMonth = (monthIndexStr: string) => {
    const idx = Number(monthIndexStr);
    return months.plNames[idx] ?? monthIndexStr;
  };

  // Get category color for chips
  const getCategoryColor = (category: string): "primary" | "secondary" | "success" | "danger" | "neutral" | "warning" | "info" => {
    switch (category.toLowerCase()) {
      case 'kulturalne':
        return 'secondary';
      case 'sportowe':
        return 'success';
      case 'edukacyjne':
        return 'primary';
      case 'biznesowe':
        return 'warning';
      default:
        return 'neutral';
    }
  };

  return (
    <Box sx={{ py: 4, pt: 10, px: { xs: 2, md: 4 }, maxWidth: 'xl', mx: 'auto', width: '100%' }}>
      {hydrated ? (
        <Box
          data-testid="events-page-hydrated"
          sx={{
            position: 'absolute',
            width: 1,
            height: 1,
            opacity: 0,
            overflow: 'hidden',
            pointerEvents: 'none',
          }}
        />
      ) : null}
      <Typography level="h2" sx={{ mb: 4, fontWeight: 'bold' }}>
        Wydarzenia w Radzyniu Podlaskim i Powiecie
      </Typography>

      <Box component="section" sx={{ mb: 6 }}>
        <Typography level="h4" sx={{ mb: 2 }}>
          Poniżej znajduje się kalendarz nadchodzących wydarzeń w Radzyniu Podlaskim i powiecie radzyńskim.
          Zapraszamy do aktywnego uczestnictwa w życiu kulturalnym, sportowym i społecznym naszego regionu.
        </Typography>

        {/* Filters Section */}
        <Sheet variant="outlined" sx={{ p: 3, mb: 4, borderRadius: 'md' }}>
          <Typography level="title-md" sx={{ mb: 2, fontWeight: 'bold' }}>
            Filtruj wydarzenia
          </Typography>

          <Grid container spacing={3} sx={{ mb: 2 }}>
            {/* Search input */}
            <Grid xs={12} md={4}>
              <Input
                id="search"
                placeholder="Szukaj wydarzenia..."
                fullWidth
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                startDecorator={<SearchIcon />}
              />
            </Grid>

            {/* Category select */}
            <Grid xs={12} md={4}>
              <Select
                id="category"
                value={selectedCategory || ''}
                placeholder="Wszystkie kategorie"
                onChange={(_, value) => setSelectedCategory(value as string | null)}
              >
                <Option value="">Wszystkie kategorie</Option>
                {categories.map((c) => (
                  <Option key={c.id} value={c.id}>
                    {c.name ?? formatCategory(c.id)}
                  </Option>
                ))}
              </Select>
            </Grid>

            {/* Month select */}
            <Grid xs={12} md={4}>
              <Select
                id="month"
                value={selectedMonth || ''}
                placeholder="Wszystkie miesiące"
                onChange={(_, value) => setSelectedMonth(value as string | null)}
              >
                <Option value="">Wszystkie miesiące</Option>
                {monthOptions.map((m) => (
                  <Option key={m.value} value={m.value}>
                    {m.label}
                  </Option>
                ))}
              </Select>
            </Grid>
          </Grid>

          {/* Active filters display and clear button */}
          {(selectedCategory || selectedMonth || searchQuery) && (
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography level="body-sm" sx={{ color: 'text.secondary', display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
                  <Box component="span" sx={{ fontWeight: 'bold' }}>
                    Aktywne filtry:
                  </Box>
                  {selectedCategory && (
                    <Chip
                      label={formatCategory(selectedCategory)}
                      size="sm"
                      color={getCategoryColor(selectedCategory)}
                      variant="outlined"
                    />
                  )}
                  {selectedMonth && (
                    <Chip
                      label={formatMonth(selectedMonth)}
                      size="sm"
                      color="primary"
                      variant="outlined"
                    />
                  )}
                  {searchQuery && (
                    <Chip
                      label={`Wyszukiwanie: "${searchQuery}"`}
                      size="sm"
                      color="neutral"
                      variant="outlined"
                    />
                  )}
                </Typography>
              </Box>
              <Button
                variant="plain"
                size="sm"
                onClick={() => {
                  setSelectedCategory(null);
                  setSelectedMonth(null);
                  setSearchQuery('');
                }}
                sx={{ color: 'text.secondary', '&:hover': { color: 'primary.500' } }}
              >
                Wyczyść filtry
              </Button>
            </Box>
          )}
        </Sheet>

        {/* Results section */}
        {loading ? (
          <Grid container spacing={3}>
            {[1, 2, 3].map((n) => (
              <Grid key={n} xs={12} sm={6} lg={4}>
                <Skeleton variant="rectangular" height={300} />
              </Grid>
            ))}
          </Grid>
        ) : filteredEvents.length > 0 ? (
          <Grid container spacing={3}>
            {filteredEvents.map((event) => {
              const locationLabel = event.location?.address
                ? `${event.location.name}, ${event.location.address}`
                : event.location?.name ?? 'Lokalizacja do ustalenia';
              const categoryLabel = event.category?.id ?? 'inne';
              return (
                <Grid xs={12} sm={6} lg={4} key={event.slug}>
                  <EventCard
                    title={event.title}
                    startAt={event.startAt}
                    endAt={event.endAt}
                    location={locationLabel}
                    description={event.description}
                    category={categoryLabel}
                    imageUrl={event.featuredImageUrl ?? undefined}
                    detailsHref={`/events/${event.slug}`}
                  />
                </Grid>
              );
            })}
          </Grid>
        ) : (
          <Sheet variant="outlined" sx={{ textAlign: 'center', py: 5, px: 2, borderRadius: 'md', bgcolor: 'background.surface' }}>
            <NoEventsIcon sx={{ fontSize: 60, color: 'text.tertiary', mb: 2 }} />
            <Typography level="h4" sx={{ mb: 1 }}>
              Nie znaleziono wydarzeń
            </Typography>
            <Typography level="body-md" sx={{ color: 'text.secondary' }}>
              Zmień kryteria filtrowania, aby zobaczyć więcej wydarzeń.
            </Typography>
          </Sheet>
        )}
      </Box>

      <Box component="section">
        <Typography level="h3" sx={{ mb: 2, fontWeight: 'bold' }}>
          Organizujesz wydarzenie?
        </Typography>
        <Sheet variant="outlined" sx={{ p: 3, borderRadius: 'md' }}>
          <Typography level="body-lg" sx={{ mb: 2 }}>
            Jeśli organizujesz wydarzenie w Radzyniu Podlaskim lub powiecie radzyńskim i chcesz, aby pojawiło się w naszym kalendarzu,
            skontaktuj się z nami. Pomożemy Ci promować Twoje wydarzenie wśród mieszkańców regionu.
          </Typography>
          <Button
            variant="solid"
            color="primary"
            startDecorator={<AddIcon />}
          >
            Zgłoś wydarzenie
          </Button>
        </Sheet>
      </Box>
    </Box>
  );
}
