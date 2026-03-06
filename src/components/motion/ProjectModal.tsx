'use client';

import { motion } from 'motion/react';

export interface ProjectModalData {
  name: string;
  location: string;
  img: string;
  badge: string | null;
  slug: string;
  description?: string;
  amenities?: string[];
}

interface ProjectModalProps {
  project: ProjectModalData;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const layoutId = `project-image-${project.slug.replace(/\//g, '-')}`;

  return (
    <motion.div
      key="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md overflow-y-auto py-8"
      onClick={onClose}
    >
      {/* Close button — fixed para que siempre sea visible */}
      <button
        onClick={onClose}
        className="fixed top-4 right-4 z-[101] w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors backdrop-blur-sm"
        aria-label="Cerrar"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Container del modal */}
      <motion.div
        key="modal-content"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-4xl mx-auto px-4 bg-[#1A2C2C] rounded-lg overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Hero image - aspect-video con layoutId */}
        <motion.div
          layoutId={layoutId}
          className="relative w-full aspect-video"
        >
            <img
              src={project.img}
              alt={project.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A2C2C] via-transparent to-transparent" />
            {project.badge && (
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider ${
                  project.badge === 'PRÓXIMAMENTE'
                    ? 'bg-white/20 backdrop-blur-sm text-white border border-white/30'
                    : project.badge === 'NUEVO 2026'
                    ? 'bg-[#C5A065] text-white'
                    : 'bg-white/90 text-[#2C2C2C]'
                }`}>
                  {project.badge}
                </span>
              </div>
            )}
        </motion.div>

        {/* Contenido — sin restricción de altura */}
        <div className="p-8 md:p-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="max-w-2xl"
            >
              <h2 className="font-serif-display text-3xl md:text-4xl text-white mb-2">
                {project.name}
              </h2>
              <p className="text-[#C5A065] text-xs uppercase tracking-[0.3em] mb-6">
                {project.location}
              </p>

              <p className="text-white/80 text-sm leading-relaxed mb-8">
                {project.description ?? 'Un desarrollo residencial diseñado para ofrecer la máxima calidad de vida, con espacios verdes, seguridad y comunidad.'}
              </p>

              {project.amenities && project.amenities.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-[#C5A065] text-[10px] font-bold uppercase tracking-[0.25em] mb-4">
                    Amenidades
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {project.amenities.map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-white/80 text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C5A065] shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-4">
                <a
                  href={`https://wa.me/50495498925?text=Hola, me interesa obtener más información sobre ${encodeURIComponent(project.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#25D366] text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#20BD5A] transition-colors"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Consultar por WhatsApp
                </a>
                {project.slug !== '#' && (
                  <a
                    href={project.slug}
                    className="inline-block px-8 py-4 border border-white/30 text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-white/10 transition-colors"
                  >
                    Explorar Proyecto
                  </a>
                )}
              </div>
            </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
