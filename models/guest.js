const mongoose = require('mongoose')


const guestLogs = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        maxlength: 32,
        trim: true,
        unique: true
    },
    content:{
        type: String,
        trim: true
    },
    time:{
        type: String,
        required: true,
        trim: true
    },
    date:{
        type: String,
        required: true,
        trim: true
    }
})


module.exports = mongoose.model('guestLogs', guestLogs);

