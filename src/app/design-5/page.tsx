"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function Design5Page() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isAtTop, setIsAtTop] = useState(true);

  // Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const carouselData = [
    { title: "Parque Central", img: "/amenidades/amenidades_parque_central.jpg.jpeg" },
    { title: "Club Social", img: "/amenidades/amenidades_club.jpg.jpeg" },
    { title: "Canchas de Padel", img: "/amenidades/amenidades_padel.jpg.jpeg" },
    { title: "Piscinas", img: "/amenidades/amenidades_piscina002.jpeg" },
    { title: "Canchas Basquetbol", img: "/amenidades/amenidades_cancha.jpg.jpeg" },
    { title: "Áreas Verdes", img: "/homepage/versalles_outdoor.jpg.jpeg" },
    { title: "Senderos", img: "/homepage/outdoor2.jpg.jpeg" },
    { title: "Juegos Infantiles", img: "/homepage/familia_jugando.jpg.jpeg" },
    { title: "Zona BBQ", img: "/homepage/patio_asador.jpg.jpeg" },
  ];
  
  // Show 3 items per page on desktop for "smaller" look
  const itemsPerPage = 3;
  const totalPages = Math.ceil(carouselData.length / itemsPerPage);

  // Load Fonts
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Montserrat:wght@300;400;500;600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); };
  }, []);

  // Navbar Scroll Logic
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 100) {
        setIsAtTop(true);
        setIsVisible(true);
      } else {
        setIsAtTop(false);
        if (currentScrollY > 300) {
           setIsVisible(currentScrollY <= lastScrollY);
        } else {
           setIsVisible(true);
        }
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Carousel Logic (Auto-scroll 5s)
  useEffect(() => {
    const interval = setInterval(() => {
        if (carouselRef.current && !carouselRef.current.matches(':hover')) {
             nextSlide();
        }
    }, 5000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  const nextSlide = () => {
      setCurrentSlide((prev) => (prev + 1) % totalPages);
  };
  const prevSlide = () => {
      setCurrentSlide((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <div className="bg-[#F3F0EB] text-[#484848] antialiased relative font-sans selection:bg-[#C5A065] selection:text-white">
      <style jsx global>{`
        body { font-family: 'Montserrat', sans-serif; }
        h1, h2, h3, h4, h5, h6, .font-serif-display { font-family: 'Cormorant Garamond', serif; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      
      {/* Smart Navbar */}
      <nav 
        className={`fixed left-0 right-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)] transform ${
            isVisible ? 'translate-y-0' : '-translate-y-full'
        } ${
            isAtTop 
            ? 'bg-gradient-to-b from-black/60 to-transparent py-8 border-none' 
            : 'bg-[#2C2C2C]/95 backdrop-blur-md py-4 shadow-md'
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-8 md:px-12 flex items-center justify-between">
          <Link href="#start" className="flex flex-col group">
             <span className="text-white font-serif-display text-2xl tracking-widest leading-none">INMAER</span>
             <span className="text-white/60 text-[9px] uppercase tracking-[0.4em] mt-1">Real Estate</span>
          </Link>
          <div className="hidden lg:flex items-center gap-10">
            {['Inicio', 'Master Plan', 'Lotes', 'Amenidades', 'Ubicación'].map((item, i) => (
                <Link key={i} href={['#start', '#nosotros', '#proyectos', '#amenidades', '#kontakt'][i]} className="text-white text-[11px] font-medium uppercase tracking-[0.15em] hover:text-[#C5A065] transition-colors">
                  {item}
                </Link>
            ))}
          </div>
          <div className="hidden lg:flex items-center">
             <Link href="#kontakt" className="border border-white/80 text-white px-8 py-3 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-[#2C2C2C] transition-all duration-300">
                Contáctanos
             </Link>
          </div>
          <button onClick={toggleMenu} className="lg:hidden text-white p-2"><span className="text-2xl">{isMobileMenuOpen ? '✕' : '☰'}</span></button>
        </div>
      </nav>

      {/* 1. HERO SECTION */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center" id="start">
        <div className="absolute inset-0 z-0">
          <img src="/homepage/portal_ai-ciudad_venecia.jpeg" alt="Ciudad Venecia Portal" className="h-full w-full object-cover transform scale-105 animate-slowZoom" />
          <div className="absolute inset-0 bg-[#2C2520]/20 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-black/10"></div> 
        </div>
        <div className="relative z-10 w-full max-w-[1400px] px-6 text-center text-white mt-16">
          <h1 className="font-serif-display font-medium text-5xl md:text-7xl lg:text-[85px] leading-[1.1] mb-8 drop-shadow-lg animate-fadeInUp">
            Terrenos residenciales dentro <br className="hidden md:block" /> del nuevo Oriente
          </h1>
          <p className="text-[#E5D5B0] text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] mb-12 drop-shadow-sm animate-fadeInUp delay-100">
            CON VÍAS DE ACCESO QUE TE CONECTARÁN CON TODO LO QUE NECESITAS
          </p>
          <div className="flex justify-center animate-fadeInUp delay-200">
            <Link href="#proyectos" className="group relative inline-block px-10 py-4 border border-white text-white text-xs font-bold uppercase tracking-[0.25em] hover:bg-white hover:text-[#2C2C2C] transition-all duration-300">
              Conoce Más
            </Link>
          </div>
        </div>
      </section>

      {/* 2. INTRO / WELCOME (PASTEL TONE #F7F6F4) */}
      <section className="py-24 px-6 bg-[#F7F6F4] text-center">
         <div className="max-w-4xl mx-auto">
            <h2 className="font-serif-display text-4xl md:text-5xl text-[#2C2C2C] mb-6">
               Un estilo de vida <span className="italic">extraordinario</span>
            </h2>
            <div className="w-16 h-[1px] bg-[#C5A065] mx-auto mb-8"></div>
            <p className="text-[#666] font-light text-lg leading-relaxed max-w-2xl mx-auto">
               Descubre Ciudad Venecia, donde la naturaleza y la arquitectura moderna convergen para crear el escenario perfecto para tu familia. Espacios diseñados para perdurar.
            </p>
         </div>
      </section>

      {/* 3. "CREADO POR INMAER" STRIP (SLIGHTLY DARKER BEIGE #E5E1D8) */}
      <section className="bg-[#E5E1D8] py-16 text-center border-t border-b border-[#DCD6CC]">
         <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 mb-6">
               <span className="font-serif-display text-2xl tracking-[0.1em] text-[#4A403A]">CREADO POR:</span>
               <div className="flex flex-col items-center">
                   <h3 className="font-serif-display text-4xl font-bold tracking-widest text-[#2C2C2C]">INMAER</h3>
                   <span className="text-[9px] uppercase tracking-[0.4em] text-[#C5A065]">Real Estate</span>
               </div>
            </div>
            <p className="text-[#6B665F] text-sm md:text-base font-medium tracking-wide uppercase max-w-3xl mx-auto leading-relaxed">
               INMAER lleva construyendo proyectos de vivienda más de <span className="font-bold text-[#2C2C2C]">10 años</span>, creando comunidades que perduran.
            </p>
         </div>
      </section>

      {/* 4. AMENITIES CAROUSEL - DARKER BG WITH GRADIENT */}
      <section className="bg-[#F0EEE9] py-16 overflow-hidden relative group" ref={carouselRef}>
          {/* Subtle Top Gradient for Depth */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#EBE7DF] to-transparent z-0 pointer-events-none"></div>

          <div className="max-w-[1400px] mx-auto px-6 mb-12 relative z-10">
               {/* Carousel Slides */}
               <div className="flex transition-transform duration-[1500ms] ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                   {Array.from({ length: totalPages }).map((_, pageIndex) => {
                       const startIndex = pageIndex * itemsPerPage;
                       return (
                           <div key={pageIndex} className="min-w-full grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
                               {carouselData.slice(startIndex, startIndex + itemsPerPage).map((item, idx) => (
                                   <div key={idx} className="relative aspect-[4/3] overflow-hidden group/item cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500">
                                       <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover/item:scale-105" />
                                       
                                       {/* Dark fade for readability */}
                                       <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                                       {/* Title inside image */}
                                       <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4">
                                         <div className="bg-black/35 backdrop-blur-sm px-8 py-3">
                                           <h4 className="text-white text-xs md:text-sm font-semibold uppercase tracking-[0.35em] text-center">
                                             {item.title}
                                           </h4>
                                         </div>
                                       </div>
                                   </div>
                               ))}
                           </div>
                       );
                   })}
               </div>
          </div>
          
          {/* Controls - CENTERED BELOW with margin */}
          <div className="flex justify-center items-center gap-8 mt-4 relative z-10">
              <button onClick={prevSlide} className="w-10 h-10 bg-white border border-gray-200 text-[#2C2C2C] flex items-center justify-center hover:bg-[#C5A065] hover:text-white hover:border-[#C5A065] transition-all shadow-sm rounded-sm">
                  <span className="text-lg">‹</span>
              </button>
              <div className="text-[10px] tracking-widest font-medium text-gray-400">
                 {currentSlide + 1} / {totalPages}
              </div>
              <button onClick={nextSlide} className="w-10 h-10 bg-white border border-gray-200 text-[#2C2C2C] flex items-center justify-center hover:bg-[#C5A065] hover:text-white hover:border-[#C5A065] transition-all shadow-sm rounded-sm">
                  <span className="text-lg">›</span>
              </button>
          </div>
      </section>

      {/* 5. VIDEO SHOWCASE SECTION (MATCHING BG TONE #F0EEE9) */}
      <section className="bg-[#F0EEE9] py-20 px-6">
          <div className="max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left: Text Content */}
              <div>
                  <span className="text-[#C5A065] text-[10px] font-bold uppercase tracking-[0.3em] block mb-4">Espacios que cautivan</span>
                  <h2 className="font-serif-display text-4xl md:text-5xl text-[#2C2C2C] mb-6 leading-tight">
                      Un punto de encuentro <br className="hidden md:block" /> vibrante, seguro y armonioso
                  </h2>
                  <p className="text-[#6B665F] text-base font-light leading-relaxed mb-8">
                      Cada rincón de Ciudad Venecia ha sido planeado con atención al detalle, fusionando diseño arquitectónico innovador con la calidez de una comunidad auténtica.
                  </p>
                  <Link href="#proyectos" className="inline-block px-8 py-3 border-2 border-[#2C2C2C] text-[#2C2C2C] text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#2C2C2C] hover:text-white transition-all">
                      Ver Recorrido Virtual
                  </Link>
              </div>

              {/* Right: Compact Video */}
              <div className="relative w-full max-w-[500px] mx-auto aspect-video bg-[#2C2C2C] rounded-sm overflow-hidden shadow-2xl">
                  <video 
                      src="/HERO3.mp4" 
                      className="w-full h-full object-cover"
                      autoPlay 
                      muted 
                      loop 
                      playsInline
                  />
              </div>
          </div>
      </section>

      {/* 5.5. PRICES / PROMO SECTION (Terrasoles Style) */}
      <section className="relative py-24 px-6 flex items-center justify-center bg-fixed bg-cover bg-center" style={{ backgroundImage: "url('/amenidades/amenidades_club.jpg.jpeg')" }}>
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-[#2C2520]/80 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative z-10 max-w-[1200px] mx-auto text-center text-white">
           <h2 className="font-serif-display text-4xl md:text-5xl tracking-widest mb-6">PRECIOS EXCLUSIVOS</h2>
           <p className="font-light text-sm md:text-base max-w-3xl mx-auto mb-16 text-gray-200">
              Adquiere tu terreno en Ciudad Venecia con exclusivos precios de lanzamiento, descubre los planes de financiamiento y las tasas preferenciales que mejor se adapten a ti.
           </p>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12 gap-x-0 mb-16">
              {/* Row 1 */}
              <div className="px-6 flex flex-col items-center justify-center border-r-0 md:border-r border-[#C5A065]">
                 <span className="text-3xl md:text-4xl font-serif-display mb-2">HASTA 60 MESES</span>
                 <span className="text-[10px] uppercase tracking-widest">SIN INTERESES</span>
              </div>
              <div className="px-6 flex flex-col items-center justify-center border-r-0 md:border-r border-[#C5A065]">
                  <span className="text-3xl md:text-4xl font-serif-display mb-2">15% DE DESCUENTO</span>
                  <span className="text-[10px] uppercase tracking-widest">EN PAGO DE CONTADO</span>
              </div>
              <div className="px-6 flex flex-col items-center justify-center">
                  <span className="text-sm md:text-base uppercase tracking-widest mb-1">TERRENOS DESDE</span>
                  <span className="text-3xl md:text-4xl font-serif-display">99m² <span className="text-lg">HASTA</span> 250m²</span>
              </div>

              {/* Row 2 */}
              <div className="px-6 flex flex-col items-center justify-center border-r-0 md:border-r border-[#C5A065] md:mt-12 pt-12 md:pt-0 border-t md:border-t-0 border-[#C5A065]/30">
                  <span className="text-sm md:text-base uppercase tracking-widest mb-1">ENGANCHE DESDE</span>
                  <span className="text-4xl font-serif-display">10%</span>
              </div>
              <div className="px-6 flex flex-col items-center justify-center border-r-0 md:border-r border-[#C5A065] md:mt-12 pt-12 md:pt-0 border-t md:border-t-0 border-[#C5A065]/30">
                   <span className="text-sm uppercase tracking-widest max-w-[180px]">DESCUENTO ESPECIAL POR</span>
                   <span className="text-xl font-serif-display mt-2">PRONTA CONSTRUCCIÓN</span>
              </div>
              <div className="px-6 flex flex-col items-center justify-center md:mt-12 pt-12 md:pt-0 border-t md:border-t-0 border-[#C5A065]/30">
                   <span className="text-sm uppercase tracking-widest max-w-[200px]">PLANES ESPECIALES</span>
                   <span className="text-[10px] mt-2">PARA INVERSIONISTAS Y PEQUEÑOS CONSTRUCTORES</span>
              </div>
           </div>

           <p className="text-[10px] italic text-gray-400 mb-8">*Aplican restricciones.</p>

           <button className="px-10 py-4 border border-[#C5A065] text-white text-xs font-bold uppercase tracking-[0.25em] hover:bg-[#C5A065] hover:text-white transition-all duration-300">
              SOLICITA MÁS INFORMACIÓN
           </button>
        </div>
      </section>

      {/* 6. TOP PARALLAX */}
      <section className="relative h-[60vh] bg-fixed bg-center bg-cover flex items-center justify-center" style={{ backgroundImage: "url('/amenidades/amenidades_piscina002.jpeg')" }}>
         <div className="absolute inset-0 bg-black/40"></div>
         <div className="relative z-10 text-center">
            <p className="text-white/80 text-[10px] uppercase tracking-[0.3em] mb-4">Experiencia Premium</p>
            <h2 className="text-white font-serif-display text-6xl md:text-7xl">VIDA EN ARMONÍA</h2>
         </div>
      </section>

      {/* 7. MIDDLE STATIC SECTION (BEIGE PASTEL #EBE7DF) */}
      <section className="bg-[#EBE7DF] py-24 px-6 md:px-12 flex items-center">
         <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
               <span className="text-[#C5A065] text-[10px] font-bold uppercase tracking-[0.25em] block mb-4">Experiencia Ciudad Venecia</span>
               <h2 className="font-serif-display text-5xl md:text-6xl text-[#2C2C2C] leading-[1.1] mb-6">
                  Vivir, invertir y crecer <br/> en un mismo lugar
               </h2>
               <p className="text-[#6B665F] text-lg font-light leading-relaxed mb-10 max-w-xl">
                  Cada proyecto combina ubicación estratégica, servicios básicos completos y opciones de financiamiento para que avances a tu ritmo, sin promesas irreales.
               </p>
               
               <div className="grid grid-cols-3 gap-8 mb-10">
                  <div>
                     <p className="text-[#2C2C2C] font-bold text-2xl">+1,200</p>
                     <p className="text-[#8C857E] text-[10px] uppercase tracking-widest mt-1">Familias</p>
                  </div>
                  <div>
                     <p className="text-[#2C2C2C] font-bold text-2xl">7</p>
                     <p className="text-[#8C857E] text-[10px] uppercase tracking-widest mt-1">Proyectos</p>
                  </div>
                  <div>
                     <p className="text-[#2C2C2C] font-bold text-2xl">4</p>
                     <p className="text-[#8C857E] text-[10px] uppercase tracking-widest mt-1">Departamentos</p>
                  </div>
               </div>

               <Link href="#proyectos" className="inline-block px-8 py-4 bg-[#C5A065] text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#A88650] transition-colors shadow-lg">
                  Ver Proyectos
               </Link>
            </div>

            <div className="relative h-[500px] rounded-sm overflow-hidden shadow-2xl group">
               <img src="/homepage/versalles_outdoor.jpg.jpeg" alt="Ciudad Venecia Lifestyle" className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" />
               <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
                  <p className="text-[#C5A065] text-[9px] uppercase tracking-widest mb-1">Portafolio INMAER</p>
                  <p className="text-white text-lg font-medium">Ciudad Venecia Danlí • Olancho • Valle</p>
               </div>
            </div>
         </div>
      </section>

      {/* 8. BOTTOM PARALLAX */}
      <section className="relative h-[60vh] bg-fixed bg-center bg-cover flex items-center justify-center" style={{ backgroundImage: "url('/homepage/outdoor2.jpg.jpeg')" }}>
         <div className="absolute inset-0 bg-black/50"></div>
         <div className="relative z-10 text-center">
            <p className="text-[#C5A065] text-[10px] uppercase tracking-[0.3em] mb-4">Naturaleza y Confort</p>
            <h2 className="text-white font-serif-display text-6xl md:text-7xl">RESPIRA FUTURO</h2>
         </div>
      </section>

      {/* 9. PROYECTOS (LIGHT PASTEL #FAFAF8) */}
      <section id="proyectos" className="py-16 px-6 bg-[#FAFAF8]">
         <div className="max-w-[1600px] mx-auto">
            <div className="text-center mb-16">
               <span className="text-[#C5A065] text-[10px] font-bold uppercase tracking-[0.25em] block mb-3">Nuestra Colección</span>
               <h2 className="font-serif-display text-4xl text-[#2C2C2C]">Proyectos Destacados</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="group relative h-[500px] overflow-hidden cursor-pointer">
                  <img src="/homepage/casa_fachada.jpg.jpeg" alt="Danli" className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8 opacity-100 transition-opacity duration-500">
                     <h3 className="font-serif-display text-5xl mb-2">Danlí</h3>
                     <p className="text-xs uppercase tracking-[0.2em] mb-8">Proyecto Insignia</p>
                     <span className="px-6 py-3 border border-white/50 text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors">Ver Detalles</span>
                  </div>
               </div>
               <div className="group relative h-[500px] overflow-hidden cursor-pointer">
                  <img src="/amenidades/amenidades_club.jpg.jpeg" alt="Olancho" className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8">
                     <h3 className="font-serif-display text-5xl mb-2">Olancho</h3>
                     <p className="text-xs uppercase tracking-[0.2em] mb-8">Premium Living</p>
                     <span className="px-6 py-3 border border-white/50 text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors">Ver Detalles</span>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 10. AMENIDADES (BEIGE PASTEL #EBE7DF) */}
      <section id="amenidades" className="py-24 bg-[#EBE7DF] text-[#4A403A]">
         <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
               <span className="text-[#C5A065] text-[10px] font-bold uppercase tracking-[0.25em] block mb-4">Amenidades</span>
               <h2 className="font-serif-display text-4xl md:text-5xl mb-6 leading-tight text-[#2C2C2C]">Espacios que <br/>inspiran tranquilidad</h2>
               <p className="text-[#6B665F] font-light mb-8 leading-relaxed">
                  Cada rincón de Ciudad Venecia ha sido planeado para ofrecerte la máxima calidad de vida. Disfruta de nuestras casas club, piscinas y áreas verdes protegidas.
               </p>
               <ul className="space-y-4">
                  {['Seguridad Privada 24/7', 'Áreas Verdes Exclusivas', 'Diseño Urbano Integral', 'Alta Plusvalía'].map((item, i) => (
                     <li key={i} className="flex items-center gap-4 text-sm font-medium tracking-wide text-[#5C554F]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C5A065]"></span>
                        {item}
                     </li>
                  ))}
               </ul>
            </div>
            <div className="relative h-[600px]">
               <div className="absolute top-0 right-0 w-[90%] h-[90%] z-10 overflow-hidden shadow-2xl">
                  <img src="/homepage/patio_asador.jpg.jpeg" className="w-full h-full object-cover" />
               </div>
               <div className="absolute bottom-0 left-0 w-[50%] h-[40%] z-20 overflow-hidden border-4 border-[#EBE7DF] shadow-xl">
                  <img src="/amenidades/amenidades_piscina002.jpeg" className="w-full h-full object-cover" />
               </div>
            </div>
         </div>
      </section>

       {/* 11. CONTACT CTA (LIGHT OFF-WHITE #F5F4F1) */}
       <section id="kontakt" className="py-24 px-6 bg-[#F5F4F1] text-center">
          <h2 className="font-serif-display text-4xl md:text-5xl text-[#2C2C2C] mb-8">Comienza tu legado hoy</h2>
          <Link href="#kontakt" className="inline-block px-12 py-4 bg-[#2C2C2C] text-white text-xs font-bold uppercase tracking-[0.25em] hover:bg-[#C5A065] transition-colors shadow-lg">
             Agendar Visita
          </Link>
       </section>

      {/* Footer */}
      <footer className="bg-white py-12 border-t border-gray-100 text-center">
         <span className="font-serif-display text-2xl text-[#2C2C2C] tracking-widest block mb-4">INMAER</span>
         <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400">© 2026 Ciudad Venecia. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
