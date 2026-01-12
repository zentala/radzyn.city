'use client';

import React from 'react';
import {
  Card as JoyCard,
  CardProps as JoyCardProps,
  CardContent,
  Typography,
  Box
} from '@mui/joy';
import PlaceholderImage from '../PlaceholderImage';

export interface BaseCardProps extends Omit<JoyCardProps, 'title'> {
  variant?: 'outlined' | 'soft' | 'solid' | 'plain';
}

/**
 * Base Card - Simple card wrapper
 */
export function Card({ variant = 'outlined', children, sx, ...props }: BaseCardProps) {
  return (
    <JoyCard
      variant={variant}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        borderRadius: '12px',
        transition: 'all 0.3s ease',
        border: (theme) => theme.palette.mode === 'dark'
          ? '1px solid rgba(255, 255, 255, 0.08)'
          : '1px solid rgba(0, 0, 0, 0.08)',
        boxShadow: (theme) => theme.palette.mode === 'dark'
          ? '0 2px 8px rgba(0, 0, 0, 0.2)'
          : '0 2px 8px rgba(0, 0, 0, 0.06)',
        '&:hover': {
          borderColor: (theme) => theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, 0.15)'
            : 'rgba(0, 0, 0, 0.15)',
          boxShadow: (theme) => theme.palette.mode === 'dark'
            ? '0 0 20px rgba(255, 255, 255, 0.08), 0 4px 12px rgba(0, 0, 0, 0.3)'
            : '0 0 20px rgba(0, 0, 0, 0.04), 0 4px 12px rgba(0, 0, 0, 0.08)',
        },
        ...sx,
      }}
      {...props}
    >
      {children}
    </JoyCard>
  );
}

/**
 * ContentCard - Card with standardized image, title, and description
 * Uses the same styling as CityHighlights cards
 */
export interface ContentCardProps extends BaseCardProps {
  /** Image URL or undefined for placeholder */
  imageUrl?: string;
  /** Alt text for image (also used as placeholder text) */
  imageAlt: string;
  /** Image height in pixels */
  imageHeight?: number;
  /** Card title - styled with large, prominent typography */
  title: string;
  /** Optional metadata to render between title and description (e.g., date, location) */
  metadata?: React.ReactNode;
  /** Card description/summary text */
  description?: string;
  /** Number of lines to show for description (default: no limit) */
  descriptionLines?: number;
  /** Optional content to render above the footer */
  children?: React.ReactNode;
  /** Optional footer content (buttons, actions, etc.) */
  footer?: React.ReactNode;
  /** Optional overlay content on top of the image */
  imageOverlay?: React.ReactNode;
  /** Disable hover effect */
  disableHover?: boolean;
}

export function ContentCard({
  imageUrl,
  imageAlt,
  imageHeight = 192,
  title,
  metadata,
  description,
  descriptionLines,
  children,
  footer,
  imageOverlay,
  disableHover = false,
  sx,
  ...props
}: ContentCardProps) {
  return (
    <Card
      sx={{
        position: 'relative',
        zIndex: 1, // Above background number
        ...(disableHover && {
          '&:hover': {
            borderColor: 'inherit',
            boxShadow: 'inherit',
          },
        }),
        ...sx,
      }}
      {...props}
    >
      {/* Image Section */}
      <Box sx={{ position: 'relative', height: imageHeight, overflow: 'hidden' }}>
        <PlaceholderImage
          title={imageAlt}
          src={imageUrl}
          height={imageHeight}
          aspectRatio="landscape"
          sx={{ width: '100%', height: '100%' }}
        />
        {imageOverlay && imageOverlay}
      </Box>

      {/* Content Section */}
      <CardContent sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Title - Same style as CityHighlights */}
        <Typography
          level="h4"
          component="h3"
          sx={{
            mb: metadata ? 1.5 : 1,
            fontWeight: 500,
            fontSize: { xs: '1.25rem', md: '1.5rem' }
          }}
        >
          {title}
        </Typography>

        {/* Metadata (e.g., date, location) - Between title and description */}
        {metadata && (
          <Box sx={{ mb: 1.5 }}>
            {metadata}
          </Box>
        )}

        {/* Description - Same style as CityHighlights */}
        {description && (
          <Typography
            level="body-md"
            sx={{
              color: 'text.secondary',
              fontSize: { xs: '0.875rem', md: '1rem' },
              mb: children || footer ? 2 : 0,
              ...(descriptionLines && {
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: descriptionLines,
                WebkitBoxOrient: 'vertical',
              })
            }}
          >
            {description}
          </Typography>
        )}

        {/* Additional content */}
        {children && (
          <Box sx={{ flexGrow: 1 }}>
            {children}
          </Box>
        )}

        {/* Footer */}
        {footer && (
          <Box sx={{ mt: 'auto', pt: 2 }}>
            {footer}
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

export default Card;
