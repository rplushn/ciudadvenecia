import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Contacto() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* 1. HEADER IMPACTANTE */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-primary">
         <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-multiply"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1423666639041-f14d70fa4c4d?q=80&w=2070')" }}
        />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <span className="text-accent uppercase tracking-[0.3em] text-sm font-bold mb-4 block animate-fade-in-up">
            Estamos listos para ti
          </span>
          <h1 className="font-display text-6xl md:text-8xl font-bold text-white uppercase tracking-tighter mb-6">
            HABLEMOS<br/>DE TU PROYECTO
          </h1>
          <p className="text-white/90 text-xl md:text-2xl font-light leading-relaxed">
            Asesoría directa, sin vueltas. Te ayudamos a elegir el mejor camino según tu meta.
          </p>
        </div>
      </section>

      {/* 2. OPCIONES DE CONTACTO */}
      <section className="py-24 px-4 bg-white">
         <div className="max-w-7xl mx-auto mb-16 text-center">
            <span className="text-accent font-bold uppercase tracking-widest text-sm mb-2 block">Contacto Directo</span>
            <h2 className="font-display text-4xl font-bold text-primary">Elige tu canal preferido</h2>
         </div>
         
         <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            {/* WHATSAPP */}
            <div className="bg-green-50 p-10 text-center rounded-lg border border-green-100 hover:shadow-xl transition-shadow cursor-pointer group">
               <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-3xl group-hover:scale-110 transition-transform">
                  💬
               </div>
               <h3 className="font-bold text-xl text-primary mb-2">WhatsApp Ventas</h3>
               <p className="text-text-secondary mb-6 text-sm">Respuesta inmediata para cotizaciones.</p>
               <p className="text-2xl font-bold text-primary">+504 9549-8925</p>
            </div>

            {/* LLAMADA */}
            <div className="bg-blue-50 p-10 text-center rounded-lg border border-blue-100 hover:shadow-xl transition-shadow cursor-pointer group">
               <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-3xl group-hover:scale-110 transition-transform">
                  📞
               </div>
               <h3 className="font-bold text-xl text-primary mb-2">Llamada Telefónica</h3>
               <p className="text-text-secondary mb-6 text-sm">Habla con un asesor experto ahora.</p>
               <p className="text-2xl font-bold text-primary">(504) 9890-4449</p>
            </div>

            {/* OFICINA */}
            <div className="bg-gray-50 p-10 text-center rounded-lg border border-gray-100 hover:shadow-xl transition-shadow group">
               <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 text-white text-3xl group-hover:scale-110 transition-transform">
                  📍
               </div>
               <h3 className="font-bold text-xl text-primary mb-2">Oficina Principal</h3>
               <p className="text-text-secondary mb-6 text-sm">Visítanos en Danlí, El Paraíso.</p>
               <p className="text-sm font-bold text-primary leading-relaxed">Col. El Zarzal, Edificio INMAER,<br/>contiguo a Pizza Hut.</p>
            </div>
         </div>
      </section>

      {/* 3. FORMULARIO FINAL */}
      <section className="bg-surface py-24 px-4">
         <div className="max-w-4xl mx-auto bg-white p-10 md:p-16 shadow-2xl rounded-sm border-t-4 border-accent">
            <h2 className="font-display text-3xl font-bold text-primary mb-8 text-center uppercase tracking-wide">
               Envíanos un mensaje
            </h2>
            <form className="space-y-6">
               <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                     <label className="text-xs font-bold uppercase tracking-widest text-primary">Nombre</label>
                     <input type="text" className="w-full bg-gray-50 border border-gray-200 p-4 focus:outline-none focus:border-accent" placeholder="Tu nombre completo" />
                  </div>
                  <div className="space-y-2">
                     <label className="text-xs font-bold uppercase tracking-widest text-primary">Teléfono</label>
                     <input type="tel" className="w-full bg-gray-50 border border-gray-200 p-4 focus:outline-none focus:border-accent" placeholder="+504..." />
                  </div>
               </div>
               <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-primary">Mensaje</label>
                  <textarea rows={5} className="w-full bg-gray-50 border border-gray-200 p-4 focus:outline-none focus:border-accent resize-none" placeholder="¿En qué podemos ayudarte?" />
               </div>
               <button className="w-full bg-primary text-white py-5 font-bold uppercase tracking-widest hover:bg-accent transition-colors">
                  Enviar Mensaje
               </button>
            </form>
         </div>
      </section>

      <Footer />
    </main>
  );
}
