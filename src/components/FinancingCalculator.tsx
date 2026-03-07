"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

// ============================================
// DATOS OFICIALES INMAER — Confirmados por JuanJose 6/Mar/2026
// ============================================

interface Plan {
  nombre: string;
  prima: number;
  mensualidad: number;
  plazoMeses: number;
  precioFinal: number;
}

interface Concepto {
  nombre: string;
  planes: Plan[];
  contado: number;
}

interface Proyecto {
  id: string;
  nombre: string;
  ubicacion: string;
  conceptos: Concepto[];
  medidas?: string;
}

const PROYECTOS: Proyecto[] = [
  {
    id: "danli",
    nombre: "Ciudad Venecia Danlí",
    ubicacion: "El Paraíso",
    conceptos: [{
      nombre: "Estándar",
      contado: 350000,
      planes: [
        { nombre: "Tradicional", prima: 6000, mensualidad: 2000, plazoMeses: 204, precioFinal: 414000 },
        { nombre: "Prima Media", prima: 10000, mensualidad: 2130, plazoMeses: 180, precioFinal: 393300 },
        { nombre: "Prima Alta", prima: 15000, mensualidad: 2540, plazoMeses: 144, precioFinal: 380880 },
        { nombre: "Premium", prima: 20000, mensualidad: 4000, plazoMeses: 85, precioFinal: 360000 },
      ]
    }]
  },
  {
    id: "san-lorenzo",
    nombre: "Ciudad Venecia San Lorenzo",
    ubicacion: "Valle",
    conceptos: [{
      nombre: "Estándar",
      contado: 350000,
      planes: [
        { nombre: "Tradicional", prima: 6000, mensualidad: 2000, plazoMeses: 204, precioFinal: 414000 },
        { nombre: "Prima Media", prima: 10000, mensualidad: 2130, plazoMeses: 180, precioFinal: 393300 },
        { nombre: "Prima Alta", prima: 15000, mensualidad: 2540, plazoMeses: 144, precioFinal: 380880 },
        { nombre: "Premium", prima: 20000, mensualidad: 4000, plazoMeses: 85, precioFinal: 360000 },
      ]
    }]
  },
  {
    id: "talanga",
    nombre: "Ciudad Venecia Talanga",
    ubicacion: "Francisco Morazán",
    conceptos: [
      {
        nombre: "Raíces",
        contado: 160000,
        planes: [
          { nombre: "Tradicional", prima: 2500, mensualidad: 900, plazoMeses: 240, precioFinal: 218500 },
          { nombre: "Prima Media", prima: 5000, mensualidad: 1200, plazoMeses: 168, precioFinal: 206600 },
          { nombre: "Prima Alta", prima: 10000, mensualidad: 1500, plazoMeses: 120, precioFinal: 190000 },
          { nombre: "Preferencial", prima: 15000, mensualidad: 1800, plazoMeses: 84, precioFinal: 166200 },
        ]
      },
      {
        nombre: "Estándar",
        contado: 250000,
        planes: [
          { nombre: "Tradicional", prima: 3000, mensualidad: 1500, plazoMeses: 240, precioFinal: 363000 },
          { nombre: "Intermedio 1", prima: 6000, mensualidad: 2000, plazoMeses: 168, precioFinal: 342000 },
          { nombre: "Intermedio 2", prima: 10000, mensualidad: 2500, plazoMeses: 120, precioFinal: 310000 },
          { nombre: "Preferencial", prima: 15000, mensualidad: 3000, plazoMeses: 84, precioFinal: 267000 },
        ]
      },
      {
        nombre: "Premium",
        contado: 400000,
        planes: [
          { nombre: "Tradicional", prima: 6000, mensualidad: 2000, plazoMeses: 240, precioFinal: 486000 },
          { nombre: "Prima Media", prima: 10000, mensualidad: 2600, plazoMeses: 168, precioFinal: 446800 },
          { nombre: "Prima Alta", prima: 15000, mensualidad: 3200, plazoMeses: 132, precioFinal: 437400 },
          { nombre: "Preferencial", prima: 20000, mensualidad: 3900, plazoMeses: 100, precioFinal: 410000 },
        ]
      }
    ]
  },
  {
    id: "guaimaca",
    nombre: "Ciudad Venecia Guaimaca",
    ubicacion: "Olancho",
    conceptos: [
      {
        nombre: "Raíces",
        contado: 160000,
        planes: [
          { nombre: "Tradicional", prima: 2500, mensualidad: 900, plazoMeses: 240, precioFinal: 218500 },
          { nombre: "Prima Media", prima: 5000, mensualidad: 1200, plazoMeses: 168, precioFinal: 206600 },
          { nombre: "Prima Alta", prima: 10000, mensualidad: 1500, plazoMeses: 120, precioFinal: 190000 },
          { nombre: "Preferencial", prima: 15000, mensualidad: 1800, plazoMeses: 84, precioFinal: 166200 },
        ]
      },
      {
        nombre: "Estándar",
        contado: 250000,
        planes: [
          { nombre: "Tradicional", prima: 3000, mensualidad: 1500, plazoMeses: 240, precioFinal: 363000 },
          { nombre: "Intermedio 1", prima: 6000, mensualidad: 2000, plazoMeses: 168, precioFinal: 342000 },
          { nombre: "Intermedio 2", prima: 10000, mensualidad: 2500, plazoMeses: 120, precioFinal: 310000 },
          { nombre: "Preferencial", prima: 15000, mensualidad: 3000, plazoMeses: 84, precioFinal: 267000 },
        ]
      },
      {
        nombre: "Premium",
        contado: 400000,
        planes: [
          { nombre: "Tradicional", prima: 6000, mensualidad: 2000, plazoMeses: 240, precioFinal: 486000 },
          { nombre: "Prima Media", prima: 10000, mensualidad: 2600, plazoMeses: 168, precioFinal: 446800 },
          { nombre: "Prima Alta", prima: 15000, mensualidad: 3200, plazoMeses: 132, precioFinal: 437400 },
          { nombre: "Preferencial", prima: 20000, mensualidad: 3900, plazoMeses: 100, precioFinal: 410000 },
        ]
      }
    ]
  },
  {
    id: "olancho",
    nombre: "Ciudad Venecia Olancho",
    ubicacion: "Valle de Lepaguare",
    medidas: "10×17 mts (170 m²)",
    conceptos: [{
      nombre: "Terrenos",
      contado: 445000,
      planes: [
        { nombre: "Estándar", prima: 6000, mensualidad: 2100, plazoMeses: 236, precioFinal: 501600 },
        { nombre: "Esquinero", prima: 6600, mensualidad: 2300, plazoMeses: 238, precioFinal: 555240 },
        { nombre: "Promoción (10 años)", prima: 7000, mensualidad: 3650, plazoMeses: 120, precioFinal: 445000 },
      ]
    }]
  },
];

// ============================================
// UTILIDADES
// ============================================

const formatL = (n: number) => `L ${n.toLocaleString("es-HN")}`;
const formatLShort = (n: number) => {
  if (n >= 1000000) return `L ${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `L ${(n / 1000).toFixed(0)}K`;
  return `L ${n}`;
};

const plazoToText = (meses: number) => {
  const anos = Math.floor(meses / 12);
  const rem = meses % 12;
  if (anos === 0) return `${meses} meses`;
  if (rem === 0) return `${anos} ${anos === 1 ? "año" : "años"}`;
  return `${anos} años ${rem} meses`;
};

const costoDiario = (mensualidad: number) => Math.round(mensualidad / 30);

// ============================================
// EQUIVALENCIAS
// ============================================
const getEquivalencia = (diario: number) => {
  if (diario <= 30) return { texto: "menos que un café diario", icon: "☕" };
  if (diario <= 50) return { texto: "como una baleada diaria", icon: "🫓" };
  if (diario <= 70) return { texto: "menos que un combo de almuerzo", icon: "🍽️" };
  if (diario <= 100) return { texto: "como 2 recargas de celular al mes", icon: "📱" };
  if (diario <= 135) return { texto: "menos que un alquiler", icon: "🏠" };
  return { texto: "una inversión inteligente en tu futuro", icon: "📈" };
};

// ============================================
// COMPONENTE PRINCIPAL
// ============================================
export default function FinancingCalculator() {
  const [proyectoIdx, setProyectoIdx] = useState(0);
  const [conceptoIdx, setConceptoIdx] = useState(0);
  const [planIdx, setPlanIdx] = useState(0);
  const [showContado, setShowContado] = useState(false);

  const proyecto = PROYECTOS[proyectoIdx];
  const concepto = proyecto.conceptos[Math.min(conceptoIdx, proyecto.conceptos.length - 1)];
  const plan = concepto.planes[Math.min(planIdx, concepto.planes.length - 1)];

  // Reset selections when project changes
  useEffect(() => { setConceptoIdx(0); setPlanIdx(0); setShowContado(false); }, [proyectoIdx]);
  useEffect(() => { setPlanIdx(0); setShowContado(false); }, [conceptoIdx]);

  const costExtra = plan.precioFinal - concepto.contado;
  const costExtraPct = Math.round((costExtra / concepto.contado) * 100);
  const diario = costoDiario(plan.mensualidad);
  const equiv = getEquivalencia(diario);

  // Max precio for bar scaling
  const maxPrecio = Math.max(...concepto.planes.map(p => p.precioFinal), concepto.contado);

  return (
    <div className="relative max-w-4xl mx-auto">

      {/* HEADER */}
      <div className="text-center mb-8">
        <span className="text-[#C5A065] text-[11px] font-bold uppercase tracking-[0.3em] block mb-3">
          Financiamiento sin intereses
        </span>
        <h3 className="font-serif-display text-2xl md:text-3xl text-white mb-2">
          Tu camino al terreno
        </h3>
        <p className="text-white/60 text-xs max-w-md mx-auto">
          Selecciona tu proyecto, concepto y plan. Visualiza cada paso hasta las llaves de tu terreno.
        </p>
      </div>

      {/* SELECTORS */}
      <div className="bg-white/[0.04] border border-white/10 rounded-lg p-5 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Project */}
          <div>
            <label className="text-[#C5A065] text-[10px] font-bold uppercase tracking-widest block mb-2">
              Proyecto
            </label>
            <select
              value={proyectoIdx}
              onChange={(e) => setProyectoIdx(Number(e.target.value))}
              className="w-full bg-white/10 border border-white/15 text-white text-sm rounded px-4 py-3 focus:border-[#C5A065] outline-none appearance-none cursor-pointer"
            >
              {PROYECTOS.map((p, i) => (
                <option key={p.id} value={i} className="bg-[#1a1a1a] text-white">{p.nombre}</option>
              ))}
            </select>
            <p className="text-white/50 text-[11px] mt-1">{proyecto.ubicacion}{proyecto.medidas ? ` · ${proyecto.medidas}` : ''}</p>
          </div>

          {/* Concept */}
          <div>
            <label className="text-[#C5A065] text-[10px] font-bold uppercase tracking-widest block mb-2">
              Concepto
            </label>
            {proyecto.conceptos.length === 1 ? (
              <div className="bg-white/10 border border-white/15 text-white text-sm rounded px-4 py-3">
                {proyecto.conceptos[0].nombre}
              </div>
            ) : (
              <div className="flex gap-2 flex-wrap">
                {proyecto.conceptos.map((c, i) => (
                  <button
                    key={c.nombre}
                    onClick={() => setConceptoIdx(i)}
                    className={`px-4 py-2.5 text-xs font-bold rounded transition-all ${
                      conceptoIdx === i
                        ? "bg-[#C5A065] text-black"
                        : "bg-white/10 text-white/60 hover:bg-white/15"
                    }`}
                  >
                    {c.nombre}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Contado toggle */}
          <div>
            <label className="text-[#C5A065] text-[10px] font-bold uppercase tracking-widest block mb-2">
              Precio de contado
            </label>
            <div className="bg-white/10 border border-white/15 rounded px-4 py-3 flex items-center justify-between">
              <span className="font-serif-display text-xl text-[#C5A065]">{formatL(concepto.contado)}</span>
              <span className="text-[10px] text-green-400 font-bold uppercase tracking-wider">Pago único</span>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================ */}
      {/* PLAN CARDS — COMPARADOR VISUAL */}
      {/* ============================================ */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-white/70 text-[11px] font-bold uppercase tracking-widest">Compara planes</span>
          <span className="text-white/50 text-[11px]">Selecciona uno para ver detalles</span>
        </div>
        
        <div className="grid grid-cols-1 gap-2">
          {concepto.planes.map((p, i) => {
            const isSelected = planIdx === i;
            const barWidth = (p.precioFinal / maxPrecio) * 100;
            const contadoWidth = (concepto.contado / maxPrecio) * 100;
            const extraPct = Math.round(((p.precioFinal - concepto.contado) / concepto.contado) * 100);
            
            return (
              <motion.button
                key={p.nombre}
                onClick={() => { setPlanIdx(i); setShowContado(false); }}
                className={`relative text-left rounded-lg overflow-hidden transition-all ${
                  isSelected
                    ? "bg-white/[0.08] border border-[#C5A065]/50 ring-1 ring-[#C5A065]/20"
                    : "bg-white/[0.03] border border-white/5 hover:bg-white/[0.06]"
                }`}
                layout
              >
                <div className="relative z-10 p-4 flex items-center gap-4">
                  {/* Plan name */}
                  <div className="w-28 shrink-0">
                    <span className={`text-sm font-bold ${isSelected ? 'text-[#C5A065]' : 'text-white/70'}`}>
                      {p.nombre}
                    </span>
                  </div>
                  
                  {/* Bar visualization */}
                  <div className="flex-1 relative h-8">
                    {/* Contado reference line */}
                    <div
                      className="absolute top-0 h-full border-r border-dashed border-green-400/40 z-10"
                      style={{ left: `${contadoWidth}%` }}
                    />
                    
                    {/* Total bar */}
                    <motion.div
                      className="absolute top-1 h-6 rounded-sm"
                      style={{
                        background: isSelected
                          ? 'linear-gradient(90deg, rgba(197,160,101,0.3) 0%, rgba(197,160,101,0.6) 100%)'
                          : 'linear-gradient(90deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.15) 100%)',
                      }}
                      initial={{ width: 0 }}
                      animate={{ width: `${barWidth}%` }}
                      transition={{ duration: 0.6, ease: [0.25, 0.8, 0.25, 1] }}
                    />
                    
                    {/* Contado portion */}
                    <motion.div
                      className="absolute top-1 h-6 rounded-sm bg-green-400/10 border-r-2 border-green-400/30"
                      initial={{ width: 0 }}
                      animate={{ width: `${contadoWidth}%` }}
                      transition={{ duration: 0.6, ease: [0.25, 0.8, 0.25, 1] }}
                    />
                  </div>

                  {/* Numbers */}
                  <div className="w-36 shrink-0 text-right">
                    <span className={`font-serif-display text-xl ${isSelected ? 'text-white' : 'text-white/60'}`}>
                      {formatL(p.precioFinal)}
                    </span>
                    <span className={`block text-[10px] ${extraPct > 15 ? 'text-red-400/70' : 'text-yellow-400/70'}`}>
                      +{extraPct}% vs contado
                    </span>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
        
        {/* Legend */}
        <div className="flex gap-6 mt-3 justify-end">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-green-400/20 border border-green-400/40" />
            <span className="text-[10px] text-white/60">Precio contado</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-[#C5A065]/40 border border-[#C5A065]/60" />
            <span className="text-[10px] text-white/60">Precio financiado</span>
          </div>
        </div>
      </div>

      {/* ============================================ */}
      {/* PLAN DETAIL — TIMELINE + METRICS */}
      {/* ============================================ */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${proyectoIdx}-${conceptoIdx}-${planIdx}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="bg-white/[0.04] border border-white/10 rounded-lg p-5 md:p-6 mb-6"
        >
          {/* Plan header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-3">
            <div>
              <h4 className="font-serif-display text-xl text-white">Plan {plan.nombre}</h4>
              <p className="text-white/60 text-xs">{proyecto.nombre} · {concepto.nombre}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-white/60 uppercase tracking-wider">Cuota mensual</span>
              <motion.span
                key={plan.mensualidad}
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="font-serif-display text-3xl text-[#C5A065]"
              >
                {formatL(plan.mensualidad)}
              </motion.span>
            </div>
          </div>

          {/* METRICS ROW */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white/[0.08] rounded p-3 text-center">
              <span className="text-[10px] text-white/60 uppercase tracking-widest block mb-1">Prima</span>
              <span className="font-serif-display text-lg text-white">{formatL(plan.prima)}</span>
            </div>
            <div className="bg-white/[0.08] rounded p-3 text-center">
              <span className="text-[10px] text-white/60 uppercase tracking-widest block mb-1">Plazo</span>
              <span className="font-serif-display text-lg text-white">{plazoToText(plan.plazoMeses)}</span>
            </div>
            <div className="bg-white/[0.08] rounded p-3 text-center">
              <span className="text-[10px] text-white/60 uppercase tracking-widest block mb-1">Precio final</span>
              <span className="font-serif-display text-lg text-white">{formatL(plan.precioFinal)}</span>
            </div>
            <div className="bg-green-400/5 border border-green-400/20 rounded p-3 text-center">
              <span className="text-[10px] text-green-400/70 uppercase tracking-widest block mb-1">Ahorro contado</span>
              <span className="font-serif-display text-lg text-green-400">{formatL(costExtra)}</span>
            </div>
          </div>

          {/* ============================================ */}
          {/* TIMELINE VISUAL */}
          {/* ============================================ */}
          <div className="mb-6">
            <span className="text-[10px] text-white/60 uppercase tracking-widest block mb-4">Tu camino al terreno</span>
            <div className="relative">
              {/* Main line */}
              <div className="h-[2px] bg-white/10 rounded-full w-full" />
              
              {/* Animated progress */}
              <motion.div
                className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-[#C5A065] to-[#E8D5A8] rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, ease: [0.25, 0.8, 0.25, 1] }}
              />

              {/* Milestones */}
              <div className="flex justify-between items-start mt-[-6px] relative">
                {/* Start: Prima */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex flex-col items-center"
                >
                  <div className="w-3 h-3 rounded-full bg-[#C5A065] border-2 border-[#1a1a1a] shadow-lg shadow-[#C5A065]/30" />
                  <span className="text-[10px] text-[#C5A065] font-bold mt-2">HOY</span>
                  <span className="text-[11px] text-white/60">Prima {formatLShort(plan.prima)}</span>
                </motion.div>

                {/* Mid: halfway */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-col items-center"
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-white/30 border-2 border-[#1a1a1a]" />
                  <span className="text-[10px] text-white/60 mt-2">{plazoToText(Math.round(plan.plazoMeses / 2))}</span>
                  <span className="text-[11px] text-white/50">{Math.round(plan.plazoMeses / 2)} pagos hechos</span>
                </motion.div>

                {/* End: Terreno */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.0 }}
                  className="flex flex-col items-center"
                >
                  <div className="w-4 h-4 rounded-full bg-[#C5A065] border-2 border-[#1a1a1a] shadow-lg shadow-[#C5A065]/40 flex items-center justify-center">
                    <span className="text-[6px]">🏡</span>
                  </div>
                  <span className="text-[10px] text-[#C5A065] font-bold mt-2">TU TERRENO</span>
                  <span className="text-[11px] text-white/60">{plazoToText(plan.plazoMeses)}</span>
                </motion.div>
              </div>

              {/* Payment dots */}
              <div className="flex items-center gap-[1px] mt-3 overflow-hidden h-3">
                {Array.from({ length: Math.min(plan.plazoMeses, 120) }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 0.4, scale: 1 }}
                    transition={{ delay: 0.3 + (i * 0.005), duration: 0.2 }}
                    className="w-[2px] h-2 rounded-full bg-[#C5A065]/60 shrink-0"
                  />
                ))}
                {plan.plazoMeses > 120 && (
                  <span className="text-[8px] text-white/50 ml-1 shrink-0">+{plan.plazoMeses - 120} más</span>
                )}
              </div>
              <p className="text-[11px] text-white/50 mt-1">
                Cada barra = 1 pago mensual · {plan.plazoMeses} pagos totales
              </p>
            </div>
          </div>

          {/* ============================================ */}
          {/* EQUIVALENCIA DIARIA */}
          {/* ============================================ */}
          <div className="bg-gradient-to-r from-[#C5A065]/10 to-transparent border border-[#C5A065]/15 rounded-lg p-4 mb-5">
            <div className="flex items-start gap-4">
              <span className="text-2xl">{equiv.icon}</span>
              <div>
                <p className="text-white text-base">
                  Tu cuota de <strong className="text-[#C5A065]">{formatL(plan.mensualidad)}/mes</strong> equivale a{" "}
                  <strong className="text-[#C5A065]">{formatL(diario)} diarios</strong>
                </p>
                <p className="text-white/70 text-xs mt-1">
                  Eso es {equiv.texto}. Estás construyendo patrimonio, no pagando alquiler.
                </p>
              </div>
            </div>
          </div>

          {/* ============================================ */}
          {/* CTA — WhatsApp */}
          {/* ============================================ */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={`https://wa.me/50489494639?text=${encodeURIComponent(
                `Hola, me interesa el Plan ${plan.nombre} en ${proyecto.nombre} (${concepto.nombre}).\n\nPrima: ${formatL(plan.prima)}\nMensualidad: ${formatL(plan.mensualidad)}\nPlazo: ${plazoToText(plan.plazoMeses)}\n\n¿Pueden darme más información?`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-6 py-4.5 bg-[#C5A065] text-black text-sm font-bold uppercase tracking-[0.2em] hover:bg-[#D4B474] transition-all rounded"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Solicitar este plan
            </a>
            <a
              href={`https://wa.me/50489494639?text=${encodeURIComponent(
                `Hola, me interesa comprar de contado en ${proyecto.nombre} (${concepto.nombre}) por ${formatL(concepto.contado)}. ¿Cuál es el proceso?`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-4.5 border border-green-400/30 text-green-400 text-sm font-bold uppercase tracking-[0.2em] hover:bg-green-400/10 transition-all rounded"
            >
              Comprar de contado · {formatL(concepto.contado)}
            </a>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Disclaimer */}
      <p className="text-center text-[10px] text-white/25 mt-4 max-w-lg mx-auto leading-relaxed">
        *Precios y condiciones pueden variar según disponibilidad. Financiamiento directo sin intereses.
        Calificación inmediata. Información actualizada al 6 de marzo 2026.
      </p>
    </div>
  );
}