'use client';

import { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import { Box, Grid, Typography, Container } from '@mui/joy';

// Define widget sizes
export type WidgetSize = 'small' | 'medium' | 'large' | 'full';

// Define widget configuration
export interface WidgetConfig {
  id: string;
  title?: string;
  size: WidgetSize;
  component: ReactNode;
  order?: number;
  visible?: boolean;
}

// Define dashboard context type
interface DashboardContextType {
  widgets: WidgetConfig[];
  updateWidget: (id: string, config: Partial<WidgetConfig>) => void;
  removeWidget: (id: string) => void;
  addWidget: (config: WidgetConfig) => void;
}

// Create dashboard context
const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

// Dashboard provider component
export function DashboardProvider({ children, initialWidgets = [] }: {
  children: ReactNode;
  initialWidgets?: WidgetConfig[];
}) {
  const [widgets, setWidgets] = useState<WidgetConfig[]>(initialWidgets);

  // Update a specific widget
  const updateWidget = (id: string, config: Partial<WidgetConfig>) => {
    setWidgets(prevWidgets =>
      prevWidgets.map(widget =>
        widget.id === id ? { ...widget, ...config } : widget
      )
    );
  };

  // Remove a widget
  const removeWidget = (id: string) => {
    setWidgets(prevWidgets => prevWidgets.filter(widget => widget.id !== id));
  };

  // Add a new widget
  const addWidget = (config: WidgetConfig) => {
    setWidgets(prevWidgets => [...prevWidgets, config]);
  };

  // Create a memoized context value
  const contextValue = useMemo(() => ({
    widgets,
    updateWidget,
    removeWidget,
    addWidget
  }), [widgets]);

  return (
    <DashboardContext.Provider value={contextValue}>
      {children}
    </DashboardContext.Provider>
  );
}

// Hook to use dashboard context
export function useDashboard() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
}

// Define how many grid columns each widget size should span at different breakpoints
const getSizeProps = (size: WidgetSize) => {
  switch (size) {
    case 'small':
      return { xs: 12, sm: 6, md: 4, lg: 3 };
    case 'medium':
      return { xs: 12, sm: 12, md: 6, lg: 4 };
    case 'large':
      return { xs: 12, sm: 12, md: 12, lg: 8 };
    case 'full':
      return { xs: 12 };
    default:
      return { xs: 12, sm: 6, md: 4 };
  }
};

// Dashboard layout component
interface DashboardProps {
  widgets: WidgetConfig[];
  title?: string;
  description?: string;
}

export default function Dashboard({ widgets, title, description }: DashboardProps) {
  // Filter visible widgets and sort by order
  const visibleWidgets = widgets
    .filter(widget => widget.visible !== false)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {title && (
        <Typography level="h2" component="h2" sx={{ mb: 2, fontWeight: 'bold' }}>
          {title}
        </Typography>
      )}

      {description && (
        <Typography level="body-md" sx={{ color: 'text.secondary', mb: 4 }}>
          {description}
        </Typography>
      )}

      <Grid container spacing={3}>
        {visibleWidgets.map((widget) => (
          <Grid key={widget.id} {...getSizeProps(widget.size)}>
            <Box sx={{ height: '100%' }}>
              {widget.component}
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
