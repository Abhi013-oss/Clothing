# BANWARILAL CLOTH HOUSE — SEO STRATEGY & SPECIFICATION

> **COMPREHENSIVE TECHNICAL, ON-PAGE & LOCAL SEO STRATEGY — PHASE 16**  
> **Brand Entity:** BANWARILAL CLOTH HOUSE (Established 2003, Chilbila, Pratapgarh)  
> **Canonical Domain:** `https://banwarilalclothhouse.com`  
> **Status:** Production Standard

---

## 1. PAGE-BY-PAGE SEO ARCHITECTURE

| Route | Primary Keyword Focus | Title Format | Robots Meta | Canonical URL |
| :--- | :--- | :--- | :--- | :--- |
| `/` | BANWARILAL CLOTH HOUSE, Chilbila cloth store, sarees Pratapgarh | `BANWARILAL CLOTH HOUSE — Fine Clothing, Sarees & Textiles \| Chilbila, Pratapgarh` | `index, follow` | `https://banwarilalclothhouse.com` |
| `/collections` | Clothing collections, handloom sarees, unstitched suitings | `Complete Clothing Catalogue — BANWARILAL CLOTH HOUSE \| Chilbila, Pratapgarh` | `index, follow` | `https://banwarilalclothhouse.com/collections` |
| `/collections/[category-slug]` | Specific category (e.g. Sarees, Suits, Readymade) | `[Category Name] Collection — BANWARILAL CLOTH HOUSE \| Chilbila, Pratapgarh` | `index, follow` | `https://banwarilalclothhouse.com/collections/[category-slug]` |
| `/products/[slug]` | Specific product name & weave (e.g. Katan Silk Saree) | `[Product Name] — BANWARILAL CLOTH HOUSE` | `index, follow` | `https://banwarilalclothhouse.com/products/[slug]` |
| `/about` | Heritage, Chilbila retail trust, founding 2003 | `Heritage & Story — BANWARILAL CLOTH HOUSE` | `index, follow` | `https://banwarilalclothhouse.com/about` |
| `/contact` | Directions, Hanuman Mandir landmark, store hours | `Store Location & Contact — BANWARILAL CLOTH HOUSE` | `index, follow` | `https://banwarilalclothhouse.com/contact` |
| `/cart` | Shopping bag utility | `Shopping Bag — BANWARILAL CLOTH HOUSE` | `noindex, follow` | `https://banwarilalclothhouse.com/cart` |
| `/admin/*` | Internal merchant console | `Merchant Console — BANWARILAL CLOTH HOUSE` | `noindex, nofollow, nocache` | None (Protected) |

---

## 2. CANONICAL & CRAWLING STRATEGY
* **Deterministic Single URLs:** Every category and garment exists under a unique, deterministic slug path (`/collections/sarees`, `/products/crimson-banarasi-katan-silk-saree`).
* **Clean Query Isolation:** Filter and sort parameters (`?search=`, `?fabric=`, `?sort=`) preserve the base canonical URL (`https://banwarilalclothhouse.com/collections`), preventing Googlebot from indexing duplicate facet combinations.
* **Sitemap Automation (`/sitemap.xml`):** Generated dynamically via `app/sitemap.ts`. Queries authoritative active products (`isActive = true`) and categories (`isVisible = true`). Excludes utility cart and protected admin routes.
* **Robots Directives (`/robots.txt`):** Explicitly disallows `/admin/` and `/cart` while referencing the sitemap endpoint.

---

## 3. STRUCTURED DATA SPECIFICATION (SCHEMA.ORG)

### Root Layout: `ClothingStore` & `LocalBusiness`
```json
{
  "@context": "https://schema.org",
  "@type": "ClothingStore",
  "name": "BANWARILAL CLOTH HOUSE",
  "description": "Established clothing store with a modern premium digital presence.",
  "foundingDate": "2003",
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
  "hasMap": "https://www.google.com/maps/place/BANWARILAL+CLOTH+HOUSE/@25.9557296,82.0044568,922m/",
  "url": "https://banwarilalclothhouse.com"
}
```

### Product Detail Pages: `Product` & `BreadcrumbList`
* **Zero Fabrication Policy:** Includes real INR price (`priceCurrency: 'INR'`), real verified image URL, real category name, and `InStock`/`PreOrder` availability. Contains **NO fake reviews, NO fake ratings, and NO fake discount countdowns**.
* **BreadcrumbList:** Hierarchical navigation trail (`Home → Collections → Category → Product`) rendered via `BreadcrumbList` schema with sequential position indices.

---

## 4. LOCAL SEO FOUNDATIONS
* **Physical Proximity Signals:** Content reinforces the authentic physical retail presence in Chilbila, Pratapgarh near Hanuman Mandir.
* **Google Maps Integration:** Direct deep link to Google Maps destination coordinates (`25.9557296, 82.0070317`) for verified local route finding.
