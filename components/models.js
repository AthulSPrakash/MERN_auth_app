const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        max: 255,
        required: true
    },
    email: {
        type: String,
        unique: true,
        max: 255,
        required: true
    },
    password: {
        type: String,
        min: 8,
        required: true
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User