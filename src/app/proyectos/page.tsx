import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Proyectos() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* 1. CINEMATIC HERO */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-primary">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent" />
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto border-y border-white/20 py-12">
          <span className="text-accent uppercase tracking-[0.3em] text-sm font-bold mb-4 block">
            Portafolio Inmobiliario
          </span>
          <h1 className="font-display text-6xl md:text-8xl font-bold text-white uppercase tracking-tighter mb-6">
            Nuestro Legado
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Una colección de desarrollos planificados estratégicamente para generar plusvalía, 
            seguridad y bienestar en la zona oriental y central de Honduras.
          </p>
        </div>
      </section>

      {/* 2. THE BIG TWO - #1 CIUDAD VENECIA DANLÍ */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Imagen (Grande) */}
          <div className="lg:w-3/5 w-full relative group">
            <div className="aspect-[4/3] bg-gray-200 overflow-hidden relative">
               <div 
                 className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                 style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600596542815-e32c21216f53?q=80&w=2074')" }}
               />
               <div className="absolute top-6 left-6 bg-primary text-white px-4 py-2 text-xs font-bold uppercase tracking-wider">
                 Proyecto Insignia
               </div>
            </div>
            {/* Decorative architectural lines */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 border-b-4 border-r-4 border-accent hidden md:block" />
          </div>

          {/* Info */}
          <div className="lg:w-2/5 w-full">
            <span className="text-accent font-bold uppercase tracking-widest text-sm mb-2 block">
              Danlí, El Paraíso
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-6">
              Ciudad Venecia <br/> Danlí
            </h2>
            <p className="text-text-secondary text-lg mb-8 leading-relaxed">
              El proyecto que lo inició todo. Más de 3 etapas desarrolladas con éxito rotundo. 
              Un entorno fresco y familiar, ubicado estratégicamente cerca de la UNAH-TEC.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mb-8 border-t border-gray-100 pt-6">
              <div>
                <p className="font-bold text-primary text-2xl">100%</p>
                <p className="text-xs text-text-secondary uppercase">Plusvalía</p>
              </div>
              <div>
                <p className="font-bold text-primary text-2xl">3</p>
                <p className="text-xs text-text-secondary uppercase">Etapas</p>
              </div>
            </div>

            <button className="w-full bg-primary text-white py-4 uppercase font-bold hover:bg-accent transition-colors">
              Ver Detalles
            </button>
          </div>
        </div>
      </section>

      {/* 3. THE BIG TWO - #2 HILL'S CITY (Dark/Corporate Theme) */}
      <section className="bg-primary text-white py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row-reverse gap-12 items-center">
            {/* Imagen */}
            <div className="lg:w-3/5 w-full relative group">
              <div className="aspect-[16/9] bg-gray-800 overflow-hidden relative border border-white/10">
                 <div 
                   className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105 mix-blend-overlay opacity-60"
                   style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=2070')" }}
                 />
                 <div 
                   className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105 opacity-40"
                   style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=2070')" }}
                 />
                 <div className="absolute top-6 right-6 bg-white text-primary px-4 py-2 text-xs font-bold uppercase tracking-wider">
                   Distrito Comercial
                 </div>
              </div>
            </div>

            {/* Info */}
            <div className="lg:w-2/5 w-full text-right lg:text-right">
              <span className="text-accent font-bold uppercase tracking-widest text-sm mb-2 block">
                Centro de Danlí
              </span>
              <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-6">
                Hill's City
              </h2>
              <p className="text-white/70 text-lg mb-8 leading-relaxed ml-auto max-w-md">
                La solución definitiva de estacionamiento y locales comerciales. 
                7 manzanas de desarrollo mixto en el corazón de la ciudad. 
                Donde los negocios crecen.
              </p>
              
              <div className="flex justify-end gap-8 mb-8 border-t border-white/20 pt-6">
                <div className="text-right">
                  <p className="font-bold text-white text-2xl">Comercial</p>
                  <p className="text-xs text-accent uppercase">Uso Mixto</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-white text-2xl">7</p>
                  <p className="text-xs text-accent uppercase">Manzanas</p>
                </div>
              </div>

              <button className="bg-transparent border border-white text-white px-10 py-4 uppercase font-bold hover:bg-white hover:text-primary transition-colors">
                Oportunidades de Inversión
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. #3 RESIDENCIAL VERSALLES */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-accent uppercase tracking-widest text-sm font-bold mb-2 block">Alta Gama</span>
          <h2 className="font-display text-3xl font-bold text-primary">Exclusividad Garantizada</h2>
        </div>
        
        <div className="relative bg-surface p-8 md:p-12 border border-gray-200 shadow-sm">
           <div className="grid md:grid-cols-2 gap-12 items-center">
             <div className="order-2 md:order-1">
                <span className="text-accent text-xs font-bold uppercase mb-2 block">Carretera Panamericana</span>
                <h3 className="font-display text-4xl font-bold text-primary mb-4">Residencial Versalles</h3>
                <p className="text-text-secondary mb-6 leading-relaxed">
                  Ubicado a solo 5 km del centro. Un concepto exclusivo con lotes amplios (12x20m), 
                  piscina y áreas recreativas privadas. Disponibilidad limitada para quienes buscan privacidad.
                </p>
                <button className="text-primary font-bold border-b-2 border-primary pb-1 hover:text-accent hover:border-accent transition-colors uppercase text-sm">
                  Ver Disponibilidad
                </button>
             </div>
             <div className="order-1 md:order-2 h-80 md:h-full bg-gray-300 relative overflow-hidden">
               <div 
                 className="absolute inset-0 bg-cover bg-center grayscale hover:grayscale-0 transition-all duration-700 transform hover:scale-105"
                 style={{ backgroundImage: "url('https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=2070')" }}
               />
             </div>
           </div>
        </div>
      </section>

      {/* 5. REST OF PORTFOLIO (Grid) */}
      <section className="py-24 bg-gray-50 px-4">
        <div className="max-w-7xl mx-auto">
           <div className="text-center mb-16">
              <h2 className="font-display text-3xl font-bold text-primary mb-4">Más Oportunidades</h2>
              <p className="text-text-secondary max-w-xl mx-auto">Desde la zona sur hasta Olancho, expandimos nuestra huella de calidad.</p>
           </div>

           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { 
                  name: "Ciudad Venecia Valle", 
                  loc: "San Lorenzo", 
                  price: "Primas desde L. 6,000",
                  img: "https://images.unsplash.com/photo-1590247813693-5541d1c609fd?q=80&w=2009"
                },
                { 
                  name: "CV Raíces Talanga", 
                  loc: "Talanga, FM", 
                  price: "Lanzamiento 2026",
                  img: "https://images.unsplash.com/photo-1592595896551-12b371d546d5?q=80&w=2070"
                },
                { 
                  name: "Ciudad Venecia Olancho", 
                  loc: "Lepaguare", 
                  price: "Concepto Premium",
                  img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053"
                },
                { 
                  name: "Residencial Palmanova", 
                  loc: "Danlí", 
                  price: "Carretera Panamericana",
                  img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070"
                }
              ].map((item, i) => (
                <div key={i} className="group bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
                   <div className="h-64 overflow-hidden relative">
                      <div 
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                        style={{ backgroundImage: `url(${item.img})` }} 
                      />
                      <div className="absolute bottom-0 left-0 bg-primary/90 text-white px-4 py-1 text-xs font-bold uppercase">
                        {item.loc}
                      </div>
                   </div>
                   <div className="p-8">
                      <h3 className="font-display text-xl font-bold text-primary mb-2">{item.name}</h3>
                      <p className="text-accent font-medium text-sm mb-6">{item.price}</p>
                      <button className="text-text-secondary text-sm font-bold uppercase tracking-wider hover:text-primary transition-colors">
                        Ver Proyecto +
                      </button>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* 6. FINAL CONTACT FORM */}
      <section className="py-24 bg-white px-4">
        <div className="max-w-4xl mx-auto bg-surface p-8 md:p-16 relative overflow-hidden">
          {/* Decorative element */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full" />
          
          <div className="text-center mb-12 relative z-10">
            <span className="text-accent uppercase tracking-widest text-xs font-bold mb-4 block">Contacto Directo</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mb-6">Inicia tu Legado</h2>
            <p className="text-text-secondary max-w-lg mx-auto">
              Déjanos tus datos y un asesor especializado te contactará para presentarte el plan de financiamiento ideal.
            </p>
          </div>

          <form className="space-y-6 relative z-10 max-w-lg mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-primary uppercase">Nombre</label>
                <input type="text" className="w-full bg-white border border-gray-200 p-3 focus:border-accent focus:outline-none transition-colors" placeholder="Tu nombre completo" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-primary uppercase">Teléfono</label>
                <input type="tel" className="w-full bg-white border border-gray-200 p-3 focus:border-accent focus:outline-none transition-colors" placeholder="+504 0000-0000" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-primary uppercase">Correo Electrónico</label>
              <input type="email" className="w-full bg-white border border-gray-200 p-3 focus:border-accent focus:outline-none transition-colors" placeholder="tucorreo@ejemplo.com" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-primary uppercase">Proyecto de Interés</label>
              <select className="w-full bg-white border border-gray-200 p-3 focus:border-accent focus:outline-none transition-colors">
                <option>Seleccionar proyecto...</option>
                <option>Ciudad Venecia Danlí</option>
                <option>Hill's City</option>
                <option>Ciudad Venecia Olancho</option>
                <option>Residencial Versalles</option>
                <option>Otro</option>
              </select>
            </div>
            <button className="w-full bg-primary text-white py-4 font-bold uppercase tracking-widest hover:bg-accent transition-colors">
              Solicitar Información
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}
