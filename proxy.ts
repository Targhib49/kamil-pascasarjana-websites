// ============================================
// NEXT.JS 16 PROXY - FIXED VERSION
// No more redirect loops!
// ============================================

import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // ============================================
  // ADMIN ROUTE PROTECTION (FIXED!)
  // ============================================
  
  const pathname = request.nextUrl.pathname
  
  // 1. ALLOW /admin/login for everyone (no redirect!)
  if (pathname === '/admin/login') {
    // Only redirect logged-in admins away from login page
    if (user) {
      try {
        const { data: profile } = await supabase
          .from('user_profiles')
          .select('role')
          .eq('id', user.id)
          .single()

        const adminRoles = ['super_admin', 'content_admin', 'shop_admin', 'discussion_admin']
        
        if (profile && adminRoles.includes(profile.role)) {
          // Already logged in as admin, go to dashboard
          const url = request.nextUrl.clone()
          url.pathname = '/admin'
          return NextResponse.redirect(url)
        }
      } catch (error) {
        console.error('Error checking user role:', error)
      }
    }
    // Not logged in or not admin - allow access to login page
    return supabaseResponse
  }

  // 2. PROTECT /admin/* routes (except /admin/login which we handled above)
  if (pathname.startsWith('/admin')) {
    // Not logged in - redirect to login
    if (!user) {
      const url = request.nextUrl.clone()
      url.pathname = '/admin/login'
      url.searchParams.set('redirectTo', pathname)
      return NextResponse.redirect(url)
    }

    // Logged in - check if admin
    try {
      const { data: profile } = await supabase
        .from('user_profiles')
        .select('role')
        .eq('id', user.id)
        .single()

      const adminRoles = ['super_admin', 'content_admin', 'shop_admin', 'discussion_admin']
      
      if (!profile || !adminRoles.includes(profile.role)) {
        // Not an admin - redirect to unauthorized
        const url = request.nextUrl.clone()
        url.pathname = '/unauthorized'
        return NextResponse.redirect(url)
      }
    } catch (error) {
      console.error('Error checking admin access:', error)
      // On error, redirect to unauthorized
      const url = request.nextUrl.clone()
      url.pathname = '/unauthorized'
      return NextResponse.redirect(url)
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}