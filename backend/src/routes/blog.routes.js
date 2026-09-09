const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blog.controller");
const isAuthenticated = require("../middleware/auth");
const authorizeRoles = require("../middleware/role");
const optionalAuth = isAuthenticated.checkOptionalAuth;

router.post("/", isAuthenticated, authorizeRoles(["admin"]), blogController.create);
router.get("/", optionalAuth, blogController.getAll);
router.get("/slug/:slug", optionalAuth, blogController.getBySlug);
router.get("/:id", optionalAuth, blogController.getOne);
router.put("/:id", isAuthenticated, authorizeRoles(["admin"]), blogController.update);
router.delete("/:id", isAuthenticated, authorizeRoles(["admin"]), blogController.delete);

module.exports = router;
