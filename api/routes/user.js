const express = require('express');

const UserCtrl = require('../app/user/UserCtrl');

const router = express.Router();

router.post('/signup', UserCtrl.signUp);
router.post('/login', UserCtrl.login);
router.delete('/deleteuser/:email', UserCtrl.deleteUser);

module.exports = router;