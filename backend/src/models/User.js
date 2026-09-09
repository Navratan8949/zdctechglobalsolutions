const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    mobile: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin"],
      default: "admin",
    },
    profileImage: {
      public_id: { type: String, default: "" },
      url: { type: String, default: "" },
    },
    gender: {
      type: String,
      default: "",
    },
    dob: {
      type: Date,
      default: null,
    },
    state: {
      type: String,
      default: "",
    },
    district: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    userType: {
      type: String,
      default: "",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLogin: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("User", userSchema);
