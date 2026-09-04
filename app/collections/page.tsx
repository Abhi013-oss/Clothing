import React, { Suspense } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { products } from '@/data/products';
import { categories } from '@/data/categories';
import { siteConfig } from '@/config/site';
import CatalogueBrowser from '@/components/catalogue/CatalogueBrowser';

export const metadata = {
  title: `Complete Clothing Catalogue — ${siteConfig.businessName} | Chilbila, Pratapgarh`,
  description: `Browse all handloom sarees, unstitched suitings, readymade garments, and fine textiles from ${siteConfig.businessName}. Filter by fabric, availability, and sort by price.`,
  alternates: {
    canonical: 'https://banwarilalclothhouse.com/collections',
  },
};

export default function CollectionsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* Accessible Semantic Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6 flex justify-center sm:justify-start">
        <ol className="flex items-center space-x-2 text-xs text-ink-secondary">
          <li>
            <Link href="/" className="hover:text-ink transition-colors">
              Home
            </Link>
          </li>
          <li>
            <ChevronRight className="w-3.5 h-3.5 text-ink-muted" />
          </li>
          <li className="font-semibold text-ink" aria-current="page">
            All Collections
          </li>
        </ol>
      </nav>

      {/* Editorial Catalogue Header */}
      <div className="mb-10 max-w-3xl text-center sm:text-left mx-auto sm:mx-0">
        <span className="font-sans text-xs uppercase tracking-widest text-accent-gold font-semibold block">
          Chilbila Digital Catalogue
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-medium text-ink mt-2 mb-3">
          Explore Our Collection
        </h1>
        <p className="font-sans text-sm sm:text-base text-ink-secondary leading-relaxed">
          Discover our curated showcase of authentic Indian textiles, festive sarees, daily readymade apparel, and tailored menswear. Add items to your bag to place an order directly on WhatsApp.
        </p>
      </div>

      {/* Interactive Catalogue Browser with Suspense Boundary */}
      <Suspense
        fallback={
          <div className="py-20 text-center text-ink-secondary text-sm font-sans">
            Loading digital showroom...
          </div>
        }
      >
        <CatalogueBrowser
          initialProducts={products}
          categories={categories}
        />
      </Suspense>
    </div>
  );
}
