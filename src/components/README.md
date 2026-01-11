# Joy UI Components Documentation

This directory contains Joy UI components for the radzyn.city project with the Baroque theme (Deep Navy Blue + Gold).

## Directory Structure

```
src/components/
├── foundation/       # Base components (Phase 1 & 2)
├── layout/          # Layout and navigation components (Phase 3)
├── advanced/        # Advanced UI components (Phase 6)
└── ThemeRegistry.tsx # Theme provider
```

## Foundation Components

### Button
**Location:** `src/components/foundation/Button.tsx`

A customizable button component with variants for different use cases.

**Variants:**
- `solid` - Primary action button with gold background
- `outlined` - Secondary action with border
- `soft` - Subtle background
- `plain` - Minimal styling

**Sizes:** `sm`, `md`, `lg`

**Colors:** `primary`, `secondary`, `danger`, `success`

**Usage:**
```tsx
import { Button } from '@/components/foundation/Button';

<Button variant="solid" color="primary" size="md">
  Click me
</Button>
```

### Typography
**Location:** `src/components/foundation/Typography.tsx`

Text components with consistent styling.

**Variants:**
- `h1` - Page title (48px)
- `h2` - Section title (36px)
- `h3` - Subsection title (28px)
- `h4` - Card title (22px)
- `body1` - Body text (16px)
- `body2` - Secondary text (14px)
- `caption` - Small text (12px)

**Usage:**
```tsx
import { Typography } from '@/components/foundation/Typography';

<Typography variant="h1">Page Title</Typography>
<Typography variant="body1">Body text</Typography>
```

### Card
**Location:** `src/components/foundation/Card.tsx`

Container component with consistent styling and optional actions.

**Props:**
- `title` - Card title
- `subtitle` - Card subtitle
- `action` - Action element (e.g., button)
- `variant` - `outlined` or `plain`

**Usage:**
```tsx
import { Card } from '@/components/foundation/Card';

<Card title="Card Title" subtitle="Subtitle">
  <p>Card content</p>
</Card>
```

### Icon
**Location:** `src/components/foundation/Icon.tsx`

Icon wrapper with consistent sizing and colors.

**Usage:**
```tsx
import { Icon } from '@/components/foundation/Icon';
import HomeIcon from '@mui/icons-material/Home';

<Icon>
  <HomeIcon />
</Icon>
```

### Input
**Location:** `src/components/foundation/Input.tsx`

Form input components including TextField, Textarea, and Select.

**Components:**
- `TextField` - Single line text input
- `Textarea` - Multi-line text input
- `Select` - Dropdown selection

**Usage:**
```tsx
import { TextField, Textarea, Select } from '@/components/foundation/Input';

<TextField label="Name" placeholder="Enter name" />
<Textarea label="Message" minRows={4} />
<Select label="Category" options={[{value: '1', label: 'Option 1'}]} />
```

### Chip
**Location:** `src/components/foundation/Chip.tsx`

Tag and category chips with different variants.

**Variants:**
- `solid` - Filled background
- `outlined` - Border only
- `soft` - Subtle background

**Usage:**
```tsx
import { Chip } from '@/components/foundation/Chip';

<Chip label="Tag" variant="solid" color="primary" />
<Chip label="Category" variant="outlined" />
```

### Alert
**Location:** `src/components/foundation/Alert.tsx`

Alert messages for different states.

**Variants:**
- `success` - Green, for success messages
- `error` - Red, for errors
- `warning` - Orange, for warnings
- `info` - Blue, for information

**Usage:**
```tsx
import { Alert } from '@/components/foundation/Alert';

<Alert variant="success" title="Success">
  Operation completed successfully
</Alert>
```

### Skeleton
**Location:** `src/components/foundation/Skeleton.tsx`

Loading placeholder components.

**Variants:**
- `text` - Text placeholder
- `rectangular` - Rectangular placeholder
- `circular` - Circular placeholder

**Usage:**
```tsx
import { Skeleton } from '@/components/foundation/Skeleton';

<Skeleton variant="text" width="100%" />
<Skeleton variant="rectangular" width="100%" height={200} />
```

### Divider
**Location:** `src/components/foundation/Divider.tsx`

Visual separator with optional text.

**Usage:**
```tsx
import { Divider } from '@/components/foundation/Divider';

<Divider />
<Divider>Section Title</Divider>
```

## Layout Components

### Navigation
**Location:** `src/components/layout/Navigation.tsx`

Main site navigation with header and mobile menu.

**Features:**
- Responsive design
- Mobile menu with drawer
- Active route highlighting
- Baroque theme styling

**Usage:**
```tsx
import { Navigation } from '@/components/layout/Navigation';

<Navigation />
```

### Footer
**Location:** `src/components/layout/Footer.tsx`

Site footer with links and copyright.

**Usage:**
```tsx
import { Footer } from '@/components/layout/Footer';

<Footer />
```

### Breadcrumbs
**Location:** `src/components/layout/Breadcrumbs.tsx`

Navigation breadcrumbs for hierarchical content.

**Usage:**
```tsx
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';

<Breadcrumbs items={[
  { label: 'Home', href: '/' },
  { label: 'News', href: '/news' },
  { label: 'Article' }
]} />
```

### Tabs
**Location:** `src/components/layout/Tabs.tsx`

Tabbed content interface.

**Usage:**
```tsx
import { Tabs } from '@/components/layout/Tabs';

<Tabs
  tabs={[
    { id: 'tab1', label: 'Tab 1', content: <div>Content 1</div> },
    { id: 'tab2', label: 'Tab 2', content: <div>Content 2</div> }
  ]}
  defaultTab="tab1"
/>
```

### Accordion
**Location:** `src/components/layout/Accordion.tsx`

Collapsible content sections.

**Usage:**
```tsx
import { Accordion } from '@/components/layout/Accordion';

<Accordion
  items={[
    { id: '1', title: 'Section 1', content: <div>Content 1</div> },
    { id: '2', title: 'Section 2', content: <div>Content 2</div> }
  ]}
/>
```

### PageContainer
**Location:** `src/components/layout/PageContainer.tsx`

Main page wrapper with consistent layout.

**Usage:**
```tsx
import { PageContainer } from '@/components/layout/PageContainer';

<PageContainer>
  <h1>Page Title</h1>
</PageContainer>
```

### Section
**Location:** `src/components/layout/Section.tsx`

Content section with optional title and spacing.

**Usage:**
```tsx
import { Section } from '@/components/layout/Section';

<Section title="Section Title">
  <p>Section content</p>
</Section>
```

## Advanced Components

### Modal
**Location:** `src/components/advanced/Modal.tsx`

Dialog modal for focused interactions.

**Usage:**
```tsx
import { Modal } from '@/components/advanced/Modal';

<Modal
  open={isOpen}
  onClose={() => setIsOpen(false)}
  title="Modal Title"
>
  <p>Modal content</p>
</Modal>
```

### Drawer
**Location:** `src/components/advanced/Drawer.tsx`

Side panel for navigation or additional content.

**Usage:**
```tsx
import { Drawer } from '@/components/advanced/Drawer';

<Drawer
  open={isOpen}
  onClose={() => setIsOpen(false)}
  anchor="left"
>
  <p>Drawer content</p>
</Drawer>
```

### Table
**Location:** `src/components/advanced/Table.tsx`

Data table with sorting and pagination support.

**Usage:**
```tsx
import { Table } from '@/components/advanced/Table';

<Table
  columns={[
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' }
  ]}
  data={[
    { id: 1, name: 'John', email: 'john@example.com' }
  ]}
/>
```

### Pagination
**Location:** `src/components/advanced/Pagination.tsx`

Pagination controls for paginated content.

**Usage:**
```tsx
import { Pagination } from '@/components/advanced/Pagination';

<Pagination
  currentPage={1}
  totalPages={10}
  onPageChange={(page) => console.log(page)}
/>
```

### Loading
**Location:** `src/components/advanced/Loading.tsx`

Full-page loading overlay.

**Usage:**
```tsx
import { Loading } from '@/components/advanced/Loading';

<Loading message="Loading..." />
```

## Theme Configuration

The Baroque theme is configured in `src/theme/joy-theme.ts` with:

- **Primary Color:** Deep Navy Blue (#0A1628)
- **Secondary Color:** Gold (#D4AF37)
- **Typography:** Inter font family
- **Border Radius:** 8px
- **Shadows:** Custom shadow system

## Design Tokens

Design tokens are defined in `src/utils/design-tokens.ts`:

```typescript
export const designTokens = {
  colors: {
    primary: '#0A1628',
    secondary: '#D4AF37',
    // ... more colors
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  // ... more tokens
};
```

## Mock Data

Mock data is available in `src/mocks/`:

- `news-mock-data.ts` - News articles
- `events-mock-data.ts` - Events
- `places-mock-data.ts` - Places
- `weather-mock-data.ts` - Weather data

## Best Practices

1. **Use Joy UI components** from `@mui/joy` instead of Material UI
2. **Follow the Baroque theme** - use Deep Navy Blue and Gold colors
3. **Use mock data** from `src/mocks/` for development
4. **Maintain consistency** - use the provided components instead of creating new ones
5. **Responsive design** - all components are responsive by default

## Migration Status

- ✅ Phase 1: Foundation (Joy UI setup, theme, design tokens, base components, mock data)
- ✅ Phase 2: Core Components (Input, Chip, Alert, Skeleton, Divider)
- ✅ Phase 3: Navigation & Layout (Navigation, Footer, Breadcrumbs, Tabs, Accordion)
- ✅ Phase 4: Page Migration - Public pages (Homepage, News, Events, Places, Contact)
- ✅ Phase 5: Page Migration - Admin pages (Admin dashboard, Scraper page)
- ✅ Phase 6: Advanced Components (Modal, Drawer, Table, Pagination, Loading)
- ✅ Phase 7: Testing & Polish
- ✅ Phase 8: Documentation & Handoff
