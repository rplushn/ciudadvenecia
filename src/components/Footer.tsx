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
            <p className="text-text-secondary text-sm leading-relaxed mb-6 font-medium italic">
              "Cumpliendo tus Sueños"
            </p>
            <p className="text-text-secondary text-sm leading-relaxed mb-6">
              Desarrollos inmobiliarios pensados para el bienestar integral. Pioneros en la zona oriental y en expansión nacional.
            </p>
            <div className="text-sm font-bold text-primary border-l-2 border-accent pl-3">
              Una marca de <br/>
              INMOBILIARIA Y CONSTRUCTORA INMAER
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
              <li><Link href="/cotizar" className="hover:text-accent transition-colors">Financiamiento</Link></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h4 className="font-display font-bold text-primary mb-6 uppercase text-sm tracking-wider">
              Nuestros Proyectos
            </h4>
            <ul className="space-y-4 text-sm text-text-secondary">
              <li><Link href="#" className="hover:text-accent transition-colors">Ciudad Venecia Tegucigalpa</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Ciudad Venecia Danlí</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Ciudad Venecia Valle</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Ciudad Venecia Olancho</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Hill's City (Comercial)</Link></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="font-display font-bold text-primary mb-6 uppercase text-sm tracking-wider">
              Oficina Principal
            </h4>
            <ul className="space-y-4 text-sm text-text-secondary">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-accent mr-3 mt-1 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>
                  Col. El Zarzal, Edificio INMAER,<br/>
                  contiguo a Pizza Hut, salida a Tegucigalpa,<br/>
                  Danlí, El Paraíso.
                </span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-accent mr-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>(504) 9890-4449 / 2763-3699</span>
              </li>
              <li className="flex items-center mt-4">
                <a href="https://www.facebook.com/InmobiliariayConstructoraINMAER" target="_blank" rel="noopener noreferrer" className="mr-4 text-gray-400 hover:text-primary transition-colors">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
                </a>
                <a href="https://www.tiktok.com/@erickalmendarez75" target="_blank" rel="noopener noreferrer" className="mr-4 text-gray-400 hover:text-primary transition-colors">
                   <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M16.5 6.5a4.5 4.5 0 010 9 4.5 4.5 0 01-9 0 4.5 4.5 0 019 0zm-1.5 0v.5a3 3 0 10-3 3v-3.5a1.5 1.5 0 011.5-1.5h1.5z"/></svg>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-text-secondary">
          <p>&copy; {new Date().getFullYear()} Inmobiliaria y Constructora INMAER. Todos los derechos reservados.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-primary">Tu Casa Honduras</Link>
            <Link href="#" className="hover:text-primary">Aviso Legal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
