const sendGrid = require('@sendgrid/mail');
//Sets the API
sendGrid.setApiKey("<API>")

//This funciton send the Email using the SendGrid API
const sendEmail = async (req,res) =>{
    try{
        const {message} = req.body;

        //This function sends email from the server using the content from the front end
        await sendGrid.send(message)
            .then(() =>{
                console.log("Email Sent")
            }).catch(error =>{
                console.log(error)
            })
    }catch(error){
        return res.status(400).json({
            success:false,
            message:'Error sending Email'
        })
    }
}

module.exports = {sendEmail}
