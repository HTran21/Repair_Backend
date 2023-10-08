const express = require("express");
const router = express.Router();
const userContronller = require('../app/controller/AuthenticationController')

router.post('/adduser', userContronller.addUser);
router.post('/login', userContronller.login);

module.exports = router;