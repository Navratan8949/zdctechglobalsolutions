const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        logo: {
            public_id: { type: String, default: "" },
            url: { type: String, default: "" },
        },
        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "active",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Client", clientSchema);
