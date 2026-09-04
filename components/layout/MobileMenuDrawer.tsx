'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, MapPin, Phone, MessageCircle, ArrowRight, Star } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { buildWhatsAppUrl, generateGeneralEnquiryMessage } from '@/lib/whatsapp/generator';

interface MobileMenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenuDrawer({ isOpen, onClose }: MobileMenuDrawerProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
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
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const generalWhatsAppUrl = buildWhatsAppUrl(
    siteConfig.contact.whatsappNumber,
    generateGeneralEnquiryMessage()
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
      className="fixed inset-0 z-40 md:hidden"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink/40 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-over Drawer Panel */}
      <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-canvas shadow-drawer flex flex-col justify-between p-6 z-50 transform transition-transform duration-300 ease-editorial">
        {/* Drawer Header */}
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-ink-border">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-ink-border/80 shadow-sm bg-white flex-shrink-0">
                <Image
                  src="/images/logo.png"
                  alt="Banwari Lal Cloth House Official Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-base font-medium text-ink tracking-wide">
                  BANWARILAL
                </span>
                <span className="font-sans text-[10px] tracking-widest text-ink-secondary uppercase">
                  Cloth House • Est. 2003
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-ink-secondary hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold rounded-full"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="mt-8 flex flex-col space-y-5">
            <Link
              href="/"
              onClick={onClose}
              className="font-serif text-xl text-ink hover:text-accent-gold transition-colors flex items-center justify-between"
            >
              <span>Home</span>
              <ArrowRight className="w-4 h-4 text-ink-muted" />
            </Link>
            <Link
              href="/collections"
              onClick={onClose}
              className="font-serif text-xl text-ink hover:text-accent-gold transition-colors flex items-center justify-between"
            >
              <span>All Collections</span>
              <ArrowRight className="w-4 h-4 text-ink-muted" />
            </Link>
            <Link
              href="/about"
              onClick={onClose}
              className="font-serif text-xl text-ink hover:text-accent-gold transition-colors flex items-center justify-between"
            >
              <span>Heritage & Story</span>
              <ArrowRight className="w-4 h-4 text-ink-muted" />
            </Link>
            <Link
              href="/contact"
              onClick={onClose}
              className="font-serif text-xl text-ink hover:text-accent-gold transition-colors flex items-center justify-between"
            >
              <span>Store Location</span>
              <ArrowRight className="w-4 h-4 text-ink-muted" />
            </Link>
            <Link
              href="/cart"
              onClick={onClose}
              className="font-serif text-xl text-ink hover:text-accent-gold transition-colors flex items-center justify-between pt-2 border-t border-ink-border/50"
            >
              <span>Curated Bag (Selection)</span>
              <ArrowRight className="w-4 h-4 text-accent-gold" />
            </Link>
          </nav>
        </div>

        {/* Action / Contact Block */}
        <div className="pt-6 border-t border-ink-border space-y-3">
          {generalWhatsAppUrl && (
            <a
              href={generalWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-sm bg-brand-whatsapp text-white text-sm font-semibold hover:bg-brand-whatsappHover transition-colors shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Enquire on WhatsApp</span>
            </a>
          )}

          {siteConfig.contact.primaryPhone && (
            <a
              href={`tel:${siteConfig.contact.primaryPhone}`}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-sm bg-canvas-muted text-ink text-sm font-semibold hover:bg-canvas-sand border border-ink-border transition-colors"
            >
              <Phone className="w-4 h-4 text-ink-secondary" />
              <span>Call Store: {siteConfig.contact.primaryPhone}</span>
            </a>
          )}

          {siteConfig.address.googleReviewsUrl && (
            <a
              href={siteConfig.address.googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-ink bg-canvas-pure border border-ink-border rounded-sm hover:bg-canvas-sand transition-colors shadow-sm"
              aria-label="Write a Google Review"
            >
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>Write a Google Review</span>
            </a>
          )}

          <a
            href={siteConfig.address.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs text-ink-secondary hover:text-ink transition-colors"
          >
            <MapPin className="w-3.5 h-3.5 text-accent-gold" />
            <span>Near Hanuman Mandir, Chilbila</span>
          </a>
        </div>
      </div>
    </div>
  );
}
