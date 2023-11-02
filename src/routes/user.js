const express = require("express");
const router = express.Router();
const userContronller = require('../app/controller/UserController');

router.get('/', userContronller.listUser);
router.get('/day', userContronller.day);
router.get('/day/:id', userContronller.phong);
router.get('/:id', userContronller.infoUser);
router.put('/update/:id', userContronller.updateInfo)
module.exports = router;