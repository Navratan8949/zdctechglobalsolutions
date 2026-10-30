const Client = require("../models/Client");
const SiteContent = require("../models/SiteContent");
const { normalizeMediaPayload, normalizePublicItem, normalizePublicItems } = require("../utils/publicResponse");
const { normalizeClientsPageDoc } = require("./siteContent.controller");

// Get Clients Page Content
exports.getPageContent = async (req, res) => {
    try {
        let siteContent = await SiteContent.findOne().sort({ createdAt: -1 });
        if (!siteContent) {
            siteContent = await SiteContent.create({});
        }
        const docObj = siteContent.toObject ? siteContent.toObject() : siteContent;
        const normalized = normalizeClientsPageDoc(docObj.clientsPage);
        res.status(200).json({ success: true, data: normalized });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Update Clients Page Content
exports.updatePageContent = async (req, res) => {
    try {
        delete req.body._id;
        delete req.body.__v;
        delete req.body.createdAt;
        delete req.body.updatedAt;

        let siteContent = await SiteContent.findOne().sort({ createdAt: -1 });
        if (!siteContent) {
            siteContent = await SiteContent.create({ clientsPage: req.body });
        } else {
            siteContent.clientsPage = req.body;
            await siteContent.save();
        }
        const docObj = siteContent.toObject ? siteContent.toObject() : siteContent;
        const normalized = normalizeClientsPageDoc(docObj.clientsPage);
        res.status(200).json({ success: true, data: normalized });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Create
exports.create = async (req, res) => {
    try {
        const item = await Client.create(normalizeMediaPayload(req.body));
        res.status(201).json({ success: true, data: item });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Read all
exports.getAll = async (req, res) => {
    try {
        const isAdmin = req.user?.role === "admin";
        const query = isAdmin ? {} : { status: "active" };
        const items = await Client.find(query).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: normalizePublicItems(items, isAdmin) });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Read one
exports.getOne = async (req, res) => {
    try {
        const item = await Client.findById(req.params.id);
        if (!item) return res.status(404).json({ success: false, message: 'Not found' });
        res.status(200).json({ success: true, data: normalizePublicItem(item, req.user?.role === "admin") });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Update
exports.update = async (req, res) => {
    try {
        const item = await Client.findByIdAndUpdate(req.params.id, normalizeMediaPayload(req.body), { new: true, runValidators: true });
        if (!item) return res.status(404).json({ success: false, message: 'Not found' });
        res.status(200).json({ success: true, data: item });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Delete
exports.delete = async (req, res) => {
    try {
        const item = await Client.findByIdAndDelete(req.params.id);
        if (!item) return res.status(404).json({ success: false, message: 'Not found' });
        res.status(200).json({ success: true, message: 'Deleted successfully' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
