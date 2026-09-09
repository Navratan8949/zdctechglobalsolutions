const express = require("express");
const router = express.Router();
const faqController = require("../controllers/faq.controller");
const isAuthenticated = require("../middleware/auth");
const authorizeRoles = require("../middleware/role");
const optionalAuth = isAuthenticated.checkOptionalAuth;

router.post("/", isAuthenticated, authorizeRoles(["admin"]), faqController.create);
router.get("/", optionalAuth, faqController.getAll);
router.get("/:id", optionalAuth, faqController.getOne);
router.put("/:id", isAuthenticated, authorizeRoles(["admin"]), faqController.update);
router.delete("/:id", isAuthenticated, authorizeRoles(["admin"]), faqController.delete);

module.exports = router;
