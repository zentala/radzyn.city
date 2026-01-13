'use client';

import { useState, useMemo } from 'react';
import { Box, Typography, Skeleton } from '@mui/joy';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { CATEGORY_COLORS } from '@/utils/locationData';
import { LocationPoint } from './Map';
import SectionWrapper from './SectionWrapper';
import Button from './foundation/Button';
import MapIcon from '@mui/icons-material/Map';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useGuideData } from '@/hooks/useGuideData';

// Dynamically import the Map component with no SSR to avoid leaflet issues
const Map = dynamic(() => import('./Map'), { ssr: false });

interface CityMapWidgetProps {
  widgetSize?: 'small' | 'medium' | 'large' | 'full';
}

export default function CityMapWidget({ widgetSize = 'medium' }: CityMapWidgetProps) {
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(null);
  const { pois, loading } = useGuideData();

  const mapLocations = useMemo(() => {
    return pois.map(p => ({
      id: p.id,
      name: p.name,
      position: [p.coordinates[1], p.coordinates[0]] as [number, number],
      category: p.category?.name || 'Inne',
      description: p.description
    }));
  }, [pois]);

  const selectedLocation = useMemo(() => {
    return mapLocations.find(l => l.id === selectedLocationId) || null;
  }, [mapLocations, selectedLocationId]);
  
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
    <SectionWrapper
      title="Mapa miasta"
      actions={
        <Button
          component={Link}
          href="/map"
          variant="soft"
          size="md"
          startDecorator={<MapIcon />}
          endDecorator={<ArrowForwardIcon />}
          sx={{
            px: 3,
            py: 1.5,
            fontSize: '0.95rem',
          }}
        >
          Pełna mapa
        </Button>
      }
    >
      <Box>
        {selectedLocation && (
          <Typography level="body-sm" sx={{ mb: 2, color: 'text.secondary' }}>
            {selectedLocation.name}
          </Typography>
        )}
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
          {loading ? (
            <Skeleton variant="rectangular" height={getMapHeight()} />
          ) : (
            <Map
              locations={mapLocations}
              height={getMapHeight()}
              center={selectedLocation ? selectedLocation.position : undefined}
              onMarkerClick={(loc: LocationPoint) => setSelectedLocationId(loc.id)}
              selectedLocationId={selectedLocationId || undefined}
            />
          )}

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
                <Typography level="body-sm" sx={{ fontWeight: 600 }}>
                  {selectedLocation.name}
                </Typography>
              </Box>
              <Typography level="body-xs" sx={{ color: 'text.secondary' }}>
                {selectedLocation.category}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </SectionWrapper>
  );
}
