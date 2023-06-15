const bcrypt = require('bcryptjs')
const User = require('../models/User')
const { MongoClient, ServerApiVersion } = require('mongodb');

//User Signup
const signUp = async (req, res) => {
    try{
        //Request the information from the user.
        const {firstname, lastname, username, email, password} = req.body;

        //Check if the user already exist
        const existingUser = await User.findOne({email});
        //Condition to check if the user already exist.
        if(existingUser){
            req.session.error = "User Already Exist"
            return res.status(400).json({
                success: false,
                message: "This email is already registered."
            })
        }

        

        //Encrypt the users Password.
        let hashedPassword
        try{
            hashedPassword = await bcrypt.hash(password, 9);
        }catch(error){
            req.session.error = "Error in Hashing the Password"
            return res.status(500).json({
                success: false,
                message: "Error in hashing Password", error
            })
        }

        //Create the new User
        const user = await User.create({
            firstname, lastname, username, email, password
        })

        //Check the status of the new user.
        
        if(user){
            //Redirect the user to the login Page
            return res.status(200).json({
                success: true,
                message: "User Created"
        })
        }else{
            return res.status(400).json({
                sucesss: false,
                message: "Error in logging in"
            })
        }

    }catch(error){
        return res.status(500).json({
            success: false,
            message: "There is problem creating the User."
        })
    }
}





///User Login
const login = async (req, res) =>{
    try{
        //Get the email and password that the user has entered.
        const{email,password} = req.body;
        
        //If the email and password does not match according to the Database, display error
        if(!email || !password){
            req.session.error = "Email/Password does not match"
            return res.status(400).json({
                success:false,
                message: "Email or Password does not match. Please try again!"
            })
        }
        
        //Find the user using his email from the database.
        const user = await User.findOne({email})

        //If user not found, return error
        if(!user){
            req.session.error = "Email does not exist"
            return res.status(400).json({
                success: false,
                message: "Email Address does not exist."
            })
        }
        
        //Encrypt the user enterd password and compare it to the database
        
        let hashedPassword = await bcrypt.hash(password, 9);
        const result = await bcrypt.compare(user.password,hashedPassword)
        if(result){
             //Authorize the page and session key
            req.session.isAuth = true;
            req.session.username = user.username;
            return res.status(200).json(user.firstname)
        }else{
            return res.status(400).json({
                message: result
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

//Reset Users Password
const reset = async (req, res) =>{
    const {email, username, password} = req.body;

    const user = await User.findOne({email})
    //Compares the hashed password
    try{
        if(user.email == email && user.username == username){
            user.password = password;
            user.save()
            return res.redirect('/user/loginPage')
        }else{
            req.session.error = "Email and Username does not match"
            return res.redirect('/loginPage/reset')
        }
    }catch(error){
        return res.status(400).json({
            success: false,
            message: "Failed to reset the password"
        })
    }

}

/*
This function logs out the user and destroys the session key
*/
const logout = async (req,res)=>{
    try{
        req.session.destroy.username;
        req.session.destroy()
        return res.status(200).json({
            success: true,
            message:"logout successful"
        })
    }catch(err){
        console.log("error destroying the session",err)
    }
}


const getName = async(req,res)=>{
    try{
        const username = req.session.username;
        const firstname = await User.findOne({username})
        return res.status(200).json({
            message:firstname.firstname
        });
    }catch(error){
        return res.status(400).json({
            success:false,
            message:"Name not found"
        })
    }
}



//Export the login module for the API
module.exports = {login, signUp, reset, logout, getName};