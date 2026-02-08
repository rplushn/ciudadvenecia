import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function QuienesSomos() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* HERO (match con Proyectos) */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-primary">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-50 mix-blend-multiply"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent" />

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto py-12">
          <span className="text-accent uppercase tracking-[0.3em] text-sm font-bold mb-4 block">
            INMAER · Cumpliendo tus Sueños
          </span>
          <h1 className="font-display text-6xl md:text-8xl font-bold text-white uppercase tracking-tighter mb-6 drop-shadow-2xl">
            Quiénes
            <br />
            Somos
          </h1>
          <p className="text-white/90 text-xl md:text-2xl max-w-3xl mx-auto font-light leading-relaxed">
            Construimos desarrollos inmobiliarios con enfoque en orden urbano, servicios y acompañamiento real al cliente.
          </p>
        </div>
      </section>

      {/* SECCIÓN 1: Manifesto / Respaldo */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            <div>
              <span className="text-accent uppercase tracking-widest text-sm font-bold mb-3 block">
                Respaldo corporativo
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-6">
                Una desarrolladora.
                <br />
                Una visión clara.
              </h2>
              <p className="text-text-secondary text-lg leading-relaxed">
                Ciudad Venecia es la marca insignia; INMAER es el respaldo que sostiene la ejecución, el orden y la continuidad de cada proyecto.
              </p>
            </div>

            <div className="bg-surface border border-gray-200 p-10">
              <h3 className="font-display text-2xl font-bold text-primary mb-6 uppercase tracking-wide">
                Nuestro enfoque
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { k: 'Urbanización', v: 'Servicios y planificación.' },
                  { k: 'Financiamiento', v: 'Opciones según proyecto.' },
                  { k: 'Acompañamiento', v: 'Asesoría de principio a fin.' },
                ].map((item) => (
                  <div key={item.k} className="border-l-2 border-accent pl-4">
                    <p className="text-primary font-bold uppercase text-sm">{item.k}</p>
                    <p className="text-text-secondary text-sm mt-1 leading-relaxed">{item.v}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-gray-200 text-xs text-text-secondary uppercase tracking-widest">
                Transparente · Profesional · Aterrizado
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 2: "Qué entregamos" (editorial + bullets) */}
      <section className="py-24 px-4 bg-surface border-y border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative overflow-hidden border border-gray-200 bg-white">
              <div
                className="h-[420px] bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070')",
                }}
              />
              <div className="p-10">
                <p className="text-xs font-bold uppercase tracking-widest text-accent mb-2">
                  En proyectos como Ciudad Venecia Danlí
                </p>
                <h3 className="font-display text-3xl font-bold text-primary">
                  Infraestructura que se siente
                </h3>
                <p className="text-text-secondary mt-4 leading-relaxed">
                  No vendemos "ideas"; entregamos urbanización y procesos claros para que el cliente pueda decidir con confianza.
                </p>
              </div>
            </div>

            <div>
              <span className="text-accent uppercase tracking-widest text-sm font-bold mb-3 block">
                Base técnica
              </span>
              <h3 className="font-display text-4xl font-bold text-primary mb-8">
                Servicios y orden urbano
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { t: 'Terrenos', d: 'Lotes (por ejemplo, 10×15 en Danlí).' },
                  { t: 'Servicios', d: 'Agua potable, energía y aguas negras.' },
                  { t: 'Disponibilidad', d: 'Agua 24 horas (según proyecto).' },
                  { t: 'Seguridad', d: 'Vigilancia 24 horas (según proyecto).' },
                ].map((x) => (
                  <div key={x.t} className="bg-white border border-gray-200 p-6">
                    <p className="text-primary font-bold uppercase text-sm tracking-wide">{x.t}</p>
                    <p className="text-text-secondary text-sm mt-2 leading-relaxed">{x.d}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <button className="bg-primary text-white px-10 py-4 uppercase font-bold hover:bg-accent transition-colors">
                  Ver Proyectos
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 3: PARALLAX 1 */}
      <section
        className="relative h-[50vh] bg-fixed bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070')",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center text-white px-4">
          <h3 className="font-display text-4xl md:text-6xl font-bold uppercase">
            Confianza que se construye
          </h3>
          <p className="text-xl mt-2 font-light">
            Orden, seguimiento y experiencia en cada etapa
          </p>
        </div>
      </section>

      {/* SECCIÓN 4: Proceso + Financiamiento (sobrio) */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-accent uppercase tracking-widest text-sm font-bold mb-3 block">
              Proceso claro
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary">
              Así te acompañamos
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { n: '01', t: 'Elegí', d: 'Te ayudamos a escoger proyecto y opción.' },
              { n: '02', t: 'Cotizá', d: 'Aterrizamos cuotas y requisitos.' },
              { n: '03', t: 'Financiá', d: 'Directo o bancario (según aplica).' },
              { n: '04', t: 'Firmá', d: 'Acompañamiento en el cierre del proceso.' },
            ].map((s) => (
              <div key={s.n} className="border border-gray-200 p-8 bg-surface">
                <p className="text-accent font-bold text-sm tracking-widest">{s.n}</p>
                <p className="font-display text-2xl font-bold text-primary mt-3">{s.t}</p>
                <p className="text-text-secondary text-sm mt-3 leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 grid lg:grid-cols-2 gap-10 items-start">
            <div className="bg-primary text-white p-10">
              <h3 className="font-display text-3xl font-bold mb-4 uppercase">Financiamiento</h3>
              <p className="text-white/80 leading-relaxed">
                En proyectos como Ciudad Venecia Danlí se menciona financiamiento directo para terrenos y construcción con apoyo bancario (Banco Atlántida), incluyendo acompañamiento en el trámite.
              </p>
            </div>

            <div className="bg-white border border-gray-200 p-10">
              <h3 className="font-display text-2xl font-bold text-primary mb-4 uppercase">
                Importante
              </h3>
              <p className="text-text-secondary leading-relaxed">
                Las condiciones varían por proyecto; por eso te guiamos para elegir la alternativa correcta sin promesas infladas.
              </p>
              <div className="mt-8">
                <button className="bg-primary text-white px-10 py-4 uppercase font-bold hover:bg-accent transition-colors w-full md:w-auto">
                  Cotiza ya
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 5: PARALLAX 2 */}
      <section
        className="relative h-[50vh] bg-fixed bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1592595896551-12b371d546d5?q=80&w=2070')",
        }}
      >
        <div className="absolute inset-0 bg-primary/55 mix-blend-multiply" />
        <div className="relative z-10 text-center text-white px-4">
          <h3 className="font-display text-4xl md:text-6xl font-bold uppercase">
            Presencia que crece
          </h3>
          <p className="text-xl mt-2 font-light">
            Portafolio con proyectos residenciales en expansión
          </p>
        </div>
      </section>

      {/* SECCIÓN 6: Presencia / Proyectos (basado en listado público) + CTA */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <span className="text-accent uppercase tracking-widest text-sm font-bold mb-3 block">
                Portafolio
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-6">
                Proyectos en operación
              </h2>
              <p className="text-text-secondary text-lg leading-relaxed">
                Estos son algunos de los proyectos que INMAER lista públicamente: Ciudad Venecia Danlí, Ciudad Venecia Valle, Residencial Versalles y Residencial Palmanova.
              </p>

              <div className="mt-10 grid sm:grid-cols-2 gap-6">
                {[
                  { t: 'Ciudad Venecia Danlí', s: 'Zona oriental · Residencial' },
                  { t: 'Ciudad Venecia Valle', s: 'Carretera Panamericana · Residencial' },
                  { t: 'Residencial Versalles', s: 'Danlí · Exclusivo' },
                  { t: 'Residencial Palmanova', s: 'Danlí · Ubicación estratégica' },
                ].map((x) => (
                  <div key={x.t} className="border border-gray-200 p-6 bg-surface">
                    <p className="font-display text-xl font-bold text-primary">{x.t}</p>
                    <p className="text-text-secondary text-sm mt-2">{x.s}</p>
                    <button className="mt-6 text-primary font-bold uppercase text-sm border-b-2 border-primary pb-1 hover:text-accent hover:border-accent transition-colors">
                      Ver detalles
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-primary text-white p-12">
              <span className="text-accent uppercase tracking-widest text-xs font-bold mb-4 block">
                Hablemos
              </span>
              <h3 className="font-display text-3xl md:text-4xl font-bold mb-6">
                ¿Quieres asesoría directa?
              </h3>
              <p className="text-white/80 leading-relaxed mb-10">
                Escríbenos y te guiamos según tu meta: invertir, comprar tu primera propiedad o construir casa.
              </p>

              <div className="space-y-3 text-sm">
                <p className="text-white/90">
                  Oficina: Col. El Zarzal, Edificio INMAER, contiguo a Pizza Hut, Danlí.
                </p>
                <p className="text-white/90">Tel: (504) 9890-4449 / 2763-3699</p>
              </div>

              <div className="mt-10 grid md:grid-cols-2 gap-4">
                <button className="bg-accent text-white py-4 font-bold uppercase tracking-widest hover:bg-white hover:text-primary transition-colors">
                  Contactar asesor
                </button>
                <button className="bg-transparent border border-white/40 text-white py-4 font-bold uppercase tracking-widest hover:bg-white hover:text-primary transition-colors">
                  Ver proyectos
                </button>
              </div>

              <p className="mt-8 text-xs uppercase tracking-widest text-white/60">
                Consistencia · Claridad · Confianza
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
