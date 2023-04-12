const express = require('express');
const routerRecovery = express.Router();

const passport = require('passport');
const checkRoles = require('../middlewares/auth.handler.js');
const validatorHandler = require('../middlewares/validator.handler.js');
const { recoveryValidationDto } = require('../validator/validator.users.login.js');
const { updatePasswordUserDto } = require('../validator/validator.users.js');
const RecoveryService = require('../services/recovery.password.service');
const services = new RecoveryService()

routerRecovery.post('/email-recovery',
    passport.authenticate('jwt', { session: false }),
    checkRoles('customer', 'admin'),
    validatorHandler(recoveryValidationDto, 'body'),
    async (req, res, next) => {
        try {
            let { email } = req.body;
            let rta = await services.sendRecoveryPassword(email);
            res.status(200).json(rta);
        } catch (error) {
            next(error);
        }
    });

//Actualizar password con PATCH
routerRecovery.patch('/update-password/',
    passport.authenticate('jwt', { session: false }),
    checkRoles('customer', 'admin'),
    validatorHandler(updatePasswordUserDto, 'body'),
    async (req, res, next) => {
        try {
            let password = req.body
            let user = req.user;
            let updatePassword = await services.updatePassword(user.sub, password);
            res.send({ updatePassword }).status(200);
        } catch (error) {
            next(error);
        }
    });

module.exports = routerRecovery;