export default function TopParallax() {
  return (
    <section>
      {/* Parallax Section 1 */}
      <div className="relative min-h-[500px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1592595896551-12b371d546d5?q=80&w=2070')",
          }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 h-[500px] flex flex-col items-center justify-center text-center text-white px-4">
          <span className="uppercase tracking-[0.2em] mb-4 text-sm font-bold">Experiencia Premium</span>
          <h2 className="font-display text-5xl md:text-7xl font-bold uppercase drop-shadow-lg">
            Vida en Armonía
          </h2>
        </div>
      </div>

      {/* Parallax Section 2 */}
      <div className="relative min-h-[500px] overflow-hidden border-t-8 border-white">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=2070')",
          }}
        />
        <div className="absolute inset-0 bg-primary/80 mix-blend-multiply" />
        <div className="relative z-10 h-[500px] flex flex-col items-center justify-center text-center text-white px-4">
           <span className="uppercase tracking-[0.2em] mb-4 text-sm font-bold text-accent">Naturaleza y Confort</span>
          <h2 className="font-display text-5xl md:text-7xl font-bold uppercase drop-shadow-lg">
            Respira Futuro
          </h2>
        </div>
      </div>
    </section>
  );
}
