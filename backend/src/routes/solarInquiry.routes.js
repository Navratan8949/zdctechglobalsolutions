const express = require("express");
const router = express.Router();
const solarInquiryController = require("../controllers/solarInquiry.controller");
const isAuthenticated = require("../middleware/auth");
const authorizeRoles = require("../middleware/role");

// Public route - Book solar site survey / quote
router.post("/", solarInquiryController.create);

// Admin-only management routes
router.get("/", isAuthenticated, authorizeRoles(["admin"]), solarInquiryController.getAll);
router.get("/:id", isAuthenticated, authorizeRoles(["admin"]), solarInquiryController.getOne);
router.put("/:id", isAuthenticated, authorizeRoles(["admin"]), solarInquiryController.update);
router.delete("/:id", isAuthenticated, authorizeRoles(["admin"]), solarInquiryController.delete);

module.exports = router;

