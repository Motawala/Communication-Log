const mongoose = require('mongoose')


//Creates a userSchema for the Database
const userSchema = new mongoose.Schema({
    firstname:{
        type: String,
        required: true,
        maxlength: 32,
        trim: true
    },
    lastname:{
        type: String,
        required: true,
        maxlength: 32,
        trim: true
    },
    username:{
        type:String,
        required:true,
        trim:true,
        maxlength:32
    },
    email:{
        type:String,
        trim:true,
        required:true,
        unique: true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
})


//Exports the model
module.exports = mongoose.model('user', userSchema);

