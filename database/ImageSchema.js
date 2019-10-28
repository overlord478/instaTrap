const mongoose = require('mongoose');

const images = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    
    image:{
        data:Buffer,
        contentType:String
    }
})

module.exports = mongoose.model('images',images);