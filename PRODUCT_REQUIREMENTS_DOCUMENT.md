# BANWARILAL CLOTH HOUSE — PRODUCT REQUIREMENTS DOCUMENT (PRD)

> **DOCUMENT CONTROL**  
> **Project:** BANWARILAL CLOTH HOUSE Digital Catalogue & WhatsApp Ordering Platform  
> **Document Version:** 1.0.0  
> **Phase:** Phase 02 — Product Requirements Document  
> **Governing Document:** [`PROJECT_SOURCE_OF_TRUTH.md`](./PROJECT_SOURCE_OF_TRUTH.md)  
> **Status:** Approved for Technical Architecture (Phase 03)  
> **Target Audience:** Engineering, Design, QA, Product Management, and Business Stakeholders

---

## 1. EXECUTIVE SUMMARY

**BANWARILAL CLOTH HOUSE**, established in 2003 in Chilbila, Pratapgarh, Uttar Pradesh, is a respected physical clothing, readymade garment, and cloth house retailer. This Product Requirements Document (PRD) defines the specifications for creating a **bespoke, premium digital clothing catalogue with native WhatsApp order and enquiry dispatch**.

The system is purposely engineered as a high-end editorial digital showroom rather than a conventional automated e-commerce web application. Instead of imposing complex user registrations, credit checks, or online payment gateways, the platform pairs modern luxury brand aesthetics with frictionless, direct-to-merchant communication via WhatsApp. 

Customers discover real collections, review high-resolution photography and garment specifications, curate single or multi-item selections into a locally persisted shopping bag, and dispatch structured, URL-encoded order inquiries directly to the store’s authorized WhatsApp channel. Store location, heritage, and direct contact avenues are prominently integrated to drive footfall to the physical retail store.

---

## 2. BUSINESS CONTEXT

### 2.1 Retail Background
* **Entity Name:** BANWARILAL CLOTH HOUSE (Canonical spelling and capitalization).
* **Heritage:** Operating continuously since 2003 (over two decades of established retail trust).
* **Physical Location:** Near Hanuman Mandir, New Bazaar, Chilbila, Pratapgarh, Uttar Pradesh – 230403, India.
* **Geographic Position:** Latitude `25.9557296`, Longitude `82.0070317`.
* **Google Maps Citation:** [https://www.google.com/maps/place/BANWARILAL+CLOTH+HOUSE/@25.9557296,82.0044568,922m/](https://www.google.com/maps/place/BANWARILAL+CLOTH+HOUSE/@25.9557296,82.0044568,922m/)

### 2.2 Market & Customer Dynamics
In the regional apparel trade of Uttar Pradesh, high-value textile purchases (e.g., wedding sarees, bridal lehengas, bespoke unstitched suitings, festive readymade garments) rely heavily on personal merchant consultation, color verification under specific lighting, drape evaluation, and customized sizing assistance. Traditional automated checkout creates friction and impersonal barriers. Conversely, an editorial digital catalogue backed by instant WhatsApp communication provides the modern discovery experience customers desire while preserving the bespoke, trust-based merchant relationship.

---

## 3. PRODUCT DEFINITION

The product is defined as:
**A High-Performance, Mobile-First Digital Garment Showcase & WhatsApp Ordering Platform.**

### Core Capabilities:
1. **Immersive Digital Showroom:** Presents garments using high-clarity photography, zoom inspection, and editorial typography.
2. **Dynamic Product Discovery:** Enables instant exploration through category categorization, live client-side search, and attribute filtering.
3. **Session-Persisted Multi-Item Bag:** Lets shoppers curate multiple pieces into an interactive cart without requiring account login.
4. **Structured WhatsApp Order Dispatch:** Compiles chosen products into sanitized, clean, pre-filled WhatsApp messages for single items or full shopping bags.
5. **Physical Store Locator:** Directs local and regional customers to the brick-and-mortar storefront near Hanuman Mandir, Chilbila, with native Google Maps turn-by-turn navigation.

---

## 4. BUSINESS OBJECTIVES

| Objective ID | Strategic Goal | Key Performance Indicator (KPI) |
| :--- | :--- | :--- |
| **OBJ-01** | **Elevate Brand Perception** | Transform local retail perception into an established, luxury-grade fashion destination without looking like a generic template. |
| **OBJ-02** | **Frictionless Product Discovery** | Enable customers to discover relevant garments in ≤ 3 interactions (Category → Filter/Search → Product Detail). |
| **OBJ-03** | **Single-Item High-Intent Inquiries** | Enable 1-click WhatsApp inquiry directly from any Product Detail Page (PDP). |
| **OBJ-04** | **Multi-Item Curation & Ordering** | Support multi-item session cart compilation dispatched via a single structured WhatsApp payload. |
| **OBJ-05** | **Physical Footfall Activation** | Provide 1-tap Google Maps directions and direct call triggers for local customers. |
| **OBJ-06** | **Mobile-First Conversions** | Guarantee sub-2.5s page loads and touch-ergonomic browsing on 320px–430px smartphone viewports. |

---

## 5. TARGET USERS

### User Persona 1: The Collection Explorer
* **Profile:** Prospective shopper browsing upcoming festive, bridal, or seasonal wear.
* **Context:** Using a mobile smartphone (Android or iOS) on a 4G connection.
* **Goals:** Explore new arrivals, examine fine fabric weaves, view color variations, and check style availability.
* **Key Requirements:** Fast image loading, smooth swiping galleries, zoom capabilities, clear category browsing.

### User Persona 2: The Direct / High-Intent Inquirer
* **Profile:** Customer who saw a specific design via social media or word of mouth and wants immediate pricing/availability.
* **Context:** Fast mobile browsing; does not want to fill out registration forms or checkout steps.
* **Goals:** Tap once to ask the shopkeeper: *"Is this available in my size/color, and what is the final price?"*
* **Key Requirements:** Prominent `Order on WhatsApp` button directly on the product card and product page.

### User Persona 3: The Multi-Item Family / Wedding Shopper
* **Profile:** Customer selecting multiple outfits (e.g., sarees for relatives, unstitched suitings for festive gifts, readymade shirts).
* **Context:** Browsing over several sessions, curating an ensemble.
* **Goals:** Add several garments to a bag, review selections, and transmit the complete list to the merchant in a single communication.
* **Key Requirements:** Robust local cart persistence, quantity toggling, clean itemized WhatsApp message formatting.

### User Persona 4: The Local Store Visitor
* **Profile:** Resident of Pratapgarh or surrounding districts planning an in-person visit.
* **Context:** Ready to visit the bazaar.
* **Goals:** Find exact location landmarks (Near Hanuman Mandir), confirm opening hours, and launch turn-by-turn directions.
* **Key Requirements:** Explicit address blocks, landmark clarity, 1-click Google Maps launcher, direct phone dialer.

---

## 6. USER PROBLEMS & PRODUCT SOLUTIONS

| Problem Faced by Customer | Product Solution in BANWARILAL CLOTH HOUSE Platform |
| :--- | :--- |
| Generic e-commerce sites force lengthy account signups and OTP verifications just to ask a question. | Zero registration required. Direct connection to merchant via WhatsApp with zero login overhead. |
| Traditional checkout fails when custom tailoring, size verification, or color availability needs discussion. | The platform delegates the closing step to direct merchant chat, allowing real-time personalization, photo sharing, and custom sizing. |
| Many local store websites look amateurish, outdated, or use broken templates. | Bespoke editorial fashion aesthetics inspired by couture lookbooks (warm ivory, deep charcoal, muted champagne gold). |
| Online payments are often mistrusted for high-ticket ethnic apparel from local stores. | Strictly zero online payment processing. Transactions are agreed upon and fulfilled directly through merchant communication or in-store. |
| Customers lose their selections if they close the browser tab. | Client-side `localStorage` cart persistence ensures items remain intact across sessions. |

---

## 7. CUSTOMER JOURNEYS

### 7.1 Primary Flow: Multi-Product Curation & Bag Order
```
[ Homepage / Catalogue ]
         │
         ▼
[ Browse & Filter Products ]
         │
         ▼
[ Inspect Product Page (PDP) ]
         │
         ▼
[ Tap "Add to Cart" ] ──► (Feedback Toast / Cart Badge Counter Updates)
         │
         ▼
[ Continue Browsing & Add More Items ]
         │
         ▼
[ Open Cart Drawer / Bag ]
         │
         ▼
[ Review Items, Quantities, Subtotals (if priced) ]
         │
         ▼
[ Tap "Order on WhatsApp" ]
         │
         ▼
[ System Sanitizes & URL-Encodes Selected Items ]
         │
         ▼
[ WhatsApp Launches with Structured Multi-Item Message ]
         │
         ▼
[ Merchant Receives Inquiry ──► Confirms Sizing/Stock ──► Arranges Delivery/Pickup ]
```

### 7.2 Secondary Flow: Direct Single-Item Inquiry
```
[ Product Detail Page (PDP) ]
         │
         ▼
[ Review High-Resolution Imagery & Specifications ]
         │
         ▼
[ Tap "Order on WhatsApp" ]
         │
         ▼
[ System Formats Single-Item Payload with Canonical Product URL ]
         │
         ▼
[ WhatsApp Launches with Instant Pre-Filled Message ]
```

### 7.3 Tertiary Flow: Physical Store Navigation
```
[ Any Page Header / Footer / Contact Section ]
         │
         ▼
[ Tap "Get Directions" or Store Location Card ]
         │
         ▼
[ Native Google Maps App / Web Launches with Target:
  Latitude 25.9557296, Longitude 82.0070317
  (Near Hanuman Mandir, New Bazaar, Chilbila, Pratapgarh) ]
```

---

## 8. SITE MAP & ROUTE ARCHITECTURE

```
/ (Root)
│
├── / (Homepage)
│     ├── Hero Showcase
│     ├── Collection Introductions
│     ├── Featured Pieces
│     ├── Brand Heritage (Est. 2003)
│     ├── Why Choose Us (In-store shopping, personal assistance)
│     ├── Physical Store & Directions Block
│     └── Global WhatsApp Action Anchor
│
├── /catalogue (Full Collection Directory)
│     ├── Search & Pill Filters (Category, Availability)
│     ├── Responsive Product Grid (2-col mobile, 3/4-col desktop)
│     └── Empty / Loading / Error State Boundaries
│
├── /collection/[category-slug] (Category-Specific Archives)
│     └── Dynamic Filtered Grid by Category (e.g., /collection/sarees)
│
├── /product/[slug] (Product Detail Page)
│     ├── High-Res Zoomable Image Gallery
│     ├── Garment Specification Table (Fabric, Color, Dimensions)
│     ├── Add to Cart Action
│     ├── Instant Single-Item WhatsApp Trigger
│     └── Contextual Related Products Grid
│
├── /about (Store Heritage & Quality Philosophy)
│     └── Narrative of 20+ years in Chilbila, Pratapgarh retail
│
├── /contact (Store Location, Hours, Calling & WhatsApp Channels)
│     └── Canonical Address, Google Maps Integration, Click-to-Call
│
└── /cart (Fallback Dedicated Cart View / Modal Drawer on all pages)
      └── Itemized Review, Quantity Modifiers, Multi-Item WhatsApp Trigger
```

---

## 9. PAGE REQUIREMENTS

### 9.1 Homepage (`/`)
* **Goal:** Establish immediate authority, luxury fashion positioning, and prompt discovery.
* **Mandatory Sections:**
  1. **Global Navigation Bar:** Brand typographic mark, links to Catalogue, Collections, About, Contact, Search trigger, Cart Drawer trigger with live badge.
  2. **Editorial Hero:** High-contrast layout with primary headline (*"Timeless Elegance, Woven for Generations"*), business established badge (`Est. 2003`), primary CTA (`Explore Collection`), and secondary CTA (`Enquire on WhatsApp`).
  3. **Curated Categories Carousel / Grid:** Visual gateways into verified collections (e.g., Sarees, Suits & Dress Material, Menswear, Fabrics). Only categories with active products are displayed.
  4. **Featured Products Showcase:** 4 to 8 curated products with dynamic availability pills, prices (or "Price on Request"), and quick `Add to Cart` interactions.
  5. **Brand Heritage & Trust:** Contextualizing over 20 years of retail presence in Chilbila, Pratapgarh. Authentic, dignified, zero hyperbole.
  6. **Store Experience Highlights:** Clean 3-column feature grid (Curated Fabrics, Personalized In-Store Consultation, Fast Local Dispatch).
  7. **Interactive Store Locator Card:** Displaying canonical address *Near Hanuman Mandir, New Bazaar, Chilbila*, with direct `Get Directions` launching Google Maps.
  8. **Global Footer:** Comprehensive navigational links, verified business coordinates, contact numbers, copyright, and subtle WhatsApp channel link.

### 9.2 Catalogue Page (`/catalogue`)
* **Goal:** Enable rapid, unhindered browsing of the entire garment inventory.
* **Mandatory Elements:**
  * Clean, non-distracting header with active item count counter.
  * Instant keyword search bar (client-side debounced search matching title, category, and fabric description).
  * Filter pills (Category filter, in-stock status).
  * Sort dropdown (`Featured`, `Newest`, `Price: Low to High`, `Price: High to Low`, `Name: A-Z`).
  * Product grid with clean 3:4 aspect ratio cards.
  * Robust empty state when search/filter criteria match 0 items.

### 9.3 Category Archive Page (`/collection/[category-slug]`)
* **Goal:** Provide focused landing pages for specific apparel types.
* **Mandatory Elements:**
  * Breadcrumb navigation (`Home > Collections > [Category Name]`).
  * Dynamic category title and curated editorial subtitle.
  * Scoped product grid adhering to the active category.
  * Graceful fallback if category slug is invalid (redirect to `/catalogue`).

### 9.4 Product Detail Page (`/product/[slug]`)
* **Goal:** Maximize product appreciation and trigger immediate WhatsApp inquiry or bag addition.
* **Layout Structure:**
  * **Left Column (Desktop) / Top Section (Mobile):** Multi-image gallery with thumbnail rail, active image preview, swipe on mobile, and smooth hover zoom inspection.
  * **Right Column (Desktop) / Lower Section (Mobile):**
    * Category badge and product title (`Playfair Display`).
    * Price display (`₹[Amount]` with formatted commas) or elegant absence fallback (`Price on Request`).
    * Availability status badge (`In Stock` in muted green / `Upon Request` in warm taupe).
    * Editorial description text.
    * Specification table (Fabric, Color, Work/Pattern, Dimensions, Care Instructions) — only rows with genuine data are rendered.
    * **Action Matrix:**
      * Primary Button (Full Width): `Add to Cart` (Dark Charcoal `#18181B`).
      * Secondary Button (Full Width): `Order on WhatsApp` (WhatsApp Emerald `#25D366` with WhatsApp logo icon).
  * **Bottom Section:** Related Products carousel (3–4 items from the same category).

### 9.5 About & Heritage Page (`/about`)
* **Goal:** Reinforce trust, local roots, and physical presence.
* **Mandatory Elements:**
  * Timeline / Narrative highlighting founding in 2003 in Chilbila, Pratapgarh.
  * Philosophy of customer service, fabric inspection, and bridal/festive tailoring support.
  * Store exterior/interior visual showcase (authorized photography only).

### 9.6 Contact & Store Location Page (`/contact`)
* **Goal:** Convert online interest into telephone calls, WhatsApp chats, or physical store visits.
* **Mandatory Elements:**
  * Canonical Address Card:
    ```
    BANWARILAL CLOTH HOUSE
    Near Hanuman Mandir, New Bazaar, Chilbila,
    Pratapgarh, Uttar Pradesh – 230403, India
    ```
  * Action Buttons:
    * `Get Directions on Google Maps` (Launches confirmed Maps URL).
    * `Chat on WhatsApp` (Launches general WhatsApp inquiry).
    * `Call Store` (Triggers `tel:` protocol dialer).
  * Operating Hours card (Rendered once confirmed, clean absence fallback otherwise).

### 9.7 Cart Drawer & Dedicated Cart View (`/cart`)
* **Goal:** Review, modify, and dispatch multi-item orders.
* **Elements:**
  * Slide-over right drawer on desktop and mobile; full-page fallback at `/cart`.
  * Itemized rows: thumbnail image, product title, quantity increment/decrement buttons, unit price (if available), delete icon.
  * Subtotal calculation (if items have prices; neatly hidden if prices are "On Request").
  * Single dominant CTA: `Order on WhatsApp`.
  * Secondary button: `Continue Shopping` (closes drawer).
  * Clean empty cart state with an illustrated bag icon and `Explore Collection` button.

---

## 10. PRODUCT REQUIREMENTS & ATTRIBUTE RULES

### 10.1 Required Data Schema
Each product record strictly conforms to the following schema:
```typescript
interface Product {
  id: string;                    // Unique identifier (internal use only, e.g. "bch-001")
  name: string;                  // Display title (e.g. "Royal Crimson Silk Saree")
  slug: string;                  // URL slug (e.g. "royal-crimson-silk-saree")
  category: string;              // Category key (e.g. "sarees", "suits", "fabrics")
  description: string;           // Refined editorial copy
  price?: number;                // Retail price in INR (optional)
  compareAtPrice?: number;       // Original price for discount indication (optional)
  images: Array<{
    url: string;                 // Path to optimized image asset
    alt: string;                 // Descriptive, accessible alt text
    isPrimary: boolean;          // Primary card thumbnail flag
    width?: number;              // Layout shift prevention
    height?: number;
  }>;
  specifications?: {
    fabric?: string;             // e.g. "Pure Georgette", "Banarasi Katan Silk"
    color?: string;              // e.g. "Deep Wine / Gold Zari"
    sizesAvailable?: string[];   // e.g. ["Unstitched (Free Size)"]
    pattern?: string;            // e.g. "Intricate Floral Jaal"
    careInstructions?: string;   // e.g. "Dry Clean Only"
  };
  availability: 'in_stock' | 'out_of_stock' | 'upon_request';
  featured: boolean;             // Homepage showcase flag
  displayOrder: number;          // Manual curation sorting priority
  relatedProductIds?: string[];  // Curated cross-merchandising IDs
  createdAt: string;             // ISO-8601 string
  updatedAt: string;             // ISO-8601 string
}
```

### 10.2 Absence State Rules (Zero Fabrication)
1. **Price Missing:** Render `"Price on Request"`. Never show `₹0`, `Free`, or `NaN`.
2. **Compare-at Price Missing or Equal to Price:** Suppress comparative markdown completely.
3. **Specification Row Missing:** Omit the row entirely from the table. Never output `"None"`, `"N/A"`, or empty whitespace.
4. **Single Image Product:** Render image cleanly without displaying inactive thumbnail rails.
5. **No Description Provided:** Fallback to elegant category descriptor (e.g., *"Premium selection from our [Category] collection at Banwarilal Cloth House"*).

---

## 11. CATALOGUE BROWSING, SEARCH & FILTER REQUIREMENTS

### 11.1 Search Specifications
* **Architecture:** Instant client-side search indexing product `name`, `category`, and `specifications.fabric`.
* **Latency:** Debounced at `150ms`; execution time `< 10ms` for catalogues up to 1,000 items.
* **Normalization:** Case-insensitive, whitespace-trimmed, diacritic-tolerant.
* **Feedback:** Dynamic result counter (*"Showing 12 items"*); instant reset button (`Clear Search`).
* **Zero Results:** Display helpful empty state: *"No garments matched '[query]'. Try checking spelling or browse all collections."*

### 11.2 Filter Specifications
* **Active Filter Generation:** Filters are dynamically generated *only* from categories and attributes present in the actual product array.
* **No Dead Filters:** No filter option should exist that yields 0 results upon initial selection.
* **Mobile UX:** Filter controls presented as horizontal scrollable pills with active state indicators (`bg-[#18181B] text-white`).

### 11.3 Sorting Specifications
* `Featured`: Sorted by `displayOrder` ascending.
* `Newest`: Sorted by `createdAt` descending.
* `Price: Low to High`: Numerical sort ascending (products without prices sorted to the end).
* `Price: High to Low`: Numerical sort descending (products without prices sorted to the end).
* `Name: A-Z`: Alphabetical sort ascending.

---

## 12. CART SPECIFICATIONS & BEHAVIOR

### 12.1 State Management & Persistence
* **Store:** Client-side persistent storage using browser `localStorage` keyed under `banwarilal_cart_v1`.
* **Structure:** Array of `CartItem` objects:
  ```typescript
  interface CartItem {
    productId: string;
    productName: string;
    productSlug: string;
    thumbnailUrl: string;
    price?: number;
    quantity: number;
    selectedOptions?: {
      color?: string;
      size?: string;
    };
  }
  ```
* **Resilience:** If the stored JSON is corrupted or invalid, catch error, reset safely to empty array `[]`, and log warning without crashing the UI.

### 12.2 Cart Modification Rules
1. **Add to Cart:**
   * If product is not in cart: append item with `quantity: 1`.
   * If product is already in cart: increment `quantity` by 1 (capped at maximum limit of `10`).
   * Trigger non-blocking visual feedback (subtle drawer slide-in or toast confirmation).
2. **Quantity Controls:**
   * `+` button increments quantity by 1.
   * `-` button decrements quantity by 1; if quantity reaches 0, prompt item removal.
3. **Remove Item:** Instant removal from array with smooth exit animation.
4. **Clear Cart:** Confirmation dialog / 1-tap clear returning cart to empty state.

---

## 13. WHATSAPP ORDERING & MESSAGE REQUIREMENTS

### 13.1 Configuration Management
* The target phone number is loaded from a centralized configuration constant: `SITE_CONFIG.whatsappNumber = "91XXXXXXXXXX"`.
* Format: Clean international numeric format without `+`, spaces, dashes, or parentheses.
* **Missing Number Graceful State:** If `[WHATSAPP_NUMBER_REQUIRED]` is unconfigured, clicking the button raises a modal notice: *"WhatsApp ordering is being configured for our Chilbila store. Please call us directly at [Phone Number] or visit us in person."*

### 13.2 Message Construction Logic
Messages must be strictly sanitized, human-readable, and encoded using `encodeURIComponent()`.

#### Template A: Single-Product Inquiry (From PDP)
```text
Hello BANWARILAL CLOTH HOUSE,

I am interested in this garment from your digital catalogue:

• Product: {product.name}
• Link: {siteUrl}/product/{product.slug}

Please confirm availability, price, and further details.
Thank you!
```

#### Template B: Multi-Item Bag Inquiry (Default Mode: Names Only)
```text
Hello BANWARILAL CLOTH HOUSE,

I am interested in ordering/inquiring about these items from your digital catalogue:

1. {item[0].productName}
2. {item[1].productName}
3. {item[2].productName}

Please confirm availability, sizing, and payment/delivery details.
Thank you!
```

#### Template C: Multi-Item Bag Inquiry (Configured Mode: Names + Quantities)
```text
Hello BANWARILAL CLOTH HOUSE,

I am interested in ordering/inquiring about these items from your digital catalogue:

1. {item[0].productName} × {item[0].quantity}
2. {item[1].productName} × {item[1].quantity}

Please confirm availability, sizing, and payment/delivery details.
Thank you!
```

### 13.3 Sanitization & Leakage Safeguards
* The message builder must explicitly verify that all interpolation variables are truthy strings.
* **Prohibited Strings:** Under no circumstance may the output contain `"undefined"`, `"null"`, `"[object Object]"`, database primary keys/UUIDs, or raw SKU codes.
* If a product name is missing or invalid, substitute `"Catalogue Garment"`.

### 13.4 Target URL Construction
* Mobile & Desktop Universal URL:
  `https://wa.me/{whatsappNumber}?text={encodedMessage}`
* Universal fallback handles automatic routing to WhatsApp Native App on mobile or WhatsApp Web on desktop.

---

## 14. CONTACT, LOCATION & PHYSICAL STORE REQUIREMENTS

### 14.1 Verified Store Location Data
* **Address Display:**
  ```
  BANWARILAL CLOTH HOUSE
  Near Hanuman Mandir, New Bazaar, Chilbila,
  Pratapgarh, Uttar Pradesh – 230403, India
  ```
* **Maps CTA:** Direct link to confirmed Google Maps listing:
  `https://www.google.com/maps/place/BANWARILAL+CLOTH+HOUSE/@25.9557296,82.0044568,922m/`
* **Turn-by-Turn Navigation Trigger:**
  `https://www.google.com/maps/dir/?api=1&destination=25.9557296,82.0070317`

### 14.2 Direct Voice Channel
* Primary telephone link: `<a href="tel:[PHONE_NUMBER]">[PHONE_NUMBER]</a>`.
* Clearly demarcated alongside WhatsApp for customers preferring traditional voice consultation.

---

## 15. ADMINISTRATIVE & CONTENT UPDATE REQUIREMENTS (FUTURE-READY ARCHITECTURE)

### 15.1 Architectural Decoupling
To enable future Phase additions without code rewrites, product data must be isolated in a centralized data access module:
* **Current Phase (Phase 02/04):** Modular data provider reading from a strongly typed JSON/TypeScript repository (`src/data/products.ts`).
* **Future Phase (Phase Future A):** Seamless replacement of the local provider with a headless CMS or database API (Supabase/PostgreSQL) without altering frontend UI components.

### 15.2 Validation Pipeline
Any future administrative input must enforce:
* Title non-empty (3 to 120 characters).
* Slug unique and URL-safe (`^[a-z0-9]+(?:-[a-z0-9]+)*$`).
* Valid image URLs with mandatory `alt` text.
* Price (if supplied) must be a positive integer.

---

## 16. CONTENT REQUIREMENTS & AUDIT OF GAPS

| Content Element | Status | Action Required |
| :--- | :--- | :--- |
| **Business Name** | Confirmed Canonical | **BANWARILAL CLOTH HOUSE** |
| **Business Address** | Confirmed Canonical | Near Hanuman Mandir, New Bazaar, Chilbila, Pratapgarh – 230403 |
| **Year Established** | Confirmed Canonical | 2003 |
| **Google Maps Coordinates** | Confirmed Canonical | Lat: `25.9557296`, Long: `82.0070317` |
| **Official WhatsApp Number** | Pending Client Confirmation | Currently tagged `[WHATSAPP_NUMBER_REQUIRED]` |
| **Official Voice Calling Number** | Pending Client Confirmation | Currently tagged `[PHONE_NUMBER_REQUIRED]` |
| **Store Opening / Closing Hours** | Pending Client Confirmation | Currently tagged `[STORE_HOURS_REQUIRED]` |
| **Official Logo Vector** | Pending Client Confirmation | Currently tagged `[BRAND_LOGO_REQUIRED]` (Typographic fallback ready) |
| **Product Inventory & High-Res Photos** | Pending Client Confirmation | Currently tagged `[PRODUCT_CATALOGUE_DATA_REQUIRED]` |
| **Storefront Photography** | Pending Client Confirmation | Authorized photos needed (Google Maps scraping prohibited) |

---

## 17. DESIGN SYSTEM & FASHION LUXURY AESTHETIC

### 17.1 Color Palette
Adheres strictly to the **70–80% Neutral / 15–20% Dark / ≤5% Accent** distribution ratio:
* **Canvas Ivory (`#FAF8F5`):** Primary page background. Warm, natural textile base.
* **Studio White (`#FFFFFF`):** Product card surfaces, modal drawers, input fields.
* **Linen Beige (`#EFECE6`):** Secondary section backgrounds, tag pills, borders.
* **Deep Charcoal (`#18181B`):** Headings, body typography, primary buttons.
* **Warm Taupe (`#716E68`):** Metadata, subtitles, 1px dividers (`#E5E0D8`).
* **Muted Champagne Gold (`#C5A880`):** Luxury accent (≤5%). Focus rings, fine ornamental rules, active category indicators.
* **WhatsApp Emerald (`#25D366` / `#1EBE5D`):** Dedicated order CTA channel styling.

### 17.2 Typography Pairings
* **Display & Editorial Headings:** `Playfair Display` (Serif). Classic high-fashion Indian couture feeling.
* **Body, UI & Numbers:** `Plus Jakarta Sans` (Sans-Serif). Clean geometric legibility on high-density mobile screens.

### 17.3 Tactile Depth & Motion
* **Card Depth:** Ambient shadow `0 1px 3px rgba(24, 24, 27, 0.04)`.
* **Hover Interaction:** Smooth `-4px` elevation with soft drop shadow `0 12px 28px -6px rgba(24, 24, 27, 0.08)`.
* **Image Hover:** Scale `1.035` over `400ms cubic-bezier(0.16, 1, 0.3, 1)`.
* **Prohibited Effects:** No heavy WebGL 3D meshes, no particle effects, no spinning 3D logos, no neon glow gradients.
* **Motion Accessibility:** Strict suppression under `@media (prefers-reduced-motion: reduce)`.

---

## 18. RESPONSIVE DESIGN SPECIFICATIONS

The UI is architected strictly **Mobile-First**, engineered across all modern viewport tiers:

| Breakpoint | Viewport Range | Layout & UX Behavior |
| :--- | :--- | :--- |
| **Mobile Extra Small** | `320px – 374px` | 1-column product cards, simplified typography, 16px touch margins, full-width buttons. |
| **Mobile Standard** | `375px – 430px` | 2-column compact product grid, bottom sticky WhatsApp bar (safely padded), slide-in menu. |
| **Tablet Portrait** | `768px – 1023px` | 2 to 3-column product grid, top navigation with cart drawer trigger. |
| **Desktop / Laptop** | `1024px – 1439px` | 3 to 4-column product grid, sticky product details on PDP, dual-action CTAs. |
| **Large Displays** | `1440px+` | Capped max-width container (`1280px` or `1440px`), generous whitespace, refined margins. |

---

## 19. ACCESSIBILITY REQUIREMENTS (WCAG 2.1 AA)

1. **Color Contrast:**
   * Text (`#18181B`) on Ivory (`#FAF8F5`): Contrast ratio `14.2:1` (Exceeds WCAG AAA requirement `7:1`).
   * Supporting Taupe (`#716E68`) on Ivory (`#FAF8F5`): Contrast ratio `4.8:1` (Exceeds WCAG AA requirement `4.5:1`).
2. **Keyboard Traversal:**
   * Logical tab order through all links, filters, cards, and cart controls.
   * Visible focus indicator on all interactive elements: `outline: 2px solid #C5A880; outline-offset: 2px;`.
   * Trap focus within active Modals and Drawers; dismiss on `Escape` key.
3. **Screen Readers & Semantics:**
   * Semantic HTML5: `<header>`, `<nav>`, `<main>`, `<article>`, `<aside>`, `<footer>`.
   * Descriptive `alt` attributes on all garment images (e.g., *"Banarasi Katan Silk Saree in crimson with gold zari border"*).
   * Dynamic cart announcements: `aria-live="polite"` on cart counter updates.
   * Explicit `aria-label` tags on icon-only buttons (Search, Close, Cart, Menu).

---

## 20. PERFORMANCE SPECIFICATIONS

1. **Core Web Vitals Thresholds:**
   * **Largest Contentful Paint (LCP):** `< 2.2 seconds` on simulated 4G mobile network.
   * **Interaction to Next Paint (INP):** `< 150 milliseconds`.
   * **Cumulative Layout Shift (CLS):** `< 0.05` (Zero unexpected shifts).
2. **Image Optimization Protocol:**
   * Mandatory aspect ratio reservation (`aspect-[3/4]`) to prevent layout shifts.
   * Modern formats: `AVIF` primary, `WebP` secondary, `JPEG` fallback.
   * Native responsive sizing (`srcset` with `360w`, `640w`, `960w`, `1200w`).
   * Above-the-fold hero image preloaded with `priority`; below-the-fold images lazy-loaded (`loading="lazy"`).
3. **Bundle & Font Discipline:**
   * Self-hosted Google Fonts (`Playfair Display`, `Plus Jakarta Sans`) using `font-display: swap`.
   * Zero external heavy libraries (No Three.js, Lodash, jQuery, or bloated UI kits).

---

## 21. SECURITY REQUIREMENTS

1. **Zero-Payment Threat Surface:** No financial transactions, card details, or payment webhooks exist on the platform. PCI-DSS scope is zero.
2. **XSS & Injection Protection:**
   * Search queries and URL parameters sanitized and escaped prior to DOM rendering.
   * WhatsApp message parameters encoded via `encodeURIComponent()` to block query injection.
3. **External Link Hardening:**
   * All outbound links (Google Maps, WhatsApp, Social) must enforce `target="_blank"` and `rel="noopener noreferrer"`.
4. **Content Security Policy (CSP):**
   * Disallow inline script injection (`script-src 'self'`).
   * Restrict image sources to internal origins, approved CDN, and trusted map tile hosts.
5. **No Bundled Secrets:** No API keys, admin passwords, or sensitive credentials bundled into client scripts.

---

## 22. SEO & STRUCTURED DATA REQUIREMENTS

1. **Metadata Architecture:**
   * Canonical Title: `BANWARILAL CLOTH HOUSE — Premium Clothing & Readymade Garments, Chilbila, Pratapgarh`
   * Dynamic PDP Title: `{Product Name} — BANWARILAL CLOTH HOUSE`
   * Dynamic PDP Meta Description: Clean 155-character summary with category, fabric, and store location.
2. **Open Graph & Social Sharing:**
   * Complete `og:title`, `og:description`, `og:image` (high-res garment image), and `og:url` on every product page.
3. **Schema.org Structured Data:**
   * **LocalBusiness / ClothingStore Schema:**
     ```json
     {
       "@context": "https://schema.org",
       "@type": "ClothingStore",
       "name": "BANWARILAL CLOTH HOUSE",
       "address": {
         "@type": "PostalAddress",
         "streetAddress": "Near Hanuman Mandir, New Bazaar, Chilbila",
         "addressLocality": "Pratapgarh",
         "addressRegion": "Uttar Pradesh",
         "postalCode": "230403",
         "addressCountry": "IN"
       },
       "geo": {
         "@type": "GeoCoordinates",
         "latitude": 25.9557296,
         "longitude": 82.0070317
       },
       "url": "https://banwarilalclothhouse.com",
       "hasMap": "https://www.google.com/maps/place/BANWARILAL+CLOTH+HOUSE/@25.9557296,82.0044568,922m/",
       "foundingDate": "2003"
     }
     ```
   * **Product Schema:** Product title, image, description, and merchant organization on all PDPs.

---

## 23. ANALYTICS & EVENT TRACKING ARCHITECTURE (PRIVACY-FIRST)

The system defines a decoupled analytics interface ready for lightweight, privacy-compliant event tracking:

| Event Name | Trigger Condition | Payload Data |
| :--- | :--- | :--- |
| `view_item` | User opens Product Detail Page | `productId`, `productName`, `category` |
| `add_to_cart` | User taps Add to Cart | `productId`, `productName`, `price` |
| `open_cart` | User opens Cart Drawer / View | `cartItemCount` |
| `initiate_whatsapp_single` | User taps Order on WhatsApp on PDP | `productId`, `productName` |
| `initiate_whatsapp_cart` | User taps Order on WhatsApp in Cart | `itemCount`, `productNamesList` |
| `get_directions_click` | User taps Directions to Store | `sourceComponent` |
| `call_store_click` | User taps Phone Call link | `sourceComponent` |

---

## 24. MVP SCOPE (PHASE 02 SPECIFICATION)

### In-Scope for MVP:
* **Brand Experience:** Authoritative visual presence for BANWARILAL CLOTH HOUSE using confirmed colors, typography, and established (2003) heritage.
* **Core Pages:** Homepage (`/`), Catalogue Directory (`/catalogue`), Category Archive (`/collection/[slug]`), Product Detail (`/product/[slug]`), About (`/about`), Contact & Store Locator (`/contact`), Cart Drawer / View (`/cart`).
* **Product Engine:** Strongly typed product catalogue supporting high-res photography, specifications, absence states, and availability flags.
* **Cart System:** Client-persisted shopping bag supporting multi-item selection, quantity toggling, deletion, and subtotal calculation.
* **WhatsApp Ordering:** Dynamic message generation for single-product direct inquiries and multi-item bag dispatches.
* **Store Integration:** Accurate address, landmark (Near Hanuman Mandir), coordinates, and 1-tap Google Maps directions link.
* **Technical Quality:** WCAG 2.1 AA accessibility, Core Web Vitals compliance, responsive 320px–1440px layouts, SEO metadata, zero security vulnerabilities.

---

## 25. EXPLICITLY OUT OF SCOPE (NON-GOALS FOR MVP)

The following capabilities are **strictly excluded** from the current MVP to maintain focus and avoid over-engineering:
* ❌ Online Payment Gateways (No UPI, Razorpay, Stripe, Paytm, cards, or digital wallets).
* ❌ User Authentication / Customer Login / Account Registration.
* ❌ Automated Order Fulfillment / Order Tracking Portal.
* ❌ Public User Reviews / Star Rating Submission forms.
* ❌ Coupon Codes / Loyalty Rewards / Referral Programs.
* ❌ Automated Inventory ERP / Live Warehouse Sync.
* ❌ AI Chatbot / Algorithmic Virtual Sales Assistants.
* ❌ Native Mobile App Builds (iOS IPA / Android APK).

---

## 26. FUTURE ROADMAP (POST-MVP EVOLUTION)

* **Phase Future A — Headless Admin CMS:** Lightweight dashboard for merchant staff to upload photos, update prices, and mark items out-of-stock without code edits.
* **Phase Future B — WhatsApp Business Cloud API:** Automated acknowledgement receipts and webhook status updates.
* **Phase Future C — Curated Customer Lookbooks:** Seasonal festival bridal collections and styling guides.
* **Phase Future D — Opt-In SMS / WhatsApp Stock Alerts:** Customer notifications when requested fabrics arrive.
* **Phase Future E — Online Payment Activation:** Optional UPI/Card checkout integration if the business model expands beyond local/regional retail.

---

## 27. EDGE CASES & SYSTEM RESILIENCE MATRIX

| Scenario | Edge Condition | Required System Behavior |
| :--- | :--- | :--- |
| **Duplicate Product Add** | Customer clicks "Add to Cart" multiple times for the same item. | Increments quantity by 1 up to maximum 10. Displays toast: *"Updated quantity to [N]"*. Does NOT duplicate rows. |
| **Item Out of Stock** | Product availability set to `'out_of_stock'`. | Replaces `Add to Cart` with disabled button; `Order on WhatsApp` switches text to `Enquire for Restock`. |
| **No Price Provided** | Merchant omits price from product record. | Displays `"Price on Request"`. Suppresses subtotal lines in cart; WhatsApp message requests price confirmation. |
| **Single Product Image** | Product has exactly 1 image. | Main preview renders cleanly; thumbnail selector bar is gracefully hidden. |
| **Missing Product Description**| Merchant provides name and fabric but no description. | Renders clean specification table without empty descriptive text gaps. |
| **Empty Cart WhatsApp Click** | Customer opens empty cart drawer. | `Order on WhatsApp` button is disabled; displays *"Your shopping bag is empty"* with an `Explore Collection` button. |
| **Unconfigured WhatsApp Number**| `[WHATSAPP_NUMBER_REQUIRED]` has not been replaced with a valid phone number. | Displays helpful modal: *"WhatsApp ordering is currently being updated for our Chilbila store. Please call us at [Phone] or visit our store."* |
| **Network Latency / Slow 4G** | Garment images take > 3s to download. | Renders lightweight skeleton loader matching 3:4 aspect ratio; layout remains stable (`CLS: 0`). |
| **Invalid Product URL** | User navigates to `/product/invalid-slug`. | Displays elegant 404 page: *"Garment not found"* with 1-click button to `/catalogue`. |
| **Local Storage Corrupted** | Browser `localStorage` contains malformed JSON for cart. | Safely catches parsing exception, clears corrupted key, resets to empty array, and continues execution without crashing. |
| **Very Large Catalogue** | Catalogue expands to 500+ garments. | Instant client-side search indexing remains decoupled; pagination or virtualized grid activates seamlessly. |

---

## 28. ACCEPTANCE CRITERIA (GHERKIN / SPECIFICATION BY EXAMPLE)

### AC-01: Product Discovery & Inspection
* **Given** a valid product with title, category, 3:4 images, and specifications,
* **When** a user visits the Product Detail Page (`/product/[slug]`),
* **Then** the primary image renders without distortion, specifications appear in a clean table without empty fields, and both `Add to Cart` and `Order on WhatsApp` CTAs are functional.

### AC-02: Multi-Item Cart Curation & Local Persistence
* **Given** a user has added 3 separate garments to their cart,
* **When** the user closes the browser tab and reopens the website after 24 hours,
* **Then** the cart counter indicates `3`, the cart drawer displays all 3 items with exact names and quantities, and items are ready for WhatsApp order dispatch.

### AC-03: Sanitized WhatsApp Message Dispatch
* **Given** the cart contains `"Banarasi Silk Saree"` (Qty: 1) and `"Embroidered Kurti Set"` (Qty: 2),
* **When** the user clicks `Order on WhatsApp`,
* **Then** WhatsApp opens targeting the configured business number, with a cleanly URL-encoded string containing both item names and quantities, containing zero occurrences of `"undefined"`, `"null"`, or technical UUIDs.

### AC-04: Single-Item Direct WhatsApp Inquiry
* **Given** a user viewing the PDP for `"Chanderi Cotton Suit"`,
* **When** the user clicks `Order on WhatsApp`,
* **Then** WhatsApp launches with a pre-filled message citing `"Chanderi Cotton Suit"` and the exact canonical product URL.

### AC-05: Store Location & Directions
* **Given** a user on the Contact page or Store Section,
* **When** the user clicks `Get Directions`,
* **Then** Google Maps opens targeting Latitude `25.9557296`, Longitude `82.0070317` with landmark *Near Hanuman Mandir, Chilbila, Pratapgarh*.

---

## 29. SUCCESS METRICS

1. **Catalogue Engagement:** ≥ 65% of visitors transition from Homepage to Catalogue or Product pages.
2. **High-Intent Inquiries:** Cart-to-WhatsApp and Single-Product-to-WhatsApp conversion rate tracked as the primary digital objective.
3. **Store Directions Activation:** Tracking clicks on Google Maps directions to gauge footfall generation.
4. **Mobile Performance Score:** Lighthouse Performance Score ≥ 90, Accessibility Score ≥ 95, SEO Score ≥ 95 on mobile devices.

---

## 30. OPEN QUESTIONS & CLIENT CONFIRMATION CHECKLIST

The following items are designated **`CLIENT CONFIRMATION REQUIRED`** and must be resolved before production deployment:

1. **`[WHATSAPP_NUMBER_REQUIRED]`:** Exact international mobile number for the official WhatsApp business channel (e.g., `+91 9XXXXXXXXX`).
2. **`[PHONE_NUMBER_REQUIRED]`:** Primary voice phone number for direct incoming customer telephone calls.
3. **`[STORE_HOURS_REQUIRED]`:** Exact retail opening and closing times across all 7 days for the Chilbila store.
4. **`[BRAND_LOGO_REQUIRED]`:** Confirmation on whether an existing official vector logo asset will be supplied, or if the designed typographic luxury masthead is approved as canonical.
5. **`[PRODUCT_CATALOGUE_DATA_REQUIRED]`:** Initial batch of real products (names, categories, fabric details, pricing rules, and high-resolution photography).
6. **`[DELIVERY_TERMS_REQUIRED]`:** Eligible radius and conditions for the same-day local delivery noted on public records.
