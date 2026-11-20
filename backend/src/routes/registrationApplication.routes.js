const express = require("express");
const router = express.Router();
const registrationApplicationController = require("../controllers/registrationApplication.controller");
const isAuthenticated = require("../middleware/auth");
const authorizeRoles = require("../middleware/role");

// Public endpoint - Apply for registration
router.post("/", registrationApplicationController.create);

// Admin-only management endpoints
router.get("/", isAuthenticated, authorizeRoles(["admin"]), registrationApplicationController.getAll);
router.get("/:id", isAuthenticated, authorizeRoles(["admin"]), registrationApplicationController.getOne);
router.put("/:id", isAuthenticated, authorizeRoles(["admin"]), registrationApplicationController.update);
router.delete("/:id", isAuthenticated, authorizeRoles(["admin"]), registrationApplicationController.delete);

module.exports = router;

