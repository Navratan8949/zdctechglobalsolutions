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
    return docObj;
};

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
