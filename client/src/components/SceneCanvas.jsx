import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import ArchitecturalRoom from './ArchitecturalRoom.jsx';
import AssemblingFurniture from './AssemblingFurniture.jsx';

// Camera controller with smooth lerping along waypoints
function CameraRig({ scrollProgress }) {
  const { camera, mouse } = useThree();
  const currentPos = useRef(new THREE.Vector3(0, 3.2, 5.8));
  const currentLookAt = useRef(new THREE.Vector3(0, 0.4, -4.5));

  // Waypoints for camera path
  const waypoints = [
    { progress: 0.0,  pos: [0.0, 3.2, 5.8],   lookAt: [0.0, 0.4, -4.5] },
    { progress: 0.35, pos: [-1.8, 1.3, 2.4],  lookAt: [-1.4, -0.2, -3.5] },
    { progress: 0.70, pos: [1.6, 0.35, 1.0],  lookAt: [0.3, -0.4, -4.2] },
    { progress: 1.0,  pos: [0.0, 0.45, 2.0],  lookAt: [0.0, 0.1, -4.0] }
  ];

  useFrame((state, delta) => {
    // Find surrounding waypoints
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
    // Cubic smoothstep easing between waypoints
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

    // Mouse parallax contribution (subtle)
    targetPos.x += mouse.x * 0.25;
    targetPos.y += mouse.y * 0.18;

    // Smooth lerp (damped)
    const lerpSpeed = 4.5 * delta;
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
        camera={{ position: [0, 3.2, 5.8], fov: 42, near: 0.1, far: 50 }}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.15
        }}
        dpr={[1, 2]}
      >
        {/* Ambient & Studio Fill Lighting */}
        <ambientLight intensity={0.4} color="#f4ede2" />

        {/* Directional Sunbeam through the large window */}
        <directionalLight
          position={[-6, 9, 4]}
          intensity={1.8}
          color="#fff2db"
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-near={0.5}
          shadow-camera-far={25}
          shadow-camera-left={-8}
          shadow-camera-right={8}
          shadow-camera-top={8}
          shadow-camera-bottom={-8}
          shadow-bias={-0.0004}
        />

        {/* Soft Cool Sky Fill from the Garden */}
        <directionalLight
          position={[0, 3, -12]}
          intensity={0.6}
          color="#b0c8d6"
        />

        {/* Interior Accent Warm Fill */}
        <pointLight
          position={[3, 2.5, -2]}
          intensity={8}
          distance={10}
          decay={2}
          color="#ffcca0"
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
