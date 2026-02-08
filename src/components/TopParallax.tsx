export default function TopParallax() {
  return (
    <section>
      {/* Parallax Section 1 - Vida en Armonía */}
      <div className="relative min-h-[500px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: "url('/homepage/casa_fachada.jpg.jpeg')",
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

      {/* Enhanced Section: Experiencia Ciudad Venecia */}
      <section className="py-24 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          {/* Lado texto */}
          <div>
            <span className="text-accent uppercase tracking-widest text-xs font-bold mb-4 block">
              Experiencia Ciudad Venecia
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Vivir, invertir y crecer
              <br />
              en un mismo lugar
            </h2>
            <p className="text-white/80 text-lg leading-relaxed mb-8">
              Cada proyecto combina ubicación estratégica, servicios básicos completos y opciones de
              financiamiento para que avances a tu ritmo, sin promesas irreales.
            </p>

            <div className="grid grid-cols-3 gap-6 text-sm border-t border-white/10 pt-8 mb-8">
              <div>
                <p className="text-2xl font-bold">+1,200</p>
                <p className="uppercase tracking-widest text-xs text-accent">
                  Familias
                </p>
              </div>
              <div>
                <p className="text-2xl font-bold">7</p>
                <p className="uppercase tracking-widest text-xs text-accent">
                  Proyectos
                </p>
              </div>
              <div>
                <p className="text-2xl font-bold">4</p>
                <p className="uppercase tracking-widest text-xs text-accent">
                  Departamentos
                </p>
              </div>
            </div>

            <button className="bg-accent text-white px-8 py-4 uppercase font-bold hover:bg-white hover:text-primary transition-colors">
              Ver Proyectos
            </button>
          </div>

          {/* Lado visual tipo tarjeta con hover */}
          <div className="relative h-64 md:h-80 bg-white/5 border border-white/10 overflow-hidden group">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-80 transition-transform duration-700 group-hover:scale-110"
              style={{
                backgroundImage:
                  "url('/homepage/san_lorenzo.jpg.jpeg')",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <p className="text-xs uppercase tracking-[0.2em] text-white/70 mb-1">
                Portafolio INMAER
              </p>
              <p className="font-display text-2xl font-bold">Ciudad Venecia Danlí · Olancho · Valle</p>
            </div>
          </div>
        </div>
      </section>

      {/* Parallax Section 2 - Naturaleza y Confort */}
      <div className="relative min-h-[500px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: "url('/homepage/outdoor2.jpg.jpeg')",
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
