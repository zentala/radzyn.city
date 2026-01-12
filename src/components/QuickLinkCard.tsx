'use client';

import { Card, Typography } from '@mui/joy';
import Link from 'next/link';
import { ReactNode } from 'react';

interface QuickLinkCardProps {
  href: string;
  icon: ReactNode;
  title: string;
  description: string;
  colorRgb: string; // e.g., "25, 118, 210" for primary blue
}

export default function QuickLinkCard({
  href,
  icon,
  title,
  description,
  colorRgb
}: QuickLinkCardProps) {
  return (
    <Card
      component={Link}
      href={href}
      variant="plain"
      sx={(theme) => ({
        height: '100%',
        minHeight: 140,
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textDecoration: 'none',
        background: theme.palette.mode === 'dark'
          ? `linear-gradient(135deg, rgba(${colorRgb}, 0.12) 0%, rgba(${colorRgb}, 0.06) 100%)`
          : `linear-gradient(135deg, rgba(${colorRgb}, 0.08) 0%, rgba(${colorRgb}, 0.04) 100%)`,
        border: theme.palette.mode === 'dark'
          ? `1px solid rgba(${colorRgb}, 0.2)`
          : `1px solid rgba(${colorRgb}, 0.15)`,
        boxShadow: theme.palette.mode === 'dark'
          ? 'inset 0 2px 8px rgba(0, 0, 0, 0.2)'
          : `inset 0 2px 8px rgba(${colorRgb}, 0.06)`,
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          background: theme.palette.mode === 'dark'
            ? `linear-gradient(135deg, rgba(${colorRgb}, 0.18) 0%, rgba(${colorRgb}, 0.09) 100%)`
            : `linear-gradient(135deg, rgba(${colorRgb}, 0.12) 0%, rgba(${colorRgb}, 0.06) 100%)`,
          boxShadow: theme.palette.mode === 'dark'
            ? `0 8px 24px rgba(${colorRgb}, 0.2), inset 0 2px 8px rgba(0, 0, 0, 0.2)`
            : `0 8px 24px rgba(${colorRgb}, 0.15), inset 0 2px 8px rgba(${colorRgb}, 0.08)`,
        },
      })}
    >
      <span style={{
        fontSize: 48,
        marginBottom: 12,
        color: `rgba(${colorRgb}, 0.9)`,
        filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {icon}
      </span>
      <Typography
        level="h3"
        sx={(theme) => ({
          color: theme.palette.mode === 'dark'
            ? `rgba(${colorRgb}, 1)`
            : `rgba(${colorRgb}, 0.9)`,
          mb: 0.5,
          fontWeight: 'bold'
        })}
      >
        {title}
      </Typography>
      <Typography level="body-sm" sx={{ color: 'text.secondary' }}>
        {description}
      </Typography>
    </Card>
  );
}
