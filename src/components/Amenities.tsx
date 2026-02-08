export default function Amenities() {
  const amenities = [
    { name: "Entrada Monumental", img: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000" },
    { name: "Áreas Sociales", img: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?q=80&w=2000" },
    { name: "Seguridad 24/7", img: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=2000" },
    { name: "Áreas Verdes", img: "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?q=80&w=2000" },
  ];

  return (
    <section className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div className="max-w-xl">
            <span className="text-accent uppercase tracking-widest text-sm font-bold mb-4 block">
              Calidad de Vida
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary">
              Amenidades de Primer Nivel
            </h2>
          </div>
          <button className="hidden md:block bg-transparent border border-primary text-primary px-6 py-3 uppercase text-sm font-bold hover:bg-primary hover:text-white transition-colors">
            Ver Galería Completa
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {amenities.map((item, index) => (
            <div key={index} className="group relative h-96 overflow-hidden cursor-pointer">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${item.img})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />
              <div className="absolute bottom-0 left-0 p-6 w-full">
                <h3 className="font-display text-white text-xl font-bold border-l-4 border-accent pl-4">
                  {item.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
        
        <button className="md:hidden w-full mt-8 bg-transparent border border-primary text-primary px-6 py-3 uppercase text-sm font-bold hover:bg-primary hover:text-white transition-colors">
          Ver Galería Completa
        </button>
      </div>
    </section>
  );
}
