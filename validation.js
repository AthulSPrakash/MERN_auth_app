const Joi = require('joi')

const regValidation = data => {
    const schema = Joi.object({
        firstname: Joi.string().max(255).required(),
        lastname: Joi.string().max(255).required(),
        email: Joi.string().max(255).required().email(),
        phone: Joi.string().max(10).required(),
        address: Joi.string().required(),
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

module.exports = {
    regValidation,
    loginValidation
}