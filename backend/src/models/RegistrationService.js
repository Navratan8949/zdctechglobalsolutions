const mongoose = require("mongoose");

const registrationServiceSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Service title is required"],
            trim: true,
        },
        slug: {
            type: String,
            required: [true, "Service slug is required"],
            unique: true,
            trim: true,
            lowercase: true,
        },
        category: {
            type: String,
            required: [true, "Category is required"],
            enum: ["NGO Registration", "Company Registration"],
            default: "NGO Registration",
            index: true,
        },
        shortDescription: {
            type: String,
            required: [true, "Short description is required"],
            trim: true,
        },
        fullDescription: {
            type: String,
            default: "",
            trim: true,
        },
        sampleCertificateImage: {
            public_id: { type: String, default: "" },
            url: { type: String, default: "" },
        },
        governmentBody: {
            type: String,
            default: "Government of India",
            trim: true,
        },
        processingTime: {
            type: String,
            default: "7 - 10 Working Days",
            trim: true,
        },
        fee: {
            type: String,
            default: "Consult for Pricing",
            trim: true,
        },
        benefits: {
            type: [String],
            default: [],
        },
        documentsRequired: {
            type: [String],
            default: [],
        },
        processSteps: {
            type: [String],
            default: [],
        },
        popular: {
            type: Boolean,
            default: false,
        },
        order: {
            type: Number,
            default: 0,
        },
        isActive: {
            type: Boolean,
            default: true,
            index: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("RegistrationService", registrationServiceSchema);

