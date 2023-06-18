const mongoose = require('mongoose')


const housekeepLogs = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        maxlength: 32,
        trim: true
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


module.exports = mongoose.model('housekeepLogs', housekeepLogs);

