const express = require('express')
const router = express.Router();
const {login, signUp, reset, logout} = require("../controllers/User")
const {isAuth} = require('../middleware/isAuth')



//Creates the /login API 
router.post('/login', login)
router.post('/signup', signUp)
router.post('/resetPassword', reset)
router.post('/logout', logout)

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



//Exports the router.
module.exports = router