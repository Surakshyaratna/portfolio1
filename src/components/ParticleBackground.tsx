import { useMousePosition } from "@/contexts/MouseContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
}
function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}
function invlerp(a: number, b: number, v: number): number {
  return clamp((v - a) / (b - a), 0, 1);
}

function GlobalParticles({
  mouseParallax,
  scrollProgress,
  color,
}: {
  mouseParallax: { x: number; y: number };
  scrollProgress: number;
  color: string;
}) {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 3000;

  const basePositions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    const radius = 2;
    for (let i = 0; i < count; i++) {
      const theta = (2 * Math.PI * i) / goldenRatio;
      const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
      arr[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = radius * Math.cos(phi);
    }
    return arr;
  }, []);

  const explosionDirs = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = Math.cos(phi);
    }
    return arr;
  }, []);

  const driftSeeds = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = Math.random() * Math.PI * 2;
      arr[i * 3 + 1] = Math.random() * Math.PI * 2;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 0.3;
    }
    return arr;
  }, []);

  const positions = useMemo(() => new Float32Array(count * 3), []);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const t = scrollProgress;

    const explosionT = easeInOutCubic(invlerp(0.0, 0.85, t));
    const ambientT = invlerp(0.75, 0.9, t);

    const camZ = 6 - explosionT * 4.5;
    state.camera.position.z = camZ;

    const explosionDistance = 12 * explosionT;

    for (let i = 0; i < count; i++) {
      const bx = basePositions[i * 3];
      const by = basePositions[i * 3 + 1];
      const bz = basePositions[i * 3 + 2];
      const dx = explosionDirs[i * 3];
      const dy = explosionDirs[i * 3 + 1];
      const dz = explosionDirs[i * 3 + 2];
      const seed0 = driftSeeds[i * 3];
      const seed1 = driftSeeds[i * 3 + 1];
      const amp = driftSeeds[i * 3 + 2];
      const driftX = Math.sin(time * 0.3 + seed0) * amp * ambientT * 0.8;
      const driftY = Math.cos(time * 0.25 + seed1) * amp * ambientT * 0.8;
      const driftZ = Math.sin(time * 0.2 + seed0 + seed1) * amp * ambientT * 0.4;
      positions[i * 3] = bx + dx * explosionDistance + driftX;
      positions[i * 3 + 1] = by + dy * explosionDistance + driftY;
      positions[i * 3 + 2] = bz + dz * explosionDistance + driftZ;
    }
    geometry.attributes.position.needsUpdate = true;

    if (pointsRef.current) {
      const spinFactor = 1 - explosionT;
      pointsRef.current.rotation.y = time * 0.15 * spinFactor;
      pointsRef.current.rotation.x = time * 0.04 * spinFactor + mouseParallax.y * 0.4 * spinFactor;
      pointsRef.current.rotation.z = mouseParallax.x * 0.25 * spinFactor;
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial color={color} size={0.025} sizeAttenuation transparent opacity={0.85} />
    </points>
  );
}

export default function ParticleBackground() {
  const { mousePosition } = useMousePosition();
  const { theme } = useTheme();
  const particleColor = theme === "light" ? "#1a1a1a" : "#ffffff";
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? clamp(scrollTop / docHeight, 0, 1) : 0;
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    let id: number;
    const animate = () => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const tx = ((mousePosition.x - cx) / cx) * 1.5;
      const ty = ((mousePosition.y - cy) / cy) * 1.5;
      setParallax((prev) => ({
        x: prev.x + (tx - prev.x) * 0.05,
        y: prev.y + (ty - prev.y) * 0.05,
      }));
      id = requestAnimationFrame(animate);
    };
    id = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(id);
  }, [mousePosition]);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }} aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} style={{ width: "100%", height: "100%" }} gl={{ alpha: true, antialias: false }}>
        <ambientLight intensity={0.5} />
        <GlobalParticles mouseParallax={parallax} scrollProgress={scrollProgress} color={particleColor} />
      </Canvas>
    </div>
  );
}