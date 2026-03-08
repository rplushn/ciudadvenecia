"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Reveal } from '@/components/motion/Reveal';
import CountUp from '@/components/motion/CountUp';
import Navbar from '@/components/Navbar';

export default function QuienesSomos() {
  // Load Fonts
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Montserrat:wght@200;300;400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); };
  }, []);

  // DATA MOCKUP (Updated for CountUp compatibility)
  const stats = [
    { number: 12, prefix: "", suffix: "", label: "Años de Trayectoria" },
    { number: 4, prefix: "+", suffix: "", label: "Ciudades" },
    { number: 850, prefix: "", suffix: "+", label: "Familias Felices" },
    { number: 100, prefix: "", suffix: "%", label: "Plusvalía" }
  ];

  const values = [
    { title: "Transparencia", desc: "Reglas claras desde el primer día. Sin letras pequeñas." },
    { title: "Innovación", desc: "Diseño urbano que respeta la naturaleza y la estética." },
    { title: "Respaldo", desc: "Solidez financiera y legal en cada metro cuadrado." },
    { title: "Comunidad", desc: "No vendemos lotes, creamos vecindarios vivos." }
  ];

  return (
    <div className="bg-[#F3F0EB] text-[#2C2C2C] antialiased min-h-screen flex flex-col font-sans selection:bg-[#C5A065] selection:text-white overflow-x-hidden">
      <style jsx global>{`
        body { font-family: 'Montserrat', sans-serif; }
        h1, h2, h3, h4, h5, h6, .font-serif-display { font-family: 'Cormorant Garamond', serif; }
        .parallax-bg { background-attachment: fixed; background-position: center; background-repeat: no-repeat; background-size: cover; }
      `}</style>
      
      <Navbar activeRoute="/quienes-somos" />

      {/* ------------------- 1. HERO SECTION (REDESIGNED TO MATCH PROYECTOS) ------------------- */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-[#1A3A52]">
         <div className="absolute inset-0 opacity-40">
            <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('/homepage/versalles_outdoor.jpg.jpeg')" }}></div>
         </div>
         <div className="absolute inset-0 bg-gradient-to-b from-[#1A3A52]/80 to-[#1A3A52]"></div>
         <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-20">
            <Reveal>
              <span className="text-[#C5A065] text-xs font-bold uppercase tracking-[0.4em] mb-6 block">
                  INMAER Real Estate
              </span>
              <h1 className="font-serif-display text-5xl md:text-8xl text-white mb-8 leading-none">
                Más que tierra, <br/><span className="italic font-light text-white/50">creamos futuro.</span>
              </h1>
              <p className="text-white/70 text-sm md:text-lg font-light leading-relaxed max-w-2xl mx-auto">
                Somos los arquitectos detrás de Ciudad Venecia. Desarrollamos comunidades planeadas para que tu inversión crezca tan fuerte como tu familia.
              </p>
            </Reveal>
         </div>
      </section>

      {/* ------------------- 2. THE MANIFESTO (Text Heavy / Elegant) ------------------- */}
      <section className="py-24 px-6 md:px-12 max-w-4xl mx-auto text-center">
        <Reveal>
          <h2 className="font-serif-display text-4xl md:text-5xl text-[#2C2C2C] mb-10">Nuestro Porqué</h2>
          <p className="text-xl md:text-2xl text-[#6B665F] font-serif-display leading-relaxed italic mb-8">
              "Creemos que el orden urbano no es un lujo, es un derecho. En un país donde el crecimiento desordenado es la norma, nosotros elegimos ser la excepción."
          </p>
          <div className="w-16 h-[2px] bg-[#C5A065] mx-auto"></div>
        </Reveal>
      </section>

      {/* ------------------- 3. STATISTICS (Visual Break) ------------------- */}
      <section className="py-20 bg-white border-y border-[#C5A065]/20">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
              {stats.map((stat, i) => (
                  <div key={i} className="space-y-2">
                      <span className="font-serif-display text-5xl md:text-7xl text-[#C5A065] block">
                        <CountUp to={stat.number} prefix={stat.prefix} suffix={stat.suffix} />
                      </span>
                      <span className="text-[#2C2C2C] uppercase tracking-widest text-xs font-bold">{stat.label}</span>
                  </div>
              ))}
          </div>
      </section>

      {/* ------------------- 4. HISTORY / ORIGIN ------------------- */}
      <section className="py-24 px-6 md:px-12 max-w-[1600px] mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1 relative">
            <Reveal delay={0.2}>
              <div className="aspect-[3/4] bg-[#E5E0D8] overflow-hidden relative">
                  {/* Changed to local asset for consistency */}
                  <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/homepage/portal_ai-ciudad_venecia.jpeg')" }}></div>
              </div>
              <div className="absolute -bottom-10 -right-10 bg-[#C5A065] text-white p-8 max-w-xs hidden md:block shadow-2xl">
                  <p className="font-serif-display text-2xl italic">"Todo comenzó con un sueño en Danlí."</p>
              </div>
            </Reveal>
          </div>
          <div className="order-1 md:order-2">
            <Reveal>
              <span className="text-[#C5A065] uppercase tracking-widest text-xs font-bold mb-4 block">Nuestros Inicios</span>
              <h2 className="font-serif-display text-5xl text-[#2C2C2C] mb-8">De un Lote a una Ciudad</h2>
              <p className="text-[#6B665F] leading-loose mb-6">
                  INMAER nació hace más de una década en la zona oriental de Honduras. Lo que empezó como un pequeño proyecto de lotificación se transformó rápidamente en un estándar de calidad.
              </p>
              <p className="text-[#6B665F] leading-loose">
                  Vimos lo que faltaba: calles amplias, áreas verdes reales, agua constante y seguridad. Decidimos no ofrecer menos que eso. Hoy, Ciudad Venecia es sinónimo de plusvalía garantizada.
              </p>
            </Reveal>
          </div>
      </section>

      {/* ------------------- 5. PARALLAX BREAK 1 (Landscape) ------------------- */}
      <section className="py-32 bg-fixed bg-cover bg-center relative" style={{ backgroundImage: "url('/homepage/outdoor2.jpg.jpeg')" }}>
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="relative z-10 text-center text-white px-6">
            <Reveal>
              <h2 className="font-serif-display text-5xl md:text-7xl mb-4">Naturaleza & Urbanismo</h2>
              <p className="text-xl uppercase tracking-widest font-light">En perfecta sincronía</p>
            </Reveal>
          </div>
      </section>

      {/* ------------------- 6. OUR PHILOSOPHY (Cards) ------------------- */}
      <section className="py-24 px-6 bg-[#F9F7F4]">
          <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <Reveal>
                  <h2 className="font-serif-display text-4xl text-[#2C2C2C]">Nuestros Pilares</h2>
                </Reveal>
              </div>
              <div className="grid md:grid-cols-4 gap-8">
                  {values.map((val, i) => (
                      <Reveal key={i} delay={i * 0.1}>
                        <div className="bg-white p-10 shadow-sm border-t-2 border-[#C5A065] hover:-translate-y-2 transition-transform duration-500 h-full">
                            <h3 className="font-serif-display text-2xl text-[#2C2C2C] mb-4">{val.title}</h3>
                            <p className="text-[#6B665F] text-sm leading-relaxed">{val.desc}</p>
                        </div>
                      </Reveal>
                  ))}
              </div>
          </div>
      </section>

      {/* ------------------- 7. THE "INMAER" STANDARD (Detailed) ------------------- */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
              <div>
                <Reveal>
                  <h2 className="font-serif-display text-4xl text-[#2C2C2C] mb-8">El Estándar INMAER</h2>
                  <div className="space-y-8">
                      {[
                          { title: "Certeza Jurídica", text: "Cada vara cuadrada que vendemos tiene su documentación en regla. Sin sorpresas." },
                          { title: "Diseño Atemporal", text: "Fachadas, pórticos y áreas comunes diseñadas para envejecer con elegancia." },
                          { title: "Servicios Premium", text: "Redes eléctricas, agua potable propia y gestión de residuos de primer nivel." }
                      ].map((item, i) => (
                          <div key={i} className="flex gap-6">
                              <span className="text-[#C5A065] font-serif-display text-4xl italic">0{i+1}</span>
                              <div>
                                  <h4 className="font-bold text-[#2C2C2C] uppercase tracking-wider text-sm mb-2">{item.title}</h4>
                                  <p className="text-[#6B665F] leading-relaxed">{item.text}</p>
                              </div>
                          </div>
                      ))}
                  </div>
                </Reveal>
              </div>
              <div className="bg-gray-200 h-full min-h-[500px] relative">
                <Reveal className="h-full" delay={0.2}>
                   {/* Changed to local asset for consistency */}
                   <div className="absolute inset-0 bg-cover bg-center grayscale hover:grayscale-0 transition-all duration-700" 
                        style={{ backgroundImage: "url('/amenidades/amenidades_club.jpg.jpeg')" }}></div>
                </Reveal>
              </div>
          </div>
      </section>

      {/* ------------------- 8. PARALLAX BREAK 2 (Lifestyle) ------------------- */}
      <section className="h-[60vh] bg-fixed bg-cover bg-center relative flex items-center justify-center" style={{ backgroundImage: "url('/homepage/familia_jugando.jpg.jpeg')" }}>
          <Reveal>
            <div className="bg-white/90 p-12 max-w-2xl text-center shadow-2xl backdrop-blur-sm mx-4">
                <h3 className="font-serif-display text-3xl text-[#2C2C2C] mb-4">"No vendemos tierra, vendemos el futuro de tu familia."</h3>
                <p className="text-[#C5A065] font-bold uppercase tracking-widest text-xs">— La Dirección</p>
            </div>
          </Reveal>
      </section>

      {/* ------------------- 9. LEADERSHIP / TEAM ------------------- */}
      <section className="py-24 px-6 bg-white">
          <div className="max-w-7xl mx-auto text-center mb-16">
            <Reveal>
              <span className="text-[#C5A065] uppercase tracking-widest text-xs font-bold mb-4 block">Mentes Maestras</span>
              <h2 className="font-serif-display text-4xl text-[#2C2C2C]">Liderazgo con Visión</h2>
            </Reveal>
          </div>
          {/* Placeholder for Team Grid - Abstract representation for now */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[1, 2, 3].map((_, i) => (
                  <Reveal key={i} delay={i * 0.1}>
                    <div className="group cursor-pointer">
                        <div className="aspect-[3/4] bg-[#F3F0EB] mb-6 overflow-hidden relative">
                             {/* Placeholder images - keeping unsplash as placeholders but darkened/styled */}
                             <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                                  style={{ backgroundImage: `url('https://images.unsplash.com/photo-${i === 0 ? '1560250097-0b93528c311a' : i === 1 ? '1573496359142-b8d87734a5a2' : '1519085360753-af0119f7cbe7'}?q=80&w=1000')` }}></div>
                        </div>
                        <h3 className="font-serif-display text-2xl text-[#2C2C2C]">Ejecutivo {i+1}</h3>
                        <p className="text-[#C5A065] text-xs uppercase tracking-widest font-bold">Dirección General</p>
                    </div>
                  </Reveal>
              ))}
          </div>
      </section>

      {/* ------------------- 10. SOCIAL PROOF / TESTIMONIALS ------------------- */}
      <section className="py-24 px-6 bg-[#2C2C2C] text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 text-[#C5A065]/5 font-serif-display text-[20rem] leading-none -mt-20 -mr-20 pointer-events-none">
              “
          </div>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <Reveal>
              <p className="font-serif-display text-2xl md:text-4xl leading-relaxed italic mb-10 text-white/90">
                  "Invertir en Ciudad Venecia fue la mejor decisión financiera que he tomado. En 3 años mi lote duplicó su valor y la seguridad es incomparable."
              </p>
              <div className="flex items-center justify-center gap-4">
                  <div className="w-12 h-12 bg-[#C5A065] rounded-full"></div>
                  <div className="text-left">
                      <p className="font-bold text-white uppercase tracking-widest text-xs">Familia Rodríguez</p>
                      <p className="text-[#C5A065] text-xs">Residentes Ciudad Venecia Danlí</p>
                  </div>
              </div>
            </Reveal>
          </div>
      </section>

      {/* ------------------- 11. FUTURE VISION (Expansion) ------------------- */}
      <section className="py-24 px-6 bg-[#F3F0EB]">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
              <div>
                <Reveal>
                   <span className="text-[#C5A065] uppercase tracking-widest text-xs font-bold mb-4 block">Lo que viene</span>
                   <h2 className="font-serif-display text-5xl text-[#2C2C2C] mb-6">Expansión Nacional</h2>
                   <p className="text-[#6B665F] leading-loose mb-8">
                       No nos detenemos. Nuestra visión para 2030 es llevar el sello de calidad INMAER a las principales ciudades de Honduras. 
                   </p>
                   <ul className="space-y-4">
                       {['Tegucigalpa', 'San Lorenzo', 'Olancho', 'Comayagua'].map((city, i) => (
                           <li key={i} className="flex items-center gap-4 text-[#2C2C2C] font-medium border-b border-[#C5A065]/20 pb-2">
                               <span className="text-[#C5A065]">➝</span> {city} {i === 0 && <span className="text-[10px] bg-[#C5A065] text-white px-2 py-0.5 rounded-full ml-2">PRÓXIMAMENTE</span>}
                           </li>
                       ))}
                   </ul>
                </Reveal>
              </div>
              <div className="aspect-square bg-white border p-4 shadow-xl rotate-3 hover:rotate-0 transition-transform duration-500">
                  {/* Changed to local asset */}
                  <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('/homepage/versalles_outdoor.jpg.jpeg')" }}></div>
              </div>
          </div>
      </section>

      {/* ------------------- 12. NEW COMPLEX CONTACT CTA (EXACT CLONE FROM HOME) ------------------- */}
       <section id="kontakt" className="py-24 px-6 bg-[#F3F0EB]">
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

               {/* Split Container - RE-DESIGNED FOR ELEGANCE (No Blue Box) */}
               <div className="grid grid-cols-1 lg:grid-cols-12 shadow-2xl rounded-sm overflow-hidden bg-white">
                   
                   {/* LEFT: Info Column (Now Elegant Beige/Gray instead of Blue) */}
                   <div className="lg:col-span-4 bg-[#EBE7DF] p-10 md:p-12 text-[#484848] flex flex-col justify-center relative overflow-hidden">
                       {/* Subtle Texture Overlay */}
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

                   {/* RIGHT: Form (8 cols) - Clean White with Gold Accents */}
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
