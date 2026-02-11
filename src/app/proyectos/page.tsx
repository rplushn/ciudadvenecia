"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'motion/react';
import { Reveal } from '@/components/motion/Reveal';

export default function Proyectos() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Navbar Logic
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Montserrat:wght@200;300;400;500;600;700&display=swap';
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

  // Parallax Hook
  const { scrollYProgress } = useScroll();
  const yRange = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <div className="bg-[#F3F0EB] text-[#2C2C2C] antialiased min-h-screen flex flex-col font-sans selection:bg-[#C5A065] selection:text-white overflow-x-hidden">
      <style jsx global>{`
        body { font-family: 'Montserrat', sans-serif; }
        h1, h2, h3, h4, h5, h6, .font-serif-display { font-family: 'Cormorant Garamond', serif; }
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
                <svg height="45" viewBox="0 0 330 80" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="block">
                    <g transform="translate(40, 40)">
                         {Array.from({ length: 24 }).map((_, i) => (
                            <line key={i} x1="0" y1="-14" x2="0" y2="-32" transform={`rotate(${i * 15})`} stroke="currentColor" strokeWidth="1.5"/>
                         ))}
                    </g>
                    <text x="85" y="50" fontFamily="Montserrat" fontSize="24" fontWeight="300" letterSpacing="0.1em">CIUDAD</text>
                    <text x="200" y="50" fontFamily="Montserrat" fontSize="24" fontWeight="700" letterSpacing="0.1em">VENECIA</text>
                </svg>
             </div>
          </Link>
          <div className="hidden lg:flex items-center gap-8 xl:gap-12">
            <div className="flex items-center gap-8">
                <Link href="/#start" className="text-white text-[11px] font-medium uppercase tracking-[0.15em] hover:text-[#C5A065] transition-colors">Inicio</Link>
                <Link href="/quienes-somos" className="text-white text-[11px] font-medium uppercase tracking-[0.15em] hover:text-[#C5A065] transition-colors">Quiénes Somos</Link>
                <Link href="/proyectos" className="text-white text-[11px] font-medium uppercase tracking-[0.15em] hover:text-[#C5A065] transition-colors">Proyectos</Link>
                <Link href="#" className="text-white text-[11px] font-medium uppercase tracking-[0.15em] hover:text-[#C5A065] transition-colors">Noticias</Link>
                <Link href="#" className="text-white text-[11px] font-medium uppercase tracking-[0.15em] hover:text-[#C5A065] transition-colors">Portal Clientes</Link>
            </div>
            <div className="h-4 w-[1px] bg-white/30"></div>
            <div className="flex items-center gap-4">
                <span className="text-white/80 text-[10px] font-medium uppercase tracking-wider hidden xl:block">Síguenos</span>
                <div className="flex gap-3">
                    <a href="#" className="text-white hover:text-[#C5A065] transition-colors">FB</a>
                    <a href="#" className="text-white hover:text-[#C5A065] transition-colors">IG</a>
                    <a href="#" className="text-white hover:text-[#C5A065] transition-colors">TK</a>
                </div>
            </div>
          </div>
          <div className="hidden lg:flex items-center">
             <Link href="#kontakt" className="border border-white/80 text-white px-8 py-3 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-[#2C2C2C] transition-all duration-300">Contáctanos</Link>
          </div>
          <button onClick={toggleMenu} className="lg:hidden text-white p-2"><span className="text-2xl">{isMobileMenuOpen ? '✕' : '☰'}</span></button>
        </div>
      </nav>

      {/* ------------------- 1. HERO: PORTFOLIO INTRO ------------------- */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-[#1A3A52]">
         <div className="absolute inset-0 opacity-40">
            <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('/homepage/casa_fachada.jpg.jpeg')" }}></div>
         </div>
         <div className="absolute inset-0 bg-gradient-to-b from-[#1A3A52]/80 to-[#1A3A52]"></div>
         <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-20">
            <Reveal>
              <span className="text-[#C5A065] text-xs font-bold uppercase tracking-[0.4em] mb-6 block">Portafolio Inmobiliario</span>
              <h1 className="font-serif-display text-5xl md:text-8xl text-white mb-8 leading-none">
                Construyendo <br/><span className="italic font-light text-white/50">Legado</span>
              </h1>
              <p className="text-white/70 text-sm md:text-lg font-light leading-relaxed max-w-2xl mx-auto">
                Más que terrenos y casas, desarrollamos ecosistemas de vida con plusvalía garantizada. Desde complejos residenciales hasta centros comerciales de alto nivel.
              </p>
            </Reveal>
         </div>
      </section>

      {/* ------------------- 2. FLAGSHIP: CIUDAD VENECIA ------------------- */}
      <section className="py-32 px-6">
         <div className="max-w-[1500px] mx-auto grid lg:grid-cols-2 gap-20 items-center">
             <div className="relative">
                 <Reveal>
                   <div className="aspect-[4/3] bg-gray-200 shadow-2xl relative z-10 overflow-hidden">
                       <img src="/amenidades/amenidades_parque_central.jpg.jpeg" alt="Ciudad Venecia" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"/>
                       <div className="absolute top-6 left-6 bg-[#1A3A52] text-white px-4 py-2 text-[10px] font-bold uppercase tracking-widest">Proyecto Insignia</div>
                   </div>
                 </Reveal>
                 <div className="absolute -bottom-10 -right-10 w-2/3 aspect-video bg-[#C5A065] z-0 hidden md:block"></div>
             </div>
             <div>
                 <Reveal delay={0.2}>
                   <div className="flex items-center gap-4 mb-4">
                      <span className="h-[1px] w-12 bg-[#C5A065]"></span>
                      <span className="text-[#C5A065] text-xs font-bold uppercase tracking-widest">Danlí, El Paraíso</span>
                   </div>
                   <h2 className="font-serif-display text-5xl md:text-6xl text-[#2C2C2C] mb-6">Ciudad Venecia</h2>
                   <p className="text-[#6B665F] text-lg leading-relaxed mb-8 font-light">
                      El referente inmobiliario de la zona oriental. Un complejo consolidado con más de 3 etapas, diseñado para familias que buscan seguridad, estatus y un entorno natural inigualable.
                   </p>
                   <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                      {['Seguridad 24/7', 'Áreas Verdes', 'Canchas Padel', 'Agua Propia'].map((feat, i) => (
                          <div key={i} className="bg-white border border-gray-100 p-4 text-center hover:border-[#C5A065] transition-colors">
                              <div className="text-[#C5A065] text-xl mb-2">✦</div>
                              <span className="text-[#2C2C2C] text-[10px] font-bold uppercase tracking-wide">{feat}</span>
                          </div>
                      ))}
                   </div>
                   <Link href="#" className="bg-[#1A3A52] text-white px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#C5A065] transition-all">
                       Cotizar Lote o Casa
                   </Link>
                 </Reveal>
             </div>
         </div>
      </section>

      {/* ------------------- 3. COMMERCIAL: HILL'S CITY ------------------- */}
      <section className="py-32 px-6 bg-[#1A1A1A] text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-[#252525] skew-x-12 transform translate-x-20"></div>
          <div className="max-w-[1500px] mx-auto relative z-10 grid lg:grid-cols-2 gap-20 items-center">
              <div className="order-2 lg:order-1">
                  <Reveal>
                    <span className="text-[#C5A065] text-xs font-bold uppercase tracking-widest mb-2 block">Centro de Danlí</span>
                    <h2 className="font-serif-display text-5xl md:text-7xl mb-6">Hill's City</h2>
                    <p className="text-gray-400 text-lg leading-relaxed mb-10 font-light max-w-lg">
                       La solución definitiva para el comercio y estacionamiento. 7 manzanas de desarrollo mixto que albergan bancos, franquicias, hospital y el centro de negocios más moderno de la ciudad.
                    </p>
                    <div className="flex gap-8 mb-12 border-t border-white/10 pt-8">
                        <div><span className="block text-3xl font-serif-display text-white mb-1">Locales</span><span className="text-[10px] uppercase text-gray-500 tracking-widest">Comerciales</span></div>
                        <div><span className="block text-3xl font-serif-display text-white mb-1">Parqueos</span><span className="text-[10px] uppercase text-gray-500 tracking-widest">Seguros</span></div>
                        <div><span className="block text-3xl font-serif-display text-white mb-1">Hospital</span><span className="text-[10px] uppercase text-gray-500 tracking-widest">Zona Médica</span></div>
                    </div>
                    <Link href="#" className="border border-white/30 text-white px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all">
                        Inversión Comercial
                    </Link>
                  </Reveal>
              </div>
              <div className="order-1 lg:order-2">
                  <Reveal delay={0.2}>
                    <div className="relative aspect-video bg-black overflow-hidden shadow-2xl border border-white/10 group">
                        <img src="/homepage/portal_ai-ciudad_venecia.jpeg" alt="Hill's City Render" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700 grayscale group-hover:grayscale-0"/>
                        <div className="absolute bottom-0 right-0 bg-[#C5A065] text-black px-6 py-4">
                            <span className="block text-3xl font-bold">7</span>
                            <span className="text-[10px] uppercase font-bold tracking-widest">Manzanas</span>
                        </div>
                    </div>
                  </Reveal>
              </div>
          </div>
      </section>

      {/* ------------------- 4. PREMIUM: OLANCHO ------------------- */}
      <section className="py-32 px-6 bg-white">
          <div className="max-w-[1600px] mx-auto">
             <div className="relative h-[60vh] overflow-hidden mb-20 group">
                 <img src="/amenidades/amenidades_club.jpg.jpeg" alt="Olancho Premium Interior" className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"/>
                 <div className="absolute inset-0 bg-black/20"></div>
                 <div className="absolute inset-0 flex items-center justify-center">
                     <Reveal>
                        <h2 className="font-serif-display text-6xl md:text-9xl text-white drop-shadow-lg text-center">
                            ESTILO DE VIDA<br/><span className="italic font-light">PREMIUM</span>
                        </h2>
                     </Reveal>
                 </div>
             </div>
             <div className="grid lg:grid-cols-12 gap-12">
                 <div className="lg:col-span-5">
                      <Reveal>
                        <div className="bg-[#F9F7F4] p-12 h-full flex flex-col justify-center">
                             <img src="/amenidades/amenidades_piscina002.jpeg" alt="Pool Area" className="w-full aspect-square object-cover mb-6 shadow-lg grayscale hover:grayscale-0 transition-all duration-500"/>
                             <span className="text-[10px] font-bold uppercase tracking-widest text-[#C5A065]">Casa Club</span>
                             <h4 className="font-serif-display text-2xl text-[#2C2C2C] mt-2">Piscina, Gym & Arcade incluidos</h4>
                        </div>
                      </Reveal>
                 </div>
                 <div className="lg:col-span-7 flex flex-col justify-center pl-0 lg:pl-12">
                      <Reveal delay={0.2}>
                         <span className="text-[#C5A065] text-xs font-bold uppercase tracking-widest mb-4 block">Valle de Lepaguare</span>
                         <h2 className="font-serif-display text-5xl md:text-6xl text-[#2C2C2C] mb-6">Olancho Premium</h2>
                         <p className="text-[#6B665F] text-lg leading-relaxed mb-8">
                             El primer desarrollo "Resort Living" de la región. No solo compras un terreno, accedes a un estilo de vida con amenidades nunca antes vistas en Olancho. Aplicando años de experiencia para crear el proyecto más ambicioso hasta la fecha.
                         </p>
                         <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                             {['Casa Club completa con Restaurante', 'Piscina semi-olímpica y de niños', 'Gimnasio equipado y Salón Arcade', 'Canchas Polideportivas'].map((item, i) => (
                                 <li key={i} className="flex items-center gap-3 text-sm text-[#484848]">
                                     <span className="w-2 h-2 bg-[#C5A065] rounded-full"></span> {item}
                                 </li>
                             ))}
                         </ul>
                         <button className="border-b-2 border-[#2C2C2C] text-[#2C2C2C] pb-1 font-bold uppercase tracking-[0.2em] hover:text-[#C5A065] hover:border-[#C5A065] transition-colors w-max">
                             Ver Master Plan
                         </button>
                      </Reveal>
                 </div>
             </div>
          </div>
      </section>

      {/* ------------------- 5. TEGUCIGALPA & MORE ------------------- */}
      <section className="py-24 px-6 bg-[#F3F0EB] text-center">
          <div className="max-w-4xl mx-auto">
             <Reveal>
               <span className="bg-[#C5A065] text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full mb-6 inline-block">Próximamente</span>
               <h2 className="font-serif-display text-5xl md:text-7xl text-[#2C2C2C] mb-6">
                   Ciudad Valencia <span className="italic text-[#C5A065]">Tegucigalpa</span>
               </h2>
               <p className="text-[#6B665F] text-lg mb-10 max-w-2xl mx-auto">
                   La capital está por recibir el estándar de calidad INMAER. Regístrate en la lista de espera para precios de Pre-Venta exclusiva.
               </p>
             </Reveal>
          </div>
      </section>

      {/* ------------------- 6. MORE PROJECTS (Grid) ------------------- */}
      <section className="py-24 px-6 bg-white">
           <div className="max-w-[1400px] mx-auto">
               <div className="text-center mb-16">
                   <h2 className="font-serif-display text-3xl text-[#2C2C2C] uppercase tracking-widest">Más Desarrollos</h2>
               </div>
               <div className="grid md:grid-cols-3 gap-8">
                   <Reveal>
                       <div className="group relative aspect-video overflow-hidden cursor-pointer">
                           <img src="/homepage/casa_fachada.jpg.jpeg" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
                           <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
                               <span className="text-[#C5A065] text-[10px] font-bold uppercase tracking-widest mb-1">Danlí, El Paraíso</span>
                               <h3 className="text-white font-serif-display text-2xl">Residencial Versalles</h3>
                           </div>
                       </div>
                   </Reveal>
                   <Reveal delay={0.1}>
                       <div className="group relative aspect-video overflow-hidden cursor-pointer">
                           <img src="/homepage/portal_ai-ciudad_venecia.jpeg" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
                           <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
                               <span className="text-[#C5A065] text-[10px] font-bold uppercase tracking-widest mb-1">San Lorenzo (Playa)</span>
                               <h3 className="text-white font-serif-display text-2xl">Ciudad Venecia Valle</h3>
                           </div>
                       </div>
                   </Reveal>
                   <Reveal delay={0.2}>
                       <div className="group relative aspect-video overflow-hidden cursor-pointer">
                           <img src="/homepage/outdoor2.jpg.jpeg" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
                           <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
                               <span className="text-[#C5A065] text-[10px] font-bold uppercase tracking-widest mb-1">Talanga (Nuevo)</span>
                               <h3 className="text-white font-serif-display text-2xl">CV Raíces</h3>
                           </div>
                       </div>
                   </Reveal>
               </div>
           </div>
      </section>

      {/* ------------------- 7. NEW UNIQUE CTA: CONCIERGE (No Duplicate Form) ------------------- */}
      <section className="py-24 px-6 bg-[#2C2C2C] text-white border-t border-white/10">
          <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-16 items-center">
             <div className="order-2 md:order-1">
                <Reveal>
                    <span className="text-[#C5A065] text-[10px] font-bold uppercase tracking-[0.3em] mb-4 block">SERVICIO EXCLUSIVO</span>
                    <h2 className="font-serif-display text-4xl md:text-5xl mb-6">Concierge Inmobiliario</h2>
                    <p className="text-white/60 text-lg leading-relaxed mb-8 font-light">
                        Sabemos que invertir es una decisión importante. Por eso, no te enviamos un PDF genérico. Te asignamos un asesor senior para un recorrido privado y una proyección financiera personalizada.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link href="#kontakt" className="bg-[#C5A065] text-white px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-[#2C2C2C] transition-all text-center">
                            Agendar Cita Privada
                        </Link>
                        <Link href="#" className="border border-white/30 text-white px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-[#2C2C2C] transition-all text-center">
                            Descargar Brochure
                        </Link>
                    </div>
                </Reveal>
             </div>
             <div className="order-1 md:order-2">
                <Reveal delay={0.2}>
                    <div className="aspect-[4/5] bg-[#1A1A1A] relative overflow-hidden p-2 border border-white/5 shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700">
                        <img src="/homepage/versalles_outdoor.jpg.jpeg" alt="Concierge Service" className="w-full h-full object-cover opacity-80"/>
                        <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-md p-6 border border-white/10">
                             <h4 className="font-serif-display text-2xl mb-1">Experiencia VIP</h4>
                             <p className="text-[10px] uppercase tracking-widest">Solo con cita previa</p>
                        </div>
                    </div>
                </Reveal>
             </div>
          </div>
      </section>

      {/* Footer - CORPORATE & ROBUST STYLE (Exact Clone) */}
      <footer className="bg-[#1A3A52] text-white pt-24 pb-12 border-t border-[#C5A065]/20 relative overflow-hidden">
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
                <div className="space-y-6">
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
                     <p className="text-white/60 text-xs font-light leading-relaxed max-w-xs">Desarrollos inmobiliarios pensados para la eternidad. Un proyecto respaldado por la solidez y visión de INMAER.</p>
                </div>
                <div>
                    <h4 className="text-[#C5A065] text-[10px] font-bold uppercase tracking-[0.25em] mb-8">Proyectos</h4>
                    <ul className="space-y-4">
                        <li><Link href="#" className="text-sm font-medium hover:text-[#C5A065] transition-colors">Ciudad Venecia Danlí</Link></li>
                        <li><Link href="#" className="text-sm font-medium hover:text-[#C5A065] transition-colors">Ciudad Venecia Olancho</Link></li>
                        <li><Link href="#" className="text-sm font-medium hover:text-[#C5A065] transition-colors">Ciudad Venecia Valle</Link></li>
                        <li><Link href="#" className="text-sm font-medium hover:text-[#C5A065] transition-colors">Residencial Versalles</Link></li>
                    </ul>
                </div>
                <div>
                     <h4 className="text-[#C5A065] text-[10px] font-bold uppercase tracking-[0.25em] mb-8">Oficina Corporativa</h4>
                     <p className="text-sm font-medium mb-1">Col. El Zarzal, Edificio INMAER</p>
                     <p className="text-white/60 text-xs mb-6">Danlí, El Paraíso, Honduras</p>
                     <p className="text-white/60 text-[10px] uppercase tracking-wider mb-1">Llámanos</p>
                     <p className="text-lg font-serif-display text-white">(504) 9890-4449</p>
                </div>
                <div>
                    <h4 className="text-[#C5A065] text-[10px] font-bold uppercase tracking-[0.25em] mb-8">Mantente Informado</h4>
                    <p className="text-white/60 text-xs mb-6">Recibe actualizaciones sobre nuevos lanzamientos y precios especiales.</p>
                    <div className="flex border-b border-white/20 pb-2">
                        <input type="email" placeholder="Tu correo electrónico" className="bg-transparent border-none text-white text-sm w-full focus:outline-none placeholder:text-white/30"/>
                        <button className="text-[#C5A065] text-xs font-bold uppercase hover:text-white transition-colors">Suscribir</button>
                    </div>
                </div>
            </div>
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
