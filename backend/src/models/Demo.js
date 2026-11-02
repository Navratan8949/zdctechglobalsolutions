const mongoose = require("mongoose");

const demoCredentialSchema = new mongoose.Schema(
    {
        role: {
            type: String,
            default: "Admin",
            trim: true,
        },
        username: {
            type: String,
            default: "",
            trim: true,
        },
        password: {
            type: String,
            default: "",
            trim: true,
        },
        notes: {
            type: String,
            default: "",
            trim: true,
        },
    },
    { _id: false }
);

const demoSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Demo title is required"],
            trim: true,
        },
        demoType: {
            type: String,
            default: "Web Application",
            trim: true,
        },
        description: {
            type: String,
            required: [true, "Demo description is required"],
            trim: true,
        },
        image: {
            public_id: { type: String, default: "" },
            url: { type: String, default: "" },
        },
        liveUrl: {
            type: String,
            required: [true, "Live demo URL is required"],
            trim: true,
        },
        credentials: {
            type: [demoCredentialSchema],
            default: [],
        },
        order: {
            type: Number,
            default: 0,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Demo", demoSchema);
