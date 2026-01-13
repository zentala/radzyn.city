import { PageContainer } from '@/components/layout/PageContainer';
import { Section } from '@/components/layout/Section';
import { Typography } from '@/components/foundation/Typography';
import { MapClient } from './MapClient';

export const metadata = {
  title: 'Mapa Radzynia Podlaskiego',
  description: 'Interaktywna mapa miasta z zaznaczonymi miejscami i atrakcjami.',
};

export default function MapPage({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const initialPoiId = typeof searchParams?.poi === 'string' ? searchParams.poi : undefined;
  const initialCategory =
    typeof searchParams?.category === 'string' ? searchParams.category : undefined;

  return (
    <PageContainer>
      <Typography level="h1" sx={{ mb: 2 }}>
        Mapa Radzynia Podlaskiego
      </Typography>
      <Typography level="body-lg" textColor="text.secondary" sx={{ mb: 6 }}>
        Interaktywna mapa miasta z zaznaczonymi miejscami i atrakcjami
      </Typography>

      <Section title="Mapa" sx={{ mb: 6 }}>
        <MapClient initialPoiId={initialPoiId} initialCategory={initialCategory} />
      </Section>

      <Section title="Informacje">
        <Typography level="body-lg" sx={{ mb: 2 }}>
          Mapa interaktywna pozwala na łatwe odnalezienie interesujących miejsc w Radzyniu Podlaskim.
          Możesz przeglądać miejsca według kategorii, wyszukiwać konkretne lokalizacje i uzyskać
          szczegółowe informacje o każdym miejscu.
        </Typography>
        <Typography level="body-lg" sx={{ mb: 2 }}>
          Wszystkie miejsca na mapie są dokładnie oznaczone i opisane. Możesz również zobaczyć
          zdjęcia, opinie użytkowników i dodatkowe informacje o każdej lokalizacji.
        </Typography>
        <Typography level="body-lg">
          Mapa jest regularnie aktualizowana o nowe miejsca i atrakcje turystyczne w mieście.
        </Typography>
      </Section>
    </PageContainer>
  );
}
