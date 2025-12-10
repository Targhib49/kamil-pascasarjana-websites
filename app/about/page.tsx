import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="max-w-4xl mx-auto text-center text-white">
            <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-bold mb-4">
              ABOUT US
            </span>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Who We Are
            </h1>
            <p className="text-xl text-blue-100">
              Discover our mission, vision, and the community that makes us strong
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-100">
              <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                <span className="text-3xl">🎯</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                To create a supportive and intellectually stimulating environment for Muslim 
                postgraduate students, fostering academic excellence while nurturing Islamic 
                values and promoting community engagement.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-100">
              <div className="w-16 h-16 bg-purple-600 rounded-xl flex items-center justify-center mb-6">
                <span className="text-3xl">👁️</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                To be a leading organization that empowers Muslim scholars to make meaningful 
                contributions to society through research, innovation, and service, while 
                maintaining strong ethical and spiritual foundations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "📚",
                title: "Academic Excellence",
                description: "Pursuing the highest standards in research and scholarship"
              },
              {
                icon: "🤝",
                title: "Community",
                description: "Building strong bonds and supporting one another"
              },
              {
                icon: "🌟",
                title: "Integrity",
                description: "Upholding honesty and ethical principles in all endeavors"
              },
              {
                icon: "🌍",
                title: "Social Impact",
                description: "Creating positive change in our communities and beyond"
              },
              {
                icon: "💡",
                title: "Innovation",
                description: "Embracing creativity and forward-thinking approaches"
              },
              {
                icon: "🕌",
                title: "Faith",
                description: "Integrating Islamic values with academic pursuits"
              }
            ].map((value, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-lg text-gray-600">Key milestones in our history</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-8">
            {[
              { year: "2020", title: "Foundation", description: "MPO was established by a group of passionate graduate students" },
              { year: "2021", title: "First Conference", description: "Hosted our inaugural research symposium with 100+ participants" },
              { year: "2022", title: "Community Growth", description: "Expanded to include members from 15+ departments" },
              { year: "2023", title: "Publication Launch", description: "Released our first quarterly academic journal" },
              { year: "2024", title: "International Recognition", description: "Received award for outstanding student organization" },
              { year: "2025", title: "New Chapter", description: "Launching innovative programs and partnerships" }
            ].map((milestone, index) => (
              <div key={index} className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    {milestone.year}
                  </div>
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{milestone.title}</h3>
                  <p className="text-gray-600">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Join Our Community
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Be part of a vibrant network of Muslim scholars making a difference
          </p>
          <button className="px-8 py-4 bg-white text-blue-700 rounded-xl font-bold text-lg hover:bg-gray-50 transition shadow-lg">
            Get Involved →
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}