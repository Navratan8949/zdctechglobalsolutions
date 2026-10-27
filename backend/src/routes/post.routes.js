const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");
const isAuthenticated = require("../middleware/auth");
const authorizeRoles = require("../middleware/role");
const optionalAuth = isAuthenticated.checkOptionalAuth;

router.post("/", isAuthenticated, authorizeRoles(["admin"]), postController.create);
router.get("/", optionalAuth, postController.getAll);
router.get("/slug/:slug", optionalAuth, postController.getBySlug);
router.get("/:id", optionalAuth, postController.getOne);
router.put("/:id", isAuthenticated, authorizeRoles(["admin"]), postController.update);
router.delete("/:id", isAuthenticated, authorizeRoles(["admin"]), postController.delete);
router.post("/:id/like", postController.like);

module.exports = router;
