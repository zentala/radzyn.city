import WeatherWidget from '@/components/WeatherWidget';
import CityHighlights from '@/components/CityHighlights';
import PlaceholderImage from '@/components/PlaceholderImage';
import NewsFeed from '@/components/NewsFeed';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardOverflow,
  CardActionArea,
  Chip,
} from '@mui/joy';
import HomeIcon from '@mui/icons-material/Home';
import EventIcon from '@mui/icons-material/Event';
import MapIcon from '@mui/icons-material/Map';
import PhoneIcon from '@mui/icons-material/Phone';
import Link from 'next/link';
import Dashboard, { DashboardProvider, WidgetConfig } from '@/components/Dashboard';
import DashboardWidget from '@/components/DashboardWidget';
import EventCard from '@/components/EventCard';
import dynamic from 'next/dynamic';

// Dynamically import CityMapWidget to avoid SSR issues with Leaflet
const CityMapWidget = dynamic(() => import('@/components/CityMapWidget'), { ssr: false });

// Define example upcoming events
const upcomingEvents = [
  {
    title: "Dni Radzynia Podlaskiego",
    date: "24-26 czerwca 2025",
    location: "Plac Wolności, Radzyń Podlaski",
    description: "Coroczne święto miasta z koncertami i atrakcjami.",
    category: "kulturalne",
  },
  {
    title: "Radzyński Bieg Uliczny",
    date: "3 kwietnia 2025",
    location: "Centrum miasta, Radzyń Podlaski",
    description: "Zawody biegowe na dystansie 5 i 10 km.",
    category: "sportowe",
  },
  {
    title: "Forum Gospodarcze Powiatu",
    date: "21 kwietnia 2025",
    location: "Urząd Miasta, Radzyń Podlaski",
    description: "Spotkanie przedsiębiorców i samorządowców.",
    category: "biznesowe",
  }
];

// Define dashboard widgets
const dashboardWidgets: WidgetConfig[] = [
  {
    id: 'weather',
    component: <WeatherWidget />,
    size: 'medium',
    order: 1
  },
  {
    id: 'quickLinks',
    component: (
      <DashboardWidget title="Na skróty">
        <Grid container spacing={2}>
          <Grid xs={6}>
            <Card sx={{ height: '100%', bgcolor: 'primary.400', opacity: 0.8 }}>
              <CardActionArea
                component={Link}
                href="/city"
                sx={{ height: '100%', p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              >
                <HomeIcon sx={{ fontSize: 40, mb: 1, color: 'white' }} />
                <Typography level="h3" sx={{ color: 'white' }}>
                  O mieście
                </Typography>
                <Typography level="body-sm" sx={{ color: 'white' }}>
                  Historia i atrakcje
                </Typography>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid xs={6}>
            <Card sx={{ height: '100%', bgcolor: 'secondary.400', opacity: 0.8 }}>
              <CardActionArea
                component={Link}
                href="/events"
                sx={{ height: '100%', p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              >
                <EventIcon sx={{ fontSize: 40, mb: 1, color: 'white' }} />
                <Typography level="h3" sx={{ color: 'white' }}>
                  Wydarzenia
                </Typography>
                <Typography level="body-sm" sx={{ color: 'white' }}>
                  Kalendarz imprez
                </Typography>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid xs={6}>
            <Card sx={{ height: '100%', bgcolor: 'success.400', opacity: 0.8 }}>
              <CardActionArea
                component={Link}
                href="/map"
                sx={{ height: '100%', p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              >
                <MapIcon sx={{ fontSize: 40, mb: 1, color: 'white' }} />
                <Typography level="h3" sx={{ color: 'white' }}>
                  Mapa miasta
                </Typography>
                <Typography level="body-sm" sx={{ color: 'white' }}>
                  Punkty zainteresowania
                </Typography>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid xs={6}>
            <Card sx={{ height: '100%', bgcolor: 'warning.400', opacity: 0.8 }}>
              <CardActionArea
                component={Link}
                href="/contact"
                sx={{ height: '100%', p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              >
                <PhoneIcon sx={{ fontSize: 40, mb: 1, color: 'white' }} />
                <Typography level="h3" sx={{ color: 'white' }}>
                  Kontakt
                </Typography>
                <Typography level="body-sm" sx={{ color: 'white' }}>
                  Dane kontaktowe
                </Typography>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </DashboardWidget>
    ),
    size: 'medium',
    order: 2
  },
  {
    id: 'cityMap',
    component: <CityMapWidget />,
    size: 'medium',
    order: 3
  },
  {
    id: 'news',
    component: <NewsFeed limit={3} showFeatured={true} dashboardMode={true} />,
    size: 'full',
    order: 4
  },
  {
    id: 'cityHighlights',
    component: <CityHighlights />,
    size: 'full',
    order: 5
  },
  {
    id: 'events',
    component: (
      <DashboardWidget
        title="Nadchodzące wydarzenia"
        actions={
          <Link href="/events" style={{ textDecoration: 'none' }}>
            <Chip variant="soft" color="primary">
              Zobacz kalendarz
            </Chip>
          </Link>
        }
      >
        <Grid container spacing={3}>
          {upcomingEvents.map((event, index) => (
            <Grid xs={12} md={4} key={index}>
              <EventCard {...event} />
            </Grid>
          ))}
        </Grid>
      </DashboardWidget>
    ),
    size: 'full',
    order: 6
  }
];

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <Box sx={{ position: 'relative', mb: 6 }}>
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
        <Typography level="body-lg" sx={{ maxWidth: 'lg' }}>
          Odkryj piękno i historię miasta Radzyń Podlaski i powiatu radzyńskiego.
          Nasza strona jest Twoim przewodnikiem po lokalnych atrakcjach,
          wydarzeniach i usługach.
        </Typography>
      </Box>

      {/* Dashboard */}
      <DashboardProvider initialWidgets={dashboardWidgets}>
        <Dashboard widgets={dashboardWidgets} />
      </DashboardProvider>
    </div>
  );
}
