# BANWARILAL CLOTH HOUSE — INFORMATION ARCHITECTURE & COMPLETE SCREEN SYSTEM

> **CANONICAL SPECIFICATION — PHASE 04**  
> **Target Business:** BANWARILAL CLOTH HOUSE  
> **Document Version:** 1.0.0  
> **Governing Specifications:**  
> • [`PROJECT_SOURCE_OF_TRUTH.md`](./PROJECT_SOURCE_OF_TRUTH.md) (Phase 01 — Foundation & Constraints)  
> • [`PRODUCT_REQUIREMENTS_DOCUMENT.md`](./PRODUCT_REQUIREMENTS_DOCUMENT.md) (Phase 02 — PRD)  
> • [`TECHNICAL_REQUIREMENTS_DOCUMENT.md`](./TECHNICAL_REQUIREMENTS_DOCUMENT.md) (Phase 03 — TRD & Architecture)  
> **Status:** Authoritative Blueprint for UX/UI Interaction Design (Phase 05)

---

## 1. INFORMATION ARCHITECTURE PHILOSOPHY & HEURISTICS

The information architecture of **BANWARILAL CLOTH HOUSE** is governed by **three foundational UX laws**:

1. **Law of Immediate Comprehension:** A visitor must understand within 3 seconds of landing:
   - *Who:* BANWARILAL CLOTH HOUSE (Established 2003)
   - *What:* Authentic retail clothing, readymade garments, sarees, and fine textiles
   - *Action:* Explore the curated collections or order/enquire directly via WhatsApp
2. **Law of Minimal Friction (Zero Checkout Overhead):** The platform bypasses the complex, high-abandonment transactional checkout model (no account registration, no credit card forms, no OTP gates). Every path converges on a direct human dialogue with the merchant via WhatsApp.
3. **Law of No Dead Ends:** Every single view, modal, drawer, empty state, and 404 screen provides an explicit, single-tap forward momentum trigger back into discovery or personal communication.

```
                    ┌──────────────────────────────────────────────┐
                    │            BANWARILAL CLOTH HOUSE            │
                    │        (Heritage Retail Store Est. 2003)     │
                    └──────────────────────┬───────────────────────┘
                                           │
         ┌─────────────────────────────────┴─────────────────────────────────┐
         ▼                                                                   ▼
┌─────────────────────────────────┐                         ┌─────────────────────────────────┐
│       CATALOGUE DISCOVERY       │                         │    PHYSICAL STORE & HERITAGE    │
│  Browse Collections & Products  │                         │   Chilbila Location & Contact   │
└────────────────┬────────────────┘                         └────────────────┬────────────────┘
                 │                                                           │
        ┌────────┴────────┐                                         ┌────────┴────────┐
        ▼                 ▼                                         ▼                 ▼
 ┌─────────────┐   ┌─────────────┐                           ┌─────────────┐   ┌─────────────┐
 │ Single-Item │   │ Multi-Item  │                           │ Turn-by-Turn│   │ Direct Call │
 │ Direct WA   │   │ Session Bag │                           │ Google Maps │   │ / Inquiry   │
 └──────┬──────┘   └──────┬──────┘                           └─────────────┘   └─────────────┘
        │                 │
        └────────┬────────┘
                 ▼
 ┌───────────────────────────────┐
 │   ORDER / ENQUIRY DISPATCH    │
 │ (WhatsApp Structured Message) │
 └───────────────────────────────┘
```

---

## 2. COMPLETE SITEMAP TREE

```
BANWARILAL CLOTH HOUSE
│
├── PUBLIC CATALOGUE & STORE SURFACES (SEO Indexable)
│   ├── / (Homepage)
│   │     ├── Hero Showcase & Brand Positioning (Est. 2003)
│   │     ├── Category Discovery Matrix
│   │     ├── Featured Garments Showcase
│   │     ├── Heritage & Craftsmanship Narrative
│   │     ├── Editorial Visual Showcase
│   │     ├── In-Store Shopping Benefits
│   │     ├── Chilbila Store Locator Card (Near Hanuman Mandir)
│   │     └── WhatsApp Global Action Anchor
│   │
│   ├── /collections (Full Catalogue Directory)
│   │     ├── Active Category Selector Tabs
│   │     ├── Instant Keyword Search Bar
│   │     ├── Dynamic Attribute & Availability Filters
│   │     ├── Deterministic Sort Selector
│   │     └── Responsive 3:4 Product Grid
│   │
│   ├── /collections/[category-slug] (Category-Specific Archive)
│   │     ├── Category Breadcrumb & Editorial Header
│   │     ├── Scoped Product Grid
│   │     └── Cross-Category Navigation Gateway
│   │
│   ├── /products/[product-slug] (Product Detail Page - PDP)
│   │     ├── Multi-Image 3:4 Gallery (Zoom & Mobile Swipe)
│   │     ├── Garment Title, Absence-Tolerant Pricing & Status
│   │     ├── Specification Table (Fabric, Color, Dimensions)
│   │     ├── Primary Action: Add to Cart
│   │     ├── Direct Action: Order on WhatsApp
│   │     └── Related Garments Discovery Loop
│   │
│   ├── /about (Store Heritage & Values)
│   │     ├── 20+ Years Retail Narrative in Pratapgarh
│   │     ├── Commitment to Fabric Quality & Personal Consultation
│   │     └── Storefront & Craftsmanship Gallery
│   │
│   └── /contact (Store Location, Maps & Channels)
│         ├── Canonical Address Block (Near Hanuman Mandir, Chilbila)
│         ├── Direct Map Launcher (Google Maps Coordinates)
│         ├── Telephone Call Action
│         └── Direct WhatsApp General Inquiry
│
├── UTILITY & INTERACTION SURFACES
│   ├── /cart (Dedicated Fallback Cart View / Flyout Drawer)
│   │     ├── Itemized List (Thumbnails, Titles, Quantities, Prices)
│   │     ├── Quantity Modifiers (+ / - / Remove)
│   │     ├── Dynamic Subtotal (Omitted cleanly if unpriced)
│   │     ├── Continue Shopping Trigger
│   │     └── Dominant CTA: Order on WhatsApp
│   │
│   ├── /not-found (404 Error Recovery Screen)
│   │     └── Elegant Notice + 1-Tap "Explore Collection" Action
│   │
│   └── /error (500 Global System Error Boundary)
│         └── Friendly Offline/Retry Card with Direct Phone Link
│
└── PROTECTED ADMINISTRATIVE SYSTEM (Blocked from Robots)
    ├── /admin/login (Supabase Auth Session Gate)
    ├── /admin (Store Overview Dashboard)
    ├── /admin/products (Product Catalogue Management & Uploads)
    ├── /admin/categories (Category Hierarchy & Sorting)
    └── /admin/settings (Store Address, Hours, WhatsApp Number Config)
```

---

## 3. DETAILED PAGE INVENTORY

| Page Route | Purpose & Role | Primary User Type | Primary CTA | Secondary CTA | Key Components | Data Required | SEO Priority |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **`/`**<br>(Homepage) | Establish brand prestige, introduce 2003 heritage, showcase key categories, drive footfall and catalogue browsing. | Product Explorer & Local Visitor | `Explore Collection`<br>*(Jump to /collections)* | `Enquire on WhatsApp`<br>*(General inquiry)* | `Navbar`, `HeroSection`, `CategoryGrid`, `FeaturedGrid`, `BrandStory`, `StoreLocationCard`, `Footer` | Featured products, active categories, site settings | **Critical (1.0)** |
| **`/collections`**<br>(All Collections) | Primary digital showroom. Comprehensive browsing, client-side search, filtering, and sorting. | Product Explorer | `View Product`<br>*(Open PDP)* | `Quick Add to Cart`<br>*(Add to session bag)* | `CatalogueBrowser`, `SearchInput`, `FilterPills`, `SortDropdown`, `ProductGrid`, `ProductCard` | Full active product array, active categories | **High (0.9)** |
| **`/collections/[slug]`**<br>(Category Archive) | Focused browsing for specific apparel types (e.g., Sarees, Suits, Readymade). | Product Explorer | `View Product`<br>*(Open PDP)* | `Quick Add to Cart`<br>*(Add to bag)* | `CategoryHeader`, `Breadcrumbs`, `ProductGrid`, `EmptyCategoryState` | Category metadata, filtered product array | **High (0.8)** |
| **`/products/[slug]`**<br>(Product Detail) | High-intent conversion page. Detailed garment inspection, specifications, and direct action triggers. | Ready-to-Enquire & Multi-Item Shopper | `Add to Cart`<br>*(Continue browsing)* | `Order on WhatsApp`<br>*(Instant PDP inquiry)* | `ProductGallery`, `SpecTable`, `AvailabilityBadge`, `WhatsAppButton`, `RelatedGrid` | Complete product record, category data, related items | **Critical (0.9)** |
| **`/about`**<br>(Brand Heritage) | Reinforce trust, local roots, and physical presence since 2003 in Chilbila, Pratapgarh. | Local Store Visitor & Heritage Shopper | `Explore Collection` | `Get Directions` | `HeritageTimeline`, `ValueHighlights`, `StorefrontVisuals` | Site settings, established year (2003) | **Medium (0.6)** |
| **`/contact`**<br>(Store & Location) | Drive store footfall, direct phone calls, and location navigation. | Local Store Visitor | `Get Directions`<br>*(Launches Google Maps)* | `Call Store` / `Chat on WhatsApp` | `AddressCard`, `GoogleMapsTrigger`, `DirectPhoneDialer`, `StoreHoursCard` | Store address, coordinates, hours, phone, WhatsApp | **High (0.7)** |
| **`/cart`**<br>(Shopping Bag) | Review curated pieces, modify quantities, and compile multi-item WhatsApp order payload. | Multi-Item Shopper | `Order on WhatsApp`<br>*(Dispatch encoded bag)* | `Continue Shopping`<br>*(Return to /collections)* | `CartDrawer`, `CartItemRow`, `QuantityControls`, `CartEmptyState` | Client `localStorage` cart state, WhatsApp number | **Noindex (Utility)** |
| **`/not-found`**<br>(404 Screen) | Recover lost users gracefully back into the catalogue. | All Users | `Explore Collection` | `Return Home` | `NotFoundCard`, `QuickCategoryLinks` | Active category list | **Noindex** |
| **`/admin/*`**<br>(Admin Suite) | Enable merchant to manage products, categories, hours, and WhatsApp configuration. | Store Administrator | `Save Changes` | `Cancel / Revert` | `AdminSidebar`, `ProductTable`, `ProductEditor`, `MediaUploader`, `SettingsForm` | Full DB models with Admin RLS claim | **Disallowed** |

---

## 4. NAVIGATION MAP

### 4.1 Desktop Global Header (Height: 80px, Sticky, Blur Effect)
```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│  BANWARILAL CLOTH HOUSE       Collections    About    Store Location   [Search] [Bag (2)]│
│  Est. 2003 Chilbila                                                     [WhatsApp CTA] │
└────────────────────────────────────────────────────────────────────────────────────────┘
```
* **Brand Typographic Masthead:** Left aligned. Displays `BANWARILAL CLOTH HOUSE` in `Playfair Display` with subtle uppercase tracking, paired with fine subtitle `Est. 2003 • Chilbila`. Clicking navigates to `/`.
* **Primary Links:** Center aligned. Clean sans-serif typography (`Collections`, `About`, `Store Location`).
* **Utility Group:** Right aligned:
  1. `Search` icon button (opens instant search overlay / jumps to catalogue search input).
  2. `Shopping Bag` button with dynamic badge counter (`aria-live="polite"`). Clicking triggers the `CartDrawer`.
  3. `Enquire` button (Muted gold border / WhatsApp green accent) triggering instant general inquiry.

### 4.2 Mobile Global Header & Drawer
* **Compact Header (Height: 64px):**
  * Left: Brand mark `BANWARILAL` (Compact 1-line luxury text).
  * Right: `Shopping Bag` trigger with item counter badge + `Hamburger Menu` icon (44px touch target).
* **Mobile Slide-in Drawer:**
  * Clean, full-height slide-over.
  * Nav links: `Home`, `Collections` (with expandable category sub-list), `About`, `Store Location`.
  * Prominent Contact Action Block:
    * `Call Store: [Phone Number]` (with phone icon)
    * `WhatsApp Us` (with WhatsApp icon)
    * `Get Directions: Near Hanuman Mandir, Chilbila` (with map pin icon)

### 4.3 Global Footer Architecture
* **Column 1 — Brand Heritage:** `BANWARILAL CLOTH HOUSE`, founding year 2003, statement on traditional craftsmanship and retail excellence.
* **Column 2 — Collections:** Direct links to verified categories (`Sarees`, `Suits & Dress Material`, `Menswear`, `Fabrics`, `All Collections`).
* **Column 3 — Physical Store & Contact:**
  * Address: *Near Hanuman Mandir, New Bazaar, Chilbila, Pratapgarh, Uttar Pradesh – 230403*
  * Phone: Direct click-to-call link
  * WhatsApp: Direct click-to-chat link
  * Google Maps: Direct link to confirmed Google Maps profile
* **Column 4 — Operating Hours & Notes:** Store hours (when confirmed), In-store shopping confirmation, and local dispatch note.
* **Bottom Bar:** Copyright notice, zero payment disclaimer (*"Inquiries and orders fulfilled via WhatsApp & In-Store"*), and clean architectural credit.

---

## 5. USER JOURNEY MAPS

### 5.1 Primary Customer Journey: Multi-Product Curation & Bag Order
```
1. DISCOVERY
   Customer arrives via Google Maps link, mobile search, or recommendation.
   Lands on Homepage (/) or Collections (/collections).
   Immediate visual impression: Warm ivory canvas, elegant typography, authentic photography.

2. BROWSING
   Customer filters by category (e.g. "Sarees") or searches "Silk".
   Interacts with responsive 3:4 cards displaying garment image, title, and availability.

3. INSPECTION (PDP)
   Taps garment card ──► Navigates to /products/[product-slug].
   Examines multi-image gallery with zoom lens.
   Reviews specifications (Fabric, Work, Color) in clean table. Absence states handled cleanly.

4. SELECTION
   Customer taps "Add to Cart" ──► Visual toast confirms addition; cart counter badge increments.
   Customer taps "Continue Shopping" or breadcrumb ──► Returns to catalogue.
   Repeats step 3 & 4 for a second garment.

5. BAG REVIEW
   Customer taps Cart Bag icon ──► CartDrawer slides over from the right.
   Reviews selected items: "Banarasi Silk Saree" (Qty: 1) and "Chanderi Cotton Suit" (Qty: 1).
   Customer can increment quantity or remove items.

6. ORDER DISPATCH
   Customer taps dominant CTA: "Order on WhatsApp".
   System verifies state, URL-encodes items into structured message.
   Native WhatsApp opens directly targeting the store's verified number.

7. MERCHANT CONSULTATION & FULFILLMENT
   Store staff receives structured message:
   "Hello BANWARILAL CLOTH HOUSE, I am interested in ordering/inquiring about these items..."
   Staff confirms live stock, shares additional photos if requested, and arranges in-store pickup or local dispatch.
```

### 5.2 Secondary Journey: Single-Product Immediate Inquiry
```
1. Customer views specific garment on Product Detail Page (/products/[slug]).
2. Customer taps "Order on WhatsApp" directly under the specification table.
3. System builds single-product payload citing garment name and canonical URL.
4. WhatsApp launches instantly with pre-filled message.
5. Customer sends message in 1 tap without navigating through a cart.
```

### 5.3 Store Visit Journey: Physical Store Discovery
```
1. Customer enters Homepage or Contact page (/contact).
2. Views Store Location block with confirmed landmark: "Near Hanuman Mandir, New Bazaar, Chilbila".
3. Taps "Get Directions on Google Maps".
4. Native Google Maps app launches with destination coordinates (25.9557296, 82.0070317).
5. Customer receives turn-by-turn driving/walking navigation directly to the store.
```

---

## 6. DESIGN-READY COMPONENT INVENTORY & HIERARCHY

To ensure architectural discipline and avoid code bloat, all components adhere strictly to the **Single Reusable Component Rule** (e.g., one flexible `ProductCard` with layout variants, rather than fragmented separate cards).

```
components/
├── layout/
│   ├── Navbar.tsx             # Global responsive sticky header with brand mark & triggers
│   ├── MobileMenuDrawer.tsx   # Slide-in mobile menu with touch-friendly links & contact
│   ├── Footer.tsx             # Comprehensive 4-column footer with verified business info
│   ├── AnnouncementBar.tsx    # Dismissible top banner for store announcements & hours
│   └── Breadcrumbs.tsx        # Compact navigational breadcrumbs for collections & PDPs
│
├── home/
│   ├── HeroSection.tsx        # Editorial split hero with 2003 credentials & dual CTAs
│   ├── CategoryGrid.tsx       # Curated 3:4 visual category gateways
│   ├── FeaturedGrid.tsx       # 4–8 curated product showcase with "View All" gateway
│   ├── BrandStory.tsx         # 20+ years Chilbila heritage narrative card
│   ├── VisualShowcase.tsx     # Editorial lookbook strip emphasizing fabric textures
│   └── StoreLocationCard.tsx  # Hanuman Mandir landmark card with Google Maps directions CTA
│
├── catalogue/
│   ├── CatalogueBrowser.tsx   # Client wrapper orchestrating search, filter, and grid state
│   ├── SearchInput.tsx        # Debounced instant search input with clear button
│   ├── FilterPills.tsx        # Horizontal scrollable category & availability pill filters
│   ├── SortDropdown.tsx       # Deterministic sort selector (Featured, Price, Newest, Name)
│   ├── ProductGrid.tsx        # Responsive grid (2-col mobile, 3/4-col desktop)
│   └── CatalogueEmptyState.tsx# Contextual recovery card when query returns 0 matches
│
├── product/
│   ├── ProductCard.tsx        # Canonical 3:4 garment card (used across Home, Catalogue & Related)
│   │                          # Variants: 'grid' (default), 'compact' (related), 'featured'
│   ├── ProductGallery.tsx     # Multi-image viewer with thumbnail rail, touch swipe & lens zoom
│   ├── SpecificationTable.tsx # Clean key-value spec table with strict absence-state handling
│   ├── AvailabilityBadge.tsx  # In Stock / Out of Stock / Upon Request indicator pill
│   └── RelatedProducts.tsx    # Contextual recommendation rail based on category matching
│
├── cart/
│   ├── CartDrawer.tsx         # Slide-over bag panel with backdrop blur and trap focus
│   ├── CartItemRow.tsx        # Compact row with thumbnail, title, price, quantity & delete
│   ├── CartSummary.tsx        # Subtotal calculation block (cleanly omitted if unpriced)
│   └── CartEmptyState.tsx     # Refined empty shopping bag graphic with "Explore Collection" CTA
│
├── whatsapp/
│   ├── WhatsAppButton.tsx     # Canonical emerald action button (supports single & bag payloads)
│   └── WhatsAppFloatingAnchor # Non-intrusive mobile bottom floating button (safely padded)
│
└── ui/                        # Low-level accessible primitives
    ├── Button.tsx             # Primary, secondary, outline, and ghost button styles
    ├── Badge.tsx              # Status, category, and feature indicator tags
    ├── Skeleton.tsx           # 3:4 aspect ratio loading placeholders
    ├── Modal.tsx              # Accessible dialog primitive with Escape listener
    └── Toast.tsx              # Non-blocking interactive feedback notification
```

---

## 7. CONTENT HIERARCHY PER SCREEN

Every screen answers the 4 core UX questions:
1. *Where am I?*
2. *What am I looking at?*
3. *What can I do here?*
4. *Where can I go next?*

```
HOMEPAGE (/)
  Level 1 (Top Priority): Business Brand Identity & 2003 Heritage Credential
  Level 2: Primary Call to Action ("Explore Collection") & Visual Garment Impression
  Level 3: Core Categories (Visual entry points)
  Level 4: Featured Collection Highlights
  Level 5: Physical Store Credibility & Location (Near Hanuman Mandir, Chilbila)
  Level 6: Direct WhatsApp Enquiry Trigger

COLLECTIONS DIRECTORY (/collections)
  Level 1: Active Category Scope & Item Count
  Level 2: Instant Search & Filter Controls
  Level 3: Product Photography Grid (3:4 aspect ratio)
  Level 4: Product Title, Availability & Price (or "Price on Request")
  Level 5: Quick Add to Bag / View Details Actions

PRODUCT DETAIL PAGE (/products/[slug])
  Level 1: High-Resolution Garment Photography (Multiple Angles / Weave Details)
  Level 2: Garment Name & Price (or "Price on Request")
  Level 3: Immediate Actions: "Add to Cart" & "Order on WhatsApp"
  Level 4: Garment Specifications (Fabric, Color, Dimensions, Care)
  Level 5: Related Pieces from Same Category

CART / SHOPPING BAG (/cart or Drawer)
  Level 1: Selected Garment List with Thumbnails & Quantities
  Level 2: Primary Dominant Action: "Order on WhatsApp"
  Level 3: Subtotal Calculation (Conditional)
  Level 4: Secondary Action: "Continue Shopping"
```

---

## 8. DATA DEPENDENCY MAP

| Surface / Route | Primary Data Entity | Dependent Data Entity | Fallback When Data Unavailable |
| :--- | :--- | :--- | :--- |
| **`/` (Homepage)** | `SiteSettings` (Business name, address, year) | `Product[]` (where `featured = true`), `Category[]` (active) | Displays static brand heritage card; featured grid gracefully collapses if 0 featured items exist. |
| **`/collections`** | `Product[]` (all `is_active = true`) | `Category[]` (all `is_active = true`) | Renders `CatalogueEmptyState` with message: *"Our collection is currently being updated."* |
| **`/collections/[slug]`**| `Category` (by slug) | `Product[]` (where `category_id = category.id`) | If category slug invalid, invokes `notFound()` redirecting to `/collections`. |
| **`/products/[slug]`** | `Product` (by slug) | `ProductImage[]`, `Category`, `Product[]` (related) | If slug invalid, renders custom 404 page with collection link. If single image, thumbnail rail hides. |
| **`/cart` (Drawer)** | `CartItem[]` (from browser `localStorage`) | `SiteSettings.whatsappNumber` | If cart empty, displays `CartEmptyState`. If WhatsApp number unconfigured, disables button with alert. |
| **`/about`** | Static Heritage Copy | `SiteSettings` (Coordinates, landmark) | Fallback to confirmed 2003 Chilbila credentials. |
| **`/contact`** | `SiteSettings` (Address, hours, phone, WhatsApp) | Google Maps coordinates | Address renders canonical text; map CTA targets confirmed coordinates. |

---

## 9. ERROR, LOADING & EMPTY STATE SPECIFICATION

| State Type | Trigger Scenario | Visual Presentation | Primary Recovery Action |
| :--- | :--- | :--- | :--- |
| **Loading: Catalogue** | Initial load or category switch on 4G network. | Grid of 6–8 animated skeleton cards matching exact 3:4 aspect ratio with subtle shimmer. | Content loads smoothly; layout shift `CLS: 0.00`. |
| **Loading: PDP** | Navigating to `/products/[slug]`. | Large 3:4 image skeleton on left, typographic line skeletons on right. | Preserves page structure until hydrated. |
| **Empty: Cart** | Customer opens bag with 0 items. | Elegant minimalist shopping bag illustration in warm taupe, with message: *"Your shopping bag is empty."* | High-contrast button: `Explore Collection` (Navigates to `/collections`). |
| **Empty: Search Results** | Search query matches 0 products. | Search illustration with message: *"No garments found matching '[query]'. Check spelling or browse our collections."* | Button: `Clear Search` (resets input and restores full catalogue). |
| **Empty: Category** | Category exists but has 0 active products. | Message: *"New arrivals for this collection are coming soon."* | Button: `Browse All Garments` (Navigates to `/collections`). |
| **Error: 404 Not Found** | User enters invalid URL or archived product slug. | Editorial 404 screen: *"Garment or page not found. It may have been moved or updated."* | Primary: `Explore Collection`<br>Secondary: `Back to Home` |
| **Error: 500 System Error**| Unexpected server failure or database downtime. | Restrained card: *"We are currently updating our digital showroom. Please call our Chilbila store directly."* | Click-to-call direct phone dialer button. |
| **WhatsApp Unconfigured** | Target WhatsApp number missing in settings. | Modal tooltip: *"WhatsApp ordering is being updated for our Chilbila store. Please call us at [Phone] or visit in person."* | Direct phone call action button. |

---

## 10. RESPONSIVE INFORMATION ARCHITECTURE

```
SCREEN SIZE BREAKPOINT BEHAVIOR MATRIX

┌────────────────────────────────────────────────────────────────────────────────────────┐
│ MOBILE (320px – 430px) — PRIMARY FOCUS                                                 │
│ • Header: Compact brand mark + Bag trigger (with badge) + Hamburger drawer.            │
│ • Navigation: Off-canvas slide-in drawer with phone, WhatsApp, and Maps direct links. │
│ • Catalogue Grid: 2-column compact grid with standardized 3:4 ratio.                   │
│ • PDP Layout: Stacked (Swipeable image gallery on top ──► Product info & CTAs below).  │
│ • Cart: Full-screen sliding drawer with sticky bottom "Order on WhatsApp" bar.         │
│ • Filter UX: Bottom sheet / slide-up modal triggered via compact "Filters" pill.      │
│ • WhatsApp CTA: Sticky bottom floating anchor (safely padded above OS home indicator). │
└────────────────────────────────────────────────────────────────────────────────────────┘
                                           │
                                           ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ TABLET (768px – 1023px)                                                                │
│ • Header: Full logo + Condensed navigation links + Bag trigger.                        │
│ • Catalogue Grid: 3-column spacious grid with hover micro-elevations.                  │
│ • PDP Layout: Asymmetrical split (45% gallery left / 55% details right).               │
│ • Cart: Slide-over right drawer (420px width) with backdrop blur.                      │
└────────────────────────────────────────────────────────────────────────────────────────┘
                                           │
                                           ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ DESKTOP & LARGE SCREENS (1024px – 1440px+)                                             │
│ • Header: Full editorial brand masthead + Center nav links + Search/Bag/WA utilities.  │
│ • Catalogue Grid: 4-column spacious grid with fine hairline 1px dividers.              │
│ • PDP Layout: Sticky product information column right / Large zoom gallery left.       │
│ • Cart: Elegant right drawer (460px width) with itemized thumbnails and subtotal.      │
│ • Max Container: Capped at 1360px with generous editorial margins (px-8 to px-16).    │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 11. SEO & SEARCH ENGINE INFORMATION ARCHITECTURE

* **Indexable Public Surfaces:**
  * `/` (Homepage — Priority 1.0)
  * `/collections` (Catalogue — Priority 0.9)
  * `/collections/[slug]` (Category Archives — Priority 0.8)
  * `/products/[slug]` (Product Detail Pages — Priority 0.9)
  * `/about` (Heritage — Priority 0.6)
  * `/contact` (Location & Store — Priority 0.7)
* **Explicitly Disallowed from Search Crawlers (`robots.txt`):**
  * `/admin/*`
  * `/cart`
  * `/api/*`
* **Canonical URL Rules:**
  * Clean, lowercase, trailing-slash agnostic URLs.
  * Every product page points to canonical `https://banwarilalclothhouse.com/products/[slug]`.
* **Structured Data Schema Embedding:**
  * `ClothingStore` Schema on root layout citing confirmed address (*Near Hanuman Mandir, Chilbila, Pratapgarh*), coordinates (`25.9557296, 82.0070317`), and 2003 founding year.
  * `Product` Schema on every PDP with title, images, category, and merchant organization.
  * `BreadcrumbList` on all category archives and product detail pages.

---

## 12. AUDIT & CONSISTENCY VERIFICATION

| Verification Item | Phase 01 / 02 / 03 Constraint | Phase 04 IA Compliance | Status |
| :--- | :--- | :--- | :---: |
| **Business Identity** | `BANWARILAL CLOTH HOUSE` (Exact casing) | Exact casing enforced across masthead, headers, and metadata. | **ALIGNED** |
| **Physical Location** | Near Hanuman Mandir, Chilbila, Pratapgarh | Prominently mapped in Contact, Footer, and Homepage location cards. | **ALIGNED** |
| **Zero-Payment Rule** | Absolutely no payment gateways or traditional checkout | Cart concludes solely at `Order on WhatsApp`. Zero checkout steps. | **ALIGNED** |
| **Absence State Handling** | No fake prices or fake specifications | Clean omission rules specified across all component definitions. | **ALIGNED** |
| **Component Reusability** | One flexible `ProductCard`, no redundant duplicates | Canonical `ProductCard` with `grid`, `compact`, and `featured` variants. | **ALIGNED** |
| **No Dead Ends** | Every major screen must provide a logical next action | Validated: 404, 500, empty search, and empty cart all feature 1-tap recovery CTAs. | **ALIGNED** |
| **Contradictions Found** | None permitted | Zero contradictions discovered between Phases 01, 02, 03, and 04. | **VERIFIED** |
