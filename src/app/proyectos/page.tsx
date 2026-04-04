"use client";

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'motion/react';
import { Reveal } from '@/components/motion/Reveal';
import Navbar from '@/components/Navbar';
import TileHero from '@/components/TileHero';
import HorizontalGallery from '@/components/HorizontalGallery';
import CinematicDivider from '@/components/CinematicDivider';

export default function Proyectos() {
  function handleContactSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const nombre = (data.get('nombre') as string || '').trim();
    const telefono = (data.get('telefono') as string || '').trim();
    const proyecto = (data.get('proyecto') as string || '').trim();
    const mensaje = (data.get('mensaje') as string || '').trim();
    const parts = ['Hola, me comunico desde la web de Ciudad Venecia.'];
    if (nombre) parts.push(`*Nombre:* ${nombre}`);
    if (telefono) parts.push(`*Teléfono:* ${telefono}`);
    if (proyecto && proyecto !== 'Seleccionar...') parts.push(`*Proyecto de interés:* ${proyecto}`);
    if (mensaje) parts.push(`*Mensaje:* ${mensaje}`);
    window.open(`https://wa.me/50489494639?text=${encodeURIComponent(parts.join('\n'))}`, '_blank');
  }

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Montserrat:wght@200;300;400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); };
  }, []);

  return (
    <div className="bg-[#F3F0EB] text-[#2C2C2C] antialiased min-h-screen flex flex-col font-sans selection:bg-[#C5A065] selection:text-white overflow-x-hidden">
      <style jsx global>{`
        body { font-family: 'Montserrat', sans-serif; }
        h1, h2, h3, h4, h5, h6, .font-serif-display { font-family: 'Cormorant Garamond', serif; }
      `}</style>
      
      <Navbar activeRoute="/proyectos" />

      {/* ------------------- HERO: TILE SLIDER ------------------- */}
      <TileHero />

      {/* ------------------- NEW SECTION 1: MANIFESTO (TEXTO ELEGANTE) ------------------- */}
      <section className="py-24 px-6 md:px-12 max-w-5xl mx-auto text-center">
        <Reveal>
          <span className="text-[#C5A065] text-[10px] font-bold uppercase tracking-[0.3em] mb-6 block">NUESTRA VISIÓN</span>
          <h2 className="font-serif-display text-4xl md:text-6xl text-[#2C2C2C] mb-8 leading-tight">
             "Cada proyecto es una promesa cumplida de <br/><span className="italic text-[#C5A065]">orden, seguridad y valor.</span>"
          </h2>
          <div className="w-24 h-[1px] bg-[#C5A065] mx-auto mb-8"></div>
          <p className="text-lg md:text-xl text-[#6B665F] font-light leading-relaxed max-w-3xl mx-auto">
              No solo urbanizamos tierra; transformamos el paisaje para crear comunidades donde el bienestar es la norma, no la excepción.
          </p>
        </Reveal>
      </section>

      {/* ------------------- NEW SECTION 2: IMPACTO WOW (ESTADÍSTICAS MODERNAS) ------------------- */}
      <section className="py-20 bg-[#2C2C2C] text-white relative overflow-hidden">
          {/* Decorative Big Number Background */}
          <div className="absolute -left-20 top-1/2 -translate-y-1/2 text-white/[0.03] font-serif-display text-[400px] leading-none pointer-events-none">
              12
          </div>
          
          <div className="max-w-[1400px] mx-auto px-6 relative z-10 grid lg:grid-cols-3 gap-12 items-center">
             {/* Left: Description */}
             <div className="lg:col-span-1 border-l border-[#C5A065] pl-8">
                 <Reveal>
                     <h3 className="font-serif-display text-3xl mb-4">Crecimiento Sostenido</h3>
                     <p className="text-white/60 text-sm leading-relaxed">
                        Desde nuestro inicio en Danlí, hemos expandido nuestra huella de calidad a nuevas regiones, siempre manteniendo el estándar INMAER.
                     </p>
                 </Reveal>
             </div>

             {/* Right: Big Stats Row */}
             <div className="lg:col-span-2 flex flex-col md:flex-row justify-around items-center gap-12">
                 <Reveal delay={0.1}>
                    <div className="text-center group">
                        <span className="block text-6xl md:text-8xl font-serif-display text-white mb-2 group-hover:text-[#C5A065] transition-colors duration-500">
                           +850
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">Familias Residentes</span>
                    </div>
                 </Reveal>
                 
                 <div className="w-full h-[1px] md:w-[1px] md:h-24 bg-white/10"></div>

                 <Reveal delay={0.2}>
                    <div className="text-center group">
                        <span className="block text-6xl md:text-8xl font-serif-display text-white mb-2 group-hover:text-[#C5A065] transition-colors duration-500">
                           100%
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">Plusvalía Histórica</span>
                    </div>
                 </Reveal>
             </div>
          </div>
      </section>

      {/* ------------------- OLANCHO SHOWCASE: HORIZONTAL SCROLL ------------------- */}
      <HorizontalGallery />

      {/* ------------------- CINEMATIC TRANSITION ------------------- */}
      <CinematicDivider />

      {/* =========================================================================================
          SECCIÓN 3: CIUDAD VENECIA (MARCA PRINCIPAL)
      ========================================================================================= */}

      {/* =========================================================================================
          NUESTROS DESARROLLOS
      ========================================================================================= */}

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
                      <img src="/NUEVAS-JUANJOSE/cv_olancho_social2_vertical_web.jpg" alt="Ciudad Venecia Olancho" className="w-full h-full object-cover rounded-sm"/>
                      <img src="/NUEVAS-JUANJOSE/cv_olancho_social3_vertical_web.jpg" alt="Ciudad Venecia Olancho" className="w-full h-full object-cover rounded-sm"/>
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
                          <p className="text-xs text-[#6B665F]"><strong>Concepto:</strong> Ciudad Venecia Estándar y Ciudad Venecia Premium disponibles.</p>
                      </div>
                  </div>
              </Reveal>
          </div>
      </section>


      {/* --- RESIDENCIAL VERSALLES --- */}
      <section className="py-24 px-6 max-w-[1500px] mx-auto border-b border-[#C5A065]/20">
         <div className="grid lg:grid-cols-2 gap-16 items-start">
             <div>
                <Reveal>
                    <span className="text-[#C5A065] text-xs font-bold uppercase tracking-[0.2em] mb-2 block">DANLÍ, EL PARAÍSO</span>
                    <h2 className="font-serif-display text-4xl md:text-5xl text-[#2C2C2C] mb-6">Residencial Versalles</h2>
                    <p className="text-lg font-medium text-[#2C2C2C] mb-4">Exclusividad y tranquilidad a minutos del centro de Danlí.</p>
                    <div className="space-y-6 text-[#6B665F] text-sm leading-relaxed mb-8">
                        <div>
                            <strong className="block text-[#1A3A52] uppercase text-[10px] tracking-widest mb-1">Ubicación</strong>
                            A 5 km del centro de Danlí, a orilla de la Carretera Panamericana. Acceso privilegiado y conectividad inmediata.
                        </div>
                    </div>
                    <div className="bg-[#F9F7F4] p-6 mb-6">
                        <h4 className="text-[#C5A065] font-serif-display text-xl mb-3">Amenidades</h4>
                        <ul className="space-y-2 text-xs text-[#484848]">
                            <li>• Piscina y áreas recreativas</li>
                            <li>• Seguridad privada 24/7</li>
                            <li>• Calles pavimentadas</li>
                            <li>• Electrificación y agua potable</li>
                            <li>• Áreas verdes y parques</li>
                        </ul>
                    </div>
                </Reveal>
             </div>
             <div className="h-full">
                <Reveal delay={0.2}>
                    <div className="aspect-[4/5] bg-gray-200 relative overflow-hidden mb-6">
                        <img src="/DRON-FOTOS-SAMANTHA/VERSALLES/VERSALLES12-PREFERIDA.jpg" alt="Residencial Versalles" className="w-full h-full object-cover"/>
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
                        <img src="/homepage/san_lorenzo.jpg.jpeg" alt="Ciudad Venecia San Lorenzo" className="w-full h-full object-cover"/>
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
                        <h4 className="font-serif-display text-xl text-[#2C2C2C] mb-3">Amenidades</h4>
                        <ul className="space-y-2 text-xs text-[#484848]">
                             <li>• Áreas verdes y espacios recreativos</li>
                             <li>• A 10 minutos de la playa (Golfo de Fonseca)</li>
                             <li>• Calles pavimentadas</li>
                             <li>• Seguridad privada</li>
                             <li>• Electrificación y agua potable</li>
                        </ul>
                    </div>
                 </Reveal>
             </div>
         </div>
      </section>

      {/* --- 3.1 CIUDAD VENECIA DANLÍ --- */}
      <section className="border-b border-[#C5A065]/20">
         {/* Cinematic Video Banner */}
         <div className="relative h-[60vh] overflow-hidden">
            <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
                <source src="/homepage/CV_DRON_web.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A]/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
                <Reveal>
                    <span className="text-[#C5A065] text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] mb-3 block">EL PARAÍSO · COMUNIDAD CONSOLIDADA</span>
                    <h2 className="font-serif-display text-4xl md:text-6xl text-white mb-4 font-light">Ciudad Venecia Danlí</h2>
                    <p className="text-white/60 text-sm md:text-base max-w-lg">A pocos kilómetros del centro de Danlí, cerca de la UNAH-TEC y del Hospital Regional Gabriela Alvarado.</p>
                </Reveal>
            </div>
            {/* Stats overlay */}
            <div className="absolute bottom-0 right-0 hidden lg:flex items-end gap-0">
                <div className="bg-[#C5A065] text-white px-8 py-6 text-center">
                    <span className="block font-serif-display text-3xl">+850</span>
                    <span className="text-[8px] uppercase tracking-widest">Familias</span>
                </div>
                <div className="bg-white text-[#1A1A1A] px-8 py-6 text-center">
                    <span className="block font-serif-display text-3xl">100%</span>
                    <span className="text-[8px] uppercase tracking-widest">Plusvalía</span>
                </div>
                <div className="bg-[#F3F0EB] text-[#1A1A1A] px-8 py-6 text-center">
                    <span className="block font-serif-display text-3xl">3ra</span>
                    <span className="text-[8px] uppercase tracking-widest">Etapa</span>
                </div>
            </div>
         </div>

         {/* Content below video */}
         <div className="max-w-[1500px] mx-auto px-6 py-16">
            <div className="grid lg:grid-cols-3 gap-12">
                {/* Description */}
                <div className="lg:col-span-1">
                    <Reveal>
                        <p className="text-[#6B665F] text-sm leading-relaxed">
                            Ambiente muy agradable, lleno de frescura y vegetación. Hermosas áreas verdes, espacios recreativos para toda la familia y un paisaje realmente hermoso.
                        </p>
                    </Reveal>
                </div>
                {/* Amenidades */}
                <div className="lg:col-span-1">
                    <Reveal delay={0.1}>
                        <h4 className="text-[#C5A065] font-serif-display text-xl mb-4">Amenidades</h4>
                        <ul className="space-y-2 text-xs text-[#484848]">
                            <li>• Piscina para adultos y niños</li>
                            <li>• Áreas recreativas y parques</li>
                            <li>• Canchas deportivas</li>
                            <li>• Áreas sociales y quioscos</li>
                            <li>• Juegos infantiles</li>
                        </ul>
                    </Reveal>
                </div>
                {/* Infraestructura */}
                <div className="lg:col-span-1">
                    <Reveal delay={0.2}>
                        <h4 className="text-[#C5A065] font-serif-display text-xl mb-4">Infraestructura</h4>
                        <ul className="space-y-2 text-xs text-[#484848]">
                            <li>• Calles pavimentadas</li>
                            <li>• Agua potable 24 horas</li>
                            <li>• Electrificación completa</li>
                            <li>• Seguridad privada 24/7</li>
                            <li>• App de residentes</li>
                        </ul>
                    </Reveal>
                </div>
            </div>
         </div>
      </section>

      {/* --- 3.4 CIUDAD VENECIA RAÍCES – TALANGA (NUEVO 2026) --- */}
      <section className="py-24 px-6 bg-[#2C2C2C] text-white">
          <div className="max-w-[1400px] mx-auto">
              <Reveal>
                  <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-white/20 pb-8">
                      <div>
                          <span className="text-[#C5A065] text-[10px] font-bold uppercase tracking-[0.3em] mb-2 block">NUEVO LANZAMIENTO 2026</span>
                          <h2 className="font-serif-display text-4xl md:text-5xl">Ciudad Venecia Raíces</h2>
                          <p className="text-white/60 mt-2 text-sm">Talanga, Francisco Morazán.</p>
                      </div>
                      <div className="text-right mt-6 md:mt-0">
                          <p className="text-2xl font-serif-display text-[#C5A065]">3 Conceptos</p>
                          <p className="text-[10px] uppercase tracking-widest">Disponibles</p>
                      </div>
                  </div>
              </Reveal>

              {/* Video + Conceptos Grid */}
              <div className="grid lg:grid-cols-2 gap-12 mb-12">
                  {/* Video */}
                  <Reveal>
                      <div className="aspect-video overflow-hidden rounded-sm relative">
                          <video autoPlay muted loop playsInline className="w-full h-full object-cover">
                              <source src="/DRON-JUANJOSE/Talanga/dron_Talanga.mp4" type="video/mp4" />
                          </video>
                          <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-1.5 text-[9px] uppercase tracking-widest text-white/80">
                              Vista aérea · Talanga
                          </div>
                      </div>
                  </Reveal>

                  {/* Conceptos */}
                  <Reveal delay={0.2}>
                      <div className="grid grid-rows-3 gap-4 h-full">
                          <div className="bg-white/5 p-6 border border-white/10 flex items-center justify-between">
                              <div>
                                  <h4 className="text-[#C5A065] font-serif-display text-xl mb-1">Raíces</h4>
                                  <p className="text-xs opacity-80">Primera propiedad e inversión inteligente.</p>
                              </div>
                              <span className="text-[10px] uppercase tracking-widest opacity-40">Concepto Inicial</span>
                          </div>
                          <div className="bg-white/5 p-6 border border-white/10 flex items-center justify-between">
                              <div>
                                  <h4 className="text-[#C5A065] font-serif-display text-xl mb-1">Estándar</h4>
                                  <p className="text-xs opacity-80">Familias en crecimiento.</p>
                              </div>
                              <span className="text-[10px] uppercase tracking-widest opacity-40">Concepto Familiar</span>
                          </div>
                          <div className="bg-white/5 p-6 border border-white/10 flex items-center justify-between">
                              <div>
                                  <h4 className="text-[#C5A065] font-serif-display text-xl mb-1">Premium</h4>
                                  <p className="text-xs opacity-80">Nivel exclusivo.</p>
                              </div>
                              <span className="text-[10px] uppercase tracking-widest opacity-40">Concepto Exclusivo</span>
                          </div>
                      </div>
                  </Reveal>
              </div>

              {/* Amenidades */}
              <Reveal>
                  <div className="grid md:grid-cols-2 gap-8 bg-white/5 border border-white/10 p-8">
                      <div>
                          <h4 className="text-[#C5A065] font-serif-display text-xl mb-4">Amenidades</h4>
                          <ul className="space-y-2 text-xs text-white/70">
                              <li>• Piscinas residenciales</li>
                              <li>• Áreas sociales y parques</li>
                              <li>• Canchas deportivas</li>
                              <li>• Juegos infantiles</li>
                          </ul>
                      </div>
                      <div>
                          <h4 className="text-[#C5A065] font-serif-display text-xl mb-4">Infraestructura</h4>
                          <ul className="space-y-2 text-xs text-white/70">
                              <li>• Calles pavimentadas</li>
                              <li>• Electrificación completa</li>
                              <li>• Agua potable</li>
                              <li>• Seguridad privada 24/7</li>
                          </ul>
                      </div>
                  </div>
              </Reveal>
          </div>
      </section>


      {/* --- CIUDAD VENECIA GUAIMACA --- */}
      <section className="py-24 px-6 max-w-[1500px] mx-auto border-b border-[#C5A065]/20">
         <div className="grid lg:grid-cols-2 gap-16 items-center">
             <div>
                <Reveal>
                    <span className="text-[#C5A065] text-xs font-bold uppercase tracking-[0.2em] mb-2 block">FRANCISCO MORAZÁN · PRÓXIMAMENTE</span>
                    <h2 className="font-serif-display text-4xl md:text-5xl text-[#2C2C2C] mb-6">Ciudad Venecia Guaimaca</h2>
                    <p className="text-lg font-medium text-[#2C2C2C] mb-4">Un nuevo desarrollo que llevará el estándar Ciudad Venecia a Francisco Morazán.</p>
                    <div className="bg-[#F9F7F4] p-6">
                        <h4 className="text-[#C5A065] font-serif-display text-xl mb-3">Amenidades proyectadas</h4>
                        <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                            <ul className="space-y-2 text-xs text-[#484848]">
                                <li>• Piscinas residenciales</li>
                                <li>• Áreas sociales y parques</li>
                                <li>• Canchas deportivas</li>
                                <li>• Juegos infantiles</li>
                            </ul>
                            <ul className="space-y-2 text-xs text-[#484848]">
                                <li>• Calles pavimentadas</li>
                                <li>• Seguridad privada 24/7</li>
                                <li>• Electrificación y agua potable</li>
                                <li>• App de residentes</li>
                            </ul>
                        </div>
                    </div>
                </Reveal>
             </div>
             <div className="h-full">
                <Reveal delay={0.2}>
                    <div className="aspect-video overflow-hidden rounded-sm relative">
                        <video autoPlay muted loop playsInline className="w-full h-full object-cover">
                            <source src="/homepage/Guaimaca_web.mp4" type="video/mp4" />
                        </video>
                        <div className="absolute top-4 left-4 bg-[#C5A065] text-white px-4 py-2 text-[10px] font-bold uppercase tracking-widest">Próximamente</div>
                        <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-1.5 text-[9px] uppercase tracking-widest text-white/80">
                            Vista aérea · Guaimaca
                        </div>
                    </div>
                </Reveal>
             </div>
         </div>
      </section>

      {/* --- CIUDAD VENECIA TEGUCIGALPA --- */}
      <section className="py-24 px-6 max-w-[1500px] mx-auto">
         <div className="grid lg:grid-cols-2 gap-16 items-center">
             <div>
                <Reveal>
                    <span className="text-[#C5A065] text-xs font-bold uppercase tracking-[0.2em] mb-2 block">FRANCISCO MORAZÁN · MUY PRONTO</span>
                    <h2 className="font-serif-display text-4xl md:text-5xl text-[#2C2C2C] mb-6">Ciudad Venecia Tegucigalpa</h2>
                    <p className="text-lg font-medium text-[#2C2C2C] mb-4">El estándar Ciudad Venecia llega a la capital de Honduras.</p>
                    <div className="bg-[#F9F7F4] p-6">
                        <h4 className="text-[#C5A065] font-serif-display text-xl mb-3">Amenidades proyectadas</h4>
                        <ul className="space-y-2 text-xs text-[#484848]">
                            <li>• Piscinas residenciales</li>
                            <li>• Áreas sociales y recreativas</li>
                            <li>• Canchas deportivas</li>
                            <li>• Calles pavimentadas</li>
                            <li>• Seguridad privada</li>
                            <li>• App de residentes</li>
                            <li>• Canchas de pádel (próximamente)</li>
                        </ul>
                    </div>
                </Reveal>
             </div>
             <div className="h-full flex items-center justify-center">
                <Reveal delay={0.2}>
                    <div className="aspect-[4/5] w-full bg-[#2C2C2C] relative overflow-hidden flex items-center justify-center">
                        <div className="text-center">
                            <span className="font-serif-display text-6xl text-white/10">TGU</span>
                            <div className="mt-4 bg-[#C5A065] text-white px-6 py-2 text-[10px] font-bold uppercase tracking-widest inline-block">Muy pronto</div>
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
                       Cuéntanos qué proyecto te interesa y te contactamos sin compromisos.
                   </p>
                  </Reveal>
               </div>

               {/* Benefits Row */}
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 text-center">
                   {[
                       "Respuesta en menos de 24 horas hábiles.",
                       "Información clara sobre cada proyecto y sus amenidades.",
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
                             También puedes escribir o llamar a nuestro equipo comercial para agendar una visita a proyecto o resolver cualquier duda.
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
                       <form onSubmit={handleContactSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                           {/* Name */}
                           <div className="md:col-span-1 group">
                               <label className="block text-[#8C857E] text-[9px] font-bold uppercase tracking-widest mb-2 group-focus-within:text-[#C5A065] transition-colors">NOMBRE COMPLETO</label>
                               <input type="text" name="nombre" placeholder="Ej. Juan Pérez" className="w-full border-b border-gray-200 py-3 text-sm focus:outline-none focus:border-[#C5A065] transition-all bg-transparent placeholder-gray-300 text-[#2C2C2C]" />
                           </div>
                           
                           {/* Phone */}
                           <div className="md:col-span-1 group">
                               <label className="block text-[#8C857E] text-[9px] font-bold uppercase tracking-widest mb-2 group-focus-within:text-[#C5A065] transition-colors">TELÉFONO / WHATSAPP</label>
                               <input type="text" name="telefono" placeholder="+504 0000-0000" className="w-full border-b border-gray-200 py-3 text-sm focus:outline-none focus:border-[#C5A065] transition-all bg-transparent placeholder-gray-300 text-[#2C2C2C]" />
                           </div>

                           {/* Email */}
                           <div className="md:col-span-1 group">
                               <label className="block text-[#8C857E] text-[9px] font-bold uppercase tracking-widest mb-2 group-focus-within:text-[#C5A065] transition-colors">CORREO ELECTRÓNICO</label>
                               <input type="email" name="email" placeholder="tucorreo@ejemplo.com" className="w-full border-b border-gray-200 py-3 text-sm focus:outline-none focus:border-[#C5A065] transition-all bg-transparent placeholder-gray-300 text-[#2C2C2C]" />
                           </div>

                           {/* Project Dropdown */}
                           <div className="md:col-span-1 group">
                               <label className="block text-[#8C857E] text-[9px] font-bold uppercase tracking-widest mb-2 group-focus-within:text-[#C5A065] transition-colors">PROYECTO DE INTERÉS</label>
                               <div className="relative">
                                   <select name="proyecto" className="w-full border-b border-gray-200 py-3 text-sm focus:outline-none focus:border-[#C5A065] transition-all bg-transparent text-[#2C2C2C] appearance-none cursor-pointer">
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
                               <textarea name="mensaje" rows={3} placeholder="Cuéntanos si buscas lote, casa, información de financiamiento, etc." className="w-full border-b border-gray-200 py-3 text-sm focus:outline-none focus:border-[#C5A065] transition-all bg-transparent placeholder-gray-300 text-[#2C2C2C] resize-none"></textarea>
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
                        <li><Link href="/proyectos" className="text-sm font-medium hover:text-[#C5A065] transition-colors">Ciudad Venecia Danlí</Link></li>
                        <li><Link href="/proyectos" className="text-sm font-medium hover:text-[#C5A065] transition-colors">Ciudad Venecia Olancho</Link></li>
                        <li><Link href="/proyectos" className="text-sm font-medium hover:text-[#C5A065] transition-colors">Ciudad Venecia Valle</Link></li>
                        <li><Link href="/proyectos" className="text-sm font-medium hover:text-[#C5A065] transition-colors">Residencial Versalles</Link></li>
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
                     <Link href="/" className="text-[10px] text-white/40 hover:text-white uppercase tracking-widest transition-colors">Privacidad</Link>
                     <Link href="/" className="text-[10px] text-white/40 hover:text-white uppercase tracking-widest transition-colors">Términos</Link>
                </div>
            </div>
        </div>
      </footer>
    </div>
  );
}
