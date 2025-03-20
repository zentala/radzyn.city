import { PaletteOptions, createTheme, alpha } from '@mui/material/styles';
import { TypographyOptions } from '@mui/material/styles/createTypography';

// Modern-Classical color palette 
// Blending timeless elegance with contemporary subtlety
const palette: PaletteOptions = {
  primary: {
    // Deep navy blue - classic yet modern
    main: '#25456B',
    light: '#3A5F89',
    dark: '#18304F',
    contrastText: '#FFFFFF',
  },
  secondary: {
    // Subtle gold - refined elegance with modern appeal
    main: '#BE9C55',
    light: '#D3B577',
    dark: '#9F7F3A',
    contrastText: '#000000',
  },
  error: {
    // Muted burgundy - classic tone with modern restraint
    main: '#8B3A41',
    light: '#A55961',
    dark: '#6D2A30',
    contrastText: '#FFFFFF',
  },
  warning: {
    // Warm terracotta - blend of historical and contemporary
    main: '#B2734F',
    light: '#C79070',
    dark: '#8E5A3C',
    contrastText: '#FFFFFF',
  },
  info: {
    // Steel blue - modern interpretation of classical color
    main: '#5D7895',
    light: '#7B93AC',
    dark: '#465C74',
    contrastText: '#FFFFFF',
  },
  success: {
    // Sage green - timeless yet contemporary 
    main: '#556B4F',
    light: '#718A69',
    dark: '#405039',
    contrastText: '#FFFFFF',
  },
  background: {
    // Soft alabaster - classic material with modern lightness
    default: '#F9F7F2',
    paper: '#FFFFFF',
  },
  text: {
    // Deep charcoal - modern take on classical text color
    primary: '#2A2A2A',
    secondary: '#5A5A5A',
    disabled: '#AAAAAA',
  },
  divider: '#E5E0D5', // Subtle cream divider
  grey: {
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
  },
};

// Typography blending classical elegance with modern readability
const typography: TypographyOptions = {
  fontFamily: '"Libre Baskerville", "Playfair Display", "Georgia", serif',
  h1: {
    fontFamily: '"Playfair Display", serif',
    fontSize: '2.75rem',
    fontWeight: 600,
    letterSpacing: '-0.01em',
    lineHeight: 1.2,
  },
  h2: {
    fontFamily: '"Playfair Display", serif',
    fontSize: '2.25rem',
    fontWeight: 600,
    letterSpacing: '-0.005em',
    lineHeight: 1.3,
  },
  h3: {
    fontFamily: '"Playfair Display", serif',
    fontSize: '1.75rem',
    fontWeight: 600,
    lineHeight: 1.3,
  },
  h4: {
    fontFamily: '"Playfair Display", serif',
    fontSize: '1.5rem',
    fontWeight: 600,
    lineHeight: 1.4,
  },
  h5: {
    fontFamily: '"Playfair Display", serif',
    fontSize: '1.25rem',
    fontWeight: 600,
    lineHeight: 1.4,
  },
  h6: {
    fontFamily: '"Playfair Display", serif',
    fontSize: '1.1rem',
    fontWeight: 600,
    lineHeight: 1.4,
  },
  subtitle1: {
    fontFamily: '"Libre Baskerville", serif',
    fontSize: '1.125rem',
    fontWeight: 400,
    lineHeight: 1.5,
  },
  subtitle2: {
    fontFamily: '"Libre Baskerville", serif',
    fontSize: '0.875rem',
    fontWeight: 400,
    lineHeight: 1.5,
  },
  body1: {
    fontFamily: '"Source Sans Pro", "Montserrat", sans-serif',
    fontSize: '1rem',
    lineHeight: 1.6,
    letterSpacing: '0.01em',
  },
  body2: {
    fontFamily: '"Source Sans Pro", "Montserrat", sans-serif',
    fontSize: '0.875rem',
    lineHeight: 1.6,
    letterSpacing: '0.01em',
  },
  button: {
    fontFamily: '"Montserrat", sans-serif',
    fontWeight: 500,
    textTransform: 'none',
    letterSpacing: '0.03em',
  },
  caption: {
    fontFamily: '"Montserrat", sans-serif',
    fontSize: '0.75rem',
    letterSpacing: '0.02em',
  },
  overline: {
    fontFamily: '"Montserrat", sans-serif',
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    fontWeight: 500,
  },
};

// Component overrides blending classical and modern aesthetic
const components = {
  MuiCssBaseline: {
    styleOverrides: `
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Libre+Baskerville:wght@400;700&family=Source+Sans+Pro:wght@300;400;600&family=Montserrat:wght@300;400;500;600&display=swap');
      
      /* Subtle gradient background */
      body {
        background: linear-gradient(to bottom, #F9F7F2 0%, #FFFFFF 100%);
        background-attachment: fixed;
      }
    `,
  },
  MuiCard: {
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
        backgroundColor: 'rgba(255, 255, 255, 0.9)', // Subtle transparency for modern effect
        backdropFilter: 'blur(5px)', // Frosted glass effect (works in some browsers)
      },
    },
  },
  MuiCardHeader: {
    styleOverrides: {
      root: {
        padding: '20px 24px 12px',
      },
      title: {
        fontFamily: '"Playfair Display", serif',
      },
      subheader: {
        color: alpha(palette.text?.secondary as string, 0.9), // More readable subheader
      },
    },
  },
  MuiCardContent: {
    styleOverrides: {
      root: {
        padding: '12px 24px 20px',
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: '6px',
        padding: '8px 20px',
        transition: 'all 0.2s ease',
        fontWeight: 500,
      },
      contained: {
        boxShadow: 'none',
        '&:hover': {
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          transform: 'translateY(-1px)',
        },
      },
      outlined: {
        borderWidth: '1px',
        '&:hover': {
          borderWidth: '1px',
          backgroundColor: alpha(palette.primary?.main as string, 0.05),
        },
      },
      text: {
        position: 'relative',
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: '5px',
          left: '50%',
          width: '0%',
          height: '1px',
          backgroundColor: 'currentColor',
          transition: 'width 0.3s ease, left 0.3s ease',
        },
        '&:hover::after': {
          width: '80%',
          left: '10%',
        },
      },
    },
  },
  MuiAppBar: {
    styleOverrides: {
      root: {
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
        backgroundColor: alpha('#FFFFFF', 0.95), // Subtle transparency
        backdropFilter: 'blur(10px)', // Frosted glass effect
        color: palette.text?.primary,
      },
    },
  },
  MuiDivider: {
    styleOverrides: {
      root: {
        borderColor: palette.grey?.[200],
        opacity: 0.8,
      },
      middle: {
        borderStyle: 'dashed',
        borderColor: palette.grey?.[300],
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        backgroundImage: 'none', // Remove any default background patterns
        borderRadius: '8px',
        backgroundColor: alpha('#FFFFFF', 0.9), // Subtle transparency
      },
      elevation1: {
        boxShadow: '0 2px 8px rgba(42, 42, 42, 0.04)',
      },
      elevation2: {
        boxShadow: '0 3px 10px rgba(42, 42, 42, 0.06)',
      },
      elevation3: {
        boxShadow: '0 4px 14px rgba(42, 42, 42, 0.08)',
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: '6px',
        fontWeight: 500,
        '&.MuiChip-outlined': {
          borderWidth: '1px',
        },
      },
      label: {
        padding: '0 12px',
      },
    },
  },
  MuiTab: {
    styleOverrides: {
      root: {
        fontFamily: '"Montserrat", sans-serif',
        textTransform: 'none',
        fontWeight: 500,
        letterSpacing: '0.02em',
        transition: 'all 0.2s ease',
        borderBottom: '2px solid transparent',
        '&.Mui-selected': {
          borderBottomColor: palette.secondary?.main,
        },
      },
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: {
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: palette.grey?.[300],
            transition: 'border-color 0.2s ease',
          },
          '&:hover fieldset': {
            borderColor: palette.primary?.light,
          },
          '&.Mui-focused fieldset': {
            borderColor: palette.primary?.main,
            borderWidth: '1px',
          },
        },
        '& .MuiInputLabel-root': {
          color: palette.text?.secondary,
          '&.Mui-focused': {
            color: palette.primary?.main,
          },
        },
      },
    },
  },
  MuiTableCell: {
    styleOverrides: {
      head: {
        fontWeight: 600,
        color: palette.text?.primary,
        borderBottom: `2px solid ${palette.grey?.[300]}`,
      },
      root: {
        borderColor: palette.grey?.[200],
      },
    },
  },
  MuiLink: {
    styleOverrides: {
      root: {
        position: 'relative',
        textDecoration: 'none',
        color: palette.primary?.main,
        fontWeight: 500,
        transition: 'color 0.2s ease',
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: '-2px',
          left: 0,
          width: '100%',
          height: '1px',
          backgroundColor: 'currentColor',
          opacity: 0.5,
          transition: 'opacity 0.2s ease, transform 0.2s ease',
          transform: 'scaleX(0.5)',
          transformOrigin: 'left',
        },
        '&:hover': {
          color: palette.primary?.dark,
          '&::after': {
            opacity: 1,
            transform: 'scaleX(1)',
          },
        },
      },
    },
  },
};

// Use a ThemeOptions object that contains only static values
const themeOptions = {
  palette,
  typography,
  components,
  shape: {
    borderRadius: 8,
  },
  shadows: [
    'none',
    '0px 2px 8px rgba(42, 42, 42, 0.03)',  // More subtle shadows
    '0px 3px 10px rgba(42, 42, 42, 0.05)',
    '0px 4px 14px rgba(42, 42, 42, 0.07)',
    '0px 5px 18px rgba(42, 42, 42, 0.09)',
    '0px 6px 22px rgba(42, 42, 42, 0.10)',
    // ... other shadows remain default
  ],
  mixins: {
    toolbar: {
      minHeight: 70, // Slightly taller toolbar for elegant spacing
      '@media (min-width:0px) and (orientation: landscape)': {
        minHeight: 60,
      },
      '@media (min-width:600px)': {
        minHeight: 70,
      },
    },
  },
};

// Create the theme
export const theme = createTheme(themeOptions);

// Add a function to get category colors - useful for the map and other components
export const getCategoryColor = (category: string, variant: 'main' | 'light' | 'dark' = 'main'): string => {
  const colorMap: Record<string, keyof typeof palette> = {
    'Zabytki': 'secondary',
    'Kultura': 'info',
    'Sport': 'success',
    'Gastronomia': 'warning',
    'Rekreacja': 'success',
    'Instytucje': 'primary',
    'Miejsca publiczne': 'info',
    'default': 'primary'
  };
  
  const colorKey = colorMap[category] || colorMap.default;
  const colorObj = palette[colorKey];
  
  if (colorObj && typeof colorObj === 'object' && variant in colorObj) {
    return colorObj[variant] as string;
  }
  
  return '#25456B'; // Fallback to primary color
};

// Helper function to create transparent color variations
export const createTransparentColor = (color: string, opacity: number): string => {
  // Parse hex color to RGB
  let r = 0, g = 0, b = 0;
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