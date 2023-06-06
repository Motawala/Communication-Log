const mongoose = require('mongoose')


const maintainLogs = new mongoose.Schema({
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
    }
})


module.exports = mongoose.model('maintainLogs', maintainLogs);

