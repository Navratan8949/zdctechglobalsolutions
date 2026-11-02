const Demo = require("../models/Demo");

const defaultDemos = [
    {
        title: "Multi-Vendor E-Commerce Platform",
        demoType: "E-Commerce Marketplace",
        description: "Full-scale online store featuring multi-vendor catalog, cart, checkout, payment gateway integration, and order management dashboard.",
        image: {
            public_id: "",
            url: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=1200&q=80"
        },
        liveUrl: "https://demo-ecommerce.zdctechglobalsolutions.com",
        credentials: [
            {
                role: "Super Admin",
                username: "admin@zdc.com",
                password: "Admin@2026",
                notes: "Storewide controls, payouts & settings"
            },
            {
                role: "Customer / Buyer",
                username: "customer@zdc.com",
                password: "Customer@2026",
                notes: "Front-end buyer experience & orders"
            }
        ],
        order: 1,
        isActive: true
    },
    {
        title: "Enterprise Cloud ERP Suite",
        demoType: "ERP & Accounting",
        description: "Integrated business management suite covering finance, ledger accounts, inventory warehouse stock, and automated billing.",
        image: {
            public_id: "",
            url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80"
        },
        liveUrl: "https://demo-erp.zdctechglobalsolutions.com",
        credentials: [
            {
                role: "Finance Director",
                username: "finance@zdc.com",
                password: "Finance@2026",
                notes: "P&L access & financial reports"
            },
            {
                role: "Warehouse Manager",
                username: "warehouse@zdc.com",
                password: "Stock@2026",
                notes: "Stock allocation & purchase orders"
            }
        ],
        order: 2,
        isActive: true
    },
    {
        title: "Hospital & Healthcare Management Portal",
        demoType: "Healthcare Portal",
        description: "Clinical management system with doctor appointment booking, patient health records (EHR), OPD queues, and pharmacy billing.",
        image: {
            public_id: "",
            url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80"
        },
        liveUrl: "https://demo-medicare.zdctechglobalsolutions.com",
        credentials: [
            {
                role: "Doctor",
                username: "doctor@zdc.com",
                password: "Doctor@2026",
                notes: "Patient records & digital prescriptions"
            },
            {
                role: "Reception / Billing",
                username: "reception@zdc.com",
                password: "Clinic@2026",
                notes: "Token queue & billing desk"
            }
        ],
        order: 3,
        isActive: true
    },
    {
        title: "HRMS & Global Payroll Hub",
        demoType: "HR & Payroll",
        description: "Workforce software that automates monthly salaries, attendance clocking, leave requests, appraisals, and employee self-service.",
        image: {
            public_id: "",
            url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80"
        },
        liveUrl: "https://demo-hrms.zdctechglobalsolutions.com",
        credentials: [
            {
                role: "HR Administrator",
                username: "hrmanager@zdc.com",
                password: "HrAdmin@2026",
                notes: "Payroll run & employee management"
            },
            {
                role: "Employee",
                username: "john.doe@zdc.com",
                password: "Employee@2026",
                notes: "Leave requests & payslip downloads"
            }
        ],
        order: 4,
        isActive: true
    },
    {
        title: "School & University Campus LMS",
        demoType: "EdTech & Education",
        description: "Academic administration portal with student admission, examination grading, fee collection, timetables, and teacher/parent access.",
        image: {
            public_id: "",
            url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80"
        },
        liveUrl: "https://demo-educampus.zdctechglobalsolutions.com",
        credentials: [
            {
                role: "Principal / Admin",
                username: "principal@zdc.com",
                password: "Campus@2026",
                notes: "Academic administration & fee reports"
            },
            {
                role: "Teacher / Faculty",
                username: "teacher@zdc.com",
                password: "Class@2026",
                notes: "Attendance & grading"
            }
        ],
        order: 5,
        isActive: true
    },
    {
        title: "Intelligent Sales CRM & Lead Pipeline",
        demoType: "CRM & Sales",
        description: "Customer relationship management system featuring lead Kanban boards, automated WhatsApp follow-ups, and sales team KPI tracking.",
        image: {
            public_id: "",
            url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80"
        },
        liveUrl: "https://demo-crm.zdctechglobalsolutions.com",
        credentials: [
            {
                role: "Sales Head",
                username: "saleshead@zdc.com",
                password: "Sales@2026",
                notes: "Pipeline revenue & team KPIs"
            },
            {
                role: "Sales Executive",
                username: "rep@zdc.com",
                password: "Pipeline@2026",
                notes: "Assigned leads & call logs"
            }
        ],
        order: 6,
        isActive: true
    }
];

const normalizeDemoPayload = (body) => {
    delete body._id;
    delete body.__v;
    delete body.createdAt;
    delete body.updatedAt;

    if (typeof body.image === "string") {
        body.image = { public_id: "", url: body.image.trim() };
    } else if (body.image && typeof body.image === "object") {
        body.image = {
            public_id: (body.image.public_id || "").trim(),
            url: (body.image.url || body.image.secure_url || "").trim()
        };
    }

    if (Array.isArray(body.credentials)) {
        body.credentials = body.credentials
            .map((c) => {
                if (!c || typeof c !== "object") return null;
                return {
                    role: (c.role || "Admin").trim(),
                    username: (c.username || "").trim(),
                    password: (c.password || "").trim(),
                    notes: (c.notes || "").trim()
                };
            })
            .filter((c) => c && (c.username || c.password || c.role));
    }
};

const ensureInitialSeed = async () => {
    try {
        const count = await Demo.countDocuments();
        if (count === 0) {
            await Demo.insertMany(defaultDemos);
        }
    } catch (err) {
        console.error("Demo seeding check error:", err.message);
    }
};

// Public Read All
exports.getAll = async (req, res) => {
    try {
        await ensureInitialSeed();
        const { search, demoType } = req.query;
        const filter = { isActive: true };

        if (demoType && demoType !== "All") {
            filter.demoType = demoType;
        }

        if (search && search.trim() !== "") {
            const regex = new RegExp(search.trim(), "i");
            filter.$or = [
                { title: regex },
                { description: regex },
                { demoType: regex },
                { liveUrl: regex }
            ];
        }

        const items = await Demo.find(filter).sort({ order: 1, createdAt: -1 });
        res.status(200).json({ success: true, count: items.length, data: items });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Admin Read All (Includes inactive)
exports.getAllAdmin = async (req, res) => {
    try {
        await ensureInitialSeed();
        const items = await Demo.find().sort({ order: 1, createdAt: -1 });
        res.status(200).json({ success: true, count: items.length, data: items });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Read One by ID
exports.getOne = async (req, res) => {
    try {
        const item = await Demo.findById(req.params.id);
        if (!item) return res.status(404).json({ success: false, message: "Demo not found" });
        res.status(200).json({ success: true, data: item });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Admin Create
exports.create = async (req, res) => {
    try {
        normalizeDemoPayload(req.body);

        if (!req.body.title || !req.body.title.trim()) {
            return res.status(400).json({ success: false, message: "Title is required" });
        }
        if (!req.body.description || !req.body.description.trim()) {
            return res.status(400).json({ success: false, message: "Description is required" });
        }
        if (!req.body.liveUrl || !req.body.liveUrl.trim()) {
            return res.status(400).json({ success: false, message: "Live Demo URL is required" });
        }

        const item = await Demo.create(req.body);
        res.status(201).json({ success: true, data: item });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Admin Update
exports.update = async (req, res) => {
    try {
        normalizeDemoPayload(req.body);
        const item = await Demo.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!item) return res.status(404).json({ success: false, message: "Demo not found" });
        res.status(200).json({ success: true, data: item });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Admin Delete
exports.delete = async (req, res) => {
    try {
        const item = await Demo.findByIdAndDelete(req.params.id);
        if (!item) return res.status(404).json({ success: false, message: "Demo not found" });
        res.status(200).json({ success: true, message: "Demo deleted successfully" });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Admin Seed Defaults
exports.seedDefaults = async (req, res) => {
    try {
        await Demo.deleteMany({});
        const items = await Demo.insertMany(defaultDemos);
        res.status(200).json({ success: true, message: "Seeded default demos", count: items.length, data: items });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
