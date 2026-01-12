const { createClient } = require('@supabase/supabase-js')
const { locations } = require('../src/utils/locationData')

// Use the same Supabase config as the guide app
const supabaseUrl = process.env.VITE_SUPABASE_URL || 'http://127.0.0.1:54321'
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || ''

const supabase = createClient(supabaseUrl, supabaseKey)

function transformLocationForSupabase(location) {
  return {
    id: location.id,
    name: location.name,
    description: location.description,
    coordinates: {
      type: 'Point',
      coordinates: [location.position[1], location.position[0]] // [lng, lat] for PostGIS
    },
    address: location.address,
    image_url: location.imageUrl,
    kind: location.category,
    // Add other fields as needed
  }
}

async function migrateLocations() {
  console.log('Starting location migration...')

  try {
    // Check if locations already exist
    const { data: existingLocations, error: checkError } = await supabase
      .from('locations')
      .select('id')
      .limit(1)

    if (checkError) {
      console.error('Error checking existing locations:', checkError)
      return
    }

    if (existingLocations && existingLocations.length > 0) {
      console.log('Locations already exist in database. Skipping migration.')
      return
    }

    // Transform locations for Supabase
    const supabaseLocations = locations.map(transformLocationForSupabase)

    console.log(`Migrating ${supabaseLocations.length} locations...`)

    // Insert locations in batches
    const batchSize = 10
    for (let i = 0; i < supabaseLocations.length; i += batchSize) {
      const batch = supabaseLocations.slice(i, i + batchSize)

      const { error } = await supabase
        .from('locations')
        .insert(batch)

      if (error) {
        console.error(`Error inserting batch ${i / batchSize + 1}:`, error)
        continue
      }

      console.log(`Inserted batch ${i / batchSize + 1}`)
    }

    console.log('Migration completed successfully!')

  } catch (error) {
    console.error('Migration failed:', error)
  }
}

// Run migration if this script is executed directly
if (require.main === module) {
  migrateLocations()
}

module.exports = { migrateLocations }const { locations } = require('../src/utils/locationData')

// Use the same Supabase config as the guide app
const supabaseUrl = process.env.VITE_SUPABASE_URL || 'http://127.0.0.1:54321'
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || ''

const supabase = createClient(supabaseUrl, supabaseKey)

function transformLocationForSupabase(location) {
  return {
    id: location.id,
    name: location.name,
    description: location.description,
    coordinates: {
      type: 'Point',
      coordinates: [location.position[1], location.position[0]] // [lng, lat] for PostGIS
    },
    address: location.address,
    image_url: location.imageUrl,
    kind: location.category,
    // Add other fields as needed
  }
}

async function migrateLocations() {
  console.log('Starting location migration...')

  try {
    // Check if locations already exist
    const { data: existingLocations, error: checkError } = await supabase
      .from('locations')
      .select('id')
      .limit(1)

    if (checkError) {
      console.error('Error checking existing locations:', checkError)
      return
    }

    if (existingLocations && existingLocations.length > 0) {
      console.log('Locations already exist in database. Skipping migration.')
      return
    }

    // Transform locations for Supabase
    const supabaseLocations = locations.map(transformLocationForSupabase)

    console.log(`Migrating ${supabaseLocations.length} locations...`)

    // Insert locations in batches
    const batchSize = 10
    for (let i = 0; i < supabaseLocations.length; i += batchSize) {
      const batch = supabaseLocations.slice(i, i + batchSize)

      const { error } = await supabase
        .from('locations')
        .insert(batch)

      if (error) {
        console.error(`Error inserting batch ${i / batchSize + 1}:`, error)
        continue
      }

      console.log(`Inserted batch ${i / batchSize + 1}`)
    }

    console.log('Migration completed successfully!')

  } catch (error) {
    console.error('Migration failed:', error)
  }
}

// Run migration if this script is executed directly
if (require.main === module) {
  migrateLocations()
}

module.exports = { migrateLocations }
