const Stat = require("../models/Stat");

exports.getAllStats = async (req, res) => {
    try {
        const stats = await Stat.find().sort("order createdAt");
        res.status(200).json({ success: true, data: stats });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getStatById = async (req, res) => {
    try {
        const stat = await Stat.findById(req.params.id);
        if (!stat) return res.status(404).json({ success: false, message: "Stat not found" });
        res.status(200).json({ success: true, data: stat });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.createStat = async (req, res) => {
    try {
        const newStat = await Stat.create(req.body);
        res.status(201).json({ success: true, data: newStat });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.updateStat = async (req, res) => {
    try {
        const stat = await Stat.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!stat) return res.status(404).json({ success: false, message: "Stat not found" });
        res.status(200).json({ success: true, data: stat });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.deleteStat = async (req, res) => {
    try {
        const stat = await Stat.findByIdAndDelete(req.params.id);
        if (!stat) return res.status(404).json({ success: false, message: "Stat not found" });
        res.status(200).json({ success: true, message: "Stat deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
