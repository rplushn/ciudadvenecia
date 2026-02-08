"use client";

import Link from 'next/link';

export default function Design3Page() {
  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-4 font-sans text-slate-800">
      <div className="max-w-4xl text-center">
        <h1 className="text-5xl md:text-7xl font-light mb-6 tracking-tight">
          CIUDAD VENECIA
        </h1>
        <p className="text-xl md:text-2xl text-slate-500 mb-10 font-light">
          Diseño Alternativo 3 <span className="text-xs align-top bg-slate-200 px-2 py-1 rounded-full ml-2 font-bold tracking-wider">AURA ORIGINAL</span>
        </p>
        
        <div className="bg-white shadow-xl rounded-2xl p-12 border border-slate-100 max-w-2xl mx-auto">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">
            ✨
          </div>
          <p className="text-lg mb-6 leading-relaxed">
            Esta página (<code>/design-3</code>) está lista para recibir el código de Aura Build con el <strong>diseño visual original</strong> (sin forzar colores azules).
          </p>
          <p className="text-slate-400 text-sm">
            Pega aquí el código HTML/React que te genere Aura para verlo en acción.
          </p>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/" 
            className="px-8 py-3 bg-white border border-slate-300 rounded-full hover:bg-slate-50 transition-colors text-sm font-bold tracking-wide"
          >
            ← Volver al Home
          </Link>
          <Link 
            href="/design-2" 
            className="px-8 py-3 bg-transparent text-slate-400 hover:text-slate-600 transition-colors text-sm font-bold tracking-wide"
          >
            Ver Diseño 2
          </Link>
        </div>
      </div>
    </main>
  );
}
