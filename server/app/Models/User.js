const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String, minlength: 3, maxlength: 50, required: true
    },
    gender: {
        type: String, required: false, default: null, enum: ['male', 'female', 'others']
    },
    date_of_birth: {
        type: Date, required: false, default: null
    },
    phone_number: {
        type: String, minlength: 11, maxlength: 15, required: true, unique: true
    },
    email: {
        type: String, minlength: 5, maxlength: 150, required: true, unique: true
    },
    password: {
        type: String, required: true
    },
    security: {
        type: String, minlength: 6, required: true
    },
    address: {
        type: String, required: false, default: null
    },
    about_me: {
        type: String, required: false, default: null
    },
    profile_image: {
        type: String, required: false, default: null
    },
    status: {
        type: String, required: true, enum: ['active', 'inactive', 'blocked']
    },
    verified_at: {
        type: Date, default: null
    },
    created_at: {
        type: Date, default: Date.now
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
