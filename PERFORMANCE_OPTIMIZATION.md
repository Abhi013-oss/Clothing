# BANWARILAL CLOTH HOUSE — PERFORMANCE OPTIMIZATION REPORT

> **CORE WEB VITALS & RUNTIME PERFORMANCE SPECIFICATION — PHASE 16**  
> **Brand Entity:** BANWARILAL CLOTH HOUSE (Established 2003, Chilbila, Pratapgarh)  
> **Status:** Production Standard

---

## 1. CORE WEB VITALS ENGINEERING

### Largest Contentful Paint (LCP)
* **Hero Section Optimization:** The primary hero image (`HeroSection.tsx`) utilizes Next.js `<Image priority fill ... sizes="..." />`, loading with high priority to avoid image decoding delays.
* **Product Detail Page:** The primary 3:4 portrait product photo in `ProductGallery.tsx` is marked with `priority`, ensuring instant render above the fold.
* **Font Swap Stability:** Google Fonts (`Playfair Display` and `Plus Jakarta Sans`) load with `display: 'swap'`, eliminating render-blocking webfont delays.

### Cumulative Layout Shift (CLS)
* **Aspect Ratio Reservation:** All product cards, thumbnail galleries, and hero visuals use strict Tailwind CSS aspect ratios (`aspect-[3/4]`), reserving viewport space before image bytes arrive.
* **Zero Layout Shift on Filter/Search:** Catalogue grid maintains a stable minimum height container and uses inline skeletons rather than full-page flashing spinners.

### Interaction to Next Paint (INP)
* **Leaf Client Components:** Interactive components (`CatalogueBrowser`, `ProductActions`, `ProductGallery`) are kept as leaf nodes in the React component tree.
* **Debounced/Local Filtering:** In-memory catalog filtering executes instantaneously without server roundtrips for active viewports.
* **GPU-Accelerated Transitions:** CSS transforms (`transform`, `opacity`) are used instead of animating `height`, `width`, or `margin`.

---

## 2. JAVASCRIPT & ASSET BUNDLE EFFICIENCY
* **Shared JS Size:** Production Next.js build shared client JavaScript is **87.3 kB**, well under standard e-commerce performance budgets.
* **Middleware Footprint:** Lightweight edge middleware compiled at **86.2 kB**.
* **Modern Media Formats:** Automated AVIF and WebP transcoding configured via `next.config.mjs`.

---

## 3. 3D DEPTH & MOTION PERFORMANCE
* **Pointer Throttle & Bounds:** Mousemove listener in `HeroSection.tsx` is throttled, restricted to desktop screens (`window.innerWidth >= 1024`), and clamped to ±2 degrees.
* **Reduced Motion Compliance:** In `globals.css`, `@media (prefers-reduced-motion: reduce)` sets animation/transition durations to 0.01ms and disables 3D transforms.
* **Touch Device Optimization:** Heavy pointer hover calculations are disabled on touch devices, maintaining 60fps native scrolling.

---

## 4. DATABASE QUERY EFFICIENCY
* **Server-Side Static Generation (SSG):** All 12 product pages and 5 category collections are pre-rendered into static HTML during build time (`generateStaticParams`).
* **Query Ceiling:** Defensive limit clauses (`limit(100)` on products, `limit(50)` on categories) protect the database from resource exhaustion.
