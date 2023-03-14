const express = require('express')
const {
    getUserteams,
    getUserteam,
    createUserteam,
    deleteUserteam,
    updateUserteam
} = require('..//controllers/userteamController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

//require auth for all userteams routes
router.use(requireAuth)

//GET all userteams
router.get('/', getUserteams)

//GET a single userteam
router.get('/:id', getUserteam)

//POST a new userteam
router.post('/', createUserteam)

//DELETE a new userteam
router.delete('/:id', deleteUserteam)

//UPDATE a new userteam
router.patch('/:id', updateUserteam)

module.exports = router