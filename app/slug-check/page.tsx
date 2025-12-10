'use client';

// ============================================
// SLUG CHECKER - Quick Debug Tool
// app/slug-check/page.tsx
// ============================================

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

type Post = {
  id: string;
  title_en: string;
  slug_en: string;
  slug_id: string;
  status: string;
};

export default function SlugCheckPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      const supabase = createClient();
      
      const { data, error } = await supabase
        .from('posts')
        .select('id, title_en, slug_en, slug_id, status')
        .order('created_at', { ascending: false });

      if (error) {
        setError(error.message);
      } else {
        setPosts(data || []);
      }
      
      setLoading(false);
    }

    fetchPosts();
  }, []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Slug copied to clipboard!');
  };


  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⏳</div>
          <p className="text-xl font-bold text-gray-900">Loading slugs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">🔍 Slug Checker</h1>
        <p className="text-gray-600 mb-8">Verify all your article slugs are correct</p>

        {error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg">
            <h2 className="font-bold text-lg mb-2">❌ Database Error</h2>
            <p>{error}</p>
          </div>
        ) : posts.length > 0 ? (
          <div className="space-y-4">
            {posts.map((post) => (
              <div 
                key={post.id} 
                className={`bg-white rounded-xl shadow-lg border-2 p-6 ${
                  post.status === 'published' ? 'border-green-300' : 'border-yellow-300'
                }`}
              >
                {/* Title and Status */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-900 mb-1">
                      {post.title_en}
                    </h2>
                    <span className={`inline-block px-3 py-1 text-xs font-bold rounded-full ${
                      post.status === 'published' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {post.status.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Slugs */}
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      English Slug:
                    </label>
                    <code className="block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-blue-600 font-mono text-sm">
                      {post.slug_en}
                    </code>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Indonesian Slug:
                    </label>
                    <code className="block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-blue-600 font-mono text-sm">
                      {post.slug_id}
                    </code>
                  </div>
                </div>

                {/* Test Links */}
                <div className="flex flex-wrap gap-3">
                  <a
                    href={`/news/${post.slug_en}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-6 py-3 rounded-lg font-semibold transition ${
                      post.status === 'published'
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-400 text-white cursor-not-allowed'
                    }`}
                  >
                    🔗 Test EN Link
                  </a>
                  <a
                    href={`/news/${post.slug_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-6 py-3 rounded-lg font-semibold transition ${
                      post.status === 'published'
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : 'bg-gray-400 text-white cursor-not-allowed'
                    }`}
                  >
                    🔗 Test ID Link
                  </a>
                  <button
                    onClick={() => copyToClipboard(`/news/${post.slug_en}`)}
                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition"
                  >
                    📋 Copy EN Slug
                  </button>
                </div>

                {/* Quick Info */}
                <div className="mt-4 text-sm text-gray-500">
                  ID: {post.id.slice(0, 8)}...
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-8 text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              No Posts Found
            </h2>
            <p className="text-gray-600 mb-6">
              Make sure you've inserted sample data into your database.
            </p>
            <a
              href="/test-db"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Check Database Connection
            </a>
          </div>
        )}

        {/* Info Box */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-bold text-blue-900 mb-3">
            ℹ️ How It Works
          </h3>
          <ul className="space-y-2 text-blue-800 text-sm">
            <li>
              <strong>✅ Published posts:</strong> Green border - clicking links should work
            </li>
            <li>
              <strong>⚠️ Draft posts:</strong> Yellow border - won't be accessible on /news/[slug]
            </li>
            <li>
              <strong>URL format:</strong> /news/your-slug-here
            </li>
            <li>
              <strong>Slugs should:</strong> Be lowercase, use hyphens (-), no spaces
            </li>
          </ul>
        </div>

        {/* Back Link */}
        <div className="mt-8 text-center">
          <a
            href="/"
            className="inline-block px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}