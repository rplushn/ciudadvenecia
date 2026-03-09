"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface NavbarProps {
  activeRoute?: string;
}

export default function Navbar({ activeRoute = "" }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isAtTop, setIsAtTop] = useState(true);

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

  const navLinks = [
    { href: "/#start", label: "Inicio" },
    { href: "/quienes-somos", label: "Quiénes Somos" },
    { href: "/proyectos", label: "Proyectos" },
    { href: "/contacto", label: "Contacto" },
    { href: "#", label: "Portal Clientes" },
  ];

  return (
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
          <div className="transition-colors duration-300 text-white">
            <svg height="45" viewBox="0 0 330 80" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="block">
              <g transform="translate(40, 40)">
                {Array.from({ length: 24 }).map((_, i) => (
                  <line key={i} x1="0" y1="-14" x2="0" y2="-32" transform={`rotate(${i * 15})`} stroke="currentColor" strokeWidth="1.5" />
                ))}
              </g>
              <text x="85" y="50" fontFamily="Montserrat" fontSize="24" fontWeight="300" letterSpacing="0.1em">CIUDAD</text>
              <text x="200" y="50" fontFamily="Montserrat" fontSize="24" fontWeight="700" letterSpacing="0.1em">VENECIA</text>
            </svg>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-8 xl:gap-12">
          <div className="flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[11px] font-medium uppercase tracking-[0.15em] transition-colors ${
                  activeRoute === link.href
                    ? 'text-[#C5A065]'
                    : 'text-white hover:text-[#C5A065]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="h-4 w-[1px] bg-white/30"></div>

          <div className="flex items-center gap-4">
            <span className="text-white/80 text-[10px] font-medium uppercase tracking-wider hidden xl:block">Síguenos</span>
            <div className="flex gap-3">
              <a href="/" className="text-white hover:text-[#C5A065] transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="/" className="text-white hover:text-[#C5A065] transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.069-4.85.069-3.204 0-3.585-.011-4.849-.069-3.259-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="/" className="text-white hover:text-[#C5A065] transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.46-.54 2.94-1.34 4.14-1.8 2.73-5.7 4.01-8.85 2.48-2.69-1.31-4.25-4.17-4.11-7.14.05-3.08 2.08-5.71 4.97-6.55.75-.22 1.54-.31 2.32-.3v4.2c-.41-.03-.84.03-1.24.18-1.31.52-2.14 1.83-2.02 3.24.08 1.48 1.15 2.75 2.63 2.93 1.69.21 3.23-.97 3.51-2.65.07-.63.07-1.27.06-1.91V.02h-.01z"/></svg>
              </a>
            </div>
          </div>
        </div>

        <div className="hidden lg:flex items-center">
          <Link href="/contacto" className="border border-white/80 text-white px-8 py-3 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-[#2C2C2C] transition-all duration-300">
            Contáctanos
          </Link>
        </div>

        <button onClick={toggleMenu} className="lg:hidden text-white p-2">
          <span className="text-2xl">{isMobileMenuOpen ? '✕' : '☰'}</span>
        </button>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#1A1A1A]/95 backdrop-blur-lg px-8 py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-white text-sm font-medium uppercase tracking-[0.15em] hover:text-[#C5A065] transition-colors py-2 border-b border-white/10"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/contacto" className="mt-2 border border-white/80 text-white px-8 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-center hover:bg-white hover:text-[#2C2C2C] transition-all duration-300">
            Contáctanos
          </Link>
        </div>
      )}
    </nav>
  );
}
