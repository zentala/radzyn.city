"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Box, Typography, Button, IconButton, Drawer, Sheet,
  List, ListItem, ListItemButton, ListItemContent
} from '@mui/joy';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const currentPath = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Strona główna', href: '/', enName: 'Home' },
    { name: 'O mieście', href: '/city', enName: 'City' },
    { name: 'Powiat', href: '/county', enName: 'County' },
    { name: 'Mapa', href: '/map', enName: 'Map' },
    { name: 'Miejsca', href: '/places', enName: 'Places' },
    { name: 'Wydarzenia', href: '/events', enName: 'Events' },
    { name: 'Kontakt', href: '/contact', enName: 'Contact' },
  ];

  // Close mobile menu when changing route
  useEffect(() => {
    setIsMenuOpen(false);
  }, [currentPath]);

  const isActive = (path: string) => currentPath === path;

  return (
    <Box component="header" role="banner">
      <Box
        className="MuiAppBar-root"
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1100,
          transition: 'all 300ms ease-in-out',
          bgcolor: scrolled ? 'primary.500' : 'rgba(25, 118, 210, 0.9)',
          boxShadow: scrolled ? 'md' : 'none',
        }}
      >
        <Box
          sx={{
            maxWidth: 'lg',
            mx: 'auto',
            width: '100%',
            px: { xs: 2, md: 3 },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              py: 1,
              minHeight: 64,
            }}
          >
            <Typography
              component={Link}
              href="/"
              level="h4"
              sx={{
                textDecoration: 'none',
                color: 'white',
                fontWeight: 'bold',
                '&:hover': {
                  opacity: 0.9,
                },
              }}
            >
              Radzyń Podlaski
            </Typography>

            {/* Desktop navigation */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
              {navigation.map((item) => (
                <Button
                  key={item.name}
                  component={Link}
                  href={item.href}
                  variant="plain"
                  sx={{
                    color: 'white',
                    px: 2,
                    py: 1,
                    borderBottom: isActive(item.href) ? '2px solid white' : '2px solid transparent',
                    borderRadius: 0,
                    fontWeight: isActive(item.href) ? 'lg' : 'md',
                    '&:hover': {
                      borderBottom: '2px solid rgba(255, 255, 255, 0.5)',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                  }}
                  aria-label={item.enName}
                >
                  {item.name}
                  <Box
                    component="span"
                    sx={{
                      position: 'absolute',
                      width: 1,
                      height: 1,
                      overflow: 'hidden',
                      clip: 'rect(0 0 0 0)',
                    }}
                  >
                    {item.enName}
                  </Box>
                </Button>
              ))}
            </Box>

            {/* Mobile menu button */}
            <IconButton
              size="lg"
              variant="plain"
              color="neutral"
              data-testid="mobile-menu-button"
              aria-label="menu"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              sx={{
                display: { xs: 'flex', md: 'none' },
                color: 'white',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          </Box>
        </Box>
      </Box>

      {/* Mobile navigation drawer */}
      <Drawer
        id="mobile-menu"
        anchor="top"
        open={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        slotProps={{
          content: {
            sx: {
              top: 64,
              bgcolor: 'primary.500',
              color: 'white',
              boxShadow: 'md',
            },
          },
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
        }}
      >
        <List sx={{ pt: 0, '--List-padding': '0px' }}>
          {navigation.map((item) => (
            <ListItem key={item.name}>
              <ListItemButton
                component={Link}
                href={item.href}
                sx={{
                  textAlign: 'center',
                  py: 2,
                  bgcolor: isActive(item.href) ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                  fontWeight: isActive(item.href) ? 'lg' : 'md',
                  color: 'white',
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
                      color: 'white',
                      fontWeight: isActive(item.href) ? 'lg' : 'md',
                    }}
                  >
                    {item.name}
                  </Typography>
                </ListItemContent>
                <Box
                  component="span"
                  sx={{
                    position: 'absolute',
                    width: 1,
                    height: 1,
                    overflow: 'hidden',
                    clip: 'rect(0 0 0 0)',
                  }}
                >
                  {item.enName}
                </Box>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}

export default Navigation;
