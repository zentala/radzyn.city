'use client';

import { useState } from 'react';
import { 
  List, 
  ListItem, 
  ListItemText, 
  ListItemAvatar, 
  Avatar, 
  Typography, 
  Chip, 
  Box, 
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  useTheme,
  Rating,
  Stack,
  Button
} from '@mui/material';
import Link from 'next/link';
import PlaceIcon from '@mui/icons-material/Place';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ParkIcon from '@mui/icons-material/Park';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import ApartmentIcon from '@mui/icons-material/Apartment';
import PublicIcon from '@mui/icons-material/Public';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import StarIcon from '@mui/icons-material/Star';
import DashboardWidget from './DashboardWidget';
import { LocationPoint } from './Map';
import { CATEGORY_COLORS } from '@/utils/locationData';

interface LocationsListProps {
  locations: LocationPoint[];
  onLocationSelect?: (location: LocationPoint) => void;
  selectedLocationId?: string;
  isDashboardWidget?: boolean;
}

// Helper function to get the appropriate icon for each category
const getCategoryIcon = (category: string) => {
  switch(category) {
    case 'Zabytki':
      return <AccountBalanceIcon />;
    case 'Miejsca publiczne':
      return <PublicIcon />;
    case 'Instytucje':
      return <ApartmentIcon />;
    case 'Rekreacja':
      return <ParkIcon />;
    case 'Kultura':
      return <TheaterComedyIcon />;
    case 'Sport':
      return <SportsSoccerIcon />;
    case 'Gastronomia':
      return <RestaurantIcon />;
    default:
      return <PlaceIcon />;
  }
};

function LocationsList({ 
  locations, 
  onLocationSelect, 
  selectedLocationId,
  isDashboardWidget = false 
}: LocationsListProps) {
  const theme = useTheme();
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  
  // Extract unique categories
  const categories = ['all', ...new Set(locations.map(loc => loc.category))];
  
  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategoryFilter(event.target.value);
  };
  
  const filteredLocations = categoryFilter === 'all' 
    ? locations 
    : locations.filter(loc => loc.category === categoryFilter);

  const listContent = (
    <>
      <Box sx={{ mb: 2 }}>
        <FormControl fullWidth size="small">
          <InputLabel id="category-filter-label">Kategoria</InputLabel>
          <Select
            labelId="category-filter-label"
            value={categoryFilter}
            label="Kategoria"
            onChange={handleCategoryChange}
          >
            <MenuItem value="all" sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1 
            }}>
              <PlaceIcon sx={{ color: theme.palette.grey[700] }} />
              <span>Wszystkie kategorie</span>
            </MenuItem>
            
            {categories.filter(c => c !== 'all').map((category) => (
              <MenuItem 
                key={category} 
                value={category}
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 1 
                }}
              >
                <Box sx={{ 
                  color: CATEGORY_COLORS[category] || CATEGORY_COLORS.default 
                }}>
                  {getCategoryIcon(category)}
                </Box>
                <span>{category}</span>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <List sx={{ maxHeight: isDashboardWidget ? '300px' : 'auto', overflow: 'auto' }}>
        {filteredLocations.map((location, index) => (
          <Box key={location.id}>
            <ListItem 
              alignItems="flex-start"
              selected={location.id === selectedLocationId}
              onClick={() => onLocationSelect && onLocationSelect(location)}
              sx={{ 
                cursor: onLocationSelect ? 'pointer' : 'default',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)'
                },
                borderLeft: location.id === selectedLocationId 
                  ? `4px solid ${CATEGORY_COLORS[location.category] || CATEGORY_COLORS.default}`
                  : '4px solid transparent',
                transition: 'all 0.2s ease'
              }}
            >
              <ListItemAvatar>
                <Avatar sx={{ 
                  bgcolor: CATEGORY_COLORS[location.category] || CATEGORY_COLORS.default
                }}>
                  {getCategoryIcon(location.category)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography 
                    variant="subtitle1" 
                    component="span"
                    sx={{
                      fontWeight: location.id === selectedLocationId ? 600 : 500,
                    }}
                  >
                    {location.name}
                  </Typography>
                }
                secondary={
                  <>
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.primary"
                      sx={{ 
                        display: 'block', 
                        mb: 0.5,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        lineHeight: 1.3
                      }}
                    >
                      {location.description}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1, mb: 0.5 }}>
                      <Chip 
                        label={location.category} 
                        size="small"
                        sx={{ 
                          backgroundColor: CATEGORY_COLORS[location.category] || CATEGORY_COLORS.default,
                          color: 'white',
                          fontWeight: 500,
                          fontSize: '0.7rem'
                        }}
                      />
                      
                      {location.rating && (
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Rating value={location.rating} precision={0.5} readOnly size="small" />
                          <Typography variant="caption" sx={{ ml: 0.5 }}>
                            {location.rating.toFixed(1)}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                    
                    {location.address && (
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        fontSize: '0.75rem',
                        mb: 0.5,
                        color: 'text.secondary'
                      }}>
                        <LocationOnIcon fontSize="inherit" sx={{ mr: 0.5 }} />
                        <Typography variant="caption" noWrap>
                          {location.address}
                        </Typography>
                      </Box>
                    )}
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 0.5 }}>
                      {location.amenities && location.amenities.length > 0 && (
                        <Stack direction="row" spacing={0.5}>
                          {location.amenities.slice(0, 2).map((amenity, index) => (
                            <Chip
                              key={index}
                              label={amenity}
                              variant="outlined"
                              size="small"
                              sx={{ 
                                fontSize: '0.65rem',
                                height: '20px' 
                              }}
                            />
                          ))}
                          {location.amenities.length > 2 && (
                            <Chip
                              label={`+${location.amenities.length - 2}`}
                              variant="outlined"
                              size="small"
                              sx={{ 
                                fontSize: '0.65rem',
                                height: '20px' 
                              }}
                            />
                          )}
                        </Stack>
                      )}
                      
                      <Button
                        component={Link}
                        href={`/places/${location.id}`}
                        size="small"
                        sx={{ 
                          fontSize: '0.7rem',
                          ml: 'auto'
                        }}
                      >
                        Szczegóły
                      </Button>
                    </Box>
                  </>
                }
              />
            </ListItem>
            {index < filteredLocations.length - 1 && <Divider variant="inset" component="li" />}
          </Box>
        ))}
        {filteredLocations.length === 0 && (
          <Typography variant="body2" sx={{ p: 2, textAlign: 'center' }}>
            Brak lokalizacji w wybranej kategorii
          </Typography>
        )}
      </List>
    </>
  );

  if (isDashboardWidget) {
    return (
      <DashboardWidget
        title="Miejsca"
        subtitle="Punkty zainteresowania"
      >
        {listContent}
      </DashboardWidget>
    );
  }

  return listContent;
}

export default LocationsList;