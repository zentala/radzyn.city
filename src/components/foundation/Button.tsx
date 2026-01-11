'use client';

import React from 'react';
import { Button as JoyButton, ButtonProps as JoyButtonProps } from '@mui/joy';

export interface ButtonProps extends Omit<JoyButtonProps, 'variant' | 'color' | 'size'> {
  variant?: 'solid' | 'soft' | 'outlined' | 'plain';
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  fullWidth?: boolean;
  startDecorator?: React.ReactNode;
  endDecorator?: React.ReactNode;
}

/**
 * Button - Standardized button component with all Joy UI variants
 */
export function Button({
  variant = 'solid',
  color = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  startDecorator,
  endDecorator,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <JoyButton
      variant={variant}
      color={color}
      size={size}
      fullWidth={fullWidth}
      startDecorator={startDecorator}
      endDecorator={endDecorator}
      loading={loading}
      disabled={disabled || loading}
      {...props}
    >
      {children}
    </JoyButton>
  );
}

export default Button;
