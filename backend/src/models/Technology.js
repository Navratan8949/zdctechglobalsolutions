const mongoose = require("mongoose");

const technologySchema = new mongoose.Schema(
    {
        category: {
            type: String,
            required: true,
            trim: true,
        },
        icon: {
            type: String,
            required: true,
            trim: true,
        },
        technologies: [
            { type: String, required: true }
        ],
        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "active",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Technology", technologySchema);
