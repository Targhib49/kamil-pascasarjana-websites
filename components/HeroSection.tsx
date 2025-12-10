// ============================================
// HERO SECTION - WITH REAL EVENT DATA
// Server component that fetches events and passes to UpdatesWindow
// ============================================

import UpdatesWindow from './UpdatesWindows';
import { getUpcomingEvents } from '@/lib/supabase/queries';

export default async function HeroSection() {
  // Fetch upcoming events
  const events = await getUpcomingEvents(5);

  return (
    <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Main Title */}
          <div className="text-white space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Muslim Postgraduate Organization
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 leading-relaxed">
              Building bridges in academic excellence and fostering a vibrant community of scholars
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a 
                href="/about"
                className="px-8 py-4 bg-white text-blue-700 rounded-lg font-bold text-lg hover:bg-gray-50 transition shadow-lg text-center"
              >
                Learn More
              </a>
              <a 
                href="/news"
                className="px-8 py-4 border-2 border-white text-white rounded-lg font-bold text-lg hover:bg-white hover:text-blue-700 transition text-center"
              >
                Latest News
              </a>
            </div>
          </div>

          {/* Right: Rotating News/Events Window */}
          <UpdatesWindow events={events} />
        </div>
      </div>
    </section>
  );
}