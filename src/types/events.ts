/**
 * Canonical Events domain model for `radzyn.city`.
 *
 * Source of truth is `guide` (Supabase) exposed via the Edge Function `api-v1`.
 * This file intentionally mirrors the public API DTO shape.
 */

export type EventStatus = 'draft' | 'published' | 'cancelled';

export type EventCategory = {
  id: string;
  name: string;
};

/**
 * Linked location from Supabase `public.locations`.
 *
 * Coordinates are always `[lng, lat]` (GeoJSON order).
 */
export type EventLocation = {
  id: string; // UUID
  name: string;
  address?: string | null;
  coordinates?: [number, number] | null;
};

export type EventOrganizer = {
  name: string;
  phone?: string | null;
  email?: string | null;
  website?: string | null;
};

export type EventItem = {
  id: string; // UUID
  slug: string;
  title: string;
  description: string;
  startAt: string; // ISO-8601 timestamp
  endAt?: string | null; // ISO-8601 timestamp
  status: EventStatus;
  category?: EventCategory | null;
  location?: EventLocation | null;
  organizer?: EventOrganizer | null;
  featuredImageUrl?: string | null;
  isFeatured?: boolean | null;
  isFree?: boolean | null;
  ticketUrl?: string | null;
};

