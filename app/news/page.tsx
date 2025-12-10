// ============================================
// NEWS LISTING PAGE
// Shows all published posts with filtering
// ============================================

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NewsCard from '@/components/NewsCard';
import { getLatestPosts, formatDate } from '@/lib/supabase/queries';

export const metadata = {
  title: 'News & Articles | Muslim Postgraduate Organization',
  description: 'Stay informed with our latest news, research updates, and community stories.',
};

export default async function NewsPage() {
  // Fetch all published posts
  const posts = await getLatestPosts(50, 'en');

  // Get unique categories
  const categories = ['All', ...new Set(posts.map(post => post.category))];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="max-w-4xl mx-auto text-center text-white">
            <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-bold mb-4">
              NEWS & ARTICLES
            </span>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Latest Updates
            </h1>
            <p className="text-xl text-blue-100">
              Stay informed with news, research, and stories from our community
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter - Static for now, can be made interactive with Client Component */}
      <section className="py-8 bg-gray-50 border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-6 py-2 rounded-full font-semibold transition ${
                  index === 0
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-blue-600'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          {posts.length > 0 ? (
            <>
              <div className="grid md:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <NewsCard
                    key={post.id}
                    category={post.category.toUpperCase()}
                    date={formatDate(post.published_at || post.created_at, 'en')}
                    title={post.title_en}
                    excerpt={post.excerpt_en}
                    href={`/news/${post.slug_en}`}
                    image={post.featured_image}
                  />
                ))}
              </div>

              {/* Pagination - Placeholder for future */}
              {posts.length >= 50 && (
                <div className="mt-12 text-center">
                  <div className="inline-flex space-x-2">
                    <button className="px-4 py-2 bg-white border-2 border-gray-300 rounded-lg font-semibold hover:border-blue-600 transition">
                      Previous
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold">
                      1
                    </button>
                    <button className="px-4 py-2 bg-white border-2 border-gray-300 rounded-lg font-semibold hover:border-blue-600 transition">
                      2
                    </button>
                    <button className="px-4 py-2 bg-white border-2 border-gray-300 rounded-lg font-semibold hover:border-blue-600 transition">
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-6">📰</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                No articles yet
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Check back soon for the latest news and updates!
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}