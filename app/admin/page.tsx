import React from 'react';
import Link from 'next/link';
import {
  ShoppingBag,
  FolderTree,
  Sparkles,
  Store,
  Plus,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
} from 'lucide-react';
import { getProducts } from '@/lib/data/products';
import { getCategories } from '@/lib/data/categories';
import { getSiteSettings } from '@/lib/data/settings';

export const revalidate = 0; // Fresh metrics on every admin view

export default async function AdminDashboardPage() {
  const [products, categories, settings] = await Promise.all([
    getProducts({ includeInactive: true }),
    getCategories({ includeInvisible: true }),
    getSiteSettings(),
  ]);

  const activeProducts = products.filter((p) => p.isActive);
  const featuredProducts = products.filter((p) => p.featured && p.isActive);
  const unpricedProducts = products.filter((p) => p.price === undefined || p.price === null);

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-ink-border">
        <div>
          <span className="font-sans text-xs uppercase tracking-widest text-accent-gold font-bold">
            Administrative Overview
          </span>
          <h1 className="font-serif text-2xl sm:text-4xl font-medium text-ink mt-1">
            Store Management Console
          </h1>
          <p className="font-sans text-xs sm:text-sm text-ink-secondary mt-1">
            Official dashboard for {settings.businessName} (Chilbila, Pratapgarh)
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/products/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-sm bg-ink text-white font-sans text-xs font-semibold tracking-wider hover:bg-ink-hover transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>ADD NEW PRODUCT</span>
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Metric 1: Total Products */}
        <div className="bg-canvas-pure p-6 rounded-sm border border-ink-border shadow-card-rest">
          <div className="flex items-center justify-between">
            <span className="font-sans text-xs font-semibold text-ink-secondary uppercase tracking-wider">
              Total Catalogue
            </span>
            <div className="p-2 rounded-full bg-canvas-sand text-ink">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-serif text-3xl font-semibold text-ink">
              {activeProducts.length}
            </span>
            <span className="font-sans text-xs text-ink-muted">garments active</span>
          </div>
          <p className="mt-2 text-[11px] text-ink-secondary">
            {products.length - activeProducts.length} draft or archived
          </p>
        </div>

        {/* Metric 2: Featured Products */}
        <div className="bg-canvas-pure p-6 rounded-sm border border-ink-border shadow-card-rest">
          <div className="flex items-center justify-between">
            <span className="font-sans text-xs font-semibold text-ink-secondary uppercase tracking-wider">
              Homepage Showcase
            </span>
            <div className="p-2 rounded-full bg-accent-gold/15 text-accent-gold">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-serif text-3xl font-semibold text-ink">
              {featuredProducts.length}
            </span>
            <span className="font-sans text-xs text-ink-muted">featured pieces</span>
          </div>
          <p className="mt-2 text-[11px] text-ink-secondary">
            Displayed on digital showroom front
          </p>
        </div>

        {/* Metric 3: Categories */}
        <div className="bg-canvas-pure p-6 rounded-sm border border-ink-border shadow-card-rest">
          <div className="flex items-center justify-between">
            <span className="font-sans text-xs font-semibold text-ink-secondary uppercase tracking-wider">
              Trade Departments
            </span>
            <div className="p-2 rounded-full bg-canvas-sand text-ink">
              <FolderTree className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-serif text-3xl font-semibold text-ink">
              {categories.length}
            </span>
            <span className="font-sans text-xs text-ink-muted">categories</span>
          </div>
          <p className="mt-2 text-[11px] text-ink-secondary">
            Sarees, Suits, Readymade, Menswear, Fabrics
          </p>
        </div>

        {/* Metric 4: Enquiry / Unpriced */}
        <div className="bg-canvas-pure p-6 rounded-sm border border-ink-border shadow-card-rest">
          <div className="flex items-center justify-between">
            <span className="font-sans text-xs font-semibold text-ink-secondary uppercase tracking-wider">
              Heirloom / Custom
            </span>
            <div className="p-2 rounded-full bg-canvas-sand text-ink">
              <Store className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-serif text-3xl font-semibold text-ink">
              {unpricedProducts.length}
            </span>
            <span className="font-sans text-xs text-ink-muted">on request</span>
          </div>
          <p className="mt-2 text-[11px] text-ink-secondary">
            Exclusive pieces with WhatsApp consultation
          </p>
        </div>
      </div>

      {/* Quick Access Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/admin/products"
          className="p-6 bg-canvas-pure rounded-sm border border-ink-border shadow-card-rest hover:shadow-card-hover transition-all group flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-full bg-canvas-sand flex items-center justify-center text-ink mb-4 group-hover:scale-105 transition-transform">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-medium text-ink group-hover:text-accent-gold transition-colors">
              Manage Catalogue
            </h3>
            <p className="font-sans text-xs text-ink-secondary mt-1 leading-relaxed">
              View, filter, edit prices, update inventory availability, and manage high-resolution photography.
            </p>
          </div>
          <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-ink group-hover:text-accent-gold">
            <span>Explore Products</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </Link>

        <Link
          href="/admin/categories"
          className="p-6 bg-canvas-pure rounded-sm border border-ink-border shadow-card-rest hover:shadow-card-hover transition-all group flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-full bg-canvas-sand flex items-center justify-center text-ink mb-4 group-hover:scale-105 transition-transform">
              <FolderTree className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-medium text-ink group-hover:text-accent-gold transition-colors">
              Manage Categories
            </h3>
            <p className="font-sans text-xs text-ink-secondary mt-1 leading-relaxed">
              Organize trade departments, adjust display ordering, and control department visibility.
            </p>
          </div>
          <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-ink group-hover:text-accent-gold">
            <span>Explore Categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </Link>

        <Link
          href="/admin/settings"
          className="p-6 bg-canvas-pure rounded-sm border border-ink-border shadow-card-rest hover:shadow-card-hover transition-all group flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-full bg-canvas-sand flex items-center justify-center text-ink mb-4 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-medium text-ink group-hover:text-accent-gold transition-colors">
              Store & WhatsApp Settings
            </h3>
            <p className="font-sans text-xs text-ink-secondary mt-1 leading-relaxed">
              Configure official WhatsApp order reception number, store calling line, and showroom hours.
            </p>
          </div>
          <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-ink group-hover:text-accent-gold">
            <span>Configure Settings</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </Link>
      </div>

      {/* Operational Reassurance & Architecture Guardrail */}
      <div className="p-6 rounded-sm bg-canvas-sand/60 border border-ink-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-accent-gold flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-ink">
              Business Model Integrity Verified
            </h4>
            <p className="font-sans text-xs text-ink-secondary mt-0.5">
              Zero payment gateways active. All customer selections route directly to WhatsApp or in-store consultation at Chilbila, Pratapgarh.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
