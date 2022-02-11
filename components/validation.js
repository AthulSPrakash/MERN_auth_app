const Joi = require('joi')
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.OAUTH_ID)

const regValidation = data => {
    const schema = Joi.object({
        username: Joi.string().max(255).required(),
        email: Joi.string().max(255).required().email(),
        password: Joi.string().min(8).required()
    })

    const { error } = schema.validate(data)
    return error
}

const loginValidation = data => {
    const schema = Joi.object({
        email: Joi.string().max(255).required().email(),
        password: Joi.string().min(8).required()
    })

    const { error } = schema.validate(data)
    return error
}

const googleAuth = async token => {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.OAUTH_ID
    })

    const payload = ticket.getPayload()
    // console.log('Paylod:', payload)

    console.log(`User ${payload.name} verified`)

    const { sub, name, email, picture } = payload
    const userId = sub

    return { id:userId, name:name, email:email, image:picture}
}

module.exports = {
    regValidation,
    loginValidation,
    googleAuth
}