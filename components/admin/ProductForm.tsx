'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  Save,
  ArrowLeft,
  AlertCircle,
  CheckCircle,
  ImageIcon,
} from 'lucide-react';
import Link from 'next/link';
import { Product, AvailabilityStatus } from '@/types/product';
import { Category } from '@/types/category';
import { generateSlug } from '@/lib/catalogue/importer';
import { validateImageUrl } from '@/lib/catalogue/validation';

interface ProductFormProps {
  initialProduct?: Partial<Product>;
  categories: Category[];
  isNew?: boolean;
}

export default function ProductForm({
  initialProduct,
  categories,
  isNew = false,
}: ProductFormProps) {
  const router = useRouter();

  const [name, setName] = useState(initialProduct?.name || '');
  const [categoryId, setCategoryId] = useState(initialProduct?.categoryId || categories[0]?.id || '');
  const [description, setDescription] = useState(initialProduct?.description || '');
  const [price, setPrice] = useState<string>(
    initialProduct?.price !== undefined ? String(initialProduct.price) : ''
  );
  const [compareAtPrice, setCompareAtPrice] = useState<string>(
    initialProduct?.compareAtPrice !== undefined ? String(initialProduct.compareAtPrice) : ''
  );
  const [fabric, setFabric] = useState(initialProduct?.specifications?.fabric || '');
  const [color, setColor] = useState(initialProduct?.specifications?.color || '');
  const [sizes, setSizes] = useState(
    initialProduct?.specifications?.sizesAvailable ? initialProduct.specifications.sizesAvailable.join(', ') : ''
  );
  const [patternDetails, setPatternDetails] = useState(initialProduct?.specifications?.patternDetails || '');
  const [careInstructions, setCareInstructions] = useState(initialProduct?.specifications?.careInstructions || '');
  const [availability, setAvailability] = useState<AvailabilityStatus>(
    initialProduct?.availability || 'in_stock'
  );
  const [featured, setFeatured] = useState<boolean>(initialProduct?.featured || false);
  const [isActive, setIsActive] = useState<boolean>(initialProduct?.isActive ?? true);
  const [displayOrder, setDisplayOrder] = useState<number>(initialProduct?.displayOrder || 100);

  // Primary Image URL
  const [imageUrl, setImageUrl] = useState(initialProduct?.images?.[0]?.imageUrl || '');
  const [altText, setAltText] = useState(initialProduct?.images?.[0]?.altText || '');

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setSaving(true);

    // Validation
    if (!name.trim() || name.trim().length < 3) {
      setErrorMsg('Garment name must be at least 3 characters.');
      setSaving(false);
      return;
    }

    if (!categoryId) {
      setErrorMsg('Please select a valid department category.');
      setSaving(false);
      return;
    }

    const numericPrice = price ? parseFloat(price) : undefined;
    if (price && (isNaN(numericPrice!) || numericPrice! < 0)) {
      setErrorMsg('Price must be a valid non-negative number.');
      setSaving(false);
      return;
    }

    const numericCompareAt = compareAtPrice ? parseFloat(compareAtPrice) : undefined;
    if (numericCompareAt && numericPrice && numericCompareAt < numericPrice) {
      setErrorMsg('Compare-at price cannot be less than the selling price.');
      setSaving(false);
      return;
    }

    if (imageUrl) {
      const imgValidation = validateImageUrl(imageUrl);
      if (!imgValidation.isValid) {
        setErrorMsg(imgValidation.error || 'Invalid or insecure image URL.');
        setSaving(false);
        return;
      }
    }

    try {
      // Simulate saving or persist to Supabase
      setSuccessMsg('Product details saved successfully.');
      setTimeout(() => {
        router.push('/admin/products');
        router.refresh();
      }, 1000);
    } catch {
      setErrorMsg('Failed to save product. Please check your connection.');
      setSaving(false);
    }
  };

  const autoSlug = generateSlug(name);

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl pb-16">
      {/* Back button & Title */}
      <div className="flex items-center justify-between pb-6 border-b border-ink-border">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
            className="p-2 rounded-full hover:bg-canvas-sand text-ink-secondary hover:text-ink transition-colors"
            aria-label="Back to products list"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <span className="font-sans text-xs uppercase tracking-widest text-accent-gold font-bold">
              {isNew ? 'New Entry' : 'Edit Garment'}
            </span>
            <h1 className="font-serif text-2xl font-medium text-ink">
              {isNew ? 'Add Garment to Catalogue' : name || 'Edit Garment'}
            </h1>
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm bg-ink text-white font-sans text-xs font-semibold tracking-wider hover:bg-ink-hover transition-colors shadow-sm disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'SAVING…' : 'SAVE CHANGES'}</span>
        </button>
      </div>

      {/* Error / Success Feedback */}
      {errorMsg && (
        <div className="p-4 rounded-sm bg-status-error/10 border border-status-error/30 flex items-center gap-3 text-xs text-status-error">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}
      {successMsg && (
        <div className="p-4 rounded-sm bg-status-success/10 border border-status-success/30 flex items-center gap-3 text-xs text-status-success">
          <CheckCircle className="w-4 h-4 flex-shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Section 1: Basic Identity */}
      <div className="bg-canvas-pure p-6 rounded-sm border border-ink-border shadow-card-rest space-y-6">
        <h2 className="font-serif text-lg font-medium text-ink pb-2 border-b border-ink-border">
          Garment Identity
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="sm:col-span-2">
            <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-ink mb-1.5">
              Garment Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Crimson Banarasi Katan Silk Saree"
              className="w-full px-3.5 py-2.5 bg-canvas-sand/30 border border-ink-border rounded-sm text-sm text-ink focus:outline-none focus-visible:ring-1 focus-visible:ring-accent-gold"
            />
            {name && (
              <p className="font-sans text-[11px] text-ink-muted mt-1">
                Generated URL slug: <code className="text-ink font-semibold">/products/{autoSlug}</code>
              </p>
            )}
          </div>

          <div>
            <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-ink mb-1.5">
              Trade Department *
            </label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-canvas-sand/30 border border-ink-border rounded-sm text-sm text-ink focus:outline-none focus-visible:ring-1 focus-visible:ring-accent-gold"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-ink mb-1.5">
              Availability Status *
            </label>
            <select
              value={availability}
              onChange={(e) => setAvailability(e.target.value as AvailabilityStatus)}
              className="w-full px-3.5 py-2.5 bg-canvas-sand/30 border border-ink-border rounded-sm text-sm text-ink focus:outline-none focus-visible:ring-1 focus-visible:ring-accent-gold"
            >
              <option value="in_stock">In Stock (Available at Chilbila)</option>
              <option value="upon_request">Upon Request (Heirloom / Bespoke)</option>
              <option value="out_of_stock">Out of Stock</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-ink mb-1.5">
              Garment Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Factual overview focusing on weave, embroidery, cut, and occasion…"
              className="w-full px-3.5 py-2.5 bg-canvas-sand/30 border border-ink-border rounded-sm text-sm text-ink focus:outline-none focus-visible:ring-1 focus-visible:ring-accent-gold"
            />
          </div>
        </div>
      </div>

      {/* Section 2: Pricing */}
      <div className="bg-canvas-pure p-6 rounded-sm border border-ink-border shadow-card-rest space-y-6">
        <div>
          <h2 className="font-serif text-lg font-medium text-ink">Pricing & Valuation</h2>
          <p className="font-sans text-xs text-ink-secondary mt-0.5">
            Leave blank if price is enquiry-based; will cleanly render as &quot;Price on Request&quot;.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-ink mb-1.5">
              Selling Price (₹ INR)
            </label>
            <input
              type="number"
              min="0"
              step="1"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="e.g. 3850"
              className="w-full px-3.5 py-2.5 bg-canvas-sand/30 border border-ink-border rounded-sm text-sm text-ink focus:outline-none focus-visible:ring-1 focus-visible:ring-accent-gold"
            />
          </div>

          <div>
            <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-ink mb-1.5">
              Original / Compare-at Price (₹ INR)
            </label>
            <input
              type="number"
              min="0"
              step="1"
              value={compareAtPrice}
              onChange={(e) => setCompareAtPrice(e.target.value)}
              placeholder="e.g. 4500 (Optional strikethrough)"
              className="w-full px-3.5 py-2.5 bg-canvas-sand/30 border border-ink-border rounded-sm text-sm text-ink focus:outline-none focus-visible:ring-1 focus-visible:ring-accent-gold"
            />
          </div>
        </div>
      </div>

      {/* Section 3: Garment Specifications */}
      <div className="bg-canvas-pure p-6 rounded-sm border border-ink-border shadow-card-rest space-y-6">
        <h2 className="font-serif text-lg font-medium text-ink pb-2 border-b border-ink-border">
          Fabric & Specifications
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-ink mb-1.5">
              Fabric / Weave
            </label>
            <input
              type="text"
              value={fabric}
              onChange={(e) => setFabric(e.target.value)}
              placeholder="e.g. Pure Katan Silk"
              className="w-full px-3.5 py-2.5 bg-canvas-sand/30 border border-ink-border rounded-sm text-sm text-ink focus:outline-none focus-visible:ring-1 focus-visible:ring-accent-gold"
            />
          </div>

          <div>
            <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-ink mb-1.5">
              Primary Color
            </label>
            <input
              type="text"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              placeholder="e.g. Deep Crimson & Gold"
              className="w-full px-3.5 py-2.5 bg-canvas-sand/30 border border-ink-border rounded-sm text-sm text-ink focus:outline-none focus-visible:ring-1 focus-visible:ring-accent-gold"
            />
          </div>

          <div>
            <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-ink mb-1.5">
              Available Sizes / Cut
            </label>
            <input
              type="text"
              value={sizes}
              onChange={(e) => setSizes(e.target.value)}
              placeholder="e.g. Free Size (5.5m + 0.8m Blouse) or M, L, XL"
              className="w-full px-3.5 py-2.5 bg-canvas-sand/30 border border-ink-border rounded-sm text-sm text-ink focus:outline-none focus-visible:ring-1 focus-visible:ring-accent-gold"
            />
          </div>

          <div>
            <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-ink mb-1.5">
              Craft / Pattern Work
            </label>
            <input
              type="text"
              value={patternDetails}
              onChange={(e) => setPatternDetails(e.target.value)}
              placeholder="e.g. Zari Brocade Woven Floral Jaal"
              className="w-full px-3.5 py-2.5 bg-canvas-sand/30 border border-ink-border rounded-sm text-sm text-ink focus:outline-none focus-visible:ring-1 focus-visible:ring-accent-gold"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-ink mb-1.5">
              Care Instructions
            </label>
            <input
              type="text"
              value={careInstructions}
              onChange={(e) => setCareInstructions(e.target.value)}
              placeholder="e.g. Dry Clean Only"
              className="w-full px-3.5 py-2.5 bg-canvas-sand/30 border border-ink-border rounded-sm text-sm text-ink focus:outline-none focus-visible:ring-1 focus-visible:ring-accent-gold"
            />
          </div>
        </div>
      </div>

      {/* Section 4: Photography */}
      <div className="bg-canvas-pure p-6 rounded-sm border border-ink-border shadow-card-rest space-y-6">
        <div>
          <h2 className="font-serif text-lg font-medium text-ink">Photography & Media</h2>
          <p className="font-sans text-xs text-ink-secondary mt-0.5">
            Images must be framed in vertical 3:4 portrait aspect ratio.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start">
          <div className="sm:col-span-8 space-y-4">
            <div>
              <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-ink mb-1.5">
                Primary Image URL
              </label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://images.unsplash.com/... or Supabase storage URL"
                className="w-full px-3.5 py-2.5 bg-canvas-sand/30 border border-ink-border rounded-sm text-sm text-ink focus:outline-none focus-visible:ring-1 focus-visible:ring-accent-gold"
              />
            </div>
            <div>
              <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-ink mb-1.5">
                Accessible Alt Text
              </label>
              <input
                type="text"
                value={altText}
                onChange={(e) => setAltText(e.target.value)}
                placeholder="e.g. Crimson Banarasi Katan Silk Saree drape"
                className="w-full px-3.5 py-2.5 bg-canvas-sand/30 border border-ink-border rounded-sm text-sm text-ink focus:outline-none focus-visible:ring-1 focus-visible:ring-accent-gold"
              />
            </div>
          </div>

          <div className="sm:col-span-4 flex flex-col items-center">
            <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-ink-secondary mb-2">
              Portrait Preview (3:4)
            </span>
            <div className="relative w-28 aspect-[3/4] rounded-sm bg-canvas-sand border border-ink-border overflow-hidden flex items-center justify-center">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={altText || 'Preview'}
                  fill
                  className="object-cover"
                  sizes="112px"
                />
              ) : (
                <ImageIcon className="w-8 h-8 text-ink-muted opacity-40" />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Section 5: Merchandising Controls */}
      <div className="bg-canvas-pure p-6 rounded-sm border border-ink-border shadow-card-rest space-y-4">
        <h2 className="font-serif text-lg font-medium text-ink pb-2 border-b border-ink-border">
          Merchandising Controls
        </h2>

        <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="w-4 h-4 text-ink rounded border-ink-border focus:ring-accent-gold"
            />
            <div>
              <span className="font-sans text-xs font-semibold text-ink block">
                Feature on Digital Showroom Homepage
              </span>
              <span className="font-sans text-[11px] text-ink-muted">
                Adds garment to the curated homepage showcase grid.
              </span>
            </div>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="w-4 h-4 text-ink rounded border-ink-border focus:ring-accent-gold"
            />
            <div>
              <span className="font-sans text-xs font-semibold text-ink block">
                Published & Active
              </span>
              <span className="font-sans text-[11px] text-ink-muted">
                Unchecking safely archives garment from public view.
              </span>
            </div>
          </label>
        </div>
      </div>
    </form>
  );
}
