"use client";

import { memo, Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMotionValueEvent, type MotionValue } from "framer-motion";
import * as THREE from "three";
import { usePageVisibility } from "@/lib/performance";

type SceneProps = {
  active: boolean;
  tone: MotionValue<number>;
};

type ActiveOnlyProps = {
  active: boolean;
};

const DIAMOND_GEOMETRY = new THREE.BoxGeometry(1.18, 1.18, 0.34);
const DROP_GEOMETRY = new THREE.SphereGeometry(1, 14, 14);
const FLOOR_GEOMETRY = new THREE.PlaneGeometry(8, 8);

const PRIMARY_MATERIAL = new THREE.MeshStandardMaterial({
  color: "#9f0707",
  metalness: 0.18,
  roughness: 0.42,
  emissive: "#2a0000"
});

const DROP_MATERIAL = new THREE.MeshStandardMaterial({
  color: "#b70000",
  metalness: 0.06,
  roughness: 0.36,
  emissive: "#4b0000"
});

function SceneTicker({ active }: ActiveOnlyProps) {
  const invalidate = useThree((state) => state.invalidate);

  useEffect(() => {
    if (!active) return;

    let frame = 0;
    let lastTime = 0;

    const tick = (time: number) => {
      if (time - lastTime >= 1000 / 24) {
        invalidate();
        lastTime = time;
      }

      frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [active, invalidate]);

  return null;
}

const Diamond = memo(function Diamond({
  position,
  scale = [1, 1, 0.4]
}: {
  position: [number, number, number];
  scale?: [number, number, number];
}) {
  return (
    <mesh
      geometry={DIAMOND_GEOMETRY}
      material={PRIMARY_MATERIAL}
      position={position}
      rotation={[0, 0, Math.PI / 4]}
      scale={scale}
      castShadow
      receiveShadow
    />
  );
});

const Crack = memo(function Crack({ active }: ActiveOnlyProps) {
  const lineGeometry = useMemo(() => {
    const points = new Float32Array([
      0.02, -0.2, 0.2, -0.08, -0.58, 0.2, 0.06, -0.96, 0.21, -0.02, -1.42, 0.22
    ]);
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(points, 3));
    return geometry;
  }, []);
  const materialRef = useRef<THREE.LineBasicMaterial>(null);

  useFrame((state) => {
    if (!materialRef.current) return;

    if (!active) {
      materialRef.current.opacity = 0.58;
      return;
    }

    const glow = (Math.sin(state.clock.elapsedTime * 1.5) + 1) / 2;
    materialRef.current.opacity = 0.55 + glow * 0.22;
  });

  return (
    <>
      <line geometry={lineGeometry}>
        <lineBasicMaterial ref={materialRef} color="#ff3030" transparent opacity={0.62} />
      </line>
      <mesh
        geometry={DROP_GEOMETRY}
        material={DROP_MATERIAL}
        position={[0, -1.84, 0.14]}
        scale={[0.24, 0.34, 0.18]}
      />
    </>
  );
});

function LogoGroup({ active }: ActiveOnlyProps) {
  const groupRef = useRef<THREE.Group>(null);
  const pointer = useThree((state) => state.pointer);
  const clock = useThree((state) => state.clock);

  useFrame(() => {
    if (!active || !groupRef.current) return;

    const t = clock.getElapsedTime();
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      pointer.x * 0.12,
      0.05
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      pointer.y * -0.08,
      0.05
    );
    groupRef.current.position.y = Math.sin(t * 0.8) * 0.06;
  });

  return (
    <group ref={groupRef} position={[0, 0.22, 0]}>
      <Diamond position={[-1.05, 0.92, 0]} />
      <Diamond position={[1.05, 0.92, 0]} />
      <Diamond position={[0, -0.04, 0]} scale={[1.08, 1.08, 0.4]} />
      <Crack active={active} />
    </group>
  );
}

function LogoScene({ active, tone }: SceneProps) {
  const ambientRef = useRef<THREE.AmbientLight>(null);
  const directionalRef = useRef<THREE.DirectionalLight>(null);
  const pointRef = useRef<THREE.PointLight>(null);
  const toneRef = useRef(tone.get());

  useMotionValueEvent(tone, "change", (value) => {
    toneRef.current = value;
  });

  useFrame(() => {
    const liveTone = toneRef.current;

    if (ambientRef.current) ambientRef.current.intensity = 0.78 + liveTone * 0.2;
    if (directionalRef.current) directionalRef.current.intensity = 1.45 + liveTone * 0.35;
    if (pointRef.current) pointRef.current.intensity = 0.72 + liveTone * 0.26;
  });

  return (
    <>
      <color attach="background" args={["#000000"]} />
      <fog attach="fog" args={["#000000", 4.8, 9.5]} />
      <ambientLight ref={ambientRef} intensity={0.82} color="#f0dede" />
      <directionalLight
        ref={directionalRef}
        castShadow
        intensity={1.55}
        position={[2.2, 3.2, 3]}
        color="#ffffff"
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
      />
      <pointLight ref={pointRef} intensity={0.8} position={[0, -0.5, 2.4]} color="#a10000" />
      <LogoGroup active={active} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.4, 0]} geometry={FLOOR_GEOMETRY} receiveShadow>
        <shadowMaterial opacity={0.18} />
      </mesh>
      <SceneTicker active={active} />
    </>
  );
}

export function DesktopLogoScene({ active, tone }: SceneProps) {
  const pageVisible = usePageVisibility();
  const shouldAnimate = active && pageVisible;

  return (
    <div className="relative h-[400px] w-full">
      <Suspense fallback={<div className="h-full w-full" />}>
        <Canvas
          dpr={[1, 1.4]}
          shadows
          frameloop="demand"
          performance={{ min: 0.8 }}
          gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
          camera={{ position: [0, 0, 5.8], fov: 32 }}
        >
          <LogoScene active={shouldAnimate} tone={tone} />
        </Canvas>
      </Suspense>
    </div>
  );
}
