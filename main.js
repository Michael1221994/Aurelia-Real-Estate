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
    // Phase 1: Foreground framing columns dolly past camera: scale from 1.0 to 2.8, fly off sides
    .to('.framing-dolly-wrap', {
      scale: 2.8,
      y: -35,
      opacity: 0,
      ease: 'power2.in',
    }, 0)

    // Phase 1: Villa architecture pulls closer into view (dolly in onto pool terrace)
    .to('.villa-structure', {
      scale: 1.35,
      y: -25,
      ease: 'power1.out',
    }, 0)

    // Phase 1: Horizon ocean & distant mountains remain steady
    .to('.layer-horizon', { scale: 1.05, y: -8, ease: 'none' }, 0)
    .to('.layer-sky', { y: -15, ease: 'none' }, 0)

    // Keep hero text ("Where Architecture Meets Horizon" + "A sculptural sanctuary...")
    // fully legible initially, then fade out gently as camera pushes in
    .to('#heroOverlay', { opacity: 0, y: -50, filter: 'blur(5px)', duration: 0.35, ease: 'power2.inOut' }, 0.18)

    // Phase 2: Reveal the Pinned Luxury Property Metric Deck
    .fromTo(
      '#heroSpecsDeck',
      { opacity: 0, y: 35 },
      { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' },
      0.4
    )

    // Phase 3: Hold specs briefly, then gently exit as next section glides up
    .to('#heroSpecsDeck', { opacity: 0, y: -25, duration: 0.22, ease: 'power2.in' }, 0.82)
    .to('.multiplane-scene', { scale: 1.03, filter: 'brightness(0.92)', ease: 'none' }, 0.85);

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
        { top: '40%', left: '35%', title: 'Grand Salon', desc: 'Double-height glass pavilion with monolithic travertine fireplace' },
        { top: '65%', left: '60%', title: 'Zero-Edge Pool', desc: '110-ft cantilevered oceanfront lap pool with baja shelf' },
        { top: '30%', left: '70%', title: 'Chef Kitchen', desc: 'Calacatta Paonazzo marble culinary studio with prep pantry' },
      ],
      svg: `
        <svg viewBox="0 0 800 480" class="blueprint-svg" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="poolHatch" width="8" height="8" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="8" stroke="rgba(126, 196, 248, 0.3)" stroke-width="1.5" />
            </pattern>
            <pattern id="terracePattern" width="16" height="16" patternUnits="userSpaceOnUse">
              <rect width="16" height="16" fill="none" stroke="rgba(197, 168, 128, 0.08)" stroke-width="0.5" />
            </pattern>
          </defs>

          <!-- Pacific Ocean Cliffline -->
          <path d="M 20,460 Q 240,445 420,465 T 780,445" fill="none" stroke="rgba(142, 149, 160, 0.35)" stroke-dasharray="6,4" stroke-width="1.5" />
          <text x="35" y="450" fill="rgba(142, 149, 160, 0.5)" font-size="9" letter-spacing="1">PACIFIC CLIFF EDGE SIGHTLINE</text>

          <!-- Outdoor Travertine Terrace -->
          <rect x="70" y="230" width="660" height="210" fill="url(#terracePattern)" stroke="rgba(197, 168, 128, 0.25)" stroke-width="1" />
          <text x="85" y="250" fill="#c5a880" font-size="10" font-weight="600" letter-spacing="1.5">OUTDOOR LIVING & POOL TERRACE</text>

          <!-- Cantilevered Zero-Edge Pool -->
          <rect x="340" y="270" width="340" height="135" fill="url(#poolHatch)" stroke="#7ec4f8" stroke-width="2" rx="2" />
          <line x1="340" y1="300" x2="385" y2="300" stroke="#7ec4f8" stroke-width="1.5" />
          <line x1="340" y1="320" x2="385" y2="320" stroke="#7ec4f8" stroke-width="1.5" />
          <line x1="340" y1="340" x2="385" y2="340" stroke="#7ec4f8" stroke-width="1.5" />
          <text x="440" y="345" fill="#7ec4f8" font-size="11" font-weight="600" letter-spacing="1.5">110' ZERO-EDGE POOL</text>
          <text x="465" y="365" fill="rgba(126, 196, 248, 0.6)" font-size="9">DEPTH: 4' - 9'</text>

          <!-- Firepit Lounge -->
          <circle cx="180" cy="340" r="32" fill="rgba(197, 168, 128, 0.08)" stroke="rgba(197, 168, 128, 0.4)" stroke-width="1.5" />
          <circle cx="180" cy="340" r="14" fill="rgba(255, 140, 60, 0.2)" stroke="#c5a880" stroke-width="1.5" />
          <text x="145" y="390" fill="#8e95a0" font-size="9" letter-spacing="1">FIREPIT LOUNGE</text>

          <!-- Main Pavilion Structure (Travertine Exterior Walls) -->
          <path d="M 70,50 L 730,50 L 730,230 L 70,230 Z" fill="rgba(18, 22, 29, 0.85)" stroke="#c5a880" stroke-width="2.5" />

          <!-- Arrival Foyer & Motor Court Partitions -->
          <line x1="70" y1="140" x2="220" y2="140" stroke="rgba(197, 168, 128, 0.6)" stroke-width="2" />
          <line x1="220" y1="50" x2="220" y2="230" stroke="rgba(197, 168, 128, 0.6)" stroke-width="2" />
          <!-- Entry Doors -->
          <path d="M 120,50 A 25,25 0 0,1 145,75 L 145,50" fill="none" stroke="#dfc8a8" stroke-width="1.5" />
          <path d="M 170,50 A 25,25 0 0,0 145,75 L 145,50" fill="none" stroke="#dfc8a8" stroke-width="1.5" />
          <text x="100" y="105" fill="#f4f2ed" font-size="11" font-weight="600" letter-spacing="1">ARRIVAL FOYER</text>
          <text x="100" y="190" fill="#8e95a0" font-size="9">POWDER RM & WARDROBE</text>

          <!-- Grand Ocean Salon (Center) -->
          <line x1="530" y1="50" x2="530" y2="230" stroke="rgba(197, 168, 128, 0.6)" stroke-width="2" />
          <!-- Fireplace Hearth -->
          <rect x="220" y="115" width="14" height="50" fill="#c5a880" stroke="#f4f2ed" stroke-width="1" />
          <!-- Motorized Glass Wall Track -->
          <line x1="230" y1="230" x2="520" y2="230" stroke="#8fa4b0" stroke-width="3" stroke-dasharray="6,4" />
          <text x="290" y="222" fill="#8fa4b0" font-size="9" letter-spacing="1">MOTORIZED SLIDING GLASS TRACK (50 FT)</text>
          
          <text x="290" y="120" fill="#f4f2ed" font-size="13" font-weight="600" letter-spacing="1.5">GRAND OCEAN SALON</text>
          <text x="290" y="140" fill="#8e95a0" font-size="9.5">24' VAULTED CEILINGS • MONOLITHIC HEARTH</text>
          <text x="290" y="160" fill="rgba(197, 168, 128, 0.85)" font-size="9" font-family="monospace">DIM: 38'-0" x 30'-0"</text>

          <!-- Chef's Culinary Studio (Right) -->
          <rect x="570" y="110" width="115" height="42" fill="rgba(197, 168, 128, 0.2)" stroke="#c5a880" stroke-width="1.5" rx="2" />
          <text x="590" y="135" fill="#f4f2ed" font-size="10" font-weight="600">ISLAND BAR</text>
          <line x1="680" y1="50" x2="680" y2="160" stroke="rgba(197, 168, 128, 0.5)" stroke-width="1.5" />
          <text x="560" y="85" fill="#f4f2ed" font-size="11" font-weight="600" letter-spacing="1">CHEF'S KITCHEN</text>
          <text x="560" y="200" fill="#8e95a0" font-size="9.5">FORMAL DINING PAVILION</text>

          <!-- North Arrow -->
          <g transform="translate(745, 80)">
            <circle cx="0" cy="0" r="14" fill="none" stroke="rgba(197, 168, 128, 0.4)" stroke-width="1" />
            <path d="M 0,-12 L 4,0 L -4,0 Z" fill="#c5a880" />
            <text x="-4" y="-15" fill="#c5a880" font-size="8" font-weight="bold">N</text>
          </g>
        </svg>
      `,
    },
    level2: {
      name: 'Level 02 • Private Suites & Decks',
      text: 'The upper level is dedicated to ultimate privacy. The primary cantilevered wing floats over the Pacific, accompanied by five junior en-suites each featuring private terraces.',
      gross: '3,600 Sq. Ft.',
      clearance: "11' High Ceilings",
      terraces: '1,400 Sq. Ft.',
      hotspots: [
        { top: '35%', left: '40%', title: 'Master Sanctuary', desc: 'Floating corner glass bedroom with wraparound terrace' },
        { top: '45%', left: '75%', title: 'Sunset Deck', desc: 'Private rooftop firepit terrace overlooking the coastline' },
        { top: '60%', left: '25%', title: 'En-Suite Gallery', desc: 'Guest wing with courtyard view and marble bath' },
      ],
      svg: `
        <svg viewBox="0 0 800 480" class="blueprint-svg" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="deckPattern2" width="14" height="14" patternUnits="userSpaceOnUse">
              <rect width="14" height="14" fill="none" stroke="rgba(197, 168, 128, 0.07)" stroke-width="0.5" />
            </pattern>
          </defs>

          <!-- Cantilevered Overhang Projections (Dashed) -->
          <rect x="60" y="50" width="680" height="340" fill="none" stroke="rgba(197, 168, 128, 0.2)" stroke-dasharray="6,4" stroke-width="1" />
          <text x="80" y="420" fill="rgba(142, 149, 160, 0.5)" font-size="9">CANTILEVERED STRUCTURAL PROFILE OVER POOL DECK</text>

          <!-- Primary Master Sanctuary (Left Wing - Cantilevered Over Cliff) -->
          <rect x="70" y="60" width="280" height="280" fill="rgba(18, 22, 29, 0.9)" stroke="#c5a880" stroke-width="2.5" />
          <rect x="70" y="250" width="280" height="90" fill="url(#deckPattern2)" stroke="rgba(197, 168, 128, 0.3)" stroke-width="1" />
          <text x="90" y="100" fill="#f4f2ed" font-size="13" font-weight="600" letter-spacing="1.5">PRIMARY MASTER SANCTUARY</text>
          <text x="90" y="120" fill="#8e95a0" font-size="9.5">FLOATING CORNER GLASS SUITE</text>
          <text x="90" y="140" fill="rgba(197, 168, 128, 0.85)" font-size="9" font-family="monospace">DIM: 24'-0" x 22'-0"</text>
          <!-- Freestanding Tub Symbol -->
          <rect x="90" y="165" width="50" height="26" rx="13" fill="none" stroke="#7ec4f8" stroke-width="1.5" />
          <text x="100" y="181" fill="#7ec4f8" font-size="8">BATH</text>
          <text x="160" y="180" fill="#8e95a0" font-size="9">DUAL DRESSING GALLERIES</text>
          <text x="90" y="290" fill="#c5a880" font-size="9.5" letter-spacing="1">PRIVATE SUNSET BALCONY</text>

          <!-- Central Open-Air Gallery Bridge (Overlooking Grand Salon Below) -->
          <rect x="350" y="120" width="130" height="160" fill="rgba(10, 12, 16, 0.6)" stroke="rgba(142, 149, 160, 0.4)" stroke-dasharray="6,4" stroke-width="1.5" />
          <text x="365" y="195" fill="rgba(142, 149, 160, 0.6)" font-size="10" font-weight="600" letter-spacing="1">OPEN TO SALON</text>
          <text x="375" y="210" fill="rgba(142, 149, 160, 0.4)" font-size="8.5">BELOW</text>
          <!-- Glass Bridge Path -->
          <rect x="350" y="60" width="130" height="60" fill="rgba(197, 168, 128, 0.15)" stroke="#c5a880" stroke-width="1.5" />
          <text x="370" y="95" fill="#f4f2ed" font-size="9" font-weight="600">GALLERY BRIDGE</text>

          <!-- Junior Suites Wing (Right) -->
          <rect x="480" y="60" width="260" height="135" fill="rgba(18, 22, 29, 0.9)" stroke="#c5a880" stroke-width="2" />
          <text x="500" y="95" fill="#f4f2ed" font-size="11" font-weight="600">JUNIOR SUITE 02</text>
          <text x="500" y="115" fill="#8e95a0" font-size="9">EN-SUITE BATH • PRIVATE TERRACE</text>
          <text x="500" y="135" fill="rgba(197, 168, 128, 0.85)" font-size="8.5" font-family="monospace">DIM: 18'-6" x 16'-0"</text>

          <rect x="480" y="195" width="260" height="145" fill="rgba(18, 22, 29, 0.9)" stroke="#c5a880" stroke-width="2" />
          <text x="500" y="230" fill="#f4f2ed" font-size="11" font-weight="600">JUNIOR SUITE 03</text>
          <text x="500" y="250" fill="#8e95a0" font-size="9">EN-SUITE BATH • COURTYARD VIEW</text>
          <text x="500" y="270" fill="rgba(197, 168, 128, 0.85)" font-size="8.5" font-family="monospace">DIM: 19'-0" x 15'-6"</text>

          <!-- North Arrow -->
          <g transform="translate(745, 80)">
            <circle cx="0" cy="0" r="14" fill="none" stroke="rgba(197, 168, 128, 0.4)" stroke-width="1" />
            <path d="M 0,-12 L 4,0 L -4,0 Z" fill="#c5a880" />
            <text x="-4" y="-15" fill="#c5a880" font-size="8" font-weight="bold">N</text>
          </g>
        </svg>
      `,
    },
    level3: {
      name: 'Sub-Level • Wellness & Cellar Vault',
      text: 'Excavated directly into the cliff stone, this subterranean retreat features a European hydrotherapy spa, cedar Finnish sauna, private screening theater, and a 1,200-bottle tasting room.',
      gross: '1,200 Sq. Ft.',
      clearance: "12' Board-Form Concrete",
      terraces: 'Sunken Zen Atrium',
      hotspots: [
        { top: '45%', left: '50%', title: 'Wine Sanctuary', desc: '1,200-bottle climate-controlled chamber with sommelier tasting room' },
        { top: '35%', left: '25%', title: 'Thermal Spa', desc: 'Finnish cedar sauna, steam bath & cold-plunge hydrotherapy pools' },
        { top: '60%', left: '70%', title: 'Cinema Salon', desc: 'Acoustically tuned 12-seat private theater with 4K laser projection' },
      ],
      svg: `
        <svg viewBox="0 0 800 480" class="blueprint-svg" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="stoneHatch" width="10" height="10" patternTransform="rotate(30)" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="10" stroke="rgba(142, 149, 160, 0.2)" stroke-width="1" />
            </pattern>
          </defs>

          <!-- Excavated Cliff Bedrock Foundation -->
          <path d="M 50,40 L 750,40 L 750,440 L 50,440 Z" fill="url(#stoneHatch)" stroke="rgba(142, 149, 160, 0.4)" stroke-width="2" />
          <text x="70" y="420" fill="rgba(142, 149, 160, 0.6)" font-size="9.5" letter-spacing="1.5">EXCAVATED CLIFF STONE SUBTERRANEAN FOUNDATION</text>

          <!-- Thermal Spa & Hydrotherapy Suite (Left) -->
          <rect x="80" y="70" width="270" height="310" fill="rgba(18, 22, 29, 0.95)" stroke="#c5a880" stroke-width="2.5" />
          <text x="100" y="110" fill="#f4f2ed" font-size="13" font-weight="600" letter-spacing="1.5">HYDROTHERAPY SPA SUITE</text>
          <!-- Finnish Cedar Sauna -->
          <rect x="100" y="130" width="110" height="85" fill="rgba(197, 168, 128, 0.15)" stroke="#c5a880" stroke-width="1.5" />
          <text x="110" y="175" fill="#c5a880" font-size="10" font-weight="600">CEDAR SAUNA</text>
          <!-- Cold Plunge Pool -->
          <rect x="225" y="130" width="100" height="85" fill="rgba(126, 196, 248, 0.2)" stroke="#7ec4f8" stroke-width="1.5" />
          <text x="235" y="175" fill="#7ec4f8" font-size="10" font-weight="600">COLD PLUNGE</text>
          <text x="100" y="250" fill="#8e95a0" font-size="9.5">STEAM ROOM • HEATED MARBLE BEDS</text>

          <!-- 1,200-Bottle Climate-Controlled Wine Vault (Center) -->
          <rect x="370" y="70" width="180" height="310" fill="rgba(18, 22, 29, 0.95)" stroke="#c5a880" stroke-width="2.5" />
          <rect x="380" y="80" width="160" height="290" fill="none" stroke="rgba(197, 168, 128, 0.4)" stroke-dasharray="4,4" stroke-width="1" />
          <!-- Sommelier Tasting Table -->
          <circle cx="460" cy="220" r="30" fill="rgba(197, 168, 128, 0.2)" stroke="#c5a880" stroke-width="1.5" />
          <text x="440" y="225" fill="#f4f2ed" font-size="9" font-weight="600">TABLE</text>
          <text x="390" y="115" fill="#f4f2ed" font-size="12" font-weight="600" letter-spacing="1">1,200-BOTTLE</text>
          <text x="390" y="135" fill="#c5a880" font-size="10">WINE SANCTUARY</text>
          <text x="390" y="155" fill="#8e95a0" font-size="8.5">55°F CONSTANT CLIMATE</text>

          <!-- Dolby Atmos Private Screening Room (Right) -->
          <rect x="570" y="70" width="160" height="310" fill="rgba(18, 22, 29, 0.95)" stroke="#c5a880" stroke-width="2.5" />
          <!-- Cinema Screen Curve -->
          <path d="M 585,90 Q 650,105 715,90" fill="none" stroke="#f4f2ed" stroke-width="3" />
          <text x="615" y="125" fill="#f4f2ed" font-size="11" font-weight="600" letter-spacing="1">SCREEN</text>
          <!-- Tiered Seating Rows -->
          <rect x="590" y="160" width="120" height="30" fill="rgba(142, 149, 160, 0.15)" stroke="rgba(142, 149, 160, 0.4)" stroke-width="1" rx="4" />
          <rect x="590" y="210" width="120" height="30" fill="rgba(142, 149, 160, 0.15)" stroke="rgba(142, 149, 160, 0.4)" stroke-width="1" rx="4" />
          <rect x="590" y="260" width="120" height="30" fill="rgba(142, 149, 160, 0.15)" stroke="rgba(142, 149, 160, 0.4)" stroke-width="1" rx="4" />
          <text x="590" y="325" fill="#8e95a0" font-size="9">12-SEAT PRIVATE CINEMA</text>
        </svg>
      `,
    },
  };

  const floorTabs = document.querySelectorAll('.floor-tab');
  const floorDetails = document.getElementById('floorDetails');
  const blueprintCanvas = document.getElementById('blueprintCanvas');
  const blueprintSvgContainer = document.getElementById('blueprintSvgContainer');

  function updateFloor(floorKey) {
    const data = floorData[floorKey];
    if (!data) return;

    // Render Architectural SVG Blueprint with smooth fade
    if (blueprintSvgContainer && data.svg) {
      blueprintSvgContainer.innerHTML = data.svg;
      gsap.fromTo(
        blueprintSvgContainer.querySelector('svg'),
        { opacity: 0, scale: 0.97 },
        { opacity: 1, scale: 1, duration: 0.35, ease: 'power2.out' }
      );
    }

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

  // Initialize Level 01 blueprint immediately on load
  updateFloor('level1');

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

  // 8. Modals & Footer Trigger Management
  const inquireModal = document.getElementById('inquireModal');
  const legalModal = document.getElementById('legalModal');
  const pressModal = document.getElementById('pressModal');

  const openInquireBtn = document.getElementById('openInquireBtn');
  const ctaInquireBtn = document.getElementById('ctaInquireBtn');
  const openLegalBtn = document.getElementById('openLegalBtn');
  const openPressBtn = document.getElementById('openPressBtn');
  const linkFloorplan = document.getElementById('linkFloorplan');
  const inquireForm = document.getElementById('inquireForm');

  function openTargetModal(m) {
    if (!m) return;
    m.classList.add('open');
    if (typeof lenis !== 'undefined' && lenis) lenis.stop();
  }

  function closeAllModals() {
    document.querySelectorAll('.modal-backdrop').forEach((m) => m.classList.remove('open'));
    if (typeof lenis !== 'undefined' && lenis) lenis.start();
  }

  if (openInquireBtn) openInquireBtn.addEventListener('click', () => openTargetModal(inquireModal));
  if (ctaInquireBtn) ctaInquireBtn.addEventListener('click', () => openTargetModal(inquireModal));
  if (openLegalBtn) openLegalBtn.addEventListener('click', () => openTargetModal(legalModal));
  if (openPressBtn) openPressBtn.addEventListener('click', () => openTargetModal(pressModal));

  // Architectural Drawings Footer Link: Smooth scroll to #floorplan
  if (linkFloorplan) {
    linkFloorplan.addEventListener('click', (e) => {
      e.preventDefault();
      const floorplanEl = document.getElementById('floorplan');
      if (floorplanEl) {
        if (typeof lenis !== 'undefined' && lenis) {
          lenis.scrollTo(floorplanEl, { offset: -30 });
        } else {
          floorplanEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }

  // Close modals on close button click
  document.querySelectorAll('.modal-close').forEach((btn) => {
    btn.addEventListener('click', closeAllModals);
  });

  // Close modals when clicking backdrop
  document.querySelectorAll('.modal-backdrop').forEach((backdrop) => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeAllModals();
    });
  });

  // Close modals with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllModals();
  });

  if (inquireForm) {
    inquireForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you. A Private Client Partner will contact you within 4 hours.');
      closeAllModals();
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
