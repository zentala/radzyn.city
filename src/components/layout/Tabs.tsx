'use client';

import React from 'react';
import {
  Tabs as JoyTabs,
  TabList,
  Tab,
  TabPanel,
  Box,
} from '@mui/joy';

export interface TabItem {
  label: string;
  value: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  items: TabItem[];
  defaultValue?: string;
  value?: string;
  onChange?: (event: React.SyntheticEvent, newValue: string) => void;
  orientation?: 'horizontal' | 'vertical';
  variant?: 'plain' | 'outlined' | 'soft' | 'solid';
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  sx?: object;
}

/**
 * Tabs - Joy UI-based tabs component
 */
export function Tabs({
  items,
  defaultValue,
  value,
  onChange,
  orientation = 'horizontal',
  variant = 'plain',
  color = 'primary',
  size = 'md',
  sx,
}: TabsProps) {
  return (
    <Box sx={sx}>
      <JoyTabs
        defaultValue={defaultValue || items[0]?.value}
        value={value}
        onChange={onChange}
        orientation={orientation}
      >
        <TabList
          variant={variant}
          color={color}
          size={size}
          sx={{
            '--List-gap': '0.5rem',
            '--List-padding': '0.5rem',
            '--List-radius': '0.5rem',
          }}
        >
          {items.map((item) => (
            <Tab
              key={item.value}
              value={item.value}
              disabled={item.disabled}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
              }}
            >
              {item.icon}
              {item.label}
            </Tab>
          ))}
        </TabList>

        {items.map((item) => (
          <TabPanel key={item.value} value={item.value}>
            {item.children}
          </TabPanel>
        ))}
      </JoyTabs>
    </Box>
  );
}

export default Tabs;
