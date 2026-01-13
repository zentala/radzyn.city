'use client';

import React, { forwardRef } from 'react';
import { Button as JoyButton, ButtonProps as JoyButtonProps } from '@mui/joy';

export type ButtonProps = Omit<JoyButtonProps, 'variant'> & {
  variant?: 'solid' | 'soft' | 'outlined' | 'plain';
  loading?: boolean;
  /**
   * Allow link-like usage (e.g. `component={Link}` + `href`) without fighting
   * the generic typing of Joy's polymorphic Button.
   */
  href?: string;
  component?: React.ElementType;
};

/**
 * Apple-style Button component with multiple variants
 *
 * Variants:
 * - outlined: Neutral border with transparent background (default for actions)
 * - solid: Filled background with contrast text (primary CTA)
 * - soft: Subtle background with border (secondary actions)
 * - plain: No background or border (tertiary actions)
 */
export const Button = forwardRef<any, ButtonProps>(
  ({ variant = 'outlined', sx, ...props }, ref) => {
    return (
      <JoyButton
        ref={ref}
        variant={variant}
        sx={(theme) => ({
          // Base Apple-style button
          fontWeight: 500,
          fontSize: '0.875rem',
          px: 2.5,
          py: 1.25,
          borderRadius: '8px',
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          textTransform: 'none',
          minHeight: '40px', // Ensure consistent height

          // Outlined variant - minimal with border
          ...(variant === 'outlined' && {
            bgcolor: 'transparent',
            color: theme.palette.mode === 'dark'
              ? 'rgba(255, 255, 255, 0.9)'
              : 'rgba(0, 0, 0, 0.8)',
            border: theme.palette.mode === 'dark'
              ? '1px solid rgba(255, 255, 255, 0.15)'
              : '1px solid rgba(0, 0, 0, 0.15)',
            '&:hover': {
              bgcolor: theme.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, 0.06)'
                : 'rgba(0, 0, 0, 0.04)',
              borderColor: theme.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, 0.25)'
                : 'rgba(0, 0, 0, 0.25)',
              transform: 'translateY(-1px)',
              boxShadow: theme.palette.mode === 'dark'
                ? '0 2px 8px rgba(0, 0, 0, 0.3)'
                : '0 2px 8px rgba(0, 0, 0, 0.08)',
            },
            '&:active': {
              transform: 'translateY(0)',
            }
          }),

          // Solid variant - filled background
          ...(variant === 'solid' && {
            bgcolor: theme.palette.mode === 'dark'
              ? 'rgba(255, 255, 255, 0.9)'
              : 'rgba(0, 0, 0, 0.85)',
            color: theme.palette.mode === 'dark'
              ? 'rgba(0, 0, 0, 0.9)'
              : 'rgba(255, 255, 255, 0.95)',
            border: 'none',
            '&:hover': {
              bgcolor: theme.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, 1.0)'
                : 'rgba(0, 0, 0, 0.95)',
              transform: 'translateY(-1px)',
              boxShadow: theme.palette.mode === 'dark'
                ? '0 4px 12px rgba(0, 0, 0, 0.4)'
                : '0 4px 12px rgba(0, 0, 0, 0.2)',
            },
            '&:active': {
              transform: 'translateY(0)',
            }
          }),

          // Soft variant - subtle background with border
          ...(variant === 'soft' && {
            bgcolor: theme.palette.mode === 'dark'
              ? 'rgba(255, 255, 255, 0.06)'
              : 'rgba(0, 0, 0, 0.04)',
            color: theme.palette.mode === 'dark'
              ? 'rgba(255, 255, 255, 0.9)'
              : 'rgba(0, 0, 0, 0.8)',
            border: theme.palette.mode === 'dark'
              ? '1px solid rgba(255, 255, 255, 0.08)'
              : '1px solid rgba(0, 0, 0, 0.08)',
            '&:hover': {
              bgcolor: theme.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, 0.1)'
                : 'rgba(0, 0, 0, 0.06)',
              borderColor: theme.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, 0.15)'
                : 'rgba(0, 0, 0, 0.12)',
              transform: 'translateY(-1px)',
              boxShadow: theme.palette.mode === 'dark'
                ? '0 2px 8px rgba(0, 0, 0, 0.2)'
                : '0 2px 8px rgba(0, 0, 0, 0.05)',
            },
            '&:active': {
              transform: 'translateY(0)',
            }
          }),

          // Plain variant - no background or border
          ...(variant === 'plain' && {
            bgcolor: 'transparent',
            color: theme.palette.mode === 'dark'
              ? 'rgba(255, 255, 255, 0.8)'
              : 'rgba(0, 0, 0, 0.7)',
            border: 'none',
            '&:hover': {
              bgcolor: theme.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, 0.05)'
                : 'rgba(0, 0, 0, 0.03)',
              color: theme.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, 0.95)'
                : 'rgba(0, 0, 0, 0.9)',
            },
            '&:active': {
              bgcolor: theme.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, 0.08)'
                : 'rgba(0, 0, 0, 0.05)',
            }
          }),

          // Override with custom sx
          ...(typeof sx === 'function' ? sx(theme) : sx),
        })}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export default Button;
