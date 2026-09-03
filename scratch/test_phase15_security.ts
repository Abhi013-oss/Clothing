import { safeJsonLd, safeRedirectUrl, sanitizeText } from '../lib/security/sanitize';
import { validateImageUrl, validateUploadFile, validateProduct } from '../lib/catalogue/validation';
import { normalizeWhatsAppNumber, buildWhatsAppUrl, validateAndFilterCartForWhatsApp } from '../lib/whatsapp/generator';
import { getProducts } from '../lib/data/products';
import fs from 'fs';
import path from 'path';

console.log('=== RUNNING PHASE 15 COMPREHENSIVE SECURITY TEST SUITE ===');

let passCount = 0;
function assert(condition: boolean, testName: string) {
  if (!condition) {
    console.error(`FAILED: ${testName}`);
    process.exit(1);
  }
  console.log(`PASSED: ${testName}`);
  passCount++;
}

async function runSecurityTests() {
  // TEST 1: OPEN REDIRECT DEFENSE
  const openRedirect1 = safeRedirectUrl('https://evil.com/phish', '/admin');
  assert(openRedirect1 === '/admin', '1. safeRedirectUrl blocks absolute external protocol URLs');

  const openRedirect2 = safeRedirectUrl('//evil.com/phish', '/admin');
  assert(openRedirect2 === '/admin', '2. safeRedirectUrl blocks protocol-relative URLs (//)');

  const openRedirect3 = safeRedirectUrl('/\\evil.com/phish', '/admin');
  assert(openRedirect3 === '/admin', '3. safeRedirectUrl blocks backslash bypasses (/\\)');

  const safeLocalRedirect = safeRedirectUrl('/admin/products/new', '/admin');
  assert(safeLocalRedirect === '/admin/products/new', '4. safeRedirectUrl allows valid internal relative routes');

  // TEST 2: STORED XSS / SCRIPT-TAG BREAKOUT (JSON-LD)
  const maliciousJson = {
    title: "Silk Saree </script><script>alert('XSS')</script>",
    description: '<img src=x onerror=alert(1)>',
  };
  const sanitizedJsonString = safeJsonLd(maliciousJson);
  assert(!sanitizedJsonString.includes('</script>'), '5. safeJsonLd escapes closing script tags (\\u003c/script\\u003e)');
  assert(sanitizedJsonString.includes('\\u003c/script\\u003e'), '6. safeJsonLd encodes < as \\u003c');
  assert(!sanitizedJsonString.includes('<img'), '7. safeJsonLd neutralizes HTML elements in script context');

  // TEST 3: PLAIN TEXT INPUT SANITIZATION
  const rawXssInput = "<script>alert('hacked')</script>Royal Banarasi <b>Silk</b>";
  const cleanText = sanitizeText(rawXssInput);
  assert(!cleanText.includes('<script>') && !cleanText.includes('<b>'), '8. sanitizeText strips malicious and styling HTML tags');
  assert(cleanText.includes('Royal Banarasi Silk'), '9. sanitizeText preserves legitimate content');

  // TEST 4: IMAGE URL INJECTION & TRAVERSAL
  const jsUrlTest = validateImageUrl("javascript:alert('pwned')");
  assert(!jsUrlTest.isValid, '10. validateImageUrl blocks javascript: pseudo-protocol');

  const fileUrlTest = validateImageUrl('file:///etc/passwd');
  assert(!fileUrlTest.isValid, '11. validateImageUrl blocks file:// local access');

  const traversalTest = validateImageUrl('https://banwarilal.com/uploads/../../private-config.json');
  assert(!traversalTest.isValid, '12. validateImageUrl blocks path traversal sequences');

  const validHttpsUrl = validateImageUrl('https://images.unsplash.com/photo-1610030469983-98e550d6193c');
  assert(validHttpsUrl.isValid, '13. validateImageUrl permits verified HTTPS URLs');

  // TEST 5: FILE UPLOAD SECURITY (MIME & SIZE ENFORCEMENT)
  const oversizedFile = { name: 'huge-image.jpg', size: 10 * 1024 * 1024, type: 'image/jpeg' };
  assert(!validateUploadFile(oversizedFile).isValid, '14. validateUploadFile rejects oversized files (> 5MB)');

  const executableFile = { name: 'malware.exe', size: 5000, type: 'application/x-msdownload' };
  assert(!validateUploadFile(executableFile).isValid, '15. validateUploadFile rejects executable binaries');

  const spoofedHtmlFile = { name: 'shell.jpg', size: 5000, type: 'text/html' };
  assert(!validateUploadFile(spoofedHtmlFile).isValid, '16. validateUploadFile detects MIME-extension mismatch / HTML payload');

  const legitimatePhoto = { name: 'silk-saree.webp', size: 450000, type: 'image/webp' };
  assert(validateUploadFile(legitimatePhoto).isValid, '17. validateUploadFile permits legitimate WebP images within bounds');

  // TEST 6: CART TAMPERING & PRICE RECONCILIATION
  const tamperedCart = [
    {
      productId: 'prod-001',
      productName: 'Attacker Modified Saree',
      price: 1, // Tampered price of 1 Rupee!
      quantity: 2,
    },
    {
      productId: 'non-existent-or-deleted-id',
      productName: 'Ghost Item',
      price: 9999,
      quantity: 1,
    },
  ];

  const { validItems, removedCount } = validateAndFilterCartForWhatsApp(tamperedCart as any);
  assert(removedCount === 1, '18. Cart validator purges non-existent/stale products');
  assert(validItems[0].price === 3850, '19. Cart validator overrides tampered price with authoritative database price');
  assert(validItems[0].productName === 'Crimson Banarasi Katan Silk Saree', '20. Authoritative product title restored');

  // TEST 7: WHATSAPP URL INJECTION & PARAMETER POLLUTION
  const injectionName = 'Gold Kurti&destination=https://phishing.com#token=stolen';
  const rawMessage = `Order: ${injectionName}\nPrice: ₹1500`;
  const waUrl = buildWhatsAppUrl('9876543210', rawMessage);
  assert(waUrl.startsWith('https://wa.me/919876543210?text='), '21. WhatsApp URL enforces canonical wa.me domain and E.164 phone');
  assert(!waUrl.includes('&destination='), '22. Special characters properly encoded, preventing parameter injection');
  assert(waUrl.includes(encodeURIComponent('&destination=')), '23. Ampersand correctly URI-encoded');

  // TEST 8: SECRET LEAK SCAN IN CODEBASE
  const rootDir = path.resolve(__dirname, '..');
  const clientFiles = ['app/layout.tsx', 'middleware.ts', 'components/admin/ProductForm.tsx'];
  for (const f of clientFiles) {
    const code = fs.readFileSync(path.join(rootDir, f), 'utf8');
    assert(!code.includes('SUPABASE_SERVICE_ROLE_KEY'), `24. Verified ${f} does not expose SUPABASE_SERVICE_ROLE_KEY`);
  }

  // TEST 9: GITIGNORE INTEGRITY
  const gitignoreContent = fs.readFileSync(path.join(rootDir, '.gitignore'), 'utf8');
  assert(gitignoreContent.includes('.env'), '25. .gitignore strictly includes .env patterns');

  // TEST 10: SQL / SEARCH INJECTION SIMULATION
  const searchInjectionTerms = ["' OR '1'='1", "'; DROP TABLE products; --", '<script>', '%27%20OR%201=1'];
  for (const term of searchInjectionTerms) {
    const products = await getProducts({ categorySlug: term });
    assert(Array.isArray(products), `26. DAL safely handles injection input: "${term}" without throwing database exceptions`);
  }

  console.log(`\nALL ${passCount} SECURITY TESTS PASSED PERFECTLY!`);
}

runSecurityTests().catch((err) => {
  console.error('Security test runner encountered unexpected failure:', err);
  process.exit(1);
});
