import { getProducts, getProductBySlug } from '../lib/data/products';
import { getCategories } from '../lib/data/categories';
import { getSiteSettings } from '../lib/data/settings';
import { validateProduct, validateCategory } from '../lib/catalogue/validation';

console.log('=== RUNNING BACKEND, DATABASE & SECURITY TESTS ===');

let passCount = 0;
function assert(condition: boolean, testName: string) {
  if (!condition) {
    console.error(`FAILED: ${testName}`);
    process.exit(1);
  }
  console.log(`PASSED: ${testName}`);
  passCount++;
}

async function runTests() {
  // 1. DATA ACCESS LAYER RESILIENCE TESTS
  const allProducts = await getProducts();
  assert(Array.isArray(allProducts) && allProducts.length > 0, '1. DAL getProducts returns valid array');

  const featured = await getProducts({ featuredOnly: true });
  assert(featured.every((p) => p.featured), '2. DAL filters featured products correctly');

  const categories = await getCategories();
  assert(categories.length === 5, '3. DAL getCategories returns all 5 trade departments');

  const singleProduct = await getProductBySlug('crimson-banarasi-katan-silk-saree');
  assert(singleProduct !== undefined, '4. DAL getProductBySlug finds verified product');
  assert(singleProduct?.name === 'Crimson Banarasi Katan Silk Saree', '5. Product title matches canonical record');

  const settings = await getSiteSettings();
  assert(settings.businessName === 'BANWARILAL CLOTH HOUSE', '6. DAL getSiteSettings resolves business identity');
  assert(settings.establishedYear === 2003, '7. DAL resolves established year 2003');

  // 2. INPUT VALIDATION & SECURITY TESTS
  const validProduct = validateProduct(
    {
      name: 'Chanderi Silk Dupatta',
      slug: 'chanderi-silk-dupatta',
      categoryId: 'cat-fabrics',
      price: 1200,
      compareAtPrice: 1500,
      availability: 'in_stock',
      displayOrder: 1,
      images: [{ id: '1', productId: 'p1', imageUrl: 'https://test.com/img.jpg', altText: 'test', displayOrder: 1, isPrimary: true }],
    },
    categories
  );
  assert(validProduct.isValid, '8. Valid product passes validation engine');

  // 3. ADVERSARIAL INPUT INJECTIONS
  const negativePriceTest = validateProduct(
    {
      name: 'Bad Price Garment',
      slug: 'bad-price-garment',
      categoryId: 'cat-sarees',
      price: -500, // Invalid negative price
      availability: 'in_stock',
      displayOrder: 1,
      images: [{ id: '1', productId: 'p1', imageUrl: 'https://test.com/img.jpg', altText: 'test', displayOrder: 1, isPrimary: true }],
    },
    categories
  );
  assert(!negativePriceTest.isValid, '9. Engine rejects negative price');

  const invertedDiscountTest = validateProduct(
    {
      name: 'Inverted Discount Garment',
      slug: 'inverted-discount-garment',
      categoryId: 'cat-sarees',
      price: 2000,
      compareAtPrice: 1500, // Invalid: compareAtPrice < price
      availability: 'in_stock',
      displayOrder: 1,
      images: [{ id: '1', productId: 'p1', imageUrl: 'https://test.com/img.jpg', altText: 'test', displayOrder: 1, isPrimary: true }],
    },
    categories
  );
  assert(!invertedDiscountTest.isValid, '10. Engine rejects compareAtPrice lower than selling price');

  const badCategoryTest = validateProduct(
    {
      name: 'Orphan Garment',
      slug: 'orphan-garment',
      categoryId: 'non-existent-category-id',
      availability: 'in_stock',
      displayOrder: 1,
      images: [{ id: '1', productId: 'p1', imageUrl: 'https://test.com/img.jpg', altText: 'test', displayOrder: 1, isPrimary: true }],
    },
    categories
  );
  assert(!badCategoryTest.isValid, '11. Engine rejects orphan product with invalid category foreign key');

  const badSlugTest = validateProduct(
    {
      name: 'Bad Slug Garment',
      slug: 'Bad Slug / With Spaces & Symbols!',
      categoryId: 'cat-sarees',
      availability: 'in_stock',
      displayOrder: 1,
      images: [{ id: '1', productId: 'p1', imageUrl: 'https://test.com/img.jpg', altText: 'test', displayOrder: 1, isPrimary: true }],
    },
    categories
  );
  assert(!badSlugTest.isValid, '12. Engine rejects malformed non-URL-safe slugs');

  console.log(`\nALL ${passCount} BACKEND & SECURITY TESTS PASSED PERFECTLY!`);
}

runTests().catch((err) => {
  console.error('Test runner failure:', err);
  process.exit(1);
});
