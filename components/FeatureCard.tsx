type FeatureCardProps = {
  icon: string;
  color: string;
  bgGradient: string;
  borderColor: string;
  title: string;
  description: string;
};

export default function FeatureCard({ icon, color, bgGradient, borderColor, title, description }: FeatureCardProps) {
  return (
    <div className={`flex items-start space-x-4 p-6 bg-gradient-to-br ${bgGradient} rounded-xl border ${borderColor}`}>
      <div className={`w-16 h-16 rounded-xl ${color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
        <span className="text-3xl">{icon}</span>
      </div>
      <div>
        <h4 className="font-bold text-lg text-gray-900 mb-1">{title}</h4>
        <p className="text-sm text-gray-700">{description}</p>
      </div>
    </div>
  );
}