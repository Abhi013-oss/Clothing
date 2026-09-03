# BANWARILAL CLOTH HOUSE — DESIGN TOKENS SPECIFICATION

> **CANONICAL TOKEN DEFINITIONS — PHASE 06**  
> **Brand Entity:** BANWARILAL CLOTH HOUSE  
> **Companion To:** [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md)  
> **Implementation Format:** Tailwind CSS v3/v4 Theme Extension & CSS Custom Properties

---

## 1. COLOR TOKENS

### 1.1 Primitive Color Scale
```css
:root {
  /* Canvas & Neutral Tones */
  --raw-canvas-ivory:       #FAF8F5; /* Warm off-white base */
  --raw-studio-white:       #FFFFFF; /* Pure high-contrast surface */
  --raw-linen-beige:        #EFECE6; /* Subtle secondary neutral */
  --raw-sand-light:         #F5F2EC; /* Lightest warm sand */
  --raw-sand-border:        #E5E0D8; /* Hairline structural divider */
  
  /* Ink & Typographic Tones */
  --raw-charcoal-900:       #18181B; /* Deep near-black charcoal */
  --raw-charcoal-800:       #27272A; /* Dark charcoal hover */
  --raw-taupe-700:          #524F49; /* Dark taupe reading text */
  --raw-taupe-500:          #716E68; /* Balanced taupe metadata */
  --raw-taupe-400:          #8C877F; /* Light taupe disabled state */
  
  /* Accent & Channel Tones */
  --raw-champagne-gold:     #C5A880; /* Muted luxury accent */
  --raw-champagne-hover:    #B8996E; /* Active gold hover */
  --raw-whatsapp-emerald:   #25D366; /* Official WhatsApp channel */
  --raw-whatsapp-dark:      #1EBE5D; /* WhatsApp hover state */
  
  /* Functional Status */
  --raw-success-green:      #15803D; /* In Stock indicator */
  --raw-alert-red:          #991B1B; /* Form error / remove badge */
}
```

### 1.2 Semantic Theme Tokens (Tailwind Mapping)
```typescript
// tailwind.config.ts color mapping
export const colors = {
  canvas: {
    DEFAULT: 'var(--raw-canvas-ivory)',       // #FAF8F5 - 70–80% background
    pure: 'var(--raw-studio-white)',          // #FFFFFF - Surface elevation
    muted: 'var(--raw-linen-beige)',          // #EFECE6 - Secondary sections/pills
    sand: 'var(--raw-sand-light)',            // #F5F2EC - Soft card backing
  },
  ink: {
    DEFAULT: 'var(--raw-charcoal-900)',       // #18181B - Primary text & dark CTAs
    hover: 'var(--raw-charcoal-800)',         // #27272A - CTA hover state
    secondary: 'var(--raw-taupe-500)',        // #716E68 - Metadata & sub-headers
    muted: 'var(--raw-taupe-400)',            // #8C877F - Inactive labels
    border: 'var(--raw-sand-border)',         // #E5E0D8 - 1px hairline dividers
  },
  accent: {
    DEFAULT: 'var(--raw-champagne-gold)',     // #C5A880 - Luxury accent (≤5%)
    hover: 'var(--raw-champagne-hover)',      // #B8996E - Accent interactive hover
  },
  channel: {
    whatsapp: 'var(--raw-whatsapp-emerald)',   // #25D366 - Dedicated WhatsApp CTA
    whatsappHover: 'var(--raw-whatsapp-dark)',// #1EBE5D - Active WhatsApp hover
  },
  status: {
    success: 'var(--raw-success-green)',      // #15803D - In stock badge
    error: 'var(--raw-alert-red)',            // #991B1B - Error notifications
  }
};
```

---

## 2. TYPOGRAPHY TOKENS

### 2.1 Font Families
```css
--font-family-serif: 'Playfair Display', Georgia, Cambria, 'Times New Roman', serif;
--font-family-sans:  'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

### 2.2 Typographic Scale Tokens
```typescript
export const fontSize = {
  // Editorial Display Serifs
  'display-2xl': ['3.5rem',   { lineHeight: '1.10', letterSpacing: '-0.02em',  fontWeight: '500' }], // 56px (Desktop Hero)
  'display-xl':  ['2.75rem',  { lineHeight: '1.15', letterSpacing: '-0.015em', fontWeight: '500' }], // 44px (Section Headers)
  'display-lg':  ['2.0rem',   { lineHeight: '1.20', letterSpacing: '-0.01em',  fontWeight: '600' }], // 32px (PDP Title)
  'display-md':  ['1.5rem',   { lineHeight: '1.25', letterSpacing: '-0.005em', fontWeight: '600' }], // 24px (Category Title)

  // Clean UI Sans-Serifs
  'heading-md':  ['1.25rem',  { lineHeight: '1.30', letterSpacing: '0em',       fontWeight: '600' }], // 20px (Modal Headers)
  'heading-sm':  ['1.0rem',   { lineHeight: '1.40', letterSpacing: '0em',       fontWeight: '500' }], // 16px (Product Card Title)
  'body-lg':     ['1.125rem', { lineHeight: '1.60', letterSpacing: '0em',       fontWeight: '400' }], // 18px (Narrative Body)
  'body-md':     ['0.9375rem',{ lineHeight: '1.55', letterSpacing: '0em',       fontWeight: '400' }], // 15px (Standard UI Body)
  'body-sm':     ['0.8125rem',{ lineHeight: '1.50', letterSpacing: '+0.01em',   fontWeight: '400' }], // 13px (Spec Table Rows)
  'meta-tag':    ['0.75rem',  { lineHeight: '1.20', letterSpacing: '+0.05em',   fontWeight: '600' }], // 12px (Uppercase Tags)
  'price':       ['1.125rem', { lineHeight: '1.20', letterSpacing: '-0.01em',  fontWeight: '600' }], // 18px (Price Display)
};
```

---

## 3. SPACING TOKENS (8-POINT SYSTEM)

```typescript
export const spacing = {
  '0':    '0px',
  '0.5':  '2px',
  '1':    '4px',      // Micro gap
  '1.5':  '6px',
  '2':    '8px',      // Atomic unit
  '3':    '12px',     // Tight element gap
  '4':    '16px',     // Standard component padding
  '5':    '20px',
  '6':    '24px',     // Grid gutter (desktop)
  '8':    '32px',     // Section interior padding
  '10':   '40px',
  '12':   '48px',     // Component separation
  '16':   '64px',     // Section separation (mobile)
  '20':   '80px',     // Section separation (tablet)
  '24':   '96px',     // Major section transition (desktop)
  '28':   '112px',    // Editorial hero margin
  '32':   '128px',    // Dramatic whitespace
};
```

---

## 4. RADIUS TOKENS (ARCHITECTURAL VS. TOUCH)

```typescript
export const borderRadius = {
  'none':    '0px',       // Architectural fashion frames (Hero, large imagery)
  'sm':      '4px',       // Controlled card & modal surface radius
  'md':      '6px',       // Standard input fields & primary button radius
  'lg':      '10px',      // Cart flyout drawer inner elements
  'full':    '9999px',    // Filter pills, badge indicators, quantity buttons
};
```

---

## 5. SHADOW & ELEVATION TOKENS (TACTILE NATURAL LIGHT)

```typescript
export const boxShadow = {
  // Ambient resting state for product cards
  'card-rest':    '0 1px 3px 0 rgba(24, 24, 27, 0.04), 0 1px 2px -1px rgba(24, 24, 27, 0.03)',
  
  // Interactive hover elevation (simulating soft daylight elevation)
  'card-hover':   '0 12px 28px -6px rgba(24, 24, 27, 0.08), 0 4px 10px -2px rgba(24, 24, 27, 0.04)',
  
  // Off-canvas flyout drawer depth
  'drawer':       '-8px 0 32px -4px rgba(24, 24, 27, 0.12)',
  
  // Floating action button shadow (WhatsApp green glow)
  'whatsapp-btn': '0 8px 24px -4px rgba(37, 211, 102, 0.35)',
  
  // Toast notification depth
  'toast':        '0 10px 25px -5px rgba(24, 24, 27, 0.10)',
};
```

---

## 6. MOTION & TRANSITION TOKENS

```typescript
export const transitionTimingFunction = {
  'editorial': 'cubic-bezier(0.16, 1, 0.3, 1)', // Smooth luxury deceleration
  'snappy':    'cubic-bezier(0.4, 0, 0.2, 1)',  // Tactile click response
};

export const transitionDuration = {
  'instant': '100ms',
  'fast':    '150ms', // Button clicks, checkbox toggles
  'normal':  '250ms', // Card hover elevations, badge updates
  'drawer':  '350ms', // Off-canvas panel slide
  'hero':    '600ms', // Initial page entry reveals
};
```

---

## 7. RESPONSIVE BREAKPOINT TOKENS

```typescript
export const screens = {
  'xs':  '375px',   // Compact smartphones
  'sm':  '640px',   // Large smartphones / small tablets
  'md':  '768px',   // Tablets (portrait)
  'lg':  '1024px',  // Laptops / Tablets (landscape)
  'xl':  '1280px',  // Standard desktop
  '2xl': '1440px',  // Large editorial desktop
};
```

---

## 8. Z-INDEX SYSTEM

```typescript
export const zIndex = {
  'hide':     -1,
  'base':      0,
  'card':      1,
  'sticky':   10, // Sticky Category Filter bar
  'header':   20, // Global Sticky Navigation Bar
  'backdrop': 30, // Drawer & Modal backdrop overlay
  'drawer':   40, // Cart Drawer & Mobile Menu panel
  'modal':    50, // Modal Dialogs
  'floating': 60, // Floating WhatsApp bottom action
  'toast':    70, // Notification Toasts
  'tooltip':  80, // Tooltips
};
```
