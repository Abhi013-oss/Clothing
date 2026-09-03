# BANWARILAL CLOTH HOUSE — BACKEND ARCHITECTURE

> **PRODUCTION SYSTEM ARCHITECTURE & DATA FLOW — PHASE 14**  
> **Brand Entity:** BANWARILAL CLOTH HOUSE (Established 2003, Chilbila, Pratapgarh)  
> **Core Concept:** Headless Next.js App Router + Supabase PostgreSQL + WhatsApp Order Handoff  
> **Status:** Authoritative Architectural Standard

---

## 1. HIGH-LEVEL ARCHITECTURAL TOPOLOGY

```
               ┌────────────────────────────────────────────────────────┐
               │                BANWARILAL CLOTH HOUSE                  │
               │                   DIGITAL SHOWROOM                     │
               └───────────────────────────┬────────────────────────────┘
                                           │
                    ┌──────────────────────┴──────────────────────┐
                    ▼                                             ▼
        [ CUSTOMER EXPERIENCE ]                         [ MERCHANT CONSOLE ]
          • Browsing & Discovery                          • Protected Admin Auth
          • 3:4 High-Res Gallery                          • Catalogue Merchandising
          • Curated Shopping Bag                          • Department Taxonomy
          • WhatsApp Order Dispatch                       • Store & Phone Config
                    │                                             │
                    └──────────────────────┬──────────────────────┘
                                           ▼
                              Next.js 14 App Router
                       (Server Components & Server Actions)
                                           │
                                           ▼
                                   Data Access Layer
                                  (lib/data/ DAL)
                                           │
                     ┌─────────────────────┴─────────────────────┐
                     ▼                                           ▼
               Supabase Client                             Local Resilient
            (PostgreSQL + Auth + Storage)                 Fallback Fixtures
                     │
         ┌───────────┼───────────┐
         ▼           ▼           ▼
    PostgreSQL     Storage   Supabase Auth
    (RLS Rules)   (Buckets)  (Admin Role)
```

---

## 2. SERVER / CLIENT RESPONSIBILITY BOUNDARIES

| Tier | Component Type | Technology | Responsibility |
| :--- | :--- | :--- | :--- |
| **Public Storefront** | React Server Component (RSC) | Next.js 14, Tailwind | High-speed static generation (SSG) and server-rendered product displays. |
| **Interactive Elements** | Client Component | React 18 (`'use client'`) | Product zoom lightbox, filter sheets, shopping bag context, and WhatsApp compiler. |
| **Admin Route Guard** | Edge Middleware | `middleware.ts` + `@supabase/ssr` | Intercepts `/admin/*` routes; enforces authenticated session cookie. |
| **Admin Console** | Server & Client Components | React 18, Lucide | Dashboard metrics, product editor forms, department taxonomy, and settings. |
| **Data Access Layer** | Isomorphic Modules | `lib/data/` | Decoupled query layer isolating Supabase SDK calls from UI presentation. |
| **Persistence** | Relational Database | Supabase PostgreSQL | Authoritative catalog data, category taxonomy, and RLS security enforcement. |

---

## 3. PUBLIC VS. PRIVATE DATA BOUNDARIES

* **Publicly Accessible Data:**
  * Active products (`is_active = true`), approved images, public pricing in INR, fabric specifications, availability badges.
  * Visible categories (`is_visible = true`).
  * Public business identity (Chilbila physical location, store hours, Google Maps coordinate link, official WhatsApp number).
* **Private / Protected Data:**
  * Admin profiles (`admin_profiles`) and authentication credentials.
  * Archived/draft products (`is_active = false`).
  * Hidden categories (`is_visible = false`).
  * Storage upload write permissions.
  * Internal error stack traces and server-side environment secrets.

---

## 4. REQUIRED ENVIRONMENT VARIABLES

| Variable Name | Exposure | Required | Purpose |
| :--- | :---: | :---: | :--- |
| `NEXT_PUBLIC_SUPABASE_URL` | Public / Client | Yes | Base URL of the Supabase project. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public / Client | Yes | Supabase public anonymous API key (governed by RLS). |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-Only | Yes (Prod) | Privileged key for server-side administrative tasks. Never exposed to browser. |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Public / Client | Yes | Official merchant phone number for receiving WhatsApp orders. |
| `NEXT_PUBLIC_PHONE_NUMBER` | Public / Client | No | Primary calling line for Chilbila store. |
