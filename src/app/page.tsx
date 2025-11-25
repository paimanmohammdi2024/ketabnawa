import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import HeroSection from '@/components/sections/hero-section';
import PopularAudiobooksSection from '@/components/sections/popular-audiobooks-section';
import LatestEbooksSection from '@/components/sections/latest-ebooks-section';
import CategoriesSection from '@/components/sections/categories-section';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <PopularAudiobooksSection />
        <LatestEbooksSection />
        <CategoriesSection />
      </main>
      <Footer />
    </div>
  );
}
