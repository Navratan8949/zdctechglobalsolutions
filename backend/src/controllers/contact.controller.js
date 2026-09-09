const Contact = require("../models/Contact");
const { notifyAdmin, sendEmail } = require("../utils/sendMail");

const escapeHtml = (value = "") =>
    String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

const detailRow = (label, value) =>
    value ? `<p><strong>${label}:</strong> ${escapeHtml(value)}</p>` : "";

// Create
exports.create = async (req, res) => {
    try {
        const { name, email, message } = req.body;
        if (!name || !email || !message) {
            return res.status(400).json({ success: false, message: "Name, email, and message are required" });
        }
        const payload = {
            ...req.body,
            jobSlug: req.body.jobSlug || req.body.job || "",
            inquiryType: req.body.inquiryType || (req.body.job || req.body.jobSlug || req.body.jobId ? "career" : "general"),
        };
        const item = await Contact.create(payload);

        const adminSubject = payload.inquiryType === "career"
            ? `New career enquiry from ${name}`
            : `New website enquiry from ${name}`;
        const adminHtml = `
            <h2>${escapeHtml(adminSubject)}</h2>
            ${detailRow("Name", name)}
            ${detailRow("Email", email)}
            ${detailRow("Phone", payload.phone)}
            ${detailRow("Company", payload.company)}
            ${detailRow("Service", payload.service)}
            ${detailRow("Budget", payload.budget)}
            ${detailRow("Inquiry type", payload.inquiryType)}
            ${detailRow("Job", payload.jobSlug || payload.jobId || payload.position)}
            <p><strong>Message:</strong></p>
            <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
        `;

        const mailStatus = { admin: "pending", user: "pending" };
        try {
            const adminResult = await notifyAdmin({
                subject: adminSubject,
                html: adminHtml,
                text: `${adminSubject}\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
                replyTo: email,
            });
            mailStatus.admin = adminResult?.skipped ? "skipped" : "sent";
        } catch (mailError) {
            console.error("Contact admin email failed:", mailError);
            mailStatus.admin = "failed";
        }

        try {
            const userResult = await sendEmail({
                to: email,
                subject: "We received your message - ZDC Tech Global Solutions",
                html: `
                    <p>Hi ${escapeHtml(name)},</p>
                    <p>Thank you for contacting ZDC Tech Global Solutions. We received your message and our team will get back to you soon.</p>
                    <p>Regards,<br>ZDC Tech Global Solutions</p>
                `,
                text: `Hi ${name},\n\nThank you for contacting ZDC Tech Global Solutions. We received your message and our team will get back to you soon.\n\nRegards,\nZDC Tech Global Solutions`,
            });
            mailStatus.user = userResult?.skipped ? "skipped" : "sent";
        } catch (mailError) {
            console.error("Contact confirmation email failed:", mailError);
            mailStatus.user = "failed";
        }

        res.status(201).json({
            success: true,
            message: "Message submitted successfully",
            data: item,
            mailStatus,
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Read all
exports.getAll = async (req, res) => {
    try {
        const items = await Contact.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: items });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Read one
exports.getOne = async (req, res) => {
    try {
        const item = await Contact.findById(req.params.id);
        if (!item) return res.status(404).json({ success: false, message: 'Not found' });
        res.status(200).json({ success: true, data: item });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Update
exports.update = async (req, res) => {
    try {
        const item = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!item) return res.status(404).json({ success: false, message: 'Not found' });
        res.status(200).json({ success: true, data: item });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Delete
exports.delete = async (req, res) => {
    try {
        const item = await Contact.findByIdAndDelete(req.params.id);
        if (!item) return res.status(404).json({ success: false, message: 'Not found' });
        res.status(200).json({ success: true, message: 'Deleted successfully' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
