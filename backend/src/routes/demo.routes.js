const express = require("express");
const router = express.Router();
const demoController = require("../controllers/demo.controller");
const isAuthenticated = require("../middleware/auth");
const authorizeRoles = require("../middleware/role");
const optionalAuth = isAuthenticated.checkOptionalAuth;

// Public routes
router.get("/", optionalAuth, demoController.getAll);

// Admin-only routes
router.get("/admin/all", isAuthenticated, authorizeRoles(["admin"]), demoController.getAllAdmin);
router.post("/seed", isAuthenticated, authorizeRoles(["admin"]), demoController.seedDefaults);
router.post("/", isAuthenticated, authorizeRoles(["admin"]), demoController.create);
router.get("/:id", optionalAuth, demoController.getOne);
router.put("/:id", isAuthenticated, authorizeRoles(["admin"]), demoController.update);
router.delete("/:id", isAuthenticated, authorizeRoles(["admin"]), demoController.delete);

module.exports = router;
