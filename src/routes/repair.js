const express = require("express");
const router = express.Router();

const repairController = require('../app/controller/RepairController');

router.post("/", repairController.registerRepair);
router.get("/unapproved", repairController.listUnapprovied);
router.get("/accept", repairController.listAccept);
router.get("/:id", repairController.listRepair);
router.post("/:id", repairController.reloadRepair);

router.get("/info/:id", repairController.infoRepairAccept);
router.get("/update/:id", repairController.infoRepair);
router.put("/update/:id", repairController.updateRepair);
router.put("/accept/:id", repairController.accpetRepair);
router.delete("/delete", repairController.deleteRepair);

module.exports = router;

