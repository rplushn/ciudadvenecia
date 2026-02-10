"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

// Hook for Animated Counters
function useCounter(end, duration = 2000) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let start = 0;
          const increment = end / (duration / 16);
          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
          observer.disconnect(); // Run once
        }
      },
      { threshold: 0.5 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [end, duration]);

  return { count, elementRef };
}

// Counter Component
const AnimatedStat = ({ end, label, prefix = "", suffix = "" }) => {
    const { count, elementRef } = useCounter(end);
    return (
        <div ref={elementRef} className="text-center">
            <div className="font-serif-display text-5xl md:text-6xl text-[#C5A065] font-medium mb-2">
                {prefix}{count.toLocaleString()}{suffix}
            </div>
            <div className="text-white text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] leading-relaxed opacity-90">
                {label}
            </div>
        </div>
    );
};


export default function Home() {
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
    link.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Montserrat:wght@300;400;500;600;700&display=swap';
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
            ? 'bg-gradient-to-b from-black/60 to-transparent py-6 border-none' 
            : 'bg-[#5D737E]/85 backdrop-blur-lg py-4 shadow-sm' 
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-8 md:px-12 flex items-center justify-between">
          <Link href="#start" className="flex items-center gap-3 group">
             <div className={`transition-colors duration-300 ${isAtTop ? 'text-white' : 'text-white'}`}>
                {/* LOGO SVG RECREATION */}
                <svg height="45" viewBox="0 0 330 80" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="block">
                    {/* Sunburst Icon */}
                    <g transform="translate(40, 40)">
                         {/* Rays */}
                         {Array.from({ length: 24 }).map((_, i) => (
                            <line 
                                key={i} 
                                x1="0" y1="-14" x2="0" y2="-32" 
                                transform={`rotate(${i * 15})`} 
                                stroke="currentColor" 
                                strokeWidth="1.5"
                            />
                         ))}
                         {/* Hollow Center - implicitly created by start of rays */}
                    </g>
                    
                    {/* Text: CIUDAD VENECIA - Separated slightly */}
                    <text x="85" y="50" fontFamily="Montserrat" fontSize="24" fontWeight="300" letterSpacing="0.1em">CIUDAD</text>
                    <text x="200" y="50" fontFamily="Montserrat" fontSize="24" fontWeight="700" letterSpacing="0.1em">VENECIA</text>
                </svg>
             </div>
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

      {/* 3. AMENITIES CAROUSEL - DARKER BG WITH GRADIENT */}
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

      {/* 4. VIDEO SHOWCASE SECTION (MATCHING BG TONE #F0EEE9) */}
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

      {/* 5. PRICES / PROMO SECTION (Terrasoles Style - Adjusted Tone & Static) */}
      <section className="relative py-24 px-6 flex items-center justify-center bg-center bg-cover" style={{ backgroundImage: "url('/amenidades/amenidades_club.jpg.jpeg')" }}>
        {/* Adjusted Overlay: Warm Beige/Brown Tone (#8C8276/90) */}
        <div className="absolute inset-0 bg-[#8C8276]/90 mix-blend-multiply"></div>
        {/* Additional light layer for Terrasoles look */}
        <div className="absolute inset-0 bg-[#A69C91]/30"></div>

        <div className="relative z-10 max-w-[1200px] mx-auto text-center text-white">
           <h2 className="font-serif-display text-4xl md:text-5xl tracking-widest mb-6 drop-shadow-md">PRECIOS EXCLUSIVOS</h2>
           <p className="font-light text-sm md:text-base max-w-3xl mx-auto mb-16 text-gray-100 drop-shadow-sm">
              Adquiere tu terreno en Ciudad Venecia con exclusivos precios de lanzamiento, descubre los planes de financiamiento y las tasas preferenciales que mejor se adapten a ti.
           </p>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12 gap-x-0 mb-16">
              {/* Row 1 */}
              <div className="px-6 flex flex-col items-center justify-center border-r-0 md:border-r border-[#EBE7DF]/80">
                 <span className="text-3xl md:text-4xl font-serif-display mb-2 drop-shadow-sm">HASTA 60 MESES</span>
                 <span className="text-[10px] uppercase tracking-widest font-medium">SIN INTERESES</span>
              </div>
              <div className="px-6 flex flex-col items-center justify-center border-r-0 md:border-r border-[#EBE7DF]/80">
                  <span className="text-3xl md:text-4xl font-serif-display mb-2 drop-shadow-sm">15% DE DESCUENTO</span>
                  <span className="text-[10px] uppercase tracking-widest font-medium">EN PAGO DE CONTADO</span>
              </div>
              <div className="px-6 flex flex-col items-center justify-center">
                  <span className="text-sm md:text-base uppercase tracking-widest mb-1 font-medium">TERRENOS DESDE</span>
                  <span className="text-3xl md:text-4xl font-serif-display drop-shadow-sm">99m² <span className="text-lg">HASTA</span> 250m²</span>
              </div>

              {/* Row 2 */}
              <div className="px-6 flex flex-col items-center justify-center border-r-0 md:border-r border-[#EBE7DF]/80 md:mt-12 pt-12 md:pt-0 border-t md:border-t-0 border-[#EBE7DF]/30">
                  <span className="text-sm md:text-base uppercase tracking-widest mb-1 font-medium">ENGANCHE DESDE</span>
                  <span className="text-4xl font-serif-display drop-shadow-sm">10%</span>
              </div>
              <div className="px-6 flex flex-col items-center justify-center border-r-0 md:border-r border-[#EBE7DF]/80 md:mt-12 pt-12 md:pt-0 border-t md:border-t-0 border-[#EBE7DF]/30">
                   <span className="text-sm uppercase tracking-widest max-w-[180px] font-medium">DESCUENTO ESPECIAL POR</span>
                   <span className="text-xl font-serif-display mt-2 drop-shadow-sm">PRONTA CONSTRUCCIÓN</span>
              </div>
              <div className="px-6 flex flex-col items-center justify-center md:mt-12 pt-12 md:pt-0 border-t md:border-t-0 border-[#EBE7DF]/30">
                   <span className="text-sm uppercase tracking-widest max-w-[200px] font-medium">PLANES ESPECIALES</span>
                   <span className="text-[10px] mt-2 text-gray-100">PARA INVERSIONISTAS Y PEQUEÑOS CONSTRUCTORES</span>
              </div>
           </div>

           <p className="text-[10px] italic text-gray-200 mb-8">*Aplican restricciones.</p>

           <button className="px-10 py-4 bg-transparent border border-[#EBE7DF] text-white text-xs font-bold uppercase tracking-[0.25em] hover:bg-[#EBE7DF] hover:text-[#5C554F] transition-all duration-300">
              SOLICITA MÁS INFORMACIÓN
           </button>
        </div>
      </section>

      {/* 6. SERVICES (Split 2-Part Section) */}
      <section className="bg-white py-24 px-6 md:px-12 border-b border-[#F0EEE9]">
          <div className="max-w-[1400px] mx-auto">
             
             {/* PART 2: BOTTOM SPLIT (Image Left + Grid Right) */}
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                 {/* Left Image */}
                 <div className="h-[500px] w-full bg-gray-100 overflow-hidden relative shadow-lg">
                    <img src="/homepage/casa_fachada.jpg.jpeg" alt="Interior Showroom" className="w-full h-full object-cover" />
                 </div>

                 {/* Right Content Grid */}
                 <div>
                    <span className="text-[#C5A065] text-[10px] font-bold uppercase tracking-[0.25em] block mb-4">BASE TÉCNICA</span>
                    <h2 className="font-serif-display text-4xl md:text-5xl text-[#2C2C2C] mb-10">
                       Servicios y orden urbano
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                       {/* Box 1 */}
                       <div className="bg-white border border-gray-100 p-8 shadow-sm hover:shadow-md transition-shadow">
                          <h4 className="text-[#2C2C2C] text-xs font-bold uppercase tracking-wider mb-3">TERRENOS</h4>
                          <p className="text-[#6B665F] text-xs leading-relaxed">Lotes (por ejemplo, 10x15 en Danlí).</p>
                       </div>
                       {/* Box 2 */}
                       <div className="bg-white border border-gray-100 p-8 shadow-sm hover:shadow-md transition-shadow">
                          <h4 className="text-[#2C2C2C] text-xs font-bold uppercase tracking-wider mb-3">SERVICIOS</h4>
                          <p className="text-[#6B665F] text-xs leading-relaxed">Agua potable, energía y aguas negras.</p>
                       </div>
                       {/* Box 3 */}
                       <div className="bg-white border border-gray-100 p-8 shadow-sm hover:shadow-md transition-shadow">
                          <h4 className="text-[#2C2C2C] text-xs font-bold uppercase tracking-wider mb-3">DISPONIBILIDAD</h4>
                          <p className="text-[#6B665F] text-xs leading-relaxed">Agua 24 horas (según proyecto).</p>
                       </div>
                       {/* Box 4 */}
                       <div className="bg-white border border-gray-100 p-8 shadow-sm hover:shadow-md transition-shadow">
                          <h4 className="text-[#2C2C2C] text-xs font-bold uppercase tracking-wider mb-3">SEGURIDAD</h4>
                          <p className="text-[#6B665F] text-xs leading-relaxed">Vigilancia 24 horas (según proyecto).</p>
                       </div>
                    </div>

                    <button className="bg-[#2C2C2C] text-white px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#C5A065] transition-colors shadow-lg">
                       VER PROYECTOS
                    </button>
                 </div>
             </div>

             {/* PART 3: BOTTOM SPLIT (Infrastructure) */}
             <div className="mt-24 pt-12 border-t border-gray-100">
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                     {/* Left: Text */}
                     <div>
                        <span className="text-[#C5A065] text-[10px] font-bold uppercase tracking-[0.25em] block mb-4">EN PROYECTOS COMO CIUDAD VENECIA DANLÍ</span>
                        <h2 className="font-serif-display text-4xl text-[#2C2C2C] mb-4">Infraestructura que se siente</h2>
                        <p className="text-[#6B665F] font-light text-sm leading-relaxed mb-6">
                           No vendemos &quot;ideas&quot;: entregamos urbanización y procesos claros para tu inversión. Calles balastadas, acceso a servicios básicos y delimitación predial desde el primer día.
                        </p>
                        <ul className="space-y-3">
                            {['Calles amplias y balastadas', 'Red eléctrica instalada', 'Acceso a agua potable', 'Drenaje pluvial eficiente'].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-xs font-medium text-[#5C554F]">
                                    <span className="w-1 h-1 rounded-full bg-[#C5A065]"></span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                     </div>

                     {/* Right: Image */}
                     <div className="h-[400px] w-full bg-gray-100 overflow-hidden relative shadow-lg rounded-sm">
                        <img src="/amenidades/amenidades_parque_central.jpg.jpeg" alt="Infraestructura Ciudad Venecia" className="w-full h-full object-cover" />
                     </div>
                 </div>
             </div>

          </div>
      </section>

      {/* 7. AMENIDADES ("ESPACIOS QUE INSPIRAN TRANQUILIDAD") */}
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

      {/* --- WOW SPLIT PARALLAX SECTION (MOVED HERE) --- */}

      {/* 8. TOP PARALLAX ("VIDA EN ARMONÍA") */}
      <section className="relative h-[60vh] bg-fixed bg-center bg-cover flex items-center justify-center" style={{ backgroundImage: "url('/amenidades/amenidades_piscina002.jpeg')" }}>
         <div className="absolute inset-0 bg-black/40"></div>
         <div className="relative z-10 text-center">
            <p className="text-white/80 text-[10px] uppercase tracking-[0.3em] mb-4">Experiencia Premium</p>
            <h2 className="text-white font-serif-display text-6xl md:text-7xl">VIDA EN ARMONÍA</h2>
         </div>
      </section>

      {/* 9. MIDDLE STATIC SECTION (BEIGE PASTEL) */}
      <section className="bg-[#EBE7DF] py-16 px-6 md:px-12 flex items-center justify-center overflow-hidden">
         {/* Container with explicit Zoom Out Effect (scale-85) and Reduced Width */}
         <div className="transform scale-[0.85] origin-center w-full max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
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
                     <p className="text-[#2C2C2C] font-bold text-2xl">325+</p>
                     <p className="text-[#8C857E] text-[10px] uppercase tracking-widest mt-1">Viviendas</p>
                  </div>
                  <div>
                     <p className="text-[#2C2C2C] font-bold text-2xl">7</p>
                     <p className="text-[#8C857E] text-[10px] uppercase tracking-widest mt-1">Proyectos</p>
                  </div>
                  <div>
                     <p className="text-[#2C2C2C] font-bold text-2xl">4</p>
                     <p className="text-[#8C857E] text-[10px] uppercase tracking-widest mt-1">Ciudades</p>
                  </div>
               </div>

               <Link href="#proyectos" className="inline-block px-8 py-4 bg-[#C5A065] text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#A88650] transition-colors shadow-lg">
                  Ver Proyectos
               </Link>
            </div>

            {/* Right Image/Slider */}
            <div className="relative h-[500px] rounded-sm overflow-hidden shadow-2xl group">
               <img src="/homepage/versalles_outdoor.jpg.jpeg" alt="Ciudad Venecia Lifestyle" className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" />
               <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
                  <p className="text-[#C5A065] text-[9px] uppercase tracking-widest mb-1">Portafolio INMAER</p>
                  <p className="text-white text-lg font-medium">Ciudad Venecia Danlí • Olancho • Valle</p>
               </div>
            </div>
         </div>
      </section>

      {/* 10. BOTTOM PARALLAX ("RESPIRA FUTURO") */}
      <section className="relative h-[60vh] bg-fixed bg-center bg-cover flex items-center justify-center" style={{ backgroundImage: "url('/homepage/outdoor2.jpg.jpeg')" }}>
         <div className="absolute inset-0 bg-black/50"></div>
         <div className="relative z-10 text-center">
            <p className="text-[#C5A065] text-[10px] uppercase tracking-[0.3em] mb-4">Naturaleza y Confort</p>
            <h2 className="text-white font-serif-display text-6xl md:text-7xl">RESPIRA FUTURO</h2>
         </div>
      </section>

      {/* --- WOW SPLIT PARALLAX SECTION END --- */}

      {/* 11. NUESTROS PILARES (Terrasoles Style Replication - ZOOM OUT VERSION v2) */}
      <section className="relative py-24 px-6 overflow-hidden bg-white">
          {/* Subtle Sunburst/Logo Pattern */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
             style={{ 
                 backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l5 25 25 5-25 5-5 25-5-25-25-5 25-5z' fill='%23C5A065' fill-rule='evenodd'/%3E%3C/svg%3E")`, 
                 backgroundSize: '80px 80px' 
             }}>
          </div>
          
          {/* Light Blobs */}
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-[#EBE7DF]/40 blur-3xl -z-10"></div>
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-[#EBE7DF]/40 blur-3xl -z-10"></div>

          {/* ZOOM OUT: max-w Reduced FURTHER from 1080px to 850px (~20% more) */}
          <div className="max-w-[850px] mx-auto relative z-10">
              {/* Header */}
              <div className="text-center mb-16">
                  <h2 className="font-serif-display text-4xl text-[#2C2C2C] mb-4 tracking-wide">NUESTROS PILARES</h2>
                  <p className="text-[#C5A065] text-xs font-bold uppercase tracking-[0.3em]">
                      EL ESPACIO IDEAL PARA CREAR LA VIDA QUE SOÑASTE
                  </p>
              </div>

              {/* Split Content with GAP */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left: Image (Vertical Aspect Ratio Forced) */}
                  <div className="aspect-[3/4] w-full relative overflow-hidden shadow-xl group bg-gray-200">
                      <img src="/homepage/versalles_outdoor.jpg.jpeg" alt="Nuestros Pilares" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                  </div>

                  {/* Right: Info Blocks (Stacked & Separated) */}
                  <div className="flex flex-col gap-6 h-full">
                      {/* Top Block: Gray - Reduced Padding */}
                      <div className="bg-[#EAE8E4] p-8 flex-1 flex flex-col justify-center relative shadow-sm hover:shadow-md transition-shadow">
                          {/* House Icon (SVG) */}
                          <div className="w-8 h-8 mb-6 text-[#4A403A]">
                             <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                             </svg>
                          </div>
                          <h3 className="font-serif-display text-3xl text-[#2C2C2C] mb-4 leading-tight">Urbanismo y diseño <br/> inigualable</h3>
                          <p className="text-[#6B665F] font-light text-sm leading-relaxed mb-8">
                              Ciudad Venecia cuenta con calles y espacios públicos seguros, accesibles y agradables de usar, que se integran armónicamente a las características naturales de la zona.
                          </p>
                          
                          {/* Carousel Dots Mock */}
                          <div className="flex gap-2 mt-auto">
                              <span className="w-2 h-2 rounded-full bg-[#8C857E]"></span>
                              <span className="w-2 h-2 rounded-full border border-[#8C857E]"></span>
                              <span className="w-2 h-2 rounded-full border border-[#8C857E]"></span>
                              <span className="w-2 h-2 rounded-full border border-[#8C857E]"></span>
                          </div>

                          {/* Arrows Mock */}
                          <div className="absolute left-6 top-1/2 -translate-y-1/2 text-[#8C857E] text-2xl cursor-pointer hover:text-[#2C2C2C]">‹</div>
                          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[#8C857E] text-2xl cursor-pointer hover:text-[#2C2C2C]">›</div>
                      </div>

                      {/* Bottom Block: White - Reduced Padding */}
                      <div className="bg-[#FAFAF9] p-8 flex-1 flex flex-col justify-center items-center text-center shadow-sm border border-gray-100">
                          {/* INMAER Logo Mock */}
                          <div className="mb-6 flex flex-col items-center">
                              <span className="font-serif-display text-3xl text-[#005F7F] tracking-widest font-bold">INMAER</span>
                              <span className="text-[8px] uppercase tracking-[0.4em] text-[#005F7F] mt-1">REAL ESTATE</span>
                          </div>
                          
                          <h4 className="font-bold text-[#2C2C2C] text-sm mb-2">Con el respaldo y la <br/> solidez de INMAER</h4>
                          <p className="text-[#6B665F] font-light text-xs max-w-xs mx-auto leading-relaxed">
                              Más de 10 años en el mercado nos permiten otorgar la Garantía de Calidad y Plusvalía que nuestros clientes buscan.
                          </p>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* 12. INMAER CORPORATE SHOWCASE (Blue #003B5C) */}
      <section className="bg-[#003B5C] py-24 px-6 md:px-12 text-white relative overflow-hidden">
         <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
             
             {/* LEFT: INFO & STATS */}
             <div>
                <div className="flex items-center gap-4 mb-6">
                     <span className="text-white/60 text-[10px] font-bold uppercase tracking-[0.25em]">UNA CREACIÓN DE</span>
                     <div className="h-[1px] w-12 bg-[#C5A065]"></div>
                </div>
                
                {/* LOGO INMAER (Text based as placeholder or SVG if available) */}
                <h2 className="font-serif-display text-5xl md:text-6xl mb-2 tracking-wide text-white">INMAER</h2>
                <p className="text-[#C5A065] text-xs uppercase tracking-[0.4em] mb-8 font-bold">REAL ESTATE</p>

                <h3 className="font-serif-display text-3xl md:text-4xl leading-tight mb-6 text-white/90">
                    Nuestras creaciones impactan positivamente el futuro de miles de personas.
                </h3>
                
                <p className="text-gray-300 font-light text-sm leading-relaxed mb-12 max-w-xl">
                    INMAER es una compañía hondureña con más de 10 años de experiencia, creando productos inmobiliarios de nueva generación. Nuestro propósito principal es crear comunidades plenas donde las personas puedan desarrollar su vida en un entorno de armonía y plusvalía.
                </p>

                {/* ANIMATED STATS GRID */}
                <div className="grid grid-cols-3 gap-8 border-t border-white/10 pt-10">
                     <AnimatedStat end={10} label="AÑOS DE EXPERIENCIA" suffix="+" />
                     <AnimatedStat end={7500} label="CLIENTES SATISFECHOS" prefix="+" />
                     <AnimatedStat end={4} label="CIUDADES CON PRESENCIA" />
                </div>
                
                <div className="mt-12">
                     <Link href="#proyectos" className="inline-block px-10 py-4 border border-white/30 text-white text-xs font-bold uppercase tracking-[0.25em] hover:bg-white hover:text-[#1A2C38] transition-all duration-300">
                        Conoce INMAER
                     </Link>
                </div>
             </div>

             {/* RIGHT: PROJECT SHOWCASE GRID */}
             <div className="grid grid-cols-2 gap-4">
                 {/* Project 1 */}
                 <div className="relative aspect-[4/3] group overflow-hidden cursor-pointer">
                     <img src="/homepage/casa_fachada.jpg.jpeg" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90"></div>
                     <div className="absolute bottom-6 left-6">
                         <h4 className="text-white font-bold text-sm">Ciudad Venecia</h4>
                         <p className="text-white/60 text-[10px] uppercase tracking-wider">Danlí · Valle · Olancho</p>
                     </div>
                 </div>
                 
                 {/* Project 2 */}
                 <div className="relative aspect-[4/3] group overflow-hidden cursor-pointer mt-8">
                     <img src="/homepage/versalles_outdoor.jpg.jpeg" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90"></div>
                     <div className="absolute bottom-6 left-6">
                         <h4 className="text-white font-bold text-sm">Residencial Versalles</h4>
                         <p className="text-white/60 text-[10px] uppercase tracking-wider">San Lorenzo</p>
                     </div>
                 </div>

                 {/* Project 3 */}
                 <div className="relative aspect-[4/3] group overflow-hidden cursor-pointer">
                     <img src="/amenidades/amenidades_club.jpg.jpeg" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90"></div>
                     <div className="absolute bottom-6 left-6">
                         <h4 className="text-white font-bold text-sm">Residencial Palmanova</h4>
                         <p className="text-white/60 text-[10px] uppercase tracking-wider">Próximamente</p>
                     </div>
                 </div>

                 {/* Project 4 */}
                 <div className="relative aspect-[4/3] group overflow-hidden cursor-pointer mt-8">
                     <img src="/homepage/portal_ai-ciudad_venecia.jpeg" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90"></div>
                     <div className="absolute bottom-6 left-6">
                         <h4 className="text-white font-bold text-sm">Hills City</h4>
                         <p className="text-white/60 text-[10px] uppercase tracking-wider">Comercial</p>
                     </div>
                 </div>
             </div>

         </div>
      </section>

       {/* 13. NEW COMPLEX CONTACT CTA - ELEGANT BEIGE REDESIGN (NO BLUE) */}
       <section id="kontakt" className="py-24 px-6 bg-[#F3F0EB]">
           <div className="max-w-[1200px] mx-auto">
               
               {/* Header Centered */}
               <div className="text-center mb-16">
                   <span className="text-[#C5A065] text-[10px] font-bold uppercase tracking-[0.25em] block mb-4">ÚLTIMO PASO</span>
                   <h2 className="font-serif-display text-4xl md:text-5xl text-[#2C2C2C] mb-6">
                       ¿Listo para hablar con un asesor?
                   </h2>
                   <p className="text-[#6B665F] font-light max-w-2xl mx-auto leading-relaxed">
                       Cuéntanos qué proyecto te interesa y te mostramos opciones reales de financiamiento, sin compromisos ni promesas infladas.
                   </p>
               </div>

               {/* Benefits Row */}
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 text-center">
                   {[
                       "Respuesta en menos de 24 horas hábiles.",
                       "Información clara sobre cuotas y primas según proyecto.",
                       "Acompañamiento durante todo el proceso de compra."
                   ].map((text, i) => (
                       <div key={i} className="flex flex-col items-center">
                           <div className="text-[#C5A065] text-xl mb-4">✓</div>
                           <p className="text-[#5C554F] text-xs leading-relaxed max-w-[250px]">{text}</p>
                       </div>
                   ))}
               </div>

               {/* Split Container - RE-DESIGNED FOR ELEGANCE (No Blue Box) */}
               <div className="grid grid-cols-1 lg:grid-cols-12 shadow-2xl rounded-sm overflow-hidden bg-white">
                   
                   {/* LEFT: Info Column (Now Elegant Beige/Gray instead of Blue) */}
                   <div className="lg:col-span-4 bg-[#EBE7DF] p-10 md:p-12 text-[#484848] flex flex-col justify-center relative overflow-hidden">
                       {/* Subtle Texture Overlay */}
                       <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
                            <svg width="200" height="200" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="50" cy="50" r="40" stroke="#C5A065" strokeWidth="1" />
                                <circle cx="50" cy="50" r="30" stroke="#C5A065" strokeWidth="0.5" />
                            </svg>
                       </div>

                       <h3 className="font-serif-display text-2xl md:text-3xl mb-6 text-[#2C2C2C]">¿Prefieres hablar directo?</h3>
                       <p className="text-[#6B665F] text-xs leading-relaxed mb-8">
                           También puedes escribir o llamar a nuestro equipo comercial para agendar una visita a proyecto o resolver dudas puntuales sobre financiamiento.
                       </p>
                       
                       <div className="h-[1px] w-12 bg-[#C5A065] mb-8"></div>

                       <div className="space-y-8">
                           <div>
                               <p className="text-[#C5A065] text-[9px] uppercase tracking-widest font-bold mb-1">TELÉFONO</p>
                               <p className="text-sm font-medium text-[#2C2C2C]">(504) 9890-4449 / 2763-3699</p>
                           </div>
                           <div>
                               <p className="text-[#C5A065] text-[9px] uppercase tracking-widest font-bold mb-1">WHATSAPP VENTAS</p>
                               <p className="text-sm font-medium text-[#2C2C2C]">+504 9549-8925</p>
                           </div>
                           <div>
                               <p className="text-[#C5A065] text-[9px] uppercase tracking-widest font-bold mb-1">OFICINA DANLÍ</p>
                               <p className="text-xs text-[#6B665F] leading-relaxed">
                                   Col. El Zarzal, Edificio INMAER, contiguo a Pizza Hut, Danlí.
                               </p>
                           </div>
                       </div>
                   </div>

                   {/* RIGHT: Form (8 cols) - Clean White with Gold Accents */}
                   <div className="lg:col-span-8 bg-white p-10 md:p-12">
                       <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
                           {/* Name */}
                           <div className="md:col-span-1 group">
                               <label className="block text-[#8C857E] text-[9px] font-bold uppercase tracking-widest mb-2 group-focus-within:text-[#C5A065] transition-colors">NOMBRE COMPLETO</label>
                               <input type="text" placeholder="Ej. Juan Pérez" className="w-full border-b border-gray-200 py-3 text-sm focus:outline-none focus:border-[#C5A065] transition-all bg-transparent placeholder-gray-300 text-[#2C2C2C]" />
                           </div>
                           
                           {/* Phone */}
                           <div className="md:col-span-1 group">
                               <label className="block text-[#8C857E] text-[9px] font-bold uppercase tracking-widest mb-2 group-focus-within:text-[#C5A065] transition-colors">TELÉFONO / WHATSAPP</label>
                               <input type="text" placeholder="+504 0000-0000" className="w-full border-b border-gray-200 py-3 text-sm focus:outline-none focus:border-[#C5A065] transition-all bg-transparent placeholder-gray-300 text-[#2C2C2C]" />
                           </div>

                           {/* Email */}
                           <div className="md:col-span-1 group">
                               <label className="block text-[#8C857E] text-[9px] font-bold uppercase tracking-widest mb-2 group-focus-within:text-[#C5A065] transition-colors">CORREO ELECTRÓNICO</label>
                               <input type="email" placeholder="tucorreo@ejemplo.com" className="w-full border-b border-gray-200 py-3 text-sm focus:outline-none focus:border-[#C5A065] transition-all bg-transparent placeholder-gray-300 text-[#2C2C2C]" />
                           </div>

                           {/* Project Dropdown */}
                           <div className="md:col-span-1 group">
                               <label className="block text-[#8C857E] text-[9px] font-bold uppercase tracking-widest mb-2 group-focus-within:text-[#C5A065] transition-colors">PROYECTO DE INTERÉS</label>
                               <div className="relative">
                                   <select className="w-full border-b border-gray-200 py-3 text-sm focus:outline-none focus:border-[#C5A065] transition-all bg-transparent text-[#2C2C2C] appearance-none cursor-pointer">
                                       <option>Seleccionar...</option>
                                       <option>Ciudad Venecia Danlí</option>
                                       <option>Ciudad Venecia Olancho</option>
                                       <option>Ciudad Venecia Valle</option>
                                       <option>Residencial Versalles</option>
                                   </select>
                                   <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                       <span className="text-xs">▼</span>
                                   </div>
                               </div>
                           </div>

                           {/* Message */}
                           <div className="md:col-span-2 group">
                               <label className="block text-[#8C857E] text-[9px] font-bold uppercase tracking-widest mb-2 group-focus-within:text-[#C5A065] transition-colors">¿QUÉ TIENES EN MENTE?</label>
                               <textarea rows={3} placeholder="Cuéntanos si buscas lote, casa, información de financiamiento, etc." className="w-full border-b border-gray-200 py-3 text-sm focus:outline-none focus:border-[#C5A065] transition-all bg-transparent placeholder-gray-300 text-[#2C2C2C] resize-none"></textarea>
                           </div>

                           {/* Submit Button */}
                           <div className="md:col-span-2 mt-6 flex flex-col items-center">
                               <button type="submit" className="px-12 py-4 bg-[#C5A065] text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#2C2C2C] transition-all duration-500 shadow-md hover:shadow-lg w-full md:w-auto">
                                   ENVIAR Y HABLAR CON UN ASESOR
                               </button>
                               <p className="text-center text-[9px] text-gray-400 mt-6 leading-relaxed max-w-md">
                                   Al enviar este formulario aceptas ser contactado por INMAER para recibir información sobre el proyecto seleccionado.
                               </p>
                           </div>
                       </form>
                   </div>
               </div>
           </div>
       </section>

      {/* Footer - CORPORATE & ROBUST STYLE (Reverted to #1A3A52) */}
      <footer className="bg-[#1A3A52] text-white pt-24 pb-12 border-t border-[#C5A065]/20 relative overflow-hidden">
        {/* Background Pattern - subtle logo watermark */}
        <div className="absolute top-0 right-0 opacity-[0.03] pointer-events-none transform translate-x-1/3 -translate-y-1/3">
             <svg height="800" viewBox="0 0 330 80" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <g transform="translate(40, 40)">
                     {Array.from({ length: 24 }).map((_, i) => (
                        <line key={i} x1="0" y1="-14" x2="0" y2="-32" transform={`rotate(${i * 15})`} stroke="currentColor" strokeWidth="1.5" />
                     ))}
                </g>
             </svg>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
                {/* Brand Column */}
                <div className="space-y-6">
                     {/* Logo Component */}
                     <div className="text-white mb-6">
                        <svg height="40" viewBox="0 0 330 80" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="block">
                            <g transform="translate(40, 40)">
                                 {Array.from({ length: 24 }).map((_, i) => (
                                    <line key={i} x1="0" y1="-14" x2="0" y2="-32" transform={`rotate(${i * 15})`} stroke="currentColor" strokeWidth="1.5" />
                                 ))}
                            </g>
                            <text x="85" y="50" fontFamily="Montserrat" fontSize="24" fontWeight="300" letterSpacing="0.1em">CIUDAD</text>
                            <text x="200" y="50" fontFamily="Montserrat" fontSize="24" fontWeight="700" letterSpacing="0.1em">VENECIA</text>
                        </svg>
                     </div>
                     <p className="text-white/60 text-xs font-light leading-relaxed max-w-xs">
                        Desarrollos inmobiliarios pensados para la eternidad. Un proyecto respaldado por la solidez y visión de INMAER.
                     </p>
                </div>

                {/* Navigation Column */}
                <div>
                    <h4 className="text-[#C5A065] text-[10px] font-bold uppercase tracking-[0.25em] mb-8">Proyectos</h4>
                    <ul className="space-y-4">
                        <li><Link href="#" className="text-sm font-medium hover:text-[#C5A065] transition-colors">Ciudad Venecia Danlí</Link></li>
                        <li><Link href="#" className="text-sm font-medium hover:text-[#C5A065] transition-colors">Ciudad Venecia Olancho</Link></li>
                        <li><Link href="#" className="text-sm font-medium hover:text-[#C5A065] transition-colors">Ciudad Venecia Valle</Link></li>
                        <li><Link href="#" className="text-sm font-medium hover:text-[#C5A065] transition-colors">Residencial Versalles</Link></li>
                    </ul>
                </div>

                {/* Contact Column */}
                <div>
                     <h4 className="text-[#C5A065] text-[10px] font-bold uppercase tracking-[0.25em] mb-8">Oficina Corporativa</h4>
                     <p className="text-sm font-medium mb-1">Col. El Zarzal, Edificio INMAER</p>
                     <p className="text-white/60 text-xs mb-6">Danlí, El Paraíso, Honduras</p>
                     
                     <p className="text-white/60 text-[10px] uppercase tracking-wider mb-1">Llámanos</p>
                     <p className="text-lg font-serif-display text-white">(504) 9890-4449</p>
                </div>

                 {/* Newsletter/Action Column */}
                <div>
                    <h4 className="text-[#C5A065] text-[10px] font-bold uppercase tracking-[0.25em] mb-8">Mantente Informado</h4>
                    <p className="text-white/60 text-xs mb-6">Recibe actualizaciones sobre nuevos lanzamientos y precios especiales.</p>
                    <div className="flex border-b border-white/20 pb-2">
                        <input type="email" placeholder="Tu correo electrónico" className="bg-transparent border-none text-white text-sm w-full focus:outline-none placeholder:text-white/30"/>
                        <button className="text-[#C5A065] text-xs font-bold uppercase hover:text-white transition-colors">Suscribir</button>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-[10px] text-white/40 uppercase tracking-widest">© 2026 INMAER Real Estate. Todos los derechos reservados.</p>
                <div className="flex gap-8">
                     <Link href="#" className="text-[10px] text-white/40 hover:text-white uppercase tracking-widest transition-colors">Privacidad</Link>
                     <Link href="#" className="text-[10px] text-white/40 hover:text-white uppercase tracking-widest transition-colors">Términos</Link>
                </div>
            </div>
        </div>
      </footer>
    </div>
  );
}
