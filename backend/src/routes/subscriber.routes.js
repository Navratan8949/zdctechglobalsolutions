const express = require("express");
const router = express.Router();
const subscriberController = require("../controllers/subscriber.controller");
const isAuthenticated = require("../middleware/auth");
const authorizeRoles = require("../middleware/role");

router.post("/", subscriberController.create);
router.get("/", isAuthenticated, authorizeRoles(["admin"]), subscriberController.getAll);
router.get("/:id", isAuthenticated, authorizeRoles(["admin"]), subscriberController.getOne);
router.put("/:id", isAuthenticated, authorizeRoles(["admin"]), subscriberController.update);
router.delete("/:id", isAuthenticated, authorizeRoles(["admin"]), subscriberController.delete);

module.exports = router;
