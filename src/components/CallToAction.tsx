export default function CallToAction() {
  return (
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
  );
}
