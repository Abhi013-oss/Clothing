'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductImage } from '@/types/product';
import { getProductFallbackImage } from '@/lib/images/productFallback';

interface ProductGalleryProps {
  images: ProductImage[];
  productName: string;
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Safe fallback if images array is empty or has blank imageUrl
  const fallbackUrl = getProductFallbackImage(productName);
  const safeImages = images && images.length > 0 && images.some((img) => img.imageUrl)
    ? images.map((img) => ({
        ...img,
        imageUrl: img.imageUrl || fallbackUrl,
      }))
    : [
        {
          id: 'fallback-1',
          productId: 'fallback',
          imageUrl: fallbackUrl,
          altText: productName,
          displayOrder: 1,
          isPrimary: true,
        },
      ];

  const currentImage = safeImages[selectedIndex] || safeImages[0];

  const handlePrev = useCallback(() => {
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : safeImages.length - 1));
  }, [safeImages.length]);

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) => (prev < safeImages.length - 1 ? prev + 1 : 0));
  }, [safeImages.length]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsLightboxOpen(false);
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isLightboxOpen, handlePrev, handleNext]);

  return (
    <div className="flex flex-col space-y-4">
      {/* Primary Display Image (3:4 Aspect Ratio) */}
      <div className="group relative aspect-[3/4] w-full rounded-sm overflow-hidden bg-canvas-sand border border-ink-border shadow-card-hover">
        {currentImage.imageUrl ? (
          <Image
            src={currentImage.imageUrl}
            alt={currentImage.altText || productName}
            fill
            priority
            className="object-cover transition-transform duration-500 ease-editorial group-hover:scale-[1.025]"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-ink-muted text-sm">
            Photography Pending
          </div>
        )}

        {/* Zoom / Lightbox Trigger Button */}
        {currentImage.imageUrl && (
          <button
            onClick={() => setIsLightboxOpen(true)}
            className="absolute bottom-4 right-4 p-2.5 rounded-full bg-canvas/90 backdrop-blur-md border border-ink-border text-ink hover:text-accent-gold transition-all duration-200 shadow-sm opacity-90 group-hover:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold"
            aria-label="Open full-resolution image inspection"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Thumbnail Rail (Only rendered when more than 1 image exists) */}
      {safeImages.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-none">
          {safeImages.map((img, idx) => (
            <button
              key={img.id || idx}
              onClick={() => setSelectedIndex(idx)}
              className={`relative aspect-[3/4] w-16 sm:w-20 rounded-sm overflow-hidden border-2 transition-all duration-200 flex-shrink-0 ${
                selectedIndex === idx
                  ? 'border-accent-gold shadow-sm scale-100'
                  : 'border-ink-border/70 opacity-70 hover:opacity-100'
              } focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold`}
              aria-label={`View angle ${idx + 1} of ${safeImages.length}`}
            >
              {img.imageUrl ? (
                <Image
                  src={img.imageUrl}
                  alt={img.altText || `${productName} angle ${idx + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              ) : (
                <div className="w-full h-full bg-canvas-muted text-[10px] flex items-center justify-center">
                  Angle {idx + 1}
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {isLightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Enlarged view of ${productName}`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/90 backdrop-blur-md p-4 sm:p-8"
        >
          {/* Close Button */}
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 p-3 rounded-full bg-canvas/20 hover:bg-canvas/40 text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold z-50"
            aria-label="Close image inspection"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Arrows (if multiple images) */}
          {safeImages.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-canvas/20 hover:bg-canvas/40 text-white transition-colors focus:outline-none z-50"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-canvas/20 hover:bg-canvas/40 text-white transition-colors focus:outline-none z-50"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Large Inspection Image */}
          <div className="relative max-w-4xl max-h-[85vh] w-full aspect-[3/4] rounded-sm overflow-hidden">
            {currentImage.imageUrl && (
              <Image
                src={currentImage.imageUrl}
                alt={currentImage.altText || productName}
                fill
                className="object-contain"
                sizes="(max-width: 1200px) 90vw, 80vw"
              />
            )}
          </div>

          {/* Bottom Counter Indicator */}
          {safeImages.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-canvas/20 text-white text-xs font-sans">
              {selectedIndex + 1} / {safeImages.length}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
