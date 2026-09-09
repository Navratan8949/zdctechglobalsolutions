const express = require("express");
const router = express.Router();
const caseStudyController = require("../controllers/caseStudy.controller");
const isAuthenticated = require("../middleware/auth");
const authorizeRoles = require("../middleware/role");
const optionalAuth = isAuthenticated.checkOptionalAuth;

router.post("/", isAuthenticated, authorizeRoles(["admin"]), caseStudyController.create);
router.get("/", optionalAuth, caseStudyController.getAll);
router.get("/slug/:slug", optionalAuth, caseStudyController.getBySlug);
router.get("/:id", optionalAuth, caseStudyController.getOne);
router.put("/:id", isAuthenticated, authorizeRoles(["admin"]), caseStudyController.update);
router.delete("/:id", isAuthenticated, authorizeRoles(["admin"]), caseStudyController.delete);

module.exports = router;
