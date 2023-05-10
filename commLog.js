
var input = document.getElementById("password");
input.addEventListener("keypress", function(event){
    if(event.key == "Enter"){
        event.preventDefault();
        document.getElementById("enter-button").click();
    }
    login();
});

function login(){
    var username  = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    
    
    if(username == "karanp45" && password == "Kp1234"){
        alert("Login Successful")
    }else {
        alert("Login Unsucessful");
    }
}