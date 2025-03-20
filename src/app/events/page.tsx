"use client";

import { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Paper, 
  TextField, 
  Select, 
  MenuItem, 
  InputLabel, 
  FormControl, 
  Button, 
  Chip, 
  Divider, 
  Stack,
  InputAdornment
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import NoEventsIcon from '@mui/icons-material/FolderOff';
import EventCard from '@/components/EventCard';
import { months } from '@/utils/dates';

// Metadata is moved to a separate layout.tsx file

interface Event {
  title: string;
  date: string;
  location: string;
  description: string;
  category: string;
  imageUrl?: string;
}

export default function EventsPage() {
  // Sample event data
  const events = [
    {
      title: 'Dni Radzynia Podlaskiego',
      date: '24-26 czerwca 2025',
      location: 'Park Miejski, Radzyń Podlaski',
      description: 'Coroczne święto miasta z koncertami, pokazami artystycznymi i atrakcjami dla całych rodzin.',
      category: 'kulturalne',
    },
    {
      title: 'Festiwal Kultury Ludowej',
      date: '15 maja 2025',
      location: 'Oranżeria, Radzyń Podlaski',
      description: 'Prezentacja lokalnego folkloru, muzyki ludowej i tradycyjnego rękodzieła z regionu radzyńskiego.',
      category: 'kulturalne',
    },
    {
      title: 'Radzyński Bieg Uliczny',
      date: '3 kwietnia 2025',
      location: 'Centrum miasta, Radzyń Podlaski',
      description: 'Zawody biegowe na dystansie 5 i 10 km, biegi dla dzieci i zawody dla niepełnosprawnych.',
      category: 'sportowe',
    },
    {
      title: 'Targi Pracy i Edukacji',
      date: '12 kwietnia 2025',
      location: 'Zespół Szkół Ponadpodstawowych, Radzyń Podlaski',
      description: 'Spotkanie pracodawców, instytucji edukacyjnych i osób poszukujących pracy z powiatu radzyńskiego.',
      category: 'edukacyjne',
    },
    {
      title: 'Koncert Symfoniczny „Muzyka Mistrzów"',
      date: '28 marca 2025',
      location: 'Sala koncertowa Pałacu Potockich, Radzyń Podlaski',
      description: 'Wykonanie dzieł klasyków muzyki poważnej przez Lubelską Orkiestrę Kameralną.',
      category: 'kulturalne',
    },
    {
      title: 'Zawody Wędkarskie o Puchar Starosty',
      date: '10 maja 2025',
      location: 'Zalew w Radzyniu Podlaskim',
      description: 'Coroczne zawody wędkarskie otwarte dla wszystkich mieszkańców powiatu.',
      category: 'sportowe',
    },
    {
      title: 'Piknik Historyczny',
      date: '7 czerwca 2025',
      location: 'Dziedziniec Pałacu Potockich, Radzyń Podlaski',
      description: 'Rekonstrukcje historyczne, prezentacja dawnego rzemiosła i zwyczajów z regionu radzyńskiego.',
      category: 'kulturalne',
    },
    {
      title: 'Forum Gospodarcze Powiatu Radzyńskiego',
      date: '21 kwietnia 2025',
      location: 'Starostwo Powiatowe, Radzyń Podlaski',
      description: 'Spotkanie przedsiębiorców, samorządowców i instytucji wspierających rozwój gospodarczy regionu.',
      category: 'biznesowe',
    },
  ];

  // Get unique categories
  const allCategories = [...new Set(events.map(event => event.category))];
  const allMonths = [...new Set(events.map(event => {
    // Extract month from date
    const monthStr = event.date.split(' ')[1].toLowerCase();
    return monthStr;
  }))];

  // State for filters
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(events);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Apply filters
  useEffect(() => {
    let filtered = [...events];
    
    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(event => event.category === selectedCategory);
    }
    
    // Filter by month
    if (selectedMonth) {
      filtered = filtered.filter(event => {
        const monthStr = event.date.split(' ')[1].toLowerCase();
        return monthStr === selectedMonth;
      });
    }
    
    // Filter by search query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(event => 
        event.title.toLowerCase().includes(query) || 
        event.description.toLowerCase().includes(query) ||
        event.location.toLowerCase().includes(query)
      );
    }
    
    setFilteredEvents(filtered);
  }, [selectedCategory, selectedMonth, searchQuery, events]);
  
  // Format category for display
  const formatCategory = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };
  
  // Format month for display
  const formatMonth = (month: string) => {
    const monthNames: Record<string, string> = {
      'stycznia': 'Styczeń',
      'lutego': 'Luty',
      'marca': 'Marzec',
      'kwietnia': 'Kwiecień',
      'maja': 'Maj',
      'czerwca': 'Czerwiec',
      'lipca': 'Lipiec',
      'sierpnia': 'Sierpień',
      'września': 'Wrzesień',
      'października': 'Październik',
      'listopada': 'Listopad',
      'grudnia': 'Grudzień'
    };
    
    return monthNames[month] || month;
  };

  // Get category color for chips
  const getCategoryColor = (category: string): "primary" | "secondary" | "success" | "warning" | "error" | "info" | "default" => {
    switch (category.toLowerCase()) {
      case 'kulturalne':
        return 'secondary';
      case 'sportowe':
        return 'success';
      case 'edukacyjne':
        return 'primary';
      case 'biznesowe':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4, pt: 10 }}>
      <Typography variant="h3" component="h1" gutterBottom fontWeight="bold" sx={{ mb: 4 }}>
        Wydarzenia w Radzyniu Podlaskim i Powiecie
      </Typography>
      
      <Box component="section" sx={{ mb: 6 }}>
        <Typography variant="h6" paragraph>
          Poniżej znajduje się kalendarz nadchodzących wydarzeń w Radzyniu Podlaskim i powiecie radzyńskim. 
          Zapraszamy do aktywnego uczestnictwa w życiu kulturalnym, sportowym i społecznym naszego regionu.
        </Typography>

        {/* Filters Section */}
        <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
            Filtruj wydarzenia
          </Typography>
          
          <Grid container spacing={3} sx={{ mb: 2 }}>
            {/* Search input */}
            <Grid item xs={12} md={4}>
              <TextField
                id="search"
                label="Szukaj"
                placeholder="Szukaj wydarzenia..."
                fullWidth
                variant="outlined"
                size="small"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            
            {/* Category select */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth size="small">
                <InputLabel id="category-label">Kategoria</InputLabel>
                <Select
                  labelId="category-label"
                  id="category"
                  value={selectedCategory || ''}
                  label="Kategoria"
                  onChange={(e) => setSelectedCategory(e.target.value || null)}
                >
                  <MenuItem value="">Wszystkie kategorie</MenuItem>
                  {allCategories.map(category => (
                    <MenuItem key={category} value={category}>
                      {formatCategory(category)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            {/* Month select */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth size="small">
                <InputLabel id="month-label">Miesiąc</InputLabel>
                <Select
                  labelId="month-label"
                  id="month"
                  value={selectedMonth || ''}
                  label="Miesiąc"
                  onChange={(e) => setSelectedMonth(e.target.value || null)}
                >
                  <MenuItem value="">Wszystkie miesiące</MenuItem>
                  {allMonths.map(month => (
                    <MenuItem key={month} value={month}>
                      {formatMonth(month)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          
          {/* Active filters display and clear button */}
          {(selectedCategory || selectedMonth || searchQuery) && (
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, pt: 2, borderTop: 1, borderColor: 'divider' }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
                  <Box component="span" sx={{ fontWeight: 'medium' }}>
                    Aktywne filtry:
                  </Box>
                  {selectedCategory && (
                    <Chip
                      label={formatCategory(selectedCategory)}
                      size="small"
                      color={getCategoryColor(selectedCategory)}
                      variant="outlined"
                    />
                  )}
                  {selectedMonth && (
                    <Chip
                      label={formatMonth(selectedMonth)}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  )}
                  {searchQuery && (
                    <Chip
                      label={`Wyszukiwanie: "${searchQuery}"`}
                      size="small"
                      color="default"
                      variant="outlined"
                    />
                  )}
                </Typography>
              </Box>
              <Button
                variant="text"
                size="small"
                color="inherit"
                onClick={() => {
                  setSelectedCategory(null);
                  setSelectedMonth(null);
                  setSearchQuery('');
                }}
                sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
              >
                Wyczyść filtry
              </Button>
            </Box>
          )}
        </Paper>

        {/* Results section */}
        {filteredEvents.length > 0 ? (
          <Grid container spacing={3}>
            {filteredEvents.map((event, index) => (
              <Grid item xs={12} sm={6} lg={4} key={index}>
                <EventCard
                  title={event.title}
                  date={event.date}
                  location={event.location}
                  description={event.description}
                  category={event.category}
                  imageUrl={event.imageUrl}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Paper sx={{ textAlign: 'center', py: 5, px: 2, borderRadius: 2, bgcolor: 'background.paper' }}>
            <NoEventsIcon sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />
            <Typography variant="h6" color="text.primary" gutterBottom>
              Nie znaleziono wydarzeń
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Zmień kryteria filtrowania, aby zobaczyć więcej wydarzeń.
            </Typography>
          </Paper>
        )}
      </Box>

      <Box component="section">
        <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
          Organizujesz wydarzenie?
        </Typography>
        <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="body1" paragraph>
            Jeśli organizujesz wydarzenie w Radzyniu Podlaskim lub powiecie radzyńskim i chcesz, aby pojawiło się w naszym kalendarzu,
            skontaktuj się z nami. Pomożemy Ci promować Twoje wydarzenie wśród mieszkańców regionu.
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<AddIcon />}
            sx={{ textTransform: 'none' }}
          >
            Zgłoś wydarzenie
          </Button>
        </Paper>
      </Box>
    </Container>
  );
}