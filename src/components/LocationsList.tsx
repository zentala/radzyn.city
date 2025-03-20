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
  SelectChangeEvent
} from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import DashboardWidget from './DashboardWidget';
import { LocationPoint } from './Map';

interface LocationsListProps {
  locations: LocationPoint[];
  onLocationSelect?: (location: LocationPoint) => void;
  selectedLocationId?: string;
  isDashboardWidget?: boolean;
}

function LocationsList({ 
  locations, 
  onLocationSelect, 
  selectedLocationId,
  isDashboardWidget = false 
}: LocationsListProps) {
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
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category === 'all' ? 'Wszystkie' : category}
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
                }
              }}
            >
              <ListItemAvatar>
                <Avatar>
                  <PlaceIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="subtitle1" component="span">
                    {location.name}
                  </Typography>
                }
                secondary={
                  <>
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.primary"
                      sx={{ display: 'block', mb: 0.5 }}
                    >
                      {location.description}
                    </Typography>
                    <Chip 
                      label={location.category} 
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
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