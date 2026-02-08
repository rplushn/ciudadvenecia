"use client";

export default function Amenities() {
  const mainAmenities = [
    { 
      name: "Casa Club Premium", 
      desc: "Eventos y reuniones sociales",
      img: "/amenidades/amenidades001.jpg.jpeg",
      colSpan: "md:col-span-2",
      rowSpan: "md:row-span-2"
    },
    { 
      name: "Piscinas Climatizadas", 
      desc: "Para adultos y niños",
      img: "/amenidades/amenidades002.jpg.jpeg",
      colSpan: "md:col-span-1",
      rowSpan: "md:row-span-1"
    },
    { 
      name: "NUEVAS Canchas de Pádel", 
      desc: "Deporte de alto nivel",
      img: "https://images.unsplash.com/photo-1626248559388-335193910243?q=80&w=2000", // Padel placeholder
      colSpan: "md:col-span-1",
      rowSpan: "md:row-span-1",
      badge: "¡NUEVO!"
    },
    { 
      name: "Gimnasio Equipado", 
      desc: "Wellness center completo",
      img: "/amenidades/amenidades004.jpg.jpeg",
      colSpan: "md:col-span-1",
      rowSpan: "md:row-span-2"
    },
    { 
      name: "Áreas de Juegos", 
      desc: "Diversión segura",
      img: "/amenidades/amenidades010.jpg.jpeg",
      colSpan: "md:col-span-1",
      rowSpan: "md:row-span-1"
    },
    { 
      name: "Senderos Ecológicos", 
      desc: "Conexión con la naturaleza",
      img: "/amenidades/amenidades008.jpg.jpeg",
      colSpan: "md:col-span-1",
      rowSpan: "md:row-span-1"
    }
  ];

  return (
    <section className="py-24 bg-surface" id="amenidades">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header Section */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="text-accent uppercase tracking-widest text-sm font-bold mb-4 block">
            Estilo de Vida Inigualable
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-primary mb-6">
            Más que amenidades,<br />
            <span className="italic font-light text-text-secondary">experiencias diarias</span>
          </h2>
          <p className="text-lg text-text-secondary">
            Diseñamos cada espacio pensando en tu bienestar, diversión y seguridad. 
            Desde deporte de alto nivel hasta relajación total.
          </p>
        </div>

        {/* Bento Grid Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[300px]">
          {mainAmenities.map((item, index) => (
            <div 
              key={index} 
              className={`group relative overflow-hidden rounded-none ${item.colSpan} ${item.rowSpan}`}
            >
              {/* Image Background */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${item.img})` }}
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Badge if exists */}
              {item.badge && (
                <div className="absolute top-4 right-4 bg-accent text-white px-3 py-1 text-xs font-bold uppercase tracking-widest shadow-lg animate-pulse">
                  {item.badge}
                </div>
              )}

              {/* Content */}
              <div className="absolute bottom-0 left-0 p-8 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="font-display text-white text-2xl font-bold mb-2">
                  {item.name}
                </h3>
                <p className="text-white/80 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-text-secondary mb-6">
            Y mucho más: Canchas de fútbol, seguridad privada, agua potable propia...
          </p>
          <button className="bg-primary text-white px-10 py-4 uppercase tracking-wider font-bold hover:bg-accent transition-all hover:-translate-y-1 shadow-lg">
            Agendar Visita a las Amenidades
          </button>
        </div>

      </div>
    </section>
  );
}
