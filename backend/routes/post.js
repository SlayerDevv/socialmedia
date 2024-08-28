const express = require('express')
const router = express.Router();
const {CreatePost, DeletePost, UpdatePost} = require('../controllers/post')
const {auth} = require('../middleware/authentication')


router.route('/createPost', auth).post(CreatePost);
router.route('/updatePost/:id', auth).post(UpdatePost);
router.route('/deletePost/:id', auth).post(DeletePost);


module.exports = router;