'use client';

import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Card, 
  CardContent, 
  CardHeader, 
  Divider, 
  Grid, 
  Paper, 
  TextField, 
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Tab,
  Tabs,
  AppBar,
  Toolbar,
  IconButton,
} from '@mui/material';
import { 
  Home as HomeIcon, 
  Mail as MailIcon, 
  Info as InfoIcon, 
  LocationOn as LocationIcon,
  Palette as PaletteIcon
} from '@mui/icons-material';
import { theme, getCategoryColor } from '@/theme';

export default function ThemeDemo() {
  const [tabValue, setTabValue] = React.useState(0);

  // Sample colors from the theme
  const colors = [
    { name: 'Primary', color: theme.palette.primary.main, text: theme.palette.primary.contrastText },
    { name: 'Primary Light', color: theme.palette.primary.light, text: theme.palette.primary.contrastText },
    { name: 'Primary Dark', color: theme.palette.primary.dark, text: theme.palette.primary.contrastText },
    { name: 'Secondary', color: theme.palette.secondary.main, text: theme.palette.secondary.contrastText },
    { name: 'Secondary Light', color: theme.palette.secondary.light, text: theme.palette.secondary.contrastText },
    { name: 'Secondary Dark', color: theme.palette.secondary.dark, text: theme.palette.secondary.contrastText },
    { name: 'Error', color: theme.palette.error.main, text: '#FFF' },
    { name: 'Warning', color: theme.palette.warning.main, text: '#FFF' },
    { name: 'Info', color: theme.palette.info.main, text: '#FFF' },
    { name: 'Success', color: theme.palette.success.main, text: '#FFF' },
  ];

  return (
    <Container maxWidth="xl" sx={{ my: 5 }}>
      <Typography variant="h2" component="h1" gutterBottom>
        Klasyczno-Nowoczesny Motyw Radzynia Podlaskiego
      </Typography>
      <Typography variant="subtitle1" paragraph>
        Prezentacja motywu łączącego klasyczną elegancję z nowoczesnymi akcentami, inspirowanego bogatą historią i architekturą miasta.
      </Typography>

      <Divider sx={{ my: 4 }} />

      {/* Color Palette Section */}
      <Typography variant="h3" component="h2" gutterBottom>
        Paleta Kolorów
      </Typography>
      <Grid container spacing={3} sx={{ mb: 6 }}>
        {colors.map((item) => (
          <Grid item xs={6} sm={4} md={3} lg={2} key={item.name}>
            <Paper 
              elevation={3} 
              sx={{ 
                height: 120, 
                display: 'flex', 
                flexDirection: 'column',
                overflow: 'hidden',
                borderRadius: 2
              }}
            >
              <Box sx={{ 
                height: 80, 
                backgroundColor: item.color, 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Typography sx={{ color: item.text, fontWeight: 'bold' }}>
                  {item.color}
                </Typography>
              </Box>
              <Box sx={{ p: 1, textAlign: 'center' }}>
                <Typography variant="body2" fontWeight="medium">
                  {item.name}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Category Colors */}
      <Typography variant="h4" component="h3" gutterBottom>
        Kolory Kategorii
      </Typography>
      <Grid container spacing={2} sx={{ mb: 6 }}>
        {['Zabytki', 'Kultura', 'Sport', 'Gastronomia', 'Rekreacja', 'Instytucje', 'Miejsca publiczne'].map((category) => (
          <Grid item key={category}>
            <Chip 
              label={category} 
              sx={{ 
                backgroundColor: getCategoryColor(category),
                color: '#fff',
                fontWeight: 'medium',
                px: 1
              }} 
            />
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 4 }} />

      {/* Typography Section */}
      <Typography variant="h3" component="h2" gutterBottom>
        Typografia
      </Typography>
      <Paper elevation={2} sx={{ p: 3, mb: 6 }}>
        <Typography variant="h1" gutterBottom>H1 - Playfair Display</Typography>
        <Typography variant="h2" gutterBottom>H2 - Playfair Display</Typography>
        <Typography variant="h3" gutterBottom>H3 - Playfair Display</Typography>
        <Typography variant="h4" gutterBottom>H4 - Playfair Display</Typography>
        <Typography variant="h5" gutterBottom>H5 - Playfair Display</Typography>
        <Typography variant="h6" gutterBottom>H6 - Playfair Display</Typography>
        <Typography variant="subtitle1" gutterBottom>Subtitle 1 - Cormorant Garamond</Typography>
        <Typography variant="subtitle2" gutterBottom>Subtitle 2 - Cormorant Garamond</Typography>
        <Typography variant="body1" paragraph>
          Body 1 - Cormorant Garamond. Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Vestibulum id ligula porta felis euismod semper. Donec ullamcorper nulla non metus auctor fringilla.
        </Typography>
        <Typography variant="body2" paragraph>
          Body 2 - Cormorant Garamond. Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Vestibulum id ligula porta felis euismod semper. Donec ullamcorper nulla non metus auctor fringilla.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Button variant="text">Button Text - Montserrat</Button>
          <Typography variant="caption">Caption - Montserrat</Typography>
          <Typography variant="overline">Overline - Montserrat</Typography>
        </Box>
      </Paper>

      <Divider sx={{ my: 4 }} />

      {/* Components Section */}
      <Typography variant="h3" component="h2" gutterBottom>
        Komponenty
      </Typography>

      {/* Buttons */}
      <Typography variant="h4" gutterBottom>Przyciski</Typography>
      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
          <Button variant="contained" color="primary">Primary</Button>
          <Button variant="contained" color="secondary">Secondary</Button>
          <Button variant="contained" color="error">Error</Button>
          <Button variant="contained" color="warning">Warning</Button>
          <Button variant="contained" color="info">Info</Button>
          <Button variant="contained" color="success">Success</Button>
        </Box>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
          <Button variant="outlined" color="primary">Primary</Button>
          <Button variant="outlined" color="secondary">Secondary</Button>
          <Button variant="outlined" color="error">Error</Button>
          <Button variant="outlined" color="warning">Warning</Button>
          <Button variant="outlined" color="info">Info</Button>
          <Button variant="outlined" color="success">Success</Button>
        </Box>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Button variant="text" color="primary">Primary</Button>
          <Button variant="text" color="secondary">Secondary</Button>
          <Button variant="text" color="error">Error</Button>
          <Button variant="text" color="warning">Warning</Button>
          <Button variant="text" color="info">Info</Button>
          <Button variant="text" color="success">Success</Button>
        </Box>
      </Paper>

      {/* Cards */}
      <Typography variant="h4" gutterBottom>Karty</Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader 
              title="Pałac Potockich" 
              subheader="Zabytek Barokowy"
              avatar={
                <Avatar sx={{ bgcolor: theme.palette.secondary.main }}>P</Avatar>
              }
            />
            <CardContent>
              <Typography variant="body1">
                Barokowy pałac wzniesiony w XVIII wieku, jedna z najważniejszych 
                atrakcji turystycznych Radzynia Podlaskiego.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader 
              title="Park Miejski" 
              subheader="Park w stylu angielskim"
              avatar={
                <Avatar sx={{ bgcolor: theme.palette.success.main }}>P</Avatar>
              }
            />
            <CardContent>
              <Typography variant="body1">
                Zabytkowy park w stylu angielskim, pełen malowniczych ścieżek 
                i starodrzewu, idealny na spacery w każdej porze roku.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader 
              title="Kościół św. Trójcy" 
              subheader="Zabytek sakralny"
              avatar={
                <Avatar sx={{ bgcolor: theme.palette.error.main }}>K</Avatar>
              }
            />
            <CardContent>
              <Typography variant="body1">
                Barokowy kościół z okresu świetności miasta, ozdobiony bogatymi 
                zdobieniami i freskami charakterystycznymi dla epoki.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Typography variant="h4" gutterBottom>Zakładki</Typography>
      <Paper sx={{ mb: 4 }}>
        <Tabs 
          value={tabValue} 
          onChange={(e, newValue) => setTabValue(newValue)}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          sx={{ mb: 2 }}
        >
          <Tab label="Historia" icon={<InfoIcon />} iconPosition="start" />
          <Tab label="Zabytki" icon={<LocationIcon />} iconPosition="start" />
          <Tab label="Paleta" icon={<PaletteIcon />} iconPosition="start" />
        </Tabs>
        <Box sx={{ p: 3 }}>
          {tabValue === 0 && (
            <Typography variant="body1">
              Radzyń Podlaski może poszczycić się bogatą historią sięgającą średniowiecza. 
              Największy rozkwit miasta przypadł na okres baroku, kiedy to powstał wspaniały 
              zespół pałacowo-parkowy.
            </Typography>
          )}
          {tabValue === 1 && (
            <List>
              <ListItem>
                <ListItemIcon><LocationIcon color="secondary" /></ListItemIcon>
                <ListItemText primary="Pałac Potockich" secondary="Perła architektury barokowej" />
              </ListItem>
              <ListItem>
                <ListItemIcon><LocationIcon color="error" /></ListItemIcon>
                <ListItemText primary="Kościół św. Trójcy" secondary="Zabytkowa świątynia" />
              </ListItem>
              <ListItem>
                <ListItemIcon><LocationIcon color="success" /></ListItemIcon>
                <ListItemText primary="Park Miejski" secondary="Park w stylu angielskim" />
              </ListItem>
            </List>
          )}
          {tabValue === 2 && (
            <Grid container spacing={2}>
              {colors.slice(0, 6).map((item) => (
                <Grid item xs={4} key={item.name}>
                  <Box sx={{ 
                    height: 60, 
                    backgroundColor: item.color, 
                    borderRadius: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Typography sx={{ color: item.text, fontWeight: 'medium' }}>
                      {item.name}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Paper>

      {/* AppBar */}
      <Typography variant="h4" gutterBottom>Pasek Aplikacji</Typography>
      <AppBar position="static" sx={{ mb: 4 }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <HomeIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Radzyń Podlaski
          </Typography>
          <Button color="inherit">O Mieście</Button>
          <Button color="inherit">Zabytki</Button>
          <Button color="inherit">Kontakt</Button>
        </Toolbar>
      </AppBar>

      {/* Form Elements */}
      <Typography variant="h4" gutterBottom>Elementy Formularza</Typography>
      <Paper elevation={2} sx={{ p: 3, mb: 6 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Imię i nazwisko"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Wiadomość"
              variant="outlined"
              fullWidth
              margin="normal"
              multiline
              rows={4}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" gutterBottom>Chcę otrzymywać informacje o:</Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Chip label="Wydarzeniach kulturalnych" color="primary" variant="outlined" />
                <Chip label="Historii miasta" color="secondary" variant="outlined" />
                <Chip label="Atrakcjach turystycznych" color="info" variant="outlined" />
                <Chip label="Nowych inwestycjach" color="success" variant="outlined" />
                <Chip label="Ogłoszeniach miejskich" color="warning" variant="outlined" />
              </Box>
            </Box>
            <Button variant="contained" color="primary" size="large" fullWidth>
              Wyślij wiadomość
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}