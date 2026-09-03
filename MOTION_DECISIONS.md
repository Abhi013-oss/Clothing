# BANWARILAL CLOTH HOUSE — MOTION & 3D DECISION RECORDS (MDR)

> **CANONICAL MOTION RATIONALE — PHASE 07**  
> **Brand Entity:** BANWARILAL CLOTH HOUSE (Est. 2003, Chilbila, Pratapgarh)  
> **Companion Document:** [`MOTION_AND_3D_SYSTEM.md`](./MOTION_AND_3D_SYSTEM.md)  
> **Status:** Authoritative Architectural Record to Prevent Unintended Motion Bloat

---

## 1. MDR-01: MANDATORY VS. OPTIONAL VS. REJECTED EFFECTS

### Mandatory Motion Effects (Core UX Contract)
1. **Button Tactile Depress:** Physical button feedback (`translateY(-1.5px)` hover, `translateY(0.5px) scale(0.985)` active press) is mandatory across all CTAs to confirm user intent.
2. **Add-to-Cart Triad Feedback:** (1) Button label temporarily changes to `✓ Added to Bag`, (2) Cart counter badge pulses, (3) Slide-in toast notification appears. This triad is mandatory to prevent duplicate taps.
3. **Product Card Elevation & Image Aperture:** Resting to hover transition (`-4px` elevation and `1.035` image zoom) is mandatory on desktop to signify clickable product boundaries.
4. **Cart Drawer Slide & Backdrop Fade:** Fast `320ms` slide-over with trap focus is mandatory for seamless bag review.
5. **Scroll Entrance Reveals:** Subtle section entrance fade (`opacity: 0 ──► 1`, `translate3d(0, 16px, 0) ──► 0`) via `IntersectionObserver` is mandatory to create visual rhythm.

### Optional Enhancement Effects
1. **Hero Pointer Depth Parallax:** Subtle pointer-following perspective (±2.5° max tilt) on the desktop Homepage hero. *Constraint:* Must immediately deactivate if frame rate drops below 55 FPS.
2. **Gallery Damped Zoom Lens:** Desktop product photo zoom. *Constraint:* Disabled on mobile in favor of native pinch-to-zoom.

### Intentionally Rejected Motion Effects
* ❌ **Three.js 3D Clothing Models:** Rejected because simulated 3D cloth cannot match the resolution, weave structure, and true dye color of real high-resolution photography. Adds 600KB+ to the bundle.
* ❌ **Infinite Pulsing / Bouncing WhatsApp CTA:** Rejected because constant motion is visually irritating, conveys desperation, and diminishes the prestigious brand reputation established since 2003.
* ❌ **Scroll-Jacking / Frame Freezing:** Rejected because it causes extreme frustration on mobile devices and breaks native browser momentum scrolling.
* ❌ **Word-by-Word Text Animations & Scrambling:** Rejected because it delays comprehension of garment specifications.
* ❌ **Flying Product to Cart Animation:** Rejected because curved CSS trajectories across dynamic viewports introduce layout jank and visual noise.

---

## 2. MDR-02: WHY HEAVY WEBGL / 3D LIBRARIES WERE AVOIDED

### Context
Phase 07 calls for a "3D Depth & Motion System." A common developer pitfall is immediately installing Three.js, React Three Fiber, or Babylon.js.

### Decision
Implement 100% of the 3D depth system using **Pure GPU-Accelerated CSS3 (`transform`, `perspective`, `box-shadow`)** and zero WebGL libraries.

### Rationale
1. **Target Audience Demographics & Hardware:** The majority of BANWARILAL CLOTH HOUSE's customer base in Pratapgarh and Uttar Pradesh browses via mobile smartphones over cellular 4G connections. Loading a 600KB WebGL bundle creates an unnecessary 3–5 second delay on mobile devices.
2. **Core Web Vitals Integrity:** WebGL canvases block the main thread during initialization, spiking **Interaction to Next Paint (INP)** and hurting Google search ranking.
3. **Authenticity in Fashion Retail:** Customers buying sarees, suits, and readymade apparel want to see the authentic garment photography—not a synthetic, computerized 3D mesh.

---

## 3. MDR-03: WHY POINTER-TRACKING EFFECTS ARE STRICTLY DESKTOP-ONLY

### Decision
Pointer-based perspective shifts and card tilts are strictly scoped to desktop viewports with fine pointer capabilities (`@media (hover: hover) and (pointer: fine)`).

### Rationale
1. **Touch Ergonomics:** On touch devices (smartphones, tablets), there is no cursor hovering before a tap. Attempting to simulate pointer tracking via device gyroscope or touch dragging creates nauseating screen jitter and drains battery life.
2. **Touch Intent:** On mobile, a finger touch is an active intent to tap or scroll. Touch events must remain unhindered.

---

## 4. MDR-04: WHY MOBILE USES REDUCED MOTION BY ARCHITECTURE

### Decision
Mobile viewports (320px–767px) automatically suppress layered parallax, card tilting, and staggered cascades.

### Rationale
1. **Screen Real Estate:** On a 390px smartphone screen, subtle background shifts cause visual disorientation because the viewport is entirely covered by the card.
2. **Battery & CPU Conservation:** Mid-range mobile chipsets throttle CPU performance under sustained multi-layer parallax transforms. Limiting mobile motion to clean opacity fades and drawer slides guarantees sustained 60 FPS performance.

---

## 5. MDR-05: ACCESSIBILITY & REDUCED MOTION GUARANTEE (WCAG 2.1 AA)

### Decision
Any system that detects `prefers-reduced-motion: reduce` forces `animation-duration: 0.01ms` and `transform: none` globally, while preserving necessary visibility states.

### Rationale
1. **Vestibular Safety:** Motion animations (parallax, perspective shifts, rapid scaling) trigger dizziness, nausea, and motion sickness in users with vestibular disorders.
2. **Functional Parity:** Disabling motion does not disable any functionality. Cart counters update instantly; drawers appear immediately; all buttons remain 100% operational.
