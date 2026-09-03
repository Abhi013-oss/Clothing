import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Sparkles, Store } from 'lucide-react';
import { siteConfig } from '@/config/site';

export default function BrandStory() {
  return (
    <section className="py-20 sm:py-28 bg-canvas-sand/40 border-b border-ink-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Visual Side: Two-Image Editorial Collage */}
          <div className="lg:col-span-5 relative order-2 lg:order-1">
            <div className="relative aspect-[3/4] w-full max-w-sm mx-auto rounded-sm overflow-hidden border border-ink-border shadow-card-hover bg-canvas">
              <Image
                src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=85"
                alt="Handcrafted fabric inspection at Banwarilal Cloth House"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </div>

            {/* Overlapping Floating Badge with Official Store Logo */}
            <div className="absolute -bottom-6 -right-2 sm:-right-6 bg-canvas-pure p-4 sm:p-5 rounded-sm border border-ink-border shadow-card-hover max-w-[250px] flex items-center gap-3.5">
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0 rounded-full overflow-hidden border border-ink-border/80 shadow-sm bg-white">
                <Image
                  src="/images/logo.png"
                  alt="Banwari Lal Cloth House Official Seal"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <span className="font-serif text-2xl sm:text-3xl font-medium text-ink block leading-none">
                  20+
                </span>
                <p className="font-sans text-[11px] font-semibold text-ink-secondary mt-1 uppercase tracking-wider leading-tight">
                  Years of Textile Trust in Chilbila
                </p>
              </div>
            </div>
          </div>

          {/* Narrative Column */}
          <div className="lg:col-span-7 flex flex-col items-start order-1 lg:order-2">
            <span className="font-sans text-xs uppercase tracking-widest text-accent-gold font-semibold mb-2">
              Our Heritage & Values
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-ink leading-tight mb-6">
              Rooted in Chilbila, <br />
              <span className="italic font-normal text-ink-secondary">Serving Generations.</span>
            </h2>

            <p className="font-sans text-base text-ink-secondary leading-relaxed mb-6">
              Since opening our doors in 2003 near Hanuman Mandir in Chilbila Bazaar,{' '}
              <strong className="text-ink font-semibold">{siteConfig.businessName}</strong> has stood for uncompromised fabric quality, genuine handloom craftsmanship, and warm personal service.
            </p>

            <p className="font-sans text-sm sm:text-base text-ink-secondary leading-relaxed mb-8">
              Whether curating an unstitched wedding ensemble, selecting celebratory Banarasi weaves, or choosing reliable daily garments, we combine decades of textile knowledge with modern customer care.
            </p>

            {/* 3 Authentic Trust Signals */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full pt-6 border-t border-ink-border/60 mb-8">
              <div className="flex flex-col">
                <Store className="w-5 h-5 text-accent-gold mb-2" />
                <h3 className="font-serif text-sm font-medium text-ink">Physical Showroom</h3>
                <p className="font-sans text-xs text-ink-secondary mt-1">
                  Touch and inspect every weave in person at Chilbila Bazaar.
                </p>
              </div>

              <div className="flex flex-col">
                <ShieldCheck className="w-5 h-5 text-accent-gold mb-2" />
                <h3 className="font-serif text-sm font-medium text-ink">Curated Fabrics</h3>
                <p className="font-sans text-xs text-ink-secondary mt-1">
                  Hand-selected silk, cotton, and worsted wool lengths.
                </p>
              </div>

              <div className="flex flex-col">
                <Sparkles className="w-5 h-5 text-accent-gold mb-2" />
                <h3 className="font-serif text-sm font-medium text-ink">Personal Service</h3>
                <p className="font-sans text-xs text-ink-secondary mt-1">
                  One-on-one consultation on WhatsApp & in-store.
                </p>
              </div>
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-ink hover:text-accent-gold transition-colors group"
            >
              <span>Read Full Store History</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
