import { SiteSettings } from '@/types/settings';

export const siteConfig: SiteSettings = {
  businessName: 'BANWARILAL CLOTH HOUSE',
  tagline: 'Established clothing store with a modern premium digital presence.',
  establishedYear: 2003,
  address: {
    street: 'New Bazaar, Chilbila',
    landmark: 'Near Hanuman Mandir',
    city: 'Pratapgarh',
    state: 'Uttar Pradesh',
    postalCode: '230403',
    country: 'India',
    latitude: 25.9557296,
    longitude: 82.0070317,
    googleMapsUrl: 'https://www.google.com/maps/place/BANWARILAL+CLOTH+HOUSE/@25.9557296,82.0044568,922m/',
  },
  contact: {
    // Read from environment variable or fallback to store merchant WhatsApp
    whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '917080605007',
    primaryPhone: process.env.NEXT_PUBLIC_PHONE_NUMBER || '+91 70806 05007',
    storeHours: 'Monday – Sunday • Chilbila Bazaar, Pratapgarh',
  },
  whatsappCartMode: 'names_and_qty',
};
