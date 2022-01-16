const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        max: 255,
        required: true
    },
    lastname: {
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
    phone: {
        type: String,
        max: 10,
        required: true
    },
    address: {
        type: String,
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