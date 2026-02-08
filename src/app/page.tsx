import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import PromoSection from '@/components/PromoSection';
import FeaturedProjects from '@/components/FeaturedProjects';
import TopParallax from '@/components/TopParallax';
import ValueProp from '@/components/ValueProp';
import Amenities from '@/components/Amenities';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <PromoSection />
      <FeaturedProjects />
      <TopParallax />
      <ValueProp />
      <Amenities />
      <CallToAction />
      <Footer />
    </main>
  );
}
