'use client';

import React from 'react';
import {
  Accordion as JoyAccordion,
  AccordionGroup,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
} from '@mui/joy';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export interface AccordionItem {
  id: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
  items: AccordionItem[];
  multiple?: boolean;
  variant?: 'plain' | 'outlined' | 'soft' | 'solid';
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  sx?: object;
}

/**
 * Accordion - Joy UI-based accordion component
 */
export function Accordion({
  items,
  multiple = false,
  variant = 'outlined',
  color = 'neutral',
  size = 'md',
  sx,
}: AccordionProps) {
  return (
    <AccordionGroup
      variant={variant}
      color={color}
      sx={{
        maxWidth: '100%',
        ...sx,
      }}
      transition="0.3s ease"
    >
      {items.map((item) => (
        <JoyAccordion
          key={item.id}
          disabled={item.disabled}
          expanded={item.expanded}
          onChange={item.onChange}
          sx={{
            '--Accordion-padding': '1rem',
            '--Accordion-radius': '0.5rem',
          }}
        >
          <AccordionSummary
            indicator={<ExpandMoreIcon />}
            sx={{
              minHeight: size === 'sm' ? 40 : size === 'lg' ? 64 : 48,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
              {item.icon}
              <Box>
                <Typography level="title-md" sx={{ fontWeight: 'bold' }}>
                  {item.title}
                </Typography>
                {item.description && (
                  <Typography level="body-sm" sx={{ color: 'text.secondary' }}>
                    {item.description}
                  </Typography>
                )}
              </Box>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            {item.content}
          </AccordionDetails>
        </JoyAccordion>
      ))}
    </AccordionGroup>
  );
}

export default Accordion;
