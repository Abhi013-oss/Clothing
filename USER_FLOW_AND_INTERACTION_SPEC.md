# BANWARILAL CLOTH HOUSE — COMPLETE USER FLOW, INTERACTION DESIGN & BEHAVIOR SPECIFICATION

> **CANONICAL INTERACTION BLUEPRINT — PHASE 05**  
> **Target Business:** BANWARILAL CLOTH HOUSE  
> **Document Version:** 1.0.0  
> **Governing Specifications:**  
> • [`PROJECT_SOURCE_OF_TRUTH.md`](./PROJECT_SOURCE_OF_TRUTH.md) (Phase 01)  
> • [`PRODUCT_REQUIREMENTS_DOCUMENT.md`](./PRODUCT_REQUIREMENTS_DOCUMENT.md) (Phase 02)  
> • [`TECHNICAL_REQUIREMENTS_DOCUMENT.md`](./TECHNICAL_REQUIREMENTS_DOCUMENT.md) (Phase 03)  
> • [`INFORMATION_ARCHITECTURE.md`](./INFORMATION_ARCHITECTURE.md) (Phase 04)  
> **Status:** Approved Behavioral Blueprint for Visual Design & UI System (Phase 06)

---

## 1. PRIMARY USER JOURNEY (DISCOVER → EXPLORE → SELECT → CONTACT)

The core customer experience is designed around a single guiding principle: **Frictionless Discovery to Personal Merchant Dialogue**.

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│ 1. DISCOVER  │ ──► │  2. EXPLORE  │ ──► │  3. SELECT   │ ──► │  4. REVIEW   │ ──► │  5. CONTACT  │
│  Land on     │     │ Browse Grid  │     │ Add to Bag   │     │ Open Bag     │     │ WhatsApp     │
│  Homepage or │     │ Search,      │     │ Inspect PDP  │     │ Drawer &     │     │ Structured   │
│  Collections │     │ Filters      │     │ Details      │     │ Quantities   │     │ Inquiry      │
└──────────────┘     └──────────────┘     └──────────────┘     └──────────────┘     └──────────────┘
```

* **Trigger:** Customer lands on Homepage (`/`) or directly on Catalogue (`/collections`).
* **User Action:** Explores editorial hero, filters by category (e.g., "Sarees"), or searches for a garment.
* **System Response:** Instantly renders high-clarity 3:4 cards with zero layout shift; debounced search filters in `< 15ms`.
* **Next Action:** Taps garment to open PDP (`/products/[slug]`), clicks `Add to Cart`, reviews session bag, and taps `Order on WhatsApp`.

---

## 2. SECONDARY JOURNEYS

### 2.1 Single-Product Express WhatsApp Inquiry
* **Trigger:** Customer discovers a specific high-ticket piece (e.g., bridal saree) on `/products/[slug]` and wants immediate consultation.
* **User Action:** Clicks `Order on WhatsApp` directly on the Product Detail Page.
* **System Response:** Bypasses the shopping bag; formats a single-product URL-encoded string citing the exact garment name and canonical URL.
* **Next Action:** Native WhatsApp opens; customer sends inquiry with 1 tap.

### 2.2 Local Store Visit & Directions Flow
* **Trigger:** Customer on Homepage, Contact page, or Footer wants to visit the physical store.
* **User Action:** Clicks `Get Directions` on the Store Location Card.
* **System Response:** Deep-links directly to Google Maps targeting canonical coordinates (`25.9557296, 82.0070317`) with destination *Near Hanuman Mandir, New Bazaar, Chilbila, Pratapgarh*.
* **Next Action:** Native Google Maps app launches turn-by-turn navigation.

### 2.3 Direct Phone Consultation Flow
* **Trigger:** Customer prefers speaking with the merchant directly.
* **User Action:** Taps `Call Store` on Contact page or mobile drawer.
* **System Response:** Triggers native OS telephone dialer (`tel:[PHONE_NUMBER]`).
* **Next Action:** Phone call initiates without copying/pasting numbers.

---

## 3. HOMEPAGE INTERACTIONS

### 3.1 First Visit & Zero Friction
* **No Intrusive Gates:** Zero login prompts, zero newsletter popups, zero geolocation permission requests, zero app install banners.
* **Immediate Comprehension:** Within 2 seconds, the visitor absorbs:
  * Brand: `BANWARILAL CLOTH HOUSE` (Established 2003)
  * Identity: Heritage Clothing & Readymade Garment Retailer
  * Action: `Explore Collection` (Dark Charcoal primary button) or `Enquire on WhatsApp` (Secondary gold/emerald action).

### 3.2 Hero Section Behavior
* **Primary Button (`Explore Collection`):**
  * Hover: Smooth upward micro-elevation (`translateY(-2px)`) with subtle shadow deepening.
  * Click: Instant client-side transition to `/collections`.
* **Secondary Button (`Enquire on WhatsApp`):**
  * Hover: Muted champagne focus ring with soft emerald background highlight.
  * Click: Opens WhatsApp with business-level inquiry (*"Hello BANWARILAL CLOTH HOUSE, I am visiting your digital showroom and would like to inquire about your collections."*).
  * *Missing Number Safeguard:* If unconfigured, displays a friendly modal advising the customer to call or visit in person.

---

## 4. CATALOGUE INTERACTIONS

* **Category Selection Tabs:**
  * Clicking an active category pill (e.g., "Suits & Dress Material") highlights the pill (`bg-ink text-canvas`), updates the product grid instantly, and appends `?category=suits` to the URL for shareability without full page reload.
  * Clicking `All` resets category filtering.
* **Active Result Counter:** Dynamically updates (*"Showing 24 garments"*).

---

## 5. SEARCH BEHAVIOR & INTERACTION

* **Input Trigger:** Clicking search input or typing activates debounced search (`150ms`).
* **Execution:** Searches case-insensitively against `name`, `fabric`, and `categoryName`.
* **Clear Action:** A circular `✕` icon appears when input has text; clicking it clears query instantly and restores focus.
* **Zero Results Behavior:**
  * System renders clean empty state: *"No garments found matching '[query]'"*.
  * Provides two actionable buttons: `Clear Search` (resets input) and `Browse All Garments` (resets filters).

---

## 6. FILTER BEHAVIOR

* **Desktop Controls:** Compact horizontal filter pill bar for instant 1-click toggling.
* **Mobile Controls:**
  * Compact `Filters` button displaying active filter count badge (e.g., `Filters (2)`).
  * Clicking opens an accessible bottom sheet drawer.
  * Customer toggles filters and taps `Apply Filters` (closes sheet and scrolls smoothly to top of grid).
  * `Reset All` button restores full catalogue.
* **Strict Attribute Truth:** Only attributes actually present in the dataset appear as filter options.

---

## 7. SORTING BEHAVIOR

* **Trigger:** Dropdown selector with options: `Featured`, `Newest`, `Price: Low to High`, `Price: High to Low`, `Name: A-Z`.
* **State Preservation:** Changing sort order preserves any active search query and category filter.
* **Deterministic Fallback:** Unpriced products ("Price on Request") always sort to the end of price-based sorts to prevent awkward sorting gaps.

---

## 8. PRODUCT-CARD BEHAVIOR

* **Visual Architecture (Standardized 3:4 Aspect Ratio):**
  ```
  ┌─────────────────────────┐
  │                         │
  │   3:4 High-Resolution   │  ◄── Hover: Gentle 1.035 zoom inside overflow:hidden
  │   Garment Photography   │
  │                         │
  ├─────────────────────────┤
  │ Category Pill           │
  │ Garment Title (Medium)  │
  │ Price or "On Request"   │
  │ [ Quick Add to Bag ]    │  ◄── Secondary hover/mobile action
  └─────────────────────────┘
  ```
* **Click Targets:**
  * Clicking the image or garment title navigates directly to `/products/[slug]`.
  * Clicking `Add to Bag` adds item to the session cart without navigating away.
* **Desktop Hover:** Card elevates by `-4px` with diffused ambient shadow (`0 12px 28px -6px rgba(24, 24, 27, 0.08)`).
* **Mobile Touch:** Card remains fully interactive with touch ripple; no hover dependency.

---

## 9. PRODUCT-PAGE (PDP) BEHAVIOR

* **Gallery Interaction:**
  * Desktop: Hovering over the main preview activates smooth lens zoom; clicking thumbnail switches active preview instantly.
  * Mobile: Horizontal touch swipe with subtle dot pagination.
* **Specification Table:**
  * Clean two-column table (Fabric, Color, Dimensions, Care). Missing attributes are strictly omitted; never displays `"N/A"` or blank rows.
* **Availability Pill:**
  * In Stock: Soft muted green badge (`#15803D`).
  * Out of Stock: Warm taupe badge (`#716E68`); `Add to Cart` disabled; `Order on WhatsApp` switches text to `Enquire for Restock`.

---

## 10. ADD-TO-CART BEHAVIOR & FEEDBACK

* **Validation:** Validates product availability and presence.
* **State Update:** Appends item to `localStorage` state with initial `quantity: 1`.
* **Duplicate Addition:** If item is already in bag, increments quantity by 1 (capped at 10).
* **Feedback Mechanism (Non-Intrusive):**
  * The button label changes briefly from `Add to Bag` to `✓ Added to Bag` (duration: 1.5 seconds) with a soft tactile checkmark.
  * The header bag counter badge increments smoothly with a subtle pulse animation (`scale(1.15)` returning to `scale(1)`).
  * A non-blocking toast notification slides into view: *"Added [Garment Name] to your bag"* with an action button `View Bag`.

---

## 11. CART BEHAVIOR & SPECIFICATION

* **Cart Representation (Modal Drawer):**
  * Slides out from right edge (Desktop: 460px width; Mobile: full-width sheet).
  * Backdrop overlay (`rgba(24, 24, 27, 0.4)`) with backdrop blur (`blur-sm`).
  * Traps focus for keyboard users; dismissible via `Escape` key, backdrop click, or `✕` close button.
* **Cart Indicator Decision (Canonical):**
  * **Decision:** The header cart badge displays the **TOTAL ITEM QUANTITY** (e.g., 2 shirts + 1 saree = badge shows `3`).
  * **Rationale:** In fabric and apparel curation, shoppers need immediate visibility into the total volume of garments they are submitting to the merchant.
* **Order Flow Discipline:** The cart contains **ZERO** payment buttons. The single dominant action button is:  
  `ORDER ON WHATSAPP` (Emerald Green `#25D366`).

---

## 12. CART QUANTITY CONTROLS

* **Increment (`+`):** Increments quantity by 1 up to maximum `10`. At 10, the button disables safely with an explanatory tooltip (*"Maximum 10 units per item for catalogue inquiry"*).
* **Decrement (`−`) Behavior Decision (Canonical):**
  * **Decision:** When quantity is `1`, the minus (`−`) button **remains disabled**.
  * **Rationale:** Prevents accidental deletion when a user is simply trying to set quantity to 1. To remove an item, the user must explicitly click the dedicated trash/remove icon.

---

## 13. REMOVE PRODUCT BEHAVIOR

* **Trigger:** Clicking the trash icon (`Remove`) on any item row.
* **Execution:**
  * Row fades out and collapses smoothly (`200ms ease-out`).
  * Cart state updates, `localStorage` serializes, and the total badge counter decrements.
  * If the cart becomes empty, transitions immediately to the Empty Cart State.

---

## 14. CLEAR CART INTERACTION

* **Trigger:** Clicking `Clear Bag` link in drawer header.
* **Confirmation Dialogue:** Displays inline confirmation to prevent accidental loss:  
  *"Clear all items from your bag? [Cancel] [Clear Bag]"*.
* **Execution:** On confirm, resets array to `[]` and displays the Empty Cart view.

---

## 15. CART PERSISTENCE & CROSS-TAB SYNCHRONIZATION

* **Storage Engine:** Browser `localStorage` keyed under `bch_cart_items_v1`.
* **Resilience:** If data is corrupted, catches parsing exception, resets safely to `[]`, and prevents UI crashes.
* **Multi-Tab Synchronization:** Listens to `window.addEventListener('storage', ...)`:
  * If the user adds an item in Tab A, Tab B updates its badge counter and drawer state automatically without a page reload.

---

## 16. SINGLE-PRODUCT WHATSAPP FLOW

```
[ PDP: /products/royal-crimson-saree ]
                  │
                  ▼
[ Tap: "Order on WhatsApp" ]
                  │
                  ▼
[ System verifies product & reads SITE_CONFIG.whatsappNumber ]
                  │
                  ▼
[ Compiles URL: https://wa.me/91XXXXXXXXXX?text=... ]
                  │
                  ▼
[ Pre-Filled Message Content: ]
  "Hello BANWARILAL CLOTH HOUSE,

   I am interested in this garment from your digital catalogue:
   • Product: Royal Crimson Saree
   • Link: https://banwarilalclothhouse.com/products/royal-crimson-saree

   Please confirm availability, price, and further details.
   Thank you!"
                  │
                  ▼
[ Native WhatsApp or WhatsApp Web Launches ]
```

---

## 17. MULTI-PRODUCT WHATSAPP FLOW

```
[ Cart Drawer with 3 Garments ]
                  │
                  ▼
[ Tap: "Order on WhatsApp" ]
                  │
                  ▼
[ System validates items & applies configured mode: 'names_only' or 'names_and_qty' ]
                  │
                  ▼
[ Pre-Filled Message Content (Configured Mode: Names + Quantities): ]
  "Hello BANWARILAL CLOTH HOUSE,

   I am interested in ordering/inquiring about these items from your digital catalogue:

   1. Banarasi Silk Saree (Qty: 2)
   2. Chanderi Cotton Suit (Qty: 1)
   3. Embroidered Kurti Set (Qty: 3)

   Please confirm availability, sizing, and details.
   Thank you!"
                  │
                  ▼
[ Native WhatsApp Launches Target: 91XXXXXXXXXX ]
```

---

## 18. WHATSAPP MESSAGE SANITIZATION RULES

Before generating the final URL:
1. Every product name is trimmed and sanitized against code injection.
2. If a product title is unexpectedly blank, substitutes `"Catalogue Garment"`.
3. **Strictly Prohibited Strings:** The compiler asserts that the message does not contain `"undefined"`, `"null"`, `"[object Object]"`, database primary keys/UUIDs, or debug traces.
4. Payload is encoded via `encodeURIComponent()`, preserving clean newlines (`%0A`) across WhatsApp Web, iOS, and Android.

---

## 19. STORE LOCATION & CONTACT INTERACTIONS

* **`Get Directions` Trigger:**
  * Opens URL: `https://www.google.com/maps/dir/?api=1&destination=25.9557296,82.0070317`
  * Automatically routes mobile users into the native Google Maps app.
* **`Call Store` Trigger:**
  * Launches `tel:[PHONE_NUMBER]`.
* **Operating Hours Card:**
  * Displays confirmed store hours; if pending confirmation, displays: *"Open Daily in Chilbila Bazaar • Call for exact festival timings"*.

---

## 20. MOBILE NAVIGATION & TOUCH INTERACTIONS

* **Touch Ergonomics:**
  * All tap targets are minimum `44px × 44px`.
  * The hamburger menu trigger is anchored top-right; the mobile cart badge is positioned adjacent for easy one-handed thumb reach.
* **Off-Canvas Drawer:**
  * Swipes smoothly into view from the right (`300ms cubic-bezier(0.16, 1, 0.3, 1)`).
  * Clicking any link automatically closes the drawer and executes smooth page transition.
  * Tapping the backdrop or pressing Android back button dismisses the drawer cleanly.

---

## 21. 3D & MOTION INTERACTION BEHAVIOR

* **Micro-Depth Strategy:** Pure CSS implementation; zero WebGL scripts.
* **Product Card Elevation:**
  * `transition: transform 300ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 300ms;`
  * Hover: `transform: translateY(-4px);`
* **Image Aperture Effect:**
  * Hover: `transform: scale(1.035);` within masked container.
* **Reduced Motion Compliance:** Under `@media (prefers-reduced-motion: reduce)`, transforms are flattened (`transform: none`) and transitions are set to `0ms`.

---

## 22. ACCESSIBILITY INTERACTIONS (WCAG 2.1 AA)

* **Keyboard Navigation Sequence:** Logical tab sequence across Header → Main Content → Footer.
* **Visible Focus Indicator:** `focus-visible:ring-2 focus-visible:ring-[#C5A880] focus-visible:ring-offset-2`.
* **Screen Reader Feedback:**
  * Cart badge wrapped in `<span aria-live="polite">` announcing additions.
  * All icon-only triggers (Search, Close, Menu, Bag) feature explicit `aria-label` attributes.
  * Modals trap keyboard focus and return focus to triggering element upon closure.

---

## 23. LOADING STATES & SKELETON SPECIFICATION

* **Visual Architecture:** Lightweight CSS skeleton placeholders matching exact `3:4` vertical proportions with soft shimmer (`linear-gradient` animation across `#EFECE6` and `#FAF8F5`).
* **Zero Layout Shift:** Content loads directly into pre-allocated bounding boxes (`CLS: 0.00`).

---

## 24. ERROR STATES & GRACEFUL RECOVERY

| Error Scenario | Visual Treatment | Immediate User Action |
| :--- | :--- | :--- |
| **Garment Not Found (404)** | Editorial error card: *"This garment is no longer in our digital showcase."* | Button: `Explore Collections` (Returns to `/collections`). |
| **Server / DB Offline (500)** | Reassuring notice: *"Our digital showcase is updating. Please call our Chilbila store directly."* | 1-Tap button: `Call Store Directly`. |
| **Image Asset Broken** | Graceful warm taupe placeholder SVG with fine fabric silhouette; zero broken image icons. | Product details, title, and WhatsApp ordering remain fully functional. |
| **WhatsApp Number Unset** | Friendly modal: *"WhatsApp ordering is updating. Please call us or visit our store Near Hanuman Mandir."* | 1-Tap button: `Call Store`. |

---

## 25. EMPTY STATES & USER RECOVERY

| Empty State | Visual Content | Recovery Action |
| :--- | :--- | :--- |
| **Empty Shopping Bag** | Warm taupe shopping bag line graphic with message: *"Your shopping bag is empty."* | Button: `Explore Collections` (Navigates to `/collections`). |
| **Search Yields 0 Results** | Graphic with message: *"No garments found matching '[query]'"*. | Button: `Clear Search` (Restores full catalogue view). |
| **Empty Category** | Message: *"New arrivals for this collection are coming soon."* | Button: `View All Collections`. |

---

## 26. ADMIN USER FLOW & INTERACTION SPECIFICATION

```
[ /admin/login ] ──► [ Authenticate via Supabase GoTrue ]
                             │
                             ▼
[ /admin/products ] ──► [ View Catalogue Table ]
                             │
         ┌───────────────────┴───────────────────┐
         ▼                                       ▼
[ Create New Garment ]                  [ Edit Existing Garment ]
  • Title & Auto-Slug                     • Modify Price / Fabric
  • Category Assignment                   • Toggle 'in_stock' / 'out_of_stock'
  • Upload 3:4 Images                     • Reorder Image Gallery
  • Absence-Tolerant Specs                • Toggle 'featured' / 'is_active'
  • Save ──► Edge Cache Revalidates       • Save ──► Real-Time Catalogue Update
```

---

## 27. SECURITY INTERACTION RULES

* **XSS Neutralization:** All search query reflections and dynamic inputs are sanitized and escaped before DOM rendering.
* **No Client DB Writes:** Public catalogue interactions (adding to cart, searching, filtering) execute 100% in client memory; zero anonymous write requests are dispatched to Supabase.
* **External Link Hardening:** All outbound triggers (Google Maps, WhatsApp, Social) enforce `rel="noopener noreferrer"` and `target="_blank"`.

---

## 28. USER-FLOW DIAGRAMS

### FLOW A — SINGLE PRODUCT EXPRESS INQUIRY
```
Home ──► Collections ──► Product (PDP) ──► Order on WhatsApp ──► Native WhatsApp Opens
```

### FLOW B — MULTI-PRODUCT BAG CURATION & DISPATCH
```
Home ──► Catalogue ──► Product A ──► Add to Bag ──► Continue Shopping ──►
Product B ──► Add to Bag ──► Open Bag Drawer ──► Review & Quantities ──►
Order on WhatsApp ──► Native WhatsApp Opens with Pre-Filled Multi-Item List
```

### FLOW C — STORE VISIT & DIRECTIONS
```
Any Page ──► Store Location Block ──► Tap "Get Directions" ──►
Google Maps App Opens Targeting Lat: 25.9557296, Long: 82.0070317
```

### FLOW D — SEARCH & FILTER
```
Catalogue ──► Type "Silk" ──► Grid Updates (< 15ms) ──► Filter "In Stock" ──►
Click Garment ──► PDP
```

---

## 29. INTERACTION ACCEPTANCE TESTS (GHERKIN SPECIFICATIONS)

### TEST 1: Add to Cart & Counter Badge
* **Given** the customer's cart is empty (badge displays `0` or is hidden),
* **When** the customer clicks `Add to Bag` on `"Banarasi Katan Silk Saree"`,
* **Then** the button temporarily displays `✓ Added to Bag`, the header badge updates to `1`, a toast notification appears, and the item persists in `localStorage`.

### TEST 2: Multi-Item WhatsApp Payload Generation
* **Given** the cart contains `"Banarasi Saree"` (Qty: 2) and `"Cotton Suit"` (Qty: 1),
* **When** the customer clicks `Order on WhatsApp`,
* **Then** WhatsApp launches with a pre-filled message itemizing both products with correct quantities, containing zero technical IDs, and URL-encoded properly.

### TEST 3: Minimum Quantity Invariant
* **Given** an item in the cart has `quantity: 1`,
* **When** the customer inspects the item row,
* **Then** the minus (`−`) button is disabled, preventing accidental deletion. Clicking the trash icon removes the item intentionally.

### TEST 4: Empty Cart Protection
* **Given** the cart has 0 items,
* **When** the customer opens the cart drawer,
* **Then** the `Order on WhatsApp` button is not displayed, and an `Explore Collection` button is presented.

---

## 30. EDGE CASE MATRIX

| Edge Scenario | Required System Interaction |
| :--- | :--- |
| **Duplicate Item Added** | Increments quantity (max 10); toast confirms: *"Updated quantity to [N]"*. Does not duplicate cart lines. |
| **Item Removed Before WA** | Deletes row; recalculates subtotal; updates badge; regenerates clean message payload. |
| **Product Becomes Archived** | Stale item flagged in cart drawer: *"Item no longer available"* with 1-click remove button. |
| **Zero Price Provided** | Displays `"Price on Request"`; WhatsApp inquiry explicitly asks merchant for pricing confirmation. |
| **Single Image Product** | Main gallery displays image cleanly; thumbnail selector bar gracefully hides. |
| **Corrupted Local Storage** | Catches parsing error; resets to empty array `[]`; renders empty cart view without throwing uncaught runtime errors. |
| **Slow 4G Network** | Pre-allocated 3:4 skeletons prevent layout shifts; buttons remain interactive without blocking main thread. |
| **Double Tap on Mobile** | Debounced click handlers prevent accidental multi-submissions. |

---

## 31. UX QUALITY CHECKLIST

* [x] **Clarity:** First-time visitor understands who BANWARILAL CLOTH HOUSE is within 3 seconds.
* [x] **Frictionless:** Zero checkout steps, zero account creation gates, zero payment friction.
* [x] **Feedback:** Every button click (Add to Bag, WhatsApp, Filter, Search) provides immediate visual confirmation.
* [x] **Recovery:** 404, 500, empty search, and empty cart provide 1-tap recovery back to the catalogue.
* [x] **Mobile Ergonomics:** 44px minimum touch targets, comfortable one-thumb reach for all core actions.
* [x] **Accessibility:** Full keyboard traversal, visible focus rings (`#C5A880`), screen reader `aria-live` announcements.
* [x] **Integrity:** Zero fake reviews, zero fake countdown timers, zero manufactured scarcity claims.
