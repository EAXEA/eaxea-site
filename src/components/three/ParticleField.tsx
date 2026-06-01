"use client";

import { useEffect, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const vertex = /* glsl */ `
  uniform float uTime;
  uniform float uSize;
  uniform float uPixelRatio;
  attribute float aScale;
  attribute vec3 aColor;
  varying vec3 vColor;

  void main() {
    vColor = aColor;
    vec3 p = position;
    // gentle vertical breathing per-particle
    p.y += sin(uTime * 0.4 + position.x * 2.0) * 0.06;
    p.x += cos(uTime * 0.3 + position.z * 2.0) * 0.06;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    // Floor the point at ~one device pixel so distant/small particles never
    // collapse to sub-pixel and vanish on low-DPR displays.
    gl_PointSize = max(uSize * aScale * uPixelRatio * (1.0 / -mv.z), uPixelRatio);
  }
`;

const fragment = /* glsl */ `
  varying vec3 vColor;
  void main() {
    // soft round sprite with additive falloff
    float d = distance(gl_PointCoord, vec2(0.5));
    float alpha = smoothstep(0.5, 0.0, d);
    alpha = pow(alpha, 1.8);
    if (alpha < 0.01) discard;
    gl_FragColor = vec4(vColor, alpha);
  }
`;

const PALETTE = [
  new THREE.Color("#ff5c28"), // ember
  new THREE.Color("#ff2d9c"), // magenta
  new THREE.Color("#6e5bff"), // violet
  new THREE.Color("#2fe0ff"), // cyan
];

const pixelRatio = () =>
  typeof window !== "undefined" ? Math.min(window.devicePixelRatio, 2) : 1;

/**
 * Build the galaxy buffers once. Intentionally impure (Math.random) — kept at
 * module scope and fed through a lazy useState initializer so it runs a single
 * time on the client and never inside React's render-purity scope.
 */
function buildParticles(count: number) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const scales = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    // distribute in a flattened disc/galaxy with a soft core
    const r = Math.pow(Math.random(), 0.65) * 9;
    const theta = Math.random() * Math.PI * 2;
    const branch = (i % 4) / 4;
    const spin = r * 0.55;
    const angle = theta + branch * Math.PI * 2 + spin;

    positions[i * 3] = Math.cos(angle) * r + (Math.random() - 0.5) * 0.6;
    positions[i * 3 + 1] = (Math.random() - 0.5) * (3.2 - r * 0.18);
    positions[i * 3 + 2] = Math.sin(angle) * r + (Math.random() - 0.5) * 0.6;

    // color by distance from core: ember core -> cyan rim
    const t = Math.min(r / 9, 1);
    const c = PALETTE[0].clone();
    if (t < 0.4) c.lerpColors(PALETTE[0], PALETTE[1], t / 0.4);
    else if (t < 0.7) c.lerpColors(PALETTE[1], PALETTE[2], (t - 0.4) / 0.3);
    else c.lerpColors(PALETTE[2], PALETTE[3], (t - 0.7) / 0.3);

    colors[i * 3] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
    scales[i] = Math.random() * 1.6 + 0.4;
  }
  return { positions, colors, scales };
}

export default function ParticleField({ count = 5500 }: { count?: number }) {
  const group = useRef<THREE.Group>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport, pointer } = useThree();

  // Lazy init: built once on mount, outside render-purity scope.
  const [{ positions, colors, scales }] = useState(() => buildParticles(count));
  const [uniforms] = useState(() => ({
    uTime: { value: 0 },
    uSize: { value: 26 },
    uPixelRatio: { value: pixelRatio() },
  }));

  // Keep point size correct if the window moves to a different-DPI display.
  useEffect(() => {
    const onResize = () => {
      if (matRef.current) {
        matRef.current.uniforms.uPixelRatio.value = pixelRatio();
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useFrame((state, delta) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
    if (group.current) {
      group.current.rotation.y += delta * 0.045;
      // ease the whole field toward the pointer for parallax
      const targetX = pointer.y * 0.18;
      group.current.rotation.x += (targetX - group.current.rotation.x) * 0.04;
      group.current.position.x +=
        (pointer.x * (viewport.width > 8 ? 0.6 : 0.2) -
          group.current.position.x) *
        0.04;
    }
  });

  return (
    <group ref={group} rotation={[0.35, 0, 0.05]}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-aColor" args={[colors, 3]} />
          <bufferAttribute attach="attributes-aScale" args={[scales, 1]} />
        </bufferGeometry>
        <shaderMaterial
          ref={matRef}
          vertexShader={vertex}
          fragmentShader={fragment}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          uniforms={uniforms}
        />
      </points>
    </group>
  );
}
