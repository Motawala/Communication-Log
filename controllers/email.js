const sendGrid = require('@sendgrid/mail');


const sendEmail = async (req,res) =>{
    try{
        sendGrid.setApiKey("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")
        const {To, CC, From, Subject, Text} = req.body;

        const message = {
            to:{To},
            cc:"kapatel@albany.edu",
            from:"pkaran1100@gmail.com",
            subject:"Test from Mota",
            text:"Hello Mota",
        }
        const sent = await sendGrid.send(message)
        .then(() => {}, error =>{
            console.error(error);

            if(error.response){
                console.error(error.response.body)
            }
        })
    }catch(error){
        return res.status(400).json({
            success:false,
            message:'Error sending Email'
        })
    }
}

module.exports = {sendEmail}
