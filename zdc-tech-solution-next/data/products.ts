export interface ProductItem {
  id?: string;
  _id?: string;
  slug: string;
  title: string;
  tagline: string;
  category: string;
  description: string;
  image?: {
    public_id?: string;
    url?: string;
  } | string;
  features: string[];
  metrics: string;
  badge: string;
  icon: string;
  deployment?: string;
  ctaText?: string;
  ctaLink?: string;
  order?: number;
  isActive?: boolean;
}

export const productCategories: string[] = [
  "All",
  "Enterprise ERP",
  "HRMS & Workforce",
  "CRM & Sales",
  "E-Commerce",
  "AI & Analytics",
  "Healthcare",
  "EdTech & Education",
];

export const products: ProductItem[] = [
  {
    id: "zdc-enterprise-one",
    _id: "zdc-enterprise-one",
    slug: "zdc-enterprise-one",
    title: "ZDC Enterprise One",
    tagline: "All-in-one scalable cloud enterprise resource planning suite",
    category: "Enterprise ERP",
    description:
      "Streamline multi-branch operations, real-time finance, supply chain, automated billing, and inventory tracking with an intuitive, unified cloud dashboard.",
    image: {
      public_id: "",
      url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    },
    features: [
      "Multi-entity financial accounting & automated tax (GST/VAT)",
      "Warehouse management with real-time stock optimization",
      "Automated procurement and vendor management portals",
      "Executive KPI dashboards with predictive revenue forecasting",
    ],
    metrics: "45% Reduction in Admin Overhead",
    deployment: "Cloud-Ready & Customizable",
    badge: "Flagship Suite",
    icon: "Building2",
    ctaText: "Request ERP Demo",
    ctaLink: "/contact?product=zdc-enterprise-one",
    order: 1,
    isActive: true,
  },
  {
    id: "zdc-hrms-hub",
    _id: "zdc-hrms-hub",
    slug: "zdc-hrms-hub",
    title: "ZDC HRMS & Global Payroll",
    tagline: "Next-gen human resources & compliant payroll automation",
    category: "HRMS & Workforce",
    description:
      "Empower HR teams with biometric attendance sync, automated tax withholding, multi-tier leave approval, performance appraisals, and employee self-service apps.",
    image: {
      public_id: "",
      url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
    },
    features: [
      "1-Click automated monthly payroll & encrypted payslip dispatch",
      "Biometric, geo-fence and remote attendance tracking",
      "Quarterly performance reviews, 360° feedback and KPI scoring",
      "Mobile Employee Self-Service (ESS) app for iOS & Android",
    ],
    metrics: "99.8% Payroll Accuracy",
    deployment: "Cloud-Ready & Customizable",
    badge: "Most Popular",
    icon: "Users",
    ctaText: "Explore HRMS",
    ctaLink: "/contact?product=zdc-hrms-hub",
    order: 2,
    isActive: true,
  },
  {
    id: "zdc-commerce-flow",
    _id: "zdc-commerce-flow",
    slug: "zdc-commerce-flow",
    title: "ZDC Commerce Flow",
    tagline: "High-speed headless omni-channel commerce & marketplace engine",
    category: "E-Commerce",
    description:
      "Engineered for high-volume retail brands, B2B wholesale, and multi-vendor marketplaces with sub-second page loads, custom checkouts, and AI search.",
    image: {
      public_id: "",
      url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    },
    features: [
      "Headless API-first architecture with Next.js frontend performance",
      "Multi-currency, multi-language and global payment gateway support",
      "Integrated POS synchronization for in-store & digital orders",
      "AI-driven product recommendations & abandoned cart recovery",
    ],
    metrics: "+38% Higher Cart Conversion",
    deployment: "Headless / Cloud Native",
    badge: "High Growth",
    icon: "ShoppingCart",
    ctaText: "View Commerce Platform",
    ctaLink: "/contact?product=zdc-commerce-flow",
    order: 3,
    isActive: true,
  },
  {
    id: "zdc-crm-omnidesk",
    _id: "zdc-crm-omnidesk",
    slug: "zdc-crm-omnidesk",
    title: "ZDC CRM OmniDesk",
    tagline: "Intelligent lead-to-revenue automation system",
    category: "CRM & Sales",
    description:
      "Supercharge sales pipelines with WhatsApp CRM integration, automated lead distribution, deal stage analytics, and customer interaction histories in one unified view.",
    image: {
      public_id: "",
      url: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
    },
    features: [
      "Official WhatsApp Business API & automated email outreach sequences",
      "Visual drag-and-drop pipeline stages with win-probability scoring",
      "Instant quotation generator, GST invoicing and digital signature approval",
      "Real-time team activity timeline and call interaction logging",
    ],
    metrics: "3x Faster Lead Response",
    deployment: "Cloud-Ready & Customizable",
    badge: "Sales Accelerator",
    icon: "TrendingUp",
    ctaText: "Schedule CRM Demo",
    ctaLink: "/contact?product=zdc-crm-omnidesk",
    order: 4,
    isActive: true,
  },
  {
    id: "zdc-vision-bi",
    _id: "zdc-vision-bi",
    slug: "zdc-vision-bi",
    title: "ZDC Vision BI & Analytics",
    tagline: "Instant business intelligence & AI-powered forecasting",
    category: "AI & Analytics",
    description:
      "Connect your databases, CRMs, and spreadsheets into live, interactive dashboards that forecast revenue trends, highlight operational bottlenecks, and automate weekly reporting.",
    image: {
      public_id: "",
      url: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&q=80",
    },
    features: [
      "Native connectors for PostgreSQL, MongoDB, BigQuery, MySQL and Excel",
      "Natural language AI queries (e.g. 'Show top customers by lifetime value')",
      "Automated scheduled PDF executive summaries delivered to Slack & Email",
      "Granular role-based permissions with encrypted columnar storage",
    ],
    metrics: "Sub-Second Query Engine",
    deployment: "SaaS / Private VPC",
    badge: "AI-Powered",
    icon: "Cpu",
    ctaText: "Try Vision BI",
    ctaLink: "/contact?product=zdc-vision-bi",
    order: 5,
    isActive: true,
  },
  {
    id: "zdc-educampus",
    _id: "zdc-educampus",
    slug: "zdc-educampus",
    title: "ZDC EduCampus 360",
    tagline: "Complete smart campus administration platform",
    category: "EdTech & Education",
    description:
      "Modern cloud platform for schools, colleges, and training institutes covering online admissions, fee payment gateways, examinations, report cards, and parent notifications.",
    image: {
      public_id: "",
      url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
    },
    features: [
      "Automated online fee collection with instant WhatsApp & SMS receipts",
      "Student & teacher attendance tracking with biometric/RFID integration",
      "Exam scheduler, grading rubric engine and dynamic report card generator",
      "Dedicated parent portal mobile app with homework & bus tracking updates",
    ],
    metrics: "50,000+ Students Managed",
    deployment: "Cloud-Ready & Customizable",
    badge: "Complete Suite",
    icon: "GraduationCap",
    ctaText: "Request Campus Demo",
    ctaLink: "/contact?product=zdc-educampus",
    order: 6,
    isActive: true,
  },
  {
    id: "zdc-medicare-plus",
    _id: "zdc-medicare-plus",
    slug: "zdc-medicare-plus",
    title: "ZDC MediCare Plus",
    tagline: "HIPAA-ready clinical management & patient electronic health records",
    category: "Healthcare",
    description:
      "Secure, compliant medical management software designed for multi-specialty clinics, diagnostic labs, and hospitals to coordinate care and streamline billing.",
    image: {
      public_id: "",
      url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
    },
    features: [
      "Encrypted Electronic Health Records (EHR) & digital prescriptions",
      "Doctor appointment scheduling, token management and telemedicine calls",
      "Pharmacy stock inventory, batch tracking and barcode billing",
      "Insurance claim tracking, TPA desk and cashless hospitalization workflows",
    ],
    metrics: "HIPAA Compliant & Secure",
    deployment: "HIPAA Cloud / On-Premise",
    badge: "Healthcare Grade",
    icon: "HeartPulse",
    ctaText: "Book Medical Demo",
    ctaLink: "/contact?product=zdc-medicare-plus",
    order: 7,
    isActive: true,
  },
  {
    id: "zdc-supportdesk-pro",
    _id: "zdc-supportdesk-pro",
    slug: "zdc-supportdesk-pro",
    title: "ZDC SupportDesk Pro",
    tagline: "Omnichannel customer support & AI ticketing system",
    category: "CRM & Sales",
    description:
      "Deliver lightning-fast support with unified ticketing from Email, Chat, WhatsApp, and Web, backed by automated SLA management and an AI knowledge bot.",
    image: {
      public_id: "",
      url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
    },
    features: [
      "Unified shared inbox for Email, WhatsApp, Website Chat and Portal forms",
      "Intelligent auto-tagging, priority assignment and SLA breach alerts",
      "Searchable public knowledge base and internal SOP documentation",
      "Customer satisfaction (CSAT) surveys with agent performance metrics",
    ],
    metrics: "70% Faster First Response",
    deployment: "Cloud-Ready & Customizable",
    badge: "Support Engine",
    icon: "LifeBuoy",
    ctaText: "Explore SupportDesk",
    ctaLink: "/contact?product=zdc-supportdesk-pro",
    order: 8,
    isActive: true,
  },
];
