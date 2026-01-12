'use client';

import React from 'react';
import Link from 'next/link';
import {
  Sheet,
  Stack,
  Typography,
  Box,
  Divider,
} from '@mui/joy';

export interface FooterLink {
  name: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface FooterProps {
  sections?: FooterSection[];
  copyright?: string;
  showSocialLinks?: boolean;
}

const defaultSections: FooterSection[] = [
  {
    title: 'Nawigacja',
    links: [
      { name: 'Strona główna', href: '/' },
      { name: 'O mieście', href: '/city' },
      { name: 'Powiat', href: '/county' },
      { name: 'Mapa i miejsca', href: '/map' },
    ],
  },
  {
    title: 'Aktywność',
    links: [
      { name: 'Wydarzenia', href: '/events' },
      { name: 'Aktualności', href: '/news' },
      { name: 'Ogłoszenia', href: '/announcements' },
      { name: 'Wspomnienia', href: '/memories' },
    ],
  },
  // Temporarily hidden until pages are created
  // {
  //   title: 'Informacje',
  //   links: [
  //     { name: 'O portalu', href: '/about' },
  //     { name: 'Polityka prywatności', href: '/privacy' },
  //     { name: 'Regulamin', href: '/terms' },
  //   ],
  // },
];

/**
 * Footer - Joy UI-based footer component
 */
export function Footer({
  sections = defaultSections,
  copyright = `© ${new Date().getFullYear()} Radzyń Podlaski. Wszelkie prawa zastrzeżone.`,
  showSocialLinks = true,
}: FooterProps) {
  return (
    <Sheet
      variant="soft"
      color="neutral"
      sx={(theme) => ({
        bgcolor: theme.palette.mode === 'dark'
          ? 'background.level1' // Subtle difference from body background in dark mode
          : '#f5f5f7', // Apple-style light grey
        mt: 'auto',
        borderRadius: 0,
        width: '100%',
        borderTop: '1px solid',
        borderColor: theme.palette.mode === 'dark'
          ? 'rgba(255, 255, 255, 0.015)' // Much more subtle border in dark mode
          : 'divider',
      })}
    >
      <Box
        sx={{
          maxWidth: 'xl',
          mx: 'auto',
          px: { xs: 2, md: 4 },
          py: 4,
        }}
      >
        {/* Main footer content */}
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={{ xs: 4, md: 8 }}
          justifyContent="space-between"
        >
          {/* Brand section */}
          <Box sx={{ flex: 1, maxWidth: { md: 300 } }}>
            <Typography level="h4" sx={{ mb: 2, color: 'primary.500' }}>
              Radzyń Podlaski
            </Typography>
            <Typography level="body-sm" sx={{ color: 'text.secondary' }}>
              Oficjalny portal informacyjny miasta Radzyń Podlaski.
              Znajdź najważniejsze informacje o wydarzeniach, miejscach
              i życiu w naszym mieście.
            </Typography>
          </Box>

          {/* Footer sections */}
          {sections.map((section) => (
            <Box key={section.title} sx={{ flex: 0, pr: '100px' }}>
              <Typography level="title-md" sx={{ mb: 2, fontWeight: 'bold' }}>
                {section.title}
              </Typography>
              <Stack spacing={1}>
                {section.links.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    style={{ textDecoration: 'none' }}
                  >
                    <Typography
                      level="body-sm"
                      sx={{
                        color: 'text.secondary',
                        fontWeight: 500,
                        transition: 'color 0.2s ease',
                        '&:hover': {
                          color: 'primary.500',
                        },
                      }}
                    >
                      {link.name}
                    </Typography>
                  </Link>
                ))}
              </Stack>
            </Box>
          ))}
        </Stack>

        <Divider sx={{ my: 4 }} />

        {/* Bottom footer */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Typography level="body-sm" sx={{ color: 'text.tertiary' }}>
            {copyright}
          </Typography>

          {showSocialLinks && (
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography level="body-sm" sx={{ color: 'text.tertiary' }}>
                Stworzono z ❤️ dla Radzynia Podlaskiego
              </Typography>
              <Typography level="body-sm" sx={{ color: 'text.tertiary' }}>
                •
              </Typography>
              <Link href="/contact" style={{ textDecoration: 'none' }}>
                <Typography
                  level="body-sm"
                  sx={{
                    color: 'text.tertiary',
                    fontWeight: 500,
                    transition: 'color 0.2s ease',
                    '&:hover': {
                      color: 'primary.500',
                    },
                  }}
                >
                  Kontakt
                </Typography>
              </Link>
            </Stack>
          )}
        </Stack>
      </Box>
    </Sheet>
  );
}

export default Footer;
