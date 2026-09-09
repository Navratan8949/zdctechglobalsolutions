const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
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
        excerpt: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            default: Date.now,
        },
        readingTime: {
            type: String,
            required: true,
        },
        coverImage: {
            public_id: { type: String, default: "" },
            url: { type: String, default: "" },
        },
        author: {
            name: { type: String, required: true },
            role: { type: String, required: true },
            avatar: {
                public_id: { type: String, default: "" },
                url: { type: String, default: "" },
            },
        },
        featured: {
            type: Boolean,
            default: false,
        },
        content: [
            {
                heading: { type: String, default: "" },
                paragraphs: [{ type: String }],
            },
        ],
        status: {
            type: String,
            enum: ["draft", "published"],
            default: "published",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
