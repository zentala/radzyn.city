'use client';

import { useState, useMemo } from 'react';
import {
  Box,
  Grid,
  Card,
  CardCover,
  CardContent,
  Typography,
  Chip,
  CardActions,
  Button,
  Input,
  Stack,
  Select,
} from '@mui/joy';
import { locations, CATEGORY_COLORS } from '@/utils/locationData';
import PlaceholderImage from '@/components/PlaceholderImage';
import Link from 'next/link';

// Create a new component for place card
function PlaceCard({ place }) {
  return (
    <Card sx={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      transition: 'transform 0.2s, box-shadow 0.2s',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: 'lg',
      }
    }}>
      {place.imageUrl ? (
        <CardCover component="img" src={place.imageUrl} alt={place.name} />
      ) : (
        <PlaceholderImage height={160} />
      )}

      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
        <Box sx={{ mb: 1 }}>
          <Chip
            label={place.category}
            size="sm"
            sx={{
              bgcolor: CATEGORY_COLORS[place.category] || CATEGORY_COLORS.default,
              color: 'white',
              mb: 1
            }}
          />
        </Box>

        <Typography level="h3" sx={{ mb: 1 }}>
          {place.name}
        </Typography>

        <Typography level="body-sm" sx={{ color: 'text.secondary', mb: 2 }}>
          {place.description.length > 120
            ? `${place.description.substring(0, 120)}...`
            : place.description}
        </Typography>

        {place.address && (
          <Typography level="body-sm" sx={{ color: 'text.secondary', mb: 1 }}>
            <strong>Adres:</strong> {place.address}
          </Typography>
        )}

        {place.rating && (
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Typography level="body-sm" sx={{ color: 'warning.500' }}>
              {'⭐'.repeat(Math.floor(place.rating))}
            </Typography>
            <Typography level="body-sm" sx={{ ml: 0.5, color: 'text.secondary' }}>
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
                  size="sm"
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
                  size="sm"
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
          size="sm"
          color="primary"
          variant="solid"
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

  // Get unique categories for filter
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(locations.map(place => place.category))];
    return ['all', ...uniqueCategories.sort()];
  }, []);

  // Filter locations based on search query and category
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
          <Grid xs={12} md={6}>
            <Input
              fullWidth
              placeholder="Szukaj miejsc"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Grid>
          <Grid xs={12} md={6}>
            <Select
              value={categoryFilter}
              onChange={(_, value) => setCategoryFilter(value as string)}
              placeholder="Kategoria"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === 'all' ? 'Wszystkie kategorie' : category}
                </option>
              ))}
            </Select>
          </Grid>
        </Grid>
      </Box>

      <Grid container spacing={3}>
        {filteredPlaces.map((place) => (
          <Grid key={place.id} xs={12} sm={6} md={4}>
            <PlaceCard place={place} />
          </Grid>
        ))}

        {filteredPlaces.length === 0 && (
          <Grid xs={12}>
            <Box
              sx={{
                p: 4,
                textAlign: 'center',
                bgcolor: 'background.surface',
                borderRadius: 'md'
              }}
            >
              <Typography level="h4" sx={{ mb: 1 }}>
                Nie znaleziono miejsc
              </Typography>
              <Typography level="body-md" sx={{ color: 'text.secondary' }}>
                Spróbuj zmienić kryteria wyszukiwania lub filtr kategorii.
              </Typography>
            </Box>
          </Grid>
        )}
      </Grid>
    </>
  );
}
