import { Product, ProductImage, AvailabilityStatus } from '@/types/product';
import { Category } from '@/types/category';
import { validateProduct, ValidationError } from './validation';

export interface RawProductImportRow {
  name: string;
  categorySlug: string;
  description: string;
  price?: string | number;
  compareAtPrice?: string | number;
  fabric?: string;
  color?: string;
  sizes?: string; // e.g. "M, L, XL"
  patternDetails?: string;
  careInstructions?: string;
  imageUrl?: string;
  availability?: string;
  featured?: string | boolean;
  displayOrder?: string | number;
}

export interface ImportPreviewResult {
  totalRows: number;
  validRowsCount: number;
  invalidRowsCount: number;
  validProducts: Product[];
  rowErrors: { rowNumber: number; productName: string; errors: ValidationError[] }[];
}

export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Parses and validates raw product records (from CSV, JSON, or external CMS).
 * Supports a dry-run preview to prevent partial or corrupted insertions.
 */
export function previewBulkImport(
  rawRows: RawProductImportRow[],
  existingCategories: Category[] = [],
  existingProducts: Product[] = []
): ImportPreviewResult {
  const existingSlugs = new Set(existingProducts.map((p) => p.slug));
  const validProducts: Product[] = [];
  const rowErrors: { rowNumber: number; productName: string; errors: ValidationError[] }[] = [];

  rawRows.forEach((row, index) => {
    const rowNum = index + 1;
    const cleanName = (row.name || '').trim();

    // 1. Slug generation with collision prevention
    let baseSlug = generateSlug(cleanName || `garment-${rowNum}`);
    let finalSlug = baseSlug;
    let collisionCounter = 1;
    while (existingSlugs.has(finalSlug)) {
      finalSlug = `${baseSlug}-${collisionCounter}`;
      collisionCounter++;
    }
    existingSlugs.add(finalSlug);

    // 2. Category matching
    const cat = existingCategories.find(
      (c) => c.slug.toLowerCase() === (row.categorySlug || '').toLowerCase() || c.id === row.categorySlug
    );

    // 3. Parsing numeric values
    let numericPrice: number | undefined = undefined;
    if (row.price !== undefined && row.price !== '') {
      const p = typeof row.price === 'number' ? row.price : parseFloat(String(row.price).replace(/[^\d.]/g, ''));
      if (!isNaN(p)) numericPrice = p;
    }

    let numericCompareAt: number | undefined = undefined;
    if (row.compareAtPrice !== undefined && row.compareAtPrice !== '') {
      const cp = typeof row.compareAtPrice === 'number' ? row.compareAtPrice : parseFloat(String(row.compareAtPrice).replace(/[^\d.]/g, ''));
      if (!isNaN(cp)) numericCompareAt = cp;
    }

    // 4. Parsing sizes array
    const sizesArray = row.sizes
      ? String(row.sizes)
          .split(/[,|/]/)
          .map((s) => s.trim())
          .filter(Boolean)
      : undefined;

    // 5. Normalizing availability
    let availability: AvailabilityStatus = 'in_stock';
    const rawAvail = String(row.availability || '').toLowerCase();
    if (rawAvail.includes('upon') || rawAvail.includes('request')) {
      availability = 'upon_request';
    } else if (rawAvail.includes('out') || rawAvail.includes('unavailable')) {
      availability = 'out_of_stock';
    }

    // 6. Image construction
    const images: ProductImage[] = [];
    if (row.imageUrl) {
      images.push({
        id: `img-${finalSlug}-1`,
        productId: `prod-${finalSlug}`,
        imageUrl: row.imageUrl.trim(),
        altText: cleanName,
        displayOrder: 1,
        isPrimary: true,
      });
    }

    const candidateProduct: Partial<Product> = {
      id: `prod-${finalSlug}`,
      name: cleanName,
      slug: finalSlug,
      categoryId: cat ? cat.id : row.categorySlug,
      categoryName: cat ? cat.name : undefined,
      categorySlug: cat ? cat.slug : row.categorySlug,
      description: (row.description || '').trim(),
      price: numericPrice,
      compareAtPrice: numericCompareAt,
      specifications: {
        fabric: row.fabric?.trim(),
        color: row.color?.trim(),
        sizesAvailable: sizesArray,
        patternDetails: row.patternDetails?.trim(),
        careInstructions: row.careInstructions?.trim(),
      },
      availability,
      featured: String(row.featured).toLowerCase() === 'true',
      displayOrder: typeof row.displayOrder === 'number' ? row.displayOrder : parseInt(String(row.displayOrder || 100), 10),
      images,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Validate Candidate
    const validation = validateProduct(candidateProduct, existingCategories);
    if (validation.isValid && validation.data) {
      validProducts.push(validation.data);
    } else {
      rowErrors.push({
        rowNumber: rowNum,
        productName: cleanName || 'Unnamed Row',
        errors: validation.errors,
      });
    }
  });

  return {
    totalRows: rawRows.length,
    validRowsCount: validProducts.length,
    invalidRowsCount: rowErrors.length,
    validProducts,
    rowErrors,
  };
}
