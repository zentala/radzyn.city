'use client';

import { Grid, Box, Chip, IconButton } from '@mui/joy';
import { ContentCard } from './foundation/Card';
import SectionWrapper from './SectionWrapper';
import Button from './foundation/Button';
import Link from 'next/link';
import MapIcon from '@mui/icons-material/Map';
import HistoryIcon from '@mui/icons-material/HistoryEdu';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useState } from 'react';

export default function CityHighlights() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const highlights = [
    {
      title: 'Pałac Potockich',
      description: 'Barokowy pałac z XVIII wieku, jeden z najpiękniejszych zabytków regionu.',
      imageUrl: undefined, // Will use placeholder until real image is provided
      mapLink: '/map?place=palac-potockich',
      historyLink: '/places/palac-potockich',
      galleryLink: '/gallery/palac-potockich',
    },
    {
      title: 'Kościół Świętej Trójcy',
      description: 'Zabytkowy kościół z bogato zdobionym wnętrzem i historią sięgającą XVII wieku.',
      imageUrl: undefined,
      mapLink: '/map?place=kosciol-swietej-trojcy',
      historyLink: '/places/kosciol-swietej-trojcy',
      galleryLink: '/gallery/kosciol-swietej-trojcy',
    },
    {
      title: 'Park Miejski',
      description: 'Miejsce rekreacji z malowniczymi alejkami, stawem i bogatą roślinnością.',
      imageUrl: undefined,
      mapLink: '/map?place=park-miejski',
      historyLink: '/places/park-miejski',
      galleryLink: '/gallery/park-miejski',
    },
  ];

  return (
    <SectionWrapper
      title="Odkryj Radzyń Podlaski"
      disableCardStyling={true}
      actions={
        <Button
          component={Link}
          href="/places"
          variant="soft"
          size="md"
          startDecorator={<LocationCityIcon />}
          endDecorator={<ArrowForwardIcon />}
          sx={{
            px: 3,
            py: 1.5,
            fontSize: '0.95rem',
          }}
        >
          Odkryj więcej miejsc
        </Button>
      }
    >
      <Grid container spacing={3}>
        {highlights.map((item, index) => (
          <Grid xs={12} md={4} key={index}>
            <Box
              sx={{ position: 'relative', overflow: 'hidden' }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Ranking number in background - Apple style with inner shadow effect */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: -6, // 6px below card bottom
                  right: 16,
                  fontSize: { xs: '160px', md: '200px' },
                  fontWeight: 700,
                  fontFamily: 'var(--joy-fontFamily-body)', // Inter font
                  background: (theme) => theme.palette.mode === 'dark'
                    ? 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)'
                    : 'linear-gradient(135deg, rgba(0,0,0,0.06) 0%, rgba(0,0,0,0.02) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.1))',
                  zIndex: 0, // Behind card content
                  pointerEvents: 'none',
                  userSelect: 'none',
                  lineHeight: 1,
                }}
              >
                {index + 1}
              </Box>

              <ContentCard
                className="city-highlight-card"
                imageUrl={item.imageUrl}
                imageAlt={item.title}
                imageHeight={192}
                title={item.title}
                description={item.description}
                imageOverlay={
                  hoveredIndex === index ? (
                    <Link href={item.galleryLink} style={{ textDecoration: 'none' }}>
                      <Box
                        sx={{
                          position: 'absolute',
                          inset: 0,
                          bgcolor: 'rgba(0, 0, 0, 0.6)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.3s ease',
                          cursor: 'pointer',
                          '&:hover': {
                            bgcolor: 'rgba(0, 0, 0, 0.7)',
                          }
                        }}
                      >
                        <Box sx={{ textAlign: 'center', color: 'white' }}>
                          <PhotoLibraryIcon sx={{ fontSize: 48, mb: 1 }} />
                          <Box sx={{ fontSize: '1rem', fontWeight: 500 }}>
                            Przeglądaj zdjęcia
                          </Box>
                        </Box>
                      </Box>
                    </Link>
                  ) : null
                }
                footer={
                  <Box sx={{ display: 'flex', gap: 1.5, justifyContent: 'flex-start' }}>
                    <Button
                      component={Link}
                      href={item.mapLink}
                      variant="soft"
                      size="md"
                      startDecorator={<MapIcon />}
                      sx={{
                        minWidth: { xs: 48, sm: 120 },
                        '& .MuiButton-startDecorator': {
                          marginRight: { xs: 0, sm: 0.5 }
                        }
                      }}
                    >
                      <Box sx={{ display: { xs: 'none', sm: 'inline' } }}>Mapa</Box>
                    </Button>
                    <Button
                      component={Link}
                      href={item.historyLink}
                      variant="soft"
                      size="md"
                      startDecorator={<HistoryIcon />}
                      sx={{
                        minWidth: { xs: 48, sm: 120 },
                        '& .MuiButton-startDecorator': {
                          marginRight: { xs: 0, sm: 0.5 }
                        }
                      }}
                    >
                      <Box sx={{ display: { xs: 'none', sm: 'inline' } }}>Historia</Box>
                    </Button>
                  </Box>
                }
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </SectionWrapper>
  );
}
