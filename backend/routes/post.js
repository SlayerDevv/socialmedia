const express = require('express')
const router = express.Router();
const {CreatePost, DeletePost, UpdatePost, GetPosts} = require('../controllers/post')
const {auth} = require('../middleware/authentication')


router.route('/createPost').post(CreatePost);
router.route('/updatePost/:id').put(UpdatePost);
router.route('/deletePost/:id').delete(DeletePost);
router.route('/getposts').get(GetPosts)

module.exports = router;