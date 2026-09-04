'use client';

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Search, X, SlidersHorizontal, ArrowUpDown, Sparkles, Filter } from 'lucide-react';
import { Product } from '@/types/product';
import { Category } from '@/types/category';
import ProductCard from '@/components/product/ProductCard';
import {
  filterAndSortProducts,
  getAvailableFabrics,
  SortOption,
  CatalogueFilterState,
} from '@/lib/catalogue/filters';

interface CatalogueBrowserProps {
  initialProducts: Product[];
  categories: Category[];
  activeCategorySlug?: string;
}

export default function CatalogueBrowser({
  initialProducts,
  categories,
  activeCategorySlug,
}: CatalogueBrowserProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Read initial states from URL params
  const urlSearch = searchParams.get('search') || '';
  const urlFabric = searchParams.get('fabric') || 'all';
  const urlAvailability = searchParams.get('availability') || 'all';
  const urlSort = (searchParams.get('sort') as SortOption) || 'featured';
  const urlCategory = activeCategorySlug || searchParams.get('category') || 'all';

  const [search, setSearch] = useState(urlSearch);
  const [fabric, setFabric] = useState(urlFabric);
  const [availability, setAvailability] = useState(urlAvailability);
  const [sort, setSort] = useState<SortOption>(urlSort);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Sync state if URL changes externally
  useEffect(() => {
    setSearch(searchParams.get('search') || '');
    setFabric(searchParams.get('fabric') || 'all');
    setAvailability(searchParams.get('availability') || 'all');
    setSort((searchParams.get('sort') as SortOption) || 'featured');
  }, [searchParams]);

  // Update URL params without full page reload
  const updateUrlParams = useCallback(
    (newFilters: CatalogueFilterState) => {
      const params = new URLSearchParams();
      if (newFilters.search) params.set('search', newFilters.search);
      if (newFilters.fabric && newFilters.fabric !== 'all') params.set('fabric', newFilters.fabric);
      if (newFilters.availability && newFilters.availability !== 'all')
        params.set('availability', newFilters.availability);
      if (newFilters.sort && newFilters.sort !== 'featured') params.set('sort', newFilters.sort);

      // Only include category in query if on global /collections
      if (!activeCategorySlug && newFilters.category && newFilters.category !== 'all') {
        params.set('category', newFilters.category);
      }

      const queryString = params.toString();
      const targetUrl = queryString ? `${pathname}?${queryString}` : pathname;
      router.replace(targetUrl, { scroll: false });
    },
    [router, pathname, activeCategorySlug]
  );

  const handleSearchChange = (val: string) => {
    setSearch(val);
    updateUrlParams({
      category: urlCategory,
      search: val,
      fabric,
      availability,
      sort,
    });
  };

  const handleFabricChange = (val: string) => {
    setFabric(val);
    updateUrlParams({
      category: urlCategory,
      search,
      fabric: val,
      availability,
      sort,
    });
  };

  const handleAvailabilityChange = (val: string) => {
    setAvailability(val);
    updateUrlParams({
      category: urlCategory,
      search,
      fabric,
      availability: val,
      sort,
    });
  };

  const handleSortChange = (val: SortOption) => {
    setSort(val);
    updateUrlParams({
      category: urlCategory,
      search,
      fabric,
      availability,
      sort: val,
    });
  };

  const clearAllFilters = () => {
    setSearch('');
    setFabric('all');
    setAvailability('all');
    setSort('featured');
    updateUrlParams({
      category: activeCategorySlug || 'all',
      search: '',
      fabric: 'all',
      availability: 'all',
      sort: 'featured',
    });
  };

  // Derive available fabric options
  const availableFabrics = useMemo(
    () => getAvailableFabrics(initialProducts),
    [initialProducts]
  );

  // Compute filtered & sorted product list
  const filteredProducts = useMemo(() => {
    return filterAndSortProducts(initialProducts, {
      category: urlCategory,
      search,
      fabric,
      availability,
      sort,
    });
  }, [initialProducts, urlCategory, search, fabric, availability, sort]);

  // Active filter count for badge
  const activeFiltersCount =
    (search ? 1 : 0) +
    (fabric !== 'all' ? 1 : 0) +
    (availability !== 'all' ? 1 : 0);

  // Lock body scroll on mobile filter open
  useEffect(() => {
    if (isMobileFilterOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileFilterOpen]);

  return (
    <div className="space-y-8">
      {/* 1. Category Pill Navigation Bar (If on global /collections) */}
      {!activeCategorySlug && (
        <nav
          aria-label="Category Navigation"
          className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-ink-border/50"
        >
          <button
            onClick={() => {
              updateUrlParams({ category: 'all', search, fabric, availability, sort });
            }}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
              urlCategory === 'all'
                ? 'bg-ink text-white shadow-sm'
                : 'bg-canvas-muted text-ink hover:bg-canvas-sand border border-ink-border/60'
            }`}
          >
            All Collections ({initialProducts.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                updateUrlParams({ category: cat.slug, search, fabric, availability, sort });
              }}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                urlCategory === cat.slug
                  ? 'bg-ink text-white shadow-sm'
                  : 'bg-canvas-muted text-ink hover:bg-canvas-sand border border-ink-border/60'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </nav>
      )}

      {/* 2. Controls Bar: Search + Desktop Filters + Sort */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 bg-canvas-pure rounded-sm border border-ink-border/80 shadow-card-rest">
        {/* Search Field */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-secondary pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search by garment, fabric, or craft..."
            className="w-full pl-10 pr-9 py-2.5 text-xs sm:text-sm bg-canvas border border-ink-border rounded-sm text-ink placeholder:text-ink-secondary/70 focus:outline-none focus:ring-2 focus:ring-accent-gold"
            aria-label="Search clothing catalogue"
          />
          {search && (
            <button
              onClick={() => handleSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-ink-secondary hover:text-ink"
              aria-label="Clear search input"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Desktop Filters: Fabric & Availability */}
        <div className="hidden md:flex items-center gap-3">
          {/* Fabric Select */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-ink-secondary font-medium">Fabric:</span>
            <select
              value={fabric}
              onChange={(e) => handleFabricChange(e.target.value)}
              className="py-2 px-3 bg-canvas border border-ink-border rounded-sm text-xs font-medium text-ink focus:outline-none focus:ring-1 focus:ring-accent-gold"
              aria-label="Filter by fabric"
            >
              <option value="all">All Fabrics</option>
              {availableFabrics.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </div>

          {/* Availability Select */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-ink-secondary font-medium">Status:</span>
            <select
              value={availability}
              onChange={(e) => handleAvailabilityChange(e.target.value)}
              className="py-2 px-3 bg-canvas border border-ink-border rounded-sm text-xs font-medium text-ink focus:outline-none focus:ring-1 focus:ring-accent-gold"
              aria-label="Filter by availability status"
            >
              <option value="all">All Statuses</option>
              <option value="in_stock">In Stock</option>
              <option value="upon_request">Upon Request</option>
            </select>
          </div>

          {/* Sort Select */}
          <div className="flex items-center gap-1.5 text-xs pl-2 border-l border-ink-border">
            <ArrowUpDown className="w-3.5 h-3.5 text-ink-secondary" />
            <span className="text-ink-secondary font-medium">Sort:</span>
            <select
              value={sort}
              onChange={(e) => handleSortChange(e.target.value as SortOption)}
              className="py-2 px-3 bg-canvas border border-ink-border rounded-sm text-xs font-medium text-ink focus:outline-none focus:ring-1 focus:ring-accent-gold"
              aria-label="Sort products"
            >
              <option value="featured">Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="newest">Newest Arrivals</option>
            </select>
          </div>
        </div>

        {/* Mobile Filter & Sort Triggers */}
        <div className="flex md:hidden items-center justify-between gap-3 pt-2 border-t border-ink-border/50">
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="flex-1 min-h-[44px] flex items-center justify-center gap-2 py-2.5 px-4 bg-canvas-muted text-ink text-xs font-semibold rounded-sm border border-ink-border hover:bg-canvas-sand transition-colors"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
          </button>

          <select
            value={sort}
            onChange={(e) => handleSortChange(e.target.value as SortOption)}
            className="flex-1 min-h-[44px] py-2.5 px-3 bg-canvas-muted border border-ink-border rounded-sm text-xs font-semibold text-ink focus:outline-none focus:ring-1 focus:ring-accent-gold"
            aria-label="Mobile sort selection"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A–Z</option>
            <option value="newest">Newest</option>
          </select>
        </div>
      </div>

      {/* 3. Active Filters Strip & Dynamic Count */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        <p className="text-ink-secondary font-medium" aria-live="polite">
          Showing <strong className="text-ink">{filteredProducts.length}</strong> of{' '}
          {initialProducts.length} garments
        </p>

        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            {search && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-canvas-muted border border-ink-border text-ink">
                <span>&ldquo;{search}&rdquo;</span>
                <button
                  onClick={() => handleSearchChange('')}
                  className="hover:text-status-error"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {fabric !== 'all' && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-canvas-muted border border-ink-border text-ink">
                <span>Fabric: {fabric}</span>
                <button
                  onClick={() => handleFabricChange('all')}
                  className="hover:text-status-error"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {availability !== 'all' && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-canvas-muted border border-ink-border text-ink">
                <span>
                  Status: {availability === 'in_stock' ? 'In Stock' : 'Upon Request'}
                </span>
                <button
                  onClick={() => handleAvailabilityChange('all')}
                  className="hover:text-status-error"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            <button
              onClick={clearAllFilters}
              className="text-accent-gold hover:underline font-semibold ml-1"
            >
              Clear All
            </button>
          </div>
        )}
      </div>

      {/* 4. Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        /* Empty Results State */
        <div className="py-16 text-center bg-canvas-pure rounded-sm border border-ink-border/80 p-8 shadow-card-rest">
          <div className="w-14 h-14 mx-auto rounded-full bg-canvas-sand flex items-center justify-center text-ink-secondary mb-4">
            <Filter className="w-6 h-6 opacity-40" />
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-medium text-ink mb-2">
            No Garments Match Your Selection
          </h3>
          <p className="font-sans text-sm text-ink-secondary max-w-md mx-auto mb-6">
            Try loosening your search keywords or clearing your fabric and availability filters to browse our full digital catalogue.
          </p>
          <button
            onClick={clearAllFilters}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-sm bg-ink text-white font-sans text-xs font-semibold hover:bg-ink-hover transition-colors shadow-sm"
          >
            <span>Reset All Filters</span>
          </button>
        </div>
      )}

      {/* 5. Mobile Filter Drawer / Bottom Sheet */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-ink/40 backdrop-blur-sm"
            onClick={() => setIsMobileFilterOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Sheet */}
          <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-canvas shadow-drawer flex flex-col justify-between p-6 z-50">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-ink-border">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-ink" />
                  <h3 className="font-serif text-lg font-medium text-ink">Filters</h3>
                </div>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1.5 text-ink-secondary hover:text-ink rounded-full"
                  aria-label="Close mobile filters"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Fabric Section */}
              <div className="mt-6">
                <label className="block font-serif text-sm font-medium text-ink mb-2">
                  Fabric Type
                </label>
                <div className="space-y-1.5">
                  <button
                    onClick={() => handleFabricChange('all')}
                    className={`w-full text-left px-3 py-2 rounded-sm text-xs font-medium ${
                      fabric === 'all'
                        ? 'bg-ink text-white'
                        : 'bg-canvas-sand text-ink hover:bg-canvas-muted'
                    }`}
                  >
                    All Fabrics
                  </button>
                  {availableFabrics.map((f) => (
                    <button
                      key={f}
                      onClick={() => handleFabricChange(f)}
                      className={`w-full text-left px-3 py-2 rounded-sm text-xs font-medium ${
                        fabric === f
                          ? 'bg-ink text-white'
                          : 'bg-canvas-sand text-ink hover:bg-canvas-muted'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Availability Section */}
              <div className="mt-6">
                <label className="block font-serif text-sm font-medium text-ink mb-2">
                  Availability
                </label>
                <div className="space-y-1.5">
                  {[
                    { id: 'all', label: 'All Statuses' },
                    { id: 'in_stock', label: 'In Stock' },
                    { id: 'upon_request', label: 'Upon Request' },
                  ].map((status) => (
                    <button
                      key={status.id}
                      onClick={() => handleAvailabilityChange(status.id)}
                      className={`w-full text-left px-3 py-2 rounded-sm text-xs font-medium ${
                        availability === status.id
                          ? 'bg-ink text-white'
                          : 'bg-canvas-sand text-ink hover:bg-canvas-muted'
                      }`}
                    >
                      {status.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-ink-border flex gap-3">
              <button
                onClick={clearAllFilters}
                className="flex-1 py-3 text-xs font-semibold text-ink bg-canvas-muted rounded-sm border border-ink-border"
              >
                Reset
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 py-3 text-xs font-semibold text-white bg-ink rounded-sm"
              >
                Apply ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
