import { StoredCart, StoredCartItem } from '@/types/cart';

const CART_STORAGE_KEY_V2 = 'bch_cart_v2';
const LEGACY_STORAGE_KEY_V1 = 'bch_cart_items_v1';
const CURRENT_VERSION = 1;

/**
 * Loads the stored cart from browser storage with migration and corruption recovery.
 */
export function loadCartFromStorage(): StoredCart {
  if (typeof window === 'undefined') {
    return { version: CURRENT_VERSION, items: [] };
  }

  try {
    // 1. Try loading V2 versioned cart
    const rawV2 = localStorage.getItem(CART_STORAGE_KEY_V2);
    if (rawV2) {
      const parsed = JSON.parse(rawV2);
      if (parsed && typeof parsed === 'object' && Array.isArray(parsed.items)) {
        const sanitizedItems: StoredCartItem[] = [];
        for (const item of parsed.items) {
          if (
            item &&
            typeof item.productId === 'string' &&
            item.productId.trim().length > 0 &&
            typeof item.quantity === 'number' &&
            !isNaN(item.quantity) &&
            item.quantity >= 1
          ) {
            sanitizedItems.push({
              productId: item.productId.trim(),
              quantity: Math.min(Math.floor(item.quantity), 10),
            });
          }
        }
        return {
          version: parsed.version || CURRENT_VERSION,
          items: sanitizedItems,
        };
      }
    }

    // 2. Backward compatibility: Migrate legacy V1 unversioned array if found
    const rawV1 = localStorage.getItem(LEGACY_STORAGE_KEY_V1);
    if (rawV1) {
      const parsedV1 = JSON.parse(rawV1);
      if (Array.isArray(parsedV1)) {
        const migratedItems: StoredCartItem[] = [];
        for (const item of parsedV1) {
          if (item && typeof item.productId === 'string' && typeof item.quantity === 'number') {
            migratedItems.push({
              productId: item.productId.trim(),
              quantity: Math.min(Math.max(Math.floor(item.quantity), 1), 10),
            });
          }
        }
        const migratedCart: StoredCart = { version: CURRENT_VERSION, items: migratedItems };
        saveCartToStorage(migratedCart);
        try {
          localStorage.removeItem(LEGACY_STORAGE_KEY_V1);
        } catch {
          // ignore
        }
        return migratedCart;
      }
    }

    return { version: CURRENT_VERSION, items: [] };
  } catch (err) {
    console.warn('[Cart Storage] Storage corrupted, resetting safely:', err);
    try {
      localStorage.removeItem(CART_STORAGE_KEY_V2);
      localStorage.removeItem(LEGACY_STORAGE_KEY_V1);
    } catch {
      // ignore
    }
    return { version: CURRENT_VERSION, items: [] };
  }
}

/**
 * Persists the validated cart to localStorage.
 */
export function saveCartToStorage(cart: StoredCart): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(CART_STORAGE_KEY_V2, JSON.stringify(cart));
  } catch (err) {
    console.error('[Cart Storage] Failed to write cart to localStorage:', err);
  }
}
