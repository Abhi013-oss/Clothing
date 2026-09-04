'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MessageCircle, Sparkles } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { buildWhatsAppUrl, generateGeneralEnquiryMessage } from '@/lib/whatsapp/generator';

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Subtle pointer depth (Desktop only, clamped to ±2.5 deg)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || window.innerWidth < 1024) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const rect = containerRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const xPct = mouseX / rect.width - 0.5;
      const yPct = mouseY / rect.height - 0.5;
      setRotate({
        x: -yPct * 4, // Max ±2 degrees
        y: xPct * 4,
      });
    };

    const handleMouseLeave = () => {
      setRotate({ x: 0, y: 0 });
      setIsHovered(false);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);
    }
    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  const generalWhatsAppUrl = buildWhatsAppUrl(
    siteConfig.contact.whatsappNumber,
    generateGeneralEnquiryMessage()
  );

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden pt-6 sm:pt-12 pb-16 sm:pb-24 border-b border-ink-border/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Editorial Column: Typography & Intent */}
          <div className="lg:col-span-7 flex flex-col items-start z-10">
            {/* Heritage Credential Eyebrow with Official Store Crest */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-canvas-muted border border-ink-border/80 text-[11px] sm:text-xs font-semibold tracking-widest text-ink uppercase mb-5 shadow-sm">
              <div className="relative w-5 h-5 rounded-full overflow-hidden border border-ink-border/60 bg-white flex-shrink-0">
                <Image
                  src="/images/logo.png"
                  alt="Banwari Lal Cloth House Seal"
                  fill
                  className="object-contain"
                />
              </div>
              <span>Retail Excellence Since {siteConfig.establishedYear} • Chilbila</span>
            </div>

            {/* Main Display Headline */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium text-ink leading-[1.12] tracking-[-0.015em] mb-6">
              Timeless Weaves, <br />
              <span className="italic font-normal text-ink-secondary">Curated for Generations.</span>
            </h1>

            {/* Narrative Subtitle */}
            <p className="font-sans text-base sm:text-lg text-ink-secondary leading-relaxed max-w-xl mb-8">
              Explore our celebrated digital showcase of handloom sarees, unstitched suit fabrics, 
              contemporary readymade garments, and fine menswear textiles from Chilbila, Pratapgarh.
            </p>

            {/* Action CTA Group */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <Link
                href="/collections"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-sm bg-ink text-white font-sans text-sm font-semibold tracking-wider hover:bg-ink-hover hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 shadow-sm"
              >
                <span>EXPLORE COLLECTION</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              {generalWhatsAppUrl ? (
                <a
                  href={generalWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-sm bg-canvas-muted text-ink font-sans text-sm font-semibold border border-ink-border hover:bg-canvas-sand hover:border-accent-gold transition-all duration-200"
                >
                  <MessageCircle className="w-4 h-4 text-brand-whatsapp" />
                  <span>Enquire on WhatsApp</span>
                </a>
              ) : (
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-sm bg-canvas-muted text-ink font-sans text-sm font-semibold border border-ink-border hover:bg-canvas-sand transition-all duration-200"
                >
                  <span>Visit Chilbila Store</span>
                </Link>
              )}
            </div>

            {/* Storefront Landmark Confirmation */}
            <div className="mt-8 sm:mt-10 pt-6 border-t border-ink-border/60 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-ink-secondary">
              <div>
                <span className="font-semibold text-ink">Physical Store:</span> Near Hanuman Mandir, Chilbila
              </div>
              <div>
                <span className="font-semibold text-ink">Direct Ordering:</span> Via WhatsApp & In-Store
              </div>
            </div>
          </div>

          {/* Right Visual Column: Signature 3D Spatial Frame */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            {/* Ambient Shadow Layer */}
            <div className="absolute -inset-2 rounded-sm bg-canvas-sand -z-10 transform rotate-1 hidden sm:block border border-ink-border/40" />

            {/* 3D Depth Card Container */}
            <div
              style={{
                transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
                transition: 'transform 400ms cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              className="relative aspect-[3/4] w-full max-w-md mx-auto rounded-sm overflow-hidden border border-ink-border shadow-card-hover bg-canvas-sand"
            >
              <Image
                src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85"
                alt="Banwarilal Cloth House Signature Indian Saree Craftsmanship"
                fill
                priority
                className="object-cover transition-transform duration-700 ease-editorial hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
              />

              {/* Authentic Store Seal Stamp */}
              <div className="absolute top-3.5 right-3.5 z-10 w-11 h-11 rounded-full overflow-hidden border border-ink-border/80 shadow-md bg-white/95 backdrop-blur-sm p-0.5">
                <div className="relative w-full h-full rounded-full overflow-hidden">
                  <Image
                    src="/images/logo.png"
                    alt="Banwari Lal Cloth House Official Seal"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Editorial Frame Overlay Tag */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-sm bg-canvas/90 backdrop-blur-md border border-ink-border/60">
                <p className="font-serif text-sm font-medium text-ink">
                  Heritage Banarasi Silk Collection
                </p>
                <p className="font-sans text-[11px] text-ink-secondary mt-0.5">
                  Handcrafted Zari Weaves • In-Store & WhatsApp Inquiries
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
