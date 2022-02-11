const app = require('express')()
const { googleAuth } = require('../components/validation')
const JWT = require('jsonwebtoken')

const dotenv = require('dotenv')
dotenv.config()

app.post('/', async (req,res)=>{

    const user = await googleAuth(req.body.token)
    const token = JWT.sign({_id: user.id}, process.env.TOKEN_KEY)
    const data = {
        token: token,
        name: user.name,
        image: user.image
    }
    res.header('auth-token', token).json(data)
})

module.exports = app