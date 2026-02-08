import Navbar from '@/components/Navbar';

export default function QuienesSomos() {
  return (
    <main className="min-h-screen bg-surface">
      <Navbar />
      <div className="h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="font-display text-5xl md:text-7xl font-bold text-primary mb-4 uppercase">
          Quiénes Somos
        </h1>
        <p className="font-display text-2xl text-accent tracking-widest uppercase">
          Muy Pronto
        </p>
      </div>
    </main>
  );
}
