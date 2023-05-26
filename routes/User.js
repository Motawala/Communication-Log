const express = require("express")
const router = express.Router();
const {login} = require("../controllers/User")

router.post('/login', login)

module.exports = router