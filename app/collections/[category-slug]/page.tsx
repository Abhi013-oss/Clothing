import React, { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { products } from '@/data/products';
import { categories } from '@/data/categories';
import { siteConfig } from '@/config/site';
import CatalogueBrowser from '@/components/catalogue/CatalogueBrowser';
import { safeJsonLd } from '@/lib/security/sanitize';

interface Props {
  params: {
    'category-slug': string;
  };
}

export function generateStaticParams() {
  return categories.map((c) => ({
    'category-slug': c.slug,
  }));
}

export function generateMetadata({ params }: Props) {
  const category = categories.find((c) => c.slug === params['category-slug']);
  if (!category) {
    return {
      title: 'Category Not Found — BANWARILAL CLOTH HOUSE',
    };
  }

  return {
    title: `${category.name} Collection — ${siteConfig.businessName} | Chilbila, Pratapgarh`,
    description: category.description || `Browse ${category.name} from BANWARILAL CLOTH HOUSE in Chilbila, Pratapgarh.`,
    alternates: {
      canonical: `https://banwarilalclothhouse.com/collections/${category.slug}`,
    },
    openGraph: {
      title: `${category.name} — ${siteConfig.businessName}`,
      description: category.description,
    },
  };
}

export default function CategoryPage({ params }: Props) {
  const categorySlug = params['category-slug'];
  const category = categories.find((c) => c.slug === categorySlug);

  if (!category) {
    notFound();
  }

  // Filter products for this specific category
  const categoryProducts = products.filter(
    (p) => p.categorySlug === categorySlug || p.categoryId === category.id
  );

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://banwarilalclothhouse.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Collections',
        item: 'https://banwarilalclothhouse.com/collections',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: category.name,
        item: `https://banwarilalclothhouse.com/collections/${category.slug}`,
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* Category Breadcrumb JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbJsonLd) }}
      />
      {/* Accessible Semantic Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center space-x-2 text-xs text-ink-secondary">
          <li>
            <Link href="/" className="hover:text-ink transition-colors">
              Home
            </Link>
          </li>
          <li>
            <ChevronRight className="w-3.5 h-3.5 text-ink-muted" />
          </li>
          <li>
            <Link href="/collections" className="hover:text-ink transition-colors">
              All Collections
            </Link>
          </li>
          <li>
            <ChevronRight className="w-3.5 h-3.5 text-ink-muted" />
          </li>
          <li className="font-semibold text-ink" aria-current="page">
            {category.name}
          </li>
        </ol>
      </nav>

      {/* Editorial Category Header */}
      <div className="mb-10 pb-8 border-b border-ink-border/60">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8">
            <span className="font-sans text-xs uppercase tracking-widest text-accent-gold font-semibold">
              Curated Department
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-medium text-ink mt-2 mb-3">
              {category.name}
            </h1>
            {category.description && (
              <p className="font-sans text-sm sm:text-base text-ink-secondary leading-relaxed max-w-2xl">
                {category.description}
              </p>
            )}
          </div>

          {/* Quick Category Stats */}
          <div className="md:col-span-4 flex md:justify-end">
            <div className="p-4 bg-canvas-sand rounded-sm border border-ink-border/80 text-center min-w-[140px]">
              <span className="font-serif text-2xl font-medium text-ink">
                {categoryProducts.length}
              </span>
              <p className="font-sans text-[11px] uppercase tracking-wider text-ink-secondary mt-0.5">
                Garments Curated
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Category Catalogue Browser with Suspense */}
      <Suspense
        fallback={
          <div className="py-20 text-center text-ink-secondary text-sm font-sans">
            Loading {category.name} collection...
          </div>
        }
      >
        <CatalogueBrowser
          initialProducts={categoryProducts}
          categories={categories}
          activeCategorySlug={categorySlug}
        />
      </Suspense>
    </div>
  );
}
