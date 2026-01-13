import React from 'react';
import { Box, Sheet, Typography } from '@mui/joy';
import { Card } from '@/components/foundation/Card';

export type HistoryTimelineItem = {
  year: string;
  text: string;
};

/**
 * Vertical history timeline with a dedicated year column, connected dots (rail),
 * and a content card. Designed for readability and stable E2E testing hooks.
 */
export function HistoryTimeline(props: { items: HistoryTimelineItem[] }) {
  const { items } = props;

  return (
    <Box
      data-testid="county-history-timeline"
      sx={{
        maxWidth: 980,
        position: 'relative',
        '--history-year-col': { xs: '92px', sm: '116px' },
        '--history-rail-col': '28px',
        '--history-col-gap': '16px',
        display: 'flex',
        flexDirection: 'column',
        rowGap: 0,
        // Continuous vertical line, spanning the whole component, ignoring per-row spacing.
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 16,
          bottom: 16,
          left: 'calc(var(--history-year-col) + var(--history-col-gap) + (var(--history-rail-col) / 2))',
          width: '1px',
          bgcolor: (theme) => theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, 0.18)'
            : 'rgba(0, 0, 0, 0.18)',
        },
      }}
    >
      <Box
        aria-hidden="true"
        data-testid="history-timeline-rail"
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 'calc(var(--history-year-col) + var(--history-col-gap))',
          width: 'var(--history-rail-col)',
          pointerEvents: 'none',
        }}
      />

      {items.map((item) => (
        <Box
          key={`${item.year}-${item.text}`}
          data-testid="history-timeline-item"
          sx={{
            display: 'grid',
            gridTemplateColumns: 'var(--history-year-col) var(--history-rail-col) 1fr',
            columnGap: 'var(--history-col-gap)',
            alignItems: 'center',
            py: 1,
          }}
        >
          {/* Year column */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Sheet
              variant="soft"
              sx={(theme) => ({
                px: 1.25,
                py: 0.9,
                borderRadius: 'md',
                bgcolor: theme.palette.mode === 'dark'
                  ? 'rgba(255, 255, 255, 0.06)'
                  : 'rgba(0, 0, 0, 0.04)',
                border: '1px solid',
                borderColor: theme.palette.mode === 'dark'
                  ? 'rgba(255, 255, 255, 0.08)'
                  : 'rgba(0, 0, 0, 0.08)',
                minWidth: { xs: 72, sm: 88 },
              })}
              data-testid="history-timeline-year"
            >
              <Typography
                sx={{
                  fontWeight: 800,
                  color: 'text.tertiary',
                  lineHeight: 1.05,
                  textAlign: 'right',
                  fontSize: { xs: '1.05rem', sm: '1.45rem' },
                }}
              >
                {item.year}
              </Typography>
            </Sheet>
          </Box>

          {/* Dot: slightly left of the rail */}
          <Box
            aria-hidden="true"
            sx={{
              position: 'relative',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box
              data-testid="history-timeline-dot"
              sx={(theme) => ({
                width: 12,
                height: 12,
                borderRadius: '50%',
                transform: 'translateX(-7px)', // keep dot to the left of the 1px rail
                bgcolor: 'var(--joy-palette-secondary-500, var(--joy-palette-primary-500))',
                boxShadow: theme.palette.mode === 'dark'
                  ? '0 0 0 3px rgba(228, 184, 98, 0.14)'
                  : '0 0 0 3px rgba(201, 162, 90, 0.16)',
              })}
            />
          </Box>

          {/* Content */}
          <Card sx={{ p: 2, width: '100%' }}>
            <Typography level="body-md" sx={{ color: 'text.secondary' }}>
              {item.text}
            </Typography>
          </Card>
        </Box>
      ))}
    </Box>
  );
}

