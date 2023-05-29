
//Function to redirect the user to the main Page.
function redirect_to_main(){
    window.location.href = '/src/mainPage.html';

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
    try {
        // Make an HTTP POST request to the login endpoint
        const response = await fetch("http://localhost:3000/api/login",{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })

        //Stores the Authentication results
        const result = await response.json();

        //If the result is successfull Redirect the user to the main Page. Else Prompts the user to Enter
        //the correct Credentials.
        if (response.ok) {
            console.log("Login Successful")
            redirect_to_main();
        }else{
            const error_message = document.getElementById("login-error-message");
            error_message.style.display='block';
            error_message.innerHTML = "Incorrect Email/Password"
            setTimeout(function() {
                // Redirect to the desired page
                error_message.style.display='none';
              },1000);
            
            console.log("Incorrect Password")
        }
    }catch(error){
        console.error("Error occured during login", error)
    }
}


const resetButton = document.getElementById("reset-button");
if(resetButton){
    resetButton.addEventListener('click', resetPassword);
}

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

   
    try{
        if(password == repeatPassword){
            const response = await fetch("http://localhost:3000/api/resetPassword",{
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
    }catch(error){

    }
}

async function display(){
    const forgotMessage = document.getElementById('forgot-message')
    forgotMessage.style.color = 'rgb(241, 241, 112)'
    forgotMessage.innerHTML = "Password Updated"
    setTimeout(function() {
    // Redirect to the desired page
    window.location.href = '/src/login.html'; // Replace with your desired URL
    },800);
}

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