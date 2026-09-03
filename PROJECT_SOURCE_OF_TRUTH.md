# BANWARILAL CLOTH HOUSE — PROJECT SOURCE OF TRUTH & ARCHITECTURAL SPECIFICATION

> **CANONICAL REFERENCE DOCUMENT — PHASE 01 FOUNDATION**  
> **Target Business:** BANWARILAL CLOTH HOUSE  
> **Document Version:** 1.0.0  
> **Status:** Authoritative Foundation Document for all subsequent phases. Every future implementation phase must strictly comply with the requirements, architecture, design constraints, and data definitions set forth in this document.

---

## A. BUSINESS PROFILE

| Attribute | Confirmed Business Data | Source & Status |
| :--- | :--- | :--- |
| **Official Business Name** | **BANWARILAL CLOTH HOUSE** | Confirmed Canonical. Exact capitalization and spelling must be preserved across all assets, headings, metadata, and communications. |
| **Business Type** | Clothing / Readymade Garment / Cloth House / Fashion Retail Business | Confirmed. Established brick-and-mortar clothing retailer expanding to a high-end digital catalogue. |
| **Year Established** | 2003 | Confirmed via public business records. Communicates heritage and stability. |
| **Physical Address** | Near Hanuman Mandir, New Bazaar, Chilbila, Pratapgarh, Uttar Pradesh – 230403, India | Confirmed exact address. No alterations or assumed landmarks allowed. |
| **Geographic Coordinates** | **Latitude:** `25.9557296`<br>**Longitude:** `82.0070317` | Confirmed via Google Maps geocoding coordinates. |
| **Google Maps Reference** | [https://www.google.com/maps/place/BANWARILAL+CLOTH+HOUSE/@25.9557296,82.0044568,922m/](https://www.google.com/maps/place/BANWARILAL+CLOTH+HOUSE/@25.9557296,82.0044568,922m/) | Confirmed location source. Canonical destination for maps/directions CTAs. |
| **Public Reference Features** | • In-store shopping<br>• Same-day delivery (noted in public listing)<br>• Parking availability (noted)<br>• Wi-Fi availability (noted) | Reference only. Not to be transformed into aggressive marketing claims unless explicitly verified by business owner. |
| **Public Reputation Reference** | 5.0 Rating (43 ratings on Google listing) | Reference only. **CRITICAL:** Do NOT manufacture fake testimonials, review quotes, or oversized promotional badges based on this score. |

---

## B. BUSINESS MODEL

### 1. Paradigm: Premium Clothing Catalogue + Direct WhatsApp Ordering
The website is **NOT** a conventional software startup or a standard transactional e-commerce store with automated payment processing. It is engineered as an **exclusive digital showroom and dynamic catalogue** that seamlessly bridges digital customer interest with personal merchant-assisted retail fulfillment via WhatsApp.

```
┌─────────────────┐       ┌─────────────────┐       ┌──────────────────┐       ┌───────────────────┐
│  1. DISCOVER    │  ──►  │   2. BROWSE     │  ──►  │ 3. VIEW PRODUCT  │  ──►  │  4. ADD TO CART   │
│  Mobile/Desktop │       │ Collections &   │       │ High-res Imagery │       │ Local State /     │
│  Location/Maps  │       │ Curated Grids   │       │ & Specifications │       │ Multi-item Bag    │
└─────────────────┘       └─────────────────┘       └──────────────────┘       └───────────────────┘
                                                                                         │
                                                                                         ▼
┌─────────────────┐       ┌─────────────────┐       ┌──────────────────┐       ┌───────────────────┐
│ 8. FULFILLMENT  │  ◄──  │ 7. CONSULTATION │  ◄──  │ 6. WHATSAPP CTA  │  ◄──  │ 5. REVIEW CART    │
│ Pickup / Local  │       │ Stock & Sizing  │       │ Encoded Message  │       │ Verify Selection  │
│ Dispatch        │       │ Confirmed in WA │       │ Dispatched       │       │ & Quantities      │
└─────────────────┘       └─────────────────┘       └──────────────────┘       └───────────────────┘
```

### 2. Absolute Payment Restrictions
The platform operates with zero automated financial transaction software.
- **Strictly Prohibited Integrations:**
  - Credit Card / Debit Card checkout gateways
  - UPI payment gateways (e.g., Razorpay UPI, Cashfree, Paytm PG)
  - International gateways (Stripe, PayPal)
  - Merchant wallets or customer balance accounts
  - Automatic invoice generation or payment status webhooks
- **Role of the Website:** Curate, display, educate, and format the customer's selection into a structured, human-readable inquiry.
- **Role of WhatsApp:** Serve as the direct communication, personal assistance, stock verification, pricing confirmation, and fulfillment negotiation channel.

---

## C. PRODUCT MODEL

### 1. Catalog Taxonomy (Verified vs. Potential)
Public listing data associates the business with traditional, ethnic, formal, and daily apparel categories:
- **Potential Categories:**
  - *Sarees* (Banarasi, Silk, Georgette, Embroidered, Festive)
  - *Suits & Dress Materials* (Unstitched fabrics, semi-stitched suits)
  - *Dresses & Readymade Garments* (Kurti sets, ethnic dresses)
  - *Menswear Essentials* (Shirts, T-Shirts, Jeans, Trousers)
  - *Fabrics & Unstitched Textiles* (Suiting, shirting, premium cloth pieces)
- **Architectural Policy:**
  - Categories are dynamic and rendered strictly from verified catalog records.
  - No empty dummy categories or placeholder products may be displayed to customers in production.
  - When a product attribute (such as Fabric or Price) is omitted by the merchant, the UI must render an elegant absence state rather than placeholder text or zeros.

---

## D. CUSTOMER JOURNEY

1. **Discovery:** Customer enters via mobile search, Google Maps link, or local recommendation. Immediately greets an evocative, fast-loading visual storefront.
2. **Curated Browsing:** Customer navigates through category filters, visual lookbooks, or direct keyword search.
3. **Product Inspection:** Customer opens a dedicated product view with high-clarity photography, zoom inspection, specifications (fabric, colors, dimensions/sizes where available), and explicit in-stock indicators.
4. **Action Choice:**
   - **Direct Purchase Inquiry:** Customer clicks `Order on WhatsApp` directly on the product page for instant one-on-one communication.
   - **Multi-Item Curation:** Customer adds multiple items into their interactive session Cart, adjusting desired quantities.
5. **Cart Review:** Customer reviews their bag in a clean slide-over drawer or dedicated view without intrusive upsells or confusing fees.
6. **Order Dispatch:** Customer clicks `Order on WhatsApp`. The system constructs an encoded WhatsApp message string containing the exact product names, quantities (if configured), and direct links, launching WhatsApp natively on mobile or WhatsApp Web on desktop.
7. **Personal Merchant Service:** The BANWARILAL CLOTH HOUSE team receives the structured message, confirms real-time stock, discusses custom sizing or color nuances, shares live photos if needed, and completes the sale.

---

## E. BRAND POSITIONING

### 1. Strategic Core Statement
> *"An established clothing house with a modern, premium digital presence."*

### 2. Brand Archetype & Tone
- **Established & Proven:** Rooted since 2003 in Chilbila, Pratapgarh; carries the trust of multi-generational retail presence.
- **Sophisticated & Understated:** Luxury through restraint, spacious typography, high-grade imagery, and deliberate whitespace.
- **Warm & Welcoming:** Reflects authentic Indian textile hospitality and personal service rather than cold corporate automation.
- **Fashion-Forward:** Presents traditional textiles and modern ready-to-wear with editorial elegance akin to boutique couture.

### 3. Anti-Patterns (What It Must NEVER Be)
- ❌ **Not a discount bazaar:** No garish yellow "FLAT 70% OFF" splash banners.
- ❌ **Not a tech startup:** No generic SaaS illustrations, feature benefit cards with gear icons, or AI hype jargon.
- ❌ **Not an aggressive marketplace:** No fake countdown timers ("Only 2 items left!"), fake live-purchaser toasts, or synthetic reviews.
- ❌ **Not a template clone:** No generic WordPress theme aesthetic or disjointed styling.

---

## F. COLOR SYSTEM

The visual palette is calibrated around a disciplined **70–80% Neutral / 15–20% Dark / ≤5% Accent** distribution to evoke heritage textile warmth and modern editorial sophistication.

| Token Name | Hex Code | Visual Sample Role | Application & Usage Rules |
| :--- | :--- | :--- | :--- |
| **Canvas Ivory (Primary Background)** | `#FAF8F5` | Neutral Base (70–80%) | Main page background, editorial story sections, modal backdrops. Warmer and richer than harsh clinical `#FFFFFF`. |
| **Studio White (Card Surface)** | `#FFFFFF` | Surface Elevation | Product cards, cart drawer interior, input fields, image backing for crisp color rendering. |
| **Linen Beige (Secondary Neutral)** | `#EFECE6` | Alternating Sections | Subtle section zebra-striping, pill filters, tag backgrounds, borders, skeleton loaders. |
| **Deep Charcoal (Primary Text & CTAs)** | `#18181B` | High Contrast (15–20%) | Primary headings, body text, high-priority navigation links, primary action buttons. Provides deep typographic weight without the flat harshness of pure `#000000`. |
| **Warm Taupe (Supporting & Borders)** | `#716E68` | Secondary Text & Dividers | Metadata, category labels, subtle 1px dividers (`#E5E0D8`), form borders, secondary icons. |
| **Muted Champagne Gold (Accent)** | `#C5A880` | Accent (Strictly ≤ 5%) | Restrained luxury highlights: active filter indicators, fine gold divider accents, subtle hover focus rings, premium badges. Never used for full background fills. |
| **WhatsApp Emerald (Action Channel)** | `#25D366` | Dedicated Channel Brand | Utilized strictly on final WhatsApp action triggers and subtle floating inquiry anchors to maintain universal platform recognition. |
| **Deep WhatsApp Hover** | `#1EBE5D` | Action Hover State | High-contrast hover/focus state for WhatsApp triggers. |

---

## G. TYPOGRAPHY SYSTEM

Typography pairs classical Indian editorial craftsmanship with contemporary digital legibility.

### 1. Font Selection
- **Display & Headings:** `Playfair Display` or `Cormorant Garamond` (Google Fonts, self-hosted for performance).
  *Attributes:* Classical proportions, delicate serifs, high contrast, elegant editorial luxury.
- **UI, Body & Metadata:** `Plus Jakarta Sans` or `Inter` (Google Fonts, self-hosted for performance).
  *Attributes:* Highly legible at small sizes on mobile displays, geometric humanist balance, crisp numerals for pricing and specifications.

### 2. Typographic Scale Hierarchy
| Level | Font Family | Weight | Size (Desktop / Mobile) | Line Height | Letter Spacing |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero Display** | Display Serif | Medium (500) | `56px` / `36px` | `1.1` | `-0.02em` |
| **Section Title (H2)** | Display Serif | SemiBold (600) | `36px` / `28px` | `1.2` | `-0.01em` |
| **Subheading (H3)** | Display Serif | Medium (500) | `24px` / `20px` | `1.3` | `0` |
| **Product Card Title** | UI Sans-Serif | Medium (500) | `16px` / `15px` | `1.4` | `0` |
| **Price (When Present)** | UI Sans-Serif | SemiBold (600) | `18px` / `16px` | `1.2` | `-0.01em` |
| **Body Primary** | UI Sans-Serif | Regular (400) | `16px` / `15px` | `1.6` | `0` |
| **Metadata / Badges** | UI Sans-Serif | Medium (500) | `13px` / `12px` | `1.4` | `+0.04em` (Uppercase) |
| **CTAs & Buttons** | UI Sans-Serif | SemiBold (600) | `14px` / `14px` | `1.0` | `+0.03em` |

---

## H. VISUAL STYLE

### 1. Aesthetic Identity
- **Editorial Fashion Minimalism:** Asymmetrical image collages, generous margins, restrained borders, and clear breathing room between product displays.
- **Natural Light Photography Emphasis:** Product cards act as frames rather than competing with the garments.
- **Subtle Fine-Line Detailing:** 1px hairline dividers in `#E5E0D8` rather than heavy drop-shadows or saturated containers.
- **Atmospheric Warmth:** Warm ivory backgrounds eliminate digital glare and evoke fine cottons, silks, and linen textiles.

---

## I. 3D & MOTION DIRECTION

### 1. Tactile 3D Depth Philosophy (No Gimmicks)
We implement **subtle physical depth** rather than performance-heavy 3D WebGL meshes:
- **Card Elevation:** Product cards sit at base elevation `0 1px 3px rgba(24, 24, 27, 0.04)`. On hover, they rise smoothly by `-4px` with a soft ambient shadow `0 12px 28px -6px rgba(24, 24, 27, 0.08)`.
- **Image Aperture Effect:** On hover, product imagery scales by `1.035` inside an `overflow: hidden` bounding box with a `400ms cubic-bezier(0.16, 1, 0.3, 1)` transition.
- **Layered Composition:** Hero and Brand Story sections use overlapping text cards atop photographic backdrops with gentle z-index layering to create spatial dimension.
- **Interactive Micro-Elevation:** Buttons respond with tactile depression (`scale(0.98)`) on click.

### 2. Motion Rules & Accessibility
- **Transitions:** Durations capped between `180ms` (micro-interactions) and `400ms` (drawers/modals).
- **Reduced Motion Support:** All transitions and transforms are disabled or flattened to instantaneous opacity shifts under `@media (prefers-reduced-motion: reduce)`.

---

## J. PAGE INVENTORY

| Route / Surface | Name | Primary Purpose | Key Content Blocks |
| :--- | :--- | :--- | :--- |
| `/` | **Homepage** | Digital storefront, brand credibility, immediate collection showcase | Hero Banner, Curated Categories, Featured Products Grid, Heritage & Story, Store Highlights, Interactive Map Card, Direct WhatsApp CTA. |
| `/catalogue` | **Catalogue Directory** | Comprehensive browsing experience | Search bar, Category Pill filters, Sort options, Product Grid, Dynamic counter, Empty state. |
| `/product/[slug]` | **Product Detail Page** | In-depth product inspection & high-intent ordering | Multi-image zoom gallery, Title, Category, Price/Specification table (fabric, color, sizes), Add to Cart, Immediate WhatsApp Order button, Related items. |
| `/about` | **About & Heritage** | Establishment history (2003) & craftsmanship values | Narrative timeline, physical store presence, commitment to quality fabrics, values. |
| `/contact` | **Store Location & Contact** | Direct customer contact and local directions | Exact address, Google Maps interactive widget / external link CTA, WhatsApp direct line, phone call link, store timings. |
| `/cart` / Drawer | **Cart Modal / Drawer** | Bag inspection and multi-product WhatsApp order generation | Item list, thumbnails, quantities, price subtotal (if applicable), clear item, primary `Order on WhatsApp` button. |
| `/404` | **Error State** | Graceful recovery | Elegant notice, "Return to Catalogue" button. |

---

## K. COMPONENT INVENTORY

### Layout & Global
1. `Navbar`: Responsive header with brand identity, catalogue links, store location link, search trigger, and interactive Cart counter.
2. `MobileMenuDrawer`: Accessible slide-in navigation with direct WhatsApp and call buttons.
3. `AnnouncementBar`: Subtle top bar for announcements (e.g., store hours, new arrivals, festival collection announcements).
4. `Footer`: Established 2003 credentials, quick navigation, physical address, Google Maps link, copyright, and WhatsApp connect.

### Product & Catalogue
5. `ProductCard`: High-aspect ratio image container, quick add-to-cart, category tag, title, price (or "Inquire for Price"), availability pill.
6. `ProductGrid`: Adaptive grid layout (2-column on mobile, 3 or 4-column on desktop).
7. `ProductGallery`: Primary image view with thumbnail strip, mobile touch-swipe, and zoom capabilities.
8. `ProductFilterBar`: Horizontal sticky pill filters for category and availability.
9. `ProductSearchBar`: Fast client-side keyword search with instant dropdown or inline filtering.

### Cart & WhatsApp
10. `CartDrawer`: Flyout right-side panel showing selected items, quantity controls, and single WhatsApp dispatch CTA.
11. `CartItemRow`: Compact product thumbnail, title, selected size/color (if applicable), quantity counter, remove button.
12. `WhatsAppButton`: Reusable high-contrast CTA component supporting both single-product payload and multi-item bag payload.

### Content & Trust
13. `HeroSection`: Typographic and photographic split layout emphasizing the 2003 heritage and current collections.
14. `StoreLocationCard`: Dedicated card featuring the verified address Near Hanuman Mandir, New Bazaar, Chilbila, Pratapgarh, with interactive Google Maps link.
15. `FeatureBadges`: Restrained highlights (In-Store Selection, Personalized Sizing Assistance, Direct WhatsApp Ordering).

---

## L. PRODUCT DATA MODEL

```typescript
export interface ProductImage {
  url: string;              // Relative or CDN path
  alt: string;              // Descriptive text for accessibility
  isPrimary: boolean;       // Thumbnail and default card view
  width?: number;           // Prevents layout shift (CLS)
  height?: number;
}

export interface ProductSpecification {
  fabric?: string;          // e.g., "Pure Silk", "Cotton Blend", "Georgette"
  color?: string;           // e.g., "Deep Maroon", "Champagne Gold"
  sizesAvailable?: string[];// e.g., ["Free Size"], ["M", "L", "XL"]
  pattern?: string;         // e.g., "Zari Work", "Woven", "Embroidered"
  careInstructions?: string;// e.g., "Dry Clean Only"
}

export interface Product {
  id: string;               // Unique internal alphanumeric identifier
  name: string;             // Official product title (e.g., "Banarasi Silk Saree")
  slug: string;             // URL-friendly identifier (e.g., "banarasi-silk-saree")
  category: string;         // Category key (e.g., "sarees", "suits", "fabrics")
  description: string;      // Curated editorial description
  price?: number;           // Actual retail price in INR (optional)
  compareAtPrice?: number;  // Comparative retail price for discount display (optional)
  images: ProductImage[];   // Minimum 1 image required
  specifications?: ProductSpecification;
  availability: 'in_stock' | 'out_of_stock' | 'upon_request';
  featured: boolean;        // Whether highlighted on homepage
  displayOrder: number;     // Numerical priority for sorting
  relatedProductIds?: string[]; // IDs for cross-merchandising
  createdAt: string;        // ISO 8601 Date
  updatedAt: string;        // ISO 8601 Date
}
```

### Absence State Guidelines
- If `price` is omitted: display `"Price on Request"` or `"Inquire for Price"`.
- If `specifications` are omitted: omit specification rows entirely. Never render `"None"`, `"N/A"`, or empty bullets.
- If `compareAtPrice` is missing or equal to `price`: suppress comparative price markup.

---

## M. CART REQUIREMENTS

1. **State Persistence:** Cart state is managed in client memory and synchronized to `localStorage` under `bch_cart_items`.
2. **Item Schema in Cart:**
   - `productId`: string
   - `productName`: string
   - `productSlug`: string
   - `thumbnailUrl`: string
   - `quantity`: number (minimum 1, capped at reasonable limit e.g. 10)
   - `price`?: number (if provided)
3. **Cart Operational Rules:**
   - Real-time item count badge on navbar.
   - Quick feedback notification (subtle toast or opening drawer) when adding items.
   - Increment, decrement, and delete actions with instantaneous UI updates.
   - Subtotal calculated dynamically when prices are present; cleanly suppressed when prices are not provided.
4. **Final Order Action:**
   - Single dominant CTA: `Order on WhatsApp` (or `Enquire on WhatsApp`).
   - Zero payment triggers or account registration requirements.

---

## N. WHATSAPP MESSAGE GENERATION REQUIREMENTS

### 1. Centralized Configuration
The WhatsApp business telephone number is defined in a single environment or configuration file:
`siteConfig.contact.whatsappNumber = "91XXXXXXXXXX"` (formatted without `+`, spaces, or hyphens for API URLs).

### 2. Message Encoding Architecture
All messages are constructed dynamically and passed through `encodeURIComponent()` to ensure compatibility across WhatsApp Web, Android, and iOS clients.

### 3. Scenario A: Single-Product Inquiry (Product Page)
```
Hello BANWARILAL CLOTH HOUSE,

I am interested in ordering/inquiring about this product:
• Product: [PRODUCT_NAME]
• Link: [CANONICAL_PRODUCT_URL]

Please confirm availability and further details.
Thank you!
```

### 4. Scenario B: Multi-Item Bag Inquiry (Cart Drawer)
*(Configurable for Product Names Only OR Names + Quantities)*

**Variant 1 — Names Only (Default Business Preference):**
```
Hello BANWARILAL CLOTH HOUSE,

I am interested in ordering/inquiring about the following products from your catalogue:

1. [PRODUCT_NAME_1]
2. [PRODUCT_NAME_2]
3. [PRODUCT_NAME_3]

Please confirm availability, pricing, and further details.
Thank you!
```

**Variant 2 — Names + Quantities (Configurable Flag):**
```
Hello BANWARILAL CLOTH HOUSE,

I am interested in ordering/inquiring about the following products from your catalogue:

1. [PRODUCT_NAME_1] (Qty: [QTY_1])
2. [PRODUCT_NAME_2] (Qty: [QTY_2])

Please confirm availability, pricing, and further details.
Thank you!
```

### 5. Strict Sanitization Directives
- Message strings must be strictly validated before dispatch.
- **Forbidden Substrings:** The output must NEVER contain `"undefined"`, `"null"`, `"[object Object]"`, internal database UUIDs, raw SKU identifiers, or internal debug tokens.
- If a product name is unexpectedly empty, fallback gracefully to `"Selected Catalogue Item"`.

---

## O. CONTENT AUDIT & GAP ANALYSIS

### 1. Confirmed Information (Authoritative)
- Business Name: **BANWARILAL CLOTH HOUSE**
- Physical Location: Near Hanuman Mandir, New Bazaar, Chilbila, Pratapgarh, Uttar Pradesh – 230403, India
- Coordinates: Latitude 25.9557296, Longitude 82.0070317
- Established Date: 2003
- Core Business: Retail Cloth House / Readymade Garments / Fabric store
- Core Ordering Flow: Catalogue selection → Direct WhatsApp order fulfillment

### 2. Required Missing Business Information (To Be Provided by Client)
| Required Data Point | Placeholder Variable | Impact on Launch |
| :--- | :--- | :--- |
| **Official WhatsApp Number** | `[WHATSAPP_NUMBER_REQUIRED]` | **BLOCKER for live ordering.** Needs country code (e.g., `91...`). |
| **Primary Calling Phone Number** | `[PHONE_NUMBER_REQUIRED]` | Required for standard voice calls on Contact page. |
| **Store Opening Hours** | `[STORE_HOURS_REQUIRED]` | e.g., "Monday – Sunday: 10:00 AM – 9:00 PM". |
| **Official Brand Logo** | `[BRAND_LOGO_REQUIRED]` | High-res vector SVG or transparent PNG. Typography fallback planned. |
| **Authentic Storefront / Interior Photos** | `[STORE_PHOTOGRAPHY_REQUIRED]` | Authorized photos of the Chilbila location for the About/Store section. |
| **Actual Product Catalogue Inventory** | `[PRODUCT_CATALOGUE_DATA_REQUIRED]`| Product names, categories, descriptions, photos, and prices. |
| **Confirmed Same-Day Delivery Area** | `[DELIVERY_TERMS_REQUIRED]` | Distance/pincode radius for same-day delivery service. |

---

## P. ASSET SPECIFICATIONS & PHOTOGRAPHY RULES

1. **Brand Identity Assets:**
   - Primary Logo: Vector SVG format with light and dark mode adaptations.
   - Text Fallback: Refined typographic mark using `Playfair Display` serif tracking (`BANWARILAL CLOTH HOUSE`) if an official mark is delayed.
2. **Product Photography Protocol:**
   - **Aspect Ratio:** Standardized `3:4` vertical portrait orientation (e.g., `1200 × 1600px`).
   - **Composition:** Garments captured in balanced, natural daylight or clean studio lighting on neutral backgrounds.
   - **File Formats:** Production delivery in modern next-gen formats (`AVIF`, `WebP`) with JPEG fallbacks.
   - **No Stock Fakes:** No generic European runway stock photos, watermarked stock imagery, or unverified images.
3. **Google Maps Photo Policy:**
   - Third-party photos on Google Maps are **NOT** presumed to be client-owned.
   - Only original photos provided or authorized directly by the business will be uploaded to the production site.

---

## Q. SECURITY REQUIREMENTS

1. **Zero-Payment Attack Surface:** Because no credit cards, UPI secrets, or payment credentials exist on the platform, payment gateway hijacking and PCI-DSS vulnerabilities are eliminated by architecture.
2. **Strict Client-Side Input Sanitization:**
   - All search input queries and URL parameters must be escaped against Cross-Site Scripting (XSS).
   - WhatsApp message parameters must be sanitized via `encodeURIComponent` to prevent query string injection or URL breakage.
3. **Content Security Policy (CSP):**
   - Disallow unsafe-inline scripts where feasible.
   - Restrict image sources to internal origin, trusted CDN, and verified map tile providers.
4. **External Link Hardening:**
   - Every external anchor tag (e.g., Google Maps, WhatsApp links) must enforce `rel="noopener noreferrer"` and `target="_blank"`.
5. **No Secrets in Bundles:** Environment configs must never expose administrative credentials in public client bundles.

---

## R. PERFORMANCE REQUIREMENTS

1. **Target Core Web Vitals:**
   - **Largest Contentful Paint (LCP):** `< 2.2 seconds` on 4G mobile.
   - **Interaction to Next Paint (INP):** `< 150 milliseconds`.
   - **Cumulative Layout Shift (CLS):** `< 0.05` (zero unexpected shifts).
2. **Image Delivery Architecture:**
   - Modern `srcset` responsive image breakpoints (`360px`, `640px`, `1024px`, `1440px`).
   - Strict CSS aspect-ratio bounding boxes (`aspect-[3/4]`) to preserve layout space prior to image load.
   - Explicit `loading="lazy"` on all cards below the initial fold; `loading="eager"` and `priority` on the primary hero visual.
3. **Typography & Script Optimization:**
   - Self-hosted subset fonts with `font-display: swap` to prevent FOIT (Flash of Invisible Text).
   - Zero heavy WebGL or 3D engine scripts (Three.js, Babylon.js prohibited).

---

## S. ACCESSIBILITY REQUIREMENTS (WCAG 2.1 AA)

1. **Color Contrast:**
   - Body text (`#18181B`) on Ivory (`#FAF8F5`): Contrast ratio exceeds `12:1` (far exceeding WCAG AAA standard `7:1`).
   - Accent Champagne (`#C5A880`): Never used for small body text; reserved for non-text borders, background badges, and large visual accents.
2. **Semantic Markup & Structure:**
   - Strict single `<h1>` per page, sequential `<h2>` and `<h3>` heading tags.
   - Semantic regions: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`.
3. **Keyboard & Focus Navigation:**
   - Full navigation capability via `Tab`, `Shift+Tab`, `Enter`, `Escape`.
   - Distinct, visible focus rings on all interactive elements (`focus-visible:ring-2 focus-visible:ring-[#C5A880]`).
   - Modals and drawers include keyboard focus trapping and `Escape` key close handlers.
4. **Screen Reader Support:**
   - All product images require meaningful `alt` text (e.g., `"Crimson Banarasi Saree with gold Zari border"`).
   - Dynamic cart updates announce via `aria-live="polite"` regions.
   - Icon-only buttons (Cart, Close, Search) feature explicit `aria-label` tags.

---

## T. OPEN QUESTIONS & CLIENT CONFIRMATION CHECKLIST

The following questions require direct client confirmation before production deployment:

1. **Official WhatsApp Business Number:**  
   *What is the exact official WhatsApp telephone number (including country code) that will receive customer catalogue inquiries?*
2. **Product Catalogue Data & Imagery:**  
   *Will the initial digital catalogue launch with a curated set of featured items (e.g., 15–30 items across Sarees, Suits, Readymade Garments) or a broader inventory? Can original high-resolution photos and pricing be provided?*
3. **Price Display Preference:**  
   *Should prices be displayed explicitly on all items (e.g., `₹2,450`), or should certain premium/fabric items display `"Inquire on WhatsApp for Price"`?*
4. **Cart WhatsApp Format Preference:**  
   *Does the business prefer the WhatsApp order message to list product names only, or include product names with quantities (e.g., `Dress A × 2`)?*
5. **Operating Hours:**  
   *What are the official days and hours of operation for the Chilbila retail store?*
6. **Brand Logo File:**  
   *Does an official logo asset (vector/high-res file) exist, or should we produce a bespoke typographic luxury brandmark for BANWARILAL CLOTH HOUSE?*
7. **Same-Day Delivery Boundaries:**  
   *For the same-day delivery noted on the public profile, what is the eligible delivery radius or terms (e.g., within Pratapgarh city / Chilbila area)?*

---

## U. PHASE CONSTRAINTS & GOVERNANCE

- **Phase 01 Completion Criterion:** Establishment of the Canonical Source of Truth document without writing premature production code or generating fake data.
- **Phase 02 Gate:** Development and implementation phases may ONLY commence once this document is reviewed and the client aligns on key open items (notably the WhatsApp number and sample product data).
- **Rule of Truth:** No future phase may violate the business model, payment restriction, location data, or visual guidelines detailed herein.
