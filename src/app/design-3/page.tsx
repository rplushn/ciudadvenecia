"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Design3Page() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  
  // Smart Navbar State
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determine if at top (first 100px)
      if (currentScrollY < 100) {
        setIsAtTop(true);
        setIsVisible(true);
      } else {
        setIsAtTop(false);
        
        // Hide on scroll down (if passed hero threshold ~300px), Show on scroll up
        if (currentScrollY > 300) {
             if (currentScrollY > lastScrollY) {
               setIsVisible(false); // Scrolling DOWN
             } else {
               setIsVisible(true);  // Scrolling UP
             }
        } else {
            setIsVisible(true); // Always visible in upper hero area
        }
      }

      setLastScrollY(currentScrollY);
      
      // Active section logic
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

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isMobileMenuOpen]);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="bg-white text-slate-600 antialiased selection:bg-emerald-100 selection:text-emerald-900 relative font-sans" style={{ fontFamily: "'Inter', sans-serif" }}>
      
      {/* Smart Navbar */}
      <nav 
        id="navbar"
        className={`fixed left-0 right-0 z-50 transition-all duration-500 ease-in-out transform ${
            isVisible ? 'translate-y-0' : '-translate-y-full'
        } ${
            isAtTop 
            ? 'bg-transparent border-transparent py-6' 
            : 'bg-slate-900/60 backdrop-blur-md border-b border-white/5 py-4 shadow-lg'
        }`}
      >
        <div className="flex max-w-7xl mx-auto px-6 items-center justify-between">
          <Link href="#start" className="flex items-center gap-3 group relative">
            <div className="flex items-center">
              <div className="flex gap-2 items-center">
                <span className={`uppercase text-sm font-medium tracking-widest transition-colors ${isAtTop ? 'text-white' : 'text-white'}`}>Ciudad Venecia</span>
                <span className="text-xs text-slate-400">|</span>
                <span className={`uppercase text-xs font-medium tracking-widest transition-colors ${isAtTop ? 'text-slate-300' : 'text-slate-300'}`}>by INMAER</span>
              </div>
            </div>
          </Link>
          <div className="hidden lg:flex items-center gap-8">
            {['Inicio', 'Nosotros', 'Proyectos', 'Amenidades', 'Contacto'].map((item, i) => {
              const href = ['#start', '#nosotros', '#proyectos', '#amenidades', '#kontakt'][i];
              const section = href.substring(1);
              return (
                <Link key={section} href={href} className={`text-sm transition-all hover:text-emerald-400 ${activeSection === section ? 'text-white font-medium' : 'text-slate-300'}`}>
                  {item}
                </Link>
              );
            })}
          </div>
          <button onClick={toggleMenu} className="lg:hidden p-2 relative focus:outline-none text-white">
            <span className="sr-only">Abrir menú</span>
            <span className="text-2xl">{isMobileMenuOpen ? '✕' : '☰'}</span>
          </button>
        </div>
        
        {/* Mobile Menu */}
        <div className={`fixed inset-0 bg-slate-900 z-40 transform transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1) lg:hidden flex flex-col items-center justify-center space-y-8 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          {['Inicio', 'Nosotros', 'Proyectos', 'Amenidades', 'Contacto'].map((item, i) => (
             <Link key={i} href={['#start', '#nosotros', '#proyectos', '#amenidades', '#kontakt'][i]} onClick={toggleMenu} className="text-3xl font-light text-white hover:text-emerald-400 transition-colors tracking-tight">
                {item}
             </Link>
          ))}
        </div>
      </nav>

      {/* 1. HERO SECTION */}
      <section className="relative h-screen min-h-[700px] w-full overflow-hidden" id="start">
        <div className="absolute inset-0 z-0">
          <img src="/homepage/outdoor2.jpg.jpeg" alt="Residencial Ciudad Venecia" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-slate-900/40"></div>
        </div>
        <div className="relative z-10 h-full flex items-center">
          <div className="w-full max-w-7xl mx-auto px-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-medium text-white backdrop-blur-md shadow-sm mb-8">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.6)]"></span>
                Inmobiliaria INMAER
              </div>
              <h1 className="text-4xl md:text-6xl leading-[1.1] font-medium text-white tracking-tight mb-6">
                Cumpliendo tus sueños de tener vivienda propia.
              </h1>
              <p className="text-lg leading-relaxed font-extralight text-slate-100 max-w-2xl mb-10">
                Desde Danlí hasta Olancho, desarrollamos comunidades planificadas con seguridad, plusvalía y financiamiento directo. Más de 10 años construyendo futuro.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                <Link href="#proyectos" className="w-full sm:w-auto px-6 py-3.5 bg-white text-slate-900 text-sm font-medium rounded hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 shadow-lg hover:shadow-xl">
                  Ver Proyectos <span>→</span>
                </Link>
                <Link href="#kontakt" className="w-full sm:w-auto px-6 py-3.5 bg-white/5 border border-white/20 text-white text-sm font-medium rounded hover:bg-white/10 transition-colors backdrop-blur-sm shadow-sm">
                  Cotizar Terreno
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS BAR (PARALLAX con overlay slate azulado) */}
      <section className="relative py-16 bg-fixed bg-center bg-cover" style={{ backgroundImage: "url('/homepage/versalles_outdoor.jpg.jpeg')" }}>
        <div className="absolute inset-0 bg-slate-800/85"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center text-white">
          <div className="mb-10">
             {/* Minimalist Icon: Square */}
             <div className="w-12 h-12 mx-auto bg-white/10 rounded flex items-center justify-center mb-4">
               <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                 <rect x="3" y="3" width="7" height="7" rx="1" />
                 <rect x="14" y="3" width="7" height="7" rx="1" />
                 <rect x="14" y="14" width="7" height="7" rx="1" />
                 <rect x="3" y="14" width="7" height="7" rx="1" />
               </svg>
             </div>
             <h2 className="text-2xl md:text-3xl font-medium tracking-tight mb-2">CONSTRUYENDO TU FUTURO</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-white/10 pt-10">
            <div className="p-4">
              <p className="text-4xl font-semibold mb-2">4</p>
              <p className="text-xs uppercase tracking-widest text-slate-300">Departamentos con Presencia</p>
            </div>
            <div className="p-4 border-t md:border-t-0 md:border-l border-white/10">
              <p className="text-4xl font-semibold mb-2">L 2,500</p>
              <p className="text-xs uppercase tracking-widest text-slate-300">Primas desde (Lempiras)</p>
            </div>
            <div className="p-4 border-t md:border-t-0 md:border-l border-white/10">
              <p className="text-4xl font-semibold mb-2">100%</p>
              <p className="text-xs uppercase tracking-widest text-slate-300">Financiamiento Directo</p>
            </div>
          </div>
          <p className="mt-10 text-slate-200/80 text-sm font-light max-w-2xl mx-auto">
            El Paraíso, Valle, Olancho y Francisco Morazán. Ciudad Venecia crece contigo ofreciendo seguridad jurídica y urbanización real.
          </p>
        </div>
      </section>

      {/* 3. ABOUT TRAJECTORY */}
      <section id="nosotros" className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-4">Acerca de INMAER</p>
          <h2 className="text-4xl md:text-5xl font-medium text-slate-900 tracking-tight mb-2">
            Pioneros en Desarrollo
          </h2>
          <p className="text-3xl font-serif italic text-slate-400 mb-8">de la zona oriental</p>
          <p className="text-slate-500 text-lg leading-relaxed font-light mb-8">
            Nacimos en Danlí con una visión clara: urbanización accesible y digna. Comenzamos con Residencial El Sauce y Ciudad Venecia, y hoy somos referentes con proyectos en Talanga, San Lorenzo y Olancho.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
             <div className="p-6 bg-slate-50 rounded">
                <h4 className="font-bold text-slate-900 mb-2">Misión</h4>
                <p className="text-sm text-slate-500">Crear espacios donde las familias hondureñas puedan vivir mejor, en entornos seguros y agradables.</p>
             </div>
             <div className="p-6 bg-slate-50 rounded">
                <h4 className="font-bold text-slate-900 mb-2">Visión</h4>
                <p className="text-sm text-slate-500">Ser líderes nacionales expandiendo la marca Ciudad Venecia con proyectos de alta plusvalía.</p>
             </div>
             <div className="p-6 bg-slate-50 rounded">
                <h4 className="font-bold text-slate-900 mb-2">Valores</h4>
                <p className="text-sm text-slate-500">Compromiso, Integridad, Calidad constructiva y Trabajo en equipo.</p>
             </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED PROJECT 1 (Danlí - Insignia) */}
      <section id="proyectos" className="py-12 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="w-full lg:w-1/3 order-2 lg:order-1">
              <div className="mb-2 flex items-center gap-2">
                 <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                 <span className="text-slate-500 text-xs font-bold uppercase tracking-widest block">Proyecto Insignia</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-2">Ciudad Venecia Danlí</h3>
              <p className="text-slate-400 text-sm mb-6">Salida a El Paraíso, cerca de UNAH-TEC</p>
              
              <ul className="space-y-3 mb-8 text-slate-600 font-light">
                 <li className="flex gap-3"><span className="text-emerald-500">✓</span> Terrenos de 10x15 metros (150 m²)</li>
                 <li className="flex gap-3"><span className="text-emerald-500">✓</span> Agua potable propia 24/7 y vigilancia</li>
                 <li className="flex gap-3"><span className="text-emerald-500">✓</span> Topografía plana y áreas verdes</li>
                 <li className="flex gap-3"><span className="text-emerald-500">✓</span> Financiamiento bancario disponible para casa</li>
              </ul>
              
              <Link href="#kontakt" className="inline-block px-8 py-3 bg-slate-900 text-white text-xs font-bold uppercase tracking-widest rounded hover:bg-slate-800 transition-colors">
                Ver Masterplan
              </Link>
            </div>
            <div className="w-full lg:w-2/3 order-1 lg:order-2">
              <div className="aspect-[16/10] rounded overflow-hidden shadow-2xl relative">
                <img src="/homepage/casa_fachada.jpg.jpeg" alt="Ciudad Venecia Danlí" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-4 py-2 rounded text-xs font-bold text-slate-900 shadow-sm">
                   3ra Etapa en Desarrollo
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PARALLAX BREAK 1 */}
      <section className="relative py-32 bg-fixed bg-center bg-cover" style={{ backgroundImage: "url('/homepage/patio_asador.jpg.jpeg')" }}>
        <div className="absolute inset-0 bg-slate-900/60"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-4">Tu Patrimonio Seguro</h2>
          <p className="text-xl text-slate-200 font-light">Escrituración inmediata y respaldo legal garantizado.</p>
        </div>
      </section>

      {/* 6. FEATURED PROJECT 2 (Olancho - Premium) */}
      <section className="py-24 px-6 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="w-full lg:w-2/3">
              <div className="aspect-[16/10] rounded overflow-hidden shadow-2xl">
                <img src="/amenidades/amenidades_club.jpg.jpeg" alt="Ciudad Venecia Olancho" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
            </div>
            <div className="w-full lg:w-1/3">
              <div className="mb-2 flex items-center gap-2">
                 <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
                 <span className="text-slate-500 text-xs font-bold uppercase tracking-widest block">Premium Level</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-2">Ciudad Venecia Olancho</h3>
              <p className="text-slate-400 text-sm mb-6">Valle de Lepaguare (Juticalpa - Campamento)</p>
              
              <p className="text-slate-500 font-light mb-6 leading-relaxed">
                Redefiniendo el estilo de vida con amenidades exclusivas: Casa Club, piscina, gimnasio, canchas deportivas y restaurante.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                 <div className="bg-slate-50 p-3 rounded border border-slate-100 text-center">
                    <span className="block font-bold text-slate-900">Premium</span>
                    <span className="text-[10px] uppercase text-slate-500">Concepto</span>
                 </div>
                 <div className="bg-slate-50 p-3 rounded border border-slate-100 text-center">
                    <span className="block font-bold text-slate-900">Estándar</span>
                    <span className="text-[10px] uppercase text-slate-500">Concepto</span>
                 </div>
              </div>

              <Link href="#kontakt" className="inline-block px-8 py-3 border border-slate-900 text-slate-900 text-xs font-bold uppercase tracking-widest rounded hover:bg-slate-50 transition-colors">
                Ver Amenidades
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. NATIONAL PORTFOLIO GRID */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold text-slate-900 mb-4">Portafolio Nacional</h2>
            <p className="text-slate-500 font-light">Explora nuestras opciones de inversión en diferentes departamentos.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { 
                title: 'Ciudad Venecia Valle', 
                loc: 'San Lorenzo, Valle',
                desc: 'A 10 min de la playa. Lotes urbanizados.',
                img: '/homepage/san_lorenzo.jpg.jpeg' 
              },
              { 
                title: 'CV Raíces Talanga', 
                loc: 'Talanga, F.M.',
                desc: 'Nuevo 2026. Cuotas desde L 900.',
                img: '/homepage/casa_patio.jpeg' 
              },
              { 
                title: "Hills City", 
                loc: 'Danlí Centro',
                desc: 'Distrito Comercial. Locales y parqueo.',
                img: '/amenidades/amenidades_padel.jpg' 
              },
              { 
                title: 'Residencial Versalles', 
                loc: 'Danlí (Salida Panamericana)',
                desc: 'Exclusivo. Lotes de 12x20m.',
                img: '/homepage/cocina.jpg.jpeg' 
              },
              { 
                title: 'Residencial Palmanova', 
                loc: 'Danlí',
                desc: 'Ubicación privilegiada y topografía.',
                img: '/homepage/sala_comedor.jpg.jpeg' 
              }
            ].map((item, i) => (
              <div key={i} className="group relative aspect-[4/3] rounded overflow-hidden cursor-pointer bg-slate-900">
                <img src={item.img} alt={item.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-1">{item.loc}</p>
                  <h4 className="text-white font-medium text-xl mb-2">{item.title}</h4>
                  <p className="text-slate-300 text-sm font-light opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">{item.desc}</p>
                </div>
              </div>
            ))}
            {/* Call to Action Card */}
            <div className="flex flex-col items-center justify-center bg-slate-900 rounded p-8 text-center border border-slate-800">
               <h4 className="text-white font-medium text-lg mb-4">¿Buscas invertir?</h4>
               <p className="text-slate-400 text-sm mb-6">Tenemos opciones desde L 900 mensuales en nuestro nuevo proyecto Raíces.</p>
               <Link href="#kontakt" className="px-6 py-2 bg-white text-slate-900 text-xs font-bold uppercase rounded hover:bg-slate-200 transition-colors">
                  Ver Opciones
               </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 8. SERVICES & CONSTRUCTION */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
           <div className="text-center mb-16">
              <span className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-4 block">Servicios Integrales</span>
              <h2 className="text-3xl font-semibold text-slate-900">Más que lotes, construimos hogares</h2>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 border border-slate-100 rounded hover:shadow-lg transition-shadow">
                 <div className="w-12 h-12 bg-slate-50 rounded flex items-center justify-center mb-6 text-slate-900">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                 </div>
                 <h3 className="font-bold text-lg text-slate-900 mb-3">Venta de Terrenos</h3>
                 <p className="text-slate-500 text-sm leading-relaxed">
                    Lotes urbanizados con todos los servicios básicos (agua, luz, alcantarillado) listos para construir. Financiamiento directo con aprobación inmediata.
                 </p>
              </div>
              <div className="p-8 border border-slate-100 rounded hover:shadow-lg transition-shadow">
                 <div className="w-12 h-12 bg-slate-50 rounded flex items-center justify-center mb-6 text-slate-900">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                 </div>
                 <h3 className="font-bold text-lg text-slate-900 mb-3">Construcción de Viviendas</h3>
                 <p className="text-slate-500 text-sm leading-relaxed">
                    Casas de 2 y 3 habitaciones con finos acabados. Modelos adaptados a tu gusto y presupuesto. Construcción de calidad garantizada (3,500 PSI).
                 </p>
              </div>
              <div className="p-8 border border-slate-100 rounded hover:shadow-lg transition-shadow">
                 <div className="w-12 h-12 bg-slate-50 rounded flex items-center justify-center mb-6 text-slate-900">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                 </div>
                 <h3 className="font-bold text-lg text-slate-900 mb-3">Gestión Bancaria</h3>
                 <p className="text-slate-500 text-sm leading-relaxed">
                    Te asesoramos con el trámite bancario (Banco Atlántida) para la construcción de tu casa. Precalificación y acompañamiento completo.
                 </p>
              </div>
           </div>
        </div>
      </section>

      {/* 9. PARALLAX BREAK 2 (VIDA EN ARMONÍA) */}
      <section className="relative py-40 bg-fixed bg-center bg-cover" style={{ backgroundImage: "url('/amenidades/amenidades_piscina002.jpeg')" }}>
        <div className="absolute inset-0 bg-slate-900/50"></div>
        <div className="relative z-10 text-center text-white px-6">
          <p className="text-xs font-bold uppercase tracking-[0.3em] mb-4">Experiencia Premium</p>
          <h2 className="text-5xl md:text-[55px] font-medium tracking-tight">Vida en Armonía</h2>
        </div>
      </section>

      {/* 10. FINANCING DETAILS */}
      <section className="py-24 px-6 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="w-full lg:w-1/2">
             <span className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-4 block">Financiamiento Accesible</span>
             <h2 className="text-3xl md:text-4xl font-medium mb-6">Tu casa, a tu ritmo</h2>
             <p className="text-slate-400 font-light mb-8 leading-relaxed">
               Entendemos que cada familia es diferente. Por eso ofrecemos planes flexibles para que dejes de alquilar e inviertas en lo propio.
             </p>
             
             <div className="space-y-6">
                <div className="flex gap-4 items-start">
                   <div className="w-12 h-12 bg-emerald-500/10 rounded flex items-center justify-center shrink-0 border border-emerald-500/20">
                      <span className="text-emerald-400 font-bold">1</span>
                   </div>
                   <div>
                      <h4 className="font-medium text-lg text-white">Financiamiento Directo (Terrenos)</h4>
                      <p className="text-slate-400 text-sm mt-1">Sin trámites engorrosos. Aprobación inmediata solo con tu identidad. Primas desde L 2,500.</p>
                   </div>
                </div>
                <div className="flex gap-4 items-start">
                   <div className="w-12 h-12 bg-blue-500/10 rounded flex items-center justify-center shrink-0 border border-blue-500/20">
                      <span className="text-blue-400 font-bold">2</span>
                   </div>
                   <div>
                      <h4 className="font-bold text-lg text-white">Financiamiento Bancario (Casas)</h4>
                      <p className="text-slate-400 text-sm mt-1">Trabajamos con Banco Atlántida. Te ayudamos a precalificar y armar tu carpeta.</p>
                   </div>
                </div>
             </div>

             <div className="mt-10 pt-8 border-t border-slate-800 grid grid-cols-2 gap-8">
               <div><p className="text-3xl font-bold mb-1">L 900</p><p className="text-[10px] uppercase text-slate-500">Cuotas desde (Proy. Raíces)</p></div>
               <div><p className="text-3xl font-bold mb-1">24h</p><p className="text-[10px] uppercase text-slate-500">Tiempo de Aprobación</p></div>
             </div>
          </div>
          <div className="w-full lg:w-1/2">
             <div className="bg-slate-800 rounded p-8 border border-slate-700 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10">
                  <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5 10 5 10-5-5-2.5-5 2.5z"/></svg>
               </div>
               <h3 className="text-xl font-medium mb-6">Requisitos Básicos</h3>
               <ul className="space-y-4 text-sm text-slate-300">
                  <li className="flex items-center gap-3">
                     <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                     DNI (Identidad)
                  </li>
                  <li className="flex items-center gap-3">
                     <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                     RTN Numérico
                  </li>
                  <li className="flex items-center gap-3">
                     <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                     Constancia de Trabajo (1 año antigüedad)
                  </li>
                  <li className="flex items-center gap-3">
                     <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                     Voucher de pago (último mes)
                  </li>
                  <li className="flex items-center gap-3">
                     <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                     Movimientos bancarios (últimos 6 meses)
                  </li>
               </ul>
               <div className="mt-8">
                  <Link href="#kontakt" className="block w-full text-center py-3 bg-white text-slate-900 font-bold text-xs uppercase rounded hover:bg-slate-200 transition-colors">
                     Solicitar Precalificación
                  </Link>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* 11. AMENITIES GRID (Optimized) */}
      <section id="amenidades" className="py-24 px-6 bg-slate-50">
         <div className="max-w-7xl mx-auto text-center mb-16">
            <span className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-4 block">Calidad de Vida</span>
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-2">Diseñado para tu familia</h2>
            <p className="text-slate-500 mt-4 max-w-2xl mx-auto font-light">
               Nuestros proyectos Premium en Olancho y Valle cuentan con amenidades que revalorizan tu inversión día a día.
            </p>
         </div>

         <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-[800px] md:h-[600px]">
            <div className="md:col-span-2 md:row-span-2 relative rounded overflow-hidden group">
               <img src="/amenidades/amenidades_club2.jpg.jpeg" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
               <div className="absolute bottom-6 left-6 text-white">
                 <h3 className="text-xl font-medium">Casa Club</h3>
                 <p className="text-xs text-slate-300">Espacios sociales para eventos y reuniones</p>
               </div>
            </div>
            <div className="relative rounded overflow-hidden group">
               <img src="/amenidades/amenidades_piscina001.jpeg" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
               <div className="absolute bottom-4 left-4 text-white"><h3 className="font-medium text-sm">Piscinas</h3></div>
            </div>
            <div className="relative rounded overflow-hidden group">
               <img src="/homepage/cancha_tennis.jpg.jpeg" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
               <div className="absolute bottom-4 left-4 text-white"><h3 className="font-medium text-sm">Gimnasio</h3></div>
            </div>
             <div className="relative rounded overflow-hidden group">
               <img src="/amenidades/amenidades_padel.jpg" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
               <div className="absolute bottom-4 left-4 text-white"><h3 className="font-medium text-sm">Canchas Deportivas</h3></div>
            </div>
             <div className="relative rounded overflow-hidden group">
               <img src="/amenidades/amenidades_acuatico.jpg.jpeg" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
               <div className="absolute bottom-4 left-4 text-white"><h3 className="font-medium text-sm">Áreas de Juegos</h3></div>
            </div>
         </div>
      </section>

      {/* 12. CTA / CONTACT SECTION */}
      <section id="kontakt" className="py-32 px-6 bg-white text-center">
         <div className="max-w-3xl mx-auto">
            <span className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-4 block">Contacto Oficial</span>
            <h2 className="text-4xl font-semibold text-slate-900 mb-6">Hablemos de tu futuro hogar</h2>
            <p className="text-slate-500 font-light mb-12">Estamos listos para asesorarte en Danlí, Valle, Olancho y Talanga. Sin compromiso.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
               <div className="p-6 bg-slate-50 rounded border border-slate-100"><p className="text-xs text-slate-400">✓ Atención Personalizada</p></div>
               <div className="p-6 bg-slate-50 rounded border border-slate-100"><p className="text-xs text-slate-400">✓ Visitas Guiadas</p></div>
               <div className="p-6 bg-slate-50 rounded border border-slate-100"><p className="text-xs text-slate-400">✓ Información Clara</p></div>
            </div>

            <div className="bg-slate-900 text-white p-8 rounded shadow-2xl text-left flex flex-col md:flex-row gap-8 items-center">
               <div className="w-full md:w-1/3">
                  <h3 className="font-bold text-lg mb-4">INMAER</h3>
                  <div className="space-y-4 text-sm text-slate-300">
                     <div>
                        <p className="text-xs uppercase tracking-widest text-slate-500 mb-1">Oficina Principal</p>
                        <p>Col. El Zarzal, Edif. INMAER, Danlí. (Salida a TGU)</p>
                     </div>
                     <div>
                        <p className="text-xs uppercase tracking-widest text-slate-500 mb-1">Teléfonos</p>
                        <p className="font-bold text-white text-lg">+504 9890-4449</p>
                        <p>+504 2763-3699</p>
                     </div>
                     <div>
                        <p className="text-xs uppercase tracking-widest text-slate-500 mb-1">Talanga / Raíces</p>
                        <p>+504 9630-2106</p>
                     </div>
                  </div>
               </div>
               <div className="w-full md:w-2/3 bg-white rounded p-6 text-slate-900">
                  <form className="space-y-4">
                     <div className="grid grid-cols-2 gap-4">
                        <input type="text" placeholder="Nombre Completo" className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded text-sm focus:outline-none focus:ring-1 focus:ring-slate-400" />
                        <input type="tel" placeholder="Teléfono" className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded text-sm focus:outline-none focus:ring-1 focus:ring-slate-400" />
                     </div>
                     <select className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded text-sm focus:outline-none focus:ring-1 focus:ring-slate-400 text-slate-500">
                        <option>¿Qué proyecto te interesa?</option>
                        <option>Ciudad Venecia Danlí</option>
                        <option>Ciudad Venecia Valle</option>
                        <option>Ciudad Venecia Olancho</option>
                        <option>Ciudad Venecia Raíces (Talanga)</option>
                        <option>Hills City (Comercial)</option>
                     </select>
                     <button className="w-full py-4 bg-slate-900 text-white font-bold text-xs uppercase tracking-widest rounded hover:bg-slate-800 transition-all">
                        Solicitar Información
                     </button>
                  </form>
               </div>
            </div>
         </div>
      </section>

      {/* 13. FOOTER */}
      <footer className="bg-white text-slate-600 py-16 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 text-sm">
          <div>
            <div className="flex gap-2 items-center mb-6">
               <span className="uppercase text-sm font-bold tracking-[0.2em] text-slate-900">Ciudad Venecia</span>
            </div>
            <p className="text-slate-400 leading-relaxed mb-6">"Cumpliendo tus Sueños"</p>
            <p className="text-slate-400 leading-relaxed text-xs">Desarrollos inmobiliarios pensados para el bienestar integral. Pioneros en la zona oriental y en expansión nacional.</p>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 uppercase tracking-widest text-xs mb-6">Enlaces Rápidos</h4>
            <ul className="space-y-3 text-slate-500">
               <li><a href="#start" className="hover:text-slate-900">Inicio</a></li>
               <li><a href="#nosotros" className="hover:text-slate-900">Nosotros</a></li>
               <li><a href="#proyectos" className="hover:text-slate-900">Proyectos</a></li>
               <li><a href="#amenidades" className="hover:text-slate-900">Amenidades</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 uppercase tracking-widest text-xs mb-6">Proyectos</h4>
            <ul className="space-y-3 text-slate-500">
               <li>Danlí (El Paraíso)</li>
               <li>San Lorenzo (Valle)</li>
               <li>Juticalpa/Lepaguare (Olancho)</li>
               <li>Talanga (F.M.)</li>
               <li>Hills City (Distrito Comercial)</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 uppercase tracking-widest text-xs mb-6">Contacto</h4>
            <p className="text-slate-500 mb-4">Col. El Zarzal, Edificio INMAER, contiguo a Pizza Hut.<br/>Danlí, El Paraíso, Honduras.</p>
            <p className="text-slate-900 font-bold mb-1">+504 9890-4449</p>
            <p className="text-slate-500 text-xs">Lunes a Viernes: 8:00 AM - 5:00 PM</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-slate-100 flex justify-between items-center text-xs text-slate-400">
           <p>© 2026 Inmobiliaria y Constructora INMAER. Todos los derechos reservados.</p>
           <div className="flex gap-4">
              <a href="#">Aviso Legal</a>
              <a href="#">Tu Casa Honduras</a>
           </div>
        </div>
      </footer>

    </div>
  );
}
