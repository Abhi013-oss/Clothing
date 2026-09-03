import { CartItem } from '@/types/cart';
import { Product } from '@/types/product';
import { products as defaultAuthoritativeCatalog } from '@/data/products';

export type WhatsAppMessageRequest =
  | { type: 'general' }
  | { type: 'single'; product: Product; baseUrl?: string }
  | { type: 'cart'; items: CartItem[]; mode?: 'names_only' | 'names_and_qty' };

/**
 * Normalizes phone numbers for WhatsApp URL construction.
 * Strips formatting characters, adds India country code (91) for 10-digit numbers,
 * and validates minimum phone length.
 */
export function normalizeWhatsAppNumber(rawNumber?: string): string {
  if (!rawNumber) return '';
  // Remove all non-numeric characters (+, spaces, hyphens, parentheses, etc.)
  const digits = rawNumber.replace(/\D/g, '');
  if (!digits) return '';

  // If 10 digits, default to India country code 91
  if (digits.length === 10) {
    return `91${digits}`;
  }

  // Standard international phone numbers are between 10 and 15 digits
  if (digits.length >= 10 && digits.length <= 15) {
    return digits;
  }

  return '';
}

/**
 * Validates and reconciles cart items against authoritative product records.
 * Purges deleted, hidden, or out-of-stock items before WhatsApp dispatch.
 */
export function validateAndFilterCartForWhatsApp(
  items: CartItem[],
  authoritativeCatalog: Product[] = defaultAuthoritativeCatalog
): { validItems: CartItem[]; removedCount: number } {
  if (!items || items.length === 0) {
    return { validItems: [], removedCount: 0 };
  }

  const validItems: CartItem[] = [];
  let removedCount = 0;

  for (const item of items) {
    const realProduct = authoritativeCatalog.find(
      (p) => p.id === item.productId && p.isActive
    );

    if (!realProduct || realProduct.availability === 'out_of_stock') {
      removedCount++;
      continue;
    }

    validItems.push({
      ...item,
      productName: realProduct.name, // Guarantee authoritative real name
      price: realProduct.price,
    });
  }

  return { validItems, removedCount };
}

/**
 * Generates a general enquiry message for showroom visitors.
 */
export function generateGeneralEnquiryMessage(): string {
  return [
    'Hello BANWARILAL CLOTH HOUSE,',
    '',
    'I am visiting your digital showroom and would like to inquire about your collection, custom sizing, and store timings.',
    '',
    'Please share further details.',
    'Thank you!',
  ].join('\n');
}

/**
 * Generates a direct single-product enquiry message.
 */
export function generateSingleProductMessage(product: Product, baseUrl: string = ''): string {
  const safeName = (product.name || 'Selected Garment').trim();
  const productUrl = baseUrl
    ? `${baseUrl.replace(/\/$/, '')}/products/${product.slug}`
    : `/products/${product.slug}`;

  return [
    'Hello BANWARILAL CLOTH HOUSE,',
    '',
    'I am interested in this garment from your collection:',
    '',
    `• Product: ${safeName}`,
    `• Catalogue Link: ${productUrl}`,
    '',
    'Please confirm availability, price, and further details.',
    'Thank you!',
  ].join('\n');
}

/**
 * Generates a multi-product cart enquiry message with validated item names and quantities.
 */
export function generateCartMessage(
  items: CartItem[],
  mode: 'names_only' | 'names_and_qty' = 'names_and_qty',
  authoritativeCatalog: Product[] = defaultAuthoritativeCatalog
): string {
  const { validItems } = validateAndFilterCartForWhatsApp(items, authoritativeCatalog);

  if (validItems.length === 0) {
    return generateGeneralEnquiryMessage();
  }

  const listLines = validItems.map((item, index) => {
    const cleanName = (item.productName || 'Curated Garment').trim();
    if (mode === 'names_and_qty' && item.quantity >= 1) {
      return `${index + 1}. ${cleanName} — Quantity: ${item.quantity}`;
    }
    return `${index + 1}. ${cleanName}`;
  });

  return [
    'Hello BANWARILAL CLOTH HOUSE,',
    '',
    'I am interested in these products from your collection:',
    '',
    ...listLines,
    '',
    'Please confirm availability, sizing, and further details.',
    'Thank you!',
  ].join('\n');
}

/**
 * Unified WhatsApp message generator supporting all message request types.
 */
export function generateWhatsAppMessage(request: WhatsAppMessageRequest): string {
  switch (request.type) {
    case 'general':
      return generateGeneralEnquiryMessage();
    case 'single':
      return generateSingleProductMessage(request.product, request.baseUrl);
    case 'cart':
      return generateCartMessage(request.items, request.mode || 'names_and_qty');
    default:
      return generateGeneralEnquiryMessage();
  }
}

/**
 * Constructs a fully encoded and safe WhatsApp link (wa.me).
 * Returns empty string if the phone number is invalid or missing.
 */
export function buildWhatsAppUrl(phoneNumber: string, message: string): string {
  const normalizedPhone = normalizeWhatsAppNumber(phoneNumber);
  if (!normalizedPhone) return '';
  const encodedText = encodeURIComponent(message);
  return `https://wa.me/${normalizedPhone}?text=${encodedText}`;
}

/**
 * Lightweight privacy-safe analytics hook for WhatsApp dispatch tracking.
 */
export function trackWhatsAppDispatch(event: {
  source: 'product' | 'cart' | 'navbar' | 'contact' | 'home';
  itemCount?: number;
  productId?: string;
}): void {
  if (typeof window !== 'undefined') {
    // Development audit log; connects to Google Analytics/Plausible if configured
    if (process.env.NODE_ENV === 'development') {
      console.log('[WhatsApp Dispatch Event]', {
        timestamp: new Date().toISOString(),
        ...event,
      });
    }
  }
}
