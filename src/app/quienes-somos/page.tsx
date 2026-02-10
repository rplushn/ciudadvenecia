"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function QuienesSomos() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Load Fonts (Same as Home)
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Montserrat:wght@300;400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); };
  }, []);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <div className="bg-[#F3F0EB] text-[#484848] antialiased min-h-screen flex flex-col font-sans selection:bg-[#C5A065] selection:text-white">
      <style jsx global>{`
        body { font-family: 'Montserrat', sans-serif; }
        h1, h2, h3, h4, h5, h6, .font-serif-display { font-family: 'Cormorant Garamond', serif; }
      `}</style>
      
      {/* Navbar (Solid version for internal pages) */}
      <nav className="fixed left-0 right-0 z-50 bg-[#5D737E] py-4 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-8 md:px-12 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
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

          <div className="hidden lg:flex items-center gap-10">
            {['Inicio', 'Master Plan', 'Lotes', 'Amenidades', 'Ubicación'].map((item, i) => (
                <Link key={i} href={['/', '/quienes-somos', '/proyectos', '/amenidades', '/contacto'][i]} className="text-white text-[11px] font-medium uppercase tracking-[0.15em] hover:text-[#C5A065] transition-colors">
                  {item}
                </Link>
            ))}
          </div>
          <div className="hidden lg:flex items-center">
             <Link href="/contacto" className="border border-white/80 text-white px-8 py-3 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-[#2C2C2C] transition-all duration-300">
                Contáctanos
             </Link>
          </div>
          <button onClick={toggleMenu} className="lg:hidden text-white p-2"><span className="text-2xl">{isMobileMenuOpen ? '✕' : '☰'}</span></button>
        </div>
      </nav>

      {/* Main Content - Coming Soon */}
      <main className="flex-grow flex items-center justify-center relative px-6 pt-24">
        {/* Background Texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ 
                 backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l5 25 25 5-25 5-5 25-5-25-25-5 25-5z' fill='%23C5A065' fill-rule='evenodd'/%3E%3C/svg%3E")`, 
                 backgroundSize: '80px 80px' 
             }}>
        </div>

        <div className="text-center max-w-3xl mx-auto relative z-10">
            <span className="text-[#C5A065] text-xs font-bold uppercase tracking-[0.4em] mb-6 block animate-pulse">
                EN CONSTRUCCIÓN
            </span>
            <h1 className="font-serif-display text-5xl md:text-7xl text-[#2C2C2C] mb-8 leading-tight">
                Quiénes Somos
            </h1>
            <div className="w-24 h-[1px] bg-[#C5A065] mx-auto mb-8"></div>
            <p className="text-[#6B665F] text-lg md:text-xl font-light leading-relaxed mb-12">
                Estamos preparando una experiencia digital a la altura de nuestra trayectoria. <br className="hidden md:block"/>
                Muy pronto podrás conocer la historia y el equipo detrás de Ciudad Venecia.
            </p>
            <Link href="/" className="inline-block px-10 py-4 bg-[#2C2C2C] text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#C5A065] transition-all shadow-lg">
                Volver al Inicio
            </Link>
        </div>
      </main>

      {/* Simplified Footer */}
      <footer className="bg-[#1A3A52] text-white py-12 border-t border-[#C5A065]/20 text-center">
        <p className="text-[10px] text-white/40 uppercase tracking-widest">© 2026 INMAER Real Estate.</p>
      </footer>
    </div>
  );
}
