'use client';

import React from 'react';
import { Typography as JoyTypography, TypographyProps as JoyTypographyProps } from '@mui/joy';

export interface TypographyProps extends Omit<JoyTypographyProps, 'level'> {
  level?: 'display' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body-lg' | 'body-md' | 'body-sm' | 'body-xs' | 'title-lg' | 'title-md' | 'title-sm';
  color?: 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'error' | 'info' | 'neutral';
}

/**
 * Typography - Standardized typography component
 */
export function Typography({
  level = 'body-md',
  color,
  children,
  sx,
  ...props
}: TypographyProps) {
  const getJoyLevel = () => {
    switch (level) {
      case 'display':
        return 'h1';
      case 'h1':
        return 'h1';
      case 'h2':
        return 'h2';
      case 'h3':
        return 'h3';
      case 'h4':
        return 'h4';
      case 'h5':
        return 'h5';
      case 'h6':
        return 'h6';
      case 'body-lg':
        return 'body-lg';
      case 'body-md':
        return 'body-md';
      case 'body-sm':
        return 'body-sm';
      case 'body-xs':
        return 'body-xs';
      case 'title-lg':
        return 'title-lg';
      case 'title-md':
        return 'title-md';
      case 'title-sm':
        return 'title-sm';
      default:
        return 'body-md';
    }
  };

  const getJoyColor = () => {
    switch (color) {
      case 'primary':
        return 'primary';
      case 'secondary':
        return 'secondary';
      case 'tertiary':
        return 'neutral';
      case 'success':
        return 'success';
      case 'warning':
        return 'warning';
      case 'error':
        return 'danger';
      case 'info':
        return 'info';
      case 'neutral':
        return 'neutral';
      default:
        return undefined;
    }
  };

  return (
    <JoyTypography
      level={getJoyLevel() as any}
      color={getJoyColor()}
      sx={sx}
      {...props}
    >
      {children}
    </JoyTypography>
  );
}

export default Typography;
