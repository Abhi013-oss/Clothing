'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { curatedDepartments } from '@/data/categories';
import ScrollReveal from '@/components/common/ScrollReveal';

export default function CategoryGrid() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  const checkScrollability = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll > 0) {
      setScrollProgress(Math.min(100, Math.max(0, (scrollLeft / maxScroll) * 100)));
    }
  }, []);

  useEffect(() => {
    checkScrollability();
    const container = scrollRef.current;
    if (!container) return;

    const onResize = () => checkScrollability();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [checkScrollability]);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const cardWidth = 320; // approximate card width + gap
    const distance = direction === 'left' ? -cardWidth : cardWidth;
    scrollRef.current.scrollBy({
      left: distance,
      behavior: 'smooth',
    });
  };

  // Mouse Drag to Scroll handlers for desktop users
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeftState(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // multiplier for natural drag feel
    scrollRef.current.scrollLeft = scrollLeftState - walk;
    checkScrollability();
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  return (
    <section className="py-16 sm:py-24 border-b border-ink-border/50 bg-canvas overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal direction="up" delay={50}>
          <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between text-center sm:text-left gap-6 mb-10 sm:mb-12">
            <div className="flex flex-col items-center sm:items-start">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-canvas-muted border border-ink-border text-xs font-semibold uppercase tracking-widest text-ink mb-3 shadow-sm mx-auto sm:mx-0">
                <Sparkles className="w-3 h-3 text-accent-gold" />
                <span>Curated Departments ({curatedDepartments.length})</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-medium text-ink leading-tight">
                Explore by Clothing Category
              </h2>
              <p className="font-sans text-xs sm:text-sm text-ink-secondary mt-2 max-w-xl mx-auto sm:mx-0">
                Scroll sideways to browse all our festive handloom sarees, unstitched suitings, bridal lehengas, kurtis, and menswear fabrics.
              </p>
            </div>

            {/* Navigation Controls: Arrows & Full Collection Link */}
            <div className="flex items-center justify-center sm:justify-end gap-3 self-center sm:self-end">
              <Link
                href="/collections"
                className="inline-flex items-center gap-1.5 font-sans text-xs sm:text-sm font-semibold text-ink hover:text-accent-gold transition-colors mr-2 group"
              >
                <span>View All</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              {/* Manual Left Scroll Button */}
              <button
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                className={`w-11 h-11 rounded-full border border-ink-border bg-canvas-pure flex items-center justify-center transition-all duration-200 ${
                  canScrollLeft
                    ? 'text-ink hover:bg-ink hover:text-white shadow-sm hover:scale-105 active:scale-95'
                    : 'text-ink-muted/40 opacity-40 cursor-not-allowed'
                } focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold`}
                aria-label="Scroll left to previous clothing departments"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Manual Right Scroll Button */}
              <button
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                className={`w-11 h-11 rounded-full border border-ink-border bg-canvas-pure flex items-center justify-center transition-all duration-200 ${
                  canScrollRight
                    ? 'text-ink hover:bg-ink hover:text-white shadow-sm hover:scale-105 active:scale-95'
                    : 'text-ink-muted/40 opacity-40 cursor-not-allowed'
                } focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold`}
                aria-label="Scroll right to more clothing departments"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Sideways Scrollable Rail */}
        <ScrollReveal direction="up" delay={150}>
          <div
            ref={scrollRef}
            onScroll={checkScrollability}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            className={`flex gap-5 sm:gap-6 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory scrollbar-none cursor-grab active:cursor-grabbing -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8`}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {curatedDepartments.map((dept) => (
            <Link
              key={dept.id}
              href={`/collections/${dept.slug}`}
              className="group relative flex flex-col w-[250px] sm:w-[280px] lg:w-[310px] aspect-[3/4] flex-shrink-0 snap-start rounded-sm overflow-hidden border border-ink-border shadow-card-rest hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300 ease-editorial bg-canvas-sand"
            >
              {/* Department High-Resolution Image */}
              {dept.imageUrl && (
                <Image
                  src={dept.imageUrl}
                  alt={dept.name}
                  fill
                  className="object-cover transition-transform duration-700 ease-editorial group-hover:scale-105"
                  sizes="(max-width: 640px) 250px, (max-width: 1024px) 280px, 310px"
                />
              )}

              {/* Scrim Vignette Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent transition-opacity duration-300 group-hover:opacity-95" />

              {/* Top Floating Badge */}
              <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
                <span className="px-2.5 py-1 rounded-full bg-canvas/90 backdrop-blur-md border border-ink-border/60 font-sans text-[10px] font-semibold uppercase tracking-wider text-ink">
                  {dept.badge}
                </span>
                <span className="w-7 h-7 rounded-full bg-canvas/80 backdrop-blur-sm border border-ink-border/50 flex items-center justify-center text-ink opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>

              {/* Bottom Editorial Information */}
              <div className="absolute inset-0 p-5 flex flex-col justify-end">
                <h3 className="font-serif text-lg sm:text-xl font-medium text-white tracking-wide group-hover:text-canvas transition-colors leading-snug">
                  {dept.name}
                </h3>
                <p className="font-sans text-xs text-canvas/80 mt-1 line-clamp-1">
                  {dept.tagline}
                </p>
                <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-white/20 text-[11px] text-canvas/70">
                  <span>{dept.itemCount}</span>
                  <span className="text-accent-gold font-semibold group-hover:underline">Explore →</span>
                </div>
              </div>
            </Link>
          ))}
          </div>
        </ScrollReveal>

        {/* Scroll Progress Bar & Mobile Swipe Hint */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center sm:justify-between text-center sm:text-left gap-4 pt-4 border-t border-ink-border/40">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs text-ink-secondary">
            <span className="font-semibold text-ink">Browse All 10 Departments:</span>
            <span>Use horizontal swipe or top arrow buttons to explore</span>
          </div>

          {/* Minimalist Progress Track */}
          <div className="w-full sm:w-64 h-1.5 bg-canvas-sand rounded-full overflow-hidden border border-ink-border/60 mx-auto sm:mx-0">
            <div
              className="h-full bg-accent-gold rounded-full transition-all duration-200"
              style={{ width: `${Math.max(10, scrollProgress)}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
