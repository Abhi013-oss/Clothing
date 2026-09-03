import React from 'react';
import { MapPin, Phone, MessageCircle, Navigation, Clock } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { buildWhatsAppUrl, generateGeneralEnquiryMessage } from '@/lib/whatsapp/generator';

export default function StoreLocationCard() {
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${siteConfig.address.latitude},${siteConfig.address.longitude}`;
  const generalWhatsAppUrl = buildWhatsAppUrl(
    siteConfig.contact.whatsappNumber,
    generateGeneralEnquiryMessage()
  );

  return (
    <section className="py-20 sm:py-28 bg-canvas border-b border-ink-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-canvas-pure rounded-sm border border-ink-border p-8 sm:p-12 shadow-card-hover">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Address & Direct Triggers */}
            <div className="lg:col-span-7 flex flex-col items-start">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-canvas-muted text-xs font-semibold uppercase tracking-wider text-ink mb-4 border border-ink-border">
                <MapPin className="w-3.5 h-3.5 text-accent-gold" />
                <span>Visit Our Physical Store</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-4xl font-medium text-ink mb-4">
                Experience the Fabrics in Person
              </h2>

              <p className="font-sans text-sm sm:text-base text-ink-secondary leading-relaxed mb-6 max-w-xl">
                We warmly invite you to visit our Chilbila store to feel the texture, drape the silks, and receive personalized tailoring and styling advice.
              </p>

              {/* Exact Address Block */}
              <div className="p-4 rounded-sm bg-canvas-sand/60 border border-ink-border/80 w-full mb-6">
                <p className="font-serif text-base font-medium text-ink">
                  {siteConfig.businessName}
                </p>
                <p className="font-sans text-sm text-ink-secondary mt-1">
                  {siteConfig.address.street}, {siteConfig.address.city}, {siteConfig.address.state} – {siteConfig.address.postalCode}, {siteConfig.address.country}
                </p>
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-ink-border/60 text-xs text-ink-secondary">
                  <Clock className="w-3.5 h-3.5 text-accent-gold" />
                  <span>{siteConfig.contact.storeHours}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-sm bg-ink text-white font-sans text-xs sm:text-sm font-semibold tracking-wider hover:bg-ink-hover transition-colors shadow-sm"
                >
                  <Navigation className="w-4 h-4 text-accent-gold" />
                  <span>GET DIRECTIONS ON GOOGLE MAPS</span>
                </a>

                {generalWhatsAppUrl && (
                  <a
                    href={generalWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3.5 rounded-sm bg-brand-whatsapp text-white font-sans text-xs sm:text-sm font-semibold hover:bg-brand-whatsappHover transition-colors shadow-sm"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Chat on WhatsApp</span>
                  </a>
                )}

                {siteConfig.contact.primaryPhone && (
                  <a
                    href={`tel:${siteConfig.contact.primaryPhone}`}
                    className="inline-flex items-center gap-2 px-5 py-3.5 rounded-sm bg-canvas-muted text-ink font-sans text-xs sm:text-sm font-semibold border border-ink-border hover:bg-canvas-sand transition-colors"
                  >
                    <Phone className="w-4 h-4 text-ink-secondary" />
                    <span>Call Store</span>
                  </a>
                )}
              </div>
            </div>

            {/* Right Column: Visual Landmark Framing */}
            <div className="lg:col-span-5 bg-canvas-sand rounded-sm p-6 border border-ink-border/60 flex flex-col justify-between h-full">
              <div>
                <span className="font-sans text-xs font-semibold uppercase tracking-widest text-ink-secondary">
                  Key Landmark
                </span>
                <h3 className="font-serif text-xl font-medium text-ink mt-1">
                  Near Hanuman Mandir, New Bazaar
                </h3>
                <p className="font-sans text-xs text-ink-secondary mt-2 leading-relaxed">
                  Conveniently situated in the heart of Chilbila New Bazaar, easily accessible from Pratapgarh city center with parking availability noted.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-ink-border">
                <a
                  href={siteConfig.address.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-accent-gold hover:underline inline-flex items-center gap-1.5"
                >
                  <span>View Verified Google Maps Listing</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
