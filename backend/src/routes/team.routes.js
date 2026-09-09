const express = require("express");
const router = express.Router();
const teamController = require("../controllers/team.controller");
const isAuthenticated = require("../middleware/auth");
const authorizeRoles = require("../middleware/role");
const optionalAuth = isAuthenticated.checkOptionalAuth;

router.post("/", isAuthenticated, authorizeRoles(["admin"]), teamController.create);
router.get("/", optionalAuth, teamController.getAll);
router.get("/:id", optionalAuth, teamController.getOne);
router.put("/:id", isAuthenticated, authorizeRoles(["admin"]), teamController.update);
router.delete("/:id", isAuthenticated, authorizeRoles(["admin"]), teamController.delete);

module.exports = router;
