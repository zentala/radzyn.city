"use client";

import { useState } from 'react';
import {
  Typography,
  Box,
  Chip,
  Menu,
  MenuItem,
  ListItemDecorator,
  ListItemContent
} from '@mui/joy';
import { ContentCard } from './foundation/Card';
import Button from './foundation/Button';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import GoogleIcon from '@mui/icons-material/Google';
import DownloadIcon from '@mui/icons-material/Download';

interface EventProps {
  title: string;
  date: string;
  location: string;
  description: string;
  category: string;
  imageUrl?: string;
}

// Function to format date for calendar
const formatDateForCalendar = (dateStr: string) => {
  // Handle date ranges like "24-26 czerwca 2025"
  const isRange = dateStr.includes('-');
  
  // Simple Polish to English month translation for the calendar
  const monthsMapping: Record<string, string> = {
    'stycznia': 'January',
    'lutego': 'February', 
    'marca': 'March',
    'kwietnia': 'April',
    'maja': 'May',
    'czerwca': 'June',
    'lipca': 'July',
    'sierpnia': 'August',
    'września': 'September',
    'października': 'October',
    'listopada': 'November',
    'grudnia': 'December'
  };
  
  const formatPolishDate = (input: string) => {
    let day, month, year;
    
    // Extract components from date string
    for (const [pl, en] of Object.entries(monthsMapping)) {
      if (input.includes(pl)) {
        const parts = input.split(' ');
        day = parts[0];
        month = en;
        year = parts[2];
        break;
      }
    }
    
    // Default fallback in case parsing fails
    if (!day || !month || !year) {
      return new Date().toISOString().split('T')[0];
    }
    
    // Return ISO format
    const date = new Date(`${month} ${day}, ${year}`);
    return date.toISOString().split('T')[0];
  };
  
  if (isRange) {
    const [startDate, endDate] = dateStr.split('-');
    // For ranges like "24-26 czerwca 2025", we need to handle specially
    if (!endDate.includes(' ')) {
      // It's a day range in the same month
      const parts = startDate.split(' ');
      const fullEndDate = `${endDate.trim()} ${parts.slice(1).join(' ')}`;
      return {
        start: formatPolishDate(startDate.trim()),
        end: formatPolishDate(fullEndDate)
      };
    } else {
      // Full date range
      return {
        start: formatPolishDate(startDate.trim()),
        end: formatPolishDate(endDate.trim())
      };
    }
  } else {
    // Single date
    return {
      start: formatPolishDate(dateStr),
      end: formatPolishDate(dateStr)
    };
  }
};

const generateGoogleCalendarLink = (event: EventProps) => {
  const { title, location, description } = event;
  const dates = formatDateForCalendar(event.date);
  
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${dates.start.replace(/-/g, '')}/${dates.end.replace(/-/g, '')}`,
    details: description,
    location: location,
  });
  
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};

// Helper function to determine category color
const getCategoryColor = (category: string) => {
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

export default function EventCard({ title, date, location, description, category, imageUrl }: EventProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  
  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  // Generate calendar links
  const googleCalendarLink = generateGoogleCalendarLink({ title, date, location, description, category });
  
  // Category styling
  const categoryColor = getCategoryColor(category);
  
  return (
    <ContentCard
      imageUrl={imageUrl}
      imageAlt={title}
      imageHeight={180}
      title={title}
      metadata={
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          {/* Date */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CalendarTodayIcon
              sx={{
                fontSize: '1rem',
                mr: 0.75,
                color: 'text.secondary'
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
              {date}
            </Typography>
          </Box>

          {/* Location */}
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
              {location}
            </Typography>
          </Box>
        </Box>
      }
      description={description}
      descriptionLines={3}
      imageOverlay={
        <Box sx={{ position: 'absolute', top: 12, left: 12 }}>
          <Chip
            color={categoryColor as any}
            size="sm"
            variant="solid"
            sx={{ fontWeight: 500 }}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Chip>
        </Box>
      }
      footer={
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          <Box>
            <Button
              variant="soft"
              size="md"
              onClick={handleMenuClick}
              startDecorator={<CalendarTodayIcon />}
              aria-controls={isMenuOpen ? 'calendar-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={isMenuOpen ? 'true' : undefined}
              data-testid="calendar-button"
            >
              Dodaj do kalendarza
            </Button>
            <Menu
              id="calendar-menu"
              anchorEl={anchorEl}
              open={isMenuOpen}
              onClose={handleMenuClose}
              MenuListProps={{
                'aria-labelledby': 'calendar-button',
              }}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
            >
              <MenuItem
                component="a"
                href={googleCalendarLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleMenuClose}
              >
                <ListItemDecorator>
                  <GoogleIcon fontSize="small" />
                </ListItemDecorator>
                <ListItemContent>Google Calendar</ListItemContent>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleMenuClose();
                  alert('Pobieranie pliku .ics zostanie zaimplementowane w przyszłej wersji');
                }}
              >
                <ListItemDecorator>
                  <DownloadIcon fontSize="small" />
                </ListItemDecorator>
                <ListItemContent>Pobierz plik .ics</ListItemContent>
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      }
    />
  );
}