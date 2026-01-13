"use client";

import { useState } from 'react';
import {
  Typography,
  Box,
  Chip,
  ListItemDecorator,
  ListItemContent
} from '@mui/joy';
import { Menu as MuiMenu, MenuItem as MuiMenuItem, ListItemIcon, ListItemText } from '@mui/material';
import { ContentCard } from './foundation/Card';
import Button from './foundation/Button';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import GoogleIcon from '@mui/icons-material/Google';
import DownloadIcon from '@mui/icons-material/Download';

interface EventProps {
  title: string;
  location: string;
  description: string;
  category: string;
  imageUrl?: string;
  startAt: string; // ISO
  endAt?: string | null; // ISO
  detailsHref?: string;
}

function toGoogleDateTime(iso: string): string | null {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  // Google Calendar expects: YYYYMMDDTHHMMSSZ
  return d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
}

function formatEventDateLabel(startAt: string, endAt?: string | null): string {
  const start = new Date(startAt);
  const end = endAt ? new Date(endAt) : null;
  if (Number.isNaN(start.getTime())) return 'Data do ustalenia';

  const sameDay =
    !!end &&
    start.getFullYear() === end.getFullYear() &&
    start.getMonth() === end.getMonth() &&
    start.getDate() === end.getDate();

  const dateFmt = new Intl.DateTimeFormat('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' });
  const timeFmt = new Intl.DateTimeFormat('pl-PL', { hour: '2-digit', minute: '2-digit' });

  const startDate = dateFmt.format(start);
  const startTime = timeFmt.format(start);

  if (!end || Number.isNaN(end.getTime())) {
    return `${startDate}, ${startTime}`;
  }

  const endDate = dateFmt.format(end);
  const endTime = timeFmt.format(end);

  if (sameDay) {
    return `${startDate}, ${startTime}–${endTime}`;
  }

  return `${startDate}, ${startTime} – ${endDate}, ${endTime}`;
}

const generateGoogleCalendarLink = (event: EventProps) => {
  const { title, location, description } = event;
  const start = toGoogleDateTime(event.startAt);
  const end = toGoogleDateTime(event.endAt ?? event.startAt);
  const datesValue = start && end ? `${start}/${end}` : '';
  
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: datesValue,
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

export default function EventCard({ title, location, description, category, imageUrl, startAt, endAt, detailsHref }: EventProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  // Generate calendar links
  const googleCalendarLink = generateGoogleCalendarLink({ title, location, description, category, startAt, endAt, imageUrl, detailsHref });
  const dateLabel = formatEventDateLabel(startAt, endAt);
  
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
              {dateLabel}
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {detailsHref ? (
              <a href={detailsHref} data-testid="event-details-link" style={{ textDecoration: 'none' }}>
                <Button variant="solid" size="md" color="primary" component="span">
                  Szczegóły
                </Button>
              </a>
            ) : (
              <Box />
            )}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button
              variant="soft"
              size="md"
              startDecorator={<CalendarTodayIcon />}
              data-testid="calendar-button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setAnchorEl(e.currentTarget);
              }}
            >
              Dodaj do kalendarza
            </Button>

            <MuiMenu
              anchorEl={anchorEl}
              open={isMenuOpen}
              onClose={() => setAnchorEl(null)}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
              <MuiMenuItem
                component="a"
                href={googleCalendarLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setAnchorEl(null)}
              >
                <ListItemIcon>
                  <GoogleIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Google Calendar" />
              </MuiMenuItem>
              <MuiMenuItem
                onClick={() => {
                  setAnchorEl(null);
                  alert('Pobieranie pliku .ics zostanie zaimplementowane w przyszłej wersji');
                }}
              >
                <ListItemIcon>
                  <DownloadIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Pobierz plik .ics" />
              </MuiMenuItem>
            </MuiMenu>
          </Box>
        </Box>
      }
    />
  );
}