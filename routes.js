const app = require('express')()
const userModel = require('./models')
const bcrypt = require('bcrypt')
const { regValidation, loginValidation } = require('./validation')
const JWT = require('jsonwebtoken')
const verify = require('./tokenVerify')

const dotenv = require('dotenv')
dotenv.config()

app.post('/api/register', async (req,res)=>{
    //data validation
    const err = regValidation(req.body)
    if(err) return res.status(400).json(err.details[0].message)

    //userExist check
    const emailExist = await userModel.findOne({ email: req.body.email })
    if(emailExist) return res.status(400).json('User already exist')

    //password Hashing
    const salt = await bcrypt.genSalt(10)
    const cipherPass = await bcrypt.hash(req.body.password, salt)

    const user = new userModel({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        address:req.body.address,
        password: cipherPass
    })

    try{
        await user.save()
        res.json('Reg successful')
    }catch (err){
        res.status(500).json(err)
    }
})

app.post('/api/login', async (req,res)=>{
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

app.get('/api/users', verify, async (req,res)=>{
    const users = await userModel.find({})
    const list = users.map(i=>{
        return({
            firstname: i.firstname,
            lastname: i.lastname,
        })
    })
    try{
        res.json(list)
    }catch (err){
        res.status(500).json(err)
    }
})

module.exports = app