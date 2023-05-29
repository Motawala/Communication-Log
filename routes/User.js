const express = require('express')
const router = express.Router();
const {login, signUp, reset} = require("../controllers/User")





//Creates the /login API 
router.post('/login', login)
router.post('/signup', signUp)
router.post('/resetPassword', reset)
//Exports the router.
module.exports = router