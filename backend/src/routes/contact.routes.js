const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contact.controller");
const isAuthenticated = require("../middleware/auth");
const authorizeRoles = require("../middleware/role");

router.post("/", contactController.create);
router.get("/", isAuthenticated, authorizeRoles(["admin"]), contactController.getAll);
router.get("/:id", isAuthenticated, authorizeRoles(["admin"]), contactController.getOne);
router.put("/:id", isAuthenticated, authorizeRoles(["admin"]), contactController.update);
router.delete("/:id", isAuthenticated, authorizeRoles(["admin"]), contactController.delete);

module.exports = router;
