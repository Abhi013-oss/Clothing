import { Product, ProductImage, AvailabilityStatus } from '@/types/product';
import { Category } from '@/types/category';

export interface ValidationError {
  field: string;
  message: string;
  value?: unknown;
}

export interface ValidationResult<T> {
  isValid: boolean;
  errors: ValidationError[];
  data?: T;
}

export interface CatalogueAuditReport {
  totalProducts: number;
  publishedProducts: number;
  draftProducts: number;
  hiddenProducts: number;
  featuredCount: number;
  pricedCount: number;
  unpricedCount: number;
  missingImageCount: number;
  categoryIntegrityPassed: boolean;
  slugUniquenessPassed: boolean;
  errors: { productId: string; errors: ValidationError[] }[];
}

const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const VALID_AVAILABILITY: AvailabilityStatus[] = ['in_stock', 'out_of_stock', 'upon_request'];

/**
 * Validates a single product against the canonical schema.
 * Rejects invalid fields with human-readable messages.
 */
export function validateProduct(
  product: Partial<Product>,
  existingCategories: Category[] = []
): ValidationResult<Product> {
  const errors: ValidationError[] = [];

  // 1. Name validation
  if (!product.name || product.name.trim().length < 3) {
    errors.push({
      field: 'name',
      message: 'Product name must be at least 3 characters long.',
      value: product.name,
    });
  }

  // 2. Slug validation
  if (!product.slug || !SLUG_REGEX.test(product.slug)) {
    errors.push({
      field: 'slug',
      message: 'Product slug must be non-empty, lowercase, and URL-safe (e.g., katan-silk-saree).',
      value: product.slug,
    });
  }

  // 3. Category referential integrity
  if (!product.categoryId) {
    errors.push({
      field: 'categoryId',
      message: 'Product must belong to a valid category.',
      value: product.categoryId,
    });
  } else if (
    existingCategories.length > 0 &&
    !existingCategories.some((c) => c.id === product.categoryId || c.slug === product.categoryId)
  ) {
    errors.push({
      field: 'categoryId',
      message: `Category "${product.categoryId}" does not exist in the categories registry.`,
      value: product.categoryId,
    });
  }

  // 4. Price validation (Price is optional, but if provided must be positive)
  if (product.price !== undefined && product.price !== null) {
    if (typeof product.price !== 'number' || isNaN(product.price) || product.price < 0) {
      errors.push({
        field: 'price',
        message: 'Product price must be a valid positive number.',
        value: product.price,
      });
    }
  }

  // 5. Compare-at price validation
  if (product.compareAtPrice !== undefined && product.compareAtPrice !== null) {
    if (typeof product.compareAtPrice !== 'number' || isNaN(product.compareAtPrice) || product.compareAtPrice < 0) {
      errors.push({
        field: 'compareAtPrice',
        message: 'Compare-at price must be a valid positive number.',
        value: product.compareAtPrice,
      });
    } else if (product.price && product.compareAtPrice < product.price) {
      errors.push({
        field: 'compareAtPrice',
        message: 'Compare-at price cannot be less than the selling price.',
        value: product.compareAtPrice,
      });
    }
  }

  // 6. Availability validation
  if (!product.availability || !VALID_AVAILABILITY.includes(product.availability)) {
    errors.push({
      field: 'availability',
      message: `Availability must be one of: ${VALID_AVAILABILITY.join(', ')}.`,
      value: product.availability,
    });
  }

  // 7. Display order validation
  if (product.displayOrder === undefined || typeof product.displayOrder !== 'number' || product.displayOrder < 0) {
    errors.push({
      field: 'displayOrder',
      message: 'Display order must be a non-negative integer.',
      value: product.displayOrder,
    });
  }

  // 8. Images validation
  if (!product.images || !Array.isArray(product.images) || product.images.length === 0) {
    errors.push({
      field: 'images',
      message: 'Product must have at least one image or approved placeholder.',
      value: product.images,
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
    data: errors.length === 0 ? (product as Product) : undefined,
  };
}

/**
 * Validates a category entity.
 */
export function validateCategory(category: Partial<Category>): ValidationResult<Category> {
  const errors: ValidationError[] = [];

  if (!category.name || category.name.trim().length < 2) {
    errors.push({
      field: 'name',
      message: 'Category name must be at least 2 characters long.',
      value: category.name,
    });
  }

  if (!category.slug || !SLUG_REGEX.test(category.slug)) {
    errors.push({
      field: 'slug',
      message: 'Category slug must be lowercase and URL-safe.',
      value: category.slug,
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
    data: errors.length === 0 ? (category as Category) : undefined,
  };
}

/**
 * Runs a comprehensive audit over an entire product catalogue.
 */
export function auditCatalogue(
  products: Product[],
  categories: Category[]
): CatalogueAuditReport {
  const slugCounts = new Map<string, number>();
  const productErrors: { productId: string; errors: ValidationError[] }[] = [];

  let published = 0;
  let featured = 0;
  let priced = 0;
  let unpriced = 0;
  let missingImages = 0;

  for (const product of products) {
    if (product.isActive) published++;
    if (product.featured) featured++;
    if (product.price !== undefined && product.price !== null && product.price > 0) {
      priced++;
    } else {
      unpriced++;
    }

    if (!product.images || product.images.length === 0 || !product.images[0].imageUrl) {
      missingImages++;
    }

    // Slug tracking
    slugCounts.set(product.slug, (slugCounts.get(product.slug) || 0) + 1);

    // Validate single product
    const val = validateProduct(product, categories);
    if (!val.isValid) {
      productErrors.push({ productId: product.id, errors: val.errors });
    }
  }

  // Check duplicate slugs
  let slugUniqueness = true;
  slugCounts.forEach((count, slug) => {
    if (count > 1) {
      slugUniqueness = false;
      productErrors.push({
        productId: `slug-${slug}`,
        errors: [{ field: 'slug', message: `Duplicate slug "${slug}" detected ${count} times.` }],
      });
    }
  });

  // Category referential check
  const categoryIds = new Set(categories.map((c) => c.id));
  const categoryIntegrity = products.every((p) => categoryIds.has(p.categoryId));

  return {
    totalProducts: products.length,
    publishedProducts: published,
    draftProducts: 0,
    hiddenProducts: products.length - published,
    featuredCount: featured,
    pricedCount: priced,
    unpricedCount: unpriced,
    missingImageCount: missingImages,
    categoryIntegrityPassed: categoryIntegrity,
    slugUniquenessPassed: slugUniqueness,
    errors: productErrors,
  };
}

/**
 * Validates an image URL for security.
 * Rejects malicious schemes (javascript:, data:, file:) and path traversal.
 */
export function validateImageUrl(url: string): { isValid: boolean; error?: string } {
  if (!url || typeof url !== 'string') {
    return { isValid: false, error: 'Image URL cannot be empty.' };
  }

  const trimmed = url.trim();

  // Block null bytes and path traversal
  if (trimmed.includes('\0') || trimmed.includes('../') || trimmed.includes('..\\')) {
    return { isValid: false, error: 'Image URL contains invalid traversal sequences.' };
  }

  // Allow relative internal images starting with /
  if (trimmed.startsWith('/') && !trimmed.startsWith('//')) {
    return { isValid: true };
  }

  // Validate absolute URL
  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol !== 'https:') {
      return { isValid: false, error: 'Image URLs must use secure HTTPS protocol.' };
    }
    return { isValid: true };
  } catch {
    return { isValid: false, error: 'Malformed image URL.' };
  }
}

/**
 * Security validator for uploaded image files.
 * Enforces size limits (5MB), MIME type whitelist, and extension matching.
 */
export function validateUploadFile(file: {
  name: string;
  size: number;
  type: string;
}): { isValid: boolean; error?: string } {
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
  const ALLOWED_MIME_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/avif']);
  const ALLOWED_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);

  if (!file) {
    return { isValid: false, error: 'No file provided.' };
  }

  if (file.size <= 0) {
    return { isValid: false, error: 'File is empty.' };
  }

  if (file.size > MAX_FILE_SIZE) {
    return { isValid: false, error: 'File size exceeds maximum allowed limit of 5MB.' };
  }

  // Check MIME type
  if (!ALLOWED_MIME_TYPES.has(file.type.toLowerCase())) {
    return {
      isValid: false,
      error: `Disallowed MIME type "${file.type}". Only JPEG, PNG, WebP, and AVIF are permitted.`,
    };
  }

  // Check extension
  const ext = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();
  if (!ALLOWED_EXTENSIONS.has(ext)) {
    return {
      isValid: false,
      error: `Disallowed file extension "${ext}". Inappropriate executable or script file detected.`,
    };
  }

  // Prevent path traversal in filename
  if (file.name.includes('..') || file.name.includes('/') || file.name.includes('\\') || file.name.includes('\0')) {
    return { isValid: false, error: 'Filename contains forbidden path traversal characters.' };
  }

  return { isValid: true };
}

