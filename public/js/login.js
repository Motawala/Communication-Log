import { homePage } from "./maintain.js";

function redirect_to_main(){
    window.location.href = 'mainPage.html';

}

document.addEventListener('DOMContentLoaded', ()=>{
    const passwordInput = document.getElementById("password");
    const loginInput = document.getElementById("login-button");

    passwordInput.addEventListener('keyup', (event) => {
        if(event.key == "Enter"){
            event.preventDefault();
            loginInput.click();
        }
    });
});

document.addEventListener('DOMContentLoaded', () =>{
    const usernameInput = document.getElementById("username");
    const loginInput = document.getElementById("login-button");

    usernameInput.addEventListener('keydown', event => {
        if(event.key == "Enter"){
            event.preventDefault();
            loginInput.click();
        }
    });
});


function login(){
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
   
    if (username == "kp" && password == "kp"){
        redirect_to_main();
        
    }else{
        document.getElementById("login-error-message").innerHTML = "Incorrect Username or Password."
    }
}




function welcomeMessage(){
    var message = "Welcome ";
    if(this.username==null){
        document.getElementById("welcome-message").innerHTML = message;
    }else{
        document.getElementById("welcome-message").innerHTML = message;
    }
}

function send_message(){
    var message = document.getElementById("note-input").value;
    document.getElementById("message-sent").innerHTML=message;
}






