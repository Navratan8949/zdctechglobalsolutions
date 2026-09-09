const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/service.controller");
const isAuthenticated = require("../middleware/auth");
const authorizeRoles = require("../middleware/role");
const optionalAuth = isAuthenticated.checkOptionalAuth;

router.post("/", isAuthenticated, authorizeRoles(["admin"]), serviceController.create);
router.get("/", optionalAuth, serviceController.getAll);
router.get("/slug/:slug", optionalAuth, serviceController.getBySlug);
router.get("/:id", optionalAuth, serviceController.getOne);
router.put("/:id", isAuthenticated, authorizeRoles(["admin"]), serviceController.update);
router.delete("/:id", isAuthenticated, authorizeRoles(["admin"]), serviceController.delete);

module.exports = router;
