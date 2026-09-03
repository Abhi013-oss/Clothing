import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function VisualShowcase() {
  return (
    <section className="relative py-24 sm:py-32 bg-ink text-white overflow-hidden">
      {/* Decorative Subtle Grid Lines */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="max-w-7xl mx-auto h-full border-x border-white/20" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Editorial Text Statement */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <span className="font-sans text-xs uppercase tracking-widest text-accent-gold font-semibold mb-3">
              Editorial Craftsmanship
            </span>

            <h2 className="font-serif text-3xl sm:text-5xl font-medium text-white leading-tight mb-6">
              The Tactile Poetry of <br />
              <span className="italic font-normal text-canvas-sand">Authentic Handloom.</span>
            </h2>

            <p className="font-sans text-base text-canvas/80 leading-relaxed mb-8 max-w-lg">
              Every fold of silk, every thread of fine resham embroidery, and every weave tells a story of patience. Experience the rich tactile presence of handcrafted Indian textiles.
            </p>

            <Link
              href="/collections/sarees"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-sm bg-accent-gold text-ink font-sans text-sm font-semibold tracking-wider hover:bg-accent-goldHover transition-colors shadow-sm"
            >
              <span>EXPLORE SAREES & WEAVES</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Photographic Lookbook Composition */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4 sm:gap-6">
            <div className="relative aspect-[3/4] rounded-sm overflow-hidden border border-white/20 bg-ink-hover">
              <Image
                src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80"
                alt="Detailed handloom silk weave craftsmanship"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
            <div className="relative aspect-[3/4] rounded-sm overflow-hidden border border-white/20 bg-ink-hover mt-6 sm:mt-10">
              <Image
                src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80"
                alt="Fine suiting fabric drape and texture"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
