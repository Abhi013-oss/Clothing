import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { categories } from '@/data/categories';

export default function CategoryGrid() {
  return (
    <section className="py-16 sm:py-24 border-b border-ink-border/50 bg-canvas">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
          <div>
            <span className="font-sans text-xs uppercase tracking-widest text-accent-gold font-semibold">
              Curated Departments
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-medium text-ink mt-2">
              Explore by Clothing Category
            </h2>
          </div>
          <Link
            href="/collections"
            className="inline-flex items-center gap-1.5 font-sans text-xs sm:text-sm font-semibold text-ink hover:text-accent-gold transition-colors mt-4 sm:mt-0 group"
          >
            <span>View All Collections</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/collections/${cat.slug}`}
              className="group relative flex flex-col aspect-[3/4] rounded-sm overflow-hidden border border-ink-border/80 shadow-card-rest hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 ease-editorial bg-canvas-sand"
            >
              {/* Category Photography */}
              {cat.imageUrl && (
                <Image
                  src={cat.imageUrl}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-500 ease-editorial group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />
              )}

              {/* Scrim Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent transition-opacity duration-300 group-hover:opacity-90" />

              {/* Text Content Overlay */}
              <div className="absolute inset-0 p-4 flex flex-col justify-end">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-sm sm:text-base font-medium text-white tracking-wide group-hover:text-canvas transition-colors">
                    {cat.name}
                  </h3>
                  <ArrowUpRight className="w-4 h-4 text-canvas/80 opacity-0 transform translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300" />
                </div>
                {cat.productCount && (
                  <p className="font-sans text-[11px] text-canvas/70 mt-1">
                    {cat.productCount} Items Available
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
