export interface BlogAuthor {
  name: string;
  role: string;
  avatar: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readingTime: string;
  coverImage: string;
  author: BlogAuthor;
  featured?: boolean;
  content: { heading?: string; paragraphs: string[] }[];
}

export const authors: Record<string, BlogAuthor> = {
  arjun: {
    name: "Arjun Mehta",
    role: "Founder & CEO",
    avatar:
      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop",
  },
  sofia: {
    name: "Sofia Ramirez",
    role: "Chief Technology Officer",
    avatar:
      "https://images.pexels.com/photos/3727464/pexels-photo-3727464.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop",
  },
  priya: {
    name: "Priya Sharma",
    role: "Lead UI/UX Designer",
    avatar:
      "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop",
  },
  elena: {
    name: "Elena Volkov",
    role: "Digital Marketing Director",
    avatar:
      "https://images.pexels.com/photos/3760261/pexels-photo-3760261.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop",
  },
};

export const blogPosts: BlogPost[] = [
  {
    slug: "digital-transformation",
    title:
      "Digital Transformation: A Practical Roadmap for Traditional Businesses",
    excerpt:
      "Going digital is not about buying software — it is about rethinking how your business operates. Here is a step-by-step framework that actually works.",
    category: "Strategy",
    date: "2024-11-15",
    readingTime: "7 min read",
    coverImage:
      "https://media.licdn.com/dms/image/v2/D5612AQGCugO26Oj__A/article-cover_image-shrink_720_1280/B56ZxHIGsGI8AM-/0/1770719833655?e=2147483647&v=beta&t=mpnbTs3S0TrvWb-Nw6CPhwkhI503suskUTZolDWK0RQ",
    author: authors.arjun,
    featured: true,
    content: [
      {
        paragraphs: [
          "Digital transformation has become one of the most used and least understood terms in business. For many organizations, it means buying a new tool or moving to the cloud. But true transformation is not about technology purchases — it is about rethinking how your business creates value in a digital-first world.",
          "In this article, we break down a practical, phased approach to digital transformation that we have seen succeed across industries. It is not a theoretical framework. It is a roadmap built from real engagements with real companies.",
        ],
      },
      {
        heading: "Phase 1: Assessment and Goal Setting",
        paragraphs: [
          "Before any technology decision, you need to understand where you stand today. This means auditing your current systems, mapping your core business processes, and identifying the bottlenecks that slow you down. Are your teams manually entering data across three systems? Is customer information scattered across departments? Are decisions being made on stale data?",
          'Once the current state is clear, define what success looks like. Not in vague terms like "become more digital" but in specific, measurable outcomes — reduce order processing time by 50 percent, increase customer self-service adoption to 60 percent, or cut reporting time from days to minutes.',
        ],
      },
      {
        heading: "Phase 2: Quick Wins",
        paragraphs: [
          "Transformation is a long journey, and momentum matters. We always recommend starting with quick wins — improvements that are visible within 30 to 60 days. This could be automating a single approval workflow, replacing a spreadsheet with a simple internal tool, or integrating two systems that currently require manual data entry.",
          "Quick wins build confidence in the transformation program. They show your team that change is possible and beneficial, which makes the larger initiatives easier to drive.",
        ],
      },
      {
        heading: "Phase 3: Core Platform Build",
        paragraphs: [
          "With momentum from quick wins, you can tackle the core platform — the central system that will power your operations. This is typically a custom application or a heavily configured platform that consolidates your key workflows into one place. It is the system your business runs on.",
          "This phase requires the most investment in time and resources, but it is also where the transformation becomes permanent. The goal is to build something that your team actually wants to use, not something they are forced to use.",
        ],
      },
      {
        heading: "Phase 4: Integration and Automation",
        paragraphs: [
          "Once the core platform is in place, the next step is connecting it to the rest of your ecosystem — accounting software, marketing tools, customer support platforms, and external partner systems. Integration eliminates data silos and enables automation.",
          "This is where the compounding benefits appear. An order placed on your website automatically updates inventory, triggers fulfillment, sends a confirmation email, and creates an invoice — all without human intervention.",
        ],
      },
      {
        heading: "Phase 5: Optimization and Scale",
        paragraphs: [
          "Transformation is never truly finished. Once the system is running, the focus shifts to optimization — using the data flowing through your platform to identify further improvements. Which workflows still have bottlenecks? Where are users dropping off? What can be automated next?",
          "The companies that succeed at digital transformation treat it as an ongoing capability, not a one-time project. They build internal teams that can identify opportunities and work with technology partners to execute them quickly.",
        ],
      },
      {
        paragraphs: [
          "Digital transformation is challenging, but it is also the most significant competitive advantage available today. Companies that execute it well do not just save costs — they open new revenue streams, enter new markets, and deliver experiences that set them apart. The key is to start with clarity, build with momentum, and keep optimizing.",
        ],
      },
    ],
  },
  {
    slug: "mobile-app-development",
    title:
      "Native vs Cross-Platform: Choosing the Right Mobile Strategy in 2025",
    excerpt:
      "React Native, Flutter, or native? The answer depends on your product, team and timeline. Here is how to decide without the hype.",
    category: "Mobile",
    date: "2024-10-28",
    readingTime: "6 min read",
    coverImage:
      "https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=1200&h=630&fit=crop",
    author: authors.sofia,
    content: [
      {
        paragraphs: [
          "The mobile development landscape has evolved dramatically. Five years ago, cross-platform frameworks were a compromise — you saved money but sacrificed performance and native feel. Today, frameworks like React Native and Flutter have closed that gap so significantly that for most products, cross-platform is the better choice.",
          'But "most products" is not "all products." Let us break down when each approach makes sense, so you can make an informed decision for your specific situation.',
        ],
      },
      {
        heading: "When Cross-Platform Wins",
        paragraphs: [
          "Cross-platform development with React Native or Flutter is our default recommendation for the majority of mobile projects. The reason is simple economics: one codebase, two platforms, one team. This means faster development, lower cost, and easier maintenance — all while delivering a user experience that is nearly indistinguishable from native.",
          "Choose cross-platform when your app is content-driven, uses standard UI patterns, needs to be on both iOS and Android, and your budget and timeline matter. That describes about 80 percent of business apps.",
        ],
      },
      {
        heading: "When Native Still Makes Sense",
        paragraphs: [
          "Native development — Swift for iOS and Kotlin for Android — still has its place. If your app requires heavy graphics processing, complex animations at 120fps, deep integration with platform-specific hardware, or the absolute best possible performance, native is the right choice.",
          "Gaming apps, video editing tools, and apps that use cutting-edge platform features before cross-platform frameworks support them are good candidates for native. The trade-off is higher cost and longer timelines since you are essentially building two apps.",
        ],
      },
      {
        heading: "The React Native vs Flutter Question",
        paragraphs: [
          "If you have decided on cross-platform, the next question is which framework. Both are excellent, but they have different strengths. React Native uses JavaScript and React, which means if you have a web team, they can transition to mobile development relatively easily. It also has a massive ecosystem of libraries and a large community.",
          "Flutter uses Dart and provides its own rendering engine, which means incredibly consistent UI across platforms and excellent animation performance. It tends to feel more polished out of the box but has a steeper learning curve for teams new to Dart.",
        ],
      },
      {
        heading: "Our Recommendation",
        paragraphs: [
          "For most business apps, we recommend React Native because of the shared skillset with web development and the depth of the ecosystem. For apps where visual polish and animation are critical, Flutter is often the better choice. For apps where performance is non-negotiable, native remains the answer.",
          "The good news is that you do not have to get this perfectly right on day one. The best approach is to discuss your specific product requirements, timeline and team capabilities with an experienced mobile partner, and make the decision based on your real constraints rather than general advice.",
        ],
      },
    ],
  },
  {
    slug: "web-development-trends",
    title: "Web Development Trends That Actually Matter in 2025",
    excerpt:
      "Beyond the hype cycle, here are the web development trends that are genuinely changing how we build and what users expect.",
    category: "Web",
    date: "2024-10-10",
    readingTime: "5 min read",
    coverImage:
      "https://images.pexels.com/photos/270557/pexels-photo-270557.jpeg?auto=compress&cs=tinysrgb&w=1200&h=630&fit=crop",
    author: authors.priya,
    content: [
      {
        paragraphs: [
          "Every year brings a new wave of web development trends, and separating signal from noise is a challenge. Frameworks rise and fall, tools come and go, and it is easy to chase the latest thing without asking whether it actually helps your users or your team.",
          "Here are the trends we believe genuinely matter in 2025 — the ones that are changing how we build, how fast we ship, and what users expect from a modern web experience.",
        ],
      },
      {
        heading: "Server Components Are Reshaping Architecture",
        paragraphs: [
          "React Server Components, popularized by Next.js, are changing how we think about rendering. Instead of sending everything to the client, components can run on the server, sending only what is necessary to the browser. This means smaller JavaScript bundles, faster initial loads, and better SEO.",
          "This is not a minor optimization. It is a fundamental shift in how web applications are architected, and teams that adopt it are shipping faster, lighter experiences.",
        ],
      },
      {
        heading: "Edge Computing for Performance",
        paragraphs: [
          "Running code at the edge — closer to your users — is no longer just for CDN caching. Full application logic can now run at edge locations worldwide, dramatically reducing latency for global audiences. This is particularly impactful for e-commerce and content-heavy sites where every millisecond affects conversion.",
          "Platforms like Vercel and Cloudflare are making edge deployment accessible, and we expect it to become the default for performance-critical applications.",
        ],
      },
      {
        heading: "AI Integration Is Becoming Standard",
        paragraphs: [
          "AI features are moving from novelty to expectation. Search bars that understand natural language, content generation tools, intelligent recommendations, and AI-powered customer support are becoming table stakes in many product categories. The question is no longer whether to integrate AI, but how to do it in a way that genuinely helps users.",
          "The key is purposeful integration. AI should solve a real user problem, not just be a badge on your homepage.",
        ],
      },
      {
        heading: "Core Web Vitals as a Ranking Factor",
        paragraphs: [
          "Google has made it clear: page experience metrics matter for search rankings. Core Web Vitals — loading, interactivity and visual stability — are now a confirmed ranking factor. This means performance is not just a user experience concern, it is an SEO concern.",
          "Sites that invest in performance optimization are seeing measurable ranking improvements, making this a trend with direct business impact.",
        ],
      },
      {
        heading: "TypeScript as the Default",
        paragraphs: [
          "TypeScript has crossed the tipping point. Most new web projects start with TypeScript by default, and for good reason. Type safety catches bugs before they reach production, makes refactoring safer, and dramatically improves the developer experience with better autocomplete and documentation.",
          "If you are still starting new projects in plain JavaScript, 2025 is the year to make the switch.",
        ],
      },
    ],
  },
  {
    slug: "technology-for-business",
    title: "How Small Businesses Can Leverage Technology Like Enterprises",
    excerpt:
      "You do not need an enterprise budget to get enterprise-grade technology. Here are practical ways small businesses can compete.",
    category: "Business",
    date: "2024-09-22",
    readingTime: "6 min read",
    coverImage:
      "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200&h=630&fit=crop",
    author: authors.elena,
    content: [
      {
        paragraphs: [
          "There was a time when advanced technology was the exclusive domain of large enterprises with massive IT budgets. Custom software, cloud infrastructure, data analytics and automation were out of reach for small and medium businesses. That time is over.",
          "The democratization of technology means that small businesses today have access to the same tools and capabilities that were once reserved for Fortune 500 companies. The question is no longer whether you can afford it, but whether you are taking advantage of it.",
        ],
      },
      {
        heading: "Start with Automation",
        paragraphs: [
          "The quickest technology win for any small business is automation. Look at the repetitive tasks that consume your team hours every week — data entry, invoice generation, appointment reminders, report compilation. Each of these can be automated with relatively simple tools.",
          "You do not need a custom-built system to start. Tools like Zapier, Make and native integrations between popular SaaS products can connect your existing tools and eliminate manual work. Start with one workflow, measure the time saved, and expand from there.",
        ],
      },
      {
        heading: "Use Cloud Services, Not Servers",
        paragraphs: [
          "Cloud computing has eliminated the need for small businesses to buy and maintain servers. Instead of investing in hardware that depreciates, you can use cloud services that scale with your needs. This means you pay for exactly what you use, with no upfront capital expenditure.",
          "Cloud platforms like AWS and Google Cloud offer small business-friendly tiers that make it affordable to run websites, applications and databases with enterprise-grade reliability and security.",
        ],
      },
      {
        heading: "Make Data-Driven Decisions",
        paragraphs: [
          "Enterprise companies run on data. They track every metric, analyze every funnel, and make decisions based on evidence rather than intuition. Small businesses can do the same with tools that are either free or very affordable.",
          "Google Analytics for web traffic, CRM tools for sales pipeline, and simple dashboard tools for business metrics are all accessible. The key is to start tracking the metrics that matter to your business and review them regularly.",
        ],
      },
      {
        heading: "Invest in a Professional Web Presence",
        paragraphs: [
          "Your website is your digital storefront. For many customers, it is the first and most important touchpoint with your brand. A slow, outdated or broken website costs you customers before you even get a chance to talk to them.",
          "A modern, fast, mobile-friendly website is one of the highest-ROI technology investments a small business can make. It works for you 24/7, captures leads, and builds credibility in a way that social media alone cannot.",
        ],
      },
      {
        heading: "The Playing Field Is Level",
        paragraphs: [
          "Technology has leveled the playing field. A 10-person company can now have the same digital capabilities as a 1000-person enterprise. The difference is not budget — it is awareness and willingness to act. Small businesses that embrace technology are outpacing competitors who are still doing things the old way.",
          "You do not need to do everything at once. Pick one area, invest in it, see the results, and expand. The most important step is the first one.",
        ],
      },
    ],
  },
];

export const blogCategories = [
  "All",
  "Strategy",
  "Web",
  "Mobile",
  "Business",
] as const;

export const getPostBySlug = (slug: string): BlogPost | undefined =>
  blogPosts.find((p) => p.slug === slug);

export const getRelatedPosts = (slug: string, limit = 2): BlogPost[] =>
  blogPosts.filter((p) => p.slug !== slug).slice(0, limit);
