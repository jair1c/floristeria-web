import type { MetadataRoute } from 'next';
import { getActiveProducts, getCategories } from '@/lib/store';

const SITE_URL = 'https://floristeria-web.vercel.app';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Páginas estáticas
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/productos`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/nosotros`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/contacto`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];

  // Páginas de categorías
  let categoryPages: MetadataRoute.Sitemap = [];
  try {
    const categories = await getCategories();
    categoryPages = categories.map((cat) => ({
      url: `${SITE_URL}/categoria/${cat.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));
  } catch { /* silencioso */ }

  // Páginas de productos
  let productPages: MetadataRoute.Sitemap = [];
  try {
    const products = await getActiveProducts();
    productPages = products.map((product) => ({
      url: `${SITE_URL}/producto/${product.slug}`,
      lastModified: new Date(product.createdAt),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));
  } catch { /* silencioso */ }

  return [...staticPages, ...categoryPages, ...productPages];
}
