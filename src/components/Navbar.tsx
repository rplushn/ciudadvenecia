"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determine if scrolled (for background style)
      if (currentScrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Determine visibility (hide on down, show on up)
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false); // Scrolling down & past hero
      } else {
        setIsVisible(true); // Scrolling up or at top
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 transform ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-md shadow-sm py-4' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className={`font-display font-bold text-2xl tracking-tighter ${
              isScrolled ? 'text-primary' : 'text-white'
            }`}>
              CIUDAD VENECIA
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {['INICIO', 'QUIENES SOMOS', 'PROYECTOS', 'CONTACTO'].map((item) => (
              <Link 
                key={item} 
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className={`text-sm font-medium tracking-wide hover:text-accent transition-colors ${
                  isScrolled ? 'text-text-primary' : 'text-white/90'
                }`}
              >
                {item}
              </Link>
            ))}
          </nav>

          {/* Socials & CTA */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Social Icons */}
            <div className="flex items-center space-x-4 border-r border-gray-300 pr-6 mr-2">
              <span className={`text-xs font-medium mr-2 ${isScrolled ? 'text-text-secondary' : 'text-white/80'}`}>
                SÍGUENOS
              </span>
              {[
                { name: 'facebook', path: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z' },
                { name: 'instagram', path: 'M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M7.5 21h9a4.5 4.5 0 004.5-4.5v-9A4.5 4.5 0 0016.5 3h-9A4.5 4.5 0 003 7.5v9A4.5 4.5 0 007.5 21z' },
                { name: 'tiktok', path: 'M16.5 6.5a4.5 4.5 0 010 9 4.5 4.5 0 01-9 0 4.5 4.5 0 019 0zm-1.5 0v.5a3 3 0 10-3 3v-3.5a1.5 1.5 0 011.5-1.5h1.5z' } // Placeholder path for TikTok-ish icon
              ].map((icon) => (
                <a 
                  key={icon.name} 
                  href="#" 
                  className={`transition-colors hover:text-accent ${
                    isScrolled ? 'text-black/60' : 'text-white/80'
                  }`}
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d={icon.path} />
                  </svg>
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <Link 
              href="#cotizar" 
              className="bg-primary hover:bg-accent text-white text-sm font-bold py-3 px-6 transition-all"
            >
              COTIZA YA
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-2xl focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
             <span className={isScrolled ? 'text-primary' : 'text-white'}>☰</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg py-6 px-4 flex flex-col space-y-4">
          {['INICIO', 'QUIENES SOMOS', 'PROYECTOS', 'CONTACTO'].map((item) => (
            <Link 
              key={item} 
              href="#" 
              className="text-primary font-medium text-lg border-b border-gray-100 pb-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item}
            </Link>
          ))}
          <Link 
            href="#cotizar" 
            className="bg-primary text-white text-center font-bold py-3 mt-4"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            COTIZA YA
          </Link>
        </div>
      )}
    </header>
  );
}
