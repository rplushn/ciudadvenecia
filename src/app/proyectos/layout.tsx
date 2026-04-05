import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Proyectos",
  description: "Conoce nuestros desarrollos residenciales en Honduras: Ciudad Venecia Danlí, Olancho, Talanga, Valle, Guaimaca y Residencial Versalles. Lotes con amenidades completas y financiamiento directo.",
  openGraph: {
    title: "Proyectos | Ciudad Venecia",
    description: "Desarrollos residenciales con piscinas, canchas, parques y seguridad perimetral en Honduras.",
    images: [{ url: "/amenidades/CV_OLANCHO.jpg.jpeg", width: 1200, height: 630 }],
  },
};

export default function ProyectosLayout({ children }: { children: React.ReactNode }) {
  return children;
}
