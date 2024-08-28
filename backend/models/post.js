const {model, Schema} = require('mongoose')


const postSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unque: true,
    },
    author : {
        type: String,
        ref: 'User'
    },
    content: {
        type : String,
        minlength: [0, 'Content must be at least 10 characters long'],
        maxlength: [500, 'Content must be at most 500 characters long'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    likes: [{ type: Schema.Types.ObjectId, ref: 'User', default: 0}],
    dislikes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    views: {
        type: Number,
        default: 0,
    },
    shares: {
        type: Number,
        default: 0,
    },
    tags: {
        type: [String],
        default: [],
    },
    isPublished: {
        type: Boolean,
        default: false,
    },
    publishedAt: {
        type: Date,
    },
    isFeatured: {
        type: Boolean,
        default: false,
    },
    attachements: {
        type: [String],
        default: [],
        enum: ['image', 'video'],
        validate: {
            validator: (v) => v.every((item) => ['image', 'video'].includes(item)),
            message: 'Invalid attachment type',
        },
    }
})

const Post = model('post', postSchema)
module.exports = Post;