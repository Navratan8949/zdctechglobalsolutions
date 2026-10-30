const SiteContent = require("../models/SiteContent");

const defaultAbout = {
    image: {
        public_id: "",
        url: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
    },
    badgeNumber: "20+",
    badgeText: "Expert Professionals",
    eyebrow: "WHO WE ARE",
    title: "A Technology Company Built on Trust and Excellence",
    description1: "ZDC Tech Global Solutions was founded with a simple belief: technology should solve real problems, not create new ones. Since 2019, we have been helping businesses across industries leverage digital solutions to streamline operations, reach more customers, and grow faster.",
    description2: "What started as a small team of passionate engineers has grown into a full-service technology company with expertise across web, mobile, software, and cloud. We have delivered over 100 projects for more than 50 clients, from startups to enterprises.",
    highlights: [
        "Transparent communication at every step",
        "Solutions aligned with your business goals",
        "Long-term partnerships built on quality"
    ],
    missionTitle: "Our Mission",
    missionDescription: "To empower businesses with innovative digital solutions that drive growth, efficiency and competitive advantage. We exist to turn complex problems into elegant software that people love to use.",
    missionIcon: "Rocket",
    visionTitle: "Our Vision",
    visionDescription: "To be the most trusted technology partner for businesses worldwide, recognized for engineering excellence, honest partnerships and solutions that stand the test of time.",
    visionIcon: "TrendingUp"
};

const defaultClientsPage = {
    hero: {
        eyebrow: "Our Clients",
        title: "Trusted by Innovative Companies Worldwide",
        description: "We partner with startups, growing brands, and established enterprises to design, engineer, and scale high-performance digital products.",
        image: {
            public_id: "",
            url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
        },
        badgeNumber: "98%",
        badgeText: "Client Retention Rate",
        ratingText: "5.0 ★ Rated Across 50+ Global Clients",
        primaryCtaText: "Become a Client Partner",
        primaryCtaLink: "/contact",
        secondaryCtaText: "Explore Case Studies",
        secondaryCtaLink: "/case-studies",
        highlights: [
            "100% IP & Source Code Ownership Transferred",
            "Strict NDAs Executed Before Technical Discovery",
            "Direct Collaboration with Senior Tech Leads",
            "Guaranteed 99.99% Cloud Architecture SLA"
        ],
        stats: [
            { value: "100+", label: "Enterprise Deliveries" },
            { value: "50+", label: "Global Brand Partners" },
            { value: "12+", label: "Countries Served" },
            { value: "98%", label: "Client Satisfaction" }
        ]
    },
    partnerships: {
        eyebrow: "Partnerships",
        title: "Global Footprint",
        description: "Our engineering solutions power organizations across diverse sectors and global markets.",
        subheading: "Trusted by 100K+ Clients Worldwide"
    },
    engagementModels: {
        eyebrow: "ENGAGEMENT MODELS",
        title: "Flexible Ways We Work Together",
        description: "Every organization has unique operational workflows. We tailor our collaboration model to match your specific timeline, team structure, and delivery goals.",
        models: [
            {
                icon: "Users",
                title: "Dedicated Engineering Teams",
                description: "Seamlessly extend your internal development capabilities with dedicated full-stack engineers, UI/UX designers, and QA specialists who work exclusively on your product roadmap."
            },
            {
                icon: "Code2",
                title: "End-to-End Product Delivery",
                description: "From discovery and technical architecture to deployment and monitoring, we take full ownership of designing, building, and launching your digital platform on schedule."
            },
            {
                icon: "ShieldCheck",
                title: "Enterprise Technical Consulting",
                description: "Get strategic guidance on software architecture, performance optimization, cloud infrastructure scalability, and security audits from experienced senior engineers."
            },
            {
                icon: "Headphones",
                title: "Ongoing Support & SLA Management",
                description: "Keep your production systems secure, updated, and highly responsive with round-the-clock monitoring, routine maintenance, and dedicated technical support."
            }
        ]
    },
    domainExpertise: {
        eyebrow: "DOMAIN EXPERTISE",
        title: "Industries We Transform",
        description: "Our engineering teams bring deep technical knowledge combined with practical domain understanding to build purpose-built software.",
        industries: [
            {
                title: "Healthcare & Life Sciences",
                description: "HIPAA-compliant hospital management, patient portals, appointment scheduling, and electronic health record systems."
            },
            {
                title: "E-Commerce & Retail",
                description: "High-conversion multi-vendor marketplaces, custom checkout flows, inventory automation, and payment gateway integrations."
            },
            {
                title: "Finance & Banking",
                description: "Secure customer dashboards, real-time transaction tracking, compliance-ready financial portals, and automated reporting."
            },
            {
                title: "Education & EdTech",
                description: "Student learning management systems, parent communication apps, digital attendance, and multi-campus administrative software."
            },
            {
                title: "Logistics & Supply Chain",
                description: "Live order tracking, fleet management dashboards, automated dispatch routing, and warehouse inventory systems."
            },
            {
                title: "Enterprise SaaS & Cloud",
                description: "Multi-tenant cloud platforms, subscription billing, CRM automation, and high-performance microservices architecture."
            }
        ]
    },
    trustAndSecurity: {
        eyebrow: "TRUST & SECURITY",
        title: "Our Commitment to Every Client Partner",
        description: "Building long-term client relationships requires more than clean code. We maintain rigorous standards for confidentiality, security compliance, and transparent delivery throughout every stage of the project lifecycle.",
        standards: [
            "Complete intellectual property (IP) and source code ownership transferred to the client upon milestone delivery.",
            "Comprehensive Non-Disclosure Agreements (NDAs) signed before technical discovery and requirement analysis.",
            "Bi-weekly agile sprint demos, sprint retrospectives, and direct communication with project leads.",
            "Automated CI/CD pipelines, code reviews, and comprehensive regression test suites for every deployment."
        ],
        cardTitle: "Explore Case Studies & Results",
        cardDescription: "Review real-world architectures and measurable outcomes from our recent client engagements across healthcare, e-commerce, and enterprise management.",
        caseStudiesText: "View Case Studies",
        caseStudiesLink: "/case-studies",
        portfolioText: "Browse Portfolio",
        portfolioLink: "/portfolio"
    }
};

const normalizeClientsPageDoc = (clientsPage = {}) => {
    const raw = clientsPage || {};
    const rawHero = raw.hero || {};
    const rawHeroImage = rawHero.image || {};
    const heroImageUrl = typeof rawHeroImage === "string" && rawHeroImage.trim() !== ""
        ? rawHeroImage.trim()
        : (typeof rawHeroImage.url === "string" && rawHeroImage.url.trim() !== "" ? rawHeroImage.url.trim() : defaultClientsPage.hero.image.url);

    return {
        hero: {
            ...defaultClientsPage.hero,
            ...rawHero,
            image: {
                public_id: typeof rawHeroImage.public_id === "string" ? rawHeroImage.public_id.trim() : "",
                url: heroImageUrl
            },
            highlights: Array.isArray(rawHero.highlights) && rawHero.highlights.length > 0
                ? rawHero.highlights
                : defaultClientsPage.hero.highlights,
            stats: Array.isArray(rawHero.stats) && rawHero.stats.length > 0
                ? rawHero.stats
                : defaultClientsPage.hero.stats
        },
        partnerships: {
            ...defaultClientsPage.partnerships,
            ...(raw.partnerships || {})
        },
        engagementModels: {
            ...defaultClientsPage.engagementModels,
            ...(raw.engagementModels || {}),
            models: Array.isArray(raw.engagementModels?.models) && raw.engagementModels.models.length > 0
                ? raw.engagementModels.models
                : defaultClientsPage.engagementModels.models
        },
        domainExpertise: {
            ...defaultClientsPage.domainExpertise,
            ...(raw.domainExpertise || {}),
            industries: Array.isArray(raw.domainExpertise?.industries) && raw.domainExpertise.industries.length > 0
                ? raw.domainExpertise.industries
                : defaultClientsPage.domainExpertise.industries
        },
        trustAndSecurity: {
            ...defaultClientsPage.trustAndSecurity,
            ...(raw.trustAndSecurity || {}),
            standards: Array.isArray(raw.trustAndSecurity?.standards) && raw.trustAndSecurity.standards.length > 0
                ? raw.trustAndSecurity.standards
                : defaultClientsPage.trustAndSecurity.standards
        }
    };
};

const normalizeSiteContentPayload = (body) => {
    delete body._id;
    delete body.__v;
    delete body.createdAt;
    delete body.updatedAt;

    if (Array.isArray(body.branchOffices)) {
        const cleaned = body.branchOffices
            .map((b) => (typeof b === "string" ? b.trim() : ""))
            .filter(Boolean);
        body.branchOffices = cleaned;
        body.branchOffice = cleaned[0] || "";
    } else if (body.branchOffice && typeof body.branchOffice === "string") {
        body.branchOffices = [body.branchOffice.trim()];
    }

    if (body.about) {
        if (typeof body.about.image === "string") {
            body.about.image = { public_id: "", url: body.about.image.trim() };
        } else if (body.about.image && typeof body.about.image === "object") {
            body.about.image = {
                public_id: typeof body.about.image.public_id === "string" ? body.about.image.public_id.trim() : "",
                url: typeof body.about.image.url === "string" ? body.about.image.url.trim() : (body.about.image.secure_url || "").trim()
            };
        }
        if (Array.isArray(body.about.highlights)) {
            body.about.highlights = body.about.highlights
                .map((h) => (typeof h === "string" ? h.trim() : ""))
                .filter(Boolean);
        }
    }
};

const normalizeSiteContentDoc = (doc) => {
    if (!doc) return doc;
    const docObj = doc.toObject ? doc.toObject() : doc;
    if ((!docObj.branchOffices || docObj.branchOffices.length === 0) && docObj.branchOffice) {
        docObj.branchOffices = [docObj.branchOffice];
    }
    const savedAbout = docObj.about || {};
    
    let imageUrl = defaultAbout.image.url;
    let publicId = "";
    if (typeof savedAbout.image === "string" && savedAbout.image.trim() !== "") {
        imageUrl = savedAbout.image.trim();
    } else if (savedAbout.image && typeof savedAbout.image === "object") {
        const rawUrl = savedAbout.image.url || savedAbout.image.secure_url;
        if (typeof rawUrl === "string" && rawUrl.trim() !== "") {
            imageUrl = rawUrl.trim();
        }
        if (typeof savedAbout.image.public_id === "string") {
            publicId = savedAbout.image.public_id.trim();
        }
    }

    docObj.about = {
        ...defaultAbout,
        ...savedAbout,
        image: {
            public_id: publicId,
            url: imageUrl
        },
        highlights: (Array.isArray(savedAbout.highlights) && savedAbout.highlights.length > 0)
            ? savedAbout.highlights
            : defaultAbout.highlights
    };

    docObj.clientsPage = normalizeClientsPageDoc(docObj.clientsPage);

    return docObj;
};

exports.defaultClientsPage = defaultClientsPage;
exports.normalizeClientsPageDoc = normalizeClientsPageDoc;

// Create
exports.create = async (req, res) => {
    try {
        normalizeSiteContentPayload(req.body);
        const item = await SiteContent.create(req.body);
        res.status(201).json({ success: true, data: normalizeSiteContentDoc(item) });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Read all
exports.getAll = async (req, res) => {
    try {
        const items = await SiteContent.find().sort({ createdAt: -1 });
        const data = items.map((item) => normalizeSiteContentDoc(item));
        res.status(200).json({ success: true, data });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.getCurrent = async (req, res) => {
    try {
        let item = await SiteContent.findOne().sort({ createdAt: -1 });
        if (!item) item = await SiteContent.create({});
        res.status(200).json({ success: true, data: normalizeSiteContentDoc(item) });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Read one
exports.getOne = async (req, res) => {
    try {
        const item = await SiteContent.findById(req.params.id);
        if (!item) return res.status(404).json({ success: false, message: 'Not found' });
        res.status(200).json({ success: true, data: normalizeSiteContentDoc(item) });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Update
exports.update = async (req, res) => {
    try {
        normalizeSiteContentPayload(req.body);
        const item = await SiteContent.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!item) return res.status(404).json({ success: false, message: 'Not found' });
        res.status(200).json({ success: true, data: normalizeSiteContentDoc(item) });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Delete
exports.delete = async (req, res) => {
    try {
        const item = await SiteContent.findByIdAndDelete(req.params.id);
        if (!item) return res.status(404).json({ success: false, message: 'Not found' });
        res.status(200).json({ success: true, message: 'Deleted successfully' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
