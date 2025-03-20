import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import './globals.css';
import ThemeRegistry from '@/components/ThemeRegistry';

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
          <main style={{ paddingTop: '64px' }}>{children}</main>
          <footer style={{ 
            backgroundColor: '#333',
            color: 'white',
            padding: '1.5rem 0',
            marginTop: '3rem'
          }}>
            <div style={{ 
              maxWidth: '1200px', 
              margin: '0 auto', 
              padding: '0 1rem'
            }}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%'
              }}>
                <p>© {new Date().getFullYear()} Radzyń Podlaski. Wszelkie prawa zastrzeżone.</p>
                <div style={{ 
                  marginTop: '1rem',
                  display: 'flex',
                  gap: '1rem'
                }}>
                  <a href="#" style={{ color: 'white', textDecoration: 'none' }}>
                    Polityka prywatności
                  </a>
                  <a href="#" style={{ color: 'white', textDecoration: 'none' }}>
                    Mapa strony
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </ThemeRegistry>
      </body>
    </html>
  );
}