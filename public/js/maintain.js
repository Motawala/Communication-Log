
//Load the text editor onload
window.addEventListener('load',function(event){
    event.preventDefault();
    initTinyMCE()
    Display()
})

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
    const content = Rawcontent.replace(/(<([^>]+)>)/ig, '')
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
        }else{
            console.log("Error in saving the data")
        }
    }catch(err){
        console.log(err)
    }
}


async function Display(){
    try{
        const mainContent = document.getElementById('data-content')
        await fetch('/user/display')
        .then(response => response.json())
        .then(data =>{
            console.log(JSON.stringify(data))
            data.forEach(record => {
                const titleElement = document.createElement('h1')
                const contentElement = document.createElement('p');

                titleElement.textContent = record.title + " ------->> " + record.time
                contentElement.textContent = record.content 
                contentElement.style.fontSize = "18px"
                mainContent.appendChild(titleElement);
                mainContent.appendChild(contentElement)
            })
        })
        
    }catch(error){
        console.log(error)
    }
}

