const express = require("express");
const router = express.Router();

const repairController = require('../app/controller/RepairController');

router.post("/", repairController.registerRepair);
router.get("/unapproved", repairController.listUnapprovied);
router.get("/:id", repairController.listRepair);
router.get("/update/:id", repairController.infoRepair);
router.put("/update/:id", repairController.updateRepair);
router.delete("/delete", repairController.deleteRepair);

module.exports = router;

