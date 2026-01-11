'use client';

import React from 'react';
import { Chip as JoyChip, ChipProps as JoyChipProps } from '@mui/joy';

export interface ChipProps extends Omit<JoyChipProps, 'color' | 'variant' | 'size'> {
  variant?: 'solid' | 'soft' | 'outlined' | 'plain';
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'neutral' | 'warning' | 'info';
  size?: 'sm' | 'md' | 'lg';
  deletable?: boolean;
  onClick?: () => void;
  onDelete?: () => void;
  startDecorator?: React.ReactNode;
  endDecorator?: React.ReactNode;
}

export interface TagProps extends Omit<ChipProps, 'variant'> {
  // Tags use soft variant by default
}

export interface CategoryProps extends Omit<ChipProps, 'variant'> {
  // Categories use outlined variant by default
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'neutral' | 'warning' | 'info';
}

/**
 * Chip - Standardized chip component
 */
export function Chip({
  variant = 'soft',
  color = 'primary',
  size = 'md',
  deletable = false,
  onClick,
  onDelete,
  startDecorator,
  endDecorator,
  children,
  sx,
  ...props
}: ChipProps) {
  return (
    <JoyChip
      variant={variant}
      color={color}
      size={size}
      onClick={onClick}
      onDelete={deletable ? onDelete : undefined}
      startDecorator={startDecorator}
      endDecorator={endDecorator}
      sx={{
        cursor: onClick ? 'pointer' : 'default',
        ...sx,
      }}
      {...props}
    >
      {children}
    </JoyChip>
  );
}

/**
 * Tag - Soft variant chip for tags
 */
export function Tag({
  color = 'primary',
  size = 'sm',
  deletable = false,
  onClick,
  onDelete,
  startDecorator,
  endDecorator,
  children,
  sx,
  ...props
}: TagProps) {
  return (
    <Chip
      variant="soft"
      color={color}
      size={size}
      deletable={deletable}
      onClick={onClick}
      onDelete={onDelete}
      startDecorator={startDecorator}
      endDecorator={endDecorator}
      sx={sx}
      {...props}
    >
      {children}
    </Chip>
  );
}

/**
 * Category - Outlined variant chip for categories
 */
export function Category({
  color = 'primary',
  size = 'md',
  deletable = false,
  onClick,
  onDelete,
  startDecorator,
  endDecorator,
  children,
  sx,
  ...props
}: CategoryProps) {
  return (
    <Chip
      variant="outlined"
      color={color}
      size={size}
      deletable={deletable}
      onClick={onClick}
      onDelete={onDelete}
      startDecorator={startDecorator}
      endDecorator={endDecorator}
      sx={sx}
      {...props}
    >
      {children}
    </Chip>
  );
}

export default Chip;
