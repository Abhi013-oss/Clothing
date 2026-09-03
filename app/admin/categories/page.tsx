import React from 'react';
import Link from 'next/link';
import { FolderTree, ArrowLeft, ShieldAlert, ExternalLink } from 'lucide-react';
import { getCategories } from '@/lib/data/categories';
import { getProducts } from '@/lib/data/products';

export const revalidate = 0;

export default async function AdminCategoriesPage() {
  const [categories, products] = await Promise.all([
    getCategories({ includeInvisible: true }),
    getProducts({ includeInactive: true }),
  ]);

  // Compute product count per category
  const categoryCounts = new Map<string, number>();
  for (const p of products) {
    categoryCounts.set(p.categoryId, (categoryCounts.get(p.categoryId) || 0) + 1);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-ink-border">
        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            className="p-2 rounded-full hover:bg-canvas-sand text-ink-secondary hover:text-ink transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <span className="font-sans text-xs uppercase tracking-widest text-accent-gold font-bold">
              Taxonomy
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-medium text-ink">
              Trade Departments
            </h1>
            <p className="font-sans text-xs text-ink-secondary mt-0.5">
              Verified collections for BANWARILAL CLOTH HOUSE
            </p>
          </div>
        </div>
      </div>

      {/* Safety Notice */}
      <div className="p-4 rounded-sm bg-canvas-sand/60 border border-ink-border flex items-start gap-3 text-xs text-ink-secondary">
        <ShieldAlert className="w-4 h-4 text-accent-gold flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-ink">Referential Integrity Protection:</p>
          <p className="mt-0.5">
            Departments with active garments cannot be deleted. Any structural modifications must preserve category URLs to maintain search engine indexation and customer bookmarks.
          </p>
        </div>
      </div>

      {/* Categories Table */}
      <div className="bg-canvas-pure rounded-sm border border-ink-border shadow-card-rest overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-ink-border bg-canvas-sand/40 font-sans text-[10px] font-bold uppercase tracking-wider text-ink-secondary">
                <th className="py-3.5 px-4">Department Name</th>
                <th className="py-3.5 px-4">URL Slug</th>
                <th className="py-3.5 px-4">Assigned Products</th>
                <th className="py-3.5 px-4">Display Priority</th>
                <th className="py-3.5 px-4">Visibility</th>
                <th className="py-3.5 px-4 text-right">View Public</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-border/60 text-xs">
              {categories.map((cat) => {
                const count = categoryCounts.get(cat.id) || 0;
                return (
                  <tr key={cat.id} className="hover:bg-canvas-sand/20 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <FolderTree className="w-4 h-4 text-accent-gold flex-shrink-0" />
                        <span className="font-serif font-medium text-ink text-sm">
                          {cat.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-ink-secondary">
                      /collections/{cat.slug}
                    </td>
                    <td className="py-3.5 px-4 font-sans font-semibold text-ink">
                      {count} {count === 1 ? 'Garment' : 'Garments'}
                    </td>
                    <td className="py-3.5 px-4 font-sans text-ink-secondary">
                      Priority {cat.displayOrder}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                          cat.isVisible
                            ? 'bg-status-success/15 text-status-success'
                            : 'bg-status-error/15 text-status-error'
                        }`}
                      >
                        {cat.isVisible ? 'Active' : 'Hidden'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        href={`/collections/${cat.slug}`}
                        target="_blank"
                        className="inline-flex items-center gap-1 text-ink-muted hover:text-ink text-[11px] font-semibold transition-colors"
                      >
                        <span>Showroom</span>
                        <ExternalLink className="w-3 h-3 text-accent-gold" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
