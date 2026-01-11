import React from 'react';
import { Box, Typography } from '@mui/joy';

export default function PlacesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box sx={{ maxWidth: 'xl', mx: 'auto', my: 4, px: { xs: 2, md: 3 } }}>
      <Box sx={{ mb: 4 }}>
        <Typography level="h3" component="h1" sx={{ mb: 2 }}>
          Miejsca w Radzyniu
        </Typography>
        <Typography level="body-md" sx={{ color: 'text.secondary' }}>
          Odkryj lokalne atrakcje, firmy, instytucje i punkty usługowe w mieście.
        </Typography>
      </Box>
      {children}
    </Box>
  );
}