//Load the text editor onload
window.addEventListener('load',function(event){
    event.preventDefault();
    initTinyMCE()
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
    const time = new Date();
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
s        }else{
            console.log("Error in saving the data")
        }
    }catch(err){
        console.log(err)
    }
}