type QuickAccessCardProps = {
  icon: string;
  title: string;
  description: string;
  color: string;
  href: string;
};

export default function QuickAccessCard({ icon, title, description, color, href }: QuickAccessCardProps) {
  return (
    <a
      href={href}
      className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer border border-gray-100 block"
    >
      <div className={`bg-gradient-to-br ${color} p-6 text-center`}>
        <div className="text-6xl mb-2 transform group-hover:scale-110 transition-transform">
          {icon}
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-bold text-xl text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
        <div className="mt-4 text-blue-600 font-semibold text-sm group-hover:translate-x-2 transition-transform inline-block">
          Access Now →
        </div>
      </div>
    </a>
  );
}