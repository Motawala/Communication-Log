tinymce.init({
    selector: '#mytextarea'
  });

const body = document.getElementById("bd");
if(body){
    window.document.addEventListener('load', () =>{
        create();
    });
}


//Onclick event for the send button to send the user's input to display
const sendButton = document.getElementById("send-button");
if(sendButton){
    sendButton.addEventListener('click', (event)=>{
        event.preventDefault();
        send();
    })
}

//Enter key event to send the users input to the display screen.
const noteInput = document.getElementById("note-input");
if(noteInput){
    noteInput.addEventListener("keypress", (event) =>{
        if(event.key == 'Enter'){
            event.preventDefault();
            send();
        }
    })
}


//Function send the users input to the display.
function send(){
    var messageSent = document.getElementById("note-input").value;
    document.getElementById("message-received").innerHTML = messageSent;
}


