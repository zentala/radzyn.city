import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wydarzenia - Radzyń Podlaski i Powiat Radzyński',
  description: 'Kalendarz nadchodzących wydarzeń w Radzyniu Podlaskim i powiecie radzyńskim. Imprezy kulturalne, sportowe i edukacyjne.',
  openGraph: {
    title: 'Wydarzenia w Radzyniu Podlaskim',
    description: 'Sprawdź nadchodzące wydarzenia kulturalne, sportowe i edukacyjne w Radzyniu Podlaskim i okolicach.',
    type: 'website',
  },
};

export default function EventsLayout({
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