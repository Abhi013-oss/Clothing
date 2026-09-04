'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Menu, MessageCircle, Phone, MapPin } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { siteConfig } from '@/config/site';
import { buildWhatsAppUrl, generateGeneralEnquiryMessage } from '@/lib/whatsapp/generator';
import MobileMenuDrawer from './MobileMenuDrawer';

export default function Navbar() {
  const { totalItemCount, setIsOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const generalWhatsAppUrl = buildWhatsAppUrl(
    siteConfig.contact.whatsappNumber,
    generateGeneralEnquiryMessage()
  );

  return (
    <>
      <header
        className={`sticky top-0 z-20 transition-all duration-300 ${
          isScrolled
            ? 'bg-canvas/95 backdrop-blur-md shadow-card-rest border-b border-ink-border/80 py-3.5'
            : 'bg-canvas/80 backdrop-blur-sm border-b border-ink-border/40 py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Masthead with Official Logo */}
            <Link
              href="/"
              className="group flex items-center gap-2 sm:gap-3.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold rounded-sm min-w-0"
            >
              <div className="relative w-9 h-9 sm:w-11 sm:h-11 flex-shrink-0 rounded-full overflow-hidden border border-ink-border/80 shadow-sm bg-white">
                <Image
                  src="/images/logo.png"
                  alt="Banwari Lal Cloth House Official Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-serif text-base sm:text-xl lg:text-2xl font-medium tracking-[0.02em] sm:tracking-[0.05em] text-ink uppercase transition-colors group-hover:text-ink-hover truncate">
                  {siteConfig.businessName}
                </span>
                <span className="font-sans text-[9px] sm:text-xs tracking-[0.08em] sm:tracking-[0.14em] uppercase text-ink-secondary truncate">
                  Chilbila, Pratapgarh • Est. {siteConfig.establishedYear}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className="font-sans text-sm font-medium text-ink hover:text-accent-gold transition-colors"
              >
                Home
              </Link>
              <Link
                href="/collections"
                className="font-sans text-sm font-medium text-ink hover:text-accent-gold transition-colors"
              >
                Collections
              </Link>
              <Link
                href="/about"
                className="font-sans text-sm font-medium text-ink hover:text-accent-gold transition-colors"
              >
                Heritage & Story
              </Link>
              <Link
                href="/contact"
                className="font-sans text-sm font-medium text-ink hover:text-accent-gold transition-colors flex items-center gap-1.5"
              >
                <MapPin className="w-3.5 h-3.5 text-accent-gold" />
                Store Location
              </Link>
            </nav>

            {/* Actions: Cart & WhatsApp */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              {/* WhatsApp Quick Trigger */}
              {generalWhatsAppUrl ? (
                <a
                  href={generalWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-ink bg-canvas-muted hover:bg-canvas-sand border border-ink-border rounded-full transition-all duration-200"
                  aria-label="Enquire on WhatsApp"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-brand-whatsapp" />
                  <span>Enquire</span>
                </a>
              ) : null}

              {/* Shopping Bag Trigger */}
              <button
                onClick={() => setIsOpen(true)}
                className="relative p-2.5 text-ink hover:text-accent-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold rounded-full transition-colors"
                aria-label={`Shopping bag with ${totalItemCount} items`}
              >
                <ShoppingBag className="w-5 h-5" />
                {totalItemCount > 0 && (
                  <span
                    aria-live="polite"
                    className="absolute top-1 right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold text-white bg-ink rounded-full transition-transform transform scale-100"
                  >
                    {totalItemCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="md:hidden p-2.5 text-ink hover:text-accent-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold rounded-sm"
                aria-label="Open mobile navigation menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Off-Canvas Drawer */}
      <MobileMenuDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
