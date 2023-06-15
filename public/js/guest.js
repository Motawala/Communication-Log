
//Load the text editor onload
window.addEventListener('load',function(event){
    event.preventDefault();
    initTinyMCE()
    Display()
})


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
    const Rawcontent = tinymce.get('note-content').getContent();
    const title = document.getElementById('note-title').value;
    const time = new Date().toLocaleTimeString();
    //Replaces the <p> attribute of html with an empty string
    const Newlinecontent = Rawcontent.replace(/(<([^>]+)>)/ig, '') + '\n'
    const content = Newlinecontent
    //Sends a post request to the server to save the data entered by the user.
    try{
        const response = await fetch("/user/saveGuest",{
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
    save.innerHTML = "Inforamtion Saved"
}


async function Display(){
    try{
        const mainContent = document.getElementById('data-content')
        const displayContent = document.getElementById('main-content')
        const mainBody = document.getElementById('content-display')
        await fetch('/user/displayGuest')
        .then(response => response.json())
        .then(data =>{
            data.forEach(record => {
                mainContent.style.border = "2px solid black"
                mainContent.style.padding = "10px"
                const titleElement = document.createElement('p');
                const timeElement = document.createElement('p');
                const contentElement = document.createElement('p');
                titleElement.style.color = "grey"
                titleElement.textContent = record.title + " ------  Time: " + record.time + '\n'
                contentElement.textContent = record.content 
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

const homeButton = document.getElementById('home-button-display')
if(homeButton){
    homeButton.addEventListener('click',redirect_to_Dashboard)
}

async function redirect_to_Dashboard(){
    window.location.href = '/user/dashboard'
}


async function takeBackFunc(){
    window.location.href = '/user/dashboard/guest'
}
