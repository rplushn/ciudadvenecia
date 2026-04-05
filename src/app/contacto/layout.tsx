import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Comunícate con Ciudad Venecia. WhatsApp, teléfono o formulario directo. Atención personalizada para encontrar tu lote ideal en Honduras.",
  openGraph: {
    title: "Contacto | Ciudad Venecia",
    description: "Habla con un asesor de Ciudad Venecia. Respuesta en 24 horas.",
    images: [{ url: "/DRON-FOTOS-SAMANTHA/VERSALLES/VERSALLES12-PREFERIDA.jpg", width: 1200, height: 630 }],
  },
};

export default function ContactoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
