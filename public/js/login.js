
//Function to redirect the user to the main Page.
function redirect_to_main(){
    window.location.href = '/user/dashboard';

}



//Enter key event listner for password input
const passwordInput = document.getElementById("password");
if(passwordInput){
    passwordInput.addEventListener('keypress', (event) => {
        if(event.key == "Enter"){
            event.preventDefault();
            login();
        }
    });
}




//Enter click event listner for username input
const usernameInput = document.getElementById("username");
if(usernameInput){
    usernameInput.addEventListener('keypress', (event) => {
        if(event.key == "Enter"){
            event.preventDefault();
            login();
        }
    });
}



//onclick event listner for login-button
const loginButton = document.getElementById("login-button");
if(loginButton){
    loginButton.addEventListener('click', login);
}


// Call the function for login to the mainPage


//Loads the Welcome message onload.
const body = document.getElementById("bd");
if(body){
    window.document.addEventListener('load', () =>{
        welcomeMessage();

    });
}


function welcomeMessage(){
    var message = "Welcome";
    document.getElementById("welcome-message").innerHTML = message;
    
}


/*
Login Function that Takes the Email and Password from the user and Authenticates it with the Database
*/
async function login(){
    //Gets the Email and Password from the User
    const email = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    //Makes a request to the database for authentication
        // Make an HTTP POST request to the login endpoint
        const response = await fetch("/user/login",{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        }).then(response =>{
            if(response.redirected){
                redirect_to_main();
                console.log('redirected')
            }else{
                //If the result is successfull Redirect the user to the main Page. Else Prompts the user to Enter
                //the correct Credentials.
                const error_message = document.getElementById("login-error-message");
                error_message.style.display='block';
                error_message.innerHTML = "Incorrect Email/Password"
                setTimeout(function() {
                    // Redirect to the desired page
                    error_message.style.display='none';
                },1000);
                
                console.log("Incorrect Password")
            }
        })  
}

//Listens to an event onclick reset button
const resetButton = document.getElementById("reset-button");
if(resetButton){
    resetButton.addEventListener('click', resetPassword);
}

//Listen to enter key press 
const RepeatPasswordInput = document.getElementById("repeat-new-password");
if(RepeatPasswordInput){
    RepeatPasswordInput.addEventListener('keypress', (event) => {
        if(event.key == "Enter"){
            event.preventDefault();
            resetPassword();
        }
    });
}

//Resets the password for the user
async function resetPassword(){

    const username = document.getElementById("username-forgot").value;
    const email = document.getElementById("email-forgot").value;
    const password = document.getElementById("new-password").value;
    const repeatPassword = document.getElementById("repeat-new-password").value;

   //Post request made to the server to update the password for the user
    try{
        if(password == repeatPassword){
            const response = await fetch("http://localhost:3000/user/login",{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email,username,password})
            })

            if(response.ok){
                console.log("Password Update Successful");
                display();
                return res.status(200).json({
                    success: true,
                    message: "Password Updated"
                })
            }else{
                console.log('Password reset unsuccessful');
                displayEmailError();
            }
        }else{
            const error_message = document.getElementById("forgot-message");
                error_message.style.display='block';
                error_message.innerHTML = "Password does not match"
                setTimeout(function() {
                    // Redirect to the desired page
                    error_message.style.display='none';
                    error_message.style.color = "red";
                },1000);
                
                console.log("Password does not match")
        }
    }catch(err){
        console.log(err)
    }
}

//Function displays the message onscreen if the password updated 
async function display(){
    const forgotMessage = document.getElementById('forgot-message')
    forgotMessage.style.color = 'rgb(241, 241, 112)'
    forgotMessage.innerHTML = "Password Updated"
    setTimeout(function() {
    // Redirect to the desired page
    window.location.href = '/user/loginPage'; // Replace with your desired URL
    },800);
}

//Displays the error message if the email/username does not exist
async function displayEmailError(){
    const error_message = document.getElementById("forgot-message");
    error_message.style.display='block';
    
    setTimeout(function() {
    // Redirect to the desired page
        error_message.innerHTML = "Invalid Email/Username"
        error_message.style.display='none';
        error_message.style.color = "red";
    },1200);
}


//Eye button event listener
const eyeButton = document.getElementById("eye-button");
if(eyeButton){
    eyeButton.addEventListener('click',showPassword)
}

async function showPassword(){
    let passwordButton = document.getElementById('password');
    if(passwordButton.type == "password"){
        eyeButton.src = "/Images/eye-open.png"
        eyeButton.style.color = "white"
        eyeButton.style.height = "20px"
        eyeButton.style.width = "25px"
        passwordButton.type = "text"
    }else{
        eyeButton.src = "/Images/eye-close.png"
        eyeButton.style.height = "20px"
        eyeButton.style.width = "25px"
        passwordButton.type = "password"
    }
}


//Logout button event listener
let logoutButton = document.getElementById("logout-button");
if(logoutButton){
    logoutButton.addEventListener('click', logout);
}

//This function logsout the user and redirects the user to the login page
async function logout(){
    const logoutLink = document.getElementById('logout-button')
    const response = await fetch("http://localhost:3000/user/logout",{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
    if(response.ok){
        window.location.href = "/user/loginPage"
    }else{
        console.log("error in logout")
    }
}

//Reset password show password function
const eyeButtonOne = document.getElementById('eye-button-one');
if(eyeButtonOne){
    eyeButtonOne.addEventListener('click', showNewPassword);
}

async function showNewPassword(){
    let newPassword = document.getElementById('new-password');
    if(newPassword.value != undefined){
        if(newPassword.type == "password"){
            eyeButtonOne.src = "/Images/eye-open.png"
            eyeButtonOne.style.color = "white"
            eyeButtonOne.style.height = "20px"
            eyeButtonOne.style.width = "25px"
            newPassword.type = "text"
        }else{
            eyeButtonOne.src = "/Images/eye-close.png"
            eyeButtonOne.style.height = "20px"
            eyeButtonOne.style.width = "25px"
            newPassword.type = "password"
        }
    }
}


//Reset repeat the new password, show password function
const eyeButtonTwo = document.getElementById('eye-button-two');
if(eyeButtonTwo){
    eyeButtonTwo.addEventListener('click', showRepeatPassword);
}

async function showRepeatPassword(){
    let newPassword = document.getElementById('repeat-new-password');
    if(newPassword.value != null){
        if(newPassword.type == "password"){
            eyeButtonTwo.src = "/Images/eye-open.png"
            eyeButtonTwo.style.color = "white"
            eyeButtonTwo.style.height = "20px"
            eyeButtonTwo.style.width = "25px"
            newPassword.type = "text"
        }else{
            eyeButtonTwo.src = "/Images/eye-close.png"
            eyeButtonTwo.style.height = "20px"
            eyeButtonTwo.style.width = "25px"
            newPassword.type = "password"
        }
    }

}

