"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Design5Page() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isAtTop, setIsAtTop] = useState(true);

  // Load Cormorant Garamond & Montserrat
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Montserrat:wght@300;400;500;600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); };
  }, []);

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

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <div className="bg-[#F3F0EB] text-[#484848] antialiased relative font-sans selection:bg-[#C5A065] selection:text-white">
      <style jsx global>{`
        body { font-family: 'Montserrat', sans-serif; }
        h1, h2, h3, h4, h5, h6, .font-serif-display { font-family: 'Cormorant Garamond', serif; }
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

      {/* HERO SECTION */}
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
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-80">
           <div className="w-[30px] h-[50px] border-2 border-white/50 rounded-full flex justify-center p-2">
              <div className="w-1 h-2 bg-white rounded-full animate-scrollDown"></div>
           </div>
        </div>
      </section>

      {/* --- WOW SPLIT PARALLAX SECTION START --- */}

      {/* 1. TOP PARALLAX ("VIDA EN ARMONÍA") */}
      <section className="relative h-[60vh] bg-fixed bg-center bg-cover flex items-center justify-center" style={{ backgroundImage: "url('/amenidades/amenidades_piscina002.jpeg')" }}>
         <div className="absolute inset-0 bg-black/40"></div>
         <div className="relative z-10 text-center">
            <p className="text-white/80 text-[10px] uppercase tracking-[0.3em] mb-4">Experiencia Premium</p>
            <h2 className="text-white font-serif-display text-6xl md:text-7xl">VIDA EN ARMONÍA</h2>
         </div>
      </section>

      {/* 2. MIDDLE STATIC SECTION (BEIGE PASTEL) */}
      <section className="bg-[#EBE7DF] py-24 px-6 md:px-12 flex items-center">
         <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
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

      {/* 3. BOTTOM PARALLAX ("RESPIRA FUTURO") */}
      <section className="relative h-[60vh] bg-fixed bg-center bg-cover flex items-center justify-center" style={{ backgroundImage: "url('/homepage/outdoor2.jpg.jpeg')" }}>
         <div className="absolute inset-0 bg-black/50"></div>
         <div className="relative z-10 text-center">
            <p className="text-[#C5A065] text-[10px] uppercase tracking-[0.3em] mb-4">Naturaleza y Confort</p>
            <h2 className="text-white font-serif-display text-6xl md:text-7xl">RESPIRA FUTURO</h2>
         </div>
      </section>

      {/* --- WOW SPLIT PARALLAX SECTION END --- */}

      {/* 4. PROYECTOS (Elegant Cards) */}
      <section id="proyectos" className="py-24 px-6 bg-white">
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

       {/* 5. CONTACT CTA */}
       <section id="kontakt" className="py-24 px-6 bg-[#F3F0EB] text-center">
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
