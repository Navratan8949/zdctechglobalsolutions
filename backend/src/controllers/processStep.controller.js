const ProcessStep = require("../models/ProcessStep");

exports.getAllProcessSteps = async (req, res) => {
    try {
        const processSteps = await ProcessStep.find().sort("order createdAt");
        res.status(200).json({ success: true, data: processSteps });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getProcessStepById = async (req, res) => {
    try {
        const processStep = await ProcessStep.findById(req.params.id);
        if (!processStep) return res.status(404).json({ success: false, message: "Process step not found" });
        res.status(200).json({ success: true, data: processStep });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.createProcessStep = async (req, res) => {
    try {
        const newProcessStep = await ProcessStep.create(req.body);
        res.status(201).json({ success: true, data: newProcessStep });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.updateProcessStep = async (req, res) => {
    try {
        const processStep = await ProcessStep.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!processStep) return res.status(404).json({ success: false, message: "Process step not found" });
        res.status(200).json({ success: true, data: processStep });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.deleteProcessStep = async (req, res) => {
    try {
        const processStep = await ProcessStep.findByIdAndDelete(req.params.id);
        if (!processStep) return res.status(404).json({ success: false, message: "Process step not found" });
        res.status(200).json({ success: true, message: "Process step deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
