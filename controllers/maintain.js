const maintainLogs = require('../models/maintain')

const save = async (req,res) =>{
    const {title, content, time}= req.body;

   
    //Save the Data input from the user to the database
    const log = await maintainLogs.create({
        title, content, time
    })

    
    
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



const display = async (req,res) =>{

//Retrives all the Data Input from the user and sends it to the client
    
    try{
        const data = await maintainLogs.find({})
        
        return res.status(200).json(data);
    }catch(err){
        return res.status(400).json({
            success: false,
            message: 'Data not Found',err
        })
    }
}
module.exports = {save, display}