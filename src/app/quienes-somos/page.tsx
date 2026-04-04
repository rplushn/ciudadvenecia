"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Reveal } from '@/components/motion/Reveal';
import CountUp from '@/components/motion/CountUp';
import Navbar from '@/components/Navbar';
import AdvisorCTA from '@/components/AdvisorCTA';

export default function QuienesSomos() {
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
    { number: 10, prefix: "+", suffix: "", label: "Años de Trayectoria" },
    { number: 7, prefix: "", suffix: "", label: "Proyectos Activos" },
    { number: 1500, prefix: "+", suffix: "", label: "Familias Felices" },
    { number: 100, prefix: "", suffix: "%", label: "Plusvalía Garantizada" }
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

      {/* ------------------- 1. HERO SECTION — CINEMATIC ------------------- */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
         {/* Video background */}
         <div className="absolute inset-0">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-40"
            >
              <source src="/NUEVAS-JUANJOSE/horizontales/cv_olancho_piscina_web.mp4" type="video/mp4" />
            </video>
         </div>

         {/* Cinematic overlays */}
         <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/70" />
         <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />

         {/* Film grain */}
         <div 
           className="absolute inset-0 opacity-[0.04] pointer-events-none z-20"
           style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }}
         />

         {/* Gold accent lines — top & bottom */}
         <motion.div 
           className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C5A065]/40 to-transparent z-30"
           initial={{ scaleX: 0 }}
           animate={{ scaleX: 1 }}
           transition={{ duration: 2, delay: 0.5, ease: [0.25, 0.8, 0.25, 1] }}
         />
         <motion.div 
           className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C5A065]/20 to-transparent z-30"
           initial={{ scaleX: 0 }}
           animate={{ scaleX: 1 }}
           transition={{ duration: 2, delay: 1, ease: [0.25, 0.8, 0.25, 1] }}
         />

         {/* Content */}
         <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">

            {/* Label */}
            <motion.span
              className="text-[#C5A065] text-[9px] font-bold uppercase tracking-[0.6em] mb-10 block"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              INMAER · Desarrolladores Inmobiliarios
            </motion.span>

            {/* Main title */}
            <h1 className="font-serif-display text-5xl sm:text-6xl md:text-7xl lg:text-[90px] text-white mb-6 leading-[0.95]">
              <motion.div
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.8, ease: [0.25, 0.8, 0.25, 1] }}
              >
                Más que tierra,
              </motion.div>
              <motion.div
                className="italic font-light text-[#C5A065]"
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 1.1, ease: [0.25, 0.8, 0.25, 1] }}
              >
                creamos futuro.
              </motion.div>
            </h1>

            {/* Gold line */}
            <motion.div
              className="h-[1px] w-[80px] bg-[#C5A065] mx-auto mb-8"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 1.5, ease: [0.25, 0.8, 0.25, 1] }}
            />

            {/* Subtitle */}
            <motion.p
              className="text-white/50 text-sm md:text-base font-light leading-relaxed max-w-xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8, duration: 1 }}
            >
              Desarrollamos comunidades planeadas donde la inversión, la naturaleza y la calidad de vida se encuentran.
            </motion.p>
         </div>

         {/* Scroll indicator */}
         <motion.div
           className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-3"
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 2.5 }}
         >
           <span className="text-white/20 text-[7px] uppercase tracking-[0.5em]">Scroll</span>
           <motion.div
             animate={{ y: [0, 8, 0] }}
             transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
             className="w-[1px] h-8 bg-gradient-to-b from-[#C5A065]/0 to-[#C5A065]/30"
           />
         </motion.div>

         {/* Corner accents */}
         <div className="absolute top-8 left-8 w-12 h-12 border-t border-l border-[#C5A065]/15 z-30" />
         <div className="absolute top-8 right-8 w-12 h-12 border-t border-r border-[#C5A065]/15 z-30" />
         <div className="absolute bottom-8 left-8 w-12 h-12 border-b border-l border-[#C5A065]/15 z-30" />
         <div className="absolute bottom-8 right-8 w-12 h-12 border-b border-r border-[#C5A065]/15 z-30" />
      </section>

      {/* ------------------- 2. THE MANIFESTO ------------------- */}
      <section className="py-32 px-6 md:px-12 max-w-4xl mx-auto text-center">
        {/* Title */}
        <motion.h2 
          className="font-serif-display text-4xl md:text-5xl text-[#2C2C2C] mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.8, 0.25, 1] }}
        >
          Nuestro Porqué
        </motion.h2>

        {/* Quote — line by line reveal */}
        {[
          '"Creemos que el orden urbano',
          'no es un lujo, es un derecho.',
          'En un país donde el crecimiento',
          'desordenado es la norma,',
          'nosotros elegimos ser la excepción."',
        ].map((line, i) => (
          <motion.p
            key={i}
            className="text-xl md:text-2xl text-[#6B665F] font-serif-display leading-relaxed italic"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.12, duration: 0.6, ease: [0.25, 0.8, 0.25, 1] }}
          >
            {line}
          </motion.p>
        ))}

        {/* Gold line */}
        <motion.div
          className="w-16 h-[2px] bg-[#C5A065] mx-auto mt-12"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.9, duration: 0.8, ease: [0.25, 0.8, 0.25, 1] }}
        />
      </section>

      {/* ------------------- 3. STATISTICS ------------------- */}
      <section className="py-24 bg-white border-y border-[#C5A065]/20 overflow-hidden">
          {/* Horizontal gold line that draws across */}
          <motion.div
            className="h-[1px] bg-gradient-to-r from-transparent via-[#C5A065]/30 to-transparent max-w-5xl mx-auto mb-16"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.25, 0.8, 0.25, 1] }}
          />

          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
              {stats.map((stat, i) => (
                  <motion.div
                    key={i}
                    className="relative"
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.18, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  >
                      {/* Number with glow */}
                      <motion.span 
                        className="font-serif-display text-5xl md:text-7xl text-[#C5A065] block mb-3 relative"
                        initial={{ scale: 0.5, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 + i * 0.18, duration: 0.6, type: "spring", stiffness: 150 }}
                      >
                        <CountUp to={stat.number} prefix={stat.prefix} suffix={stat.suffix} />
                      </motion.span>

                      {/* Label slides up from behind mask */}
                      <div className="overflow-hidden">
                        <motion.span 
                          className="text-[#2C2C2C] uppercase tracking-widest text-xs font-bold block"
                          initial={{ y: '100%' }}
                          whileInView={{ y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.6 + i * 0.18, duration: 0.5, ease: [0.25, 0.8, 0.25, 1] }}
                        >
                          {stat.label}
                        </motion.span>
                      </div>

                      {/* Subtle gold dot below */}
                      <motion.div
                        className="w-1.5 h-1.5 rounded-full bg-[#C5A065] mx-auto mt-4"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.8 + i * 0.18, type: "spring", stiffness: 300 }}
                      />
                  </motion.div>
              ))}
          </div>

          {/* Bottom gold line */}
          <motion.div
            className="h-[1px] bg-gradient-to-r from-transparent via-[#C5A065]/30 to-transparent max-w-5xl mx-auto mt-16"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 1.2, ease: [0.25, 0.8, 0.25, 1] }}
          />
      </section>

      {/* ------------------- 4. HISTORY / ORIGIN ------------------- */}
      <section className="py-24 px-6 md:px-12 max-w-[1600px] mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1 relative">
            <motion.div
              initial={{ opacity: 0, x: -60, rotate: -2 }}
              whileInView={{ opacity: 1, x: 0, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="aspect-[3/4] bg-[#E5E0D8] overflow-hidden relative">
                  <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/DRON-FOTOS-SAMANTHA/VERSALLES/VERSALLES002.jpg')" }}></div>
              </div>
            </motion.div>
            <motion.div
              className="absolute -bottom-10 -right-10 bg-[#C5A065] text-white p-8 max-w-xs hidden md:block shadow-2xl"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
            >
              <p className="font-serif-display text-2xl italic">"Todo comenzó con un sueño en Danlí."</p>
            </motion.div>
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

      {/* ------------------- 4B. TIMELINE "NUESTRA HISTORIA" ------------------- */}
      <section className="py-24 px-6 bg-[#F9F7F4]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <motion.span className="text-[#C5A065] text-[10px] font-bold uppercase tracking-[0.35em] block mb-3" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>Trayectoria</motion.span>
            <motion.h2 className="font-serif-display text-4xl md:text-5xl text-[#2C2C2C]" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>Nuestra Historia</motion.h2>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-[#C5A065]/20 -translate-x-1/2" />

            {[
              { year: "2014", title: "Nace INMAER", desc: "Fundación de la empresa con una visión clara: transformar el desarrollo inmobiliario en Honduras.", side: "left" },
              { year: "2016", title: "Ciudad Venecia Danlí", desc: "Lanzamiento del proyecto insignia. Los primeros 50 lotes se vendieron en tiempo récord.", side: "right" },
              { year: "2019", title: "250 Familias", desc: "Un cuarto de millar de familias confían en INMAER. La plusvalía supera el 40%.", side: "left" },
              { year: "2022", title: "Expansión Regional", desc: "Olancho y Valle se suman al portafolio. INMAER sale de El Paraíso por primera vez.", side: "right" },
              { year: "2024", title: "+700 Familias", desc: "Consolidación como la desarrolladora líder del oriente hondureño.", side: "left" },
              { year: "2026", title: "5 Ciudades, 7 Proyectos", desc: "Talanga, Guaimaca y Tegucigalpa se unen. El futuro es nacional.", side: "right" },
            ].map((item, i) => (
              <motion.div
                key={item.year}
                className={`relative flex items-center mb-16 last:mb-0 ${item.side === "left" ? "flex-row" : "flex-row-reverse"}`}
                initial={{ opacity: 0, x: item.side === "left" ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className={`w-[calc(50%-24px)] ${item.side === "left" ? "text-right pr-8" : "text-left pl-8"}`}>
                  <span className="font-serif-display text-4xl text-[#C5A065] block mb-2">{item.year}</span>
                  <h3 className="font-bold text-[#2C2C2C] text-lg mb-2">{item.title}</h3>
                  <p className="text-[#6B665F] text-sm leading-relaxed">{item.desc}</p>
                </div>

                {/* Center dot */}
                <motion.div
                  className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#C5A065] border-4 border-[#F9F7F4] z-10 shadow-lg shadow-[#C5A065]/30"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                />

                <div className="w-[calc(50%-24px)]" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------- 5. PARALLAX BREAK 1 (Landscape) ------------------- */}
      <section className="py-32 bg-fixed bg-cover bg-center relative" style={{ backgroundImage: "url('/NUEVAS-JUANJOSE/horizontales/cv_olancho_piscina_horizontal_web.jpg')" }}>
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
                      <motion.div
                        key={i}
                        className="bg-white p-10 shadow-sm h-full"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.15, duration: 0.5 }}
                        whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(197,160,101,0.15)" }}
                      >
                        <motion.div
                          className="h-[2px] bg-[#C5A065] mb-6"
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + i * 0.15, duration: 0.6 }}
                          style={{ originX: 0 }}
                        />
                        <h3 className="font-serif-display text-2xl text-[#2C2C2C] mb-4">{val.title}</h3>
                        <p className="text-[#6B665F] text-sm leading-relaxed">{val.desc}</p>
                      </motion.div>
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
                          <motion.div
                            key={i}
                            className="flex gap-6"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2, duration: 0.5 }}
                          >
                              <span className="text-[#C5A065] font-serif-display text-4xl italic">0{i+1}</span>
                              <div>
                                  <h4 className="font-bold text-[#2C2C2C] uppercase tracking-wider text-sm mb-2">{item.title}</h4>
                                  <p className="text-[#6B665F] leading-relaxed">{item.text}</p>
                              </div>
                          </motion.div>
                      ))}
                  </div>
                </Reveal>
              </div>
              <div className="bg-gray-200 h-full min-h-[500px] relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-cover bg-center grayscale hover:grayscale-0 transition-all duration-700"
                  style={{ backgroundImage: "url('/NUEVAS-JUANJOSE/horizontales/cv_olancho_A001_horizontal_web.jpg')" }}
                  initial={{ scale: 1.1, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                />
              </div>
          </div>
      </section>

      {/* ------------------- 8. PARALLAX BREAK 2 (Lifestyle) ------------------- */}
      <section className="h-[60vh] bg-fixed bg-cover bg-center relative flex items-center justify-center" style={{ backgroundImage: "url('/DRON-FOTOS-SAMANTHA/VERSALLES/VERSALLES12-PREFERIDA.jpg')" }}>
          <Reveal>
            <div className="bg-white/90 p-12 max-w-2xl text-center shadow-2xl backdrop-blur-sm mx-4">
                <h3 className="font-serif-display text-3xl text-[#2C2C2C] mb-4">"No vendemos tierra, vendemos el futuro de tu familia."</h3>
                <p className="text-[#C5A065] font-bold uppercase tracking-widest text-xs">— La Dirección</p>
            </div>
          </Reveal>
      </section>

      {/* ------------------- 8B. NÚMEROS QUE HABLAN ------------------- */}
      <section className="py-24 px-6 bg-[#1A1A1A] text-white overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.span className="text-[#C5A065] text-[10px] font-bold uppercase tracking-[0.35em] block mb-3" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>Impacto Real</motion.span>
            <motion.h2 className="font-serif-display text-4xl md:text-5xl text-white" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>Números que Hablan</motion.h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "12M+", label: "m² desarrollados", desc: "De terreno transformado en comunidad" },
              { number: "98%", label: "Clientes satisfechos", desc: "Según encuesta interna 2025" },
              { number: "7", label: "Proyectos activos", desc: "En 5 ciudades de Honduras" },
              { number: "2x", label: "Plusvalía promedio", desc: "Valor duplicado en 5 años" },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                className="text-center p-6 border border-white/[0.06] rounded-lg bg-white/[0.02]"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                whileHover={{ borderColor: "rgba(197,160,101,0.3)", transition: { duration: 0.3 } }}
              >
                <span className="font-serif-display text-4xl md:text-5xl text-[#C5A065] block mb-2">{item.number}</span>
                <span className="text-white text-xs font-bold uppercase tracking-widest block mb-1">{item.label}</span>
                <span className="text-white/40 text-[10px]">{item.desc}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------- 9. LEADERSHIP / TEAM ------------------- */}
      <section className="py-24 px-6 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <Reveal>
              <span className="text-[#C5A065] uppercase tracking-widest text-xs font-bold mb-4 block">Nuestro Equipo</span>
              <h2 className="font-serif-display text-4xl md:text-5xl text-[#2C2C2C] mb-8">Liderazgo con Visión</h2>
              <p className="text-[#6B665F] leading-relaxed max-w-2xl mx-auto mb-12">
                Detrás de cada proyecto hay un equipo comprometido con transformar la forma de vivir en Honduras. 
                Profesionales con más de una década de experiencia en desarrollo inmobiliario.
              </p>
            </Reveal>
            <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              {[
                { role: "Dirección General", focus: "Visión estratégica y expansión" },
                { role: "Operaciones", focus: "Calidad y ejecución de obra" },
                { role: "Comercial", focus: "Experiencia del cliente" },
              ].map((item, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="p-8 border border-[#C5A065]/15 hover:border-[#C5A065]/40 transition-colors duration-300">
                    <span className="font-serif-display text-5xl text-[#C5A065]/20 block mb-4">0{i+1}</span>
                    <h3 className="font-bold text-[#2C2C2C] uppercase tracking-wider text-xs mb-2">{item.role}</h3>
                    <p className="text-[#6B665F] text-sm">{item.focus}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
      </section>

      {/* ------------------- 10. SOCIAL PROOF / TESTIMONIALS ------------------- */}
      <section className="py-24 px-6 bg-[#2C2C2C] text-white overflow-hidden relative">
          <motion.div
            className="absolute top-0 right-0 text-[#C5A065]/5 font-serif-display text-[20rem] leading-none -mt-20 -mr-20 pointer-events-none"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
              {'"'}
          </motion.div>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.p
              className="font-serif-display text-2xl md:text-4xl leading-relaxed italic mb-10 text-white/90"
              initial={{ opacity: 0, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
            >
                {"\"Invertir en Ciudad Venecia fue la mejor decisión financiera que he tomado. En 3 años mi lote duplicó su valor y la seguridad es incomparable.\""}
            </motion.p>
            <Reveal>
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
      {/* ------------------- 11. EXPANSIÓN NACIONAL — CINEMATIC ------------------- */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-[#0a0a0a]">
        {/* Video background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        >
          <source src="/DRON-JUANJOSE/Guaimaca/GUAIMACA_DRON.mp4" type="video/mp4" />
        </video>

        {/* Cinematic overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40" />

        {/* Film grain */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none z-10"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }}
        />

        {/* Gold lines top & bottom */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C5A065]/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C5A065]/20 to-transparent" />

        {/* Content */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-8 md:px-16 py-24">
          <div className="max-w-xl">
            <Reveal>
              <span className="text-[#C5A065] text-[9px] font-bold uppercase tracking-[0.5em] block mb-6">El Futuro</span>
              <h2 className="font-serif-display text-5xl md:text-7xl text-white mb-6 leading-[0.95]">
                Expansión{' '}
                <span className="italic text-[#C5A065]">Nacional</span>
              </h2>
              <div className="w-[60px] h-[1px] bg-[#C5A065] mb-8" />
              <p className="text-white/50 text-sm leading-relaxed mb-12 max-w-md">
                Nuestra visión: llevar el estándar INMAER a las principales ciudades de Honduras. El crecimiento no se detiene.
              </p>
            </Reveal>

            {/* Cities */}
            <div className="space-y-0">
              {[
                { city: 'Danlí', status: 'Consolidado', active: true },
                { city: 'Olancho', status: 'Activo', active: true },
                { city: 'San Lorenzo', status: 'Activo', active: true },
                { city: 'Talanga', status: 'En construcción', active: true },
                { city: 'Guaimaca', status: 'Próximamente', active: false },
                { city: 'Tegucigalpa', status: 'Próximamente', active: false },
              ].map((item, i) => (
                <motion.div
                  key={item.city}
                  className="flex items-center justify-between py-4 border-b border-white/[0.06] group"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                >
                  <div className="flex items-center gap-4">
                    <span className={`w-2 h-2 rounded-full ${item.active ? 'bg-[#C5A065]' : 'bg-white/20'}`} />
                    <span className="font-serif-display text-2xl md:text-3xl text-white group-hover:text-[#C5A065] transition-colors duration-300">{item.city}</span>
                  </div>
                  <span className={`text-[9px] uppercase tracking-[0.3em] ${item.active ? 'text-[#C5A065]' : 'text-white/30'}`}>
                    {item.status}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Corner accents */}
        <div className="absolute top-8 right-8 w-12 h-12 border-t border-r border-[#C5A065]/15 z-20" />
        <div className="absolute bottom-8 right-8 w-12 h-12 border-b border-r border-[#C5A065]/15 z-20" />
      </section>

      {/* ------------------- BRIDGE: PROMESA ------------------- */}
      <section className="py-32 px-6 bg-[#F3F0EB] overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Decorative top element */}
          <motion.div
            className="w-[1px] h-16 bg-gradient-to-b from-transparent to-[#C5A065]/40 mx-auto mb-12"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ originY: 0 }}
          />

          {/* Quote */}
          <motion.p
            className="font-serif-display text-3xl md:text-5xl lg:text-6xl text-[#2C2C2C] leading-[1.15] mb-8"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.25, 0.8, 0.25, 1] }}
          >
            Cada proyecto es una{' '}
            <motion.span 
              className="italic text-[#C5A065]"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              promesa cumplida.
            </motion.span>
          </motion.p>

          {/* Supporting text */}
          <motion.p
            className="text-[#6B665F] text-sm md:text-base max-w-lg mx-auto leading-relaxed mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            Por eso hacemos que invertir sea fácil, transparente y accesible. Tu terreno te espera.
          </motion.p>

          {/* Mini stats row */}
          <motion.div
            className="flex justify-center gap-12 md:gap-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            {[
              { value: '100%', label: 'Escrituras al día' },
              { value: 'Directo', label: 'Sin intermediarios' },
              { value: 'Flexible', label: 'A tu medida' },
            ].map((item, i) => (
              <motion.div 
                key={item.label} 
                className="text-center"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1.1 + i * 0.15, duration: 0.5 }}
              >
                <span className="font-serif-display text-2xl md:text-3xl text-[#C5A065] block mb-1">{item.value}</span>
                <span className="text-[#6B665F] text-[9px] uppercase tracking-[0.3em]">{item.label}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Decorative bottom element */}
          <motion.div
            className="w-[1px] h-16 bg-gradient-to-b from-[#C5A065]/40 to-transparent mx-auto mt-12"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{ originY: 0 }}
          />
        </div>
      </section>

      {/* ------------------- SOBRE INMAER (Cloned from Homepage) ------------------- */}
      <section className="bg-[#003B5C] py-24 px-6 md:px-12 text-white relative overflow-hidden">
         <div className="max-w-[1100px] mx-auto text-center">
             <Reveal>
                  <div className="flex items-center justify-center gap-4 mb-6">
                       <span className="text-white/60 text-[10px] font-bold uppercase tracking-[0.25em]">UNA CREACIÓN DE</span>
                       <div className="h-[1px] w-12 bg-[#C5A065]"></div>
                  </div>
                  
                  <h2 className="font-serif-display text-5xl md:text-6xl mb-2 tracking-wide text-white">INMAER</h2>
                  <p className="text-[#C5A065] text-xs uppercase tracking-[0.4em] mb-8 font-bold">REAL ESTATE</p>

                  <h3 className="font-serif-display text-3xl md:text-4xl leading-tight mb-6 text-white/90 max-w-3xl mx-auto">
                      Nuestras creaciones impactan positivamente el futuro de miles de personas.
                  </h3>
                  
                  <p className="text-gray-300 font-light text-sm leading-relaxed mb-12 max-w-2xl mx-auto">
                      INMAER es una compañía hondureña con más de 10 años de experiencia, creando productos inmobiliarios de nueva generación. Nuestro propósito principal es crear comunidades plenas donde las personas puedan desarrollar su vida en un entorno de armonía y plusvalía.
                  </p>
             </Reveal>

                <div className="grid grid-cols-3 gap-8 border-t border-white/10 pt-10 max-w-2xl mx-auto">
                     <Reveal delay={0.2}>
                       <div className="text-center">
                            <div className="font-serif-display text-5xl md:text-6xl text-[#C5A065] font-medium mb-2">
                                <CountUp to={10} suffix="+" />
                            </div>
                            <div className="text-white text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] leading-relaxed opacity-90">
                                AÑOS DE EXPERIENCIA
                            </div>
                       </div>
                     </Reveal>
                     <Reveal delay={0.3}>
                       <div className="text-center">
                            <div className="font-serif-display text-5xl md:text-6xl text-[#C5A065] font-medium mb-2">
                                <CountUp to={7500} prefix="+" />
                            </div>
                            <div className="text-white text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] leading-relaxed opacity-90">
                                CLIENTES SATISFECHOS
                            </div>
                       </div>
                     </Reveal>
                     <Reveal delay={0.4}>
                       <div className="text-center">
                            <div className="font-serif-display text-5xl md:text-6xl text-[#C5A065] font-medium mb-2">
                                <CountUp to={4} />
                            </div>
                            <div className="text-white text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] leading-relaxed opacity-90">
                                CIUDADES CON PRESENCIA
                            </div>
                       </div>
                     </Reveal>
                </div>
         </div>
      </section>

      {/* ------------------- FACILIDADES DE PAGO ------------------- */}
      <AdvisorCTA />
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
                        <li><Link href="/proyectos" className="text-sm font-medium hover:text-[#C5A065] transition-colors">Ciudad Venecia Danlí</Link></li>
                        <li><Link href="/proyectos" className="text-sm font-medium hover:text-[#C5A065] transition-colors">Ciudad Venecia Olancho</Link></li>
                        <li><Link href="/proyectos" className="text-sm font-medium hover:text-[#C5A065] transition-colors">Ciudad Venecia Valle</Link></li>
                        <li><Link href="/proyectos" className="text-sm font-medium hover:text-[#C5A065] transition-colors">Residencial Versalles</Link></li>
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
                     <Link href="/" className="text-[10px] text-white/40 hover:text-white uppercase tracking-widest transition-colors">Privacidad</Link>
                     <Link href="/" className="text-[10px] text-white/40 hover:text-white uppercase tracking-widest transition-colors">Términos</Link>
                </div>
            </div>
        </div>
      </footer>
    </div>
  );
}
