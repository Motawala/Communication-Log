const express = require('express')
const router = express.Router();
const {login, signUp, reset, logout} = require("../controllers/User")
const {isAuth} = require('../middleware/isAuth')
const {save, display} = require('../controllers/maintain')
const {saveGuest, displayGuest} = require('../controllers/guest')

//Creates the /login API 
router.post('/login', login)
router.post('/signup', signUp)
router.post('/resetPassword', reset)
router.post('/logout', logout)
router.post('/save', isAuth,save)
router.get('/display', display)

router.post('/saveGuest', saveGuest)
router.get('/displayGuest',displayGuest)

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



router.get('/dashboard', isAuth, (req,res) =>{
    try{
        
        res.render('mainPage',{title:"Dashboard"})
    }catch(err){
        return res.render(500).json({
            message: err
        })
    }
})

router.get('/loginPage/reset', function(req,res){
    try{
        res.render('forgot',{title:'forgot password'})
    }catch(err){
        return res.status(400).json({
            message: err
        })
    }
})


router.get('/loginPage/create', function(req,res){
    try{
        res.render('createAccount',{title:'create new account'})
    }catch(err){
        return res.status(400).json({
            message:"Link not found"
        })
    }
})

router.get('/dashboard/maintain', isAuth, (req,res) =>{
    try{
        res.render('maintain',{title:'Maintain Page'})
    }catch(err){
        return res.status(400).json({
            message:"Link not found"
        })
    }
})

router.get('/dashboard/guest', isAuth, (req,res) =>{
    try{
        res.render('guest',{title:'Guest Page'})
    }catch(err){
        return res.status(400).json({
            message:"Link not found"
        })
    }
})

router.get('/dashboard/housekeeping', isAuth, (req,res) =>{
    try{
        res.render('housekeep',{title:'Housekeeping Page'})
    }catch(err){
        return res.status(400).json({
            message:"Link not found"
        })
    }
})

router.get('/dashboard/inventory', isAuth, (req,res) =>{
    try{
        res.render('inventory',{title:'Inventory Page'})
    }catch(err){
        return res.status(400).json({
            message:"Link not found"
        })
    }
})

router.get('/dashboard/maintainDisplay', isAuth, (req,res) =>{
    try{
        res.render('maintainDisplay',{title:'Maintainance Information Page'})
    }catch(err){
        return res.status(400).json({
            message:"Link not found"
        })
    }
})


router.get('/dashboard/housekeepDisplay', isAuth, (req,res) =>{
    try{
        res.render('housekeepDisplay',{title:'Housekeeping Information Page'})
    }catch(err){
        return res.status(400).json({
            message:"Link not found"
        })
    }
})

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