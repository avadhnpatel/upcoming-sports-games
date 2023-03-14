const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, {expiresIn: '2d'})
}

//login user
const loginUser = async (req, res) => {
    const {phone, password} = req.body 

    try {
      const user = await User.login(phone, password)
      
      //create a token
      const token = createToken(user._id)
      
      res.status(200).json({phone, token})
    } catch (error) {
      res.status(400).json({error: error.message})
    }
}

//signup user
const signupUser = async (req, res) => {
    const {phone, carrier, password, confirmPassword} = req.body
  
    try {
      const user = await User.signup(phone, carrier, password, confirmPassword)
      
      //create a token
      const token = createToken(user._id)
      res.status(200).json({phone, token})
    } catch (error) {
      res.status(400).json({error: error.message})
    }
  }

module.exports = {loginUser, signupUser}