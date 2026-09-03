# BANWARILAL CLOTH HOUSE — DATABASE SCHEMA & RLS SPECIFICATION

> **CANONICAL DATABASE SPECIFICATION — PHASE 14**  
> **Database Engine:** PostgreSQL (Supabase Managed)  
> **Migration File:** `supabase/migrations/20260903000000_phase14_backend_schema.sql`  
> **Status:** Authoritative Database Standard

---

## 1. ENTITY-RELATIONSHIP DIAGRAM

```
┌─────────────────────────┐         ┌─────────────────────────┐
│       categories        │         │      admin_profiles     │
├─────────────────────────┤         ├─────────────────────────┤
│ id (PK, TEXT)           │         │ id (PK, UUID -> auth)   │
│ name (TEXT)             │         │ email (TEXT)            │
│ slug (TEXT, UNIQUE)     │         │ role (TEXT, 'admin')    │
│ description (TEXT)      │         │ created_at (TIMESTAMPTZ)│
│ image_url (TEXT)        │         └─────────────────────────┘
│ display_order (INT)     │
│ is_visible (BOOLEAN)    │         ┌─────────────────────────┐
│ created_at (TIMESTAMPTZ)│         │      site_settings      │
│ updated_at (TIMESTAMPTZ)│         ├─────────────────────────┤
└───────────┬─────────────┘         │ id (PK, TEXT 'primary') │
            │ 1                     │ business_name (TEXT)    │
            │                       │ established_year (INT)  │
            │ N (RESTRICT)          │ address (JSONB)         │
┌───────────▼─────────────┐         │ contact (JSONB)         │
│        products         │         │ hours (JSONB)           │
├─────────────────────────┤         │ created_at (TIMESTAMPTZ)│
│ id (PK, TEXT)           │         │ updated_at (TIMESTAMPTZ)│
│ name (TEXT)             │         └─────────────────────────┘
│ slug (TEXT, UNIQUE)     │
│ category_id (FK, TEXT)  │
│ description (TEXT)      │
│ price (NUMERIC 10,2)    │
│ compare_at_price (NUM)  │
│ fabric (TEXT)           │
│ color (TEXT)            │
│ sizes (TEXT[])          │
│ pattern_details (TEXT)  │
│ care_instructions (TEXT)│
│ availability (TEXT)     │
│ featured (BOOLEAN)      │
│ display_order (INT)     │
│ is_active (BOOLEAN)     │
│ created_at (TIMESTAMPTZ)│
│ updated_at (TIMESTAMPTZ)│
└───────────┬─────────────┘
            │ 1
            │
            │ N (CASCADE)
┌───────────▼─────────────┐
│     product_images      │
├─────────────────────────┤
│ id (PK, TEXT)           │
│ product_id (FK, TEXT)   │
│ image_url (TEXT)        │
│ alt_text (TEXT)         │
│ display_order (INT)     │
│ is_primary (BOOLEAN)    │
│ created_at (TIMESTAMPTZ)│
└─────────────────────────┘
```

---

## 2. TABLE SPECIFICATIONS

### `categories` Table
* `id` (`TEXT PRIMARY KEY`): Unique category identifier (e.g. `cat-sarees`).
* `name` (`TEXT NOT NULL`): Human-readable department name.
* `slug` (`TEXT NOT NULL UNIQUE`): Lowercase URL slug (e.g. `sarees`).
* `display_order` (`INTEGER NOT NULL DEFAULT 10`): Editorial sorting order.
* `is_visible` (`BOOLEAN NOT NULL DEFAULT true`): Public display toggle.

### `products` Table
* `id` (`TEXT PRIMARY KEY`): Unique garment identifier (e.g. `prod-001`).
* `name` (`TEXT NOT NULL`): Garment title (min 3 characters).
* `slug` (`TEXT NOT NULL UNIQUE`): Lowercase, URL-safe slug.
* `category_id` (`TEXT NOT NULL REFERENCES categories(id) ON DELETE RESTRICT`): Prevents deleting categories containing active garments.
* `price` (`NUMERIC(10,2)`): Verified INR price (null for unpriced heirloom pieces).
* `compare_at_price` (`NUMERIC(10,2)`): Must satisfy `compare_at_price >= price`.
* `availability` (`TEXT NOT NULL`): Checked against `('in_stock', 'out_of_stock', 'upon_request')`.
* `featured` (`BOOLEAN NOT NULL DEFAULT false`): Governs placement on homepage showcase.
* `is_active` (`BOOLEAN NOT NULL DEFAULT true`): Soft-archive toggle.

### `product_images` Table
* `id` (`TEXT PRIMARY KEY`): Unique media ID.
* `product_id` (`TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE`): Image records automatically clean up if parent garment is deleted.
* `image_url` (`TEXT NOT NULL`): Public URL to 3:4 portrait photo.
* `alt_text` (`TEXT NOT NULL`): Descriptive alt text detailing garment weave and cut.
* `is_primary` (`BOOLEAN NOT NULL DEFAULT false`): Marks the default catalogue card cover.

---

## 3. ROW LEVEL SECURITY (RLS) POLICIES

| Table | Operation | Role | Policy Condition |
| :--- | :---: | :---: | :--- |
| `categories` | `SELECT` | Public / Anon | `is_visible = true` |
| `categories` | `ALL` | Admin | `public.is_admin() OR auth.role() = 'service_role'` |
| `products` | `SELECT` | Public / Anon | `is_active = true` |
| `products` | `ALL` | Admin | `public.is_admin() OR auth.role() = 'service_role'` |
| `product_images` | `SELECT` | Public / Anon | `EXISTS (SELECT 1 FROM products WHERE products.id = product_images.product_id AND is_active = true)` |
| `product_images` | `ALL` | Admin | `public.is_admin() OR auth.role() = 'service_role'` |
| `site_settings` | `SELECT` | Public / Anon | `true` (Public store configuration) |
| `site_settings` | `ALL` | Admin | `public.is_admin() OR auth.role() = 'service_role'` |
| `admin_profiles` | `SELECT` | Authenticated | `auth.uid() = id OR public.is_admin()` |

---

## 4. STORAGE BUCKET CONFIGURATION (`product-images`)
* **Public Access Policy:** Anonymous users can perform `SELECT` (read/download) for all objects in `product-images`.
* **Admin Upload Policy:** Only verified admins (`public.is_admin()`) or the server service-role can execute `INSERT`, `UPDATE`, or `DELETE`.
