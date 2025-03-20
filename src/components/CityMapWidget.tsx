'use client';

import { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { locations, CATEGORY_COLORS } from '@/utils/locationData';
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
        <Button 
          component={Link} 
          href="/map" 
          size="small" 
          color="primary"
          variant="outlined"
          sx={{ 
            borderRadius: '20px',
            px: 2,
            fontWeight: 500,
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.08)',
            '&:hover': {
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.12)'
            }
          }}
        >
          Pełna mapa
        </Button>
      }
    >
      <Box 
        sx={{ 
          height: getMapHeight(), 
          width: '100%',
          position: 'relative',
          borderRadius: '8px',
          overflow: 'hidden',
          '&::after': selectedLocation ? {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '40px',
            background: 'linear-gradient(to top, rgba(0,0,0,0.2), transparent)',
            pointerEvents: 'none',
            zIndex: 500
          } : {}
        }}
      >
        <Map 
          locations={locations}
          height={getMapHeight()}
          center={selectedLocation ? selectedLocation.position : undefined}
          onMarkerClick={setSelectedLocation}
          selectedLocationId={selectedLocation?.id}
        />
        
        {selectedLocation && (
          <Box sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '10px 16px',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            zIndex: 1000,
            borderTop: '1px solid rgba(0,0,0,0.05)'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box 
                sx={{ 
                  width: 10, 
                  height: 10, 
                  borderRadius: '50%', 
                  backgroundColor: CATEGORY_COLORS[selectedLocation.category] || CATEGORY_COLORS.default 
                }} 
              />
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {selectedLocation.name}
              </Typography>
            </Box>
            <Typography variant="caption" color="text.secondary">
              {selectedLocation.category}
            </Typography>
          </Box>
        )}
      </Box>
    </DashboardWidget>
  );
}