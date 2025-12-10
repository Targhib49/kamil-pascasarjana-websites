// ============================================
// DATABASE QUERY FUNCTIONS
// Reusable functions for fetching data from Supabase
// ============================================

import { createClient } from './server'

// ============================================
// POSTS QUERIES
// ============================================

export type Post = {
  id: string
  title_en: string
  title_id: string
  slug_en: string
  slug_id: string
  content_en: string
  content_id: string
  excerpt_en: string
  excerpt_id: string
  featured_image: string | null
  category: string
  status: 'draft' | 'published'
  author_id: string | null
  published_at: string | null
  is_featured: boolean
  views_count: number
  created_at: string
  updated_at: string
}

/**
 * Get latest published posts
 * @param limit - Number of posts to return (default: 10)
 * @param locale - Language locale ('en' or 'id')
 */
export async function getLatestPosts(limit: number = 10, locale: 'en' | 'id' = 'en') {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching posts:', error)
    return []
  }

  return data as Post[]
}

/**
 * Get featured posts
 * @param limit - Number of posts to return (default: 3)
 */
export async function getFeaturedPosts(limit: number = 3) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('status', 'published')
    .eq('is_featured', true)
    .order('published_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching featured posts:', error)
    return []
  }

  return data as Post[]
}

/**
 * Get posts by category
 * @param category - Category name
 * @param limit - Number of posts to return
 */
export async function getPostsByCategory(category: string, limit: number = 10) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('status', 'published')
    .eq('category', category)
    .order('published_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching posts by category:', error)
    return []
  }

  return data as Post[]
}

/**
 * Get single post by slug
 * @param slug - Post slug (language-specific)
 * @param locale - Language locale ('en' or 'id')
 */
export async function getPostBySlug(slug: string, locale: 'en' | 'id' = 'en') {
  const supabase = await createClient()
  const slugColumn = locale === 'en' ? 'slug_en' : 'slug_id'
  
  console.log(`🔍 Searching for post with ${slugColumn}:`, slug)
  
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq(slugColumn, slug)
    .eq('status', 'published')
    .maybeSingle() // Use maybeSingle() instead of single() - doesn't error on no results

  if (error) {
    console.error('❌ Error fetching post by slug:', error)
    return null
  }

  if (!data) {
    console.log('❌ No post found with slug:', slug)
    return null
  }

  console.log('✅ Found post:', data.title_en)
  return data as Post
}

/**
 * Increment post view count
 * @param postId - Post ID
 */
export async function incrementPostViews(postId: string) {
  const supabase = await createClient()
  
  const { error } = await supabase.rpc('increment_post_views', {
    post_id: postId
  })

  if (error) {
    console.error('Error incrementing post views:', error)
  }
}

// ============================================
// EVENTS QUERIES
// ============================================

export type Event = {
  id: string
  title_en: string
  title_id: string
  description_en: string | null
  description_id: string | null
  start_date: string
  end_date: string | null
  category: 'academic' | 'islamic' | 'event' | 'conference'
  type: string | null
  location: string | null
  registration_link: string | null
  is_recurring: boolean
  recurrence_rule: string | null
  color: string
  created_at: string
  updated_at: string
}

/**
 * Get upcoming events
 * @param limit - Number of events to return
 */
export async function getUpcomingEvents(limit: number = 5) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .gte('start_date', new Date().toISOString())
    .order('start_date', { ascending: true })
    .limit(limit)

  if (error) {
    console.error('Error fetching upcoming events:', error)
    return []
  }

  return data as Event[]
}

/**
 * Get events by date range
 * @param startDate - Start date
 * @param endDate - End date
 */
export async function getEventsByDateRange(startDate: string, endDate: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .gte('start_date', startDate)
    .lte('start_date', endDate)
    .order('start_date', { ascending: true })

  if (error) {
    console.error('Error fetching events by date range:', error)
    return []
  }

  return data as Event[]
}

/**
 * Get events by category
 * @param category - Event category
 * @param limit - Number of events to return
 */
export async function getEventsByCategory(category: string, limit: number = 10) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('category', category)
    .gte('start_date', new Date().toISOString())
    .order('start_date', { ascending: true })
    .limit(limit)

  if (error) {
    console.error('Error fetching events by category:', error)
    return []
  }

  return data as Event[]
}

// ============================================
// PUBLICATIONS QUERIES
// ============================================

export type Publication = {
  id: string
  title_en: string
  title_id: string
  description_en: string | null
  description_id: string | null
  volume_number: number | null
  issue_number: number | null
  publish_date: string
  cover_image: string
  pdf_url: string
  file_size: number | null
  download_count: number
  created_at: string
  updated_at: string
}

/**
 * Get latest publications
 * @param limit - Number of publications to return
 */
export async function getLatestPublications(limit: number = 10) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('publications')
    .select('*')
    .order('publish_date', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching publications:', error)
    return []
  }

  return data as Publication[]
}

/**
 * Increment publication download count
 * @param publicationId - Publication ID
 */
export async function incrementPublicationDownloads(publicationId: string) {
  const supabase = await createClient()
  
  const { error } = await supabase.rpc('increment_publication_downloads', {
    publication_id: publicationId
  })

  if (error) {
    console.error('Error incrementing publication downloads:', error)
  }
}

// ============================================
// CAMPUS LOCATIONS QUERIES
// ============================================

export type CampusLocation = {
  id: string
  name_en: string
  name_id: string
  description_en: string | null
  description_id: string | null
  category: 'academic' | 'prayer_room' | 'library' | 'cafeteria' | 'admin' | 'other'
  latitude: number
  longitude: number
  image_url: string | null
  opening_hours: string | null
  contact_info: string | null
  created_at: string
  updated_at: string
}

/**
 * Get all campus locations
 */
export async function getCampusLocations() {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('campus_locations')
    .select('*')
    .order('name_en', { ascending: true })

  if (error) {
    console.error('Error fetching campus locations:', error)
    return []
  }

  return data as CampusLocation[]
}

/**
 * Get campus locations by category
 * @param category - Location category
 */
export async function getLocationsByCategory(category: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('campus_locations')
    .select('*')
    .eq('category', category)
    .order('name_en', { ascending: true })

  if (error) {
    console.error('Error fetching locations by category:', error)
    return []
  }

  return data as CampusLocation[]
}

// ============================================
// GAME SCORES QUERIES
// ============================================

export type GameScore = {
  id: string
  game_name: string
  player_name: string
  score: number
  difficulty: string | null
  played_at: string
}

/**
 * Get top scores for a game
 * @param gameName - Name of the game
 * @param limit - Number of scores to return
 */
export async function getTopScores(gameName: string, limit: number = 10) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('game_scores')
    .select('*')
    .eq('game_name', gameName)
    .order('score', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching top scores:', error)
    return []
  }

  return data as GameScore[]
}

/**
 * Insert a new game score
 * @param gameName - Name of the game
 * @param playerName - Player name
 * @param score - Score achieved
 * @param difficulty - Difficulty level
 */
export async function insertGameScore(
  gameName: string,
  playerName: string,
  score: number,
  difficulty?: string
) {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from('game_scores')
    .insert({
      game_name: gameName,
      player_name: playerName,
      score,
      difficulty
    })

  if (error) {
    console.error('Error inserting game score:', error)
    return false
  }

  return true
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Format date for display
 * @param dateString - ISO date string
 * @param locale - Language locale
 */
export function formatDate(dateString: string, locale: 'en' | 'id' = 'en'): string {
  const date = new Date(dateString)
  
  if (locale === 'id') {
    return new Intl.DateTimeFormat('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date)
  }
  
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date)
}

/**
 * Get localized content
 * @param item - Object with _en and _id properties
 * @param field - Field name (without locale suffix)
 * @param locale - Language locale
 */
export function getLocalizedContent<T>(
  item: T,
  field: string,
  locale: 'en' | 'id' = 'en'
): string {
  const key = `${field}_${locale}` as keyof T
  return (item[key] as string) || ''
}