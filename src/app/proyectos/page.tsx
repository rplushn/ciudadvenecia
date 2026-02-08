import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Proyectos() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* 1. CINEMATIC HERO */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-primary">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-50 mix-blend-multiply"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent" />
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto py-12">
          <span className="text-accent uppercase tracking-[0.3em] text-sm font-bold mb-4 block animate-fade-in-up">
            Portafolio Inmobiliario
          </span>
          <h1 className="font-display text-6xl md:text-8xl font-bold text-white uppercase tracking-tighter mb-6 drop-shadow-2xl">
            Construyendo<br/>Legado
          </h1>
          <p className="text-white/90 text-xl md:text-2xl max-w-3xl mx-auto font-light leading-relaxed">
            Más que terrenos y casas, desarrollamos ecosistemas de vida con plusvalía garantizada.
          </p>
        </div>
      </section>

      {/* -------------------------------------------------------------------------------- */}
      {/* PROYECTO 1: CIUDAD VENECIA DANLÍ (Full Detail) */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
            <div className="relative group">
              <div className="aspect-[4/3] bg-gray-200 overflow-hidden rounded-sm shadow-2xl">
                 <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600596542815-e32c21216f53?q=80&w=2074')" }} />
                 <div className="absolute top-8 left-8 bg-primary text-white px-6 py-2 text-sm font-bold uppercase tracking-wider">
                   Proyecto Insignia
                 </div>
              </div>
            </div>
            <div>
              <span className="text-accent font-bold uppercase tracking-widest text-sm mb-2 block">Danlí, El Paraíso</span>
              <h2 className="font-display text-5xl md:text-6xl font-bold text-primary mb-6">Ciudad Venecia</h2>
              <p className="text-text-secondary text-lg mb-8 leading-relaxed">
                El referente inmobiliario de la zona oriental. Un complejo consolidado con más de 3 etapas, 
                diseñado para familias que buscan seguridad, estatus y un entorno natural inigualable.
              </p>
              {/* Amenidades Específicas */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
                {['Seguridad 24/7', 'Áreas Verdes', 'Canchas Padel', 'Agua Propia'].map((amenity, i) => (
                  <div key={i} className="flex flex-col items-center text-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-accent text-2xl mb-2">✦</span>
                    <span className="text-xs font-bold text-primary uppercase">{amenity}</span>
                  </div>
                ))}
              </div>
              <button className="bg-primary text-white px-8 py-4 uppercase font-bold hover:bg-accent transition-colors w-full md:w-auto">
                Cotizar Lote o Casa
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* PARALLAX TRANSITION 1 */}
      <section className="relative h-[50vh] bg-fixed bg-cover bg-center flex items-center justify-center"
               style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070')" }}>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center text-white px-4">
          <h3 className="font-display text-4xl md:text-6xl font-bold uppercase">Negocios & Progreso</h3>
          <p className="text-xl mt-2 font-light">El nuevo corazón comercial de Danlí</p>
        </div>
      </section>

      {/* -------------------------------------------------------------------------------- */}
      {/* PROYECTO 2: HILL'S CITY (Dark Theme) */}
      <section className="py-24 px-4 bg-primary text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <span className="text-accent font-bold uppercase tracking-widest text-sm mb-2 block">Centro de Danlí</span>
              <h2 className="font-display text-5xl md:text-6xl font-bold mb-6">Hill's City</h2>
              <p className="text-white/80 text-lg mb-8 leading-relaxed">
                La solución definitiva para el comercio y estacionamiento. 7 manzanas de desarrollo mixto 
                que albergan bancos, franquicias, hospital y el centro de negocios más moderno de la ciudad.
              </p>
              {/* Amenidades Específicas */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10 border-t border-white/10 pt-8">
                {['Locales', 'Parqueos', 'Hospital', 'Bancos'].map((amenity, i) => (
                  <div key={i} className="text-center">
                    <span className="text-white text-xl mb-1 block">■</span>
                    <span className="text-xs font-bold text-accent uppercase">{amenity}</span>
                  </div>
                ))}
              </div>
              <button className="border-2 border-white text-white px-8 py-4 uppercase font-bold hover:bg-white hover:text-primary transition-colors w-full md:w-auto">
                Inversión Comercial
              </button>
            </div>
            <div className="order-1 lg:order-2 relative group">
              <div className="aspect-video bg-gray-800 overflow-hidden shadow-2xl border border-white/10">
                 <div className="absolute inset-0 bg-cover bg-center opacity-80 transition-transform duration-1000 group-hover:scale-105"
                      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=2070')" }} />
                 <div className="absolute bottom-6 right-6 text-right">
                   <p className="text-4xl font-bold text-white">7</p>
                   <p className="text-xs uppercase tracking-widest text-accent">Manzanas</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PARALLAX TRANSITION 2 */}
      <section className="relative h-[50vh] bg-fixed bg-cover bg-center flex items-center justify-center"
               style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053')" }}>
        <div className="absolute inset-0 bg-primary/40 mix-blend-multiply" />
        <div className="relative z-10 text-center text-white px-4">
          <h3 className="font-display text-4xl md:text-6xl font-bold uppercase">Estilo de Vida Premium</h3>
          <p className="text-xl mt-2 font-light">Olancho se transforma</p>
        </div>
      </section>

      {/* -------------------------------------------------------------------------------- */}
      {/* PROYECTO 3: CIUDAD VENECIA OLANCHO (Premium) */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative group">
              <div className="aspect-[4/3] bg-gray-200 overflow-hidden shadow-xl">
                 <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070')" }} />
              </div>
              <div className="absolute -bottom-8 -right-8 w-48 bg-white p-6 shadow-xl hidden md:block border-l-4 border-accent">
                <p className="text-sm font-bold text-primary mb-1">CASA CLUB</p>
                <p className="text-xs text-text-secondary">Piscina, Gym & Arcade incluidos</p>
              </div>
            </div>
            <div>
              <span className="text-accent font-bold uppercase tracking-widest text-sm mb-2 block">Valle de Lepaguare</span>
              <h2 className="font-display text-5xl md:text-6xl font-bold text-primary mb-6">Olancho Premium</h2>
              <p className="text-text-secondary text-lg mb-8 leading-relaxed">
                El primer desarrollo "Resort Living" de la región. No solo compras un terreno, 
                accedes a un estilo de vida con amenidades nunca antes vistas en Olancho.
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  'Casa Club completa con Restaurante',
                  'Piscina semi-olímpica y de niños',
                  'Gimnasio equipado y Salón Arcade',
                  'Canchas Polideportivas'
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-primary font-medium">
                    <span className="w-2 h-2 bg-accent rounded-full mr-3" />
                    {item}
                  </li>
                ))}
              </ul>
              <button className="bg-white border-2 border-primary text-primary px-8 py-4 uppercase font-bold hover:bg-primary hover:text-white transition-colors w-full md:w-auto">
                Ver Master Plan
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------------------- */}
      {/* NUEVO PROYECTO: CIUDAD VALENCIA TEGUCIGALPA (Coming Soon) */}
      <section className="py-24 px-4 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block bg-accent text-white px-4 py-1 text-xs font-bold uppercase tracking-widest mb-6 rounded-full">
            Próximamente
          </div>
          <h2 className="font-display text-5xl md:text-7xl font-bold text-primary mb-8">
            Ciudad Valencia <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Tegucigalpa</span>
          </h2>
          <p className="text-text-secondary text-xl max-w-2xl mx-auto mb-12">
            La capital está por recibir el estándar de calidad INMAER. 
            Regístrate en la lista de espera para precios de Pre-Venta exclusiva.
          </p>
          <div className="max-w-4xl mx-auto h-96 bg-gray-300 relative overflow-hidden rounded-lg shadow-inner group cursor-pointer">
             <div className="absolute inset-0 bg-cover bg-center filter blur-sm scale-105 group-hover:blur-0 group-hover:scale-100 transition-all duration-1000"
                  style={{ backgroundImage: "url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070')" }} />
             <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
               <button className="bg-white text-primary px-10 py-4 uppercase font-bold tracking-widest hover:scale-105 transition-transform">
                 Unirse a Lista de Espera
               </button>
             </div>
          </div>
        </div>
      </section>

      {/* RESTO DEL PORTAFOLIO (Grid Compacto) */}
      <section className="py-24 bg-white px-4">
        <div className="max-w-7xl mx-auto">
           <h3 className="font-display text-2xl font-bold text-primary mb-10 text-center uppercase tracking-wider">Más Desarrollos</h3>
           <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: "Residencial Versalles", loc: "Danlí (Exclusivo)", img: "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=2070" },
                { name: "Ciudad Venecia Valle", loc: "San Lorenzo (Playa)", img: "https://images.unsplash.com/photo-1590247813693-5541d1c609fd?q=80&w=2009" },
                { name: "CV Raíces", loc: "Talanga (Nuevo)", img: "https://images.unsplash.com/photo-1592595896551-12b371d546d5?q=80&w=2070" },
              ].map((item, i) => (
                <div key={i} className="group relative h-64 overflow-hidden rounded-lg cursor-pointer">
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                       style={{ backgroundImage: `url(${item.img})` }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <p className="text-xs uppercase font-bold text-accent mb-1">{item.loc}</p>
                    <h4 className="font-display text-xl font-bold">{item.name}</h4>
                  </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* FORMULARIO (Original restaurado) */}
      <section className="bg-primary py-24 px-4">
         <div className="max-w-3xl mx-auto text-center text-white mb-12">
           <h2 className="font-display text-4xl font-bold mb-4">Empieza a Invertir</h2>
           <p className="opacity-80">Déjanos tus datos y un asesor te contactará hoy mismo.</p>
         </div>
         <form className="max-w-2xl mx-auto space-y-4">
           <div className="grid md:grid-cols-2 gap-4">
             <input type="text" placeholder="Nombre" className="w-full p-4 bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:bg-white/20" />
             <input type="tel" placeholder="Teléfono" className="w-full p-4 bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:bg-white/20" />
           </div>
           <input type="email" placeholder="Correo" className="w-full p-4 bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:bg-white/20" />
           <button className="w-full bg-accent text-white font-bold py-4 uppercase tracking-widest hover:bg-white hover:text-primary transition-colors">
             Enviar Solicitud
           </button>
         </form>
      </section>

      {/* CTA FINAL POTENTE (Nueva sección adicional) */}
      <section className="bg-white py-20 px-4 border-t border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-accent uppercase tracking-widest text-sm font-bold mb-4 block">
            Última oportunidad
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-primary mb-6">
            Tu próximo paso empieza aquí
          </h2>
          <p className="text-text-secondary text-lg mb-10 max-w-2xl mx-auto">
            Miles de familias ya confiaron en nosotros. Ahora es tu turno de construir patrimonio
            con respaldo sólido y procesos claros.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-primary text-white px-10 py-5 uppercase font-bold text-lg hover:bg-accent transition-colors shadow-lg">
              Agendar visita a proyecto
            </button>
            <button className="border-2 border-primary text-primary px-10 py-5 uppercase font-bold text-lg hover:bg-primary hover:text-white transition-colors">
              Hablar con asesor
            </button>
          </div>
          <p className="mt-10 text-xs uppercase tracking-widest text-text-secondary">
            Consistencia · Claridad · Confianza
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
