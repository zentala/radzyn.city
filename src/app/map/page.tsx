'use client';

import { useState } from 'react';
import { Container, Grid, Typography, Box, Paper } from '@mui/material';
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
      <Typography variant="h4" component="h1" gutterBottom>
        Mapa Radzynia Podlaskiego
      </Typography>
      <Typography variant="subtitle1" gutterBottom sx={{ mb: 4 }}>
        Odkryj najważniejsze miejsca w naszym mieście
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper elevation={2} sx={{ height: '600px', overflow: 'hidden' }}>
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
          <Paper elevation={2} sx={{ height: '600px', overflow: 'hidden' }}>
            <Box sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6" gutterBottom>
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