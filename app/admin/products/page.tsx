import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Plus,
  Search,
  Edit2,
  ExternalLink,
  Sparkles,
  ShoppingBag,
} from 'lucide-react';
import { getProducts } from '@/lib/data/products';
import { getCategories } from '@/lib/data/categories';
import { formatPrice } from '@/lib/utils/formatters';

export const revalidate = 0;

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams?: { q?: string; category?: string };
}) {
  const [allProducts, categories] = await Promise.all([
    getProducts({ includeInactive: true }),
    getCategories({ includeInvisible: true }),
  ]);

  const query = (searchParams?.q || '').toLowerCase().trim();
  const selectedCategory = searchParams?.category || '';

  const filteredProducts = allProducts.filter((p) => {
    const matchesQuery =
      !query ||
      p.name.toLowerCase().includes(query) ||
      p.slug.toLowerCase().includes(query) ||
      p.specifications.fabric?.toLowerCase().includes(query);

    const matchesCat = !selectedCategory || p.categoryId === selectedCategory || p.categorySlug === selectedCategory;

    return matchesQuery && matchesCat;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-ink-border">
        <div>
          <span className="font-sans text-xs uppercase tracking-widest text-accent-gold font-bold">
            Inventory
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-medium text-ink mt-1">
            Catalogue Management
          </h1>
          <p className="font-sans text-xs text-ink-secondary mt-1">
            Showing {filteredProducts.length} of {allProducts.length} total garments
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-sm bg-ink text-white font-sans text-xs font-semibold tracking-wider hover:bg-ink-hover transition-colors shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>ADD PRODUCT</span>
        </Link>
      </div>

      {/* Filter / Search Bar */}
      <div className="bg-canvas-pure p-4 rounded-sm border border-ink-border shadow-card-rest flex flex-col sm:flex-row gap-3 items-center justify-between">
        <form method="GET" className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-ink-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            name="q"
            defaultValue={searchParams?.q || ''}
            placeholder="Search by name, fabric, or slug…"
            className="w-full pl-9 pr-3 py-2 bg-canvas-sand/40 border border-ink-border rounded-sm text-xs text-ink placeholder:text-ink-muted focus:outline-none focus-visible:ring-1 focus-visible:ring-accent-gold"
          />
        </form>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
          <Link
            href="/admin/products"
            className={`px-3 py-1.5 rounded-sm text-xs font-semibold whitespace-nowrap transition-colors ${
              !selectedCategory
                ? 'bg-ink text-white'
                : 'bg-canvas-sand text-ink-secondary hover:text-ink'
            }`}
          >
            All Departments
          </Link>
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/admin/products?category=${c.slug}`}
              className={`px-3 py-1.5 rounded-sm text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === c.slug
                  ? 'bg-ink text-white'
                  : 'bg-canvas-sand text-ink-secondary hover:text-ink'
              }`}
            >
              {c.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-canvas-pure rounded-sm border border-ink-border shadow-card-rest overflow-hidden">
        {filteredProducts.length === 0 ? (
          <div className="py-16 text-center">
            <ShoppingBag className="w-10 h-10 mx-auto text-ink-muted opacity-40 mb-3" />
            <h3 className="font-serif text-lg font-medium text-ink">No garments found</h3>
            <p className="font-sans text-xs text-ink-secondary mt-1">
              Try adjusting your search query or department filter.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-ink-border bg-canvas-sand/40 font-sans text-[10px] font-bold uppercase tracking-wider text-ink-secondary">
                  <th className="py-3.5 px-4">Garment</th>
                  <th className="py-3.5 px-4">Department</th>
                  <th className="py-3.5 px-4">Retail Price</th>
                  <th className="py-3.5 px-4">Availability</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-border/60 text-xs">
                {filteredProducts.map((product) => {
                  const thumb = product.images[0]?.imageUrl || '';
                  return (
                    <tr key={product.id} className="hover:bg-canvas-sand/20 transition-colors">
                      {/* Garment Column */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 aspect-[3/4] bg-canvas-sand rounded-sm overflow-hidden flex-shrink-0 border border-ink-border/60">
                            {thumb ? (
                              <Image
                                src={thumb}
                                alt={product.name}
                                fill
                                className="object-cover"
                                sizes="48px"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-[8px] text-ink-muted">
                                No img
                              </div>
                            )}
                          </div>
                          <div className="min-w-0 max-w-xs">
                            <span className="font-serif font-medium text-ink truncate block">
                              {product.name}
                            </span>
                            <span className="font-sans text-[10px] text-ink-muted truncate block">
                              /{product.slug}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Department */}
                      <td className="py-3.5 px-4 font-sans text-ink-secondary">
                        {product.categoryName || product.categoryId}
                      </td>

                      {/* Retail Price */}
                      <td className="py-3.5 px-4 font-sans font-semibold text-ink">
                        {formatPrice(product.price)}
                      </td>

                      {/* Availability */}
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                            product.availability === 'in_stock'
                              ? 'bg-status-success/15 text-status-success'
                              : product.availability === 'upon_request'
                              ? 'bg-accent-gold/15 text-accent-gold'
                              : 'bg-status-error/15 text-status-error'
                          }`}
                        >
                          {product.availability === 'in_stock'
                            ? 'In Stock'
                            : product.availability === 'upon_request'
                            ? 'Upon Request'
                            : 'Out of Stock'}
                        </span>
                      </td>

                      {/* Featured & Active Badges */}
                      <td className="py-3.5 px-4 space-x-1">
                        {product.featured && (
                          <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-sm bg-accent-gold/15 text-accent-gold text-[10px] font-semibold">
                            <Sparkles className="w-2.5 h-2.5" />
                            <span>Featured</span>
                          </span>
                        )}
                        <span
                          className={`inline-block px-1.5 py-0.5 rounded-sm text-[10px] font-semibold ${
                            product.isActive
                              ? 'text-ink-secondary'
                              : 'bg-status-error/10 text-status-error'
                          }`}
                        >
                          {product.isActive ? 'Published' : 'Hidden'}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-flex items-center gap-2">
                          <Link
                            href={`/products/${product.slug}`}
                            target="_blank"
                            className="p-1.5 text-ink-muted hover:text-ink transition-colors rounded-sm"
                            title="View on Live Showroom"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                          <Link
                            href={`/admin/products/${product.id}`}
                            className="p-1.5 text-ink-muted hover:text-accent-gold transition-colors rounded-sm"
                            title="Edit Garment"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
