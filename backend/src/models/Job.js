const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
    {
        slug: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        position: {
            type: String,
            required: true,
            trim: true,
        },
        experience: {
            type: String,
            required: true,
            trim: true,
        },
        location: {
            type: String,
            required: true,
            trim: true,
        },
        type: {
            type: String,
            required: true,
            trim: true,
        },
        department: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
        },
        responsibilities: [
            { type: String, required: true }
        ],
        requirements: [
            { type: String, required: true }
        ],
        status: {
            type: String,
            enum: ["open", "closed"],
            default: "open",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
