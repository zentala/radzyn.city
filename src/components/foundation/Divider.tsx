'use client';

import React from 'react';
import { Divider as JoyDivider, DividerProps as JoyDividerProps, Typography } from '@mui/joy';

export interface DividerProps extends Omit<JoyDividerProps, 'orientation'> {
  orientation?: 'horizontal' | 'vertical';
  text?: string;
  textAlign?: 'left' | 'center' | 'right';
  variant?: 'solid' | 'dashed' | 'dotted';
}

/**
 * Divider - Standardized divider component
 */
export function Divider({
  orientation = 'horizontal',
  text,
  textAlign = 'center',
  variant = 'solid',
  sx,
  ...props
}: DividerProps) {
  if (text) {
    return (
      <JoyDivider
        orientation={orientation}
        sx={{
          '--Divider-gap': '1rem',
          '--Divider-childPosition': textAlign === 'left' ? 'start' : textAlign === 'right' ? 'end' : 'center',
          ...sx,
        }}
        {...props}
      >
        <Typography
          level="body-sm"
          sx={{
            color: 'text.tertiary',
            px: 1,
          }}
        >
          {text}
        </Typography>
      </JoyDivider>
    );
  }

  return (
    <JoyDivider
      orientation={orientation}
      sx={{
        borderStyle: variant,
        ...sx,
      }}
      {...props}
    />
  );
}

/**
 * HorizontalDivider - Pre-configured horizontal divider
 */
export function HorizontalDivider(props: Omit<DividerProps, 'orientation'>) {
  return <Divider orientation="horizontal" {...props} />;
}

/**
 * VerticalDivider - Pre-configured vertical divider
 */
export function VerticalDivider(props: Omit<DividerProps, 'orientation'>) {
  return <Divider orientation="vertical" {...props} />;
}

/**
 * DashedDivider - Pre-configured dashed divider
 */
export function DashedDivider(props: Omit<DividerProps, 'variant'>) {
  return <Divider variant="dashed" {...props} />;
}

/**
 * DottedDivider - Pre-configured dotted divider
 */
export function DottedDivider(props: Omit<DividerProps, 'variant'>) {
  return <Divider variant="dotted" {...props} />;
}

export default Divider;
