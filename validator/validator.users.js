const Joi = require('joi');

const id = Joi.number().integer().required();
const name = Joi.string().min(4).max(20);
const email = Joi.string().email();
const password = Joi.string().alphanum().min(5).max(30).required();
const token = Joi.string().required();

const userIdValidationDto = Joi.object({
    id: id
});

const updatePasswordUserDto = Joi.object({
    password: password,
});

const updateUserDto = Joi.object({
    name: name,
    email: email
});

module.exports = { userIdValidationDto, updatePasswordUserDto, updateUserDto }