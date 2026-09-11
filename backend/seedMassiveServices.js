require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('./src/models/Service');

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/zdc_tech";

const exactServicesMapping = [
  { title: "SEO Services", slug: "seo", category: "Online Marketing" },
  { title: "Social Media Marketing", slug: "social-media", category: "Online Marketing" },
  { title: "Google Ads", slug: "google-ads", category: "Online Marketing" },
  { title: "Meta Ads", slug: "meta-ads", category: "Online Marketing" },
  { title: "Google My Business Profile", slug: "gmb", category: "Online Marketing" },
  { title: "Digital Marketing", slug: "digital-marketing", category: "Online Marketing" },

  { title: "Web Design & Development", slug: "web-design", category: "Web Design & Development" },
  { title: "CRM Software Development", slug: "crm-development", category: "Web Design & Development" },
  { title: "Software Development", slug: "software", category: "Web Design & Development" },
  { title: "Educational Web Portal", slug: "educational-portal", category: "Web Design & Development" },
  { title: "Restaurant Web Portal", slug: "restaurant-portal", category: "Web Design & Development" },
  { title: "Health Care Portal", slug: "healthcare-portal", category: "Web Design & Development" },
  { title: "Travel Portal Development", slug: "travel-portal", category: "Web Design & Development" },
  { title: "Real Estate Portal", slug: "real-estate-portal", category: "Web Design & Development" },
  { title: "E-Commerce Website", slug: "ecommerce", category: "Web Design & Development" },

  { title: "Mobile App Development", slug: "mobile-app", category: "Mobile Application" },
  { title: "Windows App Development", slug: "windows-app", category: "Mobile Application" },
  { title: "Xamarine App Development", slug: "xamarin", category: "Mobile Application" },
  { title: "Native App Development", slug: "native-app", category: "Mobile Application" },
  { title: "Hybrid App Development", slug: "hybrid-app", category: "Mobile Application" },

  { title: "IT Consulting", slug: "it-consulting", category: "IT Services" },
  { title: "Data Analytics & BI", slug: "data-analytics", category: "IT Services" },
  { title: "AI & Machine Learning", slug: "ai-ml", category: "IT Services" },
  { title: "IT Support & Managed Service", slug: "it-support", category: "IT Services" },
  { title: "Logo Design", slug: "logo-design", category: "IT Services" },
  { title: "UI/UX Design", slug: "ui-ux", category: "IT Services" },
  { title: "Brochure Design", slug: "brochure-design", category: "IT Services" },

  { title: "HR and Payroll Software", slug: "hr-payroll", category: "Software" },
  { title: "Jewellery Software", slug: "jewellery-software", category: "Software" },
  { title: "CRM Software", slug: "crm-software", category: "Software" },
  { title: "Real Estate Software", slug: "real-estate-software", category: "Software" },
  { title: "Inventory Management", slug: "inventory", category: "Software" },
  { title: "Hospital Management", slug: "hospital-management", category: "Software" },
  { title: "School Management", slug: "school-management", category: "Software" },

  { title: "Software Testing", slug: "software-testing", category: "Testing" },
  { title: "Security Testing", slug: "security-testing", category: "Testing" },
  { title: "Performance Testing", slug: "performance-testing", category: "Testing" }
];

const categoryData = {
  "Online Marketing": {
    introBase: "In the fast-paced and hyper-competitive digital era, establishing a dominant online presence is no longer optional—it's a critical business necessity. Our {TITLE} solutions are meticulously engineered to cut through the digital noise, captivate your exact target audience, and transform casual browsers into loyal, high-paying customers. We go far beyond surface-level metrics; our approach is deeply analytical, data-driven, and relentlessly focused on generating tangible Return on Investment (ROI). By leveraging advanced consumer psychology, cutting-edge algorithms, and real-time data analytics, we ensure that every marketing dollar you spend works tirelessly to expand your brand's reach. Whether you are looking to dominate local search results, disrupt an international market, or build a viral social community, our bespoke {TITLE} strategies provide the aggressive momentum your business needs to scale exponentially.",
    offers: [
      { t: "Comprehensive Market Analysis", d: "We conduct deep-dive research into your industry, identifying lucrative gaps left by your competitors and pinpointing exactly where your audience spends their time and money online." },
      { t: "Data-Driven Campaign Strategy", d: "We don't rely on guesswork. Every campaign is built on solid data, utilizing predictive analytics to forecast trends and structure campaigns that guarantee maximum conversion rates." },
      { t: "Advanced Audience Targeting", d: "Utilizing hyper-granular targeting parameters, we ensure your message reaches only the most qualified prospects, drastically reducing wasted ad spend and increasing lead quality." },
      { t: "Conversion Rate Optimization (CRO)", d: "Driving traffic is only half the battle. We rigorously A/B test landing pages, ad copies, and user flows to ensure the highest possible percentage of visitors convert." },
      { t: "Real-Time Performance Tracking", d: "Get complete transparency with our live dashboards. We monitor campaigns 24/7, making micro-adjustments in real-time to capitalize on emerging opportunities." },
      { t: "Omnichannel Brand Consistency", d: "We ensure your brand's voice, aesthetic, and core messaging remain powerful and consistent across all digital touchpoints." }
    ],
    features: [
      "Predictive Analytics & Forecasting", "Hyper-Local & Global Targeting", "Automated Bid Management", 
      "Dynamic Retargeting Funnels", "Competitor Keyword Interception", "AI-Powered Copywriting", 
      "Behavioral Audience Segmentation", "Multi-Touch Attribution Modeling", "Fraud Click Prevention", "Custom Lookalike Audiences"
    ],
    tech: ["Google Analytics 4", "SEMrush", "Ahrefs", "HubSpot", "Meta Business Manager", "Tableau", "Hotjar", "Google Tag Manager", "Salesforce Marketing Cloud", "SpyFu"],
    faqs: [
      { q: "How long until we see a measurable increase in ROI with {TITLE}?", a: "While paid campaigns can generate leads within 24-48 hours, organic strategies typically show significant compounding growth between month 3 and 6. Our focus is on sustainable, long-term profitability." },
      { q: "How do you ensure our marketing budget isn't wasted on bad leads?", a: "We employ rigorous negative keyword lists, precise demographic exclusions, and strict behavioral filters to ensure your budget is spent exclusively on high-intent, qualified prospects." },
      { q: "Can you integrate with our existing sales CRM?", a: "Absolutely. We seamlessly connect our marketing data streams directly into Salesforce, HubSpot, Zoho, or any custom CRM, ensuring your sales team gets real-time lead notifications." },
      { q: "Do you provide white-label reporting for agencies?", a: "Yes, we offer fully branded, automated reporting dashboards that you can present directly to your stakeholders or clients with absolute confidence." }
    ]
  },
  "Web Design & Development": {
    introBase: "Your website is the digital headquarters of your business, and in today's demanding market, a slow or visually outdated platform will cost you customers instantly. Our {TITLE} services represent the pinnacle of modern web engineering. We don't just build websites; we architect highly scalable, blazing-fast, and secure digital ecosystems designed to handle massive traffic while delivering a flawless, app-like user experience. Utilizing the latest frameworks, serverless architectures, and advanced state-management, our platforms are engineered to perform flawlessly across every device and browser on the planet. From complex, data-heavy enterprise portals to high-converting eCommerce storefronts, our {TITLE} solutions bridge the gap between stunning aesthetic design and ruthless backend efficiency, ensuring your digital presence is not just a brochure, but a powerful, 24/7 revenue-generating engine.",
    offers: [
      { t: "Custom Enterprise Architecture", d: "We design robust backend structures capable of handling millions of concurrent users, integrating seamlessly with your legacy systems and third-party APIs." },
      { t: "Pixel-Perfect UI/UX Engineering", d: "Our design team creates immersive, intuitive interfaces based on extensive user behavior analysis, ensuring absolute ease of navigation and maximum user retention." },
      { t: "High-Performance Optimization", d: "We engineer for speed. Through advanced caching, code splitting, and CDN integration, we guarantee sub-second load times that keep bounce rates practically nonexistent." },
      { t: "Bank-Grade Security Implementation", d: "Security is built-in from line one. We implement advanced encryption, CSRF/XSS protection, and strict access controls to keep your data impregnable." },
      { t: "Scalable Cloud Hosting Solutions", d: "We deploy on cutting-edge cloud infrastructure, utilizing auto-scaling groups and global load balancers to ensure 99.99% uptime regardless of traffic spikes." },
      { t: "Continuous Integration/Deployment (CI/CD)", d: "Our agile deployment pipelines allow for rapid, zero-downtime updates, ensuring your platform is always running the latest features seamlessly." }
    ],
    features: [
      "Server-Side Rendering (SSR)", "Progressive Web App (PWA) Capabilities", "Headless CMS Integration", 
      "Microservices Architecture", "Real-Time WebSocket Communication", "Automated Database Backups", 
      "Advanced Search & Filtering Engine", "WCAG Accessibility Compliance", "Custom API Development", "Multi-Language/Currency Support"
    ],
    tech: ["Next.js", "React", "Node.js", "TypeScript", "PostgreSQL", "MongoDB", "AWS/GCP/Azure", "Docker", "Kubernetes", "GraphQL", "Redis", "Tailwind CSS"],
    faqs: [
      { q: "Can this {TITLE} handle heavy concurrent user traffic?", a: "Yes. By utilizing microservices, load balancing, and scalable cloud infrastructure like AWS or GCP, your platform will automatically scale resources to handle infinite traffic surges without crashing." },
      { q: "Is the platform easily updatable by our non-technical staff?", a: "Absolutely. We integrate powerful, user-friendly Headless CMS solutions that allow your marketing and admin teams to update content, products, and media instantly without writing a single line of code." },
      { q: "Do you own the code once the project is finished?", a: "100%. Upon final delivery and payment, full intellectual property rights and source code repositories are transferred entirely to your organization." },
      { q: "How do you ensure the platform remains secure over time?", a: "We provide ongoing maintenance contracts that include continuous dependency updates, regular security penetration testing, and 24/7 threat monitoring." }
    ]
  },
  "Mobile Application": {
    introBase: "The future of consumer interaction is firmly in the palm of their hands. Our {TITLE} services deliver unparalleled mobile experiences that captivate users from the first tap. We engineer powerful, feature-rich mobile applications that boast the performance of native code with the flexibility of modern cross-platform frameworks. Our development philosophy centers on creating frictionless, immersive user journeys that drive extraordinary engagement, retention, and monetization. Whether you require a secure financial application, a real-time tracking logistics tool, or a massive multiplayer social network, our {TITLE} experts utilize advanced device hardware integration, offline-first architectures, and machine-learning capabilities to build apps that consistently dominate App Store charts and become indispensable to your users' daily lives.",
    offers: [
      { t: "Native & Cross-Platform Development", d: "We utilize Swift, Kotlin, and React Native to build apps that perform flawlessly across iOS and Android, maximizing your market reach." },
      { t: "Advanced Hardware Integration", d: "We seamlessly connect your app with device hardware including GPS, Biometrics, Camera AR, Bluetooth, and IoT devices for immersive functionality." },
      { t: "Offline-First Architecture", d: "Our apps are designed to work seamlessly even in low or zero connectivity environments, syncing data intelligently in the background once reconnected." },
      { t: "Real-Time Data Synchronization", d: "Utilizing WebSockets and real-time databases, we ensure your users see live updates instantly without ever needing to pull-to-refresh." },
      { t: "App Store Optimization (ASO)", d: "We don't just build the app; we optimize its store listing with targeted keywords, stunning screenshots, and compelling descriptions to maximize organic downloads." },
      { t: "Enterprise Mobility Management", d: "For internal company apps, we integrate robust MDM (Mobile Device Management) protocols to ensure corporate data remains strictly secure and controlled." }
    ],
    features: [
      "Biometric Authentication (FaceID/TouchID)", "Push Notification Engine", "In-App Purchases & Subscriptions", 
      "Geofencing & Location Tracking", "Augmented Reality (AR) Modules", "End-to-End Encryption", 
      "Deep Linking & Universal Links", "Dark Mode Support", "Machine Learning Core Integration", "Automated Crash Reporting"
    ],
    tech: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase", "Redux", "SQLite/Realm", "Stripe API", "Google Maps API", "Apple ARKit/CoreML"],
    faqs: [
      { q: "Will the app look identical on both iOS and Android?", a: "While we maintain brand consistency, we strictly adhere to Apple's Human Interface Guidelines and Google's Material Design to ensure the app feels completely natural to users on both platforms." },
      { q: "Can you integrate the mobile app with our existing legacy backend?", a: "Yes. We build custom API middleware that securely connects your new mobile application to even the oldest legacy databases and ERP systems." },
      { q: "How do you handle the Apple App Store and Google Play approval process?", a: "We manage the entire submission lifecycle. From adhering strictly to review guidelines, managing certificates, and answering reviewer questions, we guarantee successful store publication." },
      { q: "What happens when Apple or Google release new OS updates?", a: "Our maintenance packages include proactive OS compatibility updates, ensuring your app runs perfectly on day one of any new iOS or Android release." }
    ]
  },
  "Software": {
    introBase: "Inefficient manual processes and fragmented data systems are the silent killers of enterprise growth. Our {TITLE} solutions are meticulously engineered to centralize your operations, automate complex workflows, and provide unprecedented visibility into every facet of your organization. We build enterprise-grade software that acts as the impenetrable digital backbone of your business. By replacing error-prone manual tasks with intelligent automation, our {TITLE} dramatically reduces operational overhead, eliminates human error, and frees your workforce to focus on high-value strategic initiatives. Built on highly secure, scalable architectures, our software seamlessly integrates with your existing tools, providing real-time data analytics and unassailable security protocols that empower executives to make rapid, data-backed decisions with absolute confidence.",
    offers: [
      { t: "Workflow Automation Engineering", d: "We map out your most complex, time-consuming business processes and engineer custom software algorithms to execute them automatically and flawlessly." },
      { t: "Legacy System Modernization", d: "We safely migrate your critical business data from outdated, sluggish legacy systems into lightning-fast, modern cloud-based software architectures." },
      { t: "Custom API & Third-Party Integration", d: "We ensure your new software speaks fluently with every other tool your business uses, creating a unified, synchronized digital ecosystem." },
      { t: "Role-Based Access Control (RBAC)", d: "We implement highly granular security matrices, ensuring employees only have access to the exact data and features necessary for their specific roles." },
      { t: "Real-Time Business Intelligence", d: "Our software includes powerful, customizable reporting dashboards that turn raw operational data into actionable, visual insights for stakeholders." },
      { t: "Scalable Multi-Tenant Architecture", d: "For SaaS providers, we build software capable of securely managing thousands of distinct client accounts (tenants) from a single, robust codebase." }
    ],
    features: [
      "End-to-End Workflow Automation", "Granular Audit Trails & Logging", "Customizable BI Dashboards", 
      "Two-Factor Authentication (2FA)", "Automated Regulatory Compliance", "Data Export/Import Utilities", 
      "White-Label Customization", "Offline Sync Capabilities", "Predictive System Alerts", "Multi-Region Cloud Redundancy"
    ],
    tech: ["Node.js", "Python/Django", "C# / .NET Core", "React", "PostgreSQL", "AWS Elastic Beanstalk", "ElasticSearch", "RabbitMQ", "Redis", "Docker"],
    faqs: [
      { q: "Will this {TITLE} integrate seamlessly with our current accounting software?", a: "Yes. We build custom API connectors for Tally, QuickBooks, Xero, SAP, and any other financial software to ensure total data synchronization without double entry." },
      { q: "How secure is the data stored within this software?", a: "We utilize military-grade AES-256 encryption for data at rest and TLS 1.3 for data in transit, combined with regular automated vulnerability scanning." },
      { q: "Can the software scale if our business triples in size next year?", a: "Absolutely. Our cloud-native architectures are designed specifically for hyper-growth, automatically scaling server resources to handle exponential increases in users and data." },
      { q: "How long does it take to train our staff to use the new system?", a: "Because we prioritize intuitive UX/UI design, the learning curve is exceptionally short. We also provide comprehensive video tutorials, documentation, and live training sessions." }
    ]
  },
  "IT Services": {
    introBase: "In an era defined by rapid technological disruption, relying on outdated IT infrastructure is a monumental risk. Our {TITLE} are designed to transform your technology stack from a cost center into a strategic competitive advantage. We provide elite-level consulting, robust technical support, and visionary digital transformation strategies that align perfectly with your aggressive business goals. Our seasoned architects and consultants dive deep into your organizational DNA, identifying massive efficiency bottlenecks and security vulnerabilities. Through our bespoke {TITLE}, we design and implement future-proof technology roadmaps, harness the power of artificial intelligence and big data, and provide unbreakable IT support. We ensure that your business operates with maximum agility, zero downtime, and absolute security in an increasingly complex digital world.",
    offers: [
      { t: "Strategic IT Roadmapping", d: "We develop comprehensive, multi-year technology strategies that align your IT infrastructure directly with your long-term revenue and growth targets." },
      { t: "Enterprise Cloud Migration", d: "We execute flawless, zero-downtime migrations of your on-premise servers and databases to highly secure, scalable cloud environments like AWS or Azure." },
      { t: "Cybersecurity & Risk Management", d: "We conduct exhaustive penetration testing and security audits, fortifying your networks against ransomware, phishing, and sophisticated cyber-attacks." },
      { t: "Disaster Recovery & Business Continuity", d: "We engineer resilient backup systems and recovery protocols that guarantee your business can resume operations within minutes of a catastrophic event." },
      { t: "Big Data & Predictive Analytics", d: "We construct advanced data pipelines and machine learning models that extract hidden, highly profitable insights from your massive datasets." },
      { t: "24/7 Managed IT Support", d: "Our elite network operations center monitors your systems around the clock, proactively resolving technical issues before your staff even notices them." }
    ],
    features: [
      "Proactive Network Monitoring", "Zero-Trust Security Frameworks", "Automated Patch Management", 
      "AI-Driven Threat Detection", "Scalable Cloud Architecture", "ITIL Compliant Service Desk", 
      "Regulatory Compliance (HIPAA/GDPR)", "Virtual CIO (vCIO) Consulting", "Endpoint Protection", "Automated Data Archiving"
    ],
    tech: ["AWS / Azure / GCP", "Cisco Meraki", "Splunk", "CrowdStrike", "VMware", "Microsoft 365", "Terraform", "Python", "Tableau", "Datadog"],
    faqs: [
      { q: "Why should we outsource {TITLE} instead of hiring an internal team?", a: "Outsourcing provides you immediate access to an entire team of specialized experts—from cloud architects to security analysts—for a fraction of the cost of a single full-time executive salary." },
      { q: "How quickly can you respond to a critical system failure?", a: "Our managed service level agreements (SLAs) guarantee a response time of under 15 minutes for critical, business-halting emergencies, 24/7/365." },
      { q: "Do you help with strict industry compliance requirements?", a: "Yes. Our security architects specialize in hardening systems to strictly comply with complex frameworks like HIPAA, SOC 2, GDPR, and PCI-DSS." },
      { q: "Can you audit our current IT vendors to see if we are overpaying?", a: "Absolutely. We routinely conduct vendor audits, often uncovering massive redundancies and renegotiating contracts that save our clients thousands of dollars annually." }
    ]
  },
  "Testing": {
    introBase: "Releasing software with critical bugs or security flaws can instantly destroy user trust and cause irreparable financial damage. Our elite {TITLE} services act as the ultimate safety net for your digital products. We employ rigorous, automated, and hyper-meticulous testing protocols that stress-test your applications beyond human limits. From simulating millions of concurrent users to attempting aggressive cyber-breaches, our QA engineers ensure your product is utterly bulletproof before it ever reaches the public. Utilizing advanced automation frameworks and manual edge-case exploration, our {TITLE} guarantees flawless performance, impenetrable security, and a completely frictionless user experience, giving you the absolute confidence to launch your software globally.",
    offers: [
      { t: "Automated Regression Testing", d: "We build extensive automated test suites that run continuously, ensuring new code updates never break existing functionality." },
      { t: "High-Volume Load & Stress Testing", d: "We simulate massive traffic spikes and extreme user loads to guarantee your servers won't crash during critical product launches or flash sales." },
      { t: "Comprehensive Penetration Testing", d: "Our ethical hackers launch aggressive, simulated cyber-attacks against your platform to uncover and patch critical security vulnerabilities before malicious hackers do." },
      { t: "Usability & Accessibility Testing", d: "We rigorously test your application across hundreds of real devices to ensure it is intuitively usable and strictly compliant with global WCAG accessibility standards." },
      { t: "API & Integration Testing", d: "We stress-test the intricate connections between your software and third-party APIs to guarantee seamless, secure, and rapid data exchange." },
      { t: "Continuous Testing in CI/CD", d: "We integrate our automated test scripts directly into your deployment pipelines, ensuring every single code commit is thoroughly validated before production release." }
    ],
    features: [
      "End-to-End Test Automation", "Cross-Browser & Device Matrix", "Vulnerability & Threat Modeling", 
      "Memory Leak Detection", "API Load Simulation", "Code Coverage Analytics", 
      "Accessibility (A11y) Auditing", "Behavior-Driven Development (BDD)", "Data Integrity Validation", "Performance Bottleneck Identification"
    ],
    tech: ["Selenium", "Cypress", "JMeter", "Appium", "Postman", "OWASP ZAP", "Burp Suite", "Jenkins", "BrowserStack", "SonarQube"],
    faqs: [
      { q: "When should {TITLE} be integrated into the development process?", a: "Testing should begin on day one. We employ a 'Shift-Left' testing methodology, identifying structural flaws and bugs during the design and early coding phases to drastically reduce fixing costs." },
      { q: "Can you test our application on older devices and browsers?", a: "Yes. We maintain a massive device farm (both physical and via cloud like BrowserStack) to ensure flawless compatibility across thousands of legacy devices, OS versions, and browsers." },
      { q: "What happens if you find a critical vulnerability during security testing?", a: "We immediately alert your development team, provide a detailed exploit proof-of-concept, and deliver exact remediation steps to patch the vulnerability instantly." },
      { q: "Do you provide detailed test reports for compliance purposes?", a: "Absolutely. We provide comprehensive, executive-level reports detailing test coverage, bug severity, performance metrics, and security compliance certificates." }
    ]
  }
};

const commonBenefits = [
  { title: "24/7 Expert Support", description: "Our dedicated technical team is available around the clock to ensure your operations never miss a beat." },
  { title: "Uncompromising Security", description: "We adhere strictly to global security standards, ensuring your sensitive business data is shielded from every angle." },
  { title: "Hyper-Scalable Architecture", description: "We build solutions designed to grow seamlessly with your business, handling 10x traffic without breaking a sweat." },
  { title: "Rapid ROI Generation", description: "Our focus is purely on your bottom line. We engineer solutions proven to drastically reduce costs and amplify revenue." },
  { title: "Seamless Systems Integration", description: "We ensure our solutions plug perfectly into your existing ecosystem without disruption or data loss." },
  { title: "Agile & Transparent Process", description: "You receive continuous updates, live dashboards, and complete transparency throughout the entire project lifecycle." }
];

const commonWhyChooseUs = [
  "Over a decade of proven industry excellence",
  "A dedicated team of top-tier engineers and strategists",
  "100% transparent pricing with zero hidden fees",
  "Strict adherence to international quality standards",
  "Relentless focus on client satisfaction and ROI",
  "Lightning-fast project delivery times",
  "Comprehensive post-launch maintenance and support",
  "Award-winning UI/UX and technical architecture"
];

function getIconForTitle(title) {
  const t = title.toLowerCase();
  if (t.includes('marketing') || t.includes('seo') || t.includes('ads')) return 'TrendingUp';
  if (t.includes('web') || t.includes('portal') || t.includes('e-commerce')) return 'Monitor';
  if (t.includes('app') || t.includes('mobile')) return 'Smartphone';
  if (t.includes('software') || t.includes('crm') || t.includes('hr')) return 'Code2';
  if (t.includes('design') || t.includes('logo') || t.includes('ui/ux')) return 'PenTool';
  if (t.includes('testing')) return 'CheckCircle';
  if (t.includes('data') || t.includes('intelligence')) return 'BarChart';
  if (t.includes('artificial') || t.includes('machine')) return 'Brain';
  if (t.includes('support') || t.includes('consulting')) return 'Headset';
  return 'Cpu';
}

function generateMassiveServiceData(title, slug, category) {
  const data = categoryData[category] || categoryData["IT Services"];
  
  return {
    slug: slug,
    title: title,
    shortDescription: `Industry-leading ${title} services tailored to empower your business operations, automate complex workflows, and drive exponential growth in the highly competitive digital landscape.`,
    icon: getIconForTitle(title),
    category: category,
    heroHeadline: `Expert ${title} Solutions Engineered for Growth`,
    heroSubheadline: `Transform your business infrastructure with our enterprise-grade, highly scalable ${title} services.`,
    introduction: data.introBase.replace(/{TITLE}/g, title),
    whatWeOffer: data.offers.map(o => ({ title: o.t, description: o.d.replace(/{TITLE}/g, title) })),
    keyFeatures: data.features,
    technologies: data.tech,
    benefits: commonBenefits,
    whyChooseUs: commonWhyChooseUs,
    faqs: data.faqs.map(f => ({ question: f.q.replace(/{TITLE}/g, title), answer: f.a.replace(/{TITLE}/g, title) })),
    status: 'published'
  };
}

async function seedMassiveServices() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    for (const service of exactServicesMapping) {
      // Don't override SEO since I just made it unique manually
      if (service.slug === 'seo') continue;

      const massiveData = generateMassiveServiceData(service.title, service.slug, service.category);
      
      // Update the document without touching the 'image' field so we don't overwrite the local images I just set
      await Service.findOneAndUpdate(
        { slug: service.slug },
        { $set: massiveData },
        { upsert: true }
      );
      
      console.log(`Injected massive data for ${service.slug}`);
    }
    
    console.log('Successfully injected massive data into all services!');
  } catch (error) {
    console.error('Error seeding massive services:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

seedMassiveServices();
