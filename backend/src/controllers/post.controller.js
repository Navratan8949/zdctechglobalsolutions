const Post = require("../models/Post");
const { normalizeMediaPayload, normalizePublicItem, normalizePublicItems } = require("../utils/publicResponse");

// Slug helper
function slugify(text) {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, "")
        .replace(/\-\-+/g, "-")
        .replace(/^-+/, "")
        .replace(/-+$/, "");
}

// Create
exports.create = async (req, res) => {
    try {
        const payload = normalizeMediaPayload(req.body);
        if (!payload.slug && payload.title) {
            payload.slug = slugify(payload.title);
        }

        // Deduplicate slug if exists
        const existing = await Post.findOne({ slug: payload.slug });
        if (existing) {
            payload.slug = `${payload.slug}-${Date.now()}`;
        }

        const item = await Post.create(payload);
        res.status(201).json({ success: true, data: item });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Read all
exports.getAll = async (req, res) => {
    try {
        const query = req.user?.role === "admin" ? {} : { status: "published" };
        const items = await Post.find(query).sort({ pinned: -1, date: -1, createdAt: -1 });
        res.status(200).json({ success: true, data: normalizePublicItems(items, req.user?.role === "admin") });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Read one by slug
exports.getBySlug = async (req, res) => {
    try {
        const query = { slug: req.params.slug };
        if (req.user?.role !== "admin") query.status = "published";
        const item = await Post.findOne(query);
        if (!item) return res.status(404).json({ success: false, message: "Post not found" });
        res.status(200).json({ success: true, data: normalizePublicItem(item, req.user?.role === "admin") });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Read one by ID
exports.getOne = async (req, res) => {
    try {
        const item = await Post.findById(req.params.id);
        if (!item) return res.status(404).json({ success: false, message: "Post not found" });
        res.status(200).json({ success: true, data: normalizePublicItem(item, req.user?.role === "admin") });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Update
exports.update = async (req, res) => {
    try {
        const payload = normalizeMediaPayload(req.body);
        if (payload.slug) {
            const existing = await Post.findOne({ slug: payload.slug, _id: { $ne: req.params.id } });
            if (existing) {
                payload.slug = `${payload.slug}-${Date.now()}`;
            }
        }
        const item = await Post.findByIdAndUpdate(req.params.id, payload, { new: true, runValidators: true });
        if (!item) return res.status(404).json({ success: false, message: "Post not found" });
        res.status(200).json({ success: true, data: item });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Delete
exports.delete = async (req, res) => {
    try {
        const item = await Post.findByIdAndDelete(req.params.id);
        if (!item) return res.status(404).json({ success: false, message: "Post not found" });
        res.status(200).json({ success: true, message: "Post deleted successfully" });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Like a post
exports.like = async (req, res) => {
    try {
        const item = await Post.findByIdAndUpdate(
            req.params.id,
            { $inc: { likes: 1 } },
            { new: true }
        );
        if (!item) return res.status(404).json({ success: false, message: "Post not found" });
        res.status(200).json({ success: true, data: { likes: item.likes } });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
