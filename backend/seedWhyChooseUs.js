require("dotenv").config();
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const WhyChooseUs = require("./src/models/WhyChooseUs");
const connectDB = require("./src/config/db");

const UPLOAD_DIR = path.join(__dirname, "public", "uploads");

if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

const sourceImagesDir = "/Users/mac/Desktop/JDC Company/Main-ZDC-Company-Website/why choose us imges";

const baseUrl = process.env.API_URL || `http://localhost:${process.env.PORT || 8000}`;

const map = [
  {
    title: "Experienced Team",
    description: "Seasoned professionals with an average of 8+ years across diverse technologies and industries.",
    imageName: "group.png"
  },
  {
    title: "Quality Development",
    description: "Clean, tested, maintainable code that stands the test of time and scale.",
    imageName: "app-development.png"
  },
  {
    title: "On-Time Delivery",
    description: "We respect deadlines. Our agile process ensures predictable, on-schedule delivery.",
    imageName: "on-time.png"
  },
  {
    title: "Transparent Communication",
    description: "Regular updates, clear milestones and direct access to the team throughout the project.",
    imageName: "communication.png"
  },
  {
    title: "Scalable Solutions",
    description: "Architecture designed to grow with your business without costly rewrites.",
    imageName: "solutions.png"
  },
  {
    title: "Post-Launch Support",
    description: "We do not disappear after deployment. Ongoing support keeps your product healthy.",
    imageName: "technical-support.png"
  }
];

const seed = async () => {
  await connectDB();
  
  // Clear existing
  await WhyChooseUs.deleteMany({});
  
  for (const item of map) {
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
    
    await WhyChooseUs.create({
      title: item.title,
      description: item.description,
      image: {
        public_id: uniqueFilename,
        url: fileUrl
      }
    });
    
    console.log(`Created ${item.title}`);
  }
  
  console.log("Seeding complete.");
  process.exit(0);
};

seed();
