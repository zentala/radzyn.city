# Radzyń City Portal - TODO List

## 📋 Joy UI Migration Plan
**Complete migration documentation:** [`plans/joy-ui-migrate-task.md`](plans/joy-ui-migrate-task.md)

### Phase 1: Foundation (Week 1-2) ✅
- [x] Install Joy UI dependencies (@mui/joy)
- [x] Create Joy UI theme configuration (src/theme/joy-theme.ts)
- [x] Create design token utilities (src/utils/design-tokens.ts)
- [x] Update ThemeRegistry to use Joy UI CssVarsProvider
- [x] Clean up globals.css (remove Tailwind directives)
- [x] Create base layout components (PageContainer, Section)
- [x] Create foundation components (Button, Typography, Card, Icon)
- [x] Set up component directory structure
- [x] Create mock data files (news, events, places, weather)
- [ ] Test theme configuration

### Phase 2: Core Components (Week 3-4)
- [ ] Migrate Button component
- [ ] Migrate Input/TextField components
- [ ] Migrate Card components
- [ ] Migrate Chip component
- [ ] Migrate Alert component
- [ ] Migrate Skeleton component

### Phase 3: Navigation & Layout (Week 5-6)
- [ ] Migrate Navigation component
- [ ] Create responsive layouts
- [ ] Implement footer component
- [ ] Update layout.tsx

### Phase 4: Page Migration - Public (Week 7-9)
- [ ] Migrate homepage
- [ ] Migrate news pages
- [ ] Migrate events pages
- [ ] Migrate places pages
- [ ] Migrate contact page

### Phase 5: Page Migration - Admin (Week 10-11)
- [ ] Migrate admin dashboard
- [ ] Migrate admin scraper page
- [ ] Implement admin-specific components

### Phase 6: Advanced Components (Week 12)
- [ ] Implement Priority 2-3 components
- [ ] Add interactive components
- [ ] Implement form components

### Phase 7: Testing & Polish (Week 13)
- [ ] Test all pages
- [ ] Fix bugs
- [ ] Optimize performance
- [ ] Ensure responsive design

### Phase 8: Documentation & Handoff (Week 14)
- [ ] Update documentation
- [ ] Create component library docs
- [ ] Final review

---

## 📸 Media/Gallery System Implementation

### Completed Features ✅

#### Design System
- [x] Apple-Baroque design system implemented
- [x] SectionWrapper with transparency and inner shadows
- [x] QuickLinkCard component with gradient backgrounds
- [x] ContentCard unified component
- [x] Consistent styling across all widgets

#### Layout & Navigation
- [x] Dashboard with half-width widgets
- [x] Weather widget (50% width)
- [x] Quick links widget (50% width) with 4 cards
- [x] City Map widget (50% width)
- [x] Memories widget (50% width)
- [x] Footer redesign with contact in bottom-right

#### Content
- [x] Announcements section added to navigation
- [x] Memories section added (Wykop-style content aggregation)
- [x] Places page with ContentCard styling

### In Progress 🚧

#### Media/Gallery System
- [ ] Media system architecture documented (MEDIA_ARCHITECTURE.md)
- [ ] TypeScript types created (src/types/media.ts)
- [ ] Next steps below...

### Phase 1: Media Infrastructure (High Priority)
- [ ] Set up S3 bucket structure on CapRover
- [ ] Create media upload API route (`/api/media/upload`)
- [ ] Create media service (`src/services/mediaService.ts`)
- [ ] Implement Sharp for image processing
- [ ] Generate thumbnails (300px, 600px, 1920px)
- [ ] WebP conversion for optimization
- [ ] Blurhash generation for placeholders

### Phase 2: Gallery Pages (High Priority)
- [ ] Create `/gallery` main page
- [ ] Create `/gallery/photos` page
- [ ] Create `/gallery/albums` page
- [ ] Create `/gallery/historical` page
- [ ] Create `/gallery/infographics` page
- [ ] Create `/gallery/[id]` detail page
- [ ] Create `/albums/[id]` album view page

### Phase 3: Gallery Components
- [ ] MediaCard component (display single media item)
- [ ] GalleryGrid component (grid layout)
- [ ] GalleryMasonry component (masonry layout)
- [ ] Lightbox integration (yet-another-react-lightbox)
- [ ] MediaFilters component (filter by type, category, tags, date)
- [ ] MediaSearch component
- [ ] AlbumViewer component

### Phase 4: Media Management
- [ ] MediaUpload component (drag & drop)
- [ ] Upload progress indicator
- [ ] Bulk upload support
- [ ] EXIF data extraction
- [ ] Metadata editor
- [ ] Media library browser (admin panel)

### Phase 5: Integration
- [ ] Link media to Places
  - [ ] Add `images` field to Place interface
  - [ ] Gallery tab on place detail pages
- [ ] Link media to Events
  - [ ] Event photo galleries
  - [ ] Album creation for events
- [ ] Link media to News
  - [ ] Featured images for news articles
  - [ ] Inline image galleries
- [ ] Link media to Memories
  - [ ] Preview images for external links
  - [ ] User-uploaded images (future)
- [ ] Link media to City Highlights
  - [ ] Featured photos carousel

### Phase 6: Advanced Features
- [ ] Featured gallery on homepage
- [ ] Historical timeline view
- [ ] Geo-tagged map view
- [ ] Auto-tagging with AI (optional)
- [ ] Face detection for smart cropping
- [ ] Image comparison tool (then/now)
- [ ] Download options (original, optimized, sizes)
- [ ] Social sharing
- [ ] Comments and likes (authenticated users)

### Phase 7: Navigation Updates
- [ ] Add "Galeria" to main navigation with submenu:
  - Zdjęcia
  - Albumy
  - Materiały historyczne
  - Infografiki
- [ ] Update "O nas" submenu structure:
  - O mieście
  - O powiecie
  - Historia
  - Kultura
  - Zabytki

---

## Previous TODO Items (Legacy)

### Priority 1: UI Framework Standardization
- [x] Replace Tailwind CSS with MUI components in several key pages [10]
- [x] Refactor PlaceholderImage component to use MUI styling exclusively [9]
- [x] Update News, City, County, and Contact pages to use MUI components [10]
- [x] Convert Events page from Tailwind to MUI styling system [9]
- [ ] Convert remaining pages from Tailwind to MUI styling system [9]
- [ ] Remove Tailwind CSS dependencies from project [8]
- [ ] Implement consistent MUI theming throughout application [9]
- [ ] Convert all custom CSS to MUI's sx prop and styled components [8]

### Completed Features
- ✅ Simple Map Integration
- ✅ Enhanced Weather Implementation
- ✅ Homepage Dashboard Modules with Material UI
- ✅ Real web scraping for local news sources
- ✅ AI-based categorization of news articles
- ✅ Keyword extraction and tagging
- ✅ Independent cron-based scraper process
- ✅ Admin interface for scraper configuration
- ✅ Material UI design system implementation
- ✅ Consistent component styling with MUI theme

### Priority 3: Technical & Polish

#### Performance Optimization
- [ ] Set up basic performance monitoring [5]
- [ ] Implement code-splitting to reduce initial load time [6]
- [ ] Add service worker for offline capabilities [7]
- [x] Optimize image loading with MUI Skeleton placeholders [4]

#### Responsive Enhancements
- [ ] Implement responsive tables for mobile views [6]
- [x] Add mobile-specific navigation improvements [7]
- [x] Create adaptive layouts with MUI responsive utilities [8]

### Priority 4: Current Implementation Focus

#### Announcements/Classifieds System
- [ ] Set up database schema for announcements [8]
- [ ] Create fake example data for initial development [10]
- [ ] Implement filtering and categorization [9]
- [ ] Add sorting by date, relevance, location [7]
- [ ] Create announcement detail page template [8]
- [ ] Add form for community-submitted announcements [9]

#### Places Catalog
- [x] Enhance locations database with additional fields [7]
- [x] Add detailed business information (hours, contact info) [8]
- [x] Implement user ratings and reviews [9]
- [x] Create dedicated place detail pages [7]
- [x] Add search functionality for places [8]
- [ ] Create admin tools for place management [6]

---

## Future Development (Post-MVP)

### Interactive City Experience
- [ ] Create virtual tour of key attractions [7]
- [ ] Add 360° photos where available [8]
- [ ] Implement guided navigation between points [6]
- [ ] Add historical information at each stop [7]
- [ ] Create AR (Augmented Reality) experiences for landmarks [10]

### Community Engagement Features
- [ ] Allow user photo submissions [6]
- [ ] Implement community events submission [7]
- [ ] Add commenting functionality to news and places [5]
- [ ] Create user accounts and profiles [8]
- [ ] Add social sharing integration [4]
- [ ] Implement community forum or discussion board [9]

### Administration Panel
- [ ] Create secure admin login with role-based access [7]
- [ ] Build comprehensive content management system [9]
- [ ] Add analytics dashboard with visitor tracking [8]
- [ ] Implement content approval workflows [6]
- [ ] Create automated content moderation system [8]

### Mobile App Development
- [ ] Convert web app to PWA (Progressive Web App) [8]
- [ ] Implement push notifications for local news and events [7]
- [ ] Add offline capabilities for essential information [6]
- [ ] Create dedicated mobile interfaces [9]

---

## Technical Debt & Improvements

### Code Quality
- [ ] Add error boundaries for all major sections
- [ ] Improve TypeScript strict mode compliance
- [ ] Add unit tests for utilities
- [ ] Add E2E tests for critical flows

### Performance
- [ ] Implement lazy loading for images
- [ ] Add service worker for offline support
- [ ] Optimize bundle size
- [ ] Add CDN for S3 assets

### Accessibility
- [ ] Add ARIA labels to all interactive elements
- [ ] Keyboard navigation improvements
- [ ] Screen reader testing
- [ ] Add skip links

### SEO
- [ ] Add structured data for media items
- [ ] Generate sitemap for gallery pages
- [ ] Image alt text best practices
- [ ] Open Graph images for sharing

---

## Database Schema (Future)

### Media Table
```sql
CREATE TABLE media (
  id UUID PRIMARY KEY,
  type VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,

  -- S3 Storage
  s3_url TEXT NOT NULL,
  s3_thumbnail_url TEXT,
  s3_key TEXT NOT NULL,
  s3_bucket VARCHAR(100) NOT NULL,

  -- Technical
  width INTEGER,
  height INTEGER,
  file_size BIGINT,
  mime_type VARCHAR(100),
  blurhash VARCHAR(255),

  -- Attribution
  author VARCHAR(255),
  author_url TEXT,
  source VARCHAR(255),
  source_url TEXT,
  license VARCHAR(50),
  uploaded_by VARCHAR(255),
  uploaded_at TIMESTAMP DEFAULT NOW(),
  captured_at TIMESTAMP,

  -- Categorization
  tags TEXT[],
  category VARCHAR(100),
  location_name VARCHAR(255),
  location_coordinates POINT,

  -- Status
  status VARCHAR(20) DEFAULT 'draft',
  featured BOOLEAN DEFAULT false,
  featured_order INTEGER,

  -- SEO
  alt TEXT NOT NULL,
  caption TEXT,

  -- Metadata
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0
);

CREATE INDEX idx_media_type ON media(type);
CREATE INDEX idx_media_status ON media(status);
CREATE INDEX idx_media_featured ON media(featured);
CREATE INDEX idx_media_tags ON media USING GIN(tags);
CREATE INDEX idx_media_category ON media(category);
CREATE INDEX idx_media_location ON media USING GIST(location_coordinates);
```

### Media Relations Table
```sql
CREATE TABLE media_relations (
  id UUID PRIMARY KEY,
  media_id UUID REFERENCES media(id) ON DELETE CASCADE,
  related_type VARCHAR(50) NOT NULL, -- 'place', 'event', 'news', 'memory', 'highlight'
  related_id UUID NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_media_relations_media ON media_relations(media_id);
CREATE INDEX idx_media_relations_related ON media_relations(related_type, related_id);
```

### Albums Table
```sql
CREATE TABLE albums (
  id UUID PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  cover_image_id UUID REFERENCES media(id),

  -- Categorization
  tags TEXT[],
  category VARCHAR(100),
  location_name VARCHAR(255),

  -- Status
  status VARCHAR(20) DEFAULT 'draft',
  featured BOOLEAN DEFAULT false,

  -- Metadata
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  created_by VARCHAR(255)
);

CREATE TABLE album_items (
  id UUID PRIMARY KEY,
  album_id UUID REFERENCES albums(id) ON DELETE CASCADE,
  media_id UUID REFERENCES media(id) ON DELETE CASCADE,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),

  UNIQUE(album_id, media_id)
);

CREATE INDEX idx_album_items_album ON album_items(album_id);
CREATE INDEX idx_album_items_order ON album_items(album_id, order_index);
```

---

## Notes

- Follow CLAUDE.md instructions for Material UI and code standards
- All new features should use Apple-Baroque design system
- Images should be optimized for web (WebP + fallback)
- Consider accessibility in all UI implementations
- Test on mobile devices regularly
