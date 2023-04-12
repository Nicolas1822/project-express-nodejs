const Joi = require('joi');

const name = Joi.string().min(4).max(20).required();
const email = Joi.string().email().required();
const password = Joi.string().alphanum().min(5).max(30).required();
const role = Joi.string().min(5);

const registerValidationDto = Joi.object({
    name: name,
    email: email,
    password: password,
    role: role
});

const loginValidationDto = Joi.object({
    email: email,
    password: password
});

const recoveryValidationDto = Joi.object({
    email: email
})

module.exports = { registerValidationDto, loginValidationDto, recoveryValidationDto }