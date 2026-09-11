require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('./src/models/Service');

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/zdc_tech";

const categories = {
  "Online Marketing": [
    "SEO Services", "Social Media Marketing", "Google Ads", "Meta Ads", 
    "Google MY Business Profile", "Digital Marketing"
  ],
  "Web Design & Development": [
    "Web Design & Development", "CRM Software Development", "Software Development", 
    "Educational Web Portal Development", "Restaurant Web Portal Development", 
    "Health Care Portal Development", "Travel Portal Development", 
    "Real Estate Portal Development", "E-Commerce Website Development"
  ],
  "Mobile Application": [
    "Mobile App Development", "Windows App Development", "Xamarine App Development", 
    "Native App Development", "Hybrid App Development"
  ],
  "IT Services": [
    "IT Consulting", "Data Analytics & Business Intelligence", 
    "Artificial intelligence & machine-learning", "IT Support & managed Service", 
    "Logo Design", "Ui/UX Design", "Brochure design"
  ],
  "Software": [
    "HR and Payroll Management Software", "Jewellery Software", "CRM Software", 
    "Real Estate Software", "Inventory Management Software", 
    "Hospital Management Software", "School Management Software"
  ],
  "Testing": [
    "Software Testing", "Security Testing", "Performance Testing"
  ]
};

function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

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

function generateServiceData(title, category) {
  return {
    slug: slugify(title),
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

async function seedAllServices() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    console.log('Clearing old services...');
    await Service.deleteMany({});

    const allServices = [];
    
    for (const [category, titles] of Object.entries(categories)) {
      for (const title of titles) {
        allServices.push(generateServiceData(title, category));
      }
    }

    console.log(`Inserting ${allServices.length} dynamic services...`);
    await Service.insertMany(allServices);
    
    console.log('Successfully seeded all mega-menu services!');
  } catch (error) {
    console.error('Error seeding services:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

seedAllServices();
