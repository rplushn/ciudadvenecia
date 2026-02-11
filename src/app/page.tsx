"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Reveal } from '@/components/motion/Reveal';
import CountUp from '@/components/motion/CountUp';

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(0);
  
  // Navbar Scroll Logic States
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isAtTop, setIsAtTop] = useState(true);

  // Load Fonts
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Montserrat:wght@200;300;400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); };
  }, []);

  // Navbar Scroll Handler
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Check if at top (with small buffer)
      if (currentScrollY < 100) {
        setIsAtTop(true);
        setIsVisible(true); // Always show at top
      } else {
        setIsAtTop(false);
        // Hide on scroll down, show on scroll up
        if (currentScrollY > 300) { // Only start hiding after some scroll
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

  const projects = [
    { title: "Ciudad Venecia", location: "Danlí", image: "/homepage/portal_ai-ciudad_venecia.jpeg" },
    { title: "Ciudad Venecia", location: "Olancho", image: "/homepage/ciudad_venecia_olancho.jpg.jpeg" },
    { title: "Ciudad Venecia", location: "Valle", image: "/homepage/ciudad_venecia_valle.jpg.jpeg" },
    { title: "Residencial Versalles", location: "Danlí", image: "/homepage/versalles_outdoor.jpg.jpeg" }
  ];

  return (
    <div className="bg-[#F3F0EB] text-[#2C2C2C] antialiased min-h-screen flex flex-col font-sans selection:bg-[#C5A065] selection:text-white overflow-x-hidden">
      <style jsx global>{`
        body { font-family: 'Montserrat', sans-serif; }
        h1, h2, h3, h4, h5, h6, .font-serif-display { font-family: 'Cormorant Garamond', serif; }
        .parallax-bg { background-attachment: fixed; background-position: center; background-repeat: no-repeat; background-size: cover; }
      `}</style>
      
      {/* ------------------- HEADER / NAVBAR (UNIFIED) ------------------- */}
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
          <Link href="/#start" className="flex items-center gap-3 group">
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
                    </g>
                    
                    {/* Text: CIUDAD VENECIA - Separated slightly */}
                    <text x="85" y="50" fontFamily="Montserrat" fontSize="24" fontWeight="300" letterSpacing="0.1em">CIUDAD</text>
                    <text x="200" y="50" fontFamily="Montserrat" fontSize="24" fontWeight="700" letterSpacing="0.1em">VENECIA</text>
                </svg>
             </div>
          </Link>

          <div className="hidden lg:flex items-center gap-8 xl:gap-12">
            {/* Main Navigation Links */}
            <div className="flex items-center gap-8">
                <Link href="/#start" className="text-white text-[11px] font-medium uppercase tracking-[0.15em] hover:text-[#C5A065] transition-colors">
                  Inicio
                </Link>
                <Link href="/quienes-somos" className="text-white text-[11px] font-medium uppercase tracking-[0.15em] hover:text-[#C5A065] transition-colors">
                  Quiénes Somos
                </Link>
                <Link href="/proyectos" className="text-white text-[11px] font-medium uppercase tracking-[0.15em] hover:text-[#C5A065] transition-colors">
                  Proyectos
                </Link>
                <Link href="/contacto" className="text-white text-[11px] font-medium uppercase tracking-[0.15em] hover:text-[#C5A065] transition-colors">
                  Contacto
                </Link>
                <Link href="#" className="text-white text-[11px] font-medium uppercase tracking-[0.15em] hover:text-[#C5A065] transition-colors">
                  Portal Clientes
                </Link>
            </div>

            {/* Separator Line */}
            <div className="h-4 w-[1px] bg-white/30"></div>

            {/* Social Icons Section */}
            <div className="flex items-center gap-4">
                <span className="text-white/80 text-[10px] font-medium uppercase tracking-wider hidden xl:block">Síguenos</span>
                <div className="flex gap-3">
                    {/* Facebook Icon */}
                    <a href="#" className="text-white hover:text-[#C5A065] transition-colors">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                    </a>
                    {/* Instagram Icon */}
                    <a href="#" className="text-white hover:text-[#C5A065] transition-colors">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.069-4.85.069-3.204 0-3.585-.011-4.849-.069-3.259-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                        </svg>
                    </a>
                    {/* TikTok Icon */}
                    <a href="#" className="text-white hover:text-[#C5A065] transition-colors">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.46-.54 2.94-1.34 4.14-1.8 2.73-5.7 4.01-8.85 2.48-2.69-1.31-4.25-4.17-4.11-7.14.05-3.08 2.08-5.71 4.97-6.55.75-.22 1.54-.31 2.32-.3v4.2c-.41-.03-.84.03-1.24.18-1.31.52-2.14 1.83-2.02 3.24.08 1.48 1.15 2.75 2.63 2.93 1.69.21 3.23-.97 3.51-2.65.07-.63.07-1.27.06-1.91V.02h-.01z"/>
                        </svg>
                    </a>
                </div>
            </div>
          </div>

          <div className="hidden lg:flex items-center">
             <Link href="/contacto" className="border border-white/80 text-white px-8 py-3 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-[#2C2C2C] transition-all duration-300">
                Contáctanos
             </Link>
          </div>
          <button onClick={toggleMenu} className="lg:hidden text-white p-2"><span className="text-2xl">{isMobileMenuOpen ? '✕' : '☰'}</span></button>
        </div>
      </nav>

      {/* ------------------- HERO ------------------- */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[#1A3A52]">
         {/* Background Video/Image */}
         <div className="absolute inset-0 opacity-60">
            {/* Replaced video with image for stability as requested before, or keep placeholder */}
            <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('/homepage/portal_ai-ciudad_venecia.jpeg')" }}></div>
         </div>
         
         <div className="absolute inset-0 bg-gradient-to-b from-[#1A3A52]/80 via-transparent to-[#1A3A52]"></div>

         <div className="relative z-10 text-center px-6 max-w-5xl mx-auto mt-20">
            <Reveal>
              <h1 className="font-serif-display text-5xl md:text-8xl text-white mb-6 leading-none tracking-tight">
                El arte de vivir <br/><span className="italic font-light text-[#C5A065]">bien.</span>
              </h1>
              <p className="text-white/80 text-sm md:text-lg font-light tracking-wide max-w-2xl mx-auto mb-12 leading-relaxed">
                Desarrollos inmobiliarios que trascienden. Plusvalía garantizada, diseño atemporal y la seguridad que tu familia merece en Honduras.
              </p>
              
              <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                  <Link href="/proyectos" className="bg-[#C5A065] text-white px-10 py-4 text-xs font-bold uppercase tracking-[0.25em] hover:bg-white hover:text-[#2C2C2C] transition-all duration-500 min-w-[200px]">
                    Ver Proyectos
                  </Link>
                  <Link href="/contacto" className="border border-white/30 text-white px-10 py-4 text-xs font-bold uppercase tracking-[0.25em] hover:border-white hover:bg-white/5 transition-all duration-500 min-w-[200px]">
                    Agendar Visita
                  </Link>
              </div>
            </Reveal>
         </div>

         {/* Scroll Indicator */}
         <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1, y: [0, 10, 0] }} 
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/50"
         >
            <span className="text-[10px] uppercase tracking-widest block mb-2">Descubre</span>
            <div className="w-[1px] h-12 bg-white/20 mx-auto"></div>
         </motion.div>
      </section>

      {/* ------------------- STATS / INTRO ------------------- */}
      <section className="py-24 bg-[#F3F0EB]">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
              <div>
                <Reveal>
                  <span className="text-[#C5A065] text-xs font-bold uppercase tracking-[0.25em] mb-4 block">Trayectoria INMAER</span>
                  <h2 className="font-serif-display text-4xl md:text-5xl text-[#2C2C2C] mb-8 leading-tight">
                      Construyendo confianza <br/> desde 2012.
                  </h2>
                  <p className="text-[#6B665F] leading-relaxed mb-8 font-light">
                      No solo vendemos lotes; diseñamos el escenario donde ocurrirán tus mejores recuerdos. Cada proyecto de INMAER es una promesa cumplida de urbanismo ordenado, legalidad transparente y respeto por la naturaleza.
                  </p>
                  <div className="grid grid-cols-2 gap-8 border-t border-[#C5A065]/20 pt-8">
                      <div>
                          <span className="font-serif-display text-4xl text-[#C5A065] block"><CountUp to={4} suffix="+" /></span>
                          <span className="text-xs uppercase tracking-widest text-[#2C2C2C]">Proyectos Exitosos</span>
                      </div>
                      <div>
                          <span className="font-serif-display text-4xl text-[#C5A065] block"><CountUp to={850} suffix="+" /></span>
                          <span className="text-xs uppercase tracking-widest text-[#2C2C2C]">Familias Propietarias</span>
                      </div>
                  </div>
                </Reveal>
              </div>
              <div className="relative">
                 <Reveal delay={0.2}>
                   <div className="aspect-[4/5] bg-white p-4 shadow-xl rotate-2">
                       {/* Image placeholder */}
                       <div className="w-full h-full bg-[#E5E0D8] bg-cover bg-center" style={{ backgroundImage: "url('/homepage/familia_jugando.jpg.jpeg')" }}></div>
                   </div>
                   <div className="absolute -bottom-8 -left-8 bg-[#1A3A52] text-white p-8 max-w-xs shadow-2xl hidden md:block">
                       <p className="font-serif-display text-xl italic">"La mejor inversión es la que se disfruta en familia."</p>
                   </div>
                 </Reveal>
              </div>
          </div>
      </section>

      {/* ------------------- PARALLAX 1 ------------------- */}
      <section className="py-32 bg-fixed bg-cover bg-center relative" style={{ backgroundImage: "url('/homepage/outdoor2.jpg.jpeg')" }}>
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="relative z-10 text-center text-white px-6">
            <Reveal>
              <h2 className="font-serif-display text-5xl md:text-7xl mb-4">Naturaleza & Urbanismo</h2>
              <p className="text-xl uppercase tracking-widest font-light">En perfecta sincronía</p>
            </Reveal>
          </div>
      </section>

      {/* ------------------- PROYECTOS GRID ------------------- */}
      <section className="py-24 px-6 bg-white">
          <div className="max-w-[1600px] mx-auto">
              <div className="text-center mb-20">
                <Reveal>
                  <span className="text-[#C5A065] text-xs font-bold uppercase tracking-[0.25em] mb-4 block">Portafolio</span>
                  <h2 className="font-serif-display text-4xl md:text-6xl text-[#2C2C2C]">Nuestros Desarrollos</h2>
                </Reveal>
              </div>

              <div className="grid md:grid-cols-2 gap-1">
                  {projects.map((project, i) => (
                      <div key={i} className="group relative aspect-[16/10] overflow-hidden cursor-pointer" onMouseEnter={() => setActiveProject(i)}>
                          <div className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.5s] ease-out group-hover:scale-110" style={{ backgroundImage: `url('${project.image}')` }}></div>
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>
                          
                          <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8 transition-opacity duration-500">
                              <span className="text-xs font-bold uppercase tracking-[0.25em] mb-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">{project.location}</span>
                              <h3 className="font-serif-display text-4xl md:text-5xl mb-6 translate-y-4 group-hover:translate-y-0 transition-all duration-500">{project.title}</h3>
                              <Link href="/proyectos" className="border border-white px-8 py-3 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 delay-200">
                                  Explorar
                              </Link>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* ------------------- TESTIMONIALS ------------------- */}
      <section className="py-24 px-6 bg-[#F9F7F4]">
          <div className="max-w-4xl mx-auto text-center">
            <Reveal>
              <div className="text-[#C5A065] text-6xl font-serif-display mb-8">“</div>
              <h3 className="font-serif-display text-2xl md:text-4xl text-[#2C2C2C] italic leading-relaxed mb-12">
                  Gracias a INMAER logramos el sueño de tener nuestro terreno propio. El proceso fue transparente y nos ayudaron con un financiamiento que sí podíamos pagar.
              </h3>
              <div>
                  <p className="font-bold text-[#2C2C2C] uppercase tracking-widest text-xs mb-2">Carlos & María Hernández</p>
                  <p className="text-[#8C857E] text-xs">Propietarios en Ciudad Venecia, Danlí</p>
              </div>
            </Reveal>
          </div>
      </section>

      {/* ------------------- CTA CONTACT ------------------- */}
      <section className="py-24 px-6 bg-[#F3F0EB]">
           <div className="max-w-[1200px] mx-auto">
               <div className="text-center mb-16">
                  <Reveal>
                   <span className="text-[#C5A065] text-[10px] font-bold uppercase tracking-[0.25em] block mb-4">ÚLTIMO PASO</span>
                   <h2 className="font-serif-display text-4xl md:text-5xl text-[#2C2C2C] mb-6">
                       ¿Listo para hablar con un asesor?
                   </h2>
                   <p className="text-[#6B665F] font-light max-w-2xl mx-auto leading-relaxed">
                       Cuéntanos qué proyecto te interesa y te mostramos opciones reales de financiamiento, sin compromisos ni promesas infladas.
                   </p>
                  </Reveal>
               </div>

               {/* Benefits Row */}
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 text-center">
                   {["Respuesta en menos de 24 horas hábiles.", "Información clara sobre cuotas y primas.", "Acompañamiento legal completo."].map((text, i) => (
                       <Reveal key={i} delay={i * 0.1}>
                         <div className="flex flex-col items-center">
                             <div className="text-[#C5A065] text-xl mb-4">✓</div>
                             <p className="text-[#5C554F] text-xs leading-relaxed max-w-[250px]">{text}</p>
                         </div>
                       </Reveal>
                   ))}
               </div>

               {/* Split Container */}
               <div className="grid grid-cols-1 lg:grid-cols-12 shadow-2xl rounded-sm overflow-hidden bg-white">
                   {/* LEFT: Info */}
                   <div className="lg:col-span-4 bg-[#EBE7DF] p-10 md:p-12 text-[#484848] flex flex-col justify-center relative overflow-hidden">
                       <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
                            <svg width="200" height="200" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="50" cy="50" r="40" stroke="#C5A065" strokeWidth="1" />
                            </svg>
                       </div>
                       <Reveal>
                         <h3 className="font-serif-display text-2xl md:text-3xl mb-6 text-[#2C2C2C]">¿Prefieres hablar directo?</h3>
                         <p className="text-[#6B665F] text-xs leading-relaxed mb-8">
                             También puedes escribir o llamar a nuestro equipo comercial para agendar una visita a proyecto.
                         </p>
                         <div className="h-[1px] w-12 bg-[#C5A065] mb-8"></div>
                         <div className="space-y-8">
                             <div>
                                 <p className="text-[#C5A065] text-[9px] uppercase tracking-widest font-bold mb-1">TELÉFONO</p>
                                 <p className="text-sm font-medium text-[#2C2C2C]">(504) 9890-4449</p>
                             </div>
                             <div>
                                 <p className="text-[#C5A065] text-[9px] uppercase tracking-widest font-bold mb-1">WHATSAPP VENTAS</p>
                                 <p className="text-sm font-medium text-[#2C2C2C]">+504 9549-8925</p>
                             </div>
                             <div>
                                 <p className="text-[#C5A065] text-[9px] uppercase tracking-widest font-bold mb-1">OFICINA</p>
                                 <p className="text-xs text-[#6B665F] leading-relaxed">Danlí, El Paraíso.</p>
                             </div>
                         </div>
                       </Reveal>
                   </div>

                   {/* RIGHT: Form */}
                   <div className="lg:col-span-8 bg-white p-10 md:p-12">
                       <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
                           <div className="md:col-span-1 group">
                               <label className="block text-[#8C857E] text-[9px] font-bold uppercase tracking-widest mb-2 group-focus-within:text-[#C5A065] transition-colors">NOMBRE COMPLETO</label>
                               <input type="text" placeholder="Ej. Juan Pérez" className="w-full border-b border-gray-200 py-3 text-sm focus:outline-none focus:border-[#C5A065] transition-all bg-transparent text-[#2C2C2C]" />
                           </div>
                           <div className="md:col-span-1 group">
                               <label className="block text-[#8C857E] text-[9px] font-bold uppercase tracking-widest mb-2 group-focus-within:text-[#C5A065] transition-colors">TELÉFONO</label>
                               <input type="text" placeholder="+504..." className="w-full border-b border-gray-200 py-3 text-sm focus:outline-none focus:border-[#C5A065] transition-all bg-transparent text-[#2C2C2C]" />
                           </div>
                           <div className="md:col-span-2 group">
                               <label className="block text-[#8C857E] text-[9px] font-bold uppercase tracking-widest mb-2 group-focus-within:text-[#C5A065] transition-colors">MENSAJE</label>
                               <textarea rows={3} placeholder="Hola, me interesa..." className="w-full border-b border-gray-200 py-3 text-sm focus:outline-none focus:border-[#C5A065] transition-all bg-transparent resize-none text-[#2C2C2C]"></textarea>
                           </div>
                           <div className="md:col-span-2 mt-6 flex flex-col items-center">
                               <button type="submit" className="px-12 py-4 bg-[#C5A065] text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#2C2C2C] transition-all duration-500 shadow-md w-full md:w-auto">
                                   ENVIAR MENSAJE
                               </button>
                           </div>
                       </form>
                   </div>
               </div>
           </div>
      </section>

      {/* Footer - CORPORATE & ROBUST STYLE (Exact Clone from Home) */}
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
                <p className="text[10px] text-white/40 uppercase tracking-widest">© 2026 INMAER Real Estate. Todos los derechos reservados.</p>
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
