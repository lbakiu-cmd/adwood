import React, { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import ArchitecturalRoom from './ArchitecturalRoom.jsx';
import AssemblingFurniture from './AssemblingFurniture.jsx';

// Camera controller with smooth lerping along cinematic waypoints
function CameraRig({ scrollProgress }) {
  const { camera, mouse } = useThree();
  const currentPos = useRef(new THREE.Vector3(0, 3.4, 6.2));
  const currentLookAt = useRef(new THREE.Vector3(0, 0.5, -4.5));

  // Waypoints for camera path
  const waypoints = [
    { progress: 0.0,  pos: [0.0, 3.4, 6.2],   lookAt: [0.0, 0.5, -4.5] },
    { progress: 0.35, pos: [-2.0, 1.4, 2.6],  lookAt: [-1.4, -0.1, -3.5] },
    { progress: 0.70, pos: [1.8, 0.45, 1.2],  lookAt: [0.4, -0.3, -4.2] },
    { progress: 1.0,  pos: [0.0, 0.55, 2.2],  lookAt: [0.0, 0.15, -4.0] }
  ];

  useFrame((state, delta) => {
    let p = Math.max(0, Math.min(1, scrollProgress));
    let segStart = waypoints[0];
    let segEnd = waypoints[waypoints.length - 1];

    for (let i = 0; i < waypoints.length - 1; i++) {
      if (p >= waypoints[i].progress && p <= waypoints[i + 1].progress) {
        segStart = waypoints[i];
        segEnd = waypoints[i + 1];
        break;
      }
    }

    const span = segEnd.progress - segStart.progress;
    const factor = span > 0 ? (p - segStart.progress) / span : 0;
    const easeFactor = factor * factor * (3 - 2 * factor);

    const targetPos = new THREE.Vector3(
      THREE.MathUtils.lerp(segStart.pos[0], segEnd.pos[0], easeFactor),
      THREE.MathUtils.lerp(segStart.pos[1], segEnd.pos[1], easeFactor),
      THREE.MathUtils.lerp(segStart.pos[2], segEnd.pos[2], easeFactor)
    );

    const targetLookAt = new THREE.Vector3(
      THREE.MathUtils.lerp(segStart.lookAt[0], segEnd.lookAt[0], easeFactor),
      THREE.MathUtils.lerp(segStart.lookAt[1], segEnd.lookAt[1], easeFactor),
      THREE.MathUtils.lerp(segStart.lookAt[2], segEnd.lookAt[2], easeFactor)
    );

    // Subtle tactile mouse parallax
    targetPos.x += mouse.x * 0.28;
    targetPos.y += mouse.y * 0.18;

    const lerpSpeed = 4.2 * delta;
    currentPos.current.lerp(targetPos, Math.min(1, lerpSpeed));
    currentLookAt.current.lerp(targetLookAt, Math.min(1, lerpSpeed));

    camera.position.copy(currentPos.current);
    camera.lookAt(currentLookAt.current);
  });

  return null;
}

export default function SceneCanvas({ scrollProgress = 0 }) {
  return (
    <div className="canvas-wrapper">
      <Canvas
        shadows
        camera={{ position: [0, 3.4, 6.2], fov: 40, near: 0.1, far: 50 }}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2
        }}
        dpr={[1, 2]}
      >
        {/* Environment map for rich metallic, glass, and marble reflections */}
        <Environment preset="city" environmentIntensity={0.65} />

        {/* Studio Ambient & Sky Fill */}
        <ambientLight intensity={0.45} color="#f7f2ea" />

        {/* Directional Warm Sunlight through Window */}
        <directionalLight
          position={[-7, 10, 5]}
          intensity={2.2}
          color="#fff4e0"
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-near={0.5}
          shadow-camera-far={26}
          shadow-camera-left={-9}
          shadow-camera-right={9}
          shadow-camera-top={9}
          shadow-camera-bottom={-9}
          shadow-bias={-0.0003}
        />

        {/* Soft Cool Exterior Ambient Sky Light */}
        <directionalLight
          position={[0, 4, -13]}
          intensity={0.7}
          color="#b5c9d6"
        />

        {/* Studio Interior Fill for Furniture Shadows */}
        <pointLight
          position={[3.5, 3.0, -1.5]}
          intensity={10}
          distance={12}
          decay={2}
          color="#ffcca5"
        />

        {/* Grounding Contact Shadows on Floor */}
        <ContactShadows
          position={[0, -1.98, -4.5]}
          opacity={0.75}
          scale={16}
          blur={2.4}
          far={4}
          color="#16120e"
        />

        {/* Architectural 3D Elements */}
        <ArchitecturalRoom scrollProgress={scrollProgress} />
        <AssemblingFurniture scrollProgress={scrollProgress} />

        {/* Camera Scroll Controller */}
        <CameraRig scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}
