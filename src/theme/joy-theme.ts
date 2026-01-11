import { extendTheme } from '@mui/joy/styles';

/**
 * Joy UI Theme Configuration for Radzyn.city
 * Baroque-inspired design system with modern aesthetics
 */

// Color Palette - Baroque-Inspired
const colorSchemes = {
  light: {
    palette: {
      // Primary Colors - Deep Navy Blue
      primary: {
        50: '#E8EDF5',
        100: '#D4DEEB',
        200: '#B5C6DD',
        300: '#8FA9CB',
        400: '#6B8CB9',
        500: '#25456B', // Main primary
        600: '#1E3856',
        700: '#172B42',
        800: '#101F2E',
        900: '#0A141F',
      },
      // Secondary Colors - Gold
      secondary: {
        50: '#FDF6E8',
        100: '#FCE9C5',
        200: '#F9D69B',
        300: '#F6C271',
        400: '#F3AE47',
        500: '#BE9C55', // Main secondary
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
        500: '#556B4F', // Main success - Sage green
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
        500: '#B2734F', // Main warning - Terracotta
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
        500: '#8B3A41', // Main error - Burgundy
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
        500: '#5D7895', // Main info - Steel blue
        600: '#1E88E5',
        700: '#1976D2',
        800: '#1565C0',
        900: '#0D47A1',
      },
      // Background Colors
      background: {
        body: '#F9F7F2',
        surface: '#FFFFFF',
        level1: '#F2EFE8',
        level2: '#E5E0D5',
        level3: '#D5CFC2',
      },
      // Text Colors
      text: {
        primary: '#2A2A2A',
        secondary: '#5A5A5A',
        tertiary: '#7D7668',
        icon: '#4A4539',
      },
    },
  },
};

// Typography Scale
const typography = {
  fontFamily: {
    display: '"Playfair Display", "Georgia", serif',
    body: '"Source Sans Pro", "Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    mono: '"Fira Code", "JetBrains Mono", monospace',
  },
  // Heading Levels
  h1: {
    fontSize: '3rem',
    fontWeight: 600,
    lineHeight: 1.2,
    letterSpacing: '-0.01em',
  },
  h2: {
    fontSize: '2.25rem',
    fontWeight: 600,
    lineHeight: 1.3,
    letterSpacing: '-0.005em',
  },
  h3: {
    fontSize: '1.75rem',
    fontWeight: 600,
    lineHeight: 1.3,
  },
  h4: {
    fontSize: '1.5rem',
    fontWeight: 600,
    lineHeight: 1.4,
  },
  h5: {
    fontSize: '1.25rem',
    fontWeight: 600,
    lineHeight: 1.4,
  },
  h6: {
    fontSize: '1rem',
    fontWeight: 600,
    lineHeight: 1.4,
  },
  // Body Text
  'body-lg': {
    fontSize: '1.125rem',
    fontWeight: 400,
    lineHeight: 1.6,
  },
  'body-md': {
    fontSize: '1rem',
    fontWeight: 400,
    lineHeight: 1.6,
  },
  'body-sm': {
    fontSize: '0.875rem',
    fontWeight: 400,
    lineHeight: 1.6,
  },
  'body-xs': {
    fontSize: '0.75rem',
    fontWeight: 400,
    lineHeight: 1.5,
  },
  // Title Text
  'title-lg': {
    fontSize: '1.125rem',
    fontWeight: 500,
    lineHeight: 1.5,
  },
  'title-md': {
    fontSize: '1rem',
    fontWeight: 500,
    lineHeight: 1.5,
  },
  'title-sm': {
    fontSize: '0.875rem',
    fontWeight: 500,
    lineHeight: 1.5,
  },
  // Display Text
  display: {
    fontSize: '4rem',
    fontWeight: 700,
    lineHeight: 1.1,
    letterSpacing: '-0.02em',
  },
};

// Shadow System
const shadows = {
  xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  none: 'none',
};

// Border Radius
const borderRadius = {
  xs: '2px',
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  '2xl': '24px',
  full: '9999px',
};

// Spacing Scale (8pt grid)
const spacing = {
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

// Component Overrides
const components = {
  JoyCssVarsProvider: {
    defaultProps: {
      enableCssLayer: true,
    },
  },
  JoyButton: {
    styleOverrides: {
      root: {
        borderRadius: '6px',
        fontWeight: 500,
        textTransform: 'none',
        letterSpacing: '0.02em',
        transition: 'all 0.2s ease',
      },
    },
  },
  JoyCard: {
    styleOverrides: {
      root: {
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(42, 42, 42, 0.05)',
        overflow: 'hidden',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          boxShadow: '0 6px 16px rgba(42, 42, 42, 0.08)',
          transform: 'translateY(-3px)',
        },
      },
    },
  },
  JoyInput: {
    styleOverrides: {
      root: {
        borderRadius: '6px',
        transition: 'all 0.2s ease',
      },
    },
  },
  JoyChip: {
    styleOverrides: {
      root: {
        borderRadius: '6px',
        fontWeight: 500,
      },
    },
  },
  JoyTypography: {
    styleOverrides: {
      root: {
        h1: {
          fontFamily: 'var(--joy-fontFamily-display)',
        },
        h2: {
          fontFamily: 'var(--joy-fontFamily-display)',
        },
        h3: {
          fontFamily: 'var(--joy-fontFamily-display)',
        },
        h4: {
          fontFamily: 'var(--joy-fontFamily-display)',
        },
        h5: {
          fontFamily: 'var(--joy-fontFamily-display)',
        },
        h6: {
          fontFamily: 'var(--joy-fontFamily-display)',
        },
      },
    },
  },
  JoySheet: {
    styleOverrides: {
      root: {
        borderRadius: '8px',
      },
    },
  },
};

// Create and export the theme
export const joyTheme = extendTheme({
  cssVarPrefix: 'joy',
  colorSchemes,
  typography,
  shadows,
  borderRadius,
  spacing,
  components,
  defaultColorScheme: 'light',
});

// Helper function to get category colors
export const getCategoryColor = (
  category: string,
  variant: 'main' | 'light' | 'dark' = 'main'
): string => {
  const colorMap: Record<string, 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'> = {
    'Zabytki': 'secondary',
    'Kultura': 'info',
    'Sport': 'success',
    'Gastronomia': 'warning',
    'Rekreacja': 'success',
    'Instytucje': 'primary',
    'Miejsca publiczne': 'info',
    'default': 'primary',
  };

  const colorKey = colorMap[category] || colorMap.default;
  const palette = colorSchemes.light.palette[colorKey];

  if (palette && typeof palette === 'object' && variant in palette) {
    return palette[variant as keyof typeof palette] as string;
  }

  return '#25456B'; // Fallback to primary color
};

// Helper function to create transparent color variations
export const createTransparentColor = (color: string, opacity: number): string => {
  // Parse hex color to RGB
  let r = 0,
    g = 0,
    b = 0;
  if (color.length === 4) {
    // For hex shorthand like #FFF
    r = parseInt(color[1] + color[1], 16);
    g = parseInt(color[2] + color[2], 16);
    b = parseInt(color[3] + color[3], 16);
  } else if (color.length === 7) {
    // For full hex like #FFFFFF
    r = parseInt(color.substring(1, 3), 16);
    g = parseInt(color.substring(3, 5), 16);
    b = parseInt(color.substring(5, 7), 16);
  }

  // Return RGBA
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export default joyTheme;
