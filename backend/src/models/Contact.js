const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },

        phone: {
            type: String,
            trim: true,
        },

        company: {
            type: String,
            trim: true,
        },

        service: {
            type: String,
            trim: true,
        },

        budget: {
            type: String,
            trim: true,
        },

        inquiryType: {
            type: String,
            enum: ["general", "project", "career"],
            default: "general",
        },

        jobId: {
            type: String,
            trim: true,
            default: "",
        },

        jobSlug: {
            type: String,
            trim: true,
            default: "",
        },

        position: {
            type: String,
            trim: true,
            default: "",
        },

        message: {
            type: String,
            required: true,
            trim: true,
        },

        status: {
            type: String,
            enum: ["pending", "in_progress", "resolved"],
            default: "pending",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Contact", contactSchema);
