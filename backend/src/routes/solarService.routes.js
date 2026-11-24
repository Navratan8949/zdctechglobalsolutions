const express = require("express");
const router = express.Router();
const solarServiceController = require("../controllers/solarService.controller");
const isAuthenticated = require("../middleware/auth");
const authorizeRoles = require("../middleware/role");
const optionalAuth = isAuthenticated.checkOptionalAuth;

// Public routes
router.get("/", optionalAuth, solarServiceController.getAll);
router.get("/slug/:slug", optionalAuth, solarServiceController.getBySlug);

// Admin routes
router.get(
    "/admin/all",
    isAuthenticated,
    authorizeRoles(["admin"]),
    solarServiceController.getAllAdmin
);
router.post(
    "/seed",
    isAuthenticated,
    authorizeRoles(["admin"]),
    solarServiceController.seedDefaults
);
router.post(
    "/",
    isAuthenticated,
    authorizeRoles(["admin"]),
    solarServiceController.create
);
router.get("/:id", optionalAuth, solarServiceController.getOne);
router.put(
    "/:id",
    isAuthenticated,
    authorizeRoles(["admin"]),
    solarServiceController.update
);
router.delete(
    "/:id",
    isAuthenticated,
    authorizeRoles(["admin"]),
    solarServiceController.delete
);

module.exports = router;

