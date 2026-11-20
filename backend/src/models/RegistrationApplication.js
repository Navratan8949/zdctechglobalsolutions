const mongoose = require("mongoose");

const registrationApplicationSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Applicant name is required"],
            trim: true,
        },
        phone: {
            type: String,
            required: [true, "Phone/WhatsApp number is required"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email address is required"],
            trim: true,
            lowercase: true,
        },
        city: {
            type: String,
            trim: true,
            default: "",
        },
        serviceTitle: {
            type: String,
            required: [true, "Registration service title is required"],
            trim: true,
        },
        category: {
            type: String,
            enum: ["NGO Registration", "Company Registration", "Other"],
            default: "Other",
        },
        message: {
            type: String,
            trim: true,
            default: "",
        },
        status: {
            type: String,
            enum: ["pending", "in_review", "contacted", "in_progress", "completed", "cancelled"],
            default: "pending",
        },
        adminNotes: {
            type: String,
            trim: true,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("RegistrationApplication", registrationApplicationSchema);

