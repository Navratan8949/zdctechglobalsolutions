const express = require("express");
const router = express.Router();
const testimonialController = require("../controllers/testimonial.controller");
const isAuthenticated = require("../middleware/auth");
const authorizeRoles = require("../middleware/role");
const optionalAuth = isAuthenticated.checkOptionalAuth;

router.post("/", isAuthenticated, authorizeRoles(["admin"]), testimonialController.create);
router.get("/", optionalAuth, testimonialController.getAll);
router.get("/:id", optionalAuth, testimonialController.getOne);
router.put("/:id", isAuthenticated, authorizeRoles(["admin"]), testimonialController.update);
router.delete("/:id", isAuthenticated, authorizeRoles(["admin"]), testimonialController.delete);

module.exports = router;
