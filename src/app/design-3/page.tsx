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
      
      {/* Navigation - ALWAYS VISIBLE with backdrop */}
      <nav className={`fixed z-50 transition-all duration-500 w-full border-b ${
        scrolled 
          ? 'bg-white/95 border-slate-100 backdrop-blur-md shadow-sm' 
          : 'bg-white/90 border-white/20 backdrop-blur-md'
      }`} id="navbar">
        <div className="flex h-20 max-w-7xl mx-auto px-6 items-center justify-between">
          
          {/* Logo - ALWAYS dark for visibility */}
          <Link href="#start" className="flex items-center gap-3 group relative">
            <div className="flex items-center">
              <div className="flex gap-2 items-center">
                <span className="uppercase text-sm font-medium tracking-widest text-slate-900">Ciudad Venecia</span>
                <span className="text-xs text-slate-400">|</span>
                <span className="uppercase text-xs font-medium tracking-widest text-slate-500">by INMAER</span>
              </div>
            </div>
          </Link>

          {/* Desktop Menu - ALWAYS dark */}
          <div className="hidden lg:flex items-center gap-8">
            {['Inicio', 'Nosotros', 'Visión', 'Proyectos', 'Inversión', 'Contacto'].map((item, i) => {
              const href = ['#start', '#nosotros', '#vision', '#proyectos', '#proceso', '#kontakt'][i];
              const section = href.substring(1);
              return (
                <Link 
                  key={section}
                  href={href} 
                  className={`text-sm transition-all hover:text-slate-900 ${
                    activeSection === section ? 'text-slate-900 font-medium' : 'text-slate-500'
                  }`}
                >
                  {item}
                </Link>
              );
            })}
          </div>

          {/* Mobile Hamburger Button - ALWAYS dark */}
          <button onClick={toggleMenu} className="lg:hidden p-2 relative focus:outline-none text-slate-900">
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

      {/* 1. HERO SECTION - FULL WIDTH */}
      <section className="relative h-screen min-h-[700px] w-full overflow-hidden" id="start">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop" 
            alt="Residencial Ciudad Venecia" 
            className="h-full w-full object-cover"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-slate-900/40"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="w-full max-w-7xl mx-auto px-6">
            <div className="max-w-3xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-medium text-white backdrop-blur-md shadow-sm mb-8">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.6)]"></span>
                Desarrollo Premium
              </div>

              {/* Title - font-medium for elegance */}
              <h1 className="text-4xl md:text-6xl leading-[1.1] font-medium text-white tracking-tight mb-6">
                Tu patrimonio seguro en la zona de mayor crecimiento de Honduras.
              </h1>

              {/* Subtitle - font-light for elegance */}
              <p className="text-lg md:text-xl leading-relaxed font-light text-slate-100 max-w-2xl mb-10">
                Espacios residenciales de calidad, infraestructura moderna y seguridad 24/7. Ciudad Venecia combina ubicación estratégica con visión de futuro.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                <Link 
                  href="#proyectos" 
                  className="w-full sm:w-auto px-6 py-3.5 bg-white text-slate-900 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                >
                  Ver Masterplan
                  <span>→</span>
                </Link>
                <Link 
                  href="#kontakt" 
                  className="w-full sm:w-auto px-6 py-3.5 bg-white/5 border border-white/20 text-white text-sm font-medium rounded-lg hover:bg-white/10 transition-colors backdrop-blur-sm shadow-sm"
                >
                  Agendar Visita
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT SECTION */}
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
              <div className="relative z-10 aspect-[4/5] overflow-hidden bg-slate-100 rounded-xl">
                <img 
                  src="https://images.unsplash.com/photo-1600596542815-e328701102b9?q=80&w=2669" 
                  alt="Arquitectura Moderna" 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              {/* Decorative Elements */}
              <div className="absolute -bottom-8 -left-8 w-2/3 h-2/3 border border-slate-200 rounded-xl -z-0"></div>
              <div className="absolute top-10 -right-8 w-24 h-24 bg-slate-100 rounded-xl -z-0"></div>
              
              {/* Floating Quote */}
              <div className="absolute bottom-10 -left-10 bg-white p-8 shadow-xl max-w-xs border-l-4 border-slate-900 rounded-xl hidden md:block">
                 <p className="font-serif italic text-slate-600">"La inversión más segura es la tierra, y el mejor momento es ahora."</p>
                 <p className="text-xs font-bold uppercase tracking-widest mt-4 text-slate-400">— INMAER</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PARALLAX SECTION */}
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

      {/* 4. VISION SECTION */}
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
              <div key={i} className="group relative h-80 rounded-xl overflow-hidden shadow-sm cursor-pointer">
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

      {/* 5. PROJECTS SECTION */}
      <section className="border-y bg-white border-slate-100 pt-24 pb-24" id="proyectos">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
            <div>
              <span className="inline-block py-1 px-3 bg-slate-100 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-4">
                Portfolio
              </span>
              <h2 className="text-3xl md:text-5xl font-semibold text-slate-900 tracking-tight mb-4">Nuestros Proyectos</h2>
              <p className="text-slate-500 max-w-xl text-lg font-light">Descubre las ubicaciones estratégicas que definen el futuro de la región oriental.</p>
            </div>
            <Link href="#kontakt" className="text-sm font-bold uppercase tracking-widest text-slate-900 flex items-center gap-2 hover:gap-3 transition-all group">
              Consultar Disponibilidad <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {[
              { 
                title: 'Ciudad Venecia Danlí', badge: 'El Paraíso', location: 'El Paraíso, HN',
                desc: 'Proyecto insignia de la zona oriental. 300+ lotes residenciales en entorno premium con infraestructura completa.',
                status: 'En Venta', type: 'Residencial',
                img: 'https://images.unsplash.com/photo-1592595896551-12b371d546d5?q=80&w=800'
              },
              { 
                title: 'Ciudad Venecia Olancho', badge: 'Juticalpa', location: 'Juticalpa, Olancho',
                desc: 'Expansión estratégica con acceso privilegiado a la carretera de Olancho. Diseño urbanístico de vanguardia.',
                status: 'Preventa', type: 'Eco-Residencial',
                img: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=800'
              },
              { 
                title: 'Ciudad Venecia Valle', badge: 'Zona Sur', location: 'Nacaome, Valle',
                desc: 'Desarrollo logístico-residencial en la zona sur. Capitalizando el boom comercial del corredor pacífico.',
                status: 'Próximamente', type: 'Mixto',
                img: 'https://images.unsplash.com/photo-1626290800844-4861bc99478e?q=80&w=800'
              }
            ].map((project, i) => (
              <div key={i} className="group bg-white rounded-xl overflow-hidden border border-slate-200 hover:border-slate-300 hover:shadow-2xl hover:shadow-slate-200/60 transition-all duration-500 cursor-pointer">
                <div className="aspect-[4/5] bg-slate-200 relative overflow-hidden">
                  <img 
                    src={project.img} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 saturate-0 group-hover:saturate-100" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                  
                  <div className="absolute top-4 left-4 z-20">
                    <span className="text-[10px] uppercase font-bold text-white tracking-wider bg-slate-900/70 rounded px-3 py-1.5 backdrop-blur shadow-lg">
                      {project.badge}
                    </span>
                  </div>

                  <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-sm">📍</span>
                    <span className="text-[10px] font-medium text-slate-700">{project.location}</span>
                  </div>
                </div>
                
                <div className="p-8">
                  <h3 className="text-xl font-semibold text-slate-900 tracking-tight mb-3 group-hover:text-emerald-900 transition-colors">{project.title}</h3>
                  <p className="text-sm text-slate-500 mb-6 leading-relaxed">{project.desc}</p>
                  
                  <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-1">Estado</p>
                      <p className="text-sm font-bold text-slate-900">{project.status}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-1">Tipo</p>
                      <p className="text-sm font-bold text-slate-900">{project.type}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-all">
                      <span>→</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. INVESTMENT PROCESS */}
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

            <div className="bg-slate-800 rounded-xl p-8 border border-slate-700 shadow-2xl">
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

      {/* 7. CONTACT SECTION */}
      <section id="kontakt" className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670" 
            alt="Ciudad Moderna" 
            className="w-full h-full object-cover opacity-5"
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block py-1 px-3 bg-slate-100 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-4">
              Contáctanos
            </span>
            <h2 className="text-4xl md:text-5xl font-semibold text-slate-900 tracking-tight mb-6">¿Listo para invertir?</h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto font-light">Agenda una visita personalizada o recibe información detallada sobre planes de financiamiento.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-8">
              <div className="bg-slate-50 p-8 rounded-xl border border-slate-100">
                <h3 className="text-lg font-semibold text-slate-900 mb-6">Información de Contacto</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <span className="text-2xl">🏢</span>
                    <div>
                      <p className="font-medium text-slate-900 text-sm">Oficinas Centrales</p>
                      <p className="text-sm text-slate-500">Tegucigalpa, Honduras C.A.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="text-2xl">📧</span>
                    <div>
                      <p className="font-medium text-slate-900 text-sm">Email</p>
                      <a href="mailto:info@inmaer.hn" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">info@inmaer.hn</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="text-2xl">📱</span>
                    <div>
                      <p className="font-medium text-slate-900 text-sm">Teléfono</p>
                      <a href="tel:+50400000000" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">+504 0000 0000</a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900 p-8 rounded-xl text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl"></div>
                <div className="relative z-10">
                  <p className="text-xs uppercase tracking-widest text-emerald-400 mb-2 font-bold">Presencia Nacional</p>
                  <p className="text-lg font-light mb-4">Proyectos activos en <span className="font-semibold">3 departamentos</span></p>
                  <div className="flex items-center gap-6 text-sm text-slate-400">
                    <span>📍 El Paraíso</span>
                    <span>📍 Olancho</span>
                    <span>📍 Valle</span>
                  </div>
                </div>
              </div>
            </div>

            <form className="bg-white p-8 rounded-xl border border-slate-200 shadow-lg space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-slate-700">Nombre Completo</label>
                  <input type="text" id="name" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 text-sm" />
                </div>
                <div className="space-y-1">
                  <label htmlFor="phone" className="text-xs font-bold uppercase tracking-widest text-slate-700">Teléfono</label>
                  <input type="tel" id="phone" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 text-sm" />
                </div>
              </div>
              <div className="space-y-1">
                <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-slate-700">Correo Electrónico</label>
                <input type="email" id="email" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 text-sm" />
              </div>
              <div className="space-y-1">
                <label htmlFor="project" className="text-xs font-bold uppercase tracking-widest text-slate-700">Proyecto de Interés</label>
                <select id="project" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 text-sm">
                  <option>Ciudad Venecia Danlí</option>
                  <option>Ciudad Venecia Olancho</option>
                  <option>Ciudad Venecia Valle</option>
                  <option>Información General</option>
                </select>
              </div>
              <div className="space-y-1">
                <label htmlFor="message" className="text-xs font-bold uppercase tracking-widest text-slate-700">Mensaje</label>
                <textarea id="message" rows={4} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 text-sm"></textarea>
              </div>
              
              <button type="button" className="w-full py-4 bg-slate-900 text-white font-bold text-sm uppercase tracking-widest rounded-lg hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                Enviar Solicitud
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="bg-slate-900 text-white py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
            <div>
              <div className="flex gap-2 items-center mb-4">
                <span className="uppercase text-sm font-bold tracking-[0.2em]">Ciudad Venecia</span>
                <span className="text-xs text-slate-500">|</span>
                <span className="uppercase text-[10px] font-medium tracking-widest text-slate-400">by INMAER</span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">Desarrollando el futuro inmobiliario de Honduras con calidad, confianza y visión estratégica.</p>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest mb-4 text-slate-300">Navegación</h4>
              <div className="space-y-2">
                {['Inicio', 'Nosotros', 'Proyectos', 'Inversión', 'Contacto'].map((item, i) => (
                  <Link key={i} href={['#start', '#nosotros', '#proyectos', '#proceso', '#kontakt'][i]} className="block text-sm text-slate-400 hover:text-white transition-colors">
                    {item}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest mb-4 text-slate-300">Síguenos</h4>
              <div className="flex gap-4 text-2xl mb-6">
                <a href="#" className="text-slate-400 hover:text-white transition-colors">📘</a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">📷</a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">🐦</a>
              </div>
              <Link href="/" className="inline-block px-4 py-2 bg-slate-800 rounded-lg text-xs font-bold text-slate-300 hover:bg-slate-700 hover:text-white transition-colors">
                ← Ver Home Original
              </Link>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 text-center">
            <p className="text-xs text-slate-500">© 2024 INMAER Desarrollos Inmobiliarios. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
