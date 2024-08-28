const post = require('../models/post')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const CreatePost = async(req, res) => {
    const token = req.headers['authorization'].split(' ')[1];
    const {title, content} = req.body
    try {
        const decoded = jwt.decode(token, process.env.SECRET_KEY)
        if (!decoded) return res.status(401).json({msg: 'Token is not valid'})
           const author = await User.findOne({email: decoded.email})
        const latestPost = await post.findOne().sort({ id: -1})
        let id = latestPost ? latestPost.id + 1 : 1
        const newPost = await post.create({id: id, title: title, content: content, author: author.email})
        author.Posts.push(newPost)
        author.save()
        res.status(200).json({msg: 'Post created successfully', data: newPost})
    }catch (err) {
        console.log(err)
        res.status(500).json({msg: 'Server Error'})
    }
}

const UpdatePost = (req, res) => {

}

const DeletePost = (req, res) => {

}

module.exports = {CreatePost, UpdatePost, DeletePost}