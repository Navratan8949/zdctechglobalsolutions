const express = require("express");
const router = express.Router();
const lifeAtCompanyController = require("../controllers/lifeAtCompany.controller");
const isAuthenticated = require("../middleware/auth");

router.route("/")
    .get(lifeAtCompanyController.getAllLifeAtCompany)
    .post(isAuthenticated, lifeAtCompanyController.createLifeAtCompany);

router.route("/:id")
    .get(lifeAtCompanyController.getLifeAtCompanyById)
    .put(isAuthenticated, lifeAtCompanyController.updateLifeAtCompany)
    .delete(isAuthenticated, lifeAtCompanyController.deleteLifeAtCompany);

module.exports = router;
