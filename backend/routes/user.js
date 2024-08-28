const express = require('express');
const router = express.Router();
const {GetUserByUsername, get_user} = require('../controllers/user')

router.route('/get_user').get(get_user)
router.route('/:username').get(GetUserByUsername)


module.exports = router;