import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { getArchitecturalTextures } from './materials.js';

export default function ArchitecturalRoom({ scrollProgress = 0 }) {
  const textures = useMemo(() => getArchitecturalTextures(), []);
  const fireGlowRef = useRef();

  // Animated fireplace flicker
  useFrame((state) => {
    if (fireGlowRef.current) {
      const t = state.clock.getElapsedTime();
      fireGlowRef.current.intensity = 3.5 + Math.sin(t * 12) * 0.8 + Math.cos(t * 18) * 0.5;
    }
  });

  // Materials using procedural high-res textures
  const floorMat = useMemo(() => new THREE.MeshStandardMaterial({
    map: textures.floor,
    roughness: 0.38,
    metalness: 0.08,
  }), [textures]);

  const rugMat = useMemo(() => new THREE.MeshStandardMaterial({
    map: textures.rug,
    roughness: 0.92,
    metalness: 0.0,
  }), [textures]);

  const walnutMat = useMemo(() => new THREE.MeshStandardMaterial({
    map: textures.wood,
    roughness: 0.42,
    metalness: 0.04,
  }), [textures]);

  const limestoneMat = useMemo(() => new THREE.MeshStandardMaterial({
    map: textures.marble,
    roughness: 0.65,
    metalness: 0.06,
  }), [textures]);

  const darkConcreteMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#1a1c21',
    roughness: 0.82,
    metalness: 0.12,
  }), []);

  const brassTrimMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#d6b377',
    roughness: 0.22,
    metalness: 0.9,
  }), []);

  const glassMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#eef5f8',
    transparent: true,
    opacity: 0.28,
    roughness: 0.05,
    transmission: 0.94,
    thickness: 0.8,
    ior: 1.52,
  }), []);

  return (
    <group position={[0, 0, 0]}>
      {/* ------------------------------------------------------------- */}
      {/* 1. FLOOR & LIVING AREA RUG */}
      {/* ------------------------------------------------------------- */}
      {/* Herringbone Hardwood Floor with soft specular reflection */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, -4]} receiveShadow>
        <planeGeometry args={[20, 24]} />
        <primitive object={floorMat} attach="material" />
      </mesh>

      {/* Large Custom Wool Living Area Rug under seating zone */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0.2, -1.98, -4.5]} receiveShadow>
        <planeGeometry args={[9.5, 7.5]} />
        <primitive object={rugMat} attach="material" />
      </mesh>

      {/* Decorative Champagne Brass Floor Inlay Strips */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.97, -4.5]}>
        <planeGeometry args={[9.52, 0.04]} />
        <primitive object={brassTrimMat} attach="material" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.97, -0.75]}>
        <planeGeometry args={[9.52, 0.04]} />
        <primitive object={brassTrimMat} attach="material" />
      </mesh>

      {/* ------------------------------------------------------------- */}
      {/* 2. BACK WALL & PANORAMIC GLASS APERTURE */}
      {/* ------------------------------------------------------------- */}
      {/* Top lintel beam */}
      <mesh position={[0, 4.3, -14]} castShadow receiveShadow>
        <boxGeometry args={[20, 1.8, 0.7]} />
        <primitive object={darkConcreteMat} attach="material" />
      </mesh>
      {/* Bottom window sill / low wall */}
      <mesh position={[0, -1.4, -14]} castShadow receiveShadow>
        <boxGeometry args={[20, 1.2, 0.7]} />
        <primitive object={darkConcreteMat} attach="material" />
      </mesh>
      {/* Left structural pillar */}
      <mesh position={[-8.5, 1.4, -14]} castShadow receiveShadow>
        <boxGeometry args={[3, 4.4, 0.7]} />
        <primitive object={darkConcreteMat} attach="material" />
      </mesh>
      {/* Right structural pillar */}
      <mesh position={[8.5, 1.4, -14]} castShadow receiveShadow>
        <boxGeometry args={[3, 4.4, 0.7]} />
        <primitive object={darkConcreteMat} attach="material" />
      </mesh>

      {/* Window mullions (matte dark aluminum with subtle chamfer) */}
      {[-4.5, -1.5, 1.5, 4.5].map((x, i) => (
        <mesh key={`mullion-${i}`} position={[x, 1.4, -13.9]} castShadow>
          <boxGeometry args={[0.08, 4.4, 0.2]} />
          <meshStandardMaterial color="#14161a" roughness={0.4} metalness={0.8} />
        </mesh>
      ))}

      {/* Architectural Panoramic Glass */}
      <mesh position={[0, 1.4, -14]}>
        <boxGeometry args={[14, 4.4, 0.06]} />
        <primitive object={glassMat} attach="material" />
      </mesh>

      {/* Outdoor Garden Vista Backdrop (Layered greenery with mist) */}
      <mesh position={[0, 2, -18]}>
        <planeGeometry args={[30, 16]} />
        <meshBasicMaterial color="#1a2420" />
      </mesh>
      {/* Garden foliage silhouettes */}
      <mesh position={[-5, 0.6, -16.5]}>
        <sphereGeometry args={[2.5, 24, 24]} />
        <meshStandardMaterial color="#1e3025" roughness={0.9} />
      </mesh>
      <mesh position={[4.5, 1.2, -16.8]}>
        <sphereGeometry args={[3.2, 24, 24]} />
        <meshStandardMaterial color="#18281e" roughness={0.9} />
      </mesh>
      <mesh position={[0.5, 0.2, -16]}>
        <sphereGeometry args={[1.8, 20, 20]} />
        <meshStandardMaterial color="#223b2c" roughness={0.9} />
      </mesh>

      {/* ------------------------------------------------------------- */}
      {/* 3. INDOOR ARCHITECTURAL SCULPTURAL TREE (Next to Window) */}
      {/* ------------------------------------------------------------- */}
      <group position={[-5.8, -2, -10]}>
        {/* Fluted Minimalist Terracotta Planter */}
        <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.65, 0.48, 1.2, 32]} />
          <meshStandardMaterial color="#826b58" roughness={0.7} />
        </mesh>
        {/* Planter Soil */}
        <mesh position={[0, 1.18, 0]}>
          <cylinderGeometry args={[0.62, 0.62, 0.05, 32]} />
          <meshStandardMaterial color="#211710" roughness={0.95} />
        </mesh>
        {/* Organic Curved Trunk */}
        <mesh position={[0, 2.0, 0]} rotation={[0.08, 0, 0.1]} castShadow>
          <cylinderGeometry args={[0.07, 0.12, 1.8, 16]} />
          <meshStandardMaterial color="#4a3628" roughness={0.8} />
        </mesh>
        {/* Foliage Clusters */}
        <mesh position={[0.2, 3.1, 0.1]} castShadow>
          <sphereGeometry args={[0.85, 16, 16]} />
          <meshStandardMaterial color="#2d4233" roughness={0.75} />
        </mesh>
        <mesh position={[-0.3, 2.7, -0.2]} castShadow>
          <sphereGeometry args={[0.65, 16, 16]} />
          <meshStandardMaterial color="#364e3c" roughness={0.75} />
        </mesh>
        <mesh position={[0.4, 2.6, 0.3]} castShadow>
          <sphereGeometry args={[0.55, 16, 16]} />
          <meshStandardMaterial color="#26382b" roughness={0.75} />
        </mesh>
      </group>

      {/* ------------------------------------------------------------- */}
      {/* 4. LEFT WALL: FLUTED AMERICAN WALNUT MILLWORK */}
      {/* ------------------------------------------------------------- */}
      <mesh position={[-8.5, 1.5, -4]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[20, 7]} />
        <primitive object={walnutMat} attach="material" />
      </mesh>

      {/* Vertical Acoustic Walnut Slats with brass shadow reveals */}
      {Array.from({ length: 18 }).map((_, i) => (
        <mesh
          key={`slat-${i}`}
          position={[-8.42, 1.5, -12 + i * 0.9]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[0.12, 6.9, 0.18]} />
          <primitive object={walnutMat} attach="material" />
        </mesh>
      ))}

      {/* ------------------------------------------------------------- */}
      {/* 5. RIGHT WALL: HONED LIMESTONE & LINEAR BIOETHANOL FIREPLACE */}
      {/* ------------------------------------------------------------- */}
      <mesh position={[8.5, 1.5, -4]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[20, 7]} />
        <primitive object={limestoneMat} attach="material" />
      </mesh>

      {/* Architectural Cantilevered Fireplace Hearth */}
      <group position={[8.0, -1.0, -4.5]} rotation={[0, -Math.PI / 2, 0]}>
        {/* Fireplace Niche Box */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[4.8, 1.4, 0.9]} />
          <primitive object={darkConcreteMat} attach="material" />
        </mesh>
        {/* Inner fire cavity */}
        <mesh position={[0, 0.05, 0.28]}>
          <boxGeometry args={[3.6, 0.55, 0.45]} />
          <meshStandardMaterial color="#0b0c0e" roughness={0.9} />
        </mesh>
        {/* Linear bioethanol burner slit */}
        <mesh position={[0, -0.15, 0.35]}>
          <boxGeometry args={[3.2, 0.04, 0.08]} />
          <primitive object={brassTrimMat} attach="material" />
        </mesh>
        {/* Glowing Ember Flame Plane */}
        <mesh position={[0, -0.05, 0.35]}>
          <planeGeometry args={[3.0, 0.22]} />
          <meshBasicMaterial color="#ff7a18" transparent opacity={0.85} />
        </mesh>
        {/* Dynamic Warm Ambient Light from Flame */}
        <pointLight
          ref={fireGlowRef}
          position={[0, 0.2, 0.6]}
          color="#ff8d36"
          intensity={4.0}
          distance={8}
          decay={2}
        />
      </group>

      {/* ------------------------------------------------------------- */}
      {/* 6. CEILING & RECESSED ARCHITECTURAL LIGHTING */}
      {/* ------------------------------------------------------------- */}
      <mesh position={[0, 5, -4]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[18, 22]} />
        <primitive object={darkConcreteMat} attach="material" />
      </mesh>

      {/* Recessed Warm LED Cove Light Strip (Center + Perimeter) */}
      <mesh position={[0, 4.96, -4]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.22, 16]} />
        <meshBasicMaterial color="#fff3db" />
      </mesh>
      <mesh position={[-6.0, 4.96, -4]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.15, 16]} />
        <meshBasicMaterial color="#fff3db" />
      </mesh>
      <mesh position={[6.0, 4.96, -4]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.15, 16]} />
        <meshBasicMaterial color="#fff3db" />
      </mesh>

      {/* Architectural Downlight Grazers on Left Timber Wall */}
      <spotLight
        position={[-7.5, 4.8, -4]}
        target-position={[-8.4, 0, -4]}
        angle={0.65}
        penumbra={0.8}
        intensity={18}
        color="#ffe3b8"
        distance={10}
        decay={2}
      />
    </group>
  );
}
