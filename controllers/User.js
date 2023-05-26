const bcrypt = require('bcrypt')
const User = require('../models/User')
const jwt = require('jsonwebtoken')


///User Login

const login = async (req, res) =>{
    try{
        const{email,password} = req.body;
        
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message: "Email or Password does not match. Please try again!"
            })
        }
        
        const user = await User.findOne({email})

        if(!user){
            return res.status(400).json({
                success: false,
                message: "Email Address does not exist."
            })
        }

        if(user.password == password){
            return res.status(200).json({
                success: true,
                message: "Logged in Successfully"
            })
        }else{
            return res.status(400).json({
                success: true,
                message: "Incorrect Password"
            })
        }
        

        
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message: "Login falied due to some unexpected results."
        })
    }
}




module.exports = {login};