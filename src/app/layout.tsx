import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import './globals.css';

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
      <body className="bg-gray-50">
        <Navigation />
        <main className="pt-16">{children}</main>
        <footer className="bg-gray-800 text-white py-6 mt-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p>© {new Date().getFullYear()} Radzyń Podlaski. Wszelkie prawa zastrzeżone.</p>
              <div className="mt-4 md:mt-0 flex space-x-4">
                <a href="#" className="hover:text-gray-300 transition">Polityka prywatności</a>
                <a href="#" className="hover:text-gray-300 transition">Mapa strony</a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}