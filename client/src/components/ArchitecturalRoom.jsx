import React, { useRef } from 'react';
import * as THREE from 'three';

export default function ArchitecturalRoom({ scrollProgress = 0 }) {
  // Walls and structural materials
  const travertineMat = new THREE.MeshStandardMaterial({
    color: '#e2ded5',
    roughness: 0.72,
    metalness: 0.08
  });

  const darkConcreteMat = new THREE.MeshStandardMaterial({
    color: '#1e2025',
    roughness: 0.88,
    metalness: 0.12
  });

  const walnutTimberMat = new THREE.MeshStandardMaterial({
    color: '#3d2817',
    roughness: 0.45,
    metalness: 0.05
  });

  const brassTrimMat = new THREE.MeshStandardMaterial({
    color: '#c5a368',
    roughness: 0.28,
    metalness: 0.85
  });

  const glassMat = new THREE.MeshPhysicalMaterial({
    color: '#dbe7ee',
    transparent: true,
    opacity: 0.35,
    roughness: 0.1,
    transmission: 0.9,
    thickness: 0.5
  });

  // Calculate slatted wall presence based on progress
  const slatsOpacity = Math.min(1, Math.max(0, (scrollProgress - 0.1) / 0.3));

  return (
    <group position={[0, 0, 0]}>
      {/* Floor - Travertine Stone Slab Flooring with subtle grid seams */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, -4]} receiveShadow>
        <planeGeometry args={[18, 22]} />
        <primitive object={travertineMat} attach="material" />
      </mesh>

      {/* Decorative brass floor inlay lines */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.99, -4]}>
        <planeGeometry args={[12, 0.04]} />
        <primitive object={brassTrimMat} attach="material" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-3, -1.99, -4]}>
        <planeGeometry args={[0.04, 16]} />
        <primitive object={brassTrimMat} attach="material" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[3, -1.99, -4]}>
        <planeGeometry args={[0.04, 16]} />
        <primitive object={brassTrimMat} attach="material" />
      </mesh>

      {/* Back Wall with large panoramic glass aperture */}
      {/* Top beam */}
      <mesh position={[0, 4.2, -14]} castShadow receiveShadow>
        <boxGeometry args={[18, 1.6, 0.6]} />
        <primitive object={darkConcreteMat} attach="material" />
      </mesh>
      {/* Bottom wall sill */}
      <mesh position={[0, -1.4, -14]} castShadow receiveShadow>
        <boxGeometry args={[18, 1.2, 0.6]} />
        <primitive object={darkConcreteMat} attach="material" />
      </mesh>
      {/* Left pillar */}
      <mesh position={[-7.5, 1.4, -14]} castShadow receiveShadow>
        <boxGeometry args={[3, 4.4, 0.6]} />
        <primitive object={darkConcreteMat} attach="material" />
      </mesh>
      {/* Right pillar */}
      <mesh position={[7.5, 1.4, -14]} castShadow receiveShadow>
        <boxGeometry args={[3, 4.4, 0.6]} />
        <primitive object={darkConcreteMat} attach="material" />
      </mesh>

      {/* Window mullions (charcoal aluminum/steel) */}
      <mesh position={[0, 1.4, -13.9]}>
        <boxGeometry args={[0.1, 4.4, 0.15]} />
        <meshStandardMaterial color="#111" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[-3, 1.4, -13.9]}>
        <boxGeometry args={[0.1, 4.4, 0.15]} />
        <meshStandardMaterial color="#111" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[3, 1.4, -13.9]}>
        <boxGeometry args={[0.1, 4.4, 0.15]} />
        <meshStandardMaterial color="#111" metalness={0.8} roughness={0.3} />
      </mesh>
      {/* Glass Pane */}
      <mesh position={[0, 1.4, -14]}>
        <boxGeometry args={[12, 4.4, 0.05]} />
        <primitive object={glassMat} attach="material" />
      </mesh>

      {/* Exterior garden backdrop plane outside window */}
      <mesh position={[0, 1.5, -16]}>
        <planeGeometry args={[24, 12]} />
        <meshBasicMaterial color="#1c2321" />
      </mesh>
      {/* Subtle garden silhouette trees / greenery blocks */}
      <mesh position={[-4, 0.5, -15.5]}>
        <sphereGeometry args={[1.8, 16, 16]} />
        <meshStandardMaterial color="#1e2e22" roughness={0.9} />
      </mesh>
      <mesh position={[3.5, 0.8, -15.6]}>
        <sphereGeometry args={[2.2, 16, 16]} />
        <meshStandardMaterial color="#18261b" roughness={0.9} />
      </mesh>

      {/* Left Wall - Architectural Fluted Timber Paneling */}
      <mesh position={[-8, 1.5, -4]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[20, 7]} />
        <primitive object={darkConcreteMat} attach="material" />
      </mesh>

      {/* Vertical architectural walnut slats along left wall */}
      {Array.from({ length: 14 }).map((_, i) => (
        <mesh
          key={`slat-${i}`}
          position={[-7.9, 1.5, -10 + i * 0.9]}
          castShadow
        >
          <boxGeometry args={[0.12, 6.8, 0.18]} />
          <primitive object={walnutTimberMat} attach="material" />
        </mesh>
      ))}

      {/* Right Wall - Refined Textured Limestone */}
      <mesh position={[8, 1.5, -4]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[20, 7]} />
        <primitive object={travertineMat} attach="material" />
      </mesh>

      {/* Ceiling with Recessed Architectural Light Cove */}
      <mesh position={[0, 5, -4]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[16, 20]} />
        <primitive object={darkConcreteMat} attach="material" />
      </mesh>

      {/* Ceiling recessed cove lighting strip */}
      <mesh position={[0, 4.95, -4]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.2, 14]} />
        <meshBasicMaterial color="#ffe8cc" />
      </mesh>
      <mesh position={[-4.5, 4.95, -4]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.15, 14]} />
        <meshBasicMaterial color="#ffe8cc" />
      </mesh>
      <mesh position={[4.5, 4.95, -4]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.15, 14]} />
        <meshBasicMaterial color="#ffe8cc" />
      </mesh>

      {/* Baseboards with brass trim reveal */}
      <mesh position={[-7.92, -1.9, -4]}>
        <boxGeometry args={[0.08, 0.2, 20]} />
        <primitive object={brassTrimMat} attach="material" />
      </mesh>
      <mesh position={[7.92, -1.9, -4]}>
        <boxGeometry args={[0.08, 0.2, 20]} />
        <primitive object={brassTrimMat} attach="material" />
      </mesh>
    </group>
  );
}
