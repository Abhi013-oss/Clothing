import React from 'react';
import Image from 'next/image';
import { MapPin, Phone, MessageCircle, Navigation, Clock, Star } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { buildWhatsAppUrl, generateGeneralEnquiryMessage } from '@/lib/whatsapp/generator';

export const metadata = {
  title: 'Store Location & Contact — BANWARILAL CLOTH HOUSE',
  description: `Visit ${siteConfig.businessName} Near Hanuman Mandir, Chilbila, Pratapgarh. Directions, phone dialer, and WhatsApp inquiries.`,
  alternates: {
    canonical: 'https://banwarilalclothhouse.com/contact',
  },
};

export default function ContactPage() {
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${siteConfig.address.latitude},${siteConfig.address.longitude}`;
  const generalWhatsAppUrl = buildWhatsAppUrl(
    siteConfig.contact.whatsappNumber,
    generateGeneralEnquiryMessage()
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="flex items-center gap-4 mb-6">
        <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0 rounded-full overflow-hidden border border-ink-border/80 shadow-md bg-white">
          <Image
            src="/images/logo.png"
            alt="Banwari Lal Cloth House Official Seal"
            fill
            className="object-contain"
            priority
          />
        </div>
        <div>
          <span className="font-sans text-xs uppercase tracking-widest text-accent-gold font-semibold block">
            Physical Store & Inquiries
          </span>
          <span className="font-serif text-lg sm:text-xl font-medium text-ink block">
            {siteConfig.businessName}
          </span>
        </div>
      </div>
      <h1 className="font-serif text-3xl sm:text-5xl font-medium text-ink mt-2 mb-6">
        Visit or Contact Our Chilbila Store
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <div className="p-6 bg-canvas-pure border border-ink-border rounded-sm shadow-card-rest">
          <MapPin className="w-6 h-6 text-accent-gold mb-3" />
          <h2 className="font-serif text-lg font-medium text-ink mb-1">Store Address</h2>
          <p className="font-sans text-sm text-ink-secondary mb-4">
            {siteConfig.businessName}<br />
            {siteConfig.address.street}<br />
            {siteConfig.address.city}, {siteConfig.address.state} – {siteConfig.address.postalCode}<br />
            India
          </p>
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-gold hover:underline"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Get Directions on Google Maps</span>
          </a>
        </div>

        <div className="p-6 bg-canvas-pure border border-ink-border rounded-sm shadow-card-rest">
          <Clock className="w-6 h-6 text-accent-gold mb-3" />
          <h2 className="font-serif text-lg font-medium text-ink mb-1">Operating Hours & Contact</h2>
          <p className="font-sans text-sm text-ink-secondary mb-4">
            {siteConfig.contact.storeHours}
          </p>
          <div className="space-y-2">
            {siteConfig.contact.primaryPhone && (
              <a
                href={`tel:${siteConfig.contact.primaryPhone}`}
                className="flex items-center gap-2 text-xs font-medium text-ink hover:text-accent-gold"
              >
                <Phone className="w-3.5 h-3.5 text-ink-secondary" />
                <span>Call Store: {siteConfig.contact.primaryPhone}</span>
              </a>
            )}
            {generalWhatsAppUrl && (
              <a
                href={generalWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-medium text-brand-whatsapp hover:underline"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Chat on WhatsApp</span>
              </a>
            )}
          </div>
        </div>

        {/* Google Reviews Card */}
        <div className="p-6 bg-canvas-pure border border-ink-border rounded-sm shadow-card-rest md:col-span-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
                <span className="font-serif text-sm font-bold text-ink ml-1.5">5.0 / 5.0 Google Rating</span>
              </div>
              <h2 className="font-serif text-lg font-medium text-ink">Have you visited our Chilbila store?</h2>
              <p className="font-sans text-xs text-ink-secondary mt-0.5">
                Share your shopping experience or view authentic reviews from fellow customers on Google Maps.
              </p>
            </div>
            {siteConfig.address.googleReviewsUrl && (
              <a
                href={siteConfig.address.googleReviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-sm bg-ink text-white font-sans text-xs font-semibold hover:bg-ink-hover transition-colors shadow-sm self-start sm:self-auto flex-shrink-0"
                aria-label="Write a Google Review"
              >
                <span>Write a Google Review</span>
                <Star className="w-3.5 h-3.5 fill-accent-gold text-accent-gold" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
