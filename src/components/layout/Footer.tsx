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
import { Button } from '../foundation/Button';

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
      { name: 'Mapa', href: '/map' },
    ],
  },
  {
    title: 'Miejsca',
    links: [
      { name: 'Miejsca', href: '/places' },
      { name: 'Wydarzenia', href: '/events' },
      { name: 'Aktualności', href: '/news' },
      { name: 'Kontakt', href: '/contact' },
    ],
  },
  {
    title: 'Informacje',
    links: [
      { name: 'O portalu', href: '/about' },
      { name: 'Polityka prywatności', href: '/privacy' },
      { name: 'Regulamin', href: '/terms' },
    ],
  },
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
      variant="solid"
      color="neutral"
      sx={{
        bgcolor: 'background.level3',
        mt: 'auto',
      }}
    >
      <Box
        sx={{
          maxWidth: 'lg',
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
            <Box key={section.title} sx={{ flex: 1 }}>
              <Typography level="title-md" sx={{ mb: 2, fontWeight: 'bold' }}>
                {section.title}
              </Typography>
              <Stack spacing={1}>
                {section.links.map((link) => (
                  <Button
                    key={link.name}
                    variant="plain"
                    component={Link}
                    href={link.href}
                    color="neutral"
                    sx={{
                      justifyContent: 'flex-start',
                      p: 0,
                      color: 'text.secondary',
                      '&:hover': {
                        color: 'primary.500',
                        bgcolor: 'transparent',
                      },
                    }}
                  >
                    {link.name}
                  </Button>
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
            <Stack direction="row" spacing={1}>
              <Typography level="body-sm" sx={{ color: 'text.tertiary' }}>
                Stworzono z ❤️ dla Radzynia Podlaskiego
              </Typography>
            </Stack>
          )}
        </Stack>
      </Box>
    </Sheet>
  );
}

export default Footer;
