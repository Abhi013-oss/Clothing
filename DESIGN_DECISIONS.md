# BANWARILAL CLOTH HOUSE — DESIGN DECISION RECORDS (DDR)

> **CANONICAL DESIGN RATIONALE — PHASE 06**  
> **Brand Entity:** BANWARILAL CLOTH HOUSE (Est. 2003, Chilbila, Pratapgarh)  
> **Status:** Locked Architectural Record to Prevent Unintended Drift in Subsequent Phases

---

## 1. DDR-01: WHY THE COLOR PALETTE WAS SELECTED (IVORY, CHARCOAL, TAUPE & MUTED GOLD)

### Decision
Adopt a disciplined palette composed of **Canvas Ivory (`#FAF8F5`)**, **Studio White (`#FFFFFF`)**, **Linen Beige (`#EFECE6`)**, **Deep Charcoal (`#18181B`)**, **Warm Taupe (`#716E68`)**, and **Muted Champagne Gold (`#C5A880`, capped at ≤ 5%)**.

### Rationale
1. **Garment Color Fidelity:** Clothing, especially traditional Indian sarees, lehengas, and embroidered suits, relies on subtle shade nuances (e.g., Crimson vs. Wine, Mustard vs. Haldi Gold). Saturated colored website backgrounds (such as deep blues, purples, or reds) distort the human eye's perception of garment dyes.
2. **Textile Tactility:** Warm Canvas Ivory (`#FAF8F5`) replicates the look of unbleached natural cotton, linen, and raw silk paper, creating warmth without the sterile, clinical glare of pure `#FFFFFF`.
3. **Heritage Authority:** Deep Charcoal (`#18181B`) delivers sharp, high-contrast typography without the harshness of pitch-black, elevating the brand to couture-level sophistication.
4. **Restraint Over Bling:** Gold is historically overused on local Indian store websites, resulting in a cheap, gaudy appearance. By capping Champagne Gold (`#C5A880`) to ≤ 5% of the visual field, it functions exclusively as a genuine luxury accent.

### Rejected Alternatives
* *Pure Black Dark Mode:* Heavy dark mode hides fabric textures and feels like a gaming or crypto portal.
* *Royal Blue / Saffron Dominance:* Clashes with multi-colored garments and resembles a generic corporate site.

---

## 2. DDR-02: WHY TYPOGRAPHY COMBINES AN EDITORIAL SERIF WITH A MODERN SANS-SERIF

### Decision
Pair **`Playfair Display`** (Display Serif) for major headlines with **`Plus Jakarta Sans`** (Geometric Humanist Sans) for all UI, metadata, and body copy.

### Rationale
1. **Classical Couture Heritage:** `Playfair Display` carries classical proportions, delicate serifs, and high stroke contrast that instantly telegraph fashion editorial authority, establishing the business's 2003 founding heritage.
2. **Mobile Readability on Mid-Range Displays:** Many local customers in Pratapgarh and Uttar Pradesh browse on mid-range Android smartphones with varying screen pixel densities. `Plus Jakarta Sans` provides open apertures, tall x-height, and robust letterforms that remain crisp at `12px–15px` sizes, ensuring seamless readability for prices and specifications.

### Rejected Alternatives
* *All-Serif Typography:* Reduces legibility in compact mobile product cards and data tables.
* *All-Sans Typography (e.g. Roboto/Inter alone):* Strips away the clothing heritage, making the store look like a generic tech startup.

---

## 3. DDR-03: WHY HOMEPAGE & CATALOGUE LAYOUTS ARE EDITORIAL RATHER THAN A CONTINUOUS CARD WALL

### Decision
Structure the Homepage and collection introductions with asymmetric layouts, visual pauses, and alternating section densities rather than a relentless grid of identical e-commerce cards.

### Rationale
1. **Brand Elevation:** High-end fashion lookbooks break the visual rhythm with full-bleed photographic moments, typography quotes, and heritage storytelling.
2. **Cognitive Fatigue:** A wall of 50 identical product cards overwhelms the customer and encourages price-scraping behavior. An editorial flow guides the customer intentionally: *Who we are* → *Curated Categories* → *Featured Pieces* → *Physical Store Trust* → *WhatsApp Inquiry*.

### Rejected Alternatives
* *Amazon/Flipkart Dense Card Grid:* Cheapens brand perception and treats handcrafted garments like commodity consumer electronics.

---

## 4. DDR-04: WHY 3D & DEPTH EFFECTS ARE RESTRAINED TO PURE CSS

### Decision
Implement subtle tactile depth using multi-stop CSS box-shadows, soft micro-elevations (`-4px`), and image scaling (`1.035`), while strictly prohibiting WebGL, Three.js, or continuous canvas animations.

### Rationale
1. **Mobile Battery & Performance:** Heavy 3D libraries consume 500KB+ of JavaScript and drain smartphone batteries, introducing stutter on regional 4G mobile connections.
2. **Focus on the Garment:** 3D spinning meshes and particle backgrounds distract from the real product. In clothing retail, the garment itself must always be the focal point.
3. **Core Web Vitals:** CSS-only depth effects run on the GPU compositor thread, achieving zero layout shifts (`CLS: 0.00`) and sub-100ms interaction latency (`INP`).

---

## 5. DDR-05: WHY ARCHITECTURAL SHARP EDGES ARE BALANCED WITH TOUCH-PILL BUTTONS

### Decision
Use sharp architectural corners (`0px` / `4px`) for image frames and structural containers, while reserving fully rounded pills (`rounded-full`) strictly for interactive touch controls (category pills, filter toggles, quantity buttons).

### Rationale
1. **Editorial Sophistication:** High-fashion magazines use crisp, clean image cuts. Overly rounded card borders (`rounded-2xl` or `rounded-3xl`) produce an amateurish, toy-like "bubble UI."
2. **Touch Ergonomics:** Fully rounded pills for buttons and filters provide high affordance for thumb taps on mobile screens, creating a clear visual distinction between *content frames* and *interactive controls*.

---

## 6. DDR-06: WHY THE WHATSAPP ACTION HAS A DEDICATED CHANNEL COLOR

### Decision
Retain official **WhatsApp Emerald (`#25D366`)** exclusively for the final order/inquiry action triggers, while keeping all other primary actions in **Deep Charcoal (`#18181B`)**.

### Rationale
1. **Universal Channel Recognition:** In India, WhatsApp Emerald is an instantly recognizable signifier of instant, personal communication.
2. **Restraint & Brand Integrity:** If the entire website used green buttons, the brand identity would be hijacked by WhatsApp. By reserving green strictly for the final conversion trigger (`Order on WhatsApp`), it stands out with high visual contrast while preserving the brand's luxury neutral palette.

---

## 7. DDR-07: WHY AGGRESSIVE ANIMATIONS & SCROLL-JACKING ARE PROHIBITED

### Decision
Prohibit all scroll-jacking, horizontal hijacked scrolling, spinning decorative elements, and entrance animations longer than `400ms`.

### Rationale
1. **User Frustration:** Scroll-jacking breaks native mobile browser navigation and frustrates shoppers trying to review garments quickly.
2. **Accessibility Standards:** Complex continuous animations trigger vestibular motion sensitivity. All transitions strictly respect `prefers-reduced-motion: reduce`.
3. **Perceived Speed:** Instant or snappy transitions (`150ms–300ms`) make the digital catalogue feel remarkably fast and responsive.
