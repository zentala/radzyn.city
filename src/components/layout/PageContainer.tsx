'use client';

import React from 'react';
import { Box, BoxProps } from '@mui/joy';

export interface PageContainerProps extends BoxProps {
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  children: React.ReactNode;
}

/**
 * PageContainer - Standard page wrapper with consistent padding
 */
export function PageContainer({ maxWidth = 'xl', children, sx, ...props }: PageContainerProps) {
  return (
    <Box
      sx={{
        maxWidth: maxWidth || undefined,
        mx: 'auto',
        py: { xs: 3, md: 4, lg: 6 },
        px: { xs: 2, md: 3 },
        ...sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
}

export default PageContainer;
