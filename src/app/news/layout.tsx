import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Aktualności - Radzyń Podlaski',
  description: 'Najnowsze informacje i wiadomości z Radzynia Podlaskiego i powiatu radzyńskiego. Bądź na bieżąco z wydarzeniami w regionie.',
  openGraph: {
    title: 'Aktualności z Radzynia Podlaskiego',
    description: 'Najnowsze informacje i wiadomości z miasta i powiatu radzyńskiego.',
    type: 'website',
  },
};

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
}