



function redirect_to_main(){
    window.location.href = 'mainPage.html';

}
var username;

function login(){
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if (username == "kp" && password == "kp"){
        redirect_to_main();
        
    }else{
        document.getElementById("login-error-message").value = "Incorrect Username or Password."
    }
}

function store_username(){
    var username = document.getElementById("username").innerHTML;
    return username;
}

var username = store_username();

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






