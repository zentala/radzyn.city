# TODO - Radzyń.City

## Completed Features ✅

### Design System
- [x] Apple-Baroque design system implemented
- [x] SectionWrapper with transparency and inner shadows
- [x] QuickLinkCard component with gradient backgrounds
- [x] ContentCard unified component
- [x] Consistent styling across all widgets

### Layout & Navigation
- [x] Dashboard with half-width widgets
- [x] Weather widget (50% width)
- [x] Quick links widget (50% width) with 4 cards
- [x] City Map widget (50% width)
- [x] Memories widget (50% width)
- [x] Footer redesign with contact in bottom-right

### Content
- [x] Announcements section added to navigation
- [x] Memories section added (Wykop-style content aggregation)
- [x] Places page with ContentCard styling

## In Progress 🚧

### Media/Gallery System
- [ ] Media system architecture documented (MEDIA_ARCHITECTURE.md)
- [ ] TypeScript types created (src/types/media.ts)
- [ ] Next steps below...

## Planned Features 📋

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

## Notes

- Follow CLAUDE.md instructions for Material UI and code standards
- All new features should use Apple-Baroque design system
- Images should be optimized for web (WebP + fallback)
- Consider accessibility in all UI implementations
- Test on mobile devices regularly
