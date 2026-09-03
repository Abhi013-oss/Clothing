import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Shopping Bag — BANWARILAL CLOTH HOUSE',
  description: 'Review your selected garments before sending your order enquiry directly to BANWARILAL CLOTH HOUSE via WhatsApp.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
