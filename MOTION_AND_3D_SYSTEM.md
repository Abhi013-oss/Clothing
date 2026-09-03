# BANWARILAL CLOTH HOUSE — 3D DEPTH, MOTION & INTERACTION DESIGN SYSTEM

> **CANONICAL MOTION SPECIFICATION — PHASE 07**  
> **Brand Entity:** BANWARILAL CLOTH HOUSE (Established 2003, Chilbila, Pratapgarh)  
> **Document Version:** 1.0.0  
> **Governing Specifications:**  
> • [`PROJECT_SOURCE_OF_TRUTH.md`](./PROJECT_SOURCE_OF_TRUTH.md)  
> • [`PRODUCT_REQUIREMENTS_DOCUMENT.md`](./PRODUCT_REQUIREMENTS_DOCUMENT.md)  
> • [`TECHNICAL_REQUIREMENTS_DOCUMENT.md`](./TECHNICAL_REQUIREMENTS_DOCUMENT.md)  
> • [`INFORMATION_ARCHITECTURE.md`](./INFORMATION_ARCHITECTURE.md)  
> • [`USER_FLOW_AND_INTERACTION_SPEC.md`](./USER_FLOW_AND_INTERACTION_SPEC.md)  
> • [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md) & [`DESIGN_TOKENS.md`](./DESIGN_TOKENS.md)  
> **Companion Document:**  
> • [`MOTION_DECISIONS.md`](./MOTION_DECISIONS.md) (Motion & 3D Decision Records)  
> **Status:** Authoritative Motion Blueprint for Implementation (Phase 08+)

---

## 1. MOTION & 3D PHILOSOPHY: "PHYSICAL EDITORIAL DEPTH"

### 1.1 The Golden Rule: 3D Must Never Compete With the Clothing
The garments—their weave, fabric texture, drape, embroidery, and true color fidelity—are the absolute heroes of the digital catalogue. Motion and depth serve strictly as **spatial lighting and physical framing** to elevate perceived craftsmanship. 

If any animation distracts from garment inspection, introduces latency, causes layout shift, or reduces mobile battery life: **IT IS FORBIDDEN**.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           CORE 3D & MOTION TENETS                           │
│                                                                             │
│  1. RESTRAINT OVER SPECTACLE     ──► Subtle physical depth, not a 3D demo.  │
│  2. CSS-FIRST GPU EXECUTION      ──► Zero heavy WebGL or CPU-bound loops.   │
│  3. ZERO SCROLL-JACKING          ──► Native, silky, predictable scrolling.  │
│  4. COMPLETE ACCESSIBILITY       ──► Instantaneous fallback on reduced motion│
│  5. IMMEDIATE FEEDBACK           ──► Sub-100ms response to every thumb/click│
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. 3D TECHNOLOGY PRIORITY & STACK CONSTRAINTS

| Technology Tier | Implementation Method | Allowed Scope | Prohibited Scope |
| :--- | :--- | :--- | :--- |
| **Tier 1 (90%): Pure CSS** | `transform` (`translate3d`, `scale`, `rotateX/Y`), `perspective`, `box-shadow`, `opacity` | Card hover elevations, image zoom aperture, drawer transitions, skeleton shimmer, button micro-feedback. | Heavy SVG morphing filters, continuous CSS keyframe rotations. |
| **Tier 2 (10%): Lightweight JS** | Native `IntersectionObserver` & passive pointer coordinate listeners wrapped in `requestAnimationFrame` | Scroll-triggered entrance reveals, desktop-only hero pointer depth tilt, mobile gallery touch-swipe tracking. | Scroll-jacking libraries, continuous polling, heavy canvas particles. |
| **Tier 3 (0%): 3D Engines** | Three.js / React Three Fiber / Babylon.js | **STRICTLY PROHIBITED** for catalogue launch. Zero 3D model bloat. | Rotating 3D cloth models, WebGL shaders, particle physics systems. |

---

## 3. DEPTH LAYERS & Z-INDEX TAXONOMY

We define 6 physical depth planes to prevent arbitrary stacking conflicts:

| Depth Level | Semantic Role | CSS Transform / Z-Index | Visual Characteristic |
| :--- | :--- | :--- | :--- |
| **Depth 0** | Base Canvas Surface | `z-index: 0` / Flat | Canvas Ivory (`#FAF8F5`) ground plane. |
| **Depth 1** | Content & Structural Cards | `z-index: 1` / `--shadow-card-rest` | Studio White (`#FFFFFF`) product cards, specification tables. |
| **Depth 2** | Floating Editorial Elements | `z-index: 5` / `--shadow-card-hover` | Overlapping lookbook vignettes, active category pills, elevated cards (`translateY(-4px)`). |
| **Depth 3** | Sticky System Navigation | `z-index: 20` / `backdrop-blur-md` | Sticky Global Header, Sticky Category Filter Pill Bar. |
| **Depth 4** | Overlays & Flyout Panels | `z-index: 40` / `--shadow-drawer` | Cart Slide-over Drawer, Mobile Menu Drawer, Modal Dialogs. |
| **Depth 5** | Critical Anchors & Toasts | `z-index: 60-70` / `--shadow-floating`| Floating WhatsApp Action, Non-blocking feedback toasts. |

---

## 4. SIGNATURE HERO DEPTH SYSTEM (DESKTOP)

The Hero section on `/` features the platform's **single signature spatial depth moment**, composed of 3 decoupled visual layers:

```
VIEWPORT (Perspective: 1200px)
  │
  ├── LAYER 1 (Back, Z: -20px): Warm Canvas backdrop with subtle 1px sand borders.
  │     Movement: Parallax factor 0.02 (Shifts 2px–4px on mouse movement).
  │
  ├── LAYER 2 (Middle, Z: 0px): High-resolution hero fashion visual in 3:4 portrait frame.
  │     Movement: Parallax factor 0.05 (Shifts 4px–8px in direction of pointer).
  │     Box Shadow: Dynamic ambient offset simulating shifting natural light.
  │
  └── LAYER 3 (Front, Z: +30px): Playfair Display headline ("Timeless Weaves") & CTAs.
        Movement: Parallax factor 0.08 (Shifts 6px–12px with high-contrast clarity).
```

### 4.1 Pointer Depth Formula (Desktop Only)
* Wrapped in passive `pointermove` handler throttled via `requestAnimationFrame`:
  ```typescript
  // Math bounds: Max rotation ±2.5 degrees; max translation ±8px
  const rotateX = ((mouseY / windowHeight) - 0.5) * -5;
  const rotateY = ((mouseX / windowWidth) - 0.5) * 5;
  const translateX = ((mouseX / windowWidth) - 0.5) * 8;
  ```
* **Graceful Exit:** When the pointer leaves the hero container, layers smoothly interpolate back to `0` over `600ms cubic-bezier(0.16, 1, 0.3, 1)`.
* **Mobile/Touch:** Completely disabled on touch screens and viewports `< 1024px`.

---

## 5. PRODUCT CARD 3D HOVER INTERACTION

* **Objective:** Give the garment card a tactile, physical card-stock elevation without distorting product photography.
* **Resting State:**
  ```css
  .product-card {
    transform: translate3d(0, 0, 0);
    box-shadow: var(--shadow-card-rest);
    transition: transform 300ms var(--ease-editorial), box-shadow 300ms var(--ease-editorial);
  }
  ```
* **Hover State (Desktop):**
  ```css
  .product-card:hover {
    transform: translate3d(0, -4px, 0);
    box-shadow: var(--shadow-card-hover);
  }
  ```
* **Image Aperture Scale (Inner Image Container):**
  ```css
  .product-card-image {
    transform: scale(1.0);
    transition: transform 400ms var(--ease-editorial);
  }
  .product-card:hover .product-card-image {
    transform: scale(1.035); /* Subtle 3.5% zoom; zero layout shift */
  }
  ```
* **Strict Tilt Boundaries:** If optional pointer tilt is enabled, rotational angle is strictly clamped to `max(rotateX) = 2.5deg` and `max(rotateY) = 2.5deg`. Extreme 15°–30° tilts are strictly prohibited.

---

## 6. CATEGORY CARD DEPTH & INTERACTION

* **Structure:** High-aspect 3:4 portrait card with full-bleed garment photography and overlaid typographic title.
* **Hover Interaction:**
  1. Image scales gently from `1.0` to `1.04` (`400ms var(--ease-editorial)`).
  2. Darkened scrim gradient opacity deepens subtly from `0.35` to `0.45` to enhance text contrast.
  3. Category title (`Playfair Display`) translates upward by `-4px` with delicate tracking expansion (`+0.02em`).
  4. 1px hairline border transitions from `#E5E0D8` to Muted Champagne Gold (`#C5A880`).

---

## 7. SCROLL-BASED MOTION & REVEALS

* **Engine:** Pure `IntersectionObserver` observing sections and product grids with a `0.15` threshold and `-40px` bottom margin.
* **Reveal Animation Formula:**
  ```css
  @keyframes sectionReveal {
    from {
      opacity: 0;
      transform: translate3d(0, 16px, 0);
    }
    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }
  ```
* **Execution Parameters:**
  * Duration: `500ms`.
  * Easing: `cubic-bezier(0.16, 1, 0.3, 1)` (luxury editorial deceleration).
* **Controlled Stagger System (Product Grids):**
  To prevent dizzying visual cascades, stagger delays are capped at a maximum of 4 items:
  * Item 1: `0ms` delay
  * Item 2: `50ms` delay
  * Item 3: `100ms` delay
  * Item 4: `150ms` delay
  * *Items 5+: Instantaneous reveal (`0ms`)* to keep catalogue browsing rapid.

---

## 8. MICRO-INTERACTIONS & FEEDBACK LOOPS

### 8.1 Button Physical Press (Tactile Elevation)
* **Hover:** `transform: translateY(-1.5px);` with shadow deepening (`150ms`).
* **Active (Click / Tap):** `transform: translateY(0.5px) scale(0.985);` (`100ms snappy`). Gives the sensation of depressing a physical luxury mechanical switch.
* **Focus:** `focus-visible:ring-2 focus-visible:ring-[#C5A880] focus-visible:ring-offset-2`.

### 8.2 Add-to-Cart Immediate Confirmation Flow
```
[ User Clicks "Add to Bag" ]
       │
       ▼ (100ms)
[ Button transforms: Label changes to "✓ Added to Bag" ]
[ Soft Emerald accent outline flashes briefly ]
       │
       ▼ (150ms)
[ Cart Bag Counter in Header executes subtle pulse: scale(1.0) ──► scale(1.20) ──► scale(1.0) ]
       │
       ▼ (200ms)
[ Non-blocking Toast notification slides in from bottom-right (Desktop) or top-center (Mobile) ]
       │
       ▼ (1500ms)
[ Button smoothly returns to default "Add to Bag" state ]
```

### 8.3 Cart Counter Number Transition
* When quantity updates (e.g., `1` → `2`), the numeral executes a vertical slide-fade:
  * Exiting numeral translates `-6px` upward with `opacity: 0` (`150ms`).
  * Entering numeral transitions from `+6px` below to `0px` with `opacity: 1` (`150ms`).

---

## 9. CART DRAWER & MODAL MOTION

* **Drawer Slide-Over Panel:**
  * Entrance: `transform: translate3d(100%, 0, 0) ──► translate3d(0, 0, 0)`.
  * Duration: `320ms`.
  * Easing: `cubic-bezier(0.16, 1, 0.3, 1)`.
* **Backdrop Blur Overlay:**
  * Entrance: `opacity: 0 ──► opacity: 1` with `backdrop-filter: blur(4px)`.
  * Duration: `250ms ease-out`.
* **Exit:** Symmetrical reverse over `250ms ease-in`.
* **Item Row Deletion:**
  * When trash icon is clicked, the row translates `-16px` left with `opacity: 0` (`180ms`), followed by smooth height collapse to `0px` (`180ms`), closing the gap without layout snapping.

---

## 10. PRODUCT GALLERY MOTION & TOUCH SWIPE

* **Desktop Gallery Zoom:**
  * Moving mouse over the primary image scales an internal high-resolution canvas by `1.75x`, centered precisely on pointer coordinates (`x%, y%`).
  * Lens movement is damped via `lerp(current, target, 0.15)` for buttery smooth tracking.
* **Mobile Touch Swipe:**
  * 1:1 hardware-accelerated horizontal touch tracking (`touch-action: pan-y`).
  * Elastic bounce resistance at gallery boundaries (`overscroll-behavior-x: contain`).
  * Snaps into place with pagination dot active indicator scaling from `6px` to `16px` pill width.

---

## 11. NAVIGATION & SEARCH MOTION

* **Desktop Header Scroll Response:**
  * Page Top: Header surface is translucent Ivory (`rgba(250, 248, 245, 0.85)`).
  * Scrolled (> 60px): Background smoothly transitions to solid Ivory (`#FAF8F5`) with 1px border `#E5E0D8` and micro-shadow (`0 4px 20px rgba(24, 24, 27, 0.04)`).
* **Search Input Expansion:**
  * Clicking search icon expands search input width from `40px` to `260px` (`200ms ease-out`).
  * Clear button (`✕`) fades in when input contains `length > 0`.

---

## 12. WHATSAPP & STORE MAPS CTA MOTION

* **WhatsApp CTA Philosophy (NO INFINITE PULSE):**
  * The WhatsApp emerald button **NEVER** pulses, bounces, shakes, or glows continuously. Infinite pulsing conveys desperation and cheapens luxury brand equity.
  * *Allowed Motion:* Clean hover elevation (`translateY(-2px)`), smooth background color shift (`#25D366` → `#1EBE5D`), and subtle static glow shadow.
* **Store Directions CTA:**
  * On hover, the arrow/map pin icon translates `3px` to the right (`200ms ease-out`), visually indicating external directional departure.

---

## 13. MOTION TOKENS SYSTEM

```typescript
// tailwind.config.ts / CSS tokens extension
export const motionTokens = {
  duration: {
    instant: '100ms',  // Active tactile compression
    fast:    '180ms',  // Tooltips, button hover, icon shifts
    normal:  '300ms',  // Card hover elevation, image zoom
    drawer:  '350ms',  // Cart drawer slide, mobile menu
    reveal:  '500ms',  // Section entry reveals
    hero:    '700ms',  // Hero signature parallax settle
  },
  easing: {
    editorial: 'cubic-bezier(0.16, 1, 0.3, 1)', // Decelerating luxury curve
    snappy:    'cubic-bezier(0.4, 0, 0.2, 1)',   // Responsive UI clicks
    inOut:     'cubic-bezier(0.65, 0, 0.35, 1)', // Reversible modal panels
  },
  distance: {
    hoverLift:    '-4px',
    buttonPress:  '0.5px',
    revealOffset: '16px',
    badgePulse:   '1.20',
  }
};
```

---

## 14. RESPONSIVE MOTION MATRIX

| Motion / Interaction | Desktop (≥ 1024px) | Tablet (768px – 1023px) | Mobile (320px – 767px) | Reduced Motion Active |
| :--- | :--- | :--- | :--- | :--- |
| **Hero Layered Parallax** | Full Multi-Layer (±8px) | Subdued (±4px) | **OFF** (Static Layout) | **OFF** |
| **Hero Pointer Tracking** | Active (Damped 2.5°) | **OFF** (Touch Device) | **OFF** (Touch Device) | **OFF** |
| **Card Hover Elevation** | Full (`-4px` + Shadow) | Touch Active (`scale 0.98`) | Touch Active (`scale 0.98`) | **OFF** |
| **Image Aperture Zoom** | Active (`1.035`) | Active on Tap | Active on Tap | **OFF** |
| **Scroll Section Reveal** | Staggered Fade & Slide | Staggered Fade & Slide | Simple Fade (`0` to `1`) | Instant (`opacity: 1`) |
| **Add-to-Cart Feedback** | Full Button + Toast | Full Button + Toast | Full Button + Toast | Instant Text Update |
| **Gallery Zoom Lens** | Active Mouse Zoom | Native Pinch/Swipe | Native Pinch/Swipe | Native Pinch/Swipe |
| **Cart Drawer Slide** | 320ms Slide from Right | 320ms Slide from Right | 320ms Slide from Bottom | Instant Visibility |
| **WhatsApp Button** | Static Hover Elevation | Static Tap Ripple | Static Tap Ripple | Static Tap Ripple |

---

## 15. REDUCED MOTION SPECIFICATION (WCAG 2.1 CRITERION 2.3.3)

All transitions and keyframe animations must strictly adhere to the user's operating system preferences:

```css
@media (prefers-reduced-motion: reduce) {
  *, ::before, ::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
    transform: none !important;
  }
  
  /* Preserve necessary opacity transitions for modal visibility */
  .fade-in {
    opacity: 1 !important;
  }
}
```

---

## 16. WEB PERFORMANCE BUDGET & GPU DISCIPLINE

1. **Composite-Only Animation Rule:** Animating `top`, `left`, `width`, `height`, or `margin` is **STRICTLY FORBIDDEN**. All layout shifts are eliminated by restricting dynamic properties to `transform` (`translate3d`, `scale`) and `opacity`.
2. **CPU Protection:** Pointer coordinate listeners must remain passive (`{ passive: true }`) and tick strictly within `requestAnimationFrame`.
3. **Paint Area Containment:** Animated elements enforce `will-change: transform` only during active hover/interaction, cleared immediately on idle to release GPU memory on budget mobile devices.
4. **Target Core Web Vitals:**
   * **INP (Interaction to Next Paint):** `< 80ms` (Well under 200ms threshold).
   * **CLS (Cumulative Layout Shift):** `0.00` (Guaranteed by reserved CSS aspect ratios).
   * **FPS:** Sustained `60 FPS` on mid-range Android hardware (Snapdragon 680 tier).

---

## 17. REJECTED EFFECTS (WHAT WE INTENTIONALLY OMITTED)

| Rejected Effect | Architectural Reason for Rejection |
| :--- | :--- |
| ❌ **Three.js 3D Clothing Canvas** | Adds 600KB+ to bundle, drains mobile batteries, and cannot match the weave detail of authentic macro photography. |
| ❌ **Infinite Bouncing WhatsApp Button** | Looks desperate and spammy; directly contradicts the dignity of a heritage 2003 clothing house. |
| ❌ **Scroll-Jacking / Horizontal Hijacking**| Destroys native momentum scrolling, causes vestibular disorientation, and infuriates mobile shoppers. |
| ❌ **Typewriter / Letter Scrambling Text** | Distracts from reading garment specifications and delays comprehension. |
| ❌ **Particle Backgrounds / Sparkles** | Resembles a gaming or crypto website; conflicts with natural fabric textures. |
| ❌ **Full-Page Curtain Transitions** | Adds artificial wait times between page navigation; users want instant garment browsing. |
