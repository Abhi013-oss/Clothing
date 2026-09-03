import React from 'react';
import Link from 'next/link';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { buildWhatsAppUrl, generateGeneralEnquiryMessage } from '@/lib/whatsapp/generator';

export default function FinalCTA() {
  const generalWhatsAppUrl = buildWhatsAppUrl(
    siteConfig.contact.whatsappNumber,
    generateGeneralEnquiryMessage()
  );

  return (
    <section className="py-20 sm:py-28 bg-canvas-muted/60 border-b border-ink-border/60 text-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <span className="font-sans text-xs uppercase tracking-widest text-accent-gold font-semibold">
          Begin Your Discovery
        </span>

        <h2 className="font-serif text-3xl sm:text-5xl font-medium text-ink mt-3 mb-5 leading-tight">
          Find Your Perfect Outfit Today
        </h2>

        <p className="font-sans text-sm sm:text-base text-ink-secondary max-w-xl mx-auto mb-8 leading-relaxed">
          Browse our full digital catalogue, add your favourite pieces to your bag, and order directly with personal guidance from our team via WhatsApp.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/collections"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-sm bg-ink text-white font-sans text-sm font-semibold tracking-wider hover:bg-ink-hover transition-colors shadow-sm"
          >
            <span>EXPLORE FULL CATALOGUE</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          {generalWhatsAppUrl && (
            <a
              href={generalWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-sm bg-brand-whatsapp text-white font-sans text-sm font-semibold tracking-wider hover:bg-brand-whatsappHover transition-colors shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>ENQUIRE ON WHATSAPP</span>
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
