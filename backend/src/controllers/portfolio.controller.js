const Portfolio = require("../models/Portfolio");
const { normalizeMediaPayload, normalizePublicItem, normalizePublicItems } = require("../utils/publicResponse");

// Create
exports.create = async (req, res) => {
    try {
        const item = await Portfolio.create(normalizeMediaPayload(req.body));
        res.status(201).json({ success: true, data: item });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Read all
exports.getAll = async (req, res) => {
    try {
        const isAdmin = req.user?.role === "admin";
        const query = isAdmin ? {} : { status: "published" };
        const items = await Portfolio.find(query).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: normalizePublicItems(items, isAdmin) });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.getBySlug = async (req, res) => {
    try {
        const isAdmin = req.user?.role === "admin";
        const query = { slug: req.params.slug };
        if (!isAdmin) query.status = "published";
        const item = await Portfolio.findOne(query);
        if (!item) return res.status(404).json({ success: false, message: 'Not found' });
        res.status(200).json({ success: true, data: normalizePublicItem(item, isAdmin) });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Read one
exports.getOne = async (req, res) => {
    try {
        const item = await Portfolio.findById(req.params.id);
        if (!item) return res.status(404).json({ success: false, message: 'Not found' });
        res.status(200).json({ success: true, data: normalizePublicItem(item, req.user?.role === "admin") });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Update
exports.update = async (req, res) => {
    try {
        const item = await Portfolio.findByIdAndUpdate(req.params.id, normalizeMediaPayload(req.body), { new: true, runValidators: true });
        if (!item) return res.status(404).json({ success: false, message: 'Not found' });
        res.status(200).json({ success: true, data: item });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Delete
exports.delete = async (req, res) => {
    try {
        const item = await Portfolio.findByIdAndDelete(req.params.id);
        if (!item) return res.status(404).json({ success: false, message: 'Not found' });
        res.status(200).json({ success: true, message: 'Deleted successfully' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
