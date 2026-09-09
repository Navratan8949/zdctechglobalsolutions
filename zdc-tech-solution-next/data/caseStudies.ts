export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  features: string[];
  technologies: string[];
  results: { label: string; value: string }[];
  image: string;
  heroHeadline: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'healthcare-management',
    title: 'Healthcare Management System',
    client: 'MediCare Hospitals',
    industry: 'Healthcare',
    heroHeadline: 'Digitizing patient care across a 5-hospital network',
    challenge:
      'MediCare Hospitals relied on paper-based records and disconnected scheduling systems across five locations. Patient data was siloed, appointment wait times averaged 45 minutes, and billing errors led to significant revenue leakage. Staff spent hours on manual coordination instead of focusing on patient care.',
    solution:
      'We designed and built a unified hospital management platform that centralizes patient records, appointments, billing and pharmacy operations. The system integrates with existing lab equipment and uses a role-based access model so doctors, nurses and administrators each see exactly what they need. A real-time dashboard gives hospital directors visibility into occupancy and resource allocation.',
    features: [
      'Electronic Health Records (EHR) with version history',
      'Multi-location appointment scheduling',
      'Automated billing with insurance claim support',
      'Pharmacy inventory management',
      'Role-based access for doctors, nurses and admin staff',
      'Real-time hospital occupancy dashboard',
      'Patient portal for appointment booking and records',
      'SMS and email appointment reminders',
    ],
    technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'Docker', 'Redis'],
    results: [
      { label: 'Reduction in wait times', value: '60%' },
      { label: 'Billing errors eliminated', value: '95%' },
      { label: 'Patient satisfaction increase', value: '40%' },
      { label: 'Staff time saved weekly', value: '120 hrs' },
    ],
    image: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
  },
  {
    slug: 'ecommerce-platform',
    title: 'E-commerce Platform',
    client: 'ShopWave',
    industry: 'E-commerce',
    heroHeadline: 'Scaling a multi-vendor marketplace to 10,000 daily orders',
    challenge:
      'ShopWave was a growing marketplace struggling with a legacy platform that could not handle increasing traffic. Page load times exceeded 5 seconds during peak hours, the checkout flow had a 70% abandonment rate, and sellers had no self-service tools to manage their inventory or orders.',
    solution:
      'We rebuilt the entire platform on a modern architecture using Next.js for the storefront and a microservices backend. The new checkout is a single page with guest checkout support. We built a seller dashboard for inventory, order tracking and analytics, and implemented a smart search engine with filters and recommendations. A Redis-based caching layer handles traffic spikes gracefully.',
    features: [
      'Multi-vendor marketplace with seller dashboards',
      'One-page checkout with guest support',
      'Smart product search with filters',
      'Real-time order tracking',
      'Automated email and SMS notifications',
      'Coupon and flash-sale engine',
      'Multi-currency and multi-language support',
      'Admin analytics dashboard',
    ],
    technologies: ['Next.js', 'Node.js', 'MongoDB', 'Redis', 'Stripe', 'AWS'],
    results: [
      { label: 'Page load time reduction', value: '80%' },
      { label: 'Checkout abandonment drop', value: '45%' },
      { label: 'Daily order capacity', value: '10,000+' },
      { label: 'Revenue growth in 6 months', value: '3x' },
    ],
    image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
  },
  {
    slug: 'school-management',
    title: 'School Management System',
    client: 'EduPrime Schools',
    industry: 'Education',
    heroHeadline: 'Bringing 12 schools into one connected platform',
    challenge:
      'EduPrime operated 12 schools using a mix of spreadsheets and fragmented software. Report cards took teachers a full week to compile, parent communication was inconsistent, and attendance tracking was manual and error-prone. The administration had no unified view of performance across campuses.',
    solution:
      'We built a comprehensive school management system that serves administrators, teachers, students and parents in one platform. Teachers can mark attendance, input grades and generate report cards in minutes. Parents get a mobile app with real-time updates on attendance, grades and school announcements. Administrators have cross-campus analytics for enrollment, performance and resource allocation.',
    features: [
      'Student enrollment and records management',
      'Digital attendance with biometric integration',
      'Automated report card generation',
      'Parent mobile app with real-time notifications',
      'Online fee payment and receipts',
      'Timetable scheduling engine',
      'Exam and grading management',
      'Cross-campus analytics dashboard',
    ],
    technologies: ['React', 'Laravel', 'MySQL', 'React Native', 'Docker'],
    results: [
      { label: 'Report card generation time', value: '90% faster' },
      { label: 'Parent engagement increase', value: '55%' },
      { label: 'Attendance accuracy', value: '99%' },
      { label: 'Schools onboarded', value: '12' },
    ],
    image: 'https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
  },
  {
    slug: 'business-crm',
    title: 'Business CRM',
    client: 'SalesForge',
    industry: 'Business',
    heroHeadline: 'Helping a sales team close 2x more deals with a custom CRM',
    challenge:
      'SalesForge had a 20-person sales team using a generic CRM that did not match their pipeline stages or approval workflows. Data entry was manual, follow-ups were missed, and sales managers had no real-time visibility into deal progress. The team was spending more time managing the tool than selling.',
    solution:
      'We built a custom CRM that mirrors SalesForge exact sales process — from lead capture to contract signing. The system automatically logs calls and emails, reminds reps about follow-ups, and provides sales managers with a live pipeline view. We added an automation engine that triggers email sequences and approval requests based on deal stage changes.',
    features: [
      'Custom pipeline stages and deal tracking',
      'Automated call and email logging',
      'Smart follow-up reminders',
      'Email sequence automation',
      'Deal approval workflows',
      'Sales forecasting and analytics',
      'Contact and company management',
      'Mobile app for field sales',
    ],
    technologies: ['Next.js', 'Node.js', 'PostgreSQL', 'GraphQL', 'AWS'],
    results: [
      { label: 'Deal close rate increase', value: '2x' },
      { label: 'Follow-ups missed', value: '90% fewer' },
      { label: 'Manual data entry time', value: '70% less' },
      { label: 'Sales rep productivity', value: '+35%' },
    ],
    image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
  },
];

export const getCaseStudyBySlug = (slug: string): CaseStudy | undefined =>
  caseStudies.find((c) => c.slug === slug);
