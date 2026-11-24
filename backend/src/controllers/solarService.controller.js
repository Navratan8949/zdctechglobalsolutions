const SolarService = require("../models/SolarService");

const defaultSolarServices = [
    {
        title: "Residential Rooftop Solar",
        slug: "residential-rooftop-solar",
        category: "Residential Solar",
        badge: "1 kW - 10 kW",
        capacity: "1 kW - 10 kW",
        shortDescription:
            "Ideal for independent houses, villas, and residential societies. Eliminate electricity bills and claim up to ₹78,000 direct subsidy under PM Surya Ghar Muft Bijli Yojana.",
        fullDescription:
            "Turn your home rooftop into a green power plant. Complete turnkey installation including shadow analysis, DISCOM net-metering approvals, Tier-1 bi-facial or mono PERC panels, and 25-year performance warranty.",
        image: {
            public_id: "",
            url: "https://images.unsplash.com/photo-1545208942-e1c9c916524b?auto=format&fit=crop&w=1000&q=80",
        },
        fee: "Starting from ₹50,000 / kW",
        subsidy: "Up to ₹78,000 (PM Surya Ghar)",
        features: [
            "Reduces domestic bills by 80% to 90%",
            "Net Metering with state DISCOM",
            "Direct bank subsidy transfer (DBT)",
            "High efficiency Mono PERC & TopCon panels",
        ],
        popular: true,
        order: 1,
        isActive: true,
    },
    {
        title: "Commercial & Industrial (C&I)",
        slug: "commercial-industrial-solar",
        category: "Commercial & Industrial",
        badge: "10 kW - 500 kW+",
        capacity: "10 kW - 500 kW+",
        shortDescription:
            "Tailored for factories, warehouses, schools, hospitals, shopping malls, and office complexes facing high commercial tariff rates of ₹9 - ₹12/unit.",
        fullDescription:
            "High-capacity industrial rooftop and tin-shed solar solutions engineered to slash operational electricity expenses and take advantage of 40% accelerated depreciation tax savings.",
        image: {
            public_id: "",
            url: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1000&q=80",
        },
        fee: "Custom Project Quote",
        subsidy: "40% Accelerated Depreciation Benefit",
        features: [
            "Cut peak commercial electricity tariff",
            "40% Accelerated Depreciation tax benefit",
            "Elevated tin-shed / RCC custom mounting",
            "Remote IoT generation monitoring",
        ],
        popular: true,
        order: 2,
        isActive: true,
    },
    {
        title: "Solar Maintenance & AMC",
        slug: "solar-maintenance-amc",
        category: "Solar Maintenance & AMC",
        badge: "Annual AMC",
        capacity: "Annual Service",
        shortDescription:
            "Keep your panels generating maximum power throughout the year. Dust and residue can drop power generation by 20% to 35% without regular cleaning.",
        fullDescription:
            "Comprehensive Operations and Maintenance (O&M) contracts covering bi-weekly demineralized water cleaning, inverter diagnostic testing, structure torque verification, and emergency breakdown support.",
        image: {
            public_id: "",
            url: "https://images.unsplash.com/photo-1558449028-b53a39d100fc?auto=format&fit=crop&w=1000&q=80",
        },
        fee: "Starting from ₹3,499 / year",
        subsidy: "Guaranteed 98% Plant Uptime",
        features: [
            "Scheduled de-mineralized water cleaning",
            "Inverter health & string voltage diagnostics",
            "Structure torque & cabling thermal inspection",
            "Fast breakdown troubleshooting & repair",
        ],
        popular: false,
        order: 3,
        isActive: true,
    },
];

// Public: Get all active solar services
exports.getAll = async (req, res) => {
    try {
        const { category } = req.query;
        const filter = { isActive: true };
        if (category && category !== "All") {
            filter.category = category;
        }

        let services = await SolarService.find(filter).sort({ order: 1, createdAt: 1 });

        // If no services in database yet, seed defaults automatically
        if (services.length === 0 && (!category || category === "All")) {
            await SolarService.insertMany(defaultSolarServices);
            services = await SolarService.find(filter).sort({ order: 1, createdAt: 1 });
        }

        res.status(200).json({
            success: true,
            message: "Solar services fetched successfully",
            data: services,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Failed to fetch solar services",
        });
    }
};

// Public: Get single solar service by slug
exports.getBySlug = async (req, res) => {
    try {
        const { slug } = req.params;
        const service = await SolarService.findOne({ slug, isActive: true });
        if (!service) {
            return res.status(404).json({
                success: false,
                message: "Solar service not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Solar service fetched successfully",
            data: service,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Failed to fetch solar service",
        });
    }
};

// Admin: Get all solar services (including inactive)
exports.getAllAdmin = async (req, res) => {
    try {
        const { category, search } = req.query;
        const filter = {};

        if (category && category !== "All") {
            filter.category = category;
        }

        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: "i" } },
                { shortDescription: { $regex: search, $options: "i" } },
                { badge: { $regex: search, $options: "i" } },
            ];
        }

        let services = await SolarService.find(filter).sort({ order: 1, createdAt: -1 });

        // If empty on first admin view, seed defaults
        if (services.length === 0 && !search && (!category || category === "All")) {
            await SolarService.insertMany(defaultSolarServices);
            services = await SolarService.find(filter).sort({ order: 1, createdAt: -1 });
        }

        res.status(200).json({
            success: true,
            message: "All solar services fetched successfully",
            data: services,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Failed to fetch solar services for admin",
        });
    }
};

// Admin: Get single by ID
exports.getOne = async (req, res) => {
    try {
        const { id } = req.params;
        const service = await SolarService.findById(id);
        if (!service) {
            return res.status(404).json({
                success: false,
                message: "Solar service not found",
            });
        }
        res.status(200).json({
            success: true,
            data: service,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Failed to fetch solar service",
        });
    }
};

// Admin: Create solar service
exports.create = async (req, res) => {
    try {
        const data = req.body;
        if (!data.slug && data.title) {
            data.slug = data.title
                .toLowerCase()
                .trim()
                .replace(/[^\w\s-]/g, "")
                .replace(/[\s_-]+/g, "-")
                .replace(/^-+|-+$/g, "");
        }

        const existing = await SolarService.findOne({ slug: data.slug });
        if (existing) {
            data.slug = `${data.slug}-${Date.now().toString().slice(-4)}`;
        }

        const newService = await SolarService.create(data);
        res.status(201).json({
            success: true,
            message: "Solar service created successfully",
            data: newService,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message || "Failed to create solar service",
        });
    }
};

// Admin: Update solar service
exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await SolarService.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!updated) {
            return res.status(404).json({
                success: false,
                message: "Solar service not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Solar service updated successfully",
            data: updated,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message || "Failed to update solar service",
        });
    }
};

// Admin: Delete solar service
exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await SolarService.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: "Solar service not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Solar service deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Failed to delete solar service",
        });
    }
};

// Admin: Seed / Reset defaults
exports.seedDefaults = async (req, res) => {
    try {
        await SolarService.deleteMany({});
        const inserted = await SolarService.insertMany(defaultSolarServices);
        res.status(200).json({
            success: true,
            message: `Seeded ${inserted.length} default solar offerings successfully`,
            data: inserted,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Failed to seed solar offerings",
        });
    }
};
