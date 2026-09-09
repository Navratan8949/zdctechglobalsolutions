const Subscriber = require("../models/Subscriber");
const { notifyAdmin, sendEmail } = require("../utils/sendMail");

const escapeHtml = (value = "") =>
    String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

// Create
exports.create = async (req, res) => {
    try {
        if (!req.body.email) {
            return res.status(400).json({ success: false, message: "Email is required" });
        }
        const item = await Subscriber.create(req.body);

        const mailStatus = { admin: "pending", subscriber: "pending" };
        try {
            const adminResult = await notifyAdmin({
                subject: "New newsletter subscriber",
                html: `<p><strong>Email:</strong> ${escapeHtml(item.email)}</p>`,
                text: `New newsletter subscriber: ${item.email}`,
            });
            mailStatus.admin = adminResult?.skipped ? "skipped" : "sent";
        } catch (mailError) {
            console.error("Subscriber admin email failed:", mailError);
            mailStatus.admin = "failed";
        }

        try {
            const subscriberResult = await sendEmail({
                to: item.email,
                subject: "You are subscribed - ZDC Tech Global Solutions",
                html: `
                    <p>Thanks for subscribing to ZDC Tech Global Solutions.</p>
                    <p>You will receive our latest technology insights and company updates.</p>
                `,
                text: "Thanks for subscribing to ZDC Tech Global Solutions. You will receive our latest technology insights and company updates.",
            });
            mailStatus.subscriber = subscriberResult?.skipped ? "skipped" : "sent";
        } catch (mailError) {
            console.error("Subscriber confirmation email failed:", mailError);
            mailStatus.subscriber = "failed";
        }

        res.status(201).json({ success: true, message: "Subscribed successfully", data: item, mailStatus });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Read all
exports.getAll = async (req, res) => {
    try {
        const items = await Subscriber.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: items });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Read one
exports.getOne = async (req, res) => {
    try {
        const item = await Subscriber.findById(req.params.id);
        if (!item) return res.status(404).json({ success: false, message: 'Not found' });
        res.status(200).json({ success: true, data: item });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Update
exports.update = async (req, res) => {
    try {
        const item = await Subscriber.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!item) return res.status(404).json({ success: false, message: 'Not found' });
        res.status(200).json({ success: true, data: item });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Delete
exports.delete = async (req, res) => {
    try {
        const item = await Subscriber.findByIdAndDelete(req.params.id);
        if (!item) return res.status(404).json({ success: false, message: 'Not found' });
        res.status(200).json({ success: true, message: 'Deleted successfully' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
