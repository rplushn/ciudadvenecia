import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white pt-20 pb-10 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <span className="font-display font-bold text-2xl text-primary tracking-tighter">
                CIUDAD VENECIA
              </span>
            </Link>
            <p className="text-text-secondary text-sm leading-relaxed mb-6">
              Desarrollos inmobiliarios pensados para el bienestar integral de las familias hondureñas. 
              Respaldo, seguridad y plusvalía.
            </p>
            <div className="text-sm font-bold text-primary">
              Una marca de INMAER
            </div>
          </div>

          {/* Links Column 1 */}
          <div>
            <h4 className="font-display font-bold text-primary mb-6 uppercase text-sm tracking-wider">
              Navegación
            </h4>
            <ul className="space-y-4 text-sm text-text-secondary">
              <li><Link href="/" className="hover:text-accent transition-colors">Inicio</Link></li>
              <li><Link href="/quienes-somos" className="hover:text-accent transition-colors">Quiénes Somos</Link></li>
              <li><Link href="/proyectos" className="hover:text-accent transition-colors">Proyectos</Link></li>
              <li><Link href="/blog" className="hover:text-accent transition-colors">Blog & Noticias</Link></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h4 className="font-display font-bold text-primary mb-6 uppercase text-sm tracking-wider">
              Proyectos
            </h4>
            <ul className="space-y-4 text-sm text-text-secondary">
              <li><Link href="#" className="hover:text-accent transition-colors">Tegucigalpa</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Danlí</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Valle</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Olancho</Link></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="font-display font-bold text-primary mb-6 uppercase text-sm tracking-wider">
              Contacto
            </h4>
            <ul className="space-y-4 text-sm text-text-secondary">
              <li className="flex items-start">
                <span className="block font-bold text-primary mr-2">Oficina:</span>
                Col. El Zarzal, Edificio INMAER, Danlí
              </li>
              <li className="flex items-center">
                <span className="block font-bold text-primary mr-2">Tel:</span>
                +504 2222-2222
              </li>
              <li className="flex items-center">
                <span className="block font-bold text-primary mr-2">Email:</span>
                info@ciudadvenecia.com
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-text-secondary">
          <p>&copy; {new Date().getFullYear()} Inmobiliaria INMAER. Todos los derechos reservados.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-primary">Política de Privacidad</Link>
            <Link href="#" className="hover:text-primary">Términos y Condiciones</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
