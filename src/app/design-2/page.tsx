"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Design2Page() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
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

  return (
    <div className="bg-white font-sans text-[#0A2342] scroll-smooth" style={{ fontFamily: "'Manrope', sans-serif" }}>
      
      {/* Navigation */}
      <nav className={`fixed z-50 w-full border-b border-slate-100 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-white/95 backdrop-blur-md'
      }`}>
        <div className="flex h-24 max-w-7xl mx-auto px-6 items-center justify-between">
          <Link href="#inicio" className="flex flex-col group z-50 relative">
            <span className="text-xl font-bold tracking-[0.2em] text-[#0A2342] uppercase">Ciudad Venecia</span>
            <span className="text-[10px] tracking-[0.3em] text-[#D4AF37] uppercase font-medium">by INMAER</span>
          </Link>

          <div className="hidden lg:flex items-center gap-10">
            <a href="#inicio" className="text-xs font-medium tracking-widest uppercase text-slate-500 hover:text-[#0A2342] transition-colors">Inicio</a>
            <a href="#nosotros" className="text-xs font-medium tracking-widest uppercase text-slate-500 hover:text-[#0A2342] transition-colors">Nosotros</a>
            <a href="#amenidades" className="text-xs font-medium tracking-widest uppercase text-slate-500 hover:text-[#0A2342] transition-colors">Amenidades</a>
            <a href="#ubicaciones" className="text-xs font-medium tracking-widest uppercase text-slate-500 hover:text-[#0A2342] transition-colors">Ubicaciones</a>
            <a href="#contacto" className="px-6 py-3 bg-[#0A2342] text-white text-xs font-medium tracking-widest uppercase hover:bg-[#D4AF37] transition-colors duration-300">
              Agendar Visita
            </a>
          </div>

          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-[#0A2342] p-2 z-50 relative focus:outline-none"
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`fixed inset-0 bg-white z-40 transform transition-transform duration-300 lg:hidden flex flex-col items-center justify-center space-y-8 ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <a href="#inicio" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-serif italic text-[#0A2342]">Inicio</a>
          <a href="#nosotros" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-serif italic text-[#0A2342]">Nosotros</a>
          <a href="#amenidades" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-serif italic text-[#0A2342]">Amenidades</a>
          <a href="#ubicaciones" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-serif italic text-[#0A2342]">Ubicaciones</a>
          <a href="#contacto" onClick={() => setIsMobileMenuOpen(false)} className="text-xl uppercase tracking-widest text-[#D4AF37]">Contacto</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20" id="inicio">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2671&auto=format&fit=crop" alt="Luxury Honduras Landscape" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#0A2342]/70 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A2342] via-transparent to-transparent opacity-90"></div>
        </div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-20 pb-32">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="h-[1px] w-12 bg-[#D4AF37]"></span>
              <span className="text-[#D4AF37] text-xs font-bold tracking-[0.2em] uppercase">Somos el proyecto líder de la zona oriental</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium text-white tracking-tight leading-[1.1] mb-6">
              CIUDAD <br /> VENECIA
            </h1>

            <p className="font-serif italic text-2xl md:text-3xl text-slate-200 mb-10 font-light">
              Tu Patrimonio Seguro <span className="text-[#D4AF37] not-italic text-base align-middle tracking-widest font-sans uppercase ml-2">by INMAER</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-5">
              <a href="#masterplan" className="px-8 py-4 bg-[#D4AF37] text-white text-sm font-medium tracking-widest uppercase hover:bg-white hover:text-[#0A2342] transition-all duration-300 text-center">
                Ver Masterplan
              </a>
              <a href="#contacto" className="px-8 py-4 bg-transparent border border-white text-white text-sm font-medium tracking-widest uppercase hover:bg-white hover:text-[#0A2342] transition-all duration-300 text-center">
                Agendar Visita
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-20 md:mt-32 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '🏙️', number: '300+', label: 'Lotes Disponibles' },
              { icon: '🛡️', number: '24/7', label: 'Seguridad Privada' },
              { icon: '💰', number: '100%', label: 'Financiamiento Directo' }
            ].map((stat, i) => (
              <div key={i} className="backdrop-blur-md bg-white/10 border border-white/20 p-8 text-center md:text-left group hover:bg-[#D4AF37] transition-colors duration-500 cursor-default">
                <span className="text-4xl mb-4 block group-hover:text-[#0A2342]">{stat.icon}</span>
                <h3 className="text-4xl font-serif text-white mb-1 group-hover:text-[#0A2342] transition-colors">{stat.number}</h3>
                <p className="text-xs uppercase tracking-widest text-slate-300 group-hover:text-[#0A2342] transition-colors">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="nosotros" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="w-full lg:w-1/2 order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="h-[1px] w-8 bg-[#D4AF37]"></span>
                <span className="text-[#0A2342] text-xs font-bold tracking-[0.2em] uppercase">Sobre el Proyecto</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-medium text-[#0A2342] tracking-tight mb-8 leading-tight">
                Desarrollando el <span className="font-serif italic text-[#D4AF37]">Futuro</span> de Honduras.
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-8 font-light">
                Ciudad Venecia no es solo un desarrollo inmobiliario; es la culminación de una visión estratégica de INMAER. Ubicado en el corazón del crecimiento de la zona oriental, ofrecemos un refugio de seguridad, modernidad y alta plusvalía.
              </p>
              
              <div className="space-y-6">
                {[
                  { title: 'Alta Plusvalía Garantizada', desc: 'Terrenos ubicados estratégicamente para maximizar el retorno de su inversión año tras año.' },
                  { title: 'Ubicación Estratégica', desc: 'Conectividad inmediata a Tegucigalpa y principales vías de acceso, sin sacrificar la tranquilidad.' },
                  { title: 'Comunidad Selecta', desc: 'Un entorno diseñado para familias que valoran la seguridad, el estatus y el bienestar.' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="shrink-0 mt-1 text-[#D4AF37] text-2xl">✓</div>
                    <div>
                      <h4 className="text-[#0A2342] font-medium text-lg">{item.title}</h4>
                      <p className="text-slate-500 text-sm mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full lg:w-1/2 order-1 lg:order-2 relative">
              <div className="relative overflow-hidden aspect-[4/5] shadow-2xl">
                <img src="https://images.unsplash.com/photo-1600596542815-e328701102b9?q=80&w=2669&auto=format&fit=crop" alt="Honduras Architecture" className="object-cover w-full h-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section id="amenidades" className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="text-[#D4AF37] text-xs font-bold tracking-[0.2em] uppercase block mb-4">Estilo de Vida</span>
            <h2 className="text-4xl md:text-5xl font-medium text-[#0A2342] mb-6">Amenidades Exclusivas</h2>
            <p className="text-slate-500 font-serif italic text-xl">Diseñado para elevar su calidad de vida.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[600px]">
            {[
              { img: 'https://images.unsplash.com/photo-1628624747186-a941c476b7ef?q=80&w=2670', title: 'Casa Club', span: 'md:col-span-2 md:row-span-2' },
              { img: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=2670', title: 'Piscina Climatizada', span: 'md:col-span-2' },
              { img: 'https://images.unsplash.com/photo-1626245347629-873646696b99?q=80&w=2670', title: 'Canchas', span: 'md:col-span-1' },
              { img: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560', title: 'Senderos', span: 'md:col-span-1' }
            ].map((item, i) => (
              <div key={i} className={`${item.span} relative group overflow-hidden shadow-sm min-h-[250px]`}>
                <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A2342]/90 via-[#0A2342]/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-white text-xl font-medium">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Locations */}
      <section id="ubicaciones" className="py-24 px-6 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <span className="text-[#D4AF37] text-xs font-bold tracking-[0.2em] uppercase block mb-4">Expansión</span>
              <h2 className="text-3xl md:text-4xl font-medium text-[#0A2342] tracking-tight">Portafolio Nacional</h2>
            </div>
            <p className="text-slate-500 font-serif italic text-right">La excelencia de INMAER en todo el país.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Ciudad Venecia Danlí', zone: 'Zona Oriente', img: 'https://images.unsplash.com/photo-1599809275338-d14282f11ae3?q=80&w=2574' },
              { name: 'Ciudad Venecia Olancho', zone: 'Zona Vastas', img: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=2574' },
              { name: 'Ciudad Venecia Valle', zone: 'Zona Sur', img: 'https://images.unsplash.com/photo-1544985338-7fe23769c02d?q=80&w=2574' }
            ].map((loc, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="relative overflow-hidden aspect-[3/4] mb-6">
                  <img src={loc.img} alt={loc.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1">
                    <span className="text-[10px] font-bold tracking-widest uppercase text-[#0A2342]">{loc.zone}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-[#0A2342] uppercase tracking-wider mb-1">{loc.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contacto" className="py-24 px-6 bg-[#0A2342] relative">
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-medium text-white mb-4 tracking-tight">
            ¿Listo para invertir en tu futuro?
          </h2>
          <p className="text-slate-300 mb-12 font-serif italic text-xl">
            Nuestros asesores INMAER están listos para guiarle.
          </p>

          <form className="bg-white p-8 md:p-12 shadow-2xl max-w-2xl mx-auto border-t-4 border-[#D4AF37]">
            <div className="grid grid-cols-1 gap-6 text-left">
              <input type="text" placeholder="Nombre Completo" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 text-[#0A2342] focus:outline-none focus:border-[#D4AF37]" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input type="tel" placeholder="+504 ..." className="w-full px-4 py-3 bg-slate-50 border border-slate-200 text-[#0A2342] focus:outline-none focus:border-[#D4AF37]" />
                <input type="email" placeholder="correo@ejemplo.com" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 text-[#0A2342] focus:outline-none focus:border-[#D4AF37]" />
              </div>
              <button type="button" className="w-full py-4 bg-[#0A2342] text-white font-bold tracking-widest uppercase hover:bg-[#D4AF37] transition-colors duration-300 mt-4">
                Solicitar Información
              </button>
            </div>
          </form>

          <div className="mt-16 pt-8 border-t border-white/10 text-slate-400 text-sm">
            <Link href="/" className="inline-block mb-6 px-6 py-3 bg-white/10 text-white hover:bg-white hover:text-[#0A2342] transition-all">
              ← Volver al Home Original
            </Link>
            <p className="font-light">© 2024 Ciudad Venecia by INMAER. Todos los derechos reservados.</p>
          </div>
        </div>
      </section>

    </div>
  );
}
