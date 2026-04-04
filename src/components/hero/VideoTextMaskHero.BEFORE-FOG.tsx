"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Perlin Noise
const perm = new Uint8Array(512);
const grad3 = [[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]];
(function initPerm() {
  const p = new Uint8Array(256);
  for (let i = 0; i < 256; i++) p[i] = i;
  for (let i = 255; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [p[i], p[j]] = [p[j], p[i]]; }
  for (let i = 0; i < 256; i++) { perm[i] = p[i]; perm[i + 256] = p[i]; }
})();

function noise(x: number, y: number) {
  const X = Math.floor(x) & 255, Y = Math.floor(y) & 255;
  x -= Math.floor(x); y -= Math.floor(y);
  const u = x * x * (3 - 2 * x), v = y * y * (3 - 2 * y);
  const a = perm[X] + Y, b = perm[X + 1] + Y;
  const g00 = grad3[perm[a] % 12], g10 = grad3[perm[b] % 12];
  const g01 = grad3[perm[a + 1] % 12], g11 = grad3[perm[b + 1] % 12];
  return (1 - v) * ((1 - u) * (g00[0]*x+g00[1]*y) + u * (g10[0]*(x-1)+g10[1]*y)) + v * ((1 - u) * (g01[0]*x+g01[1]*(y-1)) + u * (g11[0]*(x-1)+g11[1]*(y-1)));
}

function fbm(x: number, y: number, oct: number) {
  let v = 0, a = 1, f = 1, m = 0;
  for (let i = 0; i < oct; i++) { v += noise(x*f, y*f)*a; m += a; a *= 0.5; f *= 2; }
  return v / m;
}

export default function VideoTextMaskHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const uiRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const W = window.innerWidth;
    const H = window.innerHeight;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x8a7040, 0.001);

    const camera = new THREE.PerspectiveCamera(55, W / H, 1, 3000);
    camera.position.set(0, 200, 500);
    camera.lookAt(0, 0, 0);

    // Terrain
    const G = 245, SP = 3.77, CT = G * G;
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(CT * 3);
    const col = new Float32Array(CT * 3);
    const siz = new Float32Array(CT);
    const baseY = new Float32Array(CT);

    const c1 = new THREE.Color(0x0f2210);
    const c2 = new THREE.Color(0x1a3a1e);
    const c3 = new THREE.Color(0x2d5a2a);
    const c4 = new THREE.Color(0x4a7a3a);
    const c5 = new THREE.Color(0x7a9a4a);
    const c6 = new THREE.Color(0xC5A065);
    const c7 = new THREE.Color(0xdcc8a0);
    const c8 = new THREE.Color(0xeee0c8);

    const half = (G * SP) / 2;

    for (let i = 0; i < G; i++) {
      for (let j = 0; j < G; j++) {
        const idx = i * G + j;
        const x = i * SP - half;
        const z = j * SP - half;
        const n1 = fbm(i * 0.007, j * 0.007, 6);
        const n2 = fbm(i * 0.022 + 100, j * 0.022 + 100, 3);
        const ridge = Math.abs(fbm(i * 0.013, j * 0.013, 4));
        let y = n1 * 130 + n2 * 30 + ridge * 55;
        const d = Math.sqrt(x * x + z * z);
        y *= (1 - Math.max(0, 1 - d / 200) * 0.5);

        pos[idx*3] = x; pos[idx*3+1] = y; pos[idx*3+2] = z;
        baseY[idx] = y;

        const nh = (y + 35) / 170;
        const c = new THREE.Color();
        if      (nh < 0.1)  c.lerpColors(c1, c2, nh / 0.1);
        else if (nh < 0.22) c.lerpColors(c2, c3, (nh-0.1) / 0.12);
        else if (nh < 0.38) c.lerpColors(c3, c4, (nh-0.22) / 0.16);
        else if (nh < 0.52) c.lerpColors(c4, c5, (nh-0.38) / 0.14);
        else if (nh < 0.68) c.lerpColors(c5, c6, (nh-0.52) / 0.16);
        else if (nh < 0.82) c.lerpColors(c6, c7, (nh-0.68) / 0.14);
        else                c.lerpColors(c7, c8, (nh-0.82) / 0.18);

        col[idx*3] = c.r; col[idx*3+1] = c.g; col[idx*3+2] = c.b;
        siz[idx] = 1.5 + nh * 3.2;
      }
    }

    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
    geo.setAttribute('size', new THREE.BufferAttribute(siz, 1));

    const vs = `
      uniform float uScale;
      attribute float size;
      varying vec3 vColor;
      varying float vDist;
      void main() {
        vColor = color;
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        vDist = -mv.z;
        gl_PointSize = size * uScale * (380.0 / -mv.z);
        gl_Position = projectionMatrix * mv;
      }
    `;

    const fs = `
      varying vec3 vColor;
      varying float vDist;
      void main() {
        float d = length(gl_PointCoord - vec2(0.5));
        if (d > 0.5) discard;
        float alpha = smoothstep(0.5, 0.12, d);
        float glow = exp(-d * 4.0) * 0.35;
        float fog = exp(-vDist * 0.0008);
        vec3 fogCol = vec3(0.54, 0.44, 0.25);
        vec3 finalCol = mix(fogCol, vColor, fog);
        gl_FragColor = vec4(finalCol + glow * 0.2, (alpha * 0.9 + glow * 0.4) * max(fog, 0.15));
      }
    `;

    const mat = new THREE.ShaderMaterial({
      vertexShader: vs, fragmentShader: fs,
      uniforms: { uScale: { value: Math.max(W / 800, 1.0) } },
      vertexColors: true, transparent: true,
      depthWrite: false, blending: THREE.AdditiveBlending,
    });
    scene.add(new THREE.Points(geo, mat));

    // Dust
    const DC = 700;
    const dGeo = new THREE.BufferGeometry();
    const dP = new Float32Array(DC * 3);
    const dC = new Float32Array(DC * 3);
    const dS = new Float32Array(DC);

    for (let i = 0; i < DC; i++) {
      dP[i*3] = (Math.random()-0.5)*900;
      dP[i*3+1] = Math.random()*320-60;
      dP[i*3+2] = (Math.random()-0.5)*900;
      const r = Math.random();
      if (r > 0.6) { dC[i*3]=0.85; dC[i*3+1]=0.7; dC[i*3+2]=0.42; }
      else if (r > 0.3) { dC[i*3]=0.9; dC[i*3+1]=0.85; dC[i*3+2]=0.7; }
      else { dC[i*3]=0.35; dC[i*3+1]=0.55; dC[i*3+2]=0.25; }
      dS[i] = Math.random()*2.5+0.8;
    }

    dGeo.setAttribute('position', new THREE.BufferAttribute(dP, 3));
    dGeo.setAttribute('color', new THREE.BufferAttribute(dC, 3));
    dGeo.setAttribute('size', new THREE.BufferAttribute(dS, 1));

    const dFs = `
      varying vec3 vColor;
      varying float vDist;
      void main() {
        float d = length(gl_PointCoord - vec2(0.5));
        if (d > 0.5) discard;
        float alpha = smoothstep(0.5, 0.08, d);
        float glow = exp(-d * 3.5) * 0.5;
        float fog = exp(-vDist * 0.001);
        gl_FragColor = vec4(vColor, (alpha * 0.6 + glow * 0.4) * fog);
      }
    `;

    const dMat = new THREE.ShaderMaterial({
      vertexShader: vs, fragmentShader: dFs,
      uniforms: { uScale: { value: Math.max(W / 800, 1.0) } },
      vertexColors: true, transparent: true,
      depthWrite: false, blending: THREE.AdditiveBlending,
    });
    const dust = new THREE.Points(dGeo, dMat);
    scene.add(dust);

    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(w, h);
      const scale = Math.max(window.innerWidth / 800, 1.0);
      mat.uniforms.uScale.value = scale;
      dMat.uniforms.uScale.value = scale;
    };
    window.addEventListener('resize', handleResize);

    // Mouse tracking
    let mX = 0, mY = 0, tMX = 0, tMY = 0;
    const onMouse = (e: MouseEvent) => {
      tMX = (e.clientX / window.innerWidth - 0.5) * 2;
      tMY = (e.clientY / window.innerHeight - 0.5) * 2;
      if (uiRef.current) {
        uiRef.current.style.transform = `translate(${tMX * -5}px, ${tMY * -5}px)`;
      }
    };
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      tMX = (t.clientX / window.innerWidth - 0.5) * 2;
      tMY = (t.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouse);
    window.addEventListener('touchmove', onTouch);

    // Animation loop
    let time = 0;
    let animId: number;
    const posAttr = geo.getAttribute('position');

    function animate() {
      animId = requestAnimationFrame(animate);
      time += 0.003;
      mX += (tMX - mX) * 0.03;
      mY += (tMY - mY) * 0.03;

      const ca = time * 0.12;
      camera.position.x = Math.sin(ca) * 430 + mX * 55;
      camera.position.z = Math.cos(ca) * 430;
      camera.position.y = 180 + mY * -35 + Math.sin(time * 0.7) * 12;
      camera.lookAt(0, 30 + mY * 15, 0);

      for (let i = 0; i < CT; i++) {
        const x = posAttr.getX(i), z = posAttr.getZ(i);
        const breathe = Math.sin(time * 0.5 + x * 0.003 + z * 0.003) * 4;
        const dx = x - mX * 300, dz = z - mY * 300;
        const dist = Math.sqrt(dx * dx + dz * dz);
        const ripple = Math.sin(dist * 0.02 - time * 3.5) * Math.max(0, 14 - dist * 0.025);
        posAttr.setY(i, baseY[i] + breathe + ripple);
      }
      posAttr.needsUpdate = true;

      const dp = dGeo.getAttribute('position');
      for (let i = 0; i < DC; i++) {
        let y = dp.getY(i);
        y += 0.07 + Math.sin(time * 1.5 + i) * 0.025;
        if (y > 320) y = -60;
        dp.setY(i, y);
        dp.setX(i, dp.getX(i) + Math.sin(time * 0.8 + i * 0.1) * 0.07);
      }
      dp.needsUpdate = true;
      dust.rotation.y = time * 0.015;

      renderer.render(scene, camera);
    }
    animate();

    // GSAP intro animations
    const gsapCtx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.vhero-brand', { opacity: 0, y: 30, scale: 1.04, duration: 2.5, delay: 0.5 })
        .from('.vhero-line', { width: 0, duration: 1.2 }, '-=1.2')
        .from('.vhero-tagline', { opacity: 0, y: 15, duration: 1 }, '-=0.8')
        .from('.vhero-sub', { opacity: 0, y: 10, duration: 0.8 }, '-=0.5')
        .from('.vhero-ctas', { opacity: 0, y: 15, duration: 0.8 }, '-=0.3')
        .from('.vhero-scroll', { opacity: 0, duration: 0.8 }, '-=0.2')
        .from('.vhero-corner', { opacity: 0, duration: 0.8 }, '-=0.6');

      if (sectionRef.current && uiRef.current) {
        gsap.to(uiRef.current, {
          scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: true },
          opacity: 0, y: -60, ease: 'none',
        });
      }
    }, sectionRef);

    return () => {
      cancelAnimationFrame(animId);
      gsapCtx.revert();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('touchmove', onTouch);
      geo.dispose(); mat.dispose();
      dGeo.dispose(); dMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-screen overflow-hidden">
      {/* Sky gradient background */}
      <div className="absolute inset-0 z-0 pointer-events-none"
        style={{ background: 'linear-gradient(175deg, #e8d5b0 0%, #dcc8a0 15%, #c9a870 30%, #b8945a 50%, #8a7040 70%, #5a4a2a 85%, #2a2218 100%)' }} />

      {/* Three.js canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }} />

      {/* Fog overlays */}
      <div className="absolute inset-x-0 top-0 h-[25%] z-[3] pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgba(232,213,176,0.5), transparent)' }} />
      <div className="absolute inset-x-0 bottom-0 h-[20%] z-[3] pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(42,34,24,0.7), transparent)' }} />
      <div className="absolute inset-0 z-[3] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, transparent 25%, rgba(42,34,24,0.3))' }} />

      {/* Sun glow */}
      <div className="absolute inset-0 z-[2] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 70% 15%, rgba(220,185,120,0.2), transparent 50%)' }} />

      {/* Noise grain */}
      <div className="absolute inset-0 z-[4] pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundRepeat: 'repeat', backgroundSize: '256px' }} />

      {/* UI Content */}
      <div ref={uiRef} className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
        <h1 className="vhero-brand font-serif-display text-white text-center uppercase leading-[0.92]"
          style={{ fontSize: 'clamp(3rem, 10vw, 11rem)', letterSpacing: '0.18em', fontWeight: 300,
            textShadow: '0 2px 60px rgba(42,34,24,0.4), 0 0 120px rgba(197,160,101,0.15)' }}>
          Ciudad<br />Venecia
        </h1>

        <div className="vhero-line h-px mx-auto my-6"
          style={{ width: '80px', background: 'linear-gradient(90deg, transparent, #C5A065, transparent)' }} />

        <p className="vhero-tagline font-serif-display italic"
          style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.35rem)', color: 'rgba(255,255,255,0.6)',
            letterSpacing: '0.35em', textTransform: 'uppercase', fontWeight: 300 }}>
          Vivir Como Soñaste
        </p>

        <p className="vhero-sub" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(0.42rem, 0.55vw, 0.52rem)',
          color: 'rgba(255,255,255,0.25)', letterSpacing: '0.45em', textTransform: 'uppercase',
          fontWeight: 500, marginTop: '0.7rem' }}>
          Desarrollos Residenciales · Honduras
        </p>

        <div className="vhero-ctas flex gap-4 mt-10 pointer-events-auto">
          <a href="/proyectos" className="px-8 py-4 text-white text-[9px] font-bold uppercase tracking-[0.22em] hover:brightness-110 transition-all"
            style={{ background: 'rgba(197,160,101,0.85)', border: '1px solid rgba(197,160,101,0.5)', fontFamily: 'Montserrat' }}>
            Ver Proyectos
          </a>
          <a href="https://wa.me/50489494639" target="_blank" rel="noopener noreferrer"
            className="px-8 py-4 text-[9px] font-bold uppercase tracking-[0.22em] hover:bg-white/10 transition-all"
            style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.65)',
              border: '1px solid rgba(255,255,255,0.12)', fontFamily: 'Montserrat' }}>
            WhatsApp Ventas
          </a>
        </div>
      </div>

      {/* Corner details */}
      <div className="vhero-corner absolute top-10 left-12 z-10 hidden lg:block"
        style={{ fontFamily: 'Montserrat', fontSize: '0.5rem', letterSpacing: '0.25em',
          textTransform: 'uppercase', color: 'rgba(255,255,255,0.18)', fontWeight: 600 }}>
        INMAER Real Estate
      </div>

      <div className="vhero-corner absolute top-10 right-12 z-10 text-right hidden lg:block">
        {['14.0723° N', '86.5750° W'].map((coord) => (
          <span key={coord} className="block" style={{ fontFamily: 'Montserrat', fontSize: '0.42rem',
            letterSpacing: '0.2em', color: 'rgba(197,160,101,0.3)', fontWeight: 500, lineHeight: 1.8 }}>
            {coord}
          </span>
        ))}
        <span className="block mt-1" style={{ fontFamily: 'Montserrat', fontSize: '0.42rem',
          letterSpacing: '0.2em', color: 'rgba(255,255,255,0.1)', fontWeight: 500 }}>
          Danlí, El Paraíso
        </span>
      </div>

      <div className="vhero-corner absolute bottom-10 right-12 z-10 text-right hidden lg:block">
        <span style={{ fontFamily: 'Montserrat', fontSize: '0.42rem', letterSpacing: '0.3em',
          textTransform: 'uppercase', color: 'rgba(255,255,255,0.15)', fontWeight: 500 }}>
          Una creación de <strong style={{ color: 'rgba(197,160,101,0.4)', fontWeight: 700 }}>INMAER</strong>
        </span>
      </div>

      {/* Scroll cue */}
      <div className="vhero-scroll absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span style={{ fontFamily: 'Montserrat', fontSize: '0.5rem', letterSpacing: '0.4em',
          textTransform: 'uppercase', color: 'rgba(255,255,255,0.18)', fontWeight: 500 }}>
          Descubrí
        </span>
        <div className="w-px h-[35px] relative overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
          <div className="absolute left-0 w-full h-full" style={{ background: 'rgba(197,160,101,0.5)', animation: 'vheroScroll 2s ease-in-out infinite 4s' }} />
        </div>
        <style>{`@keyframes vheroScroll { 0% { top: -100%; } 50% { top: 0%; } 100% { top: 100%; } }`}</style>
      </div>
    </section>
  );
}
