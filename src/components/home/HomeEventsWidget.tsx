"use client";

import { Grid } from '@mui/joy';
import SectionWrapper from '@/components/SectionWrapper';
import Button from '@/components/foundation/Button';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Link from 'next/link';
import EventCard from '@/components/EventCard';
import { useEvents } from '@/hooks/useEvents';

export default function HomeEventsWidget() {
  const { events } = useEvents({ limit: 3 });

  return (
    <SectionWrapper
      title="Nadchodzące wydarzenia"
      disableCardStyling={true}
      actions={
        <Button
          component={Link}
          href="/events"
          variant="soft"
          size="md"
          startDecorator={<CalendarMonthIcon />}
          endDecorator={<ArrowForwardIcon />}
          sx={{
            px: 3,
            py: 1.5,
            fontSize: '0.95rem',
          }}
        >
          Zobacz kalendarz
        </Button>
      }
    >
      <Grid container spacing={3}>
        {events.map((event) => {
          const locationLabel = event.location?.name ?? 'Lokalizacja do ustalenia';
          const categoryLabel = event.category?.id ?? 'inne';
          return (
            <Grid xs={12} md={4} key={event.slug}>
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
    </SectionWrapper>
  );
}

