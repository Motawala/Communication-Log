
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

//Initializes the text Editor on the web page
async function initTinyMCE(){
    tinymce.init({
        selector: '#note-content'
      });
}

const save = document.getElementById('save-button');
if(save){
    save.addEventListener('click',saveContent)
}

//This function makes a post request to the server to save the data to the database.
async function saveContent(){
    const content = tinymce.get('note-content').getContent();
    const title = document.getElementById('note-title').value;
    const dateTime = new Date()
    const time = dateTime.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
    const date = dateTime.toLocaleDateString();
    //Replaces the <p> attribute of html with an empty string
    //const Newlinecontent = Rawcontent.replace(/(<([^>]+)>)/ig, '')
    //Sends a post request to the server to save the data entered by the user.
    try{
        const response = await fetch("/user/saveHousekeep",{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({title, content, time, date}),
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

//This function retrives the data from the database to display it on the screen
async function Display(){
    try{
        const displayContent = document.getElementById('main-content')
        var titleArray = []
        var contentArray = []
        var deleteIconArray = []
        await fetch('/user/displayHousekeep')
        .then(response => response.json())
        .then(data =>{
            data.forEach(record => {
                const titleElement = document.createElement('li');
                const contentElement = document.createElement('p');
                const deleteIcon = document.createElement('i')
                titleElement.style.color = "grey"
                titleElement.innerHTML = record.title + " ------>  Time: " + record.time + ", Date: " + record.date
                contentElement.innerHTML = record.content 
                titleElement.style.fontSize = "20px"
                titleElement.style.fontWeight ="bold"
                titleElement.style.textDecoration = "underline"
                titleElement.style.fontFamily = " Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"
                titleElement.style.marginBottom = "0"
                titleElement.style.padding = "0"
                contentElement.style.margin = "0"
                contentElement.style.padding = "0"
                contentElement.style.fontSize = "16px"
                titleElement.id = record.title
                deleteIcon.className = record.title
                deleteIcon.classList.add('fa','fa-trash')
                deleteIconArray.push(deleteIcon)
                titleArray.push(titleElement)
                contentArray.push(contentElement)
            })
        })

        const length = titleArray.length
        console.log(deleteIconArray)
        for(let i=0; i<=length; i++){
            displayContent.style.border = "2px solid black"
            displayContent.style.padding = "10px"
            displayContent.appendChild(deleteIconArray[i])
            displayContent.appendChild(titleArray[i])
            displayContent.appendChild(contentArray[i])
        }

        //This function Deletes the Notes from the Database and the page
        async function clickEvent(TitId){
            const titleID = document.getElementById(TitId)
            const title = titleID.id
            if(confirm("Do you want to delete the note " + title + "?")){
                
                const result = await fetch("/user/deleteGuest",{
                    method: 'POST',
                    headers:{
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({title}),
                })

                if(result){
                    displayContent.removeChild(titleID)
                    console.log("Note Delete Successfully")
                    location.reload()
                }else{
                    console.log("Error deleting the note")
                }
            }else{
                console.log("note not removed")
            }
        }

        let i = 0
        const element = document.querySelectorAll('i');
        console.log(element.length)
        Array.prototype.forEach.call(element, (item) =>{
            
            item.addEventListener('click', function() {
                var name = item.className.slice(0, -12)
                console.log(item)
                clickEvent(name)
            })

            i = i + 1
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
    homeButton.addEventListener('click', redirect_to_Dashboard)
}


async function takeBackFunc(){
    window.location.href = '/user/dashboard/housekeeping'
}


async function redirect_to_Dashboard(){
    window.location.href = '/user/dashboard'
}


//This function makes a post request to the server to send email
async function email(){
    const to = "karanp3898@gmail.com"
    const from = "pkaran1100@gmail.com"
    const subject = "Test Email From Mota"
    let messageText = ""

    //Save the content from the Database to the Array
    var titleArr = []
    var contentArr = []
    

    //Retrives the data from the database to email it
    try{
        await fetch('/user/displayHousekeep')
        .then(response => response.json())
        .then(data =>{
            data.forEach(record => {
                titleArr.push(record.title)
                contentArr.push(record.content)
            })
        })
    }catch(err){
        console.log(err)
    }
    
    //Define the length of the Array
    const length = titleArr.length;
    const regex = /<[^>]+>/g;


    //Create an email message that is to be sent
    for(let i = 0; i<length; i++){
        if(titleArr[i] != undefined && contentArr[i] != undefined){
            contentArr[i] = contentArr[i].replace(/<[^>]+>/g, '');
            messageText = messageText + '\n' + "Title: " + titleArr[i] + '\n' + "Note: " + contentArr[i] + '\n'
        }
    }
    

    //Create the Email Message JSON
    const message = {
        to:to,
        from:from,
        subject:subject,
        text:messageText
    }


    //Send the Message to the receiptant
    try{
        const response = await fetch("/user/send-email",{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({message}),
        })

        if(response){
            console.log("Email Sent")
        }else{
            console.log("Error check server")
        }
    }catch(err){
        console.log(err)
    }

}



function performActionAtTime(timeInMilliseconds) {
    setTimeout(email, timeInMilliseconds);
  }
  

const delay = 24 * 60 * 60 * 1000; // 3 seconds
//performActionAtTime(delay);
  