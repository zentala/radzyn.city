'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  Grid,
  Chip,
  Stack,
  Divider,
  Sheet,
  Card,
  Table,
  Button,
  List,
  ListItem,
  ListItemContent,
  IconButton
} from '@mui/joy';
import { Rating } from '@mui/material';
import { locations, CATEGORY_COLORS } from '@/utils/locationData';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LanguageIcon from '@mui/icons-material/Language';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Map from '@/components/Map';

export default function PlaceDetailPage({ params }: { params: { id: string } }) {
  const [place, setPlace] = useState(null);
  const router = useRouter();
  
  useEffect(() => {
    const foundPlace = locations.find(loc => loc.id === params.id);
    
    if (foundPlace) {
      setPlace(foundPlace);
    } else {
      router.push('/places');
    }
  }, [params.id, router]);
  
  if (!place) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography level="h4">Ładowanie...</Typography>
      </Box>
    );
  }
  
  // Map the days of the week in Polish for the opening hours
  const daysInPolish = {
    monday: 'Poniedziałek',
    tuesday: 'Wtorek',
    wednesday: 'Środa',
    thursday: 'Czwartek',
    friday: 'Piątek',
    saturday: 'Sobota',
    sunday: 'Niedziela'
  };
  
  return (
    <Box>
      <Button
        startDecorator={<ArrowBackIcon />}
        variant="plain"
        onClick={() => router.push('/places')}
        sx={{ mb: 2 }}
      >
        Powrót do listy
      </Button>

      <Card sx={{ mb: 4, overflow: 'hidden' }}>
        <Box sx={{ 
          height: 300, 
          position: 'relative', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'flex-end'
        }}>
          {place.imageUrl ? (
            <Box 
              sx={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                width: '100%', 
                height: '100%',
                backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.7)), url(${place.imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                zIndex: 0
              }} 
            />
          ) : (
            <Box 
              sx={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                width: '100%', 
                height: '100%',
                bgcolor: 'rgba(0,0,0,0.6)',
                zIndex: 0
              }} 
            />
          )}
          
          <Box sx={{ 
            position: 'relative', 
            zIndex: 1, 
            p: 3, 
            width: '100%',
            color: 'white'
          }}>
            <Chip
              sx={{
                bgcolor: CATEGORY_COLORS[place.category] || CATEGORY_COLORS.default,
                color: 'white',
                mb: 2
              }}
            >
              {place.category}
            </Chip>
            <Typography level="h2" component="h1" sx={{ mb: 2 }}>
              {place.name}
            </Typography>
            {place.rating && (
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Rating value={place.rating} precision={0.1} readOnly />
                <Typography level="body-md" sx={{ ml: 1, fontWeight: 'bold' }}>
                  {place.rating.toFixed(1)}
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Card>
      
      <Grid container spacing={4}>
        <Grid xs={12} md={8}>
          <Card sx={{ p: 3, mb: 4 }}>
            <Typography level="h3" component="h2" sx={{ mb: 2 }}>
              O miejscu
            </Typography>
            <Typography level="body-md" sx={{ mb: 2 }}>
              {place.description}
            </Typography>

            {place.amenities && place.amenities.length > 0 && (
              <Box sx={{ mt: 3 }}>
                <Typography level="h4" sx={{ mb: 2 }}>
                  Udogodnienia
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {place.amenities.map((amenity, index) => (
                    <Chip
                      key={index}
                      variant="outlined"
                      sx={{ mb: 1 }}
                    >
                      {amenity}
                    </Chip>
                  ))}
                </Stack>
              </Box>
            )}
          </Card>
          
          {place.reviews && place.reviews.length > 0 && (
            <Card sx={{ p: 3, mb: 4 }}>
              <Typography level="h3" component="h2" sx={{ mb: 2 }}>
                Opinie
              </Typography>

              <List>
                {place.reviews.map((review) => (
                  <Box key={review.id}>
                    <ListItem sx={{ px: 0, alignItems: 'flex-start' }}>
                      <ListItemContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                          <Typography level="title-md">
                            {review.author}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Rating value={review.rating} precision={0.5} readOnly size="small" />
                            <Typography level="body-sm" sx={{ ml: 1, color: 'text.secondary' }}>
                              {review.date}
                            </Typography>
                          </Box>
                        </Box>
                        <Typography level="body-sm" sx={{ mt: 1 }}>
                          {review.comment}
                        </Typography>
                      </ListItemContent>
                    </ListItem>
                    <Divider sx={{ my: 2 }} />
                  </Box>
                ))}
              </List>
            </Card>
          )}
          
          <Card sx={{ p: 3, mb: 4 }}>
            <Typography level="h3" component="h2" sx={{ mb: 2 }}>
              Lokalizacja
            </Typography>
            <Box sx={{ height: 350, mt: 2 }}>
              <Map
                locations={[place]}
                center={place.position}
                zoom={16}
                height="100%"
              />
            </Box>
          </Card>
        </Grid>

        <Grid xs={12} md={4}>
          <Card sx={{ p: 3, mb: 4 }}>
            <Typography level="h3" component="h2" sx={{ mb: 2 }}>
              Informacje kontaktowe
            </Typography>
            
            <List sx={{ p: 0 }}>
              {place.address && (
                <ListItem sx={{ px: 0 }}>
                  <IconButton size="sm" sx={{ mr: 1 }}>
                    <LocationOnIcon />
                  </IconButton>
                  <ListItemContent>
                    <Typography level="title-sm">Adres</Typography>
                    <Typography level="body-sm">{place.address}</Typography>
                  </ListItemContent>
                </ListItem>
              )}

              {place.phone && (
                <ListItem sx={{ px: 0 }}>
                  <IconButton size="sm" sx={{ mr: 1 }}>
                    <PhoneIcon />
                  </IconButton>
                  <ListItemContent>
                    <Typography level="title-sm">Telefon</Typography>
                    <Typography level="body-sm">
                      <a
                        href={`tel:${place.phone}`}
                        style={{ color: 'inherit', textDecoration: 'none' }}
                      >
                        {place.phone}
                      </a>
                    </Typography>
                  </ListItemContent>
                </ListItem>
              )}

              {place.email && (
                <ListItem sx={{ px: 0 }}>
                  <IconButton size="sm" sx={{ mr: 1 }}>
                    <EmailIcon />
                  </IconButton>
                  <ListItemContent>
                    <Typography level="title-sm">Email</Typography>
                    <Typography level="body-sm">
                      <a
                        href={`mailto:${place.email}`}
                        style={{ color: 'inherit', textDecoration: 'none' }}
                      >
                        {place.email}
                      </a>
                    </Typography>
                  </ListItemContent>
                </ListItem>
              )}

              {place.website && (
                <ListItem sx={{ px: 0 }}>
                  <IconButton size="sm" sx={{ mr: 1 }}>
                    <LanguageIcon />
                  </IconButton>
                  <ListItemContent>
                    <Typography level="title-sm">Strona WWW</Typography>
                    <Typography level="body-sm">
                      <a
                        href={place.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: 'inherit', textDecoration: 'none' }}
                      >
                        {place.website.replace('https://', '')}
                      </a>
                    </Typography>
                  </ListItemContent>
                </ListItem>
              )}
            </List>
          </Card>
          
          {place.openingHours && (
            <Card sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AccessTimeIcon sx={{ mr: 1 }} />
                <Typography level="h3" component="h2">
                  Godziny otwarcia
                </Typography>
              </Box>

              <Table size="sm">
                <tbody>
                  {Object.entries(daysInPolish).map(([day, dayPl]) => {
                    if (place.openingHours[day]) {
                      return (
                        <tr key={day}>
                          <td style={{ fontWeight: 500, paddingTop: '8px', paddingBottom: '8px' }}>
                            {dayPl}
                          </td>
                          <td style={{ textAlign: 'right', paddingTop: '8px', paddingBottom: '8px' }}>
                            {place.openingHours[day]}
                          </td>
                        </tr>
                      );
                    }
                    return null;
                  })}
                </tbody>
              </Table>
            </Card>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}