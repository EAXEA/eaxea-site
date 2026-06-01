"use client";

import { Canvas } from "@react-three/fiber";
import ParticleField from "./ParticleField";

/**
 * Transparent R3F canvas holding the particle galaxy. Sits behind the hero
 * copy. Rendered only on capable, motion-OK clients (see HeroBackground).
 */
export default function HeroCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 14], fov: 55 }}
      dpr={[1, 2]}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      style={{ position: "absolute", inset: 0 }}
    >
      <ParticleField />
    </Canvas>
  );
}
