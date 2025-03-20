'use client';

import { useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon, DivIcon } from 'leaflet';
import { Box, useTheme } from '@mui/material';
import DashboardWidget from './DashboardWidget';
import { CATEGORY_COLORS } from '@/utils/locationData';

export interface LocationPoint {
  id: string;
  name: string;
  description: string;
  position: [number, number]; // [latitude, longitude]
  category: string;
  imageUrl?: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  openingHours?: {
    monday?: string;
    tuesday?: string;
    wednesday?: string;
    thursday?: string;
    friday?: string;
    saturday?: string;
    sunday?: string;
  };
  amenities?: string[];
  rating?: number;
  reviews?: {
    id: string;
    author: string;
    date: string;
    rating: number;
    comment: string;
  }[];
}

// Default center position for Radzyń Podlaski, Poland
const DEFAULT_CENTER: [number, number] = [51.7833, 22.6167];
const DEFAULT_ZOOM = 14;

// Function to create a custom category icon
const createCategoryIcon = (category: string) => {
  const color = CATEGORY_COLORS[category] || CATEGORY_COLORS.default;
  
  // Create an SVG marker with the category color
  const svgString = `
    <svg width="27" height="41" viewBox="0 0 27 41" xmlns="http://www.w3.org/2000/svg">
      <path fill="${color}" stroke="#FFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M12 38.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"></path>
      <path fill="${color}" stroke="#FFF" stroke-width="2" d="M12 2a10 10 0 0 1 10 10c0 7-10 25-10 25S2 19 2 12A10 10 0 0 1 12 2Z"></path>
    </svg>
  `;
  
  // Convert SVG to a data URL
  const encodedSVG = encodeURIComponent(svgString.trim());
  const dataUrl = `data:image/svg+xml;charset=UTF-8,${encodedSVG}`;
  
  return new Icon({
    iconUrl: dataUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });
};

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
  const theme = useTheme();
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
            icon={createCategoryIcon(location.category)}
            eventHandlers={{
              click: () => {
                if (onMarkerClick) {
                  onMarkerClick(location);
                }
              }
            }}
          >
            <Popup>
              <div style={{ 
                minWidth: '250px', 
                maxWidth: '350px',
                padding: '0',
                borderRadius: '8px',
                overflow: 'hidden',
                fontFamily: theme.typography.fontFamily
              }}>
                {location.imageUrl && (
                  <div style={{ 
                    width: '100%', 
                    height: '150px', 
                    backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.7)), url(${location.imageUrl})`, 
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '12px',
                    color: '#fff'
                  }}>
                    <h3 style={{ 
                      margin: '0 0 4px 0', 
                      fontSize: '18px',
                      fontWeight: '600'
                    }}>{location.name}</h3>
                    <div style={{
                      background: CATEGORY_COLORS[location.category],
                      color: '#fff',
                      display: 'inline-block',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: '500',
                      marginBottom: '4px'
                    }}>
                      {location.category}
                    </div>
                  </div>
                )}
                
                {!location.imageUrl && (
                  <>
                    <h3 style={{ 
                      margin: '12px', 
                      marginBottom: '4px',
                      fontSize: '18px',
                      fontWeight: '600',
                      color: CATEGORY_COLORS[location.category]
                    }}>{location.name}</h3>
                    <div style={{
                      background: CATEGORY_COLORS[location.category],
                      color: '#fff',
                      display: 'inline-block',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: '500',
                      margin: '0 12px 8px 12px'
                    }}>
                      {location.category}
                    </div>
                  </>
                )}
                
                <p style={{ 
                  margin: '12px', 
                  color: '#444',
                  fontSize: '14px',
                  lineHeight: '1.5'
                }}>{location.description}</p>
                
                {/* Additional Information */}
                <div style={{ padding: '0 12px 12px 12px' }}>
                  {location.address && (
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'flex-start', 
                      marginBottom: '6px', 
                      fontSize: '13px',
                      color: '#555'
                    }}>
                      <span style={{ 
                        fontWeight: '500', 
                        minWidth: '70px' 
                      }}>Adres:</span>
                      <span>{location.address}</span>
                    </div>
                  )}
                  
                  {location.phone && (
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'flex-start', 
                      marginBottom: '6px',
                      fontSize: '13px',
                      color: '#555'
                    }}>
                      <span style={{ 
                        fontWeight: '500', 
                        minWidth: '70px' 
                      }}>Telefon:</span>
                      <a 
                        href={`tel:${location.phone}`} 
                        style={{ 
                          color: theme.palette.primary.main,
                          textDecoration: 'none'
                        }}
                      >
                        {location.phone}
                      </a>
                    </div>
                  )}
                  
                  {location.email && (
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'flex-start', 
                      marginBottom: '6px',
                      fontSize: '13px',
                      color: '#555'
                    }}>
                      <span style={{ 
                        fontWeight: '500', 
                        minWidth: '70px' 
                      }}>Email:</span>
                      <a 
                        href={`mailto:${location.email}`} 
                        style={{ 
                          color: theme.palette.primary.main,
                          textDecoration: 'none'
                        }}
                      >
                        {location.email}
                      </a>
                    </div>
                  )}
                  
                  {location.website && (
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'flex-start', 
                      marginBottom: '6px',
                      fontSize: '13px',
                      color: '#555'
                    }}>
                      <span style={{ 
                        fontWeight: '500', 
                        minWidth: '70px' 
                      }}>Strona WWW:</span>
                      <a 
                        href={location.website} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        style={{ 
                          color: theme.palette.primary.main,
                          textDecoration: 'none'
                        }}
                      >
                        {location.website.replace('https://', '')}
                      </a>
                    </div>
                  )}
                  
                  {location.openingHours && (
                    <div style={{ 
                      marginTop: '8px', 
                      marginBottom: '8px',
                      fontSize: '13px',
                      color: '#555'
                    }}>
                      <div style={{ 
                        fontWeight: '500', 
                        marginBottom: '4px' 
                      }}>Godziny otwarcia:</div>
                      {location.openingHours.monday && (
                        <div style={{ 
                          display: 'flex', 
                          justifyContent: 'space-between',
                          fontSize: '12px',
                          marginBottom: '2px'
                        }}>
                          <span>Poniedziałek:</span>
                          <span>{location.openingHours.monday}</span>
                        </div>
                      )}
                      {location.openingHours.tuesday && (
                        <div style={{ 
                          display: 'flex', 
                          justifyContent: 'space-between',
                          fontSize: '12px',
                          marginBottom: '2px'
                        }}>
                          <span>Wtorek:</span>
                          <span>{location.openingHours.tuesday}</span>
                        </div>
                      )}
                      {location.openingHours.wednesday && (
                        <div style={{ 
                          display: 'flex', 
                          justifyContent: 'space-between',
                          fontSize: '12px',
                          marginBottom: '2px'
                        }}>
                          <span>Środa:</span>
                          <span>{location.openingHours.wednesday}</span>
                        </div>
                      )}
                      {location.openingHours.thursday && (
                        <div style={{ 
                          display: 'flex', 
                          justifyContent: 'space-between',
                          fontSize: '12px',
                          marginBottom: '2px'
                        }}>
                          <span>Czwartek:</span>
                          <span>{location.openingHours.thursday}</span>
                        </div>
                      )}
                      {location.openingHours.friday && (
                        <div style={{ 
                          display: 'flex', 
                          justifyContent: 'space-between',
                          fontSize: '12px',
                          marginBottom: '2px'
                        }}>
                          <span>Piątek:</span>
                          <span>{location.openingHours.friday}</span>
                        </div>
                      )}
                      {location.openingHours.saturday && (
                        <div style={{ 
                          display: 'flex', 
                          justifyContent: 'space-between',
                          fontSize: '12px',
                          marginBottom: '2px'
                        }}>
                          <span>Sobota:</span>
                          <span>{location.openingHours.saturday}</span>
                        </div>
                      )}
                      {location.openingHours.sunday && (
                        <div style={{ 
                          display: 'flex', 
                          justifyContent: 'space-between',
                          fontSize: '12px',
                          marginBottom: '2px'
                        }}>
                          <span>Niedziela:</span>
                          <span>{location.openingHours.sunday}</span>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {location.amenities && location.amenities.length > 0 && (
                    <div style={{ 
                      marginTop: '8px', 
                      marginBottom: '8px',
                      fontSize: '13px',
                      color: '#555'
                    }}>
                      <div style={{ 
                        fontWeight: '500', 
                        marginBottom: '4px' 
                      }}>Udogodnienia:</div>
                      <div style={{ 
                        display: 'flex', 
                        flexWrap: 'wrap', 
                        gap: '4px',
                        fontSize: '12px'
                      }}>
                        {location.amenities.map((amenity, index) => (
                          <span 
                            key={index} 
                            style={{
                              background: '#eee',
                              padding: '2px 6px',
                              borderRadius: '4px',
                              fontSize: '11px'
                            }}
                          >
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {location.rating && (
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      marginTop: '8px',
                      marginBottom: '6px',
                      fontSize: '13px',
                      color: '#555'
                    }}>
                      <span style={{ 
                        fontWeight: '500', 
                        marginRight: '8px' 
                      }}>Ocena:</span>
                      <div style={{
                        background: '#f5f5f5',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: '700',
                        color: '#333'
                      }}>
                        {location.rating.toFixed(1)}/5.0
                      </div>
                    </div>
                  )}
                </div>
                
                <div style={{
                  padding: '8px 12px',
                  backgroundColor: '#f5f5f5',
                  borderTop: '1px solid #eee',
                  textAlign: 'right'
                }}>
                  <a 
                    href={`/places/${location.id}`}
                    style={{
                      color: theme.palette.primary.main,
                      fontSize: '14px',
                      textDecoration: 'none',
                      fontWeight: '500'
                    }}
                  >
                    Zobacz więcej
                  </a>
                </div>
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