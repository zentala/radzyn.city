/**
 * Design Token Utilities
 * Helper functions for accessing design system values
 */

import { joyTheme } from '@/theme/joy-theme';

// Color Token Functions
export const colors = {
  // Primary Colors
  primary: {
    50: '#E8EDF5',
    100: '#D4DEEB',
    200: '#B5C6DD',
    300: '#8FA9CB',
    400: '#6B8CB9',
    500: '#25456B',
    600: '#1E3856',
    700: '#172B42',
    800: '#101F2E',
    900: '#0A141F',
  },
  // Secondary Colors
  secondary: {
    50: '#FDF6E8',
    100: '#FCE9C5',
    200: '#F9D69B',
    300: '#F6C271',
    400: '#F3AE47',
    500: '#BE9C55',
    600: '#9F7F3A',
    700: '#80622F',
    800: '#614624',
    900: '#422A19',
  },
  // Neutral Colors
  neutral: {
    0: '#FFFFFF',
    50: '#F9F7F2',
    100: '#F2EFE8',
    200: '#E5E0D5',
    300: '#D5CFC2',
    400: '#B8B2A3',
    500: '#9A9385',
    600: '#7D7668',
    700: '#635C4F',
    800: '#4A4539',
    900: '#2A2A2A',
    1000: '#000000',
  },
  // Semantic Colors
  success: {
    50: '#E8F5E9',
    100: '#C8E6C9',
    200: '#A5D6A7',
    300: '#81C784',
    400: '#66BB6A',
    500: '#556B4F',
    600: '#43A047',
    700: '#388E3C',
    800: '#2E7D32',
    900: '#1B5E20',
  },
  warning: {
    50: '#FFF8E1',
    100: '#FFECB3',
    200: '#FFE082',
    300: '#FFD54F',
    400: '#FFCA28',
    500: '#B2734F',
    600: '#FFA000',
    700: '#FF8F00',
    800: '#FF6F00',
    900: '#E65100',
  },
  error: {
    50: '#FFEBEE',
    100: '#FFCDD2',
    200: '#EF9A9A',
    300: '#E57373',
    400: '#EF5350',
    500: '#8B3A41',
    600: '#E53935',
    700: '#D32F2F',
    800: '#C62828',
    900: '#B71C1C',
  },
  info: {
    50: '#E3F2FD',
    100: '#BBDEFB',
    200: '#90CAF9',
    300: '#64B5F6',
    400: '#42A5F5',
    500: '#5D7895',
    600: '#1E88E5',
    700: '#1976D2',
    800: '#1565C0',
    900: '#0D47A1',
  },
};

// Spacing Token Functions
export const spacing = {
  0: 0,
  0.5: '2px',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
  14: '56px',
  16: '64px',
  20: '80px',
  24: '96px',
  28: '112px',
  32: '128px',
  36: '144px',
  40: '160px',
  44: '176px',
  48: '192px',
  52: '208px',
  56: '224px',
  60: '240px',
  64: '256px',
  72: '288px',
  80: '320px',
  96: '384px',
};

// Typography Token Functions
export const typography = {
  fontFamily: {
    display: '"Playfair Display", "Georgia", serif',
    body: '"Source Sans Pro", "Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    mono: '"Fira Code", "JetBrains Mono", monospace',
  },
  fontSize: {
    xs: '0.75rem', // 12px
    sm: '0.875rem', // 14px
    md: '1rem', // 16px
    lg: '1.125rem', // 18px
    xl: '1.25rem', // 20px
    '2xl': '1.5rem', // 24px
    '3xl': '1.75rem', // 28px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem', // 48px
    '6xl': '4rem', // 64px
  },
  fontWeight: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
};

// Border Radius Token Functions
export const borderRadius = {
  none: '0',
  xs: '2px',
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  '2xl': '24px',
  full: '9999px',
};

// Shadow Token Functions
export const shadows = {
  none: 'none',
  xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
};

// Z-Index Token Functions
export const zIndex = {
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
};

// Breakpoint Token Functions
export const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  '2xl': 1400,
};

// Transition Token Functions
export const transitions = {
  duration: {
    fastest: 150,
    fast: 200,
    normal: 300,
    slow: 500,
    slowest: 1000,
  },
  easing: {
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
  },
};

// Helper Functions

/**
 * Get a color value by name and shade
 */
export const getColor = (colorName: keyof typeof colors, shade: number | string = 500): string => {
  const color = colors[colorName];
  if (color && typeof color === 'object' && shade in color) {
    return color[shade as keyof typeof color] as string;
  }
  return colors.neutral[500]; // Fallback
};

/**
 * Get a spacing value
 */
export const getSpacing = (value: keyof typeof spacing): string | number => {
  return spacing[value];
};

/**
 * Get a font size value
 */
export const getFontSize = (size: keyof typeof typography.fontSize): string => {
  return typography.fontSize[size];
};

/**
 * Get a border radius value
 */
export const getBorderRadius = (size: keyof typeof borderRadius): string => {
  return borderRadius[size];
};

/**
 * Get a shadow value
 */
export const getShadow = (size: keyof typeof shadows): string => {
  return shadows[size];
};

/**
 * Get a z-index value
 */
export const getZIndex = (level: keyof typeof zIndex): number => {
  return zIndex[level];
};

/**
 * Get a breakpoint value
 */
export const getBreakpoint = (bp: keyof typeof breakpoints): number => {
  return breakpoints[bp];
};

/**
 * Create a transparent color
 */
export const createTransparentColor = (hexColor: string, opacity: number): string => {
  let r = 0,
    g = 0,
    b = 0;
  if (hexColor.length === 4) {
    r = parseInt(hexColor[1] + hexColor[1], 16);
    g = parseInt(hexColor[2] + hexColor[2], 16);
    b = parseInt(hexColor[3] + hexColor[3], 16);
  } else if (hexColor.length === 7) {
    r = parseInt(hexColor.substring(1, 3), 16);
    g = parseInt(hexColor.substring(3, 5), 16);
    b = parseInt(hexColor.substring(5, 7), 16);
  }
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

/**
 * Get category color for map markers and other UI elements
 */
export const getCategoryColor = (category: string): string => {
  const colorMap: Record<string, string> = {
    'Zabytki': colors.secondary[500],
    'Kultura': colors.info[500],
    'Sport': colors.success[500],
    'Gastronomia': colors.warning[500],
    'Rekreacja': colors.success[500],
    'Instytucje': colors.primary[500],
    'Miejsca publiczne': colors.info[500],
  };
  return colorMap[category] || colors.primary[500];
};

/**
 * Get text color based on background color (for contrast)
 */
export const getContrastTextColor = (backgroundColor: string): string => {
  // Simple luminance calculation
  const hex = backgroundColor.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? colors.neutral[900] : colors.neutral[0];
};

export default {
  colors,
  spacing,
  typography,
  borderRadius,
  shadows,
  zIndex,
  breakpoints,
  transitions,
  getColor,
  getSpacing,
  getFontSize,
  getBorderRadius,
  getShadow,
  getZIndex,
  getBreakpoint,
  createTransparentColor,
  getCategoryColor,
  getContrastTextColor,
};
