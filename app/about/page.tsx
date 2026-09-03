import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/config/site';

export const metadata = {
  title: 'Heritage & Story — BANWARILAL CLOTH HOUSE',
  description: `Learn about ${siteConfig.businessName}, serving Chilbila, Pratapgarh since ${siteConfig.establishedYear}.`,
  alternates: {
    canonical: 'https://banwarilalclothhouse.com/about',
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="flex items-center gap-4 mb-6">
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-full overflow-hidden border border-ink-border/80 shadow-md bg-white">
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
            Established {siteConfig.establishedYear}
          </span>
          <span className="font-serif text-lg sm:text-xl font-medium text-ink block">
            {siteConfig.businessName}
          </span>
          <span className="font-sans text-xs text-ink-secondary">
            Chilbila, Pratapgarh, Uttar Pradesh
          </span>
        </div>
      </div>
      <h1 className="font-serif text-3xl sm:text-5xl font-medium text-ink mt-2 mb-6">
        Over 20 Years of Textile Tradition in Chilbila
      </h1>
      <div className="prose prose-stone font-sans text-ink-secondary leading-relaxed space-y-4">
        <p>
          Founded in 2003 near Hanuman Mandir in Chilbila Bazaar, {siteConfig.businessName} has grown with the community of Pratapgarh as a trusted destination for quality handloom sarees, unstitched dress pieces, suits, readymade apparel, and suiting-shirting fabrics.
        </p>
        <p>
          Our mission has always been simple: provide genuine fabrics, honest pricing, and personal consultation for every customer who walks through our doors or connects with us online.
        </p>
      </div>
      <div className="mt-10">
        <Link
          href="/collections"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-sm bg-ink text-white font-sans text-sm font-semibold hover:bg-ink-hover transition-colors"
        >
          <span>Explore Our Collections</span>
          <span>→</span>
        </Link>
      </div>
    </div>
  );
}
