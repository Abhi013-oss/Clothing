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
    googleReviewsUrl: 'https://www.google.com/maps/place/BANWARILAL+CLOTH+HOUSE/@25.9557296,82.0044568,922m/data=!3m1!1e3!4m8!3m7!1s0x399a914be3f9fd9d:0x3d4e2eee5c7b4562!8m2!3d25.9557296!4d82.0070317!9m1!1b1!16s%2Fg%2F11lgyrhdz_?entry=ttu',
  },
  contact: {
    // Read from environment variable or fallback to store merchant WhatsApp
    whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '917080605007',
    primaryPhone: process.env.NEXT_PUBLIC_PHONE_NUMBER || '+91 70806 05007',
    storeHours: 'Monday – Sunday • Chilbila Bazaar, Pratapgarh',
  },
  whatsappCartMode: 'names_and_qty',
};
