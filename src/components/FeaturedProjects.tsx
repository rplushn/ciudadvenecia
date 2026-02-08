"use client";

import { useState, useEffect } from 'react';

const projects = [
  {
    id: 1,
    title: "Ciudad Venecia Danlí",
    location: "Danlí, El Paraíso",
    description: "Nuestro proyecto insignia con mayor crecimiento en la zona oriental. Más de 3 etapas desarrolladas, a pocos minutos del centro y cerca de UNAH-TEC. Un ambiente fresco y familiar.",
    image: "/homepage/casa_fachada.jpg.jpeg", 
    alignment: "left"
  },
  {
    id: 2,
    title: "Ciudad Venecia Olancho",
    location: "Valle de Lepaguare, Olancho",
    description: "El proyecto más exclusivo 'Premium Level'. Casa club con piscina, gimnasio, canchas deportivas y restaurante. Redefiniendo el estilo de vida en Olancho.",
    image: "/homepage/outdoor2.jpg.jpeg", 
    alignment: "right"
  }
];

const lifestyleImages = [
  "/homepage/sala_comedor.jpg.jpeg", 
  "/homepage/casa_patio.jpeg", 
  "/homepage/outdoor_vertical.jpg.jpeg", 
];

export default function FeaturedProjects() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % lifestyleImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-white" id="proyectos">
      
      {/* Intro Section */}
      <div className="py-24 text-center px-4 max-w-4xl mx-auto">
        <span className="text-accent tracking-widest uppercase text-sm font-bold mb-4 block">
          Trayectoria INMAER
        </span>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-6">
          Desarrollando el Futuro <br/>
          <span className="italic font-light">de Honduras</span>
        </h2>
        <p className="text-text-secondary text-lg leading-relaxed">
          Desde Danlí hasta Olancho, creamos comunidades planificadas con todos los servicios,
          seguridad y plusvalía garantizada. Más de 1,200 familias ya viven su sueño con nosotros.
        </p>
      </div>

      {/* Project 1: Danlí (Text Left, Image Right) */}
      <div className="grid md:grid-cols-2 min-h-[600px]">
        {/* TEXTO IZQUIERDA (Orden 1 en Desktop) */}
        <div className="bg-surface p-12 md:p-24 flex flex-col justify-center order-2 md:order-1">
          <span className="text-accent uppercase tracking-wider font-bold mb-4 text-sm">
            {projects[0].location}
          </span>
          <h3 className="font-display text-4xl font-bold text-primary mb-6">
            {projects[0].title}
          </h3>
          <p className="text-text-secondary text-lg mb-8 leading-relaxed">
            {projects[0].description}
          </p>
          <button className="bg-primary text-white px-8 py-4 uppercase tracking-wider font-bold hover:bg-accent transition-colors self-start">
            Ver Detalles
          </button>
        </div>
        
        {/* IMAGEN DERECHA (Orden 2 en Desktop) */}
        <div 
          className="h-[400px] md:h-auto bg-cover bg-center order-1 md:order-2"
          style={{ backgroundImage: `url(${projects[0].image})` }}
        />
      </div>

      {/* LIFESTYLE CAROUSEL (Middle) */}
      <div className="relative h-[500px] w-full overflow-hidden group">
        {lifestyleImages.map((img, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${img})` }}
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>
        ))}
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-10 p-4">
          <h3 className="font-display text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            Tu Patrimonio Seguro
          </h3>
          <p className="text-xl md:text-2xl font-light max-w-2xl drop-shadow-md">
            Financiamiento propio y bancario disponible
          </p>
        </div>
      </div>

      {/* Project 2: Olancho (Image Left, Text Right) */}
      <div className="grid md:grid-cols-2 min-h-[600px]">
        {/* IMAGEN IZQUIERDA (Orden 1 en Desktop) */}
        <div 
          className="h-[400px] md:h-auto bg-cover bg-center order-1 md:order-1"
          style={{ backgroundImage: `url(${projects[1].image})` }}
        />
        
        {/* TEXTO DERECHA (Orden 2 en Desktop) */}
        <div className="bg-white p-12 md:p-24 flex flex-col justify-center order-2 md:order-2">
          <span className="text-accent uppercase tracking-wider font-bold mb-4 text-sm">
            {projects[1].location}
          </span>
          <h3 className="font-display text-4xl font-bold text-primary mb-6">
            {projects[1].title}
          </h3>
          <p className="text-text-secondary text-lg mb-8 leading-relaxed">
            {projects[1].description}
          </p>
          <button className="bg-white border-2 border-primary text-primary px-8 py-4 uppercase tracking-wider font-bold hover:bg-primary hover:text-white transition-colors self-start">
            Conocer Premium
          </button>
        </div>
      </div>

      {/* Remaining Projects Grid */}
      <div className="py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl font-bold text-primary mb-4">
            Portafolio Nacional
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Explora nuestras opciones de inversión en diferentes departamentos.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { 
              title: "Ciudad Venecia Valle", 
              loc: "San Lorenzo / Jícaro Galán",
              desc: "A 10 min de la playa. Lotes desde L. 1,000/mes.",
              img: "/homepage/san_lorenzo.jpg.jpeg"
            },
            { 
              title: "CV Raíces Talanga", 
              loc: "Francisco Morazán",
              desc: "Nuevo Lanzamiento 2026. Primas accesibles.",
              img: "/homepage/cocina.jpg.jpeg"
            },
            { 
              title: "Hill's City", 
              loc: "Danlí (Comercial)",
              desc: "Distrito comercial, locales y parqueos en el centro.",
              img: "/homepage/cancha_tennis.jpg.jpeg"
            },
            { 
              title: "Residencial Versalles", 
              loc: "Danlí",
              desc: "Exclusividad a 5km del centro.",
              img: "/homepage/versalles_outdoor.jpg.jpeg"
            },
            { 
              title: "Ciudad Venecia TGU", 
              loc: "Tegucigalpa",
              desc: "Próximamente. Pre-venta exclusiva.",
              img: "/homepage/baño.jpg.jpeg"
            },
             { 
              title: "Palmanova", 
              loc: "Danlí",
              desc: "Ubicación privilegiada en carretera Panamericana.",
              img: "/homepage/patio_asador.jpg.jpeg"
            },
          ].map((item, i) => (
            <div key={i} className="group relative h-80 overflow-hidden cursor-pointer border border-gray-100">
              <div className="absolute inset-0 bg-gray-200 group-hover:scale-105 transition-transform duration-700 bg-cover bg-center"
                   style={{ backgroundImage: `url(${item.img})` }}>
              </div>
              <div className="absolute inset-0 bg-primary/60 group-hover:bg-primary/40 transition-colors" />
              <div className="absolute bottom-0 left-0 p-8 w-full text-white">
                <p className="text-xs uppercase tracking-wider mb-2 font-bold text-accent">{item.loc}</p>
                <h4 className="font-display text-2xl font-bold mb-2">{item.title}</h4>
                <p className="text-sm text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
