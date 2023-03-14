const Userteam = require('../models/userteamModel.js')
const mongoose = require('mongoose')
//get all userteams
const getUserteams = async (req, res) => {
    const user_id = req.user._id

    const userteams = await Userteam.find({user_id}).sort({createdAt: -1})
    
    res.status(200).json(userteams)
}
//get a single userteam
const getUserteam = async (req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'No such team'})
    }
    const userteam = await Userteam.findById(id)

    if (!userteam) {
        return res.status(400).json({error: 'No such team'})
    }

    res.status(200).json(userteam)
}

//create a new userteam
const createUserteam = async (req, res) => {
    const {teamName, days} = req.body

    let emptyFields = []

    if (!teamName){
        emptyFields.push('teamName')
    }
    if(!days){
        emptyFields.push('days')
    }
    if(emptyFields.length > 0){
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields})
    }

    //add doc to db
    try{
        const user_id = req.user._id
        const teamExists = await Userteam.findOne({ teamName, user_id });
        if (teamExists) {
            return res.status(400).json({error: 'Team already added', emptyFields})
        }
        const userteam = await Userteam.create({teamName, days, user_id})
        res.status(200).json(userteam)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

//delete a userteam
const deleteUserteam = async (req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'No such team'})
    }
    const userteam = await Userteam.findOneAndDelete({_id : id})

    if (!userteam) {
        return res.status(400).json({error: 'No such team'})
    }

    res.status(200).json(userteam)
}

//update a userteam
const updateUserteam = async (req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'No such team'})
    }
    const userteam = await Userteam.findOneAndUpdate({_id : id}, {
        ...req.body
    })

    if (!userteam) {
        return res.status(400).json({error: 'No such team'})
    }

    res.status(200).json(userteam)
}

module.exports = {
    getUserteams,
    getUserteam,
    createUserteam,
    deleteUserteam,
    updateUserteam
}