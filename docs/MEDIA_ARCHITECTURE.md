# Architektura Systemu Mediów - Radzyń.City

## 1. Typy Mediów (Media Types)

### Kategorie główne:
- **photo** - Zdjęcia (fotografie)
- **album** - Albumy zdjęć (kolekcje)
- **scan** - Skany dokumentów, map, rysunków
- **infographic** - Infografiki, wizualizacje danych
- **artwork** - Dzieła sztuki, malowidła
- **document** - Dokumenty graficzne (plakaty, ulotki)
- **historical** - Materiały historyczne (stare zdjęcia, archiwalia)
- **panorama** - Zdjęcia panoramiczne
- **video-thumbnail** - Miniatury wideo (przyszłość)

## 2. Model Danych

### MediaItem Interface
```typescript
interface MediaItem {
  id: string;
  type: MediaType; // photo, album, scan, infographic, etc.
  title: string;
  description?: string;

  // S3 Storage
  url: string; // Full S3 URL
  thumbnailUrl?: string; // Thumbnail version
  s3Key: string; // S3 object key
  s3Bucket: string; // S3 bucket name

  // Metadata
  width?: number;
  height?: number;
  fileSize?: number; // bytes
  mimeType: string; // image/jpeg, image/png, etc.

  // Attribution
  author?: string;
  source?: string;
  license?: string; // CC BY, CC BY-SA, Public Domain, etc.
  uploadedBy?: string;
  uploadedAt: Date;

  // Categorization
  tags: string[]; // e.g., ["pałac", "architektura", "barok"]
  category?: string; // e.g., "zabytki", "natura", "wydarzenia"
  location?: {
    name: string;
    coordinates?: [number, number]; // [lat, lng]
  };

  // Relations
  relatedTo?: {
    type: 'place' | 'event' | 'news' | 'memory' | 'highlight';
    id: string;
  }[];

  // Album specific
  albumItems?: string[]; // IDs of media items in album (if type === 'album')

  // Status
  status: 'draft' | 'published' | 'archived';
  featured?: boolean; // Show in featured galleries

  // SEO
  alt: string; // Alt text for accessibility
  caption?: string;
}
```

### Album Interface
```typescript
interface Album extends MediaItem {
  type: 'album';
  items: MediaItem[];
  coverImageId?: string; // ID of cover image
  itemCount: number;
}
```

## 3. S3 Storage Structure

### Bucket Organization
```
radzyn-city-media/
├── photos/
│   ├── 2025/
│   │   ├── 01/
│   │   │   ├── original/
│   │   │   │   └── {uuid}.jpg
│   │   │   ├── thumbnails/
│   │   │   │   ├── {uuid}_thumb_300.jpg
│   │   │   │   └── {uuid}_thumb_600.jpg
│   │   │   └── optimized/
│   │   │       └── {uuid}_1920.jpg
├── scans/
│   └── documents/
│       └── {uuid}.pdf
├── infographics/
│   └── {category}/
│       └── {uuid}.png
├── albums/
│   └── {album-id}/
│       └── cover.jpg
└── historical/
    └── archive/
        └── {year}/
            └── {uuid}.jpg
```

### Naming Convention
- **UUID-based**: `{uuid}_{variant}_{size}.{ext}`
- Example: `a1b2c3d4-e5f6-4789-a0b1-c2d3e4f5g6h7_thumb_300.jpg`

## 4. Integration Points

### 4.1 Places (Miejsca)
- Każde miejsce może mieć galerię zdjęć
- Link: `MediaItem.relatedTo = { type: 'place', id: placeId }`

### 4.2 Events (Wydarzenia)
- Zdjęcia z wydarzeń
- Albumy z imprez

### 4.3 News (Aktualności)
- Zdjęcia ilustrujące newsy
- Infografiki

### 4.4 Memories (Wspomnienia)
- Linki do zewnętrznych treści mogą mieć preview images
- Archiwalne zdjęcia

### 4.5 City Highlights (Odkryj Radzyń)
- Featured photos
- Panoramy

## 5. Pages/Routes

### Nowe strony:
```
/gallery - Główna galeria (wszystkie typy)
/gallery/photos - Tylko zdjęcia
/gallery/albums - Albumy
/gallery/historical - Materiały historyczne
/gallery/infographics - Infografiki
/gallery/[id] - Szczegóły pojedynczego media
/albums/[id] - Widok albumu
```

### API Routes:
```
/api/media - Lista mediów (z filtrowaniem)
/api/media/[id] - Szczegóły media
/api/media/upload - Upload nowego media
/api/albums - Lista albumów
/api/albums/[id] - Szczegóły albumu
```

## 6. Features

### 6.1 Galeria (Gallery Component)
- Grid layout z różnymi rozmiarami
- Filtry: typ, kategoria, tagi, data
- Wyszukiwanie
- Lightbox do przeglądania
- Lazy loading
- Masonry layout opcjonalnie

### 6.2 Image Upload
- Drag & drop
- Multi-file upload
- Automatyczna kompresja/optymalizacja
- Generowanie thumbnails
- Metadata extraction (EXIF)
- Progress indicator

### 6.3 Image Processing
- Resize to multiple sizes
- WebP conversion
- Blur hash generation (dla placeholders)
- Face detection (optional, for cropping)

### 6.4 Permissions
- Public - dostępne dla wszystkich
- Authenticated - tylko zalogowani
- Admin - tylko admin może upload/delete

## 7. Technology Stack

### Storage:
- **S3 Compatible Storage** (CapRover/MinIO)
- CDN dla performance (optional)

### Processing:
- **Sharp** - image processing library
- Next.js API routes dla upload
- Background jobs dla procesowania

### Database:
- Metadata w PostgreSQL/Supabase
- S3 URLs cached

### Frontend:
- React Image Gallery components
- Next/Image for optimization
- Lightbox library (yet-another-react-lightbox)

## 8. Implementation Phases

### Phase 1: Basic Infrastructure
- [ ] MediaItem TypeScript interfaces
- [ ] S3 bucket setup
- [ ] Basic upload API
- [ ] Image storage service

### Phase 2: Gallery Display
- [ ] Gallery page (/gallery)
- [ ] MediaCard component
- [ ] Lightbox integration
- [ ] Filtering & search

### Phase 3: Integration
- [ ] Link media to places
- [ ] Link media to events
- [ ] Link media to news
- [ ] Album system

### Phase 4: Advanced Features
- [ ] Image processing pipeline
- [ ] Automatic tagging (AI)
- [ ] Geo-tagging
- [ ] Timeline view
- [ ] Historical archive

## 9. Menu Structure

```
Nawigacja:
- Strona główna
- O nas (submenu: O mieście, O powiecie, Historia, Kultura, Zabytki)
- Galeria (submenu: Zdjęcia, Albumy, Materiały historyczne, Infografiki)
- Mapa i miejsca
- Wydarzenia
- Aktualności
- Ogłoszenia
- Wspomnienia
```

## 10. Example Usage

### Display gallery for a place:
```tsx
<Gallery
  filter={{ relatedTo: { type: 'place', id: placeId } }}
  layout="grid"
  limit={12}
/>
```

### Show album:
```tsx
<Album
  albumId={albumId}
  layout="masonry"
  lightbox={true}
/>
```

### Featured photos on homepage:
```tsx
<FeaturedGallery
  filter={{ featured: true, type: 'photo' }}
  limit={6}
  autoRotate={true}
/>
```
