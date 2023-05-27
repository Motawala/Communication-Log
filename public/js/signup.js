
//onclick event listner for login-button
const loginButton = document.getElementById("create-input");
if(loginButton){
    loginButton.addEventListener('click', createAccount);
}



const passwordInput = document.getElementById("password-input");
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
    const email = document.getElementById('email-input').value;
    const password = document.getElementById('password-input').value;

    try {
        // Make an HTTP POST request to the login endpoint
        const response = await fetch("http://localhost:3000/api/signup",{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({firstname,lastname,username,email, password}),
        })

        if(response.ok){
            console.log('success')
            displayMessage();
            return res.status(200).json({
                success:true,
                message:"User created Successfully"
            })
        }else{
            const error_message = document.getElementById("signup-message");
            error_message.style.color='red'
            error_message.innerHTML = "Incorrect Email Format"
            console.log("Incorrect Email")
        }

    }catch(error){

    }

}


async function displayMessage(){
    const signUpMessage = document.getElementById('signup-message');

    signUpMessage.innerHTML = "Successfully Created the Account"
    setTimeout(function() {
        // Redirect to the desired page
        window.location.href = '/src/login.html'; // Replace with your desired URL
      },800);
}