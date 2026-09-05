import * as THREE from 'three';

// Cache generated textures so they are created once
let cachedTextures = null;

export function getArchitecturalTextures() {
  if (cachedTextures) return cachedTextures;

  // 1. Organic American Walnut Texture
  const woodCanvas = document.createElement('canvas');
  woodCanvas.width = 1024;
  woodCanvas.height = 1024;
  const wCtx = woodCanvas.getContext('2d');

  // Base rich dark walnut
  wCtx.fillStyle = '#3a2312';
  wCtx.fillRect(0, 0, 1024, 1024);

  // Wood fibers and grain lines
  for (let i = 0; i < 600; i++) {
    const y = Math.random() * 1024;
    const h = 1 + Math.random() * 3;
    const alpha = 0.05 + Math.random() * 0.15;
    wCtx.fillStyle = i % 2 === 0 ? `rgba(32, 18, 9, ${alpha})` : `rgba(74, 46, 26, ${alpha})`;
    wCtx.beginPath();
    wCtx.moveTo(0, y);
    // Subtle wave distortion
    for (let x = 0; x <= 1024; x += 64) {
      const wave = Math.sin(x * 0.015 + y * 0.01) * 8;
      wCtx.lineTo(x, y + wave);
    }
    wCtx.lineWidth = h;
    wCtx.stroke();
  }

  // Large annual growth rings
  for (let r = 0; r < 5; r++) {
    const cy = 200 + r * 180;
    const grad = wCtx.createRadialGradient(512, cy, 10, 512, cy, 400);
    grad.addColorStop(0, 'rgba(30, 16, 8, 0.25)');
    grad.addColorStop(0.5, 'rgba(65, 40, 22, 0.1)');
    grad.addColorStop(1, 'transparent');
    wCtx.fillStyle = grad;
    wCtx.fillRect(0, 0, 1024, 1024);
  }

  const woodTex = new THREE.CanvasTexture(woodCanvas);
  woodTex.wrapS = THREE.RepeatWrapping;
  woodTex.wrapT = THREE.RepeatWrapping;

  // 2. Travertine / Calacatta Marble Texture
  const marbleCanvas = document.createElement('canvas');
  marbleCanvas.width = 1024;
  marbleCanvas.height = 1024;
  const mCtx = marbleCanvas.getContext('2d');

  // Base warm creamy limestone
  mCtx.fillStyle = '#eae5db';
  mCtx.fillRect(0, 0, 1024, 1024);

  // Soft cloudy depth
  for (let i = 0; i < 18; i++) {
    const x = Math.random() * 1024;
    const y = Math.random() * 1024;
    const rad = 100 + Math.random() * 250;
    const g = mCtx.createRadialGradient(x, y, 10, x, y, rad);
    g.addColorStop(0, 'rgba(215, 206, 192, 0.35)');
    g.addColorStop(1, 'transparent');
    mCtx.fillStyle = g;
    mCtx.beginPath();
    mCtx.arc(x, y, rad, 0, Math.PI * 2);
    mCtx.fill();
  }

  // Marble veining lines
  mCtx.strokeStyle = 'rgba(155, 142, 126, 0.4)';
  mCtx.lineWidth = 2.5;
  for (let v = 0; v < 8; v++) {
    mCtx.beginPath();
    let cx = Math.random() * 1024;
    let cy = Math.random() * 1024;
    mCtx.moveTo(cx, cy);
    for (let s = 0; s < 12; s++) {
      cx += (Math.random() - 0.4) * 120;
      cy += (Math.random() - 0.3) * 120;
      mCtx.lineTo(cx, cy);
    }
    mCtx.stroke();
  }

  const marbleTex = new THREE.CanvasTexture(marbleCanvas);
  marbleTex.wrapS = THREE.RepeatWrapping;
  marbleTex.wrapT = THREE.RepeatWrapping;

  // 3. Bouclé / Textured Fabric
  const fabricCanvas = document.createElement('canvas');
  fabricCanvas.width = 256;
  fabricCanvas.height = 256;
  const fCtx = fabricCanvas.getContext('2d');

  fCtx.fillStyle = '#dedad2';
  fCtx.fillRect(0, 0, 256, 256);

  // High frequency woven micro-nodes
  for (let x = 0; x < 256; x += 4) {
    for (let y = 0; y < 256; y += 4) {
      const val = Math.random() > 0.5 ? 0.08 : -0.08;
      fCtx.fillStyle = val > 0 ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.12)';
      fCtx.fillRect(x, y, 3, 3);
    }
  }

  const fabricTex = new THREE.CanvasTexture(fabricCanvas);
  fabricTex.wrapS = THREE.RepeatWrapping;
  fabricTex.wrapT = THREE.RepeatWrapping;
  fabricTex.repeat.set(8, 8);

  // 4. Parquet / Herringbone Floor Texture
  const floorCanvas = document.createElement('canvas');
  floorCanvas.width = 1024;
  floorCanvas.height = 1024;
  const flCtx = floorCanvas.getContext('2d');

  flCtx.fillStyle = '#2f2015';
  flCtx.fillRect(0, 0, 1024, 1024);

  // Herringbone plank layout
  const plankW = 128;
  const plankH = 32;
  for (let y = 0; y < 1024; y += plankH) {
    for (let x = 0; x < 1024; x += plankW) {
      const shade = (Math.sin(x * 3 + y * 7) * 0.5 + 0.5) * 20;
      const r = Math.floor(48 + shade);
      const g = Math.floor(32 + shade * 0.7);
      const b = Math.floor(20 + shade * 0.5);

      flCtx.fillStyle = `rgb(${r}, ${g}, ${b})`;
      flCtx.fillRect(x, y, plankW - 2, plankH - 2);

      // Micro bevel border shadow
      flCtx.strokeStyle = 'rgba(10, 8, 6, 0.45)';
      flCtx.lineWidth = 1;
      flCtx.strokeRect(x, y, plankW - 2, plankH - 2);
    }
  }

  const floorTex = new THREE.CanvasTexture(floorCanvas);
  floorTex.wrapS = THREE.RepeatWrapping;
  floorTex.wrapT = THREE.RepeatWrapping;
  floorTex.repeat.set(4, 4);

  // 5. Minimalist Wool Area Rug Texture
  const rugCanvas = document.createElement('canvas');
  rugCanvas.width = 512;
  rugCanvas.height = 512;
  const rCtx = rugCanvas.getContext('2d');
  rCtx.fillStyle = '#c8c2b7';
  rCtx.fillRect(0, 0, 512, 512);

  // Subtle ribbed ribbing on rug
  for (let y = 0; y < 512; y += 6) {
    rCtx.fillStyle = y % 12 === 0 ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.08)';
    rCtx.fillRect(0, y, 512, 3);
  }

  const rugTex = new THREE.CanvasTexture(rugCanvas);
  rugTex.wrapS = THREE.RepeatWrapping;
  rugTex.wrapT = THREE.RepeatWrapping;
  rugTex.repeat.set(6, 6);

  cachedTextures = {
    wood: woodTex,
    marble: marbleTex,
    fabric: fabricTex,
    floor: floorTex,
    rug: rugTex
  };

  return cachedTextures;
}
