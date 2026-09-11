const express = require("express");
const router = express.Router();
const statController = require("../controllers/stat.controller");
const { protect } = require("../middleware/auth");

router.route("/")
    .get(statController.getAllStats)
    .post(protect, statController.createStat);

router.route("/:id")
    .get(statController.getStatById)
    .put(protect, statController.updateStat)
    .delete(protect, statController.deleteStat);

module.exports = router;
