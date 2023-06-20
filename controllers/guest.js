const guestLogs = require('../models/guest')

const saveGuest = async (req,res) =>{
    try{
        const {title, content, time, date}= req.body;

        //Save the Data input from thse user to the database
        const log = await guestLogs.create({
            title, content, time, date
        })

        
        
        if(log){
            return res.status(200).json({
                message: "Data Successfully saved",
            })
        }else{
            return res.status(400).json({
                success: false,
                message: "Error in saving logs"
            })
        }
    }catch(error){
        return res.status(500).json({
            success: false,
            message: "Error add the notes"
        })
    }

    
}



const displayGuest = async (req,res) =>{

//Retrives all the Data Input from the user and sends it to the client
    
    try{
        const data = await guestLogs.find({})
        
        return res.status(200).json(data);
    }catch(err){
        return res.status(400).json({
            success: false,
            message: 'Data not Found',err
        })
    }
}



const deleteGuest = async (req,res) =>{
    try{
        const {title} = req.body;

        const note = await guestLogs.deleteOne({title})
        if(note){
            return res.status(200).json({
                success: true,
                message: "Note Deleted"
            })
        }else{
            return res.status(400).json({
                success:false,
                message:"Note not Deleted."
            })
        }
    }catch(err){
        return res.status(400).json({
            success:false,
            message:"Error in deleting note."
        })
    }
}
module.exports = {saveGuest,displayGuest, deleteGuest}