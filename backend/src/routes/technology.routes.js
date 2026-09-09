const express = require("express");
const router = express.Router();
const technologyController = require("../controllers/technology.controller");
const isAuthenticated = require("../middleware/auth");
const authorizeRoles = require("../middleware/role");
const optionalAuth = isAuthenticated.checkOptionalAuth;

router.post("/", isAuthenticated, authorizeRoles(["admin"]), technologyController.create);
router.get("/", optionalAuth, technologyController.getAll);
router.get("/:id", optionalAuth, technologyController.getOne);
router.put("/:id", isAuthenticated, authorizeRoles(["admin"]), technologyController.update);
router.delete("/:id", isAuthenticated, authorizeRoles(["admin"]), technologyController.delete);

module.exports = router;
