import React from 'react';
import Link from 'next/link';
import { Star, ExternalLink, CheckCircle2, MessageSquarePlus } from 'lucide-react';
import { googleReviewsData } from '@/data/reviews';
import { siteConfig } from '@/config/site';
import ScrollReveal from '@/components/common/ScrollReveal';

export default function GoogleReviewsSection() {
  const reviewUrl = siteConfig.address.googleReviewsUrl || googleReviewsData.writeReviewUrl;

  return (
    <section className="py-20 sm:py-28 bg-canvas-sand/40 border-b border-ink-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal direction="down" delay={50}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-ink-border/60">
            <div className="max-w-2xl">
              {/* Google Badge Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-canvas-pure border border-ink-border text-xs font-semibold text-ink uppercase tracking-wider mb-4 shadow-sm">
                <svg className="w-4 h-4" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Verified Google Reviews</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-ink leading-tight">
                Loved by Chilbila & Pratapgarh
              </h2>
              <p className="font-sans text-sm sm:text-base text-ink-secondary mt-3">
                Genuine experiences from our patrons who trust us for festive handloom sarees, unstitched suit lengths, and family clothing.
              </p>

              {/* Rating Metric Summary */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-5">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="font-serif text-xl sm:text-2xl font-bold text-ink">5.0 / 5.0</span>
                <span className="text-xs sm:text-sm text-ink-secondary border-l border-ink-border pl-3">
                  100% Satisfied Customer Reviews
                </span>
              </div>
            </div>

            {/* Primary Action Button: WRITE A GOOGLE REVIEW */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
              <a
                href={reviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-sm bg-ink text-white font-sans text-xs sm:text-sm font-semibold tracking-wider hover:bg-ink-hover hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold text-center"
                aria-label="Write a Google review for Banwari Lal Cloth House (opens in a new tab)"
              >
                <MessageSquarePlus className="w-4 h-4 text-accent-gold" />
                <span>WRITE A GOOGLE REVIEW</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>

              <a
                href={reviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-4 rounded-sm bg-canvas-pure border border-ink-border text-ink font-sans text-xs sm:text-sm font-semibold hover:bg-canvas-muted transition-colors text-center"
              >
                <span>View On Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 text-ink-secondary" />
              </a>
            </div>
          </div>
        </ScrollReveal>

        {/* Reviews Cards Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-12">
          {googleReviewsData.reviews.map((rev, index) => (
            <ScrollReveal key={rev.id} direction="up" delay={index * 90} distance={24}>
              <div className="bg-canvas-pure p-6 sm:p-7 rounded-sm border border-ink-border shadow-card-rest hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between h-full">
                <div>
                  {/* Reviewer Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full ${rev.authorColor} text-white font-sans font-bold flex items-center justify-center text-sm shadow-sm flex-shrink-0`}
                      >
                        {rev.authorInitial}
                      </div>
                      <div>
                        <h3 className="font-serif text-base font-semibold text-ink leading-tight">
                          {rev.authorName}
                        </h3>
                        <p className="font-sans text-[11px] text-ink-secondary">
                          {rev.badge || rev.reviewCountInfo}
                        </p>
                      </div>
                    </div>

                    {/* Google Logo Icon */}
                    <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                  </div>

                  {/* Star Rating & Relative Time */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-0.5">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="font-sans text-xs text-ink-muted">• {rev.relativeTime}</span>
                  </div>

                  {/* Review Text */}
                  <p className="font-sans text-sm text-ink leading-relaxed whitespace-pre-line">
                    {rev.comment}
                  </p>
                </div>

                {/* Owner Response Block if Present */}
                {rev.ownerResponse && (
                  <div className="mt-5 pt-4 border-t border-ink-border/60 bg-canvas-sand/40 -mx-6 -mb-6 p-4 rounded-b-sm">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-ink mb-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent-gold" />
                      <span>Response from the owner ({rev.ownerResponse.relativeTime}):</span>
                    </div>
                    <p className="font-sans text-xs text-ink-secondary italic pl-5">
                      &ldquo;{rev.ownerResponse.text}&rdquo;
                    </p>
                  </div>
                )}
              </div>
            </ScrollReveal>
          ))}

          {/* Callout Card: Invite Customer Review */}
          <ScrollReveal direction="up" delay={500} distance={24}>
            <div className="bg-canvas-pure p-6 sm:p-7 rounded-sm border-2 border-dashed border-accent-gold/60 flex flex-col justify-between items-center text-center h-full">
              <div className="my-auto py-4">
                <div className="w-12 h-12 mx-auto rounded-full bg-accent-gold/10 border border-accent-gold/30 flex items-center justify-center text-accent-gold mb-4">
                  <Star className="w-6 h-6 fill-accent-gold text-accent-gold" />
                </div>
                <h3 className="font-serif text-lg sm:text-xl font-medium text-ink mb-2">
                  Have you shopped with us?
                </h3>
                <p className="font-sans text-xs sm:text-sm text-ink-secondary max-w-xs mb-6">
                  Your feedback helps our Chilbila family store continue serving generations with premium textile quality.
                </p>
                <a
                  href={reviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-sm bg-ink text-white font-sans text-xs sm:text-sm font-semibold tracking-wider hover:bg-ink-hover transition-colors shadow-sm w-full sm:w-auto"
                >
                  <span>Write Your Google Review</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
