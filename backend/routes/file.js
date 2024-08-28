const express = require('express');
const router = express.Router();
const {SaveFile, upload} = require('../controllers/file')

router.route('/save').post(upload.single('avatar'), SaveFile)


module.exports = router;