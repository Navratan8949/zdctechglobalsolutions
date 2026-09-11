const express = require("express");
const {
    getAll,
    getById,
    create,
    update,
    delete: deleteItem,
} = require("../controllers/whyChooseUs.controller");
const isAuthenticated = require("../middleware/auth");
const authorizeRoles = require("../middleware/role");

const router = express.Router();

router.get("/", getAll);
router.get("/:id", isAuthenticated, authorizeRoles(["admin"]), getById);
router.post("/", isAuthenticated, authorizeRoles(["admin"]), create);
router.put("/:id", isAuthenticated, authorizeRoles(["admin"]), update);
router.delete("/:id", isAuthenticated, authorizeRoles(["admin"]), deleteItem);

module.exports = router;
