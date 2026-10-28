const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const isAuthenticated = require("../middleware/auth");
const authorizeRoles = require("../middleware/role");
const optionalAuth = isAuthenticated.checkOptionalAuth;

// Public routes
router.get("/", optionalAuth, productController.getAll);
router.get("/slug/:slug", optionalAuth, productController.getBySlug);

// Admin-only routes
router.get("/admin/all", isAuthenticated, authorizeRoles(["admin"]), productController.getAllAdmin);
router.post("/seed", isAuthenticated, authorizeRoles(["admin"]), productController.seedDefaults);
router.post("/", isAuthenticated, authorizeRoles(["admin"]), productController.create);
router.get("/:id", optionalAuth, productController.getOne);
router.put("/:id", isAuthenticated, authorizeRoles(["admin"]), productController.update);
router.delete("/:id", isAuthenticated, authorizeRoles(["admin"]), productController.delete);

module.exports = router;

