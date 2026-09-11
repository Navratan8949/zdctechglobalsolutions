const express = require("express");
const router = express.Router();
const lifeAtCompanyController = require("../controllers/lifeAtCompany.controller");
const { protect } = require("../middleware/auth");

router.route("/")
    .get(lifeAtCompanyController.getAllLifeAtCompany)
    .post(protect, lifeAtCompanyController.createLifeAtCompany);

router.route("/:id")
    .get(lifeAtCompanyController.getLifeAtCompanyById)
    .put(protect, lifeAtCompanyController.updateLifeAtCompany)
    .delete(protect, lifeAtCompanyController.deleteLifeAtCompany);

module.exports = router;
