"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Design4Page() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isAtTop, setIsAtTop] = useState(true);

  // Load Google Fonts
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@200;300;400;500;600&family=Lato:wght@300;400&display=swap';
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

      const sections = ['start', 'nosotros', 'proyectos', 'amenidades', 'kontakt'];
      const scrollPosition = currentScrollY + 100;
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition && (element.offsetTop + element.offsetHeight) > scrollPosition) {
          setActiveSection(section);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <div className="bg-[#F8F7F5] text-[#4A403A] antialiased selection:bg-[#D4C5B0] selection:text-white relative font-sans">
      <style jsx global>{`
        body { font-family: 'Lato', sans-serif; }
        h1, h2, h3, h4, h5, h6, .font-heading { font-family: 'Montserrat', sans-serif; }
      `}</style>
      
      {/* Smart Navbar */}
      <nav 
        id="navbar"
        className={`fixed left-0 right-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)] transform ${
            isVisible ? 'translate-y-0' : '-translate-y-full'
        } ${
            isAtTop 
            ? 'bg-transparent border-transparent py-8' 
            : 'bg-[#F8F7F5]/90 backdrop-blur-md border-b border-[#D4C5B0]/30 py-5 shadow-sm'
        }`}
      >
        <div className="flex max-w-[1400px] mx-auto px-8 items-center justify-between">
          <Link href="#start" className="flex items-center gap-3 group relative">
            <div className="flex flex-col">
                <span className={`uppercase text-lg font-heading font-medium tracking-[0.2em] transition-colors ${isAtTop ? 'text-white' : 'text-[#4A403A]'}`}>Ciudad Venecia</span>
            </div>
          </Link>
          <div className="hidden lg:flex items-center gap-10">
            {['Inicio', 'Nosotros', 'Proyectos', 'Amenidades', 'Contacto'].map((item, i) => {
              const href = ['#start', '#nosotros', '#proyectos', '#amenidades', '#kontakt'][i];
              const section = href.substring(1);
              return (
                <Link key={section} href={href} className={`text-xs uppercase tracking-[0.15em] font-heading transition-all hover:text-[#B08D55] ${
                    activeSection === section 
                    ? (isAtTop ? 'text-white border-b border-white' : 'text-[#B08D55] border-b border-[#B08D55]') 
                    : (isAtTop ? 'text-white/80' : 'text-[#4A403A]/70')
                }`}>
                  {item}
                </Link>
              );
            })}
            <Link href="#kontakt" className={`px-6 py-2.5 text-xs font-bold uppercase tracking-widest border transition-all duration-300 ${
                isAtTop 
                ? 'border-white text-white hover:bg-white hover:text-[#4A403A]' 
                : 'border-[#4A403A] text-[#4A403A] hover:bg-[#4A403A] hover:text-white'
            }`}>
                Agendar Cita
            </Link>
          </div>
          <button onClick={toggleMenu} className={`lg:hidden p-2 text-2xl ${isAtTop ? 'text-white' : 'text-[#4A403A]'}`}>
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {/* 1. HERO SECTION */}
      <section className="relative h-screen min-h-[700px] w-full overflow-hidden" id="start">
        <div className="absolute inset-0 z-0">
          <video src="/HERO3.mp4" className="h-full w-full object-cover" autoPlay muted loop playsInline />
          <div className="absolute inset-0 bg-[#4A403A]/30"></div>
        </div>
        <div className="relative z-10 h-full flex items-center justify-center text-center">
          <div className="w-full max-w-5xl px-6">
              <p className="text-white text-xs md:text-sm font-bold uppercase tracking-[0.4em] mb-6 animate-fadeIn">Inmobiliaria INMAER presenta</p>
              <h1 className="text-5xl md:text-7xl lg:text-[80px] leading-tight font-light font-heading text-white tracking-wide mb-8">
                TU VIDA EN <br/> <span className="font-semibold">EQUILIBRIO</span>
              </h1>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-10">
                <Link href="#proyectos" className="min-w-[200px] px-8 py-4 bg-[#B08D55] text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#9A7B48] transition-colors shadow-lg">
                  Ver Proyectos
                </Link>
                <Link href="#kontakt" className="min-w-[200px] px-8 py-4 bg-transparent border border-white text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-[#4A403A] transition-colors">
                  Contactar Asesor
                </Link>
              </div>
          </div>
        </div>
      </section>

      {/* 2. INTRO TEXT */}
      <section className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto text-center">
         <div className="w-[1px] h-20 bg-[#D4C5B0] mx-auto mb-10"></div>
         <h2 className="text-3xl md:text-4xl font-heading font-light text-[#4A403A] mb-8 leading-snug">
            Diseñamos comunidades <span className="italic font-normal">planeadas</span> para<br/> un estilo de vida integral.
         </h2>
         <p className="text-[#8C857E] font-light text-lg max-w-2xl mx-auto leading-relaxed">
            Desde Danlí hasta Olancho, fusionamos la naturaleza con el urbanismo moderno. Espacios seguros, plusvalía garantizada y el respaldo de más de 10 años construyendo patrimonio.
         </p>
      </section>

      {/* 3. PROYECTOS HIGHLIGHT (Mosaic Layout) */}
      <section id="proyectos" className="py-12 px-4 md:px-8">
         <div className="max-w-[1600px] mx-auto">
            <div className="flex justify-between items-end mb-12 px-4">
                <div>
                    <span className="block text-[#B08D55] text-xs font-bold uppercase tracking-[0.3em] mb-2">Nuestros Desarrollos</span>
                    <h2 className="text-4xl font-heading font-medium text-[#4A403A]">Descubre tu lugar</h2>
                </div>
                <Link href="#kontakt" className="hidden md:block text-[#4A403A] text-xs font-bold uppercase tracking-[0.2em] border-b border-[#4A403A] pb-1 hover:text-[#B08D55] hover:border-[#B08D55] transition-colors">
                    Ver Mapa Completo
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 h-auto md:h-[800px]">
                {/* Main Featured Project */}
                <div className="lg:col-span-8 lg:row-span-2 relative group overflow-hidden cursor-pointer">
                    <img src="/homepage/casa_fachada.jpg.jpeg" alt="Danlí" className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2C2520]/80 via-transparent to-transparent opacity-80"></div>
                    <div className="absolute bottom-8 left-8 text-white">
                        <span className="bg-[#B08D55] text-white text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 mb-3 inline-block">Danlí</span>
                        <h3 className="text-3xl md:text-5xl font-heading font-light mb-2">Ciudad Venecia</h3>
                        <p className="text-white/80 font-light text-sm tracking-wide">Proyecto Insignia • Salida al Paraíso</p>
                    </div>
                </div>

                {/* Secondary Project 1 */}
                <div className="lg:col-span-4 relative group overflow-hidden cursor-pointer h-[400px] md:h-auto">
                    <img src="/amenidades/amenidades_club.jpg.jpeg" alt="Olancho" className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                    <div className="absolute bottom-6 left-6 text-white">
                         <span className="border border-white/50 text-white text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 mb-3 inline-block">Olancho</span>
                        <h3 className="text-2xl font-heading font-medium">Juticalpa Premium</h3>
                    </div>
                </div>

                {/* Secondary Project 2 */}
                <div className="lg:col-span-4 relative group overflow-hidden cursor-pointer h-[400px] md:h-auto bg-[#EBE7DF] flex items-center justify-center p-8 text-center hover:bg-[#E0DACE] transition-colors">
                    <div>
                        <span className="block text-[#B08D55] text-xs font-bold uppercase tracking-[0.3em] mb-4">Lanzamiento 2026</span>
                        <h3 className="text-3xl font-heading font-medium text-[#4A403A] mb-4">Raíces Talanga</h3>
                        <p className="text-[#8C857E] text-sm mb-8">Un nuevo concepto de vida accesible.</p>
                        <Link href="#kontakt" className="px-6 py-3 border border-[#4A403A] text-[#4A403A] text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#4A403A] hover:text-white transition-colors">
                            Información
                        </Link>
                    </div>
                </div>
            </div>
         </div>
      </section>

      {/* 4. STATS (Clean Typography) */}
      <section className="py-20 bg-[#2C2520] text-[#F8F7F5]">
         <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left px-8">
            <div>
               <p className="text-[#B08D55] text-5xl font-heading font-light mb-2">10+</p>
               <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">Años de Trayectoria</p>
            </div>
            <div>
               <p className="text-[#B08D55] text-5xl font-heading font-light mb-2">4</p>
               <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">Departamentos</p>
            </div>
            <div>
               <p className="text-[#B08D55] text-5xl font-heading font-light mb-2">100%</p>
               <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">Financiamiento Propio</p>
            </div>
            <div className="flex flex-col justify-center">
               <p className="text-sm font-light text-white/80 leading-relaxed">
                  "Creamos valor real a través de la urbanización responsable y el diseño consciente."
               </p>
            </div>
         </div>
      </section>

      {/* 5. AMENITIES (Image & Text Split) */}
      <section id="amenidades" className="py-0">
         <div className="flex flex-col md:flex-row h-auto md:h-[600px]">
            <div className="w-full md:w-1/2 relative">
               <img src="/amenidades/amenidades_piscina002.jpeg" className="w-full h-full object-cover" />
            </div>
            <div className="w-full md:w-1/2 bg-[#F8F7F5] p-12 md:p-24 flex flex-col justify-center">
               <span className="text-[#B08D55] text-xs font-bold uppercase tracking-[0.3em] mb-4">Estilo de Vida</span>
               <h2 className="text-4xl md:text-5xl font-heading font-light text-[#4A403A] mb-8">Amenidades Exclusivas</h2>
               <div className="space-y-6">
                  <div className="flex items-start gap-4">
                     <span className="text-[#B08D55] text-xl">01.</span>
                     <div>
                        <h4 className="font-bold text-[#4A403A] text-sm uppercase tracking-wider">Casa Club & Piscinas</h4>
                        <p className="text-[#8C857E] font-light text-sm mt-1">Diseñadas para el relax y la convivencia familiar en un entorno seguro.</p>
                     </div>
                  </div>
                  <div className="flex items-start gap-4">
                     <span className="text-[#B08D55] text-xl">02.</span>
                     <div>
                        <h4 className="font-bold text-[#4A403A] text-sm uppercase tracking-wider">Áreas Deportivas</h4>
                        <p className="text-[#8C857E] font-light text-sm mt-1">Canchas de tenis, fútbol y gimnasios al aire libre.</p>
                     </div>
                  </div>
                  <div className="flex items-start gap-4">
                     <span className="text-[#B08D55] text-xl">03.</span>
                     <div>
                        <h4 className="font-bold text-[#4A403A] text-sm uppercase tracking-wider">Seguridad 24/7</h4>
                        <p className="text-[#8C857E] font-light text-sm mt-1">Accesos controlados y vigilancia permanente para tu tranquilidad.</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 6. CONTACT FORM (Minimalist) */}
      <section id="kontakt" className="py-24 px-6 md:px-12 bg-white">
         <div className="max-w-4xl mx-auto text-center mb-16">
            <span className="text-[#B08D55] text-xs font-bold uppercase tracking-[0.3em] mb-4 block">Inicia tu Inversión</span>
            <h2 className="text-4xl md:text-5xl font-heading font-light text-[#4A403A]">Contacto</h2>
         </div>
         
         <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="space-y-8">
               <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-[#4A403A] mb-2">Oficina Principal</h4>
                  <p className="text-[#8C857E] font-light">Col. El Zarzal, Edif. INMAER<br/>Danlí, El Paraíso, HN</p>
               </div>
               <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-[#4A403A] mb-2">Teléfonos</h4>
                  <p className="text-[#8C857E] font-light">+504 9890-4449</p>
                  <p className="text--[#8C857E] font-light">+504 2763-3699</p>
               </div>
               <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-[#4A403A] mb-2">Email</h4>
                  <p className="text-[#8C857E] font-light">info@inmaer.hn</p>
               </div>
            </div>
            
            <form className="space-y-6">
               <div className="grid grid-cols-2 gap-6">
                  <div className="group">
                     <label className="block text-[10px] font-bold uppercase tracking-widest text-[#B08D55] mb-2">Nombre</label>
                     <input type="text" className="w-full bg-[#F8F7F5] border-b border-[#D4C5B0] p-3 text-[#4A403A] focus:outline-none focus:border-[#B08D55] transition-colors rounded-t-sm" />
                  </div>
                  <div className="group">
                     <label className="block text-[10px] font-bold uppercase tracking-widest text-[#B08D55] mb-2">Teléfono</label>
                     <input type="tel" className="w-full bg-[#F8F7F5] border-b border-[#D4C5B0] p-3 text-[#4A403A] focus:outline-none focus:border-[#B08D55] transition-colors rounded-t-sm" />
                  </div>
               </div>
               <div className="group">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-[#B08D55] mb-2">Interés</label>
                  <select className="w-full bg-[#F8F7F5] border-b border-[#D4C5B0] p-3 text-[#4A403A] focus:outline-none focus:border-[#B08D55] transition-colors rounded-t-sm">
                     <option>Seleccionar Proyecto...</option>
                     <option>Danlí</option>
                     <option>Olancho</option>
                     <option>Valle</option>
                     <option>Talanga</option>
                  </select>
               </div>
               <button className="w-full py-4 bg-[#4A403A] text-white text-xs font-bold uppercase tracking-[0.25em] hover:bg-[#B08D55] transition-colors mt-4">
                  Enviar Mensaje
               </button>
            </form>
         </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#2C2520] text-[#8C857E] py-12 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
           <div className="text-xs font-bold uppercase tracking-[0.2em] text-white">Ciudad Venecia</div>
           <div className="text-[10px] uppercase tracking-widest">© 2026 Inmobiliaria INMAER</div>
           <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors"><span className="sr-only">Facebook</span>FB</a>
              <a href="#" className="hover:text-white transition-colors"><span className="sr-only">Instagram</span>IG</a>
           </div>
        </div>
      </footer>

    </div>
  );
}
