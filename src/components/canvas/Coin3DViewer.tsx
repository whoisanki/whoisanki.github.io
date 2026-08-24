import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';
import { sounds } from '../../utils/audio';
import confetti from 'canvas-confetti';
import { Rotate3d, Sparkles, Coins, Info } from 'lucide-react';

export type CoinMaterialType = 'gold' | 'obsidian' | 'silver' | 'bronze';

// Realistic Satin-Proof Procedural Canvas Texture Generator for Coin Faces
function createCoinTexture(isReverse: boolean, materialType: CoinMaterialType): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    // 1. Natural Metallic Base Gradient
    const grad = ctx.createRadialGradient(512, 512, 80, 512, 512, 512);

    if (materialType === 'silver') {
      grad.addColorStop(0, '#f8fafc');
      grad.addColorStop(0.35, '#e2e8f0');
      grad.addColorStop(0.7, '#cbd5e1');
      grad.addColorStop(1, '#94a3b8');
    } else if (materialType === 'obsidian') {
      grad.addColorStop(0, '#312e81');
      grad.addColorStop(0.4, '#1e1b4b');
      grad.addColorStop(0.75, '#0f172a');
      grad.addColorStop(1, '#020617');
    } else if (materialType === 'bronze') {
      grad.addColorStop(0, '#fdba74');
      grad.addColorStop(0.35, '#ea580c');
      grad.addColorStop(0.7, '#9a3412');
      grad.addColorStop(1, '#7c2d12');
    } else {
      // 24K Royal Gold (Natural Satin Finish)
      grad.addColorStop(0, '#fef08a');
      grad.addColorStop(0.35, '#eab308');
      grad.addColorStop(0.7, '#ca8a04');
      grad.addColorStop(1, '#92400e');
    }

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 1024);

    // 2. Subtle Radial Brushed Specular Ray Patterns
    const numRays = 64;
    for (let i = 0; i < numRays; i++) {
      const angle = (i / numRays) * Math.PI * 2;
      ctx.strokeStyle = i % 2 === 0 ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.03)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(512, 512);
      ctx.lineTo(512 + Math.cos(angle) * 510, 512 + Math.sin(angle) * 510);
      ctx.stroke();
    }

    // 3. Crisp Concentric Polished Rings
    ctx.strokeStyle = '#fef9c3';
    ctx.lineWidth = 12;
    ctx.beginPath();
    ctx.arc(512, 512, 480, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(254, 240, 138, 0.6)';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.arc(512, 512, 456, 0, Math.PI * 2);
    ctx.stroke();

    // 4. Raised Pearled Bead Rim Circle
    const numBeads = 48;
    for (let i = 0; i < numBeads; i++) {
      const angle = (i / numBeads) * Math.PI * 2;
      const bx = 512 + Math.cos(angle) * 440;
      const by = 512 + Math.sin(angle) * 440;

      ctx.fillStyle = '#fef08a';
      ctx.beginPath();
      ctx.arc(bx, by, 6.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // 5. Crisp Embossed Typography & Insignia with Soft Relief
    ctx.save();
    ctx.shadowColor = 'rgba(0, 0, 0, 0.35)';
    ctx.shadowBlur = 6;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;

    if (!isReverse) {
      // OBVERSE: Ankit's Emblem
      ctx.fillStyle = '#fef9c3';
      ctx.font = 'bold 160px Outfit, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('⚡', 512, 430);

      ctx.font = '900 58px Outfit, sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.fillText('ANKITH', 512, 565);

      ctx.font = 'bold 34px "JetBrains Mono", monospace';
      ctx.fillStyle = '#fef08a';
      ctx.fillText('</> DEV & NUMISMATIST', 512, 630);

      // Curved Rim Text
      ctx.font = 'bold 32px Outfit, sans-serif';
      ctx.fillStyle = '#fef9c3';
      ctx.fillText('★ 5+ YRS MOBILE DEV ★ NUMISMATIST ★', 512, 280);
      ctx.fillText('★ 26+ COUNTRIES COIN ARCHIVE ★', 512, 785);
    } else {
      // REVERSE: Numismatics World Map & Age 12
      ctx.fillStyle = '#fef9c3';
      ctx.font = 'bold 150px Outfit, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('🌐', 512, 420);

      ctx.font = '900 64px Outfit, sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.fillText('26+ COUNTRIES', 512, 555);

      ctx.font = 'bold 36px "JetBrains Mono", monospace';
      ctx.fillStyle = '#fef08a';
      ctx.fillText('EST. AGE 12 • WORLD CURRENCY', 512, 625);

      ctx.font = 'bold 32px Outfit, sans-serif';
      ctx.fillStyle = '#fef9c3';
      ctx.fillText('★ GEM PROOF GRADE ★ RARE MINT ★', 512, 280);
      ctx.fillText('★ NUMISMATIC HERITAGE ★', 512, 785);
    }
    ctx.restore();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function CoinMesh({
  materialType,
  isFlipping,
  flipTarget,
  flipProgress,
  autoRotate,
  onCoinClick
}: {
  materialType: CoinMaterialType;
  isFlipping: boolean;
  flipTarget: 'heads' | 'tails';
  flipProgress: number;
  autoRotate: boolean;
  onCoinClick: () => void;
}) {
  const groupRef = useRef<THREE.Group>(null!);
  const currentYRotation = useRef(0);

  const obverseTexture = useMemo(() => createCoinTexture(false, materialType), [materialType]);
  const reverseTexture = useMemo(() => createCoinTexture(true, materialType), [materialType]);

  const materialConfig = useMemo(() => {
    switch (materialType) {
      case 'obsidian':
        return {
          rimColor: '#1e1b4b',
          emissive: '#312e81',
          emissiveIntensity: 0.08,
          roughness: 0.3,
          metalness: 0.65
        };
      case 'silver':
        return {
          rimColor: '#e2e8f0',
          emissive: '#94a3b8',
          emissiveIntensity: 0.06,
          roughness: 0.28,
          metalness: 0.7
        };
      case 'bronze':
        return {
          rimColor: '#c2410c',
          emissive: '#7c2d12',
          emissiveIntensity: 0.08,
          roughness: 0.35,
          metalness: 0.6
        };
      case 'gold':
      default:
        return {
          rimColor: '#eab308',
          emissive: '#78350f',
          emissiveIntensity: 0.08,
          roughness: 0.28,
          metalness: 0.7
        };
    }
  }, [materialType]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    if (isFlipping) {
      const height = Math.sin(flipProgress * Math.PI) * 1.8;
      groupRef.current.position.y = height;

      const totalSpins = 4;
      const baseTargetAngle =
        flipTarget === 'heads'
          ? totalSpins * Math.PI * 2
          : totalSpins * Math.PI * 2 + Math.PI;

      const ease = 1 - Math.pow(1 - flipProgress, 3);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        0.2,
        0.2 + Math.sin(flipProgress * Math.PI * 2) * 0.4,
        0.5
      );
      groupRef.current.rotation.y = ease * baseTargetAngle;
      groupRef.current.rotation.z = Math.sin(flipProgress * Math.PI) * 0.25;

      currentYRotation.current = baseTargetAngle % (Math.PI * 2);
    } else {
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, 0, 0.1);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, 0.12, 0.08);
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, 0, 0.08);

      if (autoRotate) {
        currentYRotation.current += delta * 0.9;
        groupRef.current.rotation.y = currentYRotation.current;
      }
    }
  });

  return (
    <group
      ref={groupRef}
      onClick={(e) => {
        e.stopPropagation();
        onCoinClick();
      }}
    >
      {/* Coin Cylinder Milled Rim */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[2.2, 2.2, 0.22, 64]} />
        <meshStandardMaterial
          color={materialConfig.rimColor}
          emissive={materialConfig.emissive}
          emissiveIntensity={materialConfig.emissiveIntensity}
          roughness={materialConfig.roughness}
          metalness={materialConfig.metalness}
        />
      </mesh>

      {/* Front Face (Obverse - Heads) */}
      <mesh position={[0, 0, 0.115]}>
        <circleGeometry args={[2.18, 64]} />
        <meshStandardMaterial
          map={obverseTexture}
          emissive={materialConfig.emissive}
          emissiveIntensity={materialConfig.emissiveIntensity * 0.4}
          roughness={materialConfig.roughness}
          metalness={materialConfig.metalness}
        />
      </mesh>

      {/* Back Face (Reverse - Tails) */}
      <mesh position={[0, 0, -0.115]} rotation={[0, Math.PI, 0]}>
        <circleGeometry args={[2.18, 64]} />
        <meshStandardMaterial
          map={reverseTexture}
          emissive={materialConfig.emissive}
          emissiveIntensity={materialConfig.emissiveIntensity * 0.4}
          roughness={materialConfig.roughness}
          metalness={materialConfig.metalness}
        />
      </mesh>
    </group>
  );
}

export const Coin3DViewer: React.FC = () => {
  const [materialType, setMaterialType] = useState<CoinMaterialType>('gold');
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipTarget, setFlipTarget] = useState<'heads' | 'tails'>('heads');
  const [flipProgress, setFlipProgress] = useState(0);
  const [lastOutcome, setLastOutcome] = useState<'heads' | 'tails' | null>(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const [showInfo, setShowInfo] = useState(false);

  const flipAnimationRef = useRef<number | null>(null);

  const triggerFlip = (target?: 'heads' | 'tails') => {
    if (isFlipping) return;

    const outcome = target ?? (Math.random() > 0.5 ? 'heads' : 'tails');
    setFlipTarget(outcome);
    setIsFlipping(true);
    setAutoRotate(false);
    setFlipProgress(0);

    sounds.playCoinClink();
    sounds.playWarp();

    const duration = 1400;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(1, elapsed / duration);
      setFlipProgress(progress);

      if (progress < 1) {
        flipAnimationRef.current = requestAnimationFrame(animate);
      } else {
        setIsFlipping(false);
        setLastOutcome(outcome);
        sounds.playCoinClink();

        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#ffffff', '#e2e8f0', '#d4af37', '#94a3b8']
        });
      }
    };

    flipAnimationRef.current = requestAnimationFrame(animate);
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* 3D Canvas Box with Soft Ambient Lighting */}
      <div className="w-full h-[400px] md:h-[480px] relative rounded-3xl glass-panel overflow-hidden border border-white/10 shadow-xl">
        <Canvas
          camera={{ position: [0, 0, 6.2], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
        >
          {/* Balanced Studio Lighting (Natural Satin Polish, No Overexposure) */}
          <ambientLight intensity={1.15} color="#ffffff" />
          {/* Key Light */}
          <directionalLight position={[2, 4, 6]} intensity={1.7} color="#ffffff" />
          {/* Specular Glint */}
          <directionalLight position={[5, 5, 3]} intensity={1.2} color="#ffffff" />
          {/* Soft Warm Fill */}
          <directionalLight position={[-4, -3, 3]} intensity={1.0} color="#fef08a" />
          {/* Subtle Rim Light */}
          <directionalLight position={[0, 4, -4]} intensity={1.1} color="#ffffff" />
          {/* Center Subtle Fill */}
          <pointLight position={[0, 0, 4]} intensity={0.5} color="#ffffff" />

          <Float
            speed={isFlipping ? 0 : 2}
            rotationIntensity={isFlipping ? 0 : 0.25}
            floatIntensity={isFlipping ? 0 : 0.5}
          >
            <CoinMesh
              materialType={materialType}
              isFlipping={isFlipping}
              flipTarget={flipTarget}
              flipProgress={flipProgress}
              autoRotate={autoRotate}
              onCoinClick={() => triggerFlip()}
            />
          </Float>

          <OrbitControls
            enabled={!isFlipping}
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={(3 * Math.PI) / 4}
          />
        </Canvas>

        {/* Top Floating Controls */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-2 pointer-events-auto bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 text-zinc-300 text-xs font-mono">
            <Coins className="w-4 h-4 text-amber-400" />
            <span>NUMISMATIC 3D VAULT</span>
          </div>

          <div className="flex items-center gap-2 pointer-events-auto">
            {lastOutcome && (
              <div className="px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white text-xs font-mono font-bold">
                {lastOutcome === 'heads' ? '⚡ HEADS (Emblem)' : '🌐 TAILS (26+ Countries)'}
              </div>
            )}

            <button
              onClick={() => {
                setShowInfo(!showInfo);
                sounds.playClick();
              }}
              className="p-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10 hover:border-white/30 text-zinc-400 hover:text-white transition cursor-pointer"
              title="Coin Information"
            >
              <Info className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Info Overlay Modal */}
        {showInfo && (
          <div className="absolute inset-x-4 top-16 p-4 rounded-2xl bg-zinc-950/95 backdrop-blur-xl border border-white/15 text-xs text-zinc-300 space-y-2 z-20 shadow-2xl">
            <div className="flex items-center justify-between text-white font-bold">
              <span>★ ANKITH&apos;S NUMISMATIC CREST</span>
              <button
                onClick={() => setShowInfo(false)}
                className="text-zinc-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>
            <p>
              Embossed with Ankit&apos;s personal collector insignia. Honoring an endless journey collecting authentic coinage across 26+ countries starting from age 12.
            </p>
            <div className="flex gap-4 pt-1 font-mono text-[11px] text-zinc-400">
              <span>DIAMETER: 40MM</span>
              <span>WEIGHT: 1 TROY OZ</span>
              <span>GRADE: GEM PROOF</span>
            </div>
          </div>
        )}

        {/* Bottom Floating Interactive Toolbar */}
        <div className="absolute bottom-4 inset-x-4 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
          {/* Flip and Auto-spin Buttons */}
          <div className="flex items-center gap-2 pointer-events-auto">
            <button
              onClick={() => triggerFlip()}
              disabled={isFlipping}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-black font-bold text-xs shadow-md hover:bg-zinc-200 active:scale-95 transition cursor-pointer"
            >
              <Rotate3d className={`w-4 h-4 ${isFlipping ? 'animate-spin' : ''}`} />
              <span>{isFlipping ? 'Flipping Mid-Air...' : 'Flip Coin'}</span>
            </button>

            <button
              onClick={() => {
                setAutoRotate(!autoRotate);
                sounds.playClick();
              }}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono border backdrop-blur-md transition cursor-pointer ${
                autoRotate
                  ? 'bg-white/15 border-white/30 text-white'
                  : 'bg-black/60 border-white/10 text-zinc-400'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{autoRotate ? 'Spin: ON' : 'Spin: OFF'}</span>
            </button>
          </div>

          {/* Material Switcher */}
          <div className="flex items-center gap-1.5 bg-black/70 backdrop-blur-md p-1 rounded-xl border border-white/10 pointer-events-auto">
            {(
              [
                { id: 'gold', label: '24K Gold', color: 'bg-amber-400' },
                { id: 'silver', label: 'Platinum', color: 'bg-slate-300' },
                { id: 'obsidian', label: 'Obsidian', color: 'bg-indigo-600' },
                { id: 'bronze', label: 'Bronze', color: 'bg-amber-700' }
              ] as const
            ).map((mat) => (
              <button
                key={mat.id}
                onClick={() => {
                  setMaterialType(mat.id);
                  sounds.playClick();
                }}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium transition cursor-pointer ${
                  materialType === mat.id
                    ? 'bg-white/20 text-white font-bold shadow'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <span className={`w-2.5 h-2.5 rounded-full ${mat.color}`} />
                <span className="hidden sm:inline">{mat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <p className="mt-2 text-center text-xs text-zinc-400 font-mono">
        💡 Click coin or button to toss mid-air • Drag to inspect in 3D
      </p>
    </div>
  );
};
