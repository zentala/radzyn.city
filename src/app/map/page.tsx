'use client';

import { useState } from 'react';
import { Container, Grid, Typography, Box, Paper } from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import dynamic from 'next/dynamic';
import { locations } from '@/utils/locationData';
import { LocationPoint } from '@/components/Map';

// Dynamically import the Map component with no SSR to avoid leaflet issues
const Map = dynamic(() => import('@/components/Map'), { ssr: false });
const LocationsList = dynamic(() => import('@/components/LocationsList'), { ssr: false });

export default function MapPage() {
  const [selectedLocation, setSelectedLocation] = useState<LocationPoint | null>(null);
  
  const handleLocationSelect = (location: LocationPoint) => {
    setSelectedLocation(location);
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 8 }}>
      <Box sx={{ 
        mb: 4, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: { xs: 'center', md: 'flex-start' } 
      }}>
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom
          sx={{ 
            fontWeight: 700, 
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -8,
              left: 0,
              width: '80px',
              height: '4px',
              backgroundColor: 'primary.main',
              borderRadius: '2px'
            }
          }}
        >
          Mapa Radzynia Podlaskiego
        </Typography>
        <Typography 
          variant="subtitle1" 
          sx={{ 
            mb: 2, 
            maxWidth: '800px',
            color: 'text.secondary',
            textAlign: { xs: 'center', md: 'left' }
          }}
        >
          Odkryj najważniejsze miejsca w naszym mieście - zabytki, instytucje publiczne, 
          obiekty rekreacyjne i rozrywkowe. Zapoznaj się z naszymi lokalnymi atrakcjami!
        </Typography>
      </Box>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper 
            elevation={3} 
            sx={{ 
              height: '600px', 
              overflow: 'hidden',
              borderRadius: '12px',
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: 6
              }
            }}
          >
            <Map 
              locations={locations}
              height="600px"
              center={selectedLocation ? selectedLocation.position : undefined}
              onMarkerClick={handleLocationSelect}
              selectedLocationId={selectedLocation?.id}
            />
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper 
            elevation={3} 
            sx={{ 
              height: '600px', 
              overflow: 'hidden',
              borderRadius: '12px',
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: 6
              }
            }}
          >
            <Box sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Typography 
                variant="h6" 
                gutterBottom
                sx={{ 
                  fontWeight: 600, 
                  display: 'flex', 
                  alignItems: 'center',
                  gap: 1,
                  mb: 2
                }}
              >
                <PlaceIcon sx={{ color: 'primary.main' }} />
                Punkty zainteresowania
              </Typography>
              <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
                <LocationsList 
                  locations={locations} 
                  onLocationSelect={handleLocationSelect}
                  selectedLocationId={selectedLocation?.id}
                />
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}