const RegistrationApplication = require("../models/RegistrationApplication");

// Public Create (Called when user clicks "Submit Registration Application" on the site)
exports.create = async (req, res) => {
    try {
        const { name, phone, email, city, serviceTitle, category, message } = req.body;

        if (!name || !name.trim()) {
            return res.status(400).json({ success: false, message: "Full Name is required" });
        }
        if (!phone || !phone.trim()) {
            return res.status(400).json({ success: false, message: "Phone / WhatsApp number is required" });
        }
        if (!email || !email.trim()) {
            return res.status(400).json({ success: false, message: "Email address is required" });
        }
        if (!serviceTitle || !serviceTitle.trim()) {
            return res.status(400).json({ success: false, message: "Selected registration service is required" });
        }

        let cleanCategory = category || "Other";
        if (cleanCategory !== "NGO Registration" && cleanCategory !== "Company Registration") {
            cleanCategory = "Other";
        }

        const application = await RegistrationApplication.create({
            name: name.trim(),
            phone: phone.trim(),
            email: email.trim().toLowerCase(),
            city: (city || "").trim(),
            serviceTitle: serviceTitle.trim(),
            category: cleanCategory,
            message: (message || "").trim(),
            status: "pending",
        });

        res.status(201).json({
            success: true,
            message: "Your registration application has been submitted successfully. Our legal advisor will contact you shortly.",
            data: application,
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Admin Read All (with status, category, search filters)
exports.getAll = async (req, res) => {
    try {
        const { status, category, search } = req.query;
        const filter = {};

        if (status && status !== "All") {
            filter.status = status;
        }
        if (category && category !== "All") {
            filter.category = category;
        }
        if (search && search.trim() !== "") {
            const regex = new RegExp(search.trim(), "i");
            filter.$or = [
                { name: regex },
                { phone: regex },
                { email: regex },
                { city: regex },
                { serviceTitle: regex },
                { message: regex },
                { adminNotes: regex },
            ];
        }

        const items = await RegistrationApplication.find(filter).sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: items.length,
            data: items,
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Admin Read One by ID
exports.getOne = async (req, res) => {
    try {
        const item = await RegistrationApplication.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ success: false, message: "Registration application not found" });
        }
        res.status(200).json({ success: true, data: item });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Admin Update (Status, Admin Notes)
exports.update = async (req, res) => {
    try {
        const { status, adminNotes } = req.body;
        const updates = {};

        if (status !== undefined) updates.status = status;
        if (adminNotes !== undefined) updates.adminNotes = adminNotes;

        const item = await RegistrationApplication.findByIdAndUpdate(
            req.params.id,
            updates,
            { new: true, runValidators: true }
        );

        if (!item) {
            return res.status(404).json({ success: false, message: "Registration application not found" });
        }

        res.status(200).json({
            success: true,
            message: "Application updated successfully",
            data: item,
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Admin Delete
exports.delete = async (req, res) => {
    try {
        const item = await RegistrationApplication.findByIdAndDelete(req.params.id);
        if (!item) {
            return res.status(404).json({ success: false, message: "Registration application not found" });
        }
        res.status(200).json({ success: true, message: "Registration application deleted successfully" });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

