'use client';

import React, { useState } from 'react';
import { Plus, Check, MessageCircle, ShoppingBag, ShieldCheck, MapPin } from 'lucide-react';
import { Product } from '@/types/product';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils/formatters';
import { siteConfig } from '@/config/site';
import { buildWhatsAppUrl, generateSingleProductMessage, trackWhatsAppDispatch } from '@/lib/whatsapp/generator';

interface ProductActionsProps {
  product: Product;
}

export default function ProductActions({ product }: ProductActionsProps) {
  const { addItem, setIsOpen } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const singleWhatsAppMessage = generateSingleProductMessage(
    product,
    'https://banwarilalclothhouse.com'
  );
  const singleWhatsAppUrl = buildWhatsAppUrl(
    siteConfig.contact.whatsappNumber,
    singleWhatsAppMessage
  );

  const handleAddToCart = () => {
    addItem(product, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const isAvailable = product.availability === 'in_stock' || product.availability === 'upon_request';

  return (
    <div className="space-y-6">
      {/* Screen Reader Live Announcement */}
      <div aria-live="polite" className="sr-only" role="status">
        {isAdded ? `${product.name} added to shopping bag` : ''}
      </div>

      {/* Desktop & Standard Viewport Action Area */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
        {/* Primary CTA: Add to Bag */}
        <button
          onClick={handleAddToCart}
          disabled={!isAvailable}
          className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-sm font-sans text-sm font-semibold tracking-wider transition-all duration-200 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold ${
            isAdded
              ? 'bg-status-success text-white'
              : 'bg-ink text-white hover:bg-ink-hover hover:-translate-y-0.5 active:translate-y-0'
          } disabled:opacity-40 disabled:cursor-not-allowed`}
          aria-label={`Add ${product.name} to shopping bag`}
        >
          {isAdded ? (
            <>
              <Check className="w-4 h-4" />
              <span>ADDED TO BAG</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4" />
              <span>ADD TO BAG</span>
            </>
          )}
        </button>

        {/* Secondary High-Intent Action: Order on WhatsApp */}
        <a
          href={singleWhatsAppUrl || `https://wa.me/917080605007?text=${encodeURIComponent(singleWhatsAppMessage)}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            trackWhatsAppDispatch({ source: 'product', productId: product.id });
          }}
          className="flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-sm bg-brand-whatsapp text-white font-sans text-sm font-semibold tracking-wider hover:bg-brand-whatsappHover hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-whatsapp"
          aria-label="Order or enquire about this garment directly on WhatsApp"
        >
          <MessageCircle className="w-4 h-4" />
          <span>ORDER ON WHATSAPP</span>
        </a>
      </div>

      {/* Store Consultation & Fulfillment Reassurance */}
      <div className="p-4 rounded-sm bg-canvas-sand/60 border border-ink-border/70 space-y-2 text-xs text-ink-secondary">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-accent-gold flex-shrink-0" />
          <span>
            <strong className="text-ink font-semibold">Direct Merchant Consultation:</strong> Inquire about custom sizing, blouse stitching, and drape on WhatsApp.
          </span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-accent-gold flex-shrink-0" />
          <span>
            <strong className="text-ink font-semibold">Physical Showroom:</strong> In-store pickup available at Near Hanuman Mandir, Chilbila, Pratapgarh.
          </span>
        </div>
      </div>

      {/* Mobile Fixed Sticky Bottom Action Bar (Mobile viewports only) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 p-3 bg-canvas/95 backdrop-blur-md border-t border-ink-border shadow-drawer flex items-center justify-between gap-3">
        <div className="flex flex-col min-w-0">
          <span className="font-serif text-sm font-medium text-ink truncate">
            {formatPrice(product.price)}
          </span>
          <span className="font-sans text-[10px] text-ink-secondary uppercase tracking-wider">
            {product.availability === 'in_stock' ? 'In Stock' : 'Upon Request'}
          </span>
        </div>

        <div className="flex items-center gap-2 flex-1 justify-end">
          <button
            onClick={handleAddToCart}
            className={`py-3 px-4 rounded-sm text-xs font-semibold transition-colors ${
              isAdded ? 'bg-status-success text-white' : 'bg-ink text-white'
            }`}
            aria-label="Add to bag"
          >
            {isAdded ? '✓ Added' : 'Add to Bag'}
          </button>

          <a
            href={singleWhatsAppUrl || `https://wa.me/917080605007?text=${encodeURIComponent(singleWhatsAppMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              trackWhatsAppDispatch({ source: 'product', productId: product.id });
            }}
            className="py-3 px-4 rounded-sm bg-brand-whatsapp text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm"
            aria-label="Order on WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
