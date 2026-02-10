"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Reveal } from '@/components/motion/Reveal';
import CountUp from '@/components/motion/CountUp';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function QuienesSomos() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Load Fonts
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Montserrat:wght@200;300;400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); };
  }, []);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

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
      
      {/* ------------------- HEADER / NAVBAR ------------------- */}
      <nav className="fixed left-0 right-0 z-50 bg-[#F3F0EB]/90 backdrop-blur-md py-4 border-b border-[#C5A065]/10 transition-all duration-300">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
             <div className="text-[#2C2C2C]">
                {/* SVG Logo in Dark Mode for this page */}
                <svg height="40" viewBox="0 0 330 80" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="block">
                    <g transform="translate(40, 40)">
                         {Array.from({ length: 24 }).map((_, i) => (
                            <line key={i} x1="0" y1="-14" x2="0" y2="-32" transform={`rotate(${i * 15})`} stroke="currentColor" strokeWidth="1.5"/>
                         ))}\n                    </g>
                    <text x="85" y="50" fontFamily="Montserrat" fontSize="24" fontWeight="300" letterSpacing="0.1em">CIUDAD</text>
                    <text x="200" y="50" fontFamily="Montserrat" fontSize="24" fontWeight="700" letterSpacing="0.1em">VENECIA</text>
                </svg>
             </div>
          </Link>

          <div className="hidden lg:flex items-center gap-10">
            {['Inicio', 'Master Plan', 'Lotes', 'Amenidades', 'Ubicación'].map((item, i) => (
                <Link key={i} href={['/', '/quienes-somos', '/proyectos', '/amenidades', '/contacto'][i]} className="text-[#2C2C2C] text-[11px] font-medium uppercase tracking-[0.15em] hover:text-[#C5A065] transition-colors">
                  {item}
                </Link>
            ))}
          </div>
          <div className="hidden lg:flex items-center">
             <Link href="/contacto" className="bg-[#2C2C2C] text-white px-8 py-3 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#C5A065] transition-all duration-300 shadow-lg">
                Agenda tu Cita
             </Link>
          </div>
          <button onClick={toggleMenu} className="lg:hidden text-[#2C2C2C] p-2"><span className="text-2xl">{isMobileMenuOpen ? '✕' : '☰'}</span></button>
        </div>
      </nav>

      {/* ------------------- 1. CINEMATIC HERO ------------------- */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center parallax-bg" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070')" }}>
            <div className="absolute inset-0 bg-[#F3F0EB]/30 mix-blend-multiply"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#F3F0EB] via-transparent to-transparent"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-20">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-[#C5A065] font-bold uppercase tracking-[0.4em] text-xs mb-6 block"
            >
                INMAER Real Estate
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif-display text-6xl md:text-9xl text-[#2C2C2C] leading-[0.9] mb-8"
            >
                Construimos <br/> <span className="italic font-light">Legado</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-[#484848] text-lg md:text-2xl font-light max-w-2xl mx-auto leading-relaxed"
            >
                Más que desarrolladores, somos arquitectos de comunidades. <br/> Transformamos la tierra en el escenario de tu vida.
            </motion.p>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-[#C5A065]"
        >
            <span className="text-2xl">↓</span>
        </motion.div>
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
                  <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2071')" }}></div>
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
      <section className="py-32 bg-fixed bg-cover bg-center relative" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2832')" }}>
          <div className="absolute inset-0 bg-black/20"></div>
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
                   <div className="absolute inset-0 bg-cover bg-center grayscale hover:grayscale-0 transition-all duration-700" 
                        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053')" }}></div>
                </Reveal>
              </div>
          </div>
      </section>

      {/* ------------------- 8. PARALLAX BREAK 2 (Lifestyle) ------------------- */}
      <section className="h-[60vh] bg-fixed bg-cover bg-center relative flex items-center justify-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070')" }}>
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
          {/* Placeholder for Team Grid - Abstract representation for now */}\n          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[1, 2, 3].map((_, i) => (
                  <Reveal key={i} delay={i * 0.1}>
                    <div className="group cursor-pointer">
                        <div className="aspect-[3/4] bg-[#F3F0EB] mb-6 overflow-hidden relative">
                             {/* Placeholder images */}
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
                  <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=2070')" }}></div>
              </div>
          </div>
      </section>

      {/* ------------------- 12. CTA / FINAL ACTION ------------------- */}
      <section className="py-32 px-6 bg-white text-center">
          <div className="max-w-3xl mx-auto">
            <Reveal>
              <h2 className="font-serif-display text-5xl md:text-7xl text-[#2C2C2C] mb-8">Sé parte de la historia</h2>
              <p className="text-lg text-[#6B665F] mb-12">
                  No esperes a que te lo cuenten. Agenda una visita privada a nuestros desarrollos y siente la diferencia INMAER.
              </p>
              <div className="flex flex-col md:flex-row justify-center gap-6">
                  <Link href="/contacto" className="bg-[#2C2C2C] text-white px-12 py-5 font-bold uppercase tracking-[0.2em] hover:bg-[#C5A065] transition-all shadow-xl">
                      Agendar Visita
                  </Link>
                  <Link href="/proyectos" className="border border-[#2C2C2C] text-[#2C2C2C] px-12 py-5 font-bold uppercase tracking-[0.2em] hover:bg-[#2C2C2C] hover:text-white transition-all">
                      Ver Portafolio
                  </Link>
              </div>
            </Reveal>
          </div>
      </section>

      <Footer />
    </div>
  );
}
