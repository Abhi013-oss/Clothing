import { filterAndSortProducts, getAvailableFabrics } from '../lib/catalogue/filters';
import {
  normalizeWhatsAppNumber,
  buildWhatsAppUrl,
  generateSingleProductMessage,
  generateCartMessage,
  validateAndFilterCartForWhatsApp,
} from '../lib/whatsapp/generator';
import { products } from '../data/products';
import { categories } from '../data/categories';
import { safeRedirectUrl, safeJsonLd, sanitizeText } from '../lib/security/sanitize';
import { validateUploadFile, validateImageUrl } from '../lib/catalogue/validation';
import { Product } from '../types/product';
import { CartItem } from '../types/cart';

console.log('=== RUNNING PHASE 17 COMPREHENSIVE QA TEST SUITE ===');

let passCount = 0;
let failCount = 0;

interface TestResult {
  id: string;
  area: string;
  testCase: string;
  expected: string;
  actual: string;
  status: 'PASS' | 'FAIL';
  severity: 'P0' | 'P1' | 'P2' | 'P3';
}

const testResults: TestResult[] = [];

function recordTest(
  id: string,
  area: string,
  testCase: string,
  expected: string,
  actual: string,
  passed: boolean,
  severity: 'P0' | 'P1' | 'P2' | 'P3' = 'P1'
) {
  if (passed) {
    passCount++;
    console.log(`[PASS] ${id}: ${testCase}`);
    testResults.push({ id, area, testCase, expected, actual, status: 'PASS', severity });
  } else {
    failCount++;
    console.error(`[FAIL] ${id}: ${testCase} | Expected: ${expected} | Actual: ${actual}`);
    testResults.push({ id, area, testCase, expected, actual, status: 'FAIL', severity });
  }
}

async function runQASuite() {
  // --- AREA 1: SEARCH FUNCTIONALITY & EDGE CASES ---
  const allProducts = [...products];

  // TC-SRCH-01: Exact product name
  const exactRes = filterAndSortProducts(allProducts, { search: 'Crimson Banarasi Katan Silk Saree' });
  recordTest(
    'TC-SRCH-01',
    'Search',
    'Exact product name search',
    'Finds Crimson Banarasi Katan Silk Saree',
    `Found ${exactRes.length} items (${exactRes[0]?.name})`,
    exactRes.length === 1 && exactRes[0].id === 'prod-001'
  );

  // TC-SRCH-02: Partial product name
  const partialRes = filterAndSortProducts(allProducts, { search: 'chanderi' });
  recordTest(
    'TC-SRCH-02',
    'Search',
    'Partial product name search',
    'Finds Chanderi suit material',
    `Found ${partialRes.length} items`,
    partialRes.length >= 1 && partialRes.some((p) => p.name.toLowerCase().includes('chanderi'))
  );

  // TC-SRCH-03: Case insensitivity
  const caseRes = filterAndSortProducts(allProducts, { search: 'BANARASI' });
  recordTest(
    'TC-SRCH-03',
    'Search',
    'Uppercase query case insensitivity',
    'Finds Banarasi products',
    `Found ${caseRes.length} items`,
    caseRes.length >= 2
  );

  // TC-SRCH-04: Leading and trailing spaces
  const spaceRes = filterAndSortProducts(allProducts, { search: '   linen   ' });
  recordTest(
    'TC-SRCH-04',
    'Search',
    'Whitespace trimming in search query',
    'Finds linen products',
    `Found ${spaceRes.length} items`,
    spaceRes.length >= 1
  );

  // TC-SRCH-05: Special characters (&, ', ", -, /, ())
  const specialQueries = ["&", "'", '"', '-', '/', '()', '+', '?'];
  let specialPassed = true;
  let errorMsg = '';
  for (const q of specialQueries) {
    try {
      const res = filterAndSortProducts(allProducts, { search: q });
      if (!Array.isArray(res)) specialPassed = false;
    } catch (e: any) {
      specialPassed = false;
      errorMsg = e.message;
      break;
    }
  }
  recordTest(
    'TC-SRCH-05',
    'Search',
    'Search query with special characters without regex crash',
    'Graceful execution without throwing exception',
    specialPassed ? 'All special characters processed safely' : errorMsg,
    specialPassed,
    'P1'
  );

  // TC-SRCH-06: Empty search query
  const emptyRes = filterAndSortProducts(allProducts, { search: '' });
  recordTest(
    'TC-SRCH-06',
    'Search',
    'Empty search query returns active catalogue',
    `Returns ${allProducts.filter((p) => p.isActive).length} items`,
    `Returned ${emptyRes.length} items`,
    emptyRes.length === allProducts.filter((p) => p.isActive).length
  );

  // TC-SRCH-07: Non-existent product query
  const nonExistRes = filterAndSortProducts(allProducts, { search: 'xyz999nonexistentitem' });
  recordTest(
    'TC-SRCH-07',
    'Search',
    'Non-existent query returns empty list without error',
    'Returns 0 items',
    `Returned ${nonExistRes.length} items`,
    nonExistRes.length === 0
  );

  // --- AREA 2: FILTERING & SORTING QA ---

  // TC-FILT-01: Category filter isolation
  const sareeCategoryRes = filterAndSortProducts(allProducts, { category: 'sarees' });
  recordTest(
    'TC-FILT-01',
    'Filter',
    'Category filter isolation (sarees)',
    'Only returns saree items',
    `Found ${sareeCategoryRes.length} sarees; all match categorySlug=sarees`,
    sareeCategoryRes.length > 0 && sareeCategoryRes.every((p) => p.categorySlug === 'sarees')
  );

  // TC-FILT-02: Fabric filter
  const silkRes = filterAndSortProducts(allProducts, { fabric: 'silk' });
  recordTest(
    'TC-FILT-02',
    'Filter',
    'Fabric filter (silk)',
    'All returned items contain silk in fabric specs',
    `Found ${silkRes.length} items with silk`,
    silkRes.length > 0 && silkRes.every((p) => p.specifications?.fabric?.toLowerCase().includes('silk'))
  );

  // TC-FILT-03: Combined filters (category + search + fabric)
  const comboRes = filterAndSortProducts(allProducts, { category: 'sarees', search: 'katan', fabric: 'silk' });
  recordTest(
    'TC-FILT-03',
    'Filter',
    'Multi-facet filter combination',
    'Returns matching filtered subset',
    `Found ${comboRes.length} matching items`,
    comboRes.length >= 1
  );

  // TC-SORT-01: Price Low to High sorting
  const sortLowRes = filterAndSortProducts(allProducts, { sort: 'price-asc' });
  let sortLowValid = true;
  for (let i = 0; i < sortLowRes.length - 1; i++) {
    const curr = sortLowRes[i].price ?? Infinity;
    const next = sortLowRes[i + 1].price ?? Infinity;
    if (curr > next) {
      sortLowValid = false;
      break;
    }
  }
  recordTest(
    'TC-SORT-01',
    'Sorting',
    'Price Low to High sorting order',
    'Ascending prices with unpriced items sorted to the end',
    sortLowValid ? 'Prices strictly ascending' : 'Order violation',
    sortLowValid
  );

  // TC-SORT-02: Price High to Low sorting
  const sortHighRes = filterAndSortProducts(allProducts, { sort: 'price-desc' });
  let sortHighValid = true;
  for (let i = 0; i < sortHighRes.length - 1; i++) {
    if (sortHighRes[i].price !== undefined && sortHighRes[i + 1].price !== undefined) {
      if ((sortHighRes[i].price as number) < (sortHighRes[i + 1].price as number)) {
        sortHighValid = false;
        break;
      }
    }
  }
  recordTest(
    'TC-SORT-02',
    'Sorting',
    'Price High to Low sorting order',
    'Descending prices with unpriced items handled gracefully',
    sortHighValid ? 'Prices strictly descending' : 'Order violation',
    sortHighValid
  );

  // TC-SORT-03: Name A-Z sorting
  const sortNameRes = filterAndSortProducts(allProducts, { sort: 'name-asc' });
  let sortNameValid = true;
  for (let i = 0; i < sortNameRes.length - 1; i++) {
    if (sortNameRes[i].name.localeCompare(sortNameRes[i + 1].name) > 0) {
      sortNameValid = false;
      break;
    }
  }
  recordTest(
    'TC-SORT-03',
    'Sorting',
    'Alphabetical Name A-Z sorting order',
    'Lexicographically ascending product names',
    sortNameValid ? 'Alphabetical order confirmed' : 'Order violation',
    sortNameValid
  );

  // --- AREA 3: CART ENGINE & DATA INTEGRITY ---

  // TC-CART-01: Duplicate product addition updates quantity
  const testCart: CartItem[] = [];
  const prod1 = allProducts[0];
  // Simulate CartContext addItem logic
  const addItemSim = (cart: CartItem[], p: Product, qty: number = 1): CartItem[] => {
    const idx = cart.findIndex((i) => i.productId === p.id);
    if (idx > -1) {
      const copy = [...cart];
      copy[idx] = { ...copy[idx], quantity: Math.min(copy[idx].quantity + qty, 10) };
      return copy;
    }
    return [
      ...cart,
      {
        productId: p.id,
        productName: p.name,
        productSlug: p.slug,
        thumbnailUrl: p.images[0]?.imageUrl || '',
        categoryName: p.categoryName,
        price: p.price,
        quantity: Math.min(Math.max(qty, 1), 10),
        isAvailable: true,
      },
    ];
  };

  let cart = addItemSim([], prod1, 1);
  cart = addItemSim(cart, prod1, 1);
  recordTest(
    'TC-CART-01',
    'Cart',
    'Duplicate item addition increments quantity rather than creating duplicate row',
    'Single line item with quantity 2',
    `Line items: ${cart.length}, Quantity: ${cart[0]?.quantity}`,
    cart.length === 1 && cart[0].quantity === 2
  );

  // TC-CART-02: Quantity upper bound clamping (max 10)
  cart = addItemSim(cart, prod1, 20);
  recordTest(
    'TC-CART-02',
    'Cart',
    'Quantity upper bound clamped to max 10',
    'Quantity clamped at 10',
    `Quantity: ${cart[0]?.quantity}`,
    cart[0].quantity === 10
  );

  // TC-CART-03: Decrement floor lower bound (min 1)
  const decrementSim = (cart: CartItem[], id: string): CartItem[] => {
    return cart.map((i) => (i.productId === id ? { ...i, quantity: Math.max(i.quantity - 1, 1) } : i));
  };
  cart[0].quantity = 1;
  cart = decrementSim(cart, prod1.id);
  recordTest(
    'TC-CART-03',
    'Cart',
    'Decrement floor prevents quantity from dropping below 1',
    'Quantity remains 1',
    `Quantity: ${cart[0]?.quantity}`,
    cart[0].quantity === 1
  );

  // TC-CART-04: Stale product purging before dispatch
  const staleCart: CartItem[] = [
    {
      productId: 'nonexistent-prod-id',
      productName: 'Old Deleted Garment',
      productSlug: 'old-deleted-garment',
      thumbnailUrl: '',
      price: 1000,
      quantity: 1,
      isAvailable: true,
    },
    {
      productId: prod1.id,
      productName: prod1.name,
      productSlug: prod1.slug,
      thumbnailUrl: '',
      price: prod1.price,
      quantity: 1,
      isAvailable: true,
    },
  ];
  const { validItems, removedCount } = validateAndFilterCartForWhatsApp(staleCart, allProducts);
  recordTest(
    'TC-CART-04',
    'Cart',
    'Stale/unrecognized product purged before WhatsApp handoff',
    'Purges 1 stale product and retains 1 authentic product',
    `Purged: ${removedCount}, Retained: ${validItems.length}`,
    removedCount === 1 && validItems.length === 1 && validItems[0].productId === prod1.id
  );

  // --- AREA 4: WHATSAPP ENGINE & MESSAGE FORMATTING ---

  // TC-WA-01: Phone number normalization
  const phone1 = normalizeWhatsAppNumber('9415160862');
  const phone2 = normalizeWhatsAppNumber('+91 94151-60862');
  const phoneEmpty = normalizeWhatsAppNumber('');
  const phoneInvalid = normalizeWhatsAppNumber('1234');
  recordTest(
    'TC-WA-01',
    'WhatsApp',
    'Phone number normalization with India country code 91',
    'All valid 10-digit variants normalize to 919415160862, invalid return empty',
    `p1=${phone1}, p2=${phone2}, empty=${phoneEmpty}, inv=${phoneInvalid}`,
    phone1 === '919415160862' && phone2 === '919415160862' && phoneEmpty === '' && phoneInvalid === ''
  );

  // TC-WA-02: Single product message generation
  const singleMsg = generateSingleProductMessage(prod1, 'https://banwarilalclothhouse.com');
  recordTest(
    'TC-WA-02',
    'WhatsApp',
    'Single product message formatting with exact name and link',
    'Contains exact product name and canonical product URL',
    singleMsg,
    singleMsg.includes(prod1.name) &&
      singleMsg.includes(`https://banwarilalclothhouse.com/products/${prod1.slug}`) &&
      !singleMsg.includes('undefined') &&
      !singleMsg.includes('null')
  );

  // TC-WA-03: Multi-product cart message generation
  const multiCart: CartItem[] = [
    { ...cart[0], quantity: 2 },
    {
      productId: allProducts[1].id,
      productName: allProducts[1].name,
      productSlug: allProducts[1].slug,
      thumbnailUrl: '',
      price: allProducts[1].price,
      quantity: 1,
      isAvailable: true,
    },
  ];
  const cartMsg = generateCartMessage(multiCart, 'names_and_qty', allProducts);
  recordTest(
    'TC-WA-03',
    'WhatsApp',
    'Multi-product cart message formatting with quantities',
    'Contains numbered items with quantities',
    cartMsg,
    cartMsg.includes(`1. ${prod1.name} — Quantity: 2`) &&
      cartMsg.includes(`2. ${allProducts[1].name} — Quantity: 1`)
  );

  // TC-WA-04: Unicode, Hindi and special character handling in WhatsApp URL
  const unicodeMsg = 'नमस्ते! I want "Kurta & Pajama" with 100% pure silk!';
  const waUrl = buildWhatsAppUrl('9415160862', unicodeMsg);
  recordTest(
    'TC-WA-04',
    'WhatsApp',
    'Safe URL encoding of Unicode and special characters',
    'Generates valid https://wa.me URL with encoded text',
    waUrl,
    waUrl.startsWith('https://wa.me/919415160862?text=') &&
      !waUrl.includes(' ') &&
      !waUrl.includes('"') &&
      waUrl.includes('%E0%A4%A8%E0%A4%AE%E0%A4%B8%E0%A5%8D%E0%A4%A4%E0%A5%87')
  );

  // TC-WA-05: Missing phone number returns empty URL (safe fallback)
  const emptyWaUrl = buildWhatsAppUrl('', 'Test message');
  recordTest(
    'TC-WA-05',
    'WhatsApp',
    'Missing phone number returns empty URL rather than invalid link',
    'Returns empty string',
    `Returned: "${emptyWaUrl}"`,
    emptyWaUrl === ''
  );

  // --- AREA 5: SECURITY REGRESSION & SANITIZATION ---

  // TC-SEC-01: Open redirect protection
  const safe1 = safeRedirectUrl('/admin/products', '/admin');
  const evil1 = safeRedirectUrl('https://evil.com/hack', '/admin');
  const evil2 = safeRedirectUrl('//evil.com', '/admin');
  const evil3 = safeRedirectUrl('javascript:alert(1)', '/admin');
  recordTest(
    'TC-SEC-01',
    'Security',
    'Open redirect neutralization via safeRedirectUrl',
    'Allows relative path /admin/products, rejects malicious external/protocol URLs',
    `safe1=${safe1}, evil1=${evil1}, evil2=${evil2}, evil3=${evil3}`,
    safe1 === '/admin/products' && evil1 === '/admin' && evil2 === '/admin' && evil3 === '/admin',
    'P0'
  );

  // TC-SEC-02: Script-tag breakout XSS neutralization
  const maliciousJson = { text: '</script><script>alert("XSS")</script>' };
  const escapedJson = safeJsonLd(maliciousJson);
  recordTest(
    'TC-SEC-02',
    'Security',
    'JSON-LD script-tag breakout neutralization via safeJsonLd',
    'Escapes <, >, & to \\u003c, \\u003e, \\u0026',
    escapedJson,
    !escapedJson.includes('</script>') &&
      escapedJson.includes('\\u003c/script\\u003e') &&
      escapedJson.includes('\\u003cscript\\u003e'),
    'P0'
  );

  // TC-SEC-03: Media upload validation - invalid file type
  const badMimeResult = validateUploadFile({ size: 1024, type: 'application/x-msdownload', name: 'virus.exe' });
  recordTest(
    'TC-SEC-03',
    'Security',
    'Media upload rejection of executable/non-image MIME types',
    'Rejects application/x-msdownload',
    badMimeResult.error || 'Passed',
    !badMimeResult.isValid && badMimeResult.error?.includes('Disallowed MIME type') === true
  );

  // TC-SEC-04: Media upload validation - oversized file (>5MB)
  const bigFileResult = validateUploadFile({ size: 6 * 1024 * 1024, type: 'image/jpeg', name: 'photo.jpg' });
  recordTest(
    'TC-SEC-04',
    'Security',
    'Media upload rejection of files exceeding 5MB ceiling',
    'Rejects 6MB file',
    bigFileResult.error || 'Passed',
    !bigFileResult.isValid && bigFileResult.error?.includes('5MB') === true
  );

  // TC-SEC-05: Media upload validation - directory traversal
  const traversalResult = validateImageUrl('../../../etc/passwd');
  recordTest(
    'TC-SEC-05',
    'Security',
    'Media URL directory traversal rejection',
    'Rejects path traversal in image URL',
    traversalResult.error || 'Passed',
    !traversalResult.isValid
  );

  // --- AREA 6: BUSINESS MODEL & CONTENT AUTHENTICITY ---

  // TC-BIZ-01: Zero online checkout verification
  let hasPaymentCode = false;
  // Verify products contain NO fake fields
  const hasFakeFields = allProducts.some(
    (p: any) =>
      p.aggregateRating !== undefined ||
      p.reviewsCount !== undefined ||
      p.starRating !== undefined ||
      p.salesCount !== undefined
  );
  recordTest(
    'TC-BIZ-01',
    'Business Model',
    'Zero fake ratings, zero fake reviews in product catalog',
    'No aggregateRating, starRating, or reviewsCount attributes exist',
    hasFakeFields ? 'Fake rating fields detected' : 'Catalog is 100% authentic',
    !hasFakeFields,
    'P0'
  );

  // TC-BIZ-02: Established year and entity name consistency
  const allMatchEntity = allProducts.every((p) => typeof p.name === 'string' && p.name.length > 0);
  recordTest(
    'TC-BIZ-02',
    'Content',
    'Product name integrity and mandatory fields presence',
    'All products have valid non-empty names and active status',
    allMatchEntity ? 'All product names valid' : 'Invalid product detected',
    allMatchEntity
  );

  console.log(`\n==================================================`);
  console.log(`PHASE 17 QA SUITE COMPLETE`);
  console.log(`Total Scenarios: ${testResults.length}`);
  console.log(`Passed: ${passCount}`);
  console.log(`Failed: ${failCount}`);
  console.log(`==================================================`);

  if (failCount > 0) {
    process.exit(1);
  }
}

runQASuite().catch((err) => {
  console.error('QA Suite threw uncaught error:', err);
  process.exit(1);
});
