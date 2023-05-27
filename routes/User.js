const express = require("express")
const router = express.Router();
const {login, signUp} = require("../controllers/User")

//Creates the /login API 
router.post('/login', login)
router.post('/signup', signUp)

//Exports the router.
module.exports = router