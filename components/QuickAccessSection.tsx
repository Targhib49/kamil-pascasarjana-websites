import QuickAccessCard from './QuickAccessCard';

export default function QuickAccessSection() {
  const tools = [
    {
      icon: "🕌",
      title: "Prayer Times",
      description: "Get accurate prayer times for your location",
      color: "from-green-500 to-emerald-600",
      href: "#",
    },
    {
      icon: "🧭",
      title: "Qibla Direction",
      description: "Find the direction to Mecca instantly",
      color: "from-blue-500 to-cyan-600",
      href: "#",
    },
    {
      icon: "🗺️",
      title: "Campus Map",
      description: "Navigate campus facilities with ease",
      color: "from-purple-500 to-violet-600",
      href: "#",
    },
    {
      icon: "📅",
      title: "Event Calendar",
      description: "Stay updated with upcoming events",
      color: "from-orange-500 to-amber-600",
      href: "#",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Quick Access Tools</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Essential resources for your daily academic and spiritual journey
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {tools.map((tool, index) => (
            <QuickAccessCard key={index} {...tool} />
          ))}
        </div>
      </div>
    </section>
  );
}