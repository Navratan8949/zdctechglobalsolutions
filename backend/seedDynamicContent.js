require("dotenv").config();
const mongoose = require("mongoose");
const Stat = require("./src/models/Stat");
const ProcessStep = require("./src/models/ProcessStep");
const CoreValue = require("./src/models/CoreValue");
const LifeAtCompany = require("./src/models/LifeAtCompany");

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/zdc-tech";

const stats = [
    { value: 100, suffix: "+", label: "Projects Delivered", order: 1 },
    { value: 50, suffix: "+", label: "Happy Clients", order: 2 },
    { value: 5, suffix: "+", label: "Years Experience", order: 3 },
    { value: 20, suffix: "+", label: "Expert Professionals", order: 4 },
];

const processSteps = [
    { step: "01", title: "Requirement Analysis", description: "We dive deep into your business goals, user needs and technical constraints to define a clear project scope.", icon: "Search", order: 1 },
    { step: "02", title: "Planning", description: "We create a detailed roadmap with milestones, timelines, resource allocation and risk mitigation strategies.", icon: "ClipboardList", order: 2 },
    { step: "03", title: "UI/UX Design", description: "Our designers craft intuitive interfaces and prototypes that balance beauty with usability and accessibility.", icon: "Palette", order: 3 },
    { step: "04", title: "Development", description: "Engineers build your product using clean, modular code with regular reviews and continuous integration.", icon: "Code2", order: 4 },
    { step: "05", title: "Testing", description: "Rigorous quality assurance including automated tests, manual testing and performance validation.", icon: "ShieldCheck", order: 5 },
    { step: "06", title: "Deployment", description: "We deploy your product to production with zero downtime, monitoring and rollback safety nets.", icon: "Rocket", order: 6 },
    { step: "07", title: "Support", description: "Post-launch we provide maintenance, updates and enhancements to keep your product running smoothly.", icon: "LifeBuoy", order: 7 },
];

const coreValues = [
    { title: "Innovation", description: "We constantly explore new technologies and approaches to solve problems better.", icon: "Lightbulb", order: 1 },
    { title: "Integrity", description: "We are honest, transparent and accountable in everything we do.", icon: "ShieldCheck", order: 2 },
    { title: "Excellence", description: "We hold ourselves to the highest standards in code, design and service.", icon: "Award", order: 3 },
    { title: "Collaboration", description: "We work as an extension of your team, not just an external vendor.", icon: "Users", order: 4 },
    { title: "Client Focus", description: "Your success is our success. Every decision starts with your goals.", icon: "Heart", order: 5 },
    { title: "Continuous Learning", description: "Technology evolves fast, and so do we. We invest in growing our expertise.", icon: "BookOpen", order: 6 },
];

const lifeAtCompany = [
    { title: "Collaborative Culture", description: "We believe great products are built by teams that communicate openly. No silos, no egos — just people working together toward a shared goal.", icon: "Users", order: 1 },
    { title: "Continuous Learning", description: "Technology evolves fast and so do we. Weekly tech talks, conference budgets and dedicated learning time keep our team sharp.", icon: "BookOpen", order: 2 },
    { title: "Work-Life Balance", description: "We trust our team to manage their time. Flexible hours, remote options and respect for personal time are not perks — they are standard.", icon: "Heart", order: 3 },
    { title: "Innovation Time", description: "Every team member gets dedicated time to explore new technologies, build side projects and contribute to open source.", icon: "Lightbulb", order: 4 },
];

async function seed() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to DB");

        // Clear existing
        await Stat.deleteMany();
        await ProcessStep.deleteMany();
        await CoreValue.deleteMany();
        await LifeAtCompany.deleteMany();

        // Seed
        await Stat.insertMany(stats);
        await ProcessStep.insertMany(processSteps);
        await CoreValue.insertMany(coreValues);
        await LifeAtCompany.insertMany(lifeAtCompany);

        console.log("Successfully seeded 4 collections!");
        process.exit(0);
    } catch (err) {
        console.error("Error seeding:", err);
        process.exit(1);
    }
}

seed();
