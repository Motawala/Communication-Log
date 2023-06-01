const express = require('express')
const router = express.Router();

router.get('/home', function(req,res){
    res.render('index',{title:'Home Page'});
})

router.get('/',function(req,res){
    res.redirect('home');
})

module.exports = router