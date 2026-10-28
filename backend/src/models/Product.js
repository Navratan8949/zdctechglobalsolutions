const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Product title is required"],
            trim: true,
        },
        slug: {
            type: String,
            required: [true, "Product slug is required"],
            unique: true,
            trim: true,
            lowercase: true,
        },
        tagline: {
            type: String,
            default: "",
            trim: true,
        },
        category: {
            type: String,
            required: [true, "Product category is required"],
            trim: true,
            index: true,
        },
        description: {
            type: String,
            required: [true, "Product description is required"],
            trim: true,
        },
        image: {
            public_id: { type: String, default: "" },
            url: { type: String, default: "" },
        },
        badge: {
            type: String,
            default: "",
            trim: true,
        },
        icon: {
            type: String,
            default: "Layers",
            trim: true,
        },
        features: {
            type: [String],
            default: [],
        },
        metrics: {
            type: String,
            default: "",
            trim: true,
        },
        deployment: {
            type: String,
            default: "Cloud-Ready & Customizable",
            trim: true,
        },
        ctaText: {
            type: String,
            default: "Request Demo",
            trim: true,
        },
        ctaLink: {
            type: String,
            default: "/contact",
            trim: true,
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
        isFeatured: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);

