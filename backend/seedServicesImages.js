require("dotenv").config();
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const Service = require("./src/models/Service");
const connectDB = require("./src/config/db");

const UPLOAD_DIR = path.join(__dirname, "public", "uploads");

if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

const sourceImagesDir = "/Users/mac/Desktop/JDC Company/Main-ZDC-Company-Website/our services imges";
const baseUrl = process.env.API_URL || `http://localhost:${process.env.PORT || 8000}`;

const servicesToSeed = [
  {
    slug: "social-media",
    title: "Social Media Marketing",
    shortDescription: "Professional Social Media Marketing services tailored to your business needs, delivering robust and scalable solutions.",
    icon: "Share2",
    category: "Online Marketing",
    heroHeadline: "Expert Social Media Marketing Solutions",
    heroSubheadline: "We provide comprehensive Social Media Marketing to help your business grow and succeed in the digital world.",
    introduction: "Our Social Media Marketing services are designed to address your specific challenges. We use industry best practices and the latest technologies to ensure high-quality delivery and measurable results for your organization.",
    whatWeOffer: [
      { title: "Custom Solutions", description: "Tailored approaches specific to your Social Media Marketing requirements." }
    ],
    imageName: "bullhorn.png"
  },
  {
    slug: "google-ads",
    title: "Google Ads",
    shortDescription: "Professional Google Ads services tailored to your business needs, delivering robust and scalable solutions.",
    icon: "Megaphone",
    category: "Online Marketing",
    heroHeadline: "Expert Google Ads Solutions",
    heroSubheadline: "We provide comprehensive Google Ads to help your business grow and succeed in the digital world.",
    introduction: "Our Google Ads services are designed to address your specific challenges. We use industry best practices and the latest technologies to ensure high-quality delivery and measurable results for your organization.",
    whatWeOffer: [
      { title: "Custom Solutions", description: "Tailored approaches specific to your Google Ads requirements." }
    ],
    imageName: "ads.png"
  },
  {
    slug: "meta-ads",
    title: "Meta Ads",
    shortDescription: "Professional Meta Ads services tailored to your business needs, delivering robust and scalable solutions.",
    icon: "Megaphone",
    category: "Online Marketing",
    heroHeadline: "Expert Meta Ads Solutions",
    heroSubheadline: "We provide comprehensive Meta Ads to help your business grow and succeed in the digital world.",
    introduction: "Our Meta Ads services are designed to address your specific challenges. We use industry best practices and the latest technologies to ensure high-quality delivery and measurable results for your organization.",
    whatWeOffer: [
      { title: "Custom Solutions", description: "Tailored approaches specific to your Meta Ads requirements." }
    ],
    imageName: "meta.png"
  },
  {
    slug: "gmb",
    title: "Google My Business Profile",
    shortDescription: "Professional Google My Business Profile services tailored to your business needs, delivering robust and scalable solutions.",
    icon: "MapPin",
    category: "Online Marketing",
    heroHeadline: "Expert Google My Business Profile Solutions",
    heroSubheadline: "We provide comprehensive Google My Business Profile to help your business grow and succeed in the digital world.",
    introduction: "Our Google My Business Profile services are designed to address your specific challenges. We use industry best practices and the latest technologies to ensure high-quality delivery and measurable results for your organization.",
    whatWeOffer: [
      { title: "Custom Solutions", description: "Tailored approaches specific to your Google My Business Profile requirements." }
    ],
    imageName: "business.png"
  },
  {
    slug: "web-design",
    title: "Web Design & Development",
    shortDescription: "Professional Web Design & Development services tailored to your business needs, delivering robust and scalable solutions.",
    icon: "Monitor",
    category: "Web Design & Development",
    heroHeadline: "Expert Web Design & Development Solutions",
    heroSubheadline: "We provide comprehensive Web Design & Development to help your business grow and succeed in the digital world.",
    introduction: "Our Web Design & Development services are designed to address your specific challenges. We use industry best practices and the latest technologies to ensure high-quality delivery and measurable results for your organization.",
    whatWeOffer: [
      { title: "Custom Solutions", description: "Tailored approaches specific to your Web Design & Development requirements." }
    ],
    imageName: "digital-services.png"
  },
  {
    slug: "crm-development",
    title: "CRM Software Development",
    shortDescription: "Professional CRM Software Development services tailored to your business needs, delivering robust and scalable solutions.",
    icon: "Users",
    category: "Web Design & Development",
    heroHeadline: "Expert CRM Software Development Solutions",
    heroSubheadline: "We provide comprehensive CRM Software Development to help your business grow and succeed in the digital world.",
    introduction: "Our CRM Software Development services are designed to address your specific challenges. We use industry best practices and the latest technologies to ensure high-quality delivery and measurable results for your organization.",
    whatWeOffer: [
      { title: "Custom Solutions", description: "Tailored approaches specific to your CRM Software Development requirements." }
    ],
    imageName: "crm.png"
  },
  {
    slug: "software",
    title: "Software Development",
    shortDescription: "Professional Software Development services tailored to your business needs, delivering robust and scalable solutions.",
    icon: "Code",
    category: "Web Design & Development",
    heroHeadline: "Expert Software Development Solutions",
    heroSubheadline: "We provide comprehensive Software Development to help your business grow and succeed in the digital world.",
    introduction: "Our Software Development services are designed to address your specific challenges. We use industry best practices and the latest technologies to ensure high-quality delivery and measurable results for your organization.",
    whatWeOffer: [
      { title: "Custom Solutions", description: "Tailored approaches specific to your Software Development requirements." }
    ],
    imageName: "app-development.png"
  },
  {
    slug: "educational-portal",
    title: "Educational Web Portal",
    shortDescription: "Professional Educational Web Portal services tailored to your business needs, delivering robust and scalable solutions.",
    icon: "BookOpen",
    category: "Web Design & Development",
    heroHeadline: "Expert Educational Web Portal Solutions",
    heroSubheadline: "We provide comprehensive Educational Web Portal to help your business grow and succeed in the digital world.",
    introduction: "Our Educational Web Portal services are designed to address your specific challenges. We use industry best practices and the latest technologies to ensure high-quality delivery and measurable results for your organization.",
    whatWeOffer: [
      { title: "Custom Solutions", description: "Tailored approaches specific to your Educational Web Portal requirements." }
    ],
    imageName: "training.png"
  }
];

const seed = async () => {
  await connectDB();
  
  for (const item of servicesToSeed) {
    const sourcePath = path.join(sourceImagesDir, item.imageName);
    if (!fs.existsSync(sourcePath)) {
      console.log(`Source image not found: ${sourcePath}`);
      continue;
    }
    
    const ext = path.extname(sourcePath);
    const uniqueFilename = `${Date.now()}-${crypto.randomBytes(6).toString("hex")}${ext}`;
    const targetPath = path.join(UPLOAD_DIR, uniqueFilename);
    
    // Copy file
    fs.copyFileSync(sourcePath, targetPath);
    
    const fileUrl = `${baseUrl}/public/uploads/${uniqueFilename}`;
    
    const imagePayload = {
      public_id: uniqueFilename,
      url: fileUrl
    };

    const updatePayload = {
      ...item,
      image: imagePayload
    };
    
    await Service.findOneAndUpdate(
      { slug: item.slug },
      updatePayload,
      { upsert: true, new: true }
    );
    
    console.log(`Upserted Service: ${item.title} with image ${item.imageName}`);
  }
  
  console.log("Seeding complete.");
  process.exit(0);
};

seed();
