import { siteConfig } from '@/config/site';
import { createClient } from '@/lib/supabase/client';

export interface SiteSettingsData {
  businessName: string;
  establishedYear: number;
  address: typeof siteConfig.address;
  contact: typeof siteConfig.contact;
}

export async function getSiteSettings(): Promise<SiteSettingsData> {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (!supabaseUrl || supabaseUrl.includes('placeholder')) {
      return {
        businessName: siteConfig.businessName,
        establishedYear: siteConfig.establishedYear,
        address: siteConfig.address,
        contact: siteConfig.contact,
      };
    }

    const supabase = createClient();
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .eq('id', 'primary')
      .single();

    if (error || !data) {
      return {
        businessName: siteConfig.businessName,
        establishedYear: siteConfig.establishedYear,
        address: siteConfig.address,
        contact: siteConfig.contact,
      };
    }

    return {
      businessName: data.business_name || siteConfig.businessName,
      establishedYear: data.established_year || siteConfig.establishedYear,
      address: data.address || siteConfig.address,
      contact: data.contact || siteConfig.contact,
    };
  } catch {
    return {
      businessName: siteConfig.businessName,
      establishedYear: siteConfig.establishedYear,
      address: siteConfig.address,
      contact: siteConfig.contact,
    };
  }
}
