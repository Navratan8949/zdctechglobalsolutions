const express = require("express");
const router = express.Router();
const portfolioController = require("../controllers/portfolio.controller");
const isAuthenticated = require("../middleware/auth");
const authorizeRoles = require("../middleware/role");
const optionalAuth = isAuthenticated.checkOptionalAuth;

router.post("/", isAuthenticated, authorizeRoles(["admin"]), portfolioController.create);
router.get("/", optionalAuth, portfolioController.getAll);
router.get("/slug/:slug", optionalAuth, portfolioController.getBySlug);
router.get("/:id", optionalAuth, portfolioController.getOne);
router.put("/:id", isAuthenticated, authorizeRoles(["admin"]), portfolioController.update);
router.delete("/:id", isAuthenticated, authorizeRoles(["admin"]), portfolioController.delete);

module.exports = router;
