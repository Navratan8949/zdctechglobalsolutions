const mongoose = require("mongoose");

const processStepSchema = new mongoose.Schema(
    {
        step: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        icon: { type: String, required: true, default: "CheckCircle" },
        order: { type: Number, default: 0 }
    },
    { timestamps: true }
);

module.exports = mongoose.model("ProcessStep", processStepSchema);
