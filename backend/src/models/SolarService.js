const mongoose = require("mongoose");

const solarServiceSchema = new mongoose.Schema(
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
            enum: [
                "Residential Solar",
                "Commercial & Industrial",
                "Solar Maintenance & AMC",
                "Agricultural Solar",
                "Off-Grid Battery System",
                "Other",
            ],
            default: "Residential Solar",
            index: true,
        },
        badge: {
            type: String,
            default: "1 kW - 10 kW",
            trim: true,
        },
        capacity: {
            type: String,
            default: "1 kW - 10 kW",
            trim: true,
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
        image: {
            public_id: { type: String, default: "" },
            url: { type: String, default: "" },
        },
        fee: {
            type: String,
            default: "Starting from ₹55,000 / kW",
            trim: true,
        },
        subsidy: {
            type: String,
            default: "Up to ₹78,000 (PM Surya Ghar)",
            trim: true,
        },
        features: {
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
    {
        timestamps: true,
    }
);

solarServiceSchema.index({ category: 1, isActive: 1, order: 1 });

module.exports = mongoose.model("SolarService", solarServiceSchema);

