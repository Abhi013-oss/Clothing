'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { siteConfig } from '@/config/site';

export default function PageEntranceOverlay() {
  const [stage, setStage] = useState<'showing' | 'fading' | 'hidden'>('hidden');

  useEffect(() => {
    // Check if user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setStage('hidden');
      return;
    }

    // Check session storage to avoid repeating on rapid sub-page clicks
    const hasSeen = sessionStorage.getItem('bch_entrance_shown');
    if (hasSeen) {
      setStage('hidden');
      return;
    }

    // Begin entrance sequence
    setStage('showing');

    // After 900ms, begin smooth upward/fade exit transition
    const fadeTimer = setTimeout(() => {
      setStage('fading');
      sessionStorage.setItem('bch_entrance_shown', 'true');
    }, 900);

    // After fade completes (900ms + 700ms transition), unmount from DOM
    const hideTimer = setTimeout(() => {
      setStage('hidden');
    }, 1650);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  const handleDismiss = () => {
    setStage('fading');
    sessionStorage.setItem('bch_entrance_shown', 'true');
    setTimeout(() => setStage('hidden'), 500);
  };

  if (stage === 'hidden') return null;

  return (
    <div
      onClick={handleDismiss}
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-canvas transition-all duration-700 ease-editorial cursor-pointer select-none ${
        stage === 'fading'
          ? 'opacity-0 -translate-y-6 pointer-events-none scale-102'
          : 'opacity-100 translate-y-0 pointer-events-auto'
      }`}
      aria-hidden="true"
    >
      {/* Subtle luxury ambient pattern overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#C5A880_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-md">
        {/* Official Store Seal with Soft Gold Aura */}
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 bg-white shadow-card-hover border border-accent-gold/60 mb-6 animate-scale-up animate-gold-glow">
          <div className="relative w-full h-full rounded-full overflow-hidden">
            <Image
              src="/images/logo.png"
              alt={`${siteConfig.businessName} Crest`}
              fill
              priority
              className="object-contain p-1"
            />
          </div>
        </div>

        {/* Brand Name Typography */}
        <h1 className="font-serif text-2xl sm:text-3xl font-semibold tracking-wide text-ink mb-2 animate-fade-in">
          {siteConfig.businessName}
        </h1>

        {/* Heritage Tagline & Location */}
        <p className="font-sans text-xs sm:text-sm tracking-[0.25em] text-accent-gold font-medium uppercase mb-4 animate-slide-up">
          Est. {siteConfig.establishedYear} • Chilbila, Pratapgarh
        </p>

        {/* Animated Expanding Gold Divider */}
        <div className="h-[2px] w-28 bg-gradient-to-r from-transparent via-accent-gold to-transparent my-2 animate-pulse" />

        <p className="font-serif italic text-xs sm:text-sm text-ink-secondary mt-1 animate-fade-in">
          Fine Sarees, Unstitched Suits & Curated Textiles
        </p>
      </div>

      {/* Tiny subtle skip hint */}
      <div className="absolute bottom-6 text-[10px] tracking-widest text-ink-muted/70 uppercase">
        Tap anywhere to enter
      </div>
    </div>
  );
}
