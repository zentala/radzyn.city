'use client';

import React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import { joyTheme } from '@/theme/joy-theme';

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return (
    <CssVarsProvider theme={joyTheme} defaultMode="light" modeStorageKey="joy-mode" disableTransitionOnChange={false}>
      {children}
    </CssVarsProvider>
  );
}
