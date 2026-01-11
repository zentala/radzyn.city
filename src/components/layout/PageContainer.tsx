'use client';

import React from 'react';
import { Container, ContainerProps } from '@mui/joy';

export interface PageContainerProps extends Omit<ContainerProps, 'maxWidth'> {
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  children: React.ReactNode;
}

/**
 * PageContainer - Standard page wrapper with consistent padding
 */
export function PageContainer({ maxWidth = 'xl', children, sx, ...props }: PageContainerProps) {
  return (
    <Container
      maxWidth={maxWidth}
      sx={{
        py: { xs: 3, md: 4, lg: 6 },
        px: { xs: 2, md: 3 },
        ...sx,
      }}
      {...props}
    >
      {children}
    </Container>
  );
}

export default PageContainer;
