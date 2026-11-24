const mongoose = require("mongoose");

const solarInquirySchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: [true, "Full name is required"],
            trim: true,
        },
        phone: {
            type: String,
            required: [true, "Phone / WhatsApp number is required"],
            trim: true,
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
            default: "",
        },
        city: {
            type: String,
            trim: true,
            default: "",
        },
        state: {
            type: String,
            trim: true,
            default: "Rajasthan",
        },
        propertyType: {
            type: String,
            enum: [
                "Residential Home",
                "Commercial Building",
                "Factory / Industrial",
                "School / Hospital",
                "Agriculture / Farm",
                "Other",
            ],
            default: "Residential Home",
        },
        systemType: {
            type: String,
            enum: [
                "On-Grid (Net Metering)",
                "Off-Grid (Battery Backup)",
                "Hybrid (Grid + Battery)",
                "Not Sure / Need Advice",
            ],
            default: "On-Grid (Net Metering)",
        },
        monthlyBill: {
            type: String,
            trim: true,
            default: "",
        },
        estimatedCapacity: {
            type: String,
            trim: true,
            default: "",
        },
        roofArea: {
            type: String,
            trim: true,
            default: "",
        },
        message: {
            type: String,
            trim: true,
            default: "",
        },
        status: {
            type: String,
            enum: [
                "new",
                "survey_scheduled",
                "quotation_sent",
                "in_installation",
                "completed",
                "cancelled",
            ],
            default: "new",
        },
        adminNotes: {
            type: String,
            trim: true,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("SolarInquiry", solarInquirySchema);

