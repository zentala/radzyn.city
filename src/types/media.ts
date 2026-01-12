/**
 * Media System Types
 * Defines types for image/media management system with S3 storage
 */

/**
 * Media type categories
 */
export type MediaType =
  | 'photo'           // Regular photographs
  | 'album'           // Photo albums (collections)
  | 'scan'            // Scanned documents, maps, drawings
  | 'infographic'     // Infographics, data visualizations
  | 'artwork'         // Art, paintings
  | 'document'        // Graphic documents (posters, flyers)
  | 'historical'      // Historical materials (old photos, archives)
  | 'panorama'        // Panoramic photos
  | 'video-thumbnail' // Video thumbnails (future)
  | 'other';          // Other media types

/**
 * Media status
 */
export type MediaStatus = 'draft' | 'published' | 'archived';

/**
 * License types
 */
export type MediaLicense =
  | 'CC0'           // Public Domain
  | 'CC BY'         // Attribution
  | 'CC BY-SA'      // Attribution-ShareAlike
  | 'CC BY-ND'      // Attribution-NoDerivs
  | 'CC BY-NC'      // Attribution-NonCommercial
  | 'CC BY-NC-SA'   // Attribution-NonCommercial-ShareAlike
  | 'CC BY-NC-ND'   // Attribution-NonCommercial-NoDerivs
  | 'copyright'     // All rights reserved
  | 'public-domain' // Public domain
  | 'custom';       // Custom license

/**
 * Related content types
 */
export type RelatedContentType = 'place' | 'event' | 'news' | 'memory' | 'highlight';

/**
 * Location information for media
 */
export interface MediaLocation {
  name: string;
  coordinates?: [number, number]; // [latitude, longitude]
  address?: string;
}

/**
 * Related content reference
 */
export interface RelatedContent {
  type: RelatedContentType;
  id: string;
  title?: string; // Optional for display
}

/**
 * S3 Storage information
 */
export interface S3Storage {
  url: string;           // Full S3 URL
  thumbnailUrl?: string; // Thumbnail URL
  key: string;           // S3 object key
  bucket: string;        // S3 bucket name
}

/**
 * Image dimensions and technical details
 */
export interface MediaTechnical {
  width?: number;
  height?: number;
  fileSize?: number;    // bytes
  mimeType: string;     // image/jpeg, image/png, etc.
  format?: string;      // jpg, png, webp
  blurhash?: string;    // Blur hash for placeholders
  exif?: Record<string, any>; // EXIF data
}

/**
 * Media attribution
 */
export interface MediaAttribution {
  author?: string;
  authorUrl?: string;
  source?: string;
  sourceUrl?: string;
  license?: MediaLicense;
  licenseUrl?: string;
  uploadedBy?: string;
  uploadedAt: Date;
  capturedAt?: Date; // When photo was taken
}

/**
 * Base Media Item
 */
export interface MediaItem {
  id: string;
  type: MediaType;
  title: string;
  description?: string;

  // Storage
  storage: S3Storage;

  // Technical details
  technical: MediaTechnical;

  // Attribution
  attribution: MediaAttribution;

  // Categorization
  tags: string[];
  category?: string; // e.g., "zabytki", "natura", "wydarzenia"
  location?: MediaLocation;

  // Relations
  relatedTo?: RelatedContent[];

  // Status
  status: MediaStatus;
  featured?: boolean;
  featuredOrder?: number; // Order for featured items

  // SEO & Accessibility
  alt: string;
  caption?: string;

  // Metadata
  createdAt: Date;
  updatedAt: Date;
  views?: number;
  likes?: number;
}

/**
 * Album - Collection of media items
 */
export interface Album {
  id: string;
  type: 'album';
  title: string;
  description?: string;

  // Album specific
  items: string[];      // IDs of media items
  coverImageId?: string; // ID of cover image
  itemCount: number;

  // Same fields as MediaItem
  storage?: S3Storage;  // For cover image
  tags: string[];
  category?: string;
  location?: MediaLocation;
  relatedTo?: RelatedContent[];
  status: MediaStatus;
  featured?: boolean;

  // Metadata
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string;
}

/**
 * Gallery filter options
 */
export interface GalleryFilter {
  type?: MediaType | MediaType[];
  category?: string | string[];
  tags?: string[];
  status?: MediaStatus;
  featured?: boolean;
  relatedTo?: {
    type: RelatedContentType;
    id: string;
  };
  location?: string;
  dateFrom?: Date;
  dateTo?: Date;
  search?: string; // Search in title, description, tags
}

/**
 * Gallery sort options
 */
export type GallerySortBy =
  | 'newest'
  | 'oldest'
  | 'title'
  | 'popular'
  | 'featured'
  | 'random';

/**
 * Gallery pagination
 */
export interface GalleryPagination {
  page: number;
  limit: number;
  total?: number;
  totalPages?: number;
}

/**
 * Gallery query options
 */
export interface GalleryQuery {
  filter?: GalleryFilter;
  sort?: GallerySortBy;
  pagination?: GalleryPagination;
}

/**
 * Upload progress callback
 */
export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

/**
 * Media upload options
 */
export interface MediaUploadOptions {
  file: File;
  title?: string;
  description?: string;
  type?: MediaType;
  tags?: string[];
  category?: string;
  location?: MediaLocation;
  relatedTo?: RelatedContent[];
  onProgress?: (progress: UploadProgress) => void;
}

/**
 * Media update data
 */
export interface MediaUpdateData {
  title?: string;
  description?: string;
  tags?: string[];
  category?: string;
  location?: MediaLocation;
  relatedTo?: RelatedContent[];
  status?: MediaStatus;
  featured?: boolean;
  alt?: string;
  caption?: string;
}
