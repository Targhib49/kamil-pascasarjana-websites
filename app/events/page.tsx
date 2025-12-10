// ============================================
// EVENTS CALENDAR PAGE
// Shows all upcoming events with calendar view
// ============================================

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getUpcomingEvents } from '@/lib/supabase/queries';

export const metadata = {
  title: 'Events & Calendar | Muslim Postgraduate Organization',
  description: 'Stay updated with our upcoming events, workshops, seminars, and important dates.',
};

export default async function EventsPage() {
  // Fetch upcoming events
  const events = await getUpcomingEvents(50);

  // Group events by category
  const eventsByCategory = {
    academic: events.filter(e => e.category === 'academic'),
    islamic: events.filter(e => e.category === 'islamic'),
    event: events.filter(e => e.category === 'event'),
    conference: events.filter(e => e.category === 'conference'),
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 to-pink-600 py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="max-w-4xl mx-auto text-center text-white">
            <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-bold mb-4">
              EVENTS & CALENDAR
            </span>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Upcoming Events
            </h1>
            <p className="text-xl text-purple-100">
              Join us for workshops, seminars, and community gatherings
            </p>
          </div>
        </div>
      </section>

      {/* Category Legend */}
      <section className="py-8 bg-gray-50 border-b">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-wrap gap-4 justify-center">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded bg-blue-600"></div>
              <span className="text-sm font-semibold">Academic ({eventsByCategory.academic.length})</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded bg-green-600"></div>
              <span className="text-sm font-semibold">Islamic ({eventsByCategory.islamic.length})</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded bg-purple-600"></div>
              <span className="text-sm font-semibold">Community ({eventsByCategory.event.length})</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded bg-amber-600"></div>
              <span className="text-sm font-semibold">Conference ({eventsByCategory.conference.length})</span>
            </div>
          </div>
        </div>
      </section>

      {/* Events List */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          {events.length > 0 ? (
            <div className="space-y-6">
              {events.map((event) => {
                const startDate = new Date(event.start_date);
                const categoryColors = {
                  academic: 'bg-blue-600',
                  islamic: 'bg-green-600',
                  event: 'bg-purple-600',
                  conference: 'bg-amber-600',
                };
                const color = categoryColors[event.category] || 'bg-gray-600';

                return (
                  <div
                    key={event.id}
                    className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition"
                  >
                    <div className="flex flex-col md:flex-row">
                      {/* Date Badge */}
                      <div className={`${color} p-8 md:w-32 flex-shrink-0 flex flex-col items-center justify-center text-white`}>
                        <div className="text-4xl font-bold">
                          {startDate.getDate()}
                        </div>
                        <div className="text-sm font-semibold">
                          {startDate.toLocaleDateString('en-US', { month: 'short' })}
                        </div>
                      </div>

                      {/* Event Details */}
                      <div className="flex-1 p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-bold rounded-full uppercase">
                                {event.category}
                              </span>
                              {event.type && (
                                <span className="text-sm text-gray-500">
                                  {event.type}
                                </span>
                              )}
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">
                              {event.title_en}
                            </h3>
                            {event.description_en && (
                              <p className="text-gray-600 mb-4">
                                {event.description_en}
                              </p>
                            )}
                            <div className="space-y-2 text-gray-600">
                              {/* Time */}
                              <div className="flex items-center space-x-2">
                                <span>🕐</span>
                                <span>
                                  {startDate.toLocaleTimeString('en-US', { 
                                    hour: 'numeric', 
                                    minute: '2-digit',
                                    hour12: true 
                                  })}
                                  {event.end_date && (
                                    <> - {new Date(event.end_date).toLocaleTimeString('en-US', { 
                                      hour: 'numeric', 
                                      minute: '2-digit',
                                      hour12: true 
                                    })}</>
                                  )}
                                </span>
                              </div>
                              {/* Location */}
                              {event.location && (
                                <div className="flex items-center space-x-2">
                                  <span>📍</span>
                                  <span>{event.location}</span>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Register Button */}
                          {event.registration_link && (
                            <a
                              href={event.registration_link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition whitespace-nowrap"
                            >
                              Register
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-6">📅</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                No upcoming events
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Check back soon for exciting events and activities!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Past Events Section - Placeholder */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">Past Events</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="text-sm text-gray-500 mb-2">Nov {20 + i}, 2025</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Past Event Title {i}
                </h3>
                <div className="flex items-center text-gray-600 text-sm">
                  <span>👥</span>
                  <span className="ml-2">{30 + i * 10}+ attendees</span>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <button className="px-8 py-3 border-2 border-gray-300 text-gray-900 rounded-lg font-bold hover:border-blue-600 hover:text-blue-600 transition">
              View All Past Events
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}