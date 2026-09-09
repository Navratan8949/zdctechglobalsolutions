export type ServiceSlug =
  | "website-development"
  | "mobile-app-development"
  | "software-development"
  | "ui-ux-design"
  | "ecommerce-solutions"
  | "digital-marketing"
  | "seo"
  | "cloud-services"
  | "it-consulting";

export interface ServiceFeature {
  title: string;
  description: string;
}

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface Service {
  slug: ServiceSlug;
  title: string;
  shortDescription: string;
  icon: string;
  category: string;
  heroHeadline: string;
  heroSubheadline: string;
  introduction: string;
  whatWeOffer: ServiceFeature[];
  keyFeatures: string[];
  technologies: string[];
  benefits: ServiceFeature[];
  whyChooseUs: string[];
  faqs: ServiceFaq[];
  relatedSlugs: ServiceSlug[];
}

export const services: Service[] = [
  {
    slug: "website-development",
    title: "Website Development",
    shortDescription:
      "High-performance, responsive websites built with modern frameworks and clean code architecture.",
    icon: "Globe",
    category: "Web",
    heroHeadline: "Websites that load fast, rank high and convert visitors",
    heroSubheadline:
      "From corporate sites to complex web platforms, we build scalable web experiences engineered for speed, SEO and growth.",
    introduction:
      "Your website is often the first impression customers have of your brand. We craft modern, responsive websites using industry-leading frameworks that deliver exceptional performance across every device. Every project is built with clean architecture, semantic markup and a focus on conversion.",
    whatWeOffer: [
      {
        title: "Corporate Websites",
        description:
          "Professional marketing sites that communicate your brand and generate leads.",
      },
      {
        title: "Web Applications",
        description:
          "Interactive, data-driven platforms with rich user experiences.",
      },
      {
        title: "Landing Pages",
        description:
          "High-converting campaign pages optimized for specific goals.",
      },
      {
        title: "Progressive Web Apps",
        description:
          "App-like web experiences with offline support and push notifications.",
      },
    ],
    keyFeatures: [
      "Fully responsive design",
      "Core Web Vitals optimization",
      "SEO-ready semantic markup",
      "Accessibility (WCAG) compliance",
      "CMS integration",
      "API integrations",
      "Multi-language support",
      "Analytics & tracking setup",
    ],
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Node.js",
      "GraphQL",
    ],
    benefits: [
      {
        title: "Faster Load Times",
        description:
          "Optimized assets and rendering for sub-second page loads.",
      },
      {
        title: "Higher Search Rankings",
        description: "Built-in SEO best practices help you rank from day one.",
      },
      {
        title: "Better Conversions",
        description:
          "Data-informed layouts and CTAs that turn visitors into customers.",
      },
      {
        title: "Future-Proof Code",
        description:
          "Modular architecture that grows with your business needs.",
      },
    ],
    whyChooseUs: [
      "Component-driven development for consistency and speed",
      "Strict performance budgets on every project",
      "Design-to-code handoff with zero quality loss",
      "Comprehensive testing before deployment",
    ],
    faqs: [
      {
        question: "How long does a website take to build?",
        answer:
          "A standard corporate website typically takes 4-6 weeks. Complex web applications can range from 8-16 weeks depending on scope and integrations.",
      },
      {
        question: "Do you provide ongoing maintenance?",
        answer:
          "Yes. We offer flexible maintenance plans that cover updates, security patches, backups and content changes after launch.",
      },
      {
        question: "Will my website work on mobile devices?",
        answer:
          "Absolutely. Every website we build is fully responsive and tested across a wide range of devices and screen sizes.",
      },
      {
        question: "Can you redesign an existing website?",
        answer:
          "Yes, we handle both new builds and redesigns. We audit your current site, preserve what works and modernize everything else.",
      },
    ],
    relatedSlugs: ["ui-ux-design", "seo", "ecommerce-solutions"],
  },
  {
    slug: "mobile-app-development",
    title: "Mobile App Development",
    shortDescription:
      "Native-quality iOS and Android apps built with React Native and Flutter for cross-platform reach.",
    icon: "Smartphone",
    category: "Mobile",
    heroHeadline: "Mobile apps your users will love to open every day",
    heroSubheadline:
      "We design and build cross-platform mobile applications that deliver native performance, beautiful interfaces and seamless offline experiences.",
    introduction:
      "Mobile is where your customers spend their time. We build cross-platform applications with React Native and Flutter that deliver native-level performance on both iOS and Android from a single codebase. From concept to app store, we handle the entire lifecycle.",
    whatWeOffer: [
      {
        title: "iOS Applications",
        description:
          "Native-quality iPhone and iPad apps with polished interfaces.",
      },
      {
        title: "Android Applications",
        description: "Apps optimized for the diverse Android device ecosystem.",
      },
      {
        title: "Cross-Platform Apps",
        description: "One codebase, two platforms — saving time and budget.",
      },
      {
        title: "App Store Deployment",
        description: "Full submission and approval handling for both stores.",
      },
    ],
    keyFeatures: [
      "Offline data synchronization",
      "Push notifications",
      "Biometric authentication",
      "In-app purchases",
      "Real-time messaging",
      "Geolocation services",
      "Social media integration",
      "Analytics integration",
    ],
    technologies: [
      "React Native",
      "Flutter",
      "TypeScript",
      "Firebase",
      "Redux",
      "Expo",
      "Dart",
    ],
    benefits: [
      {
        title: "Faster Time to Market",
        description:
          "Cross-platform development launches on both stores simultaneously.",
      },
      {
        title: "Lower Development Cost",
        description:
          "A single codebase reduces development and maintenance overhead.",
      },
      {
        title: "Native Performance",
        description: "Smooth 60fps animations and responsive interactions.",
      },
      {
        title: "Scalable Architecture",
        description:
          "Apps built to handle growing user bases without rewrites.",
      },
    ],
    whyChooseUs: [
      "Experienced in both React Native and Flutter ecosystems",
      "Rigorous device testing across screen sizes and OS versions",
      "App store compliance built into the development process",
      "Post-launch support and version management",
    ],
    faqs: [
      {
        question: "Do you build for both iOS and Android?",
        answer:
          "Yes. We use cross-platform frameworks so a single codebase runs natively on both iOS and Android, cutting cost and timeline.",
      },
      {
        question: "Can you update an existing mobile app?",
        answer:
          "We can audit your existing app, fix bugs, modernize the UI and add new features, or migrate it to a modern framework.",
      },
      {
        question: "Do you handle app store submission?",
        answer:
          "Yes, we manage the full submission process including store listings, screenshots and compliance review.",
      },
      {
        question: "What is the typical app development timeline?",
        answer:
          "A focused MVP takes 8-12 weeks. Feature-rich applications can range from 16-24 weeks depending on complexity.",
      },
    ],
    relatedSlugs: ["ui-ux-design", "software-development", "cloud-services"],
  },
  {
    slug: "software-development",
    title: "Software Development",
    shortDescription:
      "Custom software solutions engineered to automate operations and scale with your business.",
    icon: "Code2",
    category: "Software",
    heroHeadline: "Custom software built around your exact business needs",
    heroSubheadline:
      "From internal tools to enterprise platforms, we design, build and deploy reliable software that automates workflows and drives efficiency.",
    introduction:
      "Off-the-shelf software rarely fits perfectly. We build custom applications tailored to your exact workflows, integrations and scale requirements. Our engineering team follows rigorous architecture and testing practices to deliver software that is secure, maintainable and built to last.",
    whatWeOffer: [
      {
        title: "Enterprise Software",
        description:
          "Large-scale systems with role-based access and complex workflows.",
      },
      {
        title: "SaaS Platforms",
        description:
          "Multi-tenant subscription products with billing and analytics.",
      },
      {
        title: "Internal Tools",
        description: "Dashboards and admin panels that streamline operations.",
      },
      {
        title: "API Development",
        description:
          "Robust, documented REST and GraphQL APIs for integrations.",
      },
    ],
    keyFeatures: [
      "Role-based access control",
      "Audit logging",
      "Data encryption",
      "Third-party integrations",
      "Automated testing",
      "CI/CD pipelines",
      "Microservices architecture",
      "Real-time data processing",
    ],
    technologies: [
      "Node.js",
      "Express",
      "Python",
      "Laravel",
      "PHP",
      "PostgreSQL",
      "MongoDB",
      "Docker",
    ],
    benefits: [
      {
        title: "Tailored to Your Workflow",
        description:
          "Software that matches how your team actually works, not the other way around.",
      },
      {
        title: "Automated Operations",
        description:
          "Reduce manual work with intelligent automation and integrations.",
      },
      {
        title: "Enterprise-Grade Security",
        description:
          "Security best practices baked in from architecture to deployment.",
      },
      {
        title: "Built to Scale",
        description:
          "Architecture that handles growth without costly rewrites.",
      },
    ],
    whyChooseUs: [
      "Senior engineers on every project",
      "Clean, documented, maintainable code",
      "Comprehensive automated test coverage",
      "Agile delivery with regular demos",
    ],
    faqs: [
      {
        question: "Can you integrate with our existing systems?",
        answer:
          "Yes. We have extensive experience integrating with CRM, ERP, payment and third-party API systems. We assess compatibility during planning.",
      },
      {
        question: "Do you offer source code ownership?",
        answer:
          "Absolutely. You own 100% of the source code and all intellectual property upon project completion.",
      },
      {
        question: "How do you ensure code quality?",
        answer:
          "We follow strict code review, automated testing and CI/CD practices. Every release passes quality gates before deployment.",
      },
      {
        question: "Can you scale the software as we grow?",
        answer:
          "Our architectures are designed for scale. We build with modular, service-oriented patterns that accommodate growth.",
      },
    ],
    relatedSlugs: ["cloud-services", "it-consulting", "website-development"],
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX Design",
    shortDescription:
      "User-centered design that balances beautiful interfaces with intuitive, accessible experiences.",
    icon: "Palette",
    category: "UI/UX",
    heroHeadline: "Designs that feel intuitive and look remarkable",
    heroSubheadline:
      "We craft user experiences backed by research, prototyping and testing — interfaces that are beautiful, accessible and conversion-focused.",
    introduction:
      "Great design is invisible. It guides users effortlessly toward their goals. Our design process combines user research, wireframing, prototyping and usability testing to create interfaces that are not only visually striking but also genuinely intuitive and accessible to everyone.",
    whatWeOffer: [
      {
        title: "User Research",
        description:
          "Interviews, surveys and analytics to understand your users.",
      },
      {
        title: "Wireframing & Prototyping",
        description:
          "Interactive prototypes to validate flows before development.",
      },
      {
        title: "Interface Design",
        description: "Pixel-perfect, brand-aligned visual designs in Figma.",
      },
      {
        title: "Design Systems",
        description:
          "Reusable component libraries for consistent product evolution.",
      },
    ],
    keyFeatures: [
      "Responsive design",
      "Accessibility (WCAG 2.1)",
      "Interactive prototypes",
      "User flow mapping",
      "A/B testing support",
      "Brand consistency",
      "Micro-interactions",
      "Dark mode design",
    ],
    technologies: [
      "Figma",
      "Adobe XD",
      "Framer",
      "Sketch",
      "Principle",
      "Lottie",
    ],
    benefits: [
      {
        title: "Higher User Satisfaction",
        description:
          "Intuitive flows reduce friction and increase user delight.",
      },
      {
        title: "Increased Conversions",
        description:
          "Data-informed design decisions that drive measurable results.",
      },
      {
        title: "Faster Development",
        description:
          "Clear design handoff reduces back-and-forth with engineers.",
      },
      {
        title: "Inclusive Experiences",
        description:
          "Accessibility compliance opens your product to more users.",
      },
    ],
    whyChooseUs: [
      "Research-driven, not assumption-driven design",
      "Design systems that scale with your product",
      "Close collaboration between design and engineering",
      "Usability testing with real users",
    ],
    faqs: [
      {
        question: "Do you design for both web and mobile?",
        answer:
          "Yes. We design responsive web interfaces and native mobile interfaces, ensuring consistent experiences across all platforms.",
      },
      {
        question: "Can you work with our existing brand guidelines?",
        answer:
          "Absolutely. We design within your brand system or help you evolve it. We respect existing guidelines while pushing the quality forward.",
      },
      {
        question: "What tools do you use?",
        answer:
          "We primarily use Figma for design and prototyping. For complex animations we use Framer and Lottie.",
      },
      {
        question: "Do you offer design-only engagements?",
        answer:
          "Yes. We offer standalone design services as well as design-to-development packages where we build what we design.",
      },
    ],
    relatedSlugs: [
      "website-development",
      "mobile-app-development",
      "ecommerce-solutions",
    ],
  },
  {
    slug: "ecommerce-solutions",
    title: "E-commerce Solutions",
    shortDescription:
      "Conversion-optimized online stores with secure payments, inventory and seamless checkout.",
    icon: "ShoppingCart",
    category: "E-commerce",
    heroHeadline: "Online stores that turn browsers into buyers",
    heroSubheadline:
      "We build fast, secure and scalable e-commerce platforms with smooth checkout, smart product search and integrated payment gateways.",
    introduction:
      "Selling online requires more than a shopping cart. We build complete e-commerce ecosystems — from storefront design and payment integration to inventory management and order fulfillment. Every store is optimized for speed, search and conversion from the ground up.",
    whatWeOffer: [
      {
        title: "Custom Storefronts",
        description:
          "Bespoke online stores tailored to your brand and catalog.",
      },
      {
        title: "Platform Migration",
        description: "Move from legacy platforms to modern, faster solutions.",
      },
      {
        title: "Payment Integration",
        description:
          "Secure gateways including Stripe, PayPal and local methods.",
      },
      {
        title: "Inventory Management",
        description: "Real-time stock tracking and automated reorder alerts.",
      },
    ],
    keyFeatures: [
      "Secure checkout flow",
      "Multi-currency support",
      "Product search & filtering",
      "Wishlist & cart save",
      "Order tracking",
      "Discount & coupon engine",
      "Email automation",
      "Analytics dashboard",
    ],
    technologies: [
      "Next.js",
      "Shopify",
      "Stripe",
      "Node.js",
      "PostgreSQL",
      "MongoDB",
      "GraphQL",
    ],
    benefits: [
      {
        title: "Higher Conversion Rates",
        description:
          "Optimized checkout and product pages that reduce cart abandonment.",
      },
      {
        title: "Faster Store Performance",
        description:
          "Sub-second page loads keep shoppers engaged and browsing.",
      },
      {
        title: "Secure Transactions",
        description:
          "PCI-compliant payment processing protects every transaction.",
      },
      {
        title: "Scalable Catalog",
        description:
          "Handle thousands of products without performance degradation.",
      },
    ],
    whyChooseUs: [
      "Deep experience with both custom and platform-based commerce",
      "Conversion-focused design backed by e-commerce analytics",
      "Integration with shipping, ERP and accounting systems",
      "Ongoing CRO optimization after launch",
    ],
    faqs: [
      {
        question: "Which e-commerce platforms do you work with?",
        answer:
          "We build custom stores with Next.js and also work with Shopify, WooCommerce and Magento. We recommend the best fit for your needs.",
      },
      {
        question: "Can you migrate our existing store?",
        answer:
          "Yes. We handle secure migrations of products, customers, orders and content with zero data loss and minimal downtime.",
      },
      {
        question: "Do you integrate payment gateways?",
        answer:
          "We integrate Stripe, PayPal, Razorpay and other regional gateways. All transactions are encrypted and PCI-compliant.",
      },
      {
        question: "Can you handle large product catalogs?",
        answer:
          "Our architectures support catalogs with tens of thousands of products with fast search, filtering and pagination.",
      },
    ],
    relatedSlugs: ["website-development", "digital-marketing", "seo"],
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    shortDescription:
      "Data-driven marketing strategies that grow traffic, leads and revenue across channels.",
    icon: "Megaphone",
    category: "Marketing",
    heroHeadline: "Marketing that drives measurable business growth",
    heroSubheadline:
      "From paid campaigns to content strategy and social media, we create integrated marketing engines that attract, engage and convert.",
    introduction:
      "Traffic without revenue is just numbers. We build integrated digital marketing strategies that connect every channel — search, social, email and paid — into a cohesive funnel. Our approach is data-driven, transparent and focused on ROI rather than vanity metrics.",
    whatWeOffer: [
      {
        title: "Search Engine Marketing",
        description: "Google Ads and Bing campaigns managed for maximum ROAS.",
      },
      {
        title: "Social Media Marketing",
        description:
          "Content and community management across all major platforms.",
      },
      {
        title: "Content Marketing",
        description:
          "SEO-driven content that builds authority and organic traffic.",
      },
      {
        title: "Performance Marketing",
        description:
          "Google & Meta advertising campaigns focused on leads, conversions, and measurable growth.",
      },
      {
        title: "Meta Ads Marketing",
        description:
          "Targeted Facebook and Instagram campaigns designed to generate leads and grow your business.",
      },
    ],
    keyFeatures: [
      "Campaign strategy",
      "Audience segmentation",
      "A/B testing",
      "Conversion tracking",
      "Remarketing campaigns",
      "Landing page optimization",
      "Marketing automation",
      "Monthly reporting",
    ],
    technologies: [
      "Google Ads",
      "Meta Ads",
      "Google Analytics",
      "Mailchimp",
      "HubSpot",
      "SEMrush",
    ],
    benefits: [
      {
        title: "Qualified Lead Generation",
        description:
          "Targeted campaigns that reach decision-makers, not just clicks.",
      },
      {
        title: "Transparent ROI",
        description:
          "Every dollar tracked from spend to revenue with clear reporting.",
      },
      {
        title: "Brand Authority",
        description:
          "Consistent content and social presence that builds trust.",
      },
      {
        title: "Scalable Campaigns",
        description: "Strategies that expand as your budget and goals grow.",
      },
    ],
    whyChooseUs: [
      "ROI-focused, not vanity-metric focused",
      "Full-funnel strategy from awareness to conversion",
      "Transparent monthly reporting with clear KPIs",
      "Cross-channel expertise under one roof",
    ],
    faqs: [
      {
        question: "What is your minimum marketing budget?",
        answer:
          "We work with a range of budgets. For paid campaigns, we typically recommend a minimum monthly ad spend of $1,000 to generate meaningful data.",
      },
      {
        question: "How soon will I see results?",
        answer:
          "Paid campaigns can show results within weeks. Organic strategies like SEO and content marketing typically take 3-6 months for significant impact.",
      },
      {
        question: "Do you offer month-to-month contracts?",
        answer:
          "Yes. We offer flexible monthly engagements with no long-term lock-in. We earn your business through results every month.",
      },
      {
        question: "Which platforms do you advertise on?",
        answer:
          "Google Ads, Meta (Facebook/Instagram), LinkedIn, YouTube and TikTok, depending on where your audience is most active.",
      },
    ],
    relatedSlugs: ["seo", "ecommerce-solutions", "website-development"],
  },
  {
    slug: "seo",
    title: "SEO Optimization",
    shortDescription:
      "Technical and content SEO that improves rankings, organic traffic and search visibility.",
    icon: "Search",
    category: "Marketing",
    heroHeadline: "Be found by customers already searching for you",
    heroSubheadline:
      "We combine technical SEO, content strategy and authority building to move your site up the rankings and drive consistent organic traffic.",
    introduction:
      "Search is where buying decisions begin. We take a comprehensive approach to SEO — fixing technical issues, optimizing content, building authority and improving user experience. The result is sustainable organic growth that compounds over time rather than quick-fix tactics that fade.",
    whatWeOffer: [
      {
        title: "Technical SEO Audits",
        description:
          "Deep audits covering crawlability, speed and site architecture.",
      },
      {
        title: "Keyword Research",
        description: "Data-driven keyword mapping aligned to search intent.",
      },
      {
        title: "On-Page Optimization",
        description: "Content, meta tags and structure optimized for rankings.",
      },
      {
        title: "Link Building",
        description: "White-hat authority building through genuine outreach.",
      },
    ],
    keyFeatures: [
      "Core Web Vitals optimization",
      "Schema markup",
      "Site speed optimization",
      "Content gap analysis",
      "Competitor analysis",
      "Local SEO",
      "Rank tracking",
      "Monthly SEO reports",
    ],
    technologies: [
      "Google Search Console",
      "SEMrush",
      "Ahrefs",
      "Screaming Frog",
      "Google Analytics",
    ],
    benefits: [
      {
        title: "Sustainable Organic Traffic",
        description:
          "Rankings that compound over time without ongoing ad spend.",
      },
      {
        title: "Higher Quality Leads",
        description:
          "Search intent-driven traffic converts better than cold ads.",
      },
      {
        title: "Brand Visibility",
        description:
          "Appearing on page one builds instant credibility and trust.",
      },
      {
        title: "Better User Experience",
        description: "Technical SEO improvements also improve site usability.",
      },
    ],
    whyChooseUs: [
      "White-hat strategies that comply with Google guidelines",
      "Technical depth — we fix the code, not just the content",
      "Transparent ranking and traffic reporting",
      "Content strategy that targets real search intent",
    ],
    faqs: [
      {
        question: "How long does SEO take to show results?",
        answer:
          "Most sites see meaningful improvement in 3-6 months. Competitive industries may take 6-12 months for page-one rankings on high-value keywords.",
      },
      {
        question: "Do you guarantee first-page rankings?",
        answer:
          "No reputable agency can guarantee specific rankings. We guarantee transparent work, best practices and measurable progress every month.",
      },
      {
        question: "Can you do local SEO for my business?",
        answer:
          "Yes. We optimize Google Business Profiles, local citations and location-based keywords to help you rank in your service area.",
      },
      {
        question: "Do you write content as part of SEO?",
        answer:
          "Yes. We offer content creation aligned with keyword research and search intent, or we can optimize your existing content.",
      },
    ],
    relatedSlugs: [
      "digital-marketing",
      "website-development",
      "ecommerce-solutions",
    ],
  },
  {
    slug: "cloud-services",
    title: "Cloud Services",
    shortDescription:
      "Cloud architecture, migration and DevOps for scalable, reliable and cost-efficient infrastructure.",
    icon: "Cloud",
    category: "Cloud",
    heroHeadline: "Cloud infrastructure that scales as you grow",
    heroSubheadline:
      "From architecture design to migration and DevOps automation, we build cloud environments that are secure, scalable and cost-efficient.",
    introduction:
      "Modern software runs on the cloud. We help you architect, migrate and manage cloud infrastructure on AWS and Google Cloud — with automation, monitoring and security built in. Whether you are moving from on-premise or optimizing an existing cloud setup, we make your infrastructure a competitive advantage.",
    whatWeOffer: [
      {
        title: "Cloud Architecture",
        description:
          "Scalable, resilient architectures designed for your workloads.",
      },
      {
        title: "Cloud Migration",
        description:
          "Seamless migration from on-premise to cloud with zero data loss.",
      },
      {
        title: "DevOps Automation",
        description:
          "CI/CD pipelines, infrastructure as code and automated deployments.",
      },
      {
        title: "Cloud Cost Optimization",
        description:
          "Reduce spend without sacrificing performance or reliability.",
      },
    ],
    keyFeatures: [
      "Auto-scaling",
      "Load balancing",
      "Infrastructure as code",
      "Container orchestration",
      "Disaster recovery",
      "Cloud monitoring",
      "Security hardening",
      "Multi-region deployment",
    ],
    technologies: [
      "AWS",
      "Google Cloud",
      "Docker",
      "Kubernetes",
      "Terraform",
      "GitHub Actions",
      "CloudWatch",
    ],
    benefits: [
      {
        title: "Pay for What You Use",
        description:
          "Auto-scaling and cost optimization eliminate over-provisioning.",
      },
      {
        title: "High Availability",
        description:
          "Multi-zone architectures keep your app online during outages.",
      },
      {
        title: "Faster Deployments",
        description:
          "Automated CI/CD pipelines ship updates safely in minutes.",
      },
      {
        title: "Enterprise Security",
        description:
          "Encryption, firewalls and compliance built into every layer.",
      },
    ],
    whyChooseUs: [
      "Certified cloud architects on AWS and GCP",
      "Infrastructure as code for reproducible environments",
      "Cost monitoring and optimization from day one",
      "24/7 monitoring with proactive alerting",
    ],
    faqs: [
      {
        question: "Which cloud providers do you support?",
        answer:
          "We primarily work with AWS and Google Cloud Platform. We can also support multi-cloud and hybrid setups depending on your needs.",
      },
      {
        question: "Can you reduce our cloud costs?",
        answer:
          "Yes. We conduct cost audits and implement right-sizing, auto-scaling and reserved capacity strategies that typically reduce spend by 20-40%.",
      },
      {
        question: "Do you offer ongoing cloud management?",
        answer:
          "Yes. We provide managed cloud services including monitoring, security patching, backups and incident response.",
      },
      {
        question: "Can you set up CI/CD for our team?",
        answer:
          "Absolutely. We build automated pipelines with GitHub Actions, Terraform and container orchestration for reliable, frequent deployments.",
      },
    ],
    relatedSlugs: [
      "software-development",
      "it-consulting",
      "mobile-app-development",
    ],
  },
  {
    slug: "it-consulting",
    title: "IT Consulting",
    shortDescription:
      "Strategic technology consulting to align your IT investments with business outcomes.",
    icon: "Lightbulb",
    category: "Consulting",
    heroHeadline: "Technology strategy aligned with your business goals",
    heroSubheadline:
      "We help you make confident technology decisions — from architecture and stack selection to digital transformation roadmaps and vendor evaluation.",
    introduction:
      "Technology should serve your business strategy, not the other way around. Our consulting engagements help you navigate complex technology decisions with clarity. Whether you are planning a digital transformation, choosing a tech stack or evaluating vendors, we bring deep experience and an objective perspective.",
    whatWeOffer: [
      {
        title: "Digital Transformation",
        description: "Roadmaps for modernizing legacy systems and processes.",
      },
      {
        title: "Technology Strategy",
        description: "Align your tech investments with business objectives.",
      },
      {
        title: "Architecture Review",
        description:
          "Audit your current systems for scalability, security and cost.",
      },
      {
        title: "Vendor Evaluation",
        description:
          "Objective assessment of tools and platforms for your needs.",
      },
    ],
    keyFeatures: [
      "Technology roadmaps",
      "Stack recommendations",
      "Risk assessment",
      "Cost-benefit analysis",
      "Team capability assessment",
      "Process optimization",
      "Compliance guidance",
      "Implementation planning",
    ],
    technologies: [
      "AWS",
      "Google Cloud",
      "Node.js",
      "React",
      "PostgreSQL",
      "Docker",
      "Kubernetes",
    ],
    benefits: [
      {
        title: "Confident Decisions",
        description:
          "Make technology choices backed by deep experience, not guesswork.",
      },
      {
        title: "Reduced Risk",
        description:
          "Identify pitfalls before you invest in the wrong solution.",
      },
      {
        title: "Optimized Spend",
        description: "Avoid over-engineering and invest where it matters most.",
      },
      {
        title: "Faster Execution",
        description:
          "Clear roadmaps help your team execute with direction and purpose.",
      },
    ],
    whyChooseUs: [
      "Objective, vendor-agnostic recommendations",
      "Experience across industries and scales",
      "Practical roadmaps, not theoretical reports",
      "Hands-on implementation support available",
    ],
    faqs: [
      {
        question: "How does a consulting engagement work?",
        answer:
          "We start with a discovery session, conduct analysis over 1-2 weeks, and deliver actionable recommendations with a clear implementation roadmap.",
      },
      {
        question: "Are you vendor-agnostic?",
        answer:
          "Yes. We recommend the best tools for your specific needs, not the ones that pay us commissions. Our recommendations are objective.",
      },
      {
        question: "Can you help implement your recommendations?",
        answer:
          "Absolutely. We can transition from consulting to implementation, or work alongside your internal team to execute the plan.",
      },
      {
        question: "Do you work with startups or only enterprises?",
        answer:
          "We work with both. Our consulting is tailored to your stage — from MVP planning for startups to transformation strategies for enterprises.",
      },
    ],
    relatedSlugs: [
      "software-development",
      "cloud-services",
      "website-development",
    ],
  },
];

export const getServiceBySlug = (slug: string): Service | undefined =>
  services.find((s) => s.slug === slug);
