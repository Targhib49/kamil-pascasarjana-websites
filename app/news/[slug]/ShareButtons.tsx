'use client';

// ============================================
// SHARE BUTTONS - Client Component
// app/news/[slug]/ShareButtons.tsx
// ============================================

type ShareButtonsProps = {
  title: string;
};

export default function ShareButtons({ title }: ShareButtonsProps) {
  const shareOnFacebook = () => {
    const url = window.location.href;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
  };

  const shareOnTwitter = () => {
    const url = window.location.href;
    const text = title;
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
  };

  const shareOnWhatsApp = () => {
    const url = window.location.href;
    const text = title;
    window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
  };

  return (
    <div className="border-t border-b py-6 mb-8">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Share this article</h3>
      <div className="flex flex-wrap gap-3">
        <button 
          onClick={shareOnFacebook}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          📘 Facebook
        </button>
        <button 
          onClick={shareOnTwitter}
          className="px-6 py-3 bg-sky-500 text-white rounded-lg font-semibold hover:bg-sky-600 transition"
        >
          🐦 Twitter
        </button>
        <button 
          onClick={shareOnWhatsApp}
          className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
        >
          💬 WhatsApp
        </button>
        <button 
          onClick={copyLink}
          className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition"
        >
          🔗 Copy Link
        </button>
      </div>
    </div>
  );
}