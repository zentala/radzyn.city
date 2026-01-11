'use client';

import React from 'react';
import {
  Skeleton as JoySkeleton,
  SkeletonProps as JoySkeletonProps,
  Box,
  Stack,
} from '@mui/joy';

export interface SkeletonProps extends Omit<JoySkeletonProps, 'variant'> {
  variant?: 'text' | 'circular' | 'rectangular' | 'card' | 'list' | 'table';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | false;
}

/**
 * Skeleton - Standardized skeleton loading component
 */
export function Skeleton({
  variant = 'text',
  width,
  height,
  animation = 'pulse',
  sx,
  ...props
}: SkeletonProps) {
  return (
    <JoySkeleton
      variant={variant === 'card' || variant === 'list' || variant === 'table' ? 'rectangular' : variant}
      width={width}
      height={height}
      animation={animation}
      sx={sx}
      {...props}
    />
  );
}

/**
 * CardSkeleton - Skeleton for card components
 */
export function CardSkeleton({ sx, ...props }: Omit<SkeletonProps, 'variant'>) {
  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 'md',
        border: '1px solid',
        borderColor: 'divider',
        ...sx,
      }}
      {...props}
    >
      <Stack spacing={2}>
        <Skeleton variant="rectangular" width="100%" height={200} />
        <Skeleton variant="text" width="80%" />
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="text" width="40%" />
      </Stack>
    </Box>
  );
}

/**
 * ListSkeleton - Skeleton for list items
 */
export function ListSkeleton({ count = 3, sx, ...props }: Omit<SkeletonProps, 'variant'> & { count?: number }) {
  return (
    <Stack spacing={2} sx={sx} {...props}>
      {Array.from({ length: count }).map((_, index) => (
        <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Skeleton variant="circular" width={40} height={40} />
          <Stack spacing={1} sx={{ flex: 1 }}>
            <Skeleton variant="text" width="70%" />
            <Skeleton variant="text" width="50%" />
          </Stack>
        </Box>
      ))}
    </Stack>
  );
}

/**
 * TableSkeleton - Skeleton for table rows
 */
export function TableSkeleton({ rows = 5, columns = 4, sx, ...props }: Omit<SkeletonProps, 'variant'> & { rows?: number; columns?: number }) {
  return (
    <Box sx={sx} {...props}>
      <Stack spacing={1}>
        {/* Header */}
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          {Array.from({ length: columns }).map((_, index) => (
            <Skeleton key={`header-${index}`} variant="text" width="100%" />
          ))}
        </Box>
        {/* Rows */}
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <Box key={`row-${rowIndex}`} sx={{ display: 'flex', gap: 2 }}>
            {Array.from({ length: columns }).map((_, colIndex) => (
              <Skeleton key={`cell-${rowIndex}-${colIndex}`} variant="text" width="100%" />
            ))}
          </Box>
        ))}
      </Stack>
    </Box>
  );
}

/**
 * TextSkeleton - Skeleton for text content
 */
export function TextSkeleton({ lines = 3, sx, ...props }: Omit<SkeletonProps, 'variant'> & { lines?: number }) {
  return (
    <Stack spacing={1} sx={sx} {...props}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          variant="text"
          width={index === lines - 1 ? '60%' : '100%'}
        />
      ))}
    </Stack>
  );
}

/**
 * AvatarSkeleton - Skeleton for avatar
 */
export function AvatarSkeleton({ size = 40, sx, ...props }: Omit<SkeletonProps, 'variant'> & { size?: number }) {
  return (
    <Skeleton
      variant="circular"
      width={size}
      height={size}
      sx={sx}
      {...props}
    />
  );
}

/**
 * ImageSkeleton - Skeleton for images
 */
export function ImageSkeleton({ width = '100%', height = 200, sx, ...props }: Omit<SkeletonProps, 'variant'>) {
  return (
    <Skeleton
      variant="rectangular"
      width={width}
      height={height}
      sx={sx}
      {...props}
    />
  );
}

export default Skeleton;
