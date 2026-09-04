import React from 'react';
import type { Metadata } from 'next';
import HeroSection from '@/components/home/HeroSection';
import CategoryGrid from '@/components/home/CategoryGrid';
import FeaturedGrid from '@/components/home/FeaturedGrid';
import BrandStory from '@/components/home/BrandStory';
import VisualShowcase from '@/components/home/VisualShowcase';
import GoogleReviewsSection from '@/components/home/GoogleReviewsSection';
import StoreLocationCard from '@/components/home/StoreLocationCard';
import FinalCTA from '@/components/home/FinalCTA';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: `${siteConfig.businessName} — Fine Clothing, Sarees & Textiles | Chilbila, Pratapgarh`,
  description: `Established in 2003, ${siteConfig.businessName} is a premier physical cloth house near Hanuman Mandir, Chilbila Bazaar, Pratapgarh, Uttar Pradesh. Discover handloom sarees, unstitched suitings, and ready-to-wear collections.`,
  alternates: {
    canonical: 'https://banwarilalclothhouse.com',
  },
};

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Signature Hero Section with 3D Depth */}
      <HeroSection />

      {/* 2. Curated Category Discovery */}
      <CategoryGrid />

      {/* 3. Handpicked Featured Garments */}
      <FeaturedGrid />

      {/* 4. Heritage & 20+ Years Retail Trust Story */}
      <BrandStory />

      {/* 5. Editorial Lookbook Fabric Texture Showcase */}
      <VisualShowcase />

      {/* 6. Authentic Google Customer Reviews & Direct Rating Option */}
      <GoogleReviewsSection />

      {/* 7. Physical Store Location & Google Maps Card */}
      <StoreLocationCard />

      {/* 8. Final Action & WhatsApp Order Trigger */}
      <FinalCTA />
    </div>
  );
}
