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
      
      {/* Smart Navbar (Terrasoles Style) */}
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
          {/* Logo Area */}
          <Link href="#start" className="flex flex-col group">
             <span className="text-white font-serif-display text-2xl tracking-widest leading-none">INMAER</span>
             <span className="text-white/60 text-[9px] uppercase tracking-[0.4em] mt-1">Real Estate</span>
          </Link>

          {/* Center Menu */}
          <div className="hidden lg:flex items-center gap-10">
            {['Inicio', 'Master Plan', 'Lotes', 'Amenidades', 'Ubicación'].map((item, i) => {
              const href = ['#start', '#nosotros', '#proyectos', '#amenidades', '#kontakt'][i];
              return (
                <Link key={i} href={href} className="text-white text-[11px] font-medium uppercase tracking-[0.15em] hover:text-[#C5A065] transition-colors">
                  {item}
                </Link>
              );
            })}
          </div>

          {/* Right Action */}
          <div className="hidden lg:flex items-center">
             <Link href="#kontakt" className="border border-white/80 text-white px-8 py-3 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-[#2C2C2C] transition-all duration-300">
                Contáctanos
             </Link>
          </div>

          {/* Mobile Toggle */}
          <button onClick={toggleMenu} className="lg:hidden text-white p-2">
            <span className="text-2xl">{isMobileMenuOpen ? '✕' : '☰'}</span>
          </button>
        </div>
      </nav>

      {/* HERO SECTION (Image Background + Overlay + Centered Text) */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center" id="start">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/homepage/portal_ai-ciudad_venecia.jpeg" 
            alt="Ciudad Venecia Portal"
            className="h-full w-full object-cover transform scale-105 animate-slowZoom" 
          />
          {/* Dark Overlay - Lighter for visibility */}
          <div className="absolute inset-0 bg-[#2C2520]/20 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-black/10"></div> 
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-[1400px] px-6 text-center text-white mt-16">
          <h1 className="font-serif-display font-medium text-5xl md:text-7xl lg:text-[85px] leading-[1.1] mb-8 drop-shadow-lg animate-fadeInUp">
            Terrenos residenciales dentro <br className="hidden md:block" /> del nuevo Oriente
          </h1>
          
          <p className="text-[#E5D5B0] text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] mb-12 drop-shadow-sm animate-fadeInUp delay-100">
            CON VÍAS DE ACCESO QUE TE CONECTARÁN CON TODO LO QUE NECESITAS
          </p>

          <div className="flex justify-center animate-fadeInUp delay-200">
            <Link 
              href="#proyectos" 
              className="group relative inline-block px-10 py-4 border border-white text-white text-xs font-bold uppercase tracking-[0.25em] hover:bg-white hover:text-[#2C2C2C] transition-all duration-300"
            >
              Conoce Más
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-80">
           <div className="w-[30px] h-[50px] border-2 border-white/50 rounded-full flex justify-center p-2">
              <div className="w-1 h-2 bg-white rounded-full animate-scrollDown"></div>
           </div>
        </div>
      </section>

      {/* 2. INTRO / WELCOME (Terrasoles Style: Clean, Serif Headings) */}
      <section className="py-28 px-6 bg-[#F3F0EB] text-center">
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

      {/* 3. PROYECTOS (Elegant Cards) */}
      <section id="proyectos" className="py-16 px-6 bg-[#F9F8F6]">
         <div className="max-w-[1600px] mx-auto">
            <div className="text-center mb-16">
               <span className="text-[#C5A065] text-[10px] font-bold uppercase tracking-[0.25em] block mb-3">Nuestra Colección</span>
               <h2 className="font-serif-display text-4xl text-[#2C2C2C]">Proyectos Destacados</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {/* Project 1 */}
               <div className="group relative h-[500px] overflow-hidden cursor-pointer">
                  <img src="/homepage/casa_fachada.jpg.jpeg" alt="Danli" className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8 opacity-100 transition-opacity duration-500">
                     <h3 className="font-serif-display text-5xl mb-2">Danlí</h3>
                     <p className="text-xs uppercase tracking-[0.2em] mb-8">Proyecto Insignia</p>
                     <span className="px-6 py-3 border border-white/50 text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors">Ver Detalles</span>
                  </div>
               </div>
               
               {/* Project 2 */}
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

      {/* 4. DETAILS / AMENITIES (NEW BEIGE COLOR) */}
      <section className="py-24 bg-[#EBE7DF] text-[#4A403A]">
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
