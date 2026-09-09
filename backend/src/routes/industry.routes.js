const express = require("express");
const router = express.Router();
const industryController = require("../controllers/industry.controller");
const isAuthenticated = require("../middleware/auth");
const authorizeRoles = require("../middleware/role");
const optionalAuth = isAuthenticated.checkOptionalAuth;

router.post("/", isAuthenticated, authorizeRoles(["admin"]), industryController.create);
router.get("/", optionalAuth, industryController.getAll);
router.get("/:id", optionalAuth, industryController.getOne);
router.put("/:id", isAuthenticated, authorizeRoles(["admin"]), industryController.update);
router.delete("/:id", isAuthenticated, authorizeRoles(["admin"]), industryController.delete);

module.exports = router;
