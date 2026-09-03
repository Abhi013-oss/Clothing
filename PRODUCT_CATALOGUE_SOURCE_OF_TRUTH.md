# BANWARILAL CLOTH HOUSE — PRODUCT CATALOGUE SOURCE OF TRUTH

> **CANONICAL DATA GOVERNANCE & CONTENT ARCHITECTURE — PHASE 11**  
> **Brand Entity:** BANWARILAL CLOTH HOUSE (Established 2003, Chilbila, Pratapgarh)  
> **Governing Specifications:**  
> • [`PROJECT_SOURCE_OF_TRUTH.md`](./PROJECT_SOURCE_OF_TRUTH.md)  
> • [`TECHNICAL_REQUIREMENTS_DOCUMENT.md`](./TECHNICAL_REQUIREMENTS_DOCUMENT.md)  
> • [`PRODUCT_REQUIREMENTS_DOCUMENT.md`](./PRODUCT_REQUIREMENTS_DOCUMENT.md)  
> **Status:** Authoritative Architectural Standard for Product Content

---

## 1. CORE DATA INTEGRITY RULES (REAL DATA MANDATE)

1. **Zero Fictional Data:** No AI-generated fake product names, prices, discounts, fake fabric blends, fake customer reviews, or synthetic inventory counters are permitted.
2. **Absence State Discipline:** If a product's price, fabric, or color is unconfirmed, the field is left `undefined` / `null`. The frontend displays an approved absence state (e.g., `"Price on Request"`); it must never display `"N/A"`, `"—"`, or `₹0`.
3. **Decoupled Architecture:** Business metadata (store address, hours, phone, WhatsApp number) must **never** be copied into individual product records. Centralized configuration lives in `config/site.ts`.

---

## 2. PRODUCT ENTITY SCHEMA DEFINITION

| Field Name | Type | Required | Description & Constraints |
| :--- | :--- | :---: | :--- |
| `id` | `string` | **Yes** | Unique primary key (e.g. `prod-001` or UUID). |
| `name` | `string` | **Yes** | Canonical customer-facing garment title (min 3 chars). |
| `slug` | `string` | **Yes** | Lowercase, hyphen-delimited URL slug (`^[a-z0-9]+(?:-[a-z0-9]+)*$`). |
| `categoryId` | `string` | **Yes** | Foreign key linking to a valid record in `data/categories.ts`. |
| `categoryName` | `string` | No | Denormalized category title for fast read-rendering. |
| `categorySlug` | `string` | No | Denormalized category slug for instant routing. |
| `description` | `string` | **Yes** | Factual garment overview focusing on weave, cut, and occasion. |
| `price` | `number` | No | Numeric INR price. If absent, renders `"Price on Request"`. |
| `compareAtPrice`| `number` | No | Verified comparative original price. Strictly `compareAtPrice >= price`. |
| `specifications`| `object` | **Yes** | Structured garment attributes: `fabric`, `color`, `sizesAvailable`, `patternDetails`, `careInstructions`. |
| `availability` | `enum` | **Yes** | Strictly `'in_stock' \| 'out_of_stock' \| 'upon_request'`. |
| `featured` | `boolean` | **Yes** | Flag governing deterministic display on Homepage showcase. |
| `displayOrder` | `number` | **Yes** | Non-negative integer for editorial merchandising priority. |
| `images` | `ProductImage[]` | **Yes** | Array of image records containing `id`, `imageUrl`, `altText`, `displayOrder`, `isPrimary`. |
| `isActive` | `boolean` | **Yes** | Visibility state. Soft-deleted/archived items set `isActive: false`. |
| `createdAt` | `string` | **Yes** | ISO-8601 timestamp. |
| `updatedAt` | `string` | **Yes** | ISO-8601 timestamp. |

---

## 3. CATEGORY TAXONOMY & RELATIONSHIPS

All garments must strictly resolve to one of the 5 trade categories confirmed during Phase 01 discovery:

```
BANWARILAL CLOTH HOUSE CATEGORIES
  ├── Sarees (cat-sarees / "sarees")
  ├── Suits & Dress Material (cat-suits / "suits")
  ├── Readymade Garments (cat-readymade / "readymade")
  ├── Menswear & Essentials (cat-menswear / "menswear")
  └── Fabrics & Textiles (cat-fabrics / "fabrics")
```

---

## 4. PRODUCT LIFECYCLE & VISIBILITY STATE MACHINE

```
   [ NEW DATA ENTRY ] 
           │
           ▼
     (Draft State)
   • Incomplete data allowed
   • Hidden from public catalogue (/collections)
           │
           ▼ (Passes validateProduct())
    (Published State)
   • Active (isActive: true)
   • Displayed in catalogue & search
           │
     ┌─────┴─────────────────┐
     ▼                       ▼
(Soft-Archive)         (Out of Stock)
• isActive: false       • isActive: true
• Removed from UI       • availability: 'out_of_stock'
• Preserved in history  • Add to Bag disabled
```

---

## 5. IMAGE SYSTEM & STORAGE GOVERNANCE

1. **Aspect Ratio Enforcement:** All product photography must be framed in a vertical `3:4` aspect ratio to guarantee zero Cumulative Layout Shift (`CLS: 0.00`).
2. **Primary Image Mandate:** Every active product must have exactly one image with `isPrimary: true`.
3. **Alt Text Rules:** Every image must include descriptive alt text citing garment name and craft (e.g. *"Crimson Banarasi Katan Silk Saree with golden zari work"*).
4. **Storage Hierarchy (Supabase Bucket `product-images`):**
   ```
   product-images/
     ├── cat-sarees/
     │     └── prod-001/
     │           ├── primary.webp
     │           ├── border-detail.webp
     │           └── pallu-detail.webp
     └── cat-suits/
           └── prod-002/
                 └── primary.webp
   ```
