// 3D Kinetic Rotating Typography Cube Engine (MFM Holy Fire Theme)
(function initKineticCube() {
  const cubeEl = document.getElementById('kinetic-cube');
  const sceneEl = document.getElementById('kinetic-scene');
  if (!cubeEl || typeof gsap === 'undefined') return;

  // Sacred Church Color Gradient Palette
  const colorLayers = [
    // Layer 0: Royal Purple to Fire Orange
    [
      { bg: "linear-gradient(135deg, #4A154B 0%, #2A052E 100%)", text: "#FFD6F8", border: "rgba(246, 175, 239, 0.3)" },
      { bg: "linear-gradient(135deg, #FFB703 0%, #FB8500 100%)", text: "#300033", border: "rgba(255, 255, 255, 0.4)" },
      { bg: "linear-gradient(135deg, #EA580C 0%, #9A3412 100%)", text: "#FFF275", border: "rgba(251, 133, 0, 0.4)" },
      { bg: "linear-gradient(135deg, #6B21A8 0%, #4A154B 100%)", text: "#FFDBCE", border: "rgba(246, 175, 239, 0.3)" }
    ],
    // Layer 1: Sacred Flame Orange & Amber Gold
    [
      { bg: "linear-gradient(135deg, #FB8500 0%, #EA580C 100%)", text: "#FFFFFF", border: "rgba(255, 255, 255, 0.4)" },
      { bg: "linear-gradient(135deg, #581C87 0%, #3B0764 100%)", text: "#FFB95F", border: "rgba(255, 183, 3, 0.4)" },
      { bg: "linear-gradient(135deg, #FFC107 0%, #FF9800 100%)", text: "#370139", border: "rgba(255, 255, 255, 0.5)" },
      { bg: "linear-gradient(135deg, #C2410C 0%, #7C2D12 100%)", text: "#FFE4E6", border: "rgba(253, 101, 30, 0.4)" }
    ],
    // Layer 2: Radiant Incandescent Gold & Purple
    [
      { bg: "linear-gradient(135deg, #7E22CE 0%, #3B0764 100%)", text: "#FEF08A", border: "rgba(254, 240, 138, 0.35)" },
      { bg: "linear-gradient(135deg, #FF9E00 0%, #E85D04 100%)", text: "#FFFFFF", border: "rgba(255, 255, 255, 0.4)" },
      { bg: "linear-gradient(135deg, #300033 0%, #170019 100%)", text: "#FFB599", border: "rgba(246, 175, 239, 0.3)" },
      { bg: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)", text: "#300033", border: "rgba(255, 255, 255, 0.5)" }
    ]
  ];

  const words = [
    ["MONTE DE", "MONTE DE", "MONTE DE", "MONTE DE"],
    ["FOGO &", "FOGO &", "FOGO &", "FOGO &"],
    ["MILAGRES", "MFM • GB", "MILAGRES", "MFM • GB"]
  ];

  function createLayers() {
    const cubeW = cubeEl.offsetWidth || 300;
    const radius = cubeW / 2;

    for (let layerIdx = 0; layerIdx < 3; layerIdx++) {
      const layerEl = document.getElementById(`layer-${layerIdx}`);
      if (!layerEl) continue;
      layerEl.innerHTML = '';

      for (let faceIdx = 0; faceIdx < 4; faceIdx++) {
        const face = document.createElement('div');
        face.className = 'kinetic-face rounded-lg shadow-lg border';
        const styleConfig = colorLayers[layerIdx][faceIdx];
        face.style.background = styleConfig.bg;
        face.style.color = styleConfig.text;
        face.style.borderColor = styleConfig.border;

        // Responsive font sizes
        face.style.fontSize =
          cubeW > 280
            ? (layerIdx === 2 ? '28px' : '32px')
            : (layerIdx === 2 ? '22px' : '26px');

        const rotY = faceIdx * 90;
        face.style.transform = `rotateY(${rotY}deg) translateZ(${radius}px)`;
        face.textContent = words[layerIdx][faceIdx];
        layerEl.appendChild(face);
      }
    }
  }

  createLayers();
  window.addEventListener('resize', createLayers);

  // Initial 3D tilt
  gsap.set(cubeEl, {
    rotationX: -16,
    rotationY: 25,
    rotationZ: 4
  });

  // Independent kinetic rotations for the 3 tiers
  gsap.to("#layer-0", { rotationY: 360, duration: 16, repeat: -1, ease: "none" });
  gsap.to("#layer-1", { rotationY: -360, duration: 13, repeat: -1, ease: "none" });
  gsap.to("#layer-2", { rotationY: 360, duration: 19, repeat: -1, ease: "none" });

  // Gentle global cube bobbing
  gsap.to(cubeEl, {
    rotationX: -8,
    rotationZ: -3,
    duration: 5,
    yoyo: true,
    repeat: -1,
    ease: "sine.inOut"
  });

  // Subtle interactive parallax mouse / touch reaction
  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let currentRotX = -16;
  let currentRotY = 25;

  sceneEl.addEventListener('pointerdown', (e) => {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
  });

  window.addEventListener('pointermove', (e) => {
    if (!isDragging) {
      const rect = sceneEl.getBoundingClientRect();
      const normX = (e.clientX - (rect.left + rect.width / 2)) / rect.width;
      const normY = (e.clientY - (rect.top + rect.height / 2)) / rect.height;
      if (normX >= -1.5 && normX <= 1.5 && normY >= -1.5 && normY <= 1.5) {
        gsap.to(cubeEl, {
          rotationY: currentRotY + normX * 25,
          rotationX: currentRotX - normY * 18,
          duration: 0.8,
          ease: "power1.out",
          overwrite: "auto"
        });
      }
      return;
    }
    const dx = (e.clientX - startX) * 0.4;
    const dy = (e.clientY - startY) * 0.4;
    currentRotY += dx;
    currentRotX = Math.max(-50, Math.min(30, currentRotX - dy));
    gsap.set(cubeEl, { rotationY: currentRotY, rotationX: currentRotX });
    startX = e.clientX;
    startY = e.clientY;
  });

  window.addEventListener('pointerup', () => {
    isDragging = false;
  });
})();