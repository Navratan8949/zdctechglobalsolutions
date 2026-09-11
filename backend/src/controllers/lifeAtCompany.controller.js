const LifeAtCompany = require("../models/LifeAtCompany");

exports.getAllLifeAtCompany = async (req, res) => {
    try {
        const lifeAtCompany = await LifeAtCompany.find().sort("order createdAt");
        res.status(200).json({ success: true, data: lifeAtCompany });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getLifeAtCompanyById = async (req, res) => {
    try {
        const lifeAtCompany = await LifeAtCompany.findById(req.params.id);
        if (!lifeAtCompany) return res.status(404).json({ success: false, message: "Life at company item not found" });
        res.status(200).json({ success: true, data: lifeAtCompany });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.createLifeAtCompany = async (req, res) => {
    try {
        const newLifeAtCompany = await LifeAtCompany.create(req.body);
        res.status(201).json({ success: true, data: newLifeAtCompany });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.updateLifeAtCompany = async (req, res) => {
    try {
        const lifeAtCompany = await LifeAtCompany.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!lifeAtCompany) return res.status(404).json({ success: false, message: "Life at company item not found" });
        res.status(200).json({ success: true, data: lifeAtCompany });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.deleteLifeAtCompany = async (req, res) => {
    try {
        const lifeAtCompany = await LifeAtCompany.findByIdAndDelete(req.params.id);
        if (!lifeAtCompany) return res.status(404).json({ success: false, message: "Life at company item not found" });
        res.status(200).json({ success: true, message: "Life at company item deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
