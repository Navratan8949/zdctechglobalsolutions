const express = require("express");
const router = express.Router();
const coreValueController = require("../controllers/coreValue.controller");
const isAuthenticated = require("../middleware/auth");

router.route("/")
    .get(coreValueController.getAllCoreValues)
    .post(isAuthenticated, coreValueController.createCoreValue);

router.route("/:id")
    .get(coreValueController.getCoreValueById)
    .put(isAuthenticated, coreValueController.updateCoreValue)
    .delete(isAuthenticated, coreValueController.deleteCoreValue);

module.exports = router;
