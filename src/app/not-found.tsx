import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F3F0EB] flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <span className="text-[#C5A065] text-[10px] font-bold uppercase tracking-[0.4em] block mb-6"
          style={{ fontFamily: 'Montserrat, sans-serif' }}>
          Página no encontrada
        </span>

        <h1 className="text-8xl md:text-9xl font-light text-[#1A1A1A]/10 leading-none mb-4"
          style={{ fontFamily: 'Cormorant Garamond, serif' }}>
          404
        </h1>

        <p className="text-[#6B665F] text-sm font-light leading-relaxed mb-10"
          style={{ fontFamily: 'Montserrat, sans-serif' }}>
          La página que buscas no existe o fue movida.
          Te invitamos a explorar nuestros proyectos.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center bg-[#1A1A1A] text-white px-8 py-4 text-xs uppercase tracking-[0.25em] font-bold hover:bg-[#C5A065] transition-colors duration-500"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Volver al inicio
          </Link>
          <Link
            href="/contacto"
            className="inline-flex items-center justify-center border border-[#1A1A1A]/20 text-[#1A1A1A] px-8 py-4 text-xs uppercase tracking-[0.25em] hover:border-[#C5A065] hover:text-[#C5A065] transition-colors duration-500"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Contáctanos
          </Link>
        </div>
      </div>
    </div>
  );
}
