const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userteamSchema = new Schema({
    teamName: {
        type: String,
        required: true
    },
    days: {
        type: Number,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('userteam', userteamSchema)

