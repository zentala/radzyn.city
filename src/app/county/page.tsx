'use client';

import React from 'react';
import Link from 'next/link';
import PlaceholderImage from '@/components/PlaceholderImage';
import SectionWrapper from '@/components/SectionWrapper';
import Button from '@/components/foundation/Button';
import { Card, ContentCard } from '@/components/foundation/Card';
import {
  Box,
  Chip,
  Grid,
  Stack,
  Typography,
} from '@mui/joy';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PublicIcon from '@mui/icons-material/Public';
import GroupsIcon from '@mui/icons-material/Groups';
import StraightenIcon from '@mui/icons-material/Straighten';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import InsightsIcon from '@mui/icons-material/Insights';
import { CoatOfArms } from '@/components/geo/CoatOfArms';

type GminaMetricKey = 'area' | 'population' | 'density' | 'trend';

type GminaData = {
  id: string;
  crest: { entityType: 'gmina' | 'city'; entityId: string };
  name: string;
  type: 'miejska' | 'wiejska' | 'miejsko-wiejska' | 'unknown';
  areaKm2: number;
  population: number;
  densityPerKm2: number;
  trendLabel: string;
  trendSortValue: number;
  villagesLabel?: string;
  firmsCount?: number;
  avgWagePln?: number;
  avgNewHomeSizeM2?: number;
  notes?: string[];
  approximate?: boolean;
};

const COUNTY_STATS = {
  areaKm2: 965,
  populationRange: 'ok. 57 500–58 000',
  densityPerKm2: 60,
  gminyCountLabel: 'miasto + 7 gmin',
  regonFirms: 4466,
  economy: [
    { label: 'Rolnictwo', value: '77%' },
    { label: 'Przemysł i budownictwo', value: '15%' },
    { label: 'Usługi', value: '8%' },
  ],
};

const GMINY: GminaData[] = [
  {
    id: 'miasto-radzyn-podlaski',
    crest: { entityType: 'city', entityId: 'miasto-radzyn-podlaski' },
    name: 'Radzyń Podlaski (miasto)',
    type: 'miejska',
    areaKm2: 19,
    population: 14400,
    densityPerKm2: 799,
    trendLabel: 'spadek ok. 10% (2011→2021)',
    trendSortValue: -10,
    notes: [
      'Siedziba władz powiatu',
      'Najwyższa gęstość zaludnienia w powiecie',
    ],
  },
  {
    id: 'gmina-radzyn-podlaski',
    crest: { entityType: 'gmina', entityId: 'gmina-radzyn-podlaski' },
    name: 'Radzyń Podlaski (gmina)',
    type: 'wiejska',
    areaKm2: 155,
    population: 8100,
    densityPerKm2: 52,
    trendLabel: 'stabilna (ok. -0,2% w dekadzie)',
    trendSortValue: -0.2,
    villagesLabel: '24 wsie',
    notes: [
      'Jedyna gmina ze stabilną demografią w powiecie (najmniejszy spadek)',
      'Kompleksy leśne + pałace wiejskie (Branica, Białka, Żabików)',
    ],
  },
  {
    id: 'gmina-wohyn',
    crest: { entityType: 'gmina', entityId: 'gmina-wohyn' },
    name: 'Wohyń',
    type: 'wiejska',
    areaKm2: 178,
    population: 6500,
    densityPerKm2: 36,
    trendLabel: 'spadek ok. 10% (2011→2021)',
    trendSortValue: -10,
    villagesLabel: '~22 wsie',
    notes: [
      'Największa powierzchnia w powiecie',
      'Najniższa gęstość zaludnienia w powiecie',
    ],
  },
  {
    id: 'gmina-kakolewnica',
    crest: { entityType: 'gmina', entityId: 'gmina-kakolewnica' },
    name: 'Kąkolewnica',
    type: 'wiejska',
    areaKm2: 147,
    population: 7930,
    densityPerKm2: 54,
    trendLabel: 'spadek ok. 8% (2011→2021)',
    trendSortValue: -8,
    villagesLabel: '20 wsi',
    notes: [
      'Najwięcej firm w zestawieniu (ok. 581)',
      'Użytki rolne ok. 70%, lasy ok. 24,7%',
    ],
    firmsCount: 581,
  },
  {
    id: 'gmina-borki',
    crest: { entityType: 'gmina', entityId: 'gmina-borki' },
    name: 'Borki',
    type: 'wiejska',
    areaKm2: 112,
    population: 5970,
    densityPerKm2: 53,
    trendLabel: 'spadek ok. 5% (2011→2021)',
    trendSortValue: -5,
    villagesLabel: '15 wsi',
    notes: [
      'Najmłodsza średnia wieku: 39,5 lat',
      'Największa średnia powierzchnia nowych mieszkań (ok. 153 m²)',
      'Gmina powstała w 1973 r. (połączenie gromad Borki i Wola Osowińska)',
    ],
    avgNewHomeSizeM2: 153,
  },
  {
    id: 'gmina-ulan-majorat',
    crest: { entityType: 'gmina', entityId: 'gmina-ulan-majorat' },
    name: 'Ulan-Majorat',
    type: 'wiejska',
    areaKm2: 108,
    population: 5900,
    densityPerKm2: 55,
    trendLabel: 'spadek ok. 10% (2011→2021)',
    trendSortValue: -10,
    villagesLabel: '20 wsi',
    notes: [
      'Rzeka Bystrzyca (wędkarstwo)',
      'OSP i sieć szkół (lokalne zaplecze)',
    ],
  },
  {
    id: 'gmina-czemierniki',
    crest: { entityType: 'gmina', entityId: 'gmina-czemierniki' },
    name: 'Czemierniki',
    type: 'miejsko-wiejska',
    areaKm2: 107,
    population: 4240,
    densityPerKm2: 38,
    trendLabel: 'spadek ok. 15% (2011→2021)',
    trendSortValue: -15,
    notes: [
      'Jedyna gmina miejsko-wiejska w powiecie',
      'Pałac w Czemiernikach (XVI w.)',
      'Najwyższe średnie wynagrodzenie w zestawieniu (ok. 7 200 zł)',
      'Największe domy: średnia nowych mieszkań ok. 156 m²',
    ],
    avgWagePln: 7200,
    avgNewHomeSizeM2: 156,
  },
  {
    id: 'gmina-komarowka-podlaska',
    crest: { entityType: 'gmina', entityId: 'gmina-komarowka-podlaska' },
    name: 'Komarówka Podlaska',
    type: 'wiejska',
    areaKm2: 95,
    population: 4130,
    densityPerKm2: 43,
    trendLabel: 'spadek ok. 11% (2011→2021)',
    trendSortValue: -11,
    approximate: true,
    villagesLabel: '13 sołectw',
    notes: [
      'Najmniejsza gmina wiejska (szacunek powierzchni)',
      'Sąsiaduje tylko z 1 gminą powiatu (Wohyń)',
    ],
  },
];

const ATTRACTIONS = [
  {
    title: 'Pałac Potockich',
    location: 'Radzyń Podlaski',
    description: 'Barokowa perła rokoka (XVIII w.), zabytek klasy zerowej.',
  },
  {
    title: 'Kościół Świętej Trójcy',
    location: 'Radzyń Podlaski',
    description: 'Zabytkowy kościół z XVII wieku.',
  },
  {
    title: 'Pałac w Czemiernikach',
    location: 'Czemierniki',
    description: 'Renesansowy pałac z XVI wieku, otoczony parkiem.',
  },
];

type HistoryEvent = {
  year: string;
  text: string;
};

const COUNTY_HISTORY: HistoryEvent[] = [
  { year: '1468', text: 'Nadanie praw miejskich Radzyniowi.' },
  { year: '1749–1756', text: 'Budowa Pałacu Potockich (proj. Jakub Fontana).' },
  { year: '1810', text: 'Utworzenie powiatu radzyńskiego w Księstwie Warszawskim.' },
  { year: '1863', text: 'Powstanie Styczniowe (walki 22–23 stycznia w Radzyniu).' },
  { year: '1999', text: 'Przywrócenie powiatu w reformie administracyjnej.' },
  { year: '2023', text: '555-lecie praw miejskich Radzynia.' },
];

function formatNumber(value: number) {
  return new Intl.NumberFormat('pl-PL').format(value);
}

function getMetricLabel(metric: GminaMetricKey) {
  switch (metric) {
    case 'area':
      return 'Powierzchnia (km²)';
    case 'population':
      return 'Ludność';
    case 'density':
      return 'Gęstość (os./km²)';
    case 'trend':
      return 'Trend demograficzny';
  }
}

function getMetricValue(g: GminaData, metric: GminaMetricKey) {
  switch (metric) {
    case 'area':
      return g.areaKm2;
    case 'population':
      return g.population;
    case 'density':
      return g.densityPerKm2;
    case 'trend':
      return g.trendSortValue;
  }
}

function formatMetricValue(g: GminaData, metric: GminaMetricKey) {
  switch (metric) {
    case 'area':
      return `${g.approximate ? '~' : ''}${formatNumber(g.areaKm2)} km²`;
    case 'population':
      return `${formatNumber(g.population)} osób`;
    case 'density':
      return `${formatNumber(g.densityPerKm2)} os./km²`;
    case 'trend':
      return g.trendLabel;
  }
}

const SORT_OPTIONS: Array<{ key: GminaMetricKey; label: string }> = [
  { key: 'population', label: 'Ludność' },
  { key: 'area', label: 'Powierzchnia' },
  { key: 'density', label: 'Gęstość' },
  { key: 'trend', label: 'Trend demogr.' },
];

function formatGminaTypeLabel(type: GminaData['type']) {
  switch (type) {
    case 'miejska':
      return 'gmina miejska';
    case 'wiejska':
      return 'gmina wiejska';
    case 'miejsko-wiejska':
      return 'gmina miejsko-wiejska';
    default:
      return 'typ do weryfikacji';
  }
}

function getTrendColor(value: number) {
  // value is a percent-ish delta (negative = decline)
  if (value >= -1) return 'success.500';
  if (value >= -8) return 'warning.500';
  return 'danger.500';
}

function formatTrendShort(trendLabel: string) {
  // For the stat row we keep the informative label, but we avoid repeating
  // extra "Trend..." text around it.
  return trendLabel;
}

function StatRow(props: {
  label: string;
  value: React.ReactNode;
  highlighted?: boolean;
  highlightColor?: string;
}) {
  const { label, value, highlighted, highlightColor } = props;

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="baseline"
      sx={{
        px: 1,
        py: 0.75,
        borderRadius: 'sm',
        bgcolor: highlighted ? 'primary.softBg' : 'transparent',
        border: highlighted ? '1px solid' : '1px solid transparent',
        borderColor: highlighted ? 'primary.softBorder' : 'transparent',
      }}
    >
      <Typography level="body-sm" sx={{ color: 'text.secondary' }}>
        {label}
      </Typography>
      <Typography
        level="body-sm"
        sx={{
          fontWeight: highlighted ? 700 : 600,
          color: highlightColor ?? 'text.primary',
          textAlign: 'right',
        }}
      >
        {value}
      </Typography>
    </Stack>
  );
}

/**
 * History timeline UI for County page.
 * Renders a vertical timeline with dots and connectors, optimized for readability.
 */
function HistoryTimeline(props: { items: HistoryEvent[] }) {
  const { items } = props;

  return (
    <Stack spacing={2} sx={{ maxWidth: 880 }}>
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <Stack
            key={`${item.year}-${item.text}`}
            direction="row"
            spacing={2}
            sx={{ alignItems: 'flex-start' }}
          >
            <Box
              sx={(theme) => ({
                position: 'relative',
                width: 24,
                display: 'flex',
                justifyContent: 'center',
                pt: 0.75,
                color: theme.palette.mode === 'dark'
                  ? 'rgba(255, 255, 255, 0.16)'
                  : 'rgba(0, 0, 0, 0.14)',
              })}
              aria-hidden="true"
            >
              <Box
                sx={(theme) => ({
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  bgcolor: theme.palette.secondary?.[500] ?? theme.palette.primary[500],
                  boxShadow: theme.palette.mode === 'dark'
                    ? '0 0 0 3px rgba(228, 184, 98, 0.14)'
                    : '0 0 0 3px rgba(201, 162, 90, 0.16)',
                })}
              />
              {!isLast ? (
                <Box
                  sx={(theme) => ({
                    position: 'absolute',
                    top: 18,
                    bottom: -20,
                    width: 2,
                    borderRadius: '999px',
                    bgcolor: theme.palette.mode === 'dark'
                      ? 'rgba(255, 255, 255, 0.12)'
                      : 'rgba(0, 0, 0, 0.12)',
                  })}
                />
              ) : null}
            </Box>

            <Card sx={{ p: 2, flex: 1 }}>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={1}
                sx={{ alignItems: { sm: 'baseline' } }}
              >
                <Chip
                  size="sm"
                  variant="soft"
                  color="neutral"
                  sx={(theme) => ({
                    width: 'fit-content',
                    fontWeight: 700,
                    bgcolor: theme.palette.mode === 'dark'
                      ? 'rgba(228, 184, 98, 0.18)'
                      : 'rgba(201, 162, 90, 0.18)',
                    border: '1px solid',
                    borderColor: theme.palette.mode === 'dark'
                      ? 'rgba(228, 184, 98, 0.28)'
                      : 'rgba(201, 162, 90, 0.28)',
                    color: theme.palette.mode === 'dark'
                      ? theme.palette.neutral[900]
                      : theme.palette.primary[700],
                  })}
                >
                  {item.year}
                </Chip>
                <Typography level="body-md" sx={{ color: 'text.secondary' }}>
                  {item.text}
                </Typography>
              </Stack>
            </Card>
          </Stack>
        );
      })}
    </Stack>
  );
}

export default function CountyPage() {
  const [metric, setMetric] = React.useState<GminaMetricKey>('population');

  const sorted = React.useMemo(() => {
    const copy = [...GMINY];
    copy.sort((a, b) => {
      const av = getMetricValue(a, metric);
      const bv = getMetricValue(b, metric);
      // Trend: “najlepiej” = najbliżej 0 (najmniejszy spadek), więc sortujemy malejąco.
      if (metric === 'trend') return bv - av;
      return bv - av;
    });
    return copy;
  }, [metric]);

  const minMax = React.useMemo(() => {
    const values = sorted.map((g) => getMetricValue(g, metric));
    const min = Math.min(...values);
    const max = Math.max(...values);
    return { min, max };
  }, [sorted, metric]);

  return (
    <>
      {/* Hero */}
      <Box sx={{ position: 'relative', mb: 4, width: '100%' }}>
        <Box sx={{ height: { xs: '44vh', md: '52vh' }, overflow: 'hidden' }}>
          <PlaceholderImage
            title="Powiat Radzyński"
            height={600}
            aspectRatio="landscape"
          />
        </Box>
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.65), rgba(0,0,0,0.10))',
            display: 'flex',
            alignItems: 'flex-end',
          }}
        >
          <Box sx={{ py: 5, px: { xs: 2, md: 4 }, maxWidth: 'xl', mx: 'auto', width: '100%' }}>
            <Typography
              level="h1"
              sx={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: { xs: '2.25rem', md: '3.25rem' },
              }}
            >
              Powiat Radzyński
            </Typography>
            <Typography
              level="h4"
              sx={{
                color: 'rgba(255,255,255,0.92)',
                maxWidth: 'md',
                fontSize: { xs: '1.1rem', md: '1.35rem' },
                mt: 1,
              }}
            >
              Szybki przewodnik dla mieszkańców i gości: liczby, gminy, atrakcje i pomysły na aktywność.
            </Typography>

            <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: 'wrap' }}>
              <Chip variant="soft" color="neutral">
                {COUNTY_STATS.areaKm2} km²
              </Chip>
              <Chip variant="soft" color="neutral">
                {COUNTY_STATS.populationRange} mieszkańców
              </Chip>
              <Chip variant="soft" color="neutral">
                ~{COUNTY_STATS.densityPerKm2} os./km²
              </Chip>
              <Chip variant="soft" color="neutral">
                {COUNTY_STATS.gminyCountLabel}
              </Chip>
            </Stack>

            <Stack direction="row" spacing={1.5} sx={{ mt: 3, flexWrap: 'wrap' }}>
              <Button
                component={Link}
                href="#gminy"
                variant="solid"
                endDecorator={<ArrowForwardIcon />}
              >
                Porównaj gminy
              </Button>
              <Button
                component={Link}
                href="/map"
                variant="soft"
                endDecorator={<ArrowForwardIcon />}
              >
                Zobacz mapę
              </Button>
            </Stack>
          </Box>
        </Box>
      </Box>

      {/* Informacje ogólne */}
      <SectionWrapper title="Informacje ogólne">
        <Grid container spacing={4}>
          <Grid xs={12} md={6}>
            <Typography level="body-lg" sx={{ mb: 2 }}>
              Powiat radzyński to jednostka podziału administracyjnego w województwie lubelskim,
              obejmująca obszar <b>{COUNTY_STATS.areaKm2} km²</b>. Siedzibą powiatu jest miasto Radzyń Podlaski.
            </Typography>
            <Typography level="body-lg" sx={{ mb: 2 }}>
              Powiat graniczy z powiatami: parczewskim, lubartowskim, łukowskim, bialskim i włodawskim.
              Jest to region o charakterze rolniczym z bogatą historią i tradycjami.
            </Typography>
            <Typography level="body-lg">
              Ludność powiatu wynosi <b>{COUNTY_STATS.populationRange}</b>.
              Gospodarka opiera się głównie na rolnictwie, przetwórstwie spożywczym i usługach.
            </Typography>
          </Grid>
          <Grid xs={12} md={6}>
            <Box sx={{ height: 256 }}>
              <PlaceholderImage
                title="Powiat Radzyński"
                height={256}
                aspectRatio="landscape"
                sx={{ width: '100%', height: '100%', borderRadius: 'var(--joy-radius-md)' }}
              />
            </Box>
          </Grid>
        </Grid>
      </SectionWrapper>

      {/* Powiat w liczbach */}
      <SectionWrapper title="Powiat w liczbach">
        <Grid container spacing={2}>
          <Grid xs={12} sm={6} md={4}>
            <Card sx={{ p: 2 }}>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                <StraightenIcon fontSize="small" />
                <Typography level="title-md">Powierzchnia</Typography>
              </Stack>
              <Typography level="h3" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                {COUNTY_STATS.areaKm2} km²
              </Typography>
              <Typography level="body-sm" textColor="text.secondary">
                Dużo przestrzeni na wycieczki rowerowe, spacery i naturę.
              </Typography>
            </Card>
          </Grid>

          <Grid xs={12} sm={6} md={4}>
            <Card sx={{ p: 2 }}>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                <GroupsIcon fontSize="small" />
                <Typography level="title-md">Ludność</Typography>
              </Stack>
              <Typography level="h3" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                {COUNTY_STATS.populationRange}
              </Typography>
              <Typography level="body-sm" textColor="text.secondary">
                Przewaga terenów wiejskich i lokalny, spokojny charakter regionu.
              </Typography>
            </Card>
          </Grid>

          <Grid xs={12} sm={6} md={4}>
            <Card sx={{ p: 2 }}>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                <PublicIcon fontSize="small" />
                <Typography level="title-md">Gęstość</Typography>
              </Stack>
              <Typography level="h3" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                ~{COUNTY_STATS.densityPerKm2} os./km²
              </Typography>
              <Typography level="body-sm" textColor="text.secondary">
                Idealnie na “oddech” od miasta — blisko natury.
              </Typography>
            </Card>
          </Grid>

          <Grid xs={12} sm={6} md={4}>
            <Card sx={{ p: 2 }}>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                <InsightsIcon fontSize="small" />
                <Typography level="title-md">Gospodarka</Typography>
              </Stack>
              <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', mb: 1 }}>
                {COUNTY_STATS.economy.map((item) => (
                  <Chip key={item.label} variant="soft" color="neutral">
                    {item.label}: {item.value}
                  </Chip>
                ))}
              </Stack>
              <Typography level="body-sm" textColor="text.secondary">
                Rolnictwo dominuje, ale w tle działa przetwórstwo i usługi.
              </Typography>
            </Card>
          </Grid>

          <Grid xs={12} sm={6} md={4}>
            <Card sx={{ p: 2 }}>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                <TrendingDownIcon fontSize="small" />
                <Typography level="title-md">Przedsiębiorczość</Typography>
              </Stack>
              <Typography level="h3" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                {formatNumber(COUNTY_STATS.regonFirms)}
              </Typography>
              <Typography level="body-sm" textColor="text.secondary">
                Podmioty w rejestrze REGON (wg notatek z researchu).
              </Typography>
            </Card>
          </Grid>

          <Grid xs={12} sm={6} md={4}>
            <Card sx={{ p: 2 }}>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                <PublicIcon fontSize="small" />
                <Typography level="title-md">Połączenia</Typography>
              </Stack>
              <Typography level="body-md" sx={{ mb: 1 }}>
                DK19 i DK63, a także kierunek S19 (Via Carpatia).
              </Typography>
              <Typography level="body-sm" textColor="text.secondary">
                Dojazd: Lublin ~80 km, Warszawa ~150 km.
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </SectionWrapper>

      {/* Gminy */}
      <Box id="gminy" />
      <SectionWrapper
        title="Gminy powiatu — porównaj i odkryj"
        actions={
          <Button component={Link} href="/places" variant="soft" endDecorator={<ArrowForwardIcon />}>
            Zobacz miejsca
          </Button>
        }
      >
        <Typography level="body-md" sx={{ color: 'text.secondary', mb: 2 }}>
          Wybierz sortowanie, aby szybko porównać gminy. Układ kart jest stały — widzisz wszystkie metryki naraz.
        </Typography>

        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={1}
          sx={{ mb: 2, alignItems: { md: 'center' }, justifyContent: 'space-between' }}
        >
          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
            {SORT_OPTIONS.map((opt) => {
              const selected = opt.key === metric;
              return (
                <Chip
                  key={opt.key}
                  variant={selected ? 'solid' : 'soft'}
                  color={selected ? 'primary' : 'neutral'}
                  onClick={() => setMetric(opt.key)}
                  aria-pressed={selected}
                  sx={{
                    cursor: 'pointer',
                    fontWeight: selected ? 'bold' : 500,
                  }}
                >
                  {opt.label}
                </Chip>
              );
            })}
          </Stack>
          <Typography level="body-sm" sx={{ color: 'text.tertiary' }}>
            Sortowanie: <b>{getMetricLabel(metric)}</b>
          </Typography>
        </Stack>

        <Grid container spacing={2}>
          {sorted.map((g) => {
            const value = getMetricValue(g, metric);
            const range = Math.max(1, minMax.max - minMax.min);
            const normalized = metric === 'trend'
              ? (value - minMax.min) / range
              : (value - minMax.min) / range;

            return (
              <Grid xs={12} md={6} key={g.id}>
                <Card sx={{ p: 2 }}>
                  <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1 }}>
                    <CoatOfArms
                      entityType={g.crest.entityType}
                      entityId={g.crest.entityId}
                      label={g.name}
                      size={44}
                    />
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Stack direction="row" spacing={1} sx={{ alignItems: 'baseline', flexWrap: 'wrap' }}>
                        <Typography level="title-lg" sx={{ lineHeight: 1.2 }}>
                          {g.name}
                        </Typography>
                        <Chip size="sm" variant="soft" color="neutral">
                          {formatGminaTypeLabel(g.type)}
                        </Chip>
                        {g.villagesLabel ? (
                          <Chip size="sm" variant="soft" color="neutral">
                            {g.villagesLabel}
                          </Chip>
                        ) : null}
                      </Stack>
                    </Box>
                  </Stack>

                  <Box
                    sx={{
                      mt: 1.25,
                      height: 8,
                      borderRadius: '999px',
                      bgcolor: 'background.level1',
                      overflow: 'hidden',
                    }}
                    aria-hidden="true"
                  >
                    <Box
                      sx={{
                        height: '100%',
                        width: `${Math.max(6, Math.round(normalized * 100))}%`,
                        bgcolor: metric === 'trend' ? getTrendColor(value) : 'primary.500',
                      }}
                    />
                  </Box>

                  <Stack spacing={0.5} sx={{ mt: 1.25 }}>
                    <StatRow
                      label="Ludność"
                      value={`${formatNumber(g.population)} osób`}
                      highlighted={metric === 'population'}
                    />
                    <StatRow
                      label="Powierzchnia"
                      value={`${g.approximate ? '~' : ''}${formatNumber(g.areaKm2)} km²`}
                      highlighted={metric === 'area'}
                    />
                    <StatRow
                      label="Gęstość"
                      value={`${formatNumber(g.densityPerKm2)} os./km²`}
                      highlighted={metric === 'density'}
                    />
                    <StatRow
                      label="Trend demograficzny"
                      value={formatTrendShort(g.trendLabel)}
                      highlighted={metric === 'trend'}
                      highlightColor={metric === 'trend' ? getTrendColor(g.trendSortValue) : undefined}
                    />
                  </Stack>

                  {g.notes?.length ? (
                    <Box sx={{ mt: 1.25 }}>
                      {g.notes.map((n) => (
                        <Typography key={n} level="body-sm" sx={{ color: 'text.secondary' }}>
                          • {n}
                        </Typography>
                      ))}
                    </Box>
                  ) : null}
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </SectionWrapper>

      {/* Atrakcje */}
      <SectionWrapper
        title="Atrakcje turystyczne (TOP)"
        actions={
          <Button component={Link} href="/map" variant="soft" endDecorator={<ArrowForwardIcon />}>
            Mapa atrakcji
          </Button>
        }
      >
        <Grid container spacing={3}>
          {ATTRACTIONS.map((a) => (
            <Grid xs={12} md={4} key={a.title}>
              <ContentCard
                imageAlt={a.title}
                title={a.title}
                metadata={(
                  <Typography level="body-sm" textColor="primary">
                    {a.location}
                  </Typography>
                )}
                description={a.description}
                footer={(
                  <Button component={Link} href="/places" variant="outlined" endDecorator={<ArrowForwardIcon />}>
                    Zobacz więcej miejsc
                  </Button>
                )}
              />
            </Grid>
          ))}
        </Grid>
      </SectionWrapper>

      {/* Aktywnie */}
      <SectionWrapper title="Turystyka i rekreacja">
        <Grid container spacing={2}>
          <Grid xs={12} md={6}>
            <Card sx={{ p: 2 }}>
              <Typography level="title-lg" sx={{ mb: 1 }}>
                Szlaki i aktywności
              </Typography>
              <Typography level="body-md" sx={{ color: 'text.secondary', mb: 1 }}>
                W powiecie znajdziesz szlaki rowerowe (łącznie ok. <b>80+ km</b>): żółty 23 km,
                czerwony ~27 km i zielony ~30 km.
              </Typography>
              <Typography level="body-md" sx={{ color: 'text.secondary' }}>
                Dodatkowo region jest punktem na Szlaku Renesansu Lubelskiego (~250 km).
              </Typography>
            </Card>
          </Grid>
          <Grid xs={12} md={6}>
            <Card sx={{ p: 2 }}>
              <Typography level="title-lg" sx={{ mb: 1 }}>
                Natura + “na niepogodę”
              </Typography>
              <Typography level="body-md" sx={{ color: 'text.secondary', mb: 1 }}>
                Kompleksy leśne (m.in. Jaski, Główne, Płudy, Bedlno) sprzyjają spacerom i grzybobraniu.
              </Typography>
              <Typography level="body-md" sx={{ color: 'text.secondary' }}>
                Gdy pogoda nie dopisuje — warto rozważyć basen AquaMiś.
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </SectionWrapper>

      {/* Historia */}
      <SectionWrapper title="Historia (oś czasu)">
        <HistoryTimeline items={COUNTY_HISTORY} />
      </SectionWrapper>
    </>
  );
}
