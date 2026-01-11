# Component Library Specification
## Joy UI Components for Radzyn.city

**Version:** 1.0  
**Date:** 2026-01-11  
**Status:** Ready for Implementation

---

## Table of Contents

1. [Overview](#overview)
2. [Component Categories](#component-categories)
3. [Foundation Components](#foundation-components)
4. [Navigation Components](#navigation-components)
5. [Form Components](#form-components)
6. [Feedback Components](#feedback-components)
7. [Data Display Components](#data-display-components)
8. [Layout Components](#layout-components)
9. [Business Components](#business-components)
10. [Component Props Reference](#component-props-reference)

---

## Overview

This document specifies all Joy UI components to be implemented for Radzyn.city. Each component includes usage examples, props, and implementation notes.

### Component Naming Convention

- Use PascalCase for component names
- Prefix business-specific components with `Radzyn` (e.g., `RadzynNewsCard`)
- Keep component names descriptive and concise

### File Structure

```
src/components/
├── foundation/          # Basic Joy UI wrappers
│   ├── Button.tsx
│   ├── Typography.tsx
│   └── ...
├── navigation/          # Navigation components
│   ├── Navigation.tsx
│   ├── Breadcrumbs.tsx
│   └── ...
├── forms/              # Form components
│   ├── ContactForm.tsx
│   ├── SearchInput.tsx
│   └── ...
├── feedback/           # Feedback components
│   ├── Alert.tsx
│   ├── Snackbar.tsx
│   └── ...
├── data-display/       # Data display components
│   ├── NewsCard.tsx
│   ├── EventCard.tsx
│   └── ...
├── layout/             # Layout components
│   ├── PageContainer.tsx
│   ├── Section.tsx
│   └── ...
└── business/           # Business-specific components
    ├── WeatherWidget.tsx
    ├── CityMapWidget.tsx
    └── ...
```

---

## Component Categories

### 1. Foundation Components
Basic Joy UI components with consistent styling

### 2. Navigation Components
Components for site navigation and wayfinding

### 3. Form Components
Input and form-related components

### 4. Feedback Components
Components for user feedback and notifications

### 5. Data Display Components
Components for displaying content (news, events, places)

### 6. Layout Components
Components for page and section layouts

### 7. Business Components
Domain-specific components (weather, map, etc.)

---

## Foundation Components

### Button

**File:** `src/components/foundation/Button.tsx`

**Description:** Standardized button component with all Joy UI variants

**Variants:**
- `solid` - Primary actions
- `soft` - Secondary actions
- `outlined` - Tertiary actions
- `plain` - Minimal actions

**Sizes:**
- `sm` - Small (32px height)
- `md` - Medium (40px height)
- `lg` - Large (48px height)

**Colors:**
- `primary` - Main brand color
- `secondary` - Secondary brand color
- `success` - Success actions
- `danger` - Destructive actions
- `neutral` - Neutral actions

**Usage:**
```tsx
import { Button } from '@/components/foundation/Button';

// Primary button
<Button variant="solid" color="primary" size="md">
  Submit
</Button>

// Secondary button
<Button variant="outlined" color="neutral" size="md">
  Cancel
</Button>

// Icon button
<Button variant="solid" color="primary" startDecorator={<Add />}>
  Add Item
</Button>

// Loading state
<Button variant="solid" color="primary" loading>
  Loading...
</Button>
```

**Props:**
```typescript
interface ButtonProps extends Omit<JoyButtonProps, 'variant' | 'color' | 'size'> {
  variant?: 'solid' | 'soft' | 'outlined' | 'plain';
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  fullWidth?: boolean;
  startDecorator?: React.ReactNode;
  endDecorator?: React.ReactNode;
}
```

---

### Typography

**File:** `src/components/foundation/Typography.tsx`

**Description:** Standardized typography component

**Levels:**
- `display1` - 4rem, hero titles
- `display2` - 3rem, section titles
- `h1` - 2.5rem, page titles
- `h2` - 2rem, section headings
- `h3` - 1.75rem, subsection headings
- `h4` - 1.5rem, card titles
- `h5` - 1.25rem, small headings
- `h6` - 1rem, smallest headings
- `body1` - 1rem, body text
- `body2` - 0.875rem, secondary text
- `caption` - 0.75rem, captions
- `overline` - 0.75rem, labels

**Usage:**
```tsx
import { Typography } from '@/components/foundation/Typography';

<Typography level="h1">Page Title</Typography>
<Typography level="body1">Body text content</Typography>
<Typography level="caption" color="neutral">
  Caption text
</Typography>
```

---

### Card

**File:** `src/components/foundation/Card.tsx`

**Description:** Standardized card component

**Variants:**
- `outlined` - Bordered card
- `soft` - Soft background
- `solid` - Solid background

**Usage:**
```tsx
import { Card } from '@/components/foundation/Card';

<Card variant="outlined">
  <CardContent>
    <Typography level="h4">Card Title</Typography>
    <Typography level="body1">Card content</Typography>
  </CardContent>
</Card>
```

---

### Icon

**File:** `src/components/foundation/Icon.tsx`

**Description:** Standardized icon wrapper

**Sizes:**
- `xs` - 16px
- `sm` - 20px
- `md` - 24px
- `lg` - 32px
- `xl` - 48px

**Usage:**
```tsx
import { Icon } from '@/components/foundation/Icon';
import { Search } from '@mui/icons-material';

<Icon size="md">
  <Search />
</Icon>
```

---

## Navigation Components

### Navigation

**File:** `src/components/navigation/Navigation.tsx`

**Description:** Main site navigation with responsive menu

**Features:**
- Responsive hamburger menu on mobile
- Active state highlighting
- Dropdown support
- Keyboard navigation

**Usage:**
```tsx
import { Navigation } from '@/components/navigation/Navigation';

<Navigation
  logo="/logo.svg"
  items={[
    { label: 'Strona główna', href: '/' },
    { label: 'Aktualności', href: '/news' },
    { label: 'Wydarzenia', href: '/events' },
    { label: 'Miejsca', href: '/places' },
    { label: 'Kontakt', href: '/contact' },
  ]}
  currentPath="/news"
/>
```

**Props:**
```typescript
interface NavigationProps {
  logo: string;
  items: NavItem[];
  currentPath?: string;
  variant?: 'default' | 'transparent' | 'solid';
}
```

---

### Breadcrumbs

**File:** `src/components/navigation/Breadcrumbs.tsx`

**Description:** Breadcrumb navigation component

**Usage:**
```tsx
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';

<Breadcrumbs
  items={[
    { label: 'Strona główna', href: '/' },
    { label: 'Aktualności', href: '/news' },
    { label: 'Gospodarka', href: '/news/category/gospodarka' },
    { label: 'Nowa inwestycja' },
  ]}
/>
```

---

### Tabs

**File:** `src/components/navigation/Tabs.tsx`

**Description:** Tab navigation component

**Usage:**
```tsx
import { Tabs } from '@/components/navigation/Tabs';

<Tabs
  tabs={[
    { label: 'Wszystkie', value: 'all' },
    { label: 'Gospodarka', value: 'economy' },
    { label: 'Kultura', value: 'culture' },
    { label: 'Sport', value: 'sport' },
  ]}
  defaultValue="all"
  onChange={(value) => console.log(value)}
>
  <Tabs.Panel value="all">All content</Tabs.Panel>
  <Tabs.Panel value="economy">Economy content</Tabs.Panel>
</Tabs>
```

---

### Pagination

**File:** `src/components/navigation/Pagination.tsx`

**Description:** Pagination component for lists

**Usage:**
```tsx
import { Pagination } from '@/components/navigation/Pagination';

<Pagination
  currentPage={1}
  totalPages={10}
  onPageChange={(page) => console.log(page)}
/>
```

---

## Form Components

### ContactForm

**File:** `src/components/forms/ContactForm.tsx`

**Description:** Contact form with validation

**Fields:**
- Name (text, required)
- Email (email, required)
- Phone (tel, optional)
- Subject (select, required)
- Message (textarea, required)
- Consent (checkbox, required)

**Usage:**
```tsx
import { ContactForm } from '@/components/forms/ContactForm';

<ContactForm
  onSubmit={(data) => console.log(data)}
  subjects={[
    { value: 'general', label: 'Pytanie ogólne' },
    { value: 'report', label: 'Zgłoszenie' },
    { value: 'cooperation', label: 'Współpraca' },
  ]}
/>
```

---

### SearchInput

**File:** `src/components/forms/SearchInput.tsx`

**Description:** Search input with autocomplete

**Features:**
- Debounced search
- Autocomplete suggestions
- Clear button
- Loading state

**Usage:**
```tsx
import { SearchInput } from '@/components/forms/SearchInput';

<SearchInput
  placeholder="Szukaj..."
  onSearch={(query) => console.log(query)}
  suggestions={['Suggestion 1', 'Suggestion 2']}
/>
```

---

### FilterBar

**File:** `src/components/forms/FilterBar.tsx`

**Description:** Filter bar for content lists

**Usage:**
```tsx
import { FilterBar } from '@/components/forms/FilterBar';

<FilterBar
  filters={[
    {
      name: 'category',
      label: 'Kategoria',
      type: 'select',
      options: [
        { value: 'all', label: 'Wszystkie' },
        { value: 'economy', label: 'Gospodarka' },
      ],
    },
    {
      name: 'date',
      label: 'Data',
      type: 'date',
    },
  ]}
  onFilterChange={(filters) => console.log(filters)}
/>
```

---

### FormField

**File:** `src/components/forms/FormField.tsx`

**Description:** Reusable form field with label and error

**Usage:**
```tsx
import { FormField } from '@/components/forms/FormField';

<FormField
  label="Imię"
  error="To pole jest wymagane"
  required
>
  <Input placeholder="Wprowadź imię" />
</FormField>
```

---

## Feedback Components

### Alert

**File:** `src/components/feedback/Alert.tsx`

**Description:** Alert component for messages

**Variants:**
- `success` - Success messages
- `warning` - Warning messages
- `error` - Error messages
- `info` - Information messages

**Usage:**
```tsx
import { Alert } from '@/components/feedback/Alert';

<Alert variant="soft" color="success">
  Formularz został wysłany pomyślnie!
</Alert>

<Alert variant="outlined" color="error" onClose={() => {}}>
  Wystąpił błąd. Spróbuj ponownie.
</Alert>
```

---

### Snackbar

**File:** `src/components/feedback/Snackbar.tsx`

**Description:** Toast notification component

**Usage:**
```tsx
import { Snackbar } from '@/components/feedback/Snackbar';

<Snackbar
  open={true}
  message="Zapisano pomyślnie"
  color="success"
  onClose={() => {}}
  autoHideDuration={3000}
/>
```

---

### LoadingSpinner

**File:** `src/components/feedback/LoadingSpinner.tsx`

**Description:** Loading spinner component

**Sizes:**
- `sm` - 24px
- `md` - 40px
- `lg` - 56px

**Usage:**
```tsx
import { LoadingSpinner } from '@/components/feedback/LoadingSpinner';

<LoadingSpinner size="md" />
```

---

### EmptyState

**File:** `src/components/feedback/EmptyState.tsx`

**Description:** Empty state component

**Usage:**
```tsx
import { EmptyState } from '@/components/feedback/EmptyState';

<EmptyState
  icon={<Article />}
  title="Brak artykułów"
  description="Nie znaleziono żadnych artykułów w tej kategorii."
  action={
    <Button variant="solid" color="primary">
      Przeglądaj inne kategorie
    </Button>
  }
/>
```

---

## Data Display Components

### NewsCard

**File:** `src/components/data-display/NewsCard.tsx`

**Description:** News article card component

**Variants:**
- `default` - Standard card
- `featured` - Featured card with larger image
- `compact` - Compact card for lists

**Usage:**
```tsx
import { NewsCard } from '@/components/data-display/NewsCard';

<NewsCard
  title="Nowa inwestycja w Radzyniu Podlaskim"
  excerpt="Miasto ogłasza nową inwestycję infrastrukturalną..."
  image="/images/news-1.jpg"
  category={{ name: 'Gospodarka', slug: 'gospodarka' }}
  date="2026-01-10"
  slug="nowa-inwestycja"
  variant="default"
/>
```

---

### EventCard

**File:** `src/components/data-display/EventCard.tsx`

**Description:** Event card component

**Usage:**
```tsx
import { EventCard } from '@/components/data-display/EventCard';

<EventCard
  title="Dni Radzynia 2026"
  description="Coroczne święto miasta z koncertami i atrakcjami"
  image="/images/event-1.jpg"
  date="2026-06-15"
  time="10:00"
  location="Plac Wolności"
  category={{ name: 'Kultura', slug: 'kultura' }}
  slug="dni-radzynia-2026"
  isFeatured
/>
```

---

### PlaceCard

**File:** `src/components/data-display/PlaceCard.tsx`

**Description:** Place/location card component

**Usage:**
```tsx
import { PlaceCard } from '@/components/data-display/PlaceCard';

<PlaceCard
  name="Pałac Potockich"
  description="Barokowy pałac z XVIII wieku, siedziba muzeum"
  image="/images/palac-1.jpg"
  category={{ name: 'Zabytki', slug: 'zabytki' }}
  address="ul. Potockiego 1, Radzyń Podlaski"
  rating={4.5}
  reviews={128}
  slug="palac-potockich"
/>
```

---

### NewsFeed

**File:** `src/components/data-display/NewsFeed.tsx`

**Description:** News feed with filters and pagination

**Usage:**
```tsx
import { NewsFeed } from '@/components/data-display/NewsFeed';

<NewsFeed
  news={mockNews}
  categories={mockCategories}
  tags={mockTags}
  onFilterChange={(filters) => console.log(filters)}
  onPageChange={(page) => console.log(page)}
  currentPage={1}
  totalPages={5}
/>
```

---

### EventList

**File:** `src/components/data-display/EventList.tsx`

**Description:** Event list with calendar view

**Usage:**
```tsx
import { EventList } from '@/components/data-display/EventList';

<EventList
  events={mockEvents}
  view="list" // or 'calendar' or 'grid'
  onEventClick={(event) => console.log(event)}
  onDateChange={(date) => console.log(date)}
/>
```

---

### PlacesGrid

**File:** `src/components/data-display/PlacesGrid.tsx`

**Description:** Grid of place cards

**Usage:**
```tsx
import { PlacesGrid } from '@/components/data-display/PlacesGrid';

<PlacesGrid
  places={mockPlaces}
  columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
  onPlaceClick={(place) => console.log(place)}
/>
```

---

## Layout Components

### PageContainer

**File:** `src/components/layout/PageContainer.tsx`

**Description:** Page wrapper with consistent padding

**Usage:**
```tsx
import { PageContainer } from '@/components/layout/PageContainer';

<PageContainer maxWidth="xl">
  <Typography level="h1">Page Title</Typography>
  {/* Page content */}
</PageContainer>
```

---

### Section

**File:** `src/components/layout/Section.tsx`

**Description:** Section wrapper with background and spacing

**Usage:**
```tsx
import { Section } from '@/components/layout/Section';

<Section variant="default" spacing="lg">
  <Typography level="h2">Section Title</Typography>
  {/* Section content */}
</Section>
```

**Variants:**
- `default` - White background
- `primary` - Primary color background
- `secondary` - Secondary color background
- `neutral` - Neutral gray background

---

### Hero

**File:** `src/components/layout/Hero.tsx`

**Description:** Hero section component

**Usage:**
```tsx
import { Hero } from '@/components/layout/Hero';

<Hero
  title="Witamy w Radzyniu Podlaskim"
  subtitle="Odkryj uroki naszego miasta"
  image="/images/hero.jpg"
  actions={[
    { label: 'Poznaj miasto', href: '/city', variant: 'solid' },
    { label: 'Zobacz wydarzenia', href: '/events', variant: 'outlined' },
  ]}
/>
```

---

### Footer

**File:** `src/components/layout/Footer.tsx`

**Description:** Site footer component

**Usage:**
```tsx
import { Footer } from '@/components/layout/Footer';

<Footer
  columns={[
    {
      title: 'O nas',
      links: [
        { label: 'Historia', href: '/about/history' },
        { label: 'Władze', href: '/about/authorities' },
      ],
    },
    {
      title: 'Informacje',
      links: [
        { label: 'Aktualności', href: '/news' },
        { label: 'Wydarzenia', href: '/events' },
      ],
    },
  ]}
  socialLinks={[
    { platform: 'facebook', href: 'https://facebook.com' },
    { platform: 'twitter', href: 'https://twitter.com' },
  ]}
  copyright="© 2026 Radzyn.city"
/>
```

---

### Sidebar

**File:** `src/components/layout/Sidebar.tsx`

**Description:** Sidebar component for layouts

**Usage:**
```tsx
import { Sidebar } from '@/components/layout/Sidebar';

<Sidebar
  position="left"
  width={280}
  collapsible
>
  <Sidebar.Item label="Dashboard" href="/admin" icon={<Dashboard />} />
  <Sidebar.Item label="News" href="/admin/news" icon={<Article />} />
  <Sidebar.Item label="Events" href="/admin/events" icon={<Event />} />
</Sidebar>
```

---

## Business Components

### WeatherWidget

**File:** `src/components/business/WeatherWidget.tsx`

**Description:** Weather information widget

**Usage:**
```tsx
import { WeatherWidget } from '@/components/business/WeatherWidget';

<WeatherWidget
  current={{
    temperature: 5,
    condition: 'Cloudy',
    icon: 'cloudy',
    humidity: 75,
    windSpeed: 12,
  }}
  forecast={[
    { date: '2026-01-12', min: -2, max: 4, icon: 'partly-cloudy' },
    { date: '2026-01-13', min: -1, max: 5, icon: 'sunny' },
  ]}
  location="Radzyń Podlaski"
/>
```

---

### CityMapWidget

**File:** `src/components/business/CityMapWidget.tsx`

**Description:** Interactive city map widget

**Usage:**
```tsx
import { CityMapWidget } from '@/components/business/CityMapWidget';

<CityMapWidget
  center={{ lat: 51.9547, lng: 22.6176 }}
  zoom={14}
  markers={[
    {
      id: 1,
      position: { lat: 51.9547, lng: 22.6176 },
      title: 'Pałac Potockich',
      type: 'landmark',
    },
  ]}
  onMarkerClick={(marker) => console.log(marker)}
/>
```

---

### DashboardWidget

**File:** `src/components/business/DashboardWidget.tsx`

**Description:** Dashboard statistics widget

**Usage:**
```tsx
import { DashboardWidget } from '@/components/business/DashboardWidget';

<DashboardWidget
  title="Odwiedzin dzisiaj"
  value={1234}
  change={{ value: 12, type: 'increase' }}
  icon={<Visibility />}
  color="primary"
/>
```

---

### CityHighlights

**File:** `src/components/business/CityHighlights.tsx`

**Description:** City highlights showcase

**Usage:**
```tsx
import { CityHighlights } from '@/components/business/CityHighlights';

<CityHighlights
  highlights={[
    {
      title: 'Pałac Potockich',
      description: 'Barokowy pałac z XVIII wieku',
      image: '/images/palac.jpg',
      link: '/places/palac-potockich',
    },
    {
      title: 'Kościół Farny',
      description: 'Gotycki kościół z XV wieku',
      image: '/images/kosciol.jpg',
      link: '/places/kosciol-farny',
    },
  ]}
/>
```

---

## Component Props Reference

### Common Props

#### BaseComponentProps
```typescript
interface BaseComponentProps {
  className?: string;
  sx?: SxProps;
  id?: string;
  'data-testid'?: string;
}
```

#### WithChildrenProps
```typescript
interface WithChildrenProps {
  children: React.ReactNode;
}
```

---

### Navigation Props

#### NavItem
```typescript
interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  children?: NavItem[];
  badge?: number;
}
```

#### BreadcrumbItem
```typescript
interface BreadcrumbItem {
  label: string;
  href?: string;
}
```

---

### Data Display Props

#### NewsItem
```typescript
interface NewsItem {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image?: string;
  category: Category;
  tags: Tag[];
  author: Author;
  publishedAt: string;
  views?: number;
}
```

#### EventItem
```typescript
interface EventItem {
  id: number;
  title: string;
  slug: string;
  description: string;
  startDate: string;
  endDate?: string;
  location: Location;
  category: Category;
  image?: string;
  isFeatured?: boolean;
}
```

#### PlaceItem
```typescript
interface PlaceItem {
  id: number;
  name: string;
  slug: string;
  description: string;
  category: Category;
  address: string;
  coordinates: Coordinates;
  images: string[];
  rating?: number;
  reviews?: number;
  isFeatured?: boolean;
}
```

---

### Form Props

#### FormField
```typescript
interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'select' | 'textarea' | 'checkbox' | 'date';
  required?: boolean;
  placeholder?: string;
  options?: SelectOption[];
  validation?: ValidationRule;
}

interface ValidationRule {
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => string | undefined;
}
```

---

## Implementation Notes

### Component Development Guidelines

1. **Type Safety**
   - Use TypeScript for all components
   - Define clear prop interfaces
   - Use proper generic types

2. **Accessibility**
   - All interactive elements must be keyboard accessible
   - Use proper ARIA attributes
   - Include focus indicators

3. **Performance**
   - Use React.memo for expensive components
   - Implement proper key props for lists
   - Lazy load heavy components

4. **Testing**
   - Write unit tests for all components
   - Test accessibility with axe-core
   - Test responsive behavior

5. **Documentation**
   - Document all props with JSDoc
   - Include usage examples
   - Note any limitations

---

## Migration Checklist

### Phase 1: Foundation
- [ ] Button component
- [ ] Typography component
- [ ] Card component
- [ ] Icon component

### Phase 2: Navigation
- [ ] Navigation component
- [ ] Breadcrumbs component
- [ ] Tabs component
- [ ] Pagination component

### Phase 3: Forms
- [ ] ContactForm component
- [ ] SearchInput component
- [ ] FilterBar component
- [ ] FormField component

### Phase 4: Feedback
- [ ] Alert component
- [ ] Snackbar component
- [ ] LoadingSpinner component
- [ ] EmptyState component

### Phase 5: Data Display
- [ ] NewsCard component
- [ ] EventCard component
- [ ] PlaceCard component
- [ ] NewsFeed component
- [ ] EventList component
- [ ] PlacesGrid component

### Phase 6: Layout
- [ ] PageContainer component
- [ ] Section component
- [ ] Hero component
- [ ] Footer component
- [ ] Sidebar component

### Phase 7: Business
- [ ] WeatherWidget component
- [ ] CityMapWidget component
- [ ] DashboardWidget component
- [ ] CityHighlights component

---

**Document Status:** Ready for Implementation  
**Last Updated:** 2026-01-11
