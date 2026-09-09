const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema(
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
        category: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        image: {
            public_id: { type: String, default: "" },
            url: { type: String, default: "" },
        },
        technologies: [{ type: String }],
        client: {
            type: String,
            required: true,
        },
        year: {
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

module.exports = mongoose.model("Portfolio", portfolioSchema);
