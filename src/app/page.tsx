import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import PromoSection from '@/components/PromoSection';
import FeaturedProjects from '@/components/FeaturedProjects';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <PromoSection />
      <FeaturedProjects />
      
      {/* Placeholder for remaining sections */}
      <section className="bg-surface py-24 flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-display text-4xl font-bold text-primary mb-4">Próximos Pasos: Value Prop & Amenidades</h2>
          <p className="text-text-secondary">Continuaremos con la estructura propuesta...</p>
        </div>
      </section>
    </main>
  );
}
