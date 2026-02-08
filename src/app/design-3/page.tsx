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
      
      const sections = ['start', 'nosotros', 'vision', 'proyectos', 'proceso', 'kontakt'];
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
      
      {/* Navigation - Transparent to White on Scroll */}
      <nav className={`fixed z-50 transition-all duration-500 w-full border-b ${scrolled ? 'bg-white/95 border-slate-100 backdrop-blur-md py-2 shadow-sm' : 'bg-transparent border-transparent py-6'}`} id="navbar">
        <div className="flex h-16 max-w-7xl mx-auto px-6 items-center justify-between">
          
          {/* Logo */}
          <Link href="#start" className="flex items-center gap-3 group relative">
            <div className="flex items-center">
              <div className="flex gap-2 items-center">
                <span className={`uppercase text-sm font-bold tracking-[0.2em] transition-colors ${scrolled ? 'text-slate-900' : 'text-white'}`}>Ciudad Venecia</span>
                <span className={`text-xs transition-colors ${scrolled ? 'text-slate-400' : 'text-white/60'}`}>|</span>
                <span className={`uppercase text-[10px] font-medium tracking-widest transition-colors ${scrolled ? 'text-slate-500' : 'text-white/80'}`}>by INMAER</span>
              </div>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            {['Inicio', 'Nosotros', 'Visión', 'Proyectos', 'Inversión', 'Contacto'].map((item, i) => {
              const href = ['#start', '#nosotros', '#vision', '#proyectos', '#proceso', '#kontakt'][i];
              const section = href.substring(1);
              return (
                <Link 
                  key={section}
                  href={href} 
                  className={`text-xs font-medium uppercase tracking-widest transition-all hover:opacity-100 ${
                    activeSection === section 
                      ? (scrolled ? 'text-slate-900 opacity-100' : 'text-white opacity-100') 
                      : (scrolled ? 'text-slate-500 opacity-70' : 'text-white opacity-80')
                  }`}
                >
                  {item}
                </Link>
              );
            })}
          </div>

          {/* Mobile Hamburger Button */}
          <button onClick={toggleMenu} className={`lg:hidden p-2 relative focus:outline-none transition-colors ${scrolled ? 'text-slate-900' : 'text-white'}`}>
            <span className="sr-only">Abrir menú</span>
            <span className="text-2xl">{isMobileMenuOpen ? '✕' : '☰'}</span>
          </button>
        </div>

        {/* Mobile Menu Drawer */}
        <div className={`fixed inset-0 bg-white z-40 transform transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1) lg:hidden flex flex-col items-center justify-center space-y-8 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          {['Inicio', 'Nosotros', 'Visión', 'Proyectos', 'Inversión', 'Contacto'].map((item, i) => (
             <Link 
                key={i}
                href={['#start', '#nosotros', '#vision', '#proyectos', '#proceso', '#kontakt'][i]} 
                onClick={toggleMenu} 
                className="text-3xl font-light text-slate-900 hover:text-emerald-900 transition-colors tracking-tight"
              >
                {item}
             </Link>
          ))}
          <div className="absolute bottom-12 text-center">
            <p className="text-xs text-slate-400 tracking-widest uppercase">INMAER Desarrollos</p>
          </div>
        </div>
      </nav>

      {/* 1. HERO SECTION - Full Screen WOW */}
      <section className="relative h-screen min-h-[800px] w-full overflow-hidden flex items-center" id="start">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop" 
            alt="Residencial Ciudad Venecia" 
            className="h-full w-full object-cover animate-fade-in-slow"
          />
          {/* Enhanced Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/40 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
        </div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-20">
          <div className="max-w-4xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-md mb-8">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Desarrollo Premium
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium text-white tracking-tight leading-[1.1] mb-6">
              CIUDAD <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300">VENECIA</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-2xl font-light text-slate-200 max-w-2xl leading-relaxed mb-10 border-l-2 border-emerald-500 pl-6">
              Tu Patrimonio Seguro by INMAER. <br/>
              Espacios diseñados para el futuro de tu familia.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="#proyectos" className="px-8 py-4 bg-white text-slate-900 text-sm font-bold uppercase tracking-widest hover:bg-emerald-50 transition-all transform hover:-translate-y-1 shadow-lg shadow-white/10">
                Ver Masterplan
              </Link>
              <Link href="#kontakt" className="px-8 py-4 bg-transparent border border-white/30 text-white text-sm font-bold uppercase tracking-widest hover:bg-white/10 transition-all backdrop-blur-sm">
                Agendar Visita
              </Link>
            </div>
          </div>
        </div>

        {/* Floating Stats Bar - Glassmorphism */}
        <div className="absolute bottom-0 left-0 w-full border-t border-white/10 bg-slate-900/60 backdrop-blur-md hidden md:block">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="grid grid-cols-3 gap-12">
              <div className="flex items-center gap-4">
                <span className="text-4xl">🏙️</span>
                <div>
                  <p className="text-3xl font-light text-white">300+</p>
                  <p className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold">Lotes Disponibles</p>
                </div>
              </div>
              <div className="flex items-center gap-4 border-l border-white/10 pl-12">
                <span className="text-4xl">🛡️</span>
                <div>
                  <p className="text-3xl font-light text-white">24/7</p>
                  <p className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold">Seguridad Privada</p>
                </div>
              </div>
              <div className="flex items-center gap-4 border-l border-white/10 pl-12">
                <span className="text-4xl">💰</span>
                <div>
                  <p className="text-3xl font-light text-white">100%</p>
                  <p className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold">Financiamiento</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT SECTION - Robust Split Layout */}
      <section id="nosotros" className="py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            {/* Text Content */}
            <div className="w-full lg:w-1/2">
              <div className="flex items-center gap-2 mb-6">
                 <span className="h-px w-8 bg-slate-900"></span>
                 <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Sobre el Proyecto</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-medium text-slate-900 tracking-tight mb-8 leading-tight">
                Desarrollando el <span className="italic font-serif text-slate-500">Futuro</span> de la Zona Oriental.
              </h2>
              
              <p className="text-slate-600 text-lg leading-relaxed mb-10 font-light border-l border-slate-200 pl-6">
                Ciudad Venecia no es solo un desarrollo inmobiliario; es la culminación de una visión estratégica de INMAER. Ubicado en el corazón del crecimiento, ofrecemos un refugio de seguridad, modernidad y alta plusvalía.
              </p>

              <div className="space-y-8">
                 {[
                   { title: 'Alta Plusvalía', desc: 'Crecimiento de valor garantizado en zona de alto desarrollo.' },
                   { title: 'Ubicación Estratégica', desc: 'Conectividad directa con las principales vías y servicios.' },
                   { title: 'Comunidad Selecta', desc: 'Entorno diseñado para familias que valoran el estatus.' }
                 ].map((item, i) => (
                   <div key={i} className="flex gap-4 group">
                     <div className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center shrink-0 group-hover:bg-slate-900 group-hover:text-white transition-all">
                       <span className="text-lg">✓</span>
                     </div>
                     <div>
                       <h4 className="text-slate-900 font-medium text-lg mb-1">{item.title}</h4>
                       <p className="text-sm text-slate-500">{item.desc}</p>
                     </div>
                   </div>
                 ))}
              </div>
            </div>

            {/* Image Content */}
            <div className="w-full lg:w-1/2 relative">
              <div className="relative z-10 aspect-[4/5] overflow-hidden bg-slate-100">
                <img 
                  src="https://images.unsplash.com/photo-1600596542815-e328701102b9?q=80&w=2669" 
                  alt="Arquitectura Moderna" 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              {/* Decorative Elements */}
              <div className="absolute -bottom-8 -left-8 w-2/3 h-2/3 border border-slate-200 -z-0"></div>
              <div className="absolute top-10 -right-8 w-24 h-24 bg-slate-100 -z-0 pattern-dots"></div>
              
              {/* Floating Quote */}
              <div className="absolute bottom-10 -left-10 bg-white p-8 shadow-xl max-w-xs border-l-4 border-slate-900 hidden md:block">
                 <p className="font-serif italic text-slate-600">"La inversión más segura es la tierra, y el mejor momento es ahora."</p>
                 <p className="text-xs font-bold uppercase tracking-widest mt-4 text-slate-400">— INMAER</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PARALLAX / PATRIMONIO SECTION - New Addition */}
      <section className="relative py-32 bg-fixed bg-center bg-cover" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=2670')" }}>
        <div className="absolute inset-0 bg-slate-900/80"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center text-white">
          <span className="inline-block py-1 px-3 border border-white/30 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
            Líderes en la Región
          </span>
          <h2 className="text-4xl md:text-6xl font-medium tracking-tight mb-8">
            Construyendo Tu Patrimonio
          </h2>
          <p className="text-xl md:text-2xl text-slate-300 font-light max-w-3xl mx-auto mb-12">
            Más de 10 años transformando el paisaje inmobiliario de Honduras con proyectos de calidad y confianza.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-white/20 pt-12">
             <div className="text-center">
                <p className="text-5xl font-serif mb-2">10+</p>
                <p className="text-xs uppercase tracking-widest text-slate-400">Años de Experiencia</p>
             </div>
             <div className="text-center border-l border-white/10">
                <p className="text-5xl font-serif mb-2">5</p>
                <p className="text-xs uppercase tracking-widest text-slate-400">Proyectos Exitosos</p>
             </div>
             <div className="text-center border-l border-white/10">
                <p className="text-5xl font-serif mb-2">1k+</p>
                <p className="text-xs uppercase tracking-widest text-slate-400">Familias Felices</p>
             </div>
          </div>
        </div>
      </section>

      {/* 4. VISION SECTION - Enhanced Cards */}
      <section id="vision" className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-semibold text-slate-900 tracking-tight mb-4">Estilo de Vida</h2>
              <p className="text-slate-500 text-lg font-light">
                Creamos comunidades integrales donde la calidad de vida es la prioridad, combinando naturaleza y modernidad.
              </p>
            </div>
            <div className="hidden md:block h-px flex-1 bg-slate-200 ml-12 mb-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: '🌿', title: 'Entorno Natural', 
                desc: 'Amplias áreas verdes y parques recreativos.',
                img: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=800'
              },
              { 
                icon: '🛣️', title: 'Urbanismo Moderno', 
                desc: 'Calles pavimentadas y servicios subterráneos.',
                img: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=800'
              },
              { 
                icon: '👥', title: 'Comunidad Segura', 
                desc: 'Espacios de convivencia familiar con infraestructura social.',
                img: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=800'
              }
            ].map((item, i) => (
              <div key={i} className="group relative h-80 rounded-2xl overflow-hidden shadow-sm cursor-pointer">
                <img src={item.img} alt={item.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent transition-opacity group-hover:opacity-90"></div>
                
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center mb-4 text-2xl border border-white/10">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-medium text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-300 opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section - Maintained structure for now */}
      <section className="border-y bg-white border-slate-100 pt-24 pb-24" id="proyectos">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 tracking-tight mb-3">Nuestros Proyectos</h2>
              <p className="text-slate-500 max-w-xl">Descubre las ubicaciones exclusivas de Ciudad Venecia.</p>
            </div>
            <Link href="#kontakt" className="text-sm font-medium text-slate-900 flex items-center gap-1 hover:opacity-70 transition-opacity">
              Consultar disponibilidad <span>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              { 
                title: 'Ciudad Venecia Danlí', badge: 'El Paraíso', 
                desc: 'El proyecto insignia en la zona oriental. Lotes residenciales en un entorno exclusivo.',
                status: 'En Venta', type: 'Residencial',
                img: 'https://images.unsplash.com/photo-1592595896551-12b371d546d5?q=80&w=800'
              },
              { 
                title: 'Ciudad Venecia Olancho', badge: 'Juticalpa', 
                desc: 'Expansión estratégica con acceso privilegiado y diseño urbanístico de vanguardia.',
                status: 'Preventa', type: 'Eco-Residencial',
                img: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=800'
              },
              { 
                title: 'Ciudad Venecia Valle', badge: 'Zona Sur', 
                desc: 'Nuevo desarrollo en el sur del país, capitalizando el crecimiento logístico de la región.',
                status: 'Próximamente', type: 'Mixto',
                img: 'https://images.unsplash.com/photo-1626290800844-4861bc99478e?q=80&w=800'
              }
            ].map((project, i) => (
              <div key={i} className="group bg-white rounded-xl overflow-hidden border border-slate-200 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300">
                <div className="aspect-[3/4] bg-slate-200 relative overflow-hidden">
                  <img src={project.img} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" />
                  <div className="absolute top-4 right-4 z-20">
                    <span className="text-[10px] uppercase font-semibold text-slate-900 tracking-wider bg-white/90 rounded pt-1 pr-2 pb-1 pl-2 backdrop-blur shadow-sm">{project.badge}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900 tracking-tight mb-2">{project.title}</h3>
                  <p className="text-sm text-slate-500 mb-6 line-clamp-2">{project.desc}</p>
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                    <div><p className="text-xs text-slate-400 mb-1">Estado</p><p className="text-sm font-medium text-slate-900">{project.status}</p></div>
                    <div><p className="text-xs text-slate-400 mb-1">Tipo</p><p className="text-sm font-medium text-slate-900">{project.type}</p></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Process */}
      <section id="proceso" className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-slate-800 to-transparent opacity-30 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-6">Tu camino a la casa propia.</h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                Facilitamos el proceso de adquisición de tu patrimonio con planes de financiamiento flexibles y asesoría personalizada.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center shrink-0 border border-slate-700 text-xl">💰</div>
                  <div>
                    <h4 className="text-white font-medium">Financiamiento Directo</h4>
                    <p className="text-sm text-slate-400 mt-1">Planes adaptados a tu capacidad de pago sin intermediarios bancarios.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center shrink-0 border border-slate-700 text-xl">📄</div>
                  <div>
                    <h4 className="text-white font-medium">Trámites Simplificados</h4>
                    <p className="text-sm text-slate-400 mt-1">Gestión rápida y transparente de toda la documentación legal.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Process Steps */}
            <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 shadow-2xl">
              <h3 className="text-xl font-medium mb-6">Proceso de Compra</h3>
              <div className="space-y-6 relative before:absolute before:left-[15px] before:top-2 before:h-[calc(100%-20px)] before:w-[1px] before:bg-slate-600">
                {[
                  { step: 1, title: 'Visita y Selección', desc: 'Recorrido por el proyecto y elección de tu lote ideal.' },
                  { step: 2, title: 'Reserva', desc: 'Asegura tu ubicación con un pago inicial accesible.' },
                  { step: 3, title: 'Firma de Contrato', desc: 'Formalización legal de tu inversión.' },
                  { step: 4, title: 'Entrega', desc: 'Toma de posesión de tu propiedad.', highlight: true }
                ].map((item, i) => (
                  <div key={i} className="relative pl-10">
                    <span className={`absolute left-0 top-1 w-8 h-8 rounded-full border text-xs flex items-center justify-center font-bold ${
                      item.highlight 
                        ? 'bg-emerald-900 border-emerald-500 text-emerald-400' 
                        : 'bg-slate-700 border-slate-500'
                    }`}>
                      {item.step}
                    </span>
                    <h4 className={`text-sm font-medium ${item.highlight ? 'text-emerald-400' : 'text-white'}`}>{item.title}</h4>
                    <p className="text-xs text-slate-400 mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="kontakt" className="py-24 px-6 bg-white border-t border-slate-100">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-slate-900 tracking-tight mb-4">¿Listo para invertir?</h2>
            <p className="text-slate-500">Contáctanos para agendar una visita o recibir más información sobre nuestros planes de financiamiento.</p>
          </div>

          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-center gap-8 text-center text-sm text-slate-600">
              <div>
                <p className="font-medium text-slate-900 mb-1">Oficinas</p>
                <p>Honduras, C.A.</p>
              </div>
              <div>
                <p className="font-medium text-slate-900 mb-1">Contacto</p>
                <p><a href="mailto:info@inmaer.hn" className="hover:text-slate-900 transition-colors">info@inmaer.hn</a></p>
                <p><a href="tel:+50400000000" className="hover:text-slate-900 transition-colors">+504 0000 0000</a></p>
              </div>
            </div>

            <form className="bg-slate-50 p-8 rounded-2xl border border-slate-100 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="name" className="text-xs font-medium text-slate-700">Nombre Completo</label>
                  <input type="text" id="name" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-400 text-sm" />
                </div>
                <div className="space-y-1">
                  <label htmlFor="phone" className="text-xs font-medium text-slate-700">Teléfono</label>
                  <input type="tel" id="phone" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-400 text-sm" />
                </div>
              </div>
              <div className="space-y-1">
                <label htmlFor="email" className="text-xs font-medium text-slate-700">Correo Electrónico</label>
                <input type="email" id="email" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-400 text-sm" />
              </div>
              <div className="space-y-1">
                <label htmlFor="message" className="text-xs font-medium text-slate-700">Mensaje</label>
                <textarea id="message" rows={4} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-400 text-sm"></textarea>
              </div>
              
              <button type="button" className="w-full py-3 bg-slate-900 text-white font-medium rounded-md hover:bg-slate-800 transition-colors mt-2 shadow-lg hover:shadow-xl">
                Enviar Solicitud
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-white border-t border-slate-100 text-center">
        <div className="mb-4">
           <Link href="/" className="inline-block px-4 py-2 bg-slate-100 rounded-full text-xs font-bold text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-colors">
              ← Volver al Home Original
           </Link>
        </div>
        <p className="text-xs text-slate-400">© 2024 INMAER Desarrollos Inmobiliarios. Todos los derechos reservados.</p>
      </footer>

    </div>
  );
}
