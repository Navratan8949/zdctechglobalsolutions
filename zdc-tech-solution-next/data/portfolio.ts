export interface PortfolioItem {
  slug: string;
  title: string;
  category: 'Web' | 'Mobile' | 'Software' | 'E-commerce' | 'UI/UX';
  description: string;
  image: string;
  technologies: string[];
  client: string;
  year: string;
}

export const portfolio: PortfolioItem[] = [
  {
    slug: 'healthcare-management',
    title: 'Healthcare Management System',
    category: 'Software',
    description:
      'A comprehensive hospital management platform handling patient records, appointments, billing and pharmacy inventory.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
    client: 'MediCare Hospitals',
    year: '2024',
  },
  {
    slug: 'ecommerce-platform',
    title: 'E-commerce Platform',
    category: 'E-commerce',
    description:
      'A full-featured online store with multi-vendor support, real-time inventory and a one-page checkout.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800',
    technologies: ['Next.js', 'Stripe', 'MongoDB', 'Redis'],
    client: 'ShopWave',
    year: '2024',
  },
  {
    slug: 'school-management',
    title: 'School Management System',
    category: 'Web',
    description:
      'A complete education platform with student enrollment, grading, attendance and parent communication.',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800',
    technologies: ['React', 'Laravel', 'MySQL', 'Docker'],
    client: 'EduPrime Schools',
    year: '2023',
  },
  {
    slug: 'business-crm',
    title: 'Business CRM',
    category: 'Software',
    description:
      'A sales and customer relationship platform with pipeline tracking, automation and analytics dashboards.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    technologies: ['Next.js', 'Node.js', 'PostgreSQL', 'GraphQL'],
    client: 'SalesForge',
    year: '2024',
  },
  {
    slug: 'delivery-application',
    title: 'Delivery Application',
    category: 'Mobile',
    description:
      'A real-time food delivery app with live tracking, push notifications and driver-side routing.',
    image: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&q=80&w=800',
    technologies: ['React Native', 'Firebase', 'Google Maps', 'Node.js'],
    client: 'QuickDrop',
    year: '2023',
  },
  {
    slug: 'government-portal',
    title: 'Government Service Portal',
    category: 'Web',
    description:
      'A citizen services portal with multi-language support, document upload and secure payment processing.',
    image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800',
    technologies: ['Next.js', 'Python', 'PostgreSQL', 'AWS'],
    client: 'GovConnect',
    year: '2024',
  },
];

export const portfolioCategories = ['All', 'Web', 'Mobile', 'Software', 'E-commerce', 'UI/UX'] as const;
