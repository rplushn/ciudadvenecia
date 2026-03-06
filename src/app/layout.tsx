import type { Metadata } from "next";
import { Inter, Lato } from "next/font/google";
import "./globals.css";

// Usamos Inter como fuente principal (Display) para títulos, reemplazando Space Grotesk
const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

// Mantenemos Lato para textos largos (Body)
const lato = Lato({ 
  weight: ['300', '400', '700'],
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ciudad Venecia | Inmobiliaria INMAER",
  description: "Desarrollos inmobiliarios premium en Honduras. Plusvalía, seguridad y naturaleza.",
};

import SmoothScroll from '@/components/motion/SmoothScroll';

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="preload" href="/DRON-FOTOS-SAMANTHA/VERSALLES/VERSALLES12-PREFERIDA.jpg" as="image" />
      </head>
      <body>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}