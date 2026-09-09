import { MetadataRoute } from 'next';
import { services } from '@/data/services';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://zdctechglobalsolutions.com';

  const staticRoutes = [
    '',
    '/about',
    '/portfolio',
    '/contact',
    '/team',
    '/careers',
    '/case-studies',
    '/life-at-company',
    '/testimonials',
    '/clients',
    '/terms-and-conditions',
    '/privacy-policy',
    '/refund-policy',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  const dynamicServiceRoutes = services.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  return [...staticRoutes, ...dynamicServiceRoutes];
}
