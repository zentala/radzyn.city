'use client';

import ContactForm from '@/components/ContactForm';
import PlaceholderImage from '@/components/PlaceholderImage';
import { 
  Container, 
  Typography, 
  Grid, 
  Box, 
  Paper, 
  Card, 
  CardContent,
  Stack
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export default function ContactPage() {
  
  const contactInfo = [
    {
      name: 'Urząd Miasta Radzyń Podlaski',
      address: 'ul. Warszawska 32, 21-300 Radzyń Podlaski',
      phone: '+48 83 351 24 00',
      email: 'sekretariat@radzyn-podl.pl',
      hours: 'Poniedziałek - Piątek: 7:30 - 15:30',
    },
    {
      name: 'Starostwo Powiatowe w Radzyniu Podlaskim',
      address: 'Pl. I. Potockiego 1, 21-300 Radzyń Podlaski',
      phone: '+48 83 351 85 00',
      email: 'sekretariat@powiatradzynski.pl',
      hours: 'Poniedziałek - Piątek: 7:30 - 15:30',
    },
    {
      name: 'Radzyński Ośrodek Kultury',
      address: 'ul. Jana Pawła II 4, 21-300 Radzyń Podlaski',
      phone: '+48 83 352 73 14',
      email: 'rok@radzyn.pl',
      hours: 'Poniedziałek - Piątek: 8:00 - 20:00, Sobota: 10:00 - 18:00',
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h2" component="h1" sx={{ mb: 6, fontWeight: 'bold' }}>
        Kontakt
      </Typography>
      
      <Box component="section" sx={{ mb: 8 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
              Dane kontaktowe
            </Typography>
            
            <Stack spacing={3}>
              {contactInfo.map((info, index) => (
                <Card key={index} sx={{ boxShadow: 2, borderRadius: 2 }}>
                  <CardContent>
                    <Typography variant="h6" component="h3" sx={{ mb: 2, fontWeight: 600 }}>
                      {info.name}
                    </Typography>
                    
                    <Stack spacing={2}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                        <LocationOnIcon 
                          sx={{ 
                            color: 'primary.main', 
                            mr: 1,
                            mt: 0.3,
                            fontSize: '1.25rem'
                          }} 
                        />
                        <Typography variant="body2">
                          {info.address}
                        </Typography>
                      </Box>
                      
                      <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                        <PhoneIcon 
                          sx={{ 
                            color: 'primary.main', 
                            mr: 1,
                            mt: 0.3,
                            fontSize: '1.25rem'
                          }} 
                        />
                        <Typography variant="body2">
                          {info.phone}
                        </Typography>
                      </Box>
                      
                      <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                        <EmailIcon 
                          sx={{ 
                            color: 'primary.main', 
                            mr: 1,
                            mt: 0.3,
                            fontSize: '1.25rem'
                          }} 
                        />
                        <Typography variant="body2">
                          {info.email}
                        </Typography>
                      </Box>
                      
                      <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                        <AccessTimeIcon 
                          sx={{ 
                            color: 'primary.main', 
                            mr: 1,
                            mt: 0.3,
                            fontSize: '1.25rem'
                          }} 
                        />
                        <Typography variant="body2">
                          {info.hours}
                        </Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
              Formularz kontaktowy
            </Typography>
            <ContactForm />

            <Box sx={{ mt: 6 }}>
              <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
                Mapa
              </Typography>
              <Box sx={{ 
                height: 320, 
                borderRadius: 2,
                overflow: 'hidden'
              }}>
                <PlaceholderImage 
                  title="Mapa Radzynia Podlaskiego"
                  height={320}
                  aspectRatio="landscape"
                  sx={{ width: '100%', height: '100%' }}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}