"use client";

import { useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Reveal } from '@/components/motion/Reveal';

interface ProjectPin {
  id: string;
  name: string;
  status: 'consolidado' | 'preventa' | 'expansion';
  statusLabel: string;
  x: number; // SVG coordinate
  y: number;
  detail: string;
}

const projects: ProjectPin[] = [
  {
    id: 'danli',
    name: 'Ciudad Venecia Danlí',
    status: 'consolidado',
    statusLabel: 'Consolidado',
    x: 420, y: 255,
    detail: 'Amenidades completas · Casas entregadas',
  },
  {
    id: 'olancho',
    name: 'Ciudad Venecia Olancho',
    status: 'consolidado',
    statusLabel: 'Consolidado',
    x: 400, y: 185,
    detail: 'Piscina olímpica · Canchas · Kioscos',
  },
  {
    id: 'versalles',
    name: 'Residencial Versalles',
    status: 'consolidado',
    statusLabel: 'Consolidado',
    x: 405, y: 240,
    detail: 'Piscina · Juegos · Áreas sociales',
  },
  {
    id: 'talanga',
    name: 'Ciudad Venecia Talanga',
    status: 'preventa',
    statusLabel: 'Pre-venta',
    x: 320, y: 220,
    detail: 'Lotes en pre-venta · Construcción activa',
  },
  {
    id: 'guaimaca',
    name: 'Ciudad Venecia Guaimaca',
    status: 'expansion',
    statusLabel: 'Próximamente',
    x: 345, y: 205,
    detail: 'En desarrollo · Terreno asegurado',
  },
  {
    id: 'san-lorenzo',
    name: 'Ciudad Venecia Valle',
    status: 'consolidado',
    statusLabel: 'Consolidado',
    x: 290, y: 310,
    detail: 'Zona Sur · En operación',
  },
  {
    id: 'tegucigalpa',
    name: 'Ciudad Venecia Tegucigalpa',
    status: 'expansion',
    statusLabel: 'Próximamente',
    x: 305, y: 240,
    detail: 'Capital · En planificación',
  },
];

const statusColors = {
  consolidado: '#C5A065',
  preventa: '#4ECDC4',
  expansion: '#FFFFFF',
};

function PulsePin({ project, index, onHover, onLeave, isActive }: {
  project: ProjectPin;
  index: number;
  onHover: () => void;
  onLeave: () => void;
  isActive: boolean;
}) {
  const color = statusColors[project.status];
  const delay = 0.15 * index;

  return (
    <motion.g
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.8 + delay, ease: [0.22, 1, 0.36, 1] }}
      className="cursor-pointer"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Outer pulse ring 1 */}
      <circle cx={project.x} cy={project.y} r="18" fill="none" stroke={color} strokeWidth="0.5" opacity="0.3">
        <animate attributeName="r" values="12;22;12" dur="3s" begin={`${delay}s`} repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.4;0;0.4" dur="3s" begin={`${delay}s`} repeatCount="indefinite" />
      </circle>

      {/* Outer pulse ring 2 */}
      <circle cx={project.x} cy={project.y} r="12" fill="none" stroke={color} strokeWidth="0.8" opacity="0.5">
        <animate attributeName="r" values="8;16;8" dur="3s" begin={`${delay + 0.5}s`} repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.6;0;0.6" dur="3s" begin={`${delay + 0.5}s`} repeatCount="indefinite" />
      </circle>

      {/* Core dot */}
      <circle
        cx={project.x} cy={project.y} r={isActive ? 6 : 4}
        fill={color}
        className="transition-all duration-300"
        filter="url(#glow)"
      />

      {/* Inner bright core */}
      <circle cx={project.x} cy={project.y} r="2" fill="white" opacity="0.8" />
    </motion.g>
  );
}

export default function AvailabilityPulse() {
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const active = projects.find(p => p.id === activeProject);

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
              Proyectos activos en 7 ubicaciones estratégicas de Honduras.
              Cada punto es una comunidad en crecimiento.
            </p>
          </Reveal>
        </div>

        {/* Map + Info Layout */}
        <div className="grid lg:grid-cols-3 gap-12 items-center">

          {/* Map (2/3) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="lg:col-span-2 relative"
          >
            <svg
              viewBox="100 100 420 260"
              className="w-full h-auto"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Honduras outline — simplified */}
              <motion.path
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ duration: 2.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                d="M140,200 L155,180 L170,175 L185,168 L200,165 L220,160 L240,155 L255,150 L270,148 L285,150 L300,155 L310,160 L325,165 L340,160 L355,155 L370,158 L385,165 L400,170 L415,175 L430,172 L445,168 L460,170 L470,180 L475,195 L470,210 L465,225 L460,240 L455,250 L445,260 L435,270 L420,275 L405,280 L390,285 L375,290 L360,295 L345,300 L330,305 L315,310 L300,315 L285,318 L270,320 L260,315 L250,305 L240,295 L230,285 L220,280 L210,275 L200,270 L190,260 L180,250 L170,240 L160,230 L150,220 L142,210 Z"
                fill="none"
                stroke="#C5A065"
                strokeWidth="1"
                opacity="0.25"
              />

              {/* Inner subtle fill */}
              <path
                d="M140,200 L155,180 L170,175 L185,168 L200,165 L220,160 L240,155 L255,150 L270,148 L285,150 L300,155 L310,160 L325,165 L340,160 L355,155 L370,158 L385,165 L400,170 L415,175 L430,172 L445,168 L460,170 L470,180 L475,195 L470,210 L465,225 L460,240 L455,250 L445,260 L435,270 L420,275 L405,280 L390,285 L375,290 L360,295 L345,300 L330,305 L315,310 L300,315 L285,318 L270,320 L260,315 L250,305 L240,295 L230,285 L220,280 L210,275 L200,270 L190,260 L180,250 L170,240 L160,230 L150,220 L142,210 Z"
                fill="url(#mapFill)"
                opacity="0.08"
              />

              <defs>
                <radialGradient id="mapFill" cx="50%" cy="50%">
                  <stop offset="0%" stopColor="#C5A065" />
                  <stop offset="100%" stopColor="transparent" />
                </radialGradient>
              </defs>

              {/* Project pins */}
              {projects.map((project, i) => (
                <PulsePin
                  key={project.id}
                  project={project}
                  index={i}
                  onHover={() => setActiveProject(project.id)}
                  onLeave={() => setActiveProject(null)}
                  isActive={activeProject === project.id}
                />
              ))}

              {/* Connection lines between nearby projects (subtle) */}
              <motion.g
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 0.1 } : {}}
                transition={{ duration: 1, delay: 2 }}
              >
                <line x1="320" y1="220" x2="345" y2="205" stroke="#C5A065" strokeWidth="0.5" strokeDasharray="4 4" />
                <line x1="345" y1="205" x2="400" y2="185" stroke="#C5A065" strokeWidth="0.5" strokeDasharray="4 4" />
                <line x1="400" y1="185" x2="420" y2="255" stroke="#C5A065" strokeWidth="0.5" strokeDasharray="4 4" />
                <line x1="420" y1="255" x2="405" y2="240" stroke="#C5A065" strokeWidth="0.5" strokeDasharray="4 4" />
                <line x1="305" y1="240" x2="320" y2="220" stroke="#C5A065" strokeWidth="0.5" strokeDasharray="4 4" />
                <line x1="305" y1="240" x2="290" y2="310" stroke="#C5A065" strokeWidth="0.5" strokeDasharray="4 4" />
              </motion.g>
            </svg>
          </motion.div>

          {/* Info Panel (1/3) */}
          <div className="lg:col-span-1">
            {/* Active project info */}
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
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: statusColors[active.status] }} />
                    <span className={`text-[9px] uppercase tracking-[0.3em] font-bold ${
                      active.status === 'preventa' ? 'text-[#4ECDC4]' : active.status === 'expansion' ? 'text-white/60' : 'text-[#C5A065]'
                    }`}>
                      {active.statusLabel}
                    </span>
                  </div>
                  <h3 className="font-serif-display text-2xl md:text-3xl text-white mb-3">
                    {active.name}
                  </h3>
                  <p className="text-white/50 text-sm font-light leading-relaxed mb-6">
                    {active.detail}
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
                        { color: '#C5A065', label: 'Consolidado' },
                        { color: '#4ECDC4', label: 'Pre-venta' },
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
