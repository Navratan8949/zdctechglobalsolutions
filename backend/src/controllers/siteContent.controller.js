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
    if (Array.isArray(body.branchOffices)) {
        const cleaned = body.branchOffices
            .map((b) => (typeof b === "string" ? b.trim() : ""))
            .filter(Boolean);
        body.branchOffices = cleaned;
        body.branchOffice = cleaned[0] || "";
    } else if (body.branchOffice && typeof body.branchOffice === "string") {
        body.branchOffices = [body.branchOffice.trim()];
    }

    if (body.about && Array.isArray(body.about.highlights)) {
        body.about.highlights = body.about.highlights
            .map((h) => (typeof h === "string" ? h.trim() : ""))
            .filter(Boolean);
    }
};

const normalizeSiteContentDoc = (doc) => {
    if (!doc) return doc;
    const docObj = doc.toObject ? doc.toObject() : doc;
    if ((!docObj.branchOffices || docObj.branchOffices.length === 0) && docObj.branchOffice) {
        docObj.branchOffices = [docObj.branchOffice];
    }
    docObj.about = {
        ...defaultAbout,
        ...(docObj.about || {}),
        image: {
            ...defaultAbout.image,
            ...((docObj.about && docObj.about.image) || {})
        },
        highlights: (docObj.about && Array.isArray(docObj.about.highlights) && docObj.about.highlights.length > 0)
            ? docObj.about.highlights
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
