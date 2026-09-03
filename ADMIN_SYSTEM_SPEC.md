# BANWARILAL CLOTH HOUSE — ADMIN SYSTEM SPECIFICATION

> **CANONICAL ADMIN & STORE MANAGEMENT SPECIFICATION — PHASE 14**  
> **Brand Entity:** BANWARILAL CLOTH HOUSE (Established 2003, Chilbila, Pratapgarh)  
> **Scope:** Merchant Console, Authentication, Catalogue Merchandising, and Operational Controls  
> **Status:** Authoritative Functional Specification

---

## 1. AUTHENTICATION & ACCESS CONTROL
* **Authentication Engine:** Supabase Auth (`supabase.auth.signInWithPassword`).
* **Route Protection:** Next.js Edge Middleware (`middleware.ts`) intercepts all `/admin/*` paths. Unauthenticated requests are redirected to `/admin/login`.
* **Permanent No-Registration Policy:** Public user account creation is disabled. Administrative access is restricted to accounts provisioned by the store owner.
* **Session Lifecycle:** Managed securely via HTTP cookies (`@supabase/ssr`). Logout immediately invalidates session tokens.

---

## 2. ADMIN ROUTE SYSTEM

| Route | View Component | Functionality |
| :--- | :--- | :--- |
| `/admin/login` | `AdminLoginPage` | Email/password login with rate limiting & error suppression. |
| `/admin` | `AdminDashboardPage` | Real-time overview cards (active products, featured pieces, departments, unpriced inquiry garments). |
| `/admin/products` | `AdminProductsPage` | Searchable, category-filterable catalogue table with status badges and quick links. |
| `/admin/products/new` | `NewProductPage` | Form for entering new garments with client-side validation. |
| `/admin/products/[id]` | `EditProductPage` | Merchandising editor for existing garments, prices, and imagery. |
| `/admin/categories` | `AdminCategoriesPage` | Department taxonomy manager with deletion protection. |
| `/admin/settings` | `AdminSettingsPage` | Store hours, Chilbila physical coordinates, and official WhatsApp ordering number. |

---

## 3. PRODUCT & MERCHANDISING CONTROLS
1. **Garment Identity:** Product name, URL-safe slug generation, trade department assignment, and factual description.
2. **Pricing Controls:** Verified INR price (optional, displaying *"Price on Request"* when null), optional original compare-at strikethrough.
3. **Specifications:** Structured inputs for `fabric`, `color`, `sizesAvailable` (comma-separated list), `patternDetails`, and `careInstructions`.
4. **Availability State Machine:**
   * `in_stock`: Normal ordering allowed via WhatsApp and in-store.
   * `upon_request`: Custom, heirloom, or bespoke pieces.
   * `out_of_stock`: Automatically disables `Add to Bag` and purges from cart message payloads.
5. **Visibility Controls:** `is_active: true` publishes the garment; unchecking archives the product from the public digital showroom without destroying historical references.

---

## 4. ERROR STATES & FEEDBACK
* **Validation Errors:** Clear inline alerts explaining field requirements (e.g. *"Compare-at price cannot be less than the selling price"*).
* **Referential Integrity Alerts:** Deleting a category with active garments is explicitly blocked with a user-friendly instruction to reassign garments first.
