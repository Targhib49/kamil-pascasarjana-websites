import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function GamesPage() {
  const games = [
    {
      title: "Scholarly Words",
      description: "Test your academic vocabulary with this engaging word puzzle game",
      icon: "📝",
      color: "from-blue-500 to-cyan-600",
      difficulty: "Easy to Hard",
      href: "/games/scholarly-words"
    },
    {
      title: "Knowledge Connect",
      description: "Connect concepts from different disciplines and discover interdisciplinary links",
      icon: "🔗",
      color: "from-purple-500 to-pink-600",
      difficulty: "Medium",
      href: "/games/knowledge-connect"
    },
    {
      title: "Timeline Challenge",
      description: "Arrange historical events and scientific discoveries in chronological order",
      icon: "⏳",
      color: "from-orange-500 to-red-600",
      difficulty: "Medium to Hard",
      href: "/games/timeline-challenge"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="max-w-4xl mx-auto text-center text-white">
            <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-bold mb-4">
              REFRESHING CORNER
            </span>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Educational Games
            </h1>
            <p className="text-xl text-white/90">
              Take a break and sharpen your mind with fun, educational challenges
            </p>
          </div>
        </div>
      </section>

      {/* Games Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid md:grid-cols-3 gap-8">
            {games.map((game, index) => (
              <Link
                key={index}
                href={game.href}
                className="group block"
              >
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100">
                  <div className={`bg-gradient-to-br ${game.color} p-12 text-center relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity"></div>
                    <div className="text-8xl mb-4 transform group-hover:scale-110 transition-transform">
                      {game.icon}
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition">
                      {game.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {game.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        <span className="font-semibold">Difficulty:</span> {game.difficulty}
                      </span>
                      <span className="text-blue-600 font-bold group-hover:translate-x-2 transition-transform inline-block">
                        Play Now →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Play Our Games?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              More than just fun - our games are designed to enhance your learning
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: "🧠",
                title: "Cognitive Boost",
                description: "Enhance memory and critical thinking"
              },
              {
                icon: "📚",
                title: "Learn While Playing",
                description: "Reinforce academic concepts"
              },
              {
                icon: "⏱️",
                title: "Quick Sessions",
                description: "Perfect for study breaks"
              },
              {
                icon: "🏆",
                title: "Track Progress",
                description: "See your improvement over time"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg text-center">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leaderboard Teaser */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-3xl p-12 text-center text-white shadow-2xl">
            <div className="text-6xl mb-6">🏆</div>
            <h2 className="text-4xl font-bold mb-4">
              Weekly Leaderboard
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
              Compete with fellow students and see where you rank!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-orange-600 rounded-xl font-bold text-lg hover:bg-gray-100 transition shadow-lg">
                View Rankings
              </button>
              <button className="px-8 py-4 border-2 border-white text-white rounded-xl font-bold text-lg hover:bg-white hover:text-orange-600 transition">
                How It Works
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}