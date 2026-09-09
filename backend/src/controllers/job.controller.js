const Job = require("../models/Job");

const slugify = (value) =>
    String(value || "")
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

const normalizeJobPayload = (body) => {
    const payload = { ...body };
    if (!payload.slug && (payload.id || payload.position)) {
        payload.slug = payload.id || slugify(payload.position);
    }
    return payload;
};

// Create
exports.create = async (req, res) => {
    try {
        const item = await Job.create(normalizeJobPayload(req.body));
        res.status(201).json({ success: true, data: item });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Read all
exports.getAll = async (req, res) => {
    try {
        const query = req.user?.role === "admin" ? {} : { status: "open" };
        const items = await Job.find(query).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: items });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.getBySlug = async (req, res) => {
    try {
        const query = { slug: req.params.slug };
        if (req.user?.role !== "admin") query.status = "open";
        const item = await Job.findOne(query);
        if (!item) return res.status(404).json({ success: false, message: 'Not found' });
        res.status(200).json({ success: true, data: item });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Read one
exports.getOne = async (req, res) => {
    try {
        const item = await Job.findById(req.params.id);
        if (!item) return res.status(404).json({ success: false, message: 'Not found' });
        res.status(200).json({ success: true, data: item });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Update
exports.update = async (req, res) => {
    try {
        const item = await Job.findByIdAndUpdate(req.params.id, normalizeJobPayload(req.body), { new: true, runValidators: true });
        if (!item) return res.status(404).json({ success: false, message: 'Not found' });
        res.status(200).json({ success: true, data: item });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Delete
exports.delete = async (req, res) => {
    try {
        const item = await Job.findByIdAndDelete(req.params.id);
        if (!item) return res.status(404).json({ success: false, message: 'Not found' });
        res.status(200).json({ success: true, message: 'Deleted successfully' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
