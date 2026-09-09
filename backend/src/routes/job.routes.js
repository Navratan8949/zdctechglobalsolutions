const express = require("express");
const router = express.Router();
const jobController = require("../controllers/job.controller");
const isAuthenticated = require("../middleware/auth");
const authorizeRoles = require("../middleware/role");
const optionalAuth = isAuthenticated.checkOptionalAuth;

router.post("/", isAuthenticated, authorizeRoles(["admin"]), jobController.create);
router.get("/", optionalAuth, jobController.getAll);
router.get("/slug/:slug", optionalAuth, jobController.getBySlug);
router.get("/:id", optionalAuth, jobController.getOne);
router.put("/:id", isAuthenticated, authorizeRoles(["admin"]), jobController.update);
router.delete("/:id", isAuthenticated, authorizeRoles(["admin"]), jobController.delete);

module.exports = router;
