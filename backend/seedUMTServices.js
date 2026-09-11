require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('./src/models/Service');

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/zdc_tech";

const umtServices = [
  {
    slug: 'software-development',
    title: 'Software Development',
    shortDescription: 'We build custom software solutions around your business workflow scalable, secure, and designed to automate operations and cut manual effort.',
    icon: 'Code2',
    image: { url: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=800' },
    category: 'Development',
    heroHeadline: 'Custom Software Development Services',
    heroSubheadline: 'Tailored solutions to automate operations, boost efficiency, and drive business growth.',
    introduction: 'We build custom software solutions designed specifically around your unique business workflows. Our software is scalable, secure, and meticulously engineered to automate daily operations, eliminate manual effort, and scale effortlessly as your business grows.',
    whatWeOffer: [
      { title: 'Custom ERP Solutions', description: 'Enterprise resource planning software tailored to your specific organizational needs.' },
      { title: 'CRM Systems', description: 'Customer relationship management tools to help you track leads and close deals faster.' },
      { title: 'SaaS Development', description: 'End-to-end development of Software as a Service products from concept to launch.' }
    ],
    keyFeatures: ['Scalable Architecture', 'High Security', 'Cloud Integration', 'User-Centric Design'],
    technologies: ['Node.js', 'React', 'Python', 'AWS', 'MongoDB'],
    benefits: [
      { title: 'Increased Efficiency', description: 'Automate repetitive tasks and free up your team for high-value work.' },
      { title: 'Data Security', description: 'Enterprise-grade security protocols to keep your business data safe.' }
    ],
    whyChooseUs: ['Expert Engineering Team', 'Agile Methodology', 'Post-Launch Support'],
    faqs: [
      { question: 'How long does custom software take to build?', answer: 'Depending on complexity, it usually takes between 3 to 6 months.' },
      { question: 'Do you provide maintenance?', answer: 'Yes, we offer ongoing maintenance and support contracts.' }
    ],
    status: 'published'
  },
  {
    slug: 'website-development',
    title: 'Website Development',
    shortDescription: 'Professional website development fast, mobile-first, SEO-ready, and built to convert visitors into consistent business inquiries.',
    icon: 'Monitor',
    image: { url: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800' },
    category: 'Development',
    heroHeadline: 'Professional Web Design & Development',
    heroSubheadline: 'Fast, mobile-first, and SEO-ready websites designed to convert.',
    introduction: 'Our professional website development services focus on creating blazing fast, mobile-first, and highly optimized websites. We do not just build digital brochures; we engineer powerful platforms designed to rank high on search engines and convert visitors into loyal customers.',
    whatWeOffer: [
      { title: 'Corporate Websites', description: 'Professional, trustworthy online presence for modern enterprises.' },
      { title: 'Web Applications', description: 'Complex, highly interactive web applications built with modern frameworks.' },
      { title: 'Landing Pages', description: 'High-converting landing pages tailored for digital marketing campaigns.' }
    ],
    keyFeatures: ['Mobile Responsive', 'SEO Optimized', 'Lightning Fast Load Times', 'CMS Integration'],
    technologies: ['Next.js', 'React', 'Tailwind CSS', 'WordPress'],
    benefits: [
      { title: 'Better Visibility', description: 'Rank higher on Google with our SEO-first development approach.' },
      { title: 'Higher Conversion', description: 'UX/UI strategies designed specifically to turn visitors into leads.' }
    ],
    whyChooseUs: ['Award Winning Designs', 'Dedicated Project Managers', 'Transparent Process'],
    faqs: [
      { question: 'Will my website work on mobile?', answer: 'Yes, all our websites are 100% mobile responsive.' }
    ],
    status: 'published'
  },
  {
    slug: 'ecommerce-solutions',
    title: 'E-Commerce Solutions',
    shortDescription: 'End-to-end e-commerce development with product SEO, payment gateway integration, and conversion-focused design built to sell from day one.',
    icon: 'ShoppingCart',
    image: { url: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800' },
    category: 'Development',
    heroHeadline: 'High-Performance E-Commerce Stores',
    heroSubheadline: 'Built to sell from day one with seamless checkout experiences.',
    introduction: 'We provide end-to-end e-commerce development services. From intuitive product catalogs and optimized product SEO to secure payment gateway integrations, our conversion-focused designs ensure your online store starts generating revenue from the moment it goes live.',
    whatWeOffer: [
      { title: 'B2C E-Commerce', description: 'Beautiful retail stores for direct-to-consumer brands.' },
      { title: 'B2B Portals', description: 'Complex wholesale portals with custom pricing and bulk ordering.' },
      { title: 'Marketplace Development', description: 'Multi-vendor marketplace platforms.' }
    ],
    keyFeatures: ['Secure Checkout', 'Inventory Management', 'Multiple Payment Gateways', 'Abandoned Cart Recovery'],
    technologies: ['Shopify', 'WooCommerce', 'Magento', 'Stripe'],
    benefits: [
      { title: 'Global Reach', description: 'Sell your products to customers worldwide, 24/7.' },
      { title: 'Streamlined Operations', description: 'Automated inventory and order management.' }
    ],
    whyChooseUs: ['E-commerce Experts', 'Focus on Conversions', 'Scalable Architectures'],
    faqs: [
      { question: 'Can you integrate local payment gateways?', answer: 'Yes, we integrate Stripe, Razorpay, PayPal, and more.' }
    ],
    status: 'published'
  },
  {
    slug: 'mobile-app-development',
    title: 'Mobile App Development',
    shortDescription: 'Native and cross-platform mobile app development for iOS and Android clean design, solid architecture, and full support.',
    icon: 'Smartphone',
    image: { url: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=800' },
    category: 'Development',
    heroHeadline: 'Next-Gen Mobile Applications',
    heroSubheadline: 'Native and cross-platform apps for iOS and Android.',
    introduction: 'We deliver world-class mobile applications using both native and cross-platform technologies. With a focus on clean UI/UX design, solid backend architecture, and bug-free performance, we provide full support from initial concept through app store launch and beyond.',
    whatWeOffer: [
      { title: 'iOS App Development', description: 'Native Apple applications built with Swift.' },
      { title: 'Android App Development', description: 'Native Android applications built with Kotlin.' },
      { title: 'Cross-Platform Apps', description: 'React Native and Flutter apps for both platforms from a single codebase.' }
    ],
    keyFeatures: ['Offline Mode', 'Push Notifications', 'Hardware Integration', 'App Store Optimization'],
    technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin'],
    benefits: [
      { title: 'Direct Customer Channel', description: 'Reach your customers directly on the device they use most.' },
      { title: 'Brand Loyalty', description: 'Build stronger relationships with interactive mobile experiences.' }
    ],
    whyChooseUs: ['Experienced App Developers', 'UI/UX Excellence', 'Rigorous Testing'],
    faqs: [
      { question: 'Do you upload the app to the store?', answer: 'Yes, we handle the entire App Store and Play Store submission process.' }
    ],
    status: 'published'
  },
  {
    slug: 'digital-marketing',
    title: 'Digital Marketing',
    shortDescription: 'Data-driven digital marketing across SEO, Google Ads, and Meta Ads every campaign tracked and optimised.',
    icon: 'Megaphone',
    image: { url: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=800' },
    category: 'Marketing',
    heroHeadline: 'Data-Driven Digital Marketing',
    heroSubheadline: 'Generate qualified leads consistently with proven marketing strategies.',
    introduction: 'Our digital marketing strategies are built purely on data and results. From organic SEO and high-ROI Google Ads to targeted Meta Ads on social media, we ensure every campaign is meticulously tracked, continuously optimized, and geared toward generating qualified leads consistently.',
    whatWeOffer: [
      { title: 'Search Engine Optimization', description: 'Organic strategies to rank on the first page of Google.' },
      { title: 'Pay-Per-Click Advertising', description: 'Highly targeted Google and Meta ads for instant traffic.' },
      { title: 'Social Media Management', description: 'Building your brand presence across all major social networks.' }
    ],
    keyFeatures: ['Data Analytics', 'Conversion Tracking', 'A/B Testing', 'Monthly Reporting'],
    technologies: ['Google Analytics', 'SEMrush', 'Meta Business Suite', 'HubSpot'],
    benefits: [
      { title: 'Measurable ROI', description: 'Track exactly how much revenue every marketing dollar generates.' },
      { title: 'Targeted Reach', description: 'Show your ads only to people actively looking for your services.' }
    ],
    whyChooseUs: ['Certified Experts', 'Transparent Reporting', 'Result-Oriented Approach'],
    faqs: [
      { question: 'How soon will I see results from SEO?', answer: 'SEO is a long-term strategy, usually showing significant results in 3 to 6 months.' }
    ],
    status: 'published'
  },
  {
    slug: 'artificial-intelligence',
    title: 'Artificial Intelligence',
    shortDescription: 'AI-powered chatbots, predictive analytics, and business automation intelligent solutions built to cut operational costs.',
    icon: 'Brain',
    image: { url: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800' },
    category: 'Innovation',
    heroHeadline: 'Enterprise AI & Machine Learning',
    heroSubheadline: 'Intelligent solutions built to automate decisions and cut costs.',
    introduction: 'We integrate cutting-edge Artificial Intelligence into your business. Whether you need intelligent AI-powered chatbots, complex predictive analytics, or smart business automation, our AI solutions are engineered to drastically cut operational costs and sharpen your strategic decisions.',
    whatWeOffer: [
      { title: 'AI Chatbots', description: 'Intelligent customer support agents available 24/7.' },
      { title: 'Predictive Analytics', description: 'Forecasting trends and customer behavior using historical data.' },
      { title: 'Process Automation', description: 'RPA and AI workflows to automate complex manual tasks.' }
    ],
    keyFeatures: ['Natural Language Processing', 'Machine Learning Models', 'Data Mining', 'Computer Vision'],
    technologies: ['OpenAI API', 'TensorFlow', 'PyTorch', 'Python'],
    benefits: [
      { title: 'Cost Reduction', description: 'Automate support and operations to save heavily on staffing costs.' },
      { title: 'Better Decisions', description: 'Make informed choices backed by powerful data predictions.' }
    ],
    whyChooseUs: ['AI Specialists', 'Ethical AI Practices', 'Seamless Integration'],
    faqs: [
      { question: 'Do I need a lot of data for AI?', answer: 'While more data is better, we can build effective AI models with surprisingly small datasets or pre-trained models.' }
    ],
    status: 'published'
  },
  {
    slug: 'it-consulting',
    title: 'IT Consulting',
    shortDescription: 'IT consulting covering technology strategy, system architecture, and digital transformation planning.',
    icon: 'Briefcase',
    image: { url: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800' },
    category: 'Consulting',
    heroHeadline: 'Strategic IT Consulting Services',
    heroSubheadline: 'Align your technology investments with your business goals.',
    introduction: 'Our IT consulting services cover comprehensive technology strategy, robust system architecture, and detailed digital transformation planning. We partner with you to ensure that every technology investment you make delivers real, measurable returns for your organization.',
    whatWeOffer: [
      { title: 'Digital Transformation', description: 'Guiding traditional businesses into the digital age.' },
      { title: 'System Architecture Design', description: 'Planning robust, scalable infrastructures for complex applications.' },
      { title: 'Security Audits', description: 'Comprehensive analysis of your IT systems for vulnerabilities.' }
    ],
    keyFeatures: ['Strategic Planning', 'Risk Assessment', 'Technology Roadmaps', 'Vendor Management'],
    technologies: ['Cloud Computing', 'Enterprise Architecture', 'Cybersecurity'],
    benefits: [
      { title: 'Future-Proof Systems', description: 'Build architectures that will scale gracefully over the next decade.' },
      { title: 'Optimized Budgets', description: 'Stop wasting money on inefficient tech stacks and redundant software.' }
    ],
    whyChooseUs: ['Decades of Experience', 'Vendor Neutral Advice', 'Business-First Mindset'],
    faqs: [
      { question: 'Do you only consult, or do you build as well?', answer: 'We do both. We can consult on the strategy and then have our engineering team build the solution.' }
    ],
    status: 'published'
  }
];

async function seedUMTServices() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing services to replace with new rich UMT services
    console.log('Clearing old services...');
    await Service.deleteMany({});

    console.log('Inserting scraped UMT services with rich details...');
    await Service.insertMany(umtServices);
    
    console.log('Successfully seeded services!');
  } catch (error) {
    console.error('Error seeding services:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

seedUMTServices();
