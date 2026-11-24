const SolarInquiry = require("../models/SolarInquiry");

// Public Create - Called from Solar Landing Page / Calculator
exports.create = async (req, res) => {
    try {
        const {
            fullName,
            phone,
            email,
            city,
            state,
            propertyType,
            systemType,
            monthlyBill,
            estimatedCapacity,
            roofArea,
            message,
        } = req.body;

        if (!fullName || !fullName.trim()) {
            return res.status(400).json({ success: false, message: "Full Name is required" });
        }
        if (!phone || !phone.trim()) {
            return res.status(400).json({ success: false, message: "Phone / WhatsApp number is required" });
        }

        const inquiry = await SolarInquiry.create({
            fullName: fullName.trim(),
            phone: phone.trim(),
            email: (email || "").trim().toLowerCase(),
            city: (city || "").trim(),
            state: (state || "Rajasthan").trim(),
            propertyType: propertyType || "Residential Home",
            systemType: systemType || "On-Grid (Net Metering)",
            monthlyBill: (monthlyBill || "").trim(),
            estimatedCapacity: (estimatedCapacity || "").trim(),
            roofArea: (roofArea || "").trim(),
            message: (message || "").trim(),
            status: "new",
        });

        res.status(201).json({
            success: true,
            message: "Thank you! Your solar site survey & quote request has been received. Our solar engineer will contact you shortly.",
            data: inquiry,
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Admin Read All
exports.getAll = async (req, res) => {
    try {
        const { status, propertyType, search } = req.query;
        const filter = {};

        if (status && status !== "All") {
            filter.status = status;
        }
        if (propertyType && propertyType !== "All") {
            filter.propertyType = propertyType;
        }
        if (search && search.trim() !== "") {
            const regex = new RegExp(search.trim(), "i");
            filter.$or = [
                { fullName: regex },
                { phone: regex },
                { email: regex },
                { city: regex },
                { monthlyBill: regex },
                { estimatedCapacity: regex },
                { message: regex },
                { adminNotes: regex },
            ];
        }

        const items = await SolarInquiry.find(filter).sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: items.length,
            data: items,
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Admin Read One
exports.getOne = async (req, res) => {
    try {
        const item = await SolarInquiry.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ success: false, message: "Solar inquiry not found" });
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

        const item = await SolarInquiry.findByIdAndUpdate(
            req.params.id,
            updates,
            { new: true, runValidators: true }
        );

        if (!item) {
            return res.status(404).json({ success: false, message: "Solar inquiry not found" });
        }

        res.status(200).json({
            success: true,
            message: "Solar inquiry updated successfully",
            data: item,
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Admin Delete
exports.delete = async (req, res) => {
    try {
        const item = await SolarInquiry.findByIdAndDelete(req.params.id);
        if (!item) {
            return res.status(404).json({ success: false, message: "Solar inquiry not found" });
        }
        res.status(200).json({ success: true, message: "Solar inquiry deleted successfully" });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

