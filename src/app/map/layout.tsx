import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mapa Radzynia Podlaskiego - Interaktywna mapa miejsc i atrakcji',
  description: 'Interaktywna mapa Radzynia Podlaskiego i okolic z oznaczonymi zabytkami, instytucjami i atrakcjami turystycznymi.',
  openGraph: {
    title: 'Mapa Radzynia Podlaskiego',
    description: 'Odkryj najciekawsze miejsca w Radzyniu Podlaskim dzięki interaktywnej mapie miasta.',
    type: 'website',
  },
};

export default function MapLayout({
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