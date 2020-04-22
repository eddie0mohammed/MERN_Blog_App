

const mongoose = require('mongoose');
const validator = require('validator');


const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: [true, 'Username is required'],
        trim: true,
        minlength: [3, 'Username should be between 3 and 20 characters'],
        maxlength: [20, 'Username should be between 3 and 20 characters'],
        validate: [validator.isAlphanumeric, 'Username can only contain alphanumeric characters']
    },

    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        validate: [validator.isEmail, "Invalid email"]
    },

    password: {
        type: String,
        required: [true, 'Password is required'],
        trim: true
        
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    active: {
        type: Boolean,
        default: false
    },

    activationToken: {
        type: String
    },

    passwordResetToken: {
        type: String
    },

    passwordResetExpires: {
        type: Date,
    },

    profilePic:{
        type: String,
        default: 'https://res.cloudinary.com/dwnuffg0b/image/upload/v1587586900/1_x0apjw.jpg'
    } 


});


module.exports = mongoose.model('User', userSchema);