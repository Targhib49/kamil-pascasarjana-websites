// ============================================
// NEWS CARD COMPONENT - WITH IMAGE SUPPORT
// Individual news article card with optional image
// ============================================

import Image from 'next/image';

type NewsCardProps = {
  category: string;
  date: string;
  title: string;
  excerpt: string;
  href: string;
  image?: string | null;
};

export default function NewsCard({ category, date, title, excerpt, href, image }: NewsCardProps) {
  return (
    <a
      href={href}
      className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 block"
    >
      {/* Featured Image */}
      <div className="bg-gradient-to-br from-gray-200 to-gray-300 h-56 flex items-center justify-center relative overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <>
            <div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-20 transition-opacity"></div>
            <p className="text-gray-500 font-semibold">Article Image</p>
          </>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-3">
          <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">
            {category}
          </span>
          <span className="text-sm text-gray-500">{date}</span>
        </div>
        <h3 className="font-bold text-xl text-gray-900 mb-3 group-hover:text-blue-600 transition">
          {title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
          {excerpt}
        </p>
        <span className="inline-flex items-center text-blue-600 font-bold text-sm group-hover:translate-x-2 transition-transform">
          Read More 
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </a>
  );
}