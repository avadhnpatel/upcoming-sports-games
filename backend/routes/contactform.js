const express = require('express')

//controller functions
const {contactform} = require('../controllers/contactformController')

const router = express.Router()

//login route
router.post('/', contactform)

module.exports = router