'use client';

// ============================================
// UPDATES WINDOW - WITH REAL EVENT DATA
// Rotating carousel of upcoming events
// Client component for interactivity
// ============================================

import { useState, useEffect } from 'react';

type Update = {
  type: 'event' | 'news' | 'announcement';
  badge: string;
  badgeColor: string;
  title: string;
  description: string;
  date?: string;
  location?: string;
};

type UpdatesWindowProps = {
  events?: Array<{
    id: string;
    title_en: string;
    description_en: string | null;
    start_date: string;
    location: string | null;
    category: string;
  }>;
};

export default function UpdatesWindow({ events = [] }: UpdatesWindowProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Transform events to updates format
  const updates: Update[] = events.length > 0
    ? events.map(event => ({
        type: 'event' as const,
        badge: getCategoryBadge(event.category),
        badgeColor: getCategoryColor(event.category),
        title: event.title_en,
        description: event.description_en || 'Join us for this upcoming event!',
        date: formatEventDate(event.start_date),
        location: event.location || undefined,
      }))
    : [
        {
          type: 'event',
          badge: 'UPCOMING EVENT',
          badgeColor: 'bg-amber-500',
          title: 'No upcoming events',
          description: 'Check back soon for exciting events and activities!',
        },
      ];

  // Auto-rotate through updates
  useEffect(() => {
    if (updates.length <= 1) return;

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % updates.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [updates.length]);

  const currentUpdate = updates[activeIndex];

  // Quick news items (static for now, can be made dynamic)
  const quickUpdates = [
    {
      icon: '📰',
      color: 'bg-blue-100',
      title: 'Latest Articles',
      subtitle: 'Read our newest publications',
    },
    {
      icon: '🎓',
      color: 'bg-green-100',
      title: 'Academic Programs',
      subtitle: 'Explore learning opportunities',
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-900">Latest Updates</h3>
          {updates.length > 1 && (
            <div className="flex space-x-2">
              {updates.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === activeIndex ? 'bg-blue-600 w-8' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to update ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
        
        {/* Featured Item */}
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200 transition-all">
            <span className={`inline-block px-3 py-1 ${currentUpdate.badgeColor} text-white text-xs font-bold rounded-full mb-3`}>
              {currentUpdate.badge}
            </span>
            <h4 className="text-xl font-bold text-gray-900 mb-2">
              {currentUpdate.title}
            </h4>
            <p className="text-gray-700 mb-3">
              {currentUpdate.description}
            </p>
            <div className="flex items-center text-sm text-gray-600">
              {currentUpdate.date && (
                <>
                  <span className="font-semibold">📅 {currentUpdate.date}</span>
                  {currentUpdate.location && (
                    <>
                      <span className="mx-2">•</span>
                      <span>📍 {currentUpdate.location}</span>
                    </>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Quick News Items */}
          <div className="space-y-3">
            {quickUpdates.map((item, index) => (
              <div
                key={index}
                className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition cursor-pointer"
              >
                <div className={`w-12 h-12 rounded-lg ${item.color} flex-shrink-0 flex items-center justify-center`}>
                  <span className="text-xl">{item.icon}</span>
                </div>
                <div className="flex-1">
                  <h5 className="font-bold text-gray-900 text-sm">{item.title}</h5>
                  <p className="text-xs text-gray-600">{item.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function getCategoryBadge(category: string): string {
  const badges: Record<string, string> = {
    academic: 'ACADEMIC EVENT',
    islamic: 'ISLAMIC EVENT',
    event: 'COMMUNITY EVENT',
    conference: 'CONFERENCE',
  };
  return badges[category] || 'UPCOMING EVENT';
}

function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    academic: 'bg-blue-600',
    islamic: 'bg-green-600',
    event: 'bg-purple-600',
    conference: 'bg-amber-600',
  };
  return colors[category] || 'bg-gray-600';
}

function formatEventDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(date);
}