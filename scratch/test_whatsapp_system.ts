import { products } from '../data/products';
import {
  normalizeWhatsAppNumber,
  buildWhatsAppUrl,
  generateGeneralEnquiryMessage,
  generateSingleProductMessage,
  generateCartMessage,
  validateAndFilterCartForWhatsApp,
} from '../lib/whatsapp/generator';
import { CartItem } from '../types/cart';

console.log('=== RUNNING WHATSAPP SYSTEM AUTOMATED TESTS ===');

let passCount = 0;
function assert(condition: boolean, testName: string) {
  if (!condition) {
    console.error(`FAILED: ${testName}`);
    process.exit(1);
  }
  console.log(`PASSED: ${testName}`);
  passCount++;
}

// 1. PHONE NORMALIZATION TESTS
assert(normalizeWhatsAppNumber('') === '', '1. Empty string returns empty string');
assert(normalizeWhatsAppNumber(undefined) === '', '2. Undefined returns empty string');
assert(normalizeWhatsAppNumber('9876543210') === '919876543210', '3. 10-digit Indian number prepends 91');
assert(normalizeWhatsAppNumber('+91 98765-43210') === '919876543210', '4. Strips +, spaces, and dashes');
assert(normalizeWhatsAppNumber('+91 (98765) 43210') === '919876543210', '5. Strips parentheses');
assert(normalizeWhatsAppNumber('12345') === '', '6. Malformed short number (<10 digits) returns empty string');

// 2. URL BUILDER TESTS
const validUrl = buildWhatsAppUrl('9876543210', 'Hello Store');
assert(validUrl.startsWith('https://wa.me/919876543210?text='), '7. Constructs valid wa.me base URL');
assert(validUrl.includes('Hello%20Store'), '8. Encodes spaces as %20');

const missingNumberUrl = buildWhatsAppUrl('', 'Hello');
assert(missingNumberUrl === '', '9. Missing phone number safely returns empty string (never wa.me/undefined)');

// 3. UNICODE & SPECIAL CHARACTERS TEST
const hindiMessage = 'नमस्ते BANWARILAL CLOTH HOUSE, मुझे बनारसी साड़ी & कुर्ता चाहिए।';
const hindiUrl = buildWhatsAppUrl('9876543210', hindiMessage);
assert(hindiUrl.includes('%E0%A4%A8%E0%A4%AE%E0%A4%B8%E0%A5%8D%E0%A4%A4%E0%A5%87'), '10. Hindi characters properly URL-encoded');
assert(!hindiUrl.includes('& '), '11. Ampersand properly escaped to prevent URL query parameter corruption');

// 4. SINGLE PRODUCT MESSAGE TEST
const singleMsg = generateSingleProductMessage(products[0], 'https://banwarilalclothhouse.com');
assert(singleMsg.includes(products[0].name), '12. Single product message contains actual product name');
assert(singleMsg.includes(products[0].slug), '13. Single product message contains canonical slug link');
assert(!singleMsg.includes('undefined') && !singleMsg.includes('null'), '14. No undefined or null tokens in single message');

// 5. MULTI-PRODUCT CART VALIDATION & GENERATION TESTS
const mockCartItems: CartItem[] = [
  {
    productId: products[0].id,
    productName: products[0].name,
    productSlug: products[0].slug,
    thumbnailUrl: '',
    quantity: 2,
  },
  {
    productId: products[1].id,
    productName: products[1].name,
    productSlug: products[1].slug,
    thumbnailUrl: '',
    quantity: 1,
  },
  {
    productId: 'fake-deleted-item-999',
    productName: 'Deleted Kurti',
    productSlug: 'deleted-kurti',
    thumbnailUrl: '',
    quantity: 1,
  },
];

const { validItems, removedCount } = validateAndFilterCartForWhatsApp(mockCartItems, products);
assert(validItems.length === 2, '15. Reconciles valid products from catalog (2 valid)');
assert(removedCount === 1, '16. Purges deleted or nonexistent product from WhatsApp payload');

const cartMsg = generateCartMessage(mockCartItems, 'names_and_qty', products);
assert(cartMsg.includes(products[0].name), '17. Cart message contains real product 1 name');
assert(cartMsg.includes('Quantity: 2'), '18. Cart message formats quantity (Quantity: 2)');
assert(cartMsg.includes(products[1].name), '19. Cart message contains real product 2 name');
assert(!cartMsg.includes('Deleted Kurti'), '20. Stale/deleted product name omitted from final WhatsApp message');

// 6. GENERAL ENQUIRY MESSAGE TEST
const generalMsg = generateGeneralEnquiryMessage();
assert(generalMsg.includes('BANWARILAL CLOTH HOUSE'), '21. General inquiry cites official business entity');
assert(generalMsg.includes('digital showroom'), '22. General message is polite and professional');

console.log(`\nALL ${passCount} WHATSAPP TESTS PASSED WITH 100% SUCCESS!`);
