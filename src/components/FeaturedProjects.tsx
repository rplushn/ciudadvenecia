"use client";

import { useState, useEffect } from 'react';

const projects = [
  {
    id: 1,
    title: "Ciudad Venecia Tegucigalpa",
    location: "Tegucigalpa, Francisco Morazán",
    description: "El proyecto insignia que redefine el concepto de vida urbana en la capital. Seguridad, exclusividad y un entorno natural inigualable.",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070", // Placeholder modern house
    alignment: "left"
  },
  {
    id: 2,
    title: "Ciudad Venecia Danlí",
    location: "Danlí, El Paraíso",
    description: "La primera comunidad planificada de la zona oriental. Un éxito rotundo con más de 300 familias viviendo en armonía.",
    image: "https://images.unsplash.com/photo-1600596542815-e32c21216f53?q=80&w=2074", // Placeholder suburban
    alignment: "right"
  }
];

const lifestyleImages = [
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070", // Family garden
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053", // Pool
  "https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=2080", // Couple home
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
    <section className="bg-white">
      
      {/* Intro Section */}
      <div className="py-24 text-center px-4 max-w-4xl mx-auto">
        <span className="text-accent tracking-widest uppercase text-sm font-bold mb-4 block">
          Nuestra Trayectoria
        </span>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-6">
          Más que Proyectos, <br/>
          <span className="italic font-light">Comunidades de Vida</span>
        </h2>
        <p className="text-text-secondary text-lg leading-relaxed">
          Cada desarrollo de Ciudad Venecia está pensado para ofrecer plusvalía real, 
          seguridad integral y espacios donde las familias hondureñas pueden crecer y prosperar.
        </p>
      </div>

      {/* Project 1 (Left Text) */}
      <div className="grid md:grid-cols-2 min-h-[600px]">
        <div className="bg-surface p-12 md:p-24 flex flex-col justify-center">
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
        <div 
          className="h-[400px] md:h-auto bg-cover bg-center"
          style={{ backgroundImage: `url(${projects[0].image})` }}
        />
      </div>

      {/* LIFESTYLE CAROUSEL (Middle Section) */}
      <div className="relative h-[600px] w-full overflow-hidden group">
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
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-black/20" />
          </div>
        ))}
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-10 p-4">
          <h3 className="font-display text-5xl md:text-7xl font-bold mb-4 drop-shadow-lg">
            Estilo de Vida
          </h3>
          <p className="text-xl md:text-2xl font-light max-w-2xl drop-shadow-md">
            Momentos inolvidables en tu propio hogar
          </p>
        </div>

        {/* Carousel Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
          {lifestyleImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Project 2 (Right Text - Checkerboard) */}
      <div className="grid md:grid-cols-2 min-h-[600px]">
        <div 
          className="h-[400px] md:h-auto bg-cover bg-center order-2 md:order-1"
          style={{ backgroundImage: `url(${projects[1].image})` }}
        />
        <div className="bg-white p-12 md:p-24 flex flex-col justify-center order-1 md:order-2">
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
            Ver Detalles
          </button>
        </div>
      </div>

      {/* Remaining Projects Grid (Compact) */}
      <div className="py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl font-bold text-primary mb-4">
            Más Oportunidades de Inversión
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Ciudad Venecia Olancho", loc: "Olancho" },
            { title: "Ciudad Venecia Valle", loc: "Valle" },
            { title: "Hill's City", loc: "Danlí (Comercial)" },
          ].map((item, i) => (
            <div key={i} className="group relative h-80 overflow-hidden cursor-pointer">
              <div className="absolute inset-0 bg-gray-200 group-hover:scale-105 transition-transform duration-700 bg-cover bg-center"
                   style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1448630360428-65456885c650?q=80&w=2067)' }}>
              </div>
              <div className="absolute inset-0 bg-primary/40 group-hover:bg-primary/20 transition-colors" />
              <div className="absolute bottom-0 left-0 p-8 w-full text-white">
                <p className="text-sm uppercase tracking-wider mb-2 opacity-90">{item.loc}</p>
                <h4 className="font-display text-2xl font-bold">{item.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
