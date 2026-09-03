import { products } from '../data/products';
import { categories } from '../data/categories';
import { auditCatalogue, validateProduct } from '../lib/catalogue/validation';

console.log('--- STARTING CATALOGUE AUDIT ---');
const report = auditCatalogue(products, categories);

console.log(`Total Products: ${report.totalProducts}`);
console.log(`Published Products: ${report.publishedProducts}`);
console.log(`Featured Count: ${report.featuredCount}`);
console.log(`Priced Garments: ${report.pricedCount}`);
console.log(`Unpriced Garments: ${report.unpricedCount}`);
console.log(`Slug Uniqueness: ${report.slugUniquenessPassed ? 'PASSED' : 'FAILED'}`);
console.log(`Category Integrity: ${report.categoryIntegrityPassed ? 'PASSED' : 'FAILED'}`);

if (report.errors.length > 0) {
  console.error('Validation Errors Detected:', JSON.stringify(report.errors, null, 2));
  process.exit(1);
} else {
  console.log('ALL CATALOGUE AUDIT CHECKS PASSED PERFECTLY!');
  process.exit(0);
}
