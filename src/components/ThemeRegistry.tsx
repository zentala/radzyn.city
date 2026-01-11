'use client';

import React from 'react';
import { CssVarsProvider, CssBaseline } from '@mui/joy/styles';
import { joyTheme } from '@/theme/joy-theme';

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return (
    <CssVarsProvider theme={joyTheme} defaultMode="system" enableCssLayer>
      <CssBaseline />
      {children}
    </CssVarsProvider>
  );
}
