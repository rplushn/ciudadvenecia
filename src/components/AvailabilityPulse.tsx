"use client";

import { useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Reveal } from '@/components/motion/Reveal';
import { DEPT_PATHS, PROJECTS, PIN_POSITIONS } from '@/components/HondurasMap';

const ACTIVE_DEPTS = new Set(["HNEP", "HNOL", "HNFM", "HNVA"]);

const statusColors: Record<string, string> = {
  activo: '#C5A065',
  proximamente: '#FFFFFF',
};

export default function AvailabilityPulse() {
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const active = PROJECTS.find(p => p.id === activeProject);

  return (
    <section ref={sectionRef} className="relative py-28 md:py-36 px-6 bg-[#1A3A52] overflow-hidden">
      {/* Dot grid background */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`, backgroundSize: '30px 30px' }}
      />

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-8 mb-20 items-end">
          <Reveal>
            <span className="text-[#C5A065] text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block">
              Presencia en expansión
            </span>
            <h2 className="font-serif-display text-4xl md:text-5xl lg:text-6xl text-white leading-[1.05]">
              Tu lote te está{' '}
              <span className="italic text-[#C5A065]">esperando</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-white/40 text-sm font-light leading-relaxed max-w-md lg:ml-auto">
              Proyectos activos en ubicaciones estratégicas de Honduras.
              Cada punto es una comunidad en crecimiento.
            </p>
          </Reveal>
        </div>

        {/* Map + Info Layout */}
        <div className="grid lg:grid-cols-3 gap-12 items-center">

          {/* Map (2/3) — Real Honduras departments */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="lg:col-span-2 relative"
          >
            <svg viewBox="0 180 1000 580" className="w-full h-auto" style={{ maxHeight: '550px' }}>
              {/* Render all 18 departments */}
              {Object.entries(DEPT_PATHS).map(([id, { d }]) => {
                const hasProject = ACTIVE_DEPTS.has(id);
                return (
                  <path
                    key={id}
                    d={d}
                    fill={hasProject ? 'rgba(197,160,101,0.08)' : 'rgba(255,255,255,0.02)'}
                    stroke={hasProject ? 'rgba(197,160,101,0.35)' : 'rgba(255,255,255,0.08)'}
                    strokeWidth="1"
                    className="transition-all duration-500"
                  />
                );
              })}

              {/* Project pins with pulse */}
              {PROJECTS.map((project, i) => {
                const pos = PIN_POSITIONS[project.id];
                if (!pos) return null;
                const color = statusColors[project.status] || '#C5A065';
                const isActive = activeProject === project.id;
                const delay = i * 0.3;

                return (
                  <motion.g
                    key={project.id}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.8 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                    className="cursor-pointer"
                    onMouseEnter={() => setActiveProject(project.id)}
                    onMouseLeave={() => setActiveProject(null)}
                  >
                    {/* Outer pulse ring 1 */}
                    <circle cx={pos.x} cy={pos.y} r="18" fill="none" stroke={color} strokeWidth="0.5" opacity="0.3">
                      <animate attributeName="r" values="12;22;12" dur="3s" begin={`${delay}s`} repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.4;0;0.4" dur="3s" begin={`${delay}s`} repeatCount="indefinite" />
                    </circle>

                    {/* Outer pulse ring 2 */}
                    <circle cx={pos.x} cy={pos.y} r="12" fill="none" stroke={color} strokeWidth="0.8" opacity="0.5">
                      <animate attributeName="r" values="8;16;8" dur="3s" begin={`${delay + 0.5}s`} repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.6;0;0.6" dur="3s" begin={`${delay + 0.5}s`} repeatCount="indefinite" />
                    </circle>

                    {/* Core dot */}
                    <circle
                      cx={pos.x} cy={pos.y} r={isActive ? 7 : 5}
                      fill={color}
                      className="transition-all duration-300"
                    />

                    {/* Inner bright core */}
                    <circle cx={pos.x} cy={pos.y} r="2.5" fill="white" opacity="0.8" />

                    {/* Hover label */}
                    {isActive && (
                      <g>
                        <rect
                          x={pos.x + 12} y={pos.y - 16}
                          width={project.name.length * 6.5 + 20} height="28"
                          rx="2"
                          fill="rgba(0,0,0,0.75)"
                        />
                        <text
                          x={pos.x + 22} y={pos.y + 2}
                          fill="white"
                          fontSize="11"
                          fontFamily="Montserrat, sans-serif"
                        >
                          {project.name}
                        </text>
                      </g>
                    )}
                  </motion.g>
                );
              })}
            </svg>
          </motion.div>

          {/* Info Panel (1/3) */}
          <div className="lg:col-span-1">
            <div className="min-h-[200px]">
              {active ? (
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="border-l-2 border-[#C5A065] pl-6"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: statusColors[active.status] || '#C5A065' }} />
                    <span className={`text-[9px] uppercase tracking-[0.3em] font-bold ${
                      active.status === 'activo' ? 'text-[#C5A065]' : 'text-white/60'
                    }`}>
                      {active.status === 'activo' ? 'Activo' : 'Próximamente'}
                    </span>
                  </div>
                  <h3 className="font-serif-display text-2xl md:text-3xl text-white mb-3">
                    {active.name}
                  </h3>
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-2">{active.location}</p>
                  <p className="text-white/50 text-sm font-light leading-relaxed mb-6">
                    {active.lotes}
                  </p>
                  <a
                    href={`https://wa.me/50489494639?text=Hola%2C%20quiero%20información%20sobre%20${encodeURIComponent(active.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#C5A065] text-xs font-bold uppercase tracking-[0.2em] hover:text-white transition-colors border-b border-[#C5A065]/30 hover:border-white pb-1"
                  >
                    Consultar disponibilidad
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M7 17L17 7M17 7H7M17 7v10"/>
                    </svg>
                  </a>
                </motion.div>
              ) : (
                <Reveal>
                  <div className="border-l-2 border-white/10 pl-6">
                    <p className="text-white/30 text-sm font-light italic mb-8">
                      Pasa el cursor sobre un punto para ver detalles del proyecto
                    </p>

                    {/* Legend */}
                    <div className="space-y-4">
                      {[
                        { color: '#C5A065', label: 'Activo' },
                        { color: '#FFFFFF', label: 'Próximamente' },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="relative">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                            <div className="absolute inset-0 w-3 h-3 rounded-full animate-ping opacity-30" style={{ backgroundColor: item.color }} />
                          </div>
                          <span className="text-white/50 text-xs uppercase tracking-[0.2em]">{item.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
