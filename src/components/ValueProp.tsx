export default function ValueProp() {
  const reasons = [
    {
      title: "Plusvalía Garantizada",
      description: "Ubicaciones estratégicas en zonas de alto crecimiento económico y desarrollo urbano.",
      icon: (
        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    },
    {
      title: "Seguridad Jurídica",
      description: "Todos nuestros proyectos cuentan con escrituración inmediata y todos los permisos de ley.",
      icon: (
        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "Urbanización Completa",
      description: "Entregamos proyectos con agua, luz, calles pavimentadas y áreas sociales listas.",
      icon: (
        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    {
      title: "Respaldo INMAER",
      description: "Más de 8 años de experiencia y miles de familias satisfechas nos respaldan.",
      icon: (
        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-accent uppercase tracking-widest text-sm font-bold mb-4 block">
            Inversión Inteligente
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary">
            ¿Por qué elegir Ciudad Venecia?
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
          {reasons.map((item, index) => (
            <div key={index} className="flex flex-col items-center group">
              <div className="w-24 h-24 bg-surface flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                {item.icon}
              </div>
              <h3 className="font-display text-xl font-bold text-primary mb-3">
                {item.title}
              </h3>
              <p className="text-text-secondary leading-relaxed text-sm">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
