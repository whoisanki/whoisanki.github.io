import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { AvatarBoy3D } from './AvatarBoy3D';

function StarField() {
  const pointsRef = useRef<THREE.Points>(null!);
  const [positions] = useState(() => {
    const coords = new Float32Array(250 * 3);
    for (let i = 0; i < 250; i++) {
      coords[i * 3] = (Math.random() - 0.5) * 14;
      coords[i * 3 + 1] = (Math.random() - 0.5) * 14;
      coords[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2.5;
    }
    return coords;
  });

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.02;
      pointsRef.current.rotation.x += delta * 0.01;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#cbd5e1"
        size={0.04}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  );
}

function AmbientHalo() {
  const haloRef = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (haloRef.current) {
      haloRef.current.rotation.z = time * 0.08;
    }
  });

  return (
    <mesh ref={haloRef} position={[0, 0.1, -1.4]}>
      <ringGeometry args={[1.55, 1.58, 64]} />
      <meshBasicMaterial
        color="#ffffff"
        transparent
        opacity={0.12}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export const Hero3DScene: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative cursor-pointer select-none"
    >
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Soft Wrap-Around Studio Illumination (Zero harsh shadow corners) */}
        <ambientLight intensity={1.6} color="#ffffff" />
        {/* Soft Key Light */}
        <directionalLight position={[3, 4, 4]} intensity={1.6} color="#ffffff" />
        {/* Soft Fill Light */}
        <directionalLight position={[-3, 2, 3]} intensity={1.1} color="#f1f5f9" />
        {/* Gentle Rim Backlight */}
        <directionalLight position={[0, 3, -3]} intensity={1.3} color="#e2e8f0" />
        {/* Soft Frontal Eye & Smile Fill */}
        <pointLight position={[0, 0, 3]} intensity={0.6} color="#ffffff" />

        <StarField />
        <AmbientHalo />
        <AvatarBoy3D
          isHovered={isHovered}
          setIsHovered={setIsHovered}
          canvasContainerRef={containerRef}
        />
      </Canvas>

      {/* Floating Interactive Status Pill */}
      <div className="absolute bottom-4 inset-x-4 flex items-center justify-between pointer-events-none">
        <div className="text-[10px] font-mono tracking-wider text-zinc-300 bg-zinc-950/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>FULL-SCREEN EYE TRACKING • CLICK TO WINK</span>
        </div>
      </div>
    </div>
  );
};
