const express = require("express");
const router = express.Router();
const coreValueController = require("../controllers/coreValue.controller");
const { protect } = require("../middleware/auth");

router.route("/")
    .get(coreValueController.getAllCoreValues)
    .post(protect, coreValueController.createCoreValue);

router.route("/:id")
    .get(coreValueController.getCoreValueById)
    .put(protect, coreValueController.updateCoreValue)
    .delete(protect, coreValueController.deleteCoreValue);

module.exports = router;
