const express = require('express');
const router = express.Router();
const {Register, Logout, Login} = require('../controllers/auth')

router.route('/login').post(Login)
router.route('/register').post(Register)
router.route('/logout').post(Logout)


module.exports = router;