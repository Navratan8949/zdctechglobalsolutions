const SiteContent = require("../models/SiteContent");

// Create
exports.create = async (req, res) => {
    try {
        const item = await SiteContent.create(req.body);
        res.status(201).json({ success: true, data: item });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Read all
exports.getAll = async (req, res) => {
    try {
        const items = await SiteContent.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: items });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.getCurrent = async (req, res) => {
    try {
        let item = await SiteContent.findOne().sort({ createdAt: -1 });
        if (!item) item = await SiteContent.create({});
        res.status(200).json({ success: true, data: item });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Read one
exports.getOne = async (req, res) => {
    try {
        const item = await SiteContent.findById(req.params.id);
        if (!item) return res.status(404).json({ success: false, message: 'Not found' });
        res.status(200).json({ success: true, data: item });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Update
exports.update = async (req, res) => {
    try {
        const item = await SiteContent.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!item) return res.status(404).json({ success: false, message: 'Not found' });
        res.status(200).json({ success: true, data: item });
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
