// ============================================
// NEWS SECTION - CONNECTED TO DATABASE
// Displays latest 3 published posts from Supabase
// ============================================

import NewsCard from './NewsCard';
import { getLatestPosts, formatDate, getLocalizedContent } from '@/lib/supabase/queries';

export default async function NewsSection() {
  // Fetch latest 3 published posts
  const posts = await getLatestPosts(3, 'en');

  // Fallback data if no posts found
  const fallbackArticles = [
    {
      id: '1',
      category: "RESEARCH",
      date: "Dec 10, 2025",
      title: "No articles yet",
      excerpt: "Check back soon for the latest news and updates from our community.",
      href: "#",
    },
  ];

  // Transform database posts to component format
  const articles = posts.length > 0 
    ? posts.map(post => ({
        id: post.id,
        category: post.category.toUpperCase(),
        date: formatDate(post.published_at || post.created_at, 'en'),
        title: post.title_en,
        excerpt: post.excerpt_en,
        href: `/news/${post.slug_en}`,
        image: post.featured_image
      }))
    : fallbackArticles;

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-2">Latest News & Articles</h2>
            <p className="text-lg text-gray-600">Stay informed with our latest updates</p>
          </div>
          <a 
            href="/news" 
            className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-900 rounded-lg font-bold hover:border-blue-600 hover:text-blue-600 transition"
          >
            View All →
          </a>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {articles.map((article) => (
            <NewsCard key={article.id} {...article} />
          ))}
        </div>
      </div>
    </section>
  );
}