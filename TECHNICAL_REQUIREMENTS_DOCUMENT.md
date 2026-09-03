# BANWARILAL CLOTH HOUSE — TECHNICAL REQUIREMENTS DOCUMENT (TRD) & SYSTEM ARCHITECTURE

> **CANONICAL TECHNICAL SPECIFICATION — PHASE 03**  
> **Target Business:** BANWARILAL CLOTH HOUSE  
> **Document Version:** 1.0.0  
> **Governing Specifications:**  
> • [`PROJECT_SOURCE_OF_TRUTH.md`](./PROJECT_SOURCE_OF_TRUTH.md) (Phase 01)  
> • [`PRODUCT_REQUIREMENTS_DOCUMENT.md`](./PRODUCT_REQUIREMENTS_DOCUMENT.md) (Phase 02)  
> **Status:** Authoritative Architectural Blueprint for Implementation (Phase 04+)

---

## 1. TECHNOLOGY STACK

| Tier / Domain | Technology Choice | Exact Version / Spec | Technical Rationale & Boundaries |
| :--- | :--- | :--- | :--- |
| **Framework** | **Next.js** | Next.js 14+ (App Router) | Native Server Components (RSC) for zero-client-JS catalogue pages, high-speed SSR, dynamic Open Graph generation, edge rendering, and built-in image optimization. |
| **Language** | **TypeScript** | TypeScript 5.x (Strict Mode) | End-to-end type safety across database entities, cart items, WhatsApp payloads, and component props. `noImplicitAny: true`. |
| **Styling** | **Tailwind CSS** | Tailwind CSS 3.4+ / 4.x | Utility-first architecture with custom design tokens for the fashion brand palette. Zero runtime CSS overhead. PostCSS purging. |
| **Icons** | **Lucide React** | `lucide-react` | Ultra-lightweight, tree-shakeable SVG icons matching the fine-line editorial aesthetic. |
| **Database** | **Supabase (PostgreSQL)** | PostgreSQL 15+ via Supabase | Managed PostgreSQL with Row Level Security (RLS), ACID compliance, relational foreign keys, GIN indexing for text search, and REST/GraphQL interface. |
| **Authentication** | **Supabase Auth** | Supabase GoTrue Auth | Protected administrative access only. Public browsing has zero auth requirement. Session cookies handled securely via `@supabase/ssr`. |
| **File Storage** | **Supabase Storage** | S3-compatible Buckets | Public bucket `product-media` with CDN caching and strict upload size/type constraints for admin uploads. |
| **State Management** | **React Context + Hooks** | Native React 18+ | Client-side cart state with synchronized `localStorage` persistence. Zero heavyweight dependencies (no Redux, Zustand, or MobX needed). |
| **Form & Schema** | **Zod** | `zod` 3.x | Runtime validation for admin mutations, WhatsApp URL compilation, and product data integrity checks. |
| **Deployment** | **Vercel** | Vercel Edge / Node Runtime | Optimal Next.js hosting, automated preview deployments, edge caching, and automated HTTPS certificate management. |

---

## 2. SYSTEM ARCHITECTURE

The platform operates on a **decoupled, server-first architecture** where public catalogue browsing leverages Next.js React Server Components (RSC) for maximum speed and SEO, while the customer shopping bag and WhatsApp dispatcher operate entirely client-side without database writes.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                   CLIENT LAYER (BROWSER)                               │
│                                                                                        │
│  ┌───────────────────────────────┐                  ┌───────────────────────────────┐  │
│  │   Public Customer Surfaces    │                  │  Client Interactive Elements  │  │
│  │   - Homepage (RSC)            │                  │  - Client Search & Filter     │  │
│  │   - /collections (RSC)        │                  │  - Cart Drawer & State        │  │
│  │   - /products/[slug] (RSC)    │                  │  - Image Gallery Zoom         │  │
│  │   - /about & /contact (RSC)   │                  │  - LocalStorage Persister     │  │
│  └───────────────────────────────┘                  └───────────────────────────────┘  │
│                                                                      │                 │
│                                                                      ▼                 │
│                                                     ┌───────────────────────────────┐  │
│                                                     │   WhatsApp Message Builder    │  │
│                                                     │   - URL Sanitizer & Encoder   │  │
│                                                     │   - Dynamic Cart Formatter    │  │
│                                                     └───────────────────────────────┘  │
│                                                                      │                 │
└──────────────────────────────────────────────────────────────────────┼─────────────────┘
                                                                       │ Launches Native WA
                                                                       ▼ or WhatsApp Web
                                                     ┌─────────────────────────────────┐
                                                     │     MERCHANT WHATSAPP APP       │
                                                     │  (Personal Retail Consultation  │
                                                     │   & In-Store/Local Dispatch)    │
                                                     └─────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────────────────┐
│                              NEXT.JS APPLICATION SERVER LAYER                          │
│                                                                                        │
│  ┌───────────────────────────────┐                  ┌───────────────────────────────┐  │
│  │    Server Component Hydration │                  │  Server Actions / Admin API   │  │
│  │    - Metadata & OpenGraph Gen │                  │  - Product Mutations          │  │
│  │    - ISR / Stale-While-Reval  │                  │  - Category Mutations         │  │
│  │    - Next/Image Optimization  │                  │  - Media Upload Processing    │  │
│  └───────────────────────────────┘                  └───────────────────────────────┘  │
│                 │                                                   │                  │
│                 ▼                                                   ▼                  │
│  ┌──────────────────────────────────────────────────────────────────────────────────┐  │
│  │                       Data Access Layer (DAL) / Supabase SDK                     │  │
│  │    - Supabase Anon Client (Public Read with RLS enforcement)                     │  │
│  │    - Supabase Server Client (Admin Session Token verification)                   │  │
│  └──────────────────────────────────────────────────────────────────────────────────┘  │
└───────────────────────────────────────────┬────────────────────────────────────────────┘
                                            │ Secure SSL / TLS
                                            ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                             SUPABASE MANAGED BACKEND (POSTGRESQL)                      │
│                                                                                        │
│  ┌───────────────────────────────┐                  ┌───────────────────────────────┐  │
│  │    PostgreSQL Relational DB   │                  │   Supabase Storage Buckets    │  │
│  │    - products                 │                  │   - product-media (Public)    │  │
│  │    - categories               │                  │   - site-assets (Public)      │  │
│  │    - product_images           │                  │                               │  │
│  │    - site_settings            │                  │                               │  │
│  └───────────────────────────────┘                  └───────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────────────────────────────────┐  │
│  │                         Row Level Security (RLS) Engine                          │  │
│  │    - Public: SELECT WHERE is_active = true                                       │  │
│  │    - Admin: ALL (Authenticated Admin Role Only)                                  │  │
│  └──────────────────────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. FRONTEND ARCHITECTURE

### 3.1 Server vs. Client Component Boundary
To guarantee sub-second Time to First Byte (TTFB) and high Core Web Vitals, components are split intentionally:
* **Server Components (Default):**
  * `app/page.tsx` (Homepage layout, hero markup, static story, location card)
  * `app/collections/page.tsx` (Catalogue shell, SEO tags, server-fetched initial products)
  * `app/collections/[slug]/page.tsx` (Category archives, metadata generation)
  * `app/products/[slug]/page.tsx` (Product detail presentation, JSON-LD Schema injection)
  * `app/about/page.tsx` & `app/contact/page.tsx` (Static editorial content)
* **Client Components (`'use client'`):**
  * `components/cart/CartDrawer.tsx` & `CartProvider.tsx` (Interactive state & `localStorage`)
  * `components/catalogue/CatalogueBrowser.tsx` (Client-side search debouncing & instant pill filtering)
  * `components/product/ProductGallery.tsx` (Active thumbnail switcher & hover lens zoom)
  * `components/whatsapp/WhatsAppOrderButton.tsx` (Dynamic payload compiler and window opener)
  * `components/navigation/MobileMenuDrawer.tsx` (Touch slide-in navigation)

### 3.2 Design System Tokens & Tailwind Integration
Configured in `tailwind.config.ts` reflecting the exact Phase 01 palette:
```typescript
// tailwind.config.ts (Excerpt)
export default {
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: '#FAF8F5', // Canvas Ivory (70–80% background)
          pure: '#FFFFFF',    // Studio White (Surfaces/cards)
          muted: '#EFECE6',   // Linen Beige (Secondary sections/pills)
        },
        ink: {
          DEFAULT: '#18181B', // Deep Charcoal (15–20% text & high-contrast CTAs)
          secondary: '#716E68', // Warm Taupe (Metadata, borders, secondary text)
          border: '#E5E0D8',    // Delicate 1px hairline dividers
        },
        accent: {
          gold: '#C5A880',    // Muted Champagne Gold (≤5% luxury details & focus rings)
          goldHover: '#B8996E',
        },
        brand: {
          whatsapp: '#25D366', // Action Channel Green
          whatsappHover: '#1EBE5D',
        }
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-plus-jakarta)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card-rest': '0 1px 3px rgba(24, 24, 27, 0.04)',
        'card-hover': '0 12px 28px -6px rgba(24, 24, 27, 0.08)',
        'drawer': '-8px 0 32px rgba(24, 24, 27, 0.12)',
      },
      aspectRatio: {
        'product': '3 / 4',
      }
    }
  }
}
```

---

## 4. BACKEND ARCHITECTURE

### 4.1 Data Access Layer (DAL)
Direct database calls from UI components are prohibited. All database interactions occur through typed access modules in `lib/supabase/`:
* `lib/supabase/client.ts`: Singleton browser client utilizing `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
* `lib/supabase/server.ts`: Server-side client utilizing `@supabase/ssr` cookies for Server Components and Server Actions.
* `lib/supabase/admin.ts`: Privileged client utilizing `SUPABASE_SERVICE_ROLE_KEY` (restricted strictly to isolated server-only scripts and background tasks).

### 4.2 Server Actions for Administrative Mutations
Administrative writes are handled through type-validated Next.js Server Actions with built-in revalidation:
* `createProductAction(formData: FormData)`
* `updateProductAction(productId: string, formData: FormData)`
* `toggleProductAvailabilityAction(productId: string, status: AvailabilityStatus)`
* `updateSiteSettingsAction(settings: SiteSettingsUpdate)`

---

## 5. DATABASE ARCHITECTURE (POSTGRESQL DDL)

The database schema is normalized, type-safe, and enforces relational integrity.

```sql
-- ==============================================================================
-- 1. EXTENSIONS & ENUMS
-- ==============================================================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TYPE product_availability AS ENUM (
  'in_stock',
  'out_of_stock',
  'upon_request'
);

-- ==============================================================================
-- 2. CATEGORIES TABLE
-- ==============================================================================
CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(120) NOT NULL,
  slug VARCHAR(140) NOT NULL UNIQUE,
  description TEXT,
  image_url TEXT,
  display_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX idx_categories_slug ON public.categories(slug);
CREATE INDEX idx_categories_active_order ON public.categories(is_active, display_order);

-- ==============================================================================
-- 3. PRODUCTS TABLE
-- ==============================================================================
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(200) NOT NULL,
  slug VARCHAR(220) NOT NULL UNIQUE,
  category_id UUID NOT NULL REFERENCES public.categories(id) ON DELETE RESTRICT,
  description TEXT NOT NULL DEFAULT '',
  price DECIMAL(10, 2), -- Optional. If NULL, displayed as "Price on Request"
  compare_at_price DECIMAL(10, 2), -- Optional. Discount indicator if > price
  fabric VARCHAR(100),
  color VARCHAR(100),
  sizes_available TEXT[], -- e.g. ARRAY['Unstitched', 'Free Size', 'M', 'L']
  pattern_details VARCHAR(150),
  care_instructions VARCHAR(200),
  availability product_availability NOT NULL DEFAULT 'in_stock',
  featured BOOLEAN NOT NULL DEFAULT false,
  display_order INT NOT NULL DEFAULT 0,
  related_product_ids UUID[],
  is_active BOOLEAN NOT NULL DEFAULT true, -- Soft deletion / deactivation
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),

  CONSTRAINT chk_positive_price CHECK (price IS NULL OR price >= 0),
  CONSTRAINT chk_positive_compare_price CHECK (compare_at_price IS NULL OR compare_at_price >= 0)
);

CREATE INDEX idx_products_slug ON public.products(slug);
CREATE INDEX idx_products_category ON public.products(category_id);
CREATE INDEX idx_products_active_featured ON public.products(is_active, featured, display_order);
CREATE INDEX idx_products_availability ON public.products(availability);

-- Full-text search index (GIN) across title, fabric, and description
CREATE INDEX idx_products_search ON public.products 
USING GIN (to_tsvector('english', name || ' ' || COALESCE(fabric, '') || ' ' || description));

-- ==============================================================================
-- 4. PRODUCT IMAGES TABLE
-- ==============================================================================
CREATE TABLE public.product_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  alt_text VARCHAR(250) NOT NULL DEFAULT 'Banwarilal Cloth House Garment',
  display_order INT NOT NULL DEFAULT 0,
  is_primary BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX idx_product_images_product ON public.product_images(product_id, display_order);

-- ==============================================================================
-- 5. SITE SETTINGS TABLE (SINGLETON)
-- ==============================================================================
CREATE TABLE public.site_settings (
  id INT PRIMARY KEY DEFAULT 1,
  business_name VARCHAR(150) NOT NULL DEFAULT 'BANWARILAL CLOTH HOUSE',
  tagline VARCHAR(250) NOT NULL DEFAULT 'An established clothing store with a modern premium digital presence.',
  established_year INT NOT NULL DEFAULT 2003,
  address_street VARCHAR(250) NOT NULL DEFAULT 'Near Hanuman Mandir, New Bazaar, Chilbila',
  address_city VARCHAR(100) NOT NULL DEFAULT 'Pratapgarh',
  address_state VARCHAR(100) NOT NULL DEFAULT 'Uttar Pradesh',
  address_postal_code VARCHAR(20) NOT NULL DEFAULT '230403',
  address_country VARCHAR(50) NOT NULL DEFAULT 'India',
  latitude DECIMAL(10, 7) NOT NULL DEFAULT 25.9557296,
  longitude DECIMAL(10, 7) NOT NULL DEFAULT 82.0070317,
  google_maps_url TEXT NOT NULL DEFAULT 'https://www.google.com/maps/place/BANWARILAL+CLOTH+HOUSE/@25.9557296,82.0044568,922m/',
  whatsapp_number VARCHAR(30) NOT NULL, -- Configurable international format, e.g. '91XXXXXXXXXX'
  primary_phone VARCHAR(30),
  store_hours VARCHAR(150),
  instagram_url TEXT,
  facebook_url TEXT,
  whatsapp_cart_mode VARCHAR(20) NOT NULL DEFAULT 'names_only', -- 'names_only' or 'names_and_qty'
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),

  CONSTRAINT single_row_check CHECK (id = 1)
);

-- Automatic updated_at trigger function
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_products_updated_at BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE PROCEDURE update_timestamp();
CREATE TRIGGER trg_categories_updated_at BEFORE UPDATE ON public.categories FOR EACH ROW EXECUTE PROCEDURE update_timestamp();
CREATE TRIGGER trg_site_settings_updated_at BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE PROCEDURE update_timestamp();
```

---

## 6. AUTHENTICATION ARCHITECTURE

* **Scope:** Exclusively for authorized store owners/administrators (`/admin/*`).
* **Provider:** Supabase Auth via secure Email / Password or Magic Link.
* **Session Strategy:** HttpOnly, Secure, SameSite=Lax session cookies managed transparently via `@supabase/ssr`.
* **Zero Customer Login:** Public users are never presented with an auth wall or account creation modal.

---

## 7. AUTHORIZATION ARCHITECTURE

* **Admin Role Verification:** Users must possess an administrative claim inside `auth.users` metadata (`app_metadata->>'role' = 'admin'`).
* **Route Protection via Middleware:**
  ```typescript
  // middleware.ts
  import { createServerClient } from '@supabase/ssr'
  import { NextResponse, type NextRequest } from 'next/server'

  export async function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith('/admin')) {
      // Exclude /admin/login from lock
      if (request.nextUrl.pathname === '/admin/login') {
        return NextResponse.next()
      }

      const response = NextResponse.next()
      const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          cookies: {
            getAll: () => request.cookies.getAll(),
            setAll: (cookiesToSet) => {
              cookiesToSet.forEach(({ name, value, options }) =>
                response.cookies.set(name, value, options)
              )
            },
          },
        }
      )

      const { data: { user } } = await supabase.auth.getUser()
      const isAdmin = user?.app_metadata?.role === 'admin'

      if (!user || !isAdmin) {
        return NextResponse.redirect(new URL('/admin/login', request.url))
      }
      return response
    }
    return NextResponse.next()
  }

  export const config = {
    matcher: ['/admin/:path*'],
  }
  ```

---

## 8. ROW LEVEL SECURITY (RLS) POLICIES

All tables enforce PostgreSQL RLS.

```sql
-- Enable RLS on all tables
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Helper function to check admin role
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 1. CATEGORIES POLICIES
CREATE POLICY "Public can read active categories"
  ON public.categories FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admins have full access to categories"
  ON public.categories FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- 2. PRODUCTS POLICIES
CREATE POLICY "Public can read active products"
  ON public.products FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admins have full access to products"
  ON public.products FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- 3. PRODUCT IMAGES POLICIES
CREATE POLICY "Public can read images of active products"
  ON public.product_images FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.products p
      WHERE p.id = product_images.product_id AND p.is_active = true
    )
  );

CREATE POLICY "Admins have full access to product images"
  ON public.product_images FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- 4. SITE SETTINGS POLICIES
CREATE POLICY "Public can read site settings"
  ON public.site_settings FOR SELECT
  USING (true);

CREATE POLICY "Admins can update site settings"
  ON public.site_settings FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());
```

---

## 9. STORAGE ARCHITECTURE

### 9.1 Buckets
* `product-media`: Public bucket hosting optimized garment photography.
* Cache Control: `public, max-age=31536000, immutable`.

### 9.2 Path Hierarchy
`product-media/products/{productId}/{uuid}-{filename}.webp`

### 9.3 Storage Security Policies
* Public Read: Enabled for all users on `product-media`.
* Upload / Delete: Restricted to `public.is_admin() = true`.
* Allowed MIME types: `image/jpeg`, `image/png`, `image/webp`, `image/avif`.
* Max file size: `5 MB` per asset.

---

## 10. PRODUCT DATA MODEL (TYPESCRIPT SPECIFICATION)

```typescript
// types/product.ts

export type AvailabilityStatus = 'in_stock' | 'out_of_stock' | 'upon_request';

export interface ProductImage {
  id: string;
  productId: string;
  imageUrl: string;
  altText: string;
  displayOrder: number;
  isPrimary: boolean;
}

export interface ProductSpecification {
  fabric?: string;
  color?: string;
  sizesAvailable?: string[];
  patternDetails?: string;
  careInstructions?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  categoryName?: string;
  categorySlug?: string;
  description: string;
  price?: number;            // undefined / null = "Price on Request"
  compareAtPrice?: number;   // Comparative original price
  specifications: ProductSpecification;
  availability: AvailabilityStatus;
  featured: boolean;
  displayOrder: number;
  relatedProductIds?: string[];
  images: ProductImage[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
```

---

## 11. CATEGORY DATA MODEL

```typescript
// types/category.ts

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  displayOrder: number;
  isActive: boolean;
  productCount?: number;
  createdAt: string;
  updatedAt: string;
}
```

---

## 12. SITE SETTINGS DATA MODEL

```typescript
// types/settings.ts

export interface SiteSettings {
  businessName: string;
  tagline: string;
  establishedYear: number;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    latitude: number;
    longitude: number;
    googleMapsUrl: string;
  };
  contact: {
    whatsappNumber: string; // E.g., '91XXXXXXXXXX'
    primaryPhone?: string;
    storeHours?: string;
    instagramUrl?: string;
    facebookUrl?: string;
  };
  whatsappCartMode: 'names_only' | 'names_and_qty';
}
```

---

## 13. ROUTING ARCHITECTURE

| Public Route | Component Type | Caching / Rendering Strategy |
| :--- | :--- | :--- |
| `/` | Server Component | ISR / Stale-While-Revalidate (`revalidate: 3600`) |
| `/collections` | Server Component + Client Filter | SSR with client-side instant filtering |
| `/collections/[slug]` | Server Component | ISR (`revalidate: 3600`), dynamic generateStaticParams |
| `/products/[slug]` | Server Component | Dynamic SSR / ISR (`revalidate: 1800`), JSON-LD injection |
| `/about` | Server Component | Static SSG |
| `/contact` | Server Component | Static SSG |
| `/cart` | Client Component | Client-only render (Reads `localStorage`) |
| `/admin/login` | Client Component | Dynamic Server Render |
| `/admin/products` | Server Component (Protected) | Dynamic SSR (Admin Session Required) |
| `/admin/settings` | Server Component (Protected) | Dynamic SSR (Admin Session Required) |

---

## 14. CART ARCHITECTURE

### 14.1 Store Implementation
Cart state is encapsulated inside a custom React Context with local storage synchronization.
```typescript
// types/cart.ts
export interface CartItem {
  productId: string;
  productName: string;
  productSlug: string;
  thumbnailUrl: string;
  price?: number;
  quantity: number;
}

export interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItemCount: number;
  subtotal: number | null; // null if any item is unpriced
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}
```

### 14.2 Local Storage Fault Tolerance
```typescript
// lib/cart/storage.ts
const CART_STORAGE_KEY = 'bch_cart_items_v1';

export function loadCartFromStorage(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) throw new Error('Invalid cart format');
    return parsed.filter(item => 
      item && typeof item.productId === 'string' && typeof item.productName === 'string'
    );
  } catch (err) {
    console.warn('[Cart] LocalStorage corrupted, resetting cart safely:', err);
    localStorage.removeItem(CART_STORAGE_KEY);
    return [];
  }
}

export function saveCartToStorage(items: CartItem[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch (err) {
    console.error('[Cart] Failed to write to localStorage:', err);
  }
}
```

---

## 15. WHATSAPP MESSAGE & URL GENERATION ARCHITECTURE

The WhatsApp architecture is divided into two distinct, independently testable pure functions: message compilation and URL packaging.

```typescript
// lib/whatsapp/generator.ts
import { CartItem } from '@/types/cart';
import { Product } from '@/types/product';

export function normalizeWhatsAppNumber(rawNumber: string): string {
  // Strip all non-digit characters (+, spaces, dashes, parentheses)
  const cleaned = rawNumber.replace(/\D/g, '');
  // Default to India (+91) if 10 digits provided
  if (cleaned.length === 10) {
    return `91${cleaned}`;
  }
  return cleaned;
}

export function generateSingleProductMessage(product: Product, baseUrl: string): string {
  const safeName = product.name.trim() || 'Selected Garment';
  const productUrl = `${baseUrl.replace(/\/$/, '')}/products/${product.slug}`;
  
  return [
    'Hello BANWARILAL CLOTH HOUSE,',
    '',
    'I am interested in this garment from your digital catalogue:',
    `• Product: ${safeName}`,
    `• Link: ${productUrl}`,
    '',
    'Please confirm availability, price, and further details.',
    'Thank you!'
  ].join('\n');
}

export function generateCartMessage(
  items: CartItem[], 
  mode: 'names_only' | 'names_and_qty' = 'names_only'
): string {
  if (!items || items.length === 0) {
    return 'Hello BANWARILAL CLOTH HOUSE, I am inquiring about your clothing collection.';
  }

  const listLines = items.map((item, index) => {
    const cleanName = (item.productName || 'Catalogue Item').trim();
    if (mode === 'names_and_qty' && item.quantity > 1) {
      return `${index + 1}. ${cleanName} (Qty: ${item.quantity})`;
    }
    return `${index + 1}. ${cleanName}`;
  });

  return [
    'Hello BANWARILAL CLOTH HOUSE,',
    '',
    'I am interested in ordering/inquiring about these items from your digital catalogue:',
    '',
    ...listLines,
    '',
    'Please confirm availability, sizing, and details.',
    'Thank you!'
  ].join('\n');
}

export function buildWhatsAppUrl(phoneNumber: string, message: string): string {
  const normalizedPhone = normalizeWhatsAppNumber(phoneNumber);
  const encodedText = encodeURIComponent(message);
  return `https://wa.me/${normalizedPhone}?text=${encodedText}`;
}
```

---

## 16. SEARCH ARCHITECTURE

* **Strategy:** Client-side in-memory search for up to 500 items, with database GIN full-text index fallback for large inventories.
* **Debounce Delay:** `150ms`.
* **Search Corpus:** Concatenation of `name`, `categoryName`, and `specifications.fabric`.
* **Zero Results State:** Contextual guidance offering clear button and suggested category gateways.

---

## 17. FILTER & SORT ARCHITECTURE

* **Active Filters:** Generated dynamically from the current dataset (no empty categories or zero-match options).
* **Sorting Algorithms (Deterministic):**
  * `featured`: `a.displayOrder - b.displayOrder`
  * `newest`: `new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()`
  * `price-asc`: Numeric ascending; items with `null` price sorted to the end.
  * `price-desc`: Numeric descending; items with `null` price sorted to the end.
  * `name-asc`: `a.name.localeCompare(b.name)`

---

## 18. SEO & STRUCTURED DATA ARCHITECTURE

* **Dynamic Metadata:** Implemented via Next.js `generateMetadata()` on product and category routes.
* **JSON-LD Schemas:**
  1. `ClothingStore` schema injected on root layout (`Near Hanuman Mandir, Chilbila, Pratapgarh`).
  2. `Product` schema injected on `/products/[slug]`.
  3. `BreadcrumbList` on all nested routes.
* **Robots Configuration:** Admin routes (`/admin/*`) strictly disallowed in `app/robots.ts`.

---

## 19. IMAGE OPTIMIZATION STRATEGY

* **Component:** `next/image` on all visual assets.
* **Dimensions:** Mandatory `aspect-[3/4]` aspect ratio reservation on cards to achieve `CLS: 0.00`.
* **Priority Rule:** The first image on `/products/[slug]` and the primary homepage hero visual use `priority={true}`. All catalog grid images use `loading="lazy"`.
* **Breakpoints:** `deviceSizes: [360, 640, 768, 1024, 1280, 1536]`.

---

## 20. PERFORMANCE BUDGET & TARGETS

| Metric | Target Threshold | Architectural Strategy |
| :--- | :--- | :--- |
| **LCP (Largest Contentful Paint)** | `< 2.0s` | Server Components, preloaded hero image, AVIF/WebP formats. |
| **INP (Interaction to Next Paint)** | `< 100ms` | Zero heavy script bundles, lightweight cart context. |
| **CLS (Cumulative Layout Shift)** | `< 0.02` | Strict CSS aspect ratios (`aspect-[3/4]`), font fallback matching. |
| **JS Bundle Budget** | `< 90KB` initial client JS | Minimal client components, tree-shaken Lucide icons, no WebGL. |

---

## 21. ACCESSIBILITY STRATEGY (WCAG 2.1 AA)

* **Contrast Ratio:** Text `#18181B` on `#FAF8F5` achieves `14.2:1` (exceeds AAA requirement).
* **Keyboard Focus:** Global visible focus ring: `focus-visible:ring-2 focus-visible:ring-[#C5A880] focus-visible:ring-offset-2`.
* **Modals & Drawers:** Focus trapping using Radix UI primitives / native dialogs with `Escape` key close listeners.
* **ARIA Live:** Cart counter wrapped in `<span aria-live="polite">` for screen reader announcements.

---

## 22. SECURITY ARCHITECTURE & THREAT MODEL

| Threat Vector | Severity | Applied Mitigation in TRD |
| :--- | :---: | :--- |
| **Unauthorized DB Modification** | **Critical** | Supabase Row Level Security (RLS) rejects all public `INSERT`, `UPDATE`, `DELETE` operations at the database kernel level. |
| **Secret Key Leakage** | **Critical** | `SUPABASE_SERVICE_ROLE_KEY` is classified as `SERVER-ONLY` and never referenced in client code. Only `NEXT_PUBLIC_` variables are accessible to browser. |
| **Admin Route Bypass** | **High** | Next.js Edge Middleware validates authentic Supabase session and `app_metadata.role === 'admin'` before allowing access to `/admin/*`. |
| **XSS via Product Content** | **High** | React JSX auto-escapes all strings. Direct `dangerouslySetInnerHTML` is strictly prohibited throughout the codebase. |
| **WhatsApp URL Injection** | **Medium** | All WhatsApp message strings are strictly validated and URL-encoded via `encodeURIComponent()`. |
| **Malicious Image Uploads** | **Medium** | Supabase Storage policies enforce strict MIME type whitelisting (`image/jpeg`, `image/png`, `image/webp`) and a 5 MB file ceiling. |

---

## 23. ERROR HANDLING & RESILIENCE

1. **404 Handling (`app/not-found.tsx`):** Elegant luxury-themed recovery view with button returning to `/collections`.
2. **Global Error Boundary (`app/error.tsx`):** Catches uncaught runtime exceptions, logs error silently without leaking stack traces, and renders an *"Unable to load collection"* card.
3. **Database Downtime Fallback:** Renders cached static product data or displays friendly offline message with direct phone call links.
4. **Missing WhatsApp Number:** If unconfigured, the WhatsApp button disables safely with an informative tooltip instead of generating a dead link.

---

## 24. LOADING STRATEGY

* Dedicated `loading.tsx` skeletons for `/collections` and `/products/[slug]`.
* Skeletons replicate exact 3:4 aspect-ratio bounding boxes to eliminate content reflow.

---

## 25. CACHING STRATEGY

* **Product Pages:** ISR (`revalidate = 1800`) — refreshed automatically when modified via admin Server Actions (`revalidatePath('/products/[slug]')`).
* **Category Pages:** ISR (`revalidate = 3600`).
* **Browser Caching:** Images served via Supabase CDN with `Cache-Control: public, max-age=31536000, immutable`.

---

## 26. ENVIRONMENT VARIABLES

```bash
# ==============================================================================
# CLIENT-ACCESSIBLE ENVIRONMENT VARIABLES (NEXT_PUBLIC_)
# ==============================================================================
NEXT_PUBLIC_SUPABASE_URL="https://[YOUR_PROJECT_REF].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOi..."
NEXT_PUBLIC_SITE_URL="https://banwarilalclothhouse.com"

# ==============================================================================
# SERVER-ONLY SECRETS (STRICTLY FORBIDDEN IN CLIENT CODE)
# ==============================================================================
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOi..." # Admin mutations only

# ==============================================================================
# BUSINESS CONFIGURATION (STORED IN DB; ENV FALLBACK ONLY)
# ==============================================================================
DEFAULT_WHATSAPP_NUMBER="91XXXXXXXXXX" # [WHATSAPP_NUMBER_REQUIRED]
```

---

## 27. DEPLOYMENT ARCHITECTURE

* **Production Target:** Vercel Connected to GitHub Repository.
* **Database & Storage Host:** Supabase Cloud (AWS Mumbai `ap-south-1` region for minimum latency to Uttar Pradesh / India).
* **SSL & DNS:** Automated Let’s Encrypt SSL via Vercel Edge Network.

---

## 28. GIT STRATEGY & REPOSITORY RULES

* **Branches:** `main` (Production), `develop` (Integration).
* **Secrets Policy:** `.env*.local` strictly ignored via `.gitignore`.
* **Zero Build Errors:** Enforce `npm run build` and `npm run lint` before merging.

---

## 29. DEPENDENCY STRATEGY

Strictly minimal runtime dependencies:
1. `next`: Core framework
2. `react` / `react-dom`: UI rendering
3. `@supabase/ssr` / `@supabase/supabase-js`: Database & Auth
4. `lucide-react`: Lightweight iconography
5. `zod`: Type validation
6. `clsx` / `tailwind-merge`: Class name composition

*Prohibited:* Redux, Three.js, Lodash, jQuery, generic UI kit bundles.

---

## 30. THREAT MODEL MATRIX

*(See Section 22 for comprehensive breakdown)*

---

## 31. SCALABILITY STRATEGY

* **Database Indexing:** GIN and B-Tree indexes ensure fast lookups up to 10,000+ garments.
* **Modular Storage:** Image references point to external CDN URLs; database stores only text metadata.
* **Future Upgrade Paths:** Ready for Headless Admin CMS, Supabase Realtime stock counts, and Payment Gateways without structural redesign.

---

## 32. FAILURE FLOWS

```
[ Database Unreachable ] ──► Serves Edge Cached Version or Friendly Error Card
[ WhatsApp Unconfigured ] ──► Disables CTA with Tooltip ("Ordering updating, please call store")
[ LocalStorage Corrupted ] ──► Catches Exception, Resets Cart to [], UI Continues
[ Image Fails to Load ] ──► Graceful Warm Taupe SVG Garment Placeholder Rendered
[ Slug Not Found ] ──► Invokes notFound() ──► Renders Custom 404 Recovery Screen
```

---

## 33. TECHNICAL ACCEPTANCE CRITERIA

1. **TAC-01 (Type Safety):** `npm run build` succeeds with zero TypeScript warnings or errors under `strict: true`.
2. **TAC-02 (RLS Enforcement):** Direct anonymous SQL execution of `DELETE FROM products` fails with `permission denied`.
3. **TAC-03 (WhatsApp URL Validity):** All compiled WhatsApp URLs match regex `^https:\/\/wa\.me\/\d+\?text=.+$` and decode without `"undefined"`.
4. **TAC-04 (Cart Persistence):** Items stored in `localStorage` survive browser refresh and tab closure.
5. **TAC-05 (Layout Stability):** Page load demonstrates `CLS < 0.05` across all viewports.

---

## 34. ARCHITECTURE DECISION RECORDS (ADRs)

### ADR-01: Next.js App Router & Server Components
* **Decision:** Utilize Next.js App Router with React Server Components (RSC) as the foundational architecture.
* **Rationale:** Maximizes SEO, minimizes client JavaScript payload for regional 4G networks, and enables native image optimization.
* **Alternatives Considered:** Pages Router (outdated), Vite SPA (poor SEO for clothing catalogue).

### ADR-02: Supabase with PostgreSQL & Row Level Security
* **Decision:** Utilize Supabase PostgreSQL with kernel-level RLS policies.
* **Rationale:** Provides ACID compliance, relational integrity between products and categories, and enterprise-grade security without maintaining a custom Node.js backend.
* **Alternatives Considered:** Firebase (non-relational, awkward category joins), MongoDB (lack of strict SQL relational constraints).

### ADR-03: Client-Side Cart Storage (`localStorage`)
* **Decision:** Persist shopping bag in browser `localStorage` without database user sessions.
* **Rationale:** The business model concludes in WhatsApp dispatch. Eliminates unnecessary database writes, user authentication barriers, and server load.
* **Alternatives Considered:** Server-persisted session carts (unnecessary complexity for zero-payment model).

### ADR-04: Dual-Function WhatsApp Payload Generator
* **Decision:** Decouple message string generation from URL encoding into separate pure functions.
* **Rationale:** Enables deterministic unit testing, prevents XSS/injection vulnerabilities, and allows clean switching between single-product and multi-product formats.

### ADR-05: CSS-First 3D Depth & Micro-Elevation
* **Decision:** Implement tactile depth using CSS box-shadows and subtle transforms; prohibit WebGL/Three.js.
* **Rationale:** Preserves battery life, guarantees fast mobile loading on budget devices, and prevents distracting visual clutter.

---

## 35. COMPLETE FOLDER STRUCTURE

```
clothing/
├── .env.example
├── .gitignore
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── PROJECT_SOURCE_OF_TRUTH.md
├── PRODUCT_REQUIREMENTS_DOCUMENT.md
├── TECHNICAL_REQUIREMENTS_DOCUMENT.md
│
├── app/
│   ├── layout.tsx                 # Root layout, font injection, JSON-LD store schema
│   ├── page.tsx                   # Editorial Homepage (RSC)
│   ├── loading.tsx                # Global loading skeleton
│   ├── not-found.tsx              # Custom luxury 404 view
│   ├── error.tsx                  # Global error boundary
│   ├── robots.ts                  # SEO robots generator (blocks /admin)
│   ├── sitemap.ts                 # Dynamic XML sitemap generator
│   │
│   ├── collections/
│   │   ├── page.tsx               # Full catalogue directory (RSC)
│   │   └── [slug]/
│   │       └── page.tsx           # Category archive view (RSC)
│   │
│   ├── products/
│   │   └── [slug]/
│   │       └── page.tsx           # Product detail page (RSC + JSON-LD)
│   │
│   ├── cart/
│   │   └── page.tsx               # Dedicated fallback Cart page
│   │
│   ├── about/
│   │   └── page.tsx               # Heritage & founding story (2003)
│   │
│   ├── contact/
│   │   └── page.tsx               # Store location, maps, and direct contact
│   │
│   └── admin/
│       ├── login/
│       │   └── page.tsx           # Admin authentication
│       ├── layout.tsx             # Protected admin shell
│       ├── page.tsx               # Admin overview
│       ├── products/
│       │   └── page.tsx           # Product catalog management
│       └── settings/
│           └── page.tsx           # Store settings & WhatsApp config
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx             # Main header with brand typography & cart trigger
│   │   ├── Footer.tsx             # Credentials, canonical address, links
│   │   ├── AnnouncementBar.tsx    # Subtitle announcements
│   │   └── StoreLocationCard.tsx  # Hanuman Mandir landmark card with Maps CTA
│   │
│   ├── home/
│   │   ├── HeroSection.tsx        # High-impact editorial hero
│   │   ├── CategoryCarousel.tsx   # Verified category entry points
│   │   ├── FeaturedGrid.tsx       # Curated product showcase
│   │   ├── BrandStory.tsx         # 20+ years heritage narrative
│   │   └── StoreHighlights.tsx    # In-store shopping & consultation badges
│   │
│   ├── catalogue/
│   │   ├── CatalogueBrowser.tsx   # Client wrapper for search, filter & grid
│   │   ├── ProductGrid.tsx        # Responsive 3:4 grid
│   │   ├── FilterBar.tsx          # Dynamic category & availability pills
│   │   ├── SearchInput.tsx        # Debounced instant search bar
│   │   └── SortDropdown.tsx       # Clean sorting options
│   │
│   ├── product/
│   │   ├── ProductCard.tsx        # Standardized 3:4 card with hover elevation
│   │   ├── ProductGallery.tsx     # Thumbnail selector & zoom inspection
│   │   ├── SpecificationTable.tsx # Clean absence-tolerant spec matrix
│   │   └── RelatedProducts.tsx    # Same-category recommendation rail
│   │
│   ├── cart/
│   │   ├── CartDrawer.tsx         # Slide-over bag drawer
│   │   ├── CartItemRow.tsx        # Quantity modifier & thumbnail row
│   │   └── CartEmptyState.tsx     # Elegant empty state with collection link
│   │
│   ├── whatsapp/
│   │   ├── WhatsAppOrderButton.tsx# Reusable action button with WhatsApp branding
│   │   └── WhatsAppStickyBar.tsx  # Mobile-only non-intrusive floating anchor
│   │
│   └── ui/                        # Reusable primitives
│       ├── Button.tsx
│       ├── Badge.tsx
│       ├── Skeleton.tsx
│       └── Toast.tsx
│
├── context/
│   └── CartContext.tsx            # Global cart state provider
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts              # Browser Supabase client
│   │   ├── server.ts              # Server Component / Action client
│   │   └── admin.ts               # Privileged server-only client
│   │
│   ├── cart/
│   │   └── storage.ts             # LocalStorage safe serialization helpers
│   │
│   ├── whatsapp/
│   │   └── generator.ts           # Message compiler & URL builder
│   │
│   ├── utils/
│   │   ├── formatters.ts          # Currency (INR) & date formatters
│   │   └── cn.ts                  # Tailwind class merger (clsx + twMerge)
│   │
│   └── seo/
│       └── jsonLd.ts              # Structured data schema generators
│
├── types/
│   ├── product.ts                 # Product, Specification & Image types
│   ├── category.ts                # Category types
│   ├── cart.ts                    # Cart item & context interfaces
│   ├── settings.ts                # Site settings interfaces
│   └── database.types.ts          # Supabase auto-generated database types
│
└── public/
    ├── images/
    │   └── placeholder-garment.svg# Graceful fallback illustration
    └── fonts/                     # Self-hosted subset fonts (Playfair, Plus Jakarta)
```
