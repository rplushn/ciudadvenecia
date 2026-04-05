import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quiénes Somos",
  description: "INMAER: más de 11 años transformando terrenos en comunidades. Conoce nuestra historia, valores y el estándar que nos respalda con más de 1,200 familias satisfechas.",
  openGraph: {
    title: "Quiénes Somos | Ciudad Venecia",
    description: "+11 años de trayectoria, +1,200 familias. Conoce la historia de INMAER.",
    images: [{ url: "/DRON-FOTOS-SAMANTHA/VERSALLES/VERSALLES12-PREFERIDA.jpg", width: 1200, height: 630 }],
  },
};

export default function QuienesSomosLayout({ children }: { children: React.ReactNode }) {
  return children;
}
