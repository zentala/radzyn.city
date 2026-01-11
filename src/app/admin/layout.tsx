'use client';

import { useState } from 'react';
import {
  Box,
  Drawer,
  Sheet,
  Stack,
  Typography,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemContent,
  IconButton
} from '@mui/joy';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import ArticleIcon from '@mui/icons-material/Article';
import LanguageIcon from '@mui/icons-material/Language';
import CategoryIcon from '@mui/icons-material/Category';
import TagIcon from '@mui/icons-material/Tag';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const drawerWidth = 240;

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const isActive = (path: string) => {
    return pathname === path;
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, href: '/admin' },
    { text: 'News', icon: <ArticleIcon />, href: '/admin/news' },
    { text: 'Categories', icon: <CategoryIcon />, href: '/admin/categories' },
    { text: 'Tags', icon: <TagIcon />, href: '/admin/tags' },
    { text: 'Scraper', icon: <LanguageIcon />, href: '/admin/scraper' },
    { text: 'Settings', icon: <SettingsIcon />, href: '/admin/settings' },
  ];

  const drawer = (
    <Box>
      <Stack sx={{ p: 2 }}>
        <Typography level="h4" component="div">
          Admin Panel
        </Typography>
      </Stack>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text}>
            <ListItemButton
              component={Link}
              href={item.href}
              selected={isActive(item.href)}
            >
              <Box sx={{ mr: 2, display: 'flex' }}>{item.icon}</Box>
              <ListItemContent>{item.text}</ListItemContent>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem>
          <ListItemButton component={Link} href="/">
            <ListItemContent>Back to Site</ListItemContent>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sheet
        variant="solid"
        color="primary"
        sx={{
          position: 'fixed',
          top: 0,
          left: { sm: drawerWidth },
          right: 0,
          zIndex: 1000,
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          sx={{ p: 2 }}
        >
          <IconButton
            color="neutral"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' }, color: 'white' }}
          >
            <MenuIcon />
          </IconButton>
          <Typography level="h4" component="div" sx={{ color: 'white' }}>
            Radzyń City Portal Admin
          </Typography>
        </Stack>
      </Sheet>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          open={mobileOpen}
          onClose={handleDrawerToggle}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-content': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="plain"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-content': {
              boxSizing: 'border-box',
              width: drawerWidth,
              position: 'fixed',
              height: '100vh',
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 0,
          pt: '64px',
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          backgroundColor: 'background.level1',
          minHeight: '100vh',
        }}
      >
        {children}
      </Box>
    </Box>
  );
}