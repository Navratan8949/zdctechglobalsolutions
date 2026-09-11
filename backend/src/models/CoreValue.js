const mongoose = require("mongoose");

const coreValueSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        icon: { type: String, required: true, default: "Star" },
        order: { type: Number, default: 0 }
    },
    { timestamps: true }
);

module.exports = mongoose.model("CoreValue", coreValueSchema);
