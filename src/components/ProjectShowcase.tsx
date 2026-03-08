"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";

export interface ShowcaseProject {
  name: string;
  location: string;
  badge: string | null;
  img: string;
  slug: string;
  description?: string;
  stats?: { label: string; value: string }[];
  amenities?: string[];
}

interface ProjectShowcaseProps {
  projects: ShowcaseProject[];
  onProjectClick?: (project: ShowcaseProject) => void;
}

// ============================================
// COUNTER COMPONENT — Slot machine style
// ============================================
function SlotCounter({ value, total }: { value: number; total: number }) {
  return (
    <div className="flex items-baseline gap-1 font-serif-display">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={value}
          initial={{ y: 30, opacity: 0, filter: "blur(4px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: -30, opacity: 0, filter: "blur(4px)" }}
          transition={{ duration: 0.4, ease: [0.25, 0.8, 0.25, 1] }}
          className="text-5xl md:text-7xl text-[#C5A065] inline-block tabular-nums"
        >
          {String(value).padStart(2, "0")}
        </motion.span>
      </AnimatePresence>
      <span className="text-lg text-white/20 mx-2">/</span>
      <span className="text-lg text-white/30">{String(total).padStart(2, "0")}</span>
    </div>
  );
}

// ============================================
// PROGRESS BAR
// ============================================
function ProgressBar({ progress, total, current }: { progress: number; total: number; current: number }) {
  return (
    <div className="flex items-center gap-3">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="relative h-[2px] flex-1 bg-white/10 overflow-hidden rounded-full">
          <motion.div
            className="absolute inset-y-0 left-0 bg-[#C5A065] rounded-full"
            animate={{
              width: i < current ? "100%" : i === current ? `${(progress % (1 / total)) * total * 100}%` : "0%"
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </div>
      ))}
    </div>
  );
}

// ============================================
// SINGLE PROJECT SLIDE
// ============================================
function ProjectSlide({
  project,
  isActive,
  direction,
  onExplore,
}: {
  project: ShowcaseProject;
  isActive: boolean;
  direction: number;
  onExplore: () => void;
}) {
  const defaultStats = [
    { label: "Ubicación", value: project.location },
  ];
  const stats = project.stats && project.stats.length > 0 ? project.stats : defaultStats;

  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          key={project.name}
          className="absolute inset-0 flex flex-col lg:flex-row"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* LEFT — Image */}
          <motion.div
            className="relative w-full lg:w-[58%] h-[45vh] lg:h-full overflow-hidden"
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.8, 0.25, 1] }}
          >
            <img
              src={project.img}
              alt={project.name}
              className="w-full h-full object-cover"
            />

            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#1A1A1A] hidden lg:block" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/20 to-transparent lg:hidden" />
            <div className="absolute inset-0 bg-black/15" />

            {/* Badge */}
            {project.badge && (
              <motion.div
                className="absolute top-16 left-6 z-10"
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <span className={`px-4 py-2 text-[9px] font-bold uppercase tracking-[0.2em] ${
                  project.badge === "PRÓXIMAMENTE"
                    ? "bg-white/10 backdrop-blur-md text-white border border-white/20"
                    : project.badge === "NUEVO 2026"
                    ? "bg-[#C5A065] text-white"
                    : project.badge === "INSIGNIA"
                    ? "bg-white text-[#1A1A1A]"
                    : "bg-white/90 text-[#1A1A1A]"
                }`}>
                  {project.badge}
                </span>
              </motion.div>
            )}

            {/* Decorative line */}
            <motion.div
              className="absolute bottom-0 left-0 h-[3px] bg-[#C5A065]"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.2, duration: 1.2, ease: [0.25, 0.8, 0.25, 1] }}
            />
          </motion.div>

          {/* RIGHT — Content */}
          <div className="relative w-full lg:w-[42%] bg-[#1A1A1A] flex items-center">
            <div className="w-full px-8 md:px-12 lg:px-16 py-10 lg:py-0">

              {/* Location tag */}
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6, ease: [0.25, 0.8, 0.25, 1] }}
                className="text-[#C5A065] text-[10px] font-bold uppercase tracking-[0.35em] mb-4"
              >
                {project.location}
              </motion.p>

              {/* Project name */}
              <motion.h2
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.35, duration: 0.7, ease: [0.25, 0.8, 0.25, 1] }}
                className="font-serif-display text-3xl md:text-4xl lg:text-5xl text-white leading-[1.1] mb-6"
              >
                {project.name}
              </motion.h2>

              {/* Description */}
              {project.description && (
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.6, ease: [0.25, 0.8, 0.25, 1] }}
                  className="text-white/50 text-sm leading-relaxed mb-8 max-w-md"
                >
                  {project.description}
                </motion.p>
              )}

              {/* Stats */}
              {stats.length > 0 && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.6, ease: [0.25, 0.8, 0.25, 1] }}
                  className="flex gap-6 mb-8"
                >
                  {stats.map((stat, i) => (
                    <div key={i} className={`${i > 0 ? "border-l border-white/10 pl-6" : ""}`}>
                      <p className="text-[9px] text-white/30 uppercase tracking-[0.2em] mb-1">{stat.label}</p>
                      <p className="font-serif-display text-xl text-white">{stat.value}</p>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* Amenities */}
              {project.amenities && project.amenities.length > 0 && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.6, ease: [0.25, 0.8, 0.25, 1] }}
                  className="flex flex-wrap gap-2 mb-8"
                >
                  {project.amenities.slice(0, 5).map((a, i) => (
                    <span key={i} className="text-[10px] text-white/40 bg-white/[0.04] border border-white/[0.06] px-3 py-1.5 rounded-sm">
                      {a}
                    </span>
                  ))}
                </motion.div>
              )}

              {/* Divider */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.75, duration: 0.8, ease: [0.25, 0.8, 0.25, 1] }}
                className="h-[1px] bg-white/10 mb-8 origin-left"
              />

              {/* CTA Buttons */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.85, duration: 0.6, ease: [0.25, 0.8, 0.25, 1] }}
                className="flex flex-wrap gap-3"
              >
                <button
                  onClick={onExplore}
                  className="group relative px-8 py-4 bg-[#C5A065] text-black text-[10px] font-bold uppercase tracking-[0.25em] overflow-hidden transition-all hover:shadow-lg hover:shadow-[#C5A065]/20"
                >
                  <span className="relative z-10">Explorar Proyecto</span>
                  <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)]" />
                </button>

                <a
                  href={`https://wa.me/50489494639?text=${encodeURIComponent(`Hola, me interesa ${project.name}. ¿Pueden darme más información?`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-4 border border-white/15 text-white/60 text-[10px] font-bold uppercase tracking-[0.2em] hover:border-[#C5A065]/50 hover:text-[#C5A065] transition-all"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp
                </a>
              </motion.div>
            </div>

            {/* Decorative vertical line */}
            <motion.div
              className="absolute top-0 left-0 w-[1px] bg-gradient-to-b from-[#C5A065]/0 via-[#C5A065]/30 to-[#C5A065]/0 hidden lg:block"
              style={{ height: "100%" }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 0.1, duration: 1, ease: [0.25, 0.8, 0.25, 1] }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ============================================
// MAIN SHOWCASE COMPONENT
// ============================================
export default function ProjectShowcase({ projects, onProjectClick }: ProjectShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const total = projects.length;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Track which project is active based on scroll
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      const newIndex = Math.min(Math.floor(v * total), total - 1);
      if (newIndex !== currentIndex) {
        setDirection(newIndex > currentIndex ? 1 : -1);
        setCurrentIndex(newIndex);
      }
    });
    return unsubscribe;
  }, [scrollYProgress, currentIndex, total]);

  // Scroll indicator opacity — fades out after first scroll
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  return (
    <>
      {/* ============================================ */}
      {/* DESKTOP — Scroll Takeover */}
      {/* ============================================ */}
      <div ref={containerRef} className="hidden lg:block relative" style={{ height: `${total * 100}vh` }}>
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#1A1A1A]">

          {/* Project Slide */}
          <ProjectSlide
            project={projects[currentIndex]}
            isActive={true}
            direction={direction}
            onExplore={() => onProjectClick?.(projects[currentIndex])}
          />

          {/* Counter — Top Right */}
          <div className="absolute top-8 right-8 z-30">
            <SlotCounter value={currentIndex + 1} total={total} />
          </div>

          {/* Section Label — Top Left */}
          <motion.div
            className="absolute top-8 left-8 z-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-[#C5A065] text-[9px] font-bold uppercase tracking-[0.4em]">Portafolio</p>
            <p className="text-white/30 text-[9px] uppercase tracking-[0.2em] mt-1">Nuestros Proyectos</p>
          </motion.div>

          {/* Progress Bar — Bottom */}
          <div className="absolute bottom-8 left-8 right-8 z-30">
            <ProgressBar progress={scrollYProgress.get()} total={total} current={currentIndex} />
          </div>

          {/* Scroll Indicator — Only on first project */}
          <motion.div
            className="absolute bottom-20 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
            style={{ opacity: scrollIndicatorOpacity }}
          >
            <span className="text-white/30 text-[9px] uppercase tracking-[0.3em]">Scroll para explorar</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="w-5 h-8 border border-white/20 rounded-full flex items-start justify-center p-1.5"
            >
              <motion.div className="w-1 h-1.5 bg-[#C5A065] rounded-full" />
            </motion.div>
          </motion.div>

          {/* Project Navigation Dots — Right Side */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-3">
            {projects.map((_, i) => (
              <button
                key={i}
                className={`transition-all duration-300 rounded-full ${
                  i === currentIndex
                    ? "w-2.5 h-6 bg-[#C5A065]"
                    : "w-2 h-2 bg-white/15 hover:bg-white/30"
                }`}
                onClick={() => {
                  // Scroll to that project
                  if (containerRef.current) {
                    const targetScroll = (i / total) * containerRef.current.scrollHeight;
                    window.scrollTo({ top: containerRef.current.offsetTop + targetScroll, behavior: "smooth" });
                  }
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ============================================ */}
      {/* MOBILE — Stacked Cards (no scroll hijacking) */}
      {/* ============================================ */}
      <div className="lg:hidden bg-[#1A1A1A] py-16 px-4">
        <div className="text-center mb-10">
          <p className="text-[#C5A065] text-[9px] font-bold uppercase tracking-[0.4em] mb-3">Portafolio</p>
          <h2 className="font-serif-display text-3xl text-white">Nuestros Proyectos</h2>
        </div>

        <div className="space-y-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative overflow-hidden rounded-lg"
              onClick={() => onProjectClick?.(project)}
            >
              {/* Image */}
              <div className="relative h-[250px] overflow-hidden">
                <img
                  src={project.img}
                  alt={project.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/30 to-transparent" />
                
                {project.badge && (
                  <span className={`absolute top-4 left-4 px-3 py-1.5 text-[8px] font-bold uppercase tracking-widest ${
                    project.badge === "PRÓXIMAMENTE"
                      ? "bg-white/10 backdrop-blur-sm text-white border border-white/20"
                      : project.badge === "NUEVO 2026"
                      ? "bg-[#C5A065] text-white"
                      : "bg-white text-[#1A1A1A]"
                  }`}>
                    {project.badge}
                  </span>
                )}
                
                {/* Counter */}
                <div className="absolute top-4 right-4">
                  <span className="text-white/30 text-[10px] font-serif-display">{String(i + 1).padStart(2, "0")}</span>
                </div>
              </div>

              {/* Content */}
              <div className="bg-[#1A1A1A] p-5 border-t border-[#C5A065]/20">
                <p className="text-[#C5A065] text-[9px] font-bold uppercase tracking-[0.3em] mb-2">{project.location}</p>
                <h3 className="font-serif-display text-xl text-white mb-2">{project.name}</h3>
                {project.description && (
                  <p className="text-white/40 text-xs leading-relaxed mb-4 line-clamp-2">{project.description}</p>
                )}
                <div className="flex items-center gap-2 text-[#C5A065] text-[10px] font-bold uppercase tracking-[0.2em]">
                  <span>Explorar</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}