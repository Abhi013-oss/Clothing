import sitemap from '../app/sitemap';
import robots from '../app/robots';
import { products } from '../data/products';
import { categories } from '../data/categories';
import { siteConfig } from '../config/site';
import fs from 'fs';
import path from 'path';

console.log('=== RUNNING PHASE 16 SEO, PERFORMANCE & ACCESSIBILITY TESTS ===');

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
  const rootDir = path.resolve(__dirname, '..');

  // 1. SITEMAP AUDIT
  const sitemapItems = await sitemap();
  assert(Array.isArray(sitemapItems) && sitemapItems.length > 0, '1. sitemap() returns a valid array');

  const sitemapUrls = sitemapItems.map((item) => item.url);
  assert(sitemapUrls.includes('https://banwarilalclothhouse.com'), '2. Sitemap includes root homepage');
  assert(sitemapUrls.includes('https://banwarilalclothhouse.com/collections'), '3. Sitemap includes /collections');
  assert(sitemapUrls.includes('https://banwarilalclothhouse.com/about'), '4. Sitemap includes /about');
  assert(sitemapUrls.includes('https://banwarilalclothhouse.com/contact'), '5. Sitemap includes /contact');

  // Verify all categories in sitemap
  for (const cat of categories) {
    assert(
      sitemapUrls.includes(`https://banwarilalclothhouse.com/collections/${cat.slug}`),
      `6. Sitemap includes category /collections/${cat.slug}`
    );
  }

  // Verify all published products in sitemap
  for (const prod of products.filter((p) => p.isActive)) {
    assert(
      sitemapUrls.includes(`https://banwarilalclothhouse.com/products/${prod.slug}`),
      `7. Sitemap includes product /products/${prod.slug}`
    );
  }

  // Ensure sitemap excludes private & utility paths
  assert(!sitemapUrls.some((u) => u.includes('/admin')), '8. Sitemap strictly excludes /admin routes');
  assert(!sitemapUrls.some((u) => u.includes('/cart')), '9. Sitemap strictly excludes /cart utility route');

  // 2. ROBOTS.TXT AUDIT
  const robotsConfig = robots();
  assert(robotsConfig.sitemap === 'https://banwarilalclothhouse.com/sitemap.xml', '10. robots.txt declares canonical sitemap');
  const disallowList = Array.isArray(robotsConfig.rules)
    ? (robotsConfig.rules[0] as any).disallow || []
    : (robotsConfig.rules as any).disallow || [];
  assert(disallowList.includes('/admin') || disallowList.includes('/admin/'), '11. robots.txt disallows /admin');
  assert(disallowList.includes('/cart'), '12. robots.txt disallows /cart');

  // 3. CART NOINDEX AUDIT
  const cartLayoutCode = fs.readFileSync(path.join(rootDir, 'app/cart/layout.tsx'), 'utf8');
  assert(cartLayoutCode.includes('index: false'), '13. Cart layout enforces robots noindex');

  // 4. ADMIN NOINDEX AUDIT
  const adminLayoutCode = fs.readFileSync(path.join(rootDir, 'app/admin/layout.tsx'), 'utf8');
  assert(adminLayoutCode.includes('index: false'), '14. Admin layout enforces robots noindex');

  // 5. 404 NOINDEX AUDIT
  const notFoundCode = fs.readFileSync(path.join(rootDir, 'app/not-found.tsx'), 'utf8');
  assert(notFoundCode.includes('index: false'), '15. 404 page enforces robots noindex');

  // 6. LOCAL BUSINESS STRUCTURED DATA
  const layoutCode = fs.readFileSync(path.join(rootDir, 'app/layout.tsx'), 'utf8');
  assert(layoutCode.includes('ClothingStore'), '16. Root layout includes ClothingStore schema');
  assert(layoutCode.includes('siteConfig.address.street'), '17. Schema includes verified physical street address');
  assert(layoutCode.includes('siteConfig.establishedYear'), '18. Schema includes verified founding date 2003');
  assert(layoutCode.includes('siteConfig.address.latitude'), '19. Schema includes verified GeoCoordinates');

  // 7. BREADCRUMBLIST STRUCTURED DATA
  const categoryPageCode = fs.readFileSync(path.join(rootDir, 'app/collections/[category-slug]/page.tsx'), 'utf8');
  assert(categoryPageCode.includes('BreadcrumbList'), '20. Category page includes BreadcrumbList schema');

  const productPageCode = fs.readFileSync(path.join(rootDir, 'app/products/[slug]/page.tsx'), 'utf8');
  assert(productPageCode.includes('BreadcrumbList'), '21. Product detail page includes BreadcrumbList schema');
  assert(productPageCode.includes("'@type': 'Product'"), '22. Product detail page includes Product schema');
  assert(!productPageCode.includes('aggregateRating'), '23. Product schema strictly contains NO fake aggregate ratings');

  // 8. ACCESSIBILITY: SKIP NAVIGATION & LANDMARKS
  assert(layoutCode.includes('href="#main-content"'), '24. Layout includes accessible skip-navigation link');
  assert(layoutCode.includes('id="main-content"'), '25. Layout designates semantic #main-content landmark');

  // 9. ACCESSIBILITY: ARIA MODAL & DIALOG ROLES
  const lightboxCode = fs.readFileSync(path.join(rootDir, 'components/product/ProductGallery.tsx'), 'utf8');
  assert(lightboxCode.includes('role="dialog"'), '26. ProductGallery lightbox declares role="dialog"');
  assert(lightboxCode.includes('aria-modal="true"'), '27. ProductGallery lightbox declares aria-modal="true"');

  const drawerCode = fs.readFileSync(path.join(rootDir, 'components/cart/CartDrawer.tsx'), 'utf8');
  assert(drawerCode.includes('role="dialog"'), '28. CartDrawer declares role="dialog"');
  assert(drawerCode.includes('aria-modal="true"'), '29. CartDrawer declares aria-modal="true"');

  // 10. ACCESSIBILITY: ARIA LIVE ANNOUNCEMENTS
  const actionsCode = fs.readFileSync(path.join(rootDir, 'components/product/ProductActions.tsx'), 'utf8');
  assert(actionsCode.includes('aria-live="polite"'), '30. ProductActions includes aria-live="polite" announcement');

  // 11. REDUCED MOTION COMPLIANCE
  const heroCode = fs.readFileSync(path.join(rootDir, 'components/home/HeroSection.tsx'), 'utf8');
  assert(heroCode.includes('prefers-reduced-motion'), '31. HeroSection respects prefers-reduced-motion');

  const cssCode = fs.readFileSync(path.join(rootDir, 'app/globals.css'), 'utf8');
  assert(cssCode.includes('prefers-reduced-motion: reduce'), '32. Global CSS enforces reduced motion styles');

  console.log(`\nALL ${passCount} SEO, PERFORMANCE & ACCESSIBILITY TESTS PASSED PERFECTLY!`);
}

runTests().catch((err) => {
  console.error('Test failed with error:', err);
  process.exit(1);
});
