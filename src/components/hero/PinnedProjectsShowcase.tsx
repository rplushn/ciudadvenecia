"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 'danli',
    tag: 'Donde Nació la Marca',
    location: 'Danlí, El Paraíso',
    title: 'Ciudad Venecia\nDanlí',
    desc: 'El primer proyecto de Ciudad Venecia y la base de todo lo que INMAER ha construido. Una comunidad consolidada con infraestructura completa, seguridad 24/7, piscinas, canchas de padel y casa club.',
    stats: [
      { number: '24/7', label: 'Seguridad' },
      { number: '3', label: 'Etapas' },
      { number: '100%', label: 'Urbanizado' },
    ],
    cta: 'Explorar Danlí',
    ctaBg: '#C5A065',
    ctaColor: '#fff',
    slug: '/proyectos/danli',
    img: '/amenidades/amenidades009.jpg.jpeg',
  },
  {
    id: 'olancho',
    tag: 'Nueva Generación',
    location: 'Valle de Lepaguare, Olancho',
    title: 'Ciudad Venecia\nOlancho',
    desc: 'La evolución de INMAER. Todo lo aprendido en años de experiencia aplicado en un desarrollo de nueva generación con planta de tratamiento, agua potable los 365 días del año, piscinas, canchas deportivas y casa club.',
    stats: [
      { number: '365', label: 'Días de agua' },
      { number: '24/7', label: 'Seguridad' },
      { number: '100%', label: 'Urbanizado' },
    ],
    cta: 'Ver Olancho',
    ctaBg: '#E8E2D5',
    ctaColor: '#2C2C2C',
    slug: '/proyectos/olancho',
    img: '/amenidades/CV_OLANCHO.jpg.jpeg',
  },
  {
    id: 'talanga',
    tag: 'Nuevo 2026',
    location: 'Francisco Morazán',
    title: 'Ciudad Venecia\nTalanga',
    desc: 'Nuevo lanzamiento 2026. Tres conceptos disponibles: Raíces, Estándar y Premium. Accesos pavimentados, financiamiento directo y alta plusvalía garantizada.',
    stats: [
      { number: '3', label: 'Conceptos' },
      { number: '100%', label: 'Plusvalía' },
    ],
    cta: 'Conocer Talanga',
    ctaBg: '#EBE7DF',
    ctaColor: '#2C2C2C',
    slug: '/proyectos/talanga',
    img: '/amenidades/CV_TALANGA_PROVISIONAL.jpg.jpeg',
  },
  {
    id: 'sanlorenzo',
    tag: 'Cerca de la Costa',
    location: 'Valle',
    title: 'Ciudad Venecia\nSan Lorenzo',
    desc: 'A minutos de la zona costera del Golfo de Fonseca. Terrenos urbanizados con áreas recreativas, seguridad y una ubicación estratégica en el sur de Honduras.',
    stats: [
      { number: '24/7', label: 'Seguridad' },
      { number: '100%', label: 'Urbanizado' },
    ],
    cta: 'Ver San Lorenzo',
    ctaBg: '#D4C8B0',
    ctaColor: '#2C2C2C',
    slug: '/proyectos/san-lorenzo',
    img: '/amenidades/san_lorenzo.jpeg',
  },
];

const bgColors = ['#EDE8E0', '#F0ECE4', '#E8E2D5'];

export default function PinnedProjectsShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<InstanceType<typeof Lenis> | null>(null);

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    });
    lenisRef.current = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      ScrollTrigger.update();
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    const ctx = gsap.context(() => {
      // Set z-index
      document.querySelectorAll('.pinned-img-wrapper').forEach((el) => {
        const order = el.getAttribute('data-index');
        if (order) (el as HTMLElement).style.zIndex = order;
      });

      // Content reveals
      gsap.utils.toArray<HTMLElement>('.pinned-info .pinned-content').forEach((content) => {
        gsap.from(content.children, {
          scrollTrigger: { trigger: content, start: 'top 80%', toggleActions: 'play none none reverse' },
          opacity: 0, y: 28, stagger: 0.08, duration: 0.6, ease: 'power3.out',
        });
      });

      // Main pinned animation
      const imgs = gsap.utils.toArray<HTMLImageElement>('.pinned-img-wrapper img');

      ScrollTrigger.matchMedia({
        '(min-width: 769px)': function () {
          const mainTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: '.pinned-arch',
              start: 'top top',
              end: 'bottom bottom',
              pin: '.pinned-right',
              scrub: true,
            },
          });

          gsap.set(imgs, { clipPath: 'inset(0)', objectPosition: '0px 0%' });

          imgs.forEach((_, index) => {
            const currentImage = imgs[index];
            const nextImage = imgs[index + 1] || null;
            const sectionTl = gsap.timeline();

            if (nextImage) {
              sectionTl
                .to('body', { backgroundColor: bgColors[index], duration: 1.5, ease: 'power2.inOut' }, 0)
                .to(currentImage, { clipPath: 'inset(0px 0px 100%)', objectPosition: '0px 60%', duration: 1.5, ease: 'none' }, 0)
                .to(nextImage, { objectPosition: '0px 40%', duration: 1.5, ease: 'none' }, 0);
            }
            mainTimeline.add(sectionTl);
          });
        },

        '(max-width: 768px)': function () {
          gsap.set(imgs, { objectPosition: '0px 60%' });
          imgs.forEach((image, index) => {
            gsap.timeline({
              scrollTrigger: { trigger: image, start: 'top-=70% top+=50%', end: 'bottom+=200% bottom', scrub: true },
            })
              .to(image, { objectPosition: '0px 30%', duration: 5, ease: 'none' })
              .to('body', { backgroundColor: bgColors[index], duration: 1.5, ease: 'power2.inOut' });
          });

          // Mobile interleave
          const leftItems = gsap.utils.toArray<HTMLElement>('.pinned-info');
          const rightItems = gsap.utils.toArray<HTMLElement>('.pinned-img-wrapper');
          leftItems.forEach((item, i) => { item.style.order = String(i * 2); });
          rightItems.forEach((item, i) => { item.style.order = String(i * 2 + 1); });
        },
      });

      // Reset body bg when leaving section
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'bottom 80%',
        onLeave: () => gsap.to('body', { backgroundColor: '#F3F0EB', duration: 0.8 }),
        onEnterBack: () => gsap.to('body', { backgroundColor: bgColors[bgColors.length - 1], duration: 0.8 }),
      });
    }, containerRef);

    return () => {
      ctx.revert();
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <div ref={containerRef} style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 2rem' }}>
      <div style={{ height: '15vh' }} />

      <div
        className="pinned-arch"
        style={{
          display: 'flex',
          gap: '50px',
          justifyContent: 'space-between',
          maxWidth: '1200px',
          marginInline: 'auto',
        }}
      >
        {/* LEFT: Project info cards */}
        <div
          className="pinned-left"
          style={{ display: 'flex', flexDirection: 'column', minWidth: '340px', maxWidth: '420px' }}
        >
          {projects.map((project) => (
            <div
              key={project.id}
              className="pinned-info"
              style={{ height: '100vh', display: 'grid', placeItems: 'center' }}
            >
              <div className="pinned-content" style={{ width: '100%' }}>
                <div
                  style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: '9px',
                    letterSpacing: '0.35em',
                    textTransform: 'uppercase',
                    opacity: 0.4,
                    marginBottom: '4px',
                    fontWeight: 600,
                  }}
                >
                  {project.tag}
                </div>
                <div
                  style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: '11px',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    marginBottom: '14px',
                    fontWeight: 600,
                    color: '#C5A065',
                  }}
                >
                  {project.location}
                </div>
                <h2
                  className="font-serif-display"
                  style={{
                    fontSize: '44px',
                    fontWeight: 500,
                    letterSpacing: '-0.5px',
                    lineHeight: 1.1,
                    color: '#2C2C2C',
                    whiteSpace: 'pre-line',
                  }}
                >
                  {project.title}
                </h2>
                <p
                  style={{
                    color: 'rgba(44,44,44,0.65)',
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: '15px',
                    fontWeight: 300,
                    letterSpacing: '-0.3px',
                    margin: '10px 0 22px',
                    lineHeight: 1.65,
                  }}
                >
                  {project.desc}
                </p>
                <div style={{ display: 'flex', gap: '28px', marginBottom: '22px' }}>
                  {project.stats.map((stat) => (
                    <div key={stat.label} style={{ display: 'flex', flexDirection: 'column' }}>
                      <span
                        className="font-serif-display"
                        style={{ fontSize: '36px', fontWeight: 600, lineHeight: 1, color: '#2C2C2C' }}
                      >
                        {stat.number}
                      </span>
                      <span
                        style={{
                          fontFamily: 'Montserrat, sans-serif',
                          fontSize: '8px',
                          letterSpacing: '0.2em',
                          textTransform: 'uppercase',
                          opacity: 0.4,
                          marginTop: '4px',
                          fontWeight: 600,
                        }}
                      >
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
                <a
                  href={project.slug}
                  style={{
                    textDecoration: 'none',
                    padding: '14px 22px',
                    borderRadius: '40px',
                    display: 'inline-flex',
                    gap: '8px',
                    alignItems: 'center',
                    fontWeight: 600,
                    fontSize: '13px',
                    fontFamily: 'Montserrat, sans-serif',
                    letterSpacing: '0.02em',
                    background: project.ctaBg,
                    color: project.ctaColor,
                    transition: 'transform 0.3s, box-shadow 0.3s',
                  }}
                >
                  {project.cta} →
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT: Stacked images with mask reveal */}
        <div
          className="pinned-right"
          style={{
            flexShrink: 1,
            height: '100vh',
            width: '100%',
            maxWidth: '580px',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {projects.map((project, i) => (
            <div
              key={project.id}
              className="pinned-img-wrapper"
              data-index={projects.length - i}
              style={{
                position: 'absolute',
                top: '50%',
                left: 0,
                transform: 'translateY(-50%)',
                height: '480px',
                width: '100%',
                borderRadius: '14px',
                overflow: 'hidden',
                boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
              }}
            >
              <img
                src={project.img}
                alt={project.title.replace('\n', ' ')}
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
              />
            </div>
          ))}
        </div>
      </div>

      <div style={{ height: '15vh' }} />
    </div>
  );
}
