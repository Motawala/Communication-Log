const sendGrid = require('@sendgrid/mail');
sendGrid.setApiKey("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")


const sendEmail = async (req,res) =>{
    try{
        const {message} = req.body;

        
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
