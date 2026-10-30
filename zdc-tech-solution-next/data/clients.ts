export interface EngagementModelItem {
  icon: string;
  title: string;
  description: string;
}

export interface IndustryItem {
  title: string;
  description: string;
}

export interface ClientHeroStat {
  value: string;
  label: string;
}

export interface ClientsPageContent {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    image: {
      public_id: string;
      url: string;
    };
    badgeNumber: string;
    badgeText: string;
    ratingText: string;
    primaryCtaText: string;
    primaryCtaLink: string;
    secondaryCtaText: string;
    secondaryCtaLink: string;
    highlights: string[];
    stats: ClientHeroStat[];
  };
  partnerships: {
    eyebrow: string;
    title: string;
    description: string;
    subheading: string;
  };
  engagementModels: {
    eyebrow: string;
    title: string;
    description: string;
    models: EngagementModelItem[];
  };
  domainExpertise: {
    eyebrow: string;
    title: string;
    description: string;
    industries: IndustryItem[];
  };
  trustAndSecurity: {
    eyebrow: string;
    title: string;
    description: string;
    standards: string[];
    cardTitle: string;
    cardDescription: string;
    caseStudiesText: string;
    caseStudiesLink: string;
    portfolioText: string;
    portfolioLink: string;
  };
}

export const fallbackClientsPageContent: ClientsPageContent = {
  hero: {
    eyebrow: "Our Clients",
    title: "Trusted by Innovative Companies Worldwide",
    description:
      "We partner with startups, growing brands, and established enterprises to design, engineer, and scale high-performance digital products.",
    image: {
      public_id: "",
      url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
    },
    badgeNumber: "98%",
    badgeText: "Client Retention Rate",
    ratingText: "5.0 ★ Rated Across 50+ Global Clients",
    primaryCtaText: "Become a Client Partner",
    primaryCtaLink: "/contact",
    secondaryCtaText: "Explore Case Studies",
    secondaryCtaLink: "/case-studies",
    highlights: [
      "100% IP & Source Code Ownership Transferred",
      "Strict NDAs Executed Before Technical Discovery",
      "Direct Collaboration with Senior Tech Leads",
      "Guaranteed 99.99% Cloud Architecture SLA",
    ],
    stats: [
      { value: "100+", label: "Enterprise Deliveries" },
      { value: "50+", label: "Global Brand Partners" },
      { value: "12+", label: "Countries Served" },
      { value: "98%", label: "Client Satisfaction" },
    ],
  },
  partnerships: {
    eyebrow: "Partnerships",
    title: "Global Footprint",
    description:
      "Our engineering solutions power organizations across diverse sectors and global markets.",
    subheading: "Trusted by 100K+ Clients Worldwide",
  },
  engagementModels: {
    eyebrow: "ENGAGEMENT MODELS",
    title: "Flexible Ways We Work Together",
    description:
      "Every organization has unique operational workflows. We tailor our collaboration model to match your specific timeline, team structure, and delivery goals.",
    models: [
      {
        icon: "Users",
        title: "Dedicated Engineering Teams",
        description:
          "Seamlessly extend your internal development capabilities with dedicated full-stack engineers, UI/UX designers, and QA specialists who work exclusively on your product roadmap.",
      },
      {
        icon: "Code2",
        title: "End-to-End Product Delivery",
        description:
          "From discovery and technical architecture to deployment and monitoring, we take full ownership of designing, building, and launching your digital platform on schedule.",
      },
      {
        icon: "ShieldCheck",
        title: "Enterprise Technical Consulting",
        description:
          "Get strategic guidance on software architecture, performance optimization, cloud infrastructure scalability, and security audits from experienced senior engineers.",
      },
      {
        icon: "Headphones",
        title: "Ongoing Support & SLA Management",
        description:
          "Keep your production systems secure, updated, and highly responsive with round-the-clock monitoring, routine maintenance, and dedicated technical support.",
      },
    ],
  },
  domainExpertise: {
    eyebrow: "DOMAIN EXPERTISE",
    title: "Industries We Transform",
    description:
      "Our engineering teams bring deep technical knowledge combined with practical domain understanding to build purpose-built software.",
    industries: [
      {
        title: "Healthcare & Life Sciences",
        description:
          "HIPAA-compliant hospital management, patient portals, appointment scheduling, and electronic health record systems.",
      },
      {
        title: "E-Commerce & Retail",
        description:
          "High-conversion multi-vendor marketplaces, custom checkout flows, inventory automation, and payment gateway integrations.",
      },
      {
        title: "Finance & Banking",
        description:
          "Secure customer dashboards, real-time transaction tracking, compliance-ready financial portals, and automated reporting.",
      },
      {
        title: "Education & EdTech",
        description:
          "Student learning management systems, parent communication apps, digital attendance, and multi-campus administrative software.",
      },
      {
        title: "Logistics & Supply Chain",
        description:
          "Live order tracking, fleet management dashboards, automated dispatch routing, and warehouse inventory systems.",
      },
      {
        title: "Enterprise SaaS & Cloud",
        description:
          "Multi-tenant cloud platforms, subscription billing, CRM automation, and high-performance microservices architecture.",
      },
    ],
  },
  trustAndSecurity: {
    eyebrow: "TRUST & SECURITY",
    title: "Our Commitment to Every Client Partner",
    description:
      "Building long-term client relationships requires more than clean code. We maintain rigorous standards for confidentiality, security compliance, and transparent delivery throughout every stage of the project lifecycle.",
    standards: [
      "Complete intellectual property (IP) and source code ownership transferred to the client upon milestone delivery.",
      "Comprehensive Non-Disclosure Agreements (NDAs) signed before technical discovery and requirement analysis.",
      "Bi-weekly agile sprint demos, sprint retrospectives, and direct communication with project leads.",
      "Automated CI/CD pipelines, code reviews, and comprehensive regression test suites for every deployment.",
    ],
    cardTitle: "Explore Case Studies & Results",
    cardDescription:
      "Review real-world architectures and measurable outcomes from our recent client engagements across healthcare, e-commerce, and enterprise management.",
    caseStudiesText: "View Case Studies",
    caseStudiesLink: "/case-studies",
    portfolioText: "Browse Portfolio",
    portfolioLink: "/portfolio",
  },
};
