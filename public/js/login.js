
function redirect_to_main(){
    window.location.href = 'mainPage.html';

}


//Enter key event listner for password input
const passwordInput = document.getElementById("password");
if(passwordInput){
    passwordInput?.addEventListener('keypress', (event) => {
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


async function login(){
    const email = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        // Make an HTTP POST request to the login endpoint
        const response = await fetch("http://localhost:3000/api/login",{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password }),
        });

        const result = await response.json();

        if (response.ok) {
            console.log("Login Successful")
            redirect_to_main();
        }else{
            console.log("Incorrect Password")
        }
    }catch(error){
        console.error("Error occured during login", error)
    }
}