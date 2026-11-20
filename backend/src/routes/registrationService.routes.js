const express = require("express");
const router = express.Router();
const registrationController = require("../controllers/registrationService.controller");
const isAuthenticated = require("../middleware/auth");
const authorizeRoles = require("../middleware/role");
const optionalAuth = isAuthenticated.checkOptionalAuth;

// Public routes
router.get("/", optionalAuth, registrationController.getAll);
router.get("/slug/:slug", optionalAuth, registrationController.getBySlug);

// Admin-only routes
router.get("/admin/all", isAuthenticated, authorizeRoles(["admin"]), registrationController.getAllAdmin);
router.post("/seed", isAuthenticated, authorizeRoles(["admin"]), registrationController.seedDefaults);
router.post("/", isAuthenticated, authorizeRoles(["admin"]), registrationController.create);
router.get("/:id", optionalAuth, registrationController.getOne);
router.put("/:id", isAuthenticated, authorizeRoles(["admin"]), registrationController.update);
router.delete("/:id", isAuthenticated, authorizeRoles(["admin"]), registrationController.delete);

module.exports = router;

