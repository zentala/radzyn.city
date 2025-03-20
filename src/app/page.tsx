import WeatherWidget from '@/components/WeatherWidget';
import CityHighlights from '@/components/CityHighlights';
import PlaceholderImage from '@/components/PlaceholderImage';
import NewsFeed from '@/components/NewsFeed';
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardActionArea,
  Chip
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import EventIcon from '@mui/icons-material/Event';
import MapIcon from '@mui/icons-material/Map';
import PhoneIcon from '@mui/icons-material/Phone';
import Link from 'next/link';
import Dashboard, { DashboardProvider, WidgetConfig } from '@/components/Dashboard';
import DashboardWidget from '@/components/DashboardWidget';
import EventCard from '@/components/EventCard';

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
          <Grid item xs={6}>
            <Card sx={{ height: '100%', backgroundColor: 'primary.light', opacity: 0.8 }}>
              <CardActionArea 
                component={Link} 
                href="/city"
                sx={{ height: '100%', p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              >
                <HomeIcon sx={{ fontSize: 40, mb: 1, color: 'white' }} />
                <Typography variant="h6" component="h3" sx={{ color: 'white' }}>
                  O mieście
                </Typography>
                <Typography variant="body2" color="white">
                  Historia i atrakcje
                </Typography>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card sx={{ height: '100%', backgroundColor: 'secondary.light', opacity: 0.8 }}>
              <CardActionArea 
                component={Link} 
                href="/events"
                sx={{ height: '100%', p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              >
                <EventIcon sx={{ fontSize: 40, mb: 1, color: 'white' }} />
                <Typography variant="h6" component="h3" sx={{ color: 'white' }}>
                  Wydarzenia
                </Typography>
                <Typography variant="body2" color="white">
                  Kalendarz imprez
                </Typography>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card sx={{ height: '100%', backgroundColor: 'success.light', opacity: 0.8 }}>
              <CardActionArea 
                component={Link} 
                href="/county"
                sx={{ height: '100%', p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              >
                <MapIcon sx={{ fontSize: 40, mb: 1, color: 'white' }} />
                <Typography variant="h6" component="h3" sx={{ color: 'white' }}>
                  Powiat
                </Typography>
                <Typography variant="body2" color="white">
                  Informacje o gminie
                </Typography>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card sx={{ height: '100%', backgroundColor: 'warning.light', opacity: 0.8 }}>
              <CardActionArea 
                component={Link} 
                href="/contact"
                sx={{ height: '100%', p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              >
                <PhoneIcon sx={{ fontSize: 40, mb: 1, color: 'white' }} />
                <Typography variant="h6" component="h3" sx={{ color: 'white' }}>
                  Kontakt
                </Typography>
                <Typography variant="body2" color="white">
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
    id: 'news',
    component: <NewsFeed limit={3} showFeatured={true} dashboardMode={true} />,
    size: 'full',
    order: 3
  },
  {
    id: 'cityHighlights',
    component: <CityHighlights />,
    size: 'full',
    order: 4
  },
  {
    id: 'events',
    component: (
      <DashboardWidget 
        title="Nadchodzące wydarzenia" 
        actions={
          <Link href="/events" style={{ textDecoration: 'none' }}>
            <Chip label="Zobacz kalendarz" color="primary" clickable />
          </Link>
        }
      >
        <Grid container spacing={3}>
          {upcomingEvents.map((event, index) => (
            <Grid item xs={12} md={4} key={index}>
              <EventCard {...event} />
            </Grid>
          ))}
        </Grid>
      </DashboardWidget>
    ),
    size: 'full',
    order: 5
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
          <Container maxWidth="xl" sx={{ py: 6 }}>
            <Typography 
              variant="h2" 
              component="h1" 
              sx={{ 
                color: 'white', 
                fontWeight: 'bold',
                fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' }
              }}
            >
              Radzyń Podlaski
            </Typography>
            <Typography 
              variant="h5" 
              sx={{ 
                color: 'white', 
                maxWidth: 'md',
                fontSize: { xs: '1.25rem', md: '1.5rem' }
              }}
            >
              Piękno historii i tradycji w sercu Podlasia
            </Typography>
          </Container>
        </Box>
      </Box>

      {/* Welcome Section */}
      <Container maxWidth="xl" sx={{ mb: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom fontWeight="bold">
          Witaj w Radzyniu Podlaskim
        </Typography>
        <Typography variant="body1" paragraph sx={{ maxWidth: 'lg' }}>
          Odkryj piękno i historię miasta Radzyń Podlaski i powiatu radzyńskiego. 
          Nasza strona jest Twoim przewodnikiem po lokalnych atrakcjach, 
          wydarzeniach i usługach.
        </Typography>
      </Container>

      {/* Dashboard */}
      <DashboardProvider initialWidgets={dashboardWidgets}>
        <Dashboard widgets={dashboardWidgets} />
      </DashboardProvider>
    </div>
  );
}