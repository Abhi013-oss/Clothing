import { Product } from '@/types/product';
import { products as localProducts } from '@/data/products';
import { createClient } from '@/lib/supabase/client';

/**
 * Data Access Layer: Products
 * Communicates with Supabase PostgreSQL with verified local fallback for development resiliency.
 */
export async function getProducts(options?: {
  categorySlug?: string;
  featuredOnly?: boolean;
  includeInactive?: boolean;
}): Promise<Product[]> {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (!supabaseUrl || supabaseUrl.includes('placeholder')) {
      // Resilient local fixture fallback
      let filtered = [...localProducts];
      if (!options?.includeInactive) {
        filtered = filtered.filter((p) => p.isActive);
      }
      if (options?.categorySlug) {
        filtered = filtered.filter((p) => p.categorySlug === options.categorySlug);
      }
      if (options?.featuredOnly) {
        filtered = filtered.filter((p) => p.featured);
      }
      return filtered;
    }

    const supabase = createClient();
    let query = supabase
      .from('products')
      .select('*, product_images(*)')
      .order('display_order', { ascending: true });

    if (!options?.includeInactive) {
      query = query.eq('is_active', true);
    }
    if (options?.featuredOnly) {
      query = query.eq('featured', true);
    }
    if (options?.categorySlug) {
      const cleanSlug = options.categorySlug.toLowerCase().replace(/[^a-z0-9-]/g, '');
      if (cleanSlug) {
        query = query.eq('category_slug', cleanSlug);
      }
    }

    // Defensive query limit preventing resource exhaustion
    query = query.limit(100);

    const { data, error } = await query;
    if (error || !data) {
      console.warn('[DAL Products] Supabase query failed, falling back to local dataset:', error?.message);
      return localProducts;
    }

    return data.map((row: any) => ({
      id: row.id,
      name: row.name,
      slug: row.slug,
      categoryId: row.category_id,
      categoryName: row.category_name,
      categorySlug: row.category_slug,
      description: row.description,
      price: row.price ? parseFloat(row.price) : undefined,
      compareAtPrice: row.compare_at_price ? parseFloat(row.compare_at_price) : undefined,
      specifications: {
        fabric: row.fabric,
        color: row.color,
        sizesAvailable: row.sizes,
        patternDetails: row.pattern_details,
        careInstructions: row.care_instructions,
      },
      availability: row.availability,
      featured: row.featured,
      displayOrder: row.display_order,
      images: (row.product_images || []).map((img: any) => ({
        id: img.id,
        productId: img.product_id,
        imageUrl: img.image_url,
        altText: img.alt_text,
        displayOrder: img.display_order,
        isPrimary: img.is_primary,
      })),
      isActive: row.is_active,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    }));
  } catch (err) {
    console.warn('[DAL Products] Unexpected error, returning local products:', err);
    return localProducts;
  }
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const all = await getProducts({ includeInactive: true });
  return all.find((p) => p.slug === slug);
}

export async function getProductById(id: string): Promise<Product | undefined> {
  const all = await getProducts({ includeInactive: true });
  return all.find((p) => p.id === id);
}
