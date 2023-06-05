const maintainLogs = require('../models/maintain')

const save = async (req,res) =>{
    const {title, content, time}= req.body;

   
    //Save the Data input from the user to the database
    const log = await maintainLogs.create({
        title, content, time
    })

    //Retrives all the Data Input from the user and sends it to the client
    const data = await maintainLogs.find({})
    

    //This function looks for the content from each indexes
    
    
    if(log){
        return res.status(200).json({
            message: "Data Successfully saved"
        })
    }else{
        return res.status(400).json({
            success: false,
            message: "Error in saving logs"
        })
    }

    
}

module.exports = {save}