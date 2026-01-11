'use client';

import React from 'react';
import { useColorScheme } from '@mui/joy/styles';
import { IconButton, Tooltip } from '@mui/joy';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

/**
 * ThemeSwitcher - Toggle between light and dark mode
 */
export function ThemeSwitcher() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);

  // Prevent hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <IconButton
        variant="plain"
        color="neutral"
        disabled
        sx={{ color: 'text.primary' }}
      >
        <LightModeIcon />
      </IconButton>
    );
  }

  const toggleMode = () => {
    setMode(mode === 'light' ? 'dark' : 'light');
  };

  return (
    <Tooltip title={mode === 'light' ? 'Tryb ciemny' : 'Tryb jasny'} variant="solid">
      <IconButton
        variant="plain"
        color="neutral"
        onClick={toggleMode}
        aria-label={mode === 'light' ? 'Włącz tryb ciemny' : 'Włącz tryb jasny'}
        sx={(theme) => ({
          color: 'text.primary',
          '&:hover': {
            bgcolor: theme.palette.mode === 'dark'
              ? 'rgba(255, 255, 255, 0.06)'
              : 'rgba(0, 0, 0, 0.04)',
          },
        })}
      >
        {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
      </IconButton>
    </Tooltip>
  );
}

export default ThemeSwitcher;
