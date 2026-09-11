const CoreValue = require("../models/CoreValue");

exports.getAllCoreValues = async (req, res) => {
    try {
        const coreValues = await CoreValue.find().sort("order createdAt");
        res.status(200).json({ success: true, data: coreValues });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getCoreValueById = async (req, res) => {
    try {
        const coreValue = await CoreValue.findById(req.params.id);
        if (!coreValue) return res.status(404).json({ success: false, message: "Core value not found" });
        res.status(200).json({ success: true, data: coreValue });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.createCoreValue = async (req, res) => {
    try {
        const newCoreValue = await CoreValue.create(req.body);
        res.status(201).json({ success: true, data: newCoreValue });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.updateCoreValue = async (req, res) => {
    try {
        const coreValue = await CoreValue.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!coreValue) return res.status(404).json({ success: false, message: "Core value not found" });
        res.status(200).json({ success: true, data: coreValue });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.deleteCoreValue = async (req, res) => {
    try {
        const coreValue = await CoreValue.findByIdAndDelete(req.params.id);
        if (!coreValue) return res.status(404).json({ success: false, message: "Core value not found" });
        res.status(200).json({ success: true, message: "Core value deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
