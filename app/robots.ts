import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/admin/', '/cart'],
      },
    ],
    sitemap: 'https://banwarilalclothhouse.com/sitemap.xml',
  };
}
