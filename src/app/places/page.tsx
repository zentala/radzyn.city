'use client';

import { useState, useMemo } from 'react';
import {
  Box,
  Grid,
  Typography,
  Chip,
  Input,
  Stack,
  Select,
  Option,
  Skeleton,
} from '@mui/joy';
import { CATEGORY_COLORS } from '@/utils/locationData';
import { ContentCard } from '@/components/foundation/Card';
import Button from '@/components/foundation/Button';
import Link from 'next/link';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarIcon from '@mui/icons-material/Star';
import { useGuideData } from '@/hooks/useGuideData';

// Create a new component for place card
function PlaceCard({ place }: { place: any }) {
  return (
    <ContentCard
      imageUrl={place.imageUrl}
      imageAlt={place.name}
      imageHeight={180}
      title={place.name}
      metadata={
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          {/* Address */}
          {place.address && (
            <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
              <LocationOnIcon
                sx={{
                  fontSize: '1rem',
                  mr: 0.75,
                  color: 'text.secondary',
                  flexShrink: 0,
                  mt: 0.1
                }}
              />
              <Typography
                level="body-sm"
                sx={{
                  color: 'text.secondary',
                  fontSize: '0.875rem',
                  lineHeight: 1.4
                }}
              >
                {place.address}
              </Typography>
            </Box>
          )}

          {/* Rating - Placeholder for now if not in DTO */}
          {place.rating && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <StarIcon
                sx={{
                  fontSize: '1rem',
                  mr: 0.75,
                  color: 'warning.500',
                }}
              />
              <Typography
                level="body-sm"
                sx={{
                  color: 'text.primary',
                  fontWeight: 500,
                  fontSize: '0.875rem',
                  lineHeight: 1.4
                }}
              >
                {place.rating.toFixed(1)} / 5.0
              </Typography>
            </Box>
          )}
        </Box>
      }
      description={place.description}
      descriptionLines={3}
      imageOverlay={
        <Box sx={{ position: 'absolute', top: 12, left: 12 }}>
          <Chip
            size="sm"
            sx={{
              bgcolor: CATEGORY_COLORS[place.category?.name] || CATEGORY_COLORS.default,
              color: 'white',
              fontWeight: 600,
              px: 1.5,
              py: 0.5,
            }}
          >
            {place.category?.name || 'Inne'}
          </Chip>
        </Box>
      }
      footer={
        <Box sx={{ mt: 'auto', pt: 2 }}>
          {/* Amenities - Placeholder for now if not in DTO */}
          {place.amenities && place.amenities.length > 0 && (
            <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap sx={{ mb: 2 }}>
              {place.amenities.slice(0, 3).map((amenity: string, index: number) => (
                <Chip
                  key={index}
                  size="sm"
                  variant="outlined"
                  sx={{
                    fontSize: '0.7rem',
                    height: 22,
                  }}
                >
                  {amenity}
                </Chip>
              ))}
              {place.amenities.length > 3 && (
                <Chip
                  size="sm"
                  variant="outlined"
                  sx={{
                    fontSize: '0.7rem',
                    height: 22,
                  }}
                >
                  +{place.amenities.length - 3}
                </Chip>
              )}
            </Stack>
          )}

          {/* Button */}
          <Button
            component={Link}
            href={`/places/${place.id}`}
            size="md"
            color="primary"
            variant="solid"
            fullWidth
          >
            Zobacz szczegóły
          </Button>
        </Box>
      }
    />
  );
}

export default function PlacesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const { pois, categories, loading } = useGuideData(categoryFilter === 'all' ? null : categoryFilter);

  // Filter locations based on search query (frontend filter for query, category already filtered by hook/API)
  const filteredPlaces = useMemo(() => {
    return pois.filter(place => {
      const matchesSearch =
        place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (place.description && place.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (place.address && place.address.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesSearch;
    });
  }, [searchQuery, pois]);

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
              <Option value="all">Wszystkie kategorie</Option>
              {categories.map((category) => (
                <Option key={category.slug} value={category.slug}>
                  {category.name}
                </Option>
              ))}
            </Select>
          </Grid>
        </Grid>
      </Box>

      {loading ? (
        <Grid container spacing={3}>
          {[1, 2, 3].map((n) => (
            <Grid key={n} xs={12} sm={6} md={4}>
              <Skeleton variant="rectangular" height={300} />
            </Grid>
          ))}
        </Grid>
      ) : (
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
      )}
    </>
  );
}
