const express = require("express");
const router = express.Router();
const processStepController = require("../controllers/processStep.controller");
const isAuthenticated = require("../middleware/auth");

router.route("/")
    .get(processStepController.getAllProcessSteps)
    .post(isAuthenticated, processStepController.createProcessStep);

router.route("/:id")
    .get(processStepController.getProcessStepById)
    .put(isAuthenticated, processStepController.updateProcessStep)
    .delete(isAuthenticated, processStepController.deleteProcessStep);

module.exports = router;
