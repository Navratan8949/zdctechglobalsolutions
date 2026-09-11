const express = require("express");
const router = express.Router();
const processStepController = require("../controllers/processStep.controller");
const { protect } = require("../middleware/auth");

router.route("/")
    .get(processStepController.getAllProcessSteps)
    .post(protect, processStepController.createProcessStep);

router.route("/:id")
    .get(processStepController.getProcessStepById)
    .put(protect, processStepController.updateProcessStep)
    .delete(protect, processStepController.deleteProcessStep);

module.exports = router;
