'use client';

import React from 'react';
import Link from 'next/link';
import {
  Breadcrumbs as JoyBreadcrumbs,
  BreadcrumbItem,
  BreadcrumbSeparator,
  Typography,
  Box,
} from '@mui/joy';
import HomeIcon from '@mui/icons-material/Home';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  separator?: '/';
  showHome?: boolean;
  homeHref?: string;
  maxItems?: number;
  sx?: object;
}

/**
 * Breadcrumbs - Joy UI-based breadcrumbs component
 */
export function Breadcrumbs({
  items,
  separator = '/',
  showHome = true,
  homeHref = '/',
  maxItems,
  sx,
}: BreadcrumbsProps) {
  const breadcrumbItems: BreadcrumbItem[] = [];

  // Add home item if enabled
  if (showHome) {
    breadcrumbItems.push({
      label: 'Strona główna',
      href: homeHref,
      icon: <HomeIcon fontSize="small" />,
    });
  }

  // Add provided items
  breadcrumbItems.push(...items);

  // Handle maxItems truncation
  let displayItems = breadcrumbItems;
  if (maxItems && breadcrumbItems.length > maxItems) {
    const firstItem = breadcrumbItems[0];
    const lastItems = breadcrumbItems.slice(-(maxItems - 1));
    displayItems = [
      firstItem,
      { label: '...' },
      ...lastItems,
    ];
  }

  return (
    <Box sx={{ py: 2, ...sx }}>
      <JoyBreadcrumbs separator={separator} aria-label="Breadcrumb">
        {displayItems.map((item, index) => {
          const isLast = index === displayItems.length - 1;
          const isEllipsis = item.label === '...';

          return (
            <React.Fragment key={index}>
              {index > 0 && <BreadcrumbSeparator />}
              <BreadcrumbItem
                component={item.href && !isLast ? Link : 'div'}
                href={item.href}
                sx={{
                  textDecoration: 'none',
                  color: isLast ? 'text.primary' : 'text.secondary',
                  fontWeight: isLast ? 'bold' : 'normal',
                  '&:hover': item.href && !isLast ? {
                    color: 'primary.500',
                    textDecoration: 'underline',
                  } : {},
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                }}
              >
                {item.icon}
                <Typography level="body-sm">
                  {item.label}
                </Typography>
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </JoyBreadcrumbs>
    </Box>
  );
}

export default Breadcrumbs;
