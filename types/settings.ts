export interface SiteSettings {
  businessName: string;
  tagline: string;
  establishedYear: number;
  address: {
    street: string;
    landmark?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    latitude: number;
    longitude: number;
    googleMapsUrl: string;
  };
  contact: {
    whatsappNumber: string;
    primaryPhone?: string;
    storeHours?: string;
    instagramUrl?: string;
    facebookUrl?: string;
  };
  whatsappCartMode: 'names_only' | 'names_and_qty';
}
