'use client';

import React from 'react';
import { Box, BoxProps, Typography } from '@mui/joy';

export interface SectionProps extends BoxProps {
  /** Optional section title rendered as a heading above content */
  title?: string;
  variant?: 'default' | 'primary' | 'secondary' | 'neutral';
  spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
}

/**
 * Section - Reusable section wrapper with background and spacing
 */
export function Section({ 
  title,
  variant = 'default', 
  spacing = 'lg', 
  children, 
  sx, 
  ...props 
}: SectionProps) {
  const getBackgroundColor = () => {
    switch (variant) {
      case 'primary':
        return 'var(--joy-palette-primary-50)';
      case 'secondary':
        return 'var(--joy-palette-secondary-50)';
      case 'neutral':
        return 'var(--joy-palette-neutral-100)';
      default:
        return 'transparent';
    }
  };

  const getPadding = () => {
    switch (spacing) {
      case 'none':
        return { py: 0 };
      case 'sm':
        return { py: { xs: 3, md: 4 } };
      case 'md':
        return { py: { xs: 4, md: 6 } };
      case 'lg':
        return { py: { xs: 6, md: 8 } };
      case 'xl':
        return { py: { xs: 8, md: 10 } };
      default:
        return { py: { xs: 6, md: 8 } };
    }
  };

  return (
    <Box
      sx={{
        bgcolor: getBackgroundColor(),
        ...getPadding(),
        ...sx,
      }}
      {...props}
    >
      {title && (
        <Box sx={{ mb: 3 }}>
          <Typography level="h2" sx={{ fontWeight: 'bold' }}>
            {title}
          </Typography>
        </Box>
      )}
      {children}
    </Box>
  );
}

export default Section;
