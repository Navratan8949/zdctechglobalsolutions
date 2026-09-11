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

function generateServiceData(title, slug, category) {
  return {
    slug: slug,
    title: title,
    shortDescription: `Professional ${title} services tailored to empower your business operations and drive exponential growth in the digital landscape.`,
    icon: getIconForTitle(title),
    image: { url: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=1200' },
    category: category,
    heroHeadline: `Expert ${title} Solutions`,
    heroSubheadline: `Transform your business with our industry-leading ${title} services.`,
    introduction: `At ZDC Tech Global Solutions, we offer comprehensive ${title} designed specifically to meet the unique challenges of modern businesses. Our expert team leverages cutting-edge technology and proven methodologies to deliver solutions that are not only highly effective but also scalable and secure. Partner with us to elevate your operational efficiency and achieve your strategic objectives faster.`,
    whatWeOffer: [
      { title: 'Custom Implementation', description: `End-to-end custom setup and deployment of ${title} tailored to your workflow.` },
      { title: 'Strategic Planning', description: `In-depth consultation to align our ${title} with your long-term business goals.` },
      { title: 'Continuous Support', description: '24/7 monitoring and maintenance to ensure optimal performance.' }
    ],
    keyFeatures: ['Highly Scalable', 'Secure Infrastructure', 'Seamless Integration', 'Expert Support'],
    technologies: ['Latest Frameworks', 'Cloud Infrastructure', 'Advanced Analytics'],
    benefits: [
      { title: 'Enhanced Efficiency', description: 'Streamline your daily operations and reduce manual workloads.' },
      { title: 'Cost Optimization', description: 'Maximize your ROI by eliminating redundant processes.' }
    ],
    whyChooseUs: ['Years of Industry Expertise', 'Client-Centric Approach', 'Transparent Pricing'],
    faqs: [
      { question: `How long does it take to deploy ${title}?`, answer: 'Deployment timelines vary based on requirements, but typically range from a few weeks to a few months.' },
      { question: `Do you provide custom features for ${title}?`, answer: 'Absolutely! We specialize in tailoring our solutions to fit your exact business needs.' }
    ],
    status: 'published'
  };
}

async function seedExactServices() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    console.log('Clearing old services...');
    await Service.deleteMany({});

    const allServices = exactServicesMapping.map(s => generateServiceData(s.title, s.slug, s.category));

    console.log(`Inserting ${allServices.length} exact services...`);
    await Service.insertMany(allServices);
    
    console.log('Successfully seeded all EXACT mega-menu services!');
  } catch (error) {
    console.error('Error seeding services:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

seedExactServices();
