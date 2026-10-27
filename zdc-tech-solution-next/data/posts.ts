export interface Post {
  _id?: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  image?: {
    public_id?: string;
    url?: string;
  };
  author?: {
    name: string;
    role: string;
    avatar?: {
      public_id?: string;
      url?: string;
    };
  };
  tags?: string[];
  date: string;
  status?: "draft" | "published";
  pinned?: boolean;
  likes?: number;
}

export const samplePosts: Post[] = [
  {
    _id: "sample-1",
    title: "Scaling Next.js 14 Web Applications for Millions of Daily Requests",
    slug: "scaling-nextjs-14-applications",
    category: "Engineering",
    excerpt:
      "A deep dive into our engineering team's architecture strategies: ISR caching, edge middleware, and distributed cloud microservices that keep our web apps blazing fast.",
    content: `
      <p>Building high-throughput web applications requires careful planning across both frontend delivery and backend infrastructure. At ZDC Tech Global Solutions, our engineering teams deploy high-performance Next.js systems engineered for zero-downtime scalability.</p>
      
      <h3>1. Edge Middleware & Route Optimization</h3>
      <p>By shifting geolocation routing, authentication verification, and asset headers to Cloudflare and AWS edge workers, round-trip latency drops by up to 60% compared to origin server hits.</p>
      
      <h3>2. Incremental Static Regeneration (ISR)</h3>
      <p>For high-traffic portals like e-commerce and knowledge bases, ISR gives you the speed of static HTML with the live freshness of SSR, caching dynamic content at the CDN layer.</p>
      
      <p>Stay tuned for tomorrow's daily post where we break down our PostgreSQL indexing strategies!</p>
    `,
    image: {
      url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    },
    author: {
      name: "Navratan Prajapat",
      role: "Lead Full-Stack Architect",
    },
    tags: ["Next.js", "Performance", "Cloud", "Architecture"],
    date: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(), // 4 hours ago
    pinned: true,
    likes: 42,
    status: "published",
  },
  {
    _id: "sample-2",
    title: "ZDC Tech Achieves ISO Certification & Enterprise Milestone",
    slug: "zdc-tech-enterprise-milestone",
    category: "Company News",
    excerpt:
      "We are proud to announce our latest milestone in delivering international software excellence with enterprise-grade security compliance and zero defect standards.",
    content: `
      <p>Today marks an incredible milestone for the ZDC Tech Global Solutions team! Our commitment to rigorous software engineering and client data integrity has reached a new international benchmark.</p>
      
      <p>Thank you to our dedicated team of 20+ software developers, QA leads, design strategists, and clients across 12 countries who make this journey possible.</p>
    `,
    image: {
      url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
    },
    author: {
      name: "ZDC Executive Team",
      role: "Company Newsroom",
    },
    tags: ["Milestone", "Enterprise", "Company"],
    date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // Yesterday
    pinned: false,
    likes: 58,
    status: "published",
  },
  {
    _id: "sample-3",
    title: "Why Modern Micro-Interactions Elevate Web App Conversion Rates",
    slug: "modern-micro-interactions-ux",
    category: "UI/UX Design",
    excerpt:
      "Subtle feedback loops, hover transforms, and tactile UI animations build user trust and directly increase form completions by up to 35%.",
    content: `
      <p>Great digital design is invisible until you notice how seamless and responsive everything feels. Micro-animations give users visual feedback, confirming that the system heard their action.</p>
      
      <p>Whether it's a smooth button scale on hover, a progressive status indicator, or an animated tab transition, these subtle cues reduce perceived latency and delight visitors.</p>
    `,
    image: {
      url: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
    },
    author: {
      name: "Saloni Kumari",
      role: "Senior UI/UX Designer",
    },
    tags: ["UI/UX", "Design", "Framer Motion", "Conversion"],
    date: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
    pinned: false,
    likes: 29,
    status: "published",
  },
  {
    _id: "sample-4",
    title: "How Our Technical Support Team Resolves Client Inquiries Under 15 Minutes",
    slug: "technical-support-sla-excellence",
    category: "Technical Support",
    excerpt:
      "A peek inside our proactive support desk, real-time server monitoring tools, and fast troubleshooting protocols that keep enterprise clients operational 24/7.",
    content: `
      <p>High availability isn't just about code—it's about reliable human support when you need it most. Our dedicated technical support desk handles server uptime, domain DNS setups, CRM integrations, and mobile deployments around the clock.</p>
      
      <p>With an average initial response time of under 15 minutes, we ensure our global partners always stay ahead of potential roadblocks.</p>
    `,
    image: {
      url: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1200&q=80",
    },
    author: {
      name: "Bharti Patel",
      role: "Technical Support Executive",
    },
    tags: ["Support", "Operations", "SLA", "Client Care"],
    date: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(), // 3 days ago
    pinned: false,
    likes: 37,
    status: "published",
  },
];
