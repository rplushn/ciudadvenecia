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

      {/* ------------------- HERO ------------------- */}
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
                Más que terrenos y casas, desarrollamos ecosistemas de vida con plusvalía garantizada.
              </p>
            </Reveal>
         </div>
      </section>

      {/* =========================================================================================
          SECCIÓN 3: CIUDAD VENECIA (MARCA PRINCIPAL)
      ========================================================================================= */}

      {/* --- 3.1 CIUDAD VENECIA DANLÍ --- */}
      <section className="py-24 px-6 max-w-[1500px] mx-auto border-b border-[#C5A065]/20">
         <div className="grid lg:grid-cols-2 gap-16 items-start">
             <div>
                <Reveal>
                    <span className="text-[#C5A065] text-xs font-bold uppercase tracking-[0.2em] mb-2 block">MARCA PRINCIPAL</span>
                    <h2 className="font-serif-display text-4xl md:text-5xl text-[#2C2C2C] mb-6">Ciudad Venecia Danlí</h2>
                    <p className="text-lg font-medium text-[#2C2C2C] mb-4">El proyecto insignia de INMAER y uno de los de mayor crecimiento en la zona oriental del país.</p>
                    
                    <div className="space-y-6 text-[#6B665F] text-sm leading-relaxed mb-8">
                        <div>
                            <strong className="block text-[#1A3A52] uppercase text-[10px] tracking-widest mb-1">Ubicación</strong>
                            A pocos kilómetros del centro de Danlí, muy cerca de la sede de la UNAH-TEC y del Hospital Regional Gabriela Alvarado. Salida hacia la ciudad de El Paraíso.
                        </div>
                        <div>
                            <strong className="block text-[#1A3A52] uppercase text-[10px] tracking-widest mb-1">Descripción</strong>
                            Ambiente muy agradable, lleno de frescura y vegetación. Hermosas áreas verdes, espacios recreativos para toda la familia y un paisaje realmente hermoso.
                        </div>
                    </div>

                    {/* Características Grid */}
                    <div className="grid md:grid-cols-2 gap-8 mb-8 bg-[#F9F7F4] p-6">
                        <div>
                            <h4 className="text-[#C5A065] font-serif-display text-xl mb-3">Características de Terrenos</h4>
                            <ul className="space-y-2 text-xs text-[#484848]">
                                <li>• Terrenos de 10×15 metros</li>
                                <li>• Topografía plana</li>
                                <li>• Agua potable, energía eléctrica, aguas negras</li>
                                <li>• Agua las 24 horas</li>
                                <li>• Vigilancia las 24 horas</li>
                                <li>• Financiamiento directo con aprobación inmediata</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-[#C5A065] font-serif-display text-xl mb-3">Construcción de Casas</h4>
                            <ul className="space-y-2 text-xs text-[#484848]">
                                <li>• Casas de 2 y 3 habitaciones</li>
                                <li>• Garaje para 2 vehículos</li>
                                <li>• Finos acabados</li>
                                <li>• Financiamiento a través de Banco Atlántida</li>
                                <li>• Asesoría completa con trámite bancario</li>
                            </ul>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 p-6 shadow-sm mb-6">
                        <strong className="block text-[#1A3A52] uppercase text-[10px] tracking-widest mb-2">Datos Adicionales</strong>
                        <ul className="space-y-2 text-xs text-[#6B665F]">
                            <li><strong>Etapas:</strong> El proyecto ya cuenta con su 3ra Etapa en desarrollo.</li>
                            <li><strong>Modelo destacado:</strong> Casa de 62 m² de construcción, acabados modernos, precio L.1,400,000.00, terreno de 150 m², 2 dormitorios, 1 baño, garaje para 2 vehículos.</li>
                            <li><strong>Especificaciones técnicas:</strong> dosificación de concreto 1:2:2 con resistencia de 3,500 PSI, bloques de 700 PSI, cerámica en interiores, ventanas tipo francesa, puertas termofadas de metal, instalaciones sanitarias y eléctricas completas.</li>
                        </ul>
                    </div>
                </Reveal>
             </div>
             <div className="h-full">
                <Reveal delay={0.2}>
                    <div className="aspect-[4/5] bg-gray-200 relative overflow-hidden mb-6">
                        <img src="/amenidades/amenidades_parque_central.jpg.jpeg" alt="Ciudad Venecia Danlí" className="w-full h-full object-cover"/>
                    </div>
                </Reveal>
             </div>
         </div>
      </section>

      {/* --- 3.2 CIUDAD VENECIA VALLE --- */}
      <section className="py-24 px-6 bg-[#F9F7F4]">
         <div className="max-w-[1500px] mx-auto grid lg:grid-cols-12 gap-12 items-center">
             <div className="lg:col-span-7 order-2 lg:order-1">
                 <Reveal>
                    <div className="aspect-video bg-gray-200 relative overflow-hidden shadow-xl">
                        <img src="/homepage/portal_ai-ciudad_venecia.jpeg" alt="Ciudad Venecia Valle" className="w-full h-full object-cover"/>
                         <div className="absolute bottom-0 left-0 bg-[#1A3A52] text-white px-6 py-3">
                            <p className="text-[10px] font-bold uppercase tracking-widest">A 10 min de la playa</p>
                        </div>
                    </div>
                 </Reveal>
             </div>
             <div className="lg:col-span-5 order-1 lg:order-2">
                 <Reveal delay={0.2}>
                    <h2 className="font-serif-display text-4xl md:text-5xl text-[#2C2C2C] mb-6">Ciudad Venecia Valle</h2>
                    
                    <div className="space-y-6 text-[#6B665F] text-sm leading-relaxed mb-8">
                        <div>
                            <strong className="block text-[#C5A065] uppercase text-[10px] tracking-widest mb-1">Ubicación</strong>
                            Comunidad de El Guayabo, carretera que de Jícaro Galán conduce hacia San Lorenzo. A orilla de la Carretera Panamericana, 3 km al sur de Jícaro Galán, Departamento de Valle.
                        </div>
                        <div>
                            <strong className="block text-[#C5A065] uppercase text-[10px] tracking-widest mb-1">Descripción</strong>
                            Ubicación inmejorable en la zona, brindando espacios bien definidos para calles, áreas verdes y zonas recreativas. El objetivo es que sus habitantes puedan vivir mejor en un lugar seguro y agradable.
                        </div>
                    </div>

                    <div className="bg-white p-6 shadow-sm mb-6 border-l-2 border-[#C5A065]">
                        <h4 className="font-serif-display text-xl text-[#2C2C2C] mb-3">Características</h4>
                        <ul className="space-y-2 text-xs text-[#484848]">
                             <li>• Lotes de terreno de 10×15 m², totalmente urbanizados</li>
                             <li>• Financiamiento directo con prima de L 6,000 y cuotas accesibles</li>
                             <li>• Áreas verdes y espacios recreativos</li>
                             <li>• A 10 minutos de la playa (zona costera del Golfo de Fonseca)</li>
                        </ul>
                    </div>

                    <div className="text-xs text-[#6B665F]">
                        <p><strong>Contacto específico:</strong> (504) 3255-1991 / (504) 2763-3699</p>
                        <p><strong>Redes:</strong> Página de Facebook "Ciudad Venecia Valle" con sede en Nacaome</p>
                    </div>
                 </Reveal>
             </div>
         </div>
      </section>

      {/* --- 3.3 CIUDAD VENECIA OLANCHO (PREMIUM) --- */}
      <section className="py-24 px-6 bg-white border-y border-gray-100">
          <div className="max-w-[1500px] mx-auto text-center mb-16">
              <Reveal>
                  <span className="bg-[#1A3A52] text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest inline-block mb-4">PREMIUM LEVEL</span>
                  <h2 className="font-serif-display text-4xl md:text-6xl text-[#2C2C2C]">Ciudad Venecia Olancho</h2>
                  <p className="text-lg text-[#6B665F] max-w-2xl mx-auto mt-4">El proyecto más ambicioso y exclusivo de INMAER. Redefine el desarrollo residencial en Olancho.</p>
                  <p className="text-sm text-[#C5A065] font-bold uppercase tracking-widest mt-2">Valle de Lepaguare, Olancho (entre Juticalpa y Campamento)</p>
              </Reveal>
          </div>

          <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-12">
              <Reveal>
                  <div className="grid grid-cols-2 gap-4 h-full">
                      <img src="/amenidades/amenidades_club.jpg.jpeg" className="w-full h-full object-cover rounded-sm"/>
                      <img src="/amenidades/amenidades_piscina002.jpeg" className="w-full h-full object-cover rounded-sm"/>
                  </div>
              </Reveal>
              <Reveal delay={0.2}>
                  <div className="bg-[#F3F0EB] p-10 h-full">
                      <h3 className="font-serif-display text-2xl text-[#2C2C2C] mb-6">Amenidades de la Casa Club</h3>
                      <div className="grid md:grid-cols-2 gap-x-8 gap-y-3 text-xs text-[#484848]">
                          <ul className="space-y-3">
                              <li>• Piscina para adultos y piscina para niños</li>
                              <li>• Canchas con grama sintética (fútbol)</li>
                              <li>• Canchas polideportivas</li>
                              <li>• Salón de eventos y quioscos</li>
                              <li>• Casa Club completa</li>
                              <li>• Gimnasio (GYM)</li>
                              <li>• Mini salón Arcade para niños</li>
                          </ul>
                          <ul className="space-y-3">
                              <li>• Cafetería y restaurante</li>
                              <li>• Áreas comerciales</li>
                              <li>• Parqueos amplios</li>
                              <li>• Calles pavimentadas</li>
                              <li>• Bulevar privado de acceso</li>
                              <li>• Juegos infantiles</li>
                          </ul>
                      </div>
                      <div className="mt-8 pt-8 border-t border-[#C5A065]/30">
                          <p className="text-xs text-[#6B665F] mb-1"><strong>Conceptos disponibles:</strong> Ciudad Venecia Estándar y Ciudad Venecia Premium</p>
                          <p className="text-xs text-[#6B665F]"><strong>Contacto:</strong> Se maneja a través de Tu Casa Honduras y las redes de Ciudad Venecia</p>
                      </div>
                  </div>
              </Reveal>
          </div>
      </section>

      {/* --- 3.4 CIUDAD VENECIA RAÍCES – TALANGA (NUEVO 2026) --- */}
      <section className="py-24 px-6 bg-[#2C2C2C] text-white">
          <div className="max-w-[1200px] mx-auto">
              <Reveal>
                  <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-white/20 pb-8">
                      <div>
                          <span className="text-[#C5A065] text-[10px] font-bold uppercase tracking-[0.3em] mb-2 block">NUEVO LANZAMIENTO 2026</span>
                          <h2 className="font-serif-display text-4xl md:text-5xl">Ciudad Venecia Raíces</h2>
                          <p className="text-white/60 mt-2 text-sm">Talanga, Francisco Morazán. El proyecto más nuevo de la marca.</p>
                      </div>
                      <div className="text-right mt-6 md:mt-0">
                          <p className="text-2xl font-serif-display text-[#C5A065]">L 2,500</p>
                          <p className="text-[10px] uppercase tracking-widest">Prima desde</p>
                      </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6 mb-12">
                      <div className="bg-white/5 p-6 border border-white/10">
                          <h4 className="text-[#C5A065] font-serif-display text-xl mb-2">Raíces</h4>
                          <p className="text-2xl font-bold mb-1">L 900</p>
                          <p className="text-[10px] uppercase opacity-60 mb-4">Mensuales</p>
                          <p className="text-xs opacity-80">Perfil: Nuevos inversionistas, primera propiedad.</p>
                      </div>
                      <div className="bg-white/5 p-6 border border-white/10">
                          <h4 className="text-[#C5A065] font-serif-display text-xl mb-2">Estándar</h4>
                          <p className="text-lg font-bold mb-1">Mayor a Raíces</p>
                          <p className="text-[10px] uppercase opacity-60 mb-4">Cuota</p>
                          <p className="text-xs opacity-80">Perfil: Familias en crecimiento.</p>
                      </div>
                      <div className="bg-white/5 p-6 border border-white/10">
                          <h4 className="text-[#C5A065] font-serif-display text-xl mb-2">Premium</h4>
                          <p className="text-lg font-bold mb-1">Precio Premium</p>
                          <p className="text-[10px] uppercase opacity-60 mb-4">Valor</p>
                          <p className="text-xs opacity-80">Perfil: Nivel exclusivo.</p>
                      </div>
                  </div>

                  <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-white/70 bg-black/20 p-6 rounded-lg">
                      <p><strong>Concepto:</strong> Pensado para quienes desean iniciar su patrimonio, invertir con visión y vivir en un entorno planificado.</p>
                      <p className="text-right"><strong>Contacto:</strong> 9630-2106 / 9484-0346 / +504 3194-6163</p>
                  </div>
              </Reveal>
          </div>
      </section>

      {/* =========================================================================================
          SECCIÓN 4: OTROS PROYECTOS RESIDENCIALES
      ========================================================================================= */}
      
      <section className="py-24 px-6 bg-[#F3F0EB]">
          <div className="max-w-[1200px] mx-auto">
              <div className="text-center mb-16">
                  <h2 className="font-serif-display text-3xl text-[#2C2C2C] uppercase tracking-widest">Otros Proyectos Residenciales</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-12">
                  {/* 4.1 RESIDENCIAL VERSALLES */}
                  <Reveal>
                      <div className="bg-white p-8 shadow-md h-full">
                          <h3 className="font-serif-display text-3xl text-[#2C2C2C] mb-4">Residencial Versalles</h3>
                          <div className="space-y-4 text-xs text-[#6B665F]">
                              <p><strong>Ubicación:</strong> A 5 km del centro de Danlí, a orilla de Carretera Panamericana.</p>
                              <p><strong>Descripción:</strong> Lugar exclusivo con disponibilidad muy limitada.</p>
                              <ul className="bg-[#F9F7F4] p-4 space-y-2">
                                  <li>• Lotes de: 12×20 metros</li>
                                  <li>• Amenidades: Piscina, áreas recreativas</li>
                                  <li>• Seguridad: Máxima seguridad</li>
                              </ul>
                              <p className="text-[#C5A065] font-bold">Contacto: +504 9549-8925</p>
                          </div>
                      </div>
                  </Reveal>

                  {/* 4.2 RESIDENCIAL PALMANOVA */}
                  <Reveal delay={0.2}>
                      <div className="bg-white p-8 shadow-md h-full border border-gray-100">
                          <h3 className="font-serif-display text-3xl text-[#2C2C2C] mb-4">Residencial Palmanova</h3>
                          <div className="space-y-4 text-xs text-[#6B665F]">
                              <p><strong>Ubicación:</strong> A 100 metros de Carretera Panamericana.</p>
                              <p><strong>Descripción:</strong> Privilegiado por su ubicación y su topografía.</p>
                              <p className="italic opacity-60">(Información adicional limitada en fuentes públicas)</p>
                          </div>
                      </div>
                  </Reveal>
              </div>
          </div>
      </section>

      {/* =========================================================================================
          SECCIÓN 5: PROYECTO COMERCIAL — HILLS CITY
      ========================================================================================= */}
      
      <section className="py-24 px-6 bg-white border-t border-gray-200">
          <div className="max-w-[1500px] mx-auto grid lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                  <Reveal>
                      <span className="text-[#C5A065] text-xs font-bold uppercase tracking-[0.2em] mb-2 block">DISTRITO COMERCIAL</span>
                      <h2 className="font-serif-display text-5xl md:text-6xl text-[#2C2C2C] mb-6">Hills City</h2>
                      
                      <p className="text-lg text-[#2C2C2C] mb-6 font-medium">
                          La solución al problema de estacionamiento en Danlí.
                      </p>
                      <p className="text-sm text-[#6B665F] mb-8 leading-relaxed">
                          Con amplios espacios para parqueos, lotes para construcción de locales, y opciones de venta y renta de locales comerciales. 7 manzanas de desarrollo mixto en construcción en el Centro de Danlí.
                      </p>

                      <div className="bg-[#1A3A52] text-white p-8 mb-8">
                          <h4 className="font-serif-display text-2xl mb-4">Oferta & Negocios</h4>
                          <div className="grid grid-cols-2 gap-4 text-xs font-light">
                              <ul className="space-y-2">
                                  <li>• Parqueos amplios</li>
                                  <li>• Locales comerciales (venta/alquiler)</li>
                                  <li>• Plazas comerciales</li>
                                  <li>• Gasolinera</li>
                              </ul>
                              <ul className="space-y-2">
                                  <li>• Hospital</li>
                                  <li>• Farmacias</li>
                                  <li>• Bancos</li>
                                  <li>• Restaurantes</li>
                              </ul>
                          </div>
                          <p className="mt-4 text-[10px] uppercase tracking-widest opacity-70 border-t border-white/20 pt-4">
                              Negocios ya operando: Bancos, restaurantes y otras empresas
                          </p>
                      </div>
                  </Reveal>
              </div>
              <div className="order-1 lg:order-2 h-full">
                  <Reveal delay={0.2}>
                       <div className="aspect-[4/5] bg-gray-200 relative overflow-hidden shadow-2xl">
                           <img src="/homepage/versalles_outdoor.jpg.jpeg" alt="Hills City Danlí" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"/>
                           <div className="absolute top-6 right-6 bg-[#C5A065] text-black px-4 py-3 text-center">
                               <span className="block text-2xl font-bold">7</span>
                               <span className="text-[10px] font-bold uppercase">Manzanas</span>
                           </div>
                       </div>
                  </Reveal>
              </div>
          </div>
      </section>

      {/* ------------------- 7. CONTACT CTA (Standardized) ------------------- */}
       <section id="kontakt" className="py-24 px-6 bg-[#F3F0EB] border-t border-[#C5A065]/10">
           <div className="max-w-[1200px] mx-auto">
               
               {/* Header Centered */}
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
                   {[
                       "Respuesta en menos de 24 horas hábiles.",
                       "Información clara sobre cuotas y primas según proyecto.",
                       "Acompañamiento durante todo el proceso de compra."
                   ].map((text, i) => (
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
                   
                   {/* LEFT: Info Column */}
                   <div className="lg:col-span-4 bg-[#EBE7DF] p-10 md:p-12 text-[#484848] flex flex-col justify-center relative overflow-hidden">
                       <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
                            <svg width="200" height="200" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="50" cy="50" r="40" stroke="#C5A065" strokeWidth="1" />
                                <circle cx="50" cy="50" r="30" stroke="#C5A065" strokeWidth="0.5" />
                            </svg>
                       </div>

                       <Reveal>
                         <h3 className="font-serif-display text-2xl md:text-3xl mb-6 text-[#2C2C2C]">¿Prefieres hablar directo?</h3>
                         <p className="text-[#6B665F] text-xs leading-relaxed mb-8">
                             También puedes escribir o llamar a nuestro equipo comercial para agendar una visita a proyecto o resolver dudas puntuales sobre financiamiento.
                         </p>
                         
                         <div className="h-[1px] w-12 bg-[#C5A065] mb-8"></div>

                         <div className="space-y-8">
                             <div>
                                 <p className="text-[#C5A065] text-[9px] uppercase tracking-widest font-bold mb-1">TELÉFONO</p>
                                 <p className="text-sm font-medium text-[#2C2C2C]">(504) 9890-4449 / 2763-3699</p>
                             </div>
                             <div>
                                 <p className="text-[#C5A065] text-[9px] uppercase tracking-widest font-bold mb-1">WHATSAPP VENTAS</p>
                                 <p className="text-sm font-medium text-[#2C2C2C]">+504 9549-8925</p>
                             </div>
                             <div>
                                 <p className="text-[#C5A065] text-[9px] uppercase tracking-widest font-bold mb-1">OFICINA DANLÍ</p>
                                 <p className="text-xs text-[#6B665F] leading-relaxed">
                                     Col. El Zarzal, Edificio INMAER, contiguo a Pizza Hut, Danlí.
                                 </p>
                             </div>
                         </div>
                       </Reveal>
                   </div>

                   {/* RIGHT: Form */}
                   <div className="lg:col-span-8 bg-white p-10 md:p-12">
                       <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
                           {/* Name */}
                           <div className="md:col-span-1 group">
                               <label className="block text-[#8C857E] text-[9px] font-bold uppercase tracking-widest mb-2 group-focus-within:text-[#C5A065] transition-colors">NOMBRE COMPLETO</label>
                               <input type="text" placeholder="Ej. Juan Pérez" className="w-full border-b border-gray-200 py-3 text-sm focus:outline-none focus:border-[#C5A065] transition-all bg-transparent placeholder-gray-300 text-[#2C2C2C]" />
                           </div>
                           
                           {/* Phone */}
                           <div className="md:col-span-1 group">
                               <label className="block text-[#8C857E] text-[9px] font-bold uppercase tracking-widest mb-2 group-focus-within:text-[#C5A065] transition-colors">TELÉFONO / WHATSAPP</label>
                               <input type="text" placeholder="+504 0000-0000" className="w-full border-b border-gray-200 py-3 text-sm focus:outline-none focus:border-[#C5A065] transition-all bg-transparent placeholder-gray-300 text-[#2C2C2C]" />
                           </div>

                           {/* Email */}
                           <div className="md:col-span-1 group">
                               <label className="block text-[#8C857E] text-[9px] font-bold uppercase tracking-widest mb-2 group-focus-within:text-[#C5A065] transition-colors">CORREO ELECTRÓNICO</label>
                               <input type="email" placeholder="tucorreo@ejemplo.com" className="w-full border-b border-gray-200 py-3 text-sm focus:outline-none focus:border-[#C5A065] transition-all bg-transparent placeholder-gray-300 text-[#2C2C2C]" />
                           </div>

                           {/* Project Dropdown */}
                           <div className="md:col-span-1 group">
                               <label className="block text-[#8C857E] text-[9px] font-bold uppercase tracking-widest mb-2 group-focus-within:text-[#C5A065] transition-colors">PROYECTO DE INTERÉS</label>
                               <div className="relative">
                                   <select className="w-full border-b border-gray-200 py-3 text-sm focus:outline-none focus:border-[#C5A065] transition-all bg-transparent text-[#2C2C2C] appearance-none cursor-pointer">
                                       <option>Seleccionar...</option>
                                       <option>Ciudad Venecia Danlí</option>
                                       <option>Ciudad Venecia Olancho</option>
                                       <option>Ciudad Venecia Valle</option>
                                       <option>Residencial Versalles</option>
                                       <option>Ciudad Venecia Raíces</option>
                                       <option>Hills City</option>
                                   </select>
                                   <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                       <span className="text-xs">▼</span>
                                   </div>
                               </div>
                           </div>

                           {/* Message */}
                           <div className="md:col-span-2 group">
                               <label className="block text-[#8C857E] text-[9px] font-bold uppercase tracking-widest mb-2 group-focus-within:text-[#C5A065] transition-colors">¿QUÉ TIENES EN MENTE?</label>
                               <textarea rows={3} placeholder="Cuéntanos si buscas lote, casa, información de financiamiento, etc." className="w-full border-b border-gray-200 py-3 text-sm focus:outline-none focus:border-[#C5A065] transition-all bg-transparent placeholder-gray-300 text-[#2C2C2C] resize-none"></textarea>
                           </div>

                           {/* Submit Button */}
                           <div className="md:col-span-2 mt-6 flex flex-col items-center">
                               <button type="submit" className="px-12 py-4 bg-[#C5A065] text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#2C2C2C] transition-all duration-500 shadow-md hover:shadow-lg w-full md:w-auto">
                                   ENVIAR Y HABLAR CON UN ASESOR
                               </button>
                               <p className="text-center text-[9px] text-gray-400 mt-6 leading-relaxed max-w-md">
                                   Al enviar este formulario aceptas ser contactado por INMAER para recibir información sobre el proyecto seleccionado.
                               </p>
                           </div>
                       </form>
                   </div>
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
