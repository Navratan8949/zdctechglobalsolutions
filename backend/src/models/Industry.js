const mongoose = require("mongoose");

const industrySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        icon: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "active",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Industry", industrySchema);
