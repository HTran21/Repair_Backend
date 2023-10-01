const express = require("express");
const router = express.Router();

const LoginController = require("../app/controller/LoginController");

router.post("/", LoginController.login);

module.exports = router;