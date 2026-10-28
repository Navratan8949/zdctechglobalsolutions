const Product = require("../models/Product");

const defaultProducts = [
    {
        title: "ZDC Enterprise One",
        slug: "zdc-enterprise-one",
        tagline: "All-in-one scalable cloud enterprise resource planning suite",
        category: "Enterprise ERP",
        description: "Streamline multi-branch operations, real-time finance, supply chain, automated billing, and inventory tracking with an intuitive, unified cloud dashboard.",
        image: {
            public_id: "",
            url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80"
        },
        badge: "Flagship Suite",
        icon: "Building2",
        features: [
            "Multi-entity financial accounting & automated tax (GST/VAT)",
            "Warehouse management with real-time stock optimization",
            "Automated procurement and vendor management portals",
            "Executive KPI dashboards with predictive revenue forecasting"
        ],
        metrics: "45% Reduction in Admin Overhead",
        deployment: "Cloud-Ready & Customizable",
        ctaText: "Request ERP Demo",
        ctaLink: "/contact?product=zdc-enterprise-one",
        order: 1,
        isActive: true,
        isFeatured: true
    },
    {
        title: "ZDC HRMS & Global Payroll",
        slug: "zdc-hrms-hub",
        tagline: "Next-gen human resources & compliant payroll automation",
        category: "HRMS & Workforce",
        description: "Empower HR teams with biometric attendance sync, automated tax withholding, multi-tier leave approval, performance appraisals, and employee self-service apps.",
        image: {
            public_id: "",
            url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80"
        },
        badge: "Most Popular",
        icon: "Users",
        features: [
            "1-Click automated monthly payroll & encrypted payslip dispatch",
            "Biometric, geo-fence and remote attendance tracking",
            "Quarterly performance reviews, 360° feedback and KPI scoring",
            "Mobile Employee Self-Service (ESS) app for iOS & Android"
        ],
        metrics: "99.8% Payroll Accuracy",
        deployment: "Cloud-Ready & Customizable",
        ctaText: "Explore HRMS",
        ctaLink: "/contact?product=zdc-hrms-hub",
        order: 2,
        isActive: true,
        isFeatured: true
    },
    {
        title: "ZDC Commerce Flow",
        slug: "zdc-commerce-flow",
        tagline: "High-speed headless omni-channel commerce & marketplace engine",
        category: "E-Commerce",
        description: "Engineered for high-volume retail brands, B2B wholesale, and multi-vendor marketplaces with sub-second page loads, custom checkouts, and AI search.",
        image: {
            public_id: "",
            url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80"
        },
        badge: "High Growth",
        icon: "ShoppingCart",
        features: [
            "Headless API-first architecture with Next.js frontend performance",
            "Multi-currency, multi-language and global payment gateway support",
            "Integrated POS synchronization for in-store & digital orders",
            "AI-driven product recommendations & abandoned cart recovery"
        ],
        metrics: "+38% Higher Cart Conversion",
        deployment: "Headless / Cloud Native",
        ctaText: "View Commerce Platform",
        ctaLink: "/contact?product=zdc-commerce-flow",
        order: 3,
        isActive: true,
        isFeatured: true
    },
    {
        title: "ZDC CRM OmniDesk",
        slug: "zdc-crm-omnidesk",
        tagline: "Intelligent lead-to-revenue automation system",
        category: "CRM & Sales",
        description: "Supercharge sales pipelines with WhatsApp CRM integration, automated lead distribution, deal stage analytics, and customer interaction histories in one unified view.",
        image: {
            public_id: "",
            url: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80"
        },
        badge: "Sales Accelerator",
        icon: "TrendingUp",
        features: [
            "Official WhatsApp Business API & automated email outreach sequences",
            "Visual drag-and-drop pipeline stages with win-probability scoring",
            "Instant quotation generator, GST invoicing and digital signature approval",
            "Real-time team activity timeline and call interaction logging"
        ],
        metrics: "3x Faster Lead Response",
        deployment: "Cloud-Ready & Customizable",
        ctaText: "Schedule CRM Demo",
        ctaLink: "/contact?product=zdc-crm-omnidesk",
        order: 4,
        isActive: true,
        isFeatured: false
    },
    {
        title: "ZDC Vision BI & Analytics",
        slug: "zdc-vision-bi",
        tagline: "Instant business intelligence & AI-powered forecasting",
        category: "AI & Analytics",
        description: "Connect your databases, CRMs, and spreadsheets into live, interactive dashboards that forecast revenue trends, highlight operational bottlenecks, and automate weekly reporting.",
        image: {
            public_id: "",
            url: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&q=80"
        },
        badge: "AI-Powered",
        icon: "Cpu",
        features: [
            "Native connectors for PostgreSQL, MongoDB, BigQuery, MySQL and Excel",
            "Natural language AI queries (e.g. 'Show top customers by lifetime value')",
            "Automated scheduled PDF executive summaries delivered to Slack & Email",
            "Granular role-based permissions with encrypted columnar storage"
        ],
        metrics: "Sub-Second Query Engine",
        deployment: "SaaS / Private VPC",
        ctaText: "Try Vision BI",
        ctaLink: "/contact?product=zdc-vision-bi",
        order: 5,
        isActive: true,
        isFeatured: false
    },
    {
        title: "ZDC EduCampus 360",
        slug: "zdc-educampus",
        tagline: "Complete smart campus administration platform",
        category: "EdTech & Education",
        description: "Modern cloud platform for schools, colleges, and training institutes covering online admissions, fee payment gateways, examinations, report cards, and parent notifications.",
        image: {
            public_id: "",
            url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80"
        },
        badge: "Complete Suite",
        icon: "GraduationCap",
        features: [
            "Automated online fee collection with instant WhatsApp & SMS receipts",
            "Student & teacher attendance tracking with biometric/RFID integration",
            "Exam scheduler, grading rubric engine and dynamic report card generator",
            "Dedicated parent portal mobile app with homework & bus tracking updates"
        ],
        metrics: "50,000+ Students Managed",
        deployment: "Cloud-Ready & Customizable",
        ctaText: "Request Campus Demo",
        ctaLink: "/contact?product=zdc-educampus",
        order: 6,
        isActive: true,
        isFeatured: false
    },
    {
        title: "ZDC MediCare Plus",
        slug: "zdc-medicare-plus",
        tagline: "HIPAA-ready clinical management & patient electronic health records",
        category: "Healthcare",
        description: "Secure, compliant medical management software designed for multi-specialty clinics, diagnostic labs, and hospitals to coordinate care and streamline billing.",
        image: {
            public_id: "",
            url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80"
        },
        badge: "Healthcare Grade",
        icon: "HeartPulse",
        features: [
            "Encrypted Electronic Health Records (EHR) & digital prescriptions",
            "Doctor appointment scheduling, token management and telemedicine calls",
            "Pharmacy stock inventory, batch tracking and barcode billing",
            "Insurance claim tracking, TPA desk and cashless hospitalization workflows"
        ],
        metrics: "HIPAA Compliant & Secure",
        deployment: "HIPAA Cloud / On-Premise",
        ctaText: "Book Medical Demo",
        ctaLink: "/contact?product=zdc-medicare-plus",
        order: 7,
        isActive: true,
        isFeatured: false
    },
    {
        title: "ZDC SupportDesk Pro",
        slug: "zdc-supportdesk-pro",
        tagline: "Omnichannel customer support & AI ticketing system",
        category: "CRM & Sales",
        description: "Deliver lightning-fast support with unified ticketing from Email, Chat, WhatsApp, and Web, backed by automated SLA management and an AI knowledge bot.",
        image: {
            public_id: "",
            url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
        },
        badge: "Support Engine",
        icon: "LifeBuoy",
        features: [
            "Unified shared inbox for Email, WhatsApp, Website Chat and Portal forms",
            "Intelligent auto-tagging, priority assignment and SLA breach alerts",
            "Searchable public knowledge base and internal SOP documentation",
            "Customer satisfaction (CSAT) surveys with agent performance metrics"
        ],
        metrics: "70% Faster First Response",
        deployment: "Cloud-Ready & Customizable",
        ctaText: "Explore SupportDesk",
        ctaLink: "/contact?product=zdc-supportdesk-pro",
        order: 8,
        isActive: true,
        isFeatured: false
    }
];

const slugify = (text) => {
    return (text || "")
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, "")
        .replace(/\-\-+/g, "-");
};

const normalizeProductPayload = (body) => {
    delete body._id;
    delete body.__v;
    delete body.createdAt;
    delete body.updatedAt;

    if (!body.slug && body.title) {
        body.slug = slugify(body.title);
    } else if (body.slug) {
        body.slug = slugify(body.slug);
    }

    if (typeof body.image === "string") {
        body.image = { public_id: "", url: body.image.trim() };
    } else if (body.image && typeof body.image === "object") {
        body.image = {
            public_id: (body.image.public_id || "").trim(),
            url: (body.image.url || body.image.secure_url || "").trim()
        };
    }

    if (Array.isArray(body.features)) {
        body.features = body.features
            .map((f) => (typeof f === "string" ? f.trim() : ""))
            .filter(Boolean);
    }
};

const ensureInitialSeed = async () => {
    try {
        const count = await Product.countDocuments();
        if (count === 0) {
            await Product.insertMany(defaultProducts);
        }
    } catch (err) {
        console.error("Product seeding check error:", err.message);
    }
};

// Public Read All
exports.getAll = async (req, res) => {
    try {
        await ensureInitialSeed();
        const { category, search } = req.query;
        const filter = { isActive: true };

        if (category && category !== "All") {
            filter.category = category;
        }

        if (search && search.trim() !== "") {
            const regex = new RegExp(search.trim(), "i");
            filter.$or = [
                { title: regex },
                { tagline: regex },
                { description: regex },
                { category: regex },
                { features: regex }
            ];
        }

        const items = await Product.find(filter).sort({ order: 1, createdAt: -1 });
        res.status(200).json({ success: true, count: items.length, data: items });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Admin Read All (including inactive)
exports.getAllAdmin = async (req, res) => {
    try {
        await ensureInitialSeed();
        const items = await Product.find().sort({ order: 1, createdAt: -1 });
        res.status(200).json({ success: true, count: items.length, data: items });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Public Read One by Slug
exports.getBySlug = async (req, res) => {
    try {
        await ensureInitialSeed();
        const item = await Product.findOne({ slug: req.params.slug });
        if (!item) return res.status(404).json({ success: false, message: "Product not found" });
        res.status(200).json({ success: true, data: item });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Read One by ID
exports.getOne = async (req, res) => {
    try {
        const item = await Product.findById(req.params.id);
        if (!item) return res.status(404).json({ success: false, message: "Product not found" });
        res.status(200).json({ success: true, data: item });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Admin Create
exports.create = async (req, res) => {
    try {
        normalizeProductPayload(req.body);

        if (!req.body.title) {
            return res.status(400).json({ success: false, message: "Title is required" });
        }

        // Ensure unique slug
        let finalSlug = req.body.slug || slugify(req.body.title);
        let existing = await Product.findOne({ slug: finalSlug });
        if (existing) {
            finalSlug = `${finalSlug}-${Date.now().toString().slice(-4)}`;
        }
        req.body.slug = finalSlug;

        const item = await Product.create(req.body);
        res.status(201).json({ success: true, data: item });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Admin Update
exports.update = async (req, res) => {
    try {
        normalizeProductPayload(req.body);
        const item = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!item) return res.status(404).json({ success: false, message: "Product not found" });
        res.status(200).json({ success: true, data: item });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Admin Delete
exports.delete = async (req, res) => {
    try {
        const item = await Product.findByIdAndDelete(req.params.id);
        if (!item) return res.status(404).json({ success: false, message: "Product not found" });
        res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Admin Seed Defaults
exports.seedDefaults = async (req, res) => {
    try {
        await Product.deleteMany({});
        const items = await Product.insertMany(defaultProducts);
        res.status(200).json({ success: true, message: "Seeded default products", count: items.length, data: items });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

