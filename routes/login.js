const app = require('express')()
const userModel = require('../components/models')
const bcrypt = require('bcrypt')
const { loginValidation } = require('../components/validation')
const JWT = require('jsonwebtoken')

const dotenv = require('dotenv')
dotenv.config()

app.post('/', async (req,res)=>{
    //data validation
    const err = loginValidation(req.body)
    if(err) return res.status(400).json(err.details[0].message)

    //email check
    const user = await userModel.findOne({ email: req.body.email })
    if(!user) return res.status(400).json('Invalid email')
    //password check
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if(!validPass) return res.status(400).json('Invalid password') 

    const token = JWT.sign({_id: user._id}, process.env.TOKEN_KEY)
    const data = {
        token:token,
        name: user.firstname,
    }
    res.header('auth-token', token).json(data)
})

module.exports = app