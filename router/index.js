const express = require("express");

const routerUser = require("./users.router.js");
const routerUserLogin = require("./users.login.router.js");
const routerRecovery = require('./recovery.router.js');

const routerApi = (app) => {
    const router = express.Router()
    app.use('/api/v1', router);
    router.use('/user', routerUser);
    router.use('/login-user', routerUserLogin);
    router.use('/recovery', routerRecovery);
}

module.exports = routerApi;