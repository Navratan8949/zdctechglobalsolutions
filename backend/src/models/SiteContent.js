const mongoose = require("mongoose");

const siteContentSchema = new mongoose.Schema(
    {
        name: { type: String, default: "ZDC Tech Global Solutions" },
        logo: {
            public_id: { type: String, default: "" },
            url: { type: String, default: "" }
        },
        logoText: {
            public_id: { type: String, default: "" },
            url: { type: String, default: "" }
        },
        tagline: { type: String, default: "Build Digital Solutions That Move Your Business Forward" },
        email: { type: String, default: "zdctechglobalsolutions@gmail.com" },
        phone: { type: String, default: "+91 7073551862" },
        headOffice: { type: String, default: "Jaipur, Rajasthan, India" },
        branchOffice: { type: String, default: "D. P. Road, Near New Nagar Parishad Office, Deulgaon Raja, Tq. Deulgaon Raja, Dist. Buldhana, Maharashtra - 443204" },
        branchOffices: {
            type: [String],
            default: ["D. P. Road, Near New Nagar Parishad Office, Deulgaon Raja, Tq. Deulgaon Raja, Dist. Buldhana, Maharashtra - 443204"]
        },
        hours: { type: String, default: "Monday - Friday: 9:00 AM - 6:00 PM (IST)" },
        socials: {
            facebook: { type: String, default: "#" },
            linkedin: { type: String, default: "#" },
            twitter: { type: String, default: "#" },
            github: { type: String, default: "#" },
            instagram: { type: String, default: "#" },
            whatsapp: { type: String, default: "" },
        },
        heroHeading: { type: String, default: "WELCOME TO THE" },
        heroWords: { type: String, default: "ZDC TECH, DIGITAL GROWTH, SMART SOLUTIONS, NEW HORIZONS" },
        heroDescription: { type: String, default: "We design and build world-class websites, mobile apps, and custom software that moves your business forward — fast, secure, and highly scalable." },
        about: {
            image: {
                public_id: { type: String, default: "" },
                url: { type: String, default: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop" }
            },
            badgeNumber: { type: String, default: "20+" },
            badgeText: { type: String, default: "Expert Professionals" },
            eyebrow: { type: String, default: "WHO WE ARE" },
            title: { type: String, default: "A Technology Company Built on Trust and Excellence" },
            description1: { type: String, default: "ZDC Tech Global Solutions was founded with a simple belief: technology should solve real problems, not create new ones. Since 2019, we have been helping businesses across industries leverage digital solutions to streamline operations, reach more customers, and grow faster." },
            description2: { type: String, default: "What started as a small team of passionate engineers has grown into a full-service technology company with expertise across web, mobile, software, and cloud. We have delivered over 100 projects for more than 50 clients, from startups to enterprises." },
            highlights: {
                type: [String],
                default: [
                    "Transparent communication at every step",
                    "Solutions aligned with your business goals",
                    "Long-term partnerships built on quality"
                ]
            },
            missionTitle: { type: String, default: "Our Mission" },
            missionDescription: { type: String, default: "To empower businesses with innovative digital solutions that drive growth, efficiency and competitive advantage. We exist to turn complex problems into elegant software that people love to use." },
            missionIcon: { type: String, default: "Rocket" },
            visionTitle: { type: String, default: "Our Vision" },
            visionDescription: { type: String, default: "To be the most trusted technology partner for businesses worldwide, recognized for engineering excellence, honest partnerships and solutions that stand the test of time." },
            visionIcon: { type: String, default: "TrendingUp" }
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("SiteContent", siteContentSchema);
