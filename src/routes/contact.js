const express = require("express");
const router = express.Router();

const contactController = require("../app/controller/ContactController");

router.get("/", contactController.listContact);
router.get("/user/:id", contactController.listContactUser);
router.get("/:id", contactController.listRepair);
router.post("/:id", contactController.addContact);
router.delete("/:id", contactController.deleteContact);

module.exports = router;