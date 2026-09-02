# The Aurelia Estate &bull; 2.5D Multiplane Real Estate Experience

An award-winning, immersive luxury real estate showcase inspired by Disney’s 1933 Multiplane Camera. Built with **GSAP ScrollTrigger**, **Lenis Smooth Scroll**, **Web Audio API**, and pure vanilla JavaScript/CSS.

---

## 🏛️ Project Overview

**The Aurelia Estate** (`Pacific Palisades, California &bull; $34,500,000`) is an editorial, cinematic digital showcase for ultra-prime architectural real estate. Rather than relying on traditional flat property slideshows, this project implements a **multiplane depth engine** that simulates physical optical depth:

- **2.5D Multiplane "Arrival" Hero**: Physical optical layers (twilight sky, ocean horizon, volumetric atmosphere, architectural facade, infinity pool, foreground framing trees, and 3D perspective lens flare discs) stacked along the Z-axis.
- **Scroll-Scrubbed Camera Push**: As the user scrolls, the camera dollies through the foreground framing directly onto the cantilevered terrace, dynamically revealing property metrics.
- **Dual Motion Engine**: Combines GSAP scroll scrubbing with real-time mouse gyroscope parallax and 3D lens flare rotation.
- **Procedural Web Audio Atmosphere**: Generates realistic coastal ocean surf and wind swells via the browser's native Web Audio API (zero external audio assets).
- **Interactive Spatial Blueprint**: Dynamic floorplan viewer with pulsing interactive room hotspots.

---

## ✨ Key Features

| Feature | Description |
| :--- | :--- |
| **Multiplane Camera Simulation** | 7 stacked optical planes with differential scale and translation physics (`1.05x` to `1.45x`). |
| **Lenis Inertial Scrolling** | Studio Freight's Lenis scroll engine provides weighted, luxury physical momentum. |
| **GSAP ScrollTrigger Timeline** | Precision scrubbed animations linked directly to scroll position with 1.2s damping. |
| **Mouse Gyroscope Parallax** | Continuous `requestAnimationFrame` lerp loop for subtle interactive depth on idle. |
| **Editorial Word-by-Word Scrub** | Architectural philosophy statement illuminates letter-by-letter as user scrolls. |
| **Interactive Blueprint** | Level 01, Level 02, and Sub-Level switcher with dynamic room metrics and tags. |
| **Procedural Ocean Soundscape** | Pink noise synthesis + resonant low-pass filter + 8-second LFO wave swells. |
| **Private Tour Drawer** | Slide-out confidential acquisition modal with background scroll lock. |

---

## 🛠️ Tech Stack

- **Core**: Vanilla HTML5, Modern CSS3 (CSS Variables, 3D Transforms, Glassmorphism), Vanilla JavaScript (ES6+)
- **Animation**: [GSAP 3.12](https://greensock.com/gsap/) + [ScrollTrigger](https://greensock.com/scrolltrigger/)
- **Smooth Scroll**: [@studio-freight/lenis](https://github.com/darkroomengineering/lenis)
- **Audio**: Web Audio API (Pink noise buffer, BiquadFilter, LFO oscillator)
- **Typography**: Instrument Serif & Plus Jakarta Sans via Google Fonts
- **Server**: Zero-dependency Node.js static HTTP server (`server.js`)

---

## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/Michael1221994/Aurelia-Real-Estate.git
cd Aurelia-Real-Estate
```

### 2. Run locally

You can run the site using the included zero-dependency Node server:

```bash
node server.js
```

Or open with any local server:
```bash
# Using npx serve
npx serve .

# Using Python
python -m http.server 3000
```

Visit **`http://localhost:3000`** in your browser.

---

## 📁 File Structure

```
├── index.html       # Semantic structure, 3D multiplane layers & modal
├── styles.css       # Complete design tokens, 3D transforms & responsive rules
├── main.js          # GSAP timeline, Lenis sync, mouse loop & audio engine
├── server.js        # Lightweight Node static file server
└── README.md        # Project documentation
```

---

## 🎨 Customization

### Replacing Assets
- **Villa & Interior Photography**: Update image URLs in `index.html` within `.layer-villa`, `.spaces-grid`, and `.cta-backdrop`.
- **Parallax Speed**: Modify `data-depth` attributes on `.layer` elements (values closer to `0` remain stationary; negative or larger values move faster).
- **Color Scheme**: Tweak design tokens in `:root` inside `styles.css` (`--gold`, `--bg-dark`, `--text-main`).

---

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).
Inspired by Disney's Multiplane Camera (1933) and modern Awwwards real estate showcases.
