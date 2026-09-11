const fs = require('fs');

const missingServices = [
  { slug: "social-media", title: "Social Media Marketing", category: "Online Marketing", icon: "Share2" },
  { slug: "google-ads", title: "Google Ads", category: "Online Marketing", icon: "Megaphone" },
  { slug: "meta-ads", title: "Meta Ads", category: "Online Marketing", icon: "Megaphone" },
  { slug: "gmb", title: "Google My Business Profile", category: "Online Marketing", icon: "MapPin" },
  { slug: "web-design", title: "Web Design & Development", category: "Web Design & Development", icon: "Monitor" },
  { slug: "crm-development", title: "CRM Software Development", category: "Web Design & Development", icon: "Users" },
  { slug: "software", title: "Software Development", category: "Web Design & Development", icon: "Code" },
  { slug: "educational-portal", title: "Educational Web Portal", category: "Web Design & Development", icon: "BookOpen" },
  { slug: "restaurant-portal", title: "Restaurant Web Portal", category: "Web Design & Development", icon: "Coffee" },
  { slug: "healthcare-portal", title: "Health Care Portal", category: "Web Design & Development", icon: "Heart" },
  { slug: "travel-portal", title: "Travel Portal Development", category: "Web Design & Development", icon: "Plane" },
  { slug: "real-estate-portal", title: "Real Estate Portal", category: "Web Design & Development", icon: "Home" },
  { slug: "ecommerce", title: "E-Commerce Website", category: "Web Design & Development", icon: "ShoppingCart" },
  { slug: "mobile-app", title: "Mobile App Development", category: "Mobile Application", icon: "Smartphone" },
  { slug: "windows-app", title: "Windows App Development", category: "Mobile Application", icon: "Monitor" },
  { slug: "xamarin", title: "Xamarine App Development", category: "Mobile Application", icon: "Smartphone" },
  { slug: "native-app", title: "Native App Development", category: "Mobile Application", icon: "Smartphone" },
  { slug: "hybrid-app", title: "Hybrid App Development", category: "Mobile Application", icon: "Smartphone" },
  { slug: "data-analytics", title: "Data Analytics & BI", category: "Our Service", icon: "BarChart" },
  { slug: "ai-ml", title: "AI & Machine Learning", category: "Our Service", icon: "Brain" },
  { slug: "it-support", title: "IT Support & Managed Service", category: "Our Service", icon: "Headphones" },
  { slug: "logo-design", title: "Logo Design", category: "Our Service", icon: "PenTool" },
  { slug: "ui-ux", title: "UI/UX Design", category: "Our Service", icon: "Palette" },
  { slug: "brochure-design", title: "Brochure Design", category: "Our Service", icon: "Book" },
  { slug: "hr-payroll", title: "HR and Payroll Software", category: "Software", icon: "Users" },
  { slug: "jewellery-software", title: "Jewellery Software", category: "Software", icon: "Diamond" },
  { slug: "crm-software", title: "CRM Software", category: "Software", icon: "Users" },
  { slug: "real-estate-software", title: "Real Estate Software", category: "Software", icon: "Home" },
  { slug: "inventory", title: "Inventory Management", category: "Software", icon: "Package" },
  { slug: "hospital-management", title: "Hospital Management", category: "Software", icon: "Heart" },
  { slug: "school-management", title: "School Management", category: "Software", icon: "BookOpen" },
  { slug: "software-testing", title: "Software Testing", category: "Testing", icon: "CheckSquare" },
  { slug: "security-testing", title: "Security Testing", category: "Testing", icon: "Shield" },
  { slug: "performance-testing", title: "Performance Testing", category: "Testing", icon: "Activity" }
];

const generateServiceBlock = (s) => `
  {
    slug: "${s.slug}",
    title: "${s.title}",
    shortDescription: "Professional ${s.title} services tailored to your business needs, delivering robust and scalable solutions.",
    icon: "${s.icon}",
    category: "${s.category}",
    heroHeadline: "Expert ${s.title} Solutions",
    heroSubheadline: "We provide comprehensive ${s.title} to help your business grow and succeed in the digital world.",
    introduction: "Our ${s.title} services are designed to address your specific challenges. We use industry best practices and the latest technologies to ensure high-quality delivery and measurable results for your organization.",
    whatWeOffer: [
      { title: "Custom Solutions", description: "Tailored approaches specific to your ${s.title} requirements." },
      { title: "Expert Consultation", description: "Strategic guidance from our experienced professionals." },
      { title: "Seamless Integration", description: "Smooth implementation within your existing workflows." },
      { title: "Ongoing Support", description: "Continuous maintenance and optimization of your services." }
    ],
    keyFeatures: [
      "Scalable Architecture",
      "High Performance",
      "Secure Implementation",
      "24/7 Support",
      "Cost-effective Solutions",
      "Modern Technologies"
    ],
    technologies: ["React", "Node.js", "Python", "Cloud", "Modern Stack"],
    benefits: [
      { title: "Increased Efficiency", description: "Streamline operations and reduce manual overhead." },
      { title: "Better ROI", description: "Maximize the return on your technology investments." },
      { title: "Competitive Edge", description: "Stay ahead of the curve with modern solutions." },
      { title: "Business Growth", description: "Scale your business with reliable infrastructure." }
    ],
    whyChooseUs: [
      "Years of industry expertise",
      "Dedicated professional team",
      "Proven track record of success",
      "Client-first approach"
    ],
    faqs: [
      { question: "How much does ${s.title} cost?", answer: "Costs vary depending on the scope and complexity of your requirements. Contact us for a detailed quote." },
      { question: "How long does implementation take?", answer: "Timelines depend on the project size, but we always strive for efficient and timely delivery." },
      { question: "Do you provide ongoing support?", answer: "Yes, we offer comprehensive post-launch support and maintenance packages." }
    ],
    relatedSlugs: ["website-development", "digital-marketing", "it-consulting"]
  },`;

let fileContent = fs.readFileSync('data/services.ts', 'utf8');

// First, we need to update the ServiceSlug type definition
let newSlugs = missingServices.map(s => `  | "${s.slug}"`).join('\n');
fileContent = fileContent.replace(/export type ServiceSlug =[\s\S]*?;/, (match) => {
  return match.slice(0, -1) + '\n' + newSlugs + ';';
});

// Now inject the new services into the array
const injectionPoint = 'export const services: Service[] = [';
const injectionIndex = fileContent.indexOf(injectionPoint) + injectionPoint.length;

let newServicesCode = missingServices.map(generateServiceBlock).join('');

const newFileContent = fileContent.slice(0, injectionIndex) + newServicesCode + fileContent.slice(injectionIndex);

fs.writeFileSync('data/services.ts', newFileContent);
console.log('Successfully added ' + missingServices.length + ' services!');
