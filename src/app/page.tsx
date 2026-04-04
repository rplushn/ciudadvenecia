"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { Reveal } from '@/components/motion/Reveal';
import CountUp from '@/components/motion/CountUp';   
import CurtainHero from '@/components/motion/CurtainHero';
import GridRevealHero from '@/components/motion/GridRevealHero';
import TextReveal from '@/components/motion/TextReveal';
import CursorSpotlight from '@/components/motion/CursorSpotlight';
import BeforeAfterSlider from '@/components/motion/BeforeAfterSlider';
import ProjectModal, { type ProjectModalData } from '@/components/motion/ProjectModal';
import HondurasMap from "@/components/HondurasMap";
// import FinancingCalculator from '@/components/FinancingCalculator';
import ProjectShowcase, { type ShowcaseProject } from '@/components/ProjectShowcase';
import ScrollBridge from '@/components/ScrollBridge';
import FadeRevealSection from '@/components/FadeRevealSection';
import VideoTextMaskHero from '@/components/hero/VideoTextMaskHero';
import BrandStrip from '@/components/hero/BrandStrip';
import PinnedProjectsShowcase from '@/components/hero/PinnedProjectsShowcase';
import CinematicDivider from '@/components/CinematicDivider';
import InvestmentJourney from '@/components/InvestmentJourney';
import AdvisorCTA from '@/components/AdvisorCTA';

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isAtTop, setIsAtTop] = useState(true);

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

  // Carousel State
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  const carouselData = [
    { title: "Parque Central", img: "/DRON-FOTOS-SAMANTHA/CIUDAD_VENECIA/PARQUE002.jpg" },
    { title: "Club Social", img: "/DRON-FOTOS-SAMANTHA/VERSALLES/VERSALLES005.jpg" },
    { title: "Canchas de Padel", img: "/amenidades/amenidades_padel.jpg" },
    { title: "Piscinas", img: "/amenidades/amenidades_piscina002.jpeg" },
    { title: "Canchas Deportivas", img: "/homepage/cancha_tennis.jpg.jpeg" },
    { title: "Áreas Verdes", img: "/DRON-FOTOS-SAMANTHA/CIUDAD_VENECIA/PARQUE.jpg" },
    { title: "Senderos", img: "/DRON-FOTOS-SAMANTHA/CIUDAD_VENECIA/SENDERO.jpg" },
    { title: "Juegos Infantiles", img: "/DRON-FOTOS-SAMANTHA/CIUDAD_VENECIA/JUEGO002.jpg" },
    { title: "Zona BBQ", img: "/DRON-FOTOS-SAMANTHA/CIUDAD_VENECIA/ASADOR.jpg" },
    { title: "Entrada Principal", img: "/homepage/portal_ai-ciudad_venecia.jpeg" },
    { title: "Vistas Panorámicas", img: "/DRON-FOTOS-SAMANTHA/CIUDAD_VENECIA/JUEGO002.jpg" }, 
    { title: "Seguridad 24/7", img: "/amenidades/amenidades_club.jpg.jpeg" },
    { title: "Comunidad", img: "/homepage/casa_patio.jpeg" },
  ];
  
  const itemsPerView = 2;
  const totalItems = carouselData.length;

  // Load Fonts
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Montserrat:wght@300;400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); };
  }, []);

  // Navbar Scroll Logic
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

  // Carousel Auto-scroll
  useEffect(() => {
    const interval = setInterval(() => {
        nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextSlide = () => {
      setCurrentIndex((prev) => (prev + 1) % totalItems);
  };
  const prevSlide = () => {
      setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
  };

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // Modal state for "Más Proyectos" cards
  const [selectedProject, setSelectedProject] = useState<ProjectModalData | null>(null);

  // Bloquear scroll del body cuando el modal está abierto
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedProject]);

  // Projects data for the grid
  const proyectos = [
    { name: "Ciudad Venecia Danlí", location: "El Paraíso", badge: "INSIGNIA", img: "/DRON-FOTOS-SAMANTHA/CIUDAD_VENECIA/SENDERO.jpg", slug: "/proyectos/danli" },
    { name: "Ciudad Venecia Olancho", location: "Valle de Lepaguare", badge: "PREMIUM", img: "/NUEVAS-JUANJOSE/verticales/cv_olancho_A002_vertical_web.jpg", slug: "/proyectos/olancho" },
    { name: "Ciudad Venecia Talanga", location: "Francisco Morazán", badge: "NUEVO 2026", img: "/amenidades/CV_TALANGA_PROVISIONAL.jpg.jpeg", slug: "/proyectos/talanga" },
    { name: "Ciudad Venecia San Lorenzo", location: "Valle", badge: null, img: "/amenidades/san_lorenzo.jpeg", slug: "/proyectos/san-lorenzo" },
    { name: "Residencial Versalles", location: "Danlí", badge: null, img: "/DRON-FOTOS-SAMANTHA/VERSALLES/VERSALLES002.jpg", slug: "/proyectos/versalles" },
    { name: "Ciudad Venecia Guaimaca", location: "Olancho", badge: "PRÓXIMAMENTE", img: "/DRON-JUANJOSE/Guaimaca/Guaimaca.jpeg", slug: "#" },
    { name: "Ciudad Venecia Tegucigalpa", location: "Francisco Morazán", badge: "PRÓXIMAMENTE", img: "/homepage/portal_ai-ciudad_venecia.jpeg", slug: "#" },
  ];

  const showcaseProjects: ShowcaseProject[] = [
    {
      name: "Ciudad Venecia Olancho",
      location: "Valle de Lepaguare, Olancho",
      badge: "NUEVA GENERACIÓN",
      img: "/NUEVAS-JUANJOSE/verticales/cv_olancho_A002_vertical_web.jpg",
      slug: "/proyectos/olancho",
      description: "El proyecto que representa la evolución de INMAER. Todo lo aprendido en años de experiencia aplicado en un desarrollo de nueva generación con amenidades premium y planta de tratamiento de desechos.",
      stats: [
        { label: "Agua potable", value: "365 días" },
        { label: "Seguridad", value: "24/7" },
        { label: "Urbanizado", value: "100%" },
      ],
      amenities: ["Piscinas", "Canchas de Fútbol", "Canchas de Basketball", "Padel", "Casa Club", "Planta de Tratamiento", "Agua Potable 365 días"],
    },
    {
      name: "Residencial Versalles",
      location: "Danlí, El Paraíso",
      badge: "ÚLTIMOS DISPONIBLES",
      img: "/DRON-FOTOS-SAMANTHA/VERSALLES/VERSALLES001.jpg",
      slug: "/proyectos/versalles",
      description: "Exclusivo residencial en Danlí con vistas panorámicas, piscina, club social y los últimos terrenos disponibles en una de las comunidades más consolidadas.",
      stats: [
        { label: "Seguridad", value: "24/7" },
        { label: "Exclusividad", value: "Premium" },
        { label: "Urbanizado", value: "100%" },
      ],
      amenities: ["Piscina", "Club Social", "Máxima Seguridad", "Vistas Panorámicas"],
    },
    {
      name: "Ciudad Venecia Danlí",
      location: "El Paraíso, Honduras",
      badge: "DONDE NACIÓ LA MARCA",
      img: "/amenidades/amenidades009.jpg.jpeg",
      slug: "/proyectos/danli",
      description: "El primer proyecto de Ciudad Venecia y la base de todo lo que INMAER ha construido. Una comunidad consolidada con infraestructura completa y familias que ya disfrutan de la vida en armonía.",
      stats: [
        { label: "Seguridad", value: "24/7" },
        { label: "Etapas", value: "3" },
        { label: "Urbanizado", value: "100%" },
      ],
      amenities: ["Seguridad 24/7", "Piscinas", "Canchas de Padel", "Casa Club", "Áreas Verdes", "Agua 365 días"],
    },
    {
      name: "Ciudad Venecia San Lorenzo",
      location: "Valle",
      badge: null,
      img: "/amenidades/san_lorenzo.jpeg",
      slug: "/proyectos/san-lorenzo",
      description: "A minutos de la zona costera del Golfo de Fonseca. Desarrollo residencial con ubicación estratégica, terrenos urbanizados y áreas recreativas para toda la familia.",
      stats: [
        { label: "Seguridad", value: "24/7" },
        { label: "Urbanizado", value: "100%" },
        { label: "Ubicación", value: "Golfo de Fonseca" },
      ],
      amenities: ["Cerca de la costa", "Áreas Recreativas", "Seguridad", "Terrenos Urbanizados"],
    },
    {
      name: "Ciudad Venecia Talanga",
      location: "Francisco Morazán",
      badge: "NUEVO 2026",
      img: "/amenidades/CV_TALANGA_PROVISIONAL.jpg.jpeg",
      slug: "/proyectos/talanga",
      description: "Nuevo lanzamiento 2026. Tres conceptos disponibles — Raíces, Estándar y Premium — diseñados para diferentes perfiles de inversión con accesos pavimentados y alta plusvalía.",
      stats: [
        { label: "Conceptos", value: "3" },
        { label: "Plusvalía", value: "100%" },
        { label: "Seguridad", value: "24/7" },
      ],
      amenities: ["Accesos Pavimentados", "Áreas Verdes", "Financiamiento Directo", "Alta Plusvalía"],
    },
    {
      name: "Ciudad Venecia Tegucigalpa",
      location: "Francisco Morazán",
      badge: "PRÓXIMAMENTE",
      img: "/homepage/portal_ai-ciudad_venecia.jpeg",
      slug: "#",
      description: "El proyecto más esperado. Ciudad Venecia llega a la capital de Honduras.",
      stats: [
        { label: "Estado", value: "Próximamente" },
      ],
    },
    {
      name: "Ciudad Venecia Guaimaca",
      location: "Francisco Morazán",
      badge: "PRÓXIMAMENTE",
      img: "/DRON-JUANJOSE/Guaimaca/Guaimaca.jpeg",
      slug: "#",
      description: "Próximo lanzamiento en Francisco Morazán. La experiencia Ciudad Venecia llega a una nueva comunidad.",
      stats: [
        { label: "Estado", value: "Próximamente" },
      ],
    },
  ];

  // Más Proyectos data (for carousel cards + modal)
  const masProyectos: ProjectModalData[] = [
    { name: "Ciudad Venecia Olancho", location: "Valle de Lepaguare", img: "/NUEVAS-JUANJOSE/verticales/cv_olancho_A002_vertical_web.jpg", badge: "PREMIUM", slug: "/proyectos/olancho", description: "En el corazón del Valle de Lepaguare, un desarrollo premium que combina naturaleza y comodidad.", amenities: ["Seguridad 24/7", "Áreas verdes", "Casa club", "Piscinas", "Canchas deportivas"] },
    { name: "Ciudad Venecia Talanga", location: "Francisco Morazán", img: "/amenidades/CV_TALANGA_PROVISIONAL.jpg.jpeg", badge: "NUEVO 2026", slug: "/proyectos/talanga", description: "Nuevo lanzamiento 2026 en Francisco Morazán. Terrenos con plusvalía garantizada.", amenities: ["Accesos pavimentados", "Áreas comunes", "Plan de financiamiento"] },
    { name: "Ciudad Venecia San Lorenzo", location: "Valle", img: "/amenidades/san_lorenzo.jpeg", badge: null, slug: "/proyectos/san-lorenzo", description: "Desarrollo residencial en el Valle con excelente ubicación y conectividad.", amenities: ["Seguridad", "Parques", "Infraestructura"] },
    { name: "Residencial Versalles", location: "Danlí", img: "/DRON-FOTOS-SAMANTHA/VERSALLES/VERSALLES001.jpg", badge: null, slug: "/proyectos/versalles", description: "Exclusivo residencial en Danlí con vistas panorámicas y diseño arquitectónico contemporáneo.", amenities: ["Club social", "Piscina", "Juegos infantiles", "Zona BBQ"] },
    { name: "Ciudad Venecia Guaimaca", location: "Olancho", img: "/DRON-JUANJOSE/Guaimaca/Guaimaca.jpeg", badge: "PRÓXIMAMENTE", slug: "/proyectos/guaimaca", description: "Próximo lanzamiento en Olancho. Reserva tu oportunidad.", amenities: [] },
    { name: "Ciudad Venecia Tegucigalpa", location: "Francisco Morazán", img: "/homepage/portal_ai-ciudad_venecia.jpeg", badge: "PRÓXIMAMENTE", slug: "/proyectos/tegucigalpa", description: "Próximamente en la capital. Mantente informado.", amenities: [] },
  ];

  return (
    <div className="bg-[#F3F0EB] text-[#484848] antialiased relative font-sans selection:bg-[#C5A065] selection:text-white">
      <style jsx global>{`
        body { font-family: 'Montserrat', sans-serif; }
        h1, h2, h3, h4, h5, h6, .font-serif-display { font-family: 'Cormorant Garamond', serif; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      
      {/* ============================================ */}
      {/* NAVBAR — EXACTO SIN CAMBIOS */}
      {/* ============================================ */}
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
                            <line 
                                key={i} 
                                x1="0" y1="-14" x2="0" y2="-32" 
                                transform={`rotate(${i * 15})`} 
                                stroke="currentColor" 
                                strokeWidth="1.5"
                            />
                         ))}
                    </g>
                    <text x="85" y="50" fontFamily="Montserrat" fontSize="24" fontWeight="300" letterSpacing="0.1em">CIUDAD</text>
                    <text x="200" y="50" fontFamily="Montserrat" fontSize="24" fontWeight="700" letterSpacing="0.1em">VENECIA</text>
                </svg>
             </div>
          </Link>

          <div className="hidden lg:flex items-center gap-8 xl:gap-12">
            <div className="flex items-center gap-8">
                <Link href="/#start" className="text-white text-[11px] font-medium uppercase tracking-[0.15em] hover:text-[#C5A065] transition-colors">
                  Inicio
                </Link>
                <Link href="/quienes-somos" className="text-white text-[11px] font-medium uppercase tracking-[0.15em] hover:text-[#C5A065] transition-colors">
                  Quiénes Somos
                </Link>
                <Link href="/proyectos" className="text-white text-[11px] font-medium uppercase tracking-[0.15em] hover:text-[#C5A065] transition-colors">
                  Proyectos
                </Link>
                <Link href="/contacto" className="text-white text-[11px] font-medium uppercase tracking-[0.15em] hover:text-[#C5A065] transition-colors">
                  Contacto
                </Link>
                <Link href="/" className="text-white text-[11px] font-medium uppercase tracking-[0.15em] hover:text-[#C5A065] transition-colors">
                  Portal Clientes
                </Link>
            </div>

            <div className="h-4 w-[1px] bg-white/30"></div>

            <div className="flex items-center gap-4">
                <span className="text-white/80 text-[10px] font-medium uppercase tracking-wider hidden xl:block">Síguenos</span>
                <div className="flex gap-3">
                    <a href="/" className="text-white hover:text-[#C5A065] transition-colors">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                    </a>
                    <a href="/" className="text-white hover:text-[#C5A065] transition-colors">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.069-4.85.069-3.204 0-3.585-.011-4.849-.069-3.259-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                        </svg>
                    </a>
                    <a href="/" className="text-white hover:text-[#C5A065] transition-colors">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.46-.54 2.94-1.34 4.14-1.8 2.73-5.7 4.01-8.85 2.48-2.69-1.31-4.25-4.17-4.11-7.14.05-3.08 2.08-5.71 4.97-6.55.75-.22 1.54-.31 2.32-.3v4.2c-.41-.03-.84.03-1.24.18-1.31.52-2.14 1.83-2.02 3.24.08 1.48 1.15 2.75 2.63 2.93 1.69.21 3.23-.97 3.51-2.65.07-.63.07-1.27.06-1.91V.02h-.01z"/>
                        </svg>
                    </a>
                </div>
            </div>
          </div>

          <div className="hidden lg:flex items-center">
             <Link href="/contacto" className="border border-white/80 text-white px-8 py-3 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-[#2C2C2C] transition-all duration-300">
                Contáctanos
             </Link>
          </div>
          <button onClick={toggleMenu} className="lg:hidden text-white p-2"><span className="text-2xl">{isMobileMenuOpen ? '✕' : '☰'}</span></button>
        </div>
      </nav>

      {/* ============================================ */}
      {/* SECCIÓN 1: HERO — VIDEO TEXT MASK + BRAND STRIP + PINNED PROJECTS */}
      {/* ============================================ */}
      <VideoTextMaskHero />
      <BrandStrip />
      <CinematicDivider />
      <PinnedProjectsShowcase />

      {/* ============================================ */}
      {/* SECCIÓN 2: PROPUESTA DE VALOR */}
      {/* (Consolida: intro + INMAER badge + carousel) */}
      {/* ============================================ */}
      
      {/* 2a. Intro "Un estilo de vida extraordinario" */}
      <FadeRevealSection />

      {/* 2b. Creado por INMAER */}
      <section className="bg-[#E8E4DA] pt-20 pb-20 text-center border-b border-[#D5CFC1]">
          <div className="max-w-[1200px] mx-auto px-6">
              <Reveal>
                  <div className="flex flex-col items-center justify-center gap-6" style={{ transform: "scale(1.08)", transformOrigin: "center" }}>
                      <div className="flex items-center gap-4">
                          <span className="font-serif-display text-2xl md:text-3xl text-[#2C2C2C] tracking-wide">CREADO POR:</span>
                           <div className="flex flex-col items-start leading-none">
                              <span className="font-serif-display text-3xl md:text-4xl text-[#003B5C] font-bold tracking-widest">INMAER</span>
                              <span className="text-[8px] md:text-[9px] uppercase tracking-[0.4em] text-[#003B5C] font-medium ml-1">REAL ESTATE</span>
                           </div>
                      </div>
                      <p className="text-[#6B665F] text-xs md:text-sm font-medium uppercase tracking-[0.15em] max-w-2xl leading-relaxed">
                          UNA DE LAS DESARROLLADORAS MÁS <span className="text-[#2C2C2C] font-bold">IMPORTANTES</span> DE LA REGIÓN CON MÁS DE <span className="text-[#2C2C2C] font-bold">10 AÑOS</span> DE EXPERIENCIA.
                      </p>
                  </div>
              </Reveal>
          </div>
      </section>

      {/* 2c. Carousel de amenidades */}
      <section className="bg-[#F5F3EE] pt-[74px] pb-16 relative group" ref={carouselRef}>
          <div className="max-w-[1300px] mx-auto px-6 mb-12 relative z-10 overflow-hidden">
               <div className="flex transition-transform duration-[800ms] ease-in-out" 
                    style={{ transform: `translateX(-${currentIndex * 50}%)` }}>
                   {carouselData.map((item, idx) => (
                       <div key={idx} className="min-w-[50%] px-8 box-border">
                           <div className="relative aspect-[16/10] overflow-hidden group group/item cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500">
                               <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover/item:scale-105" />
                               <div className="absolute inset-0 bg-[#2C231A]/10 mix-blend-multiply pointer-events-none z-10" />
                               <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none z-10" />
                               <div className="absolute bottom-8 left-0 right-0 text-center px-4 z-20">
                                   <h4 className="text-white text-sm md:text-lg font-bold uppercase tracking-[0.25em] drop-shadow-md">
                                     {item.title}
                                   </h4>
                               </div>
                           </div>
                       </div>
                   ))}
               </div>
          </div>
          
          <div className="flex justify-center items-center gap-8 mt-4 relative z-10">
              <button onClick={prevSlide} className="w-12 h-12 bg-white border border-gray-200 text-[#2C2C2C] flex items-center justify-center hover:bg-[#C5A065] hover:text-white hover:border-[#C5A065] transition-all shadow-sm rounded-sm">
                  <span className="text-xl">‹</span>
              </button>
              <div className="text-[11px] tracking-widest font-medium text-gray-400">
                 {currentIndex + 1} / {totalItems}
              </div>
              <button onClick={nextSlide} className="w-12 h-12 bg-white border border-gray-200 text-[#2C2C2C] flex items-center justify-center hover:bg-[#C5A065] hover:text-white hover:border-[#C5A065] transition-all shadow-sm rounded-sm">
                  <span className="text-xl">›</span>
              </button>
          </div>
      </section>

      {/* SECCIÓN: VIDEO SHOWCASE */}
      <section className="relative py-24 bg-[#F3F0EB]">
          <div className="max-w-[1200px] mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
              <div className="order-2 lg:order-1 text-center lg:text-left max-w-[500px]">
                  <Reveal>
                      <p className="text-[#C5A065] text-[10px] font-bold uppercase tracking-[0.4em] mb-6">CIUDAD VENECIA</p>
                      <h2 className="font-serif-display text-3xl md:text-4xl lg:text-5xl text-[#2C2C2C] leading-tight mb-6">
                          Un punto de encuentro <br className="hidden md:block" /> vibrante, seguro y armonioso
                      </h2>
                      <p className="text-[#6B665F] text-base font-light leading-relaxed mb-8">
                          Cada rincón de Ciudad Venecia ha sido planeado con atención al detalle, fusionando diseño arquitectónico innovador con la calidez de una comunidad auténtica.
                      </p>
                      <Link href="/proyectos" className="inline-block px-8 py-3 border-2 border-[#2C2C2C] text-[#2C2C2C] text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#2C2C2C] hover:text-white transition-all">
                          Ver Recorrido Virtual
                      </Link>
                  </Reveal>
              </div>
              <div className="order-1 lg:order-2 relative w-full max-w-[500px] mx-auto aspect-video bg-[#2C2C2C] rounded-sm overflow-hidden shadow-2xl">
                  <Reveal delay={0.2}>
                      <video 
                          src="/clips_editados/Clip1_web.mp4" 
                          className="w-full h-full object-cover"
                          autoPlay 
                          muted 
                          loop 
                          playsInline
                      />
                  </Reveal>
              </div>
          </div>
      </section>

      {/* ============================================ */}
      {/* ESTADÍSTICAS — FRANJA ANIMADA */}
      {/* ============================================ */}
      <section className="py-28 bg-[#E8E2D5] relative overflow-hidden border-y border-[#C5A065]/15">
        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <div className="text-center mb-14">
            <span className="text-[#C5A065] text-[10px] font-bold uppercase tracking-[0.3em]">INMAER EN NÚMEROS</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x md:divide-[#C5A065]/25">

            <Reveal delay={0}>
              <div className="text-center group">
                <span className="block text-5xl md:text-6xl lg:text-7xl font-serif-display text-[#C5A065] group-hover:text-[#2C2C2C] transition-colors duration-500">
                  <CountUp to={11} />
                </span>
                <span className="text-[10px] md:text-[11px] font-bold font-semibold uppercase tracking-[0.25em] text-[#6B665F] mt-3 block">Años de Trayectoria</span>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="text-center group">
                <span className="block text-5xl md:text-6xl lg:text-7xl font-serif-display text-[#C5A065] group-hover:text-[#2C2C2C] transition-colors duration-500">
                  <CountUp to={5} />
                </span>
                <span className="text-[10px] md:text-[11px] font-bold font-semibold uppercase tracking-[0.25em] text-[#6B665F] mt-3 block">Ciudades</span>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="text-center group">
                <span className="block text-5xl md:text-6xl lg:text-7xl font-serif-display text-[#C5A065] group-hover:text-[#2C2C2C] transition-colors duration-500">
                  <CountUp to={700} prefix="+" />
                </span>
                <span className="text-[10px] md:text-[11px] font-bold font-semibold uppercase tracking-[0.25em] text-[#6B665F] mt-3 block">Familias Felices</span>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="text-center group">
                <span className="block text-5xl md:text-6xl lg:text-7xl font-serif-display text-[#C5A065] group-hover:text-[#2C2C2C] transition-colors duration-500">
                  <CountUp to={100} suffix="%" />
                </span>
                <span className="text-[10px] md:text-[11px] font-bold font-semibold uppercase tracking-[0.25em] text-[#6B665F] mt-3 block">Plusvalía</span>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-[#E8E4DA] border-y border-[#C5A065]/15">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-6">
            <span className="text-[#C5A065] text-[10px] font-bold uppercase tracking-[0.3em] block mb-4">PRESENCIA NACIONAL</span>
            <h2 className="font-serif-display text-4xl md:text-5xl text-[#2C2C2C] mb-3">Nuestros Proyectos en Honduras</h2>
            <p className="text-[#6B665F] text-sm max-w-lg mx-auto">5 ciudades, +700 familias, un estándar de calidad que se expande por todo el país.</p>
          </div>
          <HondurasMap />
        </div>
      </section>

      <ProjectShowcase
        projects={showcaseProjects}
        onProjectClick={(project) => {
          const modalData = masProyectos.find(p => p.slug === project.slug) || {
            name: project.name,
            location: project.location,
            img: project.img,
            badge: project.badge,
            slug: project.slug,
            description: project.description,
            amenities: project.amenities,
          };
          setSelectedProject(modalData);
        }}
      />

      <ScrollBridge />

      {/* ============================================ */}
      {/* SECCIÓN 3: PRECIOS EXCLUSIVOS */}
      {/* ============================================ */}
      <section className="relative pt-[200px] pb-[120px] px-6 flex items-center justify-center bg-center bg-cover" style={{ backgroundImage: "url('/DRON-FOTOS-SAMANTHA/VERSALLES/VERSALLES002.jpg')" }}>
        <div className="absolute inset-0 bg-[#2C2C2C]/35 backdrop-blur-[2px] z-[1]" />
        <div className="absolute inset-0 bg-[#8C8276]/90 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-[#A69C91]/30 pb-[30px]"></div>

        <CursorSpotlight className="relative z-[2] w-full">
          <div className="max-w-[1200px] mx-auto text-center text-white mt-[20px] mb-[20px]">
           <Reveal>
             <TextReveal as="h2" className="font-serif-display text-3xl md:text-4xl tracking-widest mb-3 drop-shadow-md">PRECIOS EXCLUSIVOS</TextReveal>
             <p className="font-light text-xs md:text-sm max-w-3xl mx-auto mb-8 text-gray-100 drop-shadow-sm">
                Invertir en Ciudad Venecia es invertir en tu futuro. Descubre nuestros planes diseñados para que adquirir tu terreno sea una realidad accesible.
             </p>
           </Reveal>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-0 mb-6">
              <div className="px-4 flex flex-col items-center justify-center border-r-0 md:border-r border-[#EBE7DF]/80">
                 <Reveal delay={0.1}>
                   <span className="text-2xl md:text-3xl font-serif-display mb-2 drop-shadow-sm">FINANCIAMIENTO</span>
                   <span className="text-[10px] uppercase tracking-widest font-medium">DIRECTO Y FLEXIBLE</span>
                 </Reveal>
              </div>
              <div className="px-4 flex flex-col items-center justify-center border-r-0 md:border-r border-[#EBE7DF]/80">
                  <Reveal delay={0.2}>
                    <span className="text-2xl md:text-3xl font-serif-display mb-2 drop-shadow-sm">DESCUENTOS</span>
                    <span className="text-[10px] uppercase tracking-widest font-medium">EN PAGO DE CONTADO</span>
                  </Reveal>
              </div>
              <div className="px-4 flex flex-col items-center justify-center">
                  <Reveal delay={0.3}>
                    <span className="text-2xl md:text-3xl font-serif-display mb-2 drop-shadow-sm">PLUSVALÍA</span>
                    <span className="text-[10px] uppercase tracking-widest font-medium">COMPROBADA EN CADA PROYECTO</span>
                  </Reveal>
              </div>

              <div className="px-4 flex flex-col items-center justify-center border-r-0 md:border-r border-[#EBE7DF]/80 md:mt-8 pt-8 md:pt-0 border-t md:border-t-0 border-[#EBE7DF]/30">
                  <Reveal delay={0.4}>
                    <span className="text-2xl md:text-3xl font-serif-display mb-2 drop-shadow-sm">CUOTAS</span>
                    <span className="text-[10px] uppercase tracking-widest font-medium">ACCESIBLES Y SIN SORPRESAS</span>
                  </Reveal>
              </div>
              <div className="px-4 flex flex-col items-center justify-center border-r-0 md:border-r border-[#EBE7DF]/80 md:mt-8 pt-8 md:pt-0 border-t md:border-t-0 border-[#EBE7DF]/30">
                   <Reveal delay={0.5}>
                     <span className="text-2xl md:text-3xl font-serif-display mb-2 drop-shadow-sm">SIN</span>
                     <span className="text-[10px] uppercase tracking-widest font-medium">INTERMEDIARIOS BANCARIOS</span>
                   </Reveal>
              </div>
              <div className="px-4 flex flex-col items-center justify-center md:mt-8 pt-8 md:pt-0 border-t md:border-t-0 border-[#EBE7DF]/30">
                   <Reveal delay={0.6}>
                     <span className="text-2xl md:text-3xl font-serif-display mb-2 drop-shadow-sm">PLANES</span>
                     <span className="text-[10px] uppercase tracking-widest font-medium">PARA INVERSIONISTAS</span>
                   </Reveal>
              </div>
           </div>

           <p className="text-[10px] italic text-gray-200 mb-8">*Consulta condiciones con tu asesor.</p>

          </div>
        </CursorSpotlight>
      </section>

      {/* ============================================ */}
      {/* SECCIÓN: TU CAMINO HACIA EL HOGAR IDEAL */}
      {/* ============================================ */}
      <InvestmentJourney />

      {/* ============================================ */}
      {/* SECCIÓN 5: AMENIDADES */}
      {/* (Consolida: "espacios que inspiran" + parallax) */}
      {/* ============================================ */}
      
      {/* 5a. Parallax visual with video */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
         <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
            <source src="/NUEVAS-JUANJOSE/horizontales/cv_olancho_piscina_horizontal_web.mp4" type="video/mp4" />
         </video>
         <div className="absolute inset-0 bg-black/40"></div>
         <div className="relative z-10 text-center">
            <Reveal>
              <p className="text-white/80 text-[10px] uppercase tracking-[0.3em] mb-4">Experiencia Premium</p>
              <h2 className="text-white font-serif-display text-6xl md:text-7xl">TU OASIS PRIVADO</h2>
            </Reveal>
         </div>
      </section>

      {/* 5b. Amenidades detalle */}
      <section id="amenidades" className="py-24 bg-[#EBE7DF] text-[#4A403A]">
         <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="ml-[30px]">
               <Reveal>
                 <span className="text-[#C5A065] text-[10px] font-bold uppercase tracking-[0.25em] block mb-4">Amenidades</span>
                 <TextReveal as="h2" className="font-serif-display text-4xl md:text-5xl mb-6 leading-tight text-[#2C2C2C]">Espacios que inspiran tranquilidad</TextReveal>
                 <p className="text-[#6B665F] font-light mb-8 leading-relaxed">
                    Cada rincón de Ciudad Venecia ha sido planeado para ofrecerte la máxima calidad de vida. Disfruta de nuestras casas club, piscinas y áreas verdes protegidas.
                 </p>
                 <ul className="space-y-4">
                    {['Seguridad Privada 24/7', 'Áreas Verdes Exclusivas', 'Canchas Deportivas y de Padel', 'Casa Club y Piscinas', 'Juegos Infantiles', 'Alta Plusvalía'].map((item, i) => (
                       <li key={i} className="flex items-center gap-4 text-sm font-medium tracking-wide text-[#5C554F]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A065]"></span>
                          {item}
                       </li>
                    ))}
                 </ul>
               </Reveal>
            </div>
            <div className="relative h-[600px] overflow-hidden">
               <Reveal delay={0.2} className="h-full">
                 <div className="absolute top-0 right-0 w-[90%] h-[90%] z-10 overflow-hidden shadow-2xl">
                    <Image src="/NUEVAS-JUANJOSE/horizontales/cv_olancho_A001_horizontal_web.jpg" alt="Amenidades Ciudad Venecia" fill className="object-cover" />
                 </div>
                 <div className="absolute bottom-0 left-0 w-[50%] h-[40%] z-20 overflow-hidden border-4 border-[#EBE7DF] shadow-xl">
                    <Image src="/NUEVAS-JUANJOSE/horizontales/cv_olancho_piscina_horizontal_web.jpg" alt="Piscina Ciudad Venecia" fill className="object-cover" />
                 </div>
               </Reveal>
            </div>
         </div>
      </section>

      {/* ============================================ */}
      {/* SECCIÓN 6: SOBRE INMAER */}
      {/* ============================================ */}
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
                
                <Reveal delay={0.5}>
                  <div className="mt-12">
                       <Link href="/quienes-somos" className="inline-block px-10 py-4 border border-white/30 text-white text-xs font-bold uppercase tracking-[0.25em] hover:bg-white hover:text-[#1A2C38] transition-all duration-300">
                          Conoce INMAER
                       </Link>
                  </div>
                </Reveal>
         </div>
      </section>

      {/* ============================================ */}
      {/* SECCIÓN: FACILIDADES DE PAGO */}
      {/* ============================================ */}
      <AdvisorCTA />

      {/* ============================================ */}
      {/* SECCIÓN 7: CONTACTO — SIN CAMBIOS */}
      {/* ============================================ */}
      <section id="kontakt" className="py-24 px-6 bg-[#F3F0EB]">
           <div className="max-w-[1200px] mx-auto">
               
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

               <div className="grid grid-cols-1 lg:grid-cols-12 shadow-2xl rounded-sm overflow-hidden bg-white">
                   
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

                   <div className="lg:col-span-8 bg-white p-10 md:p-12">
                       <form onSubmit={handleContactSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                           <div className="md:col-span-1 group">
                               <label className="block text-[#8C857E] text-[9px] font-bold uppercase tracking-widest mb-2 group-focus-within:text-[#C5A065] transition-colors">NOMBRE COMPLETO</label>
                               <input type="text" name="nombre" placeholder="Ej. Juan Pérez" className="w-full border-b border-gray-200 py-3 text-sm focus:outline-none focus:border-[#C5A065] transition-all bg-transparent placeholder-gray-300 text-[#2C2C2C]" />
                           </div>
                           
                           <div className="md:col-span-1 group">
                               <label className="block text-[#8C857E] text-[9px] font-bold uppercase tracking-widest mb-2 group-focus-within:text-[#C5A065] transition-colors">TELÉFONO / WHATSAPP</label>
                               <input type="text" name="telefono" placeholder="+504 0000-0000" className="w-full border-b border-gray-200 py-3 text-sm focus:outline-none focus:border-[#C5A065] transition-all bg-transparent placeholder-gray-300 text-[#2C2C2C]" />
                           </div>

                           <div className="md:col-span-1 group">
                               <label className="block text-[#8C857E] text-[9px] font-bold uppercase tracking-widest mb-2 group-focus-within:text-[#C5A065] transition-colors">CORREO ELECTRÓNICO</label>
                               <input type="email" name="email" placeholder="tucorreo@ejemplo.com" className="w-full border-b border-gray-200 py-3 text-sm focus:outline-none focus:border-[#C5A065] transition-all bg-transparent placeholder-gray-300 text-[#2C2C2C]" />
                           </div>

                           <div className="md:col-span-1 group">
                               <label className="block text-[#8C857E] text-[9px] font-bold uppercase tracking-widest mb-2 group-focus-within:text-[#C5A065] transition-colors">PROYECTO DE INTERÉS</label>
                               <div className="relative">
                                   <select name="proyecto" className="w-full border-b border-gray-200 py-3 text-sm focus:outline-none focus:border-[#C5A065] transition-all bg-transparent text-[#2C2C2C] appearance-none cursor-pointer">
                                       <option>Seleccionar...</option>
                                       <option>Ciudad Venecia Danlí</option>
                                       <option>Ciudad Venecia Olancho</option>
                                       <option>Ciudad Venecia Talanga</option>
                                       <option>Ciudad Venecia San Lorenzo</option>
                                       <option>Residencial Versalles</option>
                                   </select>
                                   <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                       <span className="text-xs">▼</span>
                                   </div>
                               </div>
                           </div>

                           <div className="md:col-span-2 group">
                               <label className="block text-[#8C857E] text-[9px] font-bold uppercase tracking-widest mb-2 group-focus-within:text-[#C5A065] transition-colors">¿QUÉ TIENES EN MENTE?</label>
                               <textarea name="mensaje" rows={3} placeholder="Cuéntanos si buscas lote, casa, información de financiamiento, etc." className="w-full border-b border-gray-200 py-3 text-sm focus:outline-none focus:border-[#C5A065] transition-all bg-transparent placeholder-gray-300 text-[#2C2C2C] resize-none"></textarea>
                           </div>

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

      {/* ============================================ */}
      {/* FOOTER — EXACTO SIN CAMBIOS */}
      {/* ============================================ */}
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
                     <p className="text-white/60 text-xs font-light leading-relaxed max-w-xs">
                        Desarrollos inmobiliarios pensados para la eternidad. Un proyecto respaldado por la solidez y visión de INMAER.
                     </p>
                </div>

                <div>
                    <h4 className="text-[#C5A065] text-[10px] font-bold uppercase tracking-[0.25em] mb-8">Proyectos</h4>
                    <ul className="space-y-4">
                        <li><Link href="/proyectos/danli" className="text-sm font-medium hover:text-[#C5A065] transition-colors">Ciudad Venecia Danlí</Link></li>
                        <li><Link href="/proyectos/olancho" className="text-sm font-medium hover:text-[#C5A065] transition-colors">Ciudad Venecia Olancho</Link></li>
                        <li><Link href="/proyectos/san-lorenzo" className="text-sm font-medium hover:text-[#C5A065] transition-colors">Ciudad Venecia Valle</Link></li>
                        <li><Link href="/proyectos/versalles" className="text-sm font-medium hover:text-[#C5A065] transition-colors">Residencial Versalles</Link></li>
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

      {/* Project Modal — opens on click from "Más Proyectos" cards */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            key={selectedProject.slug}
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
