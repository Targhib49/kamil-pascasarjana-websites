// ============================================
// INDIVIDUAL ARTICLE PAGE
// Full article view with rich content
// ============================================

import { notFound } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getPostBySlug, getLatestPosts, formatDate, incrementPostViews } from '@/lib/supabase/queries';
import ShareButtons from './ShareButtons';

type Props = {
  params: { slug: string };
};

// Generate metadata for SEO
export async function generateMetadata({ params }: Props) {
  const resolvedParams = await params; // Await params in Next.js 15
  console.log('🔍 Metadata generation - slug:', resolvedParams.slug);
  const post = await getPostBySlug(resolvedParams.slug, 'en');

  if (!post) {
    console.log('❌ Metadata - Post not found');
    return {
      title: 'Article Not Found',
    };
  }

  console.log('✅ Metadata - Post found:', post.title_en);
  return {
    title: `${post.title_en} | Muslim Postgraduate Organization`,
    description: post.excerpt_en,
    openGraph: {
      title: post.title_en,
      description: post.excerpt_en,
      images: post.featured_image ? [post.featured_image] : [],
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const resolvedParams = await params; // Await params in Next.js 15
  console.log('📄 ArticlePage rendering - slug:', resolvedParams.slug);
  
  const post = await getPostBySlug(resolvedParams.slug, 'en');

  if (!post) {
    console.log('❌ ArticlePage - Post not found, returning 404');
    notFound();
  }

  console.log('✅ ArticlePage - Rendering post:', post.title_en);

  // Increment view count (async, don't wait)
  incrementPostViews(post.id).catch(err => 
    console.error('⚠️ Failed to increment views:', err)
  );

  // Get related posts from same category
  const relatedPosts = await getLatestPosts(3, 'en');

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Article Hero */}
      <article className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Breadcrumb */}
          <nav className="mb-6 text-sm">
            <a href="/" className="text-blue-600 hover:underline">Home</a>
            <span className="mx-2 text-gray-400">/</span>
            <a href="/news" className="text-blue-600 hover:underline">News</a>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-600">{post.title_en}</span>
          </nav>

          {/* Category & Date */}
          <div className="flex items-center space-x-3 mb-4">
            <span className="px-4 py-1 bg-blue-100 text-blue-700 text-sm font-bold rounded-full">
              {post.category.toUpperCase()}
            </span>
            <span className="text-gray-500">
              {formatDate(post.published_at || post.created_at, 'en')}
            </span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-500">
              👁️ {post.views_count} views
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title_en}
          </h1>

          {/* Excerpt */}
          {post.excerpt_en && (
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              {post.excerpt_en}
            </p>
          )}

          {/* Featured Image */}
          {post.featured_image && (
            <div className="relative w-full h-96 rounded-2xl overflow-hidden mb-8 shadow-xl">
              <Image
                src={post.featured_image}
                alt={post.title_en}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              />
            </div>
          )}

          {/* Article Content */}
          <div 
            className="prose prose-lg max-w-none mb-12 [&_p]:text-gray-900 [&_h1]:text-gray-900 [&_h2]:text-gray-900 [&_h3]:text-gray-900 [&_h4]:text-gray-900 [&_li]:text-gray-900 [&_strong]:text-gray-900 [&_a]:text-blue-600 [&_a]:underline"
            dangerouslySetInnerHTML={{ __html: post.content_en }}
          />

          {/* Share Buttons - Now a Client Component */}
          <ShareButtons title={post.title_en} />

          {/* Author Info - Placeholder */}
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-2xl flex-shrink-0">
                A
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-1">Admin</h4>
                <p className="text-gray-600 text-sm">
                  Content manager at Muslim Postgraduate Organization
                </p>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 max-w-7xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.filter(p => p.id !== post.id).slice(0, 3).map((relatedPost) => (
                <a
                  key={relatedPost.id}
                  href={`/news/${relatedPost.slug_en}`}
                  className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition border border-gray-100"
                >
                  {relatedPost.featured_image && (
                    <div className="relative h-48">
                      <Image
                        src={relatedPost.featured_image}
                        alt={relatedPost.title_en}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <span className="text-xs font-bold text-blue-600 uppercase">
                      {relatedPost.category}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 mt-2 mb-2 group-hover:text-blue-600 transition line-clamp-2">
                      {relatedPost.title_en}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {relatedPost.excerpt_en}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}