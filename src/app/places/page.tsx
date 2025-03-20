'use client';

import { useState, useMemo } from 'react';
import { 
  Box, 
  Grid, 
  Card, 
  CardMedia, 
  CardContent, 
  Typography, 
  Chip, 
  CardActions,
  Button,
  TextField,
  Stack,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Rating
} from '@mui/material';
import { locations, CATEGORY_COLORS } from '@/utils/locationData';
import PlaceholderImage from '@/components/PlaceholderImage';
import Link from 'next/link';

// Create a new component for the place card
function PlaceCard({ place }) {
  return (
    <Card sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      transition: 'transform 0.2s, box-shadow 0.2s',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: 6
      }
    }}>
      {place.imageUrl ? (
        <CardMedia
          component="img"
          height="160"
          image={place.imageUrl}
          alt={place.name}
        />
      ) : (
        <PlaceholderImage height={160} />
      )}
      
      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
        <Box sx={{ mb: 1 }}>
          <Chip 
            label={place.category} 
            size="small" 
            sx={{ 
              bgcolor: CATEGORY_COLORS[place.category] || CATEGORY_COLORS.default,
              color: 'white',
              mb: 1
            }} 
          />
        </Box>
        
        <Typography variant="h6" component="h2" gutterBottom>
          {place.name}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {place.description.length > 120 
            ? `${place.description.substring(0, 120)}...` 
            : place.description}
        </Typography>
        
        {place.address && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            <strong>Adres:</strong> {place.address}
          </Typography>
        )}
        
        {place.rating && (
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Rating value={place.rating} precision={0.1} readOnly size="small" />
            <Typography variant="body2" sx={{ ml: 1 }}>
              {place.rating.toFixed(1)}
            </Typography>
          </Box>
        )}
        
        {place.amenities && place.amenities.length > 0 && (
          <Box sx={{ mt: 2 }}>
            <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
              {place.amenities.slice(0, 3).map((amenity, index) => (
                <Chip 
                  key={index} 
                  label={amenity} 
                  size="small" 
                  variant="outlined"
                  sx={{ 
                    fontSize: '0.7rem', 
                    height: 22, 
                    mb: 0.5,
                  }} 
                />
              ))}
              {place.amenities.length > 3 && (
                <Chip 
                  label={`+${place.amenities.length - 3}`} 
                  size="small" 
                  variant="outlined"
                  sx={{ 
                    fontSize: '0.7rem', 
                    height: 22, 
                    mb: 0.5,
                  }} 
                />
              )}
            </Stack>
          </Box>
        )}
      </CardContent>
      
      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button 
          component={Link}
          href={`/places/${place.id}`}
          size="small" 
          color="primary"
          variant="contained"
          fullWidth
        >
          Szczegóły
        </Button>
      </CardActions>
    </Card>
  );
}

export default function PlacesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  
  // Get unique categories for the filter
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(locations.map(place => place.category))];
    return ['all', ...uniqueCategories.sort()];
  }, []);
  
  // Filter the locations based on search query and category
  const filteredPlaces = useMemo(() => {
    return locations.filter(place => {
      const matchesSearch = 
        place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (place.address && place.address.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (place.amenities && place.amenities.some(amenity => 
          amenity.toLowerCase().includes(searchQuery.toLowerCase())
        ));
      
      const matchesCategory = categoryFilter === 'all' || place.category === categoryFilter;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, categoryFilter]);
  
  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Szukaj miejsc"
              variant="outlined"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Nazwa, opis, adres..."
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="category-filter-label">Kategoria</InputLabel>
              <Select
                labelId="category-filter-label"
                id="category-filter"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                label="Kategoria"
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category === 'all' ? 'Wszystkie kategorie' : category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
      
      <Grid container spacing={3}>
        {filteredPlaces.map((place) => (
          <Grid item key={place.id} xs={12} sm={6} md={4}>
            <PlaceCard place={place} />
          </Grid>
        ))}
        
        {filteredPlaces.length === 0 && (
          <Grid item xs={12}>
            <Box 
              sx={{ 
                p: 4, 
                textAlign: 'center',
                bgcolor: 'background.paper',
                borderRadius: 1
              }}
            >
              <Typography variant="h6" gutterBottom>
                Nie znaleziono miejsc
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Spróbuj zmienić kryteria wyszukiwania lub filtr kategorii.
              </Typography>
            </Box>
          </Grid>
        )}
      </Grid>
    </>
  );
}