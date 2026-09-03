import { Product } from '@/types/product';
import { Category } from '@/types/category';

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'name-asc' | 'newest';

export interface CatalogueFilterState {
  category?: string;
  search?: string;
  fabric?: string;
  availability?: string;
  sort?: SortOption;
}

/**
 * Pure function to filter and sort products based on user criteria.
 * Keeps data logic decoupled from UI components.
 */
export function filterAndSortProducts(
  allProducts: Product[],
  filters: CatalogueFilterState
): Product[] {
  let result = allProducts.filter((p) => p.isActive);

  // 1. Category Filter
  if (filters.category && filters.category !== 'all') {
    const target = filters.category.toLowerCase();
    result = result.filter(
      (p) =>
        p.categorySlug?.toLowerCase() === target ||
        p.categoryId.toLowerCase() === target
    );
  }

  // 2. Search Filter (debounced from UI, matching name, fabric, category, description)
  if (filters.search && filters.search.trim().length > 0) {
    const query = filters.search.trim().toLowerCase();
    result = result.filter((p) => {
      const nameMatch = p.name.toLowerCase().includes(query);
      const fabricMatch = p.specifications?.fabric?.toLowerCase().includes(query) || false;
      const catMatch = p.categoryName?.toLowerCase().includes(query) || false;
      const descMatch = p.description.toLowerCase().includes(query);
      return nameMatch || fabricMatch || catMatch || descMatch;
    });
  }

  // 3. Fabric Filter
  if (filters.fabric && filters.fabric !== 'all') {
    const targetFabric = filters.fabric.toLowerCase();
    result = result.filter((p) =>
      p.specifications?.fabric?.toLowerCase().includes(targetFabric)
    );
  }

  // 4. Availability Filter
  if (filters.availability && filters.availability !== 'all') {
    result = result.filter((p) => p.availability === filters.availability);
  }

  // 5. Deterministic Sorting
  const sort = filters.sort || 'featured';
  result.sort((a, b) => {
    switch (sort) {
      case 'price-asc': {
        // Unpriced items ('Price on Request') sort to the end
        if (a.price === undefined || a.price === null) return 1;
        if (b.price === undefined || b.price === null) return -1;
        return a.price - b.price;
      }
      case 'price-desc': {
        if (a.price === undefined || a.price === null) return 1;
        if (b.price === undefined || b.price === null) return -1;
        return b.price - a.price;
      }
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'featured':
      default: {
        // Featured products first, then order by displayOrder
        if (a.featured !== b.featured) {
          return a.featured ? -1 : 1;
        }
        return a.displayOrder - b.displayOrder;
      }
    }
  });

  return result;
}

/**
 * Extracts unique fabric materials present in the current product list.
 */
export function getAvailableFabrics(allProducts: Product[]): string[] {
  const fabrics = new Set<string>();
  allProducts.forEach((p) => {
    if (p.specifications?.fabric) {
      // Extract main fabric noun e.g. Silk, Cotton, Linen, Wool, Organza
      const raw = p.specifications.fabric;
      if (raw.includes('Silk')) fabrics.add('Silk');
      if (raw.includes('Cotton')) fabrics.add('Cotton');
      if (raw.includes('Linen')) fabrics.add('Linen');
      if (raw.includes('Georgette')) fabrics.add('Georgette');
      if (raw.includes('Organza')) fabrics.add('Organza');
      if (raw.includes('Wool') || raw.includes('Suiting')) fabrics.add('Wool / Suiting');
    }
  });
  return Array.from(fabrics).sort();
}
