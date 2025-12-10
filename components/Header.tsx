import Link from 'next/link';

export default function Header() {
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "News", href: "/news" },
    { name: "Events", href: "/events" },
    { name: "Games", href: "/games" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between max-w-7xl">
        <Link href="/" className="flex items-center space-x-3">
          <img src="/logo.svg" alt="Kamil Logo" className="h-8 w-8 object-contain" />
          <span className="font-bold text-xl text-gray-900">Kamil Pascasarjana ITB</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="text-sm font-semibold text-gray-700 hover:text-blue-600 transition"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden p-2 text-gray-700">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>
    </header>
  );
}