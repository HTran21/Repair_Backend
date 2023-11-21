const express = require("express");
const router = express.Router();
const userContronller = require('../app/controller/UserController');

router.get('/', userContronller.listUser);
router.get('/staff', userContronller.listStaff);
router.get('/dashboard', userContronller.dashBoard);
router.get('/day', userContronller.day);
router.get('/day/:id', userContronller.phong);
router.get('/:id', userContronller.infoUser);
router.delete('/:id', userContronller.deleteStaff);
router.delete('/user/:id', userContronller.deleteUser);
router.put('/update/:id', userContronller.updateInfo)
module.exports = router;