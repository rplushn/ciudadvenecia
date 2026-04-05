"use client";

import { Reveal } from '@/components/motion/Reveal';

interface AdvisorCTAProps {
  variant?: 'advisor' | 'family';
}

const variants = {
  advisor: {
    image: '/amenidades/asesora_cv.png',
    alt: 'Asesora Ciudad Venecia',
    eyebrow: 'Tu terreno, a tu alcance',
    headline: 'Facilidades de',
    headlineAccent: 'pago',
    body: 'En Ciudad Venecia hacemos que adquirir tu terreno sea fácil y accesible. Financiamiento directo, sin trámites bancarios complicados y con planes que se adaptan a tu presupuesto.',
  },
  family: {
    image: '/amenidades/familia_hn.png',
    alt: 'Familia Ciudad Venecia',
    eyebrow: 'El hogar que tu familia merece',
    headline: 'Cumpliendo',
    headlineAccent: 'sueños',
    body: 'Más de 1,200 familias ya viven la experiencia Ciudad Venecia. Un lugar donde tus hijos crecen seguros, con amenidades de primer nivel y la plusvalía que protege tu inversión.',
  },
};

export default function AdvisorCTA({ variant = 'advisor' }: AdvisorCTAProps) {
  const v = variants[variant];

  return (
    <section className="relative bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-end">

          {/* LEFT: Image */}
          <div className="relative h-[400px] sm:h-[500px] md:h-[650px] flex items-end justify-center lg:justify-start">
            {/* Decorative circle behind */}
            <div className="absolute bottom-0 left-1/2 lg:left-[45%] -translate-x-1/2 w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] rounded-full bg-[#F3F0EB] -z-0" />
            {/* Decorative gold ring */}
            <div className="absolute bottom-10 left-1/2 lg:left-[45%] -translate-x-1/2 w-[300px] h-[300px] sm:w-[420px] sm:h-[420px] md:w-[520px] md:h-[520px] rounded-full border border-[#C5A065]/20 -z-0" />

            <img
              src={v.image}
              alt={v.alt}
              className="relative z-10 h-[350px] sm:h-[450px] md:h-[600px] object-contain object-bottom"
            />
          </div>

          {/* RIGHT: Content */}
          <div className="px-8 md:px-12 lg:px-16 py-16 lg:py-24">
            <Reveal>
              <span className="text-[#C5A065] text-[10px] font-bold uppercase tracking-[0.3em] block mb-4">
                {v.eyebrow}
              </span>
              <h2 className="font-serif-display text-4xl md:text-5xl lg:text-6xl text-[#1A1A1A] mb-6 leading-[1.05]">
                {v.headline}{' '}
                <span className="italic text-[#C5A065]">{v.headlineAccent}</span>
              </h2>
              <p className="text-[#6B665F] text-sm md:text-base leading-relaxed mb-10 max-w-lg">
                {v.body}
              </p>
            </Reveal>

            {/* Benefits Grid */}
            <Reveal delay={0.1}>
              <div className="grid grid-cols-2 gap-3 mb-10 max-w-lg">
                {[
                  { title: 'Crédito', subtitle: 'Directo' },
                  { title: 'Sin', subtitle: 'Intermediarios' },
                  { title: 'Cuotas', subtitle: 'Flexibles' },
                  { title: 'Aprobación', subtitle: 'Inmediata' },
                ].map((item, i) => (
                  <div 
                    key={i} 
                    className="bg-[#1A1A1A] text-white px-5 py-4 text-center group hover:bg-[#C5A065] transition-colors duration-300"
                  >
                    <span className="block text-lg md:text-xl font-serif-display">{item.title}</span>
                    <span className="block text-[9px] uppercase tracking-[0.25em] text-white/60 group-hover:text-white/80 mt-0.5">{item.subtitle}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* CTA */}
            <Reveal delay={0.2}>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://wa.me/50489494639?text=Hola%2C%20quiero%20información%20sobre%20facilidades%20de%20pago"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 bg-[#C5A065] text-white px-8 py-4 text-xs uppercase tracking-[0.25em] font-bold hover:bg-[#B08D50] transition-colors duration-300"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Hablar con un asesor
                </a>
                <a
                  href="tel:+50498904449"
                  className="inline-flex items-center justify-center gap-2 border border-[#1A1A1A]/20 text-[#1A1A1A] px-8 py-4 text-xs uppercase tracking-[0.25em] hover:border-[#C5A065] hover:text-[#C5A065] transition-colors duration-300"
                >
                  Llamar ahora
                </a>
              </div>

              <p className="text-[#6B665F]/50 text-[10px] mt-6 italic">
                *Consulta condiciones con tu asesor. Aplican restricciones según proyecto.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
