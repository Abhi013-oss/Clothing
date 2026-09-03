import type { Metadata } from 'next';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/cart/CartDrawer';
import { siteConfig } from '@/config/site';
import { safeJsonLd } from '@/lib/security/sanitize';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: `${siteConfig.businessName} — Fine Clothing, Sarees & Textiles | Chilbila, Pratapgarh`,
  description: `Established in 2003, ${siteConfig.businessName} is a premier physical cloth house near Hanuman Mandir, Chilbila Bazaar, Pratapgarh, Uttar Pradesh. Discover handloom sarees, unstitched suitings, and ready-to-wear collections.`,
  metadataBase: new URL('https://banwarilalclothhouse.com'),
  openGraph: {
    title: `${siteConfig.businessName} — Premium Clothing & Cloth House`,
    description: `Established in 2003, ${siteConfig.businessName} in Chilbila, Pratapgarh offers fine sarees, suit fabrics, and readymade garments with direct WhatsApp ordering.`,
    url: 'https://banwarilalclothhouse.com',
    siteName: siteConfig.businessName,
    locale: 'en_IN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ClothingStore',
    name: siteConfig.businessName,
    description: siteConfig.tagline,
    foundingDate: siteConfig.establishedYear.toString(),
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.postalCode,
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: siteConfig.address.latitude,
      longitude: siteConfig.address.longitude,
    },
    hasMap: siteConfig.address.googleMapsUrl,
    url: 'https://banwarilalclothhouse.com',
  };

  return (
    <html lang="en" className={`${playfair.variable} ${plusJakarta.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-canvas text-ink font-sans antialiased selection:bg-accent-gold/20 selection:text-ink">
        {/* WCAG 2.2 AA Skip Navigation Link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-ink focus:text-white focus:font-semibold focus:text-xs focus:rounded-sm focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent-gold"
        >
          Skip to main content
        </a>
        <CartProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
              {children}
            </main>
            <Footer />
            <CartDrawer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
