# BANWARILAL CLOTH HOUSE — ACCESSIBILITY SPECIFICATION

> **WCAG 2.2 LEVEL AA CONFORMANCE STANDARDS — PHASE 16**  
> **Brand Entity:** BANWARILAL CLOTH HOUSE (Established 2003, Chilbila, Pratapgarh)  
> **Status:** Production Standard

---

## 1. KEYBOARD NAVIGATION & FOCUS ARCHITECTURE

### Skip Navigation Link
* **Mechanism:** Rendered as the first DOM element in `app/layout.tsx`:
  `<a href="#main-content" className="sr-only focus:not-sr-only ...">Skip to main content</a>`
* **Target:** Focuses the semantic `<main id="main-content" tabIndex={-1}>` landmark, allowing keyboard and switch-access users to bypass repetitive header links.

### Visible Focus Indicators
* All interactive buttons, links, inputs, and selectors use high-contrast focus rings:
  `focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold`
* Focus indicators remain visible across dark, sand, and light backgrounds.

---

## 2. MODAL DIALOGS & DRAWERS

| Component | ARIA Role | Modal State | Escape Handling | Body Scroll Lock |
| :--- | :---: | :---: | :---: | :---: |
| `CartDrawer` | `role="dialog"` | `aria-modal="true"` | `Escape` key closes | Yes (`overflow: hidden`) |
| `MobileMenuDrawer` | `role="dialog"` | `aria-modal="true"` | `Escape` key closes | Yes (`overflow: hidden`) |
| `ProductGallery` Lightbox | `role="dialog"` | `aria-modal="true"` | `Escape` key closes | Yes (`overflow: hidden`) |

---

## 3. SCREEN READER LIVE REGIONS (`aria-live`)
* **Add to Bag Feedback:** An `aria-live="polite"` status region announces `"[Garment Name] added to shopping bag"` without disrupting page flow.
* **Filter Counter Feedback:** In `CatalogueBrowser.tsx`, dynamic product count updates (`Showing X of Y garments`) are marked with `aria-live="polite"`.
* **Cart Badge:** Navbar bag count uses `aria-live="polite"` to announce quantity modifications.

---

## 4. SEMANTIC HTML & LANDMARKS
* **Semantic Hierarchy:** Pages are structured using `<header>`, `<nav aria-label="...">`, `<main id="main-content">`, `<article>`, and `<footer>`.
* **Heading Structure:** Every public page provides a clear single `<h1>` followed by logical `<h2>` and `<h3>` section headings.
* **Product Card Cards:** Structured with `<article>` containing proper heading and price semantics.
* **Actions vs Navigation:** Links (`<a>`) are strictly used for navigation; action controls (`<button>`) are used for mutations and drawer triggers.

---

## 5. TOUCH TARGETS & MOBILE ACCESSIBILITY
* **Touch Target Sizing:** All interactive mobile buttons, quantity increment/decrement controls, drawer close icons, and WhatsApp triggers meet or exceed the 44×44 CSS pixel touch target standard.
* **No Gesture Trapping:** All carousels and drawers feature visible tap targets and can be dismissed via backdrop click or close button.

---

## 6. REDUCED MOTION SUPPORT
* Full support for `@media (prefers-reduced-motion: reduce)` in `app/globals.css`.
* Disables 3D spatial tilts in `HeroSection.tsx` and eliminates non-essential CSS transitions for vestibular-sensitive users.
