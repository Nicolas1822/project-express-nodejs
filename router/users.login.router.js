const express = require('express');

const UsersLoginService = require('../services/users.login.services.js');
const { registerValidationDto, loginValidationDto, recoveryValidationDto } = require('../validator/validator.users.login.js');
const validatorHandler = require('../middlewares/validator.handler.js');
const checkRoles = require('../middlewares/auth.handler.js');
const passport = require('passport');
const services = new UsersLoginService();
const routerUserLogin = express.Router();


routerUserLogin.post('/register',
    validatorHandler(registerValidationDto, 'body'),
    async (req, res, next) => {
        try {
            let body = req.body;
            let userRegister = await services.usersRegister(body);
            res.status(201).json(userRegister);
        } catch (error) {
            next(error)
        }
    });

routerUserLogin.get('/login',
    validatorHandler(loginValidationDto, 'body'),
    async (req, res, next) => {
        try {
            let { email, password } = req.body;
            let UserLogin = await services.userLogin(email, password);
            res.status(200).json(UserLogin);
        } catch (error) {
            next(error);
        }
    });

module.exports = routerUserLogin;