'use client';

import React from 'react';
import { Box, BoxProps } from '@mui/joy';

export interface IconProps extends BoxProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
}

/**
 * Icon - Standardized icon wrapper
 */
export function Icon({ size = 'md', children, sx, ...props }: IconProps) {
  const getSize = () => {
    switch (size) {
      case 'xs':
        return 16;
      case 'sm':
        return 20;
      case 'md':
        return 24;
      case 'lg':
        return 32;
      case 'xl':
        return 48;
      default:
        return 24;
    }
  };

  return (
    <Box
      component="span"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: getSize(),
        height: getSize(),
        '& svg': {
          width: '100%',
          height: '100%',
        },
        ...sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
}

export default Icon;
