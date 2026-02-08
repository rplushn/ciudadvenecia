export default function CallToAction() {
  return (
    <section className="relative py-32 bg-primary text-white overflow-hidden">
      {/* Abstract Background Element */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 skew-x-12 translate-x-1/4 pointer-events-none" />
      
      <div className="relative max-w-5xl mx-auto px-4 text-center z-10">
        <h2 className="font-display text-4xl md:text-6xl font-bold mb-6">
          ¿Listo para construir tu futuro?
        </h2>
        <p className="text-xl md:text-2xl text-white/80 mb-10 font-light max-w-3xl mx-auto">
          Agenda una visita hoy mismo y descubre por qué más de 1,200 familias han confiado en nosotros.
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <button className="bg-accent hover:bg-white hover:text-primary text-white px-10 py-5 font-bold uppercase tracking-wider text-lg transition-all transform hover:-translate-y-1">
            Cotizar Ahora
          </button>
          <button className="bg-transparent border-2 border-white hover:bg-white hover:text-primary text-white px-10 py-5 font-bold uppercase tracking-wider text-lg transition-all">
            Contactar Asesor
          </button>
        </div>
        
        <p className="mt-8 text-sm text-white/50 uppercase tracking-widest">
          Financiamiento directo disponible
        </p>
      </div>
    </section>
  );
}
