const mongoose = require("mongoose");

const whyChooseUsSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true,
        },
        description: {
            type: String,
            required: [true, "Description is required"],
        },
        image: {
            public_id: {
                type: String,
                default: "",
            },
            url: {
                type: String,
                default: "",
            },
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("WhyChooseUs", whyChooseUsSchema);
