import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Contacto() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* 1. HERO CINEMATOGRÁFICO */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-primary">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-multiply"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1423666639041-f56000c27a9a?q=80&w=2074')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <span className="text-accent uppercase tracking-[0.3em] text-sm font-bold mb-4 block">
            Estamos listos para ti
          </span>
          <h1 className="font-display text-5xl md:text-8xl font-bold text-white uppercase tracking-tighter mb-6 drop-shadow-2xl">
            Hablemos
            <br />
            de tu proyecto
          </h1>
          <p className="text-white/90 text-xl md:text-2xl max-w-2xl mx-auto font-light leading-relaxed">
            Asesoría directa, sin vueltas. Te ayudamos a elegir el mejor camino según tu meta.
          </p>
        </div>
      </section>

      {/* 2. MÉTODOS DE CONTACTO RÁPIDO (3 columnas elegantes) */}
      <section className="py-20 px-4 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-accent uppercase tracking-widest text-sm font-bold mb-3 block">
              Contacto directo
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary">
              Elige tu canal preferido
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '📱',
                title: 'WhatsApp Ventas',
                detail: '+504 9549-8925',
                action: 'Escribir ahora',
                bg: 'bg-green-50',
                border: 'border-green-200',
              },
              {
                icon: '☎️',
                title: 'Teléfono',
                detail: '(504) 9890-4449 / 2763-3699',
                action: 'Llamar',
                bg: 'bg-blue-50',
                border: 'border-blue-200',
              },
              {
                icon: '✉️',
                title: 'Email',
                detail: 'ventas@inmaer.com',
                action: 'Enviar correo',
                bg: 'bg-gray-50',
                border: 'border-gray-200',
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`${item.bg} border ${item.border} p-8 text-center hover:shadow-lg transition-shadow`}
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="font-display text-xl font-bold text-primary mb-2">{item.title}</h3>
                <p className="text-text-secondary mb-6">{item.detail}</p>
                <button className="bg-primary text-white px-6 py-3 text-sm uppercase font-bold hover:bg-accent transition-colors">
                  {item.action}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. HORARIOS + STATS (Dark section con métricas visuales) */}
      <section className="py-20 px-4 bg-primary text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-accent uppercase tracking-widest text-sm font-bold mb-4 block">
                Compromiso de respuesta
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
                Respondemos en menos de 24 horas hábiles
              </h2>
              <p className="text-white/80 text-lg leading-relaxed mb-10">
                Nuestro equipo comercial está disponible de lunes a viernes de 8:00 AM a 5:00 PM,
                y sábados de 8:00 AM a 12:00 PM. Fuera de horario, recibimos tu mensaje y te
                contactamos al siguiente día hábil.
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white/5 border border-white/10 p-6">
                  <p className="text-3xl font-bold mb-2">95%</p>
                  <p className="text-xs uppercase tracking-widest text-accent">
                    Respuesta en mismo día
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 p-6">
                  <p className="text-3xl font-bold mb-2">2.5hrs</p>
                  <p className="text-xs uppercase tracking-widest text-accent">Tiempo promedio</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 p-10">
              <h3 className="font-display text-2xl font-bold mb-6">Horario de atención</h3>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between border-b border-white/10 pb-3">
                  <span className="text-white/70">Lunes a Viernes</span>
                  <span className="font-bold">8:00 AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-3">
                  <span className="text-white/70">Sábados</span>
                  <span className="font-bold">8:00 AM - 12:00 PM</span>
                </div>
                <div className="flex justify-between pb-3">
                  <span className="text-white/70">Domingos</span>
                  <span className="font-bold text-white/50">Cerrado</span>
                </div>
              </div>
              <p className="mt-8 text-xs text-white/60 uppercase tracking-widest">
                WhatsApp disponible 24/7 · Respuesta garantizada
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FORMULARIO ÉPICO */}
      <section className="bg-surface py-24 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Encabezado */}
          <div className="text-center mb-12">
            <span className="text-accent uppercase tracking-widest text-xs font-bold mb-3 block">
              Último paso
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-4">
              ¿Listo para hablar con un asesor?
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Cuéntanos qué proyecto te interesa y te mostramos opciones reales de financiamiento,
              sin compromisos ni promesas infladas.
            </p>
          </div>

          {/* Beneficios rápidos */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              'Respuesta en menos de 24 horas hábiles.',
              'Información clara sobre cuotas y primas según proyecto.',
              'Acompañamiento durante todo el proceso de compra.',
            ].map((item, i) => (
              <div key={i} className="bg-white border border-gray-200 p-6 text-center">
                <span className="text-accent text-2xl mb-3 block">✓</span>
                <p className="text-text-secondary text-sm leading-relaxed">{item}</p>
              </div>
            ))}
          </div>

          {/* Grid: Contacto directo + Formulario */}
          <div className="grid lg:grid-cols-3 gap-10 items-start">
            {/* Columna izquierda: contacto directo */}
            <div className="lg:col-span-1 bg-primary text-white p-8">
              <h3 className="font-display text-2xl font-bold mb-4">
                ¿Prefieres hablar directo?
              </h3>
              <p className="text-white/80 text-sm leading-relaxed mb-8">
                También puedes escribir o llamar a nuestro equipo comercial para agendar una
                visita a proyecto o resolver dudas puntuales sobre financiamiento.
              </p>
              <div className="space-y-4 text-sm border-t border-white/10 pt-6">
                <div>
                  <p className="text-accent font-bold uppercase tracking-widest text-xs mb-1">
                    Teléfono
                  </p>
                  <p className="text-white">(504) 9890-4449 / 2763-3699</p>
                </div>
                <div>
                  <p className="text-accent font-bold uppercase tracking-widest text-xs mb-1">
                    WhatsApp ventas
                  </p>
                  <p className="text-white">+504 9549-8925</p>
                </div>
                <div>
                  <p className="text-accent font-bold uppercase tracking-widest text-xs mb-1">
                    Oficina Danlí
                  </p>
                  <p className="text-white/80 text-xs leading-relaxed">
                    Col. El Zarzal, Edificio INMAER, contiguo a Pizza Hut, Danlí.
                  </p>
                </div>
              </div>
            </div>

            {/* Columna derecha: formulario WOW */}
            <div className="lg:col-span-2 bg-white text-left text-primary p-8 md:p-10 shadow-2xl border border-gray-100">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-primary">
                      Nombre completo
                    </label>
                    <input
                      type="text"
                      className="w-full border-2 border-gray-200 p-4 focus:outline-none focus:border-accent transition-colors"
                      placeholder="Ej. Juan Pérez"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-primary">
                      Teléfono / WhatsApp
                    </label>
                    <input
                      type="tel"
                      className="w-full border-2 border-gray-200 p-4 focus:outline-none focus:border-accent transition-colors"
                      placeholder="+504 0000-0000"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-primary">
                      Correo electrónico
                    </label>
                    <input
                      type="email"
                      className="w-full border-2 border-gray-200 p-4 focus:outline-none focus:border-accent transition-colors"
                      placeholder="tucorreo@ejemplo.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-primary">
                      Proyecto de interés
                    </label>
                    <select className="w-full border-2 border-gray-200 p-4 focus:outline-none focus:border-accent transition-colors">
                      <option>Seleccionar...</option>
                      <option>Ciudad Venecia Danlí</option>
                      <option>Hill&apos;s City</option>
                      <option>Ciudad Venecia Olancho</option>
                      <option>Ciudad Venecia Valle</option>
                      <option>Residencial Versalles</option>
                      <option>Otro / No estoy seguro</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-primary">
                    ¿Qué tienes en mente?
                  </label>
                  <textarea
                    rows={4}
                    className="w-full border-2 border-gray-200 p-4 focus:outline-none focus:border-accent transition-colors resize-none"
                    placeholder="Cuéntanos si buscas lote, casa, información de financiamiento, etc."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-white py-5 font-bold text-lg uppercase tracking-widest hover:bg-accent transition-colors shadow-lg hover:shadow-xl"
                >
                  Enviar y hablar con un asesor
                </button>

                <p className="text-xs text-text-secondary text-center mt-4">
                  Tus datos serán utilizados únicamente para contactarte sobre proyectos de
                  INMAER. No compartimos tu información con terceros.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 5. MAPA INTERACTIVO */}
      <section className="h-[500px] relative bg-gray-100">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3869.123456789!2d-86.57812!3d14.02891!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTTCsDAxJzQ0LjEiTiA4NsKwMzQnNDEuMiJX!5e0!3m2!1sen!2shn!4v1234567890"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="grayscale hover:grayscale-0 transition-all duration-500"
        />
        <div className="absolute top-8 left-8 bg-white p-6 shadow-xl max-w-sm">
          <h3 className="font-display text-xl font-bold text-primary mb-2">
            Oficina Principal Danlí
          </h3>
          <p className="text-text-secondary text-sm">
            Col. El Zarzal, Edificio INMAER, contiguo a Pizza Hut, Danlí, El Paraíso.
          </p>
        </div>
      </section>

      {/* 6. CTA FINAL POTENTE */}
      <section className="bg-primary py-20 px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <span className="text-accent uppercase tracking-widest text-sm font-bold mb-4 block">
            Última oportunidad
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-6">
            Tu próximo paso empieza aquí
          </h2>
          <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
            Miles de familias ya confiaron en nosotros. Ahora es tu turno de construir patrimonio
            con respaldo sólido y procesos claros.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-accent text-white px-10 py-5 uppercase font-bold text-lg hover:bg-white hover:text-primary transition-colors shadow-xl">
              Agendar visita a proyecto
            </button>
            <button className="border-2 border-white text-white px-10 py-5 uppercase font-bold text-lg hover:bg-white hover:text-primary transition-colors">
              Ver proyectos disponibles
            </button>
          </div>
          <p className="mt-10 text-xs uppercase tracking-widest text-white/60">
            Consistencia · Claridad · Confianza
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
