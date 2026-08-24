import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { sounds } from '../../utils/audio';

interface AvatarBoy3DProps {
  isHovered: boolean;
  setIsHovered: (v: boolean) => void;
  canvasContainerRef: React.RefObject<HTMLDivElement | null>;
}

export const AvatarBoy3D: React.FC<AvatarBoy3DProps> = ({
  isHovered,
  setIsHovered,
  canvasContainerRef
}) => {
  const headGroupRef = useRef<THREE.Group>(null!);
  const leftEyeGroupRef = useRef<THREE.Group>(null!);
  const rightEyeGroupRef = useRef<THREE.Group>(null!);
  const leftEyelidUpperRef = useRef<THREE.Mesh>(null!);
  const rightEyelidUpperRef = useRef<THREE.Mesh>(null!);
  const leftEyebrowRef = useRef<THREE.Group>(null!);
  const rightEyebrowRef = useRef<THREE.Group>(null!);
  const mouthRef = useRef<THREE.Mesh>(null!);

  const targetPointerRef = useRef({ x: 0, y: 0 });

  const [isWinking, setIsWinking] = useState(false);
  const blinkProgressRef = useRef(0);
  const isBlinkingRef = useRef(false);

  // Full window cursor tracking
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (canvasContainerRef.current) {
        const rect = canvasContainerRef.current.getBoundingClientRect();
        const avatarCenterX = rect.left + rect.width / 2;
        const avatarCenterY = rect.top + rect.height / 2;

        const relX = (e.clientX - avatarCenterX) / (window.innerWidth * 0.45);
        const relY = -(e.clientY - avatarCenterY) / (window.innerHeight * 0.45);

        targetPointerRef.current.x = Math.max(-1.4, Math.min(1.4, relX));
        targetPointerRef.current.y = Math.max(-1.4, Math.min(1.4, relY));
      } else {
        targetPointerRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
        targetPointerRef.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
      }
    };

    const handleGlobalTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0 && canvasContainerRef.current) {
        const touch = e.touches[0];
        const rect = canvasContainerRef.current.getBoundingClientRect();
        const avatarCenterX = rect.left + rect.width / 2;
        const avatarCenterY = rect.top + rect.height / 2;

        const relX = (touch.clientX - avatarCenterX) / (window.innerWidth * 0.45);
        const relY = -(touch.clientY - avatarCenterY) / (window.innerHeight * 0.45);

        targetPointerRef.current.x = Math.max(-1.4, Math.min(1.4, relX));
        targetPointerRef.current.y = Math.max(-1.4, Math.min(1.4, relY));
      }
    };

    window.addEventListener('mousemove', handleGlobalMouseMove, { passive: true });
    window.addEventListener('touchmove', handleGlobalTouchMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('touchmove', handleGlobalTouchMove);
    };
  }, [canvasContainerRef]);

  // Periodic natural blinking
  useEffect(() => {
    let blinkTimer: ReturnType<typeof setTimeout>;
    const scheduleNextBlink = () => {
      const delay = (2.4 + Math.random() * 3.2) * 1000;
      blinkTimer = setTimeout(() => {
        isBlinkingRef.current = true;
        scheduleNextBlink();
      }, delay);
    };

    scheduleNextBlink();
    return () => clearTimeout(blinkTimer);
  }, []);

  const handleAvatarClick = () => {
    sounds.playWarp();
    setIsWinking(true);
    setTimeout(() => setIsWinking(false), 900);
  };

  useFrame((_, delta) => {
    const pointerX = targetPointerRef.current.x;
    const pointerY = targetPointerRef.current.y;

    // 1. Natural Blinking Animation
    if (isBlinkingRef.current) {
      blinkProgressRef.current += delta * 16;
      if (blinkProgressRef.current >= 1) {
        blinkProgressRef.current = 1;
        isBlinkingRef.current = false;
      }
    } else if (blinkProgressRef.current > 0) {
      blinkProgressRef.current = Math.max(0, blinkProgressRef.current - delta * 14);
    }

    const winkScale = isWinking ? 1 : 0;
    const currentLeftBlink = Math.max(blinkProgressRef.current, winkScale);
    const currentRightBlink = blinkProgressRef.current;

    if (leftEyelidUpperRef.current) {
      leftEyelidUpperRef.current.scale.y = THREE.MathUtils.lerp(
        leftEyelidUpperRef.current.scale.y,
        0.05 + currentLeftBlink * 0.98,
        0.35
      );
    }
    if (rightEyelidUpperRef.current) {
      rightEyelidUpperRef.current.scale.y = THREE.MathUtils.lerp(
        rightEyelidUpperRef.current.scale.y,
        0.05 + currentRightBlink * 0.98,
        0.35
      );
    }

    // 2. Smooth Head Tracking (Yaw, Pitch, Roll)
    if (headGroupRef.current) {
      const targetRotY = pointerX * 0.44;
      const targetRotX = -pointerY * 0.32;
      const targetRotZ = -pointerX * 0.07;

      headGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        headGroupRef.current.rotation.y,
        targetRotY,
        0.08
      );
      headGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        headGroupRef.current.rotation.x,
        targetRotX,
        0.08
      );
      headGroupRef.current.rotation.z = THREE.MathUtils.lerp(
        headGroupRef.current.rotation.z,
        targetRotZ,
        0.08
      );

      headGroupRef.current.position.x = THREE.MathUtils.lerp(
        headGroupRef.current.position.x,
        pointerX * 0.2,
        0.06
      );
      headGroupRef.current.position.y = THREE.MathUtils.lerp(
        headGroupRef.current.position.y,
        pointerY * 0.15,
        0.06
      );
    }

    // 3. Spherical Eye & Pupil Rotation
    const eyeMaxAngleY = 0.52;
    const eyeMaxAngleX = 0.42;
    const targetEyeAngleY = Math.max(-eyeMaxAngleY, Math.min(eyeMaxAngleY, pointerX * 0.48));
    const targetEyeAngleX = Math.max(-eyeMaxAngleX, Math.min(eyeMaxAngleX, -pointerY * 0.38));

    if (leftEyeGroupRef.current) {
      leftEyeGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        leftEyeGroupRef.current.rotation.y,
        targetEyeAngleY,
        0.18
      );
      leftEyeGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        leftEyeGroupRef.current.rotation.x,
        targetEyeAngleX,
        0.18
      );
    }

    if (rightEyeGroupRef.current) {
      rightEyeGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        rightEyeGroupRef.current.rotation.y,
        targetEyeAngleY,
        0.18
      );
      rightEyeGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        rightEyeGroupRef.current.rotation.x,
        targetEyeAngleX,
        0.18
      );
    }

    // 4. Eyebrows Reactivity
    const eyebrowLift = isHovered ? 0.05 : (pointerY > 0 ? pointerY * 0.035 : 0);
    if (leftEyebrowRef.current) {
      leftEyebrowRef.current.position.y = THREE.MathUtils.lerp(
        leftEyebrowRef.current.position.y,
        0.36 + eyebrowLift,
        0.12
      );
    }
    if (rightEyebrowRef.current) {
      rightEyebrowRef.current.position.y = THREE.MathUtils.lerp(
        rightEyebrowRef.current.position.y,
        0.36 + eyebrowLift,
        0.12
      );
    }

    // 5. Mouth Smile Expression
    if (mouthRef.current) {
      const targetMouthScale = isWinking ? 1.35 : isHovered ? 1.2 : 1.0;
      mouthRef.current.scale.y = THREE.MathUtils.lerp(
        mouthRef.current.scale.y,
        targetMouthScale,
        0.12
      );
    }
  });

  // Silky Soft Studio Materials (No harsh creases or shade corners)
  const skinMaterial = new THREE.MeshStandardMaterial({
    color: '#f6cbb2',
    roughness: 0.72,
    metalness: 0.02
  });

  const hairMaterial = new THREE.MeshStandardMaterial({
    color: '#1a181b',
    roughness: 0.5,
    metalness: 0.15
  });

  const eyeWhiteMaterial = new THREE.MeshStandardMaterial({
    color: '#ffffff',
    roughness: 0.08,
    metalness: 0.02
  });

  const irisBaseMaterial = new THREE.MeshStandardMaterial({
    color: '#18181b',
    roughness: 0.2,
    metalness: 0.2
  });

  const irisRingMaterial = new THREE.MeshStandardMaterial({
    color: '#3f3f46',
    roughness: 0.3,
    metalness: 0.4
  });

  const pupilMaterial = new THREE.MeshStandardMaterial({
    color: '#000000',
    roughness: 0.05,
    metalness: 0.8
  });

  const catchlightMaterial = new THREE.MeshBasicMaterial({
    color: '#ffffff'
  });

  const glassesFrameMaterial = new THREE.MeshStandardMaterial({
    color: '#27272a',
    roughness: 0.3,
    metalness: 0.7
  });

  const glassesLensMaterial = new THREE.MeshPhysicalMaterial({
    color: '#ffffff',
    transparent: true,
    opacity: 0.12,
    roughness: 0.1,
    metalness: 0.05,
    transmission: 0.95,
    ior: 1.4
  });

  const hoodieBodyMaterial = new THREE.MeshStandardMaterial({
    color: '#09090b',
    roughness: 0.85,
    metalness: 0.05
  });

  const hoodieAccentMaterial = new THREE.MeshStandardMaterial({
    color: '#27272a',
    roughness: 0.7,
    metalness: 0.2
  });

  const blushMaterial = new THREE.MeshStandardMaterial({
    color: '#fb7185',
    transparent: true,
    opacity: 0.14,
    roughness: 0.95
  });

  return (
    <Float speed={2} rotationIntensity={0.12} floatIntensity={0.35}>
      <group
        ref={headGroupRef}
        onPointerOver={() => {
          setIsHovered(true);
          sounds.playHover();
        }}
        onPointerOut={() => setIsHovered(false)}
        onClick={handleAvatarClick}
        position={[0, 0.1, 0]}
      >
        {/* ================= SEAMLESS UNIFIED HEAD SCULPT (64-SEGMENT SMOOTH) ================= */}
        {/* Main Cranium */}
        <mesh material={skinMaterial} position={[0, 0.08, 0]} castShadow>
          <sphereGeometry args={[0.9, 64, 64]} />
        </mesh>

        {/* Seamless Jaw & Cheeks (Matching skin material perfectly) */}
        <mesh material={skinMaterial} position={[0, -0.22, 0.16]}>
          <sphereGeometry args={[0.64, 48, 48]} />
        </mesh>

        {/* Soft Chin Blend */}
        <mesh material={skinMaterial} position={[0, -0.54, 0.36]}>
          <sphereGeometry args={[0.28, 36, 36]} />
        </mesh>

        {/* Soft Feathered Blush on Cheeks */}
        <mesh material={blushMaterial} position={[-0.5, -0.06, 0.68]} rotation={[0, -0.4, 0]}>
          <circleGeometry args={[0.16, 32]} />
        </mesh>
        <mesh material={blushMaterial} position={[0.5, -0.06, 0.68]} rotation={[0, 0.4, 0]}>
          <circleGeometry args={[0.16, 32]} />
        </mesh>

        {/* Cute Smooth Nose (Spherical with smooth bridge) */}
        <mesh material={skinMaterial} position={[0, 0.02, 0.88]}>
          <sphereGeometry args={[0.076, 32, 32]} />
        </mesh>
        <mesh material={skinMaterial} position={[0, 0.08, 0.84]}>
          <sphereGeometry args={[0.055, 24, 24]} />
        </mesh>

        {/* Smooth Organic Ears */}
        <group position={[-0.92, 0.02, -0.05]} rotation={[0, -0.15, 0.12]}>
          <mesh material={skinMaterial}>
            <sphereGeometry args={[0.22, 32, 32]} />
          </mesh>
        </group>

        <group position={[0.92, 0.02, -0.05]} rotation={[0, 0.15, -0.12]}>
          <mesh material={skinMaterial}>
            <sphereGeometry args={[0.22, 32, 32]} />
          </mesh>
        </group>

        {/* ================= 3D ROTATIONAL EYEBALLS (FULL GAZE TRACKING) ================= */}
        {/* Left Eyeball Assembly */}
        <group position={[-0.34, 0.12, 0.7]}>
          <group ref={leftEyeGroupRef}>
            {/* White Sclera Sphere */}
            <mesh material={eyeWhiteMaterial}>
              <sphereGeometry args={[0.2, 48, 48]} />
            </mesh>

            {/* Iris & Pupil on Eyeball Surface */}
            <group position={[0, 0, 0.186]}>
              <mesh material={irisBaseMaterial}>
                <circleGeometry args={[0.12, 36]} />
              </mesh>
              <mesh material={irisRingMaterial} position={[0, 0, 0.003]}>
                <ringGeometry args={[0.07, 0.115, 36]} />
              </mesh>
              <mesh material={pupilMaterial} position={[0, 0, 0.006]}>
                <circleGeometry args={[0.07, 36]} />
              </mesh>
              {/* Specular Catchlights */}
              <mesh material={catchlightMaterial} position={[0.038, 0.038, 0.012]}>
                <circleGeometry args={[0.026, 20]} />
              </mesh>
              <mesh material={catchlightMaterial} position={[-0.032, -0.032, 0.012]}>
                <circleGeometry args={[0.014, 20]} />
              </mesh>
            </group>
          </group>

          {/* Left Upper Eyelid */}
          <mesh
            ref={leftEyelidUpperRef}
            material={skinMaterial}
            position={[0, 0.12, 0.06]}
            scale={[1.05, 0.05, 1.05]}
          >
            <sphereGeometry args={[0.205, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
          </mesh>
        </group>

        {/* Right Eyeball Assembly */}
        <group position={[0.34, 0.12, 0.7]}>
          <group ref={rightEyeGroupRef}>
            {/* White Sclera Sphere */}
            <mesh material={eyeWhiteMaterial}>
              <sphereGeometry args={[0.2, 48, 48]} />
            </mesh>

            {/* Iris & Pupil on Eyeball Surface */}
            <group position={[0, 0, 0.186]}>
              <mesh material={irisBaseMaterial}>
                <circleGeometry args={[0.12, 36]} />
              </mesh>
              <mesh material={irisRingMaterial} position={[0, 0, 0.003]}>
                <ringGeometry args={[0.07, 0.115, 36]} />
              </mesh>
              <mesh material={pupilMaterial} position={[0, 0, 0.006]}>
                <circleGeometry args={[0.07, 36]} />
              </mesh>
              {/* Specular Catchlights */}
              <mesh material={catchlightMaterial} position={[0.038, 0.038, 0.012]}>
                <circleGeometry args={[0.026, 20]} />
              </mesh>
              <mesh material={catchlightMaterial} position={[-0.032, -0.032, 0.012]}>
                <circleGeometry args={[0.014, 20]} />
              </mesh>
            </group>
          </group>

          {/* Right Upper Eyelid */}
          <mesh
            ref={rightEyelidUpperRef}
            material={skinMaterial}
            position={[0, 0.12, 0.06]}
            scale={[1.05, 0.05, 1.05]}
          >
            <sphereGeometry args={[0.205, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
          </mesh>
        </group>

        {/* ================= SMOOTH CURVED EYEBROWS ================= */}
        <group ref={leftEyebrowRef} position={[-0.34, 0.36, 0.78]}>
          <mesh material={hairMaterial} rotation={[0, 0, 0.08]}>
            <capsuleGeometry args={[0.026, 0.24, 12, 24]} />
          </mesh>
        </group>

        <group ref={rightEyebrowRef} position={[0.34, 0.36, 0.78]}>
          <mesh material={hairMaterial} rotation={[0, 0, -0.08]}>
            <capsuleGeometry args={[0.026, 0.24, 12, 24]} />
          </mesh>
        </group>

        {/* ================= SLEEK DESIGNER GLASSES (HIGH-TUBE SMOOTH) ================= */}
        <group position={[0, 0.12, 0.88]}>
          {/* Left Frame Rim */}
          <mesh material={glassesFrameMaterial} position={[-0.34, 0, 0]}>
            <torusGeometry args={[0.23, 0.016, 20, 48]} />
          </mesh>
          {/* Left Lens Glass */}
          <mesh material={glassesLensMaterial} position={[-0.34, 0, 0]}>
            <circleGeometry args={[0.22, 32]} />
          </mesh>

          {/* Right Frame Rim */}
          <mesh material={glassesFrameMaterial} position={[0.34, 0, 0]}>
            <torusGeometry args={[0.23, 0.016, 20, 48]} />
          </mesh>
          {/* Right Lens Glass */}
          <mesh material={glassesLensMaterial} position={[0.34, 0, 0]}>
            <circleGeometry args={[0.22, 32]} />
          </mesh>

          {/* Smooth Bridge Connector */}
          <mesh material={glassesFrameMaterial} position={[0, 0.04, 0]}>
            <capsuleGeometry args={[0.012, 0.22, 8, 16]} />
          </mesh>

          {/* Side Temples (Frame Arms) */}
          <mesh material={glassesFrameMaterial} position={[-0.6, 0.02, -0.4]} rotation={[0, 0.28, 0]}>
            <boxGeometry args={[0.015, 0.015, 0.8]} />
          </mesh>
          <mesh material={glassesFrameMaterial} position={[0.6, 0.02, -0.4]} rotation={[0, -0.28, 0]}>
            <boxGeometry args={[0.015, 0.015, 0.8]} />
          </mesh>
        </group>

        {/* ================= GENTLE SMILING MOUTH ================= */}
        <mesh
          ref={mouthRef}
          position={[0, -0.25, 0.86]}
          rotation={[Math.PI * 0.12, 0, 0]}
        >
          <torusGeometry args={[0.125, 0.02, 16, 36, Math.PI]} />
          <meshStandardMaterial color="#881337" roughness={0.4} />
        </mesh>

        {/* ================= SMOOTH LAYERED DEVELOPER HAIR ================= */}
        {/* Main Hair Volume Dome */}
        <mesh material={hairMaterial} position={[0, 0.44, -0.06]}>
          <sphereGeometry args={[0.95, 48, 48]} />
        </mesh>

        {/* Front Soft Swept Locks (Smooth Capsules & Spheres) */}
        <group position={[0, 0.64, 0.42]}>
          <mesh material={hairMaterial} position={[-0.24, -0.08, 0.32]} rotation={[0.4, 0.26, -0.22]}>
            <capsuleGeometry args={[0.18, 0.35, 16, 24]} />
          </mesh>
          <mesh material={hairMaterial} position={[0.14, -0.03, 0.38]} rotation={[0.3, -0.2, 0.26]}>
            <capsuleGeometry args={[0.2, 0.4, 16, 24]} />
          </mesh>
          <mesh material={hairMaterial} position={[-0.04, 0.06, 0.44]} rotation={[0.48, 0.06, 0]}>
            <capsuleGeometry args={[0.18, 0.36, 16, 24]} />
          </mesh>
          <mesh material={hairMaterial} position={[0.42, -0.12, 0.22]} rotation={[0.2, -0.44, 0.44]}>
            <capsuleGeometry args={[0.16, 0.3, 16, 24]} />
          </mesh>
        </group>

        {/* Side Hair Volumes */}
        <mesh material={hairMaterial} position={[-0.82, 0.22, 0.18]} rotation={[0, 0, 0.26]}>
          <capsuleGeometry args={[0.18, 0.52, 16, 24]} />
        </mesh>
        <mesh material={hairMaterial} position={[0.82, 0.22, 0.18]} rotation={[0, 0, -0.26]}>
          <capsuleGeometry args={[0.18, 0.52, 16, 24]} />
        </mesh>

        {/* Back Head Hair */}
        <mesh material={hairMaterial} position={[0, 0.05, -0.68]}>
          <sphereGeometry args={[0.66, 36, 36]} />
        </mesh>

        {/* ================= CHARACTER BUST & HOODIE ================= */}
        {/* Neck */}
        <mesh material={skinMaterial} position={[0, -0.78, 0]}>
          <cylinderGeometry args={[0.32, 0.36, 0.48, 36]} />
        </mesh>

        {/* Dark Hoodie Body */}
        <mesh material={hoodieBodyMaterial} position={[0, -1.2, 0]}>
          <cylinderGeometry args={[0.85, 1.25, 0.7, 48]} />
        </mesh>

        {/* Sculpted Hoodie Collar Rim */}
        <mesh material={hoodieAccentMaterial} position={[0, -0.92, 0.05]} rotation={[0.2, 0, 0]}>
          <torusGeometry args={[0.46, 0.09, 20, 48]} />
        </mesh>

        {/* Hoodie Drawstrings */}
        <mesh material={glassesFrameMaterial} position={[-0.14, -1.14, 0.45]}>
          <capsuleGeometry args={[0.014, 0.35, 8, 16]} />
        </mesh>
        <mesh material={glassesFrameMaterial} position={[0.14, -1.14, 0.45]}>
          <capsuleGeometry args={[0.014, 0.35, 8, 16]} />
        </mesh>
      </group>
    </Float>
  );
};
