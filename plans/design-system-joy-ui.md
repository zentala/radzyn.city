# Design System - Joy UI Migration
## Radzyn.city - Comprehensive Design System

**Version:** 1.0  
**Date:** 2026-01-11  
**Status:** Ready for Implementation

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Current Design Problems](#current-design-problems)
3. [Design Principles](#design-principles)
4. [Color System](#color-system)
5. [Typography System](#typography-system)
6. [Spacing System](#spacing-system)
7. [Component Library](#component-library)
8. [Layout System](#layout-system)
9. [Icon System](#icon-system)
10. [Animation & Motion](#animation--motion)
11. [Accessibility Standards](#accessibility-standards)
12. [Responsive Breakpoints](#responsive-breakpoints)
13. [Mock Data Specifications](#mock-data-specifications)

---

## Executive Summary

This design system establishes a unified, consistent visual language for Radzyn.city using Joy UI. The current design suffers from fragmentation, inconsistency, and lack of clear design principles. This document provides a comprehensive foundation for migrating to Joy UI with proper design standards.

### Key Objectives

- **Unify** all visual elements under a single design system
- **Standardize** component behavior and appearance
- **Improve** accessibility and usability
- **Streamline** development workflow
- **Create** reusable, maintainable components

---

## Current Design Problems

### Identified Issues

| Problem | Impact | Solution |
|---------|--------|----------|
| Inconsistent color usage | Confusing user experience | Unified color palette |
| Mixed component styles | Fragmented UI | Standardized Joy UI components |
| No clear spacing system | Inconsistent layouts | 8pt grid system |
| Typography inconsistencies | Poor readability | Unified typography scale |
| No design tokens | Hard to maintain | Design token system |
| Incomplete responsive design | Poor mobile experience | Mobile-first approach |
| Missing accessibility features | Excludes users | WCAG 2.1 AA compliance |
| No clear component hierarchy | Confusing navigation | Clear visual hierarchy |

---

## Design Principles

### 1. Clarity First
- Content should be immediately understandable
- Use clear, concise language
- Avoid unnecessary decoration

### 2. Consistency
- Use the same component for the same purpose
- Maintain consistent spacing, colors, and typography
- Follow established patterns

### 3. Accessibility
- WCAG 2.1 AA compliance minimum
- Keyboard navigation support
- Screen reader compatibility
- Sufficient color contrast (4.5:1 minimum)

### 4. Efficiency
- Reduce cognitive load
- Minimize steps to complete tasks
- Provide clear feedback

### 5. Visual Hierarchy
- Guide user attention through size, color, and placement
- Use progressive disclosure
- Establish clear relationships between elements

---

## Color System

### Primary Colors

```typescript
// Joy UI Color Palette
const primaryColors = {
  50: '#E3F2FD',
  100: '#BBDEFB',
  200: '#90CAF9',
  300: '#64B5F6',
  400: '#42A5F5',
  500: '#2196F3',  // Primary
  600: '#1E88E5',
  700: '#1976D2',
  800: '#1565C0',
  900: '#0D47A1',
}
```

### Secondary Colors

```typescript
const secondaryColors = {
  50: '#F3E5F5',
  100: '#E1BEE7',
  200: '#CE93D8',
  300: '#BA68C8',
  400: '#AB47BC',
  500: '#9C27B0',  // Secondary
  600: '#8E24AA',
  700: '#7B1FA2',
  800: '#6A1B9A',
  900: '#4A148C',
}
```

### Neutral Colors

```typescript
const neutralColors = {
  50: '#FAFAFA',
  100: '#F5F5F5',
  200: '#EEEEEE',
  300: '#E0E0E0',
  400: '#BDBDBD',
  500: '#9E9E9E',
  600: '#757575',
  700: '#616161',
  800: '#424242',
  900: '#212121',
}
```

### Semantic Colors

```typescript
const semanticColors = {
  success: {
    50: '#E8F5E9',
    100: '#C8E6C9',
    500: '#4CAF50',
    700: '#388E3C',
  },
  warning: {
    50: '#FFF8E1',
    100: '#FFECB3',
    500: '#FFC107',
    700: '#FFA000',
  },
  error: {
    50: '#FFEBEE',
    100: '#FFCDD2',
    500: '#F44336',
    700: '#D32F2F',
  },
  info: {
    50: '#E3F2FD',
    100: '#BBDEFB',
    500: '#2196F3',
    700: '#1976D2',
  },
}
```

### Color Usage Guidelines

| Element | Color | Usage |
|---------|-------|-------|
| Primary actions | Primary 500 | Main CTAs, important buttons |
| Secondary actions | Secondary 500 | Alternative actions |
| Backgrounds | Neutral 50-100 | Page backgrounds, cards |
| Text primary | Neutral 900 | Headings, body text |
| Text secondary | Neutral 600 | Supporting text |
| Borders | Neutral 300 | Dividers, borders |
| Links | Primary 600 | All links |
| Success | Success 500 | Positive feedback |
| Warning | Warning 500 | Caution messages |
| Error | Error 500 | Error states |

---

## Typography System

### Font Family

```typescript
const fontFamily = {
  body: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  heading: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  mono: '"JetBrains Mono", "Fira Code", monospace',
}
```

### Type Scale

```typescript
const typography = {
  // Display
  display1: {
    fontSize: '4rem',
    fontWeight: 700,
    lineHeight: 1.1,
    letterSpacing: '-0.02em',
  },
  display2: {
    fontSize: '3rem',
    fontWeight: 700,
    lineHeight: 1.2,
    letterSpacing: '-0.01em',
  },
  
  // Headings
  h1: {
    fontSize: '2.5rem',
    fontWeight: 700,
    lineHeight: 1.2,
    letterSpacing: '-0.01em',
  },
  h2: {
    fontSize: '2rem',
    fontWeight: 600,
    lineHeight: 1.3,
  },
  h3: {
    fontSize: '1.75rem',
    fontWeight: 600,
    lineHeight: 1.4,
  },
  h4: {
    fontSize: '1.5rem',
    fontWeight: 600,
    lineHeight: 1.4,
  },
  h5: {
    fontSize: '1.25rem',
    fontWeight: 600,
    lineHeight: 1.5,
  },
  h6: {
    fontSize: '1rem',
    fontWeight: 600,
    lineHeight: 1.5,
  },
  
  // Body
  body1: {
    fontSize: '1rem',
    fontWeight: 400,
    lineHeight: 1.6,
  },
  body2: {
    fontSize: '0.875rem',
    fontWeight: 400,
    lineHeight: 1.6,
  },
  
  // UI Elements
  button: {
    fontSize: '0.875rem',
    fontWeight: 600,
    lineHeight: 1.4,
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
  },
  caption: {
    fontSize: '0.75rem',
    fontWeight: 400,
    lineHeight: 1.5,
  },
  overline: {
    fontSize: '0.75rem',
    fontWeight: 600,
    lineHeight: 1.5,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
  },
}
```

### Typography Usage

| Element | Style | Usage |
|---------|-------|-------|
| Page title | h1 | Main page heading |
| Section title | h2 | Section headings |
| Subsection title | h3 | Subsection headings |
| Card title | h4 | Card/component headings |
| Body text | body1 | Main content |
| Secondary text | body2 | Supporting content |
| Buttons | button | All button text |
| Captions | caption | Image captions, helper text |
| Labels | overline | Form labels, badges |

---

## Spacing System

### 8pt Grid System

```typescript
const spacing = {
  0: 0,
  1: '4px',   // 0.5rem
  2: '8px',   // 1rem
  3: '12px',  // 1.5rem
  4: '16px',  // 2rem
  5: '20px',  // 2.5rem
  6: '24px',  // 3rem
  8: '32px',  // 4rem
  10: '40px', // 5rem
  12: '48px', // 6rem
  16: '64px', // 8rem
  20: '80px', // 10rem
  24: '96px', // 12rem
}
```

### Spacing Usage Guidelines

| Context | Spacing | Usage |
|---------|---------|-------|
| Element spacing | 2 (8px) | Between related elements |
| Component spacing | 4 (16px) | Between components |
| Section spacing | 8 (32px) | Between sections |
| Page padding | 6 (24px) | Page margins |
| Card padding | 4 (16px) | Card internal padding |
| Button padding | 2-3 (8-12px) | Button internal spacing |
| Form field spacing | 3 (12px) | Between form fields |

---

## Component Library

### Button Components

#### Primary Button
```typescript
<JoyButton variant="solid" color="primary">
  Primary Action
</JoyButton>
```

**Usage:** Main call-to-action buttons

#### Secondary Button
```typescript
<JoyButton variant="outlined" color="neutral">
  Secondary Action
</JoyButton>
```

**Usage:** Alternative actions, cancel buttons

#### Text Button
```typescript
<JoyButton variant="plain" color="primary">
  Text Action
</JoyButton>
```

**Usage:** Less prominent actions, inline actions

#### Icon Button
```typescript
<JoyIconButton variant="outlined" color="neutral">
  <Icon />
</JoyIconButton>
```

**Usage:** Actions with icons only

### Card Components

#### Standard Card
```typescript
<JoyCard variant="outlined">
  <JoyCardContent>
    <JoyTypography level="h3">Card Title</JoyTypography>
    <JoyTypography level="body1">Card content</JoyTypography>
  </JoyCardContent>
</JoyCard>
```

#### Elevated Card
```typescript
<JoyCard variant="soft" color="neutral">
  <JoyCardContent>
    <JoyTypography level="h3">Card Title</JoyTypography>
    <JoyTypography level="body1">Card content</JoyTypography>
  </JoyCardContent>
</JoyCard>
```

### Form Components

#### Text Input
```typescript
<JoyInput
  placeholder="Enter text"
  variant="outlined"
  color="neutral"
/>
```

#### Select
```typescript
<JoySelect placeholder="Select option">
  <JoyOption value="1">Option 1</JoyOption>
  <JoyOption value="2">Option 2</JoyOption>
</JoySelect>
```

#### Checkbox
```typescript
<JoyCheckbox label="Accept terms" variant="outlined" />
```

#### Radio Group
```typescript
<JoyRadioGroup name="group">
  <JoyRadio value="1" label="Option 1" />
  <JoyRadio value="2" label="Option 2" />
</JoyRadioGroup>
```

### Navigation Components

#### Breadcrumbs
```typescript
<JoyBreadcrumbs separator="/">
  <JoyLink href="/">Home</JoyLink>
  <JoyLink href="/section">Section</JoyLink>
  <JoyTypography>Current</JoyTypography>
</JoyBreadcrumbs>
```

#### Tabs
```typescript
<JoyTabs defaultValue={0}>
  <JoyTabList>
    <JoyTab>Tab 1</JoyTab>
    <JoyTab>Tab 2</JoyTab>
  </JoyTabList>
  <JoyTabPanel value={0}>Content 1</JoyTabPanel>
  <JoyTabPanel value={1}>Content 2</JoyTabPanel>
</JoyTabs>
```

#### Menu
```typescript
<JoyMenu>
  <JoyMenuButton>Menu</JoyMenuButton>
  <JoyMenuList>
    <JoyMenuItem>Item 1</JoyMenuItem>
    <JoyMenuItem>Item 2</JoyMenuItem>
  </JoyMenuList>
</JoyMenu>
```

### Feedback Components

#### Alert
```typescript
<JoyAlert variant="soft" color="success">
  Success message
</JoyAlert>
```

#### Snackbar
```typescript
<JoySnackbar variant="soft" color="primary">
  Notification message
</JoySnackbar>
```

#### Progress
```typescript
<JoyLinearProgress variant="soft" color="primary" />
```

### Data Display Components

#### Table
```typescript
<JoyTable>
  <Joythead>
    <JoyTr>
      <JoyTh>Header 1</JoyTh>
      <JoyTh>Header 2</JoyTh>
    </JoyTr>
  </Joythead>
  <Joytbody>
    <JoyTr>
      <JoyTd>Data 1</JoyTd>
      <JoyTd>Data 2</JoyTd>
    </JoyTr>
  </Joytbody>
</JoyTable>
```

#### List
```typescript
<JoyList>
  <JoyListItem>Item 1</JoyListItem>
  <JoyListItem>Item 2</JoyListItem>
</JoyList>
```

#### Chip
```typescript
<JoyChip variant="soft" color="primary">
  Label
</JoyChip>
```

### Layout Components

#### Container
```typescript
<JoyContainer maxWidth="md">
  Content
</JoyContainer>
```

#### Stack
```typescript
<JoyStack spacing={2} direction="row">
  <JoyButton>Button 1</JoyButton>
  <JoyButton>Button 2</JoyButton>
</JoyStack>
```

#### Grid
```typescript
<JoyGrid container spacing={2}>
  <JoyGrid xs={12} md={6}>Column 1</JoyGrid>
  <JoyGrid xs={12} md={6}>Column 2</JoyGrid>
</JoyGrid>
```

#### Box
```typescript
<JoyBox sx={{ p: 2, bgcolor: 'neutral.100' }}>
  Content
</JoyBox>
```

---

## Layout System

### Page Layout Structure

```
┌─────────────────────────────────────────┐
│           Header (Navigation)           │
├─────────────────────────────────────────┤
│                                         │
│                                         │
│            Main Content Area            │
│                                         │
│                                         │
├─────────────────────────────────────────┤
│              Footer                     │
└─────────────────────────────────────────┘
```

### Content Layout Patterns

#### Two-Column Layout
```
┌──────────────────┬──────────────────┐
│                  │                  │
│   Sidebar (25%)  │   Main (75%)     │
│                  │                  │
└──────────────────┴──────────────────┘
```

#### Three-Column Layout
```
┌────────┬──────────────────┬────────┐
│        │                  │        │
│ Left   │     Center       │ Right  │
│ (20%)  │     (60%)        │ (20%)  │
│        │                  │        │
└────────┴──────────────────┴────────┘
```

#### Card Grid Layout
```
┌──────────┬──────────┬──────────┐
│          │          │          │
│  Card 1  │  Card 2  │  Card 3  │
│          │          │          │
├──────────┼──────────┼──────────┤
│          │          │          │
│  Card 4  │  Card 5  │  Card 6  │
│          │          │          │
└──────────┴──────────┴──────────┘
```

### Layout Components

#### Page Container
```typescript
<JoyContainer maxWidth="xl" sx={{ py: 4 }}>
  {/* Page content */}
</JoyContainer>
```

#### Section Container
```typescript
<JoyBox sx={{ py: 8, px: { xs: 2, md: 4 } }}>
  <JoyContainer maxWidth="xl">
    {/* Section content */}
  </JoyContainer>
</JoyBox>
```

#### Content Wrapper
```typescript
<JoyBox sx={{ 
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  minHeight: '100vh'
}}>
  {/* Content */}
</JoyBox>
```

---

## Icon System

### Icon Library

Use Material Icons (already included with Joy UI):

```typescript
import { 
  Home, 
  Search, 
  Menu, 
  Close,
  ArrowForward,
  ArrowBack,
  Check,
  Warning,
  Error,
  Info,
  Star,
  Favorite,
  Share,
  Bookmark,
  LocationOn,
  CalendarToday,
  Event,
  News,
  Article,
  Image,
  Video,
  Map,
  Phone,
  Email,
  Web,
  Settings,
  Account,
  Login,
  Logout,
  Edit,
  Delete,
  Add,
  Remove,
  Filter,
  Sort,
  ViewList,
  ViewGrid,
  ExpandMore,
  ExpandLess,
  ChevronRight,
  ChevronLeft,
  KeyboardArrowUp,
  KeyboardArrowDown,
} from '@mui/icons-material';
```

### Icon Usage Guidelines

| Context | Size | Usage |
|---------|------|-------|
| Navigation icons | 24px | Menu items, breadcrumbs |
| Action icons | 20px | Buttons, inline actions |
| Status icons | 16px | Indicators, badges |
| Hero icons | 48px | Feature highlights |
| Illustration icons | 64px+ | Empty states, onboarding |

### Icon Components

#### Icon Button
```typescript
<JoyIconButton size="sm">
  <Search />
</JoyIconButton>
```

#### Icon with Text
```typescript
<JoyBox sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
  <LocationOn fontSize="small" />
  <JoyTypography level="body2">Location</JoyTypography>
</JoyBox>
```

---

## Animation & Motion

### Animation Principles

1. **Purposeful** - Every animation should have a clear purpose
2. **Natural** - Follow real-world physics
3. **Consistent** - Use consistent timing and easing
4. **Accessible** - Respect user's motion preferences

### Animation Durations

```typescript
const duration = {
  fastest: 150,   // Micro-interactions
  fast: 200,      // Quick transitions
  normal: 300,    // Standard transitions
  slow: 500,      // Complex transitions
  slowest: 1000,  // Page transitions
}
```

### Easing Functions

```typescript
const easing = {
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
}
```

### Common Animations

#### Fade In
```typescript
<JoyFade in={true} timeout={300}>
  <JoyBox>Content</JoyBox>
</JoyFade>
```

#### Slide In
```typescript
<JoySlide direction="up" in={true} timeout={300}>
  <JoyBox>Content</JoyBox>
</JoySlide>
```

#### Scale
```typescript
<JoyBox sx={{
  transition: 'transform 0.2s ease-out',
  '&:hover': { transform: 'scale(1.05)' }
}}>
  Content
</JoyBox>
```

---

## Accessibility Standards

### WCAG 2.1 AA Compliance

#### Color Contrast
- Normal text: 4.5:1 minimum
- Large text (18pt+): 3:1 minimum
- UI components: 3:1 minimum

#### Keyboard Navigation
- All interactive elements must be keyboard accessible
- Visible focus indicators
- Logical tab order
- Skip to main content link

#### Screen Reader Support
- Proper ARIA labels
- Semantic HTML
- Alt text for images
- Descriptive link text

#### Motion Preferences
```typescript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
```

### Accessibility Checklist

- [ ] All images have alt text
- [ ] Form fields have labels
- [ ] Color is not the only indicator
- [ ] Focus indicators are visible
- [ ] Keyboard navigation works
- [ ] ARIA labels are used where needed
- [ ] Text contrast meets WCAG standards
- [ ] Error messages are descriptive
- [ ] Skip links are provided
- [ ] Motion can be disabled

---

## Responsive Breakpoints

### Breakpoint System

```typescript
const breakpoints = {
  xs: 0,      // Mobile portrait
  sm: 576,    // Mobile landscape
  md: 768,    // Tablet
  lg: 992,    // Desktop
  xl: 1200,   // Large desktop
  '2xl': 1400 // Extra large desktop
}
```

### Responsive Patterns

#### Mobile-First Approach
```typescript
<JoyBox sx={{
  padding: 2,           // Mobile
  '@media (min-width: 768px)': {
    padding: 4,         // Tablet+
  },
  '@media (min-width: 992px)': {
    padding: 6,         // Desktop+
  }
}}>
  Content
</JoyBox>
```

#### Grid Responsiveness
```typescript
<JoyGrid container spacing={2}>
  <JoyGrid xs={12} sm={6} md={4} lg={3}>
    Card
  </JoyGrid>
</JoyGrid>
```

#### Typography Responsiveness
```typescript
<JoyTypography 
  level="h1"
  sx={{
    fontSize: { xs: '1.75rem', md: '2.5rem', lg: '3rem' }
  }}
>
  Heading
</JoyTypography>
```

---

## Mock Data Specifications

### News Mock Data

```typescript
const mockNews = [
  {
    id: 1,
    title: 'Nowa inwestycja w Radzyniu Podlaskim',
    slug: 'nowa-inwestycja-w-radzyniu-podlaskim',
    excerpt: 'Miasto ogłasza nową inwestycję infrastrukturalną...',
    content: 'Pełna treść artykułu...',
    category: { id: 1, name: 'Gospodarka', slug: 'gospodarka' },
    tags: [
      { id: 1, name: 'inwestycje', slug: 'inwestycje' },
      { id: 2, name: 'infrastruktura', slug: 'infrastruktura' }
    ],
    author: { name: 'Jan Kowalski', avatar: '/avatars/jan.jpg' },
    publishedAt: '2026-01-10T10:00:00Z',
    updatedAt: '2026-01-10T10:00:00Z',
    featuredImage: '/images/news-1.jpg',
    views: 1234,
    status: 'published'
  },
  // ... more news items
]
```

### Events Mock Data

```typescript
const mockEvents = [
  {
    id: 1,
    title: 'Dni Radzynia 2026',
    slug: 'dni-radzynia-2026',
    description: 'Coroczne święto miasta z koncertami i atrakcjami',
    startDate: '2026-06-15T10:00:00Z',
    endDate: '2026-06-17T22:00:00Z',
    location: {
      name: 'Plac Wolności',
      address: 'Plac Wolności 1, Radzyń Podlaski',
      coordinates: { lat: 51.9547, lng: 22.6176 }
    },
    category: { id: 1, name: 'Kultura', slug: 'kultura' },
    organizer: { name: 'Urząd Miasta', phone: '+48 83 355 20 00' },
    featuredImage: '/images/event-1.jpg',
    isFeatured: true,
    status: 'upcoming'
  },
  // ... more events
]
```

### Places Mock Data

```typescript
const mockPlaces = [
  {
    id: 1,
    name: 'Pałac Potockich',
    slug: 'palac-potockich',
    description: 'Barokowy pałac z XVIII wieku, siedziba muzeum',
    category: { id: 1, name: 'Zabytki', slug: 'zabytki' },
    address: 'ul. Potockiego 1, Radzyń Podlaski',
    coordinates: { lat: 51.9547, lng: 22.6176 },
    images: ['/images/palac-1.jpg', '/images/palac-2.jpg'],
    openingHours: {
      monday: '10:00-16:00',
      tuesday: '10:00-16:00',
      wednesday: '10:00-16:00',
      thursday: '10:00-16:00',
      friday: '10:00-16:00',
      saturday: '10:00-18:00',
      sunday: '10:00-18:00'
    },
    contact: {
      phone: '+48 83 355 20 00',
      email: 'muzeum@radzyn.pl',
      website: 'https://muzeum.radzyn.pl'
    },
    features: ['Parking', 'Winda', 'Toalety', 'Kawiarnia'],
    rating: 4.5,
    reviews: 128,
    isFeatured: true
  },
  // ... more places
]
```

### Weather Mock Data

```typescript
const mockWeather = {
  current: {
    temperature: 5,
    feelsLike: 2,
    condition: 'Cloudy',
    icon: 'cloudy',
    humidity: 75,
    windSpeed: 12,
    windDirection: 'NW',
    pressure: 1015,
    visibility: 10,
    uvIndex: 2
  },
  forecast: [
    {
      date: '2026-01-12',
      temperature: { min: -2, max: 4 },
      condition: 'Partly Cloudy',
      icon: 'partly-cloudy',
      precipitation: 10
    },
    {
      date: '2026-01-13',
      temperature: { min: -1, max: 5 },
      condition: 'Sunny',
      icon: 'sunny',
      precipitation: 0
    },
    // ... more days
  ]
}
```

### Contact Form Mock Data

```typescript
const mockContactForm = {
  fields: [
    {
      name: 'name',
      label: 'Imię i nazwisko',
      type: 'text',
      required: true,
      validation: { minLength: 2, maxLength: 100 }
    },
    {
      name: 'email',
      label: 'Adres e-mail',
      type: 'email',
      required: true,
      validation: { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }
    },
    {
      name: 'phone',
      label: 'Numer telefonu',
      type: 'tel',
      required: false,
      validation: { pattern: /^[+]?[\d\s-]{9,15}$/ }
    },
    {
      name: 'subject',
      label: 'Temat',
      type: 'select',
      required: true,
      options: [
        { value: 'general', label: 'Pytanie ogólne' },
        { value: 'report', label: 'Zgłoszenie' },
        { value: 'cooperation', label: 'Współpraca' },
        { value: 'other', label: 'Inne' }
      ]
    },
    {
      name: 'message',
      label: 'Treść wiadomości',
      type: 'textarea',
      required: true,
      validation: { minLength: 10, maxLength: 2000 }
    },
    {
      name: 'consent',
      label: 'Wyrażam zgodę na przetwarzanie danych osobowych',
      type: 'checkbox',
      required: true
    }
  ]
}
```

### Dashboard Mock Data

```typescript
const mockDashboard = {
  stats: [
    {
      title: 'Odwiedzin dzisiaj',
      value: 1234,
      change: { value: 12, type: 'increase' },
      icon: 'visibility'
    },
    {
      title: 'Nowych artykułów',
      value: 5,
      change: { value: 2, type: 'increase' },
      icon: 'article'
    },
    {
      title: 'Wydarzeń',
      value: 12,
      change: { value: 0, type: 'neutral' },
      icon: 'event'
    },
    {
      title: 'Miejsc',
      value: 48,
      change: { value: 3, type: 'increase' },
      icon: 'place'
    }
  ],
  recentActivity: [
    {
      id: 1,
      type: 'news_published',
      message: 'Opublikowano artykuł "Nowa inwestycja"',
      timestamp: '2026-01-11T10:30:00Z',
      user: 'Jan Kowalski'
    },
    {
      id: 2,
      type: 'event_created',
      message: 'Dodano wydarzenie "Dni Radzynia 2026"',
      timestamp: '2026-01-11T09:15:00Z',
      user: 'Anna Nowak'
    },
    // ... more activities
  ],
  upcomingEvents: [
    {
      id: 1,
      title: 'Dni Radzynia 2026',
      date: '2026-06-15',
      status: 'confirmed'
    },
    // ... more events
  ]
}
```

---

## Implementation Priority

### Phase 1: Foundation (Week 1-2)
1. Set up Joy UI theme
2. Create design tokens
3. Implement color system
4. Implement typography system
5. Implement spacing system

### Phase 2: Core Components (Week 3-4)
1. Button components
2. Form components
3. Card components
4. Navigation components
5. Layout components

### Phase 3: Page Migration (Week 5-8)
1. Homepage
2. News pages
3. Events pages
4. Places pages
5. Contact page

### Phase 4: Admin Panel (Week 9-10)
1. Dashboard
2. Content management
3. User management
4. Settings

### Phase 5: Polish & Testing (Week 11-12)
1. Accessibility audit
2. Cross-browser testing
3. Performance optimization
4. Documentation

---

## Next Steps

1. Review this design system with stakeholders
2. Approve color palette and typography
3. Set up Joy UI in the project
4. Begin Phase 1 implementation
5. Create component library documentation
6. Start migrating existing components

---

## Resources

- [Joy UI Documentation](https://mui.com/joy-ui/)
- [Material Icons](https://mui.com/material-ui/material-icons/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Design Systems Handbook](https://www.designsystems.com/)

---

**Document Status:** Ready for Review  
**Last Updated:** 2026-01-11  
**Next Review:** After Phase 1 completion
