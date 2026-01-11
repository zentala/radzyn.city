'use client';

import React from 'react';
import {
  Sheet,
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
  Divider,
} from '@mui/joy';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';

export interface DrawerItem {
  label: string;
  icon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  divider?: boolean;
}

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  items: DrawerItem[];
  position?: 'left' | 'right';
  variant?: 'plain' | 'outlined' | 'soft' | 'solid';
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'neutral';
  width?: string | number;
  sx?: object;
}

/**
 * Drawer - Joy UI-based drawer/sidebar component
 */
export function Drawer({
  open,
  onClose,
  title,
  items,
  position = 'left',
  variant = 'outlined',
  color = 'neutral',
  width = 280,
  sx,
}: DrawerProps) {
  return (
    <Sheet
      variant={variant}
      color={color}
      sx={{
        position: 'fixed',
        top: 0,
        bottom: 0,
        [position]: 0,
        width: typeof width === 'number' ? `${width}px` : width,
        zIndex: 1200,
        transform: open ? 'translateX(0)' : position === 'left' ? 'translateX(-100%)' : 'translateX(100%)',
        transition: 'transform 300ms ease-in-out',
        ...sx,
      }}
    >
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 2,
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          {title && (
            <Typography level="title-lg" sx={{ fontWeight: 'bold' }}>
              {title}
            </Typography>
          )}
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Content */}
        <Box sx={{ flex: 1, overflow: 'auto' }}>
          <List>
            {items.map((item, index) => (
              <React.Fragment key={index}>
                {item.divider && <Divider />}
                <ListItem>
                  <ListItemButton
                    component={item.href ? 'a' : 'div'}
                    href={item.href}
                    onClick={item.onClick}
                    disabled={item.disabled}
                    sx={{
                      textDecoration: 'none',
                      color: 'inherit',
                    }}
                  >
                    {item.icon && (
                      <Box sx={{ mr: 1.5, display: 'flex', alignItems: 'center' }}>
                        {item.icon}
                      </Box>
                    )}
                    <ListItemContent>
                      <Typography level="body-md">{item.label}</Typography>
                    </ListItemContent>
                  </ListItemButton>
                </ListItem>
              </React.Fragment>
            ))}
          </List>
        </Box>
      </Box>
    </Sheet>
  );
}

/**
 * Sidebar - Pre-configured drawer for sidebar navigation
 */
export interface SidebarProps extends Omit<DrawerProps, 'position'> {
  logo?: React.ReactNode;
  logoHref?: string;
}

export function Sidebar({ logo, logoHref = '/', ...props }: SidebarProps) {
  return (
    <Drawer position="left" {...props}>
      {/* Logo */}
      {logo && (
        <Box
          component={logoHref ? 'a' : 'div'}
          href={logoHref}
          sx={{
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textDecoration: 'none',
          }}
        >
          {logo}
        </Box>
      )}
    </Drawer>
  );
}

export default Drawer;
