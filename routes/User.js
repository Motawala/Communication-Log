const express = require('express')
const router = express.Router();
const {login, signUp, reset, logout, getName} = require("../controllers/User")
const {isAuth} = require('../middleware/isAuth')
const {save, display} = require('../controllers/maintain')
const {saveGuest, displayGuest, deleteGuest} = require('../controllers/guest')
const {saveHousekeep, displayHousekeep} = require('../controllers/housekeep')
const {sendEmail} = require('../controllers/email')


//Creates the /login API 
router.post('/login', login)

//Makes a post request to the server to create a new User 
router.post('/signup', signUp)

//Makes a post request to the server to reset users password
router.post('/resetPassword', reset)

//Makes the post request to logout the user and destroy the session
router.post('/logout', logout)

//Saves the Logs to the Database
router.post('/save', isAuth,save)

//Send the Email for all the services
router.post('/send-email', sendEmail)

//Deletes a Note in Guest Log
router.post('/deleteGuest', deleteGuest)

//Displays the Maintanence Logs from the Database.
router.get('/display', display)

//Saves the Guest Logs to the Database
router.post('/saveGuest', saveGuest)

//Retrives the Guest Logs from the Database
router.get('/displayGuest',displayGuest)

//Save the Housekeeping Logs to the database.
router.post('/saveHousekeep',saveHousekeep);

//Retrives the housekeeping Logs from the Database
router.get('/displayHousekeep',displayHousekeep);

//Get the Name of the logged in User
router.get('/name',getName)

//Redirects the user to the login page using the API endpoint /api/loginPage
router.get('/loginPage', function(req,res){
    try{
        res.render('login',{title:"Login Page"})
    }catch(err){
        return res.status(500).json({
            message: err
        })
    }
})

//Redirects the user to the dashboard
router.get('/dashboard', isAuth, (req,res) =>{
    try{
        
        res.render('mainPage',{title:"Dashboard"})
    }catch(err){
        return res.render(500).json({
            message: err
        })
    }
})

//redirects the user to the reset password page
router.get('/loginPage/reset', function(req,res){
    try{
        res.render('forgot',{title:'forgot password'})
    }catch(err){
        return res.status(400).json({
            message: err
        })
    }
})

//Redirects the user to the create new account page.
router.get('/loginPage/create', function(req,res){
    try{
        res.render('createAccount',{title:'create new account'})
    }catch(err){
        return res.status(400).json({
            message:"Link not found"
        })
    }
})

//Redirects the user to the maintainance page
router.get('/dashboard/maintain', isAuth, (req,res) =>{
    try{
        res.render('maintain',{title:'Maintain Page'})
    }catch(err){
        return res.status(400).json({
            message:"Link not found"
        })
    }
})


//Redirects the user to the Guest page
router.get('/dashboard/guest', isAuth, (req,res) =>{
    try{
        res.render('guest',{title:'Guest Page'})
    }catch(err){
        return res.status(400).json({
            message:"Link not found"
        })
    }
})


//Redirects the user to the housekeeping page
router.get('/dashboard/housekeeping', isAuth, (req,res) =>{
    try{
        res.render('housekeep',{title:'Housekeeping Page'})
    }catch(err){
        return res.status(400).json({
            message:"Link not found"
        })
    }
})


//Redirects the user to the inventory Page
router.get('/dashboard/inventory', isAuth, (req,res) =>{
    try{
        res.render('inventory',{title:'Inventory Page'})
    }catch(err){
        return res.status(400).json({
            message:"Link not found"
        })
    }
})


//Redirects the user to the maintainance display page to view the logs
router.get('/dashboard/maintainDisplay', isAuth, (req,res) =>{
    try{
        res.render('maintainDisplay',{title:'Maintainance Information Page'})
    }catch(err){
        return res.status(400).json({
            message:"Link not found"
        })
    }
})


//Redirects the user to the housekeeping display page to view the logs.
router.get('/dashboard/housekeepDisplay', isAuth, (req,res) =>{
    try{
        res.render('housekeepDisplay',{title:'Housekeeping Information Page'})
    }catch(err){
        return res.status(400).json({
            message:"Link not found"
        })
    }
})

//Redirects the user to the guest display page to view the logs.
router.get('/dashboard/guestDisplay', isAuth, (req,res) =>{
    try{
        res.render('guestDisplay',{title:'Housekeeping Information Page'})
    }catch(err){
        return res.status(400).json({
            message:"Link not found"
        })
    }
})



//Exports the router.
module.exports = router