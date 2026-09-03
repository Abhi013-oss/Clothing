import { MetadataRoute } from 'next';
import { getProducts } from '@/lib/data/products';
import { getCategories } from '@/lib/data/categories';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://banwarilalclothhouse.com';

  const [products, categories] = await Promise.all([
    getProducts({ includeInactive: false }),
    getCategories({ includeInvisible: false }),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/collections`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  // Dynamic Category Routes
  const categoryRoutes: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${baseUrl}/collections/${cat.slug}`,
    lastModified: new Date(cat.updatedAt || Date.now()),
    changeFrequency: 'daily',
    priority: 0.8,
  }));

  // Dynamic Product Routes (Published & Active Garments Only)
  const productRoutes: MetadataRoute.Sitemap = products
    .filter((p) => p.isActive)
    .map((prod) => ({
      url: `${baseUrl}/products/${prod.slug}`,
      lastModified: new Date(prod.updatedAt || Date.now()),
      changeFrequency: 'weekly',
      priority: 0.8,
    }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
