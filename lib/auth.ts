// ============================================
// AUTHENTICATION UTILITIES
// Compatible with @supabase/ssr v0.8.0
// Uses your existing lib/supabase/server.ts
// ============================================

import { createClient } from './supabase/server'
import { redirect } from 'next/navigation'

export type UserRole = 'super_admin' | 'content_admin' | 'shop_admin' | 'discussion_admin' | 'member' | 'guest'

export interface UserProfile {
  id: string
  email: string
  full_name: string
  role: UserRole
  avatar_url: string | null
  created_at: string
  updated_at: string
}

/**
 * Get the currently authenticated user
 * Returns null if not authenticated
 */
export async function getUser() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error || !user) {
    return null
  }
  
  return user
}

/**
 * Get the user's profile including role
 * Returns null if not found
 */
export async function getUserProfile(): Promise<UserProfile | null> {
  const user = await getUser()
  if (!user) return null

  const supabase = await createClient()
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (error || !data) {
    return null
  }

  return data as UserProfile
}

/**
 * Check if user has required role(s)
 */
export async function hasRole(allowedRoles: UserRole | UserRole[]): Promise<boolean> {
  const profile = await getUserProfile()
  if (!profile) return false

  const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles]
  return roles.includes(profile.role)
}

/**
 * Check if user is admin (any admin role)
 */
export async function isAdmin(): Promise<boolean> {
  return hasRole(['super_admin', 'content_admin', 'shop_admin', 'discussion_admin'])
}

/**
 * Require authentication - redirects to login if not authenticated
 * For general users
 */
export async function requireAuth(redirectPath: string = '/login') {
  const user = await getUser()
  if (!user) {
    redirect(redirectPath)
  }
  return user
}

/**
 * Require admin authentication - redirects to admin login if not authenticated
 * For admin users only
 */
export async function requireAdminAuth() {
  const user = await getUser()
  if (!user) {
    redirect('/admin/login')
  }

  const profile = await getUserProfile()
  const adminRoles: UserRole[] = ['super_admin', 'content_admin', 'shop_admin', 'discussion_admin']
  
  if (!profile || !adminRoles.includes(profile.role)) {
    redirect('/unauthorized')
  }

  return profile
}

/**
 * Require specific role(s) - redirects if unauthorized
 */
export async function requireRole(allowedRoles: UserRole | UserRole[]) {
  await requireAuth()
  
  const authorized = await hasRole(allowedRoles)
  if (!authorized) {
    redirect('/unauthorized')
  }

  return await getUserProfile()
}