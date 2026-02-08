"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Design3Page() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  // Scroll spy logic for active menu item
  useEffect(() => {
    const handleScroll = () => {
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

  // Prevent body scroll when menu is open
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

  const navLinkClass = (section: string) => `nav-link relative text-sm text-slate-500 hover:text-slate-900 transition-colors py-1 ${activeSection === section ? 'nav-active' : ''}`;

  return (
    <div className="bg-white text-slate-600 antialiased selection:bg-slate-200 selection:text-slate-900 relative font-sans" style={{ fontFamily: "'Inter', sans-serif" }}>
      
      {/* Navigation */}
      <nav className="fixed z-50 transition-all duration-300 bg-white/90 w-full border-slate-100 border-b top-0 backdrop-blur-md" id="navbar">
        <div className="flex h-20 max-w-7xl mr-auto ml-auto pr-6 pl-6 items-center justify-between">
          
          {/* Logo */}
          <Link href="#start" className="flex items-center gap-3 group z-50 relative">
            <div className="flex items-center text-slate-900">
              <div className="flex gap-2 gap-x-2 gap-y-2 items-center">
                <span className="uppercase text-sm font-medium text-stone-900 tracking-widest">Ciudad Venecia</span>
                <span className="text-stone-400 text-xs">|</span>
                <span className="uppercase text-xs text-stone-500 tracking-widest">by INMAER</span>
              </div>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            <Link href="#start" className={navLinkClass('start')}>Inicio</Link>
            <Link href="#nosotros" className={navLinkClass('nosotros')}>Nosotros</Link>
            <Link href="#vision" className={navLinkClass('vision')}>Visión</Link>
            <Link href="#proyectos" className={navLinkClass('proyectos')}>Proyectos</Link>
            <Link href="#proceso" className={navLinkClass('proceso')}>Inversión</Link>
            <Link href="#kontakt" className={navLinkClass('kontakt')}>Contacto</Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button onClick={toggleMenu} className="lg:hidden text-slate-900 p-2 z-50 relative focus:outline-none">
            <span className="sr-only">Abrir menú</span>
            {isMobileMenuOpen ? (
              <span className="text-2xl">✕</span>
            ) : (
              <span className="text-2xl">☰</span>
            )}
          </button>
        </div>

        {/* Mobile Menu Drawer */}
        <div className={`fixed inset-0 bg-white z-40 transform transition-transform duration-400 ease-in-out lg:hidden flex flex-col items-center justify-center space-y-8 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <Link href="#start" onClick={toggleMenu} className="text-2xl font-light text-slate-900 hover:text-slate-600 transition-colors">Inicio</Link>
          <Link href="#nosotros" onClick={toggleMenu} className="text-2xl font-light text-slate-900 hover:text-slate-600 transition-colors">Nosotros</Link>
          <Link href="#vision" onClick={toggleMenu} className="text-2xl font-light text-slate-900 hover:text-slate-600 transition-colors">Visión</Link>
          <Link href="#proyectos" onClick={toggleMenu} className="text-2xl font-light text-slate-900 hover:text-slate-600 transition-colors">Proyectos</Link>
          <Link href="#proceso" onClick={toggleMenu} className="text-2xl font-light text-slate-900 hover:text-slate-600 transition-colors">Inversión</Link>
          <Link href="#kontakt" onClick={toggleMenu} className="text-2xl font-light text-slate-900 hover:text-slate-600 transition-colors">Contacto</Link>
          
          <div className="absolute bottom-12 text-center">
            <p className="text-xs text-slate-400 tracking-widest uppercase">INMAER Desarrollos</p>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="lg:pt-40 lg:pb-32 pt-32 pr-6 pb-24 pl-6" id="start">
        <div className="relative w-full max-w-7xl mx-auto rounded-3xl overflow-hidden isolate shadow-2xl text-left">
          <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop" alt="Residencial Ciudad Venecia" className="absolute inset-0 -z-20 h-full w-full object-cover" />
          {/* Overlay */}
          <div className="-z-10 bg-slate-900/40 absolute top-0 right-0 bottom-0 left-0"></div>
          
          <div className="md:px-16 md:py-28 flex flex-col max-w-3xl pt-20 pr-8 pb-20 pl-8 relative gap-y-8 items-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-medium text-white backdrop-blur-md shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.6)]"></span>
              Desarrollo Premium
            </div>

            <h1 className="md:text-6xl leading-[1.1] text-4xl font-semibold text-white tracking-tight drop-shadow-sm uppercase">
              CIUDAD VENECIA
            </h1>

            <p className="leading-relaxed md:text-xl text-lg font-normal text-slate-50 max-w-2xl">
              Tu Patrimonio Seguro by INMAER. Espacios diseñados para el futuro.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 w-full sm:w-auto">
              <Link href="#proyectos" className="w-full sm:w-auto px-6 py-3.5 bg-white text-slate-900 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 shadow-lg hover:shadow-xl">
                Ver Masterplan
                <span>→</span>
              </Link>
              <Link href="#kontakt" className="w-full sm:w-auto px-6 py-3.5 bg-white/5 border border-white/20 text-white text-sm font-medium rounded-lg hover:bg-white/10 transition-colors backdrop-blur-sm shadow-sm text-center">
                Agendar Visita
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features / Nosotros Section */}
      <section id="nosotros" className="py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: '📈', title: 'Alta Plusvalía', desc: 'Inversión inteligente con un crecimiento de valor garantizado a través del tiempo en una zona de desarrollo.' },
            { icon: '📍', title: 'Ubicación Estratégica', desc: 'Conectividad directa con las principales vías, cerca de servicios esenciales y áreas comerciales.' },
            { icon: '🛡️', title: 'Seguridad 24/7', desc: 'Circuito cerrado con vigilancia privada y control de acceso para la tranquilidad de tu familia.' },
            { icon: '✅', title: 'Respaldo INMAER', desc: 'La confianza y solidez de una desarrolladora líder comprometida con la calidad y el cumplimiento.' }
          ].map((feature, i) => (
            <div key={i} className="p-6 rounded-xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors">
              <div className="mb-4 text-slate-900 text-2xl">{feature.icon}</div>
              <h3 className="text-base font-medium text-slate-900 mb-2 tracking-tight">{feature.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
        
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="text-sm text-slate-400">Aliados estratégicos en construcción, diseño y financiamiento hipotecario.</p>
          <div className="flex items-center gap-6 opacity-40 grayscale text-2xl">
            <span>🏢</span><span>🏗️</span><span>🏠</span><span>🏦</span>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section id="vision" className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-16">
            <h2 className="text-3xl font-semibold text-slate-900 tracking-tight mb-4">Desarrollando el Futuro de la<br />Zona Oriental</h2>
            <p className="text-slate-500 text-lg leading-relaxed">
              Un proyecto visionario que combina naturaleza, urbanismo moderno y la solidez de una inversión inteligente. Creamos comunidades integrales donde la calidad de vida es la prioridad.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: '🌿', title: 'Entorno Natural', desc: 'Amplias áreas verdes y parques recreativos diseñados para disfrutar al aire libre.' },
              { icon: '🛣️', title: 'Urbanismo Moderno', desc: 'Calles pavimentadas, servicios públicos subterráneos y planificación ordenada.' },
              { icon: '👥', title: 'Comunidad Segura', desc: 'Espacios de convivencia familiar con infraestructura social de primer nivel.' }
            ].map((item, i) => (
              <div key={i} className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm">
                <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center mb-4 text-indigo-600 text-xl">
                  {item.icon}
                </div>
                <h3 className="font-medium text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
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
                title: 'Ciudad Venecia Danlí', 
                badge: 'El Paraíso', 
                desc: 'El proyecto insignia en la zona oriental. Lotes residenciales en un entorno exclusivo.',
                status: 'En Venta',
                type: 'Residencial',
                img: 'https://images.unsplash.com/photo-1592595896551-12b371d546d5?q=80&w=800'
              },
              { 
                title: 'Ciudad Venecia Olancho', 
                badge: 'Juticalpa', 
                desc: 'Expansión estratégica con acceso privilegiado y diseño urbanístico de vanguardia.',
                status: 'Preventa',
                type: 'Eco-Residencial',
                img: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=800'
              },
              { 
                title: 'Ciudad Venecia Valle', 
                badge: 'Zona Sur', 
                desc: 'Nuevo desarrollo en el sur del país, capitalizando el crecimiento logístico de la región.',
                status: 'Próximamente',
                type: 'Mixto',
                img: 'https://images.unsplash.com/photo-1626290800844-4861bc99478e?q=80&w=800'
              }
            ].map((project, i) => (
              <div key={i} className="group bg-white rounded-xl overflow-hidden border border-slate-200 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300">
                <div className="aspect-[4/3] bg-slate-200 relative overflow-hidden">
                  <img src={project.img} alt={project.title} className="w-full h-full object-cover" />
                  <div className="absolute bottom-4 left-4 z-20">
                    <span className="text-[10px] uppercase font-semibold text-slate-900 tracking-wider bg-white/90 rounded pt-1 pr-2 pb-1 pl-2 backdrop-blur">{project.badge}</span>
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
                Facilitamos el proceso de adquisición de tu patrimonio con planes de financiamiento flexibles y asesoría personalizada en cada etapa.
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
            <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
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
      <section id="kontakt" className="py-24 px-6 bg-white">
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
              
              <button type="button" className="w-full py-3 bg-slate-900 text-white font-medium rounded-md hover:bg-slate-800 transition-colors mt-2">
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

      {/* Styles for Nav Active State */}
      <style jsx global>{`
        .nav-active {
          color: #0f172a !important;
          font-weight: 500;
        }
        .nav-active::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          height: 1px;
          background-color: #0f172a;
        }
      `}</style>

    </div>
  );
}
