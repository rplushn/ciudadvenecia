import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function QuienesSomos() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* 1. HERO - MISIÓN & VISIÓN */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-primary">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-multiply"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070')" }}
        />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <span className="text-accent uppercase tracking-[0.3em] text-sm font-bold mb-4 block animate-fade-in-up">
            INMAER · CUMPLIENDO TUS SUEÑOS
          </span>
          <h1 className="font-display text-6xl md:text-8xl font-bold text-white uppercase tracking-tighter mb-6">
            QUIÉNES<br/>SOMOS
          </h1>
          <p className="text-white/90 text-xl md:text-2xl font-light leading-relaxed">
            Construimos desarrollos inmobiliarios con enfoque en orden urbano, 
            servicios y acompañamiento real al cliente.
          </p>
        </div>
      </section>

      {/* 2. RESPALDO CORPORATIVO */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-accent font-bold uppercase tracking-widest text-sm mb-2 block">Respaldo Corporativo</span>
            <h2 className="font-display text-5xl md:text-6xl font-bold text-primary mb-6 leading-tight">
              Una desarrolladora <br/> con <span className="text-accent">Trayectoria</span>
            </h2>
            <p className="text-text-secondary text-lg mb-6 leading-relaxed">
              INMAER nace en la zona oriental de Honduras con una visión clara: transformar la manera en que las familias adquieren su patrimonio. 
              Lo que comenzó con un primer proyecto de 152 lotes, hoy es una firma consolidada con presencia en múltiples departamentos.
            </p>
            <div className="grid grid-cols-2 gap-8 mt-10 border-t border-gray-100 pt-8">
               <div>
                  <p className="text-4xl font-bold text-primary mb-1">10+</p>
                  <p className="text-xs uppercase tracking-widest text-text-secondary">Años de Experiencia</p>
               </div>
               <div>
                  <p className="text-4xl font-bold text-primary mb-1">4</p>
                  <p className="text-xs uppercase tracking-widest text-text-secondary">Ciudades</p>
               </div>
            </div>
          </div>
          <div className="relative h-[500px] bg-gray-100 rounded-sm overflow-hidden shadow-2xl group">
             <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                  style={{ backgroundImage: "url('https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2032')" }} />
          </div>
        </div>
      </section>

      {/* 3. NUESTRO ENFOQUE (MISION/VISION) */}
      <section className="py-24 px-4 bg-gray-50">
         <div className="max-w-7xl mx-auto text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-primary uppercase tracking-wide">NUESTRO ENFOQUE</h2>
         </div>
         <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            {/* MISIÓN */}
            <div className="bg-white p-10 shadow-lg border-t-4 border-accent hover:-translate-y-2 transition-transform duration-300">
               <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <span className="text-2xl">🎯</span>
               </div>
               <h3 className="font-bold text-xl text-primary mb-4 text-center uppercase tracking-wider">Misión</h3>
               <p className="text-text-secondary text-sm leading-relaxed text-center">
                  Desarrollar proyectos de urbanización accesibles y ordenados, permitiendo que cada familia hondureña cumpla el sueño de tener una vivienda propia en un entorno seguro y digno.
               </p>
            </div>

            {/* VISIÓN */}
            <div className="bg-white p-10 shadow-lg border-t-4 border-primary hover:-translate-y-2 transition-transform duration-300">
               <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <span className="text-2xl">👁️</span>
               </div>
               <h3 className="font-bold text-xl text-primary mb-4 text-center uppercase tracking-wider">Visión</h3>
               <p className="text-text-secondary text-sm leading-relaxed text-center">
                  Ser la empresa líder en desarrollo inmobiliario en Honduras, expandiendo la marca Ciudad Venecia a nivel nacional con proyectos que generen confianza y alta plusvalía.
               </p>
            </div>

             {/* VALORES */}
             <div className="bg-white p-10 shadow-lg border-t-4 border-accent hover:-translate-y-2 transition-transform duration-300">
               <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <span className="text-2xl">💎</span>
               </div>
               <h3 className="font-bold text-xl text-primary mb-4 text-center uppercase tracking-wider">Valores</h3>
               <ul className="text-text-secondary text-sm leading-relaxed text-left space-y-2 pl-4 list-disc marker:text-accent">
                  <li>Compromiso con el cliente.</li>
                  <li>Integridad y transparencia.</li>
                  <li>Calidad en cada obra.</li>
                  <li>Trabajo en equipo.</li>
               </ul>
            </div>
         </div>
      </section>

      <Footer />
    </main>
  );
}
