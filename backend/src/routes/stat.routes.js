const express = require("express");
const router = express.Router();
const statController = require("../controllers/stat.controller");
const isAuthenticated = require("../middleware/auth");

router.route("/")
    .get(statController.getAllStats)
    .post(isAuthenticated, statController.createStat);

router.route("/:id")
    .get(statController.getStatById)
    .put(isAuthenticated, statController.updateStat)
    .delete(isAuthenticated, statController.deleteStat);

module.exports = router;
