'use client';

import { Box, Sheet, Typography } from '@mui/joy';
import { ReactNode } from 'react';

interface SectionWrapperProps {
  title: string;
  children: ReactNode;
  actions?: ReactNode;
  disableCardStyling?: boolean;
}

export default function SectionWrapper(props: SectionWrapperProps | null) {
  // Defensive check - if props is null, don't render anything
  if (!props) {
    console.warn('SectionWrapper received null props');
    return null;
  }

  const { title, children, actions, disableCardStyling } = props;

  return (
    <Box
      sx={{
        my: 4,
        px: { xs: 2, md: 4 },
        maxWidth: 'xl',
        mx: 'auto'
      }}
    >
      <Sheet
        variant="plain"
        sx={(theme) => ({
          p: { xs: 3, md: 4 },
          borderRadius: 'lg',
          bgcolor: theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, 0.03)'  // Slightly lighter in dark mode
            : 'rgba(0, 0, 0, 0.03)',  // Slightly darker in light mode
          border: theme.palette.mode === 'dark'
            ? '1px solid rgba(255, 255, 255, 0.02)'
            : '1px solid rgba(0, 0, 0, 0.06)',
          boxShadow: theme.palette.mode === 'dark'
            ? 'inset 0 2px 4px rgba(0, 0, 0, 0.2)'  // Subtle inner shadow in dark mode
            : 'inset 0 2px 4px rgba(0, 0, 0, 0.06)',  // Light Apple-style inner shadow

          // Card opacity styles - cards start at 90% opacity, full white on hover
          // Only apply to plain/outlined cards, not solid cards
          '& .MuiCard-root:not([class*="Card-colorPrimary"]):not([class*="Card-colorWarning"]):not([class*="Card-colorSuccess"]):not([class*="Card-colorDanger"]):not([class*="Card-colorNeutral"])': disableCardStyling ? {} : {
            bgcolor: theme.palette.mode === 'dark'
              ? 'rgba(255, 255, 255, 0.90)'
              : 'rgba(255, 255, 255, 0.90)',
            transition: 'all 0.3s ease',
            '&:hover': {
              bgcolor: theme.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, 1.0)'  // Full white on hover
                : 'rgba(255, 255, 255, 1.0)',
            }
          },

          // Apple-style Chip buttons
          '& .MuiChip-root': {
            bgcolor: theme.palette.mode === 'dark'
              ? 'rgba(255, 255, 255, 0.08)'  // Subtle light background in dark mode
              : 'rgba(0, 0, 0, 0.04)',  // Subtle dark background in light mode
            color: theme.palette.mode === 'dark'
              ? 'rgba(255, 255, 255, 0.9)'
              : 'rgba(0, 0, 0, 0.8)',
            border: theme.palette.mode === 'dark'
              ? '1px solid rgba(255, 255, 255, 0.12)'
              : '1px solid rgba(0, 0, 0, 0.08)',
            fontWeight: 500,
            fontSize: '0.875rem',
            px: 2,
            py: 0.5,
            borderRadius: '8px',
            transition: 'all 0.2s ease',
            cursor: 'pointer',
            '&:hover': {
              bgcolor: theme.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, 0.12)'
                : 'rgba(0, 0, 0, 0.06)',
              transform: 'translateY(-1px)',
              boxShadow: theme.palette.mode === 'dark'
                ? '0 2px 8px rgba(0, 0, 0, 0.3)'
                : '0 2px 8px rgba(0, 0, 0, 0.08)',
            }
          }
        })}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3
          }}
        >
          <Typography
            level="h2"
            component="h2"
            sx={{
              fontWeight: 'bold',
              fontSize: { xs: '1.75rem', md: '2rem' }
            }}
          >
            {title}
          </Typography>
          {actions && <Box>{actions}</Box>}
        </Box>
        {children}
      </Sheet>
    </Box>
  );
}
