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
        solidBg: '#25456B',
        solidHoverBg: '#1E3856',
        solidActiveBg: '#172B42',
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
        solidBg: '#BE9C55',
        solidHoverBg: '#9F7F3A',
        solidActiveBg: '#80622F',
        solidColor: '#FFFFFF',
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
        solidBg: '#556B4F',
        solidHoverBg: '#43A047',
        solidActiveBg: '#388E3C',
        solidColor: '#FFFFFF',
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
        solidBg: '#B2734F',
        solidHoverBg: '#9F5F3A',
        solidActiveBg: '#8B4A2F',
        solidColor: '#FFFFFF',
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
        solidBg: '#8B3A41',
        solidHoverBg: '#7A2F35',
        solidActiveBg: '#6A252A',
        solidColor: '#FFFFFF',
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
        solidBg: '#5D7895',
        solidHoverBg: '#4A6277',
        solidActiveBg: '#3A4E5E',
        solidColor: '#FFFFFF',
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
  dark: {
    palette: {
      // Primary Colors - Lighter Navy for dark mode
      primary: {
        50: '#0A141F',
        100: '#101F2E',
        200: '#172B42',
        300: '#1E3856',
        400: '#25456B',
        500: '#6B8CB9', // Main primary for dark mode
        solidBg: '#6B8CB9',
        solidHoverBg: '#8FA9CB',
        solidActiveBg: '#B5C6DD',
        solidColor: '#FFFFFF',
        600: '#8FA9CB',
        700: '#B5C6DD',
        800: '#D4DEEB',
        900: '#E8EDF5',
      },
      // Secondary Colors - Brighter Gold for dark mode
      secondary: {
        50: '#422A19',
        100: '#614624',
        200: '#80622F',
        300: '#9F7F3A',
        400: '#BE9C55',
        500: '#F3AE47', // Main secondary for dark mode
        solidBg: '#F3AE47',
        solidHoverBg: '#F6C271',
        solidActiveBg: '#F9D69B',
        solidColor: '#2A2A2A', // Dark text on bright gold
        600: '#F6C271',
        700: '#F9D69B',
        800: '#FCE9C5',
        900: '#FDF6E8',
      },
      // Neutral Colors
      neutral: {
        0: '#000000',
        50: '#1A1A1A',
        100: '#2A2A2A',
        200: '#3A3A3A',
        300: '#4A4539',
        400: '#635C4F',
        500: '#7D7668',
        600: '#9A9385',
        700: '#B8B2A3',
        800: '#D5CFC2',
        900: '#E5E0D5',
        1000: '#FFFFFF',
      },
      // Semantic Colors adjusted for dark mode
      success: {
        50: '#1B5E20',
        100: '#2E7D32',
        200: '#388E3C',
        300: '#43A047',
        400: '#556B4F',
        500: '#81C784', // Main success
        solidBg: '#81C784',
        solidHoverBg: '#A5D6A7',
        solidActiveBg: '#C8E6C9',
        solidColor: '#1B5E20', // Dark green text on light green bg
        600: '#A5D6A7',
        700: '#C8E6C9',
        800: '#E8F5E9',
        900: '#F1F8E9',
      },
      warning: {
        50: '#E65100',
        100: '#FF6F00',
        200: '#FF8F00',
        300: '#FFA000',
        400: '#B2734F',
        500: '#FFD54F', // Main warning
        solidBg: '#FFD54F',
        solidHoverBg: '#FFE082',
        solidActiveBg: '#FFECB3',
        solidColor: '#2A2A2A', // Dark text na jasnym tle!
        600: '#FFE082',
        700: '#FFECB3',
        800: '#FFF8E1',
        900: '#FFFDE7',
      },
      error: {
        50: '#B71C1C',
        100: '#C62828',
        200: '#D32F2F',
        300: '#E53935',
        400: '#8B3A41',
        500: '#EF5350', // Main error
        solidBg: '#EF5350',
        solidHoverBg: '#E57373',
        solidActiveBg: '#EF9A9A',
        solidColor: '#FFFFFF',
        600: '#E57373',
        700: '#EF9A9A',
        800: '#FFCDD2',
        900: '#FFEBEE',
      },
      info: {
        50: '#0D47A1',
        100: '#1565C0',
        200: '#1976D2',
        300: '#1E88E5',
        400: '#5D7895',
        500: '#64B5F6', // Main info
        solidBg: '#64B5F6',
        solidHoverBg: '#90CAF9',
        solidActiveBg: '#BBDEFB',
        solidColor: '#0D47A1', // Dark blue text on light blue bg
        600: '#90CAF9',
        700: '#BBDEFB',
        800: '#E3F2FD',
        900: '#E8F4FD',
      },
      // Background Colors
      background: {
        body: '#0A0A0A',
        surface: '#1A1A1A',
        level1: '#2A2A2A',
        level2: '#3A3A3A',
        level3: '#4A4539',
      },
      // Text Colors
      text: {
        primary: '#E5E0D5',
        secondary: '#B8B2A3',
        tertiary: '#9A9385',
        icon: '#D5CFC2',
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

// Spacing Scale (8pt grid) - Function-based for Joy UI compatibility
const spacing = (factor: number): string => {
  if (factor === 0) return '0px';
  return `${factor * 8}px`;
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
