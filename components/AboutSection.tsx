import FeatureCard from './FeatureCard';

export default function AboutSection() {
  const features = [
    {
      icon: "📚",
      color: "bg-blue-600",
      bgGradient: "from-blue-50 to-cyan-50",
      borderColor: "border-blue-100",
      title: "Academic Excellence",
      description: "Supporting research, publications, and scholarly development across all disciplines",
    },
    {
      icon: "👥",
      color: "bg-green-600",
      bgGradient: "from-green-50 to-emerald-50",
      borderColor: "border-green-100",
      title: "Vibrant Community",
      description: "Building lasting connections through events, workshops, and collaborative projects",
    },
    {
      icon: "🎯",
      color: "bg-purple-600",
      bgGradient: "from-purple-50 to-violet-50",
      borderColor: "border-purple-100",
      title: "Meaningful Impact",
      description: "Creating positive change in society through knowledge, service, and leadership",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div>
              <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 font-bold text-sm rounded-full mb-4">
                WHO WE ARE
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Empowering Muslim Scholars Worldwide
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                We are a dynamic community of Muslim postgraduate students dedicated to 
                academic excellence, spiritual growth, and meaningful community impact. 
                Our mission is to create an environment where faith and knowledge flourish together.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {features.map((feature, index) => (
                <FeatureCard key={index} {...feature} />
              ))}
            </div>

            <button className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition shadow-lg">
              Discover Our Story →
            </button>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center shadow-2xl">
              <div className="text-center p-8">
                <div className="text-6xl mb-4">🎓</div>
                <p className="text-xl font-bold text-gray-700">Visual content area</p>
                <p className="text-sm text-gray-600 mt-2">
                  Replace with photos, illustrations, or infographics
                </p>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-200 rounded-full opacity-50 blur-2xl"></div>
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-purple-200 rounded-full opacity-50 blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}