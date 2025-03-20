'use client';

import { useState } from 'react';
import { Box, Button } from '@mui/material';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { locations } from '@/utils/locationData';
import { LocationPoint } from './Map';
import DashboardWidget from './DashboardWidget';

// Dynamically import the Map component with no SSR to avoid leaflet issues
const Map = dynamic(() => import('./Map'), { ssr: false });

interface CityMapWidgetProps {
  widgetSize?: 'small' | 'medium' | 'large' | 'full';
}

export default function CityMapWidget({ widgetSize = 'medium' }: CityMapWidgetProps) {
  const [selectedLocation, setSelectedLocation] = useState<LocationPoint | null>(null);
  
  // Determine map height based on widget size
  const getMapHeight = () => {
    switch (widgetSize) {
      case 'small': return 200;
      case 'medium': return 300;
      case 'large': return 400;
      case 'full': return 500;
      default: return 300;
    }
  };

  return (
    <DashboardWidget
      title="Mapa miasta"
      subtitle={selectedLocation ? selectedLocation.name : "Punkty zainteresowania"}
      actions={
        <Button component={Link} href="/map" size="small" color="primary">
          Pełna mapa
        </Button>
      }
    >
      <Box sx={{ height: getMapHeight(), width: '100%' }}>
        <Map 
          locations={locations}
          height={getMapHeight()}
          center={selectedLocation ? selectedLocation.position : undefined}
          onMarkerClick={setSelectedLocation}
          selectedLocationId={selectedLocation?.id}
        />
      </Box>
    </DashboardWidget>
  );
}