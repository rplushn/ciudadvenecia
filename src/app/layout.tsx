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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${inter.variable} ${lato.variable} font-body antialiased`}>
        {children}
      </body>
    </html>
  );
}
