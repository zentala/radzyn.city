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
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Button,
  Rating,
  List,
  ListItem,
  ListItemText,
  IconButton
} from '@mui/material';
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
        <Typography variant="h6">Ładowanie...</Typography>
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
        startIcon={<ArrowBackIcon />} 
        variant="text" 
        onClick={() => router.push('/places')}
        sx={{ mb: 2 }}
      >
        Powrót do listy
      </Button>
      
      <Paper elevation={1} sx={{ mb: 4, overflow: 'hidden' }}>
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
              label={place.category} 
              sx={{ 
                bgcolor: CATEGORY_COLORS[place.category] || CATEGORY_COLORS.default,
                color: 'white',
                mb: 2
              }} 
            />
            <Typography variant="h3" component="h1" gutterBottom>
              {place.name}
            </Typography>
            {place.rating && (
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Rating value={place.rating} precision={0.1} readOnly />
                <Typography variant="body1" sx={{ ml: 1, fontWeight: 'bold' }}>
                  {place.rating.toFixed(1)}
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Paper>
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Paper elevation={1} sx={{ p: 3, mb: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              O miejscu
            </Typography>
            <Typography variant="body1" paragraph>
              {place.description}
            </Typography>
            
            {place.amenities && place.amenities.length > 0 && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Udogodnienia
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {place.amenities.map((amenity, index) => (
                    <Chip 
                      key={index} 
                      label={amenity} 
                      variant="outlined" 
                      sx={{ mb: 1 }} 
                    />
                  ))}
                </Stack>
              </Box>
            )}
          </Paper>
          
          {place.reviews && place.reviews.length > 0 && (
            <Paper elevation={1} sx={{ p: 3, mb: 4 }}>
              <Typography variant="h5" component="h2" gutterBottom>
                Opinie
              </Typography>
              
              <List>
                {place.reviews.map((review) => (
                  <Box key={review.id}>
                    <ListItem alignItems="flex-start" sx={{ px: 0 }}>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="subtitle1">
                              {review.author}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Rating value={review.rating} precision={0.5} readOnly size="small" />
                              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                                {review.date}
                              </Typography>
                            </Box>
                          </Box>
                        }
                        secondary={
                          <Typography
                            variant="body2"
                            color="text.primary"
                            sx={{ mt: 1 }}
                          >
                            {review.comment}
                          </Typography>
                        }
                      />
                    </ListItem>
                    <Divider sx={{ my: 2 }} />
                  </Box>
                ))}
              </List>
            </Paper>
          )}
          
          <Paper elevation={1} sx={{ p: 3, mb: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom>
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
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper elevation={1} sx={{ p: 3, mb: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Informacje kontaktowe
            </Typography>
            
            <List sx={{ p: 0 }}>
              {place.address && (
                <ListItem sx={{ px: 0 }}>
                  <IconButton size="small" sx={{ mr: 1, bgcolor: 'action.hover' }}>
                    <LocationOnIcon fontSize="small" />
                  </IconButton>
                  <ListItemText 
                    primary="Adres" 
                    secondary={place.address} 
                  />
                </ListItem>
              )}
              
              {place.phone && (
                <ListItem sx={{ px: 0 }}>
                  <IconButton size="small" sx={{ mr: 1, bgcolor: 'action.hover' }}>
                    <PhoneIcon fontSize="small" />
                  </IconButton>
                  <ListItemText 
                    primary="Telefon" 
                    secondary={
                      <a 
                        href={`tel:${place.phone}`} 
                        style={{ color: 'inherit', textDecoration: 'none' }}
                      >
                        {place.phone}
                      </a>
                    } 
                  />
                </ListItem>
              )}
              
              {place.email && (
                <ListItem sx={{ px: 0 }}>
                  <IconButton size="small" sx={{ mr: 1, bgcolor: 'action.hover' }}>
                    <EmailIcon fontSize="small" />
                  </IconButton>
                  <ListItemText 
                    primary="Email" 
                    secondary={
                      <a 
                        href={`mailto:${place.email}`} 
                        style={{ color: 'inherit', textDecoration: 'none' }}
                      >
                        {place.email}
                      </a>
                    } 
                  />
                </ListItem>
              )}
              
              {place.website && (
                <ListItem sx={{ px: 0 }}>
                  <IconButton size="small" sx={{ mr: 1, bgcolor: 'action.hover' }}>
                    <LanguageIcon fontSize="small" />
                  </IconButton>
                  <ListItemText 
                    primary="Strona WWW" 
                    secondary={
                      <a 
                        href={place.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{ color: 'inherit', textDecoration: 'none' }}
                      >
                        {place.website.replace('https://', '')}
                      </a>
                    } 
                  />
                </ListItem>
              )}
            </List>
          </Paper>
          
          {place.openingHours && (
            <Paper elevation={1} sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AccessTimeIcon sx={{ mr: 1 }} />
                <Typography variant="h5" component="h2">
                  Godziny otwarcia
                </Typography>
              </Box>
              
              <TableContainer component={Box}>
                <Table size="small">
                  <TableBody>
                    {Object.entries(daysInPolish).map(([day, dayPl]) => {
                      if (place.openingHours[day]) {
                        return (
                          <TableRow key={day}>
                            <TableCell component="th" scope="row" sx={{ fontWeight: 500, py: 1 }}>
                              {dayPl}
                            </TableCell>
                            <TableCell align="right" sx={{ py: 1 }}>
                              {place.openingHours[day]}
                            </TableCell>
                          </TableRow>
                        );
                      }
                      return null;
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}