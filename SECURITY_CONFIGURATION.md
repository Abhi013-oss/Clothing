# BANWARILAL CLOTH HOUSE — SECURITY CONFIGURATION REFERENCE

> **CANONICAL SECURITY CONFIGURATION & DEPLOYMENT GUIDE — PHASE 15**  
> **Brand Entity:** BANWARILAL CLOTH HOUSE (Established 2003, Chilbila, Pratapgarh)  
> **Status:** Authoritative Configuration Guide

---

## 1. ENVIRONMENT VARIABLES MATRIX

| Variable Name | Classification | Environment | Description |
| :--- | :---: | :---: | :--- |
| `NEXT_PUBLIC_SUPABASE_URL` | Public / Client | All | Base API endpoint for the Supabase project. Safe for browser exposure. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public / Client | All | Supabase anonymous API key. Bound by Row Level Security (RLS) rules. |
| `SUPABASE_SERVICE_ROLE_KEY` | **Confidential / Server-Only** | Production | Privileged administrative key. **NEVER** expose to client or prefix with `NEXT_PUBLIC_`. |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Public / Client | All | Official phone number (e.g. `919876543210`) receiving customer orders. |
| `NEXT_PUBLIC_PHONE_NUMBER` | Public / Client | All | Physical store calling phone line in Chilbila, Pratapgarh. |

---

## 2. PRODUCTION DEPLOYMENT SECURITY CHECKLIST

### Pre-Deployment
- [x] Ensure `.env.local` and sensitive credentials are in `.gitignore`.
- [x] Run `npm run build` to confirm TypeScript validation and static generation passes.
- [x] Verify `SUPABASE_SERVICE_ROLE_KEY` is not present in any client bundle or source file.
- [x] Execute `scratch/test_phase15_security.ts` to ensure all 31 security tests pass.

### Production Hosting (Vercel / Cloudflare / Self-Hosted)
- [ ] Configure custom domain with automatic SSL/TLS certificate (HTTPS enforced).
- [ ] Provision environment variables directly in hosting console (never in repository).
- [ ] Verify HTTP response headers include CSP, HSTS, X-Content-Type-Options, and X-Frame-Options.
- [ ] Confirm `/admin` responds with 307/308 redirect to `/admin/login` for unauthenticated visitors.
- [ ] Confirm search crawlers respect `/robots.txt` disallowing `/admin/`.

---

## 3. SUPABASE ROW LEVEL SECURITY (RLS) POLICIES

To apply the production RLS policies, execute `supabase/migrations/20260903000000_phase14_backend_schema.sql` in the Supabase SQL editor:
```sql
-- Public Read for Active Products
CREATE POLICY "Public can view active products"
ON public.products FOR SELECT
USING (is_active = true);

-- Admin Full Access
CREATE POLICY "Admins can manage products"
ON public.products FOR ALL
USING (public.is_admin() OR auth.role() = 'service_role')
WITH CHECK (public.is_admin() OR auth.role() = 'service_role');
```

---

## 4. STORAGE BUCKET POLICIES (`product-images`)
* **Read Access:** Public `SELECT` allowed for all users.
* **Write / Mutate Access:** `INSERT`, `UPDATE`, and `DELETE` strictly restricted to authenticated users with `public.is_admin() = true` or `service_role`.
* **MIME Constraints:** Restricted to `image/jpeg`, `image/png`, `image/webp`, `image/avif`.
