import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import './globals.css';
import { Box, Container, CssBaseline, Link, ThemeProvider, Typography, createTheme } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';

export const metadata: Metadata = {
  title: {
    default: 'Radzyń Podlaski - Oficjalny Portal Miasta i Powiatu',
    template: '%s | Radzyń Podlaski'
  },
  description: 'Oficjalny portal miasta Radzyń Podlaski i powiatu radzyńskiego. Aktualności, wydarzenia, informacje dla mieszkańców i turystów.',
  keywords: ['Radzyń Podlaski', 'powiat radzyński', 'lubelskie', 'miasto', 'atrakcje turystyczne', 'pałac Potockich'],
  authors: [{ name: 'Urząd Miasta Radzyń Podlaski' }],
  creator: 'Urząd Miasta Radzyń Podlaski',
  publisher: 'Urząd Miasta Radzyń Podlaski',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://radzyn.city'),
  openGraph: {
    title: 'Radzyń Podlaski - Oficjalny Portal Miasta i Powiatu',
    description: 'Oficjalny portal miasta Radzyń Podlaski i powiatu radzyńskiego. Aktualności, wydarzenia, informacje dla mieszkańców i turystów.',
    url: 'https://radzyn.city',
    siteName: 'Radzyń Podlaski',
    locale: 'pl_PL',
    type: 'website',
  },
};

// Create a theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#9c27b0',
      light: '#ba68c8',
      dark: '#7b1fa2',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        },
      },
    },
  },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <head>
        <title>Radzyń Podlaski - Oficjalny Portal Miasta i Powiatu</title>
      </head>
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Navigation />
            <Box component="main" sx={{ paddingTop: '64px' }}>{children}</Box>
            <Box 
              component="footer"
              sx={{ 
                backgroundColor: '#333',
                color: 'white',
                padding: '1.5rem 0',
                marginTop: '3rem'
              }}
            >
              <Container maxWidth="lg">
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                  }}
                >
                  <Typography component="p">
                    © {new Date().getFullYear()} Radzyń Podlaski. Wszelkie prawa zastrzeżone.
                  </Typography>
                  <Box 
                    sx={{ 
                      mt: { xs: 2, md: 0 },
                      display: 'flex',
                      gap: 2
                    }}
                  >
                    <Link href="#" sx={{ color: 'white', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                      Polityka prywatności
                    </Link>
                    <Link href="#" sx={{ color: 'white', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                      Mapa strony
                    </Link>
                  </Box>
                </Box>
              </Container>
            </Box>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}