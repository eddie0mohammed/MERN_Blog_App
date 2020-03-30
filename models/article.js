
const mongoose = require('mongoose');


const articleSchema = new mongoose.Schema({

    title: {
        type: String,
        required: [true, 'Title is required']
    },

    article: {
        type: String,
        required: [true, 'Article is required']
    },

    imageURL: {
        type: String,
        default: 'https://source.unsplash.com/random',
        // default: ''
        // required: [true, 'Image is required']
    },

    createdAt: {
        type: Date, 
        default: Date.now
    }
}); 



module.exports = mongoose.model('Article', articleSchema);