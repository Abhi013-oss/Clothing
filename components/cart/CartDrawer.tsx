'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Trash2, Plus, Minus, MessageCircle, ShoppingBag, ArrowRight, ExternalLink } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { siteConfig } from '@/config/site';
import { formatPrice } from '@/lib/utils/formatters';
import { buildWhatsAppUrl, generateCartMessage, trackWhatsAppDispatch } from '@/lib/whatsapp/generator';
import { getProductFallbackImage } from '@/lib/images/productFallback';

export default function CartDrawer() {
  const {
    items,
    isOpen,
    setIsOpen,
    removeItem,
    incrementQuantity,
    decrementQuantity,
    clearCart,
    totalItemCount,
    subtotal,
  } = useCart();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, setIsOpen]);

  if (!isOpen) return null;

  const whatsappMessage = generateCartMessage(items, siteConfig.whatsappCartMode);
  const whatsappUrl = buildWhatsAppUrl(siteConfig.contact.whatsappNumber, whatsappMessage);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Bag Drawer"
      className="fixed inset-0 z-50"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink/40 backdrop-blur-sm transition-opacity duration-300"
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Slide-over Panel */}
      <div className="fixed inset-y-0 right-0 w-full max-w-md bg-canvas shadow-drawer flex flex-col justify-between z-50 transition-transform duration-300 ease-editorial">
        {/* Drawer Header */}
        <div className="p-6 border-b border-ink-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-ink-border shadow-sm bg-white flex-shrink-0">
              <Image
                src="/images/logo.png"
                alt="Banwari Lal Cloth House Logo"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <h2 className="font-serif text-lg font-medium text-ink leading-none">
                Curated Bag ({totalItemCount})
              </h2>
              <span className="font-sans text-[10px] text-ink-secondary tracking-wider uppercase">
                {siteConfig.businessName}
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 text-ink-secondary hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold rounded-full"
            aria-label="Close shopping bag drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 rounded-full bg-canvas-muted flex items-center justify-center mb-4 text-ink-secondary">
                <ShoppingBag className="w-8 h-8 opacity-40" />
              </div>
              <h3 className="font-serif text-xl font-medium text-ink mb-2">
                Your Shopping Bag is Empty
              </h3>
              <p className="font-sans text-sm text-ink-secondary max-w-xs mb-6">
                Explore our digital catalogue of sarees, suits, readymade garments, and fine textiles.
              </p>
              <button
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-sm bg-ink text-white font-sans text-sm font-semibold hover:bg-ink-hover transition-colors"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="divide-y divide-ink-border">
              {items.map((item) => (
                <div key={item.productId} className="py-4 flex gap-4 items-start">
                  {/* Thumbnail with 3:4 Aspect Ratio */}
                  <Link
                    href={`/products/${item.productSlug}`}
                    onClick={() => setIsOpen(false)}
                    className="relative w-20 aspect-[3/4] bg-canvas-sand rounded-sm overflow-hidden flex-shrink-0 border border-ink-border/60 hover:opacity-90 transition-opacity"
                  >
                    <Image
                      src={item.thumbnailUrl || getProductFallbackImage(item.productName)}
                      alt={item.productName}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </Link>

                  {/* Info & Modifiers */}
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/products/${item.productSlug}`}
                      onClick={() => setIsOpen(false)}
                      className="font-serif text-sm font-medium text-ink hover:text-accent-gold transition-colors leading-snug line-clamp-2 block"
                    >
                      {item.productName}
                    </Link>
                    <p className="font-sans text-xs font-semibold text-ink-secondary mt-1">
                      {formatPrice(item.price)}
                    </p>

                    {/* Quantity Controls & Remove */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-ink-border rounded-full bg-canvas-pure">
                        <button
                          onClick={() => decrementQuantity(item.productId)}
                          disabled={item.quantity <= 1}
                          className="p-2 min-w-[32px] min-h-[32px] flex items-center justify-center text-ink-secondary hover:text-ink disabled:opacity-30 disabled:cursor-not-allowed focus:outline-none"
                          aria-label={`Decrease quantity of ${item.productName}`}
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="font-sans text-xs font-semibold px-2 min-w-[20px] text-center text-ink">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => incrementQuantity(item.productId)}
                          disabled={item.quantity >= 10}
                          className="p-2 min-w-[32px] min-h-[32px] flex items-center justify-center text-ink-secondary hover:text-ink disabled:opacity-30 disabled:cursor-not-allowed focus:outline-none"
                          aria-label={`Increase quantity of ${item.productName}`}
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.productId)}
                        className="p-2 min-w-[36px] min-h-[36px] flex items-center justify-center text-ink-muted hover:text-status-error transition-colors focus:outline-none rounded-full"
                        aria-label={`Remove ${item.productName} from bag`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer / Order Dispatch */}
        {items.length > 0 && (
          <div className="p-6 border-t border-ink-border bg-canvas-sand/40 space-y-3.5">
            {/* Subtotal */}
            {subtotal !== null ? (
              <div className="flex items-center justify-between text-sm">
                <span className="font-sans text-ink-secondary">Estimated Subtotal:</span>
                <span className="font-sans font-semibold text-ink text-base">
                  {formatPrice(subtotal)}
                </span>
              </div>
            ) : (
              <p className="font-sans text-xs text-ink-secondary italic">
                Final pricing and custom sizing confirmed via WhatsApp.
              </p>
            )}

            {/* Dominant Action: Order on WhatsApp */}
            <a
              href={whatsappUrl || `https://wa.me/917080605007?text=${encodeURIComponent(whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                trackWhatsAppDispatch({ source: 'cart', itemCount: totalItemCount });
              }}
              className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-sm bg-brand-whatsapp text-white font-sans text-sm font-semibold tracking-wide hover:bg-brand-whatsappHover transition-colors shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-whatsapp"
            >
              <MessageCircle className="w-4 h-4" />
              <span>ORDER ON WHATSAPP</span>
            </a>

            {/* Link to Full /cart Page */}
            <Link
              href="/cart"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-sm bg-canvas-pure text-ink border border-ink-border font-sans text-xs font-semibold hover:bg-canvas-muted transition-colors text-center"
            >
              <span>Review Full Bag & Details</span>
              <ExternalLink className="w-3.5 h-3.5 text-accent-gold" />
            </Link>

            <div className="flex items-center justify-between text-xs text-ink-muted pt-1">
              <button
                onClick={clearCart}
                className="hover:text-status-error transition-colors underline underline-offset-2"
              >
                Clear all items
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:text-ink transition-colors underline underline-offset-2"
              >
                Continue browsing
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
