const mongoose = require("mongoose");

const caseStudySchema = new mongoose.Schema(
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
        client: {
            type: String,
            required: true,
        },
        industry: {
            type: String,
            required: true,
        },
        challenge: {
            type: String,
            required: true,
        },
        solution: {
            type: String,
            required: true,
        },
        features: [{ type: String }],
        technologies: [{ type: String }],
        results: [
            {
                label: { type: String, required: true },
                value: { type: String, required: true },
            },
        ],
        image: {
            public_id: { type: String, default: "" },
            url: { type: String, default: "" },
        },
        heroHeadline: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ["draft", "published"],
            default: "published",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("CaseStudy", caseStudySchema);
