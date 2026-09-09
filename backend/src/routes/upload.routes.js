const express = require("express");
const uploadController = require("../controllers/upload.controller");
const upload = require("../utils/multer");
const isAuthenticated = require("../middleware/auth");
const authorizeRoles = require("../middleware/role");

const router = express.Router();

router.post("/", isAuthenticated, authorizeRoles(["admin"]), upload.single("file"), uploadController.uploadFile);
router.delete("/", isAuthenticated, authorizeRoles(["admin"]), uploadController.deleteFile);

module.exports = router;
