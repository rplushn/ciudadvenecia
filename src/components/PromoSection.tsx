"use client";

export default function PromoSection() {
  return (
    <section className="relative min-h-[60vh] overflow-hidden">
      {/* Background Image with Parallax */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053')",
        }}
      />

      {/* Green Overlay */}
      <div className="absolute inset-0 bg-success/85" />

      {/* Content */}
      <div className="relative z-10 py-20 px-4 text-center text-white">
        <div className="max-w-6xl mx-auto">
          {/* Icon/Logo placeholder */}
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto bg-white/20 flex items-center justify-center">
              <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </div>
          </div>

          {/* Main Title */}
          <h2 className="font-display text-4xl md:text-6xl font-bold uppercase mb-6">
            Construyendo
            <br />
            Tu Futuro
          </h2>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 mb-8">
            <div className="border-2 border-white/40 p-8">
              <div className="text-5xl font-bold mb-2">300+</div>
              <div className="text-lg uppercase tracking-wider">Lotes Disponibles</div>
            </div>
            <div className="border-2 border-white/40 p-8">
              <div className="text-5xl font-bold mb-2">24/7</div>
              <div className="text-lg uppercase tracking-wider">Seguridad</div>
            </div>
            <div className="border-2 border-white/40 p-8">
              <div className="text-5xl font-bold mb-2">100%</div>
              <div className="text-lg uppercase tracking-wider">Financiamiento</div>
            </div>
          </div>

          {/* Description */}
          <p className="text-lg md:text-xl max-w-3xl mx-auto font-light leading-relaxed">
            Ubicado estratégicamente en Tegucigalpa, Ciudad Venecia ofrece
            un entorno seguro, moderno y accesible para tu familia.
          </p>
        </div>
      </div>
    </section>
  );
}
