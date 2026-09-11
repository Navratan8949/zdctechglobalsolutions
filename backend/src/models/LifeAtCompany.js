const mongoose = require("mongoose");

const lifeAtCompanySchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        icon: { type: String, required: true, default: "Heart" },
        order: { type: Number, default: 0 }
    },
    { timestamps: true }
);

module.exports = mongoose.model("LifeAtCompany", lifeAtCompanySchema);
