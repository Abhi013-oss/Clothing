import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, MessageCircle, ArrowUpRight } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { categories } from '@/data/categories';
import { buildWhatsAppUrl, generateGeneralEnquiryMessage } from '@/lib/whatsapp/generator';

export default function Footer() {
  const generalWhatsAppUrl = buildWhatsAppUrl(
    siteConfig.contact.whatsappNumber,
    generateGeneralEnquiryMessage()
  );

  return (
    <footer className="bg-canvas border-t border-ink-border text-ink pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-ink-border/60">
          {/* Column 1: Brand & Heritage (Col 4) */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <Link href="/" className="group flex items-center gap-3.5 mb-4">
              <div className="relative w-12 h-12 flex-shrink-0 rounded-full overflow-hidden border border-ink-border/80 shadow-sm bg-white">
                <Image
                  src="/images/logo.png"
                  alt="Banwari Lal Cloth House Official Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl sm:text-2xl font-medium tracking-wide text-ink uppercase">
                  {siteConfig.businessName}
                </span>
                <span className="font-sans text-[11px] tracking-widest text-ink-secondary uppercase mt-0.5">
                  Chilbila, Pratapgarh • Est. {siteConfig.establishedYear}
                </span>
              </div>
            </Link>
            <p className="font-sans text-xs sm:text-sm text-ink-secondary leading-relaxed max-w-sm mb-6">
              A trusted physical cloth house and apparel retailer serving Pratapgarh since 2003. We specialize in fine handloom sarees, unstitched suit lengths, festive readymade garments, and menswear essentials.
            </p>
            <div className="text-xs text-ink-secondary">
              <span className="font-semibold text-ink">In-Store Shopping:</span> Available daily near Hanuman Mandir.
            </div>
          </div>

          {/* Column 2: Collections Directory (Col 3) */}
          <div className="lg:col-span-3">
            <h3 className="font-serif text-sm font-medium text-ink uppercase tracking-wider mb-4">
              Collections
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-ink-secondary">
              <li>
                <Link href="/collections" className="hover:text-accent-gold transition-colors">
                  All Collections
                </Link>
              </li>
              {categories.slice(0, 4).map((cat) => (
                <li key={cat.id}>
                  <Link href={`/collections/${cat.slug}`} className="hover:text-accent-gold transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quick Navigation (Col 2) */}
          <div className="lg:col-span-2">
            <h3 className="font-serif text-sm font-medium text-ink uppercase tracking-wider mb-4">
              Explore
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-ink-secondary">
              <li>
                <Link href="/" className="hover:text-accent-gold transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-accent-gold transition-colors">
                  Heritage & Story
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-accent-gold transition-colors">
                  Store Location
                </Link>
              </li>
              <li>
                <a
                  href={siteConfig.address.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent-gold transition-colors inline-flex items-center gap-1"
                >
                  <span>Google Maps</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
              {siteConfig.address.googleReviewsUrl && (
                <li>
                  <a
                    href={siteConfig.address.googleReviewsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent-gold transition-colors inline-flex items-center gap-1 font-medium text-ink"
                  >
                    <span>Write a Google Review</span>
                    <ArrowUpRight className="w-3 h-3 text-accent-gold" />
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Column 4: Store Location & Contact (Col 3) */}
          <div className="lg:col-span-3 flex flex-col items-start">
            <h3 className="font-serif text-sm font-medium text-ink uppercase tracking-wider mb-4">
              Chilbila Store
            </h3>
            <div className="flex items-start gap-2 text-xs sm:text-sm text-ink-secondary mb-3">
              <MapPin className="w-4 h-4 text-accent-gold flex-shrink-0 mt-0.5" />
              <span>
                {siteConfig.address.street}, {siteConfig.address.city}, {siteConfig.address.state} – {siteConfig.address.postalCode}
              </span>
            </div>

            {siteConfig.contact.primaryPhone && (
              <div className="flex items-center gap-2 text-xs sm:text-sm text-ink-secondary mb-2">
                <Phone className="w-4 h-4 text-accent-gold flex-shrink-0" />
                <a href={`tel:${siteConfig.contact.primaryPhone}`} className="hover:text-ink transition-colors">
                  {siteConfig.contact.primaryPhone}
                </a>
              </div>
            )}

            {generalWhatsAppUrl && (
              <div className="flex items-center gap-2 text-xs sm:text-sm text-ink-secondary mb-4">
                <MessageCircle className="w-4 h-4 text-brand-whatsapp flex-shrink-0" />
                <a
                  href={generalWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-whatsapp transition-colors font-medium"
                >
                  WhatsApp Inquiries
                </a>
              </div>
            )}

            <p className="text-[11px] text-ink-muted italic">
              *All digital orders and reservations are fulfilled directly through personal merchant consultation on WhatsApp or in-store.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-ink-secondary gap-4">
          <p>
            © {new Date().getFullYear()} {siteConfig.businessName}. All rights reserved.
          </p>
          <p className="text-ink-muted text-[11px]">
            Established 2003 • Chilbila, Pratapgarh, Uttar Pradesh
          </p>
        </div>
      </div>
    </footer>
  );
}
