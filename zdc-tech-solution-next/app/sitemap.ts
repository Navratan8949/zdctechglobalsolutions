import { MetadataRoute } from 'next';
import { services } from '@/data/services';
import { portfolio } from '@/data/portfolio';
import { caseStudies } from '@/data/caseStudies';
import { blogPosts } from '@/data/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://zdctechglobalsolutions.com';

  const staticRoutes = [
    '',
    '/about',
    '/services',
    '/portfolio',
    '/contact',
    '/team',
    '/careers',
    '/case-studies',
    '/blog',
    '/faqs',
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
    priority: route === '' ? 1.0 : route === '/services' || route === '/contact' ? 0.9 : 0.8,
  }));

  const dynamicServiceRoutes = services.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const dynamicPortfolioRoutes = portfolio.map((item) => ({
    url: `${baseUrl}/portfolio/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const dynamicCaseStudyRoutes = caseStudies.map((caseStudy) => ({
    url: `${baseUrl}/case-studies/${caseStudy.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const dynamicBlogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...dynamicServiceRoutes,
    ...dynamicPortfolioRoutes,
    ...dynamicCaseStudyRoutes,
    ...dynamicBlogRoutes,
  ];
}
