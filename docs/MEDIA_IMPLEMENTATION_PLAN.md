# Media System Implementation Plan - Step by Step Guide

> **Dla:** Mid-level Developer
> **Czas:** ~40-60 godzin pracy
> **Cel:** Pełna implementacja systemu zarządzania mediami z S3 storage

---

## Prerequisites (Wymagania wstępne)

### Wymagane technologie:
- Node.js 18+
- Next.js 14.2+
- TypeScript
- PostgreSQL lub Supabase
- S3-compatible storage (MinIO, CapRover, AWS S3)

### Wymagane umiejętności:
- TypeScript/React
- Next.js API routes
- SQL/PostgreSQL
- Podstawy S3/object storage
- Image processing concepts

---

## PHASE 0: Preparation & Setup (2-3 godziny)

### Task 0.1: Install Dependencies

```bash
# Image processing
npm install sharp

# S3 Client
npm install @aws-sdk/client-s3 @aws-sdk/s3-request-presigner

# UUID generation
npm install uuid
npm install -D @types/uuid

# Image upload (frontend)
npm install react-dropzone

# Lightbox for gallery
npm install yet-another-react-lightbox

# Blurhash for placeholders
npm install blurhash
```

**Verification:**
- [ ] All packages installed without errors
- [ ] `package.json` updated
- [ ] Run `npm run dev` - no errors

---

### Task 0.2: Environment Variables Setup

**File:** `.env.local`

```env
# S3 Storage Configuration
S3_ENDPOINT=https://s3.your-domain.com
S3_REGION=eu-central-1
S3_BUCKET=radzyn-city-media
S3_ACCESS_KEY_ID=your-access-key
S3_SECRET_ACCESS_KEY=your-secret-key
S3_PUBLIC_URL=https://cdn.your-domain.com

# Database (if using Supabase)
DATABASE_URL=postgresql://user:password@host:5432/database
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_KEY=your-service-key

# Admin authentication (basic for now)
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-secure-password

# Upload limits
MAX_FILE_SIZE=10485760  # 10MB in bytes
ALLOWED_MIME_TYPES=image/jpeg,image/png,image/webp,image/gif
```

**Verification:**
- [ ] `.env.local` created
- [ ] Added to `.gitignore`
- [ ] All values configured

---

### Task 0.3: Create S3 Bucket Structure

**Manual steps (via S3 console or CLI):**

```
radzyn-city-media/
├── photos/
├── scans/
├── infographics/
├── albums/
├── historical/
├── artwork/
├── documents/
├── panoramas/
└── temp/  # For processing
```

**Set bucket policy (public read for media):**

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::radzyn-city-media/*"
    }
  ]
}
```

**Verification:**
- [ ] Bucket created
- [ ] Folders created
- [ ] Public read access configured
- [ ] Test upload via console works

---

## PHASE 1: Core Infrastructure (8-10 godzin)

### Task 1.1: Create Database Schema

**File:** `prisma/migrations/001_create_media_tables.sql` (or use Prisma schema)

```sql
-- Media items table
CREATE TABLE media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,

  -- S3 Storage
  s3_url TEXT NOT NULL,
  s3_thumbnail_url TEXT,
  s3_key TEXT NOT NULL UNIQUE,
  s3_bucket VARCHAR(100) NOT NULL,

  -- Technical details
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
  tags TEXT[] DEFAULT '{}',
  category VARCHAR(100),
  location_name VARCHAR(255),
  location_lat DECIMAL(10, 8),
  location_lng DECIMAL(11, 8),

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
CREATE INDEX idx_media_created_at ON media(created_at DESC);

-- Media relations table
CREATE TABLE media_relations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  media_id UUID REFERENCES media(id) ON DELETE CASCADE,
  related_type VARCHAR(50) NOT NULL,
  related_id UUID NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),

  UNIQUE(media_id, related_type, related_id)
);

CREATE INDEX idx_media_relations_media ON media_relations(media_id);
CREATE INDEX idx_media_relations_related ON media_relations(related_type, related_id);

-- Albums table
CREATE TABLE albums (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  cover_image_id UUID REFERENCES media(id),

  tags TEXT[] DEFAULT '{}',
  category VARCHAR(100),
  location_name VARCHAR(255),

  status VARCHAR(20) DEFAULT 'draft',
  featured BOOLEAN DEFAULT false,

  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  created_by VARCHAR(255)
);

-- Album items (many-to-many)
CREATE TABLE album_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  album_id UUID REFERENCES albums(id) ON DELETE CASCADE,
  media_id UUID REFERENCES media(id) ON DELETE CASCADE,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),

  UNIQUE(album_id, media_id)
);

CREATE INDEX idx_album_items_album ON album_items(album_id, order_index);
```

**Verification:**
- [ ] Run migration successfully
- [ ] All tables created
- [ ] All indexes created
- [ ] Foreign keys working

---

### Task 1.2: Create S3 Service

**File:** `src/services/s3Service.ts`

```typescript
import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { v4 as uuidv4 } from 'uuid';

const s3Client = new S3Client({
  region: process.env.S3_REGION!,
  endpoint: process.env.S3_ENDPOINT!,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
  },
  forcePathStyle: true, // Required for MinIO/CapRover
});

const BUCKET = process.env.S3_BUCKET!;

export interface UploadResult {
  url: string;
  key: string;
  bucket: string;
}

/**
 * Upload file to S3
 */
export async function uploadToS3(
  buffer: Buffer,
  folder: string,
  filename: string,
  mimeType: string
): Promise<UploadResult> {
  const key = `${folder}/${filename}`;

  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    Body: buffer,
    ContentType: mimeType,
    CacheControl: 'max-age=31536000', // 1 year
  });

  await s3Client.send(command);

  const url = `${process.env.S3_PUBLIC_URL}/${BUCKET}/${key}`;

  return {
    url,
    key,
    bucket: BUCKET,
  };
}

/**
 * Delete file from S3
 */
export async function deleteFromS3(key: string): Promise<void> {
  const command = new DeleteObjectCommand({
    Bucket: BUCKET,
    Key: key,
  });

  await s3Client.send(command);
}

/**
 * Get signed URL for temporary access
 */
export async function getSignedDownloadUrl(key: string, expiresIn = 3600): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: BUCKET,
    Key: key,
  });

  return await getSignedUrl(s3Client, command, { expiresIn });
}

/**
 * Generate S3 key for media file
 */
export function generateMediaKey(type: string, extension: string): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const uuid = uuidv4();

  return `${type}/${year}/${month}/original/${uuid}.${extension}`;
}

/**
 * Generate thumbnail key from original key
 */
export function getThumbnailKey(originalKey: string, size: number): string {
  return originalKey
    .replace('/original/', `/thumbnails/`)
    .replace(/\.([^.]+)$/, `_${size}.$1`);
}
```

**Verification:**
- [ ] File created
- [ ] No TypeScript errors
- [ ] Import works in other files

---

### Task 1.3: Create Image Processing Service

**File:** `src/services/imageProcessingService.ts`

```typescript
import sharp from 'sharp';
import { encode } from 'blurhash';

export interface ProcessedImage {
  buffer: Buffer;
  width: number;
  height: number;
  format: string;
  size: number;
}

export interface ImageProcessingOptions {
  width?: number;
  height?: number;
  fit?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside';
  quality?: number;
  format?: 'jpeg' | 'png' | 'webp';
}

/**
 * Process image with Sharp
 */
export async function processImage(
  buffer: Buffer,
  options: ImageProcessingOptions = {}
): Promise<ProcessedImage> {
  const {
    width,
    height,
    fit = 'cover',
    quality = 85,
    format = 'jpeg',
  } = options;

  let pipeline = sharp(buffer);

  // Resize if dimensions specified
  if (width || height) {
    pipeline = pipeline.resize(width, height, { fit });
  }

  // Convert format
  if (format === 'jpeg') {
    pipeline = pipeline.jpeg({ quality, progressive: true });
  } else if (format === 'webp') {
    pipeline = pipeline.webp({ quality });
  } else if (format === 'png') {
    pipeline = pipeline.png({ quality });
  }

  const processed = await pipeline.toBuffer({ resolveWithObject: true });

  return {
    buffer: processed.data,
    width: processed.info.width,
    height: processed.info.height,
    format: processed.info.format,
    size: processed.info.size,
  };
}

/**
 * Generate multiple sizes (thumbnails)
 */
export async function generateThumbnails(buffer: Buffer): Promise<{
  small: ProcessedImage;
  medium: ProcessedImage;
  large: ProcessedImage;
}> {
  const [small, medium, large] = await Promise.all([
    processImage(buffer, { width: 300, quality: 80 }),
    processImage(buffer, { width: 600, quality: 85 }),
    processImage(buffer, { width: 1920, quality: 90 }),
  ]);

  return { small, medium, large };
}

/**
 * Extract image metadata
 */
export async function extractMetadata(buffer: Buffer) {
  const image = sharp(buffer);
  const metadata = await image.metadata();

  return {
    width: metadata.width,
    height: metadata.height,
    format: metadata.format,
    space: metadata.space,
    channels: metadata.channels,
    depth: metadata.depth,
    density: metadata.density,
    hasAlpha: metadata.hasAlpha,
    orientation: metadata.orientation,
    exif: metadata.exif,
  };
}

/**
 * Generate blurhash for placeholder
 */
export async function generateBlurhash(buffer: Buffer): Promise<string> {
  const image = sharp(buffer)
    .resize(32, 32, { fit: 'inside' })
    .ensureAlpha()
    .raw();

  const { data, info } = await image.toBuffer({ resolveWithObject: true });

  return encode(
    new Uint8ClampedArray(data),
    info.width,
    info.height,
    4,
    4
  );
}

/**
 * Validate image file
 */
export async function validateImage(buffer: Buffer): Promise<{
  valid: boolean;
  error?: string;
  metadata?: any;
}> {
  try {
    const metadata = await extractMetadata(buffer);

    // Check file size (max 10MB)
    if (buffer.length > 10 * 1024 * 1024) {
      return {
        valid: false,
        error: 'File size exceeds 10MB',
      };
    }

    // Check dimensions (max 8000px)
    if (metadata.width && metadata.width > 8000) {
      return {
        valid: false,
        error: 'Image width exceeds 8000px',
      };
    }

    if (metadata.height && metadata.height > 8000) {
      return {
        valid: false,
        error: 'Image height exceeds 8000px',
      };
    }

    return {
      valid: true,
      metadata,
    };
  } catch (error) {
    return {
      valid: false,
      error: 'Invalid image file',
    };
  }
}
```

**Verification:**
- [ ] File created
- [ ] No TypeScript errors
- [ ] Test with sample image locally

---

### Task 1.4: Create Media Database Service

**File:** `src/services/mediaDbService.ts`

```typescript
import { MediaItem, MediaType, MediaStatus, RelatedContent } from '@/types/media';

// This is a placeholder - adapt to your database client (Prisma, Supabase, etc.)
// Example uses generic SQL client

interface CreateMediaParams {
  type: MediaType;
  title: string;
  description?: string;
  s3Url: string;
  s3ThumbnailUrl?: string;
  s3Key: string;
  s3Bucket: string;
  width?: number;
  height?: number;
  fileSize?: number;
  mimeType: string;
  blurhash?: string;
  author?: string;
  uploadedBy?: string;
  tags?: string[];
  category?: string;
  alt: string;
  caption?: string;
  status?: MediaStatus;
}

/**
 * Create media item in database
 */
export async function createMedia(params: CreateMediaParams): Promise<MediaItem> {
  const query = `
    INSERT INTO media (
      type, title, description, s3_url, s3_thumbnail_url, s3_key, s3_bucket,
      width, height, file_size, mime_type, blurhash,
      author, uploaded_by, tags, category, alt, caption, status
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19
    )
    RETURNING *
  `;

  const values = [
    params.type,
    params.title,
    params.description,
    params.s3Url,
    params.s3ThumbnailUrl,
    params.s3Key,
    params.s3Bucket,
    params.width,
    params.height,
    params.fileSize,
    params.mimeType,
    params.blurhash,
    params.author,
    params.uploadedBy,
    params.tags || [],
    params.category,
    params.alt,
    params.caption,
    params.status || 'published',
  ];

  // Execute query with your DB client
  const result = await executeQuery(query, values);

  return mapRowToMediaItem(result.rows[0]);
}

/**
 * Get media by ID
 */
export async function getMediaById(id: string): Promise<MediaItem | null> {
  const query = 'SELECT * FROM media WHERE id = $1';
  const result = await executeQuery(query, [id]);

  if (result.rows.length === 0) {
    return null;
  }

  return mapRowToMediaItem(result.rows[0]);
}

/**
 * Get media list with filters
 */
export async function getMediaList(params: {
  type?: MediaType;
  category?: string;
  status?: MediaStatus;
  featured?: boolean;
  tags?: string[];
  limit?: number;
  offset?: number;
}): Promise<{ items: MediaItem[]; total: number }> {
  const conditions: string[] = [];
  const values: any[] = [];
  let paramIndex = 1;

  if (params.type) {
    conditions.push(`type = $${paramIndex++}`);
    values.push(params.type);
  }

  if (params.category) {
    conditions.push(`category = $${paramIndex++}`);
    values.push(params.category);
  }

  if (params.status) {
    conditions.push(`status = $${paramIndex++}`);
    values.push(params.status);
  }

  if (params.featured !== undefined) {
    conditions.push(`featured = $${paramIndex++}`);
    values.push(params.featured);
  }

  if (params.tags && params.tags.length > 0) {
    conditions.push(`tags && $${paramIndex++}`);
    values.push(params.tags);
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

  // Count total
  const countQuery = `SELECT COUNT(*) FROM media ${whereClause}`;
  const countResult = await executeQuery(countQuery, values);
  const total = parseInt(countResult.rows[0].count);

  // Get items
  const limit = params.limit || 20;
  const offset = params.offset || 0;

  const query = `
    SELECT * FROM media
    ${whereClause}
    ORDER BY created_at DESC
    LIMIT $${paramIndex++} OFFSET $${paramIndex++}
  `;

  values.push(limit, offset);

  const result = await executeQuery(query, values);
  const items = result.rows.map(mapRowToMediaItem);

  return { items, total };
}

/**
 * Delete media item
 */
export async function deleteMedia(id: string): Promise<void> {
  const query = 'DELETE FROM media WHERE id = $1';
  await executeQuery(query, [id]);
}

/**
 * Add media relation
 */
export async function addMediaRelation(
  mediaId: string,
  relatedType: string,
  relatedId: string
): Promise<void> {
  const query = `
    INSERT INTO media_relations (media_id, related_type, related_id)
    VALUES ($1, $2, $3)
    ON CONFLICT DO NOTHING
  `;

  await executeQuery(query, [mediaId, relatedType, relatedId]);
}

/**
 * Get media for related content
 */
export async function getMediaForRelated(
  relatedType: string,
  relatedId: string
): Promise<MediaItem[]> {
  const query = `
    SELECT m.* FROM media m
    JOIN media_relations mr ON m.id = mr.media_id
    WHERE mr.related_type = $1 AND mr.related_id = $2
    ORDER BY m.created_at DESC
  `;

  const result = await executeQuery(query, [relatedType, relatedId]);
  return result.rows.map(mapRowToMediaItem);
}

/**
 * Helper: Map database row to MediaItem
 */
function mapRowToMediaItem(row: any): MediaItem {
  return {
    id: row.id,
    type: row.type,
    title: row.title,
    description: row.description,
    storage: {
      url: row.s3_url,
      thumbnailUrl: row.s3_thumbnail_url,
      key: row.s3_key,
      bucket: row.s3_bucket,
    },
    technical: {
      width: row.width,
      height: row.height,
      fileSize: row.file_size,
      mimeType: row.mime_type,
      blurhash: row.blurhash,
    },
    attribution: {
      author: row.author,
      authorUrl: row.author_url,
      source: row.source,
      sourceUrl: row.source_url,
      license: row.license,
      uploadedBy: row.uploaded_by,
      uploadedAt: new Date(row.uploaded_at),
      capturedAt: row.captured_at ? new Date(row.captured_at) : undefined,
    },
    tags: row.tags || [],
    category: row.category,
    location: row.location_name ? {
      name: row.location_name,
      coordinates: row.location_lat && row.location_lng
        ? [row.location_lat, row.location_lng]
        : undefined,
    } : undefined,
    status: row.status,
    featured: row.featured,
    featuredOrder: row.featured_order,
    alt: row.alt,
    caption: row.caption,
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at),
    views: row.views,
    likes: row.likes,
  };
}

// Placeholder for database query execution
// Replace with your actual DB client (Prisma, pg, Supabase, etc.)
async function executeQuery(query: string, values: any[]): Promise<any> {
  // TODO: Implement with your database client
  throw new Error('Implement executeQuery with your database client');
}
```

**Verification:**
- [ ] File created
- [ ] Adapt to your database client
- [ ] No TypeScript errors

---

### Task 1.5: Create Upload API Route

**File:** `src/app/api/media/upload/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { uploadToS3, generateMediaKey, getThumbnailKey } from '@/services/s3Service';
import {
  processImage,
  generateThumbnails,
  extractMetadata,
  generateBlurhash,
  validateImage,
} from '@/services/imageProcessingService';
import { createMedia } from '@/services/mediaDbService';
import { MediaType } from '@/types/media';

export async function POST(request: NextRequest) {
  try {
    // Parse form data
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const type = (formData.get('type') as MediaType) || 'photo';
    const title = formData.get('title') as string;
    const description = formData.get('description') as string | undefined;
    const alt = formData.get('alt') as string || title;
    const category = formData.get('category') as string | undefined;
    const tags = formData.get('tags') as string | undefined;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    if (!title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Validate image
    const validation = await validateImage(buffer);
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    // Extract metadata
    const metadata = await extractMetadata(buffer);

    // Generate thumbnails
    const thumbnails = await generateThumbnails(buffer);

    // Generate blurhash
    const blurhash = await generateBlurhash(buffer);

    // Determine file extension
    const extension = file.name.split('.').pop() || 'jpg';

    // Generate S3 keys
    const originalKey = generateMediaKey(type, extension);
    const thumbnailKeySmall = getThumbnailKey(originalKey, 300);
    const thumbnailKeyMedium = getThumbnailKey(originalKey, 600);
    const thumbnailKeyLarge = getThumbnailKey(originalKey, 1920);

    // Upload original
    const originalUpload = await uploadToS3(
      buffer,
      type,
      originalKey.split('/').pop()!,
      file.type
    );

    // Upload thumbnails
    const [thumbSmallUpload, thumbMediumUpload, thumbLargeUpload] = await Promise.all([
      uploadToS3(thumbnails.small.buffer, type, thumbnailKeySmall.split('/').pop()!, file.type),
      uploadToS3(thumbnails.medium.buffer, type, thumbnailKeyMedium.split('/').pop()!, file.type),
      uploadToS3(thumbnails.large.buffer, type, thumbnailKeyLarge.split('/').pop()!, file.type),
    ]);

    // Parse tags
    const parsedTags = tags ? tags.split(',').map(t => t.trim()) : [];

    // Save to database
    const mediaItem = await createMedia({
      type,
      title,
      description,
      s3Url: originalUpload.url,
      s3ThumbnailUrl: thumbMediumUpload.url,
      s3Key: originalUpload.key,
      s3Bucket: originalUpload.bucket,
      width: metadata.width,
      height: metadata.height,
      fileSize: buffer.length,
      mimeType: file.type,
      blurhash,
      tags: parsedTags,
      category,
      alt,
      status: 'published',
    });

    return NextResponse.json({
      success: true,
      media: mediaItem,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Upload failed' },
      { status: 500 }
    );
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
```

**Verification:**
- [ ] File created
- [ ] Test with Postman/curl
- [ ] Upload works
- [ ] Thumbnails generated
- [ ] Database entry created

**Test command:**
```bash
curl -X POST http://localhost:3800/api/media/upload \
  -F "file=@test-image.jpg" \
  -F "title=Test Image" \
  -F "type=photo" \
  -F "alt=Test alt text"
```

---

## PHASE 2: Gallery Pages (10-12 godzin)

### Task 2.1: Create MediaCard Component

**File:** `src/components/media/MediaCard.tsx`

```typescript
'use client';

import { MediaItem } from '@/types/media';
import { ContentCard } from '../foundation/Card';
import { Box, Chip, Typography } from '@mui/joy';
import Link from 'next/link';
import ImageIcon from '@mui/icons-material/Image';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';

interface MediaCardProps {
  media: MediaItem;
  onClick?: () => void;
}

const getMediaTypeColor = (type: string) => {
  switch (type) {
    case 'photo': return 'primary';
    case 'album': return 'warning';
    case 'scan': return 'neutral';
    case 'infographic': return 'success';
    case 'historical': return 'danger';
    default: return 'neutral';
  }
};

const getMediaTypeLabel = (type: string) => {
  const labels: Record<string, string> = {
    photo: 'Zdjęcie',
    album: 'Album',
    scan: 'Skan',
    infographic: 'Infografika',
    artwork: 'Dzieło sztuki',
    document: 'Dokument',
    historical: 'Historyczne',
    panorama: 'Panorama',
  };
  return labels[type] || type;
};

export default function MediaCard({ media, onClick }: MediaCardProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pl-PL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  return (
    <ContentCard
      imageUrl={media.storage.thumbnailUrl || media.storage.url}
      imageAlt={media.alt}
      imageHeight={240}
      title={media.title}
      metadata={
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          {/* Upload date */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CalendarTodayIcon
              sx={{ fontSize: '1rem', mr: 0.75, color: 'text.secondary' }}
            />
            <Typography level="body-sm" sx={{ color: 'text.secondary' }}>
              {formatDate(media.attribution.uploadedAt)}
            </Typography>
          </Box>

          {/* Author */}
          {media.attribution.author && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <PersonIcon
                sx={{ fontSize: '1rem', mr: 0.75, color: 'text.secondary' }}
              />
              <Typography level="body-sm" sx={{ color: 'text.secondary' }}>
                {media.attribution.author}
              </Typography>
            </Box>
          )}
        </Box>
      }
      description={media.description}
      descriptionLines={3}
      imageOverlay={
        <Box sx={{ position: 'absolute', top: 12, left: 12 }}>
          <Chip
            size="sm"
            color={getMediaTypeColor(media.type) as any}
            sx={{ fontWeight: 600, px: 1.5, py: 0.5 }}
          >
            {getMediaTypeLabel(media.type)}
          </Chip>
        </Box>
      }
      footer={
        <Box sx={{ mt: 'auto', pt: 2 }}>
          {/* Tags */}
          {media.tags && media.tags.length > 0 && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
              {media.tags.slice(0, 3).map((tag, index) => (
                <Chip key={index} size="sm" variant="outlined">
                  {tag}
                </Chip>
              ))}
              {media.tags.length > 3 && (
                <Chip size="sm" variant="outlined">
                  +{media.tags.length - 3}
                </Chip>
              )}
            </Box>
          )}
        </Box>
      }
      sx={{
        cursor: onClick ? 'pointer' : 'default',
        '&:hover': onClick ? {
          transform: 'translateY(-4px)',
        } : {},
      }}
      onClick={onClick}
    />
  );
}
```

**Verification:**
- [ ] Component renders correctly
- [ ] Shows media info
- [ ] Hover effect works
- [ ] Tags display properly

---

### Task 2.2: Create Gallery Grid Component

**File:** `src/components/media/GalleryGrid.tsx`

```typescript
'use client';

import { MediaItem } from '@/types/media';
import { Grid, Box, Typography } from '@mui/joy';
import MediaCard from './MediaCard';

interface GalleryGridProps {
  items: MediaItem[];
  onMediaClick?: (media: MediaItem) => void;
  loading?: boolean;
  emptyMessage?: string;
}

export default function GalleryGrid({
  items,
  onMediaClick,
  loading = false,
  emptyMessage = 'Nie znaleziono mediów',
}: GalleryGridProps) {
  if (loading) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography level="body-lg">Ładowanie...</Typography>
      </Box>
    );
  }

  if (items.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography level="h4" sx={{ mb: 1 }}>
          {emptyMessage}
        </Typography>
        <Typography level="body-md" sx={{ color: 'text.secondary' }}>
          Spróbuj zmienić filtry lub wyszukiwanie
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      {items.map((media) => (
        <Grid xs={12} sm={6} md={4} lg={3} key={media.id}>
          <MediaCard
            media={media}
            onClick={onMediaClick ? () => onMediaClick(media) : undefined}
          />
        </Grid>
      ))}
    </Grid>
  );
}
```

**Verification:**
- [ ] Grid displays correctly
- [ ] Responsive breakpoints work
- [ ] Empty state shows
- [ ] Loading state shows

---

### Task 2.3: Create Gallery Filters Component

**File:** `src/components/media/GalleryFilters.tsx`

```typescript
'use client';

import { useState } from 'react';
import {
  Box,
  Select,
  Option,
  Input,
  Stack,
  Chip,
  Typography,
} from '@mui/joy';
import { GalleryFilter, MediaType } from '@/types/media';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';

interface GalleryFiltersProps {
  filter: GalleryFilter;
  onChange: (filter: GalleryFilter) => void;
  availableCategories?: string[];
  availableTags?: string[];
}

const mediaTypes: { value: MediaType; label: string }[] = [
  { value: 'photo', label: 'Zdjęcia' },
  { value: 'album', label: 'Albumy' },
  { value: 'scan', label: 'Skany' },
  { value: 'infographic', label: 'Infografiki' },
  { value: 'historical', label: 'Historyczne' },
  { value: 'artwork', label: 'Dzieła sztuki' },
  { value: 'document', label: 'Dokumenty' },
  { value: 'panorama', label: 'Panoramy' },
];

export default function GalleryFilters({
  filter,
  onChange,
  availableCategories = [],
  availableTags = [],
}: GalleryFiltersProps) {
  const [searchValue, setSearchValue] = useState(filter.search || '');

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    onChange({ ...filter, search: value });
  };

  const handleTypeChange = (value: MediaType | 'all') => {
    onChange({
      ...filter,
      type: value === 'all' ? undefined : value,
    });
  };

  const handleCategoryChange = (value: string | 'all') => {
    onChange({
      ...filter,
      category: value === 'all' ? undefined : value,
    });
  };

  const handleTagToggle = (tag: string) => {
    const currentTags = filter.tags || [];
    const newTags = currentTags.includes(tag)
      ? currentTags.filter(t => t !== tag)
      : [...currentTags, tag];

    onChange({
      ...filter,
      tags: newTags.length > 0 ? newTags : undefined,
    });
  };

  const handleClearFilters = () => {
    setSearchValue('');
    onChange({});
  };

  const hasActiveFilters = filter.type || filter.category || (filter.tags && filter.tags.length > 0) || filter.search;

  return (
    <Box sx={{ mb: 4 }}>
      <Stack spacing={2}>
        {/* Search */}
        <Input
          placeholder="Szukaj w galerii..."
          value={searchValue}
          onChange={(e) => handleSearchChange(e.target.value)}
          startDecorator={<SearchIcon />}
          size="lg"
        />

        {/* Filters row */}
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          {/* Type filter */}
          <Select
            value={filter.type || 'all'}
            onChange={(_, value) => handleTypeChange(value as MediaType | 'all')}
            placeholder="Typ"
            sx={{ minWidth: 200 }}
          >
            <Option value="all">Wszystkie typy</Option>
            {mediaTypes.map((type) => (
              <Option key={type.value} value={type.value}>
                {type.label}
              </Option>
            ))}
          </Select>

          {/* Category filter */}
          {availableCategories.length > 0 && (
            <Select
              value={filter.category || 'all'}
              onChange={(_, value) => handleCategoryChange(value as string)}
              placeholder="Kategoria"
              sx={{ minWidth: 200 }}
            >
              <Option value="all">Wszystkie kategorie</Option>
              {availableCategories.map((category) => (
                <Option key={category} value={category}>
                  {category}
                </Option>
              ))}
            </Select>
          )}

          {/* Clear filters */}
          {hasActiveFilters && (
            <Chip
              variant="soft"
              color="neutral"
              onClick={handleClearFilters}
              sx={{ cursor: 'pointer' }}
            >
              Wyczyść filtry
            </Chip>
          )}
        </Stack>

        {/* Tags */}
        {availableTags.length > 0 && (
          <Box>
            <Typography level="body-sm" sx={{ mb: 1, color: 'text.secondary' }}>
              <FilterListIcon sx={{ fontSize: '1rem', mr: 0.5 }} />
              Tagi:
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {availableTags.map((tag) => (
                <Chip
                  key={tag}
                  variant={filter.tags?.includes(tag) ? 'solid' : 'outlined'}
                  color={filter.tags?.includes(tag) ? 'primary' : 'neutral'}
                  onClick={() => handleTagToggle(tag)}
                  sx={{ cursor: 'pointer' }}
                >
                  {tag}
                </Chip>
              ))}
            </Stack>
          </Box>
        )}
      </Stack>
    </Box>
  );
}
```

**Verification:**
- [ ] Filters render correctly
- [ ] Type selection works
- [ ] Category selection works
- [ ] Tag toggling works
- [ ] Search works
- [ ] Clear filters works

---

### Task 2.4: Create Main Gallery Page

**File:** `src/app/gallery/page.tsx`

```typescript
'use client';

import { useState, useEffect } from 'react';
import { Box, Container, Typography, Stack } from '@mui/joy';
import { MediaItem, GalleryFilter } from '@/types/media';
import GalleryGrid from '@/components/media/GalleryGrid';
import GalleryFilters from '@/components/media/GalleryFilters';
import SectionWrapper from '@/components/SectionWrapper';

export default function GalleryPage() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<GalleryFilter>({});

  // Fetch media items
  useEffect(() => {
    async function fetchMedia() {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams();

        if (filter.type) queryParams.append('type', filter.type);
        if (filter.category) queryParams.append('category', filter.category);
        if (filter.tags) queryParams.append('tags', filter.tags.join(','));
        if (filter.search) queryParams.append('search', filter.search);

        const response = await fetch(`/api/media?${queryParams.toString()}`);
        const data = await response.json();

        setItems(data.items || []);
      } catch (error) {
        console.error('Failed to fetch media:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchMedia();
  }, [filter]);

  const handleMediaClick = (media: MediaItem) => {
    // Navigate to detail page
    window.location.href = `/gallery/${media.id}`;
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 6 }}>
        <Typography level="h1" sx={{ mb: 2 }}>
          Galeria
        </Typography>
        <Typography level="body-lg" sx={{ color: 'text.secondary' }}>
          Przeglądaj zdjęcia, albumy i inne materiały wizualne z Radzynia Podlaskiego
        </Typography>
      </Box>

      <SectionWrapper title="Przeglądaj galerię">
        <GalleryFilters
          filter={filter}
          onChange={setFilter}
          availableCategories={['Zabytki', 'Natura', 'Wydarzenia', 'Ludzie']}
          availableTags={['pałac', 'architektura', 'park', 'wydarzenie', 'historia']}
        />

        <GalleryGrid
          items={items}
          loading={loading}
          onMediaClick={handleMediaClick}
        />
      </SectionWrapper>
    </Container>
  );
}
```

**Verification:**
- [ ] Page renders
- [ ] Filters work
- [ ] Grid displays
- [ ] Loading state shows
- [ ] Click navigates to detail

---

### Task 2.5: Create Media List API Route

**File:** `src/app/api/media/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getMediaList } from '@/services/mediaDbService';
import { MediaType, MediaStatus } from '@/types/media';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const type = searchParams.get('type') as MediaType | null;
    const category = searchParams.get('category');
    const status = (searchParams.get('status') as MediaStatus) || 'published';
    const featured = searchParams.get('featured') === 'true';
    const tags = searchParams.get('tags')?.split(',').filter(Boolean);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    const offset = (page - 1) * limit;

    const result = await getMediaList({
      type: type || undefined,
      category: category || undefined,
      status,
      featured: featured || undefined,
      tags,
      limit,
      offset,
    });

    return NextResponse.json({
      items: result.items,
      total: result.total,
      page,
      limit,
      totalPages: Math.ceil(result.total / limit),
    });
  } catch (error) {
    console.error('Failed to get media list:', error);
    return NextResponse.json(
      { error: 'Failed to fetch media' },
      { status: 500 }
    );
  }
}
```

**Verification:**
- [ ] API works
- [ ] Filtering works
- [ ] Pagination works
- [ ] Returns correct data

---

## PHASE 3: Media Detail & Lightbox (6-8 godzin)

### Task 3.1: Install Lightbox Library

```bash
npm install yet-another-react-lightbox
```

**Verification:**
- [ ] Package installed
- [ ] No conflicts

---

### Task 3.2: Create Media Detail Page

**File:** `src/app/gallery/[id]/page.tsx`

```typescript
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Box,
  Container,
  Typography,
  Stack,
  Chip,
  Button,
  Divider,
  Grid,
} from '@mui/joy';
import { MediaItem } from '@/types/media';
import Image from 'next/image';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DownloadIcon from '@mui/icons-material/Download';
import ShareIcon from '@mui/icons-material/Share';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TagIcon from '@mui/icons-material/Tag';
import Link from 'next/link';

export default function MediaDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [media, setMedia] = useState<MediaItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedMedia, setRelatedMedia] = useState<MediaItem[]>([]);

  useEffect(() => {
    async function fetchMedia() {
      try {
        const response = await fetch(`/api/media/${params.id}`);
        const data = await response.json();
        setMedia(data);

        // Fetch related media
        if (data.tags && data.tags.length > 0) {
          const relatedResponse = await fetch(
            `/api/media?tags=${data.tags[0]}&limit=4`
          );
          const relatedData = await relatedResponse.json();
          setRelatedMedia(
            relatedData.items.filter((item: MediaItem) => item.id !== data.id)
          );
        }
      } catch (error) {
        console.error('Failed to fetch media:', error);
      } finally {
        setLoading(false);
      }
    }

    if (params.id) {
      fetchMedia();
    }
  }, [params.id]);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <Typography level="body-lg">Ładowanie...</Typography>
      </Container>
    );
  }

  if (!media) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <Typography level="h3" sx={{ mb: 2 }}>
          Nie znaleziono media
        </Typography>
        <Button component={Link} href="/gallery" startDecorator={<ArrowBackIcon />}>
          Powrót do galerii
        </Button>
      </Container>
    );
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pl-PL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(date));
  };

  const handleDownload = () => {
    window.open(media.storage.url, '_blank');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: media.title,
          text: media.description,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Share failed:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link skopiowany do schowka!');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Back button */}
      <Button
        variant="plain"
        startDecorator={<ArrowBackIcon />}
        onClick={() => router.back()}
        sx={{ mb: 3 }}
      >
        Powrót
      </Button>

      <Grid container spacing={4}>
        {/* Image */}
        <Grid xs={12} md={8}>
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              aspectRatio: `${media.technical.width} / ${media.technical.height}`,
              borderRadius: 'lg',
              overflow: 'hidden',
              bgcolor: 'background.level1',
            }}
          >
            <Image
              src={media.storage.url}
              alt={media.alt}
              fill
              style={{ objectFit: 'contain' }}
              sizes="(max-width: 768px) 100vw, 66vw"
              priority
            />
          </Box>

          {/* Actions */}
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Button
              variant="soft"
              startDecorator={<DownloadIcon />}
              onClick={handleDownload}
            >
              Pobierz
            </Button>
            <Button
              variant="soft"
              startDecorator={<ShareIcon />}
              onClick={handleShare}
            >
              Udostępnij
            </Button>
          </Stack>
        </Grid>

        {/* Info */}
        <Grid xs={12} md={4}>
          <Stack spacing={3}>
            {/* Title */}
            <Box>
              <Typography level="h2" sx={{ mb: 1 }}>
                {media.title}
              </Typography>
              {media.description && (
                <Typography level="body-md" sx={{ color: 'text.secondary' }}>
                  {media.description}
                </Typography>
              )}
            </Box>

            <Divider />

            {/* Metadata */}
            <Stack spacing={2}>
              {/* Upload date */}
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CalendarTodayIcon sx={{ fontSize: '1.25rem', mr: 1.5, color: 'text.secondary' }} />
                <Box>
                  <Typography level="body-xs" sx={{ color: 'text.tertiary' }}>
                    Dodano
                  </Typography>
                  <Typography level="body-sm">
                    {formatDate(media.attribution.uploadedAt)}
                  </Typography>
                </Box>
              </Box>

              {/* Author */}
              {media.attribution.author && (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <PersonIcon sx={{ fontSize: '1.25rem', mr: 1.5, color: 'text.secondary' }} />
                  <Box>
                    <Typography level="body-xs" sx={{ color: 'text.tertiary' }}>
                      Autor
                    </Typography>
                    <Typography level="body-sm">
                      {media.attribution.author}
                    </Typography>
                  </Box>
                </Box>
              )}

              {/* Location */}
              {media.location && (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <LocationOnIcon sx={{ fontSize: '1.25rem', mr: 1.5, color: 'text.secondary' }} />
                  <Box>
                    <Typography level="body-xs" sx={{ color: 'text.tertiary' }}>
                      Lokalizacja
                    </Typography>
                    <Typography level="body-sm">
                      {media.location.name}
                    </Typography>
                  </Box>
                </Box>
              )}

              {/* Tags */}
              {media.tags && media.tags.length > 0 && (
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <TagIcon sx={{ fontSize: '1.25rem', mr: 1.5, color: 'text.secondary' }} />
                    <Typography level="body-xs" sx={{ color: 'text.tertiary' }}>
                      Tagi
                    </Typography>
                  </Box>
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    {media.tags.map((tag, index) => (
                      <Chip key={index} size="sm" variant="soft">
                        {tag}
                      </Chip>
                    ))}
                  </Stack>
                </Box>
              )}

              {/* Technical info */}
              <Box>
                <Typography level="body-xs" sx={{ color: 'text.tertiary', mb: 1 }}>
                  Szczegóły techniczne
                </Typography>
                <Stack spacing={0.5}>
                  <Typography level="body-sm">
                    Wymiary: {media.technical.width} × {media.technical.height} px
                  </Typography>
                  <Typography level="body-sm">
                    Rozmiar: {(media.technical.fileSize! / 1024 / 1024).toFixed(2)} MB
                  </Typography>
                  <Typography level="body-sm">
                    Format: {media.technical.mimeType}
                  </Typography>
                </Stack>
              </Box>

              {/* License */}
              {media.attribution.license && (
                <Box>
                  <Typography level="body-xs" sx={{ color: 'text.tertiary', mb: 1 }}>
                    Licencja
                  </Typography>
                  <Typography level="body-sm">
                    {media.attribution.license}
                  </Typography>
                </Box>
              )}
            </Stack>
          </Stack>
        </Grid>
      </Grid>

      {/* Related media */}
      {relatedMedia.length > 0 && (
        <Box sx={{ mt: 6 }}>
          <Typography level="h3" sx={{ mb: 3 }}>
            Podobne zdjęcia
          </Typography>
          <Grid container spacing={3}>
            {relatedMedia.map((item) => (
              <Grid xs={12} sm={6} md={3} key={item.id}>
                <Box
                  component={Link}
                  href={`/gallery/${item.id}`}
                  sx={{
                    display: 'block',
                    position: 'relative',
                    aspectRatio: '4/3',
                    borderRadius: 'md',
                    overflow: 'hidden',
                    '&:hover img': {
                      transform: 'scale(1.05)',
                    },
                  }}
                >
                  <Image
                    src={item.storage.thumbnailUrl || item.storage.url}
                    alt={item.alt}
                    fill
                    style={{ objectFit: 'cover', transition: 'transform 0.3s' }}
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Container>
  );
}
```

**Verification:**
- [ ] Page renders correctly
- [ ] Image displays properly
- [ ] Metadata shows correctly
- [ ] Download works
- [ ] Share works (or copies link)
- [ ] Related media displays
- [ ] Back button works

---

### Task 3.3: Create Media Detail API Route

**File:** `src/app/api/media/[id]/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getMediaById } from '@/services/mediaDbService';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const media = await getMediaById(params.id);

    if (!media) {
      return NextResponse.json(
        { error: 'Media not found' },
        { status: 404 }
      );
    }

    // Increment view count (optional)
    // await incrementMediaViews(params.id);

    return NextResponse.json(media);
  } catch (error) {
    console.error('Failed to get media:', error);
    return NextResponse.json(
      { error: 'Failed to fetch media' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // TODO: Add authentication check
    // const session = await getSession(request);
    // if (!session?.user?.isAdmin) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    const media = await getMediaById(params.id);
    if (!media) {
      return NextResponse.json(
        { error: 'Media not found' },
        { status: 404 }
      );
    }

    // Delete from S3
    const { deleteFromS3 } = await import('@/services/s3Service');
    await deleteFromS3(media.storage.key);

    // Delete thumbnails if exist
    if (media.storage.thumbnailUrl) {
      const thumbnailKey = media.storage.key.replace('/original/', '/thumbnails/');
      await deleteFromS3(thumbnailKey);
    }

    // Delete from database
    const { deleteMedia } = await import('@/services/mediaDbService');
    await deleteMedia(params.id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete media:', error);
    return NextResponse.json(
      { error: 'Failed to delete media' },
      { status: 500 }
    );
  }
}
```

**Verification:**
- [ ] GET endpoint works
- [ ] Returns media data
- [ ] 404 for non-existent media
- [ ] DELETE works (with auth disabled for now)

---

### Task 3.4: Add Lightbox to Gallery

**File:** `src/components/media/GalleryWithLightbox.tsx`

```typescript
'use client';

import { useState } from 'react';
import { MediaItem } from '@/types/media';
import GalleryGrid from './GalleryGrid';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Download from 'yet-another-react-lightbox/plugins/download';

interface GalleryWithLightboxProps {
  items: MediaItem[];
  loading?: boolean;
}

export default function GalleryWithLightbox({
  items,
  loading = false,
}: GalleryWithLightboxProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const handleMediaClick = (media: MediaItem) => {
    const index = items.findIndex(item => item.id === media.id);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  // Convert media items to lightbox slides
  const slides = items.map(item => ({
    src: item.storage.url,
    alt: item.alt,
    title: item.title,
    description: item.description,
    width: item.technical.width,
    height: item.technical.height,
    download: item.storage.url,
  }));

  return (
    <>
      <GalleryGrid
        items={items}
        loading={loading}
        onMediaClick={handleMediaClick}
      />

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={slides}
        plugins={[Zoom, Download]}
        zoom={{
          maxZoomPixelRatio: 3,
          scrollToZoom: true,
        }}
      />
    </>
  );
}
```

**Verification:**
- [ ] Lightbox opens on media click
- [ ] Navigation between images works
- [ ] Zoom works
- [ ] Download button works
- [ ] Close button works
- [ ] Keyboard navigation (arrows, Esc)

---

## PHASE 4: Media Upload UI (8-10 godzin)

### Task 4.1: Create Upload Component

**File:** `src/components/media/MediaUpload.tsx`

```typescript
'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Box,
  Typography,
  Stack,
  Input,
  Textarea,
  Select,
  Option,
  Button,
  LinearProgress,
  Chip,
  FormControl,
  FormLabel,
} from '@mui/joy';
import { MediaType } from '@/types/media';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

interface UploadFile {
  file: File;
  preview: string;
  status: 'pending' | 'uploading' | 'success' | 'error';
  progress: number;
  error?: string;
  mediaId?: string;
}

export default function MediaUpload() {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);

  // Form state
  const [mediaType, setMediaType] = useState<MediaType>('photo');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      status: 'pending' as const,
      progress: 0,
    }));

    setFiles(prev => [...prev, ...newFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp'],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: true,
  });

  const uploadFile = async (uploadFile: UploadFile, index: number) => {
    const formData = new FormData();
    formData.append('file', uploadFile.file);
    formData.append('type', mediaType);
    formData.append('title', uploadFile.file.name.replace(/\.[^/.]+$/, ''));
    formData.append('alt', uploadFile.file.name);

    if (category) formData.append('category', category);
    if (tags) formData.append('tags', tags);

    try {
      const xhr = new XMLHttpRequest();

      // Track progress
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const progress = (event.loaded / event.total) * 100;
          setFiles(prev => {
            const updated = [...prev];
            updated[index] = {
              ...updated[index],
              status: 'uploading',
              progress,
            };
            return updated;
          });
        }
      };

      // Handle completion
      xhr.onload = () => {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          setFiles(prev => {
            const updated = [...prev];
            updated[index] = {
              ...updated[index],
              status: 'success',
              progress: 100,
              mediaId: response.media.id,
            };
            return updated;
          });
        } else {
          throw new Error('Upload failed');
        }
      };

      // Handle errors
      xhr.onerror = () => {
        setFiles(prev => {
          const updated = [...prev];
          updated[index] = {
            ...updated[index],
            status: 'error',
            error: 'Upload failed',
          };
          return updated;
        });
      };

      xhr.open('POST', '/api/media/upload');
      xhr.send(formData);
    } catch (error) {
      setFiles(prev => {
        const updated = [...prev];
        updated[index] = {
          ...updated[index],
          status: 'error',
          error: error instanceof Error ? error.message : 'Upload failed',
        };
        return updated;
      });
    }
  };

  const handleUploadAll = async () => {
    setUploading(true);

    for (let i = 0; i < files.length; i++) {
      if (files[i].status === 'pending') {
        await uploadFile(files[i], i);
      }
    }

    setUploading(false);
  };

  const handleRemoveFile = (index: number) => {
    URL.revokeObjectURL(files[index].preview);
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleClear = () => {
    files.forEach(file => URL.revokeObjectURL(file.preview));
    setFiles([]);
  };

  const pendingCount = files.filter(f => f.status === 'pending').length;
  const successCount = files.filter(f => f.status === 'success').length;

  return (
    <Stack spacing={3}>
      {/* Settings */}
      <Stack spacing={2}>
        <FormControl>
          <FormLabel>Typ media</FormLabel>
          <Select
            value={mediaType}
            onChange={(_, value) => setMediaType(value as MediaType)}
          >
            <Option value="photo">Zdjęcie</Option>
            <Option value="scan">Skan</Option>
            <Option value="infographic">Infografika</Option>
            <Option value="historical">Materiał historyczny</Option>
            <Option value="artwork">Dzieło sztuki</Option>
            <Option value="document">Dokument</Option>
            <Option value="panorama">Panorama</Option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Kategoria (opcjonalnie)</FormLabel>
          <Input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="np. Zabytki, Natura, Wydarzenia"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Tagi (opcjonalnie, oddzielone przecinkami)</FormLabel>
          <Input
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="np. pałac, architektura, barok"
          />
        </FormControl>
      </Stack>

      {/* Dropzone */}
      <Box
        {...getRootProps()}
        sx={{
          border: '2px dashed',
          borderColor: isDragActive ? 'primary.500' : 'neutral.300',
          borderRadius: 'lg',
          p: 4,
          textAlign: 'center',
          cursor: 'pointer',
          transition: 'all 0.2s',
          bgcolor: isDragActive ? 'primary.50' : 'background.surface',
          '&:hover': {
            borderColor: 'primary.500',
            bgcolor: 'primary.50',
          },
        }}
      >
        <input {...getInputProps()} />
        <CloudUploadIcon sx={{ fontSize: 48, color: 'primary.500', mb: 2 }} />
        <Typography level="h4" sx={{ mb: 1 }}>
          {isDragActive ? 'Upuść pliki tutaj' : 'Przeciągnij pliki lub kliknij'}
        </Typography>
        <Typography level="body-sm" sx={{ color: 'text.secondary' }}>
          JPG, PNG, GIF, WebP (max 10MB)
        </Typography>
      </Box>

      {/* File list */}
      {files.length > 0 && (
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography level="title-md">
              Pliki: {files.length} ({successCount} przesłanych)
            </Typography>
            <Button
              variant="plain"
              size="sm"
              onClick={handleClear}
              disabled={uploading}
            >
              Wyczyść wszystko
            </Button>
          </Box>

          {files.map((uploadFile, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                p: 2,
                borderRadius: 'md',
                bgcolor: 'background.level1',
              }}
            >
              {/* Preview */}
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: 'sm',
                  overflow: 'hidden',
                  flexShrink: 0,
                }}
              >
                <img
                  src={uploadFile.preview}
                  alt=""
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </Box>

              {/* Info */}
              <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                <Typography level="body-sm" sx={{ fontWeight: 500 }}>
                  {uploadFile.file.name}
                </Typography>
                <Typography level="body-xs" sx={{ color: 'text.tertiary' }}>
                  {(uploadFile.file.size / 1024 / 1024).toFixed(2)} MB
                </Typography>

                {/* Progress */}
                {uploadFile.status === 'uploading' && (
                  <LinearProgress
                    determinate
                    value={uploadFile.progress}
                    sx={{ mt: 1 }}
                  />
                )}
              </Box>

              {/* Status */}
              <Box sx={{ flexShrink: 0 }}>
                {uploadFile.status === 'pending' && (
                  <Chip size="sm" variant="soft">
                    Oczekuje
                  </Chip>
                )}
                {uploadFile.status === 'uploading' && (
                  <Chip size="sm" variant="soft" color="primary">
                    {uploadFile.progress.toFixed(0)}%
                  </Chip>
                )}
                {uploadFile.status === 'success' && (
                  <CheckCircleIcon sx={{ fontSize: 24, color: 'success.500' }} />
                )}
                {uploadFile.status === 'error' && (
                  <ErrorIcon sx={{ fontSize: 24, color: 'danger.500' }} />
                )}
              </Box>

              {/* Remove */}
              {uploadFile.status === 'pending' && (
                <Button
                  variant="plain"
                  size="sm"
                  onClick={() => handleRemoveFile(index)}
                  disabled={uploading}
                >
                  Usuń
                </Button>
              )}
            </Box>
          ))}
        </Stack>
      )}

      {/* Upload button */}
      {pendingCount > 0 && (
        <Button
          size="lg"
          onClick={handleUploadAll}
          loading={uploading}
          startDecorator={<CloudUploadIcon />}
        >
          Prześlij {pendingCount} {pendingCount === 1 ? 'plik' : 'plików'}
        </Button>
      )}

      {/* Success message */}
      {successCount > 0 && pendingCount === 0 && (
        <Box
          sx={{
            p: 2,
            borderRadius: 'md',
            bgcolor: 'success.50',
            border: '1px solid',
            borderColor: 'success.200',
          }}
        >
          <Typography level="body-md" sx={{ color: 'success.700' }}>
            ✓ Przesłano {successCount} {successCount === 1 ? 'plik' : 'plików'}
          </Typography>
        </Box>
      )}
    </Stack>
  );
}
```

**Verification:**
- [ ] Drag & drop works
- [ ] File selection works
- [ ] Preview shows
- [ ] Progress bar works
- [ ] Upload completes successfully
- [ ] Multiple files work
- [ ] Error handling works

---

### Task 4.2: Create Upload Page

**File:** `src/app/admin/media/upload/page.tsx`

```typescript
'use client';

import { Container, Typography, Box } from '@mui/joy';
import MediaUpload from '@/components/media/MediaUpload';
import SectionWrapper from '@/components/SectionWrapper';

export default function MediaUploadPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography level="h1" sx={{ mb: 2 }}>
          Dodaj media
        </Typography>
        <Typography level="body-lg" sx={{ color: 'text.secondary' }}>
          Prześlij zdjęcia, skany i inne materiały do galerii
        </Typography>
      </Box>

      <SectionWrapper title="Upload plików">
        <MediaUpload />
      </SectionWrapper>
    </Container>
  );
}
```

**Verification:**
- [ ] Page renders
- [ ] Upload component works
- [ ] Layout correct

---

## PHASE 5: Integration (10-12 godzin)

### Task 5.1: Add Media to Places

**File:** Update `src/utils/locationData.ts`

```typescript
// Add images field to LocationPoint interface
export interface LocationPoint {
  id: string;
  name: string;
  // ... existing fields
  images?: string[]; // Array of media IDs
}
```

**File:** `src/components/PlaceGallery.tsx`

```typescript
'use client';

import { useState, useEffect } from 'react';
import { MediaItem } from '@/types/media';
import { Box, Typography } from '@mui/joy';
import GalleryWithLightbox from './media/GalleryWithLightbox';

interface PlaceGalleryProps {
  placeId: string;
}

export default function PlaceGallery({ placeId }: PlaceGalleryProps) {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMedia() {
      try {
        const response = await fetch(
          `/api/media?relatedType=place&relatedId=${placeId}`
        );
        const data = await response.json();
        setMedia(data.items || []);
      } catch (error) {
        console.error('Failed to fetch place media:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchMedia();
  }, [placeId]);

  if (loading) {
    return <Typography>Ładowanie galerii...</Typography>;
  }

  if (media.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography level="body-md" sx={{ color: 'text.secondary' }}>
          Brak zdjęć dla tego miejsca
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography level="h3" sx={{ mb: 3 }}>
        Galeria ({media.length})
      </Typography>
      <GalleryWithLightbox items={media} />
    </Box>
  );
}
```

**Usage in place detail page:**

```typescript
// In src/app/places/[id]/page.tsx
import PlaceGallery from '@/components/PlaceGallery';

// Add to page:
<PlaceGallery placeId={place.id} />
```

**Verification:**
- [ ] Gallery shows on place page
- [ ] Media filtered by place
- [ ] Lightbox works

---

### Task 5.2: Add Featured Gallery to Homepage

**File:** `src/components/FeaturedGallery.tsx`

```typescript
'use client';

import { useState, useEffect } from 'react';
import { MediaItem } from '@/types/media';
import { Box, Typography, Grid } from '@mui/joy';
import Link from 'next/link';
import Image from 'next/image';
import Button from './foundation/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SectionWrapper from './SectionWrapper';

export default function FeaturedGallery() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeatured() {
      try {
        const response = await fetch('/api/media?featured=true&limit=6');
        const data = await response.json();
        setMedia(data.items || []);
      } catch (error) {
        console.error('Failed to fetch featured media:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchFeatured();
  }, []);

  if (loading || media.length === 0) {
    return null;
  }

  return (
    <SectionWrapper
      title="Galeria Zdjęć"
      actions={
        <Button
          component={Link}
          href="/gallery"
          variant="soft"
          size="md"
          endDecorator={<ArrowForwardIcon />}
          sx={{ px: 3, py: 1.5, fontSize: '0.95rem' }}
        >
          Zobacz wszystkie
        </Button>
      }
    >
      <Grid container spacing={2}>
        {media.map((item) => (
          <Grid xs={12} sm={6} md={4} key={item.id}>
            <Box
              component={Link}
              href={`/gallery/${item.id}`}
              sx={{
                display: 'block',
                position: 'relative',
                aspectRatio: '4/3',
                borderRadius: 'md',
                overflow: 'hidden',
                '&:hover img': {
                  transform: 'scale(1.05)',
                },
                '&:hover .overlay': {
                  opacity: 1,
                },
              }}
            >
              <Image
                src={item.storage.thumbnailUrl || item.storage.url}
                alt={item.alt}
                fill
                style={{ objectFit: 'cover', transition: 'transform 0.3s' }}
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <Box
                className="overlay"
                sx={{
                  position: 'absolute',
                  inset: 0,
                  bgcolor: 'rgba(0,0,0,0.4)',
                  display: 'flex',
                  alignItems: 'flex-end',
                  p: 2,
                  opacity: 0,
                  transition: 'opacity 0.3s',
                }}
              >
                <Typography level="title-md" sx={{ color: 'white' }}>
                  {item.title}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </SectionWrapper>
  );
}
```

**Add to homepage (src/app/page.tsx):**

```typescript
import FeaturedGallery from '@/components/FeaturedGallery';

// Add to dashboardWidgets array or render directly:
<FeaturedGallery />
```

**Verification:**
- [ ] Featured gallery shows on homepage
- [ ] Images display correctly
- [ ] Links work
- [ ] Hover effects work

---

## PHASE 6: Advanced Features (8-10 godzin)

### Task 6.1: Add Search Functionality

**Update:** `src/services/mediaDbService.ts`

```typescript
export async function searchMedia(query: string, limit = 20): Promise<MediaItem[]> {
  const sql = `
    SELECT * FROM media
    WHERE status = 'published'
    AND (
      title ILIKE $1
      OR description ILIKE $1
      OR $2 = ANY(tags)
      OR category ILIKE $1
    )
    ORDER BY created_at DESC
    LIMIT $3
  `;

  const searchPattern = `%${query}%`;
  const result = await executeQuery(sql, [searchPattern, query, limit]);

  return result.rows.map(mapRowToMediaItem);
}
```

**Verification:**
- [ ] Search works
- [ ] Case-insensitive
- [ ] Searches title, description, tags, category

---

### Task 6.2: Add Pagination

**File:** `src/components/media/Pagination.tsx`

```typescript
'use client';

import { Box, Button, Typography } from '@mui/joy';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Show max 7 pages
  let displayPages = pages;
  if (totalPages > 7) {
    if (currentPage <= 4) {
      displayPages = [...pages.slice(0, 5), -1, totalPages];
    } else if (currentPage >= totalPages - 3) {
      displayPages = [1, -1, ...pages.slice(totalPages - 5)];
    } else {
      displayPages = [
        1,
        -1,
        currentPage - 1,
        currentPage,
        currentPage + 1,
        -1,
        totalPages,
      ];
    }
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1, mt: 4 }}>
      <Button
        variant="plain"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        startDecorator={<ChevronLeftIcon />}
      >
        Poprzednia
      </Button>

      {displayPages.map((page, index) =>
        page === -1 ? (
          <Typography key={`ellipsis-${index}`} sx={{ px: 1 }}>
            ...
          </Typography>
        ) : (
          <Button
            key={page}
            variant={page === currentPage ? 'solid' : 'plain'}
            onClick={() => onPageChange(page)}
          >
            {page}
          </Button>
        )
      )}

      <Button
        variant="plain"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        endDecorator={<ChevronRightIcon />}
      >
        Następna
      </Button>
    </Box>
  );
}
```

**Update gallery page to use pagination.**

**Verification:**
- [ ] Pagination displays
- [ ] Navigation works
- [ ] Ellipsis shows for many pages

---

### Task 6.3: Add Admin Management Page

**File:** `src/app/admin/media/page.tsx`

```typescript
'use client';

import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Table,
  Button,
  Sheet,
  Chip,
} from '@mui/joy';
import { MediaItem } from '@/types/media';
import Link from 'next/link';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

export default function MediaManagementPage() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMedia();
  }, []);

  async function fetchMedia() {
    try {
      const response = await fetch('/api/media?limit=50');
      const data = await response.json();
      setMedia(data.items || []);
    } catch (error) {
      console.error('Failed to fetch media:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Czy na pewno chcesz usunąć ten element?')) {
      return;
    }

    try {
      await fetch(`/api/media/${id}`, { method: 'DELETE' });
      setMedia(prev => prev.filter(item => item.id !== id));
    } catch (error) {
      console.error('Failed to delete media:', error);
      alert('Nie udało się usunąć media');
    }
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography level="h1">Zarządzanie mediami</Typography>
        <Button
          component={Link}
          href="/admin/media/upload"
          startDecorator={<AddIcon />}
        >
          Dodaj media
        </Button>
      </Box>

      <Sheet variant="outlined" sx={{ borderRadius: 'md', overflow: 'auto' }}>
        <Table>
          <thead>
            <tr>
              <th>Podgląd</th>
              <th>Tytuł</th>
              <th>Typ</th>
              <th>Kategoria</th>
              <th>Data</th>
              <th>Status</th>
              <th>Akcje</th>
            </tr>
          </thead>
          <tbody>
            {media.map((item) => (
              <tr key={item.id}>
                <td>
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: 'sm',
                      overflow: 'hidden',
                      bgcolor: 'background.level1',
                    }}
                  >
                    <img
                      src={item.storage.thumbnailUrl || item.storage.url}
                      alt={item.alt}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </Box>
                </td>
                <td>{item.title}</td>
                <td>
                  <Chip size="sm">{item.type}</Chip>
                </td>
                <td>{item.category || '-'}</td>
                <td>
                  {new Date(item.createdAt).toLocaleDateString('pl-PL')}
                </td>
                <td>
                  <Chip
                    size="sm"
                    color={item.status === 'published' ? 'success' : 'neutral'}
                  >
                    {item.status}
                  </Chip>
                </td>
                <td>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      size="sm"
                      variant="plain"
                      component={Link}
                      href={`/gallery/${item.id}`}
                    >
                      <EditIcon />
                    </Button>
                    <Button
                      size="sm"
                      variant="plain"
                      color="danger"
                      onClick={() => handleDelete(item.id)}
                    >
                      <DeleteIcon />
                    </Button>
                  </Box>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>
    </Container>
  );
}
```

**Verification:**
- [ ] Table displays media
- [ ] Preview images show
- [ ] Delete works
- [ ] Links work

---

## PHASE 7: Polish & Optimization (4-6 godzin)

### Task 7.1: Add Loading Skeletons

**File:** `src/components/media/MediaCardSkeleton.tsx`

```typescript
'use client';

import { Box, Skeleton, Card, CardContent } from '@mui/joy';

export default function MediaCardSkeleton() {
  return (
    <Card>
      <Skeleton variant="rectangular" height={240} />
      <CardContent>
        <Skeleton variant="text" level="h3" width="80%" />
        <Skeleton variant="text" level="body-sm" width="60%" sx={{ mt: 1 }} />
        <Skeleton variant="text" level="body-sm" width="90%" sx={{ mt: 1 }} />
      </CardContent>
    </Card>
  );
}
```

**Use in GalleryGrid during loading.**

**Verification:**
- [ ] Skeletons show during load
- [ ] Smooth transition to content

---

### Task 7.2: Add Image Optimization

**Update:** Next.js Image component settings

**File:** `next.config.js`

```javascript
module.exports = {
  images: {
    domains: [
      's3.your-domain.com',
      'cdn.your-domain.com',
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};
```

**Verification:**
- [ ] Images load optimized
- [ ] WebP format used
- [ ] Correct sizes generated

---

### Task 7.3: Add Error Boundaries

**File:** `src/components/media/GalleryErrorBoundary.tsx`

```typescript
'use client';

import { Component, ReactNode } from 'react';
import { Box, Typography, Button } from '@mui/joy';
import ErrorIcon from '@mui/icons-material/Error';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class GalleryErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Gallery error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <ErrorIcon sx={{ fontSize: 64, color: 'danger.500', mb: 2 }} />
          <Typography level="h3" sx={{ mb: 1 }}>
            Wystąpił błąd
          </Typography>
          <Typography level="body-md" sx={{ color: 'text.secondary', mb: 3 }}>
            Nie udało się załadować galerii
          </Typography>
          <Button onClick={() => window.location.reload()}>
            Odśwież stronę
          </Button>
        </Box>
      );
    }

    return this.props.children;
  }
}
```

**Wrap gallery components with this boundary.**

**Verification:**
- [ ] Errors caught gracefully
- [ ] User-friendly message
- [ ] Refresh option works

---

### Task 7.4: Performance Optimization

**Checklist:**

- [ ] Lazy load images below fold
- [ ] Implement virtual scrolling for large galleries (react-window)
- [ ] Add caching for API responses
- [ ] Compress images on upload (already done in Phase 1)
- [ ] Use CDN for S3 assets
- [ ] Add service worker for offline support
- [ ] Implement progressive image loading (blurhash)

---

### Task 7.5: SEO & Metadata

**File:** Update gallery pages with metadata

```typescript
// src/app/gallery/page.tsx
export const metadata = {
  title: 'Galeria - Radzyń Podlaski',
  description: 'Przeglądaj zdjęcia, albumy i materiały historyczne z Radzynia Podlaskiego',
  openGraph: {
    title: 'Galeria - Radzyń Podlaski',
    description: 'Zdjęcia i albumy z Radzynia Podlaskiego',
    images: ['/og-gallery.jpg'],
  },
};
```

**Add structured data for images:**

```typescript
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'ImageGallery',
  name: 'Galeria Radzyń Podlaski',
  description: 'Zdjęcia i materiały z Radzynia Podlaskiego',
  url: 'https://radzyn.city/gallery',
};
```

**Verification:**
- [ ] Meta tags correct
- [ ] Open Graph works
- [ ] Rich snippets validate

---

**Total estimated time: 40-60 hours**

---

## Testing Checklist

After each phase:
- [ ] All TypeScript errors resolved
- [ ] No console errors in browser
- [ ] Components render correctly
- [ ] Mobile responsive
- [ ] Dark mode works
- [ ] Performance acceptable (Lighthouse score >80)

---

## Deployment Checklist

Before production:
- [ ] Environment variables configured
- [ ] S3 bucket permissions correct
- [ ] Database migrations run
- [ ] HTTPS configured
- [ ] CDN configured (optional)
- [ ] Error monitoring setup (Sentry)
- [ ] Backup strategy in place

---

## Support & References

- [Next.js Documentation](https://nextjs.org/docs)
- [Sharp Documentation](https://sharp.pixelplumbing.com/)
- [AWS S3 SDK](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/s3/)
- [Material UI Joy](https://mui.com/joy-ui/getting-started/)
- [Yet Another React Lightbox](https://yet-another-react-lightbox.com/)
- [React Dropzone](https://react-dropzone.js.org/)

---

**Questions?** Refer to MEDIA_ARCHITECTURE.md for architecture details.


## Testing Checklist

After each phase:
- [ ] All TypeScript errors resolved
- [ ] No console errors in browser
- [ ] Components render correctly
- [ ] Mobile responsive
- [ ] Dark mode works
- [ ] Performance acceptable (Lighthouse score >80)

---

## Deployment Checklist

Before production:
- [ ] Environment variables configured
- [ ] S3 bucket permissions correct
- [ ] Database migrations run
- [ ] HTTPS configured
- [ ] CDN configured (optional)
- [ ] Error monitoring setup (Sentry)
- [ ] Backup strategy in place

---

## Support & References

- [Next.js Documentation](https://nextjs.org/docs)
- [Sharp Documentation](https://sharp.pixelplumbing.com/)
- [AWS S3 SDK](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/s3/)
- [Material UI Joy](https://mui.com/joy-ui/getting-started/)

---

**Questions?** Refer to MEDIA_ARCHITECTURE.md for architecture details.
