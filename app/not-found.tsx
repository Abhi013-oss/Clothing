import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Page Not Found — BANWARILAL CLOTH HOUSE',
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <span className="font-sans text-xs uppercase tracking-widest text-accent-gold font-semibold">
        Notice
      </span>
      <h1 className="font-serif text-4xl sm:text-5xl font-medium text-ink mt-2 mb-4">
        Garment or Page Not Found
      </h1>
      <p className="font-sans text-sm sm:text-base text-ink-secondary mb-8">
        The piece you are looking for may have been updated or moved in our digital catalogue.
      </p>
      <div className="flex justify-center gap-4">
        <Link
          href="/collections"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-sm bg-ink text-white font-sans text-sm font-semibold hover:bg-ink-hover transition-colors"
        >
          <span>Explore All Collections</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-sm bg-canvas-muted text-ink font-sans text-sm font-semibold border border-ink-border hover:bg-canvas-sand transition-colors"
        >
          <span>Return Home</span>
        </Link>
      </div>
    </div>
  );
}
