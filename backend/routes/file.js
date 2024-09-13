const express = require('express');
const router = express.Router();
const {SaveFile, upload, multipleUpload} = require('../controllers/file')

router.route('/save').post(multipleUpload, SaveFile)


module.exports = router;