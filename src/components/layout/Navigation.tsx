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
import HomeIcon from '@mui/icons-material/Home';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PublicIcon from '@mui/icons-material/Public';
import MapIcon from '@mui/icons-material/Map';
import PlaceIcon from '@mui/icons-material/Place';
import EventIcon from '@mui/icons-material/Event';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import { Button } from '../foundation/Button';
import { ThemeSwitcher } from '../ThemeSwitcher';

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

// Helper function to get icon for navigation item
const getNavIcon = (href: string) => {
  const iconProps = { fontSize: 'small' as const, sx: { mr: 0.5 } };
  switch (href) {
    case '/':
      return <HomeIcon {...iconProps} />;
    case '/city':
      return <LocationCityIcon {...iconProps} />;
    case '/county':
      return <PublicIcon {...iconProps} />;
    case '/map':
      return <MapIcon {...iconProps} />;
    case '/places':
      return <PlaceIcon {...iconProps} />;
    case '/events':
      return <EventIcon {...iconProps} />;
    case '/contact':
      return <ContactMailIcon {...iconProps} />;
    default:
      return null;
  }
};

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
        className="MuiAppBar-root"
        variant="plain"
        sx={(theme) => ({
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          transition: 'all 300ms ease-in-out',
          boxShadow: trigger ? '0 1px 3px rgba(0, 0, 0, 0.05)' : 'none',
          bgcolor: theme.palette.mode === 'dark'
            ? 'rgba(26, 26, 26, 0.85)'
            : 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: 0,
          borderBottom: '1px solid',
          borderColor: theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, 0.08)'
            : 'rgba(0, 0, 0, 0.08)',
        })}
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
                color: 'text.primary',
                fontWeight: 'bold',
                textDecoration: 'none',
                '&:hover': {
                  opacity: 0.7,
                },
              }}
            >
              Radzyń Podlaski
            </Typography>
          )}

          {/* Desktop navigation */}
          <Stack
            direction="row"
            spacing={0.5}
            alignItems="center"
            sx={{ display: { xs: 'none', md: 'flex' } }}
          >
            {items.map((item) => (
              <Button
                key={item.name}
                variant={isActive(item.href) ? 'soft' : 'plain'}
                component={Link}
                href={item.href}
                color="neutral"
                startDecorator={getNavIcon(item.href)}
                sx={(theme) => ({
                  color: 'text.primary',
                  px: 1.5,
                  py: 0.75,
                  borderRadius: 'md',
                  fontWeight: isActive(item.href) ? '600' : '500',
                  bgcolor: isActive(item.href)
                    ? theme.palette.mode === 'dark'
                      ? 'rgba(255, 255, 255, 0.08)'
                      : 'rgba(0, 0, 0, 0.06)'
                    : 'transparent',
                  '&:hover': {
                    bgcolor: theme.palette.mode === 'dark'
                      ? 'rgba(255, 255, 255, 0.06)'
                      : 'rgba(0, 0, 0, 0.04)',
                  },
                })}
                aria-label={item.enName}
              >
                {item.name}
              </Button>
            ))}

            {/* Theme switcher */}
            <Box sx={{ ml: 1 }}>
              <ThemeSwitcher />
            </Box>
          </Stack>

          {/* Mobile: Theme switcher + menu button */}
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{ display: { xs: 'flex', md: 'none' } }}
          >
            <ThemeSwitcher />
            {showMobileMenu && (
              <IconButton
                variant="plain"
                color="neutral"
                aria-label="menu"
                data-testid="mobile-menu-button"
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                sx={{ color: 'text.primary' }}
              >
                {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
            )}
          </Stack>
        </Stack>
      </Sheet>

      {/* Spacer for fixed header */}
      <Box sx={{ height: 64 }} />

      {/* Mobile navigation drawer */}
      {showMobileMenu && (
        <Sheet
          id="mobile-menu"
          role="presentation"
          variant="plain"
          sx={(theme) => ({
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
            bgcolor: theme.palette.mode === 'dark'
              ? 'rgba(26, 26, 26, 0.95)'
              : 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRadius: 0,
          })}
        >
          <List sx={{ py: 2 }}>
            {items.map((item) => (
              <ListItem key={item.name}>
                <ListItemButton
                  component={Link}
                  href={item.href}
                  selected={isActive(item.href)}
                  sx={(theme) => ({
                    py: 1.5,
                    borderRadius: 'md',
                    mx: 2,
                    '&.Mui-selected': {
                      bgcolor: theme.palette.mode === 'dark'
                        ? 'rgba(255, 255, 255, 0.08)'
                        : 'rgba(0, 0, 0, 0.06)',
                    },
                    '&:hover': {
                      bgcolor: theme.palette.mode === 'dark'
                        ? 'rgba(255, 255, 255, 0.06)'
                        : 'rgba(0, 0, 0, 0.04)',
                    },
                  })}
                  aria-label={item.enName}
                >
                  <ListItemContent>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      {getNavIcon(item.href)}
                      <Typography
                        level="body-lg"
                        sx={{
                          fontWeight: isActive(item.href) ? '600' : 'normal',
                          color: 'text.primary',
                        }}
                      >
                        {item.name}
                      </Typography>
                    </Stack>
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
