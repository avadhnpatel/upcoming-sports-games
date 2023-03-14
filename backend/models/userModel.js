const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
const libphonenumber = require('google-libphonenumber');

const Schema = mongoose.Schema

const userSchema = new Schema({
    phone:{
        type: String,
        required: true,
        unique: true
    },
    carrier:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    }
}) 

function validatePhoneNumber(input_str) {
    var re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
  
    return re.test(input_str);
  }

//static signup method
userSchema.statics.signup = async function(phone, carrier, password, confirmPassword) {
    
    //validation
    if (!phone || !password || !carrier || !confirmPassword){
        throw Error('All fields must be filled')
    }
    if (password !== confirmPassword){
        throw Error('Passwords must match')
    }
    if (!validatePhoneNumber(phone)){
        throw Error('Phone number is not valid')
    }
    if (!validator.isStrongPassword(password)){
        throw Error('Password not strong enough')
    }
    const exists = await this.findOne({phone})

    if (exists){
        throw Error('Phone number already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({phone, carrier, password: hash})

    return user
}

//static login method
userSchema.statics.login = async function(phone, password) {
    if (!phone || !password){
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({phone})

    if (!user){
        throw Error('Incorrect phone number')
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match){
        throw Error('Incorrect password')
    }

    return user
}

module.exports = mongoose.model('user', userSchema)