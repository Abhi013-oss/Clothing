'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Plus, Check, MessageCircle } from 'lucide-react';
import { Product } from '@/types/product';
import { formatPrice } from '@/lib/utils/formatters';
import { useCart } from '@/context/CartContext';
import { siteConfig } from '@/config/site';
import { buildWhatsAppUrl, generateSingleProductMessage } from '@/lib/whatsapp/generator';
import { getProductFallbackImage } from '@/lib/images/productFallback';

interface ProductCardProps {
  product: Product;
  variant?: 'grid' | 'featured' | 'compact';
}

export default function ProductCard({ product, variant = 'grid' }: ProductCardProps) {
  const { addItem } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const primaryImage = product.images?.find((img) => img.isPrimary) || product.images?.[0];
  const imageUrl = (primaryImage && primaryImage.imageUrl)
    ? primaryImage.imageUrl
    : getProductFallbackImage(product.name, product.categoryName);
  const altText = primaryImage?.altText || product.name;

  const whatsappUrl = buildWhatsAppUrl(
    siteConfig.contact.whatsappNumber || '919415160862',
    generateSingleProductMessage(
      product,
      typeof window !== 'undefined' ? window.location.origin : 'https://banwarilalclothhouse.com'
    )
  );

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <article className="group relative flex flex-col bg-canvas-pure rounded-sm border border-ink-border/60 overflow-hidden shadow-card-rest hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 ease-editorial">
      {/* 3:4 Aspect Ratio Image Container */}
      <Link
        href={`/products/${product.slug}`}
        className="relative block aspect-[3/4] w-full overflow-hidden bg-canvas-sand focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold"
        tabIndex={0}
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={altText}
            fill
            className="object-cover transition-transform duration-500 ease-editorial group-hover:scale-[1.035]"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-canvas-muted text-ink-muted text-xs">
            Textile Image
          </div>
        )}

        {/* Floating Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
          {product.categoryName && (
            <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-canvas/90 backdrop-blur-sm text-ink-secondary rounded-full border border-ink-border/40">
              {product.categoryName}
            </span>
          )}
          {product.availability === 'in_stock' && (
            <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-canvas/90 backdrop-blur-sm text-status-success rounded-full border border-ink-border/40">
              In Stock
            </span>
          )}
        </div>
      </Link>

      {/* Card Content */}
      <div className="p-4 flex flex-col flex-1 justify-between bg-canvas-pure">
        <div>
          <Link
            href={`/products/${product.slug}`}
            className="block font-serif text-sm sm:text-base font-medium text-ink hover:text-accent-gold transition-colors line-clamp-1 focus:outline-none focus-visible:ring-1 focus-visible:ring-accent-gold rounded-sm"
          >
            {product.name}
          </Link>

          {/* Subtitle / Fabric info if present */}
          {product.specifications?.fabric && (
            <p className="font-sans text-xs text-ink-secondary mt-1 line-clamp-1">
              {product.specifications.fabric}
            </p>
          )}
        </div>

        {/* Price & Action Row */}
        <div className="mt-3.5 pt-3 border-t border-ink-border/50 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-sans text-xs sm:text-sm font-semibold text-ink">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && product.price && product.compareAtPrice > product.price && (
              <span className="font-sans text-[10px] text-ink-muted line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            <a
              href={whatsappUrl || `https://wa.me/919415160862?text=${encodeURIComponent(product.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-1.5 rounded-full bg-canvas-muted text-brand-whatsapp hover:bg-brand-whatsapp hover:text-white border border-ink-border/80 transition-all duration-200 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-whatsapp"
              title={`Order ${product.name} on WhatsApp`}
              aria-label={`Order ${product.name} on WhatsApp`}
            >
              <MessageCircle className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={handleAddToCart}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold ${
                isAdded
                  ? 'bg-status-success text-white'
                  : 'bg-canvas-muted text-ink hover:bg-ink hover:text-white border border-ink-border/80'
              }`}
              aria-label={`Add ${product.name} to bag`}
            >
              {isAdded ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
