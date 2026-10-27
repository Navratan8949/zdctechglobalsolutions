export interface TeamMember {
  name: string;
  position: string;
  category: string;
  description: string;
  image: string;
  socials: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

export const teamCategories = [
  'All',
  'Leadership & Founders',
  'Developers',
  'Sales & Marketing',
  'UI/UX Design',
  'Quality Assurance',
] as const;

export type TeamCategory = (typeof teamCategories)[number];

export function normalizeCategory(category?: string, position?: string): string {
  if (category && typeof category === 'string' && category.trim()) {
    const cat = category.trim().toLowerCase();
    if (cat.includes('founder') || cat.includes('lead') || cat.includes('exec') || cat.includes('director') || cat.includes('chief') || cat.includes('c-level')) {
      return 'Leadership & Founders';
    }
    if (cat.includes('dev') || cat.includes('eng') || cat.includes('tech') || cat.includes('code') || cat.includes('software') || cat.includes('mobile') || cat.includes('backend') || cat.includes('frontend')) {
      return 'Developers';
    }
    if (cat.includes('sale') || cat.includes('market') || cat.includes('growth') || cat.includes('biz') || cat.includes('business') || cat.includes('client')) {
      return 'Sales & Marketing';
    }
    if (cat.includes('design') || cat.includes('ui') || cat.includes('ux') || cat.includes('creative') || cat.includes('product design')) {
      return 'UI/UX Design';
    }
    if (cat.includes('qa') || cat.includes('test') || cat.includes('quality') || cat.includes('automation')) {
      return 'Quality Assurance';
    }
    return category.trim();
  }

  if (position && typeof position === 'string') {
    const pos = position.toLowerCase();
    if (pos.includes('founder') || pos.includes('ceo') || pos.includes('coo') || pos.includes('cto') || pos.includes('vice president') || pos.includes('vp') || pos.includes('director')) {
      return 'Leadership & Founders';
    }
    if (pos.includes('developer') || pos.includes('engineer') || pos.includes('architect') || pos.includes('backend') || pos.includes('frontend') || pos.includes('mobile') || pos.includes('devops') || pos.includes('full-stack') || pos.includes('full stack')) {
      return 'Developers';
    }
    if (pos.includes('sales') || pos.includes('marketing') || pos.includes('growth') || pos.includes('business') || pos.includes('client')) {
      return 'Sales & Marketing';
    }
    if (pos.includes('design') || pos.includes('ui') || pos.includes('ux') || pos.includes('creative')) {
      return 'UI/UX Design';
    }
    if (pos.includes('qa') || pos.includes('quality') || pos.includes('test') || pos.includes('automation') || pos.includes('sdet')) {
      return 'Quality Assurance';
    }
  }

  return 'Developers';
}

export const team: TeamMember[] = [
  // Leadership & Founders
  {
    name: 'Arjun Mehta',
    position: 'Founder & Chief Executive Officer',
    category: 'Leadership & Founders',
    description:
      '15+ years of software architecture and technology leadership. Guides ZDC Tech Global Solutions with a relentless commitment to engineering excellence, scalable cloud systems, and client success.',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    socials: { linkedin: 'https://linkedin.com', twitter: 'https://twitter.com' },
  },
  {
    name: 'Sofia Ramirez',
    position: 'Co-Founder & Chief Technology Officer',
    category: 'Leadership & Founders',
    description:
      'Enterprise cloud architecture and distributed systems veteran. Spearheads our high-availability technology stack, AI-driven solutions, and enterprise security frameworks.',
    image: 'https://images.pexels.com/photos/3727464/pexels-photo-3727464.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    socials: { linkedin: 'https://linkedin.com', github: 'https://github.com' },
  },
  {
    name: 'Vikram Singhania',
    position: 'Co-Founder & Chief Operating Officer',
    category: 'Leadership & Founders',
    description:
      'Drives operational excellence, global engineering partnerships, and agile delivery standards. Ensures our delivery pipelines consistently surpass international client benchmarks.',
    image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    socials: { linkedin: 'https://linkedin.com', twitter: 'https://twitter.com' },
  },

  // Developers & Engineering
  {
    name: 'David Chen',
    position: 'Head of Engineering & Full-Stack Lead',
    category: 'Developers',
    description:
      'Full-stack architect with a decade of expertise in Next.js, Node.js, and microservices. Leads engineering squads, code reviews, and technical innovation across client projects.',
    image: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    socials: { linkedin: 'https://linkedin.com', github: 'https://github.com' },
  },
  {
    name: 'James Okafor',
    position: 'Senior Backend & Cloud Architect',
    category: 'Developers',
    description:
      'Distributed systems engineer specializing in high-throughput Node.js microservices, Python APIs, and PostgreSQL optimizations handling millions of requests daily.',
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    socials: { linkedin: 'https://linkedin.com', github: 'https://github.com' },
  },
  {
    name: 'Marcus Johnson',
    position: 'Senior Mobile App Developer (iOS & Android)',
    category: 'Developers',
    description:
      'Cross-platform mobile authority in React Native, Flutter, and native Swift. Shipped 35+ high-rating enterprise and consumer apps to the App Store and Google Play.',
    image: 'https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    socials: { linkedin: 'https://linkedin.com', github: 'https://github.com' },
  },
  {
    name: 'Aarav Patel',
    position: 'Senior Frontend & React Specialist',
    category: 'Developers',
    description:
      'Frontend specialist crafting ultra-fast web applications, interactive dashboards, and design systems using React, TypeScript, Next.js, and Tailwind CSS.',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    socials: { linkedin: 'https://linkedin.com', github: 'https://github.com' },
  },
  {
    name: 'Sneha Kulkarni',
    position: 'DevOps & Cloud Infrastructure Lead',
    category: 'Developers',
    description:
      'DevOps specialist automating zero-downtime CI/CD pipelines, Docker container orchestration, Kubernetes clusters, and AWS/GCP cloud environments.',
    image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    socials: { linkedin: 'https://linkedin.com', github: 'https://github.com' },
  },

  // Sales & Marketing
  {
    name: 'Rahul Verma',
    position: 'Head of Global Sales & Business Development',
    category: 'Sales & Marketing',
    description:
      'Drives business expansion across India, North America, Europe, and the Middle East. Specializes in IT consulting partnerships and custom enterprise software deals.',
    image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    socials: { linkedin: 'https://linkedin.com', twitter: 'https://twitter.com' },
  },
  {
    name: 'Natasha Kapoor',
    position: 'Enterprise Sales & Client Relations Manager',
    category: 'Sales & Marketing',
    description:
      'Dedicated to understanding enterprise client requirements, tailoring digital transformation roadmaps, and ensuring seamless collaboration throughout the engagement lifecycle.',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    socials: { linkedin: 'https://linkedin.com', twitter: 'https://twitter.com' },
  },
  {
    name: 'Elena Volkov',
    position: 'Director of Digital Marketing & Growth',
    category: 'Sales & Marketing',
    description:
      'Omnichannel growth strategist overseeing global brand marketing, content marketing, performance acquisition, and international SEO campaigns for enterprise B2B products.',
    image: 'https://images.pexels.com/photos/3760261/pexels-photo-3760261.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    socials: { linkedin: 'https://linkedin.com', twitter: 'https://twitter.com' },
  },
  {
    name: 'Sameer Khan',
    position: 'Performance Marketing & SEO Strategist',
    category: 'Sales & Marketing',
    description:
      'Expert in digital brand campaigns, data-driven PPC marketing, conversion rate optimization (CRO), and organic customer acquisition strategies.',
    image: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    socials: { linkedin: 'https://linkedin.com', twitter: 'https://twitter.com' },
  },

  // UI/UX Design
  {
    name: 'Priya Sharma',
    position: 'Lead UI/UX Designer',
    category: 'UI/UX Design',
    description:
      'Human-centered design leader translating complex user journeys into intuitive, elegant digital products, wireframes, interactive prototypes, and accessible UI designs.',
    image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    socials: { linkedin: 'https://linkedin.com', twitter: 'https://twitter.com' },
  },
  {
    name: 'Rohan Deshmukh',
    position: 'Senior Product & Design Systems Architect',
    category: 'UI/UX Design',
    description:
      'Creates unified design languages, Figma component libraries, and scalable UI architectures that bridge the gap between design vision and frontend execution.',
    image: 'https://images.pexels.com/photos/927022/pexels-photo-927022.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    socials: { linkedin: 'https://linkedin.com', twitter: 'https://twitter.com' },
  },
  {
    name: 'Ananya Sen',
    position: 'Visual & Interaction Designer',
    category: 'UI/UX Design',
    description:
      'Specialist in motion graphics, micro-interactions, responsive mobile UI, and visual storytelling that elevate modern web and mobile applications.',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    socials: { linkedin: 'https://linkedin.com', twitter: 'https://twitter.com' },
  },

  // Quality Assurance
  {
    name: 'Yuki Tanaka',
    position: 'QA & Test Automation Lead',
    category: 'Quality Assurance',
    description:
      'Architect of robust quality engineering. Builds automated testing frameworks with Cypress, Playwright, and Selenium to guarantee bug-free deployments.',
    image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    socials: { linkedin: 'https://linkedin.com', github: 'https://github.com' },
  },
  {
    name: 'Deepa Nair',
    position: 'Senior SDET & Security Testing Engineer',
    category: 'Quality Assurance',
    description:
      'Specialized in automated API regression testing, OWASP vulnerability assessments, and performance stress testing to deliver resilient, rock-solid software.',
    image: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    socials: { linkedin: 'https://linkedin.com', github: 'https://github.com' },
  },
];
