const bcrypt = require('bcrypt')
const User = require('../models/User')
//User Signup
const signUp = async (req, res) => {
    try{
        //Request the information from the user.
        const {firstname, lastname, username, email, password} = req.body;

        //Check if the user already exist
        const existingUser = await User.findOne({email});
        //Condition to check if the user already exist.
        if(existingUser){
            return res.status(400).json({
                success: false,
                message: "This email is already registered."
            })
        }

        

        //Encrypt the users Password.
        let hashedPassword
        try{
            hashedPassword = await bcrypt.hash(password, 10);
        }catch(error){
            return res.status(500).json({
                success: false,
                message: "Error in hashing Password", error
            })
        }

        //Create the new User
        const user = await User.create({
            firstname, lastname, username, email, password: hashedPassword
        })

        //Check the status of the new user.
        
        if(user){
            return res.status(200).json({
                success: true,
                message: "User Created Successfully"
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
            return res.status(400).json({
                success:false,
                message: "Email or Password does not match. Please try again!"
            })
        }
        
        //Find the user using his email from the database.
        const user = await User.findOne({email})

        //If user not found, return error
        if(!user){
            return res.status(400).json({
                success: false,
                message: "Email Address does not exist."
            })
        }
        
        //Encrypt the user enterd password and compare it to the database
        let hashedPassword
        try{
            hashedPassword = await bcrypt.hash(password, 10);
            bcrypt.compare(password,user.password, function(err, result){
                if(result){
                    return res.status(200).json({
                        success: true,
                        message: "login Successful."
                    })
                }else{
                    return res.status(400).json({
                        success: true,
                        message: "Incorrect Password"
                    })
                }
            })
        }catch(error){
            return res.status(500).json({
                success: false,
                message:"Error in login"
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

    try{
        hashedPassword = await bcrypt.hash(password, 10);
        if(user.email == email && user.username == username){
            user.password = hashedPassword;
            user.save()
            return res.status(200).json({
                success: true,
                message: "Email and Username exists and Password is Updated"
            })
        }else{
            return res.status(400).json({
                success: false,
                message: username
            })
        }
    }catch(error){
        return res.status(400).json({
            success: false,
            message: "Failed to reset the password"
        })
    }

}





//Export the login module for the API
module.exports = {login, signUp, reset};