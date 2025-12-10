// ============================================
// DATABASE CONNECTION TEST PAGE
// app/test-db/page.tsx
// ============================================

import { createClient } from '@/lib/supabase/server'

export default async function TestDBPage() {
  // createClient is now async in Next.js 15
  const supabase = await createClient()
  
  // Test query
  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .limit(5)

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          🔌 Database Connection Test
        </h1>
        
        {error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg mb-6">
            <h2 className="font-bold text-lg mb-2">❌ Connection Error</h2>
            <p className="mb-2">{error.message}</p>
            <details className="mt-4">
              <summary className="cursor-pointer font-semibold">Debug Info</summary>
              <pre className="mt-2 text-xs bg-red-50 p-3 rounded overflow-auto">
                {JSON.stringify(error, null, 2)}
              </pre>
            </details>
          </div>
        ) : (
          <>
            <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-lg mb-6">
              <h2 className="font-bold text-lg mb-2">✅ Connection Successful!</h2>
              <p>Found {posts?.length || 0} posts in database</p>
            </div>

            {posts && posts.length > 0 ? (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  📄 Sample Posts
                </h2>
                <div className="space-y-4">
                  {posts.map((post) => (
                    <div 
                      key={post.id} 
                      className="border-l-4 border-blue-500 pl-4 py-2"
                    >
                      <h3 className="font-semibold text-gray-900">
                        {post.title_en || post.title_id || 'Untitled'}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Status: <span className="font-medium">{post.status}</span>
                      </p>
                      <p className="text-xs text-gray-500">
                        ID: {post.id}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-blue-50 border border-blue-200 text-blue-700 px-6 py-4 rounded-lg">
                <p className="font-semibold">ℹ️ No posts found</p>
                <p className="text-sm mt-2">
                  This is normal for a fresh database. The connection is working!
                </p>
              </div>
            )}

            <div className="mt-6 bg-gray-100 rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-3">📊 Raw Response</h3>
              <pre className="text-xs bg-white p-4 rounded overflow-auto max-h-96">
                {JSON.stringify(posts, null, 2)}
              </pre>
            </div>
          </>
        )}

        <div className="mt-8 p-6 bg-purple-50 border border-purple-200 rounded-lg">
          <h3 className="font-bold text-purple-900 mb-3">🎯 Next Steps</h3>
          <ol className="list-decimal list-inside space-y-2 text-purple-800">
            <li>Connection successful? ✅ Proceed to create admin dashboard</li>
            <li>Need sample data? Insert test posts via SQL Editor</li>
            <li>Ready to build? Start with the homepage integration</li>
          </ol>
        </div>
      </div>
    </div>
  )
}