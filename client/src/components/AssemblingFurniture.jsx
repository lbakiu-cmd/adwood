import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

// Smooth step function helper
function smoothStep(edge0, edge1, x) {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

export default function AssemblingFurniture({ scrollProgress = 0 }) {
  // Common luxury materials
  const walnutWood = new THREE.MeshStandardMaterial({
    color: '#422a18',
    roughness: 0.4,
    metalness: 0.05
  });

  const brassTrim = new THREE.MeshStandardMaterial({
    color: '#d4af37',
    roughness: 0.25,
    metalness: 0.85
  });

  const travertineMarble = new THREE.MeshStandardMaterial({
    color: '#ede9e1',
    roughness: 0.65,
    metalness: 0.08
  });

  const luxuryFabric = new THREE.MeshStandardMaterial({
    color: '#d8d4cc',
    roughness: 0.88,
    metalness: 0.02
  });

  const darkLeather = new THREE.MeshStandardMaterial({
    color: '#24201d',
    roughness: 0.5,
    metalness: 0.1
  });

  const ceramicMat = new THREE.MeshStandardMaterial({
    color: '#8b8378',
    roughness: 0.7,
    metalness: 0.0
  });

  const wireframeMat = new THREE.MeshBasicMaterial({
    color: '#c5a368',
    wireframe: true,
    transparent: true,
    opacity: 0.4
  });

  // Calculate progressive assembly factors:
  // Phase 1: Lounge Chair (0.10 -> 0.40)
  const chairAssembly = smoothStep(0.08, 0.38, scrollProgress);
  const chairY = -2 + (1 - chairAssembly) * 1.5;
  const chairScale = 0.4 + chairAssembly * 0.6;
  const chairWireframeOpacity = Math.max(0, 0.6 - chairAssembly * 0.7);

  // Phase 2: Travertine & Walnut Coffee Table (0.28 -> 0.60)
  const tableAssembly = smoothStep(0.25, 0.58, scrollProgress);
  const tableSlide = (1 - tableAssembly) * 1.8;
  const tableY = -2 + (1 - tableAssembly) * 1.2;
  const tableScale = 0.5 + tableAssembly * 0.5;

  // Phase 3: Architectural Minimalist Sofa (0.42 -> 0.75)
  const sofaAssembly = smoothStep(0.40, 0.75, scrollProgress);
  const sofaY = -2 + (1 - sofaAssembly) * 2.0;
  const sofaScale = 0.5 + sofaAssembly * 0.5;

  // Phase 4: Wall Credenza & Vases (0.55 -> 0.88)
  const credenzaAssembly = smoothStep(0.55, 0.88, scrollProgress);
  const credenzaSlide = (1 - credenzaAssembly) * 1.4;

  // Phase 5: Brass Chandelier & Ambient Glow (0.70 -> 1.0)
  const chandelierAssembly = smoothStep(0.68, 0.98, scrollProgress);
  const chandelierY = 5 - chandelierAssembly * 2.2;
  const chandelierLightIntensity = chandelierAssembly * 1.6;

  return (
    <group>
      {/* ------------------------------------------------------------- */}
      {/* 1. SCULPTURAL LOUNGE CHAIR & OTTOMAN */}
      {/* ------------------------------------------------------------- */}
      <group
        position={[-2.8, chairY, -3.2]}
        rotation={[0, 0.55, 0]}
        scale={[chairScale, chairScale, chairScale]}
      >
        {/* Chair Seat Base */}
        <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.2, 0.22, 1.2]} />
          <primitive object={chairAssembly > 0.8 ? darkLeather : wireframeMat} attach="material" />
        </mesh>
        {/* Soft Seat Cushion */}
        <mesh position={[0, 0.62, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.1, 0.18, 1.1]} />
          <primitive object={chairAssembly > 0.6 ? luxuryFabric : wireframeMat} attach="material" />
        </mesh>
        {/* Curved Architectural Backrest */}
        <mesh position={[0, 1.15, -0.48]} rotation={[-0.12, 0, 0]} castShadow>
          <boxGeometry args={[1.18, 0.95, 0.18]} />
          <primitive object={chairAssembly > 0.7 ? luxuryFabric : wireframeMat} attach="material" />
        </mesh>
        {/* Armrests */}
        <mesh position={[-0.56, 0.85, -0.05]} castShadow>
          <boxGeometry args={[0.12, 0.45, 0.95]} />
          <primitive object={walnutWood} attach="material" />
        </mesh>
        <mesh position={[0.56, 0.85, -0.05]} castShadow>
          <boxGeometry args={[0.12, 0.45, 0.95]} />
          <primitive object={walnutWood} attach="material" />
        </mesh>
        {/* Slender Brass Legs */}
        {[-0.5, 0.5].map((x, i) =>
          [-0.45, 0.45].map((z, j) => (
            <mesh key={`chair-leg-${i}-${j}`} position={[x, 0.2, z]} castShadow>
              <cylinderGeometry args={[0.025, 0.015, 0.42, 12]} />
              <primitive object={brassTrim} attach="material" />
            </mesh>
          ))
        )}

        {/* Wireframe Blueprint Ghost overlay during construction */}
        {chairAssembly < 0.95 && (
          <mesh position={[0, 0.75, 0]}>
            <boxGeometry args={[1.35, 1.4, 1.35]} />
            <meshBasicMaterial
              color="#cda87a"
              wireframe
              transparent
              opacity={chairWireframeOpacity}
            />
          </mesh>
        )}
      </group>

      {/* ------------------------------------------------------------- */}
      {/* 2. MONOLITHIC TRAVERTINE & WALNUT COFFEE TABLE */}
      {/* ------------------------------------------------------------- */}
      <group
        position={[-0.4, tableY, -4.2]}
        scale={[tableScale, tableScale, tableScale]}
      >
        {/* Main Solid Travertine Block (slides from left) */}
        <mesh
          position={[-0.4 - tableSlide * 0.4, 0.25, 0]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[1.8, 0.45, 1.1]} />
          <primitive object={travertineMarble} attach="material" />
        </mesh>

        {/* Overlapping Walnut Platter (slides from right) */}
        <mesh
          position={[0.7 + tableSlide * 0.6, 0.38, 0.15]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[1.3, 0.12, 0.9]} />
          <primitive object={walnutWood} attach="material" />
        </mesh>

        {/* Brass Support Inset Base */}
        <mesh position={[0.7, 0.16, 0.15]} castShadow>
          <boxGeometry args={[1.1, 0.32, 0.75]} />
          <primitive object={brassTrim} attach="material" />
        </mesh>

        {/* Decorative styling elements that appear when assembled */}
        {tableAssembly > 0.6 && (
          <group position={[-0.5, 0.48, -0.1]}>
            {/* Minimalist Ceramic Vessel */}
            <mesh castShadow position={[0, 0.18, 0]}>
              <cylinderGeometry args={[0.12, 0.08, 0.36, 16]} />
              <primitive object={ceramicMat} attach="material" />
            </mesh>
            {/* Fine architectural monograph book */}
            <mesh castShadow position={[0.5, 0.03, 0.1]} rotation={[0, 0.2, 0]}>
              <boxGeometry args={[0.42, 0.04, 0.3]} />
              <meshStandardMaterial color="#1a1c21" roughness={0.6} />
            </mesh>
          </group>
        )}
      </group>

      {/* ------------------------------------------------------------- */}
      {/* 3. ARCHITECTURAL MODULAR SOFA */}
      {/* ------------------------------------------------------------- */}
      <group
        position={[2.2, sofaY, -5.2]}
        rotation={[0, -0.4, 0]}
        scale={[sofaScale, sofaScale, sofaScale]}
      >
        {/* Floating Walnut Plinth Base */}
        <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
          <boxGeometry args={[3.4, 0.25, 1.4]} />
          <primitive object={walnutWood} attach="material" />
        </mesh>

        {/* Brass Frame Trim along underside */}
        <mesh position={[0, 0.05, 0]}>
          <boxGeometry args={[3.2, 0.08, 1.25]} />
          <primitive object={brassTrim} attach="material" />
        </mesh>

        {/* Main Seat Cushions (Double module) */}
        <mesh position={[-0.78, 0.52, 0.05]} castShadow receiveShadow>
          <boxGeometry args={[1.5, 0.38, 1.15]} />
          <primitive object={luxuryFabric} attach="material" />
        </mesh>
        <mesh position={[0.78, 0.52, 0.05]} castShadow receiveShadow>
          <boxGeometry args={[1.5, 0.38, 1.15]} />
          <primitive object={luxuryFabric} attach="material" />
        </mesh>

        {/* Low Horizontal Backrest */}
        <mesh position={[0, 0.92, -0.45]} castShadow>
          <boxGeometry args={[3.35, 0.55, 0.32]} />
          <primitive object={luxuryFabric} attach="material" />
        </mesh>

        {/* Left Side Bolster / Armrest */}
        <mesh position={[-1.6, 0.78, 0]} castShadow>
          <boxGeometry args={[0.26, 0.42, 1.25]} />
          <primitive object={luxuryFabric} attach="material" />
        </mesh>

        {/* Accent Velvet Pillow */}
        {sofaAssembly > 0.7 && (
          <mesh position={[-1.2, 0.85, -0.28]} rotation={[0.2, 0.3, -0.1]} castShadow>
            <boxGeometry args={[0.48, 0.48, 0.16]} />
            <meshStandardMaterial color="#847158" roughness={0.7} />
          </mesh>
        )}
      </group>

      {/* ------------------------------------------------------------- */}
      {/* 4. WALL-MOUNTED CANTILEVER WALNUT CREDENZA */}
      {/* ------------------------------------------------------------- */}
      <group position={[7.1 + credenzaSlide, -0.4, -4.5]} rotation={[0, -Math.PI / 2, 0]}>
        {/* Cabinet body */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[4.2, 0.75, 0.85]} />
          <primitive object={walnutWood} attach="material" />
        </mesh>
        {/* Slatted texture lines on doors */}
        <mesh position={[0, 0, 0.43]} castShadow>
          <boxGeometry args={[4.1, 0.68, 0.04]} />
          <primitive object={darkLeather} attach="material" />
        </mesh>
        {/* Brass Linear Top Inset */}
        <mesh position={[0, 0.38, 0]}>
          <boxGeometry args={[4.22, 0.03, 0.88]} />
          <primitive object={brassTrim} attach="material" />
        </mesh>

        {/* Art Objects on Credenza */}
        {credenzaAssembly > 0.75 && (
          <group position={[0, 0.55, 0]}>
            {/* Travertine sculptural arch */}
            <mesh position={[-1.2, 0.25, 0]} castShadow>
              <torusGeometry args={[0.25, 0.08, 16, 32, Math.PI]} />
              <primitive object={travertineMarble} attach="material" />
            </mesh>
            {/* Minimalist bronze vase */}
            <mesh position={[1.1, 0.22, 0]} castShadow>
              <cylinderGeometry args={[0.1, 0.14, 0.44, 24]} />
              <primitive object={brassTrim} attach="material" />
            </mesh>
          </group>
        )}
      </group>

      {/* ------------------------------------------------------------- */}
      {/* 5. SUSPENDED BRASS PENDANT CHANDELIER */}
      {/* ------------------------------------------------------------- */}
      <group position={[0, chandelierY, -3.8]}>
        {/* Suspension Cable */}
        <mesh position={[0, 1.6, 0]}>
          <cylinderGeometry args={[0.008, 0.008, 3.2, 8]} />
          <primitive object={brassTrim} attach="material" />
        </mesh>

        {/* Horizontal Brass Architectural Beam */}
        <mesh position={[0, 0, 0]} rotation={[0, 0.3, 0]} castShadow>
          <boxGeometry args={[2.6, 0.06, 0.06]} />
          <primitive object={brassTrim} attach="material" />
        </mesh>

        {/* Frosted Glass Illuminated Spheres */}
        {[-1.0, 0, 1.0].map((offset, idx) => (
          <group key={`bulb-${idx}`} position={[offset * 0.9, -0.15, offset * 0.2]}>
            <mesh castShadow>
              <sphereGeometry args={[0.16, 24, 24]} />
              <meshStandardMaterial
                color="#fff6e8"
                emissive="#ffcc88"
                emissiveIntensity={chandelierLightIntensity * 1.8}
                roughness={0.2}
              />
            </mesh>
            <pointLight
              color="#ffcc88"
              intensity={chandelierLightIntensity * 15}
              distance={6}
              decay={2}
            />
          </group>
        ))}
      </group>
    </group>
  );
}
