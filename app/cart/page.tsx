'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  MessageCircle,
  ArrowRight,
  ChevronRight,
  AlertCircle,
  ShieldCheck,
  Store,
  X,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { siteConfig } from '@/config/site';
import { formatPrice } from '@/lib/utils/formatters';
import { buildWhatsAppUrl, generateCartMessage, trackWhatsAppDispatch } from '@/lib/whatsapp/generator';
import { getProductFallbackImage } from '@/lib/images/productFallback';

export default function CartPage() {
  const {
    items,
    removeItem,
    incrementQuantity,
    decrementQuantity,
    clearCart,
    totalItemCount,
    subtotal,
    removedItemsNotice,
    clearRemovedItemsNotice,
  } = useCart();

  const whatsappMessage = generateCartMessage(items, siteConfig.whatsappCartMode);
  const whatsappUrl = buildWhatsAppUrl(siteConfig.contact.whatsappNumber, whatsappMessage);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Accessible Semantic Breadcrumb */}
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
              Collections
            </Link>
          </li>
          <li>
            <ChevronRight className="w-3.5 h-3.5 text-ink-muted" />
          </li>
          <li className="font-semibold text-ink" aria-current="page">
            Curated Bag
          </li>
        </ol>
      </nav>

      {/* Stale/Purged Products Alert Banner */}
      {removedItemsNotice.length > 0 && (
        <div className="mb-8 p-4 bg-canvas-muted rounded-sm border border-ink-border flex items-start justify-between gap-3 text-xs text-ink">
          <div className="flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-accent-gold flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Inventory Notice:</p>
              <p className="text-ink-secondary mt-0.5">
                One or more garments in your selection were updated or are no longer in stock at our Chilbila store and have been safely removed.
              </p>
            </div>
          </div>
          <button
            onClick={clearRemovedItemsNotice}
            className="p-1 text-ink-secondary hover:text-ink"
            aria-label="Dismiss notice"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Editorial Page Header */}
      <div className="mb-10 pb-6 border-b border-ink-border/60 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border border-ink-border shadow-sm bg-white flex-shrink-0 mt-1">
            <Image
              src="/images/logo.png"
              alt="Banwari Lal Cloth House Official Seal"
              fill
              className="object-contain"
            />
          </div>
          <div>
            <span className="font-sans text-xs uppercase tracking-widest text-accent-gold font-semibold">
              Order Review • Banwari Lal Cloth House
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-medium text-ink mt-1">
              Your Curated Selection
            </h1>
            <p className="font-sans text-sm sm:text-base text-ink-secondary mt-2 max-w-xl">
              Review your pieces before connecting with our store team. All orders and custom sizing are personally confirmed on WhatsApp.
            </p>
          </div>
        </div>

        {items.length > 0 && (
          <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-canvas-muted border border-ink-border text-ink self-start sm:self-auto">
            {totalItemCount} {totalItemCount === 1 ? 'Garment' : 'Garments'} Selected
          </span>
        )}
      </div>

      {items.length === 0 ? (
        /* Empty State */
        <div className="py-20 text-center bg-canvas-pure rounded-sm border border-ink-border p-8 shadow-card-rest max-w-2xl mx-auto">
          <div className="w-16 h-16 mx-auto rounded-full bg-canvas-sand flex items-center justify-center text-ink-secondary mb-4">
            <ShoppingBag className="w-8 h-8 opacity-40" />
          </div>
          <h2 className="font-serif text-2xl font-medium text-ink mb-2">
            Your Curated Bag is Empty
          </h2>
          <p className="font-sans text-sm text-ink-secondary max-w-md mx-auto mb-8 leading-relaxed">
            You have not added any pieces to your bag yet. Browse our handloom sarees, unstitched suitings, and readymade collections to curate your selection.
          </p>
          <Link
            href="/collections"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-sm bg-ink text-white font-sans text-sm font-semibold tracking-wider hover:bg-ink-hover transition-colors shadow-sm"
          >
            <span>EXPLORE COLLECTIONS</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        /* Full Cart Review Layout (2-Column Grid) */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Cart Items List (Col 8) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="divide-y divide-ink-border/60 bg-canvas-pure rounded-sm border border-ink-border p-6 shadow-card-rest">
              {items.map((item) => (
                <div key={item.productId} className="py-6 first:pt-0 last:pb-0 flex gap-4 sm:gap-6 items-start">
                  {/* 3:4 Thumbnail Image */}
                  <Link
                    href={`/products/${item.productSlug}`}
                    className="relative w-24 sm:w-28 aspect-[3/4] rounded-sm overflow-hidden bg-canvas-sand border border-ink-border/60 flex-shrink-0 group"
                  >
                    <Image
                      src={item.thumbnailUrl || getProductFallbackImage(item.productName)}
                      alt={item.productName}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 96px, 112px"
                    />
                  </Link>

                  {/* Garment Details & Controls */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch">
                    <div>
                      {item.categoryName && (
                        <span className="font-sans text-[10px] uppercase tracking-wider text-accent-gold font-semibold">
                          {item.categoryName}
                        </span>
                      )}
                      <Link
                        href={`/products/${item.productSlug}`}
                        className="block font-serif text-base sm:text-lg font-medium text-ink hover:text-accent-gold transition-colors mt-0.5 line-clamp-2"
                      >
                        {item.productName}
                      </Link>
                      <p className="font-sans text-xs sm:text-sm font-semibold text-ink mt-1">
                        {formatPrice(item.price)}
                      </p>
                    </div>

                    {/* Quantity Selector & Item Removal */}
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-ink-border/40">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-ink-border rounded-full bg-canvas-sand">
                        <button
                          onClick={() => decrementQuantity(item.productId)}
                          disabled={item.quantity <= 1}
                          className="p-1.5 text-ink-secondary hover:text-ink disabled:opacity-30 disabled:cursor-not-allowed focus:outline-none"
                          aria-label={`Decrease quantity of ${item.productName}`}
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="font-sans text-xs font-semibold px-2.5 min-w-[24px] text-center text-ink">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => incrementQuantity(item.productId)}
                          disabled={item.quantity >= 10}
                          className="p-1.5 text-ink-secondary hover:text-ink disabled:opacity-30 disabled:cursor-not-allowed focus:outline-none"
                          aria-label={`Increase quantity of ${item.productName}`}
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Line Subtotal if priced */}
                      {item.price && (
                        <span className="hidden sm:inline font-sans text-xs font-semibold text-ink-secondary">
                          Line Total: {formatPrice(item.price * item.quantity)}
                        </span>
                      )}

                      {/* Remove Button */}
                      <button
                        onClick={() => removeItem(item.productId)}
                        className="inline-flex items-center gap-1 text-xs text-ink-muted hover:text-status-error transition-colors focus:outline-none"
                        aria-label={`Remove ${item.productName} from bag`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Utility Bar */}
            <div className="flex items-center justify-between text-xs text-ink-secondary px-2">
              <button
                onClick={clearCart}
                className="hover:text-status-error transition-colors underline underline-offset-2"
              >
                Clear entire bag
              </button>
              <Link
                href="/collections"
                className="hover:text-ink transition-colors inline-flex items-center gap-1 font-semibold"
              >
                <span>Continue browsing collections</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Column: Sticky Selection Summary (Col 4) */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
            <div className="bg-canvas-pure rounded-sm border border-ink-border p-6 shadow-card-hover space-y-6">
              <h2 className="font-serif text-xl font-medium text-ink pb-4 border-b border-ink-border">
                Selection Summary
              </h2>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex items-center justify-between text-ink-secondary">
                  <span>Total Items:</span>
                  <span className="font-semibold text-ink">{totalItemCount}</span>
                </div>

                <div className="flex items-center justify-between text-ink-secondary">
                  <span>Distinct Garments:</span>
                  <span className="font-semibold text-ink">{items.length}</span>
                </div>

                <div className="pt-3 border-t border-ink-border flex items-center justify-between">
                  <span className="font-semibold text-ink">Estimated Subtotal:</span>
                  <span className="font-serif text-lg font-medium text-ink">
                    {subtotal !== null ? formatPrice(subtotal) : 'Quote on Request'}
                  </span>
                </div>

                {subtotal === null && (
                  <p className="text-[11px] text-ink-muted italic">
                    *Your selection includes custom or unpriced heirloom pieces. Exact pricing is confirmed by merchant consultation.
                  </p>
                )}
              </div>

              {/* Dominant Action: Order on WhatsApp */}
              <a
                href={whatsappUrl || `https://wa.me/919415160862?text=${encodeURIComponent(whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  trackWhatsAppDispatch({ source: 'cart', itemCount: totalItemCount });
                }}
                className="w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-sm bg-brand-whatsapp text-white font-sans text-sm font-semibold tracking-wider hover:bg-brand-whatsappHover transition-colors shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-whatsapp"
              >
                <MessageCircle className="w-4 h-4" />
                <span>SEND SELECTION ON WHATSAPP</span>
              </a>

              {/* Physical Fulfillment Notes */}
              <div className="pt-4 border-t border-ink-border/60 space-y-2 text-xs text-ink-secondary">
                <div className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-accent-gold flex-shrink-0 mt-0.5" />
                  <span>
                    No online payment required. Orders and tailored fits are reviewed with you directly.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Store className="w-4 h-4 text-accent-gold flex-shrink-0 mt-0.5" />
                  <span>
                    Pickup & in-person inspection available at Chilbila Bazaar, Pratapgarh.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
