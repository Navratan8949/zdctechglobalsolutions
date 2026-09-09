const express = require("express");
const router = express.Router();
const jobApplicationController = require("../controllers/jobApplication.controller");
const upload = require("../utils/multer");
const isAuthenticated = require("../middleware/auth");
const authorizeRoles = require("../middleware/role");

router.post("/", upload.single("resume"), jobApplicationController.create);
router.get("/", isAuthenticated, authorizeRoles(["admin"]), jobApplicationController.getAll);
router.get("/:id", isAuthenticated, authorizeRoles(["admin"]), jobApplicationController.getOne);
router.put("/:id", isAuthenticated, authorizeRoles(["admin"]), jobApplicationController.update);
router.delete("/:id", isAuthenticated, authorizeRoles(["admin"]), jobApplicationController.delete);

module.exports = router;
