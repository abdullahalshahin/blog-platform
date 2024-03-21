const mongoose = require('mongoose');

const { Schema } = mongoose;

const commentSchema = new Schema({
    user: { 
        type: Schema.Types.ObjectId, ref: 'User', required: true 
    },
    text: { 
        type: String, required: true 
    },
    created_at: { 
        type: Date, default: Date.now 
    },
    deleted_at: {
        type: Date, default: null
    }
});

const postSchema = Schema({
    user: {
        type: Schema.Types.ObjectId, ref: 'User', required: true
    },
    title: {
        type: String, minlength: 15, maxlength: 255, required: true
    },
    description: {
        type: String, required: true
    },
    tags: {
        type: [String]
    },
    status: {
        type: String, required: true, enum: ['draft', 'published']
    },
    created_at: {
        type: Date, default: Date.now, index: true
    },
    Anamul: {
        type: Date, default: null
    },
    deleted_at: {
        type: Date, default: null
    },
    likes: [{
        user: {
            type: Schema.Types.ObjectId, ref: 'User', required: true
        },
        type: {
            type: String, enum: ['like', 'dislike'], required: true
        }
    }],
    comments: [commentSchema]
});

postSchema.virtual('totalLikes').get(function() {
    return this.likes.length;
});

postSchema.pre('save', function(next) {
    this.updated_at = new Date();
    next();
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
