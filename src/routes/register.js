const express = require("express");
const router = express.Router();

const registerController = require('../app/controller/RegisterController');

router.post('/adduser', registerController.addUser);

module.exports = router;