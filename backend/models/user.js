const {Model, Schema, model} = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Post = require('./post')
const {v4: uuidv4} = require('uuid')
require('dotenv').config();
const userSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        default: uuidv4(),
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Please enter a valid email address"]
    },
    password : {
        type: String,
        required: [true, 'Password is required'],
        minlength: 8,
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        minlength: 3,
        maxlength: 20,
        match: /^[a-zA-Z0-9]+$/,
        lowercase: true,

    },
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        minlength: 3,
        maxlength: 20,
        match: /^[a-zA-Z]+$/,
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        minlength: 3,
        maxlength: 20,
        match: /^[a-zA-Z]+$/,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    avatar: {
        type: String,
    },
    Posts : {
        type: [Schema.Types.ObjectId],
        ref: 'Post'
    }
})

userSchema.pre('save', async function(next){
    if (!this.isModified("password")) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    }catch (err){
        console.log(err)
    }
    
})
userSchema.methods.CheckPassword = async function(password){
    try {
        return await bcrypt.compare(password, this.password)
    }catch (err){
        console.log(err)
    }
}

userSchema.methods.CreateJWT = async function(){
    let posts = [];
    for (let post in posts){
        let p = await Post.findOne({author: this._id})
        posts.push(p)
    }
    return await jwt.sign({_id: this._id, id: this.id, email: this.email, firstName: this.firstName, lastName: this.lastName, avatar: this.avatar, posts}, process.env.SECRET_KEY, {expiresIn: '10d'})
}

const User = model('User', userSchema)
module.exports = User;