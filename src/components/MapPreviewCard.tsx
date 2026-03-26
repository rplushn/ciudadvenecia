"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

// ============================================
// PROJECT PREVIEW DATA
// ============================================
export interface ProjectPreview {
  id: string;
  name: string;
  location: string;
  status: "pronto" | "activo" | "nuevo";
  statusLabel: string;
  description: string;
  video?: string;
  heroImage: string;
  gallery: string[];
  stats: { label: string; value: string }[];
  whatsappMsg: string;
}

export const PROJECT_PREVIEWS: Record<string, ProjectPreview> = {
  guaimaca: {
    id: "guaimaca",
    name: "Ciudad Venecia Guaimaca",
    location: "Francisco Morazán",
    status: "pronto",
    statusLabel: "Muy Pronto · 2026",
    description: "Nuevo desarrollo en una de las zonas de mayor crecimiento de Francisco Morazán. Terrenos con vista panorámica y acceso directo desde la carretera principal. Tres conceptos disponibles: Raíces, Estándar y Premium.",
    video: "/homepage/Guaimaca_preview.mp4",
    heroImage: "/DRON-JUANJOSE/Guaimaca/Guaimaca001.jpeg",
    gallery: [
      "/DRON-JUANJOSE/Guaimaca/Guaimaca001.jpeg",
      "/amenidades/PORTAL_GUAIMACA_PROVISIONAL.jpg",
    ],
    stats: [
      { label: "Conceptos", value: "3" },
      { label: "Seguridad", value: "24/7" },
      { label: "Plusvalía", value: "100%" },
    ],
    whatsappMsg: "Hola, me interesa Ciudad Venecia Guaimaca. ¿Pueden avisarme cuando esté disponible?",
  },
  olancho: {
    id: "olancho",
    name: "Ciudad Venecia Olancho",
    location: "Valle de Lepaguare",
    status: "activo",
    statusLabel: "Disponible",
    description: "La evolución de INMAER. Terrenos en el hermoso Valle de Lepaguare con amenidades de nueva generación: planta de tratamiento, agua potable 365 días, piscinas, canchas deportivas, casa club y gimnasio.",
    video: "/homepage/Olancho_preview.mp4",
    heroImage: "/DRON-JUANJOSE/Olancho/foto_Olancho.jpeg",
    gallery: [
      "/DRON-JUANJOSE/Olancho/foto_Olancho.jpeg",
      "/amenidades/CV_OLANCHO.jpg.jpeg",
    ],
    stats: [
      { label: "Agua", value: "365 días" },
      { label: "Seguridad", value: "24/7" },
      { label: "Urbanizado", value: "100%" },
    ],
    whatsappMsg: "Hola, me interesa Ciudad Venecia Olancho. ¿Pueden darme más información?",
  },
  talanga: {
    id: "talanga",
    name: "Ciudad Venecia Talanga",
    location: "Francisco Morazán",
    status: "nuevo",
    statusLabel: "Nuevo 2026",
    description: "Nuevo lanzamiento 2026 con tres conceptos: Raíces, Estándar y Premium. Ubicación estratégica con accesos pavimentados y financiamiento directo.",
    video: "/homepage/Talanga_preview.mp4",
    heroImage: "/DRON-JUANJOSE/Talanga/foto_Talanga.jpeg",
    gallery: [
      "/DRON-JUANJOSE/Talanga/foto_Talanga.jpeg",
      "/DRON-JUANJOSE/Talanga/Talanga002.jpeg",
      "/amenidades/CV_TALANGA_PROVISIONAL.jpg.jpeg",
    ],
    stats: [
      { label: "Conceptos", value: "3" },
      { label: "Seguridad", value: "24/7" },
      { label: "Plusvalía", value: "100%" },
    ],
    whatsappMsg: "Hola, me interesa Ciudad Venecia Talanga. ¿Pueden darme más información?",
  },
};

// ============================================
// MAP PREVIEW CARD COMPONENT
// ============================================
interface MapPreviewCardProps {
  project: ProjectPreview;
  originX: number; // Pin position for animation origin
  originY: number;
  onClose: () => void;
}

export default function MapPreviewCard({ project, originX, originY, onClose }: MapPreviewCardProps) {
  const [activeMedia, setActiveMedia] = useState<"video" | number>(project.video ? "video" : 0);
  const [videoError, setVideoError] = useState(false);

  const statusColors = {
    pronto: { bg: "bg-[#C5A065]/20", text: "text-[#C5A065]", border: "border-[#C5A065]/40", dot: "bg-[#C5A065]" },
    activo: { bg: "bg-green-400/20", text: "text-green-400", border: "border-green-400/40", dot: "bg-green-400" },
    nuevo: { bg: "bg-white/20", text: "text-white", border: "border-white/40", dot: "bg-white" },
  };

  const colors = statusColors[project.status];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Card — expands from pin position */}
        <motion.div
          className="relative z-10 w-[90vw] max-w-[520px] max-h-[85vh] overflow-y-auto rounded-xl bg-[#1A1A1A] border border-white/10 shadow-2xl shadow-black/50"
          initial={{
            opacity: 0,
            scale: 0.3,
            y: 20,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            scale: 0.5,
            y: 20,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 25,
          }}
        >
          {/* ============================================ */}
          {/* MEDIA SECTION — Video or Image */}
          {/* ============================================ */}
          <div className="relative aspect-video overflow-hidden rounded-t-xl">
            {/* Active media */}
            {activeMedia === "video" && project.video && !videoError ? (
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
                src={project.video}
                onError={() => setVideoError(true)}
              />
            ) : (
              <img
                src={typeof activeMedia === "number" ? project.gallery[activeMedia] || project.heroImage : project.heroImage}
                alt={project.name}
                className="w-full h-full object-cover"
              />
            )}

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent" />

            {/* Status badge */}
            <div className="absolute top-4 left-4">
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${colors.bg} border ${colors.border} backdrop-blur-sm`}>
                <div className={`w-1.5 h-1.5 rounded-full ${colors.dot} ${project.status === "pronto" ? "animate-pulse" : ""}`} />
                <span className={`text-[9px] font-bold uppercase tracking-widest ${colors.text}`}>
                  {project.statusLabel}
                </span>
              </div>
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-black/60 transition-all group"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="group-hover:rotate-90 transition-transform duration-300">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            {/* Media title overlay */}
            <div className="absolute bottom-4 left-4 right-4">
              <p className="text-[#C5A065] text-[9px] font-bold uppercase tracking-[0.35em] mb-1">{project.location}</p>
              <h3 className="font-serif-display text-2xl text-white leading-tight">{project.name}</h3>
            </div>
          </div>

          {/* ============================================ */}
          {/* GALLERY THUMBNAILS */}
          {/* ============================================ */}
          <div className="flex gap-1.5 px-4 mt-3">
            {/* Video thumb */}
            {project.video && (
              <button
                onClick={() => { setActiveMedia("video"); setVideoError(false); }}
                className={`relative w-16 h-12 rounded overflow-hidden border-2 transition-all shrink-0 ${
                  activeMedia === "video" ? "border-[#C5A065] ring-1 ring-[#C5A065]/30" : "border-white/10 hover:border-white/30"
                }`}
              >
                <img src={project.heroImage} alt="" className="w-full h-full object-cover opacity-60" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-5 h-5 rounded-full bg-white/80 flex items-center justify-center">
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="#1A1A1A">
                      <polygon points="5,3 19,12 5,21" />
                    </svg>
                  </div>
                </div>
                <span className="absolute bottom-0.5 left-0.5 text-[6px] text-white/60 font-bold bg-black/50 px-1 rounded">DRON</span>
              </button>
            )}

            {/* Photo thumbs */}
            {project.gallery.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveMedia(i)}
                className={`relative w-16 h-12 rounded overflow-hidden border-2 transition-all shrink-0 ${
                  activeMedia === i ? "border-[#C5A065] ring-1 ring-[#C5A065]/30" : "border-white/10 hover:border-white/30"
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* ============================================ */}
          {/* INFO SECTION */}
          {/* ============================================ */}
          <div className="px-4 pt-4 pb-5">

            {/* Description */}
            <p className="text-white/50 text-xs leading-relaxed mb-4">
              {project.description}
            </p>

            {/* Stats */}
            <div className="flex gap-3 mb-5">
              {project.stats.map((stat, i) => (
                <div
                  key={i}
                  className={`flex-1 bg-white/[0.04] border border-white/[0.08] rounded-lg p-2.5 text-center ${
                    i === 0 ? "" : ""
                  }`}
                >
                  <span className="text-[8px] text-white/40 uppercase tracking-wider block mb-0.5">{stat.label}</span>
                  <span className="font-serif-display text-sm text-white">{stat.value}</span>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="h-[1px] bg-white/[0.06] mb-4" />

            {/* CTA */}
            <a
              href={`https://wa.me/50489494639?text=${encodeURIComponent(project.whatsappMsg)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full px-5 py-3.5 bg-[#C5A065] text-black text-[10px] font-bold uppercase tracking-[0.2em] rounded-lg hover:bg-[#D4B474] transition-all"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              {project.status === "pronto" ? "Notifícame al lanzamiento" : "Solicitar información"}
            </a>

            {/* Secondary link */}
            {project.status === "pronto" && (
              <p className="text-center text-white/30 text-[9px] mt-3">
                Sé de los primeros en reservar · Sin compromiso
              </p>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}