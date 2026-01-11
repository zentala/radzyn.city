'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sheet,
  Stack,
  Typography,
  IconButton,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
} from '@mui/joy';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from '../foundation/Button';

export interface NavigationItem {
  name: string;
  href: string;
  enName: string;
}

export interface NavigationProps {
  items?: NavigationItem[];
  logo?: React.ReactNode;
  logoHref?: string;
  showMobileMenu?: boolean;
}

const defaultNavigationItems: NavigationItem[] = [
  { name: 'Strona główna', href: '/', enName: 'Home' },
  { name: 'O mieście', href: '/city', enName: 'City' },
  { name: 'Powiat', href: '/county', enName: 'County' },
  { name: 'Mapa', href: '/map', enName: 'Map' },
  { name: 'Miejsca', href: '/places', enName: 'Places' },
  { name: 'Wydarzenia', href: '/events', enName: 'Events' },
  { name: 'Kontakt', href: '/contact', enName: 'Contact' },
];

/**
 * Navigation - Joy UI-based navigation component with header and mobile menu
 */
export function Navigation({
  items = defaultNavigationItems,
  logo,
  logoHref = '/',
  showMobileMenu = true,
}: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const currentPath = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== trigger) {
        setTrigger(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [trigger]);

  // Close mobile menu when changing route
  useEffect(() => {
    setIsMenuOpen(false);
  }, [currentPath]);

  const isActive = (path: string) => currentPath === path;

  return (
    <Box component="header" role="banner">
      {/* Header */}
      <Sheet
        variant="solid"
        color="primary"
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          transition: 'all 300ms ease-in-out',
          boxShadow: trigger ? 'md' : 'none',
          bgcolor: trigger ? 'primary.500' : 'rgba(37, 69, 107, 0.9)',
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            px: { xs: 2, md: 4 },
            py: 1.5,
            maxWidth: 'lg',
            mx: 'auto',
          }}
        >
          {/* Logo */}
          {logo || (
            <Typography
              component={Link}
              href={logoHref}
              level="h4"
              sx={{
                color: 'white',
                fontWeight: 'bold',
                textDecoration: 'none',
                '&:hover': {
                  opacity: 0.9,
                },
              }}
            >
              Radzyń Podlaski
            </Typography>
          )}

          {/* Desktop navigation */}
          <Stack
            direction="row"
            spacing={1}
            sx={{ display: { xs: 'none', md: 'flex' } }}
          >
            {items.map((item) => (
              <Button
                key={item.name}
                variant="plain"
                component={Link}
                href={item.href}
                color="neutral"
                sx={{
                  color: 'white',
                  position: 'relative',
                  fontWeight: isActive(item.href) ? 'bold' : 'regular',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    bgcolor: isActive(item.href) ? 'white' : 'transparent',
                    transition: 'all 200ms ease-in-out',
                  },
                  '&:hover::after': {
                    bgcolor: 'rgba(255, 255, 255, 0.5)',
                  },
                }}
                aria-label={item.enName}
              >
                {item.name}
              </Button>
            ))}
          </Stack>

          {/* Mobile menu button */}
          {showMobileMenu && (
            <IconButton
              variant="plain"
              color="neutral"
              aria-label="menu"
              data-testid="mobile-menu-button"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              sx={{ display: { xs: 'flex', md: 'none' }, color: 'white' }}
            >
              {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          )}
        </Stack>
      </Sheet>

      {/* Spacer for fixed header */}
      <Box sx={{ height: 64 }} />

      {/* Mobile navigation drawer */}
      {showMobileMenu && (
        <Sheet
          id="mobile-menu"
          variant="solid"
          color="primary"
          sx={{
            position: 'fixed',
            top: 64,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999,
            transform: isMenuOpen ? 'translateY(0)' : 'translateY(-100%)',
            transition: 'transform 300ms ease-in-out',
            display: { xs: 'block', md: 'none' },
            overflow: 'auto',
          }}
        >
          <List sx={{ py: 2 }}>
            {items.map((item) => (
              <ListItem key={item.name}>
                <ListItemButton
                  component={Link}
                  href={item.href}
                  selected={isActive(item.href)}
                  sx={{
                    py: 1.5,
                    borderRadius: 'md',
                    mx: 2,
                    '&.Mui-selected': {
                      bgcolor: 'rgba(255, 255, 255, 0.2)',
                    },
                    '&:hover': {
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                    },
                  }}
                  aria-label={item.enName}
                >
                  <ListItemContent>
                    <Typography
                      level="body-lg"
                      sx={{
                        fontWeight: isActive(item.href) ? 'bold' : 'normal',
                        color: 'white',
                      }}
                    >
                      {item.name}
                    </Typography>
                  </ListItemContent>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Sheet>
      )}
    </Box>
  );
}

export default Navigation;
