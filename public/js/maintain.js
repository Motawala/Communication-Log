
//Load the text editor onload
window.addEventListener('load',function(event){
    event.preventDefault();
    initTinyMCE()
    Display()
    email()
})


const homeButton = document.getElementById('home-button-display')
if(homeButton){
    homeButton.addEventListener('click', redirec_to_Dashboard)
}

const heading = document.getElementById('heading');
if(heading){
    heading.addEventListener('click', function(){
        location.reload();
    })
}


async function initTinyMCE(){
    tinymce.init({
        selector: '#note-content'
      });
}

const save = document.getElementById('save-button');
if(save){
    save.addEventListener('click',saveContent)
}

async function saveContent(){
    const content = tinymce.get('note-content').getContent();
    const title = document.getElementById('note-title').value;
    const time = new Date().toLocaleTimeString();
    //Sends a post request to the server to save the data entered by the user.
    try{
        const response = await fetch("/user/save",{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({title, content, time}),
        })

        if(response){
            console.log("Data Saved")
            saveMessage();
        }else{
            console.log("Error in saving the data")
        }
    }catch(err){
        console.log(err)
    }
}

async function saveMessage(){
    const save = document.getElementById('saved-message');
    save.innerHTML = "Information Saved"
}


async function Display(){
    try{
        const mainContent = document.getElementById('data-content')
        const displayContent = document.getElementById('main-content')
        const mainBody = document.getElementById('content-display')
        await fetch('/user/display')
        .then(response => response.json())
        .then(data =>{
            data.forEach(record => {
                mainContent.style.border = "2px solid black"
                mainContent.style.padding = "10px"
                const titleElement = document.createElement('p');
                const timeElement = document.createElement('p');
                const contentElement = document.createElement('p');
                titleElement.style.color = "black"
                titleElement.innerHTML = record.title + " ------  Time: " + record.time + '\n'
                contentElement.innerHTML = record.content 
                titleElement.style.fontSize = "20px"
                titleElement.style.fontWeight ="bold"
                titleElement.style.textDecoration = "underline"
                titleElement.style.marginBottom = "0"
                titleElement.style.padding = "0"
                contentElement.style.margin = "0"
                contentElement.style.padding = "0"
                contentElement.style.fontSize = "16px"
                mainContent.appendChild(titleElement);
                mainContent.appendChild(contentElement)
            })
        })
        
    }catch(error){
        console.log(error)
    }
}



const takeBack = document.getElementById('take-back-button');
if(takeBack){
    takeBack.addEventListener('click',takeBackFunc)
}

async function takeBackFunc(){
    window.location.href = '/user/dashboard/maintain'
}


async function redirec_to_Dashboard(){
    window.location.href = "/user/dashboard"
}


async function email(){
    const to = "karanp3898@gmail.com"
    const from = "pkaran1100@gmail.com"
    const subject = "Test Email From Mota"
    const text = "Hello Motawala"
    const CC = "kapatel@albany.edu"

    try{
        const response = await fetch("/user/send-email",{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({to, CC, from, subject, text}),
        })

        if(response.ok){
            console.log("Email Sent")
        }else{
            console.log("Error check server")
        }
    }catch(err){
        console.log(err)
    }
}