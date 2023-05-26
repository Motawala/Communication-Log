const mongoose = require('mongoose')

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


const usr = mongoose.model('user', userSchema)


const newUser = new usr({
    firstname: 'Paul',
    lastname: "Patel",
    email: "paul1100@gmail.com",
    password: "PP299"
})

newUser.save()
  .then(() => {
    console.log('User saved successfully');
    mongoose.disconnect();
  })
  .catch((error) => {
    console.error('Error saving user:', error);
    mongoose.disconnect();
  });



module.exports = mongoose.model('user', userSchema);

