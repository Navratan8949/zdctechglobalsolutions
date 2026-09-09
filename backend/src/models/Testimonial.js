const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema(
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
        company: {
            type: String,
            required: true,
            trim: true,
        },
        quote: {
            type: String,
            required: true,
            trim: true,
        },
        avatar: {
            public_id: { type: String, default: "" },
            url: { type: String, default: "" },
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },
        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "active",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Testimonial", testimonialSchema);