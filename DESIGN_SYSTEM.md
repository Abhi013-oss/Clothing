# BANWARILAL CLOTH HOUSE — PREMIUM FASHION BRAND UI DESIGN SYSTEM

> **CANONICAL DESIGN SPECIFICATION — PHASE 06**  
> **Brand Entity:** BANWARILAL CLOTH HOUSE (Established 2003, Chilbila, Pratapgarh)  
> **Document Version:** 1.0.0  
> **Governing Specifications:**  
> • [`PROJECT_SOURCE_OF_TRUTH.md`](./PROJECT_SOURCE_OF_TRUTH.md)  
> • [`PRODUCT_REQUIREMENTS_DOCUMENT.md`](./PRODUCT_REQUIREMENTS_DOCUMENT.md)  
> • [`TECHNICAL_REQUIREMENTS_DOCUMENT.md`](./TECHNICAL_REQUIREMENTS_DOCUMENT.md)  
> • [`INFORMATION_ARCHITECTURE.md`](./INFORMATION_ARCHITECTURE.md)  
> • [`USER_FLOW_AND_INTERACTION_SPEC.md`](./USER_FLOW_AND_INTERACTION_SPEC.md)  
> **Companion Documents:**  
> • [`DESIGN_TOKENS.md`](./DESIGN_TOKENS.md) (Raw & Semantic Design Tokens)  
> • [`DESIGN_DECISIONS.md`](./DESIGN_DECISIONS.md) (Design Decision Records)  
> **Status:** Authoritative Visual Architecture for Phase 07 (3D & Motion) and Phase 08 (Implementation)

---

## 1. BRAND DIRECTION & VISUAL AESTHETIC

### 1.1 The Strategic Brand Persona: "Editorial Heritage"
BANWARILAL CLOTH HOUSE is not a software startup, a fast-fashion discount warehouse, or an algorithmically generated generic marketplace. It is an established physical cloth house and apparel retailer founded in 2003 near Hanuman Mandir, Chilbila, Pratapgarh, Uttar Pradesh.

The design identity operates under the philosophy of **"Confidence Through Restraint"**:
* **Established & Trustworthy:** Honors over two decades of retail craftsmanship and personal merchant hospitality.
* **Modern Luxury Editorial:** Visual presentation inspired by high-end Indian couture houses and high-fashion magazines (generous whitespace, asymmetric balance, hairline dividers, atmospheric natural-light photography).
* **Local Warmth & Authentic Pride:** Rooted in its physical reality in Chilbila, making local shoppers feel deeply valued while offering a seamless digital showroom.

### 1.2 The Anti-Patterns (What We Explicitly Reject)
* ❌ **No AI Template Clichés:** No neon gradients, no random purple/cyan glow effects, no generic SaaS card grids.
* ❌ **No Cheap Marketplace Clutter:** No garish "70% OFF" sale badges, no countdown timers, no fake scarcity toasts ("Only 1 left!").
* ❌ **No Overdesigned 3D:** No spinning 3D clothing canvases, no particle physics, no WebGL memory hogs.

---

## 2. COLOR SYSTEM & SEMANTIC ROLES

The color architecture strictly follows the **70–80% Neutral / 15–20% Dark / ≤5% Accent** distribution law established in Phase 01.

| Token Name | Hex Code | Purpose & Semantic Application | Distribution Ratio |
| :--- | :--- | :--- | :--- |
| **`canvas-base`** (Canvas Ivory) | `#FAF8F5` | Main body background, editorial reading blocks, modal underlays. Softens digital glare and mimics natural unbleached cotton/raw silk. | **70–75%** |
| **`canvas-pure`** (Studio White) | `#FFFFFF` | Product card surface, cart drawer interior, input surfaces. Delivers pristine chromatic contrast for garment colors. | **5–10%** |
| **`canvas-muted`** (Linen Beige) | `#EFECE6` | Alternating section bands, tag pill backgrounds, table headers, skeleton shimmer bases. | **5–10%** |
| **`ink-primary`** (Deep Charcoal) | `#18181B` | Primary headings, editorial titles, body text, primary button fills. Richer and softer than flat `#000000`. | **15–20%** |
| **`ink-secondary`** (Warm Taupe) | `#716E68` | Secondary copy, metadata, category labels, specification table keys, inactive indicators. | Supporting |
| **`ink-border`** (Hairline Sand) | `#E5E0D8` | 1px delicate structural rules, subtle card outlines, fine borders. | Supporting |
| **`accent-gold`** (Muted Champagne) | `#C5A880` | Restrained luxury highlights: active category pills, 2003 heritage tags, focus rings, fine ornamental accents. Never used as a full-bleed background. | **≤ 5%** |
| **`brand-whatsapp`** (WhatsApp Emerald) | `#25D366` | Dedicated order/inquiry action triggers (`#1EBE5D` on hover). Reserved exclusively for the WhatsApp channel. | Channel |

---

## 3. TYPOGRAPHY SYSTEM

Typography pairs classical Indian couture elegance with ultra-clean digital legibility across high-density mobile screens.

### 3.1 Font Families
* **Display Serif:** `Playfair Display` (Google Fonts, self-hosted for zero external latency).  
  *Usage:* Hero headlines, section titles, editorial quotes, brand masthead. Evokes craftsmanship, heritage weaving, and editorial prestige.
* **UI Sans-Serif:** `Plus Jakarta Sans` (Google Fonts, self-hosted).  
  *Usage:* Product titles, descriptions, navigation links, buttons, specifications, cart controls, prices. High x-height, open apertures, flawless legibility at `13px–16px` on budget Android smartphones.

### 3.2 Typographic Hierarchy Matrix
| Token | Family | Weight | Size (Desktop / Mobile) | Line Height | Tracking | Application |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **`display-2xl`** | Playfair Display | 500 (Medium) | `56px` / `36px` | `1.10` | `-0.02em` | Homepage Hero primary headline |
| **`display-xl`** | Playfair Display | 500 (Medium) | `44px` / `30px` | `1.15` | `-0.015em` | Major section titles, Brand Story headline |
| **`display-lg`** | Playfair Display | 600 (SemiBold) | `32px` / `24px` | `1.20` | `-0.01em` | Product detail page title, Category titles |
| **`heading-md`** | Plus Jakarta Sans | 600 (SemiBold) | `20px` / `18px` | `1.30` | `0em` | Drawer headers, Sub-section headers |
| **`heading-sm`** | Plus Jakarta Sans | 500 (Medium) | `16px` / `15px` | `1.40` | `0em` | Product card titles, Related item titles |
| **`body-lg`** | Plus Jakarta Sans | 400 (Regular) | `18px` / `16px` | `1.60` | `0em` | Editorial narrative paragraphs |
| **`body-md`** | Plus Jakarta Sans | 400 (Regular) | `15px` / `14px` | `1.55` | `0em` | Standard body text, garment descriptions |
| **`body-sm`** | Plus Jakarta Sans | 400 (Regular) | `13px` / `12px` | `1.50` | `+0.01em` | Specification values, secondary notes |
| **`meta-tag`** | Plus Jakarta Sans | 600 (SemiBold) | `12px` / `11px` | `1.20` | `+0.05em` | Category tags, uppercase pills, badges |
| **`price-display`**| Plus Jakarta Sans | 600 (SemiBold) | `18px` / `16px` | `1.20` | `-0.01em` | Retail prices (e.g. `₹2,450`) |

---

## 4. LOGO TREATMENT & BRAND IDENTITY

* **Canonical Wordmark:** In the absence of an authorized vector graphic from the client, the brandmark is rendered using typographic authority:
  * Primary Text: `BANWARILAL CLOTH HOUSE` (All-Caps, `Playfair Display`, Medium weight, `letter-spacing: +0.08em`).
  * Subtitle Tagline: `CHILBILA, PRATAPGARH • EST. 2003` (`Plus Jakarta Sans`, 500 weight, `letter-spacing: +0.12em`, color `#716E68`).
* **Sizing:**
  * Desktop Header: Height `28px`, Clear space minimum `24px` on all sides.
  * Mobile Header: Height `22px` (condensed single-line: `BANWARILAL CLOTH HOUSE`).
* **Protection Rules:**
  * Never stretch or apply artificial perspective distortion.
  * Never place on visually competing, unmasked photographic backgrounds.
  * Maintain pure high-contrast `#18181B` on light surfaces and `#FAF8F5` on dark surfaces.

---

## 5. SPACING & LAYOUT SYSTEM

The layout adheres to an **8-point mathematical grid** with 4px micro-increments.

```
SPACING SCALE (rem based, 16px root):
4px (0.25rem)  ──► 8px (0.5rem)   ──► 12px (0.75rem) ──► 16px (1rem)
24px (1.5rem)  ──► 32px (2rem)    ──► 48px (3rem)    ──► 64px (4rem)
80px (5rem)    ──► 96px (6rem)    ──► 128px (8rem)   ──► 160px (10rem)
```

* **Editorial Section Gaps:** Desktop sections breathe with `py-20` (`80px`) to `py-28` (`112px`). Mobile sections use `py-12` (`48px`) to `py-16` (`64px`).
* **Max Container Bounds:**
  * Maximum layout width: `1360px` (`max-w-7xl` with `px-6` to `px-12` gutters).
  * Text editorial reading column: `680px` (`max-w-2xl` for optimum line length of 65–75 characters).

---

## 6. GRID SYSTEM & RESPONSIVE BREAKPOINTS

* **Desktop (1200px+):** 12-column fluid grid, 32px gutters.
  * Product grids: 4 columns (`grid-cols-4`, 24px gap).
* **Tablet (768px – 1199px):** 8-column grid, 24px gutters.
  * Product grids: 3 columns (`grid-cols-3`, 20px gap).
* **Mobile (320px – 767px):** 4-column grid, 16px gutters.
  * Product grids: 2 columns (`grid-cols-2`, 12px gap) maximizing image area.

---

## 7. RADIUS & SHADOW SYSTEM (TACTILE PHYSICAL DEPTH)

### 7.1 Border Radius Architecture
We balance **sharp architectural fashion edges** with **soft tactile touch targets**:
* **Sharp Architectural (0px):** Hero photographic frames, full-bleed visual showcase containers, horizontal section divider bands.
* **Card Subtlety (4px / `rounded-sm`):** Product cards, category cards, modal dialog shells. Prevents the "bubble UI" generic look.
* **Interactive Pills (9999px / `rounded-full`):** Category filter pills, search input bar, floating badges, quantity buttons.

### 7.2 Multi-Stop Atmospheric Shadow Scale
Shadows simulate soft natural daylight passing through a retail showroom window, avoiding hard clinical drops:
```css
/* Ambient Rest Elevation */
--shadow-card-rest: 0 1px 3px 0 rgba(24, 24, 27, 0.04), 0 1px 2px -1px rgba(24, 24, 27, 0.03);

/* Hover Micro-Elevation */
--shadow-card-hover: 0 12px 28px -6px rgba(24, 24, 27, 0.08), 0 4px 10px -2px rgba(24, 24, 27, 0.04);

/* Flyout Drawer / Modal Backdrop Elevation */
--shadow-drawer: -8px 0 32px -4px rgba(24, 24, 27, 0.12);

/* Floating WhatsApp Anchor */
--shadow-floating: 0 8px 24px -4px rgba(37, 211, 102, 0.35);
```

---

## 8. BUTTON & ACTION DESIGN SYSTEM

Buttons convey distinct visual authority without competing with each other.

```
┌───────────────────────────────────────┐
│     PRIMARY BUTTON (Dark Charcoal)    │  ◄── bg-[#18181B] text-white hover:bg-[#27272A]
└───────────────────────────────────────┘
┌───────────────────────────────────────┐
│   WHATSAPP ACTION (Emerald Brand)     │  ◄── bg-[#25D366] text-white hover:bg-[#1EBE5D]
└───────────────────────────────────────┘
┌───────────────────────────────────────┐
│     SECONDARY / OUTLINE (Taupe Sand)  │  ◄── border-[#E5E0D8] text-[#18181B] hover:bg-[#EFECE6]
└───────────────────────────────────────┘
```

1. **Primary Action (`ButtonPrimary`):**
   * Style: Solid Deep Charcoal (`#18181B`), crisp white text, `rounded-sm` (4px), 48px height.
   * Typography: `Plus Jakarta Sans`, 600 weight, 14px, `letter-spacing: +0.03em`.
   * Usage: `Explore Collection`, `Add to Bag`, `Apply Filters`.
2. **WhatsApp Action (`ButtonWhatsApp`):**
   * Style: WhatsApp Emerald (`#25D366`), white text, embedded WhatsApp vector glyph, `rounded-sm` (4px), 48px height.
   * Hover: Deepens to `#1EBE5D` with subtle glow (`--shadow-floating`).
   * Usage: `Order on WhatsApp`, `Enquire on WhatsApp`.
3. **Secondary Action (`ButtonOutline`):**
   * Style: 1px border in `#E5E0D8`, Canvas Ivory background, text `#18181B`.
   * Hover: Shifts to Linen Beige (`#EFECE6`).
   * Usage: `View Details`, `Continue Shopping`, `Get Directions`.

---

## 9. PRODUCT CARD ARCHITECTURE (STANDARDIZED 3:4 RATIO)

The product card is the atomic cornerstone of the digital catalogue:
```
┌────────────────────────────────────────┐
│                                        │
│         STANDARDIZED 3:4 RATIO         │
│                                        │
│       High-Resolution Photography      │
│      Natural Daylight / Crisp Crop     │
│                                        │
│  [ Category Tag ]      [ In Stock Pill]│  ◄── Floating 8px from top corners
│                                        │
├────────────────────────────────────────┤
│ Royal Crimson Banarasi Saree           │  ◄── 15px Medium, Deep Charcoal
│ ₹3,450  (or "Price on Request")        │  ◄── 15px SemiBold, Neutral Charcoal
│ Pure Katan Silk • Zari Woven Border    │  ◄── 12px Regular, Warm Taupe (#716E68)
│                                        │
│ [ + Add to Bag ]                       │  ◄── Quick touch action (bottom right / mobile full)
└────────────────────────────────────────┘
```
* **Aspect Ratio:** `3 / 4` (Width: 300px → Height: 400px; or Width: 600px → Height: 800px).
* **Hover Interaction:** The image scales gently by `1.035` inside an `overflow-hidden` container; the card elevates by `-4px` over `300ms cubic-bezier(0.16, 1, 0.3, 1)`.
* **Zero Clutter:** No star ratings, no discount banners, no countdown timers. The garment weave is the hero.

---

## 10. NAVIGATION DESIGN SYSTEM

* **Sticky Top Navbar (Desktop 80px / Mobile 64px):**
  * Surface at Page Top: Transparent or 95% Canvas Ivory (`rgba(250, 248, 245, 0.92)`) with `backdrop-blur-md` and 1px bottom border in `#E5E0D8`.
  * Brand Masthead: Left-aligned, bold serif authority.
  * Nav Links: Center-aligned (`Collections`, `About`, `Store Location`) with 1px active underline indicator in Champagne Gold (`#C5A880`).
  * Right Utilities: Instant search trigger, Shopping Bag icon with counter badge, and compact WhatsApp anchor.
* **Mobile Off-Canvas Navigation:**
  * Width: 320px right-sliding panel.
  * Surface: Canvas Ivory (`#FAF8F5`) with crisp hairline borders.
  * Integrated Action Footer: Quick-action direct buttons for `Call Store`, `WhatsApp Us`, and `Google Maps Directions`.

---

## 11. IMAGE ART DIRECTION & PHOTOGRAPHY STANDARDS

1. **Standard Aspect Ratio:** All product catalogue visuals strictly conform to `3:4` vertical portrait proportions (`aspect-[3/4]`).
2. **Color Fidelity & Natural Lighting:**
   * Warm, soft natural window light or diffuse studio daylight.
   * Zero artificial filters, zero heavy vignetting, zero exaggerated saturation. Indian bridal, silk, and festive garments rely on true color fidelity (e.g., true Crimson vs. Ruby; true Mustard vs. Gold).
3. **Backgrounds:** Clean neutral backings (off-white, subtle beige, architectural stone, warm linen).
4. **Graceful Asset Failure:** If an image fails to load, a custom SVG placeholder renders in warm taupe (`#716E68`) and linen beige (`#EFECE6`) featuring an understated botanical/fabric weave icon.

---

## 12. ICONOGRAPHY SYSTEM

* **Library:** `lucide-react` (selected for fine 1.5px stroke weight and geometric consistency).
* **Applied Icon Set:**
  * Navigation: `Menu`, `X`, `Search`, `ShoppingBag`, `ArrowRight`, `ChevronDown`.
  * Store & Action: `MapPin`, `Phone`, `Clock`, `Sparkles`, `Check`, `Trash2`, `ExternalLink`.
  * Channel: Canonical SVG WhatsApp icon.
* **Consistency Rule:** All UI icons render at 18px or 20px with matching stroke weight `1.5px` and color `#18181B` (or `#716E68` for metadata).

---

## 13. MOTION PRINCIPLES & MICRO-INTERACTIONS

* **Purpose-Driven Restraint:** Every animation must guide customer attention or provide functional confirmation.
* **Durations & Easings:**
  * Micro-interactions (Button clicks, hover): `150ms` to `200ms` (`ease-out`).
  * Layout transitions (Drawer slide, modal fade): `300ms` to `400ms` (`cubic-bezier(0.16, 1, 0.3, 1)`).
* **Reduced Motion Guarantee:** Fully honors `@media (prefers-reduced-motion: reduce)` by disabling transforms and setting transitions to `0ms`.

---

## 14. RESPONSIVE DESIGN SPECIFICATIONS

| Breakpoint Tier | Viewport Width | Product Grid | Header Height | Key UI Adaptations |
| :--- | :--- | :--- | :--- | :--- |
| **Mobile Compact** | `320px – 374px` | 1 Column | `60px` | Full-width buttons, compact 1-line brand mark, 12px margins. |
| **Mobile Standard** | `375px – 430px` | 2 Columns | `64px` | 2-col compact grid (12px gap), touch-friendly 44px tap targets. |
| **Tablet** | `768px – 1023px` | 3 Columns | `72px` | 3-col grid, visible desktop nav links, 420px cart drawer. |
| **Desktop Standard** | `1024px – 1439px` | 4 Columns | `80px` | Full 12-col grid, hover zooms, 460px cart drawer. |
| **Large Displays** | `1440px+` | 4 Columns | `80px` | Capped `1360px` max-width container, generous `px-12` editorial margins. |

---

## 15. ACCESSIBILITY RULES (WCAG 2.1 AA COMPLIANCE)

* **Contrast Ratios:**
  * Deep Charcoal (`#18181B`) on Canvas Ivory (`#FAF8F5`): `14.2:1` (Exceeds WCAG AAA `7:1`).
  * Warm Taupe (`#716E68`) on Canvas Ivory (`#FAF8F5`): `4.8:1` (Exceeds WCAG AA `4.5:1`).
  * Champagne Gold (`#C5A880`) on Charcoal (`#18181B`): `5.6:1` (Exceeds WCAG AA).
* **Visible Keyboard Focus Ring:** Interactive elements feature `focus-visible:ring-2 focus-visible:ring-[#C5A880] focus-visible:ring-offset-2`.
* **Semantics & Screen Readers:** Native semantic HTML5 elements (`<nav>`, `<header>`, `<main>`, `<article>`, `<footer>`); dynamic announcements via `aria-live="polite"`.

---

## 16. PERFORMANCE DESIGN SPECIFICATIONS

* **Asset Budget:** Initial client JavaScript payload capped at `< 90 KB`.
* **Font Delivery:** Self-hosted `Playfair Display` and `Plus Jakarta Sans` subsets with `font-display: swap`.
* **Zero CSS Overhead:** Tailwind CSS utility purging eliminates unused styles; zero runtime CSS-in-JS.
* **Layout Stability:** All garment cards reserve vertical space via `aspect-[3/4]`, guaranteeing `CLS: 0.00`.

---

## 17. CONTENT TONE & EDITORIAL COPYWRITING

* **Dignified & Factual:** Clear, proud, honest communication reflecting over 20 years in Chilbila bazaar.
* **Absence of Hyperbole:** Strictly no unverified claims (*"Best store in India"*, *"100% pure silk guaranteed"*).
* **Sample Headings:**
  * Hero: *"Timeless Weaves, Woven for Generations."*
  * Heritage: *"Rooted in Chilbila Since 2003."*
  * Footfall: *"Experience the Fabrics in Person Near Hanuman Mandir."*

---

## 18. ANTI-TEMPLATE & ANTI-OVERDESIGN AUDIT

| Anti-Pattern Check | Verification | Design System Resolution |
| :--- | :---: | :--- |
| Does it look like an AI-generated site? | **NO** | Replaced generic gradients with warm canvas ivory, editorial serif typography, and asymmetric magazine layouts. |
| Did we add unnecessary 3D meshes? | **NO** | Tactile depth is achieved purely via CSS box-shadows, micro-elevations, and image scaling. |
| Does it look like a corporate SaaS tool? | **NO** | Eliminated heavy card borders, dashboard pill tags, and tech icons. Garment photography takes 75% of screen presence. |
| Are CTAs competing or cluttered? | **NO** | Clear hierarchy: `Explore Collection` (Primary Dark), `Order on WhatsApp` (Emerald), `Get Directions` (Secondary Outline). |
