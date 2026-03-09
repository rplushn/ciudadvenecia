# CONTEXTO COMPLETO — Ciudad Venecia Web (INMAER)

## STACK
- Next.js 16 (App Router, "use client"), Tailwind CSS, Framer Motion via `motion/react`, Vercel, Lenis smooth scroll

## PALETA
- Dorado: #C5A065 | Oscuro: #1A1A1A | Secundario: #2C2C2C | Azul: #003B5C | Beige: #F3F0EB / #F7F6F4 / #E8E4DA | Texto: #2C2C2C / #6B665F / #8C857E | Verde: green-400

## TIPOGRAFÍA
- Serif: font-serif-display (Cormorant Garamond) | Sans: Montserrat

## CONVENCIONES
- Labels: text-[10px] font-bold uppercase tracking-[0.25em]
- Cards oscuras: bg-white/[0.04] border border-white/10
- Botón principal: bg-[#C5A065] text-black font-bold uppercase tracking-[0.2em]
- Imports motion: from "motion/react" (NO "framer-motion")
- Lenis rompe useTransform para opacity — usar React state + .on("change")
- useTransform SÍ funciona para: x, y, scale

## ARCHIVOS CLAVE
- page.tsx: Homepage | FinancingCalculator.tsx: Calculadora | HondurasMap.tsx: Mapa SVG
- CurtainHero.tsx: Hero cortina + video parallax + intro cinematográfico
- ProjectShowcase.tsx: Scroll takeover proyectos | ScrollBridge.tsx: Transición "¿Cuánto cuesta tu sueño?"
- MapPreviewCard.tsx: Cards de preview en mapa | FadeRevealSection.tsx: Fade through black

## ORDEN HOMEPAGE
1. CurtainHero (cortina + video + DESCUBRE + audio)
2. FadeRevealSection "Un estilo de vida extraordinario"
3. Badge INMAER
4. Carousel fotos
5. Video "Un punto de encuentro"
6. Stats (11 años, 5 ciudades, +700 familias, 100%)
7. Mapa Honduras
8. ProjectShowcase (7 proyectos scroll takeover)
9. ScrollBridge "¿Cuánto cuesta tu sueño?"
10. Precios Exclusivos + Calculadora
11. Parallax "VIDA EN ARMONÍA"
12. Amenidades
13. Before/After Slider
14. Sobre INMAER
15. Contacto
16. Footer

## PROYECTOS
- Danlí (El Paraíso) — 250+ lotes, prima L.6,000
- San Lorenzo (Valle) — prima L.6,000, contado L.350,000
- Talanga (Fco. Morazán) — 3 conceptos: Raíces/Estándar/Premium
- Guaimaca (Fco. Morazán) — Mismos conceptos, próximamente
- Olancho (Valle de Lepaguare) — 10×17m, prima L.6,000
- Versalles (Danlí) — 3 disponibles
- Tegucigalpa — Próximamente

## WhatsApp: 50489494639
