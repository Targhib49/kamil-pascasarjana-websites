export default function Footer() {
  const quickLinks = ["About Us", "News & Articles", "Events", "Publications"];
  const socialLinks = [
    { icon: "f", label: "Facebook" },
    { icon: "𝕏", label: "Twitter" },
    { icon: "in", label: "LinkedIn" },
    { icon: "📷", label: "Instagram" },
  ];

  return (
    <footer className="border-t border-gray-200 bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xl shadow-lg">
                M
              </div>
              <span className="font-bold text-xl">MPO</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Building bridges in academic excellence and fostering a vibrant community of scholars.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-400 hover:text-white transition">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-6">Contact</h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start space-x-3">
                <span>📍</span>
                <span>Campus Address, City, Country</span>
              </li>
              <li className="flex items-center space-x-3">
                <span>✉️</span>
                <span>info@mpo.org</span>
              </li>
              <li className="flex items-center space-x-3">
                <span>📞</span>
                <span>+1 234 567 890</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-bold text-lg mb-6">Connect With Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-12 h-12 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition"
                  aria-label={social.label}
                >
                  <span className="text-xl">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Muslim Postgraduate Organization. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}