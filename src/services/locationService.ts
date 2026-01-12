import { supabase } from '@/lib/supabase'
import { LocationPoint } from '@/components/Map'

export interface SupabaseLocation {
  id: string
  name: string
  description: string | null
  coordinates: any // PostGIS geometry
  address: string | null
  image_url: string | null
  audio_url: string | null
  kind: string
}

// Transform Supabase location to our LocationPoint format
function transformLocation(supabaseLoc: SupabaseLocation): LocationPoint {
  // Extract lat/lng from PostGIS coordinates
  // Assuming coordinates is in format: {"type":"Point","coordinates":[lng, lat]}
  let position: [number, number] = [51.7833, 22.6167] // Default to city center

  if (supabaseLoc.coordinates && typeof supabaseLoc.coordinates === 'object') {
    const coords = supabaseLoc.coordinates as any
    if (coords.coordinates && Array.isArray(coords.coordinates)) {
      // PostGIS uses [lng, lat] format
      position = [coords.coordinates[1], coords.coordinates[0]]
    }
  }

  return {
    id: supabaseLoc.id,
    name: supabaseLoc.name,
    description: supabaseLoc.description || '',
    position,
    category: supabaseLoc.kind || 'Zabytki',
    imageUrl: supabaseLoc.image_url || undefined,
    address: supabaseLoc.address || undefined,
  }
}

export async function fetchLocations(): Promise<LocationPoint[]> {
  try {
    const { data, error } = await supabase
      .from('locations')
      .select('*')
      .order('name')

    if (error) {
      console.error('Error fetching locations:', error)
      throw error
    }

    return (data || []).map(transformLocation)
  } catch (error) {
    console.error('Failed to fetch locations from Supabase:', error)
    // Fallback to empty array
    return []
  }
}

export async function fetchLocationById(id: string): Promise<LocationPoint | null> {
  try {
    const { data, error } = await supabase
      .from('locations')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching location by ID:', error)
      return null
    }

    return data ? transformLocation(data) : null
  } catch (error) {
    console.error('Failed to fetch location by ID:', error)
    return null
  }
}import { LocationPoint } from '@/components/Map'

export interface SupabaseLocation {
  id: string
  name: string
  description: string | null
  coordinates: any // PostGIS geometry
  address: string | null
  image_url: string | null
  audio_url: string | null
  kind: string
}

// Transform Supabase location to our LocationPoint format
function transformLocation(supabaseLoc: SupabaseLocation): LocationPoint {
  // Extract lat/lng from PostGIS coordinates
  // Assuming coordinates is in format: {"type":"Point","coordinates":[lng, lat]}
  let position: [number, number] = [51.7833, 22.6167] // Default to city center

  if (supabaseLoc.coordinates && typeof supabaseLoc.coordinates === 'object') {
    const coords = supabaseLoc.coordinates as any
    if (coords.coordinates && Array.isArray(coords.coordinates)) {
      // PostGIS uses [lng, lat] format
      position = [coords.coordinates[1], coords.coordinates[0]]
    }
  }

  return {
    id: supabaseLoc.id,
    name: supabaseLoc.name,
    description: supabaseLoc.description || '',
    position,
    category: supabaseLoc.kind || 'Zabytki',
    imageUrl: supabaseLoc.image_url || undefined,
    address: supabaseLoc.address || undefined,
  }
}

export async function fetchLocations(): Promise<LocationPoint[]> {
  try {
    const { data, error } = await supabase
      .from('locations')
      .select('*')
      .order('name')

    if (error) {
      console.error('Error fetching locations:', error)
      throw error
    }

    return (data || []).map(transformLocation)
  } catch (error) {
    console.error('Failed to fetch locations from Supabase:', error)
    // Fallback to empty array
    return []
  }
}

export async function fetchLocationById(id: string): Promise<LocationPoint | null> {
  try {
    const { data, error } = await supabase
      .from('locations')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching location by ID:', error)
      return null
    }

    return data ? transformLocation(data) : null
  } catch (error) {
    console.error('Failed to fetch location by ID:', error)
    return null
  }
}
