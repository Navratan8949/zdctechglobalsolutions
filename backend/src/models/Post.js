const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        content: {
            type: String,
            required: true,
        },
        excerpt: {
            type: String,
            default: "",
        },
        category: {
            type: String,
            default: "Daily Update",
            trim: true,
        },
        image: {
            public_id: { type: String, default: "" },
            url: { type: String, default: "" },
        },
        author: {
            name: { type: String, default: "ZDC Tech Team" },
            role: { type: String, default: "Author" },
            avatar: {
                public_id: { type: String, default: "" },
                url: { type: String, default: "" },
            },
        },
        tags: [{ type: String, trim: true }],
        date: {
            type: Date,
            default: Date.now,
        },
        status: {
            type: String,
            enum: ["draft", "published"],
            default: "published",
        },
        pinned: {
            type: Boolean,
            default: false,
        },
        likes: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
