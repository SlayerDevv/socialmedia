const express = require('express');
const router = express.Router();
const {VerifyToken} = require('../controllers/token')

router.route('/verify').post(VerifyToken)
module.exports = router;