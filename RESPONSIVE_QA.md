# BANWARILAL CLOTH HOUSE — RESPONSIVE QA SPECIFICATION

> **MULTI-VIEWPORT & DEVICE RESPONSIVENESS AUDIT — PHASE 17**  
> **Brand Entity:** BANWARILAL CLOTH HOUSE (Established 2003, Chilbila, Pratapgarh)  
> **Status:** Passed Across All Standard Viewports

---

## 1. VIEWPORT BREAKPOINT MATRIX

| Target Viewport | Device Representation | Navigation Mode | Grid Layout | Result |
| :--- | :--- | :--- | :--- | :---: |
| **320px** | Minimum Mobile / iPhone SE (1st Gen) | Off-canvas drawer | 2 columns (tight gap) | **PASS** (Zero horizontal overflow) |
| **360px** | Common Android Viewport | Off-canvas drawer | 2 columns (compact gap) | **PASS** |
| **375px** | iPhone 12/13 Mini | Off-canvas drawer | 2 columns (standard gap) | **PASS** |
| **390px** | iPhone 13/14/15 | Off-canvas drawer | 2 columns | **PASS** |
| **414px** | iPhone XR / Plus sizes | Off-canvas drawer | 2 columns | **PASS** |
| **430px** | iPhone 14/15 Pro Max | Off-canvas drawer | 2 columns | **PASS** |
| **480px** | Large Mobile / Phablet | Off-canvas drawer | 2 columns | **PASS** |
| **768px** | iPad Mini / Portrait Tablet | Desktop Header (`md:flex`) | 3 columns | **PASS** |
| **834px** | iPad Air / Standard Tablet | Desktop Header | 3 columns | **PASS** |
| **1024px** | iPad Pro / Small Laptop | Desktop Header + 3D Tilt | 4 columns | **PASS** (3D tilt activated) |
| **1280px** | Standard Desktop Display | Desktop Header + 3D Tilt | 4 columns | **PASS** |
| **1440px** | High-DPI Desktop / MacBook | Max-width centered container | 4 columns | **PASS** (`max-w-7xl` containment) |
| **1920px+** | Ultra-Wide Monitor | Max-width centered container | 4 columns | **PASS** (No content distortion) |

---

## 2. COMPONENT-SPECIFIC RESPONSIVE BEHAVIOR

### Header & Navigation
* **Mobile (<768px):** Displays brand masthead, shopping bag icon with badge, and hamburger menu trigger. Off-canvas drawer slides smoothly from the right with full-height backdrop.
* **Desktop (≥768px):** Hamburger menu hides; full navigation links (`Home`, `Collections`, `Heritage & Story`, `Store Location`) render inline with WhatsApp quick trigger.

### Homepage Hero & 3D Spatial Frame
* **Mobile (<1024px):** 3D pointer tracking is strictly disabled to conserve GPU memory and prevent scrolling interference. The hero image renders as a stable, high-fidelity portrait container with `priority` loading.
* **Desktop (≥1024px):** Subtle ±2 degree perspective tilt tracks cursor movements with smooth easing.

### Product Detail Page
* **Mobile (<768px):** Stacked vertical presentation (Gallery first, followed by specs, price, and actions). A fixed bottom action bar (`md:hidden`) stays anchored for one-tap Add to Bag and WhatsApp ordering. `pb-28` provides clearance.
* **Desktop (≥768px):** Side-by-side split grid (Sticky gallery left, editorial narrative and actions right).

### Cart Drawer & Full Cart Page
* Drawer scales to `max-w-md` on wide screens and spans full screen width on narrow mobile viewports.
* Stepper buttons (`+` and `-`) provide a minimum 44×44px touch target on touch screens.
