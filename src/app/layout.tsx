import type { Metadata } from 'next';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import './globals.css';
import ThemeRegistry from '@/components/ThemeRegistry';
import { Box, Stack } from '@mui/joy';

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
    <html lang="pl" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const savedMode = localStorage.getItem('joy-mode');
                  const mode = savedMode || 'light';
                  document.documentElement.setAttribute('data-joy-color-scheme', mode);
                  document.documentElement.style.colorScheme = mode;
                  document.documentElement.classList.add('color-scheme-ready');
                } catch (e) {}
              })();
            `,
          }}
        />
        <meta name="color-scheme" content="light dark" />
      </head>
      <body>
        <ThemeRegistry>
          <Box
            sx={{
              minHeight: '100vh',
              display: 'flex',
              flexDirection: 'column',
              bgcolor: 'background.body',
            }}
          >
            <Navigation />
            <Box
              component="main"
              sx={{
                flex: 1,
                bgcolor: 'background.body',
              }}
            >
              {children}
            </Box>
            <Footer />
          </Box>
        </ThemeRegistry>
      </body>
    </html>
  );
}