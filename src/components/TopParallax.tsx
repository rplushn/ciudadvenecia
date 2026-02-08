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

      {/* New Section: Experiencia Ciudad Venecia */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="text-accent uppercase tracking-widest text-sm font-bold mb-4 block">
            Experiencia Ciudad Venecia
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-6">
            Vivir, invertir y crecer en un mismo lugar
          </h2>
          <p className="text-text-secondary text-lg max-w-3xl mx-auto leading-relaxed">
            Cada proyecto combina ubicación estratégica, servicios básicos completos y opciones de financiamiento
            para que puedas avanzar a tu ritmo, sin promesas irreales.
          </p>
        </div>
      </section>

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
