"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Reveal } from '@/components/motion/Reveal';

export default function Contacto() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

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

  const faqs = [
    { q: "¿Cómo puedo agendar una visita?", a: "Puedes agendar directamente por WhatsApp o llamando a nuestras oficinas. Coordinamos visitas guiadas todos los fines de semana." },
    { q: "¿Ofrecen financiamiento directo?", a: "Sí, contamos con planes de financiamiento propio con aprobación inmediata y requisitos mínimos." },
    { q: "¿Dónde están ubicadas las oficinas?", a: "Estamos en Danlí, El Paraíso. Col. El Zarzal, Edificio INMAER, contiguo a Pizza Hut." },
  ];

  return (
    <div className="bg-[#F3F0EB] text-[#2C2C2C] antialiased min-h-screen flex flex-col font-sans selection:bg-[#C5A065] selection:text-white overflow-x-hidden">
      <style jsx global>{`
        body { font-family: 'Montserrat', sans-serif; }
        h1, h2, h3, h4, h5, h6, .font-serif-display { font-family: 'Cormorant Garamond', serif; }
      `}</style>
      
      {/* ------------------- HEADER ------------------- */}
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
             <div className="text-white">
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
                <Link href="/contacto" className="text-[#C5A065] text-[11px] font-medium uppercase tracking-[0.15em] transition-colors">Contacto</Link>
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
             <Link href="#form" className="border border-white/80 text-white px-8 py-3 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-[#2C2C2C] transition-all duration-300">Escríbenos</Link>
          </div>
          <button onClick={toggleMenu} className="lg:hidden text-white p-2"><span className="text-2xl">{isMobileMenuOpen ? '✕' : '☰'}</span></button>
        </div>
      </nav>

      {/* ------------------- 1. HERO ------------------- */}
      <section className="relative h-[60vh] flex items-center justify-center bg-[#1A3A52] overflow-hidden">
          <div className="absolute inset-0 bg-[url('/homepage/outdoor2.jpg.jpeg')] bg-cover bg-center opacity-30"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A3A52] to-transparent"></div>
          <div className="relative z-10 text-center px-6">
              <Reveal>
                  <span className="text-[#C5A065] text-xs font-bold uppercase tracking-[0.4em] mb-4 block">Atención Personalizada</span>
                  <h1 className="font-serif-display text-5xl md:text-7xl text-white mb-6">Hablemos de tu Futuro</h1>
                  <p className="text-white/70 max-w-xl mx-auto font-light text-lg">Estamos listos para asesorarte en cada paso de tu inversión.</p>
              </Reveal>
          </div>
      </section>

      {/* ------------------- 2. CONTACT CENTER TEASER (WOW) ------------------- */}
      <section className="py-20 bg-black text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-[#C5A065]/10 skew-x-12"></div>
          <div className="max-w-[1200px] mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
              <Reveal>
                  <div>
                      <span className="bg-white/10 text-white px-3 py-1 text-[9px] font-bold uppercase tracking-widest rounded-full mb-4 inline-block">Innovación 2026</span>
                      <h2 className="font-serif-display text-4xl md:text-5xl mb-4">INMAER Contact Center</h2>
                      <p className="text-gray-400 max-w-md">Próximamente revolucionaremos la atención al cliente con soporte 24/7 y asesores digitales dedicados.</p>
                  </div>
              </Reveal>
              <Reveal delay={0.2}>
                  <div className="text-right hidden md:block">
                      <p className="text-[#C5A065] text-[100px] leading-none font-serif-display opacity-50">24/7</p>
                      <p className="text-xs uppercase tracking-[0.5em] text-white/50 -mt-4 mr-2">Muy Pronto</p>
                  </div>
              </Reveal>
          </div>
      </section>

      {/* ------------------- 3. CANALES DIRECTOS ------------------- */}
      <section className="py-24 px-6 bg-white">
          <div className="max-w-[1200px] mx-auto grid md:grid-cols-3 gap-8">
              {[
                  { title: "Ventas & Asesoría", info: "+504 9549-8925", sub: "Lunes a Domingo", icon: "✦" },
                  { title: "Oficina Central", info: "(504) 2763-3699", sub: "9:00 AM - 5:00 PM", icon: "✦" },
                  { title: "Correo Electrónico", info: "info@inmaerhn.com", sub: "Respuesta en 24h", icon: "✦" }
              ].map((item, i) => (
                  <Reveal key={i} delay={i * 0.1}>
                      <div className="group border border-gray-100 p-10 text-center hover:border-[#C5A065] transition-all duration-500 hover:shadow-xl">
                          <div className="text-[#C5A065] text-2xl mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
                          <h3 className="font-serif-display text-2xl text-[#2C2C2C] mb-2">{item.title}</h3>
                          <p className="text-lg font-bold text-[#1A3A52] mb-1">{item.info}</p>
                          <p className="text-xs text-gray-400 uppercase tracking-wider">{item.sub}</p>
                      </div>
                  </Reveal>
              ))}
          </div>
      </section>

      {/* ------------------- 4. UBICACIÓN OFICINA ------------------- */}
      <section className="py-24 px-6 bg-[#F9F7F4]">
          <div className="max-w-[1200px] mx-auto grid lg:grid-cols-2 gap-16 items-center">
              <Reveal>
                  <div className="aspect-square bg-gray-200 relative overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-all duration-700">
                      <img src="/amenidades/amenidades_club.jpg.jpeg" alt="Oficinas INMAER" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"/>
                  </div>
              </Reveal>
              <Reveal delay={0.2}>
                  <span className="text-[#C5A065] text-xs font-bold uppercase tracking-widest mb-4 block">Sede Principal</span>
                  <h2 className="font-serif-display text-4xl md:text-5xl text-[#2C2C2C] mb-6">Oficinas Corporativas</h2>
                  <p className="text-[#6B665F] text-lg leading-relaxed mb-8">
                      Visítanos para conocer las maquetas de los proyectos, ver planos detallados y disfrutar de un café mientras diseñamos tu plan de inversión.
                  </p>
                  <div className="space-y-4 border-l-2 border-[#C5A065] pl-6">
                      <p className="text-sm font-bold text-[#2C2C2C]">Col. El Zarzal, Edificio INMAER</p>
                      <p className="text-sm text-[#6B665F]">Contiguo a Pizza Hut, Danlí, El Paraíso.</p>
                      <Link href="#" className="text-[#C5A065] text-xs font-bold uppercase tracking-widest hover:underline mt-4 block">Cómo llegar →</Link>
                  </div>
              </Reveal>
          </div>
      </section>

      {/* ------------------- 5. GOOGLE MAPS & CTA ------------------- */}
      <section className="h-[600px] relative w-full bg-gray-300">
         {/* Map Placeholder - In production use real Google Maps Embed */}
         <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3870.0664695972836!2d-86.5830!3d14.0330!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTTCsDAxJzU4LjgiTiA4NsKwMzQnNTguOCJX!5e0!3m2!1sen!2shn!4v1620000000000!5m2!1sen!2shn" 
            width="100%" 
            height="100%" 
            style={{border:0, filter: 'grayscale(100%) invert(0%) contrast(80%)'}} 
            allowFullScreen={true} 
            loading="lazy"
            className="absolute inset-0"
         ></iframe>
         
         <div className="absolute top-12 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md p-8 shadow-2xl max-w-md text-center">
             <h3 className="font-serif-display text-2xl text-[#2C2C2C] mb-2">Visítanos en Danlí</h3>
             <p className="text-xs text-gray-500 mb-4">Lunes a Viernes: 8:00 AM - 5:00 PM</p>
             <a href="https://maps.google.com" target="_blank" className="bg-[#1A3A52] text-white px-6 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-[#C5A065] transition-colors">Abrir en Google Maps</a>
         </div>
      </section>

      {/* ------------------- 6. FAQ (WOW DESIGN) ------------------- */}
      <section className="py-24 px-6 bg-[#1A3A52] text-white">
          <div className="max-w-[800px] mx-auto">
              <div className="text-center mb-16">
                  <h2 className="font-serif-display text-4xl text-white">Preguntas Frecuentes</h2>
              </div>
              <div className="space-y-4">
                  {faqs.map((faq, i) => (
                      <div key={i} className="border-b border-white/10 pb-4">
                          <button 
                             onClick={() => setActiveAccordion(activeAccordion === i ? null : i)}
                             className="w-full flex justify-between items-center text-left py-2 hover:text-[#C5A065] transition-colors"
                          >
                              <span className="font-serif-display text-xl">{faq.q}</span>
                              <span className="text-2xl font-light">{activeAccordion === i ? '−' : '+'}</span>
                          </button>
                          <motion.div 
                             initial={{ height: 0, opacity: 0 }}
                             animate={{ height: activeAccordion === i ? 'auto' : 0, opacity: activeAccordion === i ? 1 : 0 }}
                             className="overflow-hidden"
                          >
                              <p className="text-white/60 text-sm font-light py-4 leading-relaxed">{faq.a}</p>
                          </motion.div>
                      </div>
                  ))}
              </div>
          </div>
      </section>

       {/* ------------------- 7. DIGITAL CHANNELS ------------------- */}
       <section className="py-20 px-6 bg-[#C5A065]">
           <div className="max-w-[1200px] mx-auto text-center">
               <h2 className="font-serif-display text-3xl text-white mb-10">Conecta en Digital</h2>
               <div className="flex justify-center gap-12">
                   {['Instagram', 'Facebook', 'TikTok', 'YouTube'].map((social, i) => (
                       <a key={i} href="#" className="text-white font-bold uppercase tracking-widest text-xs hover:text-[#1A3A52] transition-colors border-b border-transparent hover:border-[#1A3A52] pb-1">
                           {social}
                       </a>
                   ))}
               </div>
           </div>
       </section>

      {/* ------------------- 8. FORMULARIO FINAL ------------------- */}
      <section id="form" className="py-24 px-6 bg-white">
           <div className="max-w-[1000px] mx-auto text-center">
               <Reveal>
                   <span className="text-[#C5A065] text-[10px] font-bold uppercase tracking-[0.25em] mb-4 block">MENSAJERÍA</span>
                   <h2 className="font-serif-display text-4xl text-[#2C2C2C] mb-12">Envíanos un Mensaje</h2>
               </Reveal>
               <Reveal delay={0.2}>
                   <form className="space-y-8 text-left max-w-2xl mx-auto">
                       <div className="grid md:grid-cols-2 gap-8">
                           <div className="group">
                               <label className="block text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-2">Nombre</label>
                               <input type="text" className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-[#C5A065] transition-colors bg-transparent"/>
                           </div>
                           <div className="group">
                               <label className="block text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-2">Teléfono</label>
                               <input type="text" className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-[#C5A065] transition-colors bg-transparent"/>
                           </div>
                       </div>
                       <div className="group">
                           <label className="block text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-2">Mensaje</label>
                           <textarea rows={4} className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-[#C5A065] transition-colors bg-transparent resize-none"></textarea>
                       </div>
                       <div className="text-center pt-8">
                           <button className="bg-[#1A3A52] text-white px-12 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#C5A065] transition-all shadow-lg hover:shadow-xl">
                               Enviar Mensaje
                           </button>
                       </div>
                   </form>
               </Reveal>
           </div>
      </section>

      {/* Footer (Unified) */}
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
