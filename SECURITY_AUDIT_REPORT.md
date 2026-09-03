# BANWARILAL CLOTH HOUSE — SECURITY AUDIT REPORT

> **COMPREHENSIVE PENETRATION-STYLE AUDIT & SECURITY ASSESSMENT — PHASE 15**  
> **Brand Entity:** BANWARILAL CLOTH HOUSE (Established 2003, Chilbila, Pratapgarh)  
> **Audit Date:** September 2026  
> **Status:** Audited, Hardened, and Formally Verified

---

## 1. EXECUTIVE SUMMARY

An end-to-end security audit and penetration-style inspection was conducted across the entire digital showroom architecture of **BANWARILAL CLOTH HOUSE**. Because the business strictly operates an enquiry and WhatsApp order handoff model, the application contains **zero payment gateways, zero customer checkout forms, zero digital wallets, and zero stored payment card data**.

The audit focused on preventing unauthorized access to the admin portal, securing the PostgreSQL database and Row Level Security (RLS) policies, eliminating Cross-Site Scripting (XSS), neutralizing Open Redirect vectors, securing file uploads and media links, hardening HTTP response headers, preventing client-side cart tampering, and ensuring zero leaks of sensitive secrets or service-role keys.

All identified vulnerabilities and hardening opportunities have been resolved and verified with a 31-point automated security test suite and clean production compilation.

---

## 2. AUDIT SCOPE

The security assessment covered:
1. **Public Web Surfaces:** Digital showroom, catalogue discovery, product detail views, category routes, dynamic routes, and shopping bag drawer.
2. **Merchant Administration:** `/admin/*` route guard middleware, session cookie validation, login authentication, product editor forms, department taxonomy controls, and store settings.
3. **Data Layer & RLS:** Supabase PostgreSQL database tables (`products`, `categories`, `product_images`, `site_settings`, `admin_profiles`), RLS policies, and Data Access Layer (DAL) query bounds.
4. **Static Analysis & Secrets:** Git tracking configuration (`.gitignore`), environment variables, client bundle inspection, and source map vulnerability review.
5. **Client-Side Security:** Browser `localStorage` cart state manipulation resistance, WhatsApp handoff URI encoding, and script tag escaping in JSON-LD structured data.
6. **Network & Headers:** Content Security Policy (CSP), frame protection, MIME type sniffing deterrence, Referrer-Policy, and Permissions-Policy.

---

## 3. SECURITY FINDINGS & RESOLUTION SUMMARY

| ID | Severity | Category | Vulnerability Description | Remediation Applied | Retest Status |
| :--- | :---: | :--- | :--- | :--- | :---: |
| **SEC-01** | **HIGH** | Injection / XSS | Unescaped JSON-LD structured data in `app/layout.tsx` and `app/products/[slug]/page.tsx` could allow inline script breakout if database fields contained `</script>`. | Implemented `safeJsonLd()` in `lib/security/sanitize.ts` which encodes `<`, `>`, and `&` as unicode escapes (`\u003c`, `\u003e`, `\u0026`). | **RESOLVED (PASS)** |
| **SEC-02** | **HIGH** | Open Redirect | Unchecked `redirect` query parameter in `/admin/login` could allow attackers to construct phishing links redirecting admins to external domains. | Implemented `safeRedirectUrl()` in `lib/security/sanitize.ts` rejecting external protocols, protocol-relative `//` URLs, and backslash bypasses. | **RESOLVED (PASS)** |
| **SEC-03** | **MEDIUM** | Auth Bypass Risk | Middleware allowed dev preview mode if `NEXT_PUBLIC_SUPABASE_URL` contained `placeholder`, which could inadvertently bypass protection if misconfigured in production. | Hardened `middleware.ts` to strictly prohibit placeholder bypass when `process.env.NODE_ENV === 'production'`. | **RESOLVED (PASS)** |
| **SEC-04** | **MEDIUM** | Network Headers | Missing baseline HTTP security headers (CSP, HSTS, X-Frame-Options, X-Content-Type-Options) in Next.js configuration. | Added comprehensive security headers, Content Security Policy, and disabled `poweredByHeader` in `next.config.mjs`. | **RESOLVED (PASS)** |
| **SEC-05** | **MEDIUM** | Media / Upload Security | Image URL input in `ProductForm.tsx` lacked validation for malicious pseudo-protocols (`javascript:`, `file:`) and path traversal sequences. | Implemented `validateImageUrl()` and `validateUploadFile()` with 5MB size ceiling, MIME whitelist, and traversal rejection. | **RESOLVED (PASS)** |
| **SEC-06** | **MEDIUM** | Secrets Exposure Risk | Repository lacked `.gitignore` file, exposing local `.env` files and build outputs to potential accidental git commits. | Created strict `.gitignore` covering `.env*`, `.next`, and certificate files. | **RESOLVED (PASS)** |
| **SEC-07** | **LOW** | Crawler Indexing | Merchant console routes were potentially crawlable by search engine bots without explicit disallow directives. | Added `app/robots.ts` with global disallow for `/admin` and added `robots: { index: false, follow: false }` metadata to `app/admin/layout.tsx`. | **RESOLVED (PASS)** |
| **SEC-08** | **LOW** | Resource Exhaustion | Unbounded query limits in Data Access Layer (`lib/data/products.ts`, `lib/data/categories.ts`). | Added defensive query limits (`limit(100)` for products, `limit(50)` for categories). | **RESOLVED (PASS)** |

---

## 4. DETAILED FINDING AUDIT LOG

### Finding SEC-01: Script Breakout XSS in Structured Data
* **Affected Files:** `app/layout.tsx`, `app/products/[slug]/page.tsx`
* **Threat Mechanism:** `dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}` directly renders JSON without escaping HTML tag delimiters. An attacker supplying a product name like `Silk Saree </script><script>alert(1)</script>` would break out of the script tag and execute arbitrary JavaScript.
* **Proof of Concept:** Verified with automated test scenario 5.
* **Remediation:** Integrated `safeJsonLd()` converting all `<` characters to `\u003c`, guaranteeing complete script containment.

### Finding SEC-02: Open Redirect in Admin Login Redirection
* **Affected Files:** `middleware.ts`, `app/admin/login/page.tsx`
* **Threat Mechanism:** Passing `?redirect=https://evil-phish.com` allowed the redirect parameter to trigger browser navigation to untrusted destinations after successful authentication.
* **Remediation:** Implemented `safeRedirectUrl()` validating that redirect destinations strictly start with a single forward slash (`/`) and contain no protocol prefixes or double slashes.

### Finding SEC-03: Development Placeholder Bypass in Route Guard
* **Affected Files:** `middleware.ts`
* **Threat Mechanism:** A check on `supabaseUrl.includes('placeholder')` was present to assist offline development. In a production build, if environment variables failed to load, this could leave admin views open.
* **Remediation:** Added `process.env.NODE_ENV === 'production'` condition: in production environments, placeholder URLs unconditionally trigger a redirect to `/admin/login`.

---

## 5. SECURITY TEST MATRIX

| Test Scenario | Description | Expected Outcome | Actual Result | Status |
| :--- | :--- | :--- | :--- | :---: |
| **01** | Open Redirect (Absolute URL) | Blocked (`https://evil.com` -> `/admin`) | Blocked | **PASS** |
| **02** | Open Redirect (Protocol-relative) | Blocked (`//evil.com` -> `/admin`) | Blocked | **PASS** |
| **03** | Open Redirect (Backslash bypass) | Blocked (`/\evil.com` -> `/admin`) | Blocked | **PASS** |
| **04** | Valid Local Admin Redirect | Allowed (`/admin/products/new`) | Allowed | **PASS** |
| **05** | JSON-LD Script Breakout | `</script>` converted to `\u003c/script\u003e` | Converted | **PASS** |
| **06** | JSON-LD Tag Delimiter Encoding | `<` converted to `\u003c` | Converted | **PASS** |
| **07** | HTML in Script Context | Neutralized | Neutralized | **PASS** |
| **08** | Input Sanitization (Tags) | Strip tags from text fields | Stripped | **PASS** |
| **09** | Input Sanitization (Legitimate Text) | Preserve clean content | Preserved | **PASS** |
| **10** | Image URL (javascript:) | Blocked | Blocked | **PASS** |
| **11** | Image URL (file://) | Blocked | Blocked | **PASS** |
| **12** | Image URL (Path traversal) | Blocked (`../../private`) | Blocked | **PASS** |
| **13** | Image URL (Valid HTTPS) | Permitted | Permitted | **PASS** |
| **14** | File Upload (> 5MB) | Rejected | Rejected | **PASS** |
| **15** | File Upload (Executable Binary) | Rejected | Rejected | **PASS** |
| **16** | File Upload (MIME mismatch / HTML) | Rejected | Rejected | **PASS** |
| **17** | File Upload (Legitimate WebP) | Permitted | Permitted | **PASS** |
| **18** | Cart Stale Product Purging | Ghost items deleted | Purged | **PASS** |
| **19** | Cart Price Tampering Override | Client price overridden with DB price | Overridden | **PASS** |
| **20** | Cart Title Integrity | Authoritative title restored | Restored | **PASS** |
| **21** | WhatsApp URL Canonical Domain | Enforces `wa.me/91...` | Enforced | **PASS** |
| **22** | WhatsApp Parameter Injection | Encodes `&`, `?`, `#` | Encoded | **PASS** |
| **23** | WhatsApp URI Encoding | Correct percent-encoding | Verified | **PASS** |
| **24** | Secret Scan (Layout) | No `SUPABASE_SERVICE_ROLE_KEY` in browser code | Confirmed | **PASS** |
| **25** | Secret Scan (Middleware) | No hardcoded secrets | Confirmed | **PASS** |
| **26** | Secret Scan (ProductForm) | No service key exposure | Confirmed | **PASS** |
| **27** | .gitignore Integrity | `.env*` files protected | Verified | **PASS** |
| **28** | SQL Injection (`' OR '1'='1`) | Safely handled via DAL | No DB error | **PASS** |
| **29** | SQL Injection (`'; DROP TABLE...`) | Safely handled via DAL | No DB error | **PASS** |
| **30** | Search Injection (`<script>`) | Safely handled via DAL | No DB error | **PASS** |
| **31** | URL-Encoded Injection (`%27%20OR...`) | Safely handled via DAL | No DB error | **PASS** |

---

## 6. PRODUCTION BUILD AUDIT
The production build was executed and passed with **zero errors**:
```text
✓ Compiled successfully
✓ Linting and checking validity of types passed
✓ Generating static pages (31/31) passed
✓ Middleware compiled cleanly (86.2 kB)
```
Admin routes (`/admin`, `/admin/products`, `/admin/categories`) are rendered as dynamic protected routes, while public showroom pages (`/`, `/products/[slug]`, `/collections/[category-slug]`) are statically generated (SSG) for maximum performance and security isolation.
