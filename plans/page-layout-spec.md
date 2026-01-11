# Page Layout Specifications
## Joy UI Page Templates for Radzyn.city

**Version:** 1.0  
**Date:** 2026-01-11  
**Status:** Ready for Implementation

---

## Table of Contents

1. [Overview](#overview)
2. [Layout Architecture](#layout-architecture)
3. [Page Templates](#page-templates)
4. [Responsive Breakpoints](#responsive-breakpoints)
5. [Layout Components](#layout-components)
6. [Page-Specific Layouts](#page-specific-layouts)
7. [Layout Patterns](#layout-patterns)
8. [Implementation Guidelines](#implementation-guidelines)

---

## Overview

This document defines all page layouts for Radzyn.city using Joy UI components. Each page follows a consistent structure while allowing for flexibility in content presentation.

### Layout Principles

1. **Consistency** - All pages share common layout patterns
2. **Responsiveness** - Mobile-first approach with breakpoints
3. **Accessibility** - Semantic HTML and proper heading hierarchy
4. **Performance** - Optimized for fast loading and rendering
5. **Maintainability** - Reusable layout components

### Layout Hierarchy

```
Layout (Root)
├── Header/Navigation
├── Main Content
│   ├── Hero (optional)
│   ├── Page Header
│   ├── Content Sections
│   └── Sidebar (optional)
└── Footer
```

---

## Layout Architecture

### Root Layout

**File:** `src/app/layout.tsx`

**Description:** Root layout wrapper for the entire application

**Structure:**
```tsx
<Html>
  <Head>
    {/* Meta tags, fonts, styles */}
  </Head>
  <body>
    <ThemeRegistry>
      <CssBaseline />
      <Navigation />
      <main>{children}</main>
      <Footer />
    </ThemeRegistry>
  </body>
</Html>
```

**Features:**
- Global theme provider
- CSS baseline for consistent styling
- Persistent navigation
- Persistent footer

---

### Page Layout

**File:** `src/components/layout/PageLayout.tsx`

**Description:** Standard page layout wrapper

**Structure:**
```tsx
<PageLayout
  title="Page Title"
  subtitle="Optional subtitle"
  breadcrumbs={[...]}
  showSidebar={false}
>
  {children}
</PageLayout>
```

**Props:**
```typescript
interface PageLayoutProps {
  title?: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
  showSidebar?: boolean;
  sidebarContent?: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'full-width' | 'centered';
}
```

---

## Page Templates

### 1. Homepage Layout

**File:** `src/app/page.tsx`

**Description:** Main landing page layout

**Sections:**
1. Hero Section
2. Quick Links / Quick Actions
3. Latest News (3 featured)
4. Upcoming Events (3 featured)
5. City Highlights (6 items)
6. Weather Widget
7. Footer

**Layout Structure:**
```tsx
<PageLayout variant="full-width">
  {/* Hero Section */}
  <Hero
    title="Witamy w Radzyniu Podlaskim"
    subtitle="Odkryj uroki naszego miasta"
    image="/images/hero.jpg"
    actions={[
      { label: 'Poznaj miasto', href: '/city', variant: 'solid' },
      { label: 'Zobacz wydarzenia', href: '/events', variant: 'outlined' },
    ]}
  />

  {/* Quick Links */}
  <Section variant="default" spacing="md">
    <QuickLinks
      links={[
        { label: 'Aktualności', href: '/news', icon: <Article /> },
        { label: 'Wydarzenia', href: '/events', icon: <Event /> },
        { label: 'Miejsca', href: '/places', icon: <Place /> },
        { label: 'Kontakt', href: '/contact', icon: <Contact /> },
      ]}
    />
  </Section>

  {/* Latest News */}
  <Section variant="neutral" spacing="lg">
    <SectionHeader
      title="Najnowsze aktualności"
      action={{ label: 'Zobacz wszystkie', href: '/news' }}
    />
    <NewsGrid news={featuredNews} columns={{ xs: 1, md: 3 }} />
  </Section>

  {/* Upcoming Events */}
  <Section variant="default" spacing="lg">
    <SectionHeader
      title="Nadchodzące wydarzenia"
      action={{ label: 'Kalendarz', href: '/events' }}
    />
    <EventGrid events={upcomingEvents} columns={{ xs: 1, md: 3 }} />
  </Section>

  {/* City Highlights */}
  <Section variant="primary" spacing="lg">
    <SectionHeader
      title="Poznaj miasto"
      subtitle="Najciekawsze miejsca w Radzyniu Podlaskim"
      action={{ label: 'Wszystkie miejsca', href: '/places' }}
    />
    <CityHighlights highlights={cityHighlights} />
  </Section>

  {/* Weather Widget */}
  <Section variant="default" spacing="md">
    <WeatherWidget {...weatherData} />
  </Section>
</PageLayout>
```

---

### 2. News List Page Layout

**File:** `src/app/news/page.tsx`

**Description:** News listing page with filters

**Sections:**
1. Page Header
2. Filters (Category, Date, Search)
3. News Grid
4. Pagination
5. Newsletter Signup

**Layout Structure:**
```tsx
<PageLayout
  title="Aktualności"
  subtitle="Bądź na bieżąco z wydarzeniami w mieście"
  breadcrumbs={[
    { label: 'Strona główna', href: '/' },
    { label: 'Aktualności' },
  ]}
>
  {/* Filters */}
  <Section variant="default" spacing="md">
    <NewsFilters
      categories={categories}
      tags={tags}
      onFilterChange={handleFilterChange}
    />
  </Section>

  {/* News Grid */}
  <Section variant="default" spacing="lg">
    <NewsGrid
      news={filteredNews}
      columns={{ xs: 1, sm: 2, lg: 3 }}
      loading={loading}
    />
  </Section>

  {/* Pagination */}
  <Section variant="default" spacing="md">
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
    />
  </Section>

  {/* Newsletter */}
  <Section variant="primary" spacing="lg">
    <NewsletterSignup />
  </Section>
</PageLayout>
```

---

### 3. News Detail Page Layout

**File:** `src/app/news/[slug]/page.tsx`

**Description:** Single news article page

**Sections:**
1. Breadcrumbs
2. Article Header (Title, Date, Author, Category)
3. Featured Image
4. Article Content
5. Tags
6. Related News
7. Comments (optional)

**Layout Structure:**
```tsx
<PageLayout
  breadcrumbs={[
    { label: 'Strona główna', href: '/' },
    { label: 'Aktualności', href: '/news' },
    { label: article.category.name, href: `/news/category/${article.category.slug}` },
    { label: article.title },
  ]}
  showSidebar={true}
  sidebarContent={<NewsSidebar article={article} />}
>
  {/* Article Header */}
  <ArticleHeader
    title={article.title}
    date={article.publishedAt}
    author={article.author}
    category={article.category}
    readingTime={article.readingTime}
  />

  {/* Featured Image */}
  {article.image && (
    <ArticleImage src={article.image} alt={article.title} />
  )}

  {/* Article Content */}
  <ArticleContent content={article.content} />

  {/* Tags */}
  <ArticleTags tags={article.tags} />

  {/* Related News */}
  <Section variant="neutral" spacing="lg">
    <SectionHeader title="Powiązane artykuły" />
    <NewsGrid news={relatedNews} columns={{ xs: 1, md: 2 }} />
  </Section>
</PageLayout>
```

---

### 4. Events Page Layout

**File:** `src/app/events/page.tsx`

**Description:** Events listing page with calendar view

**Sections:**
1. Page Header
2. View Toggle (List/Calendar)
3. Filters (Category, Date Range)
4. Events Content (List or Calendar)
5. Newsletter Signup

**Layout Structure:**
```tsx
<PageLayout
  title="Wydarzenia"
  subtitle="Kalendarz wydarzeń w Radzyniu Podlaskim"
  breadcrumbs={[
    { label: 'Strona główna', href: '/' },
    { label: 'Wydarzenia' },
  ]}
>
  {/* View Toggle & Filters */}
  <Section variant="default" spacing="md">
    <Stack direction="row" spacing={2} alignItems="center">
      <ViewToggle
        views={['list', 'calendar', 'grid']}
        currentView={view}
        onViewChange={setView}
      />
      <EventFilters
        categories={categories}
        onFilterChange={handleFilterChange}
      />
    </Stack>
  </Section>

  {/* Events Content */}
  <Section variant="default" spacing="lg">
    {view === 'list' && (
      <EventList events={filteredEvents} />
    )}
    {view === 'calendar' && (
      <EventCalendar events={filteredEvents} />
    )}
    {view === 'grid' && (
      <EventGrid events={filteredEvents} columns={{ xs: 1, sm: 2, lg: 3 }} />
    )}
  </Section>
</PageLayout>
```

---

### 5. Places Page Layout

**File:** `src/app/places/page.tsx`

**Description:** Places listing page with map

**Sections:**
1. Page Header
2. Filters (Category, Rating, Features)
3. Split View (Map + List)
4. Newsletter Signup

**Layout Structure:**
```tsx
<PageLayout
  title="Miejsca"
  subtitle="Odkryj najciekawsze miejsca w mieście"
  breadcrumbs={[
    { label: 'Strona główna', href: '/' },
    { label: 'Miejsca' },
  ]}
>
  {/* Filters */}
  <Section variant="default" spacing="md">
    <PlaceFilters
      categories={categories}
      onFilterChange={handleFilterChange}
    />
  </Section>

  {/* Split View */}
  <Section variant="default" spacing="lg">
    <SplitView>
      <SplitView.Panel>
        <CityMapWidget
          markers={places.map(p => ({
            id: p.id,
            position: p.coordinates,
            title: p.name,
            type: p.category.slug,
          }))}
          onMarkerClick={handleMarkerClick}
        />
      </SplitView.Panel>
      <SplitView.Panel>
        <PlacesGrid
          places={filteredPlaces}
          columns={{ xs: 1 }}
          onPlaceClick={handlePlaceClick}
        />
      </SplitView.Panel>
    </SplitView>
  </Section>
</PageLayout>
```

---

### 6. Place Detail Page Layout

**File:** `src/app/places/[id]/page.tsx`

**Description:** Single place detail page

**Sections:**
1. Breadcrumbs
2. Place Header (Name, Category, Rating)
3. Image Gallery
4. Description
5. Details (Address, Hours, Contact)
6. Map
7. Reviews
8. Nearby Places

**Layout Structure:**
```tsx
<PageLayout
  breadcrumbs={[
    { label: 'Strona główna', href: '/' },
    { label: 'Miejsca', href: '/places' },
    { label: place.category.name, href: `/places?category=${place.category.slug}` },
    { label: place.name },
  ]}
>
  {/* Place Header */}
  <PlaceHeader
    name={place.name}
    category={place.category}
    rating={place.rating}
    reviews={place.reviews}
    isVerified={place.isVerified}
  />

  {/* Image Gallery */}
  <ImageGallery images={place.images} />

  {/* Description */}
  <Section variant="default" spacing="lg">
    <Typography level="h3">Opis</Typography>
    <Typography level="body1">{place.description}</Typography>
  </Section>

  {/* Details */}
  <Section variant="neutral" spacing="lg">
    <PlaceDetails
      address={place.address}
      hours={place.hours}
      contact={place.contact}
      features={place.features}
    />
  </Section>

  {/* Map */}
  <Section variant="default" spacing="lg">
    <Typography level="h3">Lokalizacja</Typography>
    <CityMapWidget
      center={place.coordinates}
      markers={[{
        id: place.id,
        position: place.coordinates,
        title: place.name,
        type: place.category.slug,
      }]}
    />
  </Section>

  {/* Reviews */}
  <Section variant="default" spacing="lg">
    <SectionHeader
      title="Opinie"
      subtitle={`${place.reviews} opinii`}
      action={{ label: 'Dodaj opinię', onClick: openReviewModal }}
    />
    <ReviewsList reviews={place.reviewsData} />
  </Section>

  {/* Nearby Places */}
  <Section variant="neutral" spacing="lg">
    <SectionHeader title="Pobliskie miejsca" />
    <PlacesGrid places={nearbyPlaces} columns={{ xs: 1, sm: 2, md: 3 }} />
  </Section>
</PageLayout>
```

---

### 7. Contact Page Layout

**File:** `src/app/contact/page.tsx`

**Description:** Contact page with form and information

**Sections:**
1. Page Header
2. Contact Information
3. Contact Form
4. Map
5. FAQ

**Layout Structure:**
```tsx
<PageLayout
  title="Kontakt"
  subtitle="Skontaktuj się z nami"
  breadcrumbs={[
    { label: 'Strona główna', href: '/' },
    { label: 'Kontakt' },
  ]}
>
  <Grid container spacing={4}>
    {/* Contact Information */}
    <Grid xs={12} md={5}>
      <Section variant="default" spacing="lg">
        <Typography level="h3">Informacje kontaktowe</Typography>
        <ContactInfo
          address="ul. Wolności 1, 21-500 Radzyń Podlaski"
          phone="+48 83 355 20 00"
          email="kontakt@radzyn.city"
          hours={{
            monday: '8:00 - 16:00',
            tuesday: '8:00 - 16:00',
            wednesday: '8:00 - 16:00',
            thursday: '8:00 - 16:00',
            friday: '8:00 - 16:00',
            saturday: 'Zamknięte',
            sunday: 'Zamknięte',
          }}
        />
      </Section>
    </Grid>

    {/* Contact Form */}
    <Grid xs={12} md={7}>
      <Section variant="neutral" spacing="lg">
        <Typography level="h3">Wyślij wiadomość</Typography>
        <ContactForm
          onSubmit={handleSubmit}
          subjects={[
            { value: 'general', label: 'Pytanie ogólne' },
            { value: 'report', label: 'Zgłoszenie' },
            { value: 'cooperation', label: 'Współpraca' },
          ]}
        />
      </Section>
    </Grid>
  </Grid>

  {/* Map */}
  <Section variant="default" spacing="lg">
    <Typography level="h3">Lokalizacja</Typography>
    <CityMapWidget
      center={{ lat: 51.9547, lng: 22.6176 }}
      markers={[{
        id: 1,
        position: { lat: 51.9547, lng: 22.6176 },
        title: 'Urząd Miasta',
        type: 'office',
      }]}
    />
  </Section>

  {/* FAQ */}
  <Section variant="neutral" spacing="lg">
    <SectionHeader title="Często zadawane pytania" />
    <AccordionGroup>
      <Accordion>
        <AccordionSummary>Jak mogę zgłosić usterkę?</AccordionSummary>
        <AccordionDetails>
          Usterki można zgłaszać telefonicznie pod numer +48 83 355 20 00
          lub za pomocą formularza kontaktowego.
        </AccordionDetails>
      </Accordion>
      {/* More FAQ items */}
    </AccordionGroup>
  </Section>
</PageLayout>
```

---

### 8. City Page Layout

**File:** `src/app/city/page.tsx`

**Description:** City information page

**Sections:**
1. Hero Section
2. City Statistics
3. History Section
4. Attractions
5. Weather Widget
6. Newsletter Signup

**Layout Structure:**
```tsx
<PageLayout variant="full-width">
  {/* Hero */}
  <Hero
    title="Radzyń Podlaski"
    subtitle="Miasto z tradycjami i perspektywami"
    image="/images/city-hero.jpg"
  />

  {/* Statistics */}
  <Section variant="primary" spacing="lg">
    <CityStats
      stats={[
        { label: 'Ludność', value: '16 000' },
        { label: 'Powierzchnia', value: '19,3 km²' },
        { label: 'Założenie', value: '1468' },
        { label: 'Zabytki', value: '47' },
      ]}
    />
  </Section>

  {/* History */}
  <Section variant="default" spacing="lg">
    <SectionHeader title="Historia miasta" />
    <Typography level="body1">
      Radzyń Podlaski został założony w 1468 roku przez Mikołaja Tarnowskiego...
    </Typography>
  </Section>

  {/* Attractions */}
  <Section variant="neutral" spacing="lg">
    <SectionHeader
      title="Atrakcje turystyczne"
      action={{ label: 'Wszystkie miejsca', href: '/places' }}
    />
    <CityHighlights highlights={attractions} />
  </Section>

  {/* Weather */}
  <Section variant="default" spacing="md">
    <WeatherWidget {...weatherData} />
  </Section>
</PageLayout>
```

---

### 9. Map Page Layout

**File:** `src/app/map/page.tsx`

**Description:** Interactive map page

**Sections:**
1. Page Header
2. Full-screen Map
3. Filter Sidebar
4. Place Details Panel

**Layout Structure:**
```tsx
<PageLayout
  title="Mapa miasta"
  subtitle="Interaktywna mapa Radzynia Podlaskiego"
  breadcrumbs={[
    { label: 'Strona główna', href: '/' },
    { label: 'Mapa' },
  ]}
>
  <MapLayout>
    {/* Filter Sidebar */}
    <MapSidebar>
      <MapFilters
        categories={categories}
        onFilterChange={handleFilterChange}
      />
      <PlaceList
        places={filteredPlaces}
        onPlaceClick={handlePlaceClick}
      />
    </MapSidebar>

    {/* Map */}
    <MapContainer>
      <CityMapWidget
        center={{ lat: 51.9547, lng: 22.6176 }}
        markers={places.map(p => ({
          id: p.id,
          position: p.coordinates,
          title: p.name,
          type: p.category.slug,
        }))}
        onMarkerClick={handleMarkerClick}
      />
    </MapContainer>

    {/* Details Panel */}
    {selectedPlace && (
      <MapDetailsPanel>
        <PlaceDetailsCard place={selectedPlace} />
      </MapDetailsPanel>
    )}
  </MapLayout>
</PageLayout>
```

---

### 10. Admin Dashboard Layout

**File:** `src/app/admin/page.tsx`

**Description:** Admin dashboard layout

**Sections:**
1. Sidebar Navigation
2. Top Bar
3. Dashboard Content
4. Statistics Cards
5. Recent Activity

**Layout Structure:**
```tsx
<AdminLayout>
  {/* Sidebar */}
  <AdminSidebar>
    <AdminSidebar.Item label="Dashboard" href="/admin" icon={<Dashboard />} />
    <AdminSidebar.Item label="News" href="/admin/news" icon={<Article />} />
    <AdminSidebar.Item label="Events" href="/admin/events" icon={<Event />} />
    <AdminSidebar.Item label="Places" href="/admin/places" icon={<Place />} />
    <AdminSidebar.Item label="Scraper" href="/admin/scraper" icon={<CloudDownload />} />
  </AdminSidebar>

  {/* Main Content */}
  <AdminMain>
    {/* Top Bar */}
    <AdminTopBar
      title="Dashboard"
      user={currentUser}
      notifications={notifications}
    />

    {/* Statistics */}
    <Section variant="default" spacing="lg">
      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <DashboardWidget
            title="Odwiedzin dzisiaj"
            value={1234}
            change={{ value: 12, type: 'increase' }}
            icon={<Visibility />}
            color="primary"
          />
        </Grid>
        {/* More widgets */}
      </Grid>
    </Section>

    {/* Recent Activity */}
    <Section variant="neutral" spacing="lg">
      <SectionHeader title="Ostatnia aktywność" />
      <ActivityList activities={recentActivities} />
    </Section>
  </AdminMain>
</AdminLayout>
```

---

## Responsive Breakpoints

### Breakpoint Values

```typescript
const breakpoints = {
  xs: 0,      // Extra small devices (phones)
  sm: 576,    // Small devices (landscape phones)
  md: 768,    // Medium devices (tablets)
  lg: 992,    // Large devices (desktops)
  xl: 1200,   // Extra large devices (large desktops)
  '2xl': 1400, // Extra extra large devices
};
```

### Responsive Patterns

#### Grid Columns
```tsx
<Grid container spacing={2}>
  <Grid xs={12} sm={6} md={4} lg={3}>
    {/* Content */}
  </Grid>
</Grid>
```

#### Typography Scaling
```tsx
<Typography
  level="h1"
  sx={{
    fontSize: {
      xs: '2rem',
      sm: '2.5rem',
      md: '3rem',
      lg: '3.5rem',
    },
  }}
>
  Title
</Typography>
```

#### Conditional Rendering
```tsx
<Box sx={{ display: { xs: 'none', md: 'block' } }}>
  {/* Desktop only */}
</Box>

<Box sx={{ display: { xs: 'block', md: 'none' } }}>
  {/* Mobile only */}
</Box>
```

---

## Layout Components

### Section

**File:** `src/components/layout/Section.tsx`

**Description:** Reusable section wrapper

**Props:**
```typescript
interface SectionProps {
  variant?: 'default' | 'primary' | 'secondary' | 'neutral';
  spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
  className?: string;
  sx?: SxProps;
}
```

**Usage:**
```tsx
<Section variant="primary" spacing="lg">
  <Typography level="h2">Section Title</Typography>
  {/* Content */}
</Section>
```

---

### SectionHeader

**File:** `src/components/layout/SectionHeader.tsx`

**Description:** Section header with optional action

**Props:**
```typescript
interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
}
```

**Usage:**
```tsx
<SectionHeader
  title="Najnowsze aktualności"
  action={{ label: 'Zobacz wszystkie', href: '/news' }}
/>
```

---

### Grid

**File:** `src/components/layout/Grid.tsx`

**Description:** Responsive grid system

**Usage:**
```tsx
<Grid container spacing={3}>
  <Grid xs={12} sm={6} md={4}>
    {/* Item 1 */}
  </Grid>
  <Grid xs={12} sm={6} md={4}>
    {/* Item 2 */}
  </Grid>
  <Grid xs={12} sm={6} md={4}>
    {/* Item 3 */}
  </Grid>
</Grid>
```

---

### Stack

**File:** `src/components/layout/Stack.tsx`

**Description:** Flex container for stacking elements

**Usage:**
```tsx
<Stack direction="row" spacing={2} alignItems="center">
  <Button>Button 1</Button>
  <Button>Button 2</Button>
  <Button>Button 3</Button>
</Stack>

<Stack direction="column" spacing={2}>
  <Typography>Item 1</Typography>
  <Typography>Item 2</Typography>
  <Typography>Item 3</Typography>
</Stack>
```

---

### SplitView

**File:** `src/components/layout/SplitView.tsx`

**Description:** Split view layout (e.g., map + list)

**Usage:**
```tsx
<SplitView>
  <SplitView.Panel>
    {/* Left panel */}
  </SplitView.Panel>
  <SplitView.Panel>
    {/* Right panel */}
  </SplitView.Panel>
</SplitView>
```

---

## Layout Patterns

### 1. Hero Pattern

**Description:** Full-width hero with background image

**Components:**
- Hero
- HeroContent
- HeroActions

**Usage:**
```tsx
<Hero
  title="Page Title"
  subtitle="Page subtitle"
  image="/images/hero.jpg"
  actions={[
    { label: 'Primary Action', href: '/action', variant: 'solid' },
    { label: 'Secondary Action', href: '/secondary', variant: 'outlined' },
  ]}
/>
```

---

### 2. Card Grid Pattern

**Description:** Grid of cards with consistent spacing

**Components:**
- Grid
- Card

**Usage:**
```tsx
<Grid container spacing={3}>
  {items.map(item => (
    <Grid key={item.id} xs={12} sm={6} md={4} lg={3}>
      <Card>
        {/* Card content */}
      </Card>
    ))}
</Grid>
```

---

### 3. Sidebar Pattern

**Description:** Main content with sidebar

**Components:**
- PageLayout (with showSidebar)
- Sidebar

**Usage:**
```tsx
<PageLayout showSidebar={true} sidebarContent={<Sidebar />}>
  {/* Main content */}
</PageLayout>
```

---

### 4. Filter Pattern

**Description:** Content with filter bar

**Components:**
- FilterBar
- ContentGrid

**Usage:**
```tsx
<FilterBar
  filters={filters}
  onFilterChange={handleFilterChange}
/>
<ContentGrid items={filteredItems} />
```

---

### 5. Tab Pattern

**Description:** Tabbed content

**Components:**
- Tabs
- Tabs.Panel

**Usage:**
```tsx
<Tabs defaultValue="tab1">
  <Tabs.List>
    <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
    <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel value="tab1">Content 1</Tabs.Panel>
  <Tabs.Panel value="tab2">Content 2</Tabs.Panel>
</Tabs>
```

---

## Implementation Guidelines

### 1. Component Structure

```tsx
// Import order
import React from 'react';
import { JoyComponent } from '@mui/joy';
import { CustomComponent } from '@/components';
import { useStyles } from './styles';

// Component definition
export const ComponentName: React.FC<ComponentProps> = ({ prop1, prop2 }) => {
  // Hooks
  const styles = useStyles();

  // Render
  return (
    <JoyComponent sx={styles.root}>
      {/* Content */}
    </JoyComponent>
  );
};
```

### 2. Styling Approach

- Use Joy UI's `sx` prop for inline styles
- Use `styled()` for reusable styled components
- Use CSS modules for complex styles
- Follow the design system tokens

### 3. Accessibility

- Use semantic HTML elements
- Include proper ARIA attributes
- Ensure keyboard navigation
- Test with screen readers

### 4. Performance

- Use React.memo for expensive components
- Implement lazy loading for images
- Use dynamic imports for heavy components
- Optimize re-renders with proper keys

### 5. Testing

- Write unit tests for all components
- Test responsive behavior
- Test accessibility
- Test user interactions

---

## Page Layout Checklist

### Common Elements
- [ ] Navigation component
- [ ] Footer component
- [ ] Breadcrumbs (where applicable)
- [ ] Page title
- [ ] Meta tags and SEO

### Responsive Design
- [ ] Mobile-first approach
- [ ] Breakpoint testing
- [ ] Touch-friendly targets
- [ ] Readable text sizes

### Accessibility
- [ ] Semantic HTML
- [ ] ARIA labels
- [ ] Keyboard navigation
- [ ] Focus indicators

### Performance
- [ ] Image optimization
- [ ] Code splitting
- [ ] Lazy loading
- [ ] Bundle size optimization

---

**Document Status:** Ready for Implementation  
**Last Updated:** 2026-01-11
