'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import { Box } from '@mui/material';
import DashboardWidget from './DashboardWidget';

export interface LocationPoint {
  id: string;
  name: string;
  description: string;
  position: [number, number]; // [latitude, longitude]
  category: string;
  imageUrl?: string;
}

// Default center position for Radzyń Podlaski, Poland
const DEFAULT_CENTER: [number, number] = [51.7833, 22.6167];
const DEFAULT_ZOOM = 14;

// Create a custom icon that doesn't rely on external images
const customIcon = new Icon({
  iconUrl: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2227%22%20height%3D%2241%22%20viewBox%3D%220%200%2027%2041%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20fill%3D%22%2300A0E3%22%20stroke%3D%22%23FFF%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20d%3D%22M12%2038.5a1.5%201.5%200%201%200%200-3%201.5%201.5%200%200%200%200%203Z%22%3E%3C%2Fpath%3E%3Cpath%20fill%3D%22%2300A0E3%22%20stroke%3D%22%23FFF%22%20stroke-width%3D%222%22%20d%3D%22M12%202a10%2010%200%200%201%2010%2010c0%207-10%2025-10%2025S2%2019%202%2012A10%2010%200%200%201%2012%202Z%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

// Component to handle setting view programmatically
function SetViewOnLoad({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, DEFAULT_ZOOM);
  }, [center, map]);
  return null;
}

interface MapProps {
  locations?: LocationPoint[];
  center?: [number, number];
  zoom?: number;
  height?: string | number;
  isDashboardWidget?: boolean;
  onMarkerClick?: (location: LocationPoint) => void;
  selectedLocationId?: string;
}

function Map({ 
  locations = [],
  center = DEFAULT_CENTER,
  zoom = DEFAULT_ZOOM,
  height = 400,
  isDashboardWidget = false, 
  onMarkerClick,
  selectedLocationId
}: MapProps) {
  const mapContent = (
    <Box sx={{ height, width: '100%', position: 'relative' }}>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <SetViewOnLoad center={center} />
        
        {locations.map((location) => (
          <Marker 
            key={location.id} 
            position={location.position}
            icon={customIcon}
            eventHandlers={{
              click: () => {
                if (onMarkerClick) {
                  onMarkerClick(location);
                }
              }
            }}
          >
            <Popup>
              <div>
                <h3>{location.name}</h3>
                <p>{location.description}</p>
                {location.imageUrl && (
                  <img 
                    src={location.imageUrl} 
                    alt={location.name}
                    style={{ width: '100%', maxHeight: '100px', objectFit: 'cover' }}
                  />
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </Box>
  );

  if (isDashboardWidget) {
    return (
      <DashboardWidget
        title="Mapa miasta"
        subtitle="Punkty zainteresowania"
      >
        {mapContent}
      </DashboardWidget>
    );
  }

  return mapContent;
}

export default Map;