import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, Store, ArrowRight, ShieldCheck } from 'lucide-react';
import { products } from '@/data/products';
import { siteConfig } from '@/config/site';
import { formatPrice } from '@/lib/utils/formatters';
import ProductCard from '@/components/product/ProductCard';
import ProductGallery from '@/components/product/ProductGallery';
import ProductActions from '@/components/product/ProductActions';
import { safeJsonLd } from '@/lib/security/sanitize';

interface Props {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return products.map((p) => ({
    slug: p.slug,
  }));
}

export function generateMetadata({ params }: Props) {
  const product = products.find((p) => p.slug === params.slug);
  if (!product) return { title: 'Garment Not Found — BANWARILAL CLOTH HOUSE' };

  const primaryImage = product.images.find((img) => img.isPrimary) || product.images[0];
  const canonicalUrl = `https://banwarilalclothhouse.com/products/${product.slug}`;

  return {
    title: `${product.name} — ${siteConfig.businessName}`,
    description: product.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${product.name} — ${siteConfig.businessName}`,
      description: product.description,
      url: canonicalUrl,
      images: primaryImage ? [{ url: primaryImage.imageUrl, alt: product.name }] : [],
    },
  };
}

export default function ProductDetailPage({ params }: Props) {
  const product = products.find((p) => p.slug === params.slug);
  if (!product) {
    notFound();
  }

  const primaryImage = product.images.find((img) => img.isPrimary) || product.images[0];

  // Related products logic: Same category first, excluding current product, fallback to other active products
  const sameCategoryProducts = products.filter(
    (p) => p.id !== product.id && p.isActive && p.categoryId === product.categoryId
  );
  const otherProducts = products.filter(
    (p) => p.id !== product.id && p.isActive && p.categoryId !== product.categoryId
  );
  const relatedProducts = [...sameCategoryProducts, ...otherProducts].slice(0, 4);

  // Canonical Schema.org Product structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: primaryImage ? [primaryImage.imageUrl] : [],
    brand: {
      '@type': 'Brand',
      name: siteConfig.businessName,
    },
    category: product.categoryName || 'Clothing',
    offers: product.price
      ? {
          '@type': 'Offer',
          priceCurrency: 'INR',
          price: product.price,
          availability:
            product.availability === 'in_stock'
              ? 'https://schema.org/InStock'
              : 'https://schema.org/PreOrder',
          url: `https://banwarilalclothhouse.com/products/${product.slug}`,
        }
      : undefined,
  };

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
        name: product.categoryName || 'Category',
        item: `https://banwarilalclothhouse.com/collections/${product.categorySlug}`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: product.name,
        item: `https://banwarilalclothhouse.com/products/${product.slug}`,
      },
    ],
  };

  return (
    <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-28 sm:py-16">
      {/* Product JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
      />
      {/* Breadcrumb JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbJsonLd) }}
      />

      {/* Accessible Hierarchical Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex flex-wrap items-center space-x-2 text-xs text-ink-secondary">
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
              Collections
            </Link>
          </li>
          {product.categorySlug && product.categoryName && (
            <>
              <li>
                <ChevronRight className="w-3.5 h-3.5 text-ink-muted" />
              </li>
              <li>
                <Link
                  href={`/collections/${product.categorySlug}`}
                  className="hover:text-ink transition-colors"
                >
                  {product.categoryName}
                </Link>
              </li>
            </>
          )}
          <li>
            <ChevronRight className="w-3.5 h-3.5 text-ink-muted" />
          </li>
          <li className="font-semibold text-ink truncate max-w-[200px] sm:max-w-xs" aria-current="page">
            {product.name}
          </li>
        </ol>
      </nav>

      {/* Main Product Hero Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        {/* Left Column: Product Gallery (Col 7) */}
        <div className="lg:col-span-7">
          <ProductGallery images={product.images} productName={product.name} />
        </div>

        {/* Right Column: Garment Information & CTAs (Col 5) */}
        <div className="lg:col-span-5 flex flex-col justify-start">
          {/* Department / Category Tag */}
          {product.categoryName && product.categorySlug && (
            <Link
              href={`/collections/${product.categorySlug}`}
              className="inline-block font-sans text-xs uppercase tracking-widest text-accent-gold font-semibold hover:underline mb-2"
            >
              {product.categoryName}
            </Link>
          )}

          {/* Product Headline */}
          <h1 className="font-serif text-2xl sm:text-4xl font-medium text-ink leading-tight mb-4">
            {product.name}
          </h1>

          {/* Price & Availability Bar */}
          <div className="flex items-center gap-3 mb-6 pb-6 border-b border-ink-border/60">
            <span className="font-sans text-2xl sm:text-3xl font-semibold text-ink">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && product.price && product.compareAtPrice > product.price && (
              <span className="font-sans text-sm text-ink-muted line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
            <span
              className={`ml-auto px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full border ${
                product.availability === 'in_stock'
                  ? 'bg-status-success/10 text-status-success border-status-success/20'
                  : 'bg-canvas-sand text-ink-secondary border-ink-border'
              }`}
            >
              {product.availability === 'in_stock' ? 'In Stock' : 'Upon Request'}
            </span>
          </div>

          {/* Description */}
          <p className="font-sans text-sm sm:text-base text-ink-secondary leading-relaxed mb-6">
            {product.description}
          </p>

          {/* Garment Specifications Matrix (Only render present fields) */}
          {product.specifications && Object.keys(product.specifications).length > 0 && (
            <div className="p-5 rounded-sm bg-canvas-muted/70 border border-ink-border mb-8">
              <h2 className="font-serif text-sm font-medium text-ink uppercase tracking-wider mb-3">
                Garment Attributes
              </h2>
              <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-xs">
                {product.specifications.fabric && (
                  <div>
                    <dt className="text-ink-secondary">Fabric / Weave:</dt>
                    <dd className="font-semibold text-ink mt-0.5">{product.specifications.fabric}</dd>
                  </div>
                )}
                {product.specifications.color && (
                  <div>
                    <dt className="text-ink-secondary">Primary Color:</dt>
                    <dd className="font-semibold text-ink mt-0.5">{product.specifications.color}</dd>
                  </div>
                )}
                {product.specifications.sizesAvailable && product.specifications.sizesAvailable.length > 0 && (
                  <div className="col-span-2">
                    <dt className="text-ink-secondary">Available Sizes / Cut:</dt>
                    <dd className="font-semibold text-ink mt-0.5">
                      {product.specifications.sizesAvailable.join(', ')}
                    </dd>
                  </div>
                )}
                {product.specifications.patternDetails && (
                  <div className="col-span-2">
                    <dt className="text-ink-secondary">Craftsmanship / Detailing:</dt>
                    <dd className="font-semibold text-ink mt-0.5">{product.specifications.patternDetails}</dd>
                  </div>
                )}
                {product.specifications.careInstructions && (
                  <div className="col-span-2">
                    <dt className="text-ink-secondary">Fabric Care Instructions:</dt>
                    <dd className="font-semibold text-ink mt-0.5">{product.specifications.careInstructions}</dd>
                  </div>
                )}
              </dl>
            </div>
          )}

          {/* Primary Actions (Add to Bag, WhatsApp Order, Sticky Mobile Bar) */}
          <ProductActions product={product} />
        </div>
      </div>

      {/* Reassurance & Physical Showroom Callout */}
      <div className="mt-16 p-6 sm:p-8 bg-canvas-sand/60 rounded-sm border border-ink-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-canvas-pure rounded-full border border-ink-border text-accent-gold flex-shrink-0">
            <Store className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-serif text-base sm:text-lg font-medium text-ink">
              Prefer to touch and try before ordering?
            </h3>
            <p className="font-sans text-xs sm:text-sm text-ink-secondary mt-1">
              Visit {siteConfig.businessName} Near Hanuman Mandir, Chilbila, Pratapgarh. Inspect handlooms, match borders, and get custom blouse tailoring advice.
            </p>
          </div>
        </div>

        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-sm bg-canvas-pure text-ink border border-ink-border hover:border-accent-gold font-sans text-xs font-semibold whitespace-nowrap transition-colors"
        >
          <span>Store Directions</span>
          <ArrowRight className="w-3.5 h-3.5 text-accent-gold" />
        </Link>
      </div>

      {/* Related Products Discovery Rail */}
      {relatedProducts.length > 0 && (
        <section className="mt-20 pt-12 border-t border-ink-border/60">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="font-sans text-xs uppercase tracking-widest text-accent-gold font-semibold">
                Explore More
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-medium text-ink mt-1">
                You May Also Admire
              </h2>
            </div>
            {product.categorySlug && (
              <Link
                href={`/collections/${product.categorySlug}`}
                className="text-xs font-semibold text-ink hover:text-accent-gold transition-colors inline-flex items-center gap-1"
              >
                <span>View All {product.categoryName}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
