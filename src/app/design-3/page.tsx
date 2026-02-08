"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Design3Page() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = ['start', 'nosotros', 'proyectos', 'amenidades', 'kontakt'];
      const scrollPosition = window.scrollY + 100;

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
  }, []);

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
      
      {/* Navigation - ALWAYS VISIBLE */}
      <nav className={`fixed z-50 transition-all duration-500 w-full border-b ${
        scrolled 
          ? 'bg-white/95 border-slate-100 backdrop-blur-md shadow-sm' 
          : 'bg-white/90 border-white/20 backdrop-blur-md'
      }`} id="navbar">
        <div className="flex h-20 max-w-7xl mx-auto px-6 items-center justify-between">
          <Link href="#start" className="flex items-center gap-3 group relative">
            <div className="flex items-center">
              <div className="flex gap-2 items-center">
                <span className="uppercase text-sm font-medium tracking-widest text-slate-900">Ciudad Venecia</span>
                <span className="text-xs text-slate-400">|</span>
                <span className="uppercase text-xs font-medium tracking-widest text-slate-500">by INMAER</span>
              </div>
            </div>
          </Link>
          <div className="hidden lg:flex items-center gap-8">
            {['Inicio', 'Nosotros', 'Proyectos', 'Amenidades', 'Contacto'].map((item, i) => {
              const href = ['#start', '#nosotros', '#proyectos', '#amenidades', '#kontakt'][i];
              const section = href.substring(1);
              return (
                <Link key={section} href={href} className={`text-sm transition-all hover:text-slate-900 ${activeSection === section ? 'text-slate-900 font-medium' : 'text-slate-500'}`}>
                  {item}
                </Link>
              );
            })}
          </div>
          <button onClick={toggleMenu} className="lg:hidden p-2 relative focus:outline-none text-slate-900">
            <span className="sr-only">Abrir menú</span>
            <span className="text-2xl">{isMobileMenuOpen ? '✕' : '☰'}</span>
          </button>
        </div>
        <div className={`fixed inset-0 bg-white z-40 transform transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1) lg:hidden flex flex-col items-center justify-center space-y-8 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          {['Inicio', 'Nosotros', 'Proyectos', 'Amenidades', 'Contacto'].map((item, i) => (
             <Link key={i} href={['#start', '#nosotros', '#proyectos', '#amenidades', '#kontakt'][i]} onClick={toggleMenu} className="text-3xl font-light text-slate-900 hover:text-emerald-900 transition-colors tracking-tight">
                {item}
             </Link>
          ))}
        </div>
      </nav>

      {/* 1. HERO SECTION */}
      <section className="relative h-screen min-h-[700px] w-full overflow-hidden" id="start">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop" alt="Residencial Ciudad Venecia" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-slate-900/40"></div>
        </div>
        <div className="relative z-10 h-full flex items-center">
          <div className="w-full max-w-7xl mx-auto px-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-medium text-white backdrop-blur-md shadow-sm mb-8">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.6)]"></span>
                Desarrollo Premium
              </div>
              <h1 className="text-4xl md:text-6xl leading-[1.1] font-medium text-white tracking-tight mb-6">
                Tu patrimonio seguro en la zona de mayor crecimiento de Honduras.
              </h1>
              <p className="text-lg md:text-xl leading-relaxed font-light text-slate-100 max-w-2xl mb-10">
                Espacios residenciales de calidad, infraestructura moderna y seguridad 24/7. Ciudad Venecia combina ubicación estratégica con visión de futuro.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                <Link href="#proyectos" className="w-full sm:w-auto px-6 py-3.5 bg-white text-slate-900 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 shadow-lg hover:shadow-xl">
                  Ver Masterplan <span>→</span>
                </Link>
                <Link href="#kontakt" className="w-full sm:w-auto px-6 py-3.5 bg-white/5 border border-white/20 text-white text-sm font-medium rounded-lg hover:bg-white/10 transition-colors backdrop-blur-sm shadow-sm">
                  Agendar Visita
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS BAR (PARALLAX - Construyendo tu futuro) */}
      <section className="relative py-16 bg-fixed bg-center bg-cover" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2670')" }}>
        {/* Semi-transparent Emerald Overlay */}
        <div className="absolute inset-0 bg-emerald-900/90"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center text-white">
          <div className="mb-10">
             <div className="w-12 h-12 mx-auto bg-white/10 rounded-full flex items-center justify-center mb-4 text-2xl">🏠</div>
             <h2 className="text-2xl md:text-3xl font-medium tracking-tight mb-2">CONSTRUYENDO TU FUTURO</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-white/10 pt-10">
            <div className="p-4">
              <p className="text-4xl font-semibold mb-2">300+</p>
              <p className="text-xs uppercase tracking-widest text-emerald-200">Lotes Disponibles</p>
            </div>
            <div className="p-4 border-t md:border-t-0 md:border-l border-white/10">
              <p className="text-4xl font-semibold mb-2">24/7</p>
              <p className="text-xs uppercase tracking-widest text-emerald-200">Seguridad Privada</p>
            </div>
            <div className="p-4 border-t md:border-t-0 md:border-l border-white/10">
              <p className="text-4xl font-semibold mb-2">100%</p>
              <p className="text-xs uppercase tracking-widest text-emerald-200">Financiamiento Propio</p>
            </div>
          </div>
          <p className="mt-10 text-emerald-100/60 text-sm font-light max-w-2xl mx-auto">
            Ubicado estratégicamente en zonas de alta plusvalía, Ciudad Venecia ofrece un entorno seguro, moderno y accesible para tu familia.
          </p>
        </div>
      </section>

      {/* 3. ABOUT TRAJECTORY */}
      <section id="nosotros" className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-500 mb-4">Trayectoria INMAER</p>
          <h2 className="text-4xl md:text-5xl font-medium text-slate-900 tracking-tight mb-2">
            Desarrollando el Futuro
          </h2>
          <p className="text-3xl font-serif italic text-slate-400 mb-8">de Honduras</p>
          <p className="text-slate-500 text-lg leading-relaxed font-light">
            Desde Danlí hasta Olancho, creamos comunidades planificadas con todos los servicios, seguridad y plusvalía garantizada. Más de 1,200 familias ya viven su sueño con nosotros.
          </p>
        </div>
      </section>

      {/* 4. FEATURED PROJECT 1 (Danlí) */}
      <section id="proyectos" className="py-12 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="w-full lg:w-1/3 order-2 lg:order-1">
              <span className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-2 block">Danlí, El Paraíso</span>
              <h3 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-6">Ciudad Venecia Danlí</h3>
              <p className="text-slate-500 font-light mb-8 leading-relaxed">
                Nuestro proyecto insignia con mayor crecimiento en la zona oriental. Más de 3 etapas desarrolladas, a pocos minutos del centro y cerca de UNAH-TEC. Un ambiente fresco y familiar.
              </p>
              <Link href="#kontakt" className="inline-block px-8 py-3 bg-slate-900 text-white text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-slate-800 transition-colors">
                Ver Detalles
              </Link>
            </div>
            <div className="w-full lg:w-2/3 order-1 lg:order-2">
              <div className="aspect-[16/10] rounded-xl overflow-hidden shadow-2xl">
                <img src="https://images.unsplash.com/photo-1600596542815-e328701102b9?q=80&w=2669" alt="Ciudad Venecia Danlí" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PARALLAX BREAK 1 */}
      <section className="relative py-32 bg-fixed bg-center bg-cover" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2673')" }}>
        <div className="absolute inset-0 bg-slate-900/60"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">Tu Patrimonio Seguro</h2>
          <p className="text-xl text-slate-200 font-light">Financiamiento propio y bancario disponible.</p>
        </div>
      </section>

      {/* 6. FEATURED PROJECT 2 (Olancho) */}
      <section className="py-24 px-6 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="w-full lg:w-2/3">
              <div className="aspect-[16/10] rounded-xl overflow-hidden shadow-2xl">
                <img src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=2670" alt="Ciudad Venecia Olancho" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
            </div>
            <div className="w-full lg:w-1/3">
              <span className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-2 block">Valle de Lepaguare, Olancho</span>
              <h3 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-6">Ciudad Venecia Olancho</h3>
              <p className="text-slate-500 font-light mb-8 leading-relaxed">
                El proyecto más exclusivo "Premium Level". Casa club con piscina, gimnasio, canchas deportivas y restaurante. Redefiniendo el estilo de vida en Olancho.
              </p>
              <Link href="#kontakt" className="inline-block px-8 py-3 border border-slate-900 text-slate-900 text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-slate-50 transition-colors">
                Conocer Premium
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
              { title: 'Ciudad Venecia Valle', img: 'https://images.unsplash.com/photo-1592595896551-12b371d546d5?q=80&w=800' },
              { title: 'CV Raíces Talanga', img: 'https://images.unsplash.com/photo-1626290800844-4861bc99478e?q=80&w=800' },
              { title: "Hill's City", img: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=800' },
              { title: 'Residencial Versalles', img: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=800' },
              { title: 'Ciudad Venecia TOU', img: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=800' },
              { title: 'Palmanova', img: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=800' }
            ].map((item, i) => (
              <div key={i} className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer">
                <img src={item.img} alt={item.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
                <div className="absolute bottom-6 left-6">
                  <h4 className="text-white font-medium text-lg">{item.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. PARALLAX BREAK 2 (VIDA EN ARMONÍA) */}
      <section className="relative py-40 bg-fixed bg-center bg-cover" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2670')" }}>
        <div className="absolute inset-0 bg-slate-900/50"></div>
        <div className="relative z-10 text-center text-white px-6">
          <p className="text-xs font-bold uppercase tracking-[0.3em] mb-4">Experiencia Premium</p>
          <h2 className="text-5xl md:text-7xl font-semibold tracking-tight">VIDA EN ARMONÍA</h2>
        </div>
      </section>

      {/* 9. EXPERIENCE / SUMMARY (Dark Blue) */}
      <section className="py-24 px-6 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="w-full lg:w-1/2">
             <span className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-4 block">Experiencia Ciudad Venecia</span>
             <h2 className="text-3xl md:text-4xl font-semibold mb-6">Vivir, invertir y crecer en un mismo lugar</h2>
             <p className="text-slate-400 font-light mb-10 leading-relaxed">
               Cada proyecto combina ubicación estratégica, servicios básicos completos y opciones de financiamiento para que avances a tu ritmo, sin promesas irreales.
             </p>
             <div className="grid grid-cols-3 gap-8 border-t border-slate-800 pt-8">
               <div><p className="text-3xl font-bold mb-1">+1,200</p><p className="text-[10px] uppercase text-slate-500">Familias</p></div>
               <div><p className="text-3xl font-bold mb-1">7</p><p className="text-[10px] uppercase text-slate-500">Proyectos</p></div>
               <div><p className="text-3xl font-bold mb-1">4</p><p className="text-[10px] uppercase text-slate-500">Departamentos</p></div>
             </div>
          </div>
          <div className="w-full lg:w-1/2">
             <div className="relative rounded-xl overflow-hidden aspect-video shadow-2xl border border-slate-700">
               <img src="https://images.unsplash.com/photo-1605146769289-440113cc3d00?q=80&w=2670" alt="Experiencia" className="w-full h-full object-cover" />
               <div className="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-black/80 to-transparent w-full">
                 <p className="text-xs text-amber-500 font-bold uppercase mb-1">Portafolio INMAER</p>
                 <p className="font-medium text-white">Ciudad Venecia Danlí · Olancho · Valle</p>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* 10. PARALLAX BREAK 3 (RESPIRA FUTURO) */}
      <section className="relative py-40 bg-fixed bg-center bg-cover" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1501854140884-074bf86ee91c?q=80&w=2670')" }}>
        <div className="absolute inset-0 bg-slate-900/40"></div>
        <div className="relative z-10 text-center text-white px-6">
          <p className="text-xs font-bold uppercase tracking-[0.3em] mb-4 text-emerald-300">Naturaleza y Confort</p>
          <h2 className="text-5xl md:text-7xl font-semibold tracking-tight">RESPIRA FUTURO</h2>
        </div>
      </section>

      {/* 11. WHY CHOOSE US */}
      <section className="py-24 px-6 bg-white text-center">
        <div className="max-w-7xl mx-auto">
           <span className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-4 block">Inversión Inteligente</span>
           <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-16">¿Por qué elegir Ciudad Venecia?</h2>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
             {[
               { icon: '📈', title: 'Plusvalía Garantizada', desc: 'Ubicaciones estratégicas en zonas de alto crecimiento económico.' },
               { icon: '🛡️', title: 'Seguridad Jurídica', desc: 'Todos nuestros proyectos cuentan con escrituración inmediata.' },
               { icon: '🛣️', title: 'Urbanización Completa', desc: 'Entregamos proyectos con agua, luz, calles pavimentadas.' },
               { icon: '🤝', title: 'Respaldo INMAER', desc: 'Más de 10 años de experiencia y miles de familias satisfechas.' }
             ].map((item, i) => (
               <div key={i} className="group">
                 <div className="w-16 h-16 mx-auto bg-slate-50 rounded-xl flex items-center justify-center text-3xl mb-6 group-hover:bg-slate-900 group-hover:text-white transition-colors border border-slate-100">
                   {item.icon}
                 </div>
                 <h3 className="text-lg font-medium text-slate-900 mb-3">{item.title}</h3>
                 <p className="text-sm text-slate-500 font-light leading-relaxed">{item.desc}</p>
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* 12. AMENITIES GRID (Masonry-ish) */}
      <section id="amenidades" className="py-24 px-6 bg-slate-50">
         <div className="max-w-7xl mx-auto text-center mb-16">
            <span className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-4 block">Estilo de Vida Inigualable</span>
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-2">Más que amenidades,</h2>
            <p className="text-3xl md:text-4xl font-serif italic text-slate-400">experiencias diarias</p>
         </div>

         <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-[800px] md:h-[600px]">
            {/* Large Item */}
            <div className="md:col-span-2 md:row-span-2 relative rounded-xl overflow-hidden group">
               <img src="https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?q=80&w=2669" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
               <div className="absolute bottom-6 left-6 text-white">
                 <h3 className="text-xl font-bold">Casa Club Premium</h3>
               </div>
            </div>
            {/* Small Items */}
            <div className="relative rounded-xl overflow-hidden group">
               <img src="https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=800" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
               <div className="absolute bottom-4 left-4 text-white"><h3 className="font-bold text-sm">Piscinas Climatizadas</h3></div>
            </div>
            <div className="relative rounded-xl overflow-hidden group">
               <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
               <div className="absolute bottom-4 left-4 text-white"><h3 className="font-bold text-sm">Gimnasio al Aire Libre</h3></div>
            </div>
             <div className="relative rounded-xl overflow-hidden group">
               <img src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=800" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
               <div className="absolute bottom-4 left-4 text-white"><h3 className="font-bold text-sm">Canchas Deportivas</h3></div>
            </div>
             <div className="relative rounded-xl overflow-hidden group">
               <img src="https://images.unsplash.com/photo-1543093247-38446b28cb7b?q=80&w=800" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
               <div className="absolute bottom-4 left-4 text-white"><h3 className="font-bold text-sm">Áreas de Juegos</h3></div>
            </div>
         </div>
         <p className="text-center text-xs text-slate-400 mt-8 font-light">Y mucho más: Senderos, parques caninos, seguridad privada, agua potable propia...</p>
         <div className="text-center mt-8">
            <Link href="#kontakt" className="inline-block px-8 py-3 bg-slate-900 text-white text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-slate-800 transition-colors">
                Agendar Visita a las Amenidades
            </Link>
         </div>
      </section>

      {/* 13. CTA / CONTACT SECTION */}
      <section id="kontakt" className="py-32 px-6 bg-white text-center">
         <div className="max-w-3xl mx-auto">
            <span className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-4 block">Último Paso</span>
            <h2 className="text-4xl font-semibold text-slate-900 mb-6">¿Listo para hablar con un asesor?</h2>
            <p className="text-slate-500 font-light mb-12">Cuéntanos qué proyecto te interesa y te mostramos opciones reales de financiamiento, sin compromisos ni promesas infladas.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
               <div className="p-6 bg-slate-50 rounded-xl border border-slate-100"><p className="text-xs text-slate-400">✅ Respuesta en menos de 24 horas</p></div>
               <div className="p-6 bg-slate-50 rounded-xl border border-slate-100"><p className="text-xs text-slate-400">✅ Información clara sobre cuotas y primas</p></div>
               <div className="p-6 bg-slate-50 rounded-xl border border-slate-100"><p className="text-xs text-slate-400">✅ Acompañamiento durante todo el proceso</p></div>
            </div>

            <div className="bg-slate-900 text-white p-8 rounded-xl shadow-2xl text-left flex flex-col md:flex-row gap-8 items-center">
               <div className="w-full md:w-1/3">
                  <h3 className="font-bold text-lg mb-2">¿Prefieres hablar directo?</h3>
                  <p className="text-slate-400 text-sm mb-6">También puedes escribir o llamar a nuestro equipo comercial.</p>
                  <p className="text-xs uppercase tracking-widest text-slate-500 mb-1">Teléfono</p>
                  <p className="font-bold text-lg mb-4">+504 9888-4449</p>
                  <p className="text-xs uppercase tracking-widest text-slate-500 mb-1">Oficina</p>
                  <p className="text-sm">Col. El Zarzal, Edificio INMAER, Danlí.</p>
               </div>
               <div className="w-full md:w-2/3 bg-white rounded-lg p-6 text-slate-900">
                  <form className="space-y-4">
                     <div className="grid grid-cols-2 gap-4">
                        <input type="text" placeholder="Nombre Completo" className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-slate-400" />
                        <input type="tel" placeholder="Teléfono / WhatsApp" className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-slate-400" />
                     </div>
                     <input type="email" placeholder="Correo Electrónico" className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-slate-400" />
                     <button className="w-full py-4 bg-slate-900 text-white font-bold text-xs uppercase tracking-widest rounded-lg hover:bg-slate-800 transition-all">Enviar y hablar con un asesor</button>
                  </form>
               </div>
            </div>
         </div>
      </section>

      {/* 14. FOOTER */}
      <footer className="bg-white text-slate-600 py-16 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 text-sm">
          <div>
            <div className="flex gap-2 items-center mb-6">
               <span className="uppercase text-sm font-bold tracking-[0.2em] text-slate-900">Ciudad Venecia</span>
            </div>
            <p className="text-slate-400 leading-relaxed mb-6">"Cumpliendo tus Sueños"</p>
            <p className="text-slate-400 leading-relaxed text-xs">Desarrollos inmobiliarios pensados para el bienestar integral. Presencia en la zona oriental y en expansión nacional.</p>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 uppercase tracking-widest text-xs mb-6">Navegación</h4>
            <ul className="space-y-3 text-slate-500">
               <li><a href="#" className="hover:text-slate-900">Inicio</a></li>
               <li><a href="#" className="hover:text-slate-900">Quiénes Somos</a></li>
               <li><a href="#" className="hover:text-slate-900">Proyectos</a></li>
               <li><a href="#" className="hover:text-slate-900">Financiamiento</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 uppercase tracking-widest text-xs mb-6">Nuestros Proyectos</h4>
            <ul className="space-y-3 text-slate-500">
               <li>Ciudad Venecia Tegucigalpa</li>
               <li>Ciudad Venecia Danlí</li>
               <li>Ciudad Venecia Valle</li>
               <li>Ciudad Venecia Olancho</li>
               <li>Hill's City (Comercial)</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 uppercase tracking-widest text-xs mb-6">Oficina Principal</h4>
            <p className="text-slate-500 mb-4">Col. El Zarzal, Edificio INMAER, contiguo a Pizza Hut, salida a Tegucigalpa.<br/>Danlí, El Paraíso</p>
            <p className="text-slate-900 font-bold">(504) 9888-4449 / 2763-3699</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-slate-100 flex justify-between items-center text-xs text-slate-400">
           <p>© 2026 Inmobiliaria y Constructora INMAER. Todos los derechos reservados.</p>
           <div className="flex gap-4">
              <a href="#">Aviso Legal</a>
              <a href="#">Privacidad</a>
           </div>
        </div>
      </footer>

    </div>
  );
}
