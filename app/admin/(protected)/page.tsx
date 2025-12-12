import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function AdminDashboard() {
  const supabase = await createClient()

  // Fetch statistics
  const [postsResult, eventsResult, publicationsResult] = await Promise.all([
    supabase.from('posts').select('id, status', { count: 'exact', head: false }),
    supabase.from('events').select('id', { count: 'exact', head: false }),
    supabase.from('publications').select('id', { count: 'exact', head: false }),
  ])

  const totalPosts = postsResult.data?.length || 0
  const draftPosts = postsResult.data?.filter(p => p.status === 'draft').length || 0
  const totalEvents = eventsResult.data?.length || 0
  const totalPublications = publicationsResult.data?.length || 0

  // Fetch recent posts
  const { data: recentPosts } = await supabase
    .from('posts')
    .select('id, title_en, created_at, status')
    .order('created_at', { ascending: false })
    .limit(5)

  // Fetch upcoming events
  const { data: upcomingEvents } = await supabase
    .from('events')
    .select('id, title_en, event_date')
    .gte('event_date', new Date().toISOString())
    .order('event_date', { ascending: true })
    .limit(5)

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-purple-100">Manage your content, events, and publications</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Posts */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
          <p className="text-gray-600 text-sm font-medium">Total Posts</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{totalPosts}</p>
        </div>

        {/* Draft Posts */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
          </div>
          <p className="text-gray-600 text-sm font-medium">Drafts</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{draftPosts}</p>
        </div>

        {/* Total Events */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <p className="text-gray-600 text-sm font-medium">Events</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{totalEvents}</p>
        </div>

        {/* Total Publications */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
          </div>
          <p className="text-gray-600 text-sm font-medium">Publications</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{totalPublications}</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/admin/posts/new"
            className="flex items-center space-x-3 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg hover:from-blue-100 hover:to-purple-100 transition border border-blue-200"
          >
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <div>
              <p className="font-semibold text-gray-900">Create Post</p>
              <p className="text-sm text-gray-600">Write new article</p>
            </div>
          </Link>

          <Link
            href="/admin/events/new"
            className="flex items-center space-x-3 p-4 bg-gradient-to-r from-green-50 to-teal-50 rounded-lg hover:from-green-100 hover:to-teal-100 transition border border-green-200"
          >
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <div>
              <p className="font-semibold text-gray-900">Add Event</p>
              <p className="text-sm text-gray-600">Schedule new event</p>
            </div>
          </Link>

          <Link
            href="/admin/publications/new"
            className="flex items-center space-x-3 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg hover:from-purple-100 hover:to-pink-100 transition border border-purple-200"
          >
            <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <div>
              <p className="font-semibold text-gray-900">Upload Publication</p>
              <p className="text-sm text-gray-600">Add magazine issue</p>
            </div>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Posts */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Recent Posts</h2>
            <Link href="/admin/posts" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View all →
            </Link>
          </div>
          
          <div className="space-y-3">
            {recentPosts && recentPosts.length > 0 ? (
              recentPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/admin/posts/${post.id}`}
                  className="block p-3 hover:bg-gray-50 rounded-lg transition"
                >
                  <p className="font-medium text-gray-900 line-clamp-1">{post.title_en}</p>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xs text-gray-600">
                      {new Date(post.created_at).toLocaleDateString()}
                    </p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      post.status === 'published' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {post.status}
                    </span>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-gray-500 text-sm text-center py-8">No posts yet</p>
            )}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Upcoming Events</h2>
            <Link href="/admin/events" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View all →
            </Link>
          </div>
          
          <div className="space-y-3">
            {upcomingEvents && upcomingEvents.length > 0 ? (
              upcomingEvents.map((event) => (
                <Link
                  key={event.id}
                  href={`/admin/events/${event.id}`}
                  className="block p-3 hover:bg-gray-50 rounded-lg transition"
                >
                  <p className="font-medium text-gray-900 line-clamp-1">{event.title_en}</p>
                  <p className="text-xs text-gray-600 mt-1">
                    {new Date(event.event_date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                </Link>
              ))
            ) : (
              <p className="text-gray-500 text-sm text-center py-8">No upcoming events</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}