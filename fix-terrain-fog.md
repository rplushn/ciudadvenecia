# INSTRUCCIÓN: Agregar niebla volumétrica sutil al pie de la montaña

**Archivo:** `src/components/hero/VideoTextMaskHero.tsx`
**NO tocar:** VideoTextMaskHero.BACKUP.tsx ni VideoTextMaskHero.BEFORE-FOG.tsx

## Concepto
Agregar 3 capas de niebla semi-transparente en la base del terreno montañoso (Y entre -20 y 40). Deben verse como neblina de madrugada en un valle hondureño — dorada/crema, moviéndose MUY lentamente. Extremadamente sutil.

## Implementación

### 1. Crear las capas de niebla DESPUÉS de `scene.add(dust)` y ANTES de `handleResize`

```javascript
// === Valley Fog ===
const fogLayers: THREE.Mesh[] = [];
const fogUniforms = { uTime: { value: 0 }, uOpacity: { value: 0.12 } };

for (let layer = 0; layer < 3; layer++) {
  const fogGeo = new THREE.PlaneGeometry(900, 120, 1, 1);
  const fogMat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    blending: THREE.NormalBlending,
    uniforms: {
      uTime: fogUniforms.uTime,
      uOpacity: fogUniforms.uOpacity,
      uLayer: { value: layer },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform float uOpacity;
      uniform float uLayer;
      varying vec2 vUv;
      
      // Simple noise
      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
      }
      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));
        return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
      }
      float fbmFog(vec2 p) {
        float v = 0.0;
        float a = 0.5;
        for (int i = 0; i < 4; i++) {
          v += a * noise(p);
          p *= 2.0;
          a *= 0.5;
        }
        return v;
      }
      
      void main() {
        float speed = 0.015 + uLayer * 0.008;
        vec2 uv = vUv;
        uv.x += uTime * speed;
        uv.y += sin(uTime * 0.02 + uLayer) * 0.05;
        
        float n = fbmFog(uv * vec2(3.0, 1.5) + uLayer * 1.7);
        
        // Vertical fade: transparent at top, visible at bottom-center
        float vertFade = smoothstep(1.0, 0.3, vUv.y) * smoothstep(0.0, 0.15, vUv.y);
        // Horizontal fade: transparent at edges
        float horizFade = smoothstep(0.0, 0.25, vUv.x) * smoothstep(1.0, 0.75, vUv.x);
        
        float alpha = n * vertFade * horizFade * uOpacity;
        
        // Gold-cream fog color matching palette
        vec3 fogColor = mix(
          vec3(0.77, 0.63, 0.40), // warm gold
          vec3(0.92, 0.88, 0.80), // cream
          n * 0.6 + uLayer * 0.15
        );
        
        gl_FragColor = vec4(fogColor, alpha);
      }
    `,
  });

  const fogMesh = new THREE.Mesh(fogGeo, fogMat);
  fogMesh.position.set(
    (layer - 1) * 60,     // offset X: -60, 0, +60
    -5 + layer * 18,       // offset Y: -5, 13, 31 (at base of mountain)
    80 - layer * 40        // offset Z: 80, 40, 0 (stacked in depth)
  );
  fogMesh.rotation.x = -Math.PI * 0.08; // slight tilt to follow terrain slope
  scene.add(fogMesh);
  fogLayers.push(fogMesh);
}
```

### 2. Animar la niebla en el loop `animate()`

ANTES de `renderer.render(scene, camera);`, agregar:

```javascript
// Animate fog
fogUniforms.uTime.value = time;
fogLayers.forEach((fog, i) => {
  fog.rotation.y = Math.sin(time * 0.05 + i * 2.1) * 0.08;
});
```

## Reglas
- La niebla debe ser MUY sutil — `uOpacity: 0.12` es el punto de partida
- NO debe tapar la montaña, solo acentuar la base
- Los colores deben ser dorado/crema (#C5A065 → #EBE0CC)
- El movimiento debe ser MUY lento (speed 0.015)
- Usar NormalBlending, NO AdditiveBlending (para evitar que se sobre-iluminen los puntos)
- NO tocar nada más del archivo — ni el terreno, ni el dust, ni el UI, ni las animaciones GSAP
