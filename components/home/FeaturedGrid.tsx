import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { products } from '@/data/products';
import ProductCard from '@/components/product/ProductCard';

export default function FeaturedGrid() {
  // Deterministic selection: Active & featured items, sorted by displayOrder
  const featuredProducts = products
    .filter((p) => p.isActive && p.featured)
    .sort((a, b) => a.displayOrder - b.displayOrder)
    .slice(0, 6);

  if (featuredProducts.length === 0) return null;

  return (
    <section className="py-16 sm:py-24 border-b border-ink-border/50 bg-canvas">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <span className="font-sans text-xs uppercase tracking-widest text-accent-gold font-semibold">
            Handpicked Selections
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-medium text-ink mt-2">
            Featured Garments & Handlooms
          </h2>
          <p className="font-sans text-sm sm:text-base text-ink-secondary mt-3">
            A curated glimpse of festive sarees, unstitched suitings, and ready-to-wear pieces currently in high demand at our Chilbila store.
          </p>
        </div>

        {/* Responsive Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} variant="featured" />
          ))}
        </div>

        {/* Bottom CTA to Full Catalogue */}
        <div className="mt-14 text-center">
          <Link
            href="/collections"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-sm bg-ink text-white font-sans text-sm font-semibold tracking-wider hover:bg-ink-hover hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 shadow-sm"
          >
            <span>VIEW ALL COLLECTIONS</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
