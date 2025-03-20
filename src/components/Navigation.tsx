"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  AppBar, Toolbar, Typography, Button, IconButton, Box, Drawer, 
  List, ListItem, ListItemButton, ListItemText, useScrollTrigger,
  Container
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const currentPath = usePathname();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 10,
  });

  const navigation = [
    { name: 'Strona główna', href: '/', enName: 'Home' },
    { name: 'O mieście', href: '/city', enName: 'City' },
    { name: 'Powiat', href: '/county', enName: 'County' },
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
      <AppBar 
        position="fixed" 
        sx={{ 
          transition: 'all 300ms ease-in-out',
          backgroundColor: trigger ? 'primary.main' : 'rgba(25, 118, 210, 0.9)',
          boxShadow: trigger ? 2 : 0,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: 'space-between', py: 0.5 }}>
            <Typography 
              variant="h6" 
              component={Link} 
              href="/"
              sx={{ 
                textDecoration: 'none', 
                color: 'white',
                fontWeight: 'bold',
                '&:hover': {
                  opacity: 0.9
                }
              }}
            >
              Radzyń Podlaski
            </Typography>

            {/* Desktop navigation */}
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              {navigation.map((item) => (
                <Button
                  key={item.name}
                  component={Link}
                  href={item.href}
                  sx={{
                    color: 'white',
                    mx: 1, 
                    py: 1,
                    borderBottom: isActive(item.href) ? '2px solid white' : 'none',
                    borderRadius: 0,
                    fontWeight: isActive(item.href) ? 'bold' : 'regular',
                    '&:hover': {
                      borderBottom: '2px solid rgba(255, 255, 255, 0.5)',
                      backgroundColor: 'transparent'
                    }
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
                      clip: 'rect(0 0 0 0)' 
                    }}
                  >
                    {item.enName}
                  </Box>
                </Button>
              ))}
            </Box>

            {/* Mobile menu button */}
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="Otwórz menu"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              sx={{ display: { xs: 'flex', md: 'none' } }}
            >
              {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile navigation drawer */}
      <Drawer
        id="mobile-menu"
        anchor="top"
        open={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { 
            top: '64px', 
            backgroundColor: 'primary.main',
            color: 'white',
            transition: 'transform 300ms ease-in-out'
          },
        }}
      >
        <List sx={{ pt: 0 }}>
          {navigation.map((item) => (
            <ListItem key={item.name} disablePadding>
              <ListItemButton
                component={Link}
                href={item.href}
                sx={{
                  textAlign: 'center',
                  py: 1.5,
                  backgroundColor: isActive(item.href) ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                  fontWeight: isActive(item.href) ? 'bold' : 'normal',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                  }
                }}
                aria-label={item.enName}
              >
                <ListItemText 
                  primary={item.name} 
                  primaryTypographyProps={{ 
                    fontWeight: isActive(item.href) ? 'bold' : 'normal',
                  }}
                />
                <Box 
                  component="span"
                  sx={{ 
                    position: 'absolute', 
                    width: 1, 
                    height: 1, 
                    overflow: 'hidden', 
                    clip: 'rect(0 0 0 0)' 
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