"use client";

import { useState, useEffect } from "react";

// Configuración fácil de editar
const PROYECTOS = [
  { id: "danli", nombre: "Ciudad Venecia Danlí", precioMin: 200000, precioMax: 600000, step: 10000 },
  { id: "valle", nombre: "Ciudad Venecia Valle", precioMin: 100000, precioMax: 400000, step: 10000 },
  { id: "olancho", nombre: "Ciudad Venecia Olancho", precioMin: 200000, precioMax: 500000, step: 10000 },
  { id: "raices", nombre: "Ciudad Venecia Raíces — Talanga", precioMin: 100000, precioMax: 350000, step: 5000 },
  { id: "versalles", nombre: "Residencial Versalles", precioMin: 250000, precioMax: 600000, step: 10000 },
  { id: "palmanova", nombre: "Residencial Palmanova", precioMin: 150000, precioMax: 400000, step: 10000 },
];

const PLAZOS = [12, 24, 36, 48, 60, 72]; // meses
const ENGANCHE_MIN = 10; // porcentaje mínimo
const ENGANCHE_MAX = 50;
const DESCUENTO_CONTADO = 0.15; // 15%
const TASA_INTERES = 0; // 0% — cambiar cuando se confirme

const formatter = new Intl.NumberFormat("es-HN", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

function formatLempira(n: number) {
  return `L. ${formatter.format(n)}`;
}

export default function FinancingCalculator() {
  const proyectoActual = PROYECTOS.find((p) => p.id === "danli")!;

  const [selectedProyecto, setSelectedProyecto] = useState<string>("danli");
  const [lotePrice, setLotePrice] = useState<number>(proyectoActual.precioMin);
  const [enganchePercent, setEnganchePercent] = useState<number>(10);
  const [plazoMeses, setPlazoMeses] = useState<number>(60);

  const proyecto = PROYECTOS.find((p) => p.id === selectedProyecto) ?? proyectoActual;

  // Cuando cambia el proyecto, actualizar lotePrice al precioMin
  useEffect(() => {
    setLotePrice(proyecto.precioMin);
  }, [selectedProyecto, proyecto.precioMin]);

  // Cálculos en tiempo real
  const engancheAmount = lotePrice * (enganchePercent / 100);
  const saldoFinanciar = lotePrice - engancheAmount;
  const cuotaMensual =
    TASA_INTERES === 0
      ? saldoFinanciar / plazoMeses
      : (saldoFinanciar * (TASA_INTERES / 12) * Math.pow(1 + TASA_INTERES / 12, plazoMeses)) /
        (Math.pow(1 + TASA_INTERES / 12, plazoMeses) - 1);
  const descuentoContado = lotePrice * DESCUENTO_CONTADO;
  const precioContado = lotePrice - descuentoContado;
  const totalAPagar = engancheAmount + saldoFinanciar;

  const handleWhatsApp = () => {
    const msg = encodeURIComponent(
      `Hola, me interesa un lote en ${proyecto.nombre} de ${formatLempira(lotePrice)}. Enganche de ${enganchePercent}% y ${plazoMeses} meses. ¿Pueden darme más información?`
    );
    window.open(`https://wa.me/50495498925?text=${msg}`, "_blank");
  };

  return (
    <div className="financing-calculator bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-8 md:p-10 max-w-3xl mx-auto">
      <h3 className="font-serif-display text-2xl text-white mb-1">Calcula tu inversión</h3>
      <p className="text-white/50 text-xs mb-6">Ajusta los valores y descubre tu cuota mensual</p>

      {/* 1. Dropdown de proyecto */}
      <div className="mb-6">
        <label className="block text-[#C5A065] text-[10px] uppercase tracking-widest font-bold mb-2">
          PROYECTO
        </label>
        <select
          value={selectedProyecto}
          onChange={(e) => setSelectedProyecto(e.target.value)}
          className="w-full bg-white/10 border border-white/20 text-white rounded px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C5A065]"
        >
          {PROYECTOS.map((p) => (
            <option key={p.id} value={p.id} className="bg-[#2C2C2C] text-white">
              {p.nombre}
            </option>
          ))}
        </select>
      </div>

      {/* 2. Slider de precio del lote */}
      <div className="mb-6">
        <p className="text-2xl font-serif-display text-white mb-2">{formatLempira(lotePrice)}</p>
        <input
          type="range"
          min={proyecto.precioMin}
          max={proyecto.precioMax}
          step={proyecto.step}
          value={lotePrice}
          onChange={(e) => setLotePrice(Number(e.target.value))}
          className="w-full h-1"
        />
      </div>

      {/* 3. Slider de enganche */}
      <div className="mb-6">
        <p className="text-2xl font-serif-display text-white mb-2">
          {enganchePercent}% = {formatLempira(engancheAmount)}
        </p>
        <input
          type="range"
          min={ENGANCHE_MIN}
          max={ENGANCHE_MAX}
          step={5}
          value={enganchePercent}
          onChange={(e) => setEnganchePercent(Number(e.target.value))}
          className="w-full h-1"
        />
      </div>

      {/* 4. Selector de plazo */}
      <div className="mb-0">
        <label className="block text-[#C5A065] text-[10px] uppercase tracking-widest font-bold mb-3">
          PLAZO
        </label>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {PLAZOS.map((meses) => (
            <button
              key={meses}
              type="button"
              onClick={() => setPlazoMeses(meses)}
              className={`text-xs font-bold px-4 py-2 rounded transition-all ${
                plazoMeses === meses
                  ? "bg-[#C5A065] text-black"
                  : "bg-white/10 text-white/70 hover:bg-white/15"
              }`}
            >
              {meses}
            </button>
          ))}
        </div>
      </div>

      {/* Resultados */}
      <div className="border-t border-white/20 pt-6 mt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div>
            <p className="text-[#C5A065] text-[10px] uppercase tracking-widest font-bold mb-2">
              CUOTA MENSUAL
            </p>
            <p className="text-3xl font-serif-display text-white font-bold">
              {formatLempira(Math.round(cuotaMensual))}
            </p>
          </div>
          <div>
            <p className="text-[#C5A065] text-[10px] uppercase tracking-widest font-bold mb-2">
              TOTAL A PAGAR
            </p>
            <p className="text-xl text-white/80">{formatLempira(Math.round(totalAPagar))}</p>
          </div>
          <div>
            <p className="text-[#C5A065] text-[10px] uppercase tracking-widest font-bold mb-2">
              AHORRO POR CONTADO
            </p>
            <p className="text-xl text-[#C5A065] font-medium">
              {formatLempira(Math.round(descuentoContado))}{" "}
              <span className="text-sm font-bold bg-[#C5A065]/20 text-[#C5A065] px-2 py-0.5 rounded">
                15% OFF
              </span>
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleWhatsApp}
          className="w-full md:w-auto px-8 py-4 bg-[#C5A065] text-black text-xs font-bold uppercase tracking-widest hover:bg-white transition-all"
        >
          SOLICITAR ESTE PLAN →
        </button>
      </div>
    </div>
  );
}
