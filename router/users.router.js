const express = require('express');
const passport = require('passport');

const validatorHandler = require('../middlewares/validator.handler.js');
const { userIdValidationDto, updatePasswordUserDto, updateUserDto } = require('../validator/validator.users.js');
const UsersService = require("../services/users.services.js");
const checkRoles = require('../middlewares/auth.handler.js');
const services = new UsersService();
const routerUser = express.Router();

//Crud Users
//Mostrar todos los usuarios
routerUser.get('/show',
    passport.authenticate('jwt', { session: false }),
    checkRoles('customer', 'admin'),
    async (req, res) => {
        let showUsers = await services.findUsers();
        res.json(showUsers);
    });

//Muestra un usuario en especifico
routerUser.get('/one-user/',
    passport.authenticate('jwt', { session: false }),
    checkRoles('customer', 'admin'),
    async (req, res, next) => {
        try {
            let user = req.user;
            let showAnUser = await services.findOneUser(user.sub);
            res.status(200).json(showAnUser);
        } catch (error) {
            next(error);
        }
    });

//Actualizar todo el usuario, datos a actualizar ---> (name, email)
routerUser.put('/update-all/',
    passport.authenticate('jwt', { session: false }),
    checkRoles('customer', 'admin'),
    validatorHandler(updateUserDto, 'body'),
    async (req, res, next) => {
        try {
            let user = req.user;
            let body = req.body;
            let updateUsers = await services.updateUser(user.sub, body);
            res.status(200).json(updateUsers);
        } catch (error) {
            next(error);
        }
    });

//Eliminar user
routerUser.delete('/delete/',
    passport.authenticate('jwt', { session: false }),
    checkRoles('admin'),
    validatorHandler(userIdValidationDto, 'query'),
    async (req, res, next) => {
        try {
            let { id } = req.query;
            let deleteUsers = await services.deleteUser(id);
            res.status(200).json(deleteUsers);
        } catch (error) {
            next(error);
        }
    });

module.exports = routerUser;
