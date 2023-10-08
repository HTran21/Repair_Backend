const express = require("express");
const router = express.Router();
const userContronller = require('../app/controller/UserController');

router.get('/', userContronller.listUser);
module.exports = router;