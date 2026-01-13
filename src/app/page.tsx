import WeatherWidget from '@/components/WeatherWidget';
import CityHighlights from '@/components/CityHighlights';
import PlaceholderImage from '@/components/PlaceholderImage';
import NewsFeed from '@/components/NewsFeed';
import SectionWrapper from '@/components/SectionWrapper';
import Button from '@/components/foundation/Button';
import QuickLinkCard from '@/components/QuickLinkCard';
import {
  Box,
  Typography,
  Grid,
  Stack,
} from '@mui/joy';
import HomeIcon from '@mui/icons-material/Home';
import EventIcon from '@mui/icons-material/Event';
import MapIcon from '@mui/icons-material/Map';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CampaignIcon from '@mui/icons-material/Campaign';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import Link from 'next/link';
import Dashboard, { DashboardProvider, WidgetConfig } from '@/components/Dashboard';
import dynamic from 'next/dynamic';
import HomeEventsWidget from '@/components/home/HomeEventsWidget';

// Dynamically import CityMapWidget to avoid SSR issues with Leaflet
const CityMapWidget = dynamic(() => import('@/components/CityMapWidget'), { ssr: false });

// Define dashboard widgets
const dashboardWidgets: WidgetConfig[] = [
  {
    id: 'weather',
    component: <WeatherWidget />,
    size: 'half',
    order: 1
  },
  {
    id: 'quickLinks',
    component: (
      <SectionWrapper title="Na skróty" disableCardStyling={true}>
        <Grid container spacing={3}>
          <Grid xs={12} md={6}>
            <QuickLinkCard
              href="/city"
              icon={<HomeIcon sx={{ fontSize: 48 }} />}
              title="O mieście"
              description="Historia i atrakcje"
              colorRgb="25, 118, 210"
            />
          </Grid>
          <Grid xs={12} md={6}>
            <QuickLinkCard
              href="/events"
              icon={<EventIcon sx={{ fontSize: 48 }} />}
              title="Wydarzenia"
              description="Kalendarz imprez"
              colorRgb="255, 167, 38"
            />
          </Grid>
          <Grid xs={12} md={6}>
            <QuickLinkCard
              href="/map"
              icon={<MapIcon sx={{ fontSize: 48 }} />}
              title="Mapa miasta"
              description="Punkty zainteresowania"
              colorRgb="46, 125, 50"
            />
          </Grid>
          <Grid xs={12} md={6}>
            <QuickLinkCard
              href="/announcements"
              icon={<CampaignIcon sx={{ fontSize: 48 }} />}
              title="Ogłoszenia"
              description="Lokalne ogłoszenia"
              colorRgb="211, 47, 47"
            />
          </Grid>
        </Grid>
      </SectionWrapper>
    ),
    size: 'half',
    order: 2
  },
  {
    id: 'cityMap',
    component: <CityMapWidget />,
    size: 'half',
    order: 3
  },
  {
    id: 'memories',
    component: (
      <SectionWrapper
        title="Wspomnienia"
        actions={
          <Button
            component={Link}
            href="/memories"
            variant="soft"
            size="md"
            startDecorator={<AutoStoriesIcon />}
            endDecorator={<ArrowForwardIcon />}
            sx={{
              px: 3,
              py: 1.5,
              fontSize: '0.95rem',
            }}
          >
            Zobacz wszystkie
          </Button>
        }
      >
        <Stack alignItems="center" spacing={2} sx={{ py: 4 }}>
          <AutoStoriesIcon sx={{ fontSize: 64, color: 'text.tertiary' }} />
          <Typography level="body-md" sx={{ color: 'text.secondary', textAlign: 'center' }}>
            Wspomnienia to miejsce gdzie ludzie dzielą się ciekawymi treściami z sieci -
            artykułami, postami i innymi materiałami związanymi z Radzyniem.
          </Typography>
          <Button
            component={Link}
            href="/memories"
            variant="solid"
            color="primary"
            endDecorator={<ArrowForwardIcon />}
          >
            Przeglądaj wspomnienia
          </Button>
        </Stack>
      </SectionWrapper>
    ),
    size: 'half',
    order: 4
  },
  {
    id: 'news',
    component: <NewsFeed limit={3} showFeatured={true} dashboardMode={true} />,
    size: 'full',
    order: 5
  },
  {
    id: 'cityHighlights',
    component: <CityHighlights />,
    size: 'full',
    order: 6
  },
  {
    id: 'events',
    component: <HomeEventsWidget />,
    size: 'full',
    order: 7
  }
];

export default function Home() {
  return (
    <>
      {/* Hero Section - Full width without borders */}
      <Box
        sx={{
          position: 'relative',
          mb: 6,
          width: '100%',
          mx: 0,
          px: 0,
        }}
      >
        <Box sx={{ height: { xs: '50vh', md: '60vh' }, overflow: 'hidden' }}>
          <PlaceholderImage
            title="Panorama Radzynia Podlaskiego"
            className="w-full h-full"
            height={600}
            aspectRatio="landscape"
          />
        </Box>
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)',
            display: 'flex',
            alignItems: 'flex-end'
          }}
        >
          <Box sx={{ py: 6, px: { xs: 2, md: 4 }, maxWidth: 'xl', mx: 'auto', width: '100%' }}>
            <Typography
              level="h1"
              sx={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' }
              }}
            >
              Radzyń Podlaski
            </Typography>
            <Typography
              level="h4"
              sx={{
                color: 'white',
                maxWidth: 'md',
                fontSize: { xs: '1.25rem', md: '1.5rem' }
              }}
            >
              Piękno historii i tradycji w sercu Podlasia
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Welcome Section */}
      <Box sx={{ mb: 6, px: { xs: 2, md: 4 }, maxWidth: 'xl', mx: 'auto', width: '100%' }}>
        <Typography level="h2" sx={{ mb: 2, fontWeight: 'bold' }}>
          Witaj w Radzyniu Podlaskim
        </Typography>
        <Typography level="body-lg" sx={{ maxWidth: 'xl' }}>
          Odkryj piękno i historię miasta Radzyń Podlaski i powiatu radzyńskiego.
          Nasza strona jest Twoim przewodnikiem po lokalnych atrakcjach,
          wydarzeniach i usługach.
        </Typography>
      </Box>

      {/* Dashboard */}
      <DashboardProvider initialWidgets={dashboardWidgets}>
        <Dashboard widgets={dashboardWidgets} />
      </DashboardProvider>
    </>
  );
}
