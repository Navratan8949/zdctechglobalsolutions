export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export const stats: Stat[] = [
  { value: 100, suffix: "+", label: "Projects Delivered" },
  { value: 50, suffix: "+", label: "Happy Clients" },
  { value: 5, suffix: "+", label: "Years Experience" },
  { value: 20, suffix: "+", label: "Expert Professionals" },
];

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  icon: string;
}

export const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Requirement Analysis",
    description:
      "We dive deep into your business goals, user needs and technical constraints to define a clear project scope.",
    icon: "Search",
  },
  {
    step: "02",
    title: "Planning",
    description:
      "We create a detailed roadmap with milestones, timelines, resource allocation and risk mitigation strategies.",
    icon: "ClipboardList",
  },
  {
    step: "03",
    title: "UI/UX Design",
    description:
      "Our designers craft intuitive interfaces and prototypes that balance beauty with usability and accessibility.",
    icon: "Palette",
  },
  {
    step: "04",
    title: "Development",
    description:
      "Engineers build your product using clean, modular code with regular reviews and continuous integration.",
    icon: "Code2",
  },
  {
    step: "05",
    title: "Testing",
    description:
      "Rigorous quality assurance including automated tests, manual testing and performance validation.",
    icon: "ShieldCheck",
  },
  {
    step: "06",
    title: "Deployment",
    description:
      "We deploy your product to production with zero downtime, monitoring and rollback safety nets.",
    icon: "Rocket",
  },
  {
    step: "07",
    title: "Support",
    description:
      "Post-launch we provide maintenance, updates and enhancements to keep your product running smoothly.",
    icon: "LifeBuoy",
  },
];

export interface CoreValue {
  title: string;
  description: string;
  icon: string;
}

export const coreValues: CoreValue[] = [
  {
    title: "Innovation",
    description:
      "We constantly explore new technologies and approaches to solve problems better.",
    icon: "Lightbulb",
  },
  {
    title: "Integrity",
    description:
      "We are honest, transparent and accountable in everything we do.",
    icon: "ShieldCheck",
  },
  {
    title: "Excellence",
    description:
      "We hold ourselves to the highest standards in code, design and service.",
    icon: "Award",
  },
  {
    title: "Collaboration",
    description:
      "We work as an extension of your team, not just an external vendor.",
    icon: "Users",
  },
  {
    title: "Client Focus",
    description:
      "Your success is our success. Every decision starts with your goals.",
    icon: "Heart",
  },
  {
    title: "Continuous Learning",
    description:
      "Technology evolves fast, and so do we. We invest in growing our expertise.",
    icon: "BookOpen",
  },
];

export interface WhyChooseUs {
  title: string;
  description: string;
  icon: string;
}

export const whyChooseUs: WhyChooseUs[] = [
  {
    title: "Experienced Team",
    description:
      "Seasoned professionals with an average of 8+ years across diverse technologies and industries.",
    icon: "Users",
  },
  {
    title: "Quality Development",
    description:
      "Clean, tested, maintainable code that stands the test of time and scale.",
    icon: "BadgeCheck",
  },
  {
    title: "On-Time Delivery",
    description:
      "We respect deadlines. Our agile process ensures predictable, on-schedule delivery.",
    icon: "Clock",
  },
  {
    title: "Transparent Communication",
    description:
      "Regular updates, clear milestones and direct access to the team throughout the project.",
    icon: "MessageSquare",
  },
  {
    title: "Scalable Solutions",
    description:
      "Architecture designed to grow with your business without costly rewrites.",
    icon: "TrendingUp",
  },
  {
    title: "Post-Launch Support",
    description:
      "We do not disappear after deployment. Ongoing support keeps your product healthy.",
    icon: "LifeBuoy",
  },
];

export interface FaqItem {
  question: string;
  answer: string;
}

export const homeFaqs: FaqItem[] = [
  {
    question: "What is your development process?",
    answer:
      "We follow a 7-step process: requirement analysis, planning, UI/UX design, development, testing, deployment and ongoing support. Each phase has clear deliverables and milestones so you always know where your project stands.",
  },
  {
    question: "How do you price projects?",
    answer:
      "We offer both fixed-price and dedicated-team engagement models. After understanding your requirements, we provide a detailed proposal with transparent pricing. There are no hidden costs — you know exactly what you are paying for.",
  },
  {
    question: "What is the typical project timeline?",
    answer:
      "Timelines vary by scope. A corporate website takes 4-6 weeks, a mobile app MVP 8-12 weeks, and enterprise software 12-24 weeks. We provide a detailed timeline during planning and keep you updated throughout.",
  },
  {
    question: "Which technologies do you work with?",
    answer:
      "We work with modern, proven technologies including React, Next.js, Node.js, Python, React Native, Flutter, PostgreSQL, MongoDB, AWS and Google Cloud. We choose the stack that best fits your project needs.",
  },
  {
    question: "Do you provide maintenance after launch?",
    answer:
      "Yes. We offer flexible maintenance plans that cover bug fixes, security updates, performance monitoring and feature enhancements. We are committed to your product long after it goes live.",
  },
  {
    question: "Can you build both iOS and Android apps?",
    answer:
      "Absolutely. We use cross-platform frameworks like React Native and Flutter to build apps that run natively on both iOS and Android from a single codebase, saving time and cost without compromising quality.",
  },
  {
    question: "Do you build custom software or use existing platforms?",
    answer:
      "Both. We build fully custom software when your needs require it, and we integrate or extend existing platforms when that is more efficient. We always recommend the approach that best serves your goals and budget.",
  },
];

export interface JobOpening {
  id: string;
  position: string;
  experience: string;
  location: string;
  type: string;
  department: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
}

export const jobOpenings: JobOpening[] = [
  {
    id: "react-native-developer",
    position: "React Native Developer",
    experience: "3+ years",
    location: "Remote / Hybrid",
    type: "Full-time",
    department: "Engineering",
    description:
      "We are looking for a skilled React Native developer to build cross-platform mobile applications that deliver exceptional user experiences.",
    responsibilities: [
      "Build and maintain cross-platform mobile applications with React Native",
      "Collaborate with designers and backend engineers to ship features",
      "Optimize app performance for speed and smooth 60fps animations",
      "Integrate third-party APIs and native modules",
      "Participate in code reviews and maintain code quality standards",
    ],
    requirements: [
      "3+ years of professional React Native experience",
      "Strong proficiency in JavaScript and TypeScript",
      "Experience with state management (Redux, Zustand or similar)",
      "Familiarity with native iOS and Android build processes",
      "Understanding of REST APIs and real-time communication",
    ],
  },
  {
    id: "react-developer",
    position: "React.js Developer",
    experience: "2+ years",
    location: "Remote / Hybrid",
    type: "Full-time",
    department: "Engineering",
    description:
      "Join our frontend team to build modern, responsive web applications using React and Next.js for clients across industries.",
    responsibilities: [
      "Develop responsive web applications with React and Next.js",
      "Translate designs into pixel-perfect, accessible UI components",
      "Write clean, reusable TypeScript code with proper testing",
      "Optimize applications for performance and Core Web Vitals",
      "Work closely with designers and backend developers",
    ],
    requirements: [
      "2+ years of professional React development experience",
      "Proficiency in TypeScript and modern CSS (Tailwind preferred)",
      "Experience with Next.js and server-side rendering",
      "Understanding of component architecture and state management",
      "Knowledge of web accessibility standards",
    ],
  },
  {
    id: "node-developer",
    position: "Node.js Developer",
    experience: "3+ years",
    location: "Remote / Hybrid",
    type: "Full-time",
    department: "Engineering",
    description:
      "We need a backend engineer to design and build scalable APIs and microservices that power our client applications.",
    responsibilities: [
      "Design and build RESTful and GraphQL APIs with Node.js",
      "Architect scalable microservices and event-driven systems",
      "Design and optimize database schemas for PostgreSQL and MongoDB",
      "Implement authentication, authorization and security best practices",
      "Set up CI/CD pipelines and monitoring",
    ],
    requirements: [
      "3+ years of professional Node.js experience",
      "Strong proficiency in TypeScript",
      "Experience with Express or NestJS frameworks",
      "Database design experience with SQL and NoSQL",
      "Understanding of cloud platforms (AWS or GCP)",
    ],
  },
  {
    id: "ui-ux-designer",
    position: "UI/UX Designer",
    experience: "2+ years",
    location: "Remote / Hybrid",
    type: "Full-time",
    department: "Design",
    description:
      "We are looking for a creative UI/UX designer to craft beautiful, intuitive interfaces for web and mobile products.",
    responsibilities: [
      "Conduct user research and create user flows and wireframes",
      "Design high-fidelity interfaces in Figma that align with brand systems",
      "Create interactive prototypes to validate design decisions",
      "Collaborate with developers on design implementation and QA",
      "Maintain and evolve design systems and component libraries",
    ],
    requirements: [
      "2+ years of professional UI/UX design experience",
      "Expert proficiency in Figma",
      "Strong portfolio demonstrating web and mobile design work",
      "Understanding of design systems and accessibility principles",
      "Ability to accept and act on constructive feedback",
    ],
  },
  {
    id: "digital-marketing-executive",
    position: "Digital Marketing Executive",
    experience: "2+ years",
    location: "Remote / Hybrid",
    type: "Full-time",
    department: "Marketing",
    description:
      "Join our marketing team to plan and execute data-driven digital campaigns that drive growth for our clients.",
    responsibilities: [
      "Plan and execute paid campaigns across Google, Meta and LinkedIn",
      "Develop and manage SEO and content marketing strategies",
      "Create marketing reports with clear ROI analysis",
      "Conduct A/B tests on ads, landing pages and email campaigns",
      "Collaborate with designers and developers on campaign assets",
    ],
    requirements: [
      "2+ years of digital marketing experience",
      "Proficiency with Google Ads and Meta Ads Manager",
      "Experience with SEO tools like SEMrush or Ahrefs",
      "Strong analytical skills and data-driven mindset",
      "Excellent written and verbal communication",
    ],
  },
];

export interface LifeAtCompanySection {
  title: string;
  description: string;
  icon: string;
}

export const lifeAtCompany: LifeAtCompanySection[] = [
  {
    title: "Collaborative Culture",
    description:
      "We believe great products are built by teams that communicate openly. No silos, no egos — just people working together toward a shared goal.",
    icon: "Users",
  },
  {
    title: "Continuous Learning",
    description:
      "Technology evolves fast and so do we. Weekly tech talks, conference budgets and dedicated learning time keep our team sharp.",
    icon: "BookOpen",
  },
  {
    title: "Work-Life Balance",
    description:
      "We trust our team to manage their time. Flexible hours, remote options and respect for personal time are not perks — they are standard.",
    icon: "Heart",
  },
  {
    title: "Innovation Time",
    description:
      "Every team member gets dedicated time to explore new technologies, build side projects and contribute to open source.",
    icon: "Lightbulb",
  },
];

export const companyInfo = {
  name: "ZDC Tech Global Solutions",
  tagline: "Build Digital Solutions That Move Your Business Forward",
  email: "info@zdctechglobalsolutions.com",
  phone: "+91 7073551862",
  headOffice: "Jaipur, Rajasthan, India",
  branchOffice: "D. P. Road, Near New Nagar Parishad Office, Deulgaon Raja, Tq. Deulgaon Raja, Dist. Buldhana, Maharashtra - 443204",
  hours: "Monday - Friday: 9:00 AM - 6:00 PM (IST)",
  socials: {
    linkedin: "#",
    twitter: "#",
    github: "#",
    instagram: "#",
  },
};
