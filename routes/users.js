const app = require('express')()
const userModel = require('../components/models')
const verify = require('../components/tokenVerify')

app.get('/', verify, async (req,res)=>{
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