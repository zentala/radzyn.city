"use client";

import { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  Grid,
  Sheet,
  Input,
  Select,
  Button,
  Chip,
  Divider,
  Stack,
} from '@mui/joy';
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, selectedMonth, searchQuery]);

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
  const getCategoryColor = (category: string): "primary" | "secondary" | "success" | "danger" | "neutral" | "warning" | "info" => {
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
        return 'neutral';
    }
  };

  return (
    <Box sx={{ py: 4, pt: 10, px: { xs: 2, md: 4 }, maxWidth: 'xl', mx: 'auto', width: '100%' }}>
      <Typography level="h2" sx={{ mb: 4, fontWeight: 'bold' }}>
        Wydarzenia w Radzyniu Podlaskim i Powiecie
      </Typography>

      <Box component="section" sx={{ mb: 6 }}>
        <Typography level="h4" sx={{ mb: 2 }}>
          Poniżej znajduje się kalendarz nadchodzących wydarzeń w Radzyniu Podlaskim i powiecie radzyńskim.
          Zapraszamy do aktywnego uczestnictwa w życiu kulturalnym, sportowym i społecznym naszego regionu.
        </Typography>

        {/* Filters Section */}
        <Sheet variant="outlined" sx={{ p: 3, mb: 4, borderRadius: 'md' }}>
          <Typography level="title-md" sx={{ mb: 2, fontWeight: 'bold' }}>
            Filtruj wydarzenia
          </Typography>

          <Grid container spacing={3} sx={{ mb: 2 }}>
            {/* Search input */}
            <Grid xs={12} md={4}>
              <Input
                id="search"
                placeholder="Szukaj wydarzenia..."
                fullWidth
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                startDecorator={<SearchIcon />}
              />
            </Grid>

            {/* Category select */}
            <Grid xs={12} md={4}>
              <Select
                id="category"
                value={selectedCategory || ''}
                placeholder="Wszystkie kategorie"
                onChange={(_, value) => setSelectedCategory(value as string | null)}
              >
                <option value="">Wszystkie kategorie</option>
                {allCategories.map(category => (
                  <option key={category} value={category}>
                    {formatCategory(category)}
                  </option>
                ))}
              </Select>
            </Grid>

            {/* Month select */}
            <Grid xs={12} md={4}>
              <Select
                id="month"
                value={selectedMonth || ''}
                placeholder="Wszystkie miesiące"
                onChange={(_, value) => setSelectedMonth(value as string | null)}
              >
                <option value="">Wszystkie miesiące</option>
                {allMonths.map(month => (
                  <option key={month} value={month}>
                    {formatMonth(month)}
                  </option>
                ))}
              </Select>
            </Grid>
          </Grid>

          {/* Active filters display and clear button */}
          {(selectedCategory || selectedMonth || searchQuery) && (
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography level="body-sm" sx={{ color: 'text.secondary', display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
                  <Box component="span" sx={{ fontWeight: 'bold' }}>
                    Aktywne filtry:
                  </Box>
                  {selectedCategory && (
                    <Chip
                      label={formatCategory(selectedCategory)}
                      size="sm"
                      color={getCategoryColor(selectedCategory)}
                      variant="outlined"
                    />
                  )}
                  {selectedMonth && (
                    <Chip
                      label={formatMonth(selectedMonth)}
                      size="sm"
                      color="primary"
                      variant="outlined"
                    />
                  )}
                  {searchQuery && (
                    <Chip
                      label={`Wyszukiwanie: "${searchQuery}"`}
                      size="sm"
                      color="neutral"
                      variant="outlined"
                    />
                  )}
                </Typography>
              </Box>
              <Button
                variant="plain"
                size="sm"
                onClick={() => {
                  setSelectedCategory(null);
                  setSelectedMonth(null);
                  setSearchQuery('');
                }}
                sx={{ color: 'text.secondary', '&:hover': { color: 'primary.500' } }}
              >
                Wyczyść filtry
              </Button>
            </Box>
          )}
        </Sheet>

        {/* Results section */}
        {filteredEvents.length > 0 ? (
          <Grid container spacing={3}>
            {filteredEvents.map((event, index) => (
              <Grid xs={12} sm={6} lg={4} key={index}>
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
          <Sheet variant="outlined" sx={{ textAlign: 'center', py: 5, px: 2, borderRadius: 'md', bgcolor: 'background.surface' }}>
            <NoEventsIcon sx={{ fontSize: 60, color: 'text.tertiary', mb: 2 }} />
            <Typography level="h4" sx={{ mb: 1 }}>
              Nie znaleziono wydarzeń
            </Typography>
            <Typography level="body-md" sx={{ color: 'text.secondary' }}>
              Zmień kryteria filtrowania, aby zobaczyć więcej wydarzeń.
            </Typography>
          </Sheet>
        )}
      </Box>

      <Box component="section">
        <Typography level="h3" sx={{ mb: 2, fontWeight: 'bold' }}>
          Organizujesz wydarzenie?
        </Typography>
        <Sheet variant="outlined" sx={{ p: 3, borderRadius: 'md' }}>
          <Typography level="body-lg" sx={{ mb: 2 }}>
            Jeśli organizujesz wydarzenie w Radzyniu Podlaskim lub powiecie radzyńskim i chcesz, aby pojawiło się w naszym kalendarzu,
            skontaktuj się z nami. Pomożemy Ci promować Twoje wydarzenie wśród mieszkańców regionu.
          </Typography>
          <Button
            variant="solid"
            color="primary"
            startDecorator={<AddIcon />}
          >
            Zgłoś wydarzenie
          </Button>
        </Sheet>
      </Box>
    </Box>
  );
}
