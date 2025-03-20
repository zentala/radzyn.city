import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import './globals.css';
import ThemeRegistry from '@/components/ThemeRegistry';
import { Box, Container, Stack, Link as MuiLink } from '@mui/material';

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
        <ThemeRegistry>
          <Navigation />
          <Box component="main" sx={{ pt: 8 }}>
            {children}
          </Box>
          <Box 
            component="footer" 
            sx={{ 
              bgcolor: 'grey.900', 
              color: 'common.white', 
              py: 3, 
              mt: 6 
            }}
          >
            <Container maxWidth="lg">
              <Stack 
                direction="column"
                justifyContent="space-between"
                alignItems="center"
                width="100%"
              >
                <Box sx={{ typography: 'body2' }}>
                  © {new Date().getFullYear()} Radzyń Podlaski. Wszelkie prawa zastrzeżone.
                </Box>
                <Stack 
                  direction="row" 
                  spacing={2}
                  sx={{ mt: 2 }}
                >
                  <MuiLink href="#" color="inherit" underline="hover">
                    Polityka prywatności
                  </MuiLink>
                  <MuiLink href="#" color="inherit" underline="hover">
                    Mapa strony
                  </MuiLink>
                </Stack>
              </Stack>
            </Container>
          </Box>
        </ThemeRegistry>
      </body>
    </html>
  );
}