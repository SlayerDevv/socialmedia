const express = require('express');
const router = express.Router();
const {GetByUsername, getUser} = require('../controllers/user')

router.route('/get').get(getUser)
router.route('/:username').get(GetByUsername)


module.exports = router;