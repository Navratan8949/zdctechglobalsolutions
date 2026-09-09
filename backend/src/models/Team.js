const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        position: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
            default: "",
        },
        image: {
            public_id: { type: String, default: "" },
            url: { type: String, default: "" },
        },
        socials: {
            linkedin: { type: String, default: "" },
            twitter: { type: String, default: "" },
            github: { type: String, default: "" },
        },
        order: {
            type: Number,
            default: 0,
        },
        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "active",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Team", teamSchema);
