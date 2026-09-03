# BANWARILAL CLOTH HOUSE — SECURITY HARDENING SPECIFICATION

> **CANONICAL SECURITY CONTROLS & DEFENSE-IN-DEPTH ARCHITECTURE — PHASE 15**  
> **Brand Entity:** BANWARILAL CLOTH HOUSE (Established 2003, Chilbila, Pratapgarh)  
> **Status:** Production Hardening Standard

---

## 1. AUTHENTICATION & ACCESS CONTROL HARDENING
* **Engine:** Supabase Auth (`supabase.auth.signInWithPassword`).
* **Session Transport:** HttpOnly, Secure session cookies managed by `@supabase/ssr`.
* **Zero Public Registration:** Account sign-up is permanently disabled in the UI. Only administrative users provisioned by store leadership can authenticate.
* **Edge Route Interception:** `middleware.ts` guards all `/admin/*` routes. Unauthenticated requests are immediately redirected to `/admin/login`.
* **Production Integrity:** In `production` mode, development placeholder bypass is completely disallowed.

---

## 2. ROW LEVEL SECURITY (RLS) HARDENING
* **Default Deny Policy:** RLS is enabled on all tables (`products`, `categories`, `product_images`, `site_settings`, `admin_profiles`).
* **Selective Public Reads:**
  * Anonymous visitors can only read products where `is_active = true`.
  * Anonymous visitors can only read categories where `is_visible = true`.
  * Public users can never view draft, soft-deleted, or hidden products.
* **Admin-Exclusive Mutations:** `INSERT`, `UPDATE`, and `DELETE` operations require `public.is_admin() = true` or `auth.role() = 'service_role'`.

---

## 3. INPUT VALIDATION & INJECTION PREVENTION
* **SQL Injection Immunity:** All database interactions use parameterized queries via Supabase JS SDK. No dynamic SQL string concatenation is ever performed.
* **Slug Sanitation:** Slugs are strictly validated against `SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/`. Malicious characters, backticks, and escape quotes are rejected.
* **Price Range Bounds:** Non-numeric and negative values are rejected. Compare-at prices must strictly satisfy `compareAtPrice >= price`.
* **Text Input Sanitation:** `sanitizeText()` in `lib/security/sanitize.ts` removes HTML elements and JavaScript pseudo-protocols.

---

## 4. XSS & STRUCTURED DATA DEFENSE
* **Script-Tag Breakout Neutralization:** All inline Schema.org JSON-LD elements utilize `safeJsonLd()`. Angle brackets (`<`, `>`) and ampersands are encoded as Unicode escapes (`\u003c`, `\u003e`, `\u0026`), preventing attackers from terminating the `<script>` context.
* **Zero Unchecked Sinks:** Zero instances of `eval()`, `new Function()`, `innerHTML =`, or raw `document.write()` exist across the codebase.

---

## 5. FILE UPLOAD & MEDIA SECURITY
* **File Size Ceiling:** Strict 5MB limit enforced via `validateUploadFile()`.
* **MIME Whitelist:** Only raster and modern web image formats (`image/jpeg`, `image/png`, `image/webp`, `image/avif`) are accepted.
* **Extension Matching:** Executables (`.exe`, `.sh`, `.bat`), scripts (`.js`, `.php`), and HTML/SVG payloads with script capabilities are rejected.
* **Path Traversal Shield:** Upload paths and image URLs are checked against `..`, null bytes (`\0`), and local file prefixes (`file://`).

---

## 6. HTTP SECURITY HEADERS & CONTENT SECURITY POLICY (CSP)
Configured in `next.config.mjs`:
```http
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' blob: data: https://images.unsplash.com https://*.supabase.co https://*.google.com https://*.gstatic.com; font-src 'self' data:; connect-src 'self' https://*.supabase.co wss://*.supabase.co https://wa.me; frame-src 'self' https://www.google.com; object-src 'none'; base-uri 'self'; form-action 'self' https://wa.me; frame-ancestors 'none';
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-DNS-Prefetch-Control: on
```
* **Information Leak Prevention:** `poweredByHeader: false` disables the `X-Powered-By: Next.js` header.

---

## 7. SECRETS & REPOSITORY DEFENSE
* **Server-Only Service Role Key:** `SUPABASE_SERVICE_ROLE_KEY` is exclusively isolated to `lib/supabase/admin.ts` on the server runtime. It is never imported into Client Components or exposed via `NEXT_PUBLIC_*`.
* **Git Protection:** `.gitignore` explicitly prevents `.env*`, `.next`, and certificate files from being tracked.

---

## 8. CART & WHATSAPP INTEGRITY
* **Zero Trust Client Storage:** Browser `localStorage` is treated strictly as an untrusted client selection cache.
* **Authoritative Re-Validation:** `validateAndFilterCartForWhatsApp()` reconciles every cart item against authoritative catalog prices, names, and stock availability before dispatch. Client-tampered prices are discarded.
* **WhatsApp URL Sanitization:** All handoff links are constructed using `encodeURIComponent()`, preventing parameter injection, newline attacks, and protocol pollution.
