// ============================================
// PUBLICATIONS ARCHIVE PAGE
// Magazine archive with PDF viewer
// ============================================

import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getLatestPublications } from '@/lib/supabase/queries';

export const metadata = {
  title: 'Publications | Muslim Postgraduate Organization',
  description: 'Browse our quarterly magazine archive and research publications.',
};

export default async function PublicationsPage() {
  // Fetch all publications
  const publications = await getLatestPublications(50);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-600 to-purple-600 py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="max-w-4xl mx-auto text-center text-white">
            <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-bold mb-4">
              PUBLICATIONS
            </span>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Magazine Archive
            </h1>
            <p className="text-xl text-indigo-100">
              Explore our quarterly publications featuring research, stories, and insights
            </p>
          </div>
        </div>
      </section>

      {/* Publications Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          {publications.length > 0 ? (
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
              {publications.map((pub) => {
                const pubDate = new Date(pub.publish_date);
                
                return (
                  <div
                    key={pub.id}
                    className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition border border-gray-100"
                  >
                    {/* Cover Image */}
                    <div className="relative h-80 bg-gray-200">
                      {pub.cover_image ? (
                        <Image
                          src={pub.cover_image}
                          alt={pub.title_en}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <span className="text-gray-400 text-4xl">📚</span>
                        </div>
                      )}
                      
                      {/* Volume/Issue Badge */}
                      <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-lg">
                        <span className="text-xs font-bold text-gray-900">
                          Vol {pub.volume_number}, No {pub.issue_number}
                        </span>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="p-6">
                      <div className="text-sm text-gray-500 mb-2">
                        {pubDate.toLocaleDateString('en-US', { 
                          month: 'long', 
                          year: 'numeric' 
                        })}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition">
                        {pub.title_en}
                      </h3>
                      {pub.description_en && (
                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                          {pub.description_en}
                        </p>
                      )}

                      {/* Stats */}
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                        <span>📥 {pub.download_count} downloads</span>
                        {pub.file_size && (
                          <span>{(pub.file_size / 1024 / 1024).toFixed(1)} MB</span>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-2">
                        <a
                          href={pub.pdf_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 px-4 py-2 bg-blue-600 text-white text-center rounded-lg font-semibold hover:bg-blue-700 transition text-sm"
                        >
                          View PDF
                        </a>
                        <a
                          href={pub.pdf_url}
                          download
                          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition"
                          title="Download"
                        >
                          ⬇️
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-6">📚</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                No publications yet
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Check back soon for our quarterly magazine releases!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Want to Contribute?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            We welcome submissions from our community members. Share your research, stories, and insights.
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-4 bg-white text-blue-700 rounded-xl font-bold text-lg hover:bg-gray-50 transition shadow-lg"
          >
            Submit Your Article
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}