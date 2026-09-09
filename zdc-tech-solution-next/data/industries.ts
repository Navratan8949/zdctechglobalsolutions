export interface Industry {
  name: string;
  icon: string;
  description: string;
}

export const industries: Industry[] = [
  {
    name: 'Healthcare',
    icon: 'HeartPulse',
    description: 'Patient management, telemedicine and hospital operations platforms.',
  },
  {
    name: 'Education',
    icon: 'GraduationCap',
    description: 'Learning management, school administration and student engagement.',
  },
  {
    name: 'Finance',
    icon: 'Landmark',
    description: 'Fintech, banking portals and secure payment processing systems.',
  },
  {
    name: 'Government',
    icon: 'Building2',
    description: 'Citizen service portals, document management and public platforms.',
  },
  {
    name: 'E-commerce',
    icon: 'ShoppingCart',
    description: 'Online marketplaces, payment gateways and inventory management.',
  },
  {
    name: 'Manufacturing',
    icon: 'Factory',
    description: 'Production tracking, supply chain and quality control systems.',
  },
  {
    name: 'Logistics',
    icon: 'Truck',
    description: 'Fleet management, route optimization and delivery tracking.',
  },
  {
    name: 'Real Estate',
    icon: 'Home',
    description: 'Property listings, tenant management and CRM platforms.',
  },
  {
    name: 'Technology',
    icon: 'Cpu',
    description: 'SaaS platforms, developer tools and infrastructure products.',
  },
];
