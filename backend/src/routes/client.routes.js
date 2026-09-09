const express = require("express");
const router = express.Router();
const clientController = require("../controllers/client.controller");
const isAuthenticated = require("../middleware/auth");
const authorizeRoles = require("../middleware/role");
const optionalAuth = isAuthenticated.checkOptionalAuth;

router.post("/", isAuthenticated, authorizeRoles(["admin"]), clientController.create);
router.get("/", optionalAuth, clientController.getAll);
router.get("/:id", optionalAuth, clientController.getOne);
router.put("/:id", isAuthenticated, authorizeRoles(["admin"]), clientController.update);
router.delete("/:id", isAuthenticated, authorizeRoles(["admin"]), clientController.delete);

module.exports = router;
