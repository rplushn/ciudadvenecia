"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";

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
  return `${anos}a ${rem}m`;
};

const costoDiario = (mensualidad: number) => Math.round(mensualidad / 30);

const getEquivalencia = (diario: number) => {
  if (diario <= 30) return { texto: "menos que un café diario", icon: "☕" };
  if (diario <= 50) return { texto: "como una baleada diaria", icon: "🫓" };
  if (diario <= 70) return { texto: "menos que un combo de almuerzo", icon: "🍽️" };
  if (diario <= 100) return { texto: "como 2 recargas de celular al mes", icon: "📱" };
  if (diario <= 135) return { texto: "menos que un alquiler", icon: "🏠" };
  return { texto: "una inversión inteligente en tu futuro", icon: "📈" };
};

const getRecommendedIdx = (planes: Plan[], contado: number) => {
  let best = 0;
  let bestScore = Infinity;
  planes.forEach((p, i) => {
    const extra = ((p.precioFinal - contado) / contado) * 100;
    const score = extra + (p.plazoMeses / 24);
    if (score < bestScore && p.plazoMeses <= 144) { bestScore = score; best = i; }
  });
  return best;
};

// ============================================
// ANIMATED TIMELINE
// ============================================
function AnimatedTimeline({ plan, concepto }: { plan: Plan; concepto: Concepto }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="mb-6">
      <span className="text-[10px] text-white/50 uppercase tracking-widest block mb-4">Tu camino al terreno</span>
      <div className="relative">
        <div className="h-[2px] bg-white/10 rounded-full w-full" />
        <motion.div
          className="absolute top-0 left-0 h-[2px] rounded-full"
          style={{ background: "linear-gradient(90deg, #C5A065, #E8D5A8, #C5A065)" }}
          initial={{ width: "0%" }}
          animate={isInView ? { width: "100%" } : { width: "0%" }}
          transition={{ duration: 2, ease: [0.25, 0.8, 0.25, 1] }}
        />
        <div className="flex justify-between items-start mt-[-6px] relative">
          <motion.div initial={{ scale: 0, opacity: 0 }} animate={isInView ? { scale: 1, opacity: 1 } : {}} transition={{ delay: 0.3, type: "spring", stiffness: 200 }} className="flex flex-col items-center">
            <div className="w-3.5 h-3.5 rounded-full bg-[#C5A065] border-2 border-[#1a1a1a] shadow-lg shadow-[#C5A065]/40" />
            <span className="text-[10px] text-[#C5A065] font-bold mt-2">HOY</span>
            <span className="text-[10px] text-white/50">Prima {formatLShort(plan.prima)}</span>
          </motion.div>
          <motion.div initial={{ scale: 0, opacity: 0 }} animate={isInView ? { scale: 1, opacity: 1 } : {}} transition={{ delay: 0.8, type: "spring", stiffness: 200 }} className="flex flex-col items-center">
            <div className="w-2.5 h-2.5 rounded-full bg-white/30 border-2 border-[#1a1a1a]" />
            <span className="text-[10px] text-white/50 mt-2">{plazoToText(Math.round(plan.plazoMeses / 2))}</span>
            <span className="text-[10px] text-white/40">{Math.round(plan.plazoMeses / 2)} pagos</span>
          </motion.div>
          <motion.div initial={{ scale: 0, opacity: 0 }} animate={isInView ? { scale: 1, opacity: 1 } : {}} transition={{ delay: 1.3, type: "spring", stiffness: 200 }} className="flex flex-col items-center">
            <div className="w-5 h-5 rounded-full bg-[#C5A065] border-2 border-[#1a1a1a] shadow-lg shadow-[#C5A065]/50 flex items-center justify-center">
              <span className="text-[7px]">🏡</span>
            </div>
            <span className="text-[10px] text-[#C5A065] font-bold mt-2">TU TERRENO</span>
            <span className="text-[10px] text-white/50">{plazoToText(plan.plazoMeses)}</span>
          </motion.div>
        </div>
        <div className="flex items-center gap-[1px] mt-3 overflow-hidden h-3">
          {Array.from({ length: Math.min(plan.plazoMeses, 120) }).map((_, i) => (
            <motion.div key={i} initial={{ opacity: 0, scaleY: 0 }} animate={isInView ? { opacity: 0.5, scaleY: 1 } : {}} transition={{ delay: 0.5 + i * 0.008, duration: 0.15 }} className="w-[2px] h-2 rounded-full bg-[#C5A065]/60 shrink-0 origin-bottom" />
          ))}
          {plan.plazoMeses > 120 && <span className="text-[8px] text-white/40 ml-1 shrink-0">+{plan.plazoMeses - 120}</span>}
        </div>
        <p className="text-[10px] text-white/40 mt-1">Cada barra = 1 pago mensual · {plan.plazoMeses} pagos totales</p>
      </div>
    </div>
  );
}

// ============================================
// COMPONENTE PRINCIPAL
// ============================================
export default function FinancingCalculator() {
  const [proyectoIdx, setProyectoIdx] = useState(0);
  const [conceptoIdx, setConceptoIdx] = useState(0);
  const [planIdx, setPlanIdx] = useState(0);

  const proyecto = PROYECTOS[proyectoIdx];
  const concepto = proyecto.conceptos[Math.min(conceptoIdx, proyecto.conceptos.length - 1)];
  const plan = concepto.planes[Math.min(planIdx, concepto.planes.length - 1)];
  const recommended = getRecommendedIdx(concepto.planes, concepto.contado);

  useEffect(() => { setConceptoIdx(0); setPlanIdx(0); }, [proyectoIdx]);
  useEffect(() => { setPlanIdx(recommended); }, [conceptoIdx]);

  const costExtra = plan.precioFinal - concepto.contado;
  const diario = costoDiario(plan.mensualidad);
  const equiv = getEquivalencia(diario);

  const [ctaPulse, setCtaPulse] = useState(false);
  useEffect(() => {
    setCtaPulse(false);
    const timer = setTimeout(() => setCtaPulse(true), 4000);
    return () => clearTimeout(timer);
  }, [planIdx]);

  return (
    <div className="relative max-w-4xl mx-auto">

      {/* HEADER */}
      <div className="text-center mb-8">
        <span className="text-[#C5A065] text-[10px] font-bold uppercase tracking-[0.35em] block mb-3">Financiamiento sin intereses</span>
        <h3 className="font-serif-display text-2xl md:text-3xl text-white mb-2">Tu camino al terreno</h3>
        <p className="text-white/50 text-xs max-w-sm mx-auto">Selecciona tu proyecto y plan. Sin complicaciones.</p>
      </div>

      {/* STEP 1 — PROJECT */}
      <div className="mb-5">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-full bg-[#C5A065] flex items-center justify-center text-[10px] text-black font-bold">1</div>
          <span className="text-white/70 text-[11px] font-bold uppercase tracking-widest">Elige tu proyecto</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {PROYECTOS.map((p, i) => (
            <button key={p.id} onClick={() => setProyectoIdx(i)} className={`p-3 rounded-lg text-center transition-all ${proyectoIdx === i ? "bg-[#C5A065]/20 border border-[#C5A065]/50 ring-1 ring-[#C5A065]/20" : "bg-white/[0.04] border border-white/10 hover:bg-white/[0.08]"}`}>
              <span className={`text-xs font-bold block ${proyectoIdx === i ? "text-[#C5A065]" : "text-white/70"}`}>{p.nombre.replace("Ciudad Venecia ", "CV ")}</span>
              <span className="text-[9px] text-white/40 block mt-0.5">{p.ubicacion}</span>
            </button>
          ))}
        </div>
      </div>

      {/* STEP 2 — CONCEPT */}
      {proyecto.conceptos.length > 1 && (
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-full bg-[#C5A065] flex items-center justify-center text-[10px] text-black font-bold">2</div>
            <span className="text-white/70 text-[11px] font-bold uppercase tracking-widest">Elige tu concepto</span>
          </div>
          <p className="text-white/40 text-[10px] mb-3 ml-8">Cada concepto tiene diferente tamaño de lote y rango de precios.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 ml-8">
            {proyecto.conceptos.map((c, i) => (
              <button key={c.nombre} onClick={() => setConceptoIdx(i)} className={`p-4 rounded-lg text-left transition-all ${conceptoIdx === i ? "bg-[#C5A065]/20 border border-[#C5A065]/50" : "bg-white/[0.04] border border-white/10 hover:bg-white/[0.08]"}`}>
                <span className={`text-sm font-bold block ${conceptoIdx === i ? "text-[#C5A065]" : "text-white/70"}`}>{c.nombre}</span>
                <span className="text-[10px] text-white/40 block mt-1">Contado: <strong className="text-white/60">{formatLShort(c.contado)}</strong></span>
                <span className="text-[10px] text-white/40 block">Desde: <strong className="text-white/60">{formatL(c.planes[0].mensualidad)}/mes</strong></span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STEP 3 — PLAN COMPARISON TABLE */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-full bg-[#C5A065] flex items-center justify-center text-[10px] text-black font-bold">{proyecto.conceptos.length > 1 ? "3" : "2"}</div>
          <span className="text-white/70 text-[11px] font-bold uppercase tracking-widest">Compara planes</span>
        </div>

        {/* Desktop table */}
        <div className="hidden md:block overflow-hidden rounded-lg border border-white/10 ml-8">
          <table className="w-full">
            <thead>
              <tr className="bg-white/[0.04]">
                <th className="text-left text-[10px] text-white/50 uppercase tracking-wider p-3 font-bold">Plan</th>
                {concepto.planes.map((p, i) => (
                  <th key={p.nombre} onClick={() => setPlanIdx(i)} className={`text-center p-3 cursor-pointer transition-all relative ${planIdx === i ? "bg-[#C5A065]/15" : "hover:bg-white/[0.04]"}`}>
                    {i === recommended && <span className="absolute -top-0 left-1/2 -translate-x-1/2 bg-[#C5A065] text-black text-[7px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-b">Recomendado</span>}
                    <span className={`text-xs font-bold block ${planIdx === i ? "text-[#C5A065]" : "text-white/70"}`}>{p.nombre}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-white/[0.06]">
                <td className="text-[10px] text-white/50 uppercase tracking-wider p-3">Prima</td>
                {concepto.planes.map((p, i) => (
                  <td key={i} onClick={() => setPlanIdx(i)} className={`text-center p-3 cursor-pointer transition-all ${planIdx === i ? "bg-[#C5A065]/10" : ""}`}>
                    <span className={`font-serif-display text-base ${planIdx === i ? "text-white" : "text-white/60"}`}>{formatL(p.prima)}</span>
                  </td>
                ))}
              </tr>
              <tr className="border-t border-white/[0.06]">
                <td className="text-[10px] text-white/50 uppercase tracking-wider p-3">Cuota/mes</td>
                {concepto.planes.map((p, i) => (
                  <td key={i} onClick={() => setPlanIdx(i)} className={`text-center p-3 cursor-pointer transition-all ${planIdx === i ? "bg-[#C5A065]/10" : ""}`}>
                    <span className={`font-serif-display text-base font-bold ${planIdx === i ? "text-[#C5A065]" : "text-white/60"}`}>{formatL(p.mensualidad)}</span>
                  </td>
                ))}
              </tr>
              <tr className="border-t border-white/[0.06]">
                <td className="text-[10px] text-white/50 uppercase tracking-wider p-3">Plazo</td>
                {concepto.planes.map((p, i) => (
                  <td key={i} onClick={() => setPlanIdx(i)} className={`text-center p-3 cursor-pointer transition-all ${planIdx === i ? "bg-[#C5A065]/10" : ""}`}>
                    <span className={`text-sm ${planIdx === i ? "text-white" : "text-white/60"}`}>{plazoToText(p.plazoMeses)}</span>
                  </td>
                ))}
              </tr>
              <tr className="border-t border-white/[0.06]">
                <td className="text-[10px] text-white/50 uppercase tracking-wider p-3">Total</td>
                {concepto.planes.map((p, i) => (
                  <td key={i} onClick={() => setPlanIdx(i)} className={`text-center p-3 cursor-pointer transition-all ${planIdx === i ? "bg-[#C5A065]/10" : ""}`}>
                    <span className={`text-sm ${planIdx === i ? "text-white" : "text-white/50"}`}>{formatL(p.precioFinal)}</span>
                    <span className={`block text-[9px] mt-0.5 ${((p.precioFinal - concepto.contado) / concepto.contado) * 100 > 15 ? "text-red-400/60" : "text-yellow-400/60"}`}>+{Math.round(((p.precioFinal - concepto.contado) / concepto.contado) * 100)}% vs contado</span>
                  </td>
                ))}
              </tr>
              <tr className="border-t border-white/[0.06]">
                <td className="p-3"></td>
                {concepto.planes.map((p, i) => (
                  <td key={i} className="text-center p-3">
                    <button onClick={() => setPlanIdx(i)} className={`px-4 py-2 rounded text-[10px] font-bold uppercase tracking-wider transition-all ${planIdx === i ? "bg-[#C5A065] text-black" : "bg-white/10 text-white/50 hover:bg-white/20"}`}>
                      {planIdx === i ? "✓ Seleccionado" : "Seleccionar"}
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden space-y-2 ml-8">
          {concepto.planes.map((p, i) => {
            const isSelected = planIdx === i;
            const isRec = i === recommended;
            return (
              <button key={p.nombre} onClick={() => setPlanIdx(i)} className={`w-full text-left p-4 rounded-lg transition-all relative ${isSelected ? "bg-[#C5A065]/15 border border-[#C5A065]/50" : "bg-white/[0.04] border border-white/10"}`}>
                {isRec && <span className="absolute -top-2 right-3 bg-[#C5A065] text-black text-[7px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">Recomendado</span>}
                <div className="flex justify-between items-center">
                  <div>
                    <span className={`text-sm font-bold ${isSelected ? "text-[#C5A065]" : "text-white/70"}`}>{p.nombre}</span>
                    <span className="text-[10px] text-white/40 block mt-0.5">Prima {formatLShort(p.prima)} · {plazoToText(p.plazoMeses)}</span>
                  </div>
                  <div className="text-right">
                    <span className={`font-serif-display text-lg ${isSelected ? "text-[#C5A065]" : "text-white/60"}`}>{formatL(p.mensualidad)}</span>
                    <span className="text-[9px] text-white/40 block">/mes</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* PLAN DETAIL */}
      <AnimatePresence mode="wait">
        <motion.div key={`${proyectoIdx}-${conceptoIdx}-${planIdx}`} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }} className="bg-white/[0.04] border border-white/10 rounded-lg p-5 md:p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-3">
            <div>
              <h4 className="font-serif-display text-xl text-white">Plan {plan.nombre}</h4>
              <p className="text-white/50 text-xs">{proyecto.nombre} · {concepto.nombre}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-white/50 uppercase tracking-wider">Cuota mensual</span>
              <motion.span key={plan.mensualidad} initial={{ scale: 1.3, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="font-serif-display text-3xl text-[#C5A065]">{formatL(plan.mensualidad)}</motion.span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <div className="bg-white/[0.06] rounded-lg p-3 text-center">
              <span className="text-[9px] text-white/50 uppercase tracking-widest block mb-1">Prima</span>
              <span className="font-serif-display text-lg text-white">{formatL(plan.prima)}</span>
            </div>
            <div className="bg-white/[0.06] rounded-lg p-3 text-center">
              <span className="text-[9px] text-white/50 uppercase tracking-widest block mb-1">Plazo</span>
              <span className="font-serif-display text-lg text-white">{plazoToText(plan.plazoMeses)}</span>
            </div>
            <div className="bg-white/[0.06] rounded-lg p-3 text-center">
              <span className="text-[9px] text-white/50 uppercase tracking-widest block mb-1">Precio final</span>
              <span className="font-serif-display text-lg text-white">{formatL(plan.precioFinal)}</span>
            </div>
            <div className="bg-green-400/5 border border-green-400/20 rounded-lg p-3 text-center">
              <span className="text-[9px] text-green-400/70 uppercase tracking-widest block mb-1">Ahorro contado</span>
              <span className="font-serif-display text-lg text-green-400">{formatL(costExtra)}</span>
            </div>
          </div>

          <AnimatedTimeline plan={plan} concepto={concepto} />

          <div className="bg-gradient-to-r from-[#C5A065]/10 to-transparent border border-[#C5A065]/15 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-4">
              <span className="text-2xl">{equiv.icon}</span>
              <div>
                <p className="text-white text-sm">Tu cuota de <strong className="text-[#C5A065]">{formatL(plan.mensualidad)}/mes</strong> equivale a <strong className="text-[#C5A065]">{formatL(diario)} diarios</strong></p>
                <p className="text-white/60 text-xs mt-1">Eso es {equiv.texto}. Estás construyendo patrimonio, no pagando alquiler.</p>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="relative">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-400/80 text-[10px] font-bold uppercase tracking-wider">12 lotes disponibles · Etapa 3</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href={`https://wa.me/50489494639?text=${encodeURIComponent(`Hola, me interesa el Plan ${plan.nombre} en ${proyecto.nombre} (${concepto.nombre}).\n\nPrima: ${formatL(plan.prima)}\nMensualidad: ${formatL(plan.mensualidad)}\nPlazo: ${plazoToText(plan.plazoMeses)}\n\n¿Pueden darme más información?`)}`} target="_blank" rel="noopener noreferrer" className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-[#C5A065] text-black text-sm font-bold uppercase tracking-[0.2em] hover:bg-[#D4B474] transition-all rounded-lg ${ctaPulse ? "shadow-lg shadow-[#C5A065]/30" : ""}`}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Solicitar este plan
              </a>
              <div className="text-center sm:text-left flex items-center justify-center px-4">
                <div>
                  <span className="text-white/40 text-[10px] block">¿Prefieres contado?</span>
                  <a href={`https://wa.me/50489494639?text=${encodeURIComponent(`Hola, me interesa comprar de contado en ${proyecto.nombre} (${concepto.nombre}) por ${formatL(concepto.contado)}. ¿Cuál es el proceso?`)}`} target="_blank" rel="noopener noreferrer" className="text-green-400 text-sm font-bold hover:underline">{formatL(concepto.contado)} — Ahorra {formatL(costExtra)}</a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* TRUST BADGES */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        {[
          { stat: "60 meses", label: "Sin intereses", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#C5A065] mx-auto"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg> },
          { stat: "15%", label: "Descuento contado", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#C5A065] mx-auto"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg> },
          { stat: "99-250m²", label: "Tamaños de lote", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#C5A065] mx-auto"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg> },
          { stat: "10%", label: "Enganche mínimo", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#C5A065] mx-auto"><path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l5-5-5-5M13 12H3"/></svg> },
          { stat: "Inmediata", label: "Calificación", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#C5A065] mx-auto"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg> },
          { stat: "Directo", label: "Sin banco", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#C5A065] mx-auto"><path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3"/></svg> },
        ].map((item, i) => (
          <motion.div key={item.label} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.4 }} className="bg-white/[0.03] border border-white/[0.06] rounded-lg p-3 text-center">
            <div className="block mb-2">{item.icon}</div>
            <span className="font-serif-display text-base text-white block">{item.stat}</span>
            <span className="text-[9px] text-white/40 uppercase tracking-wider">{item.label}</span>
          </motion.div>
        ))}
      </div>

      <p className="text-center text-[10px] text-white/20 max-w-lg mx-auto leading-relaxed">*Precios y condiciones pueden variar según disponibilidad. Financiamiento directo sin intereses. Calificación inmediata. Información actualizada al 6 de marzo 2026.</p>
    </div>
  );
}