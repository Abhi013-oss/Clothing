import { products } from '../data/products';
import { CartItem, StoredCart } from '../types/cart';

console.log('=== RUNNING CART SYSTEM AUTOMATED TESTS ===');

let passCount = 0;
function assert(condition: boolean, testName: string) {
  if (!condition) {
    console.error(`FAILED: ${testName}`);
    process.exit(1);
  }
  console.log(`PASSED: ${testName}`);
  passCount++;
}

// Mock In-Memory Store
let items: CartItem[] = [];

function addItem(product: typeof products[0], quantity = 1) {
  const existing = items.find((i) => i.productId === product.id);
  if (existing) {
    existing.quantity = Math.min(existing.quantity + quantity, 10);
  } else {
    items.push({
      productId: product.id,
      productName: product.name,
      productSlug: product.slug,
      thumbnailUrl: product.images[0]?.imageUrl || '',
      price: product.price,
      quantity: Math.min(Math.max(quantity, 1), 10),
    });
  }
}

function updateQuantity(productId: string, quantity: number) {
  if (quantity <= 0) {
    items = items.filter((i) => i.productId !== productId);
  } else {
    const item = items.find((i) => i.productId === productId);
    if (item) item.quantity = Math.min(quantity, 10);
  }
}

function decrementQuantity(productId: string) {
  const item = items.find((i) => i.productId === productId);
  if (item) {
    item.quantity = Math.max(item.quantity - 1, 1); // Invariant: Never below 1
  }
}

function removeItem(productId: string) {
  items = items.filter((i) => i.productId !== productId);
}

function clearCart() {
  items = [];
}

function getTotalCount(): number {
  return items.reduce((sum, i) => sum + i.quantity, 0);
}

function getSubtotal(): number | null {
  if (items.length === 0) return 0;
  let sum = 0;
  for (const item of items) {
    if (item.price === undefined || item.price === null) return null;
    sum += item.price * item.quantity;
  }
  return sum;
}

// TEST 1: Add First Item
addItem(products[0], 1);
assert(items.length === 1, '1. Adding product creates 1 line item');
assert(items[0].quantity === 1, '2. Initial quantity is 1');
assert(getTotalCount() === 1, '3. Total count is 1');

// TEST 2: Add Same Product Again (No duplicate line, increments quantity)
addItem(products[0], 2);
assert(items.length === 1, '4. Adding same product does not duplicate line item');
assert(items[0].quantity === 3, '5. Quantity increments to 3');
assert(getTotalCount() === 3, '6. Total count updates to 3');

// TEST 3: Add Second Product (Priced)
addItem(products[1], 1);
assert(items.length === 2, '7. Adding different product creates second line');
assert(getTotalCount() === 4, '8. Total count across distinct lines is 4');

// TEST 4: Subtotal Calculation
const expectedSubtotal = (products[0].price || 0) * 3 + (products[1].price || 0) * 1;
assert(getSubtotal() === expectedSubtotal, `9. Subtotal matches expected price (${expectedSubtotal})`);

// TEST 5: Add Unpriced Product (e.g. prod-004)
addItem(products[3], 1); // products[3] has undefined price
assert(getSubtotal() === null, '10. Subtotal returns null when an unpriced garment is present');

// TEST 6: Decrement Invariant (Cannot drop below 1)
const item3 = items.find((i) => i.productId === products[3].id);
assert(item3?.quantity === 1, '11. Item 3 quantity is 1');
decrementQuantity(products[3].id);
assert(item3?.quantity === 1, '12. Decrementing at quantity 1 keeps quantity at 1 (invariant preserved)');

// TEST 7: Remove Item
removeItem(products[3].id);
assert(items.length === 2, '13. Removing item decreases line count');
assert(getSubtotal() === expectedSubtotal, '14. Subtotal recalculates correctly after removal');

// TEST 8: Clear Cart
clearCart();
assert(items.length === 0, '15. Clear cart empties all lines');
assert(getTotalCount() === 0, '16. Total count resets to 0');
assert(getSubtotal() === 0, '17. Subtotal resets to 0');

// TEST 9: StoredCart Schema & Parsing
const mockStored: StoredCart = {
  version: 1,
  items: [
    { productId: products[0].id, quantity: 2 },
    { productId: 'deleted-product-999', quantity: 1 }, // Stale ID
  ],
};
const reconciled = mockStored.items
  .map((st) => {
    const real = products.find((p) => p.id === st.productId && p.isActive);
    return real ? { productId: real.id, quantity: st.quantity } : null;
  })
  .filter(Boolean);

assert(reconciled.length === 1, '18. Stale/deleted product ID was safely purged during reconciliation');
assert(reconciled[0]?.productId === products[0].id, '19. Valid product was preserved');

console.log(`\nALL ${passCount} AUTOMATED TESTS COMPLETED WITH 100% SUCCESS!`);
