/**
 * THE AURELIA ESTATE - INTERACTIVE LOGIC & ANIMATION ENGINE
 * Features:
 * 1. Lenis Inertial Smooth Scrolling
 * 2. GSAP Multiplane 3D Pinned Scrubbed Hero
 * 3. Mouse Tilt & Parallax Physics Loop
 * 4. Scroll-Triggered Editorial Word Illumination
 * 5. Spatial Floorplan Switcher & Hotspots
 * 6. Synthesized Coastal Breeze & Surf Web Audio Engine
 * 7. Private Viewing Modal Drawer
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lenis Smooth Scroll
  const lenis = new Lenis({
    duration: 1.4,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential luxury easing
    orientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 0.9,
  });

  // Connect Lenis to GSAP ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  // 2. Custom Cursor Follower
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let followerX = mouseX;
  let followerY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (cursor) {
      cursor.style.left = `${mouseX}px`;
      cursor.style.top = `${mouseY}px`;
    }
  });

  // Cursor hover expansions
  const hoverTargets = document.querySelectorAll('a, button, .hotspot, .space-card, .acc-header');
  hoverTargets.forEach((target) => {
    target.addEventListener('mouseenter', () => {
      if (follower) {
        follower.style.width = '64px';
        follower.style.height = '64px';
        follower.style.borderColor = 'rgba(197, 168, 128, 0.8)';
      }
    });
    target.addEventListener('mouseleave', () => {
      if (follower) {
        follower.style.width = '36px';
        follower.style.height = '36px';
        follower.style.borderColor = 'rgba(197, 168, 128, 0.4)';
      }
    });
  });

  // 3. GSAP Multiplane Arrival Hero Timeline
  gsap.registerPlugin(ScrollTrigger);

  const isMobile = window.innerWidth <= 768;

  const heroTl = gsap.timeline({
    scrollTrigger: {
      trigger: '#heroTrack',
      start: 'top top',
      end: isMobile ? '+=110%' : '+=180%',
      pin: '#heroViewport',
      pinSpacing: true,
      scrub: isMobile ? 0.7 : 1.1,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });

  // Scrubbed layer choreography
  heroTl
    // Phase 1: Foreground framing columns & olive trees expand outward past the camera
    .to('.layer-foreground-frame', { scale: 1.5, opacity: 0, ease: 'none' }, 0)

    // Phase 1: Villa architecture pulls closer into view
    .to('.layer-villa', { scale: 1.25, y: -20, ease: 'none' }, 0)

    // Phase 1: Horizon ocean & distant mountains remain steady
    .to('.layer-horizon', { scale: 1.04, y: -8, ease: 'none' }, 0)
    .to('.layer-sky', { y: -15, ease: 'none' }, 0)

    // Keep hero text ("Where Architecture Meets Horizon" + "A sculptural sanctuary...")
    // fully legible initially, then fade out gently as camera pushes in
    .to('#heroOverlay', { opacity: 0, y: -50, filter: 'blur(5px)', duration: 0.35, ease: 'power2.inOut' }, 0.22)

    // Phase 2: Reveal the Pinned Luxury Property Metric Deck
    .fromTo(
      '#heroSpecsDeck',
      { opacity: 0, y: 35 },
      { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' },
      0.45
    )

    // Phase 3: Hold specs briefly, then gently exit as next section glides up
    .to('#heroSpecsDeck', { opacity: 0, y: -25, duration: 0.22, ease: 'power2.in' }, 0.82)
    .to('.multiplane-scene', { scale: 1.05, filter: 'brightness(0.72)', ease: 'none' }, 0.8);

  // 4. Interactive Mouse Parallax & Gyro Physics Loop
  let targetNormX = 0;
  let targetNormY = 0;
  let currentNormX = 0;
  let currentNormY = 0;

  window.addEventListener('mousemove', (e) => {
    // Range: -1 (left/top) to +1 (right/bottom)
    targetNormX = (e.clientX / window.innerWidth - 0.5) * 2;
    targetNormY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  const flareDiscs = document.querySelectorAll('.flare-disc');
  const depthLayers = document.querySelectorAll('.layer[data-depth]');

  function physicsLoop() {
    // Smooth lerp damping for mouse
    currentNormX += (targetNormX - currentNormX) * 0.04;
    currentNormY += (targetNormY - currentNormY) * 0.04;

    // Follower cursor lerp
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    if (follower) {
      follower.style.left = `${followerX}px`;
      follower.style.top = `${followerY}px`;
    }

    // Apply differential parallax shift to depth layers
    depthLayers.forEach((layer) => {
      const depth = parseFloat(layer.getAttribute('data-depth')) || 0;
      const offsetX = currentNormX * depth * 70;
      const offsetY = currentNormY * depth * 40;
      layer.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0)`;
    });

    // 3D Lens Flare rotation
    flareDiscs.forEach((disc, i) => {
      const mult = (i + 1) * 12;
      disc.style.transform = `translate3d(${currentNormX * mult}px, ${currentNormY * mult}px, ${mult * 10}px)`;
    });

    requestAnimationFrame(physicsLoop);
  }
  physicsLoop();

  // 5. Editorial Word-by-Word Scroll Illumination
  const scrubStatement = document.getElementById('scrubStatement');
  if (scrubStatement) {
    const rawText = scrubStatement.innerText.trim();
    const words = rawText.split(/\s+/);
    scrubStatement.innerHTML = words
      .map((word) => `<span class="statement-word">${word} </span>`)
      .join('');

    const wordSpans = scrubStatement.querySelectorAll('.statement-word');

    gsap.fromTo(
      wordSpans,
      { color: 'rgba(142, 149, 160, 0.25)' },
      {
        color: '#f4f2ed',
        stagger: 0.05,
        ease: 'none',
        scrollTrigger: {
          trigger: '#philosophy',
          start: 'top 75%',
          end: 'bottom 45%',
          scrub: true,
        },
      }
    );
  }

  // 6. Interactive Spatial Floorplan Switcher
  const floorData = {
    level1: {
      name: 'Level 01 • Main Pavilion & Pool',
      text: 'Designed for effortless indoor-outdoor flow, Level 01 connects the arrival motor court with the primary living room, outdoor dining pavilion, and 110-foot horizon pool.',
      gross: '6,400 Sq. Ft.',
      clearance: "14' – 22' Vaulted",
      terraces: '3,800 Sq. Ft.',
      hotspots: [
        { top: '40%', left: '35%', title: 'Grand Salon', desc: 'Double-height glass pavilion' },
        { top: '65%', left: '60%', title: 'Zero-Edge Pool', desc: '110-ft cantilevered lap pool' },
        { top: '30%', left: '70%', title: 'Chef Kitchen', desc: 'Paonazzo marble culinary studio' },
      ],
    },
    level2: {
      name: 'Level 02 • Private Suites & Decks',
      text: 'The upper level is dedicated to ultimate privacy. The primary cantilevered wing floats over the Pacific, accompanied by five junior en-suites each featuring private terraces.',
      gross: '3,600 Sq. Ft.',
      clearance: "11' High Ceilings",
      terraces: '1,400 Sq. Ft.',
      hotspots: [
        { top: '35%', left: '40%', title: 'Master Sanctuary', desc: 'Floating corner glass bedroom' },
        { top: '45%', left: '75%', title: 'Sunset Deck', desc: 'Private rooftop firepit' },
        { top: '60%', left: '25%', title: 'En-Suite Gallery', desc: 'Guest wing with courtyard views' },
      ],
    },
    level3: {
      name: 'Sub-Level • Wellness & Cellar Vault',
      text: 'Excavated directly into the cliff stone, this subterranean retreat features a European hydrotherapy spa, cedar Finnish sauna, private screening theater, and a 1,200-bottle tasting room.',
      gross: '1,200 Sq. Ft.',
      clearance: "12' Board-Form Concrete",
      terraces: 'Sunken Zen Atrium',
      hotspots: [
        { top: '45%', left: '50%', title: 'Wine Sanctuary', desc: '1,200-bottle climate chamber' },
        { top: '35%', left: '25%', title: 'Thermal Spa', desc: 'Cedar sauna & cold-plunge pools' },
        { top: '60%', left: '70%', title: 'Cinema Salon', desc: 'Acoustically tuned 12-seat theater' },
      ],
    },
  };

  const floorTabs = document.querySelectorAll('.floor-tab');
  const floorDetails = document.getElementById('floorDetails');
  const blueprintCanvas = document.getElementById('blueprintCanvas');

  function updateFloor(floorKey) {
    const data = floorData[floorKey];
    if (!data) return;

    // Fade out details slightly
    gsap.to(floorDetails, {
      opacity: 0.3,
      duration: 0.15,
      onComplete: () => {
        floorDetails.querySelector('.floor-name').textContent = data.name;
        floorDetails.querySelector('.floor-text').textContent = data.text;
        const metrics = floorDetails.querySelectorAll('.floor-metrics strong');
        if (metrics[0]) metrics[0].textContent = data.gross;
        if (metrics[1]) metrics[1].textContent = data.clearance;
        if (metrics[2]) metrics[2].textContent = data.terraces;
        gsap.to(floorDetails, { opacity: 1, duration: 0.25 });
      },
    });

    // Update Hotspots
    const existingPins = blueprintCanvas.querySelectorAll('.hotspot');
    existingPins.forEach((pin) => pin.remove());

    data.hotspots.forEach((spot) => {
      const pin = document.createElement('div');
      pin.className = 'hotspot';
      pin.style.top = spot.top;
      pin.style.left = spot.left;
      pin.innerHTML = `
        <span class="hotspot-pulse"></span>
        <span class="hotspot-dot"></span>
        <span class="hotspot-tag">${spot.title}</span>
      `;
      blueprintCanvas.appendChild(pin);

      pin.addEventListener('click', () => {
        alert(`${spot.title}: ${spot.desc}`);
      });
    });
  }

  floorTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      floorTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      const floorKey = tab.getAttribute('data-floor');
      updateFloor(floorKey);
    });
  });

  // 7. Materiality Accordion
  const accHeaders = document.querySelectorAll('.acc-header');
  accHeaders.forEach((header) => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isActive = item.classList.contains('active');

      // Close all
      document.querySelectorAll('.acc-item').forEach((i) => i.classList.remove('active'));

      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // 8. Private Viewing Modal Triggers
  const modal = document.getElementById('inquireModal');
  const openInquireBtn = document.getElementById('openInquireBtn');
  const ctaInquireBtn = document.getElementById('ctaInquireBtn');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const inquireForm = document.getElementById('inquireForm');

  function openModal() {
    modal.classList.add('open');
    lenis.stop(); // Pause smooth scrolling while modal is open
  }

  function closeModal() {
    modal.classList.remove('open');
    lenis.start();
  }

  if (openInquireBtn) openInquireBtn.addEventListener('click', openModal);
  if (ctaInquireBtn) ctaInquireBtn.addEventListener('click', openModal);
  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });

  if (inquireForm) {
    inquireForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you. A Private Client Partner will contact you within 4 hours.');
      closeModal();
      inquireForm.reset();
    });
  }

  // 9. Web Audio API Ambient Atmosphere Engine (Ocean Surf & Breeze)
  let audioCtx = null;
  let isPlayingAudio = false;
  let ambientNodes = [];

  const soundBtn = document.getElementById('soundBtn');

  function startAmbientAtmosphere() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    // 1. Generate 4 seconds of Pink Noise buffer for soft coastal wind & surf
    const bufferSize = audioCtx.sampleRate * 4;
    const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
      output[i] *= 0.08; // subtle volume
      b6 = white * 0.115926;
    }

    const whiteNoise = audioCtx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Resonant Low-Pass Filter (ocean swells)
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 350;
    filter.Q.value = 3.0;

    // LFO Oscillator to rhythmically swell the surf like ocean waves (8-second period)
    const lfo = audioCtx.createOscillator();
    lfo.frequency.value = 0.125; // ~8 seconds per wave cycle

    const lfoGain = audioCtx.createGain();
    lfoGain.gain.value = 250; // Frequency variation
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    // Master ambient gain
    const masterGain = audioCtx.createGain();
    masterGain.gain.setValueAtTime(0, audioCtx.currentTime);
    masterGain.gain.linearRampToValueAtTime(0.35, audioCtx.currentTime + 2.5); // Warm fade-in

    // Connect audio graph
    whiteNoise.connect(filter);
    filter.connect(masterGain);
    masterGain.connect(audioCtx.destination);

    whiteNoise.start();
    lfo.start();

    ambientNodes = [whiteNoise, lfo, masterGain];
    isPlayingAudio = true;
    soundBtn.classList.add('playing');
    soundBtn.querySelector('.sound-text').textContent = 'Sound On';
  }

  function stopAmbientAtmosphere() {
    if (ambientNodes.length > 0) {
      const [whiteNoise, lfo, masterGain] = ambientNodes;
      masterGain.gain.linearRampToValueAtTime(0.001, audioCtx.currentTime + 1.2);
      setTimeout(() => {
        whiteNoise.stop();
        lfo.stop();
        ambientNodes = [];
      }, 1300);
    }
    isPlayingAudio = false;
    soundBtn.classList.remove('playing');
    soundBtn.querySelector('.sound-text').textContent = 'Atmosphere';
  }

  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      if (!isPlayingAudio) {
        startAmbientAtmosphere();
      } else {
        stopAmbientAtmosphere();
      }
    });
  }
});
