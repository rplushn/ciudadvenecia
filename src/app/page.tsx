import Hero from '@/components/Hero';
import PromoSection from '@/components/PromoSection';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <PromoSection />
      
      {/* Placeholder for remaining 10 sections */}
      <section className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-display text-4xl font-bold text-primary mb-4">Sección 3: Sobre Ciudad Venecia</h2>
          <p className="text-text-secondary">Próximamente...</p>
        </div>
      </section>
    </main>
  );
}
