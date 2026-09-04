import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { products } from '@/data/products';
import ProductCard from '@/components/product/ProductCard';
import ScrollReveal from '@/components/common/ScrollReveal';

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
        <ScrollReveal direction="up" delay={50}>
          <div className="max-w-2xl mb-12 text-center sm:text-left mx-auto sm:mx-0">
            <span className="font-sans text-xs uppercase tracking-widest text-accent-gold font-semibold block">
              Handpicked Selections
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-medium text-ink mt-2">
              Featured Garments & Handlooms
            </h2>
            <p className="font-sans text-sm sm:text-base text-ink-secondary mt-3 max-w-xl mx-auto sm:mx-0">
              A curated glimpse of festive sarees, unstitched suitings, and ready-to-wear pieces currently in high demand at our Chilbila store.
            </p>
          </div>
        </ScrollReveal>

        {/* Responsive Product Grid with Staggered Cascading Reveal */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {featuredProducts.map((product, index) => (
            <ScrollReveal key={product.id} direction="up" delay={index * 80} distance={24}>
              <ProductCard product={product} variant="featured" />
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom CTA to Full Catalogue */}
        <ScrollReveal direction="up" delay={200}>
          <div className="mt-14 text-center">
            <Link
              href="/collections"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-sm bg-ink text-white font-sans text-sm font-semibold tracking-wider hover:bg-ink-hover hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 shadow-sm"
            >
              <span>VIEW ALL COLLECTIONS</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
