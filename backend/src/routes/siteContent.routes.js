const express = require("express");
const router = express.Router();
const siteContentController = require("../controllers/siteContent.controller");
const isAuthenticated = require("../middleware/auth");
const authorizeRoles = require("../middleware/role");
const optionalAuth = isAuthenticated.checkOptionalAuth;

router.post("/", isAuthenticated, authorizeRoles(["admin"]), siteContentController.create);
router.get("/", optionalAuth, siteContentController.getAll);
router.get("/current", optionalAuth, siteContentController.getCurrent);
router.get("/:id", optionalAuth, siteContentController.getOne);
router.put("/:id", isAuthenticated, authorizeRoles(["admin"]), siteContentController.update);
router.delete("/:id", isAuthenticated, authorizeRoles(["admin"]), siteContentController.delete);

module.exports = router;
