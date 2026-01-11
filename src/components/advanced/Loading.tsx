'use client';

import React from 'react';
import {
  Box,
  CircularProgress,
  LinearProgress,
  Typography,
  Sheet,
  useTheme,
} from '@mui/joy';
import { Skeleton } from '../foundation/Skeleton';

export interface LoadingProps {
  type?: 'spinner' | 'linear' | 'skeleton' | 'dots';
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'neutral';
  label?: string;
  fullScreen?: boolean;
  overlay?: boolean;
  sx?: object;
}

/**
 * Loading - Joy UI-based loading component
 */
export function Loading({
  type = 'spinner',
  size = 'md',
  color = 'primary',
  label,
  fullScreen = false,
  overlay = false,
  sx,
}: LoadingProps) {
  const theme = useTheme();

  const sizeMap = {
    sm: { spinner: 24, linear: 2 },
    md: { spinner: 40, linear: 3 },
    lg: { spinner: 56, linear: 4 },
  };

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        ...sx,
      }}
    >
      {type === 'spinner' && (
        <CircularProgress
          size={sizeMap[size].spinner}
          color={color}
          sx={{
            '--CircularProgress-size': `${sizeMap[size].spinner}px`,
          }}
        />
      )}

      {type === 'linear' && (
        <Box sx={{ width: '100%', maxWidth: 200 }}>
          <LinearProgress
            color={color}
            sx={{
              height: sizeMap[size].linear,
              borderRadius: 'xs',
            }}
          />
        </Box>
      )}

      {type === 'dots' && (
        <Box sx={{ display: 'flex', gap: 1 }}>
          {[0, 1, 2].map((i) => (
            <Box
              key={i}
              sx={{
                width: size === 'sm' ? 8 : size === 'lg' ? 16 : 12,
                height: size === 'sm' ? 8 : size === 'lg' ? 16 : 12,
                borderRadius: '50%',
                bgcolor: theme.vars.palette[color]?.[500],
                animation: 'bounce 1.4s infinite ease-in-out both',
                animationDelay: `${i * 0.16}s`,
                '@keyframes bounce': {
                  '0%, 80%, 100%': {
                    transform: 'scale(0)',
                  },
                  '40%': {
                    transform: 'scale(1)',
                  },
                },
              }}
            />
          ))}
        </Box>
      )}

      {type === 'skeleton' && (
        <Box sx={{ width: '100%', maxWidth: 300 }}>
          <Skeleton variant="text" width="100%" height={24} />
          <Skeleton variant="text" width="80%" height={20} />
          <Skeleton variant="text" width="60%" height={20} />
        </Box>
      )}

      {label && (
        <Typography level="body-sm" sx={{ color: 'text.secondary' }}>
          {label}
        </Typography>
      )}
    </Box>
  );

  if (fullScreen) {
    return (
      <Box
        sx={{
          position: 'fixed',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: overlay ? 'rgba(0, 0, 0, 0.5)' : 'background.body',
          zIndex: 9999,
        }}
      >
        {content}
      </Box>
    );
  }

  return content;
}

/**
 * PageLoading - Full page loading state
 */
export interface PageLoadingProps {
  message?: string;
  variant?: 'default' | 'minimal' | 'skeleton';
}

export function PageLoading({
  message = 'Loading...',
  variant = 'default',
}: PageLoadingProps) {
  if (variant === 'minimal') {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 8,
        }}
      >
        <Loading type="spinner" size="md" label={message} />
      </Box>
    );
  }

  if (variant === 'skeleton') {
    return (
      <Box sx={{ p: 3 }}>
        <Skeleton variant="rectangular" width="100%" height={200} sx={{ mb: 2 }} />
        <Skeleton variant="text" width="60%" height={32} sx={{ mb: 2 }} />
        <Skeleton variant="text" width="100%" height={20} sx={{ mb: 1 }} />
        <Skeleton variant="text" width="90%" height={20} sx={{ mb: 1 }} />
        <Skeleton variant="text" width="80%" height={20} sx={{ mb: 3 }} />
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Skeleton variant="rectangular" width="30%" height={150} />
          <Skeleton variant="rectangular" width="30%" height={150} />
          <Skeleton variant="rectangular" width="30%" height={150} />
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Loading type="spinner" size="lg" label={message} />
    </Box>
  );
}

/**
 * CardLoading - Card skeleton loading state
 */
export interface CardLoadingProps {
  count?: number;
  variant?: 'default' | 'compact' | 'detailed';
}

export function CardLoading({ count = 3, variant = 'default' }: CardLoadingProps) {
  const renderCard = () => {
    if (variant === 'compact') {
      return (
        <Sheet
          variant="outlined"
          sx={{
            p: 2,
            borderRadius: 'sm',
            display: 'flex',
            gap: 2,
          }}
        >
          <Skeleton variant="circular" width={48} height={48} />
          <Box sx={{ flex: 1 }}>
            <Skeleton variant="text" width="70%" height={20} sx={{ mb: 1 }} />
            <Skeleton variant="text" width="50%" height={16} />
          </Box>
        </Sheet>
      );
    }

    if (variant === 'detailed') {
      return (
        <Sheet
          variant="outlined"
          sx={{
            p: 2,
            borderRadius: 'sm',
          }}
        >
          <Skeleton variant="rectangular" width="100%" height={160} sx={{ mb: 2 }} />
          <Skeleton variant="text" width="80%" height={24} sx={{ mb: 1 }} />
          <Skeleton variant="text" width="100%" height={16} sx={{ mb: 1 }} />
          <Skeleton variant="text" width="90%" height={16} sx={{ mb: 2 }} />
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Skeleton variant="rounded" width={60} height={24} />
            <Skeleton variant="rounded" width={60} height={24} />
          </Box>
        </Sheet>
      );
    }

    return (
      <Sheet
        variant="outlined"
        sx={{
          p: 2,
          borderRadius: 'sm',
        }}
      >
        <Skeleton variant="rectangular" width="100%" height={120} sx={{ mb: 2 }} />
        <Skeleton variant="text" width="70%" height={20} sx={{ mb: 1 }} />
        <Skeleton variant="text" width="100%" height={16} sx={{ mb: 1 }} />
        <Skeleton variant="text" width="60%" height={16} />
      </Sheet>
    );
  };

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
        },
        gap: 2,
      }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <Box key={i}>{renderCard()}</Box>
      ))}
    </Box>
  );
}

/**
 * TableLoading - Table skeleton loading state
 */
export interface TableLoadingProps {
  rows?: number;
  columns?: number;
  showHeader?: boolean;
}

export function TableLoading({
  rows = 5,
  columns = 4,
  showHeader = true,
}: TableLoadingProps) {
  return (
    <Box sx={{ width: '100%' }}>
      {showHeader && (
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            p: 2,
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          {Array.from({ length: columns }).map((_, i) => (
            <Skeleton
              key={`header-${i}`}
              variant="text"
              width={`${100 / columns}%`}
              height={20}
            />
          ))}
        </Box>
      )}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <Box
          key={`row-${rowIndex}`}
          sx={{
            display: 'flex',
            gap: 2,
            p: 2,
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton
              key={`cell-${rowIndex}-${colIndex}`}
              variant="text"
              width={`${100 / columns}%`}
              height={16}
            />
          ))}
        </Box>
      ))}
    </Box>
  );
}

/**
 * InlineLoading - Small inline loading indicator
 */
export interface InlineLoadingProps {
  label?: string;
  size?: 'sm' | 'md';
}

export function InlineLoading({ label, size = 'sm' }: InlineLoadingProps) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <CircularProgress size={size === 'sm' ? 16 : 20} color="primary" />
      {label && (
        <Typography level="body-sm" sx={{ color: 'text.secondary' }}>
          {label}
        </Typography>
      )}
    </Box>
  );
}

/**
 * ButtonLoading - Button with loading state
 */
export interface ButtonLoadingProps {
  loading: boolean;
  children: React.ReactNode;
  disabled?: boolean;
  loadingLabel?: string;
}

export function ButtonLoading({
  loading,
  children,
  disabled,
  loadingLabel = 'Loading...',
}: ButtonLoadingProps) {
  return (
    <Box sx={{ display: 'inline-flex', position: 'relative' }}>
      <Box
        sx={{
          opacity: loading ? 0 : 1,
          visibility: loading ? 'hidden' : 'visible',
          transition: 'opacity 0.2s',
        }}
      >
        {children}
      </Box>
      {loading && (
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
          }}
        >
          <CircularProgress size={20} color="neutral" />
          <Typography level="body-sm">{loadingLabel}</Typography>
        </Box>
      )}
    </Box>
  );
}

export default Loading;
