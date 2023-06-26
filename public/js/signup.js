
//onclick event listner for login-button
const loginButton = document.getElementById("create-input");
if(loginButton){
    loginButton.addEventListener('click', createAccount);
}



const passwordInput = document.getElementById("repeat-password-input");
if(passwordInput){
    passwordInput.addEventListener('keypress', (event) => {
        if(event.key == "Enter"){
            event.preventDefault();
            createAccount();
        }
    });
}

async function redirect_to_login(){
    window.location.href="/src/login.html"
}

async function createAccount(){
    const firstname = document.getElementById('firstname-input').value;
    const lastname = document.getElementById('lastname-input').value;
    const username = document.getElementById('username-input').value;
    var email = document.getElementById('email-input').value;
    email = email.toLowerCase();
    const password = document.getElementById('password-input').value;
    const repeatPassword = document.getElementById('repeat-password-input').value;

    if(password == repeatPassword){
        try {
            // Make an HTTP POST request to the login endpoint
            const response = await fetch("/user/signup",{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({firstname,lastname,username,email, password}),
            })

            if(response.ok){
                console.log('success')
                displayMessage();
            }else{
                const error_message = document.getElementById("signup-message");
                error_message.style.color='red'
                error_message.innerHTML = "Incorrect Email Format"
                console.log("Incorrect Email")
            }

        }catch(error){

        }
    }else{
        const error_message = document.getElementById("signup-message");
                error_message.style.color='red'
                error_message.innerHTML = "Password does not Match"
                console.log("Password Does not Match")
    }

}


async function displayMessage(){
    const signUpMessage = document.getElementById('signup-message');

    signUpMessage.innerHTML = "Successfully Created the Account"
    setTimeout(function() {
        // Redirect to the desired page
        window.location.href = '/user/loginPage'; // Replace with your desired URL
    },800);
}


const eyeButtonCreate = document.getElementById('eye-button-create');
if(eyeButtonCreate){
    eyeButtonCreate.addEventListener('click',showPasswordCreate);
}

async function showPasswordCreate(){
    let newPassword = document.getElementById('password-input');
    if(newPassword.value != undefined){
        if(newPassword.type == "password"){
            eyeButtonCreate.src = "/Images/eye-open.png"
            eyeButtonCreate.style.color = "white"
            eyeButtonCreate.style.height = "20px"
            eyeButtonCreate.style.width = "25px"
            newPassword.type = "text"
        }else{
            eyeButtonCreate.src = "/Images/eye-close.png"
            eyeButtonCreate.style.height = "20px"
            eyeButtonCreate.style.width = "25px"
            newPassword.type = "password"
        }
    }
}

const eyeButtonTwo = document.getElementById('repeat-eye-button-create');
if(eyeButtonTwo){
    eyeButtonTwo.addEventListener('click',showPasswordTwo)
}

async function showPasswordTwo(){
    let newPasswordTwo = document.getElementById('repeat-password-input');
    if(newPasswordTwo.value != undefined){
        if(newPasswordTwo.type == "password"){
            eyeButtonTwo.src = "/Images/eye-open.png"
            eyeButtonTwo.style.color = "white"
            eyeButtonTwo.style.height = "20px"
            eyeButtonTwo.style.width = "25px"
            newPasswordTwo.type = "text"
        }else{
            eyeButtonTwo.src = "/Images/eye-close.png"
            eyeButtonTwo.style.height = "20px"
            eyeButtonTwo.style.width = "25px"
            newPasswordTwo.type = "password"
        }
    }
}
