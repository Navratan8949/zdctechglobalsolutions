const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
    {
        slug: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        shortDescription: {
            type: String,
            required: true,
        },
        icon: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        heroHeadline: {
            type: String,
            required: true,
        },
        heroSubheadline: {
            type: String,
            required: true,
        },
        introduction: {
            type: String,
            required: true,
        },
        whatWeOffer: [
            {
                title: { type: String, required: true },
                description: { type: String, required: true },
            },
        ],
        keyFeatures: [{ type: String }],
        technologies: [{ type: String }],
        benefits: [
            {
                title: { type: String, required: true },
                description: { type: String, required: true },
            },
        ],
        whyChooseUs: [{ type: String }],
        faqs: [
            {
                question: { type: String, required: true },
                answer: { type: String, required: true },
            },
        ],
        relatedSlugs: [{ type: String }],
        status: {
            type: String,
            enum: ["draft", "published"],
            default: "published",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);
