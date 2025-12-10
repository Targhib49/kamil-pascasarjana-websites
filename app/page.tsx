// ============================================
// HOMEPAGE - CONNECTED TO DATABASE
// All components now display real data from Supabase
// ============================================

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import QuickAccessSection from '@/components/QuickAccessSection';
import AboutSection from '@/components/AboutSection';
import NewsSection from '@/components/NewsSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <QuickAccessSection />
      <AboutSection />
      <NewsSection />
      <Footer />
    </div>
  );
}