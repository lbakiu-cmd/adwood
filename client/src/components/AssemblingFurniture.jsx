import React, { useMemo } from 'react';
import * as THREE from 'three';
import { getArchitecturalTextures } from './materials.js';

function smoothStep(edge0, edge1, x) {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

export default function AssemblingFurniture({ scrollProgress = 0 }) {
  const textures = useMemo(() => getArchitecturalTextures(), []);

  // Photorealistic PBR Materials
  const walnutWood = useMemo(() => new THREE.MeshStandardMaterial({
    map: textures.wood,
    roughness: 0.38,
    metalness: 0.05
  }), [textures]);

  const calacattaMarble = useMemo(() => new THREE.MeshStandardMaterial({
    map: textures.marble,
    roughness: 0.28,
    metalness: 0.08
  }), [textures]);

  const boucleFabric = useMemo(() => new THREE.MeshStandardMaterial({
    map: textures.fabric,
    roughness: 0.88,
    metalness: 0.02
  }), [textures]);

  const charcoalBoucle = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#2a2c32',
    roughness: 0.9,
    metalness: 0.02
  }), []);

  const champagneBrass = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#d4af37',
    roughness: 0.2,
    metalness: 0.9
  }), []);

  const ceramicVessel = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#a89d91',
    roughness: 0.75,
    metalness: 0.02
  }), []);

  const wireframeMat = useMemo(() => new THREE.MeshBasicMaterial({
    color: '#dfbe93',
    wireframe: true,
    transparent: true,
    opacity: 0.35
  }), []);

  // Assembly Interpolations:
  // Phase 1: Sculptural Lounge Chair & Ottoman (0.08 -> 0.38)
  const chairAssembly = smoothStep(0.08, 0.38, scrollProgress);
  const chairY = -2 + (1 - chairAssembly) * 1.8;
  const chairScale = 0.35 + chairAssembly * 0.65;
  const chairWireOpacity = Math.max(0, 0.6 - chairAssembly * 0.7);

  // Phase 2: Monolithic Marble & Walnut Coffee Table (0.26 -> 0.58)
  const tableAssembly = smoothStep(0.26, 0.58, scrollProgress);
  const tableSlide = (1 - tableAssembly) * 1.6;
  const tableY = -2 + (1 - tableAssembly) * 1.4;
  const tableScale = 0.45 + tableAssembly * 0.55;

  // Phase 3: Architectural Minimalist Sofa & Floor Lamp (0.42 -> 0.74)
  const sofaAssembly = smoothStep(0.42, 0.74, scrollProgress);
  const sofaY = -2 + (1 - sofaAssembly) * 2.2;
  const sofaScale = 0.5 + sofaAssembly * 0.5;

  // Phase 4: Wall-Mounted Cantilever Credenza (0.58 -> 0.88)
  const credenzaAssembly = smoothStep(0.58, 0.88, scrollProgress);
  const credenzaSlide = (1 - credenzaAssembly) * 1.6;

  // Phase 5: Linear Brass Chandelier & Ambient Lighting (0.68 -> 1.0)
  const chandelierAssembly = smoothStep(0.68, 0.98, scrollProgress);
  const chandelierY = 5.2 - chandelierAssembly * 2.3;
  const chandelierGlow = chandelierAssembly * 1.8;

  return (
    <group>
      {/* ------------------------------------------------------------- */}
      {/* 1. SCULPTURAL DESIGNER LOUNGE CHAIR & OTTOMAN */}
      {/* ------------------------------------------------------------- */}
      <group
        position={[-2.8, chairY, -3.2]}
        rotation={[0, 0.65, 0]}
        scale={[chairScale, chairScale, chairScale]}
      >
        {/* Curved Walnut Outer Shell */}
        <mesh position={[0, 0.48, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.25, 0.16, 1.2]} />
          <primitive object={chairAssembly > 0.7 ? walnutWood : wireframeMat} attach="material" />
        </mesh>
        {/* Ergonomic Deep Cushion in Rich Boucle */}
        <mesh position={[0, 0.68, 0.02]} castShadow receiveShadow>
          <boxGeometry args={[1.15, 0.24, 1.1]} />
          <primitive object={chairAssembly > 0.5 ? boucleFabric : wireframeMat} attach="material" />
        </mesh>
        {/* Curved Backrest Shell */}
        <mesh position={[0, 1.25, -0.48]} rotation={[-0.18, 0, 0]} castShadow>
          <boxGeometry args={[1.22, 1.05, 0.14]} />
          <primitive object={chairAssembly > 0.7 ? walnutWood : wireframeMat} attach="material" />
        </mesh>
        {/* Soft Lumbar Back Cushion */}
        <mesh position={[0, 1.22, -0.42]} rotation={[-0.18, 0, 0]} castShadow>
          <boxGeometry args={[1.12, 0.92, 0.16]} />
          <primitive object={chairAssembly > 0.6 ? boucleFabric : wireframeMat} attach="material" />
        </mesh>
        {/* Sculptural Armrests in Solid Walnut */}
        <mesh position={[-0.62, 0.88, -0.06]} castShadow>
          <boxGeometry args={[0.12, 0.42, 0.98]} />
          <primitive object={walnutWood} attach="material" />
        </mesh>
        <mesh position={[0.62, 0.88, -0.06]} castShadow>
          <boxGeometry args={[0.12, 0.42, 0.98]} />
          <primitive object={walnutWood} attach="material" />
        </mesh>
        {/* Brushed Champagne Brass Swivel 4-Star Base */}
        <mesh position={[0, 0.22, 0]} castShadow>
          <cylinderGeometry args={[0.04, 0.05, 0.44, 16]} />
          <primitive object={champagneBrass} attach="material" />
        </mesh>
        {/* Cross feet */}
        <mesh position={[0, 0.03, 0]} castShadow>
          <boxGeometry args={[0.9, 0.04, 0.08]} />
          <primitive object={champagneBrass} attach="material" />
        </mesh>
        <mesh position={[0, 0.03, 0]} rotation={[0, Math.PI / 2, 0]} castShadow>
          <boxGeometry args={[0.9, 0.04, 0.08]} />
          <primitive object={champagneBrass} attach="material" />
        </mesh>

        {/* Matching Ottoman */}
        <group position={[0, 0, 1.3]}>
          <mesh position={[0, 0.42, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.85, 0.14, 0.65]} />
            <primitive object={chairAssembly > 0.7 ? walnutWood : wireframeMat} attach="material" />
          </mesh>
          <mesh position={[0, 0.56, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.8, 0.16, 0.6]} />
            <primitive object={chairAssembly > 0.6 ? boucleFabric : wireframeMat} attach="material" />
          </mesh>
          {/* Ottoman Brass Legs */}
          {[-0.32, 0.32].map((x, i) =>
            [-0.22, 0.22].map((z, j) => (
              <mesh key={`ottoman-leg-${i}-${j}`} position={[x, 0.18, z]} castShadow>
                <cylinderGeometry args={[0.02, 0.015, 0.36, 12]} />
                <primitive object={champagneBrass} attach="material" />
              </mesh>
            ))
          )}
        </group>

        {/* Wireframe Assembly Ghost */}
        {chairAssembly < 0.95 && (
          <mesh position={[0, 0.8, 0.4]}>
            <boxGeometry args={[1.4, 1.5, 2.3]} />
            <meshBasicMaterial
              color="#dfbe93"
              wireframe
              transparent
              opacity={chairWireOpacity}
            />
          </mesh>
        )}
      </group>

      {/* ------------------------------------------------------------- */}
      {/* 2. MONOLITHIC CALACATTA MARBLE & WALNUT COFFEE TABLE */}
      {/* ------------------------------------------------------------- */}
      <group
        position={[-0.4, tableY, -4.2]}
        scale={[tableScale, tableScale, tableScale]}
      >
        {/* Heavy Calacatta Marble Low Monolith (slides from left) */}
        <mesh
          position={[-0.45 - tableSlide * 0.4, 0.26, 0]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[1.9, 0.48, 1.15]} />
          <primitive object={calacattaMarble} attach="material" />
        </mesh>

        {/* Overlapping Floating Walnut Tray Platter (slides from right) */}
        <mesh
          position={[0.75 + tableSlide * 0.5, 0.4, 0.18]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[1.35, 0.12, 0.95]} />
          <primitive object={walnutWood} attach="material" />
        </mesh>

        {/* Recessed Champagne Brass Plinth Foundation */}
        <mesh position={[0.75, 0.17, 0.18]} castShadow>
          <boxGeometry args={[1.15, 0.34, 0.78]} />
          <primitive object={champagneBrass} attach="material" />
        </mesh>

        {/* Styling Objects when assembled */}
        {tableAssembly > 0.65 && (
          <group position={[-0.6, 0.5, -0.1]}>
            {/* Ceramic Architectural Fluted Vessel */}
            <mesh castShadow position={[0, 0.22, 0]}>
              <cylinderGeometry args={[0.13, 0.09, 0.44, 24]} />
              <primitive object={ceramicVessel} attach="material" />
            </mesh>
            {/* Open Monograph Architectural Book */}
            <group position={[0.55, 0.04, 0.15]} rotation={[0, 0.25, 0]}>
              <mesh castShadow>
                <boxGeometry args={[0.48, 0.04, 0.34]} />
                <meshStandardMaterial color="#22242a" roughness={0.6} />
              </mesh>
              {/* White pages */}
              <mesh position={[0, 0.03, 0]}>
                <boxGeometry args={[0.44, 0.02, 0.31]} />
                <meshStandardMaterial color="#f0ebe1" roughness={0.8} />
              </mesh>
            </group>
          </group>
        )}
      </group>

      {/* ------------------------------------------------------------- */}
      {/* 3. ARCHITECTURAL MODULAR SECTIONAL SOFA & ARCHED FLOOR LAMP */}
      {/* ------------------------------------------------------------- */}
      <group
        position={[2.4, sofaY, -5.2]}
        rotation={[0, -0.38, 0]}
        scale={[sofaScale, sofaScale, sofaScale]}
      >
        {/* Floating Solid Walnut Base Frame */}
        <mesh position={[0, 0.22, 0]} castShadow receiveShadow>
          <boxGeometry args={[3.8, 0.26, 1.45]} />
          <primitive object={walnutWood} attach="material" />
        </mesh>

        {/* Recessed Brass Shadow Line Plinth */}
        <mesh position={[0, 0.05, 0]}>
          <boxGeometry args={[3.5, 0.09, 1.3]} />
          <primitive object={champagneBrass} attach="material" />
        </mesh>

        {/* Left Modular Seat Cushion */}
        <mesh position={[-0.92, 0.56, 0.06]} castShadow receiveShadow>
          <boxGeometry args={[1.75, 0.42, 1.2]} />
          <primitive object={boucleFabric} attach="material" />
        </mesh>

        {/* Right Modular Seat Cushion */}
        <mesh position={[0.92, 0.56, 0.06]} castShadow receiveShadow>
          <boxGeometry args={[1.75, 0.42, 1.2]} />
          <primitive object={boucleFabric} attach="material" />
        </mesh>

        {/* Horizontal Low Architectural Backrest */}
        <mesh position={[0, 0.98, -0.48]} castShadow>
          <boxGeometry args={[3.75, 0.6, 0.34]} />
          <primitive object={boucleFabric} attach="material" />
        </mesh>

        {/* Left Side Bolster Armrest */}
        <mesh position={[-1.75, 0.82, 0.06]} castShadow>
          <boxGeometry args={[0.28, 0.44, 1.28]} />
          <primitive object={boucleFabric} attach="material" />
        </mesh>

        {/* Accent Velvet Pillow */}
        {sofaAssembly > 0.7 && (
          <mesh position={[-1.3, 0.92, -0.28]} rotation={[0.22, 0.35, -0.1]} castShadow>
            <boxGeometry args={[0.52, 0.52, 0.18]} />
            <primitive object={charcoalBoucle} attach="material" />
          </mesh>
        )}

        {/* Architectural Arched Brass Floor Lamp behind sofa */}
        <group position={[2.1, 0, -0.6]}>
          {/* Heavy Travertine Cylindrical Base */}
          <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.22, 0.24, 0.5, 24]} />
            <primitive object={calacattaMarble} attach="material" />
          </mesh>
          {/* Arched Slender Brass Rod */}
          <mesh position={[-0.4, 2.4, 0.3]} rotation={[0, 0, -0.25]} castShadow>
            <cylinderGeometry args={[0.015, 0.015, 3.8, 12]} />
            <primitive object={champagneBrass} attach="material" />
          </mesh>
          {/* Spun Brass Lamp Dome Shade */}
          <group position={[-1.2, 3.4, 0.8]} rotation={[0.3, 0, 0]}>
            <mesh castShadow>
              <sphereGeometry args={[0.28, 24, 24, 0, Math.PI * 2, 0, Math.PI / 2]} />
              <primitive object={champagneBrass} attach="material" />
            </mesh>
            {/* Glowing Bulb */}
            <mesh position={[0, 0.05, 0]}>
              <sphereGeometry args={[0.1, 16, 16]} />
              <meshBasicMaterial color="#ffeacc" />
            </mesh>
            {/* Soft Warm Downlight onto Seating */}
            <spotLight
              position={[0, 0, 0]}
              target-position={[0, -4, 0]}
              angle={0.6}
              penumbra={0.8}
              intensity={sofaAssembly * 12}
              color="#ffe5be"
              distance={6}
              decay={2}
            />
          </group>
        </group>
      </group>

      {/* ------------------------------------------------------------- */}
      {/* 4. WALL-MOUNTED CANTILEVER WALNUT CREDENZA */}
      {/* ------------------------------------------------------------- */}
      <group position={[7.1 + credenzaSlide, -0.4, -4.5]} rotation={[0, -Math.PI / 2, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[4.4, 0.8, 0.9]} />
          <primitive object={walnutWood} attach="material" />
        </mesh>
        {/* Slatted door reveal lines */}
        <mesh position={[0, 0, 0.46]} castShadow>
          <boxGeometry args={[4.28, 0.72, 0.04]} />
          <primitive object={charcoalBoucle} attach="material" />
        </mesh>
        {/* Polished Marble Top Platter */}
        <mesh position={[0, 0.42, 0]} castShadow>
          <boxGeometry args={[4.45, 0.04, 0.94]} />
          <primitive object={calacattaMarble} attach="material" />
        </mesh>

        {/* Sculptures on Credenza */}
        {credenzaAssembly > 0.75 && (
          <group position={[0, 0.6, 0]}>
            <mesh position={[-1.3, 0.28, 0]} castShadow>
              <torusGeometry args={[0.28, 0.09, 16, 32, Math.PI]} />
              <primitive object={calacattaMarble} attach="material" />
            </mesh>
            <mesh position={[1.2, 0.24, 0]} castShadow>
              <cylinderGeometry args={[0.11, 0.16, 0.48, 24]} />
              <primitive object={champagneBrass} attach="material" />
            </mesh>
          </group>
        )}
      </group>

      {/* ------------------------------------------------------------- */}
      {/* 5. SUSPENDED BRASS & FROSTED OPAL CHANDELIER */}
      {/* ------------------------------------------------------------- */}
      <group position={[0, chandelierY, -3.8]}>
        {/* Slender Brass Suspension Cables */}
        {[-0.8, 0.8].map((x, idx) => (
          <mesh key={`cable-${idx}`} position={[x, 1.6, 0]}>
            <cylinderGeometry args={[0.006, 0.006, 3.2, 8]} />
            <primitive object={champagneBrass} attach="material" />
          </mesh>
        ))}

        {/* Architectural Horizontal Brass Rod */}
        <mesh position={[0, 0, 0]} rotation={[0, 0.28, 0]} castShadow>
          <boxGeometry args={[2.8, 0.05, 0.05]} />
          <primitive object={champagneBrass} attach="material" />
        </mesh>

        {/* Frosted Opal Glass Glowing Globes */}
        {[-1.1, -0.3, 0.5, 1.2].map((offset, idx) => (
          <group key={`globe-${idx}`} position={[offset * 0.85, -0.18, offset * 0.18]}>
            <mesh castShadow>
              <sphereGeometry args={[0.15, 24, 24]} />
              <meshStandardMaterial
                color="#fff8ed"
                emissive="#ffcd8a"
                emissiveIntensity={chandelierGlow * 2.2}
                roughness={0.15}
              />
            </mesh>
            <pointLight
              color="#ffc87a"
              intensity={chandelierGlow * 16}
              distance={7}
              decay={2}
            />
          </group>
        ))}
      </group>
    </group>
  );
}
