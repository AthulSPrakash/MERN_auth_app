const app = require('express')()
const userModel = require('../components/models')
const bcrypt = require('bcrypt')
const { regValidation } = require('../components/validation')

app.post('/', async (req,res)=>{
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
        username: req.body.username,
        email: req.body.email,
        password: cipherPass
    })

    try{
        await user.save()
        res.status(200).json('User successfully added')
    }catch (err){
        res.status(500).json(err)
    }
})

module.exports = app