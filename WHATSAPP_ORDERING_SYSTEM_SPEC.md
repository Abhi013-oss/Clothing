# BANWARILAL CLOTH HOUSE — WHATSAPP ORDERING SYSTEM SPECIFICATION

> **CANONICAL WHATSAPP DISPATCH & ORDER HANDOFF SPECIFICATION — PHASE 13**  
> **Brand Entity:** BANWARILAL CLOTH HOUSE (Established 2003, Chilbila, Pratapgarh)  
> **Core Concept:** Consultation & Inquiry Bridge (Zero Online Payment / Checkout)  
> **Status:** Authoritative Architectural Specification

---

## 1. SYSTEM ARCHITECTURAL OVERVIEW

```
┌─────────────────────────────────────────────────────────────────────────┐
│                      CENTRALIZED WHATSAPP SERVICE                       │
│                                                                         │
│   [ ProductActions ]        [ Cart Page ]         [ Cart Drawer ]       │
│   (Single Product)         (Multi-Product)       (Multi-Product)        │
│           │                       │                     │               │
│           └───────────────────────┼─────────────────────┘               │
│                                   ▼                                     │
│                 validateAndFilterCartForWhatsApp()                      │
│                 (Reconciles against authoritativeProducts)              │
│                                   │                                     │
│                                   ▼                                     │
│                    generateWhatsAppMessage()                            │
│                 (Formats pure, human-readable text)                     │
│                                   │                                     │
│                                   ▼                                     │
│                   normalizeWhatsAppNumber()                             │
│                 (Strips symbols, prepends 91 for IN)                    │
│                                   │                                     │
│                                   ▼                                     │
│                      buildWhatsAppUrl()                                 │
│                 (Safe encodeURIComponent payload)                       │
│                                   │                                     │
│                    ┌──────────────┴──────────────┐                      │
│                    ▼                             ▼                      │
│            Valid Phone Number            Missing / Invalid              │
│                    │                             │                      │
│                    ▼                             ▼                      │
│           https://wa.me/[Phone]           Store Phone /                 │
│                                          Chilbila Fallback              │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 2. BUSINESS CONFIGURATION SOURCE
The WhatsApp destination is strictly centralized in `config/site.ts`:
```typescript
siteConfig.contact.whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ''
```
* **No Hardcoded Numbers:** Individual components never hardcode phone strings.
* **Safe Fallback:** If `whatsappNumber` is unset or invalid, the UI gracefully renders a direct store call prompt (`tel:${siteConfig.contact.primaryPhone}`) and in-person Chilbila showroom direction. It **never** renders `https://wa.me/undefined` or `wa.me/null`.

---

## 3. PHONE NUMBER NORMALIZATION RULES
Implemented in `normalizeWhatsAppNumber()`:
1. Strips all non-digit characters (`+`, spaces, hyphens, parentheses, periods).
2. If exactly 10 digits (standard Indian domestic mobile), prepends India country code `91`.
3. If between 10 and 15 digits (standard E.164 length), preserves the numeric string.
4. If under 10 digits or empty, returns an empty string `''`.

---

## 4. MESSAGE FORMATS & PROTOCOLS

### Single Product Message
```text
Hello BANWARILAL CLOTH HOUSE,

I am interested in this garment from your collection:

• Product: Crimson Banarasi Katan Silk Saree
• Catalogue Link: https://banwarilalclothhouse.com/products/crimson-banarasi-katan-silk-saree

Please confirm availability, price, and further details.
Thank you!
```

### Multi-Product Selection Message (Quantity-Aware)
```text
Hello BANWARILAL CLOTH HOUSE,

I am interested in these products from your collection:

1. Crimson Banarasi Katan Silk Saree — Quantity: 2
2. Chanderi Cotton Unstitched Suit Material — Quantity: 1

Please confirm availability, sizing, and further details.
Thank you!
```

### General Showroom Enquiry
```text
Hello BANWARILAL CLOTH HOUSE,

I am visiting your digital showroom and would like to inquire about your collection, custom sizing, and store timings.

Please share further details.
Thank you!
```

---

## 5. VALIDATION & STALE PRODUCT RECONCILIATION
* Before constructing the multi-product message, `validateAndFilterCartForWhatsApp()` reconciles every item against the authoritative product catalog (`authoritativeProducts`).
* Deactivated garments (`isActive === false`) or out-of-stock items are automatically excluded from the message payload.
* Real product names are extracted directly from the authoritative record, ensuring that stale client-side names or tampered strings cannot corrupt merchant communication.

---

## 6. ACCESSIBILITY, PRIVACY & PERFORMANCE
* **Zero PII Collection:** The website collects no user names, emails, or phone numbers. Communication is initiated directly on WhatsApp by the customer.
* **Cart Retention:** Opening WhatsApp does **not** clear the user's cart, allowing customers to return to the site if they wish to adjust their selection.
* **Double-Click Protection:** Dispatch triggers prevent repeated rapid link generation.
* **Accessibility:** All triggers use semantic `<a>` tags with `rel="noopener noreferrer"`, explicit `aria-label` text, and visible focus rings.
