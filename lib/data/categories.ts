import { Category } from '@/types/category';
import { categories as localCategories } from '@/data/categories';
import { createClient } from '@/lib/supabase/client';

/**
 * Data Access Layer: Categories
 */
export async function getCategories(options?: {
  includeInvisible?: boolean;
}): Promise<Category[]> {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (!supabaseUrl || supabaseUrl.includes('placeholder')) {
      let filtered = [...localCategories];
      if (!options?.includeInvisible) {
        filtered = filtered.filter((c) => (c.isActive ?? c.isVisible ?? true));
      }
      return filtered;
    }

    const supabase = createClient();
    let query = supabase
      .from('categories')
      .select('*')
      .order('display_order', { ascending: true });

    if (!options?.includeInvisible) {
      query = query.eq('is_visible', true);
    }

    query = query.limit(50);

    const { data, error } = await query;
    if (error || !data) {
      console.warn('[DAL Categories] Supabase query failed, using local dataset:', error?.message);
      return localCategories;
    }

    return data.map((row: any) => ({
      id: row.id,
      name: row.name,
      slug: row.slug,
      description: row.description,
      imageUrl: row.image_url,
      displayOrder: row.display_order,
      isActive: row.is_visible ?? true,
      isVisible: row.is_visible ?? true,
      productCount: row.product_count,
      createdAt: row.created_at || '2024-01-01T00:00:00Z',
      updatedAt: row.updated_at || '2024-01-01T00:00:00Z',
    }));
  } catch (err) {
    console.warn('[DAL Categories] Unexpected error, returning local categories:', err);
    return localCategories;
  }
}

export async function getCategoryBySlug(slug: string): Promise<Category | undefined> {
  const all = await getCategories({ includeInvisible: true });
  return all.find((c) => c.slug === slug);
}
