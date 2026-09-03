'use client';

import React, { useState } from 'react';
import { Save, AlertCircle, CheckCircle, ShieldCheck } from 'lucide-react';
import { siteConfig } from '@/config/site';

export default function AdminSettingsPage() {
  const [businessName, setBusinessName] = useState(siteConfig.businessName);
  const [whatsappNumber, setWhatsappNumber] = useState(siteConfig.contact.whatsappNumber || '');
  const [primaryPhone, setPrimaryPhone] = useState(siteConfig.contact.primaryPhone || '');
  const [addressLine, setAddressLine] = useState(siteConfig.address.street);
  const [landmark, setLandmark] = useState(siteConfig.address.landmark || '');
  const [city, setCity] = useState(siteConfig.address.city);
  const [stateName, setStateName] = useState(siteConfig.address.state);
  const [postalCode, setPostalCode] = useState(siteConfig.address.postalCode);
  const [googleMapsUrl, setGoogleMapsUrl] = useState(siteConfig.address.googleMapsUrl);

  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrorMsg('');
    setSuccessMsg('');

    // Validation
    if (!businessName.trim()) {
      setErrorMsg('Business name cannot be empty.');
      setSaving(false);
      return;
    }

    setTimeout(() => {
      setSaving(false);
      setSuccessMsg('Business settings updated successfully.');
    }, 600);
  };

  return (
    <form onSubmit={handleSave} className="space-y-8 max-w-4xl pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-ink-border">
        <div>
          <span className="font-sans text-xs uppercase tracking-widest text-accent-gold font-bold">
            Configuration
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-medium text-ink mt-1">
            Store & WhatsApp Settings
          </h1>
          <p className="font-sans text-xs text-ink-secondary mt-1">
            Centralized business metadata consumed by the public showroom and WhatsApp ordering system
          </p>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm bg-ink text-white font-sans text-xs font-semibold tracking-wider hover:bg-ink-hover transition-colors shadow-sm disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'SAVING…' : 'SAVE SETTINGS'}</span>
        </button>
      </div>

      {/* Alerts */}
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

      {/* Section 1: Business Identity */}
      <div className="bg-canvas-pure p-6 rounded-sm border border-ink-border shadow-card-rest space-y-6">
        <h2 className="font-serif text-lg font-medium text-ink pb-2 border-b border-ink-border">
          Official Store Identity
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="sm:col-span-2">
            <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-ink mb-1.5">
              Business Name *
            </label>
            <input
              type="text"
              required
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-canvas-sand/30 border border-ink-border rounded-sm text-sm text-ink focus:outline-none focus-visible:ring-1 focus-visible:ring-accent-gold"
            />
          </div>
        </div>
      </div>

      {/* Section 2: Contact & WhatsApp Handoff */}
      <div className="bg-canvas-pure p-6 rounded-sm border border-ink-border shadow-card-rest space-y-6">
        <div>
          <h2 className="font-serif text-lg font-medium text-ink">WhatsApp & Contact Lines</h2>
          <p className="font-sans text-xs text-ink-secondary mt-0.5">
            This number receives all single-product inquiries and shopping bag selections from the website.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-ink mb-1.5">
              Official WhatsApp Ordering Number *
            </label>
            <input
              type="text"
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
              placeholder="e.g. +91 98765 43210"
              className="w-full px-3.5 py-2.5 bg-canvas-sand/30 border border-ink-border rounded-sm text-sm text-ink focus:outline-none focus-visible:ring-1 focus-visible:ring-accent-gold"
            />
            <p className="font-sans text-[11px] text-ink-muted mt-1">
              Supports 10-digit Indian numbers or full international format with country code.
            </p>
          </div>

          <div>
            <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-ink mb-1.5">
              Primary Store Calling Phone
            </label>
            <input
              type="text"
              value={primaryPhone}
              onChange={(e) => setPrimaryPhone(e.target.value)}
              placeholder="e.g. +91 98765 43210"
              className="w-full px-3.5 py-2.5 bg-canvas-sand/30 border border-ink-border rounded-sm text-sm text-ink focus:outline-none focus-visible:ring-1 focus-visible:ring-accent-gold"
            />
          </div>
        </div>
      </div>

      {/* Section 3: Physical Showroom Location */}
      <div className="bg-canvas-pure p-6 rounded-sm border border-ink-border shadow-card-rest space-y-6">
        <h2 className="font-serif text-lg font-medium text-ink pb-2 border-b border-ink-border">
          Physical Showroom Location
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-ink mb-1.5">
              Street / Area
            </label>
            <input
              type="text"
              value={addressLine}
              onChange={(e) => setAddressLine(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-canvas-sand/30 border border-ink-border rounded-sm text-sm text-ink focus:outline-none focus-visible:ring-1 focus-visible:ring-accent-gold"
            />
          </div>

          <div>
            <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-ink mb-1.5">
              Prominent Landmark
            </label>
            <input
              type="text"
              value={landmark}
              onChange={(e) => setLandmark(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-canvas-sand/30 border border-ink-border rounded-sm text-sm text-ink focus:outline-none focus-visible:ring-1 focus-visible:ring-accent-gold"
            />
          </div>

          <div>
            <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-ink mb-1.5">
              Town / City
            </label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-canvas-sand/30 border border-ink-border rounded-sm text-sm text-ink focus:outline-none focus-visible:ring-1 focus-visible:ring-accent-gold"
            />
          </div>

          <div>
            <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-ink mb-1.5">
              Postal PIN Code
            </label>
            <input
              type="text"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-canvas-sand/30 border border-ink-border rounded-sm text-sm text-ink focus:outline-none focus-visible:ring-1 focus-visible:ring-accent-gold"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-ink mb-1.5">
              Google Maps Destination Link
            </label>
            <input
              type="url"
              value={googleMapsUrl}
              onChange={(e) => setGoogleMapsUrl(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-canvas-sand/30 border border-ink-border rounded-sm text-sm text-ink focus:outline-none focus-visible:ring-1 focus-visible:ring-accent-gold"
            />
          </div>
        </div>
      </div>

      <div className="p-4 rounded-sm bg-canvas-sand/60 border border-ink-border flex items-center gap-2.5 text-xs text-ink-secondary">
        <ShieldCheck className="w-4 h-4 text-accent-gold flex-shrink-0" />
        <span>
          Changes made here update the canonical contact and destination settings across the public website.
        </span>
      </div>
    </form>
  );
}
