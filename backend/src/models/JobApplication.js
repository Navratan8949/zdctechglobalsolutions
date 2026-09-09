const mongoose = require("mongoose");

const jobApplicationSchema = new mongoose.Schema(
    {
        job: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Job",
            default: null,
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
            default: "",
        },
        portfolioUrl: {
            type: String,
            trim: true,
            default: "",
        },
        linkedinUrl: {
            type: String,
            trim: true,
            default: "",
        },
        coverLetter: {
            type: String,
            trim: true,
            default: "",
        },
        resume: {
            public_id: { type: String, default: "" },
            url: { type: String, default: "" },
        },
        status: {
            type: String,
            enum: ["new", "reviewing", "shortlisted", "rejected", "hired"],
            default: "new",
        },
        notes: {
            type: String,
            default: "",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("JobApplication", jobApplicationSchema);
