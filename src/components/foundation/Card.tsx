'use client';

import React from 'react';
import { Card as JoyCard, CardProps as JoyCardProps } from '@mui/joy';

export interface CardProps extends JoyCardProps {
  variant?: 'outlined' | 'soft' | 'solid';
  children: React.ReactNode;
}

/**
 * Card - Standardized card component
 */
export function Card({ variant = 'outlined', children, sx, ...props }: CardProps) {
  return (
    <JoyCard
      variant={variant}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        ...sx,
      }}
      {...props}
    >
      {children}
    </JoyCard>
  );
}

export default Card;
