const WhyChooseUs = require("../models/WhyChooseUs");

// Get all why choose us items
exports.getAll = async (req, res) => {
    try {
        const items = await WhyChooseUs.find().sort({ createdAt: 1 });
        res.status(200).json({ success: true, data: items });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get single why choose us item
exports.getById = async (req, res) => {
    try {
        const item = await WhyChooseUs.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ success: false, message: "Item not found" });
        }
        res.status(200).json({ success: true, data: item });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Create new why choose us item
exports.create = async (req, res) => {
    try {
        const item = await WhyChooseUs.create(req.body);
        res.status(201).json({ success: true, data: item });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Update why choose us item
exports.update = async (req, res) => {
    try {
        const item = await WhyChooseUs.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!item) {
            return res.status(404).json({ success: false, message: "Item not found" });
        }

        res.status(200).json({ success: true, data: item });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Delete why choose us item
exports.delete = async (req, res) => {
    try {
        const item = await WhyChooseUs.findByIdAndDelete(req.params.id);
        if (!item) {
            return res.status(404).json({ success: false, message: "Item not found" });
        }
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
