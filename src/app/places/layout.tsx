import React from 'react';
import { Box, Container, Typography } from '@mui/material';

export default function PlacesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" sx={{ mb: 2 }}>
          Miejsca w Radzyniu
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Odkryj lokalne atrakcje, firmy, instytucje i punkty usługowe w mieście.
        </Typography>
      </Box>
      {children}
    </Container>
  );
}