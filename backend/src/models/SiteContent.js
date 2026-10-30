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
        clientsPage: {
            hero: {
                eyebrow: { type: String, default: "Our Clients" },
                title: { type: String, default: "Trusted by Innovative Companies Worldwide" },
                description: { type: String, default: "We partner with startups, growing brands, and established enterprises to design, engineer, and scale high-performance digital products." },
                image: {
                    public_id: { type: String, default: "" },
                    url: { type: String, default: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80" }
                },
                badgeNumber: { type: String, default: "98%" },
                badgeText: { type: String, default: "Client Retention Rate" },
                ratingText: { type: String, default: "5.0 ★ Rated Across 50+ Global Clients" },
                primaryCtaText: { type: String, default: "Become a Client Partner" },
                primaryCtaLink: { type: String, default: "/contact" },
                secondaryCtaText: { type: String, default: "Explore Case Studies" },
                secondaryCtaLink: { type: String, default: "/case-studies" },
                highlights: {
                    type: [String],
                    default: [
                        "100% IP & Source Code Ownership Transferred",
                        "Strict NDAs Executed Before Technical Discovery",
                        "Direct Collaboration with Senior Tech Leads",
                        "Guaranteed 99.99% Cloud Architecture SLA"
                    ]
                },
                stats: [
                    { value: { type: String, default: "100+" }, label: { type: String, default: "Enterprise Deliveries" } },
                    { value: { type: String, default: "50+" }, label: { type: String, default: "Global Brand Partners" } },
                    { value: { type: String, default: "12+" }, label: { type: String, default: "Countries Served" } },
                    { value: { type: String, default: "98%" }, label: { type: String, default: "Client Satisfaction" } }
                ]
            },
            partnerships: {
                eyebrow: { type: String, default: "Partnerships" },
                title: { type: String, default: "Global Footprint" },
                description: { type: String, default: "Our engineering solutions power organizations across diverse sectors and global markets." },
                subheading: { type: String, default: "Trusted by 100K+ Clients Worldwide" }
            },
            engagementModels: {
                eyebrow: { type: String, default: "ENGAGEMENT MODELS" },
                title: { type: String, default: "Flexible Ways We Work Together" },
                description: { type: String, default: "Every organization has unique operational workflows. We tailor our collaboration model to match your specific timeline, team structure, and delivery goals." },
                models: [
                    {
                        icon: { type: String, default: "Users" },
                        title: { type: String, default: "Dedicated Engineering Teams" },
                        description: { type: String, default: "Seamlessly extend your internal development capabilities with dedicated full-stack engineers, UI/UX designers, and QA specialists who work exclusively on your product roadmap." }
                    },
                    {
                        icon: { type: String, default: "Code2" },
                        title: { type: String, default: "End-to-End Product Delivery" },
                        description: { type: String, default: "From discovery and technical architecture to deployment and monitoring, we take full ownership of designing, building, and launching your digital platform on schedule." }
                    },
                    {
                        icon: { type: String, default: "ShieldCheck" },
                        title: { type: String, default: "Enterprise Technical Consulting" },
                        description: { type: String, default: "Get strategic guidance on software architecture, performance optimization, cloud infrastructure scalability, and security audits from experienced senior engineers." }
                    },
                    {
                        icon: { type: String, default: "Headphones" },
                        title: { type: String, default: "Ongoing Support & SLA Management" },
                        description: { type: String, default: "Keep your production systems secure, updated, and highly responsive with round-the-clock monitoring, routine maintenance, and dedicated technical support." }
                    }
                ]
            },
            domainExpertise: {
                eyebrow: { type: String, default: "DOMAIN EXPERTISE" },
                title: { type: String, default: "Industries We Transform" },
                description: { type: String, default: "Our engineering teams bring deep technical knowledge combined with practical domain understanding to build purpose-built software." },
                industries: [
                    {
                        title: { type: String, default: "Healthcare & Life Sciences" },
                        description: { type: String, default: "HIPAA-compliant hospital management, patient portals, appointment scheduling, and electronic health record systems." }
                    },
                    {
                        title: { type: String, default: "E-Commerce & Retail" },
                        description: { type: String, default: "High-conversion multi-vendor marketplaces, custom checkout flows, inventory automation, and payment gateway integrations." }
                    },
                    {
                        title: { type: String, default: "Finance & Banking" },
                        description: { type: String, default: "Secure customer dashboards, real-time transaction tracking, compliance-ready financial portals, and automated reporting." }
                    },
                    {
                        title: { type: String, default: "Education & EdTech" },
                        description: { type: String, default: "Student learning management systems, parent communication apps, digital attendance, and multi-campus administrative software." }
                    },
                    {
                        title: { type: String, default: "Logistics & Supply Chain" },
                        description: { type: String, default: "Live order tracking, fleet management dashboards, automated dispatch routing, and warehouse inventory systems." }
                    },
                    {
                        title: { type: String, default: "Enterprise SaaS & Cloud" },
                        description: { type: String, default: "Multi-tenant cloud platforms, subscription billing, CRM automation, and high-performance microservices architecture." }
                    }
                ]
            },
            trustAndSecurity: {
                eyebrow: { type: String, default: "TRUST & SECURITY" },
                title: { type: String, default: "Our Commitment to Every Client Partner" },
                description: { type: String, default: "Building long-term client relationships requires more than clean code. We maintain rigorous standards for confidentiality, security compliance, and transparent delivery throughout every stage of the project lifecycle." },
                standards: {
                    type: [String],
                    default: [
                        "Complete intellectual property (IP) and source code ownership transferred to the client upon milestone delivery.",
                        "Comprehensive Non-Disclosure Agreements (NDAs) signed before technical discovery and requirement analysis.",
                        "Bi-weekly agile sprint demos, sprint retrospectives, and direct communication with project leads.",
                        "Automated CI/CD pipelines, code reviews, and comprehensive regression test suites for every deployment."
                    ]
                },
                cardTitle: { type: String, default: "Explore Case Studies & Results" },
                cardDescription: { type: String, default: "Review real-world architectures and measurable outcomes from our recent client engagements across healthcare, e-commerce, and enterprise management." },
                caseStudiesText: { type: String, default: "View Case Studies" },
                caseStudiesLink: { type: String, default: "/case-studies" },
                portfolioText: { type: String, default: "Browse Portfolio" },
                portfolioLink: { type: String, default: "/portfolio" }
            }
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("SiteContent", siteContentSchema);
