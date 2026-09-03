# BANWARILAL CLOTH HOUSE — CART SYSTEM SPECIFICATION

> **CANONICAL CART ARCHITECTURE SPECIFICATION — PHASE 12**  
> **Brand Entity:** BANWARILAL CLOTH HOUSE (Established 2003, Chilbila, Pratapgarh)  
> **Core Concept:** Product Selection & Direct WhatsApp Dispatch (Zero Online Payment)  
> **Status:** Authoritative Architectural Specification

---

## 1. CART ARCHITECTURAL OVERVIEW & PRINCIPLES

```
┌─────────────────────────────────────────────────────────────────────────┐
│                      ONE CART. ONE SOURCE OF TRUTH.                     │
│                                                                         │
│    [ Navbar Badge ]      [ Product Card ]      [ Product Detail Page ]  │
│           │                     │                        │              │
│           └─────────────────────┼────────────────────────┘              │
│                                 ▼                                       │
│                       CartContext / Hook                                │
│                                 │                                       │
│                    ┌────────────┴────────────┐                          │
│                    ▼                         ▼                          │
│          Authoritative Products      Browser Storage                    │
│             (data/products.ts)       (bch_cart_v2)                      │
│                    │                         │                          │
│                    └────────────┬────────────┘                          │
│                                 ▼                                       │
│                   Reconciled Cart State                                 │
│                                 │                                       │
│                    ┌────────────┴────────────┐                          │
│                    ▼                         ▼                          │
│           Authoritative Page            Convenience                     │
│                (/cart)                 Drawer Panel                     │
│                    │                                                    │
│                    ▼                                                    │
│         WhatsApp Order Compiler                                         │
│        (lib/whatsapp/generator.ts)                                      │
└─────────────────────────────────────────────────────────────────────────┘
```

### Core Invariants
1. **Single Source of Truth:** A single `CartContext` instance manages state across the entire application. Navbar badge, ProductCard, ProductDetailPage, CartDrawer, and `/cart` page consume the exact same reactive store.
2. **Minimal Stable Storage:** Browser `localStorage` only stores versioned product references (`productId` and `quantity`). It never stores mutable prices, large image arrays, or sensitive strings.
3. **Runtime Reconciliation:** On client initialization, stored product IDs are resolved against the active product catalog (`authoritativeProducts`). Stale, deactivated, or out-of-stock items are automatically purged, and the user is alerted.
4. **Strict Quantity Invariants:**
   * Minimum quantity = 1 (Integer).
   * Decrementing at quantity 1 keeps quantity at 1; `removeItem` must be used for full deletion.
   * Duplicate additions increment the quantity of the existing line item (never duplicate lines).
   * Maximum quantity capped at 10 per garment to prevent inventory abuse.

---

## 2. DATA MODELS

### Stored Cart (Browser Storage)
```typescript
interface StoredCartItem {
  productId: string;
  quantity: number;
}

interface StoredCart {
  version: number; // Currently version 1
  items: StoredCartItem[];
}
```

### Reconciled Cart Item (In-Memory Runtime)
```typescript
interface CartItem {
  productId: string;
  productName: string;
  productSlug: string;
  thumbnailUrl: string;
  categoryName?: string;
  price?: number; // Undefined for unpriced heirloom pieces
  quantity: number;
  isAvailable?: boolean;
}
```

---

## 3. REQUIRED FUNCTIONS & API

* `addItem(product: Product, quantity?: number)`: Appends new item or increments existing line up to 10.
* `removeItem(productId: string)`: Completely deletes the line item.
* `updateQuantity(productId: string, quantity: number)`: Updates quantity; removes if `<= 0`.
* `incrementQuantity(productId: string)`: Increments quantity up to 10.
* `decrementQuantity(productId: string)`: Decrements quantity down to minimum 1.
* `clearCart()`: Wipes all items.
* `isInCart(productId: string)`: Boolean check for product existence.
* `validateCartWithRegistry()`: Explicit reconciliation against active inventory.
* `totalItemCount`: Total units across all lines (e.g. 2 shirts + 1 saree = 3 items).
* `subtotal`: Estimated sum in INR, or `null` if any item is unpriced.

---

## 4. HYDRATION SAFETY & PERSISTENCE
* **SSR Hydration:** Cart initializes with an empty list on the server and loads stored items on client mount (`useEffect`), completely preventing SSR hydration mismatches.
* **Corrupted Storage Recovery:** Malformed JSON in `localStorage` is safely caught, cleared, and reset without crashing the application.
* **Legacy Migration:** Automatically detects and migrates legacy V1 unversioned storage arrays to the new `bch_cart_v2` schema.
* **Cross-Tab Sync:** Listens to window `storage` events to synchronize cart quantities across open tabs in real-time.

---

## 5. ACCESSIBILITY & MOBILE ERGONOMICS
* **Accessible Labels:** All quantity steppers feature explicit `aria-label` tags (`"Decrease quantity of [Product Name]"`).
* **Keyboard Navigation:** Full tab order, Enter/Space activation, and Escape close for slide-over drawer.
* **Mobile Viewports:** Responsive 2-column layout on desktop, clean single-column stack on mobile with large touch-friendly steppers (min 44px hit areas).
